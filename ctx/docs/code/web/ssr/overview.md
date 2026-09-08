# SSR Web Application Overview

- Path: `ctx/docs/code/web/ssr/overview.md`
- Template Version: `20260630`
- Changed: `20260908`

## Purpose

Describe the stable SSR implementation model and its boundary with the unimplemented commercial target.

## Delivery Model

The site is a multilingual SSR site built on `@flancer32/teq-cms`.

It:

- stores authored page templates under `tmpl/web/{locale}/`;
- uses Nunjucks-style inheritance and includes;
- injects bounded project behavior through `src/Back/Di/Replace/Adapter.js`;
- serves browser output through the CMS runtime;
- treats light browser JavaScript as enhancement rather than the primary delivery mechanism.

## Stable SSR Chain

`HTTP request -> locale-aware route extraction -> redirect normalization -> CMS render data -> bounded project enrichment -> locale template -> HTML response or localized 404`

Stable enrichments include locale metadata, route classification, redirect behavior, and journal-index assembly.

## Current Public Families

The existing templates include locale roots, standalone pages, journal pages, library material, project pages, book pages, historical material, and a legacy campaign landing page.

These observed families do not define the future commercial hierarchy. The target context requires distinguishing offers, products and capabilities, customization, research, proof, writing, and contact, but final route and page mapping is intentionally open.

## Product Runtime Boundary

The SSR site may publish information about PDE and the Telegram offer. It must not connect to Telegram, expose MCP capabilities, provision product instances, or store customer product credentials unless a later approved architecture explicitly adds those responsibilities.

## Legacy Drift

Current code may still inject a signed form token for the discontinued Agent Orchestration PoC route. That behavior is an implementation remnant, not a reusable offer-page pattern or target requirement.

No future agent should infer a new Telegram landing page, form, route, state, or browser behavior from the old campaign implementation.
