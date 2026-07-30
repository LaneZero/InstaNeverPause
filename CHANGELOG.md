# Changelog

All notable changes to **InstaNeverPause** are documented in this file.

This project follows the principles of [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and uses semantic versioning where applicable.

## [Unreleased]

### Planned

* Prepare the Firefox 1.2 release.
* Add automated linting and package validation.
* Add reproducible release packaging.
* Add GitHub Actions for automated checks.

## [1.2] - 2026-07-30

### Added

* Added `page-guard.js` to protect active Instagram video playback from the page's main JavaScript context.
* Added a lightweight bridge between Chrome's isolated extension context and Instagram's page context.
* Added `storage.js` for centralized preference management.
* Added a one-time migration from `chrome.storage.sync` to `chrome.storage.local`.
* Added a compact and accessible popup interface.
* Added automatic popup version display from the installed manifest.
* Added keyboard support for popup controls.
* Added screen-reader attributes and accessible status messages.
* Added explicit donation-address copy buttons.
* Added accessible clipboard notifications.
* Added a cryptocurrency network verification warning.
* Added a Chrome manual testing checklist.
* Added repository cleanup rules through `.gitignore`.

### Changed

* Reworked background playback handling to protect only active and visible Instagram videos.
* Replaced continuous video scanning with event-driven playback protection.
* Changed extension preference storage from `chrome.storage.sync` to `chrome.storage.local`.
* Preserved existing user preferences through a one-time storage migration.
* Simplified extension state synchronization by using Chrome Storage as the single source of truth.
* Changed the content scripts to run at `document_start`.
* Separated page-level video protection from extension storage access.
* Improved enable and disable behavior without requiring an Instagram page refresh.
* Redesigned the Chrome popup with a smaller and lighter interface.
* Moved popup styling from inline HTML to `popup.css`.
* Improved popup keyboard navigation and screen-reader compatibility.
* Improved clipboard handling with a fallback for older browser environments.
* Consolidated Ethereum, BNB Chain, and Polygon donations into one EVM-compatible entry.
* Improved project-support messaging and GitHub navigation.
* Updated the Privacy Policy to match the extension's actual permissions and storage behavior.
* Limited the extension's behavior to Instagram video playback instead of modifying document-wide browser APIs.

### Fixed

* Fixed Instagram videos stopping after switching browser tabs.
* Fixed Instagram videos stopping when Chrome was minimized.
* Fixed the reported Instagram publishing regression that could cause post captions to disappear.
* Fixed conflicts with Instagram's native `visibilitychange` event handlers.
* Fixed unreliable user-pause detection based on media event targets and trusted-event assumptions.
* Fixed extension disabling behavior that previously left monitoring logic active.
* Fixed duplicate state updates caused by overlapping message and storage listeners.
* Fixed unnecessary repeated video scans while Instagram was idle.
* Fixed inconsistent extension state across multiple open Instagram tabs.
* Fixed preference persistence during migration from earlier releases.
* Fixed popup state updates that previously depended on direct tab messaging.

### Removed

* Removed the global override of `document.hidden`.
* Removed the global override of `document.visibilityState`.
* Removed the use of `stopImmediatePropagation()` on Instagram visibility events.
* Removed continuous `setInterval()` video scanning.
* Removed the redundant Manifest V3 background service worker.
* Removed direct popup-to-tab message broadcasting.
* Removed redundant runtime message handlers from the content script.
* Removed automatic opening of the GitHub repository after installation.
* Removed the unused `activeTab` permission.
* Removed the unused `scripting` permission.
* Removed unnecessary `host_permissions`.
* Removed unused `web_accessible_resources`.
* Removed the legacy synced preference after successful local migration.
* Removed duplicated donation entries for compatible EVM networks.
* Removed unnecessary popup animations and decorative complexity.

### Security

* Reduced the extension permissions to `storage` only.
* Kept Chrome Storage access inside the isolated extension environment.
* Limited main-world execution to targeted video playback protection.
* Added origin and message-source validation between extension contexts.
* Prevented extension storage APIs from being exposed directly to Instagram page scripts.
* Removed unnecessary permissions and background execution.
* Confirmed that no remote scripts, stylesheets, analytics, or tracking services are used.
* Confirmed that the extension does not collect Instagram captions, messages, credentials, media, profile information, or authentication data.
* Added clear warnings requiring users to verify cryptocurrency addresses and networks before sending funds.

### Privacy

* Migrated extension preferences to local browser storage.
* Updated documentation to explain the one-time migration from synced storage.
* Clarified that the extension does not send background network requests.
* Clarified that donation links and addresses are accessed only through direct user interaction.
* Clarified that the extension does not process payments or track cryptocurrency transactions.

## [1.0.0]

### Added

* Initial Chrome extension release.
* Background playback support for Instagram videos.
* Automatic video resume behavior after switching tabs.
* Enable and disable control through the extension popup.
* Persistent extension preferences using Chrome Storage.
* Basic popup interface.
* Cryptocurrency donation information.
* GitHub project link.
* Initial Privacy Policy.
* MIT License.
