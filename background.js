// InstaNeverPause - Background Script
// Coded by LaneZero - https://github.com/LaneZero

console.log('🎵 InstaNeverPause background script loaded');

// Extension installation/update handler
chrome.runtime.onInstalled.addListener(async (details) => {
    console.log('InstaNeverPause installed/updated:', details.reason);
    
    try {
        if (details.reason === 'install') {
            // First time installation
            await chrome.storage.sync.set({ 
                extensionEnabled: true,
                installDate: Date.now(),
                version: chrome.runtime.getManifest().version
            });
            
            console.log('✅ InstaNeverPause installed successfully');
            
            // Open GitHub page
            setTimeout(() => {
                chrome.tabs.create({
                    url: 'https://github.com/LaneZero/InstaNeverPause'
                }).catch(error => console.log('Could not open GitHub page:', error));
            }, 1000);
            
        } else if (details.reason === 'update') {
            // Extension updated
            const manifest = chrome.runtime.getManifest();
            await chrome.storage.sync.set({ 
                version: manifest.version,
                updateDate: Date.now()
            });
            
            console.log('🔄 InstaNeverPause updated to version:', manifest.version);
        }
    } catch (error) {
        console.error('Error in onInstalled handler:', error);
    }
});

// Handle tab updates
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    // Only act when page is completely loaded
    if (changeInfo.status !== 'complete') return;
    
    // Only act on Instagram pages
    if (!tab.url || !tab.url.includes('instagram.com')) return;
    
    console.log('Instagram page loaded:', tab.url);
    
    try {
        // Small delay to ensure page is ready
        setTimeout(async () => {
            try {
                // Check if extension is enabled
                const result = await chrome.storage.sync.get(['extensionEnabled']);
                const isEnabled = result.extensionEnabled !== false;
                
                if (isEnabled) {
                    // Try to send message to content script
                    await chrome.tabs.sendMessage(tabId, { 
                        action: 'toggleExtension', 
                        enabled: true 
                    });
                    console.log('✅ Sent enable message to content script');
                }
            } catch (error) {
                console.log('Content script not ready yet (this is normal):', error.message);
            }
        }, 2000);
        
    } catch (error) {
        console.log('Error handling tab update:', error);
    }
});

// Handle messages from content scripts or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    try {
        console.log('Background received message:', message);
        
        if (message.action === 'getExtensionState') {
            chrome.storage.sync.get(['extensionEnabled']).then(result => {
                sendResponse({ enabled: result.extensionEnabled !== false });
            }).catch(error => {
                console.error('Error getting extension state:', error);
                sendResponse({ enabled: true }); // Default to enabled
            });
            return true;
        }
        
        if (message.action === 'logActivity') {
            console.log('Activity logged:', message.data);
            sendResponse({ success: true });
        }
        
        sendResponse({ success: true });
    } catch (error) {
        console.error('Error handling message:', error);
        sendResponse({ success: false, error: error.message });
    }
    
    return true;
});

// Handle storage changes
chrome.storage.onChanged.addListener((changes, namespace) => {
    try {
        if (namespace === 'sync' && changes.extensionEnabled) {
            const newValue = changes.extensionEnabled.newValue;
            console.log('Extension state changed to:', newValue);
            
            // Update all Instagram tabs
            updateAllInstagramTabs(newValue);
        }
    } catch (error) {
        console.error('Error handling storage change:', error);
    }
});

// Update all Instagram tabs with new state
async function updateAllInstagramTabs(enabled) {
    try {
        const tabs = await chrome.tabs.query({ url: '*://*.instagram.com/*' });
        
        for (const tab of tabs) {
            try {
                await chrome.tabs.sendMessage(tab.id, { 
                    action: 'toggleExtension', 
                    enabled: enabled 
                });
                console.log(`Updated tab ${tab.id} with state:`, enabled);
            } catch (error) {
                console.log(`Could not update tab ${tab.id} (normal if tab not ready):`, error.message);
            }
        }
    } catch (error) {
        console.log('Error updating tabs:', error);
    }
}

// Handle extension startup
chrome.runtime.onStartup.addListener(() => {
    console.log('🚀 InstaNeverPause extension started');
});

console.log('✅ InstaNeverPause background script initialized');