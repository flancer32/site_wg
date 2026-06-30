# Web Code Documentation

- Path: `ctx/docs/code/web/AGENTS.md`
- Template Version: `20260630`
- Changed: `20260630`

## Purpose

Defines the web-facing code documentation branch under `ctx/docs/code/`.

Documents at this level describe the implementation-facing model of the site's web surface without redefining product meaning, architecture, or environment boundaries.

## Level Map

- `ssr/` — SSR web-application documentation for route resolution, rendering, page composition, and delivered browser-facing structure.
- `AGENTS.md` — level definition for `ctx/docs/code/web/`.
- `overview.md` — entry point for the web-facing code-documentation branch.

## Level Boundary

Defines:

- The boundary for implementation-facing documentation of the site's web surface.
- The split between SSR web documentation and other code branches such as API or funnel contracts.
- The local structure used to describe routes, layouts, pages, rendering, and browser-facing delivery at code level.

Does NOT define:

- Product positioning, page intent, or commercial hierarchy from `ctx/docs/product/`.
- Architectural ownership beyond the web-facing implementation model already established above this level.
- Runtime host configuration, deployment operations, or generated output behavior as such.
