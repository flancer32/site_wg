# Architecture Documentation

- Path: `ctx/docs/architecture/AGENTS.md`
- Template Version: `20260605`
- Changed: `20260909`

## Purpose

Defines the architecture documentation level for the wiredgeese.com site project.

Documents at this level translate the product-led commercial intent into stable site structure, behavior, state ownership, integration boundaries, architectural constraints, durable decisions, and supervision rules without absorbing the runtime architecture of products promoted by the site.

## Level Map

- `AGENTS.md` — level definition for `ctx/docs/architecture/`.
- `behavior.md` — internal site flows, commercial handoff, preservation, and optional product-continuation transfer behavior.
- `constraints.md` — non-negotiable architectural restrictions and trust boundaries for the site stack.
- `decisions.md` — durable architecture decisions and rejected alternatives that shape the project.
- `integration.md` — site integrations, major internal contracts, promoted-product boundaries, and cognitive-context transfer boundaries.
- `overview.md` — compact entry point and navigation index for the architecture level.
- `state.md` — state ownership, sources of truth, derived publication artifacts, and transferred-context ownership boundaries.
- `structure.md` — major architectural blocks, runtime areas, and responsibility boundaries.
- `supervision.md` — human-agent architecture supervision rules and approval boundaries.

## Architecture Knowledge Model

Architecture knowledge is organized as one coordinated model.

Each document answers a distinct architectural question:

- `structure.md` — what is structurally built.
- `behavior.md` — how site publication, handoff, preservation, and optional product continuation behave.
- `state.md` — where authoritative, derived, external, and transferred context state is owned.
- `integration.md` — what integrations, product runtime separations, and context-transfer boundaries exist.
- `constraints.md` — what must not be violated.
- `decisions.md` — why durable architectural choices were made.
- `supervision.md` — how human and agents govern architectural consistency.
- `overview.md` — where to enter the architecture level and how to navigate it.

## Level Boundary

Defines:

- Major architectural areas, system boundaries, and integration surfaces.
- Internal behavior, state ownership, and authority distribution.
- Durable architectural constraints, decisions, and supervision rules.

Does NOT define:

- Product meaning such as roles, offer hierarchy, or page-level outcomes.
- Deployment procedures, operational workflow routing, or environment-specific runbooks.
- Source-level implementation details such as file inventories, class APIs, or rendered page copy.

## Relationship To Product

Architecture depends on product documentation and refines it. It is not an independent source of product truth.

When product knowledge is missing or contradictory, architecture documents must expose the gap and escalate it instead of creating implicit meaning. The site may describe and sell an external product without hosting that product inside the site runtime.
