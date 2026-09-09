# SSR Layouts

- Path: `ctx/docs/code/web/ssr/layouts.md`
- Template Version: `20260630`
- Changed: `20260909`

## Purpose

Describe the shared SSR shell, its regions, responsive behavior, and accessibility baseline.

## Primary Layout

Each locale defines the same structural layout under `tmpl/web/{locale}/inc/layout.html`. The shell remains the common structural owner while the approved product-led navigation and content hierarchy await implementation.

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

- Wired Geese as the brand link to the locale root, with Alex Gusev available as subordinate accountable-maker attribution;
- primary navigation in this semantic order: Products, How it works, Alarisa;
- a visually distinct shared commercial action linking to the commercial handoff;
- locale switcher;
- a keyboard-operable mobile menu control.

Home is owned by the brand link and must not be duplicated as an equal text item. About and retained content categories do not enter primary navigation. `How it works` is the accepted English label; its Russian and Spanish labels and the action wording remain idiomatic copy decisions. Localized labels must preserve these meanings and ordering.

### Main Content

The main region uses a wide shell up to approximately `74rem`.

Long-form pages narrow their primary reading surface to approximately `58rem` so text does not inherit the full archive width.

### Site Footer

The footer carries substantial secondary navigation, current copyright information, and accountable-maker attribution. Its semantic groups are:

- `Discover` — Products, How it works, Alarisa;
- `Knowledge` — Project Archive, Library, Journal, Books;
- `Wired Geese` — About, Contact/commercial handoff, maker attribution, and approved legal, external profile, or company links.

The footer provides a coherent discovery path without becoming an unstructured dump or duplicating the entire product catalogue. Localized group wording may change idiomatically without changing membership or responsibility. A generic knowledge hub is added only after a demonstrated cross-collection discovery need.

## Visual System

`/styles/main.css` provides shared tokens for:

- canvas, surface, ink, muted text, line, brand-teal, and amber-accent colors;
- typography, spacing, radius, shadow, wide-shell, and reading-width roles;
- buttons, cards, long-form content, forms, archives, contact surfaces, and shared shell widgets.

The emotional register is calm, specific, technically credible, and product-oriented. It must avoid generic neon AI imagery, aggressive sales treatment, excessive card equality, and effects that obscure hierarchy or experimental status.

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
