# SSR Routes

- Path: `ctx/docs/code/web/ssr/routes.md`
- Template Version: `20260630`
- Changed: `20260908`

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

## Commercial Redesign Boundary

No route for PDE, Telegram, capabilities, products, or a new offer is approved by this context rewrite. Final routes require a later information-architecture decision.

The existing GitHub campaign route may remain in the implementation temporarily, but it is not current commercial inventory and should not appear in new route contracts.

## Preservation Verification

Before changing routes, implementation work must:

- inventory affected URLs across locales;
- review search, backlink, reference, and historical value;
- define canonical replacements and redirects where warranted;
- regenerate and inspect sitemap output;
- verify old and new request behavior, metadata, and locale parity.
