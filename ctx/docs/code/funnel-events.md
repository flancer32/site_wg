# Funnel Event Schema

- Path: `ctx/docs/code/funnel-events.md`
- Template Version: `20260629`
- Changed: `20260701`

## Purpose

Define stable event names and payload boundaries for the GitHub-based AI-agent trial stand validation funnel.

This document defines the event boundary only.
It does not imply that tracking is already implemented.

## Allowed Event Names

The allowed funnel event names are:

- `page_view`
- `outcome_seen`
- `hero_cta_seen`
- `workflow_seen`
- `scope_seen`
- `safety_seen`
- `cta_click`
- `form_start`
- `form_submit_attempt`
- `form_submit`
- `form_submit_error`
- `form_error`
- `form_abandon_field`
- `private_repo_concern_click`
- `qualified_lead`
- `payment_link_sent`
- `paid_poc`
- `poc_delivered`
- `positive_feedback`
- `upsell_requested`

These names should remain stable once used in code or operational reporting.

Only these primitive landing-page events are suitable for automatic browser-side emission if that work is later approved:

- `page_view`
- `outcome_seen`
- `hero_cta_seen`
- `workflow_seen`
- `scope_seen`
- `safety_seen`
- `cta_click`
- `form_start`
- `form_submit_attempt`
- `form_submit`
- `form_submit_error`
- `form_error`
- `form_abandon_field`
- `private_repo_concern_click`

Later-stage events must remain manual or trusted commercial state.

## First-Party Collection Shape

First-party event capture should use a local backend endpoint such as:

- `/funnel/evt`

Browser-side delivery should prefer:

- `navigator.sendBeacon()` for non-blocking event delivery;
- `fetch(..., {keepalive: true})` only as a fallback when Beacon is unavailable or unsuitable.

Event delivery must not block navigation or form submission.
Payloads should remain small.

The endpoint may be requested by browser JavaScript in the background and may return only:

- `204 No Content`

or another minimal success status.

The endpoint does not need to return business data to the browser.

The canonical page identifier for this landing-page funnel is:

- `github-agent-orchestration-poc`

## Single-Page Correlation Boundary

Automatic page-level events may be connected within one page execution by a random `pageViewId`.

The `pageViewId` must:

- be generated when the landing page loads;
- exist only in the current page execution context;
- not be written to cookies;
- not be written to `localStorage`;
- not be written to `sessionStorage`;
- not be reused across pages or visits;
- be used only to connect events from one page load.

Illustrative request shape:

- `/funnel/evt?e=<event>&p=github-agent-orchestration-poc&l=<locale>&v=<pageViewId>`

The exact URL shape is illustrative unless a stricter project convention is defined later.

The intended primitive landing-page path is:

`page viewed -> outcome seen -> safety seen -> workflow seen -> scope seen -> CTA clicked -> form started -> form submitted`

This order reflects the product assumption that buyers need concrete outcome clarity first and repository-risk reassurance before they are ready for serious CTA interaction.

## Event Trigger Semantics

The intended landing-page sequence is:

`page_view -> outcome_seen -> safety_seen -> workflow_seen -> scope_seen -> cta_click -> form_start -> form_submit`

Event meanings should stay concrete:

- `outcome_seen` must correspond to a specific visible hero or outcome block such as the hero summary or a `What You Get For EUR 50` section;
- `safety_seen`, `workflow_seen`, and `scope_seen` should be triggered by section visibility rather than by page load;
- `cta_click` should include CTA identifier and location metadata;
- `form_start` should fire on the first meaningful interaction with the form;
- `form_submit_attempt` should represent an attempted submission before backend acceptance;
- `form_submit` should represent a successful accepted submission from the backend, not merely a button click;
- `form_submit_error` should represent a backend-rejected or transport-failed submission;
- `page_leave` style signals may be sent with Beacon transport if later approved, but they are not part of the accepted primitive funnel.

## Funnel Event Payload Boundary

General funnel events may include:

- event name;
- page identifier;
- locale;
- pageViewId;
- anonymous session identifier;
- anonymous visitor identifier only if already available locally through an approved first-party mechanism;
- client timestamp;
- package, CTA, or section identifier if relevant;
- current path;
- referrer if available;
- user-agent, whether forwarded by the backend or derived from server logs;
- coarse viewport or device hints if useful;
- event-specific metadata kept small and non-sensitive.

General funnel events must not include:

- email;
- name;
- GitHub repository URL;
- form message body;
- repository contents;
- issue contents;
- secrets;
- tokens;
- credentials;
- private code;
- payment-sensitive data;
- long-term visitor identifier;
- private issue text beyond what is strictly necessary for a separate lead record.

If a field can identify the same visitor across visits, it does not belong in generic funnel-event payloads unless that identifier already exists locally for a separate approved first-party purpose.

The server log may naturally contain:

- timestamp;
- IP address;
- user-agent;
- referrer;
- request path.

Those fields may remain in ordinary server logs as raw evidence, but they do not justify visitor profiling.

## Lead Payload Boundary

Lead payload should be treated separately from anonymous funnel events.

Allowed lead fields:

- name;
- email;
- GitHub repository URL;
- public/private/test repository type;
- issue type or short test-scenario description;
- sensitive constraints or access concerns.

Lead handling must remain consistent with higher-level architecture and environment limits.
Lead collection surfaces should warn users not to paste secrets, tokens, credentials, private issue contents, or sensitive repository data.

Lead collection should not require:

- detailed workflow design;
- credentials;
- broad repository permissions;
- long technical specifications before first human review.

## Evidence Categories

The funnel uses three separate evidence categories:

1. anonymous page-level funnel events;
2. lead data from request forms;
3. commercial truth from payment, order, or manual operator records.

These categories must not be collapsed into one generic tracking stream.

## Primitive Bot Handling

The first implementation should classify traffic conservatively as:

- likely human;
- likely bot;
- unknown.

Useful filtering or classification layers may include:

- known bot and crawler user-agent patterns;
- search engine crawlers;
- social preview bots and link unfurlers;
- uptime monitors;
- security scanners;
- AI crawlers;
- CLI agents;
- identifiable headless-browser traffic;
- page views without any JavaScript funnel events;
- requests without normal browser characteristics where that signal is reliable.

Interpretation hints may include:

- page view without any JavaScript funnel events: bot-like or unknown;
- known bot user-agent or excluded user-agent pattern: likely bot;
- realistic sequence such as `outcome_seen -> safety_seen -> workflow_seen`: likely human;
- `cta_click` or `form_start`: strong human-interest signal;
- impossible timing, for example all events within a few milliseconds: bot-like.

The goal is not to prove that a visitor is human. No CAPTCHA is required at this stage.
`robots.txt` may help reduce some traffic classes but is not an analytics filter.

Raw logs and human-filtered funnel statistics should stay separate.

## Commercial Truth Rule

Client-side events and generic funnel logs are not commercial truth.

For this funnel, `form_submit` means the backend accepted the submission.
It still does not prove that the lead is qualified, paid, or deliverable.

The following states must be confirmed manually or through a trusted commercial source before they are treated as true:

- `qualified_lead`
- `payment_link_sent`
- `paid_poc`
- `poc_delivered`
- `positive_feedback`
- `upsell_requested`

## Safety Rule

Implementation must prefer omission over accidental over-collection.

If a field risks including:

- private repository material;
- credentials;
- tokens;
- secrets;
- payment data;

that field must stay out of generic funnel logs.

Even minimal first-party event collection must avoid:

- fingerprinting;
- cross-visit tracking;
- cookies for funnel correlation;
- `localStorage` or `sessionStorage` for funnel correlation.

## Weekly Report Shape

The first useful report may be a simple weekly table such as:

- page views: `120`
- human-filtered page views: `71`
- suspected bot share: `41%`
- outcome seen: `48`
- safety seen: `34`
- workflow seen: `21`
- scope seen: `12`
- CTA clicks: `3`
- form starts: `2`
- form submit attempts: `1`
- form submits: `0`
- top referrers: `search`, `direct`, `github`
- top user-agent categories: `desktop browser`, `mobile browser`, `crawler`

The purpose is not precision.
The purpose is to see where the funnel breaks.
