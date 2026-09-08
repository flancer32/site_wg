# Product System

- Path: `ctx/docs/product/product-system.md`
- Template Version: `20260605`
- Changed: `20260908`

## Purpose

Define the relationship among Alex Gusev's original technologies, working capabilities, buyer-facing offers, research, and historical proof.

## Strategic Direction

Alex intentionally develops modern web applications around JavaScript and the Web Platform. The long-term system combines software architecture, human-agent production methods, and applications that connect AI systems to useful resources under explicit human control.

The strategic chain is:

`TeqFW + ADSM + AI agents -> Alarisa -> productizable components such as PDE, World Map, and general memory -> concrete offers -> stronger components and a stronger Alarisa system`

These are connected roles, not a catalogue of equal products.

## Alarisa

Alarisa is Alex's principal long-term R&D project and the main product system through which the personal-agent direction is developed.

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
- package-level architecture that humans and AI agents can inspect and modify.

`@teqfw/di` is an important original technical asset and concrete evidence of this architectural work.

TeqFW is enabling technology and proof. It should not be forced into an abstract framework sale before a buyer understands the capability it enables.

## Agent-Driven Software Management

Agent-Driven Software Management (`ADSM`) is Alex's methodology for controlled software creation with AI agents. It preserves product meaning, architecture, environment, implementation constraints, authority, and review across human-agent work.

Its commercial relevance is primarily that it improves Alex's own production system and supports maintainable handoff. It must not be reduced to generic AI consultancy.

## Personal Digital Embassy

Personal Digital Embassy (`PDE`) is an experimental but working application and infrastructure platform through which MCP-compatible AI systems can interact with digital resources under a person's control.

PDE is an infrastructure component of Alarisa. It is also separable enough to support concrete deployments and offers before Alarisa as a whole is commercially packaged. Its near-term monetization role must not be confused with ownership of the long-term strategic direction.

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
