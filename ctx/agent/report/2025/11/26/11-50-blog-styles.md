# Blog Styles

## Goal
Centralize the blog event list styling into a shared resource and expose a reusable head block so each locale can pull in the stylesheet without inline CSS.

## Actions
- Added `web/styles/blog.css` with the container/list layout, layered card structure, pointer-events rules, and mobile tweaks that ensure the CTA link sits on top while the rest of the card lets clicks pass through.
- Extended each layout head (`tmpl/web/en/inc/layout.html`, `tmpl/web/es/inc/layout.html`, `tmpl/web/ru/inc/layout.html`) with a new `html_head_extra` block so templates can register additional styles.
- Updated every localized blog template to override `html_head_extra`, include `/styles/blog.css`, and remove the obsolete inline `<style>` block.

## Artifacts
- `web/styles/blog.css`
- `tmpl/web/en/blog.html`
- `tmpl/web/es/blog.html`
- `tmpl/web/ru/blog.html`
- `tmpl/web/en/inc/layout.html`
- `tmpl/web/es/inc/layout.html`
- `tmpl/web/ru/inc/layout.html`
