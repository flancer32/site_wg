# SSR Layouts

- Path: `ctx/docs/code/web/ssr/layouts.md`
- Template Version: `20260630`
- Changed: `20260910`

## Purpose

Describe the shared SSR shell, its stable regions, and its accessibility baseline.

## Shared Shell

Each locale defines the structural layout under `tmpl/web/{locale}/inc/layout.html`. It owns localized document metadata, canonical and alternate links from the adapter, shared assets, a skip link, header, one focusable main region, optional publication-discussion CTA, and footer. Page templates own route-specific metadata, content, and narrowly justified assets.

The shell supports brand, navigation, commercial action where required, locale switching, main content, and secondary discovery. Its eventual semantic grouping derives from Product and Architecture, not a Products/Knowledge split. Current header and footer groups are migration state documented in `navigation.md`.

## Stable Presentation And Accessibility

The shared styles provide tokens, readable wide and long-form surfaces, and shared controls. The visual register remains calm, specific, technically credible, and candid about maturity.

- A skip link reaches the focusable main region.
- Keyboard focus is visible; current navigation uses `aria-current`.
- Compact-menu state uses `aria-expanded` and `aria-controls`; `Escape` closes it.
- Decorative icons have empty alternative text when adjacent text names the link.
- Reduced-motion preference suppresses non-essential transitions.
- Print removes navigation, footer, and discussion CTA while preserving the document.

Responsive reflow may change emphasis and grouping but must not hide substantive content or change destination identity.
