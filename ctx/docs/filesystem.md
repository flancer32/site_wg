# Filesystem Structure

- Path: `ctx/docs/filesystem.md`
- Template Version: `20260605`
- Changed: `20260629`

## Purpose

Defines the declarative structure of the repository at the top level only, listing durable root-level directories and files and establishing repository boundaries as a navigation model.

## Root Structure

- `.git/` — Git metadata and repository history internals.
- `.github/` — repository-level automation and workflows.
- `_old/` — legacy or archived materials outside the active project model.
- `bin/` — executable entry points and bootstrap scripts.
- `ctx/` — cognitive context containing declarative documentation and agent-operational assets.
- `etc/` — deployment and system integration configuration assets.
- `src/` — source code of the site-supporting application.
- `tmpl/` — content and template sources used to generate the public site.
- `web/` — generated or published web assets.

## Local And Generated Directories

The following top-level directories may exist locally or during execution, but they are outside the durable repository model:

- `.agents/` — local agent-related assets outside the durable project model.
- `.codex/` — local Codex runtime assets outside the durable project model.
- `node_modules/` — installed external dependencies and package manager output.
- `tmp/` — temporary working files outside durable project knowledge.
- `var/` — runtime-generated data and caches.

## Root Files

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

## Local Root Files

The following root-level file may exist locally, but it is outside the durable repository model:

- `.env` — local environment configuration outside durable project knowledge.

## Scope Rule

This document must describe only top-level directories and root-level files of the repository.

Subdirectories must not be described here.

Lower-level structure must be described only by the corresponding `AGENTS.md` files within those directories.
