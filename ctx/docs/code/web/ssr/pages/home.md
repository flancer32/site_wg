# SSR Page: Home

- Path: `ctx/docs/code/web/ssr/pages/home.md`
- Template Version: `20260630`
- Changed: `20260716`

## Purpose

Define the implementation-facing SSR page contract for the locale-root home page.

## Semantic Source Of Truth

The semantic product source of truth for the current offer hierarchy is:

- `ctx/docs/product/overview.md`

When the home page references the current narrow entry offer, its canonical offer source is:

- `ctx/docs/product/offers/agent-orchestration-poc/overview.md`

This SSR page document must not redefine product hierarchy or offer scope.
It translates accepted product meaning into page-level structure and composition rules.

## Route Role

The page is the locale-root entry page of the SSR site.

The current route shape is:

- `/{locale}/`

## Page Role

The home page acts as the main introductory commercial entry surface.

Its page-level role is:

- to establish the current hot offer on the first screen;
- to show Alex through product and proof context;
- to expose a compact product selection without turning into a full catalogue;
- to move the visitor toward a concrete next step.

## Audience Emphasis

The page should stay optimized for:

- technically competent GitHub users;
- small teams and independent developers;
- visitors who prefer a practical pilot over abstract AI-transformation messaging.

## Required Structure

The page should preserve this sequence:

1. `Hero` with current-offer copy, actions, evidence markers, and a compact process model
2. `Who I Am` with real portrait and a route to the full profile
3. `Key Products` with explicit hierarchy
4. `How I Work` with ADSM, book, projects, and library routes
5. `Final CTA`

## Hero Contract

The hero should:

- establish `GitHub Flows` as the current hot offer;
- sell a concrete first step rather than methodology;
- keep one primary CTA for the bounded repository pilot;
- allow an optional secondary CTA for a demo;
- embed the explanatory concept link to `/{{ locale }}/library/concepts/20260519-controlled-product-evolution.html`;
- avoid first-screen overload with implementation detail.

Acceptable technical markers in hero copy include:

- GitHub App;
- webhook;
- Docker;
- CLI agent;
- VPS.

## Product Selection Contract

The home page should surface no more than three main products:

1. `GitHub Flows` as current focus;
2. `Tequila Framework` as engineering foundation;
3. `AI-generated multilingual sites` as the applied TeqFW product.

The book `Agent-Driven Development` belongs in the supporting method layer rather than the main product trio.

If the home page mentions the current narrow entry offer, it should treat `Agent Orchestration PoC` only as the quickest bounded trial under `GitHub Flows`.

## Composition Expectations

The page should:

- remain a locale-root SSR page rather than a landing page under `land/`;
- extend the shared locale layout;
- use the shared navigation and footer shell;
- keep home-specific copy and local page structure inside the home template branch;
- preserve room for localized CTA targets.
- use a wide responsive composition while preserving one-column reflow on compact viewports;
- keep the process diagram text-native so it remains readable without a generated image.

## Quality Check

A revised home page remains acceptable when:

- the current hot offer is clear from the first screen;
- the page still sells Alex rather than only a tool;
- the page exposes a concrete next step;
- the page does not collapse into a full site catalogue;
- the page does not retell the dedicated PoC landing page.
