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

Future implementation realizes the current architecture's connected responsibilities:

`SELL + DEMONSTRATE + DOCUMENT`

Aligned selling has immediate operational priority, without hiding current work or the active Journal evidence stream. Implementation must be able to expose current commercial entry points, current work and systems, meaningful Journal/Events, the human-plus-agent working model, TeqFW and ADSM as foundations, Alarisa as a major ongoing proof, accountable-maker evidence, durable/history discovery, and a direct human commercial handoff.

Product, offer, capability, system, evidence, and historical status remain distinct as defined upstream. Alex remains accountable; AI agents are normal authorized development participants, not public-runtime owners or autonomous site actors. TeqFW remains the technical North Star, ADSM the complementary methodology, and wiredgeese.com itself is evidence of their human-directed practice. PDE, Telegram, MCP deliveries, customer systems, and credentials remain external to the website runtime.

The target does not mandate a generic Products catalogue, an Alarisa top-level route, one header link per responsibility, permanent English labels, or a particular route tree. Valuable existing routes and material require deliberate preservation or migration treatment; their existence is not target IA authority.

## Legacy Drift

The localized GitHub Flows and Agent Orchestration PoC route is retained as an archived historical page. Its former offer-specific form fields, signed token enrichment, mail handler, repository validation, and event concepts have been removed.

Future agents must not rebuild, extend, port, or reuse the retired campaign for the Telegram offer without a separately approved design.

The implementation currently also expresses a Products-first hierarchy (including Products, How it works, and Alarisa in the header). That is observable migration state, not accepted target authority.

## Implementation Design Gate

The commercial information architecture, navigation semantics, page roles, and route-selection boundary are approved in `../product/information-architecture.md`. Before code changes begin, the human must still approve enough migration, interface, and interaction detail to define:

- final public copy and visual composition;
- exact target paths and the role of existing route candidates;
- the evidence-based preservation or redirect treatment for affected legacy routes;
- contact and qualification behavior;
- whether any telemetry, payment, provisioning, or customer-data handling is required.

Absent that approval, code documentation may map the approved semantic information architecture but must not promote candidate labels, paths, or page splits into implementation contracts.
