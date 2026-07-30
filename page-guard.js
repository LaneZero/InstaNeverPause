/**
 * InstaNeverPause - Instagram page media guard
 *
 * Runs in the page's MAIN JavaScript world.
 * It prevents Instagram from programmatically pausing the active video
 * when the document enters the hidden state.
 *
 * It does not block visibility events and does not modify
 * document.hidden or document.visibilityState.
 *
 * @author LaneZero
 * @license MIT
 */
(() => {
    'use strict';

    const GUARD_KEY = '__INSTA_NEVER_PAUSE_GUARD_V12__';
    const MESSAGE_SOURCE = 'instaneverpause-extension';
    const MESSAGE_TYPE = 'SET_ENABLED';

    if (globalThis[GUARD_KEY]) {
        return;
    }

    const nativePause = HTMLMediaElement.prototype.pause;
    const nativePlay = HTMLMediaElement.prototype.play;

    let extensionEnabled = false;

    /**
     * Videos that were playing when the tab became hidden.
     *
     * A normal Set is appropriate because it is cleared whenever the
     * document becomes visible or the extension is disabled.
     *
     * @type {Set<HTMLVideoElement>}
     */
    const protectedVideos = new Set();

    /**
     * Determines whether the video is currently within the page viewport.
     *
     * Instagram may keep several video elements mounted simultaneously.
     * Limiting protection to visible videos prevents old or off-screen
     * videos from continuing playback.
     *
     * @param {HTMLVideoElement} video Video to inspect.
     * @returns {boolean}
     */
    function isVisibleVideo(video) {
        if (!video.isConnected || video.ended) {
            return false;
        }

        const rect = video.getBoundingClientRect();

        return (
            rect.width > 0 &&
            rect.height > 0 &&
            rect.bottom > 0 &&
            rect.right > 0 &&
            rect.top < window.innerHeight &&
            rect.left < window.innerWidth
        );
    }

    /**
     * Captures videos that are playing before Instagram handles the
     * document visibility transition.
     */
    function capturePlayingVideos() {
        protectedVideos.clear();

        const videos = document.querySelectorAll('video');

        for (const video of videos) {
            if (
                !video.paused &&
                !video.ended &&
                isVisibleVideo(video)
            ) {
                protectedVideos.add(video);
            }
        }
    }

    /**
     * Uses the original browser play method to recover a protected video.
     *
     * @param {HTMLVideoElement} video Video to resume.
     */
    function ensurePlaying(video) {
        if (
            !extensionEnabled ||
            !document.hidden ||
            !protectedVideos.has(video) ||
            !video.isConnected ||
            video.ended ||
            !video.paused
        ) {
            return;
        }

        const playPromise = nativePlay.call(video);

        if (
            playPromise &&
            typeof playPromise.catch === 'function'
        ) {
            playPromise.catch(() => {
                /*
                 * Playback failures are intentionally ignored here.
                 * The pause event handler can retry if Instagram pauses
                 * the video again during the same hidden session.
                 */
            });
        }
    }

    /**
     * Handles the document entering or leaving the hidden state.
     */
    function handleVisibilityChange() {
        if (!extensionEnabled) {
            return;
        }

        if (document.hidden) {
            capturePlayingVideos();

            /*
             * Run a recovery attempt after current visibility handlers
             * have completed.
             */
            queueMicrotask(() => {
                for (const video of protectedVideos) {
                    ensurePlaying(video);
                }
            });

            return;
        }

        protectedVideos.clear();
    }

    /**
     * Replacement for HTMLMediaElement.pause().
     *
     * Only suppresses programmatic pauses for a visible, playing Instagram
     * video while the tab is hidden. All other pause calls use the browser's
     * original implementation.
     *
     * @returns {void}
     */
    function guardedPause() {
        const isProtectedVideo =
            extensionEnabled &&
            document.hidden &&
            this instanceof HTMLVideoElement &&
            !this.ended &&
            isVisibleVideo(this) &&
            (
                protectedVideos.has(this) ||
                !this.paused
            );

        if (isProtectedVideo) {
            protectedVideos.add(this);

            queueMicrotask(() => {
                ensurePlaying(this);
            });

            return;
        }

        nativePause.call(this);
    }

    /**
     * Recovers from pauses that do not originate from a direct
     * HTMLMediaElement.pause() call.
     *
     * @param {Event} event Media pause event.
     */
    function handlePause(event) {
        const video = event.target;

        if (
            !(video instanceof HTMLVideoElement) ||
            !extensionEnabled ||
            !document.hidden ||
            !protectedVideos.has(video)
        ) {
            return;
        }

        queueMicrotask(() => {
            ensurePlaying(video);
        });
    }

    /**
     * Receives enabled-state updates from the isolated content script.
     *
     * @param {MessageEvent} event Window message event.
     */
    function handleStateMessage(event) {
        if (
            event.source !== window ||
            event.origin !== window.location.origin
        ) {
            return;
        }

        const message = event.data;

        if (
            !message ||
            message.source !== MESSAGE_SOURCE ||
            message.type !== MESSAGE_TYPE
        ) {
            return;
        }

        extensionEnabled = message.enabled === true;

        if (!extensionEnabled) {
            protectedVideos.clear();
            return;
        }

        if (document.hidden) {
            capturePlayingVideos();
        }
    }

    Object.defineProperty(
        HTMLMediaElement.prototype,
        'pause',
        {
            configurable: true,
            enumerable: false,
            writable: true,
            value: guardedPause
        }
    );

    /*
     * The script runs at document_start, so this listener is registered
     * before Instagram normally installs its own visibility handlers.
     */
    document.addEventListener(
        'visibilitychange',
        handleVisibilityChange,
        true
    );

    document.addEventListener(
        'pause',
        handlePause,
        true
    );

    window.addEventListener(
        'message',
        handleStateMessage,
        false
    );

    Object.defineProperty(globalThis, GUARD_KEY, {
        configurable: false,
        enumerable: false,
        writable: false,
        value: Object.freeze({
            version: '1.2'
        })
    });
})();