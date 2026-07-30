# Privacy Policy

**Last updated: July 30, 2026**

InstaNeverPause is designed to operate entirely inside the user's browser while collecting the minimum amount of information necessary for its core functionality.

## Data Collection

InstaNeverPause does not collect, transmit, sell, share, or analyze personal data.

The extension does not use:

* Analytics
* Telemetry
* Tracking scripts
* Advertising identifiers
* Remote logging
* External APIs
* User accounts
* Behavioral profiling

## Locally Stored Settings

InstaNeverPause stores only the following values in `chrome.storage.local`:

* Whether the extension is enabled or disabled
* Whether the previous storage format has been migrated

These settings remain inside the user's local Chrome profile.

When upgrading from an earlier version, InstaNeverPause may perform a one-time migration by:

1. Reading the previous enabled or disabled preference from `chrome.storage.sync`
2. Copying that preference to `chrome.storage.local`
3. Removing the legacy value from `chrome.storage.sync`

No Instagram data or personal information is involved in this migration.

## Instagram Access

The extension runs only on pages matching:

```text
*://*.instagram.com/*
```

InstaNeverPause does not read, store, modify, or transmit:

* Instagram messages
* Post captions
* Comments
* Uploaded media
* Photos or videos
* Account credentials
* Profile information
* Browsing history
* Followers or following lists
* Authentication tokens

The extension interacts only with Instagram video playback behavior to prevent active videos from being programmatically paused when the user switches tabs or minimizes Chrome.

The extension does not block Instagram's visibility events and does not interfere with post publishing, caption submission, messaging, or account management features.

## Network Requests

InstaNeverPause does not send background network requests.

The extension does not communicate with external servers and does not upload extension activity or browser data.

Project, support, and donation links are opened only after a direct action by the user.

## Permissions

InstaNeverPause requests only the following Chrome permission:

### `storage`

This permission is used exclusively to:

* Save whether the extension is enabled or disabled
* Migrate the previous setting to local storage
* Preserve the user's preference after restarting Chrome

No other browser permissions are requested.

## Donation Information

Donation addresses and project-support links may be displayed inside the extension popup.

InstaNeverPause does not:

* Process payments
* Connect to cryptocurrency wallets
* Track donations
* Collect financial information
* Confirm or record transactions

Opening a donation link or copying a donation address requires a direct action by the user.

## Third-Party Services

InstaNeverPause does not integrate with third-party analytics, advertising, tracking, or data-processing services.

Instagram is a third-party platform owned by Meta Platforms, Inc. InstaNeverPause is an independent open-source project and is not affiliated with, endorsed by, or sponsored by Instagram or Meta.

## Data Retention

Because InstaNeverPause does not collect personal data, it does not maintain a remote data-retention system.

Local extension settings remain in the user's Chrome profile until:

* The user changes them
* The extension storage is cleared
* The extension is removed
* The Chrome profile is deleted

## Open-Source Transparency

The complete source code of InstaNeverPause is publicly available on GitHub and may be independently reviewed.

Repository:

```text
https://github.com/LaneZero/InstaNeverPause
```

## Changes to This Policy

This Privacy Policy may be updated when the extension's functionality, permissions, or storage behavior changes.

Material privacy-related changes will be documented in the repository and release notes.

## Contact

For privacy questions, security reports, or concerns, open an issue in the GitHub repository:

```text
https://github.com/LaneZero/InstaNeverPause/issues
```
