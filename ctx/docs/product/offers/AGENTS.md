# Product Offers

- Path: `ctx/docs/product/offers/AGENTS.md`
- Template Version: `20260629`
- Changed: `20260908`

## Purpose

Defines the offer-level refinement branch for bounded commercial offers under the site product hierarchy.

Documents at this level describe concrete sellable entry offers, their outcomes, scope, commercial boundary, trust model, price logic, and relationship to the enabling product system.

## Terminology Rule

Within this branch, an `offer` is:

- a commercial object sold or validated through the site product;
- not the site product itself;
- subordinate to a promoted product or capability already defined in `ctx/docs/product/product-system.md`.

Agents must keep the distinction explicit: `wiredgeese.com` is the site product of the repository, while an offer is a promoted commercial object sold through that site.

## Level Map

- `chatgpt-telegram/` — canonical offer branch for connecting an MCP-compatible AI system to a client's Telegram account through Personal Digital Embassy.
- `AGENTS.md` — level definition for `ctx/docs/product/offers/`.

## Level Boundary

Defines:

- Concrete commercial offers that sit under the product hierarchy already defined in `ctx/docs/product/product-system.md`.
- Offer scope, exclusions, trust boundaries, and expected buyer-facing outcome.
- The boundary between a narrow entry offer and its broader parent product.

Does NOT define:

- Top-level site identity or product hierarchy outside the meaning established above this level.
- Architecture, runtime integration, or implementation mechanics of how the site renders or logs events.
- Sales-operation workflow details that belong to experiment, architecture, environment, or code documents.
