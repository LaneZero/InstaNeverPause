# Chrome Manual Test Checklist

This checklist must be completed before releasing InstaNeverPause 1.2.

## Test environment

- Chrome version:
- Operating system:
- Extension commit:
- Test date:

## Installation

- [ ] Extension loads through `chrome://extensions`.
- [ ] Chrome reports no manifest errors.
- [ ] Chrome reports no service worker errors.
- [ ] Instagram loads without console errors caused by the extension.

## Extension state

- [ ] Extension is enabled by default after installation.
- [ ] Popup correctly displays the current state.
- [ ] Turning the extension off takes effect without reloading Instagram.
- [ ] Turning the extension on takes effect without reloading Instagram.
- [ ] State persists after restarting Chrome.

## Video playback

- [ ] A playing Reel continues after switching tabs.
- [ ] A playing Reel continues after minimizing Chrome.
- [ ] A playing Feed video continues after switching tabs.
- [ ] A video paused manually by the user remains paused.
- [ ] Muted and unmuted states are preserved.
- [ ] Video playback position is preserved.
- [ ] Navigating between Reels does not create duplicate handlers.
- [ ] Opening multiple Instagram tabs does not cause conflicts.

## Instagram publishing regression

- [ ] Create a post with a caption while the extension is enabled.
- [ ] Switch tabs during the publishing workflow.
- [ ] Publish the post and confirm that the caption remains intact.
- [ ] Create a post without switching tabs.
- [ ] Edit an existing post caption.
- [ ] Create a Story while the extension is enabled.
- [ ] Upload cancellation works normally.

## Instagram navigation

- [ ] Home feed works normally.
- [ ] Reels navigation works normally.
- [ ] Direct Messages work normally.
- [ ] Notifications work normally.
- [ ] Profile editing works normally.
- [ ] Instagram SPA navigation does not require a page reload.

## Performance

- [ ] No repeated extension errors appear in DevTools.
- [ ] No excessive console logging occurs.
- [ ] No continuous DOM scanning occurs while the page is idle.
- [ ] Disabling the extension stops all monitoring activity.
- [ ] No noticeable increase in idle CPU usage.

## Release checks

- [ ] Manifest version is `1.2`.
- [ ] Only required permissions remain.
- [ ] README contains the complete 1.2 changes.
- [ ] CHANGELOG contains the final 1.2 release notes.
- [ ] Donation links and wallet addresses are verified.
- [ ] Release ZIP contains no development or secret files.
