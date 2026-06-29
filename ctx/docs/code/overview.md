# Code Overview

- Path: `ctx/docs/code/overview.md`
- Template Version: `20260629`
- Changed: `20260629`

## Purpose

Provide a minimal entry point to the code documentation level.

## Role

This branch captures durable implementation constraints that are too specific for architecture or environment documents.
It refines those levels into source-facing rules without replacing them.

## Current Scope

At present, the branch is intentionally minimal.
Its immediate role is:

- to reserve the code documentation level in the ADSM dependency chain;
- to prevent source-level rules from being scattered into architecture and environment documents;
- to provide a stable location for future implementation constraints when they stop being incidental.

## Initial Constraints

Until this branch is expanded further, agents should treat the following as the active boundary:

- architecture documents remain the source of truth for system structure and responsibility boundaries;
- environment documents remain the source of truth for runtime prerequisites and host assumptions;
- new durable source-level rules should be added here before they spread implicitly through code changes.

## Initial Repository Boundaries

The current implementation-facing repository boundaries are:

- `src/` plus `teqcms.config.mjs` for project-specific runtime adaptation;
- `tmpl/` for page and partial sources rather than runtime logic;
- `web/` for generated or published output rather than primary authored implementation;
- `etc/` and `bin/` for environment-facing operational assets rather than product or architecture truth.
