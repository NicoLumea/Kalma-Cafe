# Café Kalma — Digital Concepts

An independent client-presentation project. **Not affiliated with Café Kalma and not an official business website.** Kalma Heritage, Kalma Organic, Kalma Minimal and Kalma Immersive offer four distinct forest-green and cream designs, with a shared concept-selection page.

## Development

Use Node.js 24 LTS (`.nvmrc`). Dependencies are locked in `package-lock.json`.

```sh
npm ci
npm run dev
```

```sh
npm run check
npm run build
npm test
```

The production output is `dist/`. `npm run preview` serves that build. `npm install` is appropriate when intentionally updating dependencies; use `npm ci` for reproducible installs. No environment variables or credentials are needed.

## Routes

| URL | Status |
| --- | --- |
| `/` | Four-concept presentation; all four concepts are available |
| `/heritage/` | Complete Heritage homepage |
| `/organic/` | Complete Organic homepage |
| `/minimal/` | Complete Minimal homepage |
| `/immersive/` | Complete Immersive homepage |
| `/concept-notice/` | Concept scope, privacy details and legal placeholder |
| `/404.html` | Static error page |

## Architecture

- `src/data/`: centralized business facts, navigation, imagery, menu examples, concept metadata and concept-specific copy.
- `src/components/shared/`: replaceable temporary wordmark and responsive local-image component.
- `src/components/heritage/`: accessible responsive navigation, menu item and footer.
- `src/components/organic/`: independent navigation, botanical illustration, menu item, newsletter and footer.
- `src/components/minimal/`: independent numbered navigation, editorial menu, demo newsletter and footer.
- `src/components/immersive/`: cinematic hero, navigation, keyboard-controlled story scenes, menu, gallery, demo newsletter and footer.
- `src/components/presentation/`: reusable typed concept switcher and retained concept-placeholder component.
- `src/layouts/`: global metadata with optional head assets, and independent Heritage/Organic/Minimal/Immersive frames.
- `src/styles/`: design tokens, shared styles and isolated concept styling.
- `public/assets/`: local photographs, fonts and provisional branding; no runtime image/font services.
- `scripts/site.test.mjs`: post-build route, link, asset and demonstration-safety checks.

All four concepts are complete and reuse shared business facts, local images and the temporary wordmark while retaining their own layouts and styles.

## Presentation switcher

“Explore Designs” appears on all four concept routes. Its typed data comes from `src/data/concepts.ts`; `BaseLayout.astro` mounts one shared component. Desktop uses a floating modal panel, while mobile uses a bottom sheet. Normal links also work through a native details fallback without JavaScript.

Disable it centrally by setting `presentationConfig.enabled` to `false` in `src/data/presentation.ts`, or build with `PRESENTATION_MODE=off npm run build`. Disabled pages load neither its script nor its stylesheet. This is a presentation setting, not access control. See [reuse instructions and verification](docs/CONCEPT-SWITCHER.md).

## Content and demo boundaries

Business facts are drawn from the publicly accessible [Kalma password landing page](https://www.kalma.cafe/password), checked 30 October 2026. Only public content was read. Its opening language says the first Berlin home is in preparation; no opening hours, opening date, company history, farming relationships or sustainability claims are invented.

Menu entries are explicitly illustrative, with stable IDs, category, description, an optional image and an optional typed price. No prices are supplied. This is a display model, not an ordering system. Future ordering requires separate authorized requirements, backend pricing/inventory validation, privacy work and payment integration.

The newsletter is disabled, has no form action, and cannot accept or submit email addresses. There is no authentication, database, cart, table-number collection, QR ordering, checkout, analytics or payment integration. No existing Kalma systems are connected. External directions and Instagram links only navigate on user action.

All demonstration pages have `noindex, nofollow`; `robots.txt` disallows crawling and Cloudflare headers repeat the indexing instruction. These controls are **not access control**. Use a private preview/access restriction for client-only circulation if deployment is authorized later.

See [asset and source records](docs/ASSETS.md), [Heritage verification](docs/VERIFICATION.md), [Organic implementation and verification](docs/ORGANIC.md), [Minimal implementation and verification](docs/MINIMAL.md), [Immersive implementation and verification](docs/IMMERSIVE.md), and [Cloudflare setup](docs/CLOUDFLARE.md). The legal notice is explicitly a placeholder; it must be replaced with the correct concept operator details before a public commercial launch.

## Repository workflow

Repository: `NicoLumea/Kalma-Cafe`. Phase 5.1 branch: `feature/kalma-concept-switcher`, based on main after merged Immersive PR #4 (`6524539621a84f30fab20bfa479cce150606fff3`). Review through a pull request targeting `main`; do not merge automatically or deploy directly to production. Publishing the feature branch triggers the existing Cloudflare preview build. This repository remains the source for all four concepts.
