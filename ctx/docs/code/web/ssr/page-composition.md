# SSR Page Composition

- Path: `ctx/docs/code/web/ssr/page-composition.md`
- Template Version: `20260630`
- Changed: `20260908`

## Purpose

Define stable shared composition rules while leaving the future commercial page design open.

## Stable Composition

- Locale-specific `inc/layout.html` is the common outer shell.
- `inc/nav.html` and `inc/footer.html` remain shared rather than repeated in every page.
- Page templates provide route-specific metadata and content inside the shared shell.
- Journal and library detail pages may use the publication discussion surface.
- Journal indexes receive their prepared item collection through existing render enrichment.
- Shared accessibility, localization, responsive, canonical, and alternate-link behavior applies across page families.

## Commercial Target

Future composition must make purchasable offers and outcomes more prominent than biography or generic services, while preserving access to useful projects, writing, books, and historical material.

It must also preserve Alarisa as the strategic product system and connect separately promoted components back to it without placing the full internal model before the buyer outcome.

This document does not prescribe a home-page sequence, a product catalogue, a Telegram landing page, a contact form, or a final navigation tree. Those choices require a later approved product and interface design.

## Legacy Composition

Existing templates may still contain:

- an engineer-centric home and service hierarchy;
- a GitHub offer landing page and form;
- a contact page that promotes GitHub Flows;
- Alarisa presented only as a monolithic unavailable project rather than a system with productizable parts.

These structures are legacy drift. They may be retained temporarily for a valid staged transition, but must not be copied into new templates or treated as acceptance criteria.

## Preservation Gate

Before composition changes remove or relocate content, implementation work must inventory affected URLs and decide whether to keep, repurpose, redirect, or preserve archive access. Locale branches must remain semantically aligned.
