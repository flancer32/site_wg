# SSR Routes

- Path: `ctx/docs/code/web/ssr/routes.md`
- Template Version: `20260630`
- Changed: `20260911`

## Purpose

Record current route facts and preservation constraints separately from unresolved target semantic destinations.

## Current Route Conventions

Public pages use `/{locale}/...` for `en`, `es`, and `ru`; locale resolution precedes rendering. Current directory indexes use trailing slashes and standalone/detail pages use `.html`. Current families include locale roots, About, Contact, Projects, Work With Me, Journal and dated articles, books, Library, project detail, localized 404, and Products. Retired commercial pages are redirect-only continuity routes, not authored page families.

`etc/redirect-map.json` normalizes selected legacy paths with locale overlay; static assets are excluded. Redirects are continuity tools and cannot silently create a target hierarchy.

## Current Commercial Route Facts

The repository currently authors `/{locale}/products/`. `/{locale}/products` and `/{locale}/products.html` are redirected continuity aliases; the stale authored English `products.html` source is retired. `/{locale}/products/chatgpt-telegram.html` and `/{locale}/land/agent-orchestration-poc/` are retired commercial routes that permanently redirect to the closest current destination before static or template delivery. Existing `/{locale}/work-with-me.html`, `/{locale}/projects/alarisa.html`, `/{locale}/about.html`, and `/{locale}/contact.html` are localized, canonical, indexable, and sitemap inputs where authored. `/{locale}/contacts.html` permanently redirects to the canonical Contact route and has no authored template.

`/{locale}/projects.html` is also retained, canonical, indexable, and now publicly serves as Current Work with stable status anchors for its current systems; historical material remains below it. These facts do not prove permanent labels, a generic Products catalogue, a permanent ChatGPT + Telegram product family, a top-level Alarisa route, or final commercial IA. They remain subject to later reviewed migration.

## Target And Preservation Rules

Target semantics require locale-aware access to Home, commercial entries and offer detail, current work/detail, Journal/Event chronology, working-model explanation, commercial handoff, and intentionally reachable About, books, durable knowledge, projects, and history. They do not authorize a symmetrical page tree or invent routes.

Every migration decision preserves multilingual equivalence, clean canonical URLs, alternate links, inbound search value, reviewed redirects, localized 404 behavior, sitemap determinism, and truthful historical access. A discontinued route may remain accessible only as a redirect or intentional historical page and cannot be promoted as current solely because it exists.
