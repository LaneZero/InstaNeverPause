// InstaNeverPause - Popup Script
// Coded by LaneZero - https://github.com/LaneZero

document.addEventListener('DOMContentLoaded', async () => {
    console.log('🎵 InstaNeverPause popup loaded');
    
    // DOM Elements
    const toggleSwitch = document.getElementById('toggleSwitch');
    const toggleLabel = document.getElementById('toggleLabel');
    const statusIndicator = document.getElementById('statusIndicator');
    const statusText = document.getElementById('statusText');
    const cryptoHeader = document.getElementById('cryptoHeader');
    const cryptoContent = document.getElementById('cryptoContent');
    const copySuccess = document.getElementById('copySuccess');

    // Check if we're on Instagram
    let isOnInstagram = false;
    let currentTab = null;
    
    try {
        [currentTab] = await chrome.tabs.query({ active: true, currentWindow: true });
        isOnInstagram = currentTab && currentTab.url && currentTab.url.includes('instagram.com');
    } catch (error) {
        console.log('Could not check current tab:', error);
    }

    // Load saved state
    let isEnabled = true; // Default to enabled
    try {
        const result = await chrome.storage.sync.get(['extensionEnabled']);
        isEnabled = result.extensionEnabled !== false;
    } catch (error) {
        console.error('Error loading state:', error);
        // Set default state
        await chrome.storage.sync.set({ extensionEnabled: true }).catch(() => {});
    }
    
    updateUI(isEnabled);

    // Toggle functionality
    toggleSwitch.addEventListener('click', async () => {
        try {
            isEnabled = !isEnabled;
            
            // Save state
            await chrome.storage.sync.set({ extensionEnabled: isEnabled });
            updateUI(isEnabled);
            
            // Send message to content script if on Instagram
            if (isOnInstagram && currentTab) {
                try {
                    const response = await chrome.tabs.sendMessage(currentTab.id, { 
                        action: 'toggleExtension', 
                        enabled: isEnabled 
                    });
                    console.log('Message sent successfully:', response);
                } catch (msgError) {
                    console.log('Content script not ready (normal):', msgError.message);
                }
            }
        } catch (error) {
            console.error('Error in toggle:', error);
            // Revert state on error
            isEnabled = !isEnabled;
            updateUI(isEnabled);
        }
    });

    // Update UI based on state
    function updateUI(enabled) {
        if (enabled) {
            toggleSwitch.classList.add('active');
            toggleLabel.classList.add('active');
            toggleLabel.textContent = 'Enabled';
            statusIndicator.classList.add('active');
            
            if (isOnInstagram) {
                statusText.textContent = 'Extension is active! Instagram videos will never pause when switching tabs.';
            } else {
                statusText.textContent = 'Extension is enabled. Visit Instagram to keep videos playing in background!';
            }
        } else {
            toggleSwitch.classList.remove('active');
            toggleLabel.classList.remove('active');
            toggleLabel.textContent = 'Disabled';
            statusIndicator.classList.remove('active');
            statusText.textContent = 'Extension is disabled. Videos will pause normally when switching tabs.';
        }
    }

    // Crypto section toggle
    if (cryptoHeader && cryptoContent) {
        cryptoHeader.addEventListener('click', () => {
            const isExpanded = cryptoContent.classList.contains('expanded');
            
            if (isExpanded) {
                cryptoContent.classList.remove('expanded');
                cryptoHeader.classList.remove('expanded');
            } else {
                cryptoContent.classList.add('expanded');
                cryptoHeader.classList.add('expanded');
            }
        });
    }

    // Copy functionality for crypto addresses
    document.addEventListener('click', async (e) => {
        if (e.target.classList.contains('copy-button') || e.target.closest('.network-address')) {
            e.preventDefault();
            e.stopPropagation();
            
            const networkAddress = e.target.closest('.network-address');
            if (!networkAddress) return;
            
            const address = networkAddress.getAttribute('data-address');
            if (!address) return;
            
            try {
                await navigator.clipboard.writeText(address);
                showCopySuccess();
                
                // Visual feedback
                const copyButton = networkAddress.querySelector('.copy-button');
                if (copyButton) {
                    const originalText = copyButton.textContent;
                    copyButton.textContent = 'Copied!';
                    copyButton.style.background = '#4CAF50';
                    
                    setTimeout(() => {
                        copyButton.textContent = originalText;
                        copyButton.style.background = '';
                    }, 1500);
                }
            } catch (error) {
                console.error('Copy failed:', error);
                
                // Fallback
                const textArea = document.createElement('textarea');
                textArea.value = address;
                textArea.style.position = 'fixed';
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.select();
                
                try {
                    document.execCommand('copy');
                    showCopySuccess();
                } catch (fallbackError) {
                    alert('Copy failed. Address: ' + address);
                }
                
                document.body.removeChild(textArea);
            }
        }
    });

    // Show copy success notification
    function showCopySuccess() {
        if (copySuccess) {
            copySuccess.classList.add('show');
            setTimeout(() => {
                copySuccess.classList.remove('show');
            }, 2500);
        }
    }

    // Add hover effects
    document.querySelectorAll('.network-address').forEach(address => {
        address.addEventListener('mouseenter', () => {
            address.style.transform = 'translateY(-1px)';
        });
        
        address.addEventListener('mouseleave', () => {
            address.style.transform = 'translateY(0)';
        });
    });

    // Version badge click
    const versionBadge = document.querySelector('.version-badge');
    if (versionBadge) {
        versionBadge.addEventListener('click', () => {
            chrome.tabs.create({ 
                url: 'https://github.com/LaneZero/InstaNeverPause' 
            }).catch(() => {});
        });
    }

    console.log('✅ InstaNeverPause popup initialized successfully');
});