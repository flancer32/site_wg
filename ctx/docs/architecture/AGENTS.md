# Architecture Documentation

- Path: `ctx/docs/architecture/AGENTS.md`
- Template Version: `20260605`
- Changed: `20260629`

## Purpose

Defines the architecture documentation level for the wiredgeese.com site project.

Documents at this level translate product intent into stable engineering structure, behavior, state ownership, integration boundaries, architectural constraints, durable decisions, and supervision rules.

## Level Map

- `AGENTS.md` — level definition for `ctx/docs/architecture/`.
- `behavior.md` — internal architectural flows from template content to published site output and request-time rendering.
- `constraints.md` — non-negotiable architectural restrictions and trust boundaries for the site stack.
- `decisions.md` — durable architecture decisions and rejected alternatives that shape the project.
- `integration.md` — external integrations and major internal contracts between repository areas and runtime components.
- `overview.md` — compact entry point and navigation index for the architecture level.
- `state.md` — state ownership, sources of truth, and derived publication artifacts.
- `structure.md` — major architectural blocks, runtime areas, and responsibility boundaries.
- `supervision.md` — human-agent architecture supervision rules and approval boundaries.

## Architecture Knowledge Model

Architecture knowledge is organized as one coordinated model rather than a set of isolated notes.

Each document answers a different architectural question, and the set is intended to be read together:

- `structure.md` — what is structurally built.
- `behavior.md` — how the system behaves internally.
- `state.md` — where authoritative state is owned, changed, and derived.
- `integration.md` — what integrations and internal contract boundaries exist.
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

The dependency order is:

```text
product
  → architecture
  → environment
  → code
```

Product documentation defines what the site is selling and which public-page outcomes matter.

Architecture documentation defines how that product is realized structurally.

When product knowledge is missing or contradictory, architecture documents must expose the gap and escalate it instead of creating implicit meaning.
