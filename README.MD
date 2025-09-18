# InstaNeverPause 🎵

![Version](https://img.shields.io/badge/version-1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-yellow.svg)
![Instagram](https://img.shields.io/badge/Instagram-Compatible-purple.svg)

A simple and effective Chrome extension that keeps Instagram videos playing when you switch tabs or minimize your browser window.

## 🌟 Features

- **🎯 Smart Video Detection**: Automatically detects and monitors Instagram videos
- **🔄 Seamless Playback**: Prevents videos from pausing when switching tabs
- **👤 User-Friendly**: Respects user actions (manual pause/play)
- **⚡ Lightweight**: Minimal resource usage and clean code
- **🎛️ Easy Toggle**: Simple on/off switch in the popup
- **📱 Instagram Focused**: Specifically designed for Instagram's video system

## 🚀 How It Works

The extension uses advanced techniques to override browser visibility detection:

- **Visibility Override**: Tricks Instagram into thinking the tab is always visible
- **Event Blocking**: Prevents pause events caused by tab switching
- **Smart Resume**: Intelligently resumes videos that were paused by the system
- **User Action Detection**: Distinguishes between user actions and system actions

## 📁 Project Structure

```
InstaNeverPause /
├── manifest.json          # Extension configuration
├── content.js             # Main logic and video monitoring
├── popup.html             # Extension popup interface
├── popup.js               # Popup functionality
├── icons/                 # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md              # This file
```

## 🛠️ Installation

### Method 1: Chrome Web Store (Recommended)
*Coming soon...*

### Method 2: Manual Installation (Developer Mode)

1. **Download the extension**:
   ```bash
   git clone https://github.com/LaneZero/InstaNeverPause.git
   ```

2. **Open Chrome Extensions page**:
   - Navigate to `chrome://extensions/`
   - Enable "Developer mode" (top right toggle)

3. **Load the extension**:
   - Click "Load unpacked"
   - Select the `instagram-video-keeper` folder

4. **Pin the extension** (optional):
   - Click the puzzle icon in Chrome toolbar
   - Pin "InstaNeverPause"

## 💻 Usage

1. **Navigate to Instagram**: Open [instagram.com](https://instagram.com)
2. **Click the extension icon**: Toggle the extension on/off
3. **Enjoy uninterrupted videos**: Videos will continue playing when you switch tabs

### Extension States

| Status | Description |
|--------|-------------|
| 🟢 **Active** | Extension is monitoring videos |
| 🔴 **Disabled** | Extension is turned off |
| 📊 **Monitoring X video(s)** | Shows number of videos being monitored |

## 🔧 Technical Details

### Core Technologies
- **Manifest V3**: Latest Chrome extension standard
- **Content Scripts**: Injected into Instagram pages
- **Storage API**: Saves user preferences
- **DOM Manipulation**: Advanced video control techniques

### Key Components

#### `content.js` - Main Engine
```javascript
// Core functionality includes:
- Video detection and monitoring
- Visibility state override
- Event blocking and management
- Smart resume logic
```

#### `popup.js` - User Interface
```javascript
// Features include:
- Settings management
- Real-time status display
- Toggle functionality
- Video count monitoring
```

#### `manifest.json` - Configuration
```json
{
  "permissions": ["storage", "activeTab"],
  "host_permissions": ["*://*.instagram.com/*"],
  "content_scripts": [...]
}
```

## 🎯 Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | Primary target |
| Edge | ✅ Full | Chromium-based |
| Firefox | ❌ No | Different extension system |
| Safari | ❌ No | Different extension system |

## 🐛 Troubleshooting

### Common Issues

**Videos still pause when switching tabs?**
- Make sure the extension is enabled (green toggle)
- Try refreshing the Instagram page
- Check if you're on instagram.com (not mobile version)

**Extension not working?**
- Reload the extension in `chrome://extensions/`
- Clear browser cache and cookies
- Make sure you're using a supported browser

**Can't find the extension icon?**
- Look for the puzzle piece icon in Chrome toolbar
- Pin the extension for easy access

## 🔄 Updates & Changelog

### Version 1.5 (Current)
- ✅ Improved video detection
- ✅ Better user action recognition
- ✅ Enhanced performance
- ✅ Cleaner code structure

### Version 1.0
- 🎉 Initial release
- ✅ Basic video pause prevention
- ✅ Simple toggle interface

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Setup

```bash
# Clone the repository
git clone https://github.com/LaneZero/instagram-video-keeper.git

# Navigate to project directory
cd instagram-video-keeper

# Load in Chrome for testing
# Go to chrome://extensions/ and load unpacked
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 LaneZero

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 👨‍💻 Author

**Coded by LaneZero**
- GitHub: [@LaneZero](https://github.com/LaneZero)
- Profile: [https://github.com/LaneZero](https://github.com/LaneZero)

## Support

If you find this project helpful, consider:

- ⭐ Starring the repository
- ☕ [Buying me a coffee](https://www.coffeete.ir/AhmadR3zA)
- 🐛 Reporting issues
- 🤝 Contributing to the codebase

<details markdown="1"> <summary> <h3> # Supported Cryptocurrencies and Networks
</h3></summary>

### Networks:

-   **Bitcoin**
    -   Network: `BTC`
    -   Address: `bc1q5tl36qpk27hf7upl8l753xa0gcm57adrvmwgkz`

## Tether (USDT)

### Networks:

-   **Tether USDT**
    
    -   Network: `TRC20`
    -   Address: `TA5pibChqS7CeHiDvfP7V3uQVMynk6SxLq`
-   **Binance Smart Chain (BEP20)**
    
    -   Network: `BSC`
    -   Address: `0x6634E26BA0e323182B7A9a89278E9a7BbCa9aF70`
-   **TRON (TRC20)**
    
    -   Network: `TRX`
    -   Address: `TA5pibChqS7CeHiDvfP7V3uQVMynk6SxLq`
-   **Polygon**
    
    -   Network: `MATIC`
    -   Address: `0x6634E26BA0e323182B7A9a89278E9a7BbCa9aF70`
-   **Solana**
    
    -   Network: `SOL`
    -   Address: `91kuBFEZAnRk8ixsuzAQnAVvtzLAsQpPFRsfe285ZKUC`
-   **Ethereum**
    
    -   Network: `Ethereum TRC20`
    -   Address: `0x6634E26BA0e323182B7A9a89278E9a7BbCa9aF70`

</details>

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Privacy

This extension:
- ✅ **Does NOT collect any personal data**
- ✅ **Does NOT track your browsing**
- ✅ **Only works on Instagram.com**
- ✅ **Stores settings locally only**
- ✅ **No external connections**

## 📊 Statistics

- **Lines of Code**: ~200
- **File Size**: < 50KB
- **Load Time**: < 100ms
- **Memory Usage**: < 5MB



---

<div align="center">

**Made with ❤️ for Instagram lovers**

[⬆ Back to Top](#instagram-video-keeper-)

</div>

