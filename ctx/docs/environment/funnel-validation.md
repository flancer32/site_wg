# Funnel Validation Environment

- Path: `ctx/docs/environment/funnel-validation.md`
- Template Version: `20260629`
- Changed: `20260709`

## Purpose

Describe environment-specific assumptions for the GitHub-based AI-agent trial stand validation funnel and related submission handling.

Offer-level validation goals, success signals, and adjustment questions belong in:

- `ctx/docs/environment/offer-validation.md`

## Current Operating Model

The current implementation model should use the existing backend:

- the landing-page request form may submit to the backend through the existing form endpoint;
- first-party funnel events may be sent to the backend through a local event endpoint when that endpoint is implemented or enabled;
- manual review remains part of lead qualification, payment confirmation, and PoC-delivery confirmation, but not because the site lacks a backend.

This keeps the validation experiment lightweight while staying consistent with the current static-site architecture and the existing backend.

## First-Party Runtime Support

The preferred first-party runtime support for this funnel is:

- the existing backend form endpoint for lead submission;
- a local backend endpoint for funnel-event intake;
- first-party event logging for early funnel events;
- lead-notification email dispatch.

The canonical endpoint shape, page identifier, and event set for this funnel are defined in `ctx/docs/code/funnel-events.md`.
Runtime support should stay small, reviewable, and explicitly documented before it becomes durable behavior.

The first version should stay qualification-oriented and light:

- accept a minimal request rather than a full workflow brief;
- prefer repository URL as optional at first contact;
- collect repository type and access concerns explicitly because they affect review and trust;
- avoid requesting credentials, tokens, or broad permissions before human review.

## Local-First Analytics

The preferred analytics model is local-first:

- no Google Analytics, Meta Pixel, or similar third-party tracker by default;
- no client-side dependency on external analytics services by default;
- browser events should be sent to the backend;
- raw evidence should come from application logs, HTTP access logs, or dedicated local event logs;
- weekly or ad hoc funnel statistics may be derived from those local logs;
- external analytics may be considered later only if local validation evidence proves insufficient.

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
- ordinary web-server access logs may serve as the primary raw evidence for requests sent to the first-party event endpoint;
- those logs may later be parsed for aggregate funnel movement;
- a simple script may later turn those logs into weekly counts;
- this remains a lightweight evidence trail, not a full analytics system, CRM, or customer database;
- log rotation or retention must stay compatible with the existing host-level logging model;
- log payloads must respect the payload boundary defined in `ctx/docs/code/funnel-events.md` and exclude repository contents, issue contents, credentials, tokens, secrets, private code, payment-sensitive data, and long-term visitor identifiers.
- privacy notice alignment should be reviewed before implementation.

Application logs, access logs, or AWStats-derived evidence may remain the baseline traffic evidence.

Raw logs and human-filtered funnel statistics should remain separate reporting layers.

## Anti-Spam Basics

The backend form and any local funnel endpoint should start with simple controls:

- signed server-generated form token;
- strict server-side validation of `repository_url` as a GitHub repository URL;
- basic rate limiting;
- server-side validation of required fields;
- no expansion into a heavy anti-spam platform unless separately justified.

## Local Development

Local development should continue to work without requiring live lead-capture infrastructure.

If a future endpoint or logger is added:

- local defaults should be safe and disposable;
- missing optional environment variables should degrade gracefully;
- no private lead data should be committed to the repository;
- any `pageViewId` or equivalent correlation token should remain memory-only during the current page execution and should not persist across visits.

Primitive bot handling is acceptable later if it stays conservative:

- `likely human`
- `likely bot`
- `unknown`

No CAPTCHA is required at this stage.

Bot and crawler minimization should prefer classification over silent deletion when practical.

Useful exclusion categories include:

- search engine crawlers;
- social preview bots and link unfurlers;
- uptime monitors;
- security scanners;
- AI crawlers;
- CLI agents;
- identifiable headless-browser traffic.

`robots.txt` may reduce some bot traffic but must not be treated as the main analytics filter.

## Production Boundary

Production deployment for the validation funnel must remain bounded:

- no third-party tracker by default;
- no persistent database by default;
- no payment integration by default;
- no lead-storage expansion without explicit approval;
- no fingerprinting or cross-visit visitor tracking by default;
- no heatmaps, mouse tracking, or long-term journey tracking by default.
