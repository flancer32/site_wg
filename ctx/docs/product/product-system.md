# Vision, Development, And Product System

- Path: `ctx/docs/product/product-system.md`
- Template Version: `20260605`
- Changed: `20260909`

## Purpose

Define the distinctions and relationships among Alarisa as a guiding vision, ADSM as a development methodology, TeqFW as a technical platform, exploratory work, independently useful systems and capabilities, commercial products and offers, and historical proof.

## Strategic Direction

Alex intentionally creates and develops modern web applications for an environment in which people, software services, and AI agents coexist and interact. The Internet provides their shared environment; the Web Platform provides the application platform; and JavaScript provides a common language across browser and server applications. This supports reuse of code and concepts, modular distributed applications, and software increasingly developed and maintained by humans together with AI agents.

JavaScript is an enabling technological choice, not the product being sold and not a reason to present Alex as a generic JavaScript developer. The long-term direction combines software architecture, human-agent development methods, and applications that connect AI systems to useful resources under explicit human control.

The complementary roles are:

- `Alarisa` describes the broader future Alex chooses to explore: how humans and AI agents may coexist and interact;
- `TeqFW` provides a technical application platform and addresses how modular JavaScript and web software is structured;
- `ADSM` provides a human-directed development methodology and addresses how software intent and evolution are organized and controlled;
- `PDE` is an independently useful technical system that emerged from development guided by Alarisa;
- commercial products and offers solve bounded present needs and have lifecycles distinct from the vision that motivated their discovery.

The exploration relationship is:

```text
Alarisa vision and direction
          |
          v
exploration and experiments
          |
          +-- useful capability --> independent product --> commercial offer
          +-- reusable infrastructure
          +-- failed or discontinued branch
          +-- future question or idea
```

Not every experiment must succeed or become a product. Products are hypotheses discovered and tested while moving in the Alarisa direction; Alarisa is not a deterministic roadmap or a container that makes every result one of its product modules.

## Maker And Production Responsibility

Alex Gusev is the single accountable human maker who selects product direction and accepts engineering decisions. AI and LLM agents are active production participants, using TeqFW where applicable and working under ADSM governance, but their ability to propose, inspect, or implement work does not transfer accountability away from Alex.

This model must be represented honestly. Wired Geese must not pretend to be a larger company, describe agents as employees, claim that agents eliminate key-person risk, or imply unlimited delivery and support capacity. For suitable buyers, the same model may provide direct creator access, coherent ownership, rapid feedback, and deep customization of original technology.

## Core Distinctions

- `Alarisa` is Alex's guiding vision, long-term development direction, and practical exploration path for human-AI-agent coexistence and interaction. It is not a commercial product category or a conventional software project.
- `TeqFW` is a technical application platform and architectural approach used to structure modular JavaScript and web applications.
- `ADSM` is a methodology for organizing and controlling human-directed, AI-agent-assisted software development and preserving its cognitive context.
- An `experiment` tests a question along the Alarisa path. It may produce a capability, reusable infrastructure, an independent product, a future idea, or a valid dead end.
- A `technical system` such as PDE may emerge from Alarisa-guided development and remain useful both to further exploration and to independent deployments or products.
- A `capability` is a useful technical ability created through exploration or product work, such as reading Telegram channels, publishing messages, or working with private files. A capability is not automatically a product.
- A `product` is a bounded solution to a concrete payer need that can be independently offered, delivered, and supported. It may emerge from exploration guided by Alarisa without requiring a customer to adopt that vision.
- An `offer` is a concrete commercial presentation of a product or capability to a target buyer. `Connect your ChatGPT to your Telegram` is the current canonical example.

Vision, exploration lineage, technical composition, product identity, and commercial presentation describe different relationships. A system may continue serving Alarisa-guided exploration while an independently deliverable product built from its capabilities develops its own commercial lifecycle.

## Alarisa

Alarisa is Alex's guiding vision and long-term development direction for how humans and AI agents may coexist and interact. It is also a practical exploration path: it guides which problems, hypotheses, experiments, integrations, and products Alex chooses to investigate without prescribing their final form.

The personal intelligent-assistant concept is a central current expression of this vision. It is organized around a `Principal`: the person whose interests, resources, context, and actions an assistant serves. In Alarisa's conceptual domain, `Principal` is deliberate terminology and must not be casually replaced with `customer`, `owner`, or `user`. Those terms remain valid for a buyer or client in commercial documentation.

The vision explores an intelligent bridge between a Principal and the surrounding digital environment, including the Principal's digital resources, external digital services, resources or services belonging to other people where authority permits, AI agents, and other people's agents. This is a conceptual direction, not a claim that one Alarisa system already implements every bridge or interaction.

Alarisa must not be defined primarily as a product, product system, conventional project, package waiting for commercialization, or monolithic application sold early through its parts. Experimental software used by Alex and trusted users provides instruments for the exploration, but no single runtime or repository exhausts Alarisa's identity.

Capabilities and reusable technology developed along this path may solve concrete customer needs independently. Some may become standalone commercial products; others may remain exploration infrastructure, be superseded, reveal a dead end, or leave only useful learning. Commercial failure or technical discontinuation of one branch does not invalidate the Alarisa direction.

GitHub Flows and Agent Orchestration PoC are discontinued branches and must not return as active offers. Their discontinuation is a normal result of exploration rather than evidence that the broader vision failed.

Alarisa does not enumerate a fixed roadmap. PDE was discovered and developed through exploration rather than treated as a permanently predetermined module, and future products must emerge from validated needs and technical discoveries rather than from a claim that their final architecture is already known.

Alarisa should therefore remain visible as the unifying strategic vision and R&D direction while current buyers encounter independent products and offers in language appropriate to their needs.

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

Agent-Driven Software Management (`ADSM`) is Alex's methodology for controlled software creation and evolution with AI agents under human direction. It makes product intent, architecture, environment assumptions, implementation constraints, accepted decisions, development rules, authority, and review explicit in a structured cognitive context.

TeqFW primarily supplies application structure and the technical platform; ADSM organizes how humans and agents understand, change, verify, and govern software. AI agents are development participants within that method, not independent owners of product purpose.

ADSM's strategic commercial relevance extends beyond Alex's internal production process. A maintained cognitive context can accompany source code, configuration, deployment knowledge, and tests so another accountable human-and-agent team can continue development with more preserved intent and structure than source code alone provides.

This is support for continued human-directed, AI-agent-assisted evolution, not a promise of perfect continuity, autonomous maintenance, or elimination of developers. Transfer models and boundaries are defined in `transferable-development.md`.

## Personal Digital Embassy

Personal Digital Embassy (`PDE`) is an experimental but working application and infrastructure system that emerged from Alarisa-guided development. It provides controlled bridges through which MCP-compatible AI systems can interact with digital resources associated with a Principal.

PDE has a legitimate dual role. It supports continued exploration in the Alarisa direction, and it is sufficiently independent to be deployed on its own, solve customer problems, support standalone products and offers, receive customization, and develop its own product lifecycle.

PDE is not a smaller Alarisa, a subsystem of a future commercial Alarisa package, or a piece of a finished product sold early. Its commercial value comes from independently useful capabilities discovered through Alarisa-driven exploration.

Conceptually:

```text
Alarisa direction
       |
       v
exploration and technical discovery
       |
       +-- PDE technical system
       |     +-- Telegram Desk
       |     +-- Shared Files Desk
       |     +-- future resource integrations
       |
       +-- other capabilities, products, ideas, or dead ends
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

## Other Alarisa-Directed Outcomes

The World Map and general memory are current exploration areas whose work may produce independently useful capabilities or products, just as PDE work can.

This possibility does not make Alarisa a product being commercialized in modules and does not imply that every exploration branch should become a product. Before either becomes an active product or offer, product documentation must define the payer need, independent delivery and support boundary, maturity, evidence, and commercial next step.

## AI-Agent Direction

Alex already uses AI agents as software-development participants. The long-term hypothesis is that software platforms increasingly need to support environments in which agents create, inspect, and modify code; consume architectural and contextual documentation; and continue software work across different accountable human-and-agent teams.

This direction may guide product and architecture choices, but speculative future behavior must not be presented as currently available. Access to code or cognitive context gives an agent capability, not permission or ownership. Agents act within human-defined goals and authority; they do not select commercial purpose or replace human responsibility for accepted outcomes.

## Practical-Use Evidence

Alex uses software developed along the Alarisa direction and PDE capabilities in his own digital life, and selected capabilities have also been installed for close or experimental users. TeqFW, PDE, Alarisa-directed exploration, and this site's maintained cognitive context also exercise ADSM in real development. This dogfooding demonstrates practical use in bounded settings.

Practical use and commercial validation are separate evidence categories. Personal and trusted-user use does not establish payer demand, standardized delivery, mature support, production-grade security, or repeatable external deployment. External paying customers remain necessary to validate a commercial product or offer.

## Historical Proof

Historical systems demonstrate engineering responsibility; they do not define the technology being sold now.

Santegra is a legitimate proof point: a substantial Magento-based commerce application with third-party integrations, custom MLM network and distributor management, internal balance and points accounting, and recurring bonus calculations. It was developed over roughly two years, has operated in production since 2018, and remains supported.

Its valid role is evidence that Alex can build, operate, evolve, and remain responsible for a substantial business system. It is not a reason to position around PHP or Magento, and it is not proof of a large portfolio of repeatable independent product successes.

## Status Vocabulary

Future public and internal descriptions should use status deliberately:

- `vision and direction` — a guiding view of the future and open exploration path rather than a product, system boundary, or deterministic roadmap;
- `exploration branch` — a bounded hypothesis or line of investigation that may produce a system, capability, product, reusable learning, or dead end;
- `experimental system` — a working instrument used to develop and test ideas without a claim of commercial product maturity;
- `technical system` — independently identifiable software or infrastructure with its own technical boundary, such as PDE, whether or not it supports a commercial product;
- `active product` — a bounded solution Alex is prepared to offer, deliver, and support independently for a payer;
- `capability` — a useful technical ability that may support an internal system, a product, or an offer without automatically being any of them;
- `active offer` — a bounded outcome Alex is prepared to discuss and deliver for payment;
- `enabling technology` — reusable platform or method supporting offers and delivery;
- `research` — active investigation without a present purchase promise;
- `historical proof` — completed or long-running work used as evidence, not as current direction;
- `discontinued` — not promoted, validated, or recommended as a current offer.

GitHub Flows and Agent Orchestration PoC are discontinued. They may appear only when a historical explanation is genuinely useful and must never be reinstated as active commercial direction by lower-level documentation.
