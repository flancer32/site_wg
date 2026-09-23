# Site Runtime Boundary

- Path: `ctx/docs/verification/architecture/runtime-boundary.md`
- Template Version: `20260923`
- Changed: `20260923`

## R1 — Single Site And State Boundary

Read [architecture overview](../../architecture/overview.md), [structure](../../architecture/structure.md), [state](../../architecture/state.md), [integration](../../architecture/integration.md), [code overview](../../code/overview.md), and [environment](../../environment/overview.md). Inspect `package.json`, `teqcms.config.mjs`, `src/`, `tmpl/`, `bin/`, `etc/`, and `web/`. Confirm one multilingual TeqCMS SSR/publication site, a thin project adapter, authored templates/Markdown as public inputs, and derived `web/` output. Check for new persistent state owners, separate site engines, analytics/control planes, or PDE, Telegram, MCP, customer, payment, CRM, and provisioning runtimes inside the site process. A dependency or file name is a lead; inspect its actual role before calling it a boundary violation.

**Applicability:** The site runtime, source tree, and package configuration are available.

**Expected observation:** One TeqCMS site respects authored/derived state ownership and excludes product/customer runtimes.

**Reach and blind spot:** Static inspection can miss deployed behavior; production ownership needs operational evidence.

**Follow-up:** Record provenance and the observed state. If the expectation fails, localize the failing declaration before proposing a cause; after an authorized correction, repeat this check against the same expectation.
