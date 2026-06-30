# Product Overview

- Path: `ctx/docs/product/overview.md`
- Template Version: `20260605`
- Changed: `20260630`

## Site Purpose

`wiredgeese.com` is the personal product site of Alex Gusev.

Its primary role is:

- to sell Alex as an engineer;
- to sell Alex's products;
- to convert visitor interest into a clear next step such as contact, a pilot, a book visit, a product visit, or a relevant project review.

The site is not a neutral archive, a technical encyclopedia, or a personal diary.
Even when it contains articles, notes, library pages, or demo materials, those materials must strengthen trust in Alex and his products.

## Core Principle

Each major page should perform at least one of these product functions:

- directly sell Alex;
- directly sell one of his products;
- strengthen trust in Alex as an engineer;
- strengthen trust in the product line;
- explain a method that increases the value of his practical offers;
- show working proof that the products and approaches are real.

If a page performs none of those functions, its presence on the site should be reconsidered.

## Product Hierarchy

The site sells a connected product line rather than a single offer.

The current hierarchy is:

### 1. Alex As The Base Product

The primary object being sold is Alex himself.

The site should help visitors understand:

- who Alex is;
- what engineering profile he has;
- which classes of problems he can solve;
- why he can be trusted with architecture, infrastructure, or agent-driven work.

### 2. The Main Engineering Product

The main engineering product is `Tequila Framework`.

Preferred public link:

- `https://teqfw.com/ecosystem/philosophy`

It should be presented as the foundational technical asset that demonstrates:

- architectural depth;
- systematic engineering thinking;
- the ability to build platform components;
- a practical base for later applied products.

### 3. The Current Hot Offer

The current hot offer is `GitHub Flows`.

It is the nearest-to-sale infrastructure product:

- a workflow approach and software layer for GitHub events;
- a self-hosted link between GitHub webhooks and CLI agents;
- a practical way to run bounded agent workflows in client infrastructure;
- a suitable object for pilot adoption.

This product may dominate hero sections and conversion scenarios while it remains the current priority.

`GitHub Flows App` must not be promoted as the main product label.
It is the host application that executes `GitHub Flows`, not the main thing being sold.

### 3.1. Narrow Entry Offers Under GitHub Flows

Small entry offers may exist under `GitHub Flows` when they help validate demand and reduce buyer risk.

Current narrow validation offer:

- `Hosted PoC for event-driven AI-agent orchestration` as a GitHub-based proof of concept on a real repository.

This offer is subordinate to `GitHub Flows` and must be positioned as:

- a bounded first commercial step;
- a ready test bench for repository owners who want practical exposure to orchestration before building infrastructure;
- a way to test willingness to pay before discussing broader workflow automation.

It must not be presented as:

- a separate large platform;
- a replacement for the broader `GitHub Flows` concept;
- a general AI consulting offer.

The core product meaning of this PoC is:

`A hosted PoC for exploring event-driven AI-agent orchestration on a real GitHub repository.`

The core principle that should remain visible in product documents is:

`event -> agent reaction -> new observable event`

GitHub issue triage is the first practical scenario, not the entire product meaning.
GitHub Issues are the first visible event interface for controlled AI-agent orchestration.

### 4. The Method Product

The book `Agent-Driven Development` is a separate product.

It should be treated as both supporting material and a standalone commercial artifact.
Its role is:

- to sell Alex's methodological expertise;
- to explain how to keep control while delegating development to AI agents;
- to strengthen trust in practical offers;
- to serve as an entry point for people who first want to understand the approach and only then buy a product or implementation.

Canonical book links:

- `http://fly.wiredgeese.com/flancer/leanpub/adsm-en/`
- `http://fly.wiredgeese.com/flancer/leanpub/adsm-ru/`

### 5. AI-Generated SSG Sites On Top Of TeqFW

Another applied product is AI-generated SSG sites built on `Tequila Framework`.

This offer means:

- site creation on top of TeqFW;
- page generation through an AI agent;
- translation support through an AI agent;
- managed content publication and evolution without a heavy CMS stack;
- the ability to connect a content site with an agent-driven workflow.

This product should show that TeqFW is not only an engineering foundation but also a practical platform for real sites.

Key examples:

- `wiredgeese.com` — a personal site in three languages (`es`, `en`, `ru`) with AI-assisted page generation and translation;
- `teqfw.com` — an English-language site with demo ticket processing through `GitHub Flows`.

Preferred public links:

- `https://cms.teqfw.com/en/`
- `https://cms.teqfw.com/ru/`

This layer should be positioned as an applied product scenario for:

- personal sites;
- product sites;
- technical documentation;
- sites where AI-supported content and workflow are an advantage.

### 6. Supporting Proofs

Demo projects, articles, notes, this site, and other public materials should function as supporting proofs.

They exist so that visitors can see:

- that the products are real;
- that the engineering base exists;
- that the approaches have been exercised in practice;
- that the commercial language is backed by implemented systems and observable experience.

## Home Page Role

The home page is the main entry into the site's product logic.

Its role is:

- to quickly sell the current hot offer;
- to show Alex through his products;
- to provide a short personal context;
- to move the visitor to the next action.

It should remain a short introductory page rather than a compressed version of the whole site.

Constraints:

- the home page should announce no more than three products;
- the rest of the products and scenarios should be unfolded on dedicated product pages;
- when the product line exceeds three active offers, the home page should surface only the current priorities.

## Other Page Types

Different page types may contribute to the sale in different ways.

### Product Pages

They should directly explain value, constraints, usage scenarios, and the next step.

Validation landing pages are a special product-page subtype.
They may sell a narrow entry offer and measure behavior around it, but they must remain clearly subordinate to the site-wide product hierarchy.

### Project Pages

They should show engineering credibility, architectural depth, and the relationship between a project and Alex's product line.

### Articles And Notes

They should either strengthen trust in engineering and method expertise or lead toward a product, the book, contact, or a pilot.

### Demo Pages

They should show observable mechanics rather than replace the product formulation.
The demo does not sell itself; it helps sell Alex and his products.

## Priority Rule

The site should always distinguish between:

- the main engineering product;
- the current hot offer;
- the method product;
- applied product scenarios on top of TeqFW;
- supporting proofs.

Supporting proofs must not displace the main products.
Methodology must not displace the practical offer being sold.
The current offer must not hide the underlying engineering base.
The home page must not be overloaded with announcements for the whole product line at once.

## Communication Constraints

The site must not:

- read like an abstract research project without a commercial path;
- spread attention across too many equal meanings;
- sell "AI in general";
- promise universal software-development automation;
- turn all content into a long methodological treatise.

The site should:

- keep a clear sales line;
- show product hierarchy;
- allow narrow validation offers under the current hot offer without fragmenting the product line;
- connect articles, demos, and projects to the commercial function;
- strengthen trust through specifics;
- move the visitor toward a meaningful next step.

Public-facing site text should remain calm, confident, and natural rather than polemical.
Drafting patterns that introduce unnecessary tension should be smoothed out before publication.

## Product Check Rule

Any substantial site revision should be checked against this question:

`Does this help sell Alex and his products more effectively?`

If the answer is unclear, the change should be reconsidered.
