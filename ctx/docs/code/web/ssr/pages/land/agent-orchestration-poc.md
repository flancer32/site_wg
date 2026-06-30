# SSR Landing Page: Agent Orchestration PoC

- Path: `ctx/docs/code/web/ssr/pages/land/agent-orchestration-poc.md`
- Template Version: `20260630`
- Changed: `20260630`

## Purpose

Define the implementation-facing SSR page contract for the current `Agent Orchestration PoC` landing page.

## Template Location

The current page is implemented at:

- `tmpl/web/ru/land/agent-orchestration-poc/`

The current authored page file is:

- `tmpl/web/ru/land/agent-orchestration-poc/index.html`

## Current Language Scope

The current implementation scope is:

- Russian only.

No English or Spanish implementation is currently required for this landing page.

## Semantic Source Of Truth

The semantic source of truth for this page is:

- `ctx/docs/product/offers/agent-orchestration-poc/overview.md`

Supporting product validation context may be taken from:

- `ctx/docs/product/offers/agent-orchestration-poc/experiment.md`
- `ctx/docs/product/offers/agent-orchestration-poc/funnel.md`

This SSR page document must not redefine the offer.
It should only translate that offer meaning into concrete page structure and implementation constraints.

## Route Role

The page belongs to the SSR landing-page family under the locale-prefixed `land/` branch.

The current route shape is:

- `/{locale}/land/agent-orchestration-poc/`

The current implementation exists only for `ru`.

## AFKP Page Flow

The page should unfold in this order:

1. `Hook`
2. `Resonance`
3. `Immersion`
4. `Reflection / Contact`

This flow is an implementation-facing sequencing rule for the landing page.

## Required Sections

The current landing page should preserve these sections:

1. `Hero`
2. `Simple Workflow`
3. `Who It Is For`
4. `What Is Included`
5. `What Is Not Included`
6. `Access And Safety`
7. `Differentiation`
8. `Request Block`
9. `FAQ`

## Request Form Representation

The page should represent a request block using the current project conventions.

The current required fields are:

- name;
- email;
- repository URL;
- public/private/test repository;
- what the user wants to test;
- whether up to `5` test issues can be created;
- whether the user wants hosted PoC or custom/self-hosted discussion.

Email is the only contact field inside the request form.
No Telegram or other contact-handle field belongs in the form.

If the implementation remains manual-only, an email-based submission path is acceptable.

## FAQ Scope

The page FAQ should stay short.

It should cover:

- private repository use;
- whether the agent changes code;
- what the customer receives after the PoC;
- how many issues are included;
- what may happen after the PoC.

## Minimal Tracking

If page-level tracking exists for this landing page, the accepted first-version events are only:

- `page_view`
- `workflow_seen`
- `scope_seen`
- `safety_seen`
- `cta_click`
- `form_start`
- `form_submit`

This page document does not require tracking implementation.

## Implementation Boundaries

The page must preserve these implementation boundaries:

- Russian public content only for the current version;
- no English or Spanish implementation in this page branch yet;
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
