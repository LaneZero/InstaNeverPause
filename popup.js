document.addEventListener('DOMContentLoaded', function() {
    const toggleSwitch = document.getElementById('toggleSwitch');
    const statusDiv = document.getElementById('status');
    
    // Load current settings
    chrome.storage.sync.get(['enabled'], function(result) {
        const isEnabled = result.enabled !== false;
        updateUI(isEnabled);
        
        // Get status from content script
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs[0] && tabs[0].url.includes('instagram.com')) {
                chrome.tabs.sendMessage(tabs[0].id, {action: 'getStatus'}, function(response) {
                    if (response) {
                        updateStatus(isEnabled, response.videosMonitored);
                    }
                });
            }
        });
    });
    
    // Toggle switch click
    toggleSwitch.addEventListener('click', function() {
        const isCurrentlyActive = toggleSwitch.classList.contains('active');
        const newState = !isCurrentlyActive;
        
        chrome.storage.sync.set({enabled: newState}, function() {
            updateUI(newState);
            updateStatus(newState, 0);
        });
    });
    
    function updateUI(isEnabled) {
        if (isEnabled) {
            toggleSwitch.classList.add('active');
        } else {
            toggleSwitch.classList.remove('active');
        }
    }
    
    function updateStatus(isEnabled, videoCount) {
        if (isEnabled) {
            statusDiv.className = 'status active';
            statusDiv.textContent = videoCount > 0 ? 
                `Active - Monitoring ${videoCount} video(s)` : 
                'Active - Ready to monitor videos';
        } else {
            statusDiv.className = 'status inactive';
            statusDiv.textContent = 'Disabled';
        }
    }
});