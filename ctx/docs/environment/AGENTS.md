# Environment Documentation

- Path: `ctx/docs/environment/AGENTS.md`
- Template Version: `20260629`
- Changed: `20260701`

## Purpose

Defines the environment documentation level for the wiredgeese.com site project.

Documents at this level describe runtime assumptions, operational prerequisites, host-facing dependencies, and environment-specific constraints that remain subordinate to product and architecture truth.

## Level Map

- `AGENTS.md` — level definition for `ctx/docs/environment/`.
- `funnel-validation.md` — environment-specific assumptions for first-party funnel support, local log reporting, and submission handling.
- `offer-validation.md` — operational validation assumptions, success signals, and review questions for narrow commercial offers.
- `overview.md` — compact entry point for runtime assumptions, external prerequisites, and environment constraints.

## Level Boundary

Defines:

- Runtime environments, host assumptions, and external prerequisites required to build, publish, and serve the site.
- Environment-specific constraints that shape valid deployment and maintenance conditions.
- The boundary between durable architecture truth and environment-specific operational assumptions.

Does NOT define:

- Product meaning, page roles, or commercial priorities.
- Architectural ownership, repository decomposition, or integration boundaries.
- Source-level implementation rules, file inventories, or coding conventions.
