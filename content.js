/**
 * InstaNeverPause - Chrome extension state bridge
 *
 * Runs in Chrome's isolated extension world.
 * Reads extension settings and securely bridges the enabled state to
 * the Instagram page guard.
 *
 * @author LaneZero
 * @license MIT
 */
(() => {
    'use strict';

    const SETTINGS_KEY = 'extensionEnabled';
    const MESSAGE_SOURCE = 'instaneverpause-extension';
    const MESSAGE_TYPE = 'SET_ENABLED';

    let extensionEnabled = true;

    /**
     * Sends the extension state to the MAIN-world media guard.
     */
    function publishEnabledState() {
        window.postMessage(
            {
                source: MESSAGE_SOURCE,
                type: MESSAGE_TYPE,
                enabled: extensionEnabled
            },
            window.location.origin
        );
    }

    /**
     * Applies and publishes a normalized enabled value.
     *
     * @param {unknown} value Stored or requested state.
     */
    function applyEnabledState(value) {
        extensionEnabled = value !== false;
        publishEnabledState();
    }

    /**
     * Loads the current extension state from Chrome storage.
     */
    function loadSettings() {
        chrome.storage.sync.get(
            {
                [SETTINGS_KEY]: true
            },
            (result) => {
                if (chrome.runtime.lastError) {
                    console.warn(
                        '[InstaNeverPause] Unable to read settings:',
                        chrome.runtime.lastError.message
                    );

                    applyEnabledState(true);
                    return;
                }

                applyEnabledState(result[SETTINGS_KEY]);
            }
        );
    }

    /**
     * Synchronizes state changes made through the popup or background.
     */
    chrome.storage.onChanged.addListener(
        (changes, areaName) => {
            if (
                areaName !== 'sync' ||
                !changes[SETTINGS_KEY]
            ) {
                return;
            }

            applyEnabledState(
                changes[SETTINGS_KEY].newValue
            );
        }
    );

    /**
     * Maintains compatibility with the current popup and service worker.
     */
    chrome.runtime.onMessage.addListener(
        (request, _sender, sendResponse) => {
            if (request?.action === 'toggleExtension') {
                applyEnabledState(request.enabled);

                sendResponse({
                    success: true,
                    enabled: extensionEnabled
                });

                return false;
            }

            if (request?.action === 'getStatus') {
                sendResponse({
                    success: true,
                    enabled: extensionEnabled,
                    initialized: true,
                    videosMonitored:
                        document.querySelectorAll('video').length
                });

                return false;
            }

            return false;
        }
    );

    loadSettings();
})();