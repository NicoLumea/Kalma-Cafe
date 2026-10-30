# Café Kalma — Digital Concepts

An independent client-presentation project. **Not affiliated with Café Kalma and not an official business website.** Kalma Heritage, Kalma Organic and Kalma Minimal offer three distinct forest-green and cream designs, with a shared concept-selection page.

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
| `/` | Four-concept presentation; Heritage, Organic and Minimal are available |
| `/heritage/` | Complete Heritage homepage |
| `/organic/` | Complete Organic homepage |
| `/minimal/` | Complete Minimal homepage |
| `/immersive/` | Reserved route; coming soon only |
| `/concept-notice/` | Concept scope, privacy details and legal placeholder |
| `/404.html` | Static error page |

## Architecture

- `src/data/`: centralized business facts, navigation, imagery, menu examples, concept metadata and concept-specific copy.
- `src/components/shared/`: replaceable temporary wordmark and responsive local-image component.
- `src/components/heritage/`: accessible responsive navigation, menu item and footer.
- `src/components/organic/`: independent navigation, botanical illustration, menu item, newsletter and footer.
- `src/components/minimal/`: independent numbered navigation, editorial menu, demo newsletter and footer.
- `src/components/presentation/`: shared future-concept placeholder.
- `src/layouts/`: global metadata with optional head assets, and independent Heritage/Organic/Minimal frames.
- `src/styles/`: design tokens, shared styles and isolated concept styling.
- `public/assets/`: local photographs, fonts and provisional branding; no runtime image/font services.
- `scripts/site.test.mjs`: post-build route, link, asset and demonstration-safety checks.

Immersive retains its reserved coming-soon route; its design is not implemented. New concepts can reuse shared business data and components while providing distinct layouts and styles.

## Content and demo boundaries

Business facts are drawn from the publicly accessible [Kalma password landing page](https://www.kalma.cafe/password), checked 30 October 2026. Only public content was read. Its opening language says the first Berlin home is in preparation; no opening hours, opening date, company history, farming relationships or sustainability claims are invented.

Menu entries are explicitly illustrative, with stable IDs, category, description, an optional image and an optional typed price. No prices are supplied. This is a display model, not an ordering system. Future ordering requires separate authorized requirements, backend pricing/inventory validation, privacy work and payment integration.

The newsletter is disabled, has no form action, and cannot accept or submit email addresses. There is no authentication, database, cart, table-number collection, QR ordering, checkout, analytics or payment integration. No existing Kalma systems are connected. External directions and Instagram links only navigate on user action.

All demonstration pages have `noindex, nofollow`; `robots.txt` disallows crawling and Cloudflare headers repeat the indexing instruction. These controls are **not access control**. Use a private preview/access restriction for client-only circulation if deployment is authorized later.

See [asset and source records](docs/ASSETS.md), [Heritage verification](docs/VERIFICATION.md), [Organic implementation and verification](docs/ORGANIC.md), [Minimal implementation and verification](docs/MINIMAL.md), and [Cloudflare setup](docs/CLOUDFLARE.md). The legal notice is explicitly a placeholder; it must be replaced with the correct concept operator details before a public commercial launch.

## Repository workflow

Repository: `NicoLumea/Kalma-Cafe`. Phase 3 branch: `feature/kalma-minimal`, based on main after merged Organic PR #2 (`7a00703ecbeb281a2d629dff674f886ac6b2b12c`). Review through a pull request targeting `main`; do not merge automatically or deploy directly to production. Publishing the feature branch triggers the existing Cloudflare preview build. This repository remains the source for all four planned concepts.
