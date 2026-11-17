# Alcove

Keep your favorite web apps beside your browser tabs.

Alcove is a small Chrome Side Panel extension built with WXT, Svelte, and Skeleton. Register HTTPS pages and switch between them without reloading pages you have already opened. No account or companion server is required.

## Features

- Up to 20 pages, with optional names that fall back to the URL host.
- A compact footer selector, with drag-and-drop and keyboard reordering in settings.
- Lazy loading and retained page state while the panel document remains open.
- Reload only the selected page, or open its resolved URL in a browser tab.
- Optional `{nonce}` URL templates, replaced with a fresh random 128-bit hexadecimal value on first load or explicit reload.
- One-click blackout and double-click reveal for screen sharing, with state shared between panels.
- English and Japanese controls, following browser language by default.

## Install a development build

Alcove is **not yet published on the Chrome Web Store**. Download a ZIP from [GitHub Releases](https://github.com/hatappo/alcove/releases), extract it into a permanent directory, and load that directory using **Load unpacked** in `chrome://extensions` with Developer mode enabled.

Alternatively, build from source with Node.js 26.13.1 or newer in the 26.x series and npm 12.2.2 or newer:

```sh
npm ci
npm run build
```

Load `extension/.output/chrome-mv3` as an unpacked extension. Open Alcove with its toolbar icon, add a page URL in settings, and save. For development, run `npm run dev`. To package a ZIP, run `npm run zip`.

After a build, reload the extension in `chrome://extensions`. An unpacked extension's ID can change when its directory changes. Settings belong to that ID and are not automatically transferred to a new ID. Keep the old installation until you have copied its page URLs and checked the new one. Sites using an extension-ID allowlist will need the new ID shown in Alcove settings.

## Page behavior

Pages load on first selection and remain mounted when switching or opening settings. Renaming and reordering keep the document; changing a URL or deleting a page discards only that page's document. Reload creates a new document for the selected page.

Chrome can destroy the panel document when closing the panel. Reopening then reloads the selected page. Hidden pages are inert but their scripts and network activity may continue, subject to browser throttling. Alcove is not an always-on notification service.

Names can be blank; the URL host is displayed without fetching page titles. Drag the grip to reorder pages, or focus it and press Up/Down. Save to apply changes. Clicking an extension ID selects it for copying. URL fields wrap to show their full contents.

`{nonce}` is optional and may appear in the URL path, query, or fragment, but not the hostname. All occurrences use the same value for that page load. Switching back to a retained page keeps its nonce. Percent-encoded `%7Bnonce%7D` is accepted. **Open tab** opens the resolved URL, including its registered parameters.

## Privacy and limits

- Only HTTPS URLs without embedded usernames or passwords are accepted. Do not put secrets in page URLs.
- Sites can block embedding with CSP or `X-Frame-Options`. Alcove does not bypass these policies, alter response headers, or inject content scripts.
- Chrome internal pages such as `chrome://extensions/` cannot be embedded. Open them in a regular tab.
- Some sites require signing in in a regular tab first, and organization policies may prevent embedding altogether.
- Permissions are `sidePanel` and `storage`. The existing host permissions for `script.google.com` and `*.googleusercontent.com` are retained for embedded Google authentication/storage behavior; general HTTPS sites do not receive broad host access.
- Iframe sandbox permissions allow scripts, same-origin behavior, forms, downloads, and external popups, but not arbitrary top-level navigation.
- Settings are stored in `chrome.storage.local`. Blackout uses `chrome.storage.session`: it survives panel closure but clears on browser restart or extension reload/update.
- Blackout hides content and disables interaction; it does not log out of sites or stop their network requests. Chrome's own side-panel header is outside the extension's control.
- Alcove has no analytics, backend, page-content scraping, or site-specific readiness protocol.

## Development

```sh
npm run check
npx playwright install chromium
npm run test:browser
```

Tests use mocked HTTPS pages and do not verify real site sign-in. Check site-specific embedding in Chrome before relying on it. Generated `.wxt` and `.output` directories are not committed. No sibling repository is needed to install, build, or test Alcove.

Tags must match `package.json`. Pushing a `v*` tag publishes a development ZIP on GitHub Releases; it does not upload to the Chrome Web Store. Release history is recorded in [CHANGELOG.md](CHANGELOG.md).

## License

MIT. Alcove was extracted from [gas-portal](https://github.com/hatappo/gas-portal), retaining the original license and the initial P artwork. See [NOTICE](NOTICE) for icon and font attribution.
