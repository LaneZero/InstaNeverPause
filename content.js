/**
 * InstaNeverPause - Chrome extension state bridge
 *
 * Runs in Chrome's isolated extension world.
 * Sends the locally stored enabled state to the media guard running
 * in Instagram's MAIN JavaScript world.
 *
 * @author LaneZero
 * @license MIT
 */
(() => {
    'use strict';

    const MESSAGE_SOURCE = 'instaneverpause-extension';
    const MESSAGE_TYPE = 'SET_ENABLED';

    const storageApi =
        globalThis.InstaNeverPauseStorage;

    if (!storageApi) {
        console.error(
            '[InstaNeverPause] Shared storage module is unavailable.'
        );

        return;
    }

    /**
     * Publishes the enabled state to the MAIN-world media guard.
     *
     * @param {boolean} enabled Current extension state.
     */
    function publishEnabledState(enabled) {
        window.postMessage(
            {
                source: MESSAGE_SOURCE,
                type: MESSAGE_TYPE,
                enabled
            },
            window.location.origin
        );
    }

    storageApi.addEnabledStateListener(
        publishEnabledState
    );

    storageApi
        .getEnabledState()
        .then(publishEnabledState)
        .catch((error) => {
            console.warn(
                '[InstaNeverPause] Unable to load local setting:',
                error
            );

            /*
             * Fail open so existing users do not unexpectedly lose
             * the extension's core behavior.
             */
            publishEnabledState(true);
        });
})();