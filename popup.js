document.addEventListener('DOMContentLoaded', function() {
    const toggleSwitch = document.getElementById('toggleSwitch');
    const status = document.getElementById('status');
    const statusText = status.querySelector('.status-text');
    const statusIndicator = status.querySelector('.status-indicator');

    // Load initial state
    chrome.storage.local.get(['enabled'], function(result) {
        const isEnabled = result.enabled !== false;
        updateToggleState(isEnabled);
        updateStatus(isEnabled);
    });

    // Toggle switch click handler
    toggleSwitch.addEventListener('click', function() {
        const isCurrentlyActive = toggleSwitch.classList.contains('active');
        const newState = !isCurrentlyActive;
        
        // Add click animation
        toggleSwitch.style.transform = 'scale(0.95)';
        setTimeout(() => {
            toggleSwitch.style.transform = '';
        }, 150);
        
        // Update state
        updateToggleState(newState);
        updateStatus(newState);
        
        // Save to storage
        chrome.storage.local.set({ enabled: newState });
        
        // Send message to content script
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            if (tabs[0] && tabs[0].url.includes('instagram.com')) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    type: 'TOGGLE_EXTENSION',
                    enabled: newState
                }).catch(() => {
                    console.log('Content script not ready yet');
                });
            }
        });
    });

    function updateToggleState(isEnabled) {
        if (isEnabled) {
            toggleSwitch.classList.add('active');
        } else {
            toggleSwitch.classList.remove('active');
        }
    }

    function updateStatus(isEnabled) {
        // Remove all status classes
        status.classList.remove('active', 'inactive', 'loading');
        statusIndicator.classList.remove('active', 'inactive', 'loading');
        
        if (isEnabled) {
            status.classList.add('active');
            statusIndicator.classList.add('active');
            statusText.textContent = 'Extension Active';
        } else {
            status.classList.add('inactive');
            statusIndicator.classList.add('inactive');
            statusText.textContent = 'Extension Inactive';
        }
        
        // Remove loading spinner if it exists
        const spinner = status.querySelector('.loading-spinner');
        if (spinner) {
            spinner.style.display = 'none';
        }
    }

    // Check if we're on Instagram
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs[0] && !tabs[0].url.includes('instagram.com')) {
            // Show info that extension only works on Instagram
            const infoSection = document.querySelector('.info-section');
            infoSection.innerHTML = `
                <span class="info-icon">⚠️</span>
                <div class="info-text" style="color: #ff9800;">Please navigate to Instagram</div>
                <div class="info-subtext">This extension only works on Instagram.com</div>
            `;
        }
    });

    // Add some interactive effects
    const container = document.querySelector('.container');
    
    // Add subtle mouse move effect
    container.addEventListener('mousemove', function(e) {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    container.addEventListener('mouseleave', function() {
        container.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
});