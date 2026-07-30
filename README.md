# 🎬 InstaNeverPause

> **Keep Instagram videos playing when you switch tabs or minimize Chrome.**

<p align="center">
  <strong>🚀 Lightweight • 🔒 Privacy-first • ⚡ Fast • 🛡️ Open Source</strong>
</p>

**Current Version:** `1.2`

---

# ✨ Features

- 🎥 Keep Instagram videos playing after switching tabs
- 🪟 Continue playback while Chrome is minimized
- ⏸️ Respect videos paused manually by the user
- ⚡ Event-driven architecture (no continuous page scanning)
- 🔄 Enable or disable instantly without refreshing Instagram
- 💾 Store preferences locally in your browser
- 🔐 Requires only the `storage` permission
- 🚫 No tracking, analytics, telemetry, advertising, or remote code
- ♿ Accessible and compact popup interface
- 📄 MIT Licensed & Open Source

---

# 🆕 What's New in v1.2

Version **1.2** is a major internal rewrite focused on:

- 🚀 Better performance
- 🔒 Stronger privacy
- 🛡️ Improved reliability
- ✅ Better Instagram compatibility

## 🎥 Playback

- ✅ Event-driven playback protection
- 🛡️ Dedicated Main World Media Guard
- 🎯 Protection only for active videos
- 🪟 Better support for minimized Chrome
- ⏸️ Manual pauses remain untouched

## 📱 Instagram Compatibility

- ❌ Removed global `document.hidden` overrides
- ❌ Removed `visibilityState` overrides
- ✅ Instagram publishing works correctly
- ✅ Fixed disappearing captions after publishing

## ⚡ Performance

- 🚫 Removed continuous DOM polling
- 🚫 Removed background Service Worker
- 🚫 Removed duplicate messaging
- ✅ Lower CPU usage
- ✅ Instant enable/disable without page reload

## 🔒 Privacy

- 🔐 Only `storage` permission required
- 💾 Migrated to `chrome.storage.local`
- 🔄 Automatic one-time migration
- 📜 Updated Privacy Policy
- 🚫 GitHub no longer opens automatically after installation

## 🎨 Popup

- ✨ Cleaner interface
- 🏷️ Automatic version display
- ♿ Better accessibility
- 🔗 Improved GitHub & Issue links
- 💰 Redesigned donation section

➡️ **See the full release history in [`CHANGELOG.md`](CHANGELOG.md).**

---

# 📥 Installation

## 🛒 Chrome Web Store

Install or update **InstaNeverPause** directly from the Chrome Web Store when version **1.2** becomes available.

## 📦 Manual Installation

1. Download the latest Release ZIP.
2. Extract it.
3. Open:

```text
chrome://extensions/
```

4. Enable **Developer Mode**
5. Click **Load unpacked**
6. Select the extracted folder
7. Refresh Instagram

> ⚠️ Do **not** delete the extracted folder while using Developer Mode.

---

# 🚀 Usage

1. Open Instagram
2. Play any Reel or Feed video
3. Switch tabs or minimize Chrome
4. 🎉 Playback continues
5. Use the popup anytime to enable or disable protection

---

# ⚙️ How It Works

## 🛡️ Main-world Media Guard

`page-guard.js`

✅ Detects active videos

✅ Blocks only targeted programmatic pauses

✅ Leaves Instagram visibility APIs untouched

---

## 🔄 Extension Bridge

`storage.js` + `content.js`

- 💾 Reads local settings
- 🔄 Migrates old settings
- 📡 Communicates only ON/OFF state
- 🔒 Keeps Chrome APIs isolated

---

# 🔑 Permissions

Only one permission is required:

## 💾 storage

Used to:

- Save extension state
- Restore state after restart
- Migrate previous preferences

Runs only on:

```text
*://*.instagram.com/*
```

---

# 🔒 Privacy

**InstaNeverPause never collects personal data.**

🚫 No analytics

🚫 No tracking

🚫 No telemetry

🚫 No advertising

🚫 No background network requests

Never reads:

- 💬 Messages
- 📝 Captions
- 💭 Comments
- 📷 Uploaded media
- 🔑 Credentials
- 🎟️ Tokens
- 👤 Profile information
- 🌐 Browsing history

➡️ See [`PRIVACY.md`](PRIVACY.md)

---

# 📂 Project Structure

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
├── docs/
├── CHANGELOG.md
├── PRIVACY.md
├── LICENSE
└── README.md
```

---

# 🛠 Troubleshooting

## 🎥 Videos still pause

- ✅ Extension enabled?
- 🔄 Refresh Instagram
- ▶️ Start playback manually
- 🧩 Disable conflicting extensions
- 🖥️ Check DevTools Console

## 🪟 Popup doesn't update

- Reload extension
- Close Instagram tabs
- Open Instagram again

---

# 🐞 Report a Bug

Please include:

- 🌐 Chrome version
- 💻 Operating system
- 📄 Instagram page type
- 🔁 Reproduction steps
- 🧩 Other installed extensions
- 📋 Console errors

---

# 🤝 Contributing

Contributions are welcome!

1. 🍴 Fork
2. 🌿 Create a branch
3. 💻 Make changes
4. 🧪 Test
5. ✅ Commit
6. 🚀 Open a Pull Request

---

# ❤️ Support the Project

Supporting the project helps fund:

- 🔧 Maintenance
- 🧪 Chrome testing
- 🦊 Firefox support
- 🐞 Bug fixes
- 📚 Documentation

## ₿ Bitcoin

```text
bc1q...
```

## 💵 USDT (TRC20)

```text
TA5...
```

## 🟣 Ethereum / Polygon / BNB

```text
0x663...
```

## ☀️ Solana

```text
91ku...
```

> ⚠️ Always verify both the wallet address and blockchain network before sending cryptocurrency.

---

# ⚠️ Disclaimer

This project is **independent** and is **not affiliated with Instagram or Meta Platforms, Inc.**

---

# 📄 License

Licensed under the **MIT License**.

---

# 👨‍💻 Author

**LaneZero**

⭐ If this project helps you, consider **starring the repository**.