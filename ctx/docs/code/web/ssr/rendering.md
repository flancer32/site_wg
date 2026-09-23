# SSR Rendering

- Path: `ctx/docs/code/web/ssr/rendering.md`
- Template Version: `20260630`
- Changed: `20260923`

## Purpose

Describe stable request-to-render behavior and historical-route boundaries without creating offer-specific enrichment contracts.

## Project Wiring

The project declares its `App_` namespace and CLI lifecycle plugin in `package.json`, replaces the CMS adapter through the declarative CLI container policy in `teqcms.config.mjs`, and applies project behavior through `src/Back/Di/Replace/Adapter.js`. The policy names a DI-produced preprocessor under `src/Bootstrap/Di/`; it is resolved before runtime entries and replaces current DI identity addresses rather than importing CMS internals.

## Request Sequence

1. normalize the request and apply a permanent redirect for mapped legacy paths;
2. resolve an explicitly published locale-specific Journal or Library Markdown source when the route matches;
3. return raw source for `.md`, or render its HTML body through the shared article template and locale layout for `.html`;
4. otherwise request CMS render data, apply bounded project enrichment, and render the ordinary locale template;
5. return the localized not-found response when no publication or template resolves.

## Stable Enrichment

The stable target includes:

- canonical and alternate URLs derived by one shared metadata component from a validated public origin;
- locale and route classification used by the shared shell;
- localized not-found handling;
- journal-index collection from Markdown front matter;
- a small deterministic recent-Journal projection from those same Markdown sources on locale Home routes;
- optional `relations` front matter on Journal Markdown, used only for a bounded Current Work evidence projection and Event-to-current-state links;
- redirect behavior supporting canonical routes and intentional legacy-path preservation.
- a Markdown publication handler that resolves locale-scoped Journal and Library sources and renders their `.html` projections through the shared article template and locale layout; it returns raw Markdown without template execution for every locale. `/llms.txt` separately curates English URLs for agent discovery.

The relation identifier states that a dated Event materially concerns an object. It does not change status, prove validation, or create an Event store. The status-bearing Current Work destination remains authoritative.

Request host and forwarding headers do not define the public metadata origin.

## Historical-Route Enrichment

The legacy locale `index.html`, archived `land/agent-orchestration-poc` and GitHub Flows routes, former MCP-integration and ChatGPT + Telegram pages, and `contacts.html` need no render enrichment. The redirect handler returns a locale-preserving permanent response before static or template delivery, so no canonical or alternate metadata is rendered for these legacy routes. Locale `index.html` lands directly on the canonical locale-root directory URL; no signed campaign token is issued.

Any future repurposing still requires a separate route-preservation review.

## Future Enrichment Gate

New route-specific render data requires an approved page role, an explicit state owner, bounded data, and a demonstrated need that shared rendering cannot satisfy.
