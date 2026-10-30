# Phase 2 — Kalma Organic

## Baseline and scope

Created `feature/kalma-organic` from `main` at `82bbc5ef107770d4a9d2a03dd3b99726c293fcb6`, after verifying that Heritage PR #1 was merged. The existing Astro project, Worker `kalma-cafe`, pinned Wrangler 4.156.0 and preview configuration are retained.

Organic is available at `/organic/`. The concept selector offers Heritage and Organic with different previews; Minimal and Immersive remain unavailable placeholders. No production configuration, Heritage source, ordering, payments or customer-data collection was changed.

## Design and architecture

Organic uses a centered wordmark, a cream asymmetrical hero, locally hosted Fraunces headings, rounded image compositions, original botanical line details, pill-shaped actions, an offset menu and a nonuniform gallery. Forest green and cream remain dominant; shared palette values and business information are retained.

- `src/components/organic/`: Header, Footer, Botanical, MenuItem and Newsletter.
- `src/layouts/OrganicLayout.astro`, `src/styles/organic.css`: independent concept frame and scoped styles.
- `src/data/organic.ts`: navigation, editorial copy and illustrative menu records using the existing typed MenuItem model.
- `src/pages/organic/index.astro`: all nine requested sections.
- `src/pages/index.astro`, `src/data/concepts.ts`, `src/styles/presentation.css`: two completed concepts with distinctive previews.
- `src/layouts/BaseLayout.astro`: optional head slot for concept-specific assets. Fraunces is not loaded by Heritage.
- `public/assets/fonts/fraunces*`: local font, CSS and OFL license.
- `src/pages/concept-notice.astro`, `docs/ASSETS.md`, `README.md`: updated scope, credits and navigation.
- `scripts/site.test.mjs`: updated availability and added Organic section, demonstration-safety, directions and style-isolation coverage.
- `docs/screenshots/organic-desktop.jpg`: desktop preview captured in Chromium.

No new photography is needed; Organic reuses six licensed, responsive local WebP assets. Stock and menu disclosures remain visible. “Organic” describes the design direction and does not assert certification. The newsletter has no form, active input, submission handler or storage; integration requires separate approval.

## Verification — 30 October 2026

- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm run build`: 7 static pages generated.
- `npm test`: 7 passed, 0 failed. Covers all routes, noindex, unique headings/IDs, internal links/fragments, assets, disabled collection, completed-concept availability, Organic semantics/directions and stylesheet isolation.
- Chromium responsive checks on Organic and the selector at 320, 390, 768, 1024 and 1440 CSS pixels: no horizontal overflow. Tests use same-origin responsive iframes, not device hardware emulation.
- Desktop, tablet and mobile compositions inspected. Fixed a small-screen selector text/image overlap.
- Mobile menu click and Enter open; Escape closes and returns focus; selection closes and focuses the target section. Desktop section navigation places content below the sticky header.
- Selector's Explore Organic link opens `/organic/` successfully.
- All 9 rendered Organic images loaded after scrolling through the page. Newsletter input and action remain disabled.
- A separate production build of merged `main` was compared: Heritage HTML, linked CSS and navigation JavaScript are byte-for-byte identical.
- Reduced-motion CSS preserves content and disables animation/transitions. OS-level motion emulation and physical-device/screen-reader testing were not performed.

The temporary responsive QA harness is excluded from Git and removed before final build. No QA route is shipped.

## Preview and limitations

Publishing the feature branch triggers the existing GitHub-connected Cloudflare Worker preview workflow. Deployment outcome and the exact preview URL are recorded in the pull request and completion report. The branch is not merged and no direct production deployment is run.

This remains an independent presentation, not an official Café Kalma website. No official menu, opening date, hours, confirmed premises photographs or client logo was supplied. The public Kalma landing page still describes its first Berlin home as in preparation. Legal placeholders and illustrative content require client approval before a commercial launch. `noindex` does not provide access control.
