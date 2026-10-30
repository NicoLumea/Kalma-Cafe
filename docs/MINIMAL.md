# Kalma Minimal — implementation and verification

## Baseline and scope

Built on main `7a00703ecbeb281a2d629dff674f886ac6b2b12c`, after GitHub confirmed PR #2 merged. Branch: `feature/kalma-minimal`. This is an independent design demonstration, not an official Kalma business website.

The complete `/minimal/` homepage contains a separate navigation, oversized editorial hero, typography-led philosophy, photographic Guatemalan coffee section, menu list, architectural gallery, Berlin visit section, disabled newsletter demonstration and footer. Forest green and cream use the existing tokens. Instrument Serif and DM Sans, square images, fine rules and an asymmetrical grid distinguish it from Heritage and Organic.

The selector now offers three completed concepts. Immersive remains coming soon. No production configuration, dependency or existing concept component was changed.

## Files and structure

- `src/components/minimal/`: Header, Menu, Newsletter and Footer. The mobile menu supports keyboard activation, Escape, focus return, selection focus and inert hidden navigation; scroll position updates the active link.
- `src/layouts/MinimalLayout.astro`, `src/styles/minimal.css`, `src/data/minimal.ts` and `src/pages/minimal/index.astro`: isolated frame, styling, typed display data and content.
- `src/pages/index.astro`, `src/styles/presentation.css`, `src/data/concepts.ts`: third distinctive selector preview and availability.
- `public/assets/coffee/`: two new photographs in two WebP sizes each. `public/assets/fonts/`: locally hosted Instrument Serif, CSS and license. Sources are in ASSETS.md.
- Concept notice, README and post-build tests updated. Desktop evidence: `docs/screenshots/minimal-desktop.jpg`.

## Verification

- `npm run check`: 37 files, zero errors, warnings or hints.
- `npm run build`: all seven static routes generated successfully.
- `npm test`: nine tests passed. Checks cover routes, selector availability, same-page anchors, local images/fonts, noindex, labelled sections, menu data, disabled newsletter, absence of ordering/payment controls and concept CSS/font isolation.
- Browser responsive checks: 320, 390, 768, 1024 and 1440px iframe widths on Minimal and the selector. No horizontal overflow. Where a vertical scrollbar was present, the content viewport was 15px narrower than the frame. Mobile hero, menu, visit/newsletter and selector card, plus desktop hero/gallery, were visually inspected.
- Keyboard: Enter opens the mobile menu; Escape closes it and returns focus to the toggle. Selecting Coffee & Kitchen closes it, focuses the menu section and sets the correct active indicator. Desktop Gallery navigation and active state were checked.
- All five Minimal image elements loaded successfully. One hero is eager; the remaining photographs are lazy. Reduced-motion handling is inherited globally and the hero reveal runs only with no motion preference.
- Generated Heritage and Organic HTML and every linked `_astro` CSS/JavaScript asset were compared to the pre-change build and were byte-identical. Source components and styles for these concepts are unchanged.

## Demonstration boundaries and limitations

Menu offerings are illustrative with stable IDs and optional typed images/prices; no prices are supplied. Newsletter fields are disabled and no form, API, collection or submission exists. No ordering, cart, QR/table workflow, payment, backend or analytics has been implemented. Stock photography is clearly disclosed. Opening hours, supplier relationships and certifications are not invented. The legal notice and wordmark remain provisional.

Browser checks used Chromium at representative frame widths, not physical-device or full assistive-technology certification. No Lighthouse score is claimed. No production deployment or PR merge is part of this milestone. Cloudflare preview verification is recorded in the pull request after publication.
