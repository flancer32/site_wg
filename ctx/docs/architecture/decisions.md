# Architecture Decisions

- Path: `ctx/docs/architecture/decisions.md`
- Template Version: `20260605`
- Changed: `20260908`

## Purpose

Record durable architecture decisions in a short ADR-like form.

## Decision 1: Keep the site on TeqCMS with a thin project adapter

- Decision: use TeqCMS as the primary site engine and keep repository-specific runtime logic in a small adapter layer under `src/`.
- Rejected alternatives: rebuild the site engine for the repositioning; move runtime behavior into templates.
- Reasoning: the new commercial model changes meaning and hierarchy, not the demonstrated need for a new website platform.

## Decision 2: Keep context and authored sources authoritative

- Decision: keep durable product meaning in `ctx/`, public source material in `tmpl/` and source-controlled assets, and `web/` as downstream output.
- Rejected alternatives: treat generated pages or current code behavior as authoritative when they conflict with the accepted target state.
- Reasoning: the repositioning must propagate from product meaning rather than preserve obsolete implementation by inertia.

## Decision 3: Keep multilingual routing locale-aware at the application boundary

- Decision: resolve locale and clean route information centrally before route-specific render enrichment.
- Rejected alternatives: duplicate locale rules across templates or new offer handlers.
- Reasoning: commercial restructuring must preserve consistent locale behavior and canonical public paths.

## Decision 4: Keep promoted-product runtimes outside the site boundary

- Decision: allow wiredgeese.com to explain and sell PDE capabilities without making PDE, MCP, Telegram, or customer deployments part of the site runtime.
- Rejected alternatives: add product runtime responsibilities merely because the site promotes the product.
- Reasoning: the systems have different state, credentials, trust, failure, deployment, and revocation boundaries.

## Decision 5: Preserve useful public value during restructuring

- Decision: inventory existing URLs and content before implementation, retaining access or adding deliberate redirects where value warrants it.
- Rejected alternatives: erase the existing archive during a homepage repositioning; preserve obsolete promotion solely to keep a route unchanged.
- Reasoning: search and reference value can remain accessible while commercial hierarchy changes.

## Decision 6: Defer new commercial automation

- Decision: use the existing contact capability or another later-approved minimal handoff while pricing and delivery are learned manually.
- Rejected alternatives: define a new offer form, analytics funnel, payment system, CRM, or automated PDE provisioning in this context rewrite.
- Reasoning: those commitments are premature without external buyer and delivery evidence.
