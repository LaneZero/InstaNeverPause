// Instagram Video Keeper - Simple & Effective Version
(function() {
    'use strict';
    
    console.log('Instagram Video Keeper: Loading...');
    
    let extensionEnabled = true;
    let isInitialized = false;
    
    // Load settings
    function loadSettings() {
        try {
            if (typeof chrome !== 'undefined' && chrome.storage) {
                chrome.storage.sync.get(['enabled'], function(result) {
                    extensionEnabled = result.enabled !== false;
                    console.log('Instagram Video Keeper: Extension enabled:', extensionEnabled);
                    if (extensionEnabled && !isInitialized) {
                        initializeExtension();
                    }
                });
            } else {
                extensionEnabled = true;
                initializeExtension();
            }
        } catch (error) {
            console.log('Instagram Video Keeper: Settings error, using defaults');
            extensionEnabled = true;
            initializeExtension();
        }
    }
    
    // Initialize extension
    function initializeExtension() {
        if (isInitialized) return;
        
        console.log('Instagram Video Keeper: Initializing...');
        
        // Override document visibility properties
        overrideVisibility();
        
        // Start video monitoring
        startVideoMonitoring();
        
        isInitialized = true;
        console.log('Instagram Video Keeper: Initialized successfully');
    }
    
    // Override visibility properties
    function overrideVisibility() {
        // Override document.hidden
        try {
            Object.defineProperty(document, 'hidden', {
                get: function() {
                    return extensionEnabled ? false : true;
                },
                configurable: true
            });
        } catch (e) {
            console.log('Instagram Video Keeper: Could not override document.hidden');
        }
        
        // Override document.visibilityState
        try {
            Object.defineProperty(document, 'visibilityState', {
                get: function() {
                    return extensionEnabled ? 'visible' : 'hidden';
                },
                configurable: true
            });
        } catch (e) {
            console.log('Instagram Video Keeper: Could not override document.visibilityState');
        }
        
        // Block visibilitychange events
        document.addEventListener('visibilitychange', function(e) {
            if (extensionEnabled) {
                e.stopImmediatePropagation();
                console.log('Instagram Video Keeper: Blocked visibilitychange event');
            }
        }, true);
        
        console.log('Instagram Video Keeper: Visibility override active');
    }
    
    // Video monitoring system
    function startVideoMonitoring() {
        let videoCheckInterval = setInterval(function() {
            if (!extensionEnabled) return;
            
            const videos = document.querySelectorAll('video');
            videos.forEach(function(video) {
                if (!video.hasAttribute('data-keeper-monitored')) {
                    video.setAttribute('data-keeper-monitored', 'true');
                    setupVideoListeners(video);
                    console.log('Instagram Video Keeper: Video registered');
                }
            });
        }, 1000);
        
        console.log('Instagram Video Keeper: Video monitoring started');
    }
    
    // Setup video event listeners
    function setupVideoListeners(video) {
        let userPaused = false;
        let resumeAttempts = 0;
        const maxAttempts = 3;
        
        // Play event
        video.addEventListener('play', function() {
            userPaused = false;
            resumeAttempts = 0;
            console.log('Instagram Video Keeper: Video started playing naturally');
        });
        
        // Pause event
        video.addEventListener('pause', function(e) {
            if (!extensionEnabled) return;
            
            // Check if this is a user action
            const isUserAction = e.isTrusted && (
                document.activeElement === video ||
                e.target === video
            );
            
            if (isUserAction) {
                userPaused = true;
                console.log('Instagram Video Keeper: User paused video - respecting user action');
                return;
            }
            
            // If not user action and video is in viewport, try to resume
            if (!userPaused && isVideoInViewport(video) && resumeAttempts < maxAttempts) {
                resumeAttempts++;
                console.log('Instagram Video Keeper: Smart resume attempt', resumeAttempts);
                
                setTimeout(function() {
                    if (video.paused && !video.ended) {
                        const playPromise = video.play();
                        if (playPromise) {
                            playPromise.catch(function(error) {
                                console.log('Instagram Video Keeper: Resume failed:', error);
                            });
                        }
                    }
                }, 100);
            }
        });
        
        // Reset user pause flag when video ends
        video.addEventListener('ended', function() {
            userPaused = false;
            resumeAttempts = 0;
        });
    }
    
    // Check if video is in viewport
    function isVideoInViewport(video) {
        const rect = video.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= window.innerHeight &&
            rect.right <= window.innerWidth &&
            rect.width > 0 &&
            rect.height > 0
        );
    }
    
    // Listen for settings changes
    if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.onChanged.addListener(function(changes) {
            if (changes.enabled) {
                extensionEnabled = changes.enabled.newValue;
                console.log('Instagram Video Keeper: Extension toggled:', extensionEnabled);
                
                if (extensionEnabled && !isInitialized) {
                    initializeExtension();
                }
            }
        });
    }
    
    // Message handling
    if (typeof chrome !== 'undefined' && chrome.runtime) {
        chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
            if (request.action === 'getStatus') {
                const videos = document.querySelectorAll('video[data-keeper-monitored]');
                sendResponse({
                    enabled: extensionEnabled,
                    videosMonitored: videos.length,
                    initialized: isInitialized
                });
            }
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadSettings);
    } else {
        loadSettings();
    }
    
    // Also try immediate initialization
    setTimeout(loadSettings, 100);
    
    console.log('Instagram Video Keeper: Script loaded');
})();