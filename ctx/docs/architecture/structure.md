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

The future public structure has two distinct semantic responsibilities:

- the **primary commercial surface** makes current products, offers, outcomes, relevant technology and direction, customization, accountable maker identity, trust boundaries, and a commercial action easy to discover;
- the **secondary knowledge and archive surface** keeps Projects, Library, Journal, Books, technical materials, historical projects, experiments, proof, and other retained content meaningfully reachable.

The primary surface must distinguish Alarisa as the guiding vision and principal long-term R&D direction from TeqFW as a technical platform, ADSM as a development methodology, PDE as an independently useful technical system, capabilities, products, offers, customization, proof, writing, and contact. It must keep current products and offers directly reachable without requiring a visitor to understand Alarisa, while allowing interested visitors to trace how exploration in that direction produced useful independent results.

Primary navigation serves the current business through Products, Custom Development, Alarisa, Technology, and About, with Home owned by the brand link and Contact represented by a distinct commercial action. Resources, Projects, Library, Journal, and Books use the footer, the Resources hub, contextual links, related-content links, and retained inbound routes.

These are responsibility and reachability boundaries within one SSR publication architecture. The canonical semantic labels, destination order, page roles, and route intents come from `../product/information-architecture.md`; architecture must not silently alter them.

Existing pages may be retained, repurposed, redirected, or reorganized only after content and search-value review. A familiar route name does not preserve an obsolete commercial role or primary-navigation position by itself. Leaving a file or URL online without an intentional internal discovery path is not sufficient preservation.

## Site And Product Boundary

The website may explain, demonstrate, and sell PDE-based capabilities. It does not thereby become the PDE Runtime, an MCP server for customers, a Telegram credential store, or a managed product host.

Any future decision to add those responsibilities would create a new architectural owner and trust boundary and requires explicit human approval plus upstream documentation.

An optional product transfer may include source code, deployment knowledge, and a bounded product-specific cognitive context. It is a delivery crossing between accountable parties, not a new responsibility of the website runtime. The transfer must distinguish an agreed copy from a shared source of truth and must not imply access to unrelated Wired Geese context, credentials, or internal business knowledge.

## Expansion Rule

No new runtime area, persistent state owner, offer-specific backend, or detailed page branch is justified solely by the new positioning. Introduce such structure only in a later implementation design after the product model and buyer evidence make it necessary.
