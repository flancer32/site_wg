# SSR Pages

- Path: `ctx/docs/code/web/ssr/pages.md`
- Template Version: `20260630`
- Changed: `20260910`

## Purpose

Describe current page families and the boundary for future page-level contracts.

## Current Families

The current locale template tree contains:

- locale home pages;
- standalone pages such as About, Contact, Projects, and Work With Me;
- journal indexes and dated articles;
- library indexes and articles;
- book pages;
- project indexes and detail pages;
- a localized nested archived-experiment page;
- localized not-found pages.

## Target Families

The target primary page families are:

- Home;
- Products index;
- Product detail;
- How it works;
- Alarisa vision;
- shared commercial handoff.

The target secondary page families are About and maker trust, Project Archive and detail, Library index and detail, Journal index and detail, Books, and retained historical material. A cross-collection Resources or Knowledge hub is not required unless later evidence establishes a distinct visitor job.

Primary and secondary families share the same locale-aware SSR shell. Family status controls discovery and page responsibility, not runtime isolation.

## Page Documents

Route-boundary documents exist for:

- `pages/about.md`;
- `pages/alarisa.md`;
- `pages/contact.md`;
- `pages/home.md`;
- `pages/how-it-works.md`;
- `pages/product-detail.md`;
- `pages/products.md`;
- `pages/work-with-me.md`.

They document current route evidence and approved semantic responsibilities without selecting the target path for repurposed or new families. Product Detail and How it works are durable semantic families even though their routes remain open. The former provisional Telegram, Resources, and Technology target page documents were removed because they froze an unimplemented route and page split that the selected IA does not approve. Add another route-specific target document only after product, migration, and architecture decisions make its route and responsibility durable.

The former Agent Orchestration PoC page document has been retired because its offer is discontinued. Its remaining localized route is an archived historical page, outside primary navigation and the current product taxonomy.

## Preservation Rule

Historical and search-bearing pages should remain accessible, have a meaningful secondary or contextual internal discovery path, or receive deliberate redirects when future implementation changes page families. A discontinued offer or legacy category need not remain promoted or in primary navigation merely because its route exists today.
