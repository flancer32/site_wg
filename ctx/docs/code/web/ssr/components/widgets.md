# SSR Widget Catalogue

- Path: `ctx/docs/code/web/ssr/components/widgets.md`
- Template Version: `20260630`
- Changed: `20260716`

## Purpose

Describe reusable user-facing units composed by the localized SSR templates.

## Shared Shell Widgets

- `Site Header` — identifies Alex Gusev, exposes primary navigation, and contains the locale switcher and mobile-menu control.
- `Primary Navigation` — links Home, Projects, Library, Journal, and Contact with a visible current-page state.
- `Locale Switcher` — preserves the current route when an equivalent localized page exists and exposes the current locale.
- `Site Footer` — provides durable identity, method attribution, secondary navigation, and current copyright information.
- `Publication Discussion CTA` — appears only on blog and library detail pages and links to the matching locale Telegram channel.

## Content Widgets

- `Home Hero` — states the current GitHub Flows offer, primary and secondary actions, evidence markers, and a compact process model.
- `Product Card` — represents a promoted product with its role in the product hierarchy and a next action.
- `Featured Work Card` — distinguishes current products from the chronological project archive.
- `Archive Card` — preserves historical project content without giving every item equal strategic prominence.
- `Contact Channel List` — exposes direct contact methods at the start of the contact page.
- `Disclosure` — keeps engineering and business appendices available without placing them before the primary conversion path.

## Component Relationship

The `Zoomable Image` widget is implemented by the `zoom-img` Web Component documented in [zoom-img.md](zoom-img.md).

Other widgets are template-composed units and do not require custom elements.
