# SSR Web Application Overview

- Path: `ctx/docs/code/web/ssr/overview.md`
- Template Version: `20260630`
- Changed: `20260909`

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

These observed families and their current navigation positions do not define the commercial hierarchy. The approved target uses Products, How it works, and Alarisa as primary meanings, the brand link for Home, and a distinct shared commercial action. About is secondary maker evidence. Customization is exposed through product journeys and How it works. Project Archive, Library, Journal, Books, technical material, and history form the secondary discovery surface.

The two surfaces are semantic roles rendered through the same SSR system, not separate applications. Page responsibility and future route selection follow `../../../product/information-architecture.md`. Exact paths, final copy, styling, and responsive composition remain open. Retained content must remain intentionally discoverable after it leaves primary navigation.

## Product Runtime Boundary

The SSR site may publish information about PDE and the Telegram offer. It must not connect to Telegram, expose MCP capabilities, provision product instances, or store customer product credentials unless a later approved architecture explicitly adds those responsibilities.

## Legacy Drift

Current code may still inject a signed form token for the discontinued Agent Orchestration PoC route. That behavior is an implementation remnant, not a reusable offer-page pattern or target requirement.

No future agent should infer a new Telegram landing page, form, route, state, or browser behavior from the old campaign implementation.
