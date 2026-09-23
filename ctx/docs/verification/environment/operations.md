# Operational Prerequisites

- Path: `ctx/docs/verification/environment/operations.md`
- Template Version: `20260923`
- Changed: `20260923`

## R2 — External Operations And Secrets

Read [environment](../../environment/overview.md), [architecture integration](../../architecture/integration.md), and [commercial constraints](../../architecture/constraints.md). Inspect tracked configuration, service assets in `etc/`, environment-variable use, and repository history for newly introduced secret storage or product-delivery coupling. Verify site development and tests do not require live Telegram sessions, customer credentials, PDE deployments, or client hosts. Confirm commercial qualification and payment remain human-controlled unless upstream context authorizes automation. Never print secret values during verification; inspect names, owners, and access boundaries only. Production credential ownership or an external delivery arrangement is `unknown` unless authorized operational evidence is available.

**Applicability:** Tracked configuration and local development setup are available.

**Expected observation:** Website operation has no implicit product/customer secret dependency or commercial automation.

**Reach and blind spot:** Tracked files cannot prove external credential custody or every production access grant.

**Follow-up:** Record provenance and the observed state. If the expectation fails, localize the failing declaration before proposing a cause; after an authorized correction, repeat this check against the same expectation.

## R3 — Host Configuration And Delivery Contract

Read [environment](../../environment/overview.md), [localization](../../code/web/ssr/localization.md), and [rendering](../../code/web/ssr/rendering.md). Compare `package.json` Node requirement and scripts with the actual local runtime, `teqcms.config.mjs`, CMS/TeqFW configuration namespaces, base-URL validation, Linux service assets, and route/metadata behavior. Run `npm run typecheck`, focused runtime tests, and `npm start` smoke checks when the task affects hosting or request behavior. Record which checks used a local process and which production claims remain unverified. A local server response cannot by itself prove production service configuration or availability.

**Applicability:** A local runtime and host configuration are available.

**Expected observation:** Declared Node/configuration contract and request behavior agree with the documented environment.

**Reach and blind spot:** Local smoke tests cannot prove production availability or service configuration.

**Follow-up:** Record provenance and the observed state. If the expectation fails, localize the failing declaration before proposing a cause; after an authorized correction, repeat this check against the same expectation.
