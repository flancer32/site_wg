# SSR Page: Home

- Path: `ctx/docs/code/web/ssr/pages/home.md`
- Template Version: `20260630`
- Changed: `20260909`

## Purpose

Define the stable route and implementation boundary of the locale-root page against the accepted product-level content composition, without approving final copy or visual implementation.

## Route

- `/{locale}/`

## Target Role

The home page is the principal entry to the product-led commercial model. Its semantic sequence is:

1. the useful class of products Alex creates and presents under the Wired Geese brand;
2. a replaceable collection of current products, even while it contains only the Telegram-connected AI product;
3. adaptation possibilities for needs that differ from the current product shape;
4. concise How-it-works explanation covering accountability, control, extensibility, and transfer without deep internal detail;
5. Alarisa as the guiding vision and principal long-term R&D direction, with an eventual product or connected product-family ambition;
6. accountable-maker identity and a deliberately small set of product-relevant proof;
7. the shared product-oriented commercial action.

This ordering is semantic. Adjacent meanings may share one visual section, but buyer outcome must precede platform lineage and maker identity.

The authoritative desktop and mobile content composition, first-viewport requirements, current-section disposition, reusable product-preview model, and section responsibilities are defined in `../../../../product/home-page-composition.md`. This code-level document maps that product decision into the SSR page boundary and must not reinterpret it from the legacy template.

Engineering experience is supporting evidence and delivery capability, not the home page's primary commodity.

## Implementation Boundary

The page:

- remains in the shared locale shell;
- must preserve equivalent semantic intent across locales;
- must not require the visitor to understand internal platform terms before buyer value;
- must not require the visitor to understand or adopt Alarisa before discovering or buying an independent offer;
- must not imply that Alarisa is a market-ready product roadmap or that all exploration branches must become products;
- must not imply that ADSM makes maintenance autonomous or removes accountable human development;
- must not imply production maturity, broad validation, fixed pricing, or unsupported outcomes;
- must distinguish Alex's own and trusted-user practical use from external commercial validation;
- must route useful historical and technical material through an intentional secondary or contextual path without placing it before the commercial proposition;
- must treat the current product area as a scalable collection rather than hard-code Telegram into the page hierarchy;
- must preserve this buyer-first priority on compact viewports so deep method, biography, and archive evidence do not precede current products and the first meaningful commercial action.

## Interface Design Boundary

The semantic reading priority, product visibility before significant scrolling, compact-mobile product placement, product-preview responsibilities, and first-viewport understanding tests are approved at product level. Desktop column count, card placement, visual grouping, hero/product adjacency, and responsive mechanics are provisional interface decisions. Final headlines, body copy, product and proof selection for a particular release, component structure, page-local assets, pixels, breakpoints, motion, and exact target paths still require later copy, interface, and route-migration work. Navigation relationships and the commercial action must follow the approved semantic information architecture.

## Legacy Drift

The current page may still lead with senior engineering engagements or present Alarisa mainly as one unavailable monolithic project. The first is legacy positioning; the second is conceptually wrong because Alarisa is the guiding direction with an eventual product or connected product-family ambition rather than one system or current package, and independent products are discoveries along that path. GitHub Flows and the old PoC must not reappear as current home-page content.
