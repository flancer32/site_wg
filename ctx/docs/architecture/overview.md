# Architecture Overview

- Path: `ctx/docs/architecture/overview.md`
- Template Version: `20260605`
- Changed: `20260909`

## Purpose

Provide the entry point to the target architecture of the product-led commercial site.

## Architecture Role

The architecture realizes `wiredgeese.com` as a multilingual commercial publication and contact surface that:

- communicates concrete offers, active technologies, customization capability, proof, research, and writing with distinct status;
- presents Alarisa as the guiding vision and principal long-term R&D direction while giving independently valuable products and offers direct commercial paths;
- gives the primary commercial surface and navigation responsibility for the current business while preserving accumulated knowledge on a meaningfully reachable secondary surface;
- preserves valuable historical and search-bearing public material without granting it automatic primary prominence;
- presents Alex Gusev as the accountable maker working with AI-agent production participants and explains ADSM-enabled continuity without implying a larger organization, unbounded capacity, or autonomous maintenance;
- supports explicit commercial next steps without assuming a mature automated sales system;
- remains separate from the runtime and client deployments of products it promotes.

## Architectural Style

The site remains a content-oriented SSR and publication system with a thin Node.js application layer.

The stable flow is:

`authoritative context -> authored templates and assets -> TeqCMS plus thin project adapter -> SSR or published browser output`

The commercial repositioning changes site meaning and future content hierarchy. It does not by itself authorize a new site engine, a large custom application, or incorporation of PDE into the website process.

The primary commercial and secondary knowledge/archive surfaces are semantic responsibilities, not separate applications or deployment units. Their approved navigation meanings, page roles, and route-selection boundary are defined in `../product/information-architecture.md` and rendered through the same multilingual SSR system.

The primary page architecture is Home by brand, Products, Product Detail, How it works, Alarisa, and the shared commercial handoff. About supplies secondary maker trust. Project Archive, Library, Journal, Books, technical pages, and historical material supply secondary evidence and knowledge. This hierarchy remains valid from one current product to a larger catalogue and keeps the same semantic priority on compact viewports.

## Major Boundaries

- `ctx/` owns normative product and engineering context.
- `tmpl/` and source-controlled assets own authored public content and composition.
- `src/` plus `teqcms.config.mjs` own thin project-specific runtime adaptation.
- `web/` contains downstream delivered or generated output.
- `bin/` and `etc/` support site operation without defining product meaning.
- PDE and customer-specific deployments are external promoted systems and operational environments, not components of the wiredgeese.com runtime.

PDE remains an independently useful technical and infrastructure system that emerged from Alarisa-guided development even though its deployed runtime stays outside the website architecture. Exploration lineage, technical composition, commercial independence, and runtime deployment boundaries must not be conflated.

The repository's cognitive context is authoritative for this site. A product-specific cognitive context may also become a bounded transferable engineering asset under an explicit delivery agreement; that commercial transfer does not make the public site a context-distribution service or expose this repository's complete internal context by default.

## Documentation Map

- `structure.md` defines the blocks and separation between site and promoted products.
- `behavior.md` defines authoring, publication, request, preservation, commercial-handoff, and optional product-continuation flows.
- `state.md` defines authoritative, derived, operational, and external commercial state.
- `integration.md` defines site integrations, the PDE boundary, and cognitive-context transfer boundaries.
- `constraints.md` defines non-negotiable architecture restrictions.
- `decisions.md` records durable choices.
- `supervision.md` defines human-agent change control.

## Target And Legacy

This level is normative for the accepted target state. Existing GitHub Flows landing pages, form-specific enrichment, telemetry contracts, and offer copy may remain in the implementation temporarily. They are legacy drift and do not belong to the target architecture.

Removing or replacing that implementation requires a later approved task with URL-preservation review.
