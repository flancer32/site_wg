# SSR Localization

- Path: `ctx/docs/code/web/ssr/localization.md`
- Template Version: `20260630`
- Changed: `20260630`

## Purpose

Describe the current locale-aware SSR behavior visible in code and templates.

## Supported Locales

The current authored locale trees are:

- `en`
- `es`
- `ru`

Each locale has its own `tmpl/web/{locale}/` subtree with:

- top-level pages;
- locale navigation and footer partials;
- locale article and library content;
- locale-specific layout shell.

## Route Localization

The current site localizes routes by prefix:

`/{locale}/...`

The project adapter and redirect handler both depend on locale-aware route extraction from the CMS helper.

## Metadata Localization

The shared layout renders:

- a canonical link when `canonicalUrl` is present;
- alternate locale links when `alternateUrls` are present.

This makes locale switching and search-facing alternate-route signaling part of the SSR shell rather than a page-by-page manual concern.

## Client-Side Locale Switcher

The shared navigation includes a light browser-side locale switcher.

Its current behavior:

- detect the current locale prefix from `window.location.pathname`;
- preserve the remainder of the path;
- navigate to the equivalent path under the chosen locale.

This is a browser-side helper around an SSR-localized route tree, not a separate SPA router.

## Redirect Localization

When a legacy path is normalized through `etc/redirect-map.json`, the redirect handler overlays the incoming locale onto the destination path when the destination is not already locale-prefixed.
