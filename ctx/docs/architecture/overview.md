# Architecture Overview

- Path: `ctx/docs/architecture/overview.md`
- Template Version: `20260605`
- Changed: `20260909`

## Purpose

Provide the entry point to the target architecture of the product-led commercial site.

## Architecture Role

The architecture realizes `wiredgeese.com` as a multilingual commercial publication and contact surface that:

- communicates concrete offers, active technologies, customization capability, proof, research, and writing with distinct status;
- presents Alarisa as the principal long-term R&D direction and future product candidate while giving current standalone products and offers direct commercial paths;
- preserves valuable historical and search-bearing public material;
- supports explicit commercial next steps without assuming a mature automated sales system;
- remains separate from the runtime and client deployments of products it promotes.

## Architectural Style

The site remains a content-oriented SSR and publication system with a thin Node.js application layer.

The stable flow is:

`authoritative context -> authored templates and assets -> TeqCMS plus thin project adapter -> SSR or published browser output`

The commercial repositioning changes site meaning and future content hierarchy. It does not by itself authorize a new site engine, a large custom application, or incorporation of PDE into the website process.

## Major Boundaries

- `ctx/` owns normative product and engineering context.
- `tmpl/` and source-controlled assets own authored public content and composition.
- `src/` plus `teqcms.config.mjs` own thin project-specific runtime adaptation.
- `web/` contains downstream delivered or generated output.
- `bin/` and `etc/` support site operation without defining product meaning.
- PDE and customer-specific deployments are external promoted systems and operational environments, not components of the wiredgeese.com runtime.

PDE remains an independently useful infrastructure subsystem of Alarisa R&D even though its deployed runtime stays outside the website architecture. R&D composition, commercial independence, and runtime deployment boundaries must not be conflated.

## Documentation Map

- `structure.md` defines the blocks and separation between site and promoted products.
- `behavior.md` defines authoring, publication, request, preservation, and commercial-handoff flows.
- `state.md` defines authoritative, derived, operational, and external commercial state.
- `integration.md` defines site integrations and the PDE boundary.
- `constraints.md` defines non-negotiable architecture restrictions.
- `decisions.md` records durable choices.
- `supervision.md` defines human-agent change control.

## Target And Legacy

This level is normative for the accepted target state. Existing GitHub Flows landing pages, form-specific enrichment, telemetry contracts, and offer copy may remain in the implementation temporarily. They are legacy drift and do not belong to the target architecture.

Removing or replacing that implementation requires a later approved task with URL-preservation review.
