# SSR Page: Home

- Path: `ctx/docs/code/web/ssr/pages/home.md`
- Template Version: `20260630`
- Changed: `20260908`

## Purpose

Define the stable route and semantic implementation boundary of the locale-root page without designing its final composition.

## Route

- `/{locale}/`

## Target Role

The home page is the principal entry to the product-led commercial model. It must help a suitable visitor understand:

- what Wired Geese builds;
- the concrete Telegram outcome available to discuss now;
- how the offer relates to PDE, how PDE belongs to the larger Alarisa direction, and how TeqFW, ADSM, and engineering capability support the system;
- which items are active, experimental, historical, or future;
- where to inspect proof and how to take a commercial next step.

Engineering experience is supporting evidence and delivery capability, not the home page's primary commodity.

## Implementation Boundary

The page:

- remains in the shared locale shell;
- must preserve equivalent semantic intent across locales;
- must not require the visitor to understand internal platform terms before buyer value;
- must not imply production maturity, broad validation, fixed pricing, or unsupported outcomes;
- must route useful historical and technical material without placing it before the commercial proposition.

## Open Design

Final headline, section order, navigation relationship, offer CTA, proof selection, page-local assets, and route links require a later approved design. This document must not be used as a substitute for that decision.

## Legacy Drift

The current page may still lead with senior engineering engagements or present Alarisa mainly as one unavailable monolithic project. The first is legacy positioning; the second is incomplete because it does not expose the component-level productization path. GitHub Flows and the old PoC must not reappear as current home-page content.
