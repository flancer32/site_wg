# Architecture State

- Path: `ctx/docs/architecture/state.md`
- Template Version: `20260605`
- Changed: `20260910`

## Purpose

Define state domains and sources of truth while separating normative meaning, authored publication inputs, derived output, website operation, evidence chronology, commercial truth, and external product/customer state.

## State Domains

| State domain | Authoritative owner | Architectural meaning |
| --- | --- | --- |
| Product and engineering truth | Applicable documents under `ctx/` | Normative identity, status, evidence meaning, boundaries, and downstream guidance. |
| Authored public content | `tmpl/` and source-controlled assets or configuration | Approved implementation inputs for the public site; subordinate to context. |
| Derived publication output | `web/` | Regenerable browser-delivered artifacts, never an authored source of truth. |
| Ephemeral website operation | Request, route, locale, render, and publication process state | Bounded runtime data needed to serve or publish the site. |
| Journal chronology | Authored Event and thread content | Dated public record of meaningful observations, decisions, and changes; not the sole owner of current status. |
| Current public status | Product authority and corresponding authored current-state surfaces | Present accepted state of a system, offer, or hypothesis. |
| Commercial truth | Human-controlled agreements and confirmed customer, payment, delivery, and outcome records | Evidence requiring explicit interpretation; not inferred from publication or traffic. |
| Product and customer operation | The applicable external deployment and agreement | Credentials, grants, private data, operation, support, revocation, and lifecycle outside the website. |
| Transferred development context | The explicitly agreed receiving boundary | A snapshot or separate repository owned according to the transfer agreement, not an automatic live mirror of Wired Geese context. |

## Authority And Derivation

`ctx/docs/product/` is authoritative for product meaning. Architecture, environment, code guidance, authored content, and generated output refine or project that meaning in descending order.

Current implementation may reveal an existing behavior but cannot override the accepted target state. Authored public content must be updated when authoritative status changes. Derived output must remain traceable to its authored sources and reproducible under the approved publication process.

## Journal Chronology And Current State

An Event owns a dated statement about what changed, was observed, accepted, rejected, paid for, reused, or discontinued. It remains historically meaningful even after later events supersede its state.

A current system, offer, or status surface owns the public projection of the latest accepted product fact. Journal content may link to and support that fact, but publication does not silently promote an event into canonical status.

When chronology and current state diverge, downstream implementation must preserve the historical record and update the current-state projection from product authority. Corrections should remain visible enough to prevent an earlier Event from becoming misleading.

## Evidence And Commercial Truth

Evidence remains claim-specific under `../product/journal-and-evidence.md`. The architecture must not equate any of these with commercial validation:

- visits, clicks, page events, or contact attempts;
- Journal publication or posting volume;
- commits, agent activity, or technical output;
- Alex's internal use;
- close-user or unpaid experimental use.

Those observations may support narrower claims. Payment, completed delivery, repeated use, reuse, customer outcomes, and recurring revenue require their own human-confirmed records and product-level interpretation.

The site does not need a database, CRM, analytics backend, or evidence-management application to publish truthful evidence. Human confirmation remains authoritative unless a separately approved product and architecture decision establishes a trusted system with explicit ownership and semantics.

## Operational And External Ownership

The website runtime may render current information and initiate human contact. It does not own:

- Telegram credentials, sessions, content, or publishing authority;
- PDE or Desk configuration and operational state;
- customer service credentials, MCP grants, private resources, or logs;
- customer files or product deployment state;
- payment, provisioning, managed-hosting, or support records;
- a generalized customer or commercial database.

Credential ownership, administrative access, configuration storage, updates, revocation, retention, support, and failure responsibility belong to the relevant external deployment and explicit agreement.

Source access, deployment access, cognitive-context access, ownership, licensing, modification rights, operational authority, maintenance, and support remain separate grants. Possession of one does not imply another.

## Change Discipline

A new persistent site state owner, customer/private state, identity system, analytics authority, CRM, payment system, provisioning mechanism, synchronized context service, or evidence store requires an upstream product need and explicit architecture approval before environment or code documentation may define it.

State formerly associated with the discontinued GitHub funnel is retired and has no target website owner.
