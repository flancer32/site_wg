# SSR Page: Work With Me

- Path: `ctx/docs/code/web/ssr/pages/work-with-me.md`
- Template Version: `20260811`
- Changed: `20260910`

## Purpose

Define the retained Work With Me route as a secondary product-led engagement destination without preserving a generic service-led hierarchy.

## Route

- `/{locale}/work-with-me.html`

## Target Relationship

Work With Me remains available at its localized route as a secondary destination for working directly with Alex around a current product. It explains a product-led engagement: start from a working product, check fit, clarify a bounded setup, adaptation, integration, or extension, agree scope and price before work, then deliver coherent software with Alex directly accountable.

Customization is not a primary navigation destination or a parallel generic-services business. Products explain what exists; Product Detail explains a product; How it works explains the production model; Contact is the shared action surface. Work With Me complements those pages without duplicating them.

Customization may grow from an existing product or product direction. The page may state that a request outside that direction can be declined; it must not solicit arbitrary engineering work.

## Implementation Constraints

- The existing `/{locale}/work-with-me.html` route remains localized, canonical, indexable, and present in the sitemap; it is not redirected or replaced.
- The page remains outside primary navigation unless a later product decision changes the IA.
- It links to Products, the current ChatGPT + Telegram detail where useful, How it works, and the shared `/{locale}/contact.html?topic=product` action surface.
- It contains no form, fixed public price, hourly rate, delivery-time promise, testimonial, maturity claim, or guaranteed outcome.
- It must not sell architecture reviews, recovery or rescue work, staff augmentation, generic engineering capacity, agent-system consulting, or GitHub Flows / Agent Orchestration PoC as current offers.

## Interface Design Gate

The retained page must preserve product-first qualification and direct maker accountability in every maintained locale. Its title and metadata describe product setup, adaptation, or extension rather than an engineer-for-hire service. The current path does not imply a standalone Custom Development page.
