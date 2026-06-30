# Product Documentation

- Path: `ctx/docs/product/AGENTS.md`
- Template Version: `20260605`
- Changed: `20260630`

## Purpose

Defines the product documentation level for the wiredgeese.com site.

Documents at this level describe the site as a product: its meaning, purpose, scope, page roles, and durable product-level constraints.

## Level Map

- `experiments/` — product-validation experiment documents for testing offer-market fit and conversion evidence.
- `offers/` — offer-level documents that define concrete commercial entry offers under the site product hierarchy.
- `pages/` — page-level product documents that refine the role and constraints of specific public pages.
- `AGENTS.md` — level definition for `ctx/docs/product/`.
- `agent-orchestration-poc-landing.md` — compact landing-page contract for the first publishable Agent Orchestration PoC page.
- `agent-orchestration-poc.md` — product-level definition of the Agent Orchestration PoC as a paid validation offer under GitHub Flows.
- `overview.md` — semantic entry point that defines site purpose, offer hierarchy, and product-level communication constraints.

## Product Knowledge Model

The current product branch is intentionally compact.

`overview.md` defines the product identity and navigation logic for the site.

`agent-orchestration-poc.md` defines the promoted validation offer in compact product terms before lower-level offer details.

`agent-orchestration-poc-landing.md` defines the first publishable landing structure before lower-level page contracts.

`offers/` defines bounded commercial offers that sit under the established product hierarchy.

`pages/` refines that meaning into page-level contracts without introducing competing product priorities.

`experiments/` defines explicit product-validation loops for narrow commercial hypotheses.

## Level Boundary

Defines:

- Product identity, scope, and explicit exclusions for the site as a commercial product surface.
- Product-level communication priorities, offer hierarchy, and durable public-facing constraints.
- Page-level refinement boundaries for documents under `pages/`.

Does NOT define:

- Architectural structure, system decomposition, or integration boundaries.
- Execution environment, deployment topology, or code-level implementation constraints.
- Agent workflow behavior, repository operations, or methodological rules above this level.
