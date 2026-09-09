# Code Overview

- Path: `ctx/docs/code/overview.md`
- Template Version: `20260629`
- Changed: `20260909`

## Purpose

Define implementation-facing boundaries that refine the accepted product, architecture, and environment model without prematurely specifying the commercial redesign.

## Current Scope

The code documentation describes the existing multilingual SSR delivery model and durable repository boundaries. It does not yet define new PDE offer pages, navigation, forms, analytics, payment, provisioning, or product-runtime integrations.

## Repository Boundaries

- `src/` plus `teqcms.config.mjs` contain project-specific runtime adaptation.
- `tmpl/` contains authored public pages and shared partials.
- `web/` contains generated or published output rather than primary authored implementation.
- `etc/` and `bin/` contain environment-facing operational assets.
- `ctx/` contains normative meaning and implementation constraints, not runtime code.

## Target-State Rule

Future implementation must derive from the product-led commercial context:

- products and concrete outcomes lead;
- engineering expertise supports product delivery and customization;
- Alarisa remains visible as the strategic R&D direction but is not presented as a current commercial product;
- capabilities, independently deliverable products, and buyer-facing offers remain distinct;
- PDE remains external to the website runtime;
- valuable routes and public material are preserved deliberately;
- experimental status and credential boundaries stay explicit.

## Legacy Drift

Current source and templates may still implement the discontinued GitHub Flows and Agent Orchestration PoC funnel, including offer-specific page content, form fields, signed token enrichment, and event concepts.

Those elements are not durable code contracts. Future agents must not rebuild, extend, port, or reuse them for the Telegram offer without a separately approved design.

The implementation may also still express the former engineer-centric commercial hierarchy. That behavior remains observable current state but is not the accepted target.

## Future Design Gate

Before code changes begin, the human must approve enough product and architecture detail to define:

- final information architecture and routes;
- page roles and composition;
- preservation and redirect decisions;
- contact and qualification behavior;
- whether any telemetry, payment, provisioning, or customer-data handling is required.

Absent that approval, code documentation should preserve stable SSR facts and leave commercial implementation questions open.
