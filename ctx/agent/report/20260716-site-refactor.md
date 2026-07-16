# Multilingual Site Audit And Refactor

- Path: `ctx/agent/report/20260716-site-refactor.md`
- Template Version: `20260716`
- Changed: `20260716`

## Purpose

Record the evidence, decisions, implementation scope, and validation criteria for the July 2026 refactor of the public multilingual site.

This report is an iteration record. Durable implementation contracts remain in `ctx/docs/code/web/ssr/`, while product priorities remain in `ctx/docs/product/`.

## Audit Scope

The audit covered the English, Russian, and Spanish branches across:

- global navigation, locale switching, layout, footer, and responsive behavior;
- home, projects, project detail, contact, about, journal, library, publication, landing, and error page families;
- information architecture, content hierarchy, localization, accessibility, SEO metadata, and sitemap coverage;
- SSR enrichment, shared assets, and client-side interaction behavior.

The site contained 14 project entries, 74 journal entries per locale, and 13 library items per locale. The depth of the material was an asset, but the surface presented much of it with equal visual weight.

## Layers Audit

The audit used the Layers of Product Design as a diagnostic model.

| Layer | Evidence state | Finding |
| --- | --- | --- |
| Observed behaviour | Weak | No analytics or user-research evidence was available in the repository. |
| Domain | Partial to strong | The technical domain and offer vocabulary were documented, but public object labels overlapped. |
| User needs | Assumed to partial | Visitor needs were inferable from product context rather than validated directly. |
| Product strategy | Strong | The site priorities and current GitHub Flows offer were explicit in product context. |
| Conceptual model | Partial | Person, product, project, offer, journal entry, and library item were not always distinguished on the surface. |
| Interaction flow | Partial | Routes existed, but the next step and path through the site were inconsistent. |
| Surface | Weak | Repeated equal-weight cards, long archive pages, delayed contact details, and limited accessibility reduced clarity. |

Observed behaviour was the lowest-evidence layer. The Human explicitly authorized implementation, so the refactor proceeded from documented strategy and clearly stated assumptions rather than delaying for research.

## Main Problems

- The home page did not establish a strong hierarchy between Alex, active products, the current offer, and the underlying method.
- Projects were presented as a long undifferentiated archive instead of a small set of current focal systems followed by history.
- Journal and library roles were not sufficiently distinct in navigation or page introductions.
- Direct contact channels appeared too late, especially on mobile.
- Dense centered layouts and repeated cards made the site feel like an archive rather than an active engineering practice.
- Blog overlay links lacked accessible names, heading levels skipped, the mobile menu lacked robust keyboard behavior, and image zoom was pointer-oriented.
- Canonical metadata could inherit a development host, publication-only UI appeared on indexes, and the sitemap omitted current routes including Alarisa.
- Legacy standalone aliases and duplicate content routes weakened the public information architecture.

## Refactor Plan

1. Clarify the public model around Alex, products, projects, journal, library, and contact.
2. Establish a restrained design system with a reusable shell, typography, spacing, color, cards, buttons, and focus states.
3. Recompose the high-value pages in all three locales, preserving durable content and direct route contracts.
4. Improve navigation, mobile behavior, image interaction, headings, form presentation, and publication flow.
5. Normalize canonical metadata, alternates, sitemap generation, and legacy route handling.
6. Update ADSM implementation context and validate the result across locales, routes, viewport sizes, and automated tests.

## Surface Decisions

The target visual direction is a calm engineering studio and editorial lab rather than a generic neon AI product.

- Deep ink, restrained teal, and warm amber provide identity without overpowering long-form content.
- System typography preserves speed and avoids an external font dependency.
- A wide site shell supports product composition, while reading surfaces remain constrained to comfortable line lengths.
- Left-aligned hierarchy, generous spacing, restrained shadows, and fewer featured cards replace the previous equal-weight grid feel.
- Current work appears first; the historical archive remains available below it.
- Object types are named explicitly: Projects, Library, Journal, and Contact.
- The home page uses an HTML/CSS process map as purposeful media; existing authentic project and portrait imagery remains primary.

## Localization Decisions

Localization preserves the same information architecture without forcing literal sentence-level translation.

- English uses concise international technical language and direct calls to action.
- Russian uses respectful `вы`, `ИИ`, and a practical explanatory tone.
- Spanish uses neutral international Spanish, `tú`, and locally natural price formatting such as `50 €`.
- Alarisa is consistently framed as a private digital counterpart under development, built with TeqFW and ADSM.

## Implementation Scope

The refactor includes:

- a new shared CSS token and component system plus a dedicated journal-list layer;
- new shared navigation, footer, skip link, locale switcher behavior, active-route state, and responsive mobile menu;
- rebuilt home, contact, projects, Alarisa, and 404 pages for English, Russian, and Spanish;
- clearer journal and library indexes and improved about-page hierarchy;
- accessible image zoom and server-rendered accessible journal cards;
- route-aware publication UI and canonical and alternate metadata rooted in a validated configured public origin;
- generated multilingual sitemap coverage with reciprocal alternates;
- normalized legacy aliases for contacts, posts, and products;
- updated SSR cognitive-context documentation.

Existing journal, library, project archive, landing-page, and form content remains in place unless a surface-level correction was required.

## Validation Contract

The refactor is complete only when:

- all representative route families render successfully in all three locales;
- canonical and alternate metadata match the effective route and validated configured public origin;
- journal and library indexes do not receive publication-detail UI;
- generated sitemap routes map back to existing templates and include reciprocal locale alternates;
- automated tests and repository whitespace checks pass;
- desktop and mobile screenshots show no blocking layout or readability defects;
- the final diff contains no unrelated or generated browser-profile artifacts.

## Residual Product Risk

The main remaining uncertainty is not implementation quality but missing visitor evidence. After deployment, the highest-value follow-up is to measure navigation, contact conversion, and interest in GitHub Flows versus deeper technical material, then refine the surface from observed behavior.

The journal intentionally preserves all 74 entries in one archive. It remains usable and lazy-loads media, but year grouping or pagination is the clearest future interaction improvement if observed use justifies it.

## Validation Results

- `npm test` passes the metadata, journal normalization, localized 404, form protection, and sitemap suites.
- Changed TeqFW server modules pass the base `teqfw-esm-validator` profile and Node syntax checks.
- A live local HTTP matrix passes 228 checks across English, Russian, and Spanish, including legacy aliases, canonical, alternate, and `x-default` metadata, publication-only UI, localized 404 responses, malformed URL input, and hostile forwarded-host input.
- `npm run sitemap` generates 288 canonical URLs: 96 per locale, with reciprocal alternates and Alarisa included.
- Direct template and accessibility inspection covers the current locale branches without duplicate IDs, missing image alternatives, broken ARIA references, or blocking keyboard-flow defects.
- Desktop and mobile screenshots of home, projects, contact, Alarisa, journal, about, and the current landing page show a coherent responsive hierarchy without blocking overflow or clipping.
- Repository whitespace validation passes and temporary browser profiles remain ignored.

One protocol issue remains upstream in the current TeqCMS template handler: ordinary successful SSR responses label UTF-8 through `Content-Encoding` instead of a `Content-Type` charset. Current browsers render the pages and the new project-owned 404 handler uses correct headers. This should be corrected in TeqCMS or through a dedicated local handler replacement in a separate backend-focused change.
