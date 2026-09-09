# Product And R&D System

- Path: `ctx/docs/product/product-system.md`
- Template Version: `20260605`
- Changed: `20260909`

## Purpose

Define the relationship among Alex Gusev's production infrastructure, Alarisa R&D, working capabilities, independently valuable products, buyer-facing offers, and historical proof.

## Strategic Direction

Alex intentionally creates and develops modern web applications for an environment in which people, software services, and AI agents coexist and interact. The Internet provides their shared environment; the Web Platform provides the application platform; and JavaScript provides a common language across browser and server applications. This supports reuse of code and concepts, modular distributed applications, and software increasingly developed and maintained by humans together with AI agents.

JavaScript is an enabling technological choice, not the product being sold and not a reason to present Alex as a generic JavaScript developer. The long-term system combines software architecture, human-agent production methods, and applications that connect AI systems to useful resources under explicit human control.

The production relationship is:

`TeqFW + ADSM + AI agents -> software production -> Alarisa R&D and independently developed products`

Within Alarisa R&D, the learning loop is:

`R&D -> useful capability -> independently valuable product -> commercial offer -> paying customer -> revenue and feedback -> reusable technology -> stronger Alarisa`

These are connected roles, not a catalogue of equal products and not a single containment hierarchy.

## Core Distinctions

- `Alarisa` is a long-term R&D project, active experimental system, and integration environment. It is not currently a buyer-facing product.
- A `capability` is a useful technical ability created inside or around Alarisa, such as reading Telegram channels, publishing messages, or working with private files. A capability is not automatically a product.
- A `product` is a bounded solution to a concrete payer need that can be independently offered, delivered, and supported. It may originate from Alarisa without requiring a customer to adopt Alarisa.
- An `offer` is a concrete commercial presentation of a product or capability to a target buyer. `Connect your ChatGPT to your Telegram` is the current canonical example.

R&D composition, product identity, and commercial presentation describe different relationships. A subsystem may remain part of Alarisa while an independently deliverable product built from its capabilities develops its own commercial lifecycle.

## Alarisa

Alarisa is Alex's principal long-term R&D project for creating a personal intelligent assistant around AI agents. It is an active experimental working system, integration environment, and instrument used first by Alex and later, where appropriate, by trusted experimental users.

Alarisa is a personal intelligent assistant built around AI agents. It is configured around its `Principal`: the person whose interests, resources, context, and actions the assistant serves. In Alarisa's domain model, `Principal` is deliberate terminology and must not be casually replaced with `customer`, `owner`, or `user`. Those terms remain valid for a buyer or client in commercial documentation.

Alarisa's intended domain role is to act as an intelligent bridge between its Principal and the surrounding digital environment, including the Principal's digital resources, external digital services, resources or services belonging to other people where authority permits, AI agents, and other people's agents. This describes the R&D vision and domain boundary; it does not claim that every bridge or agent interaction is already implemented.

Alarisa is not currently a commercial product and must not be described as merely difficult to package or as a complete product sold in parts. Its current purpose is to develop and test the broader personal-assistant model and integrate the systems needed to explore it.

Capabilities and reusable technology developed through this work may solve concrete customer needs independently. Some may become standalone commercial products before Alarisa reaches product maturity; others may remain internal R&D infrastructure. No subsystem is assumed to require commercialization.

The long-term objective is to mature Alarisa itself into a product. Its future audience, packaging, price, licensing, deployment model, business model, and launch timing are intentionally unresolved.

Alarisa should therefore remain visible as the unifying strategic R&D direction while current buyers encounter independent products and offers in language appropriate to their needs.

## Tequila Framework

Tequila Framework (`TeqFW`) is an original JavaScript application platform and architectural approach. Its durable direction includes:

- JavaScript, Node.js, and the Web Platform;
- isomorphic application code where appropriate;
- dependency injection, inversion of control, and late binding;
- modular composition with understandable and replaceable parts;
- distributed application development and replaceable package-level contributions;
- package-level architecture that humans and AI agents can inspect and modify.

`@teqfw/di` is an important original technical asset and concrete evidence of this architectural work.

TeqFW is part of Alex's software-production system, not merely another library in a portfolio. It is enabling technology and proof and should not become the primary commercial offer unless a concrete paid offer around it is later validated.

## Agent-Driven Software Management

Agent-Driven Software Management (`ADSM`) is Alex's methodology for controlled software creation with AI agents. It preserves product meaning, architecture, environment, implementation constraints, authority, and review across human-agent work.

TeqFW primarily supplies application structure and the technical platform; ADSM primarily supplies the development process and agent-controlled methodology. Together with AI agents acting as active development participants, they form Alex's software-production system.

ADSM's commercial relevance is primarily that it improves this production system and supports maintainable handoff. It is active engineering infrastructure, not merely writing, research, consultancy material, or generic AI consultancy.

## Personal Digital Embassy

Personal Digital Embassy (`PDE`) is an experimental but working application and infrastructure subsystem created as part of Alarisa R&D. It provides controlled bridges through which MCP-compatible AI systems can interact with digital resources associated with a Principal.

PDE remains part of Alarisa, alongside other present or future systems and subsystems. It is sufficiently separable to be deployed independently, solve customer problems independently, support standalone products and offers, receive independent customization, and develop its own commercial lifecycle while continuing to contribute reusable technology and learning to Alarisa.

PDE is not a smaller Alarisa or a piece of a finished Alarisa product sold early. Its commercial value comes from independently useful capabilities developed within the R&D project.

Conceptually:

```text
Alarisa R&D
  |
  +-- PDE
  |    +-- Telegram Desk
  |    +-- Shared Files Desk
  |    +-- future resource integrations
  |
  +-- other systems and subsystems
```

An operational PDE interaction may look like:

```text
ChatGPT or another MCP-compatible agent
                  |
                 MCP
                  |
                 PDE
               /     \
          Telegram   Shared Files
               ...   other Desks
```

PDE is the platform. A `Desk` is a capability or resource bridge within it. A buyer-facing offer packages a concrete outcome built on one or more capabilities. These concepts must remain distinct.

PDE should initially be explained through outcomes rather than requiring customers to understand its runtime, Desk architecture, protocol implementation, or dependencies.

## Active Capabilities

### Telegram

The Telegram Desk is the basis of the first active commercial offer. It supports reading, summarizing, retrieving, preparing, sending, and publishing Telegram information within the permissions and operational boundaries of the connected account.

The Desk operations are capabilities. A configured integration that delivers an agreed Telegram outcome is the bounded customer product. `Connect your ChatGPT to your Telegram` is the offer used to present that product commercially. The three must not be treated as interchangeable names for one object.

The canonical offer boundary is defined in `offers/chatgpt-telegram/overview.md`.

### Shared Files

Shared Files allows an AI system to read and write files in storage controlled through PDE. It is an existing experimental capability and a possible future private persistent workspace for AI systems.

It is not currently an equal commercial offer. No customer validation, standardized scope, or price is claimed.

## Other Alarisa R&D Outcomes

The World Map and general memory are named Alarisa components or capability areas whose work may produce independently useful capabilities or products, just as PDE work can.

This possibility does not make Alarisa a current product being commercialized in modules and does not imply that every subsystem should become a product. Before either becomes an active product or offer, product documentation must define the payer need, independent delivery and support boundary, maturity, evidence, and commercial next step.

## AI-Agent Direction

Alex already uses AI agents as software-development participants. The long-term hypothesis is that software platforms increasingly need to support environments in which agents create, inspect, and modify code; consume architectural and contextual documentation; and hand software between different human-agent systems.

This direction may guide product and architecture choices, but speculative future behavior must not be presented as currently available.

## Historical Proof

Historical systems demonstrate engineering responsibility; they do not define the technology being sold now.

Santegra is a legitimate proof point: a substantial Magento-based commerce application with third-party integrations, custom MLM network and distributor management, internal balance and points accounting, and recurring bonus calculations. It was developed over roughly two years, has operated in production since 2018, and remains supported.

Its valid role is evidence that Alex can build, operate, evolve, and remain responsible for a substantial business system. It is not a reason to position around PHP or Magento, and it is not proof of a large portfolio of repeatable independent product successes.

## Status Vocabulary

Future public and internal descriptions should use status deliberately:

- `R&D project` — a strategically directed body of development and investigation that is not itself a current purchase promise;
- `experimental system` — a working instrument used to develop and test ideas without a claim of commercial product maturity;
- `active product` — a bounded solution Alex is prepared to offer, deliver, and support independently for a payer;
- `capability` — a useful technical ability that may support an internal system, a product, or an offer without automatically being any of them;
- `active offer` — a bounded outcome Alex is prepared to discuss and deliver for payment;
- `enabling technology` — reusable platform or method supporting offers and delivery;
- `research` — active investigation without a present purchase promise;
- `historical proof` — completed or long-running work used as evidence, not as current direction;
- `discontinued` — not promoted, validated, or recommended as a current offer.

GitHub Flows and Agent Orchestration PoC are discontinued. They may appear only when a historical explanation is genuinely useful and must never be reinstated as active commercial direction by lower-level documentation.
