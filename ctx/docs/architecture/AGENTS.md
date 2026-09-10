# Architecture Documentation

- Path: `ctx/docs/architecture/AGENTS.md`
- Template Version: `20260605`
- Changed: `20260910`

## Purpose

Defines the architecture documentation level for the wiredgeese.com site.

Documents at this level translate the authoritative product model into stable website structure, behavior, state ownership, integration boundaries, constraints, durable decisions, and supervision rules. They do not absorb product strategy or the runtime architecture of systems promoted by the site.

## Level Map

- `AGENTS.md` — level definition, reading order, and local editing rules for `ctx/docs/architecture/`.
- `behavior.md` — publication, visitor-journey, evidence-navigation, commercial-handoff, preservation, and optional continuation behavior.
- `constraints.md` — non-negotiable architecture, evidence, trust, preservation, and semantic-drift restrictions.
- `decisions.md` — retained, revised, superseding, and added durable architecture decisions.
- `integration.md` — site integrations, ordinary external links, external-product boundaries, and cognitive-context transfer boundaries.
- `overview.md` — compact entry point and authority map for the architecture level.
- `state.md` — normative, authored, derived, operational, external, commercial, and evidence-state ownership.
- `structure.md` — major architectural blocks, semantic surfaces, page-family relationships, and runtime boundaries.
- `supervision.md` — human-agent architecture supervision, drift detection, and approval boundaries.

## Reading Order

Read `overview.md` first, then the document matching the architectural question:

- `structure.md` — what is structurally required;
- `behavior.md` — which site flows must remain possible;
- `state.md` — where truth and state are owned;
- `integration.md` — what is connected and what remains external;
- `constraints.md` — what downstream work must not violate;
- `decisions.md` — which choices are durable and why;
- `supervision.md` — how consistency is governed and drift is detected.

Before changing architecture, read the applicable authority under `../product/`, especially `overview.md`, `product-system.md`, `commercial-strategy.md`, `journal-and-evidence.md`, `information-architecture.md`, and `home-page-composition.md`. Read `transferable-development.md` and offer documents only when their boundaries are relevant.

## Editing Rules

- Refine accepted product meaning into engineering structure; do not independently redefine product identity, maturity, evidence, pricing, packaging, roadmap, or public copy.
- Preserve the downward authority chain `product -> architecture -> environment -> code`.
- Keep wiredgeese.com architecture separate from PDE, Desk, MCP, Telegram, customer, payment, CRM, and provisioning runtimes unless a separately approved upstream change creates a new responsibility.
- Preserve one multilingual TeqCMS-based SSR/publication system with a thin project adapter unless evidence and explicit approval require an engine-level change.
- Treat exact labels, routes, header-link counts, visual design, and current offer selection as open unless a higher-level authority explicitly fixes them.
- Update this map whenever the direct contents of this directory change.

## Level Boundary

Defines:

- Major site structures, semantic surfaces, page-family relationships, and runtime boundaries.
- Site behavior, state ownership, authority distribution, and integration separation.
- Durable constraints, decisions, supervision rules, and drift signals for downstream levels.

Does NOT define:

- Product identity, current maturity, evidence facts, buyer hypotheses, pricing, packaging, or roadmap.
- Final public copy, visual design, exact labels, exact routes, or implementation details.
- Deployment procedures, environment-specific operations, or source-level contracts.

## Relationship To Product

Product documentation is authoritative above this branch. Architecture consumes its semantic decisions and defines the capabilities and boundaries needed to realize them.

When product knowledge is missing or contradictory, architecture must expose the gap instead of normalizing it to an earlier site model or inventing a lower-level answer.
