# Architecture Structure

- Path: `ctx/docs/architecture/structure.md`
- Template Version: `20260605`
- Changed: `20260909`

## Purpose

Describe the major architectural blocks and responsibility boundaries of the site target state.

## Architectural Blocks

- `ctx/` — cognitive context governing product meaning and implementation constraints.
- `tmpl/web/` — multilingual authored page and shared-partial sources.
- `src/` plus `teqcms.config.mjs` — thin application-extension block adapting TeqCMS to project-specific behavior.
- `web/` — browser-delivered and generated publication artifacts.
- `bin/` and `etc/` — site operation and deployment support.
- external promoted systems — PDE runtimes, Telegram connections, client storage, customer hosts, and other product-delivery deployments outside this repository.

## Responsibility Boundaries

- Cognitive context defines accepted meaning; runtime code must not become the hidden source of product strategy.
- Templates express approved public composition and copy; they do not originate product hierarchy.
- The project adapter owns only justified site-specific request and render behavior.
- Publication output remains derived and must be traceable to authored sources.
- Operational assets bind the site to concrete hosts without redefining the site product.
- External product deployments own their own credentials, data, operation, and lifecycle according to each client agreement.

## Commercial Surface Structure

The future public structure must distinguish Alarisa as the principal long-term R&D project from capabilities, independently deliverable products, concrete offers, customization, proof, writing, and contact. It must keep current products and offers directly reachable without requiring a visitor to understand Alarisa, while allowing interested visitors to trace their R&D lineage and understand Alarisa's future product ambition. Architecture does not yet assign these roles to final routes or a navigation tree.

Existing pages may be retained, repurposed, redirected, or reorganized only after content and search-value review. A familiar route name does not preserve an obsolete commercial role by itself.

## Site And Product Boundary

The website may explain, demonstrate, and sell PDE-based capabilities. It does not thereby become the PDE Runtime, an MCP server for customers, a Telegram credential store, or a managed product host.

Any future decision to add those responsibilities would create a new architectural owner and trust boundary and requires explicit human approval plus upstream documentation.

## Expansion Rule

No new runtime area, persistent state owner, offer-specific backend, or detailed page branch is justified solely by the new positioning. Introduce such structure only in a later implementation design after the product model and buyer evidence make it necessary.
