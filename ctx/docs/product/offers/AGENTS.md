# Product Offers

- Path: `ctx/docs/product/offers/AGENTS.md`
- Template Version: `20260629`
- Changed: `20260701`

## Purpose

Defines the offer-level refinement branch for bounded commercial offers under the site product hierarchy.

Documents at this level describe concrete sellable entry offers, their scope, price logic, exclusions, and relationship to parent products.

## Terminology Rule

Within this branch, an `offer` is:

- a commercial object sold or validated through the site product;
- not the site product itself;
- subordinate to a promoted product or product direction already defined in `ctx/docs/product/overview.md`.

Agents must keep the distinction explicit: `wiredgeese.com` is the site product of the repository, while an offer such as `Agent Orchestration PoC` is a promoted commercial object within that site.

## Level Map

- `agent-orchestration-poc/` — canonical offer branch for the Agent Orchestration PoC.
- `AGENTS.md` — level definition for `ctx/docs/product/offers/`.

## Level Boundary

Defines:

- Concrete commercial offers that sit under the product hierarchy already defined in `ctx/docs/product/overview.md`.
- Offer scope, exclusions, trust boundaries, and expected buyer-facing outcome.
- The boundary between a narrow entry offer and its broader parent product.

Does NOT define:

- Top-level site identity or product hierarchy outside the meaning established above this level.
- Architecture, runtime integration, or implementation mechanics of how the site renders or logs events.
- Sales-operation workflow details that belong to experiment, architecture, environment, or code documents.
