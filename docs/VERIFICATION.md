# Phase 1 verification

Verified on 30 October 2026 using Node.js 24.22.1 and npm 11.9.0.

## Automated checks

| Check | Result |
| --- | --- |
| `npm install` | Successful; lockfile created |
| `npm run check` | 0 errors, 0 warnings, 0 hints |
| `npm run build` | Successful static build; 7 pages generated in `dist/` |
| `npm test` | 5 tests passed, 0 failed |
| WebP decoding | All 12 image variants decoded successfully |

The five post-build checks cover route presence, noindex and metadata, unique primary headings/IDs, internal URLs and fragments, local scripts/styles/assets, responsive image references, disabled data-collection inputs, CSP-compatible external scripts, local fonts, and inactive future-concept cards.

## Browser checks

Used the managed Chromium preview and temporary same-origin responsive frames. The frames are QA-only files and are excluded from the repository and production build.

- Heritage and concept-selection page checked at 320, 390, 768, 1024 and 1440 CSS-pixel frame widths. At every size, document scroll width equalled client width (no horizontal overflow). The browser’s 15px scrollbar accounts for the difference between frame width and available content width.
- Visually inspected the desktop hero, gallery and visit section, plus mobile hero and menu section.
- Tested mobile menu opening, Escape closure, and navigation to Coffee & Kitchen. After navigation, the menu closed and focus moved to the section; its heading remained below the sticky header.
- Tested concept-selector navigation to Heritage and desktop navigation to Gallery and Visit Us.
- Confirmed all eight rendered Heritage image elements loaded after scrolling through the page.
- Confirmed the newsletter button is disabled; the input is also disabled and no form exists.
- CSS includes a reduced-motion override for all animations/transitions and smooth scrolling; an OS-level reduced-motion emulation was not performed.
- A desktop review screenshot is included in `docs/screenshots/heritage-desktop.jpg`.

## Corrections made during verification

- Fixed hero image intrinsic sizing so the desktop hero is 720px tall rather than stretching to over 1000px.
- Repaired a corrupt breakfast image and verified every image with a decoder.
- Corrected source image dimensions and descriptive alt text.
- Converted fonts to locally hosted Latin WOFF2 subsets; the complete asset directory is approximately 1.4 MiB.
- Prevented Astro from inlining JavaScript so the mobile menu is compatible with the production `script-src 'self'` header. The post-build tests enforce external script output.
- Added spacing between the large street number and street name in the address panel.

## Verification limits

No Cloudflare deployment or live edge-header test was performed. Chromium QA is not a full Safari/iOS/Android or assistive-technology audit. External Google Maps/Instagram services are ordinary outbound links and were not signed into. No opening hours, prices or official menu availability have been asserted.
