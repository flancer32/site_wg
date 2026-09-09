# SSR Localization

- Path: `ctx/docs/code/web/ssr/localization.md`
- Template Version: `20260630`
- Changed: `20260909`

## Purpose

Describe locale-aware SSR routes, metadata, shared-shell copy, and locale switching.

## Supported Locales

The authored locale trees are:

- `en` — plain international English with concrete outcomes before method language;
- `ru` — respectful Russian using `ИИ` in ordinary copy and avoiding unnecessary marketing calques;
- `es` — neutral international Spanish using consistent `tú`, sentence case, and Spanish price typography.

Each tree contains localized pages plus `inc/layout.html`, `inc/nav.html`, and `inc/footer.html`.

## Route Localization

Public routes use the `/{locale}/...` prefix.

The project adapter derives the effective locale after legacy-route normalization and supplies:

- a canonical URL for that locale and canonical clean path;
- equivalent alternate URLs for all allowed locales;
- an `x-default` alternate that resolves to the English branch when English is available.

Directory-index routes retain trailing slashes. Authored standalone and detail templates retain `.html` canonical paths.

## Shared-Shell Vocabulary

The current legacy shell maps Home, Projects or Evidence, Library, Journal where present, Work with me, and Contact inconsistently. Those labels and positions are implementation drift, not target vocabulary.

The target primary shell maps these canonical meanings in this order:

- `Products`;
- `Approach`;
- `Alarisa`;
- distinct shared commercial action.

Home is represented by the localized brand link. `Approach` is a semantic key for the cross-product explanation of foundations, control, customization, accountability, and transferability; it is not an approved English display label. About, Project Archive, Library, Journal, and Books are secondary meanings owned by curated footer and contextual discovery. No generic Resources hub is required.

Semantic roles establish keys such as `nav.products`, `nav.approach`, `nav.vision`, and `action.discuss`, not mandatory English strings. Russian and Spanish wording must be approved as idiomatic public copy while preserving destination identity, order, primary-versus-secondary status, and action semantics.

Blog announcements and durable library material remain distinct content types even though both belong to the broader writing surface.

## Locale Switcher

The SSR fallback target is the target-locale root.

When browser JavaScript is available, switching locale preserves the current route, query, and fragment. Active maintained routes must exist in every locale. Obsolete EN-only routes normalize to localized current routes before rendering.

Future product destinations must not be added to one locale as durable public structure without equivalent semantic treatment in the other maintained locales. Capabilities do not receive public routes merely because they exist technically.

## Metadata Localization

The layout supplies localized default title and description content. Page templates may override those blocks.

Canonical and alternate links are rendered by the shared shell from adapter-provided absolute URLs and must match the requested effective locale rather than the configured translation-source locale.

Their public origin comes only from a validated `TEQ_CMS__BASE_URL` using `http` or `https`, with `https://wiredgeese.com` as the stable fallback. Request host and forwarding headers are not trusted as metadata sources.
