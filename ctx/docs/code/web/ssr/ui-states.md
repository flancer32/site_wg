# SSR UI States

- Path: `ctx/docs/code/web/ssr/ui-states.md`
- Template Version: `20260630`
- Changed: `20260910`

## Purpose

Describe stable shared request and enhancement states without defining unapproved commercial interactions.

## Request States

- `ready page` — localized SSR content is delivered inside the shared shell.
- `populated journal index` — prepared localized article items are rendered.
- `empty journal index` — the journal surface remains usable without collected items.
- `internal legacy redirect` — an accepted old path is normalized while query data is preserved.
- `not found` — the localized recovery surface returns HTTP `404` without canonical metadata.

## Shared Shell States

- Header presentation may distinguish top and scrolled positions.
- Compact navigation exposes closed, open, and keyboard-dismissed states with synchronized `aria-expanded`.
- Locale navigation distinguishes the current locale from an equivalent target locale.
- Zoomable-image states are defined in `components/zoom-img.md`.
- Reduced-motion and print presentation preserve content while removing non-essential effects or navigation surfaces.

## Commercial Interaction Boundary

No Telegram-offer form, payment state, provisioning progress, credential flow, or deployment state is defined at code level.

The old Agent Orchestration PoC form states are retired; the archived route has no request interaction. Any new interaction requires an approved product and architecture contract.
