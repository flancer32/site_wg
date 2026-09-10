# Product System

- Path: `ctx/docs/product/product-system.md`
- Template Version: `20260605`
- Changed: `20260910`

## Purpose

Define the different kinds of objects presented through Wired Geese, their relationships, their current status, and the conditions under which a capability becomes a commercial product or offer.

This model is relational rather than a single hierarchy. TeqFW, ADSM, Wired Geese, Alarisa, PDE, Desks, TeqCMS, books, productized engineering, offers, and evidence are not comparable objects at successive levels of one product tree.

## Canonical Relationship Model

```text
Alex Gusev: accountable human maker
  |
  +-- Wired Geese: brand and public model
  |
  +-- working foundation
  |     +-- TeqFW: technical North Star and application platform
  |     +-- ADSM: development-management methodology
  |
  +-- systems and development directions built with that foundation
  |     +-- Alarisa: ambitious ongoing proof system and long-term product direction
  |     |     +-- PDE: working early system for controlled digital representation
  |     |           +-- Telegram Desk: working early capability
  |     |           +-- Shared Files Desk: working early capability
  |     |           +-- future Desks or integrations, if developed
  |     +-- TeqCMS and other systems: independent roles; no forced Alarisa lineage
  |
  +-- commercial objects
  |     +-- sellable knowledge products
  |     +-- paid early access and validation
  |     +-- productized engineering
  |     +-- later reusable products when evidence supports them
  |
  +-- evidence stream
        +-- working artifacts and use
        +-- external and commercial evidence
        +-- Journal/Events chronology
        +-- historical responsibility
```

The diagram explains relationships, not ownership, legal structure, technical architecture, or a deterministic roadmap.

## Object Kinds

### Accountable Maker

Alex Gusev is the human who sets intent, authorizes work, accepts consequential results, and remains accountable. AI agents participate in work but do not acquire this role.

### Brand And Public Model

Wired Geese is the brand and narrative for Alex working with hired AI agents. It is not a company, platform, team of employees, or software product. Its Wild Geese wordplay may be used deliberately while keeping legal and accountability boundaries explicit.

### Foundational Platform

TeqFW is Alex's foundational application platform and technical North Star. It primarily determines how modular JavaScript and web software is structured and built. Its detailed technical promotion belongs primarily to `teqfw.com`; wiredgeese.com uses it as foundation and evidence.

### Development Methodology

ADSM organizes how an accountable human and AI agents understand, control, verify, and evolve software through maintained cognitive context. It is part of the working foundation. A book, review, or service derived from ADSM may be sellable without making the methodology itself an ordinary catalogue product.

### Proof System And Product Direction

Alarisa is the most ambitious current attempt to demonstrate what the foundation can support. It explores interaction between a `Principal` and that Principal's Assistant in the digital world. It is an ongoing proof system and long-term product direction, not the foundation above TeqFW and ADSM, not proof already completed, and not a requirement that every related capability become part of a single market product.

### Working System

A working system performs useful behavior in a real development or operating context. It may be infrastructure, proof, an owned tool, a product candidate, or several of these. Working status alone does not establish external demand, mature operations, or catalogue eligibility.

PDE and TeqCMS are working systems with different relationships. PDE belongs to the Alarisa direction. TeqCMS can remain useful software, infrastructure, proof, reusable technology, or a future product hypothesis without being forced into Alarisa.

### Capability

A capability is a bounded technical ability, such as reading Telegram messages, publishing to channels, exposing selected files, or connecting an existing service through MCP. A capability may be real and reusable without being an independently understandable commercial product.

### Desk

A Desk is a PDE service or resource integration exposed under explicit authority. Telegram Desk and Shared Files Desk are current early examples. A Desk is not automatically a product, offer, or mature service.

### Commercial Product

A commercial product solves a bounded payer problem through an independently understandable useful result and has a delivery, use, and support boundary appropriate to its stated maturity. It may combine several capabilities or systems. Buyers do not need to adopt the internal development lineage.

### Offer

An offer is a concrete commercial entry point: a bounded sale, pilot, setup, integration, review, or other agreed result. Offers state the buyer outcome, scope, exclusions, evidence, trust boundary, and next action. They may validate a product hypothesis or package productized engineering; they do not make an immature capability mature by naming it.

### Sellable Knowledge Product

A book or other bounded knowledge artifact can be available now even when it mainly supports authority, explanation, search acquisition, trust, or a bridge to higher-value work. Its commercial role differs from software and engineering delivery.

### Productized Engineering

Productized engineering is bounded customer work around a repeatable problem and relevant existing capability. It lies between arbitrary custom development and an independent software product. It may generate cash, market knowledge, current portfolio evidence, and reusable technology while its packaging is still being learned.

### Evidence

Evidence is an inspectable fact or record supporting a specific claim. Evidence is neither a product nor a generic prestige category. `journal-and-evidence.md` defines its claim boundaries and public chronology.

## PDE And Desks

Personal Digital Embassy (`PDE`) provides controlled digital representation and an MCP entry point through which authorized AI agents can interact with a person's services and resources. Conceptually:

```text
authorized AI agent
       |
      MCP
       |
      PDE
    /      \
Telegram  Shared Files  ...future Desks
```

This is a product-level relationship, not a runtime or security design.

PDE has several simultaneous roles:

- a real working system;
- a building block in the Alarisa direction;
- an early product hypothesis and commercial experiment;
- a source of reusable integration technology;
- evidence of the Wired Geese development model.

Telegram Desk and Shared Files Desk have the same early maturity constraint. They may be used in paid pilots or early-access arrangements, but no unsupported reliability, security, support, scale, market-validation, or mature-SaaS claim is permitted.

The Telegram integration has a bounded paid-validation offer under `offers/chatgpt-telegram/`. Shared Files has no canonical standard offer yet. New Desks remain capabilities until an offer or product boundary is justified by a payer problem and evidence.

## Other Working Systems

TeqCMS and other systems may be represented according to the roles they actually serve:

- useful software in their own right;
- infrastructure for Alex's work;
- practical proof of TeqFW and ADSM;
- sources of reusable capability;
- future commercial hypotheses.

No document may imply that every system must become a product or fit into the Alarisa hierarchy. A separate system's technical or economic path may diverge, converge, or end according to evidence.

## Status Model

Object kind and current status are separate. These public status meanings cover the minimum distinctions required across products and commercial surfaces:

| Status | Meaning | Does not imply |
| --- | --- | --- |
| **Available now** | A bounded product is currently obtainable through a stated purchase or delivery path. | High revenue, broad validation, or maturity beyond the stated boundary. |
| **Paid early access / validation** | A working but immature capability, system, or offer may be delivered to suitable paying users to learn demand and boundaries. | Mature SaaS, standardized delivery, retention, or scale. |
| **In active development** | Work is being developed and may be shown when there is a truthful demonstration, learning, or participation reason. | Availability for purchase or a promised roadmap. |
| **Foundation / infrastructure** | The object enables other work and may remain valuable in that role. | An obligation to become a customer-facing product. |
| **Proof / experimental system** | The object tests or demonstrates an engineering, product, or economic hypothesis. | Completion or successful validation of that hypothesis. |
| **Historical / discontinued** | The object is no longer an active commercial or development priority but may retain evidentiary, educational, or search value. | Current availability, support, or endorsement as the present direction. |

An object may need more than one non-conflicting status description, such as `foundation / infrastructure` and `in active development`. Status language must remain concise on public surfaces and must not be used as a fictional progression in which everything becomes a commercial product.

## Current Status Authority

| Object | Kind and role | Current status |
| --- | --- | --- |
| TeqFW | Foundational platform and technical North Star | Foundation / infrastructure; active technical direction; primary promotion at `teqfw.com`. |
| ADSM | Development-management methodology | Foundation; exercised in current work; separately supports books and emerging service hypotheses. |
| Wired Geese | Brand and public model | Active identity, not a product maturity object. |
| Alarisa | Proof system and long-term product direction | In active development; proof / experimental; not market-ready and not proven complete. |
| PDE | Working system in the Alarisa direction | Working but early; proof / infrastructure; eligible for paid validation, not mature SaaS. |
| Telegram Desk | PDE capability | Working but early; used by the paid early-access Telegram offer. |
| Shared Files Desk | PDE capability | Working but early; product hypothesis with no standard offer or validation claim. |
| TeqCMS | Independent working system and infrastructure | Working; may support proof and reuse; no current canonical commercial offer in this branch. |
| `Connect ChatGPT to Telegram` | Bounded offer using PDE and Telegram Desk | Paid early access / validation; not the assumed primary long-term cash engine. |
| MCP integration work | Productized engineering direction | Primary provisional near-term cash direction; bounded offer hypothesis documented under `offers/mcp-integration/`. |
| ADSM workflow/context work | Emerging commercial direction | Offer hypothesis only; buyer need and delivery boundary remain insufficiently validated for a canonical offer. |
| Browser book | Sellable knowledge product | Available now in print; not assumed to be a major revenue engine. |
| ADSM book | Sellable knowledge product | Available through Leanpub in Russian and English; not assumed to be a major revenue engine. |
| GitHub Flows / Agent Orchestration PoC | Historical experiment | Discontinued; may remain as truthful history but not an active offer. |
| Santegra and older engineering work | Historical responsibility evidence | Historical/current responsibility evidence where accurate; not proof of modern agentic-AI delivery. |

The browser book is titled *Browser as an Operating System for Modern Application Development*. The ADSM book is *Agent-Driven Software Management* / *Управляемая разработка с AI-агентами*.

## Catalogue And Offer Gates

A capability or system enters a current commercial catalogue only when the branch can truthfully state:

1. the payer problem;
2. the independently understandable result;
3. present maturity;
4. a bounded delivery or use model;
5. relevant trust, authority, and support boundaries;
6. evidence sufficient for the claims made;
7. a truthful next action.

A provisional offer may be documented before all packaging decisions are known when it is clearly labelled as a hypothesis and records unresolved scope, price, timing, or support decisions. This is appropriate for the MCP Integration Pilot because productized integration is the primary near-term direction but final packaging is not yet validated.

Paid early access has a different gate from a mature product. It must be working, useful to a defined type of buyer, deliverable under an explicit experimental boundary, and designed to learn. It need not pretend to be standardized or self-service.

## Evolution Without A Forced Roadmap

Valid paths include:

```text
working capability -> paid validation -> repeated workflow -> standardized capability
                   -> independent product -> recurring value -> recurring revenue
```

```text
customer integration -> reusable component -> better future delivery or owned system
```

```text
experiment -> evidence of failure -> learning or discontinuation
```

```text
foundation or internal system -> remains foundation or internal system
```

Subscription follows evidence of recurring customer value; it is not a required destination. Alarisa may become a product or product family, remain principally a proof system, or produce independent useful outcomes without forcing those outcomes into a monolith.

## Honesty Boundary

Working software proves that behavior can operate in the observed conditions. Alex's repeated use proves practical internal value. A close user's installation proves bounded external operation. A payment proves some willingness to pay for the agreed outcome. None alone proves retention, repeatable delivery, mature support, security, scalability, or sustainable SaaS economics.

Historical production systems support claims about engineering responsibility, architecture, deployment, integration, operations, and long-term maintenance. They do not establish a large modern AI-development portfolio. New AI-era evidence must be created through current owned systems and external paid work.

All public and lower-level documentation must apply the more detailed evidence rules in `journal-and-evidence.md`.
