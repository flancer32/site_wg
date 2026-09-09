# Product Documentation

- Path: `ctx/docs/product/AGENTS.md`
- Template Version: `20260605`
- Changed: `20260909`

## Purpose

Defines the product documentation level for the wiredgeese.com site.

Documents at this level describe the site as a product: its meaning, purpose, scope, commercial roles of public surfaces, and durable product-level constraints.

## Level Map

- `offers/` — offer-level documents that define concrete commercial entry offers under the site product hierarchy.
- `AGENTS.md` — level definition for `ctx/docs/product/`.
- `commercial-strategy.md` — revenue model, acquisition, price discovery, validation, and productization logic.
- `overview.md` — semantic entry point defining site purpose, commercial identity, public-surface roles, and preservation constraints.
- `product-system.md` — distinctions and relationships among R&D projects, capabilities, products, offers, enabling technology, and proof.

## Product Knowledge Model

The product branch is intentionally compact:

- `overview.md` defines the site product and its commercial communication model;
- `commercial-strategy.md` defines how the site is expected to generate sustainable revenue;
- `product-system.md` distinguishes original technologies, R&D systems, working capabilities, products, offers, and historical proof;
- `offers/` defines bounded buyer-facing commercial presentations without treating every source capability or R&D subsystem as a product.

## Terminology Rule

Within `ctx/docs/product/`, the term `product` has two distinct meanings that must not be merged:

- the **site product**: `wiredgeese.com` as the product of this repository and the main object defined at this documentation level;
- the **promoted work**: Alex Gusev's R&D projects, capabilities, products, offers, methods, and proofs presented through the site, not all of which are sellable.

Rules for agents:

- when describing repository-level product meaning, treat the site itself as the product;
- when describing what the site sells, explicitly identify a bounded product or offer instead of treating all promoted work as sellable;
- do not collapse the site product, Alarisa R&D, technical capabilities, commercial products, and offers into one object or hierarchy;
- do not treat promoted work as if it were the product of this repository.

## Level Boundary

Defines:

- Product identity, scope, and explicit exclusions for the site as a commercial product surface.
- Product-level communication priorities and the relationship between the site product and the promoted product line.
- The product-side boundary for concrete offers as semantic commercial objects within the site product.

Does NOT define:

- Architectural structure, system decomposition, or integration boundaries.
- Execution environment, deployment topology, or code-level implementation constraints.
- Agent workflow behavior, repository operations, or methodological rules above this level.
