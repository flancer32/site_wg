# Information Architecture

- Path: `ctx/docs/product/information-architecture.md`
- Template Version: `20260909`
- Changed: `20260910`

## Purpose

Define the semantic public hierarchy through which wiredgeese.com must sell, demonstrate, and document Alex Gusev's work.

This document defines visitor jobs, page-family responsibilities, discovery relationships, multilingual parity, and preservation boundaries. It does not approve exact URLs, final labels, public copy, visual design, forms, redirects, or implementation.

## Architectural Principle

The site is not primarily a product catalogue with supporting content. It is an integrated commercial and evidence system with three first-class responsibilities:

- **Sell** — expose what can be bought now, what can be tested through paid validation, and which bounded engineering work is available.
- **Demonstrate** — show working systems, current development, Alarisa's ambitious proof role, and the foundation behind the work.
- **Document** — expose recent Events and cumulative Journal threads that show what changed, succeeded, failed, reached users, earned payment, or was discontinued.

First-class does not mean equal current business priority, visual area, or implementation effort. During the current funding stage, `Sell` has operational priority. `Demonstrate` and `Document` remain indispensable because they compound proof, trust, acquisition, and future commercial strength.

No responsibility is allowed to absorb or eliminate the other two. Offers without evidence become assertions. Demonstration without commercial paths becomes a portfolio. Documentation without current work and commercial meaning becomes a blog or archive.

## Primary Discovery Semantics

The persistent public shell must provide direct discovery of these meanings:

1. **Brand/Home** — Wired Geese and Alex's accountable-maker model.
2. **Commercial entry points** — available books, paid early access, bounded productized engineering, and later products.
3. **Current work and systems** — what exists, what is being developed, maturity, and major proof directions including Alarisa.
4. **Journal/Events** — recent activity and cumulative evidence threads.
5. **How the work is made** — Alex's accountability, AI-agent participation, TeqFW and ADSM foundations, trust boundaries, reuse, and continuation.
6. **Commercial action** — a distinct path to discuss a relevant offer or need.

These are semantic destinations, not approved English labels or a required count of header links. Offers/current work/Journal must each be reachable without passing through the others. Journal must not be relegated only to a footer or archive menu.

About, books, durable articles, projects, and historical material remain intentionally discoverable. About may remain secondary if Alex's accountability is already clear across Home, offers, work, and the working-model destination. Alarisa must be prominent within current work and Home, but it need not occupy a permanent top-level header item when the current-work destination exposes it clearly.

## Visitor Journeys

### Immediate Commercial Need

`Home or acquisition entry -> commercial entry points -> bounded offer -> evidence and fit -> direct conversation`

A buyer must be able to reach the MCP Integration Pilot or Telegram paid validation without learning Alarisa or the full platform first.

### System Or Demonstration Interest

`Home or current work -> system/status -> working evidence and related events -> relevant offer or Journal thread`

Working systems may be valuable proof even when they are not for sale.

### Evidence And Current Activity

`Home recent activity or persistent Journal entry -> event -> related thread/system/offer -> current status or next question`

The route must show both progress and negative evidence, not only announcements.

### Technical Trust

`offer or system -> how the work is made -> TeqFW/ADSM/trust detail -> inspectable evidence -> return to decision`

Technical depth supports a claim and does not become a prerequisite for understanding the buyer outcome.

### Alarisa Interest

`Home or current work -> Alarisa -> proof hypothesis -> current systems and Journal threads -> honest current status`

Alarisa has no purchase action representing it as market-ready. A genuine related capability may link to its own separate offer.

### Historical Or Search Entry

`legacy page -> retain original value and status -> genuine current relationship -> current work, Journal, foundation, About, or offer`

Old content is not rewritten into a sales page solely to extract traffic.

## Page Families

### Home

- **Job:** explain Wired Geese quickly, expose a current commercial path, show active work, and prove that activity is documented.
- **Contains:** accountable maker proposition; commercially available-now or provisional entry point; current systems/status; recent meaningful events; human-plus-agents explanation; TeqFW/ADSM foundation; Alarisa proof direction; selected claim-specific evidence; final relevant action.
- **Excludes:** full catalogues, deep platform documentation, generic service menus, long biography, unfiltered archive, or claims of completed economic proof.
- **Routes to:** commercial entry points, current work/system details, Journal/Event threads, working-model explanation, Alarisa, About and maker evidence, commercial handoff, and secondary knowledge.

`home-page-composition.md` defines attention order and responsive constraints.

### Commercial Entry Points

- **Job:** answer what can generate a commercial relationship now and at what maturity.
- **Contains:** available knowledge products; paid early-access/validation offers; provisional productized-engineering offers; later reusable products when eligible; clear status and next action.
- **Excludes:** raw capabilities, unbounded freelance availability, speculative products, or subscription claims without recurring value.
- **Routes to:** offer detail, relevant evidence/events, working system context when useful, and shared commercial handoff.

The collection must visually distinguish available now, paid validation, and provisional bounded engineering. It must not make books, pilots, engineering, and mature products look like equivalent packages.

### Offer Detail

- **Job:** let a suitable buyer understand one bounded result and decide whether to start a conversation.
- **Contains:** payer problem; expected result; present status; scope; exclusions; fit; evidence; authority/trust/deployment boundary where relevant; validation purpose; unresolved packaging; next step.
- **Excludes:** unsupported fixed price, schedule, SLA, security, support, or scale claims; unrelated offers; deep technical internals.
- **Routes to:** commercial handoff, supporting evidence/events, relevant system context, and working-model depth.

Offer authority lives under `offers/`.

### Current Work And Systems

- **Job:** demonstrate what Alex and the agents are building, using, operating, or testing.
- **Contains:** Alarisa, PDE, Telegram Desk, Shared Files Desk, TeqCMS, and other real systems when evidence justifies inclusion; object kind; current status; actual capability; active question; relevant proof; offer relationship where one exists.
- **Excludes:** catalogue eligibility inferred from existence, forced Alarisa hierarchy, predetermined roadmap, and unsupported product maturity.
- **Routes to:** system detail, Alarisa, Journal threads/events, related offers, foundation explanation, and historical proof.

The collection must support systems that are infrastructure, proof, product hypotheses, tools, or several of these without pretending they all share one commercial lifecycle.

### System Or Direction Detail

- **Job:** explain one real system or development direction, its role, maturity, evidence, and current questions.
- **Contains:** accepted meaning; relationship to foundations; working capability; status; evidence; current development; relevant events; genuine commercial relationship.
- **Excludes:** technical implementation beyond product meaning, automatic offer status, or claims derived only from strategic importance.

Alarisa uses this family as the major proof system and long-term product direction. Its detail must distinguish the Principal–Assistant ambition, the ongoing engineering/economic hypothesis, present systems, unproven parts, and related chronology. It must not present all current work as Alarisa modules.

### Journal And Events

- **Job:** expose current activity, cumulative proof, decisions, failures, external use, and commercial learning.
- **Contains:** recent meaningful events; ongoing threads; links among intent, agent work, human acceptance, implementation, verification, deployment, use, payment, reuse, and status change; corrections and discontinuations.
- **Excludes:** activity theatre, success-only narrative, claims unsupported by linked evidence, or durable conceptual articles misclassified solely because they are recent.
- **Routes to:** related systems, offers, proof threads, durable articles, historical context, and current commercial or development status.

The Journal index must support both recency and cumulative understanding. A chronological list alone becomes insufficient when it prevents a visitor from following a proof thread. `journal-and-evidence.md` defines the semantic model.

### How The Work Is Made

- **Job:** explain the Wired Geese production model and reduce technical, authority, trust, adaptability, and continuity uncertainty.
- **Contains:** Alex's accountability; authorized AI-agent participation; the Wired Geese/Wild Geese metaphor; TeqFW as technical North Star; ADSM as development-management method; product-level trust and authority principles; customer-funded reuse boundaries; optional transferable development.
- **Excludes:** TeqFW documentation duplicated from `teqfw.com`; generic stack inventory; claims that agents are employees or autonomous owners; unlimited capacity; generic consulting catalogue.
- **Routes to:** teqfw.com or inspectable TeqFW evidence where useful, ADSM materials and books, current systems, Journal proof, About, offers, and commercial handoff.

This destination may later split into subordinate pages only when distinct visitor jobs and enough content justify it. Internal concepts do not each receive a permanent navigation item.

### About And Maker Trust

- **Job:** verify the accountable person, relevant experience, legal/business identity, and single-maker boundaries.
- **Contains:** Alex's identity and responsibility; direct maker relationship; selected current and historical evidence; `F. Lancer`, SIA where legal context matters; capacity and continuity honesty.
- **Excludes:** primary sales proposition, CV dump, false agency identity, or replacement for product-specific proof.

### Books And Durable Knowledge

- **Job:** sell or expose knowledge products and preserve durable explanations.
- **Contains:** both books with their actual availability; Library or durable articles; genuine links to ADSM, TeqFW, systems, offers, or Journal threads.
- **Excludes:** treating publication as software-delivery evidence or using knowledge volume to imply market validation.

Books must have a commercial path because they are available now, even if they remain secondary to the near-term productized-engineering hypothesis.

### Projects, History, And Discontinued Work

- **Job:** preserve search value, references, learning, and valid responsibility evidence.
- **Contains:** older project pages, technical work, case studies, discontinued experiments, and explicit status.
- **Excludes:** automatic primary navigation, current-offer presentation, or substitution for missing AI-era evidence.

### Commercial Handoff

- **Job:** begin a human conversation about a particular offer, current capability, adaptation, or closely aligned need.
- **Contains:** direct contact options, minimum expectation setting, and originating context where practical.
- **Excludes:** credentials, secrets, mandatory generic project questionnaire, final contract terms, or assumed checkout/provisioning.

## Semantic Sitemap

```text
Wired Geese
├── Home
│   ├── current commercial entry
│   ├── current work
│   ├── recent Journal/Events
│   ├── working-model explanation
│   ├── Alarisa proof direction
│   └── commercial handoff
├── Commercial entry points
│   ├── available books
│   ├── paid early access / validation
│   │   └── Connect ChatGPT to Telegram
│   ├── productized engineering
│   │   └── MCP Integration Pilot [provisional]
│   └── future eligible products
├── Current work and systems
│   ├── Alarisa [ongoing proof / product direction]
│   ├── PDE [working early system]
│   ├── Telegram Desk [working early capability]
│   ├── Shared Files Desk [working early capability]
│   ├── TeqCMS [independent working system]
│   └── other evidenced work
├── Journal / Events
│   ├── recent events
│   ├── system, offer, and hypothesis threads
│   └── corrections, failures, and discontinuations
├── How the work is made
│   ├── accountable maker + hired AI agents
│   ├── TeqFW foundation
│   ├── ADSM foundation
│   ├── trust, authority, and reuse boundaries
│   └── transferable development [emerging]
├── About / maker trust
├── Books and durable knowledge
├── Projects / history / discontinued work
└── Commercial handoff
```

The sitemap describes semantic relationships, not exact routes or necessarily one page per node.

## Home And Persistent-Shell Attention

The persistent shell must not imply that Products are the site's only primary object or that Journal is secondary archive content. Commercial entry points, current work, and Journal must remain directly discoverable, with the commercial action visibly prioritized during the current funding stage. Direct discovery does not require equal navigation weight or screen area.

Home should expose recent meaningful activity early enough that a first-time visitor sees ongoing work rather than only static claims. Journal prominence concerns the significance and accessibility of evidence, not posting volume. Current work and commercial availability remain distinct: a working system can appear prominently without being purchasable, while a book can be purchasable without being a major software proof.

## Evidence Placement

Evidence follows the claim:

- offer pages show payment, delivery, fit, and outcome evidence relevant to that offer;
- system pages show working behavior, use, development, and status evidence;
- Journal shows chronology and changes in evidence;
- How the work is made shows evidence of human accountability, agent participation, and foundation use;
- About and history show long-term responsibility;
- Home selects a small set spanning current work, recent activity, and commercial credibility.

No generic evidence wall should make unlike proofs appear interchangeable.

## Multilingual Semantic Parity

One semantic IA governs English, Russian, and Spanish.

- Equivalent destinations must preserve identity, status, evidence limits, and commercial action across locales.
- Final labels should be idiomatic rather than literal when needed.
- A new active offer or first-class current-work destination must not become a permanent English-only branch without an explicit temporary policy.
- Canonical, alternate, `hreflang`, locale switching, `x-default`, and locale-preserving redirects must be considered together during implementation.
- Longer translations must not be shortened by deleting maturity, accountability, or trust meaning.

## Preservation And Migration Boundary

Existing routes and content are evidence for later migration, not authority over the new hierarchy. Before implementation, inventory each locale's canonical URLs, inbound links, indexed value, alternates, internal links, and current status.

Each route must receive an intentional treatment: keep, repurpose, redirect, archive-access, or reviewed retirement. Leaving material online but undiscoverable is not sufficient preservation. Leaving discontinued material promoted is not honest preservation.

Likely retained families include locale Homes, About, Contact, Library, Journal, Books, Projects/history, and useful technical pages. Existing product/services pages, Work With Me material, and Alarisa pages require semantic reassignment against the new model. GitHub Flows / Agent Orchestration PoC must remain discontinued.

Exact `.html` paths, clean paths, aliases, redirect targets, and route ownership remain outside this product-level decision.

## Validation Rules

A later public implementation must demonstrate that:

- a visitor can identify what Wired Geese means and who is accountable;
- a visitor can reach a current commercial entry without learning the whole system;
- MCP integration appears as provisional bounded engineering, not an established package;
- Telegram appears as paid early access/validation, not the principal mature product;
- current systems are discoverable with honest status even when not sellable;
- Journal/Events are prominent and recent activity is visible from Home;
- TeqFW and ADSM are explained as foundations without turning wiredgeese.com into their primary documentation site;
- Alarisa is a major ongoing proof and direction, not the foundation or a market-ready product;
- historical evidence remains accessible but cannot substitute for missing AI-era evidence;
- all three site jobs remain represented across desktop, mobile, and maintained locales;
- no exact route, final label, form, component, or workflow is inferred from this semantic document where it remains open.

## Open Decisions

- Final English, Russian, and Spanish labels for commercial entry points, current work, Journal/Events, and how the work is made.
- Exact persistent navigation composition at different viewport sizes while preserving direct discovery of all three jobs and the current operational priority of selling.
- Whether Alarisa uses an existing project route or a new/repurposed system-direction destination.
- Whether PDE and individual Desks need separate public details or can remain within a current-work collection until demand grows.
- How Journal threads, event types, corrections, and status changes are presented.
- How books appear both as available commercial assets and durable knowledge without duplication.
- Exact route migration, locale parity, redirects, sitemap, and search-preservation decisions.
- Commercial handoff channels, context-passing mechanism, form fields, analytics, CRM, payment, and provisioning.

This document authorizes no site, route, content, or implementation changes.
