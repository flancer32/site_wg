# SSR Web Application Documentation

- Path: `ctx/docs/code/web/ssr/AGENTS.md`
- Template Version: `20260630`
- Changed: `20260908`

## Purpose

Defines the SSR web-application documentation branch for the wiredgeese.com site.

Documents at this level describe stable code-facing SSR behavior and distinguish it from legacy commercial implementation that is no longer normative.

## Level Map

- `components/` — shared SSR-delivered widget and Web Component documentation.
- `pages/` — page-level SSR implementation documents for current routes and durable target page families.
- `AGENTS.md` — level definition for `ctx/docs/code/web/ssr/`.
- `assets.md` — browser-facing asset model used by the SSR site.
- `layouts.md` — shared SSR layout and partial structure.
- `localization.md` — locale-aware route and template behavior.
- `overview.md` — entry point for the SSR web-application model.
- `page-composition.md` — approved shared composition rules and the design gate for future commercial pages.
- `pages.md` — SSR page-family catalogue and target-state boundary.
- `rendering.md` — SSR request-to-render chain, redirect handling, and render-data enrichment.
- `routes.md` — stable route conventions, current route families, and preservation requirements.
- `ui-states.md` — visible SSR-facing states and exceptional outcomes.

## Level Boundary

Defines:

- Stable implementation-facing SSR behavior supported by current code and accepted target context.
- Durable route, layout, page, and render-time behavior that an implementer should not have to rediscover from source.
- The boundary between SSR web delivery concerns and unrelated code branches.

Does NOT define:

- Product-level copy, offer hierarchy, or page-selling intent, including any new PDE offer page.
- Backend domain architecture outside what is required to explain SSR rendering behavior.
- Deployment operations, host provisioning, or generated-publication workflow as such.
