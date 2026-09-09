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

## Target Semantic Destinations

The target requires locale-aware semantic destinations for Home, Products, Product Detail, How it works, Alarisa, About, a shared commercial handoff, Project Archive, Library, Journal, Books, and retained historical material.

The selected Products catalogue route family is `/{locale}/products/` in `en`, `ru`, and `es`. The first selected Product Detail route family is `/{locale}/products/chatgpt-telegram.html`, serving the working-label ChatGPT + Telegram offer in the same locales. The catalogue uses the directory-index convention; the Detail uses the established localized `.html` convention. The three localized variants of each route are equivalents, not placeholders or redirects. The `/{locale}/products` and `/{locale}/products.html` forms are legacy aliases for that catalogue. Existing paths such as `/{locale}/`, `/{locale}/work-with-me.html`, `/{locale}/projects.html`, `/{locale}/projects/alarisa.html`, `/{locale}/about.html`, and `/{locale}/contact.html` are migration evidence and candidates, not automatic target contracts. The superseded proposed `technology.html`, `/resources/`, and `/products/chatgpt-telegram.html` paths have no target authority.

Route continuity and navigation prominence are independent. Existing secondary routes may remain valid after leaving primary navigation. The canonical `/{locale}/products/` catalogue absorbs the legacy `products` and `products.html` aliases in each locale; they resolve to current catalogue content rather than Project Archive. Project Archive remains independently available at `/{locale}/projects.html`. The discontinued GitHub campaign remains outside all target navigation and receives an archive, redirect, or reviewed-retirement treatment after inbound-value review.

## Preservation Verification

Before changing routes, implementation work must:

- inventory affected URLs across locales;
- review search, backlink, reference, and historical value;
- select target paths separately from semantic page roles;
- define canonical replacements and redirects where warranted;
- define and verify at least one intentional internal discovery path for retained content;
- regenerate and inspect sitemap output;
- verify old and new request behavior, metadata, and locale parity.
