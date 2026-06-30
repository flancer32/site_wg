# Code Documentation

- Path: `ctx/docs/code/AGENTS.md`
- Template Version: `20260629`
- Changed: `20260630`

## Purpose

Defines the code documentation level for the wiredgeese.com site project.

Documents at this level constrain implementation structure, source-level responsibilities, and durable coding rules that refine, but do not replace, product, architecture, or environment documentation.

## Level Map

- `web/` — web-facing code documentation for the site's SSR delivery model and related page-structure rules.
- `AGENTS.md` — level definition for `ctx/docs/code/`.
- `funnel-events.md` — code-level event schema and payload boundaries for validation-funnel instrumentation.
- `overview.md` — minimal entry point for implementation-facing boundaries and code-documentation scope.

## Level Boundary

Defines:

- Source-level responsibility boundaries that refine documented architecture into implementation constraints.
- Durable repository-facing coding rules that should remain stable across routine changes.
- The documentation scope for future code-level refinements inside this branch.

Does NOT define:

- Product identity, public-page intent, or offer hierarchy.
- New architectural boundaries, persistent-state ownership, or external integration meaning.
- Task-specific change instructions, temporary debugging notes, or generated implementation artifacts.
