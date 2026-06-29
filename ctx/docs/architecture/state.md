# Architecture State

- Path: `ctx/docs/architecture/state.md`
- Template Version: `20260605`
- Changed: `20260629`

## Purpose

Describe state ownership and sources of truth.

## Sources Of Truth

The architecturally important sources of truth are:

- cognitive context documents under `ctx/` for durable project meaning and agent guidance;
- template and asset sources under `tmpl/` and source-controlled static assets under `web/img/` and related folders for site content inputs;
- repository configuration files such as `package.json` and `teqcms.config.mjs` for runtime and build binding.

## State Categories

State is divided into:

- authoritative durable state in version-controlled context, templates, code, and configuration;
- temporary execution state during CMS rendering, route resolution, and publication commands;
- derived publication state under `web/`, including generated HTML and navigation artifacts such as `sitemap.xml`.

## Ownership Boundaries

The ownership boundaries are:

- `ctx/` owns project meaning and must not be re-owned by runtime code;
- `tmpl/` owns page-source composition and multilingual copy inputs;
- `src/` and configuration own runtime adaptation logic;
- `web/` is derived output and must remain traceable to upstream durable sources.

## Ownership Rules

Humans own approval of new state categories and new durable sources of truth.
Agents may update existing durable state inside documented boundaries.
Agents must not implicitly promote generated output into an independent source of truth.

## State Authority

Durable state changes are authorized through repository edits approved by the human workflow.
Derived publication state stays valid only when it can be regenerated from authoritative sources.

## Change Discipline

Agents must not introduce new persistent state owners, external databases, or hidden generated-source loops without updating architecture documents and obtaining human approval.
