# Product Visitor Paths

- Path: `ctx/docs/verification/product/visitor-paths.md`
- Template Version: `20260923`
- Changed: `20260923`

## P1 — Connected Visitor Responsibilities

Read [information architecture](../../product/information-architecture.md), [Home composition](../../product/home-page-composition.md), [architecture structure](../../architecture/structure.md), [navigation](../../code/web/ssr/navigation.md), and [page composition](../../code/web/ssr/page-composition.md). Inspect rendered Home and navigation at desktop and narrow viewport, then follow paths to the current commercial entry, direct contact, current work, Journal, working-model explanation, About, and durable history. Check content order and useful handoffs without freezing a particular label, route tree, header-link count, or equal visual weight. Distinguish a missing accepted target from a deliberate open design choice.

**Applicability:** A maintained public page and viewport are available.

**Expected observation:** Sell, Demonstrate, and Document paths remain discoverable with the documented Home attention order.

**Reach and blind spot:** A path walk samples actual UI states; it cannot freeze future labels or prove all visitor behavior.

**Follow-up:** Record provenance and the observed state. If the expectation fails, localize the failing declaration before proposing a cause; after an authorized correction, repeat this check against the same expectation.

## P2 — Semantic Pages And Preservation

Read [product system](../../product/product-system.md), [information architecture](../../product/information-architecture.md), [architecture constraints](../../architecture/constraints.md), [routes](../../code/web/ssr/routes.md), and applicable [page documents](../../code/web/ssr/pages.md). Compare authored and served Home, Work with Alex, Contact, Current Work, Products, Alarisa, Journal, Library, and history routes. Verify current and historical material are differentiated, established valuable URLs resolve or redirect deliberately, and retired commercial routes do not recreate the offer. Do not treat a surviving old URL as authority for its former prominence or meaning. Inspect `etc/redirect-map.json`, source templates, and response status/target for route claims.

**Applicability:** A named current or historical route is authored or previously public.

**Expected observation:** The route resolves or redirects deliberately while preserving the documented status and history distinction.

**Reach and blind spot:** Route resolution alone does not prove semantic correctness or completeness of historical preservation.

**Follow-up:** Record provenance and the observed state. If the expectation fails, localize the failing declaration before proposing a cause; after an authorized correction, repeat this check against the same expectation.
