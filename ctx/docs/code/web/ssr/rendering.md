# SSR Rendering

- Path: `ctx/docs/code/web/ssr/rendering.md`
- Template Version: `20260630`
- Changed: `20260908`

## Purpose

Describe stable request-to-render behavior and identify legacy offer-specific enrichment without preserving it as a target contract.

## Project Wiring

The project declares its `App_` namespace and CLI lifecycle plugin in `package.json`, replaces the CMS adapter through `teqcms.config.mjs`, and applies project behavior through `src/Back/Di/Replace/Adapter.js`.

## Request Sequence

1. decode the request path and derive locale-aware routing information;
2. apply declarative redirect normalization;
3. request base render data from the CMS adapter;
4. resolve the effective post-normalization route;
5. add approved project metadata or route-specific data;
6. render the locale template or return the localized not-found response.

## Stable Enrichment

The stable target includes:

- canonical and alternate URLs derived from a validated public origin;
- locale and route classification used by the shared shell;
- localized not-found handling;
- journal-index collection from authored article fragments;
- redirect behavior supporting canonical routes and intentional legacy-path preservation.

Request host and forwarding headers do not define the public metadata origin.

## Legacy Offer Enrichment

Current source may recognize the old `land/agent-orchestration-poc` route and inject a signed `formToken`. This is evidence of current implementation only.

It must not be:

- treated as target behavior;
- generalized into a reusable commercial-page requirement;
- renamed and reused for the Telegram offer;
- expanded without an approved product, state, interaction, and privacy contract.

Its removal or repurposing belongs to a later implementation task that also reviews route preservation.

## Future Enrichment Gate

New route-specific render data requires an approved page role, an explicit state owner, bounded data, and a demonstrated need that shared rendering cannot satisfy.
