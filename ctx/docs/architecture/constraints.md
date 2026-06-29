# Architecture Constraints

- Path: `ctx/docs/architecture/constraints.md`
- Template Version: `20260605`
- Changed: `20260629`

## Purpose

Record non-negotiable architecture restrictions and trust boundaries.

## Core Constraints

The architecture must preserve these properties:

- cognitive context under `ctx/` remains the authoritative knowledge space above implementation;
- the site remains primarily a template-driven multilingual publication system rather than a large custom application;
- `web/` remains a derived publication artifact, not an independent authored source of truth;
- project-specific backend code stays thin and justified by concrete gaps in generic CMS behavior.

## Boundary Constraints

Architecture must not:

- redefine product meaning that already belongs to `ctx/docs/product/`;
- hide new persistent state inside runtime or generated artifacts;
- normalize deployment-specific assumptions into product or architecture truth without explicit documentation.

## Change Constraints

The following changes always require human approval:

- introducing new architectural owners or major runtime areas;
- introducing new persistent state or database-backed authority;
- introducing new external integrations or publication dependencies;
- turning generated site output into a primary editable source.
