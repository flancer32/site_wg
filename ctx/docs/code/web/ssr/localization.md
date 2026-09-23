# SSR Localization

- Path: `ctx/docs/code/web/ssr/localization.md`
- Template Version: `20260630`
- Changed: `20260923`

## Purpose

Describe locale-aware SSR routes, metadata, shell copy, and locale switching.

## Supported Locales And URLs

The authored trees are `en`, `ru`, and `es`, each with localized pages and shared includes. Public routes use `/{locale}/...`. The adapter supplies a clean canonical URL, equivalent alternates, and an English `x-default` where English exists. Directory indexes retain trailing slashes; current standalone and detail templates use `.html` paths.

Selected Markdown-backed long-form publications derive human HTML in every existing locale. Their direct machine-readable representation is deliberately English-only: `/en/.../article.md` is published for agents, while equivalent Russian and Spanish Markdown routes are not public. This does not reduce the maintained human locale model or its HTML alternate behavior.

The layout metadata origin is a validated `TEQ_CMS__BASE_URL` using `http` or `https`, with `https://wiredgeese.com` fallback; request hosts and forwarding headers are not metadata sources.

## Semantic Vocabulary

Every locale preserves destination identity, honest status, core boundaries, and action semantics. Final display labels, including the names of navigation destinations and commercial action, remain copy/interface decisions unless accepted upstream. Do not make `Products`, `How it works`, `Alarisa`, or keys such as `nav.products`, `nav.how_it_works`, and `nav.vision` required future vocabulary merely because they exist in current templates.

Current localized routes and keys for Products and ChatGPT + Telegram are implementation facts. They may be retained for continuity, but do not establish a permanent product taxonomy. Journal is a first-class evidence meaning in every locale, not intrinsically secondary.

The publication-discussion CTA, shared footer, and Contact page use the channel matching the page locale: `en` links to `https://t.me/alexgusev_lab_en`, `es` to `https://t.me/alexgusev_lab_es`, and `ru` to `https://t.me/alexgusev_lab_ru`. Each locale promotes one language channel alongside the common `@wiredgeese` contact.

## Switching

SSR fallback is the target-locale root. Browser enhancement preserves equivalent route, query, and fragment when an equivalent exists. Active maintained pages must have semantic counterparts across locales; obsolete EN-only paths normalize before rendering. A capability does not receive a public route merely because it exists technically.
