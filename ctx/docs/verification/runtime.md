# Runtime And Ownership Checks

- Path: `ctx/docs/verification/runtime.md`
- Template Version: `20260923`
- Changed: `20260923`

## R1 — Single Site And State Boundary

Read [architecture overview](../architecture/overview.md), [structure](../architecture/structure.md), [state](../architecture/state.md), [integration](../architecture/integration.md), [code overview](../code/overview.md), and [environment](../environment/overview.md). Inspect `package.json`, `teqcms.config.mjs`, `src/`, `tmpl/`, `bin/`, `etc/`, and `web/`. Confirm one multilingual TeqCMS SSR/publication site, a thin project adapter, authored templates/Markdown as public inputs, and derived `web/` output. Check for new persistent state owners, separate site engines, analytics/control planes, or PDE, Telegram, MCP, customer, payment, CRM, and provisioning runtimes inside the site process. A dependency or file name is a lead; inspect its actual role before calling it a boundary violation.

## R2 — External Operations And Secrets

Read [environment](../environment/overview.md), [architecture integration](../architecture/integration.md), and [commercial constraints](../architecture/constraints.md). Inspect tracked configuration, service assets in `etc/`, environment-variable use, and repository history for newly introduced secret storage or product-delivery coupling. Verify site development and tests do not require live Telegram sessions, customer credentials, PDE deployments, or client hosts. Confirm commercial qualification and payment remain human-controlled unless upstream context authorizes automation. Never print secret values during verification; inspect names, owners, and access boundaries only. Production credential ownership or an external delivery arrangement is `unknown` unless authorized operational evidence is available.

## R3 — Host Configuration And Delivery Contract

Read [environment](../environment/overview.md), [localization](../code/web/ssr/localization.md), and [rendering](../code/web/ssr/rendering.md). Compare `package.json` Node requirement and scripts with the actual local runtime, `teqcms.config.mjs`, CMS/TeqFW configuration namespaces, base-URL validation, Linux service assets, and route/metadata behavior. Run `npm run typecheck`, focused runtime tests, and `npm start` smoke checks when the task affects hosting or request behavior. Record which checks used a local process and which production claims remain unverified. A local server response cannot by itself prove production service configuration or availability.
