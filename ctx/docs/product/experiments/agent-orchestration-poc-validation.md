# Validation Of Hosted Event-Driven AI-Agent Orchestration PoC

- Path: `ctx/docs/product/experiments/agent-orchestration-poc-validation.md`
- Template Version: `20260629`
- Changed: `20260630`

## Experiment Purpose

Validate whether technical repository owners want a fast, hosted way to experience event-driven AI-agent orchestration on a real GitHub repository before spending time building their own infrastructure.

The experiment exists to test commercial behavior, not to prove technical elegance or collect opinions in isolation.
The validated product meaning is a hosted sandbox for event-driven AI-agent orchestration rather than a standalone issue bot.

## Main Hypothesis

Main hypothesis:

`Technical repository owners want a fast, hosted way to experience event-driven AI-agent orchestration on a real GitHub repository before spending time building their own infrastructure.`

## Sharpened Validation Hypothesis

The experiment does not validate generic interest in AI agents or tool-vendor selection.

It validates whether people responsible for active GitHub repositories understand the orchestration principle, want to try it on their own repository, and will pay for a bounded hosted PoC rather than building the infrastructure first.

## Validation Period

Initial validation window:

- `30` days from first public release of the landing page.

The period may be extended if traffic is too low to interpret results.

## Funnel Stages

The experiment funnel is:

1. page view;
2. workflow seen;
3. scope seen;
4. safety seen;
5. CTA click;
6. form start;
7. form submit;
8. qualified lead;
9. payment link sent;
10. paid PoC;
11. PoC delivered;
12. positive feedback;
13. upsell requested.

## Measurable Events

The event names associated with the funnel are:

- `page_view`
- `workflow_seen`
- `scope_seen`
- `safety_seen`
- `cta_click`
- `form_start`
- `form_submit`
- `qualified_lead`
- `payment_link_sent`
- `paid_poc`
- `poc_delivered`
- `positive_feedback`
- `upsell_requested`

Client-side or page-level events may provide early funnel evidence.
Commercial truth must still be confirmed manually for later-stage events.

Only the following primitive landing-page events are suitable for future automatic collection:

- `page_view`
- `workflow_seen`
- `scope_seen`
- `safety_seen`
- `cta_click`
- `form_start`
- `form_submit`

All later stages remain manual or trusted commercial evidence even if early event logging is later implemented.

Where event capture is later approved, locale should be retained as a comparison dimension so the experiment can compare:

- page views by locale;
- workflow-seen counts by locale;
- scope-seen counts by locale;
- safety-seen counts by locale;
- CTA clicks by locale;
- form starts by locale;
- form submissions by locale;
- paid PoCs by locale.

For landing-page validation, the first practical question is where the path breaks:

`page viewed -> workflow seen -> scope seen -> safety seen -> CTA clicked -> form started -> form submitted`

## Success Criteria

Use these thresholds unless later product context replaces them with a better equivalent:

- minimum signal: `3–5` meaningful repository submissions;
- commercial signal: at least `1` paid PoC;
- good signal: `2–3` paid PoCs or `1` self-hosted/custom inquiry;
- strong signal: a customer asks for recurring, self-hosted, or multi-repository usage after PoC delivery.

Strong signals are especially meaningful when they come from:

- active repositories with real issue flow;
- maintainers, technical founders, or lead developers;
- willingness to submit a repository for a real PoC;
- willingness to pay for the PoC;
- requests for continued use, self-hosted setup, or recurring workflow after delivery.

## Failure Diagnostics

Interpret failures using this first-pass model:

- page views but no CTA clicks: the offer, page, or visible result is unclear or weak;
- workflow seen but weak scope or safety movement: the orchestration loop is not legible enough;
- CTA clicks but no form submissions: there is a trust, repository-access, or form-friction problem;
- submissions but no payments: there is a price, trust, payment-flow, or value problem;
- paid PoCs but no continuation: the demo is interesting but not valuable enough as a business product.

## Manual Review Points

Human review is required at these points:

- deciding whether a submission is a qualified lead;
- deciding whether repository access is acceptable for the requested PoC;
- confirming that a payment link was actually sent;
- confirming payment receipt;
- confirming that the PoC was delivered;
- confirming whether feedback is positive enough to count as product signal;
- judging whether any follow-up request counts as a true upsell signal.

## Evidence Rule

Behavioral evidence has priority over verbal enthusiasm.

Useful evidence includes:

- meaningful repository submissions;
- paid PoCs;
- follow-up questions that expand scope;
- requests for self-hosted or recurring use;
- submissions tied to real issue flow rather than generic curiosity.

For early page-level movement, raw first-party event requests or normal web-server access logs may serve as aggregate evidence.
That remains a lightweight funnel-reading mechanism, not a full analytics system, CRM, or customer database.

The first useful operational report may be a simple weekly count table rather than a dashboard.

Weak evidence includes:

- generic praise without action;
- generic curiosity about AI agents without repository submission;
- curiosity clicks without submissions;
- technical discussion that never reaches payment or delivery.
