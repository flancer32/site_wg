# Product Overview

- Path: `ctx/docs/product/overview.md`
- Template Version: `20260605`
- Changed: `20260701`

## Site Purpose

`wiredgeese.com` is the personal product site of Alex Gusev.

At this level, the site itself is the product of the repository.
Its role is to present and sell Alex Gusev, his products, and his offers.

Its primary role is:

- to sell Alex as an engineer;
- to sell Alex's products;
- to convert visitor interest into a clear next step such as contact, a pilot, a book visit, a product visit, or a relevant project review.

The site is not a neutral archive, a technical encyclopedia, or a personal diary.
Articles, notes, library pages, and demos must strengthen trust in Alex and his products.

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

The site product sells and organizes a connected promoted product line rather than a single offer.

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

- `Agent Orchestration PoC` as a small paid GitHub-based proof of concept on a real repository.

This offer is subordinate to `GitHub Flows` and must remain:

- a bounded first commercial step;
- a quick trial on a real repository before custom infrastructure work;
- a guided engineering check with visible GitHub-side results, logs or sanitized excerpts, and a short report;
- a low-risk way to test an AI issue workflow before deeper customization.

It must not read as a separate platform, a replacement for `GitHub Flows`, or a general AI-consulting offer.

Its canonical definition lives in:

- `ctx/docs/product/offers/agent-orchestration-poc/overview.md`

Across product documents, the durable public meaning is:

`A ready starter stand for quickly trying AI agents on issues of a real GitHub repository.`

The orchestration principle that should remain visible is:

`event -> agent reaction -> new observable event`

GitHub issue triage is the first visible scenario, not the whole product meaning.

### 4. The Method Product

The book `Agent-Driven Development` is a separate product.

It is both supporting material and a standalone commercial artifact.
Its role is:

- to sell Alex's methodological expertise;
- to explain how to keep control while delegating development to AI agents;
- to strengthen trust in practical offers;
- to serve as an entry point for people who first want to understand the approach and only then buy a product or implementation.

### 5. AI-Generated SSG Sites On Top Of TeqFW

Another applied product is AI-generated SSG sites built on `Tequila Framework`.

This offer means:

- site creation on top of TeqFW;
- page generation through an AI agent;
- translation support through an AI agent;
- managed content publication and evolution without a heavy CMS stack;
- the ability to connect a content site with an agent-driven workflow.

This product should show that TeqFW is not only an engineering foundation but also a practical platform for real sites.

This layer should be positioned as an applied product scenario for:

- personal sites;
- product sites;
- technical documentation;
- sites where AI-supported content and workflow are an advantage.

### 6. Supporting Proofs

Demo projects, articles, notes, this site, and other public materials should function as supporting proofs.
Their role is to show:

- that the products are real;
- that the engineering base exists;
- that the approaches have been exercised in practice;
- that the commercial language is backed by implemented systems and observable experience.

## Public Surfaces

The site may use multiple public surfaces such as the home page, contact page, offer landing pages, project pages, articles, notes, demos, and library materials.
At product level, those surfaces matter only as roles in the commercial system:

- some surfaces sell the current offer directly;
- some explain a concrete product or offer;
- some strengthen trust through proof, method, or engineering depth;
- some move the visitor to the next commercial step.

Detailed page contracts and SSR page structure belong under `ctx/docs/code/web/ssr/pages/`.

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
No single public surface should try to carry the whole product line at once.

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
Unnecessary tension in wording should be smoothed out before publication.

## Product Check Rule

Any substantial site revision should be checked against this question:

`Does this help sell Alex and his products more effectively?`

If the answer is unclear, the change should be reconsidered.
