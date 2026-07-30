/**
 * InstaNeverPause - Shared extension storage
 *
 * Centralizes extension preference access and performs a one-time
 * migration from chrome.storage.sync to chrome.storage.local.
 *
 * @author LaneZero
 * @license MIT
 */
(() => {
    'use strict';

    const SETTINGS_KEY = 'extensionEnabled';
    const MIGRATION_KEY = 'settingsMigratedToLocalV12';
    const DEFAULT_ENABLED = true;

    /**
     * Checks whether an object owns a property.
     *
     * @param {object} object Object to inspect.
     * @param {string} key Property name.
     * @returns {boolean}
     */
    function hasOwnProperty(object, key) {
        return Object.prototype.hasOwnProperty.call(object, key);
    }

    /**
     * Reads the local setting or migrates the previous synced value.
     *
     * @returns {Promise<boolean>} Current enabled state.
     */
    async function getEnabledState() {
        const localResult = await chrome.storage.local.get([
            SETTINGS_KEY,
            MIGRATION_KEY
        ]);

        if (hasOwnProperty(localResult, SETTINGS_KEY)) {
            if (localResult[MIGRATION_KEY] !== true) {
                await chrome.storage.local.set({
                    [MIGRATION_KEY]: true
                });
            }

            return localResult[SETTINGS_KEY] !== false;
        }

        const legacyResult =
            await chrome.storage.sync.get(SETTINGS_KEY);

        const enabled = hasOwnProperty(
            legacyResult,
            SETTINGS_KEY
        )
            ? legacyResult[SETTINGS_KEY] !== false
            : DEFAULT_ENABLED;

        await chrome.storage.local.set({
            [SETTINGS_KEY]: enabled,
            [MIGRATION_KEY]: true
        });

        /*
         * Remove the old synced preference only after the local value
         * has been written successfully.
         */
        if (hasOwnProperty(legacyResult, SETTINGS_KEY)) {
            try {
                await chrome.storage.sync.remove(SETTINGS_KEY);
            } catch (error) {
                console.warn(
                    '[InstaNeverPause] Unable to remove legacy sync setting:',
                    error
                );
            }
        }

        return enabled;
    }

    /**
     * Saves a normalized enabled state locally.
     *
     * @param {unknown} value New setting value.
     * @returns {Promise<boolean>} Saved normalized value.
     */
    async function setEnabledState(value) {
        const enabled = value !== false;

        await chrome.storage.local.set({
            [SETTINGS_KEY]: enabled,
            [MIGRATION_KEY]: true
        });

        return enabled;
    }

    /**
     * Registers a listener for enabled-state changes.
     *
     * @param {(enabled: boolean) => void} callback Change handler.
     * @returns {() => void} Function that removes the listener.
     */
    function addEnabledStateListener(callback) {
        if (typeof callback !== 'function') {
            throw new TypeError(
                'Enabled-state listener must be a function.'
            );
        }

        const listener = (changes, areaName) => {
            const settingChange = changes[SETTINGS_KEY];

            if (areaName !== 'local' || !settingChange) {
                return;
            }

            callback(settingChange.newValue !== false);
        };

        chrome.storage.onChanged.addListener(listener);

        return () => {
            chrome.storage.onChanged.removeListener(listener);
        };
    }

    Object.defineProperty(
        globalThis,
        'InstaNeverPauseStorage',
        {
            configurable: false,
            enumerable: false,
            writable: false,
            value: Object.freeze({
                SETTINGS_KEY,
                getEnabledState,
                setEnabledState,
                addEnabledStateListener
            })
        }
    );
})();