# SSR Pages

- Path: `ctx/docs/code/web/ssr/pages.md`
- Template Version: `20260630`
- Changed: `20260908`

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

## Target-State Requirement

The future public system must distinguish things available now, active products and technologies, customization capability, research, proof and history, writing, and a commercial next step.

This requirement does not establish one page per category or preserve current page names as final product architecture.

## Detailed Page Documents

Current route-boundary documents exist for:

- `pages/home.md`;
- `pages/contact.md`;
- `pages/work-with-me.md`.

They intentionally avoid final section order and copy. Add a new page document only after product and architecture decisions make its route and responsibility durable.

The former Agent Orchestration PoC page document has been retired because its offer is discontinued. Its remaining source template is legacy implementation outside this task.

## Preservation Rule

Historical and search-bearing pages should remain accessible or receive deliberate redirects when future implementation changes page families. A discontinued offer need not remain promoted merely because its route exists today.
