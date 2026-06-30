# Architecture Overview

- Path: `ctx/docs/architecture/overview.md`
- Template Version: `20260605`
- Changed: `20260629`

## Purpose

Provide a compact entry point to the architecture level.

## Architecture Role

This level translates the product intent of a multilingual commercial personal site into a stable engineering structure that supports:

- template-authored public pages;
- generated static publication artifacts under `web/`;
- request-time rendering support from TeqCMS;
- small project-specific backend extensions for routing and blog aggregation;
- optional narrow validation flows for commercial offers when they stay bounded and explicitly documented.

## Architectural Style

The project uses a content-oriented static-site architecture with a thin Node.js application layer.

The dominant organizing principle is:

- author and maintain durable intent in `ctx/` and `tmpl/`;
- bind TeqCMS to project-specific behavior through a small adapter layer in `src/`;
- publish generated artifacts into `web/`;
- serve the resulting site through the TeqCMS runtime or a published static output flow.

## Major Areas

The main architectural areas are:

- cognitive context under `ctx/`, which defines durable project meaning and agent guidance;
- template source under `tmpl/`, which holds multilingual page and partial sources;
- application extension under `src/` plus `teqcms.config.mjs`, which adapts TeqCMS to project-specific routing and rendering behavior;
- publication output under `web/`, which contains generated or published site assets;
- operational and deployment support under `bin/` and `etc/`.

## Documentation Map

Use this level in the following navigation pattern:

- Read `structure.md` for major architectural areas and boundaries.
- Read `behavior.md` for build-time and request-time flows.
- Read `state.md` for sources of truth and derived publication artifacts.
- Read `integration.md` for TeqCMS, Node.js, deployment, and external-public-link boundaries.
- Read `constraints.md` for non-negotiable architecture restrictions.
- Read `decisions.md` for durable choices and rejected alternatives.
- Read `supervision.md` for human-agent change boundaries.

## Product Dependency

Architecture depends on product documentation.
It defines how the documented product is realized structurally and must not redefine product meaning or invent missing public behavior silently.

## Collaboration

One human and many agents use this architecture level as the coordination surface between product intent and repository changes.

Humans set product direction and approve architectural boundary changes.

Agents may refine the implementation only within documented architectural boundaries and should update architecture documents before introducing new architectural concepts.
