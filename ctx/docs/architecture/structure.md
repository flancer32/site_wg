# Architecture Structure

- Path: `ctx/docs/architecture/structure.md`
- Template Version: `20260605`
- Changed: `20260629`

## Purpose

Describe the major architectural blocks, runtime areas, and responsibility boundaries.

## Architectural Blocks

The main architectural blocks are:

- `ctx/` as the cognitive-context block that governs product and agent-facing project knowledge;
- `tmpl/web/` as the template-content block that stores multilingual page sources and shared partials;
- `src/` plus `teqcms.config.mjs` as the application-extension block that injects repository-specific behavior into TeqCMS;
- `web/` as the publication block that stores rendered site assets and static resources;
- `bin/` and `etc/` as the operational-support block for deployment-oriented scripts and host configuration artifacts.

## Responsibility Boundaries

The stable boundaries are:

- cognitive context defines meaning and rules, but does not act as runtime implementation;
- template content defines page source material and layout composition, but does not own request routing decisions;
- the application extension owns project-specific runtime adaptation, including CMS adapter replacement, route normalization, redirect handling, and blog-index injection;
- publication output owns browser-delivered artifacts, but remains downstream of template and application sources;
- operational-support artifacts bind the project to concrete deployment or hosting environments without redefining product or architecture meaning.

## Boundary Notes

The repository currently keeps the application layer intentionally thin.

Most site behavior is delegated to TeqCMS and template content, while project-specific code exists only where the generic CMS behavior is insufficient.

## Optional Expansion

If the project grows, deeper structure documents may be created under `structure/`.

No deeper structure branch is justified at the current scale.
