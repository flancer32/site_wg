# SSR Routes

- Path: `ctx/docs/code/web/ssr/routes.md`
- Template Version: `20260630`
- Changed: `20260909`

## Purpose

Define stable route conventions, current route families, and preservation requirements without freezing the future commercial information architecture.

## Locale Prefix

Public pages use `/{locale}/...` with current authored locales `en`, `es`, and `ru`. Locale-aware resolution precedes template rendering.

## Stable Current Families

- locale root: `/{locale}/`;
- standalone pages such as About, Contact, Projects, and Work With Me;
- journal index and dated journal articles;
- books and library materials;
- project detail pages;
- localized not-found page;
- a legacy nested route for the discontinued GitHub campaign.

Directory indexes use trailing slashes. Standalone and detail templates use `.html` canonical paths under the current model.

## Redirect Boundary

`etc/redirect-map.json` normalizes selected legacy paths while preserving locale overlay. Static resource paths are excluded from HTML route normalization.

Redirects are a deliberate continuity tool. They must not silently create an alternative product hierarchy.

## Target Commercial Routes

Target primary routes are:

- Home — `/{locale}/`;
- Products — `/{locale}/products.html`;
- Telegram offer — `/{locale}/products/chatgpt-telegram.html`;
- Custom Development — `/{locale}/work-with-me.html`;
- Alarisa — `/{locale}/projects/alarisa.html`;
- Technology — `/{locale}/technology.html`;
- About — `/{locale}/about.html`;
- commercial action — `/{locale}/contact.html`.

Target secondary routes are:

- Resources — `/{locale}/resources/`;
- Project archive — `/{locale}/projects.html`;
- Library — `/{locale}/library/`;
- Journal — `/{locale}/blog/`;
- Books — existing book detail routes under `/{locale}/books/`.

Route continuity and navigation prominence are independent. Existing secondary routes remain valid after leaving primary navigation. The current `products.html -> projects.html` redirect is retired only when localized Products pages are ready. The discontinued GitHub campaign remains outside all target navigation and receives an archive or redirect treatment after inbound-value review.

## Preservation Verification

Before changing routes, implementation work must:

- inventory affected URLs across locales;
- review search, backlink, reference, and historical value;
- define canonical replacements and redirects where warranted;
- define and verify at least one intentional internal discovery path for retained content;
- regenerate and inspect sitemap output;
- verify old and new request behavior, metadata, and locale parity.
