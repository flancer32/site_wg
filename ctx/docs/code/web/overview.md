# Web Code Overview

- Path: `ctx/docs/code/web/overview.md`
- Template Version: `20260630`
- Changed: `20260630`

## Purpose

Provide the entry point for web-facing code documentation under `ctx/docs/code/`.

## Role

This branch isolates implementation-facing documentation for the site's web surface from other code-level concerns such as funnel-event contracts.

The current project uses a multilingual SSR site model built from authored templates under `tmpl/` and runtime adaptation under `src/`.

## Current Scope

At present, the web code branch is intentionally narrow.

Its role is:

- to describe the SSR web application as delivered by the current project;
- to document route, rendering, layout, page, locale, and asset structure that is visible in the repository;
- to keep web-facing source rules out of generic code notes.

## Local Branches

The current web-facing code branch contains:

- `ssr/` — the implementation-facing SSR web-application model for this site.

## Repository Anchors

The current SSR web branch is anchored in these repository areas:

- `tmpl/web/` — authored locale-specific templates, shared partials, and page families;
- `src/Back/Web/Cms/Handler/` — custom SSR request enrichment and redirect handling;
- `src/Back/Web/Handler/SendEmail.js` — web request handler for programmatic form-to-email delivery via SMTP;
- `src/Back/Di/Replace/Adapter.js` — project-specific render-data adaptation around the CMS renderer;
- `src/Back/Di/Replace/WebCommand.js` — DI replacement that registers project-specific web handlers alongside the standard CMS pipeline;
- `teqcms.config.mjs` — DI container configuration binding project namespace roots and replacements;
- `etc/redirect-map.json` — declarative redirect source used by SSR request normalization.
