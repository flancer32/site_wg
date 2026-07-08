# Architecture State

- Path: `ctx/docs/architecture/state.md`
- Template Version: `20260605`
- Changed: `20260701`

## Purpose

Describe state ownership and sources of truth.

## Sources Of Truth

The architecturally important sources of truth are:

- cognitive context documents under `ctx/` for durable project meaning and agent guidance;
- template and asset sources under `tmpl/` and source-controlled static assets under `web/img/` and related folders for site content inputs;
- repository configuration files such as `package.json` and `teqcms.config.mjs` for runtime and build binding.

## State Categories

State is divided into:

- authoritative durable state in version-controlled context, templates, code, and configuration;
- anonymous funnel evidence when such logging is explicitly approved and implemented;
- locale as a permitted dimension within anonymous funnel evidence when that evidence is explicitly approved and implemented;
- per-page ephemeral correlation state such as a memory-only `pageViewId`, if such logging is explicitly approved and implemented;
- anonymous session identifiers for current-session funnel correlation, if such identifiers are first-party, non-sensitive, and explicitly approved;
- anonymous visitor identifiers only when such identifiers already exist locally for a separate approved first-party purpose and are not introduced solely for this funnel;
- coarse bot-likelihood classification such as `likely human`, `likely bot`, or `unknown`, if such interpretation is later added from raw event patterns;
- lead data and commercial follow-up state when a visitor requests a bounded offer;
- documented PoC delivery truth such as issue-count limits, processed-event limits, run-limit rules, and promised deliverables within the cognitive context;
- temporary execution state during CMS rendering, route resolution, and publication commands;
- derived publication state under `web/`, including generated HTML and navigation artifacts such as `sitemap.xml`.

## Ownership Boundaries

The ownership boundaries are:

- `ctx/` owns project meaning and must not be re-owned by runtime code;
- `tmpl/` owns page-source composition and multilingual copy inputs;
- `src/` and configuration own runtime adaptation logic;
- anonymous funnel events, if added, remain operational evidence rather than product truth;
- single-page funnel correlation state, if added, must remain ephemeral and must not become cross-visit identity state;
- anonymous session or visitor identifiers used in funnel payloads must remain bounded, first-party, and non-sensitive;
- bot classification, if added, must remain coarse operational interpretation rather than durable identity truth;
- lead qualification, payment, delivery, and upsell states remain human-reviewed commercial state rather than autonomous page state;
- the exact internal runtime caps of the hosted PoC remain documented context truth until a separate operational system owns them explicitly;
- `web/` is derived output and must remain traceable to upstream durable sources.

## Ownership Rules

Humans own approval of new state categories and new durable sources of truth.
Agents may update existing durable state inside documented boundaries.
Agents must not implicitly promote generated output into an independent source of truth.

## State Authority

Durable state changes are authorized through repository edits approved by the human workflow.
Derived publication state stays valid only when it can be regenerated from authoritative sources.

Anonymous funnel evidence may help interpret behavior, but it must not be promoted into commercial truth automatically.
Payment and delivery truth require manual confirmation or a trusted commercial source.
Single-page correlation state may connect events within one page load, but it must not be stored as durable visitor identity.
Any anonymous visitor identifier reused across visits requires separate approval and must not be invented solely to make funnel reporting easier.
Coarse bot-likelihood labels may support weekly reading of the funnel, but they must remain heuristic and reversible.

## Change Discipline

Agents must not introduce new persistent state owners, external databases, or hidden generated-source loops without updating architecture documents and obtaining human approval.
