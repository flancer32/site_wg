# Localized Delivery

- Path: `ctx/docs/verification/code/delivery.md`
- Template Version: `20260923`
- Changed: `20260923`

## P4 — Locale, Metadata, Accessibility, And Failure Paths

Read [multilingual architecture constraints](../../architecture/constraints.md), [localization](../../code/web/ssr/localization.md), [rendering](../../code/web/ssr/rendering.md), [assets](../../code/web/ssr/assets.md), [responsive](../../code/web/ssr/responsive.md), [UI states](../../code/web/ssr/ui-states.md), and applicable component documents. For `en`, `ru`, and `es`, compare equivalent page structure, claims, link intent, canonical/alternate metadata, article routes, and discovery links. Inspect visible headings, image alt/captions, keyboard and narrow-viewport behavior, empty or missing content, 404/redirect behavior, and `HEAD` handling where relevant. Confirm the public origin comes from validated configuration, not request-controlled host headers. Use source inspection, focused tests, and rendered output together; a locale file count alone cannot prove semantic parity.

**Applicability:** A maintained locale, representative page, and relevant failure state can be rendered.

**Expected observation:** Localized structure, metadata, accessibility affordances, and failure responses match code declarations.

**Reach and blind spot:** Sampled render and keyboard checks cannot prove all pages or assistive-technology combinations.

**Follow-up:** Record provenance and the observed state. If the expectation fails, localize the failing declaration before proposing a cause; after an authorized correction, repeat this check against the same expectation.
