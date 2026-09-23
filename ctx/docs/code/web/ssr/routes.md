# SSR Routes

- Path: `ctx/docs/code/web/ssr/routes.md`
- Template Version: `20260630`
- Changed: `20260923`

## Purpose

Record current route facts and preservation constraints separately from unresolved target semantic destinations.

## Current Route Conventions

Public pages use `/{locale}/...` for `en`, `es`, and `ru`; locale resolution precedes rendering. Current directory indexes use trailing slashes and standalone/detail pages use `.html`. Current families include locale roots, About, Contact, Projects, Work With Me, Journal and dated articles, books, Library, project detail, localized 404, and Products. Retired commercial pages are redirect-only continuity routes, not authored page families.

Every dated Journal article has one locale-specific Markdown source at `tmpl/web/{locale}/blog/{year}/{slug}.md`. Every existing locale preserves its canonical URL at `/{locale}/blog/{year}/{slug}.html` and exposes the matching raw Markdown at `/{locale}/blog/{year}/{slug}.md`. `/llms.txt` specially lists the English Journal corpus for agent discovery; Russian and Spanish Markdown routes remain publicly retrievable directly.

Every Library article has one locale-specific Markdown source at `tmpl/web/{locale}/library/{path}/{slug}.md`. The existing `/{locale}/library/{path}/{slug}.html` URL remains the localized SSR presentation, and each locale also exposes its raw Markdown route. The Library indexes remain Nunjucks templates. The sitemap lists only canonical HTML URLs; root `/llms.txt` is the explicitly authored English Journal and Library Markdown discovery list plus the digest index, checked against the published source inventory by tests; it does not replace the sitemap.

The bounded PDE Telegram Digest family uses `tmpl/web/{locale}/products/pde/telegram-digest/index.md` and dated Markdown files. The index has canonical HTML URL `/{locale}/products/pde/telegram-digest/` and raw source `/{locale}/products/pde/telegram-digest/index.md`; there is no `index.html` publication route. Each dated digest has a derived `.html` URL and a raw `.md` URL. The sitemap includes only these canonical HTML URLs. `/llms.txt` lists the English index Markdown once as the discovery entry point, without listing the daily digests. This subtree does not make Products a generic catalogue.

`etc/redirect-map.json` normalizes selected legacy paths with locale overlay; static assets are excluded. Redirects are continuity tools and cannot silently create a target hierarchy.

## Current Commercial Route Facts

The repository currently authors `/{locale}/products/`. `/{locale}/products` and `/{locale}/products.html` are redirected continuity aliases; the stale authored English `products.html` source is retired. `/{locale}/index.html` permanently redirects to the canonical locale-root directory URL. `/{locale}/products/chatgpt-telegram.html`, `/{locale}/land/agent-orchestration-poc/`, legacy GitHub Flows routes, and old MCP-integration routes permanently redirect to the closest current destination before static or template delivery. Existing `/{locale}/work-with-me.html`, `/{locale}/projects/alarisa.html`, `/{locale}/about.html`, and `/{locale}/contact.html` are localized, canonical, indexable, and sitemap inputs where authored. `/{locale}/contacts.html` permanently redirects to the canonical Contact route and has no authored template.

`/{locale}/projects.html` is also retained, canonical, indexable, and now publicly serves as Current Work with stable status anchors for its current systems; historical material remains below it. These facts do not prove permanent labels, a generic Products catalogue, a permanent ChatGPT + Telegram product family, a top-level Alarisa route, or final commercial IA. They remain subject to later reviewed migration.

## Target And Preservation Rules

Target semantics require locale-aware access to Home, commercial entries and offer detail, current work/detail, Journal/Event chronology, working-model explanation, commercial handoff, and intentionally reachable About, books, durable knowledge, projects, and history. They do not authorize a symmetrical page tree or invent routes.

Every migration decision preserves multilingual equivalence, clean canonical URLs, alternate links, inbound search value, reviewed redirects, localized 404 behavior, sitemap determinism, and truthful historical access. A discontinued route may remain accessible only as a redirect or intentional historical page and cannot be promoted as current solely because it exists.
