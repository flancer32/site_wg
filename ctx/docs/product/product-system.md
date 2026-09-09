# Product System

- Path: `ctx/docs/product/product-system.md`
- Template Version: `20260605`
- Changed: `20260909`

## Purpose

Define the relationship among Alex Gusev's original technologies, working capabilities, buyer-facing offers, research, and historical proof.

## Strategic Direction

Alex intentionally creates and develops modern web applications for an environment in which people, software services, and AI agents coexist and interact. The Internet provides their shared environment; the Web Platform provides the application platform; and JavaScript provides a common language across browser and server applications. This supports reuse of code and concepts, modular distributed applications, and software increasingly developed and maintained by humans together with AI agents.

JavaScript is an enabling technological choice, not the product being sold and not a reason to present Alex as a generic JavaScript developer. The long-term system combines software architecture, human-agent production methods, and applications that connect AI systems to useful resources under explicit human control.

The strategic chain is:

`TeqFW + ADSM + AI agents -> Alarisa -> productizable components such as PDE, World Map, and general memory -> concrete offers -> stronger components and a stronger Alarisa system`

These are connected roles, not a catalogue of equal products.

## Alarisa

Alarisa is Alex's principal long-term R&D project and the main product system through which the personal-agent direction is developed.

Alarisa is a personal intelligent assistant built around AI agents. It is configured around its `Principal`: the person whose interests, resources, context, and actions the assistant serves. In Alarisa's domain model, `Principal` is deliberate terminology and must not be casually replaced with `customer`, `owner`, or `user`. Those terms remain valid for a buyer or client in commercial documentation.

Alarisa's durable product responsibility is to act as an intelligent bridge between its Principal and the surrounding digital environment, including the Principal's digital resources, external digital services, resources or services belonging to other people where authority permits, AI agents, and other people's agents. This describes the product vision and domain boundary; it does not claim that every bridge or agent interaction is already implemented.

Alarisa is larger than a single release or buyer-facing package. It contains or drives components that may have their own lifecycles, demonstrations, deployments, and commercial offers. The fact that Alarisa as a whole is not currently offered as a mature product does not make it merely historical and does not remove it from the strategic horizon.

The productization principle is:

`Alarisa research and architecture -> coherent component -> concrete buyer outcome -> bounded offer -> customer evidence and reusable improvement -> stronger Alarisa`

Alarisa should therefore be visible as the unifying strategic direction while the site sells sufficiently ready parts in language appropriate to each buyer.

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

Personal Digital Embassy (`PDE`) is an experimental but working application and infrastructure subsystem created in the context of Alarisa. It provides controlled bridges through which MCP-compatible AI systems can interact with digital resources associated with a Principal.

PDE is an infrastructure component of Alarisa. It is also separable enough to be deployed independently, solve useful problems by itself, support customization, and provide concrete commercial offers without a complete Alarisa installation. Its near-term monetization role must not be confused with ownership of the long-term strategic direction.

Conceptually:

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

The canonical offer boundary is defined in `offers/chatgpt-telegram/overview.md`.

### Shared Files

Shared Files allows an AI system to read and write files in storage controlled through PDE. It is an existing experimental capability and a possible future private persistent workspace for AI systems.

It is not currently an equal commercial offer. No customer validation, standardized scope, or price is claimed.

## Other Productizable Alarisa Components

The World Map and general memory are named Alarisa components or capability areas that may be commercialized separately, just as PDE capabilities can be.

The durable principle is modular commercialization, not a claim that every component is ready now. Before either becomes an active offer, product documentation must define its current capability, buyer outcome, maturity, evidence, delivery boundary, and commercial next step.

## AI-Agent Direction

Alex already uses AI agents as software-development participants. The long-term hypothesis is that software platforms increasingly need to support environments in which agents create, inspect, and modify code; consume architectural and contextual documentation; and hand software between different human-agent systems.

This direction may guide product and architecture choices, but speculative future behavior must not be presented as currently available.

## Historical Proof

Historical systems demonstrate engineering responsibility; they do not define the technology being sold now.

Santegra is a legitimate proof point: a substantial Magento-based commerce application with third-party integrations, custom MLM network and distributor management, internal balance and points accounting, and recurring bonus calculations. It was developed over roughly two years, has operated in production since 2018, and remains supported.

Its valid role is evidence that Alex can build, operate, evolve, and remain responsible for a substantial business system. It is not a reason to position around PHP or Magento, and it is not proof of a large portfolio of repeatable independent product successes.

## Status Vocabulary

Future public and internal descriptions should use status deliberately:

- `strategic product system` — the long-term coherent project whose components may mature and commercialize at different rates;
- `productizable component` — a coherent part that may receive its own buyer-facing outcome and offer without becoming independent of the larger system;
- `active offer` — a bounded outcome Alex is prepared to discuss and deliver for payment;
- `working experimental capability` — functioning in practice but without claims of production maturity or broad validation;
- `enabling technology` — reusable platform or method supporting offers and delivery;
- `research` — active investigation without a present purchase promise;
- `historical proof` — completed or long-running work used as evidence, not as current direction;
- `discontinued` — not promoted, validated, or recommended as a current offer.

GitHub Flows and Agent Orchestration PoC are discontinued. They may appear only when a historical explanation is genuinely useful and must never be reinstated as active commercial direction by lower-level documentation.
