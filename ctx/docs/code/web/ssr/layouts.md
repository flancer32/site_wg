# SSR Layouts

- Path: `ctx/docs/code/web/ssr/layouts.md`
- Template Version: `20260630`
- Changed: `20260716`

## Purpose

Describe the shared SSR shell, its regions, responsive behavior, and accessibility baseline.

## Primary Layout

Each locale defines the same structural layout under `tmpl/web/{locale}/inc/layout.html`.

The layout owns:

- localized document language, default title, and description metadata;
- canonical and alternate locale links supplied by the project adapter;
- shared favicon, design-system stylesheet, site interaction module, and `zoom-img` module;
- localized skip link;
- `Site Header`, one focusable main-content region, optional `Publication Discussion CTA`, and `Site Footer`.

Page templates own route-specific metadata blocks, content, and any narrowly justified route-specific assets.

## Shared Regions

### Site Header

The header stays visible while scrolling and contains:

- Alex Gusev / Wired Geese identity rather than a product-only logo meaning;
- primary navigation;
- locale switcher;
- a keyboard-operable mobile menu control.

### Main Content

The main region uses a wide shell up to approximately `74rem`.

Long-form pages narrow their primary reading surface to approximately `58rem` so text does not inherit the full archive width.

### Site Footer

The footer carries secondary navigation, current copyright information, and durable attribution to TeqFW, TeqCMS, and ADSM.

## Visual System

`/styles/main.css` provides shared tokens for:

- canvas, surface, ink, muted text, line, brand-teal, and amber-accent colors;
- typography, spacing, radius, shadow, wide-shell, and reading-width roles;
- buttons, cards, long-form content, forms, archives, contact surfaces, and shared shell widgets.

The emotional register is a calm engineering studio and editorial lab. It must avoid generic neon AI imagery, excessive card equality, and decorative effects that obscure hierarchy.

## Responsive Model

- `wide` — primary navigation remains inline; home, featured work, products, and contact blocks may use multiple columns.
- `medium` — grids reduce column count and long labels gain space.
- `compact` — navigation becomes an explicit menu, all major content grids become one column, and action groups become full-width stacks where needed.
- `minimum supported reflow` — content remains usable at `320px` CSS width without horizontal page scrolling.

Viewport changes must preserve content and actions; responsive behavior may change composition but must not hide substantive information.

## Accessibility Baseline

- A skip link reaches the focusable main region.
- Keyboard focus is visible on links, controls, fields, and disclosure summaries.
- Current navigation is exposed through `aria-current`.
- Mobile-menu open state uses `aria-expanded` and `aria-controls`; `Escape` closes the menu.
- Decorative icons use empty alternative text when adjacent text already names the link.
- Reduced-motion preference suppresses non-essential transitions.
- Print output removes navigation, footer, and discussion CTA while preserving the document.
