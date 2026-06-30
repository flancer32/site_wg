# SSR Web Application Documentation

- Path: `ctx/docs/code/web/ssr/AGENTS.md`
- Template Version: `20260630`
- Changed: `20260630`

## Purpose

Defines the SSR web-application documentation branch for the wiredgeese.com site.

Documents at this level describe the code-facing SSR model: route resolution, render-time enrichment, layout and page structure, locale delivery, and delivered browser-facing assets.

## Level Map

- `pages/` — page-level SSR implementation documents for concrete page families such as landing pages.
- `AGENTS.md` — level definition for `ctx/docs/code/web/ssr/`.
- `assets.md` — browser-facing asset model used by the SSR site.
- `layouts.md` — shared SSR layout and partial structure.
- `localization.md` — locale-aware route and template behavior.
- `overview.md` — entry point for the SSR web-application model.
- `page-composition.md` — mapping between route families, layouts, and page/template composition.
- `pages.md` — SSR page-family catalogue.
- `rendering.md` — SSR request-to-render chain, redirect handling, and render-data enrichment.
- `routes.md` — route families and path conventions visible in the current SSR site.
- `ui-states.md` — visible SSR-facing states and exceptional outcomes.

## Level Boundary

Defines:

- The implementation-facing SSR model of the site as derived from the current code and templates.
- Durable route, layout, page, and render-time behavior that an implementer should not have to rediscover from source.
- The boundary between SSR web delivery concerns and unrelated code branches.

Does NOT define:

- Product-level copy, offer hierarchy, or page-selling intent.
- Backend domain architecture outside what is required to explain SSR rendering behavior.
- Deployment operations, host provisioning, or generated-publication workflow as such.
