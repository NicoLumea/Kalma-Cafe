# Café Kalma — Digital Concepts

An independent client-presentation project. **Not affiliated with Café Kalma and not an official business website.** Phase 1 implements Kalma Heritage in forest green and cream with a separate concept-selection page.

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
| `/` | Four-concept presentation; only Heritage is clickable |
| `/heritage/` | Complete Heritage homepage |
| `/organic/` | Reserved route; coming soon only |
| `/minimal/` | Reserved route; coming soon only |
| `/immersive/` | Reserved route; coming soon only |
| `/concept-notice/` | Concept scope, privacy details and legal placeholder |
| `/404.html` | Static error page |

## Architecture

- `src/data/`: centralized business facts, navigation, imagery, menu examples, concept metadata and Heritage copy.
- `src/components/shared/`: replaceable temporary wordmark and responsive local-image component.
- `src/components/heritage/`: accessible responsive navigation, menu item and footer.
- `src/components/presentation/`: shared future-concept placeholder.
- `src/layouts/`: global metadata and Heritage frame.
- `src/styles/`: design tokens, shared styles and isolated concept styling.
- `public/assets/`: local photographs, fonts and provisional branding; no runtime image/font services.
- `scripts/site.test.mjs`: post-build route, link, asset and demonstration-safety checks.

The other concepts have metadata and reserved routes only; their designs are not implemented. New concepts can reuse shared business data and components while providing distinct layouts and styles.

## Content and demo boundaries

Business facts are drawn from the publicly accessible [Kalma password landing page](https://www.kalma.cafe/password), checked 30 October 2026. Only public content was read. Its opening language says the first Berlin home is in preparation; no opening hours, opening date, company history, farming relationships or sustainability claims are invented.

Menu entries are explicitly illustrative, with stable IDs, category, image, description and an optional typed price. No prices are supplied. This is a display model, not an ordering system. Future ordering requires separate authorized requirements, backend pricing/inventory validation, privacy work and payment integration.

The newsletter is disabled, has no form action, and cannot accept or submit email addresses. There is no authentication, database, cart, table-number collection, QR ordering, checkout, analytics or payment integration. No existing Kalma systems are connected. External directions and Instagram links only navigate on user action.

All demonstration pages have `noindex, nofollow`; `robots.txt` disallows crawling and Cloudflare headers repeat the indexing instruction. These controls are **not access control**. Use a private preview/access restriction for client-only circulation if deployment is authorized later.

See [asset and source records](docs/ASSETS.md), [verification](docs/VERIFICATION.md), and [Cloudflare setup](docs/CLOUDFLARE.md). The legal notice is explicitly a placeholder; it must be replaced with the correct concept operator details before a public commercial launch.

## Repository workflow

Repository: `NicoLumea/Kalma-Cafe`. Implementation branch: `feature/kalma-heritage`. Review through a pull request targeting `main`; do not merge or deploy automatically. This repository remains the source for all four planned concepts.
