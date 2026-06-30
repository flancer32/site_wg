# Funnel Event Schema

- Path: `ctx/docs/code/funnel-events.md`
- Template Version: `20260629`
- Changed: `20260630`

## Purpose

Define stable event names and payload boundaries for the GitHub-based agent orchestration PoC validation funnel.

This document defines the event boundary only.
It does not imply that tracking is already implemented.

## Allowed Event Names

The allowed funnel event names are:

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
- `secondary_cta_click`
- `qualified_lead`
- `payment_link_sent`
- `paid_poc`
- `poc_delivered`
- `positive_feedback`
- `upsell_requested`

These names should remain stable once used in code or operational reporting.

Only these primitive landing-page events are suitable for automatic browser-side emission if that work is later approved:

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

Optional automatic event:

- `secondary_cta_click`

Later-stage events must remain manual or trusted commercial state.

## First-Party Collection Shape

If first-party event capture is later approved, it may use a minimal endpoint such as:

- `/funnel/evt`

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

Illustrative request shapes:

- `/funnel/evt?e=landing_view&p=github-agent-orchestration-poc&l=en&v=<pageViewId>`
- `/funnel/evt?e=principle_seen&p=github-agent-orchestration-poc&l=en&v=<pageViewId>`
- `/funnel/evt?e=chain_seen&p=github-agent-orchestration-poc&l=en&v=<pageViewId>`
- `/funnel/evt?e=scope_seen&p=github-agent-orchestration-poc&l=en&v=<pageViewId>`
- `/funnel/evt?e=logs_seen&p=github-agent-orchestration-poc&l=en&v=<pageViewId>`
- `/funnel/evt?e=limits_seen&p=github-agent-orchestration-poc&l=en&v=<pageViewId>`
- `/funnel/evt?e=cta_click&p=github-agent-orchestration-poc&l=en&v=<pageViewId>`
- `/funnel/evt?e=form_start&p=github-agent-orchestration-poc&l=en&v=<pageViewId>`
- `/funnel/evt?e=repo_field_focus&p=github-agent-orchestration-poc&l=en&v=<pageViewId>`
- `/funnel/evt?e=form_submit&p=github-agent-orchestration-poc&l=en&v=<pageViewId>`

The exact URL shape is illustrative unless a stricter project convention is defined later.

The intended primitive landing-page path is:

`page opened -> principle seen -> chain seen -> scope seen -> logs seen -> limits seen -> CTA clicked -> form started -> repo field focused -> form submitted`

## Funnel Event Payload Boundary

General funnel events may include:

- event name;
- page identifier;
- locale;
- pageViewId;
- package or CTA identifier if relevant;
- server timestamp;
- source or referrer if already present in server logs.
- page path, if the implementation prefers path over page identifier;

General funnel events must not include:

- email;
- name;
- GitHub repository URL;
- repository contents;
- issue contents;
- repository content;
- secrets;
- tokens;
- credentials;
- private code;
- payment-sensitive data;
- long-term visitor identifier;
- private issue text beyond what is strictly necessary for a separate lead record.

If a field can identify the same visitor across visits, it does not belong in generic funnel-event payloads.

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
- issue type or short message.

Lead handling must remain consistent with higher-level architecture and environment limits.
Lead collection surfaces should warn users not to paste secrets, tokens, credentials, private issue contents, or sensitive repository data.

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

Simple indicators may include:

- page view without any JavaScript funnel events: bot-like or unknown;
- known bot user-agent: likely bot;
- realistic sequence such as `principle_seen -> chain_seen -> scope_seen`: likely human;
- `cta_click`, `form_start`, or `repo_field_focus`: strong human-interest signal;
- impossible timing, for example all events within a few milliseconds: bot-like.

The goal is not to prove that a visitor is human.
No CAPTCHA is required at this stage.

## Commercial Truth Rule

Client-side events and generic funnel logs are not commercial truth.

For example, `form_submit` means the browser attempted to submit the form.
It does not prove that the lead is qualified, paid, or deliverable.

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

- landing views: `120`
- principle seen: `34`
- chain seen: `18`
- scope seen: `12`
- logs seen: `9`
- limits seen: `7`
- CTA clicks: `3`
- form starts: `2`
- repo field focus: `1`
- form submits: `0`

The purpose is not precision.
The purpose is to see where the funnel breaks.
