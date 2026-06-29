# Architecture Integration

- Path: `ctx/docs/architecture/integration.md`
- Template Version: `20260605`
- Changed: `20260629`

## Purpose

Describe external integrations and major internal contracts between architectural blocks.

## External Integrations

The architecturally significant external integrations are:

- TeqCMS as the site engine used for rendering and translation-oriented workflows;
- Node.js as the runtime for local execution and publication commands;
- public external sites linked as product destinations, including TeqFW, Leanpub landing pages, and external profile platforms;
- host-level deployment surfaces implied by `bin/` and `etc/`, including service and redirect configuration artifacts.

## Internal Contracts

The major internal contract surfaces are:

- the contract between `teqcms.config.mjs` and `src/`, where the project replaces the generic CMS adapter with repository-specific behavior;
- the contract between request routing and multilingual template content, where locale extraction determines which content branch is rendered;
- the contract between template sources and the publication block, where TeqCMS materializes browser-facing output into `web/`.

## Boundary Rules

- New runtime integrations must be documented here before they become durable implementation assumptions.
- Internal contract descriptions must stay at boundary level rather than module-by-module API detail.
- Product links may evolve, but new categories of external dependency require architectural review.
