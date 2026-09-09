# SSR Pages

- Path: `ctx/docs/code/web/ssr/pages.md`
- Template Version: `20260630`
- Changed: `20260909`

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
- a legacy nested campaign page;
- localized not-found pages.

## Target Families

The target primary page families are:

- Home;
- Products index;
- Telegram offer detail;
- Custom Development;
- Alarisa;
- Technology;
- About;
- Contact commercial handoff.

The target secondary page families are Resources, Project archive and detail, Library index and detail, Journal index and detail, Books, and retained historical material.

Primary and secondary families share the same locale-aware SSR shell. Family status controls discovery and page responsibility, not runtime isolation.

## Page Documents

Route-boundary documents exist for:

- `pages/about.md`;
- `pages/alarisa.md`;
- `pages/chatgpt-telegram.md`;
- `pages/contact.md`;
- `pages/home.md`;
- `pages/products.md`;
- `pages/resources.md`;
- `pages/technology.md`;
- `pages/work-with-me.md`.

They define approved route roles and semantic composition without final copy or visual design. Add another page document only after product and architecture decisions make its route and responsibility durable.

The former Agent Orchestration PoC page document has been retired because its offer is discontinued. Its remaining source template is legacy implementation outside this task.

## Preservation Rule

Historical and search-bearing pages should remain accessible, have a meaningful secondary or contextual internal discovery path, or receive deliberate redirects when future implementation changes page families. A discontinued offer or legacy category need not remain promoted or in primary navigation merely because its route exists today.
