# Architecture Decisions

- Path: `ctx/docs/architecture/decisions.md`
- Template Version: `20260605`
- Changed: `20260629`

## Purpose

Record durable architecture decisions in a short ADR-like form.

## Decision Entries

## Decision 1: Keep the site on TeqCMS with a thin project adapter

- Decision: use TeqCMS as the primary site engine and keep repository-specific runtime logic in a small adapter layer under `src/`.
- Rejected alternatives: build a custom site engine in the repository; move all behavior into templates without adapter logic.
- Reasoning: the project needs a working multilingual publication engine with small targeted customizations, not a second full application framework inside the site repository.

## Decision 2: Treat template and context sources as authoritative, and `web/` as derived

- Decision: keep durable authored meaning in `ctx/`, `tmpl/`, and source-controlled configuration, while treating published site files under `web/` as downstream output.
- Rejected alternatives: edit generated output as primary content; merge product meaning into generated web files.
- Reasoning: ADSM compatibility depends on explicit authoritative sources and traceable derived artifacts.

## Decision 3: Keep multilingual routing locale-aware at the application boundary

- Decision: resolve locale and clean route information in the adapter boundary before applying route-specific render enrichment.
- Rejected alternatives: duplicate locale logic independently inside multiple templates or route handlers.
- Reasoning: locale normalization is cross-cutting runtime behavior and belongs in one adapter boundary rather than scattered template logic.
