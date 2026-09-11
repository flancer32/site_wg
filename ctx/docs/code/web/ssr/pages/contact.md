# SSR Page: Contact

- Path: `ctx/docs/code/web/ssr/pages/contact.md`
- Template Version: `20260630`
- Changed: `20260911`

## Purpose

Define the direct-human handoff for either a new product or an existing PDE capability.

## Contract

`/{locale}/contact.html` is the localized canonical handoff; `/{locale}/contacts.html` permanently redirects to it. `topic=product` and `topic=pde` may provide bounded inbound context; unknown values use the general copy and never reflect untrusted text. The page asks a product-build visitor for the product idea, users, capability, constraints, isolation from existing systems, and current stage. It asks a PDE visitor for the capability, intended use, environment, and self-installation or managed-help preference. It does not ask either visitor to diagnose architecture or understand TeqFW, ADSM, or MCP.

The page has no form, payment, provisioning, credential collection, CRM, or delivery function. It warns against sharing secrets in a first message. Scope, price, rights, deployment, and access are agreed directly before implementation.
