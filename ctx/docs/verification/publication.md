# Publication And Visitor-Path Checks

- Path: `ctx/docs/verification/publication.md`
- Template Version: `20260923`
- Changed: `20260923`

## P1 — Connected Visitor Responsibilities

Read [information architecture](../product/information-architecture.md), [Home composition](../product/home-page-composition.md), [architecture structure](../architecture/structure.md), [navigation](../code/web/ssr/navigation.md), and [page composition](../code/web/ssr/page-composition.md). Inspect rendered Home and navigation at desktop and narrow viewport, then follow paths to the current commercial entry, direct contact, current work, Journal, working-model explanation, About, and durable history. Check content order and useful handoffs without freezing a particular label, route tree, header-link count, or equal visual weight. Distinguish a missing accepted target from a deliberate open design choice.

## P2 — Semantic Pages And Preservation

Read [product system](../product/product-system.md), [information architecture](../product/information-architecture.md), [architecture constraints](../architecture/constraints.md), [routes](../code/web/ssr/routes.md), and applicable [page documents](../code/web/ssr/pages.md). Compare authored and served Home, Work with Alex, Contact, Current Work, Products, Alarisa, Journal, Library, and history routes. Verify current and historical material are differentiated, established valuable URLs resolve or redirect deliberately, and retired commercial routes do not recreate the offer. Do not treat a surviving old URL as authority for its former prominence or meaning. Inspect `etc/redirect-map.json`, source templates, and response status/target for route claims.

## P3 — Authored Sources And Evidence Chronology

Read [Journal and evidence](../product/journal-and-evidence.md), [architecture state](../architecture/state.md), [publication decisions](../architecture/decisions.md), and [rendering](../code/web/ssr/rendering.md). Trace a current Journal and Library article from locale Markdown in `tmpl/web/` through publication handling to HTML and raw Markdown responses. Verify titles and publication metadata, chronology, article relationships, current-state links, and discoverability. Check that generated `web/` content, indexes, sitemap, and `/llms.txt` match authored sources without becoming their authority. Run `npm test` and `npm run sitemap` where the publication scope changes; inspect the resulting routes and sitemap rather than relying on command exit alone. A historical event may remain accurate while its current status has changed.

## P4 — Locale, Metadata, Accessibility, And Failure Paths

Read [multilingual architecture constraints](../architecture/constraints.md), [localization](../code/web/ssr/localization.md), [rendering](../code/web/ssr/rendering.md), [assets](../code/web/ssr/assets.md), [responsive](../code/web/ssr/responsive.md), [UI states](../code/web/ssr/ui-states.md), and applicable component documents. For `en`, `ru`, and `es`, compare equivalent page structure, claims, link intent, canonical/alternate metadata, article routes, and discovery links. Inspect visible headings, image alt/captions, keyboard and narrow-viewport behavior, empty or missing content, 404/redirect behavior, and `HEAD` handling where relevant. Confirm the public origin comes from validated configuration, not request-controlled host headers. Use source inspection, focused tests, and rendered output together; a locale file count alone cannot prove semantic parity.
