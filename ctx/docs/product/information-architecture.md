# Commercial Information Architecture

- Path: `ctx/docs/product/information-architecture.md`
- Template Version: `20260909`
- Changed: `20260909`

## Purpose

Define the approved target information architecture for wiredgeese.com: navigation hierarchy, public page roles, canonical route intents, commercial journeys, and preservation paths. This document defines structure and semantics, not final visual design or finished public copy.

## Decision Basis

Facts established by the accepted product context:

- Wired Geese must lead with independently valuable products and outcomes rather than generic access to Alex as a developer;
- `Connect your ChatGPT to your Telegram` is the current active commercial offer;
- Alarisa is the principal long-term R&D project and must remain prominent without being presented as purchasable now;
- Alex Gusev is the accountable maker working with AI-agent production participants;
- Projects, Library, Journal, Books, and historical materials retain evidence and search value without requiring primary-navigation prominence;
- the public site supports understanding and commercial contact, not automated provisioning or product operation.

Observed implementation facts:

- the locale root, `about.html`, `contact.html`, `work-with-me.html`, `projects.html`, `projects/alarisa.html`, `library/`, `blog/`, and the current book route already have public equivalents;
- `products.html` exists as a legacy authored source and currently redirects to `projects.html`;
- no dedicated Technology, Resources, or Telegram-offer route currently exists across all locales.

The value of individual legacy URLs, backlinks, and search traffic is unknown until measured. The target therefore reuses established routes where their future role remains coherent and requires an evidence-based redirect review before implementation removes or changes any route.

## Primary Header

The approved desktop and compact-menu information hierarchy is:

1. brand link: `Wired Geese`, with `by Alex Gusev` available as subordinate maker attribution, links to `/{locale}/`;
2. `Products`, links to `/{locale}/products.html`;
3. `Custom Development`, links to `/{locale}/work-with-me.html`;
4. `Alarisa`, links to `/{locale}/projects/alarisa.html`;
5. `Technology`, links to `/{locale}/technology.html`;
6. `About`, links to `/{locale}/about.html`;
7. distinct commercial action `Discuss your need`, links to `/{locale}/contact.html`.

`Home` is represented by the brand link and is not duplicated as a text navigation item. `Contact` is represented by the action rather than as an equal content category. `Resources`, Projects, Library, Journal, and Books do not belong in primary navigation.

These English labels define canonical navigation meanings. Russian and Spanish labels must be idiomatic semantic equivalents approved with public copy; they must not be mechanical translations that change the hierarchy or action.

## Primary Page Roles

### Home — `/{locale}/`

Home is the shortest complete path through the commercial model. Its approved semantic sequence is:

1. Wired Geese identity and the useful class of products it builds;
2. the current Telegram product outcome and offer;
3. early-adopter fit plus experimental, trust, credential, and deployment boundaries;
4. the customization and integration path;
5. Alarisa as the strategically central R&D direction and future product candidate;
6. Alex's accountable maker role and the TeqFW, ADSM, and AI-agent-assisted production system;
7. selected practical-use and historical proof with a path into Resources;
8. the commercial next action.

This sequence is hierarchical, not a requirement that every item become exactly one visual section. Buyer outcome must precede internal platform explanation and maker identity.

### Products — `/{locale}/products.html`

Products is the primary commercial inventory. It must:

- lead with the independently deliverable product behind the Telegram offer and route to its detail page;
- distinguish `available now`, `experimental capability`, and `future candidate` statuses;
- expose customization as a continuation of a product need;
- avoid presenting Shared Files, the World Map, general memory, PDE, or Alarisa as equal purchasable products without their own approved commercial status;
- explain R&D lineage only after the buyer-facing outcome and status.

The existing `products.html -> projects.html` redirect is legacy behavior to retire when localized target product pages exist.

### Telegram Offer — `/{locale}/products/chatgpt-telegram.html`

This page is the focused conversion surface for `Connect your ChatGPT to your Telegram`. It owns the buyer problem, supported outcomes, provisional fit, experimental status, deployment and credential boundary, evidence, exclusions, customization path, and a link to the contact action.

It may expose relevant Telegram articles and technical depth contextually, but it must not require Alarisa or PDE knowledge before the offer is understood.

### Custom Development — `/{locale}/work-with-me.html`

The existing route is retained and repurposed under the `Custom Development` navigation meaning. It covers:

- deployment, integration, and customization of current products and capabilities;
- new Desks or adjacent integrations where a bounded customer outcome justifies them;
- related modern web application work where TeqFW, ADSM, Alarisa, PDE, or Alex's product base provides material leverage.

It is not a generic staff-augmentation, CV, hourly-rate, or unrestricted consultancy catalogue.

### Alarisa — `/{locale}/projects/alarisa.html`

The existing route is retained but becomes a direct primary destination rather than something discoverable only through Projects. The page presents:

- the principal long-term R&D direction and personal intelligent-assistant vision;
- current experimental and practical-use status;
- the `Principal` domain concept and explicit human authority;
- PDE and other systems as R&D components or outcomes without implying that Alarisa is sold in parts;
- the future product objective without a current purchase promise;
- links to current products and Technology where they clarify how the R&D creates useful results.

### Technology — `/{locale}/technology.html`

Technology explains the production and technical system behind current work:

- Web Platform and JavaScript as the deliberate technical direction;
- TeqFW as the application platform and architectural asset;
- ADSM as the controlled human-agent software-production method;
- AI agents as active production participants under Alex's accountability;
- PDE as independently useful Alarisa infrastructure when relevant to delivered products.

The page supports technical trust and differentiation. It is not a generic stack list, an AI-consulting offer, or a prerequisite for understanding Products.

### About — `/{locale}/about.html`

About establishes maker identity and trust after product value is visible. It covers Alex's responsibility, direct working model, relevant experience, continuity, selected personal context, and honest single-maker constraints. It routes visitors back to Products, Custom Development, selected proof, and the commercial action rather than ending as an autobiography.

### Commercial Action — `/{locale}/contact.html`

The established route remains the general commercial handoff. Its primary entry is the `Discuss your need` action. Offer-specific links may carry context in the URL or first-message guidance, but no new form state, credential collection, payment, or provisioning is implied by this information architecture.

## Secondary Knowledge And Archive Surface

`Resources` is the approved secondary-hub meaning and uses `/{locale}/resources/` as its target route. It provides a coherent entry point into retained knowledge and proof without becoming a second primary navigation.

The hub organizes these existing destinations:

- Project archive — `/{locale}/projects.html`;
- Library — `/{locale}/library/`;
- Journal — `/{locale}/blog/`;
- Books — existing book detail routes, initially `/{locale}/books/browser-as-operating-system.html`;
- selected technical cases, historical systems, discontinued experiments, and external evidence where useful.

Projects, Library, Journal, and Books retain their own identities and URLs. Resources is an index and discovery layer, not a migration of all content into a new route subtree.

## Footer Structure

The approved footer has three semantic groups:

- `Build` — Products, Custom Development, Alarisa, Technology;
- `Knowledge` — Resources, Project archive, Library, Journal, and Books;
- `Wired Geese` — About, Contact, maker attribution, and approved external profiles or legal/company information.

Group labels may receive idiomatic localized wording during copy design, but their responsibilities and destination membership are stable. The footer must remain navigable and curated rather than reproduce every retained URL.

## Contextual Discovery

Secondary content supports commercial journeys through selective relationships:

- the Telegram offer may link to relevant Telegram articles or working demonstrations;
- Products may link to evidence for the capability or outcome being claimed;
- Alarisa may link to PDE-derived products and relevant R&D explanations;
- Technology may link to inspectable TeqFW, ADSM, source, or technical materials;
- About may link to selected historical responsibility evidence;
- detail articles and archive items may link back to the relevant current Product, Technology, Alarisa, or Custom Development page when the relation is genuine.

Contextual links must be editorially meaningful. They must not turn every historical page into a sales landing page or imply current product status from topical similarity alone.

## Route Transition

Implementation should preserve established canonical routes chosen above. Before changing the shared shell or redirect map it must inventory locale parity, indexed URLs, backlinks, and useful inbound references.

Legacy route treatment is:

- `products.html` stops redirecting to `projects.html` when the new localized Products pages are ready;
- `work-with-me.html`, `projects/alarisa.html`, `projects.html`, `library/`, `blog/`, `about.html`, and `contact.html` remain valid;
- `contacts.html` and other already-normalized aliases continue to resolve to their canonical targets unless audit evidence requires a different compatibility path;
- the discontinued GitHub campaign leaves all commercial discovery; its old URL receives an evidence-informed archive or redirect treatment during implementation;
- new Technology, Resources, and Telegram-offer routes launch in all maintained locales together.

No route may be removed merely because it leaves primary navigation. Sitemap generation, canonical and alternate metadata, redirects, locale switching, and internal discovery must be verified together.

## Verification And Reconsideration

Before release, implementation must demonstrate that:

- a first-time visitor can reach the Telegram offer directly from Home or through Products;
- every primary page exposes its next commercially meaningful action or destination;
- every retained content family is reachable through Resources or the footer in addition to direct and search access;
- primary and secondary current-page states remain correct for nested detail routes;
- all target routes have semantically equivalent English, Russian, and Spanish pages, canonical links, and reciprocal alternates;
- old aliases and changed routes resolve intentionally without loops, locale loss, or silent disappearance;
- sitemap output contains approved canonical pages and excludes aliases and retired commercial inventory.

Reconsider a label, order, or route only when usability observation, search evidence, or paying-customer behavior shows that the current choice obstructs understanding or conversion. Traffic alone does not justify returning Resources or historical categories to primary navigation, and one buyer request does not justify changing the whole hierarchy.

## Remaining Design Boundary

This information architecture approves semantic labels, destinations, page roles, route intents, hierarchy, and principal journeys. It does not approve:

- final headlines, body copy, microcopy, or translated wording;
- visual layout, component styling, illustrations, or responsive composition;
- exact contact form fields or offer-specific query parameters;
- analytics, CRM, payment, provisioning, or customer-data behavior;
- removal of a legacy URL before its evidence review.
