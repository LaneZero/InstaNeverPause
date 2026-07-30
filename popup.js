/**
 * InstaNeverPause - Chrome popup controller
 *
 * Manages the extension preference, donation panel,
 * clipboard actions, and popup status feedback.
 *
 * @author LaneZero
 * @license MIT
 */
document.addEventListener('DOMContentLoaded', async () => {
    'use strict';

    const storageApi =
        globalThis.InstaNeverPauseStorage;

    const elements = {
        toggle:
            document.getElementById('toggleSwitch'),
        statusIndicator:
            document.getElementById('statusIndicator'),
        statusTitle:
            document.getElementById('statusTitle'),
        statusText:
            document.getElementById('statusText'),
        versionBadge:
            document.getElementById('versionBadge'),
        donationToggle:
            document.getElementById('donationToggle'),
        donationPanel:
            document.getElementById('donationPanel'),
        toast:
            document.getElementById('toast')
    };

    let isEnabled = true;
    let toastTimerId = null;

    if (!storageApi) {
        showFatalState(
            'Extension storage could not be initialized.'
        );

        return;
    }

    /**
     * Displays a fatal popup initialization state.
     *
     * @param {string} message Error message.
     */
    function showFatalState(message) {
        if (elements.statusTitle) {
            elements.statusTitle.textContent =
                'Unavailable';
        }

        if (elements.statusText) {
            elements.statusText.textContent =
                message;
        }

        if (elements.toggle) {
            elements.toggle.disabled = true;
        }

        console.error(
            '[InstaNeverPause]',
            message
        );
    }

    /**
     * Updates the enabled or disabled interface.
     *
     * @param {boolean} enabled Current extension state.
     */
    function updateEnabledState(enabled) {
        isEnabled = enabled;

        elements.toggle?.classList.toggle(
            'active',
            enabled
        );

        elements.statusIndicator?.classList.toggle(
            'active',
            enabled
        );

        elements.toggle?.setAttribute(
            'aria-checked',
            String(enabled)
        );

        elements.toggle?.setAttribute(
            'aria-label',
            enabled
                ? 'Disable InstaNeverPause'
                : 'Enable InstaNeverPause'
        );

        if (elements.statusTitle) {
            elements.statusTitle.textContent =
                enabled
                    ? 'Protection enabled'
                    : 'Protection disabled';
        }

        if (elements.statusText) {
            elements.statusText.textContent =
                enabled
                    ? 'Instagram videos can continue while you switch tabs or minimize Chrome.'
                    : 'Instagram will use its normal video pause behavior.';
        }
    }

    /**
     * Enables or disables the toggle busy state.
     *
     * @param {boolean} busy Whether a setting update is running.
     */
    function setToggleBusy(busy) {
        if (!elements.toggle) {
            return;
        }

        elements.toggle.disabled = busy;
        elements.toggle.setAttribute(
            'aria-busy',
            String(busy)
        );
    }

    /**
     * Shows a temporary accessible notification.
     *
     * @param {string} message Notification text.
     */
    function showToast(message) {
        if (!elements.toast) {
            return;
        }

        if (toastTimerId !== null) {
            window.clearTimeout(toastTimerId);
        }

        elements.toast.textContent = message;
        elements.toast.hidden = false;

        toastTimerId = window.setTimeout(() => {
            elements.toast.hidden = true;
            elements.toast.textContent = '';
            toastTimerId = null;
        }, 1800);
    }

    /**
     * Copies text to the clipboard.
     *
     * @param {string} text Text to copy.
     */
    async function copyText(text) {
        try {
            await navigator.clipboard.writeText(text);
            return;
        } catch {
            const textArea =
                document.createElement('textarea');

            textArea.value = text;
            textArea.setAttribute('readonly', '');
            textArea.style.position = 'fixed';
            textArea.style.top = '-1000px';
            textArea.style.opacity = '0';

            document.body.appendChild(textArea);
            textArea.select();

            const copied =
                document.execCommand('copy');

            textArea.remove();

            if (!copied) {
                throw new Error(
                    'Clipboard operation failed.'
                );
            }
        }
    }

    /**
     * Loads the display version from the installed manifest.
     */
    function displayManifestVersion() {
        if (!elements.versionBadge) {
            return;
        }

        const manifest =
            chrome.runtime.getManifest();

        elements.versionBadge.textContent =
            `v${manifest.version}`;
    }

    /**
     * Opens or closes the donation panel.
     */
    function toggleDonationPanel() {
        if (
            !elements.donationToggle ||
            !elements.donationPanel
        ) {
            return;
        }

        const isExpanded =
            elements.donationToggle.getAttribute(
                'aria-expanded'
            ) === 'true';

        const nextExpanded = !isExpanded;

        elements.donationToggle.setAttribute(
            'aria-expanded',
            String(nextExpanded)
        );

        elements.donationPanel.hidden =
            !nextExpanded;
    }

    /**
     * Handles an enabled-state change from the user.
     */
    async function handleToggle() {
        const previousValue = isEnabled;
        const nextValue = !previousValue;

        setToggleBusy(true);
        updateEnabledState(nextValue);

        try {
            const savedValue =
                await storageApi.setEnabledState(
                    nextValue
                );

            updateEnabledState(savedValue);
        } catch (error) {
            updateEnabledState(previousValue);
            showToast(
                'Unable to save the setting.'
            );

            console.error(
                '[InstaNeverPause] Unable to save setting:',
                error
            );
        } finally {
            setToggleBusy(false);
        }
    }

    /**
     * Handles clicks on wallet copy buttons.
     *
     * @param {MouseEvent} event Click event.
     */
    async function handleDocumentClick(event) {
        const target = event.target;

        if (!(target instanceof Element)) {
            return;
        }

        const copyButton =
            target.closest('[data-copy-address]');

        if (!(copyButton instanceof HTMLButtonElement)) {
            return;
        }

        const address =
            copyButton.dataset.copyAddress;

        const label =
            copyButton.dataset.copyLabel ??
            'Wallet address';

        if (!address) {
            return;
        }

        const originalText =
            copyButton.textContent ?? 'Copy';

        copyButton.disabled = true;

        try {
            await copyText(address);

            copyButton.textContent = 'Copied';
            copyButton.classList.add('copied');

            showToast(`${label} copied.`);
        } catch (error) {
            showToast(
                'Unable to copy the address.'
            );

            console.error(
                '[InstaNeverPause] Unable to copy address:',
                error
            );
        } finally {
            window.setTimeout(() => {
                copyButton.textContent =
                    originalText;

                copyButton.classList.remove(
                    'copied'
                );

                copyButton.disabled = false;
            }, 1400);
        }
    }

    elements.toggle?.addEventListener(
        'click',
        handleToggle
    );

    elements.donationToggle?.addEventListener(
        'click',
        toggleDonationPanel
    );

    document.addEventListener(
        'click',
        handleDocumentClick
    );

    storageApi.addEnabledStateListener(
        updateEnabledState
    );

    displayManifestVersion();

    try {
        const enabled =
            await storageApi.getEnabledState();

        updateEnabledState(enabled);
        setToggleBusy(false);
    } catch (error) {
        showFatalState(
            'Your saved preference could not be loaded.'
        );

        console.error(
            '[InstaNeverPause] Unable to load setting:',
            error
        );
    }
});