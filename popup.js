/**
 * InstaNeverPause - Chrome popup controller
 *
 * Manages the locally stored extension preference and popup
 * interactions.
 *
 * @author LaneZero
 * @license MIT
 */
document.addEventListener('DOMContentLoaded', async () => {
    'use strict';

    const storageApi =
        globalThis.InstaNeverPauseStorage;

    if (!storageApi) {
        console.error(
            '[InstaNeverPause] Shared storage module is unavailable.'
        );

        return;
    }

    const toggleSwitch =
        document.getElementById('toggleSwitch');
    const toggleLabel =
        document.getElementById('toggleLabel');
    const statusIndicator =
        document.getElementById('statusIndicator');
    const statusText =
        document.getElementById('statusText');
    const cryptoHeader =
        document.getElementById('cryptoHeader');
    const cryptoContent =
        document.getElementById('cryptoContent');
    const copySuccess =
        document.getElementById('copySuccess');
    const versionBadge =
        document.querySelector('.version-badge');

    let isEnabled = true;

    /**
     * Updates the popup according to the current extension state.
     *
     * @param {boolean} enabled Current extension state.
     */
    function updateUI(enabled) {
        toggleSwitch?.classList.toggle(
            'active',
            enabled
        );

        toggleLabel?.classList.toggle(
            'active',
            enabled
        );

        statusIndicator?.classList.toggle(
            'active',
            enabled
        );

        toggleSwitch?.setAttribute(
            'aria-checked',
            String(enabled)
        );

        if (toggleLabel) {
            toggleLabel.textContent = enabled
                ? 'Enabled'
                : 'Disabled';
        }

        if (statusText) {
            statusText.textContent = enabled
                ? 'Active on Instagram. Videos keep playing when you switch tabs or minimize Chrome.'
                : 'Disabled. Instagram videos will use their normal playback behavior.';
        }
    }

    /**
     * Loads the saved extension setting.
     */
    async function loadEnabledState() {
        try {
            isEnabled =
                await storageApi.getEnabledState();
        } catch (error) {
            console.error(
                '[InstaNeverPause] Unable to load settings:',
                error
            );

            isEnabled = true;
        }

        updateUI(isEnabled);
    }

    /**
     * Displays temporary clipboard feedback.
     */
    function showCopySuccess() {
        if (!copySuccess) {
            return;
        }

        copySuccess.classList.add('show');

        window.setTimeout(() => {
            copySuccess.classList.remove('show');
        }, 2000);
    }

    /**
     * Copies text with a fallback for older environments.
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
            textArea.style.opacity = '0';

            document.body.appendChild(textArea);
            textArea.select();

            const copied =
                document.execCommand('copy');

            textArea.remove();

            if (!copied) {
                throw new Error(
                    'Clipboard copy failed.'
                );
            }
        }
    }

    toggleSwitch?.setAttribute('role', 'switch');
    toggleSwitch?.setAttribute('tabindex', '0');

    toggleSwitch?.addEventListener(
        'click',
        async () => {
            const previousValue = isEnabled;
            const nextValue = !previousValue;

            isEnabled = nextValue;
            updateUI(nextValue);

            try {
                isEnabled =
                    await storageApi.setEnabledState(
                        nextValue
                    );
            } catch (error) {
                isEnabled = previousValue;
                updateUI(previousValue);

                console.error(
                    '[InstaNeverPause] Unable to save settings:',
                    error
                );
            }
        }
    );

    toggleSwitch?.addEventListener(
        'keydown',
        (event) => {
            if (
                event.key !== 'Enter' &&
                event.key !== ' '
            ) {
                return;
            }

            event.preventDefault();
            toggleSwitch.click();
        }
    );

    storageApi.addEnabledStateListener(
        (enabled) => {
            isEnabled = enabled;
            updateUI(enabled);
        }
    );

    cryptoHeader?.setAttribute(
        'role',
        'button'
    );

    cryptoHeader?.setAttribute(
        'tabindex',
        '0'
    );

    cryptoHeader?.setAttribute(
        'aria-expanded',
        'false'
    );

    /**
     * Expands or collapses the donation methods.
     */
    function toggleDonationSection() {
        if (!cryptoContent || !cryptoHeader) {
            return;
        }

        const expanded =
            cryptoContent.classList.toggle(
                'expanded'
            );

        cryptoHeader.classList.toggle(
            'expanded',
            expanded
        );

        cryptoHeader.setAttribute(
            'aria-expanded',
            String(expanded)
        );
    }

    cryptoHeader?.addEventListener(
        'click',
        toggleDonationSection
    );

    cryptoHeader?.addEventListener(
        'keydown',
        (event) => {
            if (
                event.key !== 'Enter' &&
                event.key !== ' '
            ) {
                return;
            }

            event.preventDefault();
            toggleDonationSection();
        }
    );

    document.addEventListener(
        'click',
        async (event) => {
            const target = event.target;

            if (!(target instanceof Element)) {
                return;
            }

            const networkAddress =
                target.closest('.network-address');

            if (!networkAddress) {
                return;
            }

            const address =
                networkAddress.dataset.address;

            if (!address) {
                return;
            }

            event.preventDefault();

            const copyButton =
                networkAddress.querySelector(
                    '.copy-button'
                );

            try {
                await copyText(address);
                showCopySuccess();

                if (copyButton) {
                    const originalText =
                        copyButton.textContent;

                    copyButton.textContent =
                        'Copied!';

                    window.setTimeout(() => {
                        copyButton.textContent =
                            originalText;
                    }, 1500);
                }
            } catch (error) {
                console.error(
                    '[InstaNeverPause] Unable to copy address:',
                    error
                );
            }
        }
    );

    versionBadge?.addEventListener(
        'click',
        () => {
            chrome.tabs.create({
                url: 'https://github.com/LaneZero/InstaNeverPause'
            });
        }
    );

    await loadEnabledState();
});