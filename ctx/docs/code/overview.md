# Code Overview

- Path: `ctx/docs/code/overview.md`
- Template Version: `20260629`
- Changed: `20260910`

## Purpose

Define implementation-facing boundaries that refine the accepted product, architecture, and environment model without prematurely specifying the commercial redesign.

## Current Scope

The code documentation describes the existing multilingual SSR delivery model and durable repository boundaries. It does not define final target routes, Product Detail or How-it-works templates, forms, analytics, payment, provisioning, or product-runtime integrations.

## Repository Boundaries

- `src/` plus `teqcms.config.mjs` contain project-specific runtime adaptation.
- `tmpl/` contains authored public pages and shared partials.
- `web/` contains generated or published output rather than primary authored implementation.
- `etc/` and `bin/` contain environment-facing operational assets.
- `ctx/` contains normative meaning and implementation constraints, not runtime code.

## Target-State Rule

Future implementation must derive from the product-led commercial context:

- products and concrete outcomes lead;
- the primary commercial surface and navigation serve current business goals;
- Projects, Library, Journal, Books, and other retained knowledge may become secondary without becoming orphaned;
- engineering expertise supports product delivery and customization;
- Alex Gusev is presented as the accountable maker and AI agents as active production participants without implied large-company capacity;
- Alarisa remains visible as the guiding vision and strategic R&D direction, with an eventual product or connected product-family ambition, rather than a market-ready product, conventional project, single runtime, or deterministic roadmap;
- TeqFW, ADSM, PDE, concrete products, and commercial offers remain visibly distinct kinds of things;
- capabilities, independently deliverable products, and buyer-facing offers remain distinct;
- PDE remains external to the website runtime;
- optional transferable-development capability may be explained, but the website does not deliver cognitive context or imply autonomous maintenance;
- valuable routes and public material are preserved deliberately;
- retained material has a meaningful internal discovery path, not only a surviving file or search result;
- experimental status and credential boundaries stay explicit.

## Legacy Drift

The localized GitHub Flows and Agent Orchestration PoC route is retained as an archived historical page. Its former offer-specific form fields, signed token enrichment, mail handler, repository validation, and event concepts have been removed.

Future agents must not rebuild, extend, port, or reuse the retired campaign for the Telegram offer without a separately approved design.

The implementation may also still express the former engineer-centric commercial hierarchy. That behavior remains observable current state but is not the accepted target.

## Implementation Design Gate

The commercial information architecture, navigation semantics, page roles, and route-selection boundary are approved in `../product/information-architecture.md`. Before code changes begin, the human must still approve enough migration, interface, and interaction detail to define:

- final public copy and visual composition;
- exact target paths and the role of existing route candidates;
- the evidence-based preservation or redirect treatment for affected legacy routes;
- contact and qualification behavior;
- whether any telemetry, payment, provisioning, or customer-data handling is required.

Absent that approval, code documentation may map the approved semantic information architecture but must not promote candidate labels, paths, or page splits into implementation contracts.
