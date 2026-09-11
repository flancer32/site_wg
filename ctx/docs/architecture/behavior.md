# Architecture Behavior

- Path: `ctx/docs/architecture/behavior.md`
- Template Version: `20260605`
- Changed: `20260910`

## Purpose

Describe the stable site flows required to sell, demonstrate, and document the work while preserving publication, authority, and external-runtime boundaries.

## Authoring And Publication Flow

Product meaning is accepted in `ctx/docs/product/`, refined through architecture, environment, and code context, and only then expressed in templates and implementation.

`product context -> architecture -> environment -> code guidance -> authored sources -> TeqCMS rendering/publication -> derived web output`

Generated output does not feed meaning upstream. Template, asset, and configuration sources remain implementation inputs; browser-facing output under `web/` remains derived. Publication must preserve semantic parity across maintained locales.

## Development Participation Flow

wiredgeese.com evolves through the product-authorized human-directed agent model:

`Alex defines intent and authorizes work -> Alex and/or authorized AI agents perform development tasks -> results are verified -> Alex accepts consequential results -> approved sources are published`

AI agents are normal development participants and may support analysis, inspection, design, implementation, refactoring, testing, verification, documentation, deployment preparation, and explicitly authorized operations. The flow does not require every task to be delegated, prevent Alex from writing or editing software, or transfer acceptance and accountability away from him.

This is a development-process relationship, not a request-time or production-runtime contract. Agent participation in building and maintaining wiredgeese.com does not imply autonomous agents, agent credentials, agent state, or agent authority inside the deployed public site. Any such runtime capability would require its own upstream purpose, owner, state, trust, and integration decisions.

## Request-Time Flow

An inbound request is normalized, resolved to a locale-aware authored route, enriched only with bounded site data where justified, and rendered through the shared shell. Unresolved HTML requests return the localized not-found surface.

Work-with-Alex, current work, Journal, foundation explanation, history, and book pages use this shared site flow. A semantic destination does not gain its own application or backend merely because its content role is distinct.

## Visitor Journeys

The architecture must keep these flows possible without prescribing exact routes or labels.

### Immediate Commercial Need

`entry -> new product need -> approach and evidence -> fit -> direct human conversation`

The visitor can understand the product-building proposition without first learning Alarisa, PDE internals, TeqFW, or ADSM. Alex and the customer agree the first scope, price, deployment, access, and trust outside the public page.

### Current Work And Demonstration

`entry -> current work or system -> honest status and working evidence -> related Events, foundation, or Work with Alex`

A working system can be inspected without being represented as purchasable.

### Journal And Evidence

`recent activity or Event -> affected system or hypothesis -> cumulative thread -> current accepted status or next question`

The flow must support failures, corrections, rejection, and discontinuation as well as progress. Event chronology remains available after status changes, while the status-bearing destination communicates current accepted meaning.

### Technical Trust

`product conversation or system -> working-model/foundation explanation -> inspectable evidence -> return to the decision`

TeqFW, ADSM, agent participation, and trust boundaries deepen confidence after the buyer outcome is understandable. Technical depth must not become an entry prerequisite. Primary detailed TeqFW promotion routes to `teqfw.com` rather than being duplicated by this site.

### Alarisa

`Home or current work -> Alarisa -> proof hypothesis and honest status -> related systems and Journal threads`

This flow exposes Alarisa as an ambitious ongoing proof system and long-term product direction. It provides no false Alarisa purchase path and does not require every other system or offer to fit inside Alarisa.

### Historical And Search Entry

`older indexed content -> original value and explicit status -> truthful current relationship -> current work, Journal, foundation, About, or relevant commercial entry`

Historical material is not rewritten into disguised sales content. It remains meaningfully reachable without controlling current commercial or development attention.

## Home Behavior

Home follows the attention and handoff authority in `../product/home-page-composition.md`. Its architecture must expose the proposition and commercial path early, then keep current work and recent Journal evidence prominent before long foundation, biography, or historical material.

Responsive composition may merge or rearrange visual regions, but it must preserve semantic priority and direct paths to commercial entries, current work, and Journal. The currently leading offer may change; no offer or system is a permanent Home identity solely because it leads now.

## Evidence And Status Behavior

Publishing an Event records or communicates evidence; it does not create the underlying evidence. Visits, clicks, contact attempts, posts, commits, internal use, and agent activity must not be automatically interpreted as payment, delivery, customer outcome, repeatability, or validation.

When a meaningful Event changes a canonical public fact:

1. the Event preserves the dated observation or decision;
2. the authoritative product context is updated when its fact or status changes;
3. the corresponding current public system, offer, or status surface is updated;
4. links allow a visitor to move between chronology and current state.

No database, event store, CRM, analytics backend, or evidence application is implied by this behavior.

## Commercial Handoff Flow

`visitor context -> direct commercial action -> human qualification -> explicit agreement -> external delivery boundary`

The site supports understanding and contact. It does not collect sensitive product credentials, automate scoping authority, process payment, provision customer systems, execute customer workflows, or grant source/context rights by default.

## Product Continuation Flow

When an agreement includes continued development by a customer's team, the bounded flow is:

`agree rights and transfer scope -> select source, configuration, deployment knowledge, and relevant context -> remove unrelated or unauthorized material -> deliver the agreed boundary -> receiving humans accept authority and risk -> receiving human-and-agent team continues work`

The site may explain or initiate discussion of this capability. It does not perform the transfer, create continuous synchronization, or make source access, context access, ownership, modification, operation, and support equivalent grants.

## Preservation Flow

Before later implementation changes public routes or removes material:

1. inventory affected locale URLs, content, references, inbound value, and current status;
2. choose keep, repurpose, redirect, archive-access, or reviewed retirement;
3. preserve the original value and truthful status of retained history;
4. establish meaningful internal discovery and genuine current relationships;
5. implement locale-consistent routing, alternates, metadata, and redirects as applicable;
6. verify old and new paths, semantic parity, and internal reachability.

Preservation protects value without preserving obsolete commercial prominence.

## Failure Boundaries

- Unsupported claims narrow to what evidence proves.
- Missing commercial automation falls back to direct human contact.
- Route uncertainty falls toward preservation and review, not silent disappearance.
- Retained material falls toward meaningful historical/contextual discovery, not orphaning or primary dominance.
- Sensitive access falls toward explicit human agreement and narrower authority.
- Context transfer falls toward a bounded reviewed delivery, not exposure of internal or third-party knowledge.
- Agent-assisted work falls toward human review and narrower authorization, not autonomous authority claims.

The retired GitHub funnel, signed-token enrichment, dedicated offer form, and related mail flow are historical behavior and must not be rebuilt without a new approved requirement.
