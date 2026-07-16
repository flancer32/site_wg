# SSR Assets

- Path: `ctx/docs/code/web/ssr/assets.md`
- Template Version: `20260630`
- Changed: `20260716`

## Purpose

Describe passive browser-facing resources and shared delivered files relevant to the SSR surface.

## Shared Delivered Files

- `/styles/main.css` — design tokens, shared shell, content surfaces, responsive behavior, focus, reduced-motion, and print rules.
- `/styles/blog.css` — journal-index list composition and responsive card behavior.
- `/js/site.js` — mobile-menu behavior, current-navigation state, route-preserving locale links, safe external-link relations, archive-card accessible names, route classification, and current-year enrichment.
- `/js/comp/zoom-img.js` — module implementing the `zoom-img` Web Component documented under `components/`.
- `/favicon.ico` — browser icon and visual mark used inside the site identity widget.
- `/sitemap.xml` — generated localized route inventory with reciprocal `hreflang` links.

`bin/generate-sitemap.mjs`, exposed as `npm run sitemap`, derives the sitemap from current locale templates. It excludes error pages and normalized legacy aliases and must run before publication packaging.

## Content Assets

Content templates reference images below `/img/`, including:

- Alex Gusev portraits;
- project media such as the local Alarisa avatar;
- article and library illustrations;
- contact and external-profile icons;
- TeqFW, GitHub, Codex, and other brand marks.

Content images remain passive assets. Interactive behavior around an image belongs to the `zoom-img` component contract rather than to the asset itself.

## Delivery Expectations

- Authored images require meaningful alternative text unless decorative or text-adjacent.
- Large article media should remain viewport-bounded.
- Off-screen component images may load lazily and decode asynchronously.
- New decorative media must not become a required third-party runtime dependency.
- Generated publication output under `web/` remains downstream of authored templates and context.
