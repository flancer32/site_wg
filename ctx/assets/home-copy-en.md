# English Home Copy Proposal

- Path: `ctx/assets/home-copy-en.md`
- Template Version: `20260909`
- Changed: `20260909`

## Status

Non-normative English copy proposal for human review before implementation.

This document does not approve public copy, product naming, routes, interface composition, or implementation changes. The authoritative Home meaning and content architecture remain in `ctx/docs/product/`.

## Recommended Direction

The recommended direction is concise, product-led, and expandable beyond the first Telegram product.

## High-Impact Copy Choices

### Hero Headline

1. **Recommended:** I build software for people and their AI agents.
2. I make software for work shared by people and AI agents.
3. I connect AI agents to the digital work people already do.

The first option is the clearest expression of the broader product direction without burdening the hero with methodology or infrastructure.

### Hero Subheadline

1. **Recommended:** I make practical products that connect AI agents to the digital services you use for real work—and can be adapted as that work evolves.
2. My products give AI agents controlled access to useful services and information, so they can help beyond the chat window.
3. I turn practical human-and-agent workflows into software you can use now, customize where needed, and continue evolving.

The first option balances immediate usefulness, the product-family idea, and customization without overexplaining.

### Primary Hero CTA

1. **Recommended:** Explore products
2. See current products
3. Start with Telegram

`Explore products` supports the current one-product catalogue while remaining valid as the family grows.

Recommended secondary CTA: `How it works`.

### Current-Product Section Heading

1. **Recommended:** Current products
2. Products for real agent work
3. Start with something working

`Current products` is direct, neutral, and scalable. The more distinctive language belongs inside the product preview.

### Final CTA Section

#### Option 1 — Recommended

**Start with a working product.**

Tell me the outcome you need. I’ll help determine whether a current product fits, what should be adapted, and what a sensible first scope would be.

- Primary action: `Discuss a product`
- Secondary action: `Explore products`

#### Option 2 — Adaptation-Led

**Close, but not quite your workflow?**

If an existing product almost fits, tell me what is missing. I can assess whether a new integration, deeper customization, or related application is the right next step.

- Primary action: `Discuss an adaptation`
- Secondary action: `See how it works`

#### Option 3 — Outcome-Led

**Put an AI agent closer to the work.**

If your need involves Telegram, another digital service, or a related workflow, let’s identify the useful starting point and a bounded first step.

- Primary action: `Start a conversation`
- Secondary action: `Explore products`

Option 1 is recommended because it keeps the commercial path anchored in existing products while leaving room for adaptation.

## Complete Home-Page Draft

### 1. Header

#### Brand

**Wired Geese**  
by Alex Gusev

#### Primary Navigation

- Products
- How it works
- Alarisa

#### Commercial Action

`Discuss a product`

#### Locale Control

`EN · RU · ES`

### 2. Hero

**I build software for people and their AI agents.**

I make practical products that connect AI agents to the digital services you use for real work—and can be adapted as that work evolves.

- Primary action: `Explore products`
- Secondary action: `How it works`

### 3. Current Products

**Current products**

#### Product Preview

**Early access**

**ChatGPT + Telegram**

**Connect your ChatGPT to your Telegram.**

Turn busy conversations and channels into useful summaries, then prepare and publish messages without repeating the work.

- Read and summarize conversations and channels available to your Telegram account.
- Retrieve relevant history where supported.
- Prepare, translate, send, and publish across multiple channels.

Working, experimental software offered as a bounded paid setup. Scope, deployment, and access are agreed before work begins.

Primary action: `Explore this product`

### 4. Adaptation Bridge

**Need something different?**

If a current product is close to what you need, I can adapt the workflow, connect another service, or extend the underlying software for a related application. I start from working products and reusable capabilities, then change what the outcome requires.

- Primary action: `Discuss an adaptation`
- Secondary action: `How it works`

### 5. How It Works Preview

**How it works**

**One accountable maker, with AI agents in the loop.**

I set the product direction and remain responsible for what is accepted and shipped. AI agents take part in research, implementation, inspection, and maintenance under my direction.

#### Built to Evolve

TeqFW provides a modular technical foundation, making the software easier to understand, replace in parts, and extend.

#### Context Kept With the Work

Through ADSM, product intent, architecture, constraints, and accepted decisions are maintained in an explicit cognitive context—not left only in source code or in my head.

#### Control Made Explicit

Deployment, access, and customization are agreed for each product. When suitable and separately agreed, source and a bounded part of the cognitive context can be transferred so another accountable human-and-agent team can continue development.

Primary action: `See how it works`

### 6. Alarisa Preview

**Alarisa**

**The direction behind some of the work**

Alarisa is my long-term exploration of how people, AI agents, and digital services can coexist and interact. It is a direction, not a product or a fixed roadmap. Some of the software I offer has emerged from that exploration and now stands on its own.

Primary action: `Explore Alarisa`

### 7. Maker and Selected Evidence

**Alex Gusev**

**One accountable maker**

Wired Geese is the name I use for the software I create. I set the product direction, work directly with the technology, and remain responsible for every accepted decision.

My engineering experience spans long-lived production systems and today’s AI-agent-assisted web software. That experience matters because these products need to be operated, adapted, and maintained—not merely demonstrated.

#### Used in Practice

I use the Telegram and PDE capabilities in my own digital work, and selected capabilities are installed for experimental users. This is evidence of practical use, not yet broad commercial validation.

#### Inspectable and Maintained

TeqFW and its `@teqfw/di` package provide inspectable examples of my technical work. Santegra, a substantial commerce system I built, has operated in production since 2018 and remains under my support.

Primary action: `About Alex`

### 8. Final Commercial Action

**Start with a working product.**

Tell me the outcome you need. I’ll help determine whether a current product fits, what should be adapted, and what a sensible first scope would be.

- Primary action: `Discuss a product`
- Secondary action: `Explore products`

### 9. Footer

#### Discover

- Products
- How it works
- Alarisa

#### Knowledge

- Project Archive
- Library
- Journal
- Books

#### Wired Geese

- About Alex
- Contact

#### Attribution

Wired Geese · Software by Alex Gusev

## Provisional Language and Confirmation Points

- `ChatGPT + Telegram` is a working product label, not a proposed permanent name.
- `Connect your ChatGPT to your Telegram` is the accepted offer proposition, but it should not automatically become the product name.
- `Early access` reflects the currently documented maturity and must be reconfirmed immediately before publication.
- The exact supported conversation, channel, history-retrieval, sending, and publishing modes must be confirmed. `Where supported` is intentionally retained.
- Whether Home should mention compatibility with AI systems other than ChatGPT remains open. That capability is documented, but ChatGPT is currently the clearest buyer-facing entry point.
- `Bounded paid setup` is supported. No public price, delivery time, hosting promise, or standardized support commitment is proposed.
- Exact destinations for `Explore this product`, `Discuss a product`, and `About Alex` remain implementation and route-migration decisions.
- Shared Files and private memory are intentionally absent because they have not yet passed the catalogue-entry gate.
- GitHub Flows and Agent Orchestration PoC are intentionally absent because they are discontinued.
