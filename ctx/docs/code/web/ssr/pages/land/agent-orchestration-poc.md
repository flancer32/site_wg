# SSR Landing Page: Agent Orchestration PoC

- Path: `ctx/docs/code/web/ssr/pages/land/agent-orchestration-poc.md`
- Template Version: `20260630`
- Changed: `20260701`

## Purpose

Define the implementation-facing SSR page contract for the current `Agent Orchestration PoC` landing page.

## Template Location

The current page is implemented at:

- `tmpl/web/ru/land/agent-orchestration-poc/`

The current authored page file is:

- `tmpl/web/ru/land/agent-orchestration-poc/index.html`

## Semantic Source Of Truth

The semantic source of truth for this page is:

- `ctx/docs/product/offers/agent-orchestration-poc/overview.md`

Supporting product validation context may be taken from:

- `ctx/docs/environment/offer-validation.md`
- `ctx/docs/code/funnel-events.md`

This SSR page document must not redefine the offer.
It should only translate that offer meaning into concrete page structure and implementation constraints.

## Route Role

The page belongs to the SSR landing-page family under the locale-prefixed `land/` branch.

The current route shape is:

- `/{locale}/land/agent-orchestration-poc/`

## AFKP Page Flow

The page should unfold in this order:

1. `Hook`
2. `Resonance`
3. `Immersion`
4. `Reflection / Contact`

This flow is an implementation-facing sequencing rule for the landing page.

Within that flow, the practical content order should be:

1. outcome
2. safety
3. workflow
4. scope
5. CTA
6. form

## Required Sections

The current landing page should preserve these sections:

1. `Hero`
2. `Access And Safety`
3. `Simple Workflow`
4. `What Is Included`
5. `What Is Not Included`
6. `Who It Is For`
7. `Observable Outputs`
8. `Request Block`
9. `FAQ`

The page may present a hero CTA immediately.
Safety microcopy should appear near that hero CTA, and the main CTA should be repeated after the safety, workflow, and scope blocks.

## First-Screen Guidance

The first screen must answer immediately:

- what is being tested;
- on what object: a GitHub repository and selected issues;
- what the price and boundary are: `EUR 50`, `1` repository, up to `5` issues;
- why it is safe: no code changes in the first PoC.

Recommended hero CTA:

- `Request EUR 50 GitHub PoC`

Acceptable CTA alternatives:

- `Check my repository fit`
- `Start with 5 test issues`
- `Ask for a safe PoC`

The page should avoid weak CTA framing such as generic contact, consultation, automation, or abstract orchestration discussion.

`outcome_seen` should map to a concrete visible hero or outcome block, for example the hero summary or a `What You Get For EUR 50` block.

## Request Form Representation

The page should represent a request block using the current project conventions.

The current required fields are:

- name;
- email;
- GitHub repository URL, optional;
- repository type: public / private / test;
- short description of issue type or test scenario;
- sensitive constraints or access concerns.

Email is the only contact field inside the request form.
No Telegram or other contact-handle field belongs in the form.

The form should stay qualification-oriented.
It should not ask for:

- detailed workflow design;
- credentials;
- broad repository permissions;
- long technical specifications before first human review.

The page may submit the request form to the existing backend form endpoint.
Manual human review may still follow backend acceptance of the request.

## FAQ Scope

The page FAQ should stay short.

It should cover:

- private repository use;
- whether the agent changes code;
- what the customer receives after the PoC;
- how many issues are included;
- what may happen after the PoC.

## After Submission

The landing page should explain what happens after submission in a short explicit sequence:

1. repository and scenario fit are checked;
2. up to `5` test issues are agreed;
3. the bounded PoC is executed;
4. the buyer receives GitHub-visible results, logs or sanitized excerpts, and a short report;
5. a next-step engineering recommendation is provided.

## Minimal Tracking

If page-level tracking exists for this landing page, the required baseline events are:

- `page_view`
- `outcome_seen`
- `safety_seen`
- `workflow_seen`
- `scope_seen`
- `cta_click`
- `form_start`
- `form_submit_attempt`
- `form_submit`

Recommended optional diagnostic events are:

- `hero_cta_seen`
- `form_submit_error`
- `form_error`
- `form_abandon_field`
- `private_repo_concern_click`

Section-seen events should be triggered by section visibility rather than by page load.
`cta_click` should carry CTA identifier and location metadata where practical.
`form_start` should fire on the first meaningful interaction with the form.
`form_submit` should represent a successful accepted backend submission, not a button click.

For browser-side delivery, the preferred transport is `navigator.sendBeacon()`, with `fetch(..., {keepalive: true})` as a fallback where Beacon is unavailable or unsuitable.
Analytics delivery must not block navigation or form submission.

This page document does not require tracking implementation.

## Implementation Boundaries

The page must preserve these implementation boundaries:

- no product redefinition inside the SSR page document;
- no drift from the canonical offer scope;
- no page expansion into a large essay;
- no template-level assumptions that conflict with the shared SSR layout and locale conventions.

## Composition Expectations

The page should:

- extend the shared locale layout;
- remain inside the current SSR landing-page family under `tmpl/web/{locale}/land/...`;
- use the existing shared navigation and footer shell;
- keep page-local styles and copy local to the landing template unless a higher-level SSR rule changes later.
