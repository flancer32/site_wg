# Architecture Structure

- Path: `ctx/docs/architecture/structure.md`
- Template Version: `20260605`
- Changed: `20260910`

## Purpose

Describe the major architectural blocks, semantic surfaces, page-family relationships, and runtime boundaries required by the current product model.

## Architectural Blocks

- `ctx/` — normative cognitive context governing product meaning and engineering constraints.
- `tmpl/web/` — multilingual authored pages, page-family composition, and shared partials.
- `src/` plus `teqcms.config.mjs` — thin application-extension block adapting TeqCMS to justified project behavior.
- `web/` — browser-delivered and generated publication artifacts.
- `bin/` and `etc/` — site operation and deployment support.
- external destinations and systems — public references, sellers, TeqFW material, PDE and Desk runtimes, MCP deliveries, Telegram connections, customer resources, and customer hosts outside the website runtime.

These blocks continue to form one multilingual SSR/publication system. Sell, Demonstrate, Document, and retained history are semantic responsibilities inside that system, not separate applications.

## Responsibility Boundaries

- Cognitive context defines accepted meaning; runtime behavior must not become the hidden source of product strategy.
- Product documentation owns identity, object kinds, maturity, evidence semantics, commercial direction, and page-level visitor jobs.
- Architecture owns structural reachability, page-family relationships, state separation, runtime boundaries, and durable downstream constraints.
- Templates express approved public composition and content; they do not originate product hierarchy or status.
- The project adapter owns only justified site-specific request, route, render, and publication behavior.
- Publication output remains derived and traceable to authored sources.
- External deployments own their credentials, private data, operation, authority, and lifecycle under their own agreements.

## Public Surface Topology

The persistent public shell must be capable of making these semantic destinations directly discoverable:

- Brand/Home;
- current commercial entry points;
- current work and systems;
- Journal/Events;
- how the work is made;
- a distinct commercial action.

About and accountable-maker evidence, books, durable knowledge, projects, and history must also remain intentionally reachable. Direct discovery does not require equal navigation weight, one header link per meaning, or permanent English labels. The composition may change with evidence and viewport while preserving the visitor jobs defined by `../product/information-architecture.md`.

The architecture does not mandate `Products / How it works / Alarisa` as a permanent navigation model. Alarisa must be prominent as current proof and direction, but a current-work destination may expose it without a dedicated top-level item. A current offer must be reachable without a generic product catalogue, and Journal must not depend only on footer or archive discovery.

## Page-Family Relationships

The site must support these cooperating page-family responsibilities:

1. **Home** establishes the Wired Geese proposition, exposes an immediate commercial path, current work, recent evidence, foundation, accountable maker, Alarisa direction, and deeper discovery.
2. **Commercial entries and product detail** distinguish a new-product build from an existing PDE or Desk deployment, state early availability honestly, and route to claim-specific evidence and human contact.
3. **Current work, system, and direction detail** expose working or active systems with honest status, related evidence, and a commercial relationship only where one genuinely exists.
4. **Journal, Events, and cumulative threads** expose meaningful chronology and connect events to systems, offers, hypotheses, and current accepted status.
5. **Working-model and foundation explanation** exposes Alex's accountability, authorized agent participation, TeqFW, ADSM, trust, reuse, and optional continuation boundaries without delaying buyer-value comprehension.
6. **About, books, durable knowledge, projects, and history** preserve maker trust, purchasable knowledge, explanation, search value, and historical responsibility without absorbing the active Journal or dominating first-time attention.
7. **Commercial handoff** carries relevant originating context into a direct human conversation without becoming automated qualification, payment, or provisioning.

These are logical families, not a commitment to one route or page per item. Product authority may combine or split public destinations when the visitor jobs remain intact.

## Journal And Current-State Structure

Journal is an active evidence surface, structurally separate from the durable/history surface. Event pages and cumulative threads must be linkable to affected systems, offers, hypotheses, and status-bearing destinations.

An Event records chronology; a system or offer destination communicates current accepted public state. One may link to and explain the other, but the Journal must not silently become the canonical owner of current product status.

## Home Structural Contract

Home must be able to expose, in the product-authorized attention order:

- the Wired Geese proposition and Alex's accountability;
- an immediate current commercial entry;
- current work and systems;
- recent Journal/Events;
- the human-plus-agents working model;
- the TeqFW/ADSM foundation;
- Alarisa as ongoing proof and direction;
- selected evidence and maker trust;
- a relevant commercial next action;
- durable secondary discovery.

This is a structural capability and dependency order, not a copied content specification. On compact viewports, responsive composition must preserve early commercial access, current work, and Journal discovery without allowing methodology, biography, or history to displace them. No visual symmetry among the three site jobs is required.

## Site And Product Boundary

The website may explain, demonstrate, and sell new-product work plus authorized PDE or Desk deployments. MCP supports compatible-agent access inside PDE; it is not a generic service category. The site does not thereby become a PDE runtime, customer MCP server, Telegram credential holder, customer storage host, product deployment, payment processor, CRM, provisioning system, or primary TeqFW platform site.

An optional product transfer may include source, deployment knowledge, and bounded product-specific cognitive context. It is a human-controlled delivery crossing between accountable parties, not a website runtime responsibility or automatic grant of unrelated context, credentials, ownership, modification rights, operation, or support.

## Expansion Rule

No new runtime area, persistent state owner, offer-specific backend, event store, analytics system, or detailed page branch is justified solely by the current semantic model. Introduce such structure only after an upstream requirement and explicit architecture approval establish the owner, authority, trust, and lifecycle boundaries.
