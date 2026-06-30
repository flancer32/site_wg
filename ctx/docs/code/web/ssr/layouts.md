# SSR Layouts

- Path: `ctx/docs/code/web/ssr/layouts.md`
- Template Version: `20260630`
- Changed: `20260630`

## Purpose

Describe the shared SSR layout and partial structure used across locale page families.

## Primary Layout

Each locale currently defines a shared layout under:

- `tmpl/web/en/inc/layout.html`
- `tmpl/web/es/inc/layout.html`
- `tmpl/web/ru/inc/layout.html`

This layout provides:

- HTML document shell;
- locale-specific `<html lang>`;
- metadata area with title block;
- canonical and alternate link rendering;
- shared stylesheet inclusion for `/styles/main.css`;
- shared module-script inclusion for `/js/comp/zoom-img.js`;
- insertion points for page-specific head additions and styles;
- inclusion of shared navigation and footer partials;
- a single `<main>` content region.

## Shared Partials

Each locale layout includes:

- `inc/nav.html`
- `inc/footer.html`

The navigation partial is part of the delivered shell and owns:

- top-level navigation links;
- locale switcher rendering;
- the mobile-navigation toggle script.

## Layout Model

The current SSR site uses a predominantly single-layout model per locale.

Page variation happens through:

- page template blocks such as `title`, `style`, `html_head_extra`, and `content`;
- page-local inline styles where needed;
- route-specific content structures inside the shared shell.

No second durable layout family is explicitly visible in the current authored templates.
