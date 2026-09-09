# SSR Page Composition

- Path: `ctx/docs/code/web/ssr/page-composition.md`
- Template Version: `20260630`
- Changed: `20260909`

## Purpose

Define stable shared composition rules and map the accepted Home semantic composition while leaving final copy and visual implementation open.

## Stable Composition

- Locale-specific `inc/layout.html` is the common outer shell.
- `inc/nav.html` and `inc/footer.html` remain shared rather than repeated in every page.
- Page templates provide route-specific metadata and content inside the shared shell.
- Journal and library detail pages may use the publication discussion surface.
- Journal indexes receive their prepared item collection through existing render enrichment.
- Shared accessibility, localization, responsive, canonical, and alternate-link behavior applies across page families.

## Commercial Target

Target composition makes products and outcomes more prominent than biography, generic services, internal technology categories, or legacy content. Primary composition supports Products, Product Detail, How it works, Alarisa, honest boundaries, and the shared commercial action according to `../../../product/information-architecture.md`. About is secondary trust evidence; customization is exposed from product journeys and How it works.

Project Archive, Library, Journal, Books, technical material, and historical proof belong to a secondary knowledge and archive role by default. They must remain meaningfully discoverable through an approved combination of curated footer or other secondary navigation, contextual or related-content links, existing inbound routes, and redirects where required. Merely retaining template files is insufficient; a generic hub is optional rather than assumed.

It must also preserve Alarisa as the strategically central vision and long-term R&D direction without presenting it as a product, conventional project, single runtime, or roadmap. Standalone products and offers discovered along that path must remain directly reachable; their exploration lineage may be explained after the buyer outcome rather than imposed as a prerequisite.

Home follows the approved semantic sequence of product-maker positioning, a replaceable current-products collection, adaptation possibilities, concise How-it-works explanation, Alarisa direction, maker and selected evidence, and the commercial action. The detailed desktop and mobile content composition is defined in `../../../product/home-page-composition.md`. On desktop, the proposition and at least one real current product or a very direct product-discovery path must be discoverable before significant scrolling; pairing a compact hero with a featured product is a preferred hypothesis, not required geometry. Mobile places the first product immediately after a shortened hero. This sequence may combine adjacent meanings into visual sections but must not reverse buyer value and supporting explanation or make Telegram a permanent structural centre.

This document does not prescribe final headlines, body copy, exact card count for a larger catalogue, illustrations, hero/product adjacency, card placement, visual grouping, component markup, pixels, breakpoints, responsive mechanics, detailed page styling, contact form fields, or offer interaction state. Those choices require later copy and interface design, but they must preserve the approved semantic composition and first-viewport attention.

## Legacy Composition

Existing templates may still contain:

- an engineer-centric home and service hierarchy;
- a GitHub offer landing page and form;
- a contact page that promotes GitHub Flows;
- Alarisa hidden as irrelevant research or presented as a product, conventional project, monolithic system, or package whose parts are being sold separately.

These structures are legacy drift. They may be retained temporarily for a valid staged transition, but must not be copied into new templates or treated as acceptance criteria.

## Preservation Gate

Before composition changes remove or relocate content, implementation work must inventory affected URLs and decide whether to keep, repurpose, redirect, or preserve archive access. Retained content needs an intentional internal discovery path, and locale branches must remain semantically aligned.
