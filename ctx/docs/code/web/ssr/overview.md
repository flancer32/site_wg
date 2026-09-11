# SSR Web Application Overview

- Path: `ctx/docs/code/web/ssr/overview.md`
- Template Version: `20260630`
- Changed: `20260910`

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

The existing templates include locale roots, standalone pages, journal pages, library material, project pages, book pages, and historical material.

The shared header currently makes commercial entries, Journal, working-model explanation, Current Work, and a distinct commercial action directly discoverable. About, books, durable knowledge, project detail, and history remain intentionally reachable. `/projects.html` is the Current Work surface: it gives current system status separately from its historical archive. Journal is active evidence, not ordinary archive material; related Events can link to a current-state anchor while chronology remains non-authoritative. Alarisa is a major ongoing proof and direction, not the foundation or a required primary destination.

The two surfaces are semantic roles rendered through the same SSR system, not separate applications. Page responsibility and future route selection follow `../../../product/information-architecture.md`. Exact paths, final copy, styling, and responsive composition remain open. Retained content must remain intentionally discoverable after it leaves primary navigation.

## Product Runtime Boundary

The SSR site may publish information about PDE and other current systems as engineering evidence. It must not connect to external product services, provision product instances, or store customer product credentials unless a later approved architecture explicitly adds those responsibilities.

## Retired Campaign Boundary

The Agent Orchestration PoC route is removed and redirects to Work with Alex. No future agent should infer a landing page, form, route, state, or browser behavior from the retired campaign.
