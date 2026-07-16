# SSR UI States

- Path: `ctx/docs/code/web/ssr/ui-states.md`
- Template Version: `20260630`
- Changed: `20260716`

## Purpose

Describe visible request outcomes and browser-enhanced states delivered by the SSR site.

## Request-Visible States

- `ready page` — localized SSR content is delivered inside the shared shell.
- `populated journal index` — extracted localized `blog_item` fragments are rendered.
- `empty journal index` — the journal heading remains available when no fragments can be collected.
- `internal legacy redirect` — a legacy clean path is normalized to the current template before rendering, while query data is preserved.
- `not found` — the final GET/HEAD fallback returns the localized 404 surface with HTTP status `404`, no canonical metadata, and recovery links to primary sections.

## Shared Shell States

### Header

- `at top` — transparent-soft shell without elevation.
- `scrolled` — a subtle elevation separates the sticky header from content.

### Compact Navigation

- `closed` — menu content is hidden and the toggle exposes `aria-expanded="false"`.
- `open` — menu content is visible, first-link focus is available, and the toggle exposes `aria-expanded="true"`.
- `dismissed` — link activation, outside activation, or `Escape` closes the menu; Escape returns focus to the toggle.

### Locale Navigation

- `current locale` — rendered as current, non-link text.
- `equivalent locale target` — route path, query, and fragment are preserved when switching locale.

## Zoomable Image States

The thumbnail and expanded states are defined in `components/zoom-img.md`.

## Offer Form States

The Agent Orchestration PoC form keeps these visible states:

- initial editable form;
- submitting with disabled submit action and spinner;
- success dialog;
- validation or connection failure with a recoverable message;
- restored editable state after completion or failure.

## Motion And Print

Reduced-motion preference shortens non-essential transitions.

Print output removes navigation-only surfaces while keeping primary authored content available.
