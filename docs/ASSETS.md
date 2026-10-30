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

## Phase 2: Organic

- Wix mood reference: https://www.wix.com/website-template/view/html/wh-1350 — “Cafe (Earthy)”. Its public preview informed the warm, relaxed tone only. No Wix source code, layout, typography assets or imagery is included. The Organic composition is original.
- Kalma's public landing page was checked again on 30 October 2026; the first Berlin home remains described as in preparation. Shared business facts are unchanged.
- Organic reuses the six licensed, optimized Unsplash photographs listed above. Its coffee-sharing hero, offset menu and nonuniform gallery apply different crops and arrangements. No additional photographs were added.
- Fraunces by Undercase Type: https://github.com/google/fonts/tree/main/ofl/fraunces. SIL Open Font License 1.1; `public/assets/fonts/fraunces-OFL.txt` contains the license. The 400-weight optical-size-variable Latin WOFF2 is hosted locally (34,880 bytes), fetched through the official Google Fonts CSS endpoint. It is loaded only by Organic and the concept selector; Heritage's fonts are unchanged.
- The botanical line drawing is original, decorative SVG made for this concept. It does not depict a specific crop, farm or certification and does not replace the shared Kalma wordmark.
- “Organic” is the creative direction's name, not a claim that any Kalma product is certified organic.

## Phase 3: Minimal

- Wix mood reference: https://www.wix.com/website-template/view/html/681 — “Cafe Website Template”. Its public description and preview informed general café/editorial direction only. No Wix code or imagery is included in the implementation.
- Shared business facts and the provisional wordmark are unchanged. Minimal reuses the existing café-atmosphere and bread photographs.
- Two additional standard Unsplash photographs, downloaded 30 October 2026 under the same Unsplash License described above, add a closer view of coffee preparation and roasting. They are illustrative stock, not Kalma premises, suppliers or confirmed products:

| Local basename | Source | Use |
| --- | --- | --- |
| `coffee/brewing` | https://images.unsplash.com/photo-1442512595331-e89e73853f31 | Pour-over hero, gallery and selector preview |
| `coffee/roasting` | https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb | Roasting process mood, not a sourcing claim |

Both have local 640×427 and 1280×854 WebP variants, responsive delivery and descriptive alt text. The four files total 264,024 bytes.

- Instrument Serif, regular 400 Latin: https://github.com/google/fonts/tree/main/ofl/instrumentserif. SIL Open Font License 1.1, recorded in `public/assets/fonts/instrument-serif-OFL.txt`. The WOFF2 was obtained through the official Google Fonts CSS endpoint and is served locally. It loads only on Minimal and the selector. No italic font was added. Body text reuses local DM Sans. Heritage and Organic font loading is unchanged.
