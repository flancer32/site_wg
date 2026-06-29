# Filesystem Structure

- Path: `ctx/docs/filesystem.md`
- Template Version: `20260605`
- Changed: `20260629`

## Purpose

Defines the declarative structure of the repository at the top level only, listing root-level directories and root-level files and establishing repository boundaries as a navigation model.

## Root Structure

- `.agents/` — local agent-related assets outside the project cognitive context.
- `.codex/` — local Codex runtime assets outside the project cognitive context.
- `.git/` — Git metadata and repository history internals.
- `.github/` — repository-level automation and workflows.
- `_old/` — legacy or archived materials outside the active project model.
- `bin/` — executable entry points and bootstrap scripts.
- `ctx/` — cognitive context containing declarative documentation and agent-operational assets.
- `etc/` — deployment and system integration configuration assets.
- `node_modules/` — installed external dependencies outside project control.
- `src/` — source code of the site-supporting application.
- `tmp/` — temporary working files outside the durable model.
- `tmpl/` — content and template sources used to generate the public site.
- `var/` — runtime-generated data and caches.
- `web/` — generated or published web assets.

## Root Files

- `.env` — local environment configuration, not durable project knowledge.
- `.gitignore` — version control exclusion rules.
- `.markdownlint.json` — markdown lint configuration for the repository root.
- `AGENTS.md` — root-level agent instructions.
- `jsconfig.json` — JavaScript tooling configuration.
- `LICENSE` — license definition.
- `package-lock.json` — dependency lockfile.
- `package.json` — package metadata, dependencies, and scripts.
- `README.md` — repository description and usage entry point.
- `teqcms.config.mjs` — TeqCMS project configuration.
- `types.d.ts` — global type declarations.

## Scope Rule

This document must describe only top-level directories and root-level files of the repository.

Subdirectories must not be described here.

Lower-level structure must be described only by the corresponding `AGENTS.md` files within those directories.
