# Product Offers

- Path: `ctx/docs/product/offers/AGENTS.md`
- Template Version: `20260629`
- Changed: `20260630`

## Purpose

Defines the offer-level refinement branch for bounded commercial offers under the site product hierarchy.

Documents at this level describe concrete sellable entry offers, their scope, price logic, exclusions, and relationship to parent products.

## Level Map

- `AGENTS.md` — level definition for `ctx/docs/product/offers/`.
- `event-driven-agent-orchestration-poc.md` — offer definition for the hosted event-driven AI-agent orchestration PoC.

## Level Boundary

Defines:

- Concrete commercial offers that sit under the product hierarchy already defined in `ctx/docs/product/overview.md`.
- Offer scope, exclusions, trust boundaries, and expected buyer-facing outcome.
- The boundary between a narrow entry offer and its broader parent product.

Does NOT define:

- Top-level site identity or product hierarchy outside the meaning established above this level.
- Architecture, runtime integration, or implementation mechanics of how the site renders or logs events.
- Sales-operation workflow details that belong to experiment, architecture, environment, or code documents.
