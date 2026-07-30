# Changelog

All notable changes to **InstaNeverPause** will be documented in this file.

This project follows the principles of [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and uses semantic versioning where applicable.

## [Unreleased]

### Added

* Added a dedicated `page-guard.js` script that runs in Instagram's main JavaScript context.
* Added a lightweight communication bridge between the isolated extension context and the Instagram page context.
* Added a shared `storage.js` module for centralized preference management.
* Added a one-time migration process from `chrome.storage.sync` to `chrome.storage.local`.
* Added keyboard support and accessibility attributes to interactive popup controls.
* Added a Chrome manual testing checklist for installation, playback, publishing, performance, and release validation.
* Added repository hygiene rules through `.gitignore`.
* Added a compact, accessible donation panel with explicit copy controls.
* Added accessible clipboard status notifications.
* Added automatic popup version display from the installed manifest.
* Added a donation network verification warning.

### Changed

* Reworked background playback handling to target only active Instagram video elements.
* Replaced continuous one-second DOM polling with event-driven playback protection.
* Changed extension settings storage from `chrome.storage.sync` to `chrome.storage.local`.
* Simplified extension state synchronization to use Chrome Storage as the single source of truth.
* Updated the content script to run at `document_start`.
* Separated Instagram page-level playback protection from extension storage access.
* Improved enabled and disabled state handling without requiring Instagram tabs to be refreshed.
* Improved popup keyboard navigation and screen-reader compatibility.
* Improved clipboard handling with a fallback for older browser environments.
* Updated the privacy policy to accurately describe permissions, local storage, migration behavior, Instagram access, donation information, and network activity.
* Reduced unnecessary communication between the popup, background worker, and content scripts.
* Limited extension behavior to Instagram video playback instead of modifying document-wide browser APIs.
* Redesigned the Chrome popup with a smaller and lighter interface.
* Moved popup styles from inline HTML into a dedicated `popup.css` file.
* Consolidated Ethereum, BNB Chain, and Polygon into one EVM donation entry.
* Simplified project support links and popup interactions.

### Fixed

* Fixed an issue where Instagram videos stopped playing after switching tabs or minimizing Chrome.
* Fixed the reported Instagram publishing regression that could cause post captions to disappear while the extension was enabled.
* Fixed unreliable user-pause detection based on media event trust and event targets.
* Fixed incomplete extension disabling behavior that previously left monitoring logic active.
* Fixed duplicate state updates caused by multiple message and storage listeners.
* Fixed unnecessary repeated video scans while Instagram was idle.
* Fixed potential conflicts with Instagram's native `visibilitychange` event handlers.
* Fixed inconsistent popup state when multiple Instagram tabs were open.
* Fixed extension state persistence during migration from previous releases.

### Removed

* Removed the global override of `document.hidden`.
* Removed the global override of `document.visibilityState`.
* Removed the use of `stopImmediatePropagation()` on Instagram visibility events.
* Removed continuous `setInterval()` video scanning.
* Removed the redundant Manifest V3 background service worker.
* Removed direct popup-to-tab message broadcasting.
* Removed redundant runtime message handlers from the content script.
* Removed the unused `activeTab` permission.
* Removed the unused `scripting` permission.
* Removed unnecessary host permission declarations.
* Removed unused `web_accessible_resources` entries.
* Removed automatic opening of the GitHub repository after installation.
* Removed the legacy synced preference after successful local migration.

### Security

* Reduced the extension to the minimum required Chrome permission: `storage`.
* Kept storage access inside Chrome's isolated extension environment.
* Limited main-world execution to targeted media playback protection.
* Added origin and message-source validation for communication between extension contexts.
* Prevented extension settings and internal APIs from being exposed directly to Instagram page scripts.
* Confirmed that the extension does not collect analytics, telemetry, credentials, captions, messages, media, or account information.

### Planned


* Display the final `1.2` version consistently across the popup, manifest, README, and release package.
* Add automated linting and package validation.
* Add a reproducible Chrome release packaging script.
* Complete the full Chrome release checklist.
* Prepare the equivalent Firefox `1.2` release after the Chrome version is finalized.

## [1.0.0]

### Added

* Initial Chrome extension release.
* Background playback support for Instagram videos.
* Automatic video resume behavior after switching tabs.
* Enable and disable control through the extension popup.
* Persistent extension preference using Chrome Storage.
* Basic popup interface.
* Cryptocurrency donation information.
* GitHub project link.
* MIT License.
* Initial privacy policy and project documentation.
