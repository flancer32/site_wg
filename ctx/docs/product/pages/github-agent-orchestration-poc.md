# Hosted GitHub Agent Orchestration PoC

- Path: `ctx/docs/product/pages/github-agent-orchestration-poc.md`
- Template Version: `20260629`
- Changed: `20260630`

## Page Role

This document is subordinate to `ctx/docs/product/overview.md` and to the offer definition under `ctx/docs/product/offers/`.
It also refines the compact landing contract in `ctx/docs/product/agent-orchestration-poc-landing.md`.
For the first public landing-page implementation, `ctx/docs/product/agent-orchestration-poc-landing.md` is the primary source of truth.

The public page framing on this page is `Hosted GitHub agent orchestration PoC`.
The page meaning describes a GitHub-based agent orchestration PoC as the first implementation of the broader event-driven AI-agent orchestration pattern.

The page is a validation landing page for a narrow commercial experiment.
Its role is:

- to test whether repository owners understand the result quickly;
- to test whether they are willing to request a small hosted proof of concept;
- to serve as a concrete first-step page under `GitHub Flows` without replacing the broader product meaning.

Suggested URL pattern:

- `/{locale}/github-agent-orchestration-poc.html`

This path uses the current repository page-routing convention of explicit `.html` sources.
English may be used in examples, but the page must not be modeled as an English-only route.

## Primary Conversion

Primary CTA:

- `Request hosted PoC — €50`

Secondary CTA:

- `Ask about advanced setup`

The primary CTA sells a small hosted proof of concept.
The secondary CTA is for visitors whose scope is already larger than the validation offer.

The page is multilingual.
The same offer, validation logic, CTA semantics, and `€50` public price apply across locales unless the product context is explicitly changed later.
Localization may adapt wording for clarity, but it must not change the commercial promise, exclusions, or funnel meaning.

## Audience

The main audience is:

- technical founders, maintainers, lead developers, indie hackers, and small development teams;
- visitors who understand repositories, CI/CD, GitHub issues, LLMs, and coding agents;
- technically competent visitors who want to experience event-driven AI-agent orchestration before building or installing their own infrastructure.

## Required Sections

The page should preserve this sequence:

1. `Hero`
2. `Simple Workflow`
3. `Who It Is For`
4. `What Is Included`
5. `What Is Not Included`
6. `Access And Safety`
7. `Differentiation`
8. `Request Form`
9. `FAQ`

The supporting explanations in this document refine that compact V1 sequence and must not replace it with a larger page shape.

## Supporting Constraints

This supporting page document exists to keep a few implementation-relevant constraints visible without expanding the first public page.

The first screen should communicate within five seconds:

- that the offer is a GitHub-based agent orchestration PoC on a real repository;
- that a GitHub issue can trigger a bounded agent reaction;
- that the result returns to GitHub as labels or a short brief;
- that the offer is a hosted PoC for `€50`;
- that the experiment is small and bounded.

The page should keep the orchestration principle legible:

- `GitHub issue -> bounded agent run -> GitHub labels/comments -> short run report`
- `event -> agent reaction -> new observable event`

The page must not overload the first screen with Docker, VPS, runtime architecture, or workflow internals unless they directly improve clarity.

The visible first scenario may be issue analysis or issue triage, but the product meaning must remain controlled event-driven AI-agent orchestration around a GitHub repository.

The `€50` price must read as:

- a hosted PoC price;
- a low-risk validation step;
- not a full infrastructure setup or production deployment fee.

The landing page sells only the hosted PoC.
Advanced setup, self-hosted installation, custom agents, multi-repository orchestration, and non-GitHub event sources are separate follow-up discussions.

Repository access wording must stay narrow:

- access is limited to what is needed for the hosted PoC;
- private repository use requires explicit discussion and trust approval;
- analytics or funnel logs must not contain repository contents, private code, credentials, tokens, or secrets.

## Request Form

The form section should request only the minimum needed for validation:

- name;
- email;
- GitHub repository URL;
- public/private/test repository selection;
- what the buyer wants to test;
- whether up to `5` test issues can be created;
- whether the buyer wants hosted PoC or custom/self-hosted discussion.

The form must warn users not to paste secrets, tokens, credentials, private issue contents, or sensitive repository data.

If the first implementation is manual-only, the page may use a manual email path.
That implementation choice must remain consistent with environment and architecture documents.

If the page links to related pages or supporting contact paths, those links should resolve in the current visitor locale rather than forcing a fixed English route.

## Quality Criteria

The page is successful if:

- the visitor understands the result within five seconds;
- the visitor understands that the product is a hosted test bench for event-driven AI-agent orchestration;
- the core principle `event -> agent reaction -> new observable event` is visible;
- GitHub issue triage reads as the first scenario rather than the whole product identity;
- visible results and run evidence appear before deep implementation details;
- Docker, VPS, runtime, labels, and architecture details do not overload the first screen;
- `€50` reads as a hosted PoC price, not as a full setup fee;
- every locale variant preserves the same offer scope, exclusions, price, and CTA meaning;
- the page clearly supports the broader `GitHub Flows` hierarchy without dissolving into it.
