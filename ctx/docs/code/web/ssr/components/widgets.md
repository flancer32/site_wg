# SSR Widget Catalogue

- Path: `ctx/docs/code/web/ssr/components/widgets.md`
- Template Version: `20260630`
- Changed: `20260909`

## Purpose

Describe stable reusable template-composed units without making legacy commercial content normative.

## Shared Shell Widgets

- `Site Header` — exposes the Wired Geese brand link, subordinate maker attribution where useful, primary navigation, shared commercial action, locale switching, and compact-menu control.
- `Primary Navigation` — links Products, How it works, and Alarisa in the approved semantic order and exposes current-page state.
- `Locale Switcher` — changes locale while preserving an equivalent route where available.
- `Site Footer` — provides the approved Discover, Knowledge, and Wired Geese semantic groups plus attribution without becoming an unstructured archive or product-catalogue dump.
- `Publication Discussion CTA` — may appear on journal and library detail pages and route to the relevant discussion channel.

## Content Widgets

- `Hero` — introduces the approved page outcome and action without owning product meaning.
- `Product Summary` — presents a catalogue-eligible product identity, bounded buyer result, a few practical capabilities, and a proportionate next action. Its parent page may require additional product context; specifically on Home, maturity, fit, and proof appear only when they materially help the buyer decide.
- `Capability Summary` — may explain a technical capability outside the catalogue without implying product or offer status.
- `Proof Summary` — connects a claim to current work, historical responsibility, or published material.
- `Archive Card` — preserves historical content without giving every item equal strategic prominence.
- `Knowledge Collection Entry` — provides a coherent secondary path into Project Archive, Library, Journal, or Books without promoting those categories to the header.
- `Contact Channel List` — exposes approved direct contact methods.
- `Disclosure` — keeps secondary engineering or business detail accessible without dominating the main proposition.

These are semantic widget roles, not a required home-page sequence or final component design.

Shared widgets must keep buyer outcome ahead of maker identity. They may identify Alex Gusev as the accountable maker and AI agents as production participants, but must not imply a larger organization, unlimited capacity, or that maker identity substitutes for product value.

## Retired Meaning

The `Home Hero` no longer has a contract to promote GitHub Flows. No widget may treat Agent Orchestration PoC as current or infer Telegram credentials, deployment controls, pricing, or form fields from the old campaign.

## Component Relationship

The `Zoomable Image` widget is implemented by the `zoom-img` Web Component documented in [zoom-img.md](zoom-img.md). Other listed widgets remain template-composed units unless a later architecture decision changes that boundary.
