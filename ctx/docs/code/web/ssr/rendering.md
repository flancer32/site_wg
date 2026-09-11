# SSR Rendering

- Path: `ctx/docs/code/web/ssr/rendering.md`
- Template Version: `20260630`
- Changed: `20260911`

## Purpose

Describe stable request-to-render behavior and historical-route boundaries without creating offer-specific enrichment contracts.

## Project Wiring

The project declares its `App_` namespace and CLI lifecycle plugin in `package.json`, replaces the CMS adapter through `teqcms.config.mjs`, and applies project behavior through `src/Back/Di/Replace/Adapter.js`.

## Request Sequence

1. decode the request path and derive locale-aware routing information;
2. apply a declarative permanent redirect response when the path is mapped;
3. request base render data from the CMS adapter only when no redirect completes the request;
4. resolve the effective post-normalization route;
5. add approved project metadata or route-specific data;
6. render the locale template or return the localized not-found response.

## Stable Enrichment

The stable target includes:

- canonical and alternate URLs derived from a validated public origin;
- locale and route classification used by the shared shell;
- localized not-found handling;
- journal-index collection from authored article fragments;
- a small deterministic recent-Journal projection from those same authored fragments on locale Home routes;
- optional `<!-- journal-relations: stable-id -->` metadata parsed from authored Journal pages; the project adapter uses it only for a bounded Current Work evidence projection and Event-to-current-state links;
- redirect behavior supporting canonical routes and intentional legacy-path preservation.

The relation identifier states that a dated Event materially concerns an object. It does not change status, prove validation, or create an Event store. The status-bearing Current Work destination remains authoritative.

Request host and forwarding headers do not define the public metadata origin.

## Historical-Route Enrichment

The archived `land/agent-orchestration-poc` route, the former ChatGPT + Telegram page, and `contacts.html` need no form-specific render enrichment. The redirect handler returns a locale-preserving permanent response before static or template delivery, so no canonical or alternate metadata is rendered for these legacy routes. No signed campaign token is issued.

Any future repurposing still requires a separate route-preservation review.

## Future Enrichment Gate

New route-specific render data requires an approved page role, an explicit state owner, bounded data, and a demonstrated need that shared rendering cannot satisfy.
