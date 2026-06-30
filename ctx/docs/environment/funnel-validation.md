# Funnel Validation Environment

- Path: `ctx/docs/environment/funnel-validation.md`
- Template Version: `20260629`
- Changed: `20260630`

## Purpose

Describe environment-specific assumptions for the GitHub-based agent orchestration PoC validation funnel.

## Current Operating Model

The first implementation should default to a manual operating model:

- the landing page may exist without a backend form endpoint;
- lead intake may happen through manual email submission or another direct contact step;
- payment confirmation and PoC-delivery confirmation remain manual business operations.

This keeps the validation experiment lightweight and consistent with the current static-site architecture.

## Optional Runtime Support

If lightweight runtime support is later added, it may include:

- a first-party endpoint for form submission;
- first-party event logging for early funnel events;
- lead-notification email dispatch.

For minimal first-party event logging, a future endpoint such as `/funnel/evt` is acceptable as a bounded pattern.
Such an endpoint may accept background browser requests and return only `204 No Content` or another minimal success status.

For this landing page, the canonical funnel page identifier should be:

- `github-agent-orchestration-poc`

The intended landing-page event set is primitive and low traffic:

- `landing_view`
- `principle_seen`
- `chain_seen`
- `scope_seen`
- `logs_seen`
- `limits_seen`
- `cta_click`
- `form_start`
- `repo_field_focus`
- `form_submit`

Optional event:

- `secondary_cta_click`

Any such addition must remain:

- small;
- reviewable;
- explicitly documented before it becomes durable behavior.

## Candidate Environment Variables

These variables are acceptable only if the corresponding implementation is approved and added:

- `WG_PUBLIC_BASE_URL` — canonical public base URL for generated links and event attribution.
- `WG_FUNNEL_LOG_PATH` — path for first-party funnel event logs outside generated public output.
- `WG_LEAD_NOTIFY_EMAIL` — recipient for lead-notification messages.
- `WG_FIVERR_POC_URL` — optional Fiverr URL for the hosted PoC payment or escrow step.

These names document a safe boundary; they do not by themselves authorize implementation.

## Logging And Retention

If funnel logging is introduced:

- logs must live outside generated public output;
- ordinary web-server access logs may serve as raw evidence for requests sent to the first-party event endpoint;
- those logs may later be parsed for aggregate funnel movement;
- a simple script may later turn those logs into weekly counts;
- this remains a lightweight evidence trail, not a full analytics system, CRM, or customer database;
- log rotation or retention must stay compatible with the existing host-level logging model;
- log payloads must exclude repository contents, issue contents, credentials, tokens, secrets, private code, payment-sensitive data, and long-term visitor identifiers.
- privacy notice alignment should be reviewed before implementation.

AWStats or server logs may remain the baseline traffic evidence.

## Anti-Spam Basics

If a form endpoint is introduced later, it should start with simple controls:

- honeypot field;
- basic rate limiting;
- server-side validation of required fields;
- no expansion into a heavy anti-spam platform unless separately justified.

## Local Development

Local development should continue to work without requiring live lead-capture infrastructure.

If a future endpoint or logger is added:

- local defaults should be safe and disposable;
- missing optional environment variables should degrade gracefully;
- no private lead data should be committed to the repository.
- any `pageViewId` or equivalent correlation token should remain memory-only during the current page execution and should not persist across visits.

Primitive bot handling is acceptable later if it stays conservative:

- `likely human`
- `likely bot`
- `unknown`

No CAPTCHA is required at this stage.

## Production Boundary

Production deployment for the validation funnel must remain bounded:

- no third-party tracker by default;
- no persistent database by default;
- no payment integration by default;
- no lead-storage expansion without explicit approval;
- no fingerprinting or cross-visit visitor tracking by default;
- no heatmaps, mouse tracking, or long-term journey tracking by default.
