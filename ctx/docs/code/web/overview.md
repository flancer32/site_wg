# Web Code Overview

- Path: `ctx/docs/code/web/overview.md`
- Template Version: `20260630`
- Changed: `20260909`

## Purpose

Provide the entry point for web-facing code documentation under `ctx/docs/code/`.

## Role

This branch isolates implementation-facing documentation for the site's web surface from other code-level concerns.

The current project uses a multilingual SSR site model built from authored templates under `tmpl/` and runtime adaptation under `src/`.

The accepted commercial target is product-led, and its navigation, route intents, and page roles are approved in the product information architecture. Final visual composition, interaction details, and public copy are not yet approved. Existing engineer-centric and GitHub-offer implementation is legacy drift rather than a source for new code contracts.

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
- `src/Back/Web/Handler/NotFound.js` — final localized HTML fallback for unresolved GET and HEAD requests;
- `src/Back/Di/Replace/Adapter.js` — project-specific render-data adaptation around the CMS renderer;
- `src/Back/Cli/Plugin.js` — application lifecycle plugin that registers project-specific web handlers before the standard web command starts;
- `bin/generate-sitemap.mjs` — deterministic multilingual sitemap generation from authored template routes;
- `teqcms.config.mjs` — pre-DI host configuration selecting the project CMS adapter and template engine provider;
- `etc/redirect-map.json` — declarative redirect source used by SSR request normalization.
