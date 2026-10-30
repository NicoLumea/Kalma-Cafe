# Asset and factual source records

## Factual references

- Café Kalma public landing page: https://www.kalma.cafe/password — checked 2026-10-30. Confirms the headline “A moment worth tasting”, Guatemalan coffee / Berlin identity, simple-food and unhurried-moments positioning, address Seelingstraße 34, 14059 Berlin, and a first Berlin home in preparation. No password or restricted content was accessed.
- Instagram profile supplied in the brief: https://www.instagram.com/cafe.kalma/ — outbound link only; no Instagram imagery copied.
- Wix reference supplied in the brief: https://www.wix.com/website-template/view/html/5426 — public template description identifies “Boulangerie (Rustic)”. Used for general rustic/editorial direction only. No template code, layout tracing or proprietary images copied.

## Illustrative stock photography

Six standard Unsplash stock image assets, downloaded 2026-10-30 and stored locally. Use is under the [Unsplash License](https://unsplash.com/license), allowing downloaded photographs to be used and modified in commercial and non-commercial projects. These photos are used as supporting website imagery, not sold as standalone photographs or redistributed as a competing photo service. No Unsplash API, access key or API-driven application is used.

| Local basename (under `public/assets/`) | Original source identifier and URL | Use |
| --- | --- | --- |
| `coffee/ritual` | https://images.unsplash.com/photo-1509042239860-f550ce710b93 | Coffee cups and foliage; hero and gallery |
| `coffee/beans` | https://images.unsplash.com/photo-1447933601403-0c6688de566e | Roasted beans; origin mood, not a particular farm or country |
| `coffee/pour` | https://images.unsplash.com/photo-1495474472287-4d71bcdd2085 | Shared coffee moment; introduction and illustrative menu |
| `cafe/atmosphere` | https://images.unsplash.com/photo-1554118811-1e0d58224f24 | Café interior atmosphere; explicitly not Kalma’s premises |
| `food/pastry` | https://images.unsplash.com/photo-1509440159596-0249088772ff | Bread; illustrative bakery preview |
| `food/breakfast` | https://images.unsplash.com/photo-1525351484163-7529414344d8 | Toast and egg; illustrative kitchen preview |

Each is provided at 640px and 1280px width, encoded as WebP. The layout uses responsive `srcset`/`sizes`, descriptive alt text and explicit dimensions. Only the first prominent image loads eagerly; other images load lazily. Local re-encoding changes file format/quality only; display cropping is performed with CSS.

Stock-photo labels appear next to the hero, menu and gallery. No photograph is asserted to show actual Kalma premises, confirmed products, coffee farms or suppliers. Source identifiers are recorded rather than guessed photographer names. The standard license does not require attribution, but a visible Unsplash credit is included on the concept notice page. Official client-owned imagery should replace stock assets before any real business launch.

## Fonts

- Cormorant Garamond, Christian Thalmann: Google Fonts source at https://github.com/google/fonts/tree/main/ofl/cormorantgaramond.
- DM Sans, Colophon Foundry: Google Fonts source at https://github.com/google/fonts/tree/main/ofl/dmsans.
- Both are SIL Open Font License 1.1. Original license files are stored alongside the locally hosted fonts in `public/assets/fonts/`. Font CSS was sourced from Google Fonts; fonts are served locally, without Google Fonts network requests from the finished site.

## Original concept elements

The text wordmark, simple `k` favicon, typographic address panel and CSS compositions were created for this independent concept. They are provisional design elements, not official Kalma brand assets. No client-provided original logo was available. Palette values are centralized in `src/styles/tokens.css` for later adjustment.
