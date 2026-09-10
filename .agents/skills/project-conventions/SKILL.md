---
name: project-conventions
description: Project-specific conventions. Use for every task in this repository.
---

# Project Conventions

`AGENTS.md` overrides this file.

## Repositories

- The root repository is `flancer32/site_wg`; `ctx/` is part of the same Git repository. Include `ctx/` in root Git operations; do not treat it as a separate repository or worktree.
- `ctx/` is the authoritative cognitive context for product, architecture, environment, and code constraints.

## Workflow

- Work in the repository's `main` branch. This project rule overrides any GitHub-skill instruction to use a separate branch.
- At the start of work, inspect `git status --short --branch`, `git worktree list`, and the applicable `AGENTS.md` files. Check upstream state in the root repository; `ctx/` has no separate repository state. If local `main` is behind upstream and the worktree is clean, synchronize it with a safe fast-forward only.
- Before changes, inspect the affected source, tests, package metadata, and relevant `ctx/docs` documents.
- Do not commit or push unless the user requests it. Ask the user when a missing decision would change behavior or grant external authority.

## Project-local skills

- Before reading a project-local skill, inspect its directory entry with `ls -la` and resolve symlinks with `readlink -f` (or an equivalent command). Project skills may be symlinks into `node_modules`; do not conclude that a skill is absent until its target has been checked.

## Communication

- User communication is in Russian; source code, comments, documentation, commit messages, and identifiers are in English.
- Report changes, verification, and remaining risks.

## Project boundaries

- `src/` and `teqcms.config.mjs` contain thin project-specific runtime adaptation; `tmpl/` contains authored public pages and shared partials; `web/` contains generated or published output; `bin/` and `etc/` contain operational assets.
- Preserve one multilingual TeqCMS SSR/publication site. Do not introduce a new site engine, separate application, persistent source of truth, customer or product runtime, credentials, payment, CRM, provisioning, or analytics system without explicit human approval and corresponding context updates.
- Treat `ctx/` as normative knowledge above implementation. Existing implementation and generated output are evidence of current behavior, not authority to override accepted product or architecture decisions. Preserve the separation between authored inputs and derived `web/` output, and keep Alex accountable for consequential decisions when AI agents participate.

## Validation

- Run `npm test` for runtime, template, route, generated-output, or test changes.
- Run `npm run typecheck` for JavaScript, TypeScript configuration, or type-contract changes.
- Run `npm run sitemap` when templates, routes, locales, or public URLs change, and verify the resulting `web/sitemap.xml` when it is part of the affected output.
- Run `git diff --check` before handoff.

## GitHub

- In all multiline text sent to GitHub, including issues and comments, use actual line breaks; never send literal `\n`, which GitHub displays as text.

## Shared memory

- `flancer32/ai-memo` is the shared cross-project issue tracker and memory.
- Issue source: `flancer32/site_wg`; expected resolver: `flancer32/site_wg`. Every issue must name the project or projects expected to resolve it.
- Notes for this project use `project/flancer32/site_wg/`.
- When referring to a commit in another repository, use its full GitHub URL: `https://github.com/vendor/name/commit/<sha>`.
