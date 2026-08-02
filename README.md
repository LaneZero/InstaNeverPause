# 🎬 InstaNeverPause

> **Keep Instagram videos playing when you switch tabs or minimize your browser.**

<p align="center">
  <strong>🚀 Lightweight&nbsp;&nbsp;•&nbsp;&nbsp;🔒 Privacy-first&nbsp;&nbsp;•&nbsp;&nbsp;⚡ Fast&nbsp;&nbsp;•&nbsp;&nbsp;🛡️ Open Source</strong>
</p>

<p align="center">
  <a href="#-chrome">
    <img alt="Google Chrome" src="https://img.shields.io/badge/Chrome-1.2-4285F4?logo=googlechrome&logoColor=white">
  </a>
  <a href="#-firefox">
    <img alt="Mozilla Firefox" src="https://img.shields.io/badge/Firefox-1.2-FF7139?logo=firefoxbrowser&logoColor=white">
  </a>
  <a href="LICENSE">
    <img alt="MIT License" src="https://img.shields.io/badge/License-MIT-2ea44f">
  </a>
  <a href="PRIVACY.md">
    <img alt="No tracking" src="https://img.shields.io/badge/Tracking-None-success">
  </a>
</p>

<p align="center">
  Available for <strong>Google Chrome</strong> and <strong>Mozilla Firefox</strong>.
</p>

**Current version:** `1.2`

---

# 🌐 Browser Support

| Browser                 | Version |    Manifest | Status                    |
| ----------------------- | ------: | ----------: | ------------------------- |
| Google Chrome           |   `1.2` | Manifest V3 | ✅ Available               |
| Mozilla Firefox Desktop |   `1.2` | Manifest V3 | ✅ Available               |
| Firefox for Android     |       — |           — | ❌ Not currently supported |

> Firefox version `1.2` requires **Firefox 140 or newer**.

---

# ✨ Features

* 🎥 Keeps active Instagram videos playing after switching tabs
* 🪟 Continues playback while Chrome or Firefox is minimized
* ⏸️ Respects videos paused manually by the user
* ⚡ Uses an event-driven architecture without continuous page scanning
* 🔄 Enables or disables protection without refreshing Instagram
* 💾 Stores only the extension preference locally
* 🔐 Requires only the `storage` named permission
* 🎯 Runs only on Instagram pages
* 🚫 Contains no tracking, analytics, telemetry, advertising, or remote code
* 🌐 Makes no automatic background network requests
* ♿ Includes an accessible and compact popup interface
* 🌓 Supports light and dark browser themes
* 📄 Open source under the MIT License

---

# 🆕 What’s New in Version 1.2

Version **1.2** is a major rewrite focused on performance, reliability, privacy, accessibility, and Instagram compatibility.

## 🎥 Playback Protection

* ✅ Replaced continuous scanning with event-driven protection
* 🛡️ Added a dedicated Main World media guard
* 🎯 Protects only connected and visible active videos
* 🪟 Improved minimized-browser playback
* ⏸️ Preserves user-initiated pauses
* 🔄 Applies setting changes without refreshing Instagram

## 📱 Instagram Compatibility

* ❌ Removed global `document.hidden` overrides
* ❌ Removed global `document.visibilityState` overrides
* ❌ Removed blocking of `visibilitychange` events
* ❌ Removed interference with focus, blur, navigation, and lifecycle events
* ✅ Fixed interference with Instagram post publishing
* ✅ Fixed the reported issue where post captions could disappear
* ✅ Preserved normal Instagram behavior while protection is disabled

## ⚡ Performance

* 🚫 Removed continuous DOM polling
* 🚫 Removed the obsolete background script or service worker
* 🚫 Removed duplicate runtime messaging
* 🚫 Removed per-video monitoring attributes and listeners
* ✅ Reduced unnecessary CPU and memory activity
* ✅ Uses browser storage as the single source of extension state

## 🔒 Privacy and Security

* 🔐 Reduced named permissions to `storage` only
* 💾 Stores preferences in local extension storage
* 🔄 Includes a one-time preference migration
* 🧱 Separates privileged extension APIs from page-level media logic
* 🚫 Contains no remote JavaScript, CSS, analytics, or tracking
* 📜 Includes updated browser-specific privacy disclosures

## 🎨 Popup

* ✨ Added a cleaner and more compact interface
* 🏷️ Displays the installed extension version automatically
* ♿ Improved keyboard and screen-reader accessibility
* 🌓 Supports light mode, dark mode, and reduced-motion preferences
* 🔗 Improved GitHub and issue-reporting links
* 💰 Added an optional project-support section
* 📋 Added explicit wallet-address copy buttons
* ⚠️ Added cryptocurrency network verification warnings

➡️ See the complete release history in [`CHANGELOG.md`](CHANGELOG.md).

---

# 📥 Installation

## 🌐 Chrome

### 🛒 Chrome Web Store

Install or update InstaNeverPause from the Chrome Web Store:

[![Available in the Chrome Web Store](https://img.shields.io/badge/Install-Chrome_Web_Store-4285F4?logo=googlechrome\&logoColor=white)](https://chromewebstore.google.com/detail/instaneverpause/hafmcdmdjpplmidckigncapilbplmkko)

### 📦 Manual Chrome Installation

1. Download `InstaNeverPause-Chrome-v1.2.zip` from the latest GitHub Release.
2. Extract the ZIP file to a permanent folder.
3. Open:

```text
chrome://extensions/
```

4. Enable **Developer mode**.
5. Select **Load unpacked**.
6. Choose the extracted extension folder.
7. Open or refresh Instagram.

> ⚠️ Do not delete the extracted folder while the extension is installed through Chrome Developer Mode.

---

## 🦊 Firefox

### 🧩 Mozilla Add-ons

Install or update InstaNeverPause from Mozilla Add-ons:

[![Get the Firefox Add-on](https://img.shields.io/badge/Install-Mozilla_Add--ons-FF7139?logo=firefoxbrowser\&logoColor=white)](https://addons.mozilla.org/firefox/addon/instaneverpause/)

### Requirements

* Firefox Desktop `140` or newer
* Firefox for Android is not currently supported

### 🧪 Temporary Firefox Installation

Temporary installation is intended for development and source-code testing.

1. Download and extract the Firefox release ZIP.
2. Open Firefox.
3. Navigate to:

```text
about:debugging#/runtime/this-firefox
```

4. Select **Load Temporary Add-on**.
5. Choose the extension’s `manifest.json`.
6. Open or refresh Instagram.

> Temporary add-ons are removed when Firefox restarts. Install the signed AMO version for normal persistent use.

---

# 🚀 Usage

1. Open Instagram in Chrome or Firefox.
2. Start playing a Reel, Feed video, or profile video manually.
3. Switch to another tab or minimize the browser.
4. The active video should continue playing.
5. Open the InstaNeverPause popup to enable or disable protection.

When protection is disabled, Instagram uses its normal playback behavior.

---

# ⚙️ How It Works

InstaNeverPause separates page-level video protection from privileged browser-extension APIs.

## 🛡️ Main-world Media Guard

File:

```text
page-guard.js
```

Responsibilities:

* Runs at `document_start`
* Detects active and visible Instagram videos
* Protects videos that were playing when the page became hidden
* Prevents only targeted programmatic pause attempts
* Uses the browser’s native media methods
* Leaves Instagram visibility APIs and events untouched
* Contains no credentials, secrets, or privileged extension APIs

The media guard does **not**:

* Override `document.hidden`
* Override `document.visibilityState`
* Block `visibilitychange`
* Block focus or blur events
* Block navigation or upload events
* Continuously scan the page

---

## 🔄 Isolated Extension Bridge

Files:

```text
storage.js
content.js
```

Responsibilities:

* Reads the locally stored enabled state
* Migrates preferences from earlier versions
* Sends only the enabled or disabled Boolean value to the media guard
* Reacts to extension setting changes
* Keeps privileged browser APIs inaccessible to Instagram page scripts

### Chrome

Uses:

```text
chrome.storage.local
```

### Firefox

Uses:

```text
browser.storage.local
```

---

## 🎛️ Popup Controller

Files:

```text
popup.html
popup.css
popup.js
```

Responsibilities:

* Displays the current protection state
* Enables or disables playback protection
* Displays the installed extension version
* Opens GitHub and issue-reporting links
* Controls the optional support panel
* Copies public wallet addresses after direct user interaction
* Displays accessible success and error messages

---

# 🔑 Permissions

InstaNeverPause requests only one named permission:

## 💾 `storage`

Used to:

* Save whether playback protection is enabled
* Restore the preference after browser restarts
* Migrate preferences from previous versions
* Store a one-time migration marker

No permission is requested for:

* Browser history
* Cookies
* Downloads
* Bookmarks
* Tabs
* Clipboard access
* Web requests
* Native messaging

## Instagram Host Access

### Chrome

```text
*://*.instagram.com/*
```

### Firefox

```text
https://*.instagram.com/*
```

Instagram access is required only to inspect HTML video playback state and prevent targeted programmatic pauses.

---

# 🔒 Privacy

**InstaNeverPause does not collect or transmit personal data.**

The extension contains:

* 🚫 No analytics
* 🚫 No tracking
* 🚫 No telemetry
* 🚫 No advertising
* 🚫 No affiliate tracking
* 🚫 No fingerprinting
* 🚫 No crash-reporting service
* 🚫 No automatic background network requests
* 🚫 No developer-controlled server or database
* 🚫 No remote executable code

The extension does not read, store, or transmit:

* 💬 Direct messages
* 📝 Post captions
* 💭 Comments
* 📷 Uploaded photos or videos
* 🎥 Viewed video content
* 🔑 Passwords or credentials
* 🎟️ Authentication tokens
* 👤 Profile information
* 🌐 Browsing history
* 📍 Location information
* 💳 Financial information

Only the enabled state and a one-time migration marker are stored locally in the browser.

➡️ Read the complete [`PRIVACY.md`](PRIVACY.md).

---

# 🦊 Mozilla Data Declaration

The Firefox Manifest explicitly declares that the extension does not collect or transmit user data:

```json
"data_collection_permissions": {
    "required": [
        "none"
    ]
}
```

The Firefox version has:

* No background script
* No remote code
* No build-time generated runtime code
* No third-party runtime libraries
* No minified or obfuscated JavaScript

---

# 📂 Project Structure

The Chrome and Firefox editions share the same general architecture:

```text
InstaNeverPause/
├── manifest.json
├── page-guard.js
├── storage.js
├── content.js
├── popup.html
├── popup.css
├── popup.js
├── icons/
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   ├── icon128.png
│   └── icon512.png
├── docs/
│   ├── CHROME_TEST_CHECKLIST.md
│   ├── FIREFOX_TEST_CHECKLIST.md
│   ├── FIREFOX_MIGRATION_TEST.md
│   ├── AMO_LISTING.md
│   └── AMO_REVIEWER_NOTES.md
├── CHANGELOG.md
├── PRIVACY.md
├── LICENSE
└── README.md
```

Some browser-specific files or icon sizes may differ between release branches.

---

# 🧪 Testing

Before each release, InstaNeverPause is tested for:

## Playback

* Reel playback after switching tabs
* Playback while the browser is minimized
* Feed and profile videos
* Video modal behavior
* Multiple consecutive Reels
* User-initiated pause preservation

## Extension State

* Enable and disable without page refresh
* Preference persistence
* Multiple open Instagram tabs
* Migration from previous versions

## Instagram Compatibility

* Post creation
* Caption preservation
* Caption editing
* Upload cancellation
* Story creation
* Comments
* Direct Messages
* Single-page navigation

## Popup

* Mouse and keyboard operation
* Screen-reader attributes
* Light and dark themes
* Reduced-motion settings
* Donation-address copying
* GitHub and issue links

---

# 🛠️ Troubleshooting

## 🎥 Videos still pause

1. Confirm that protection is enabled.
2. Start the video manually before switching tabs.
3. Refresh Instagram after updating the extension.
4. Temporarily disable other media-control extensions.
5. Confirm that you are using a supported browser version.
6. Check the Instagram Console for errors.

## 🪟 Popup does not update

1. Reload the extension.
2. Close and reopen the popup.
3. Refresh existing Instagram tabs.
4. Confirm that browser storage is available.
5. Check the extension Console for errors.

## 🦊 Firefox does not install the extension

Confirm that:

* Firefox is version `140` or newer
* You are using Firefox Desktop
* `manifest.json` is at the root of the package
* The extension package is not inside another parent directory
* All referenced icon files exist

## 🔄 Settings changed after updating

The extension includes a one-time preference migration.

For a normal store update, the previous enabled or disabled state should be preserved automatically.

---

# 🐞 Report a Bug

Use the GitHub issue tracker:

[![Report an Issue](https://img.shields.io/badge/Report-GitHub_Issue-24292f?logo=github\&logoColor=white)](https://github.com/LaneZero/InstaNeverPause/issues)

Please include:

* 🌐 Browser name and version
* 💻 Operating system
* 📄 Instagram page type
* 🔁 Exact reproduction steps
* 🧩 Other installed media extensions
* 📋 Relevant Console errors
* 🎛️ Whether protection was enabled or disabled

Do not include passwords, authentication tokens, private messages, unpublished captions, or other sensitive information.

---

# 🤝 Contributing

Contributions and technical reviews are welcome.

1. 🍴 Fork the repository.
2. 🌿 Create a focused branch.
3. 💻 Make one logical change at a time.
4. 🔒 Avoid adding unnecessary permissions or remote code.
5. 🧪 Test the relevant browser edition.
6. ✅ Commit with a descriptive message.
7. 🚀 Open a Pull Request explaining the change and testing performed.

Example:

```bash
git switch -c fix/short-description
```

Keep runtime code readable, unminified, unbundled, and reviewable.

---

# ❤️ Support the Project

InstaNeverPause is free, open source, independent, and contains no advertising or tracking.

Optional contributions support:

* 🔧 Extension maintenance
* 🧪 Chrome compatibility testing
* 🦊 Firefox compatibility testing
* 🐞 Bug fixes
* ♿ Accessibility improvements
* 📚 Documentation
* 🛡️ Chrome Web Store and Mozilla Add-ons maintenance

## ₿ Bitcoin

**Network:** Bitcoin

```text
bc1q5tl36qpk27hf7upl8l753xa0gcm57adrvmwgkz
```

## 💵 Tether

**Network:** TRON / TRC20

```text
TA5pibChqS7CeHiDvfP7V3uQVMynk6SxLq
```

## 🟣 EVM Networks

**Supported networks:**

* Ethereum
* BNB Smart Chain
* Polygon

```text
0x6634E26BA0e323182B7A9a89278E9a7BbCa9aF70
```

## ☀️ Solana

**Network:** Solana

```text
91kuBFEZAnRk8ixsuzAQnAVvtzLAsQpPFRsfe285ZKUC
```

> ⚠️ Always verify the complete wallet address and blockchain network before transferring cryptocurrency. Cryptocurrency transactions generally cannot be reversed.

The extension does not connect to wallets, process payments, initiate transfers, monitor transactions, or collect financial information.

---

# 📦 Releases

Browser-specific packages are published through GitHub Releases.

Expected package names:

```text
InstaNeverPause-Chrome-v1.2.zip
InstaNeverPause-Chrome-v1.2.zip.sha256

InstaNeverPause-Firefox-v1.2.zip
InstaNeverPause-Firefox-v1.2.zip.sha256
```

SHA-256 files can be used to verify that downloaded packages have not changed.

---

# ⚠️ Disclaimer

InstaNeverPause is an independent open-source project.

It is not affiliated with, endorsed by, sponsored by, or officially connected to Instagram or Meta Platforms, Inc.

Instagram, Chrome, and Firefox may change their behavior at any time, which can temporarily affect extension compatibility.

---

# 📄 License

InstaNeverPause is licensed under the [`MIT License`](LICENSE).

---

# 👨‍💻 Author

Developed by **[LaneZero](https://github.com/LaneZero)**.

* 🌐 Repository: [LaneZero/InstaNeverPause](https://github.com/LaneZero/InstaNeverPause)
* 🐞 Issues: [GitHub Issue Tracker](https://github.com/LaneZero/InstaNeverPause/issues)
* 🛒 Chrome: [Chrome Web Store](https://chromewebstore.google.com/detail/instaneverpause/hafmcdmdjpplmidckigncapilbplmkko)
* 🦊 Firefox: [Mozilla Add-ons](https://addons.mozilla.org/firefox/addon/instaneverpause/)

<p align="center">
  <strong>⭐ If InstaNeverPause helps you, consider starring the repository.</strong>
</p>
