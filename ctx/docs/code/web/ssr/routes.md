# SSR Routes

- Path: `ctx/docs/code/web/ssr/routes.md`
- Template Version: `20260630`
- Changed: `20260910`

## Purpose

Record current route facts and preservation constraints separately from unresolved target semantic destinations.

## Current Route Conventions

Public pages use `/{locale}/...` for `en`, `es`, and `ru`; locale resolution precedes rendering. Current directory indexes use trailing slashes and standalone/detail pages use `.html`. Current families include locale roots, About, Contact, Projects, Work With Me, Journal and dated articles, books, Library, project detail, localized 404, Products and ChatGPT + Telegram pages, plus the archived nested GitHub campaign route.

`etc/redirect-map.json` normalizes selected legacy paths with locale overlay; static assets are excluded. Redirects are continuity tools and cannot silently create a target hierarchy.

## Current Commercial Route Facts

The repository currently authors `/{locale}/products/` and `/{locale}/products/chatgpt-telegram.html` in all maintained locales. `/{locale}/products` and `/{locale}/products.html` are catalogue aliases. Existing `/{locale}/work-with-me.html`, `/{locale}/projects/alarisa.html`, `/{locale}/about.html`, and `/{locale}/contact.html` are localized, canonical, indexable, and sitemap inputs where authored.

`/{locale}/projects.html` is also retained, canonical, indexable, and now publicly serves as Current Work with stable status anchors for its current systems; historical material remains below it. These facts do not prove permanent labels, a generic Products catalogue, a permanent ChatGPT + Telegram product family, a top-level Alarisa route, or final commercial IA. They remain subject to later reviewed migration.

## Target And Preservation Rules

Target semantics require locale-aware access to Home, commercial entries and offer detail, current work/detail, Journal/Event chronology, working-model explanation, commercial handoff, and intentionally reachable About, books, durable knowledge, projects, and history. They do not authorize a symmetrical page tree or invent routes.

Every migration decision preserves multilingual equivalence, clean canonical URLs, alternate links, inbound search value, reviewed redirects, localized 404 behavior, sitemap determinism, and truthful historical access. A discontinued route may remain accessible but cannot be promoted as current solely because it exists.
