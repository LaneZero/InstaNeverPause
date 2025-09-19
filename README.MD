# 🎵 InstaNeverPause

**Keep Instagram videos playing when you switch tabs or minimize your browser!**

InstaNeverPause is a lightweight Chrome extension that prevents Instagram videos from pausing when you switch tabs, minimize your browser, or lose focus. Perfect for multitasking while enjoying your favorite Instagram content.

## ✨ Features

- 🎬 **Never Pause**: Instagram videos continue playing in background
- 🔄 **Smart Detection**: Respects user-initiated pauses
- ⚡ **Lightweight**: Minimal resource usage
- 🎯 **Instagram Only**: Works specifically on Instagram.com
- 🔧 **Easy Toggle**: Simple on/off switch in popup
- 🎨 **Modern UI**: Clean and intuitive interface

## 🚀 Installation

### Method 1: Chrome Web Store (Coming Soon)
*Extension will be available on Chrome Web Store soon*

### Method 2: Manual Installation (Developer Mode)

1. **Download the extension:**
   ```bash
   git clone https://github.com/LaneZero/InstaNeverPause.git
   ```

2. **Open Chrome Extensions:**
   - Go to `chrome://extensions/`
   - Enable "Developer mode" (top right toggle)

3. **Load the extension:**
   - Click "Load unpacked"
   - Select the `InstaNeverPause` folder

4. **Start using:**
   - Visit Instagram.com
   - Click the extension icon to toggle on/off

## 📁 File Structure

```
InstaNeverPause/
├── manifest.json          # Extension configuration
├── content.js            # Main script that handles video behavior
├── popup.html           # Extension popup interface
├── popup.js            # Popup functionality
├── popup.css          # Popup styling
├── icons/            # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md        # This file
```

## 🔧 How It Works

InstaNeverPause uses advanced browser API manipulation to:

1. **Override Visibility Detection**: Tricks Instagram into thinking the tab is always visible
2. **Smart Video Monitoring**: Continuously monitors video elements on the page
3. **Intelligent Resume**: Automatically resumes videos that were paused by tab switching
4. **User Respect**: Detects and respects user-initiated pauses

### Technical Details

- **Visibility Override**: Modifies `document.hidden` and `document.visibilityState` properties
- **Event Blocking**: Prevents `visibilitychange` events from reaching Instagram
- **Smart Detection**: Distinguishes between user pauses and automatic pauses
- **Viewport Checking**: Only resumes videos that are currently visible

## 🎮 Usage

1. **Install the extension** (see installation instructions above)
2. **Visit Instagram.com**
3. **Start watching a video**
4. **Switch tabs or minimize browser** - video keeps playing!
5. **Use the popup** to toggle the extension on/off anytime

### Extension States

- **🟢 Enabled**: Videos will never pause when switching tabs
- **🔴 Disabled**: Videos behave normally (pause when tab loses focus)

## ⚙️ Configuration

The extension works out of the box with no configuration needed. However, you can:

- **Toggle on/off**: Click the extension icon and use the switch
- **Check status**: View current state and monitored videos count
- **Debug mode**: Check browser console for detailed logs

## 🐛 Troubleshooting

### Extension not working?

1. **Refresh Instagram**: Reload the Instagram page
2. **Check if enabled**: Click extension icon and ensure it's toggled ON
3. **Try different video**: Some videos might have specific restrictions
4. **Check console**: Open Developer Tools → Console for error messages

### Videos still pausing?

1. **Verify Instagram domain**: Extension only works on `instagram.com`
2. **Check browser permissions**: Ensure extension has necessary permissions
3. **Disable other extensions**: Other extensions might interfere
4. **Clear browser cache**: Sometimes helps with conflicting scripts

### Performance issues?

1. **Close unused tabs**: Reduces overall browser load
2. **Check system resources**: Ensure adequate RAM/CPU available
3. **Update Chrome**: Use latest Chrome version for best performance

## 🔒 Privacy & Permissions

InstaNeverPause respects your privacy:

- **No data collection**: Extension doesn't collect or store personal data
- **Local storage only**: Settings saved locally in your browser
- **Instagram only**: Only activates on Instagram.com
- **No network requests**: Doesn't send data to external servers

### Required Permissions

- **Active Tab**: To detect when you're on Instagram
- **Storage**: To save your on/off preferences
- **Host Permission**: Access to Instagram.com only

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Setup

```bash
# Clone the repository
git clone https://github.com/LaneZero/InstaNeverPause.git

# Navigate to directory
cd InstaNeverPause

# Load in Chrome (Developer Mode)
# Go to chrome://extensions/
# Enable Developer Mode
# Click "Load unpacked" and select the folder
```

## 📝 Changelog

### Version 1.0.0
- ✅ Initial release
- ✅ Basic video pause prevention
- ✅ Smart user pause detection
- ✅ Modern popup interface
- ✅ Cryptocurrency support section

## 🆘 Support

Need help? Here are your options:

- **GitHub Issues**: [Report bugs or request features](https://github.com/LaneZero/InstaNeverPause/issues)
- **Email**: Contact developer for support
- **Documentation**: Check this README for common solutions

## 💝 Support Development

If you find InstaNeverPause useful, consider supporting its development:

### Supported Cryptocurrencies

**Bitcoin (BTC)**
- Network: Bitcoin
- Address: `bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh`

**Tether (USDT)**
- Network: Ethereum (ERC20)
- Address: `0x8b99F3660622e21f2910ECCA7fBe51d654a1517D`

- Network: Binance Smart Chain (BEP20)
- Address: `0x8b99F3660622e21f2910ECCA7fBe51d654a1517D`

- Network: Tron (TRC20)
- Address: `TGCVbSSJbwfV5stNjuXpAVLcdxUQo1KfNL`

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Coded by LaneZero**
- GitHub: [https://github.com/LaneZero](https://github.com/LaneZero)
- Project: [https://github.com/LaneZero/InstaNeverPause](https://github.com/LaneZero/InstaNeverPause)

---

## 🔍 Keywords

Chrome Extension, Instagram, Video Player, Background Play, Tab Switching, Browser Extension, JavaScript, Social Media, Video Streaming, Multitasking

---

**⭐ If you like this extension, please give it a star on GitHub! ⭐**

Made with ❤️ for the Instagram community