# Kalma Immersive — implementation and verification

## Baseline

GitHub confirmed PR #3 merged before development. Branch `feature/kalma-immersive` starts from main `a051c85ec0f6b342934a2b8cb7ae4192ced8313d`, including Heritage, Organic and Minimal. No existing concept design, dependency, Wrangler configuration or production setting was changed.

## Experience and files

The full `/immersive/` homepage has nine sections: integrated navigation, full-viewport coffee hero, editorial introduction, three-scene Guatemalan/Berlin story, photographic menu, atmosphere gallery, visit section, disabled newsletter demonstration and cinematic footer. The concept selector now presents all four completed designs with working Explore links.

The design uses deep forest green, cream serif typography over photography, restrained gold accents and alternating dark/light scenes. Cormorant Garamond and DM Sans are reused locally. A single new espresso photograph supplies optimized responsive hero imagery; other photographs are reused. No video or new library is included.

- `src/components/immersive/`: Header, Hero, Story, Menu, Gallery, Newsletter and Footer.
- `src/layouts/ImmersiveLayout.astro`, `src/styles/immersive.css`, `src/data/immersive.ts`, `src/pages/immersive/index.astro`: isolated composition, motion and typed content.
- `src/pages/index.astro`, `src/data/concepts.ts`, `src/styles/presentation.css`: final distinctive selector preview.
- `public/assets/coffee/espresso-{640,1280,1920}.webp`: new local image variants.
- `scripts/site.test.mjs`, README and asset/verification documentation updated. Desktop evidence: `docs/screenshots/immersive-desktop.jpg`.

## Interaction and accessibility

The mobile menu supports Enter, Escape, focus return and inert hidden navigation. Selecting a destination closes the menu and transfers focus to its section. A solid header and subtle progress line appear while scrolling.

The story uses user-controlled tabs with ArrowLeft/ArrowRight, Home/End, selected state, roving tabindex and labelled panels. There is no automatic carousel, scroll lock or mandatory animation. Before JavaScript, controls are hidden and every scene remains visible. Navigation remains expanded in normal flow without JavaScript.

Intersection Observer adds a single gentle reveal to visible elements; missing support leaves content visible. Reduced-motion preferences disable animation and transitions; changing the preference disconnects the observer. The static content never starts hidden. The hero uses a short scale entrance with no infinite movement.

## Verification

- Astro check: 46 files, zero errors, warnings or hints.
- Build: seven static routes.
- Automated tests: 12 passed. Includes nine-section structure, all four selector links, internal anchors, local responsive assets, noindex, accessible controls, unconfirmed menu availability, disabled newsletter, no ordering, CSS/script isolation, a 10 KB uncompressed script budget and motion execution under reduced-motion/missing-Observer scenarios.
- Chromium responsive frame checks at 320, 390, 768, 1024 and 1440px: no horizontal overflow on Immersive or the selector. A vertical scrollbar reduces the content width by 15px where present. The hero remained 844px high in the 844px test frame.
- Visually inspected desktop hero, story, menu and newsletter/footer; mobile hero, menu and selector; tablet gallery. Corrected a selector background inheritance issue found during visual review.
- Browser keyboard checks: mobile Enter/Escape, focus return, selection close/focus; scene ArrowRight and End select the correct panel and retain focus. All eleven image elements loaded after their sections/scenes were visited.
- JavaScript-disabled browser check: all three scenes and navigation remained visible, controls hidden, no horizontal overflow. Reduced-motion and missing-Observer branches were execution-tested with controlled runtime stubs; browser OS preference emulation was not available.
- Previous concepts: generated HTML and linked local CSS, JavaScript, images and fonts compared against the pre-change baseline. The comparison results are recorded in the PR.

## Demonstration boundaries

Illustrative menu data includes stable identifier, category, name, description, image, optional price and unconfirmed availability; no price or stock claim is supplied. No order buttons, cart, checkout, QR/table workflow, backend, payment, analytics or newsletter endpoint exists. Newsletter fields are disabled. Photography is stock, the wordmark and palette are provisional, and legal operator details remain placeholders. No opening hours, certifications or supplier relationships are invented.

Testing used Chromium and controlled JavaScript tests, not a full assistive-technology certification or physical-device lab. No Lighthouse score is claimed. Feature preview publication and verification are recorded in the pull request; merging and production deployment are outside this milestone.
