# Portfolio / The workbench

A first redesign direction inspired by the warmth, typography, generous spacing, and small playful details of the OpenTag reference. Built within the existing React portfolio, using the existing content model, routing, and publishing infrastructure.

## Preview

- [Desktop](desktop.png)
- [Mobile](mobile.png)
- [Dark theme](dark.png)
- [Selected work](projects.png)
- [Writing](writing.png)

```sh
npm ci
npm run dev
```

The branch is `redesign/opentag-inspired`. It is intended for design review before merging. The existing deployment workflow publishes pushes to `main`.

## Design choices

Cream canvas, navy text, blue accents, a yellow code emblem, and an original eight-spoke SVG mark. Fraunces is self-hosted for display type, with the existing Manrope body and IBM Plex Mono code fonts. No OpenTag branding, proprietary type files, mascot assets, or production bundles are used.

The homepage leads with “Curious mind. Careful code.” and an interactive workbench built around diff2test, webclerk, and FRAME. The code is explicitly labeled illustrative. All six projects remain available, with links and expandable problem/highlight details. The original about content, education, skill groups, contribution entries, and articles come from the existing data files.

Shared navigation and footer follow the new direction across home and blog routes. The résumé, canonical URLs, article content, static blog prerendering, sitemap, and deployment workflow remain supported. The existing diff2test case-study links now resolve to the real article slug. Its cover image is self-hosted. Favicons, social card, initial loading shell, and standalone 404 page also follow the new visual identity.

Quiet is now the default background. Experimental background modes remain in the command palette and load on demand. Dark mode respects the system/saved preference. Motion respects reduced-motion preferences.

## Verification

- `npm run lint`
- `npm run build`
- `npm test` — blog utilities
- `npm run test:build` — static routes, self-hosted fonts, metadata, sitemap, and prerender enhancements
- `npm run check:links` — internal links passed; three external article/repository links reported network fetch warnings in this environment
- `CHROMIUM_PATH=/usr/bin/chromium npm run test:browser` — workbench click/keyboard behavior, details, command search, clipboard, mobile navigation, saved theme, résumé/cover responses, and home/blog/article rendering at 320, 390, 768, 1440, and 1920px

Browser checks found no runtime errors, failed resources, or horizontal page overflow. The project artwork is illustrative and original portfolio content has not been turned into unsupported performance claims.

To use Playwright's own browser instead of system Chromium: `npx playwright install chromium`, then `npm run test:browser` after building.

To regenerate the social card: `CHROMIUM_PATH=/usr/bin/chromium node scripts/generate-og.mjs`.
