# Hosted GitHub Agent Orchestration PoC

- Path: `ctx/docs/product/pages/github-agent-orchestration-poc.md`
- Template Version: `20260629`
- Changed: `20260630`

## Page Role

This document is subordinate to `ctx/docs/product/overview.md` and to the offer definition under `ctx/docs/product/offers/`.

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

## Message Priority

The first screen must communicate the orchestration principle, the visible result, and the bounded PoC shape before it communicates implementation detail.

The page should make clear within five seconds:

- that the offer is a GitHub-based agent orchestration PoC on a real GitHub repository;
- that GitHub issue events trigger a bounded agent reaction;
- that the result appears back in GitHub as labels and a short brief;
- that the offer is a hosted PoC for `€50`;
- that the experiment is small and bounded.

The page must not overload the first screen with:

- Docker details;
- VPS deployment details;
- runtime architecture;
- labels, routing, or other workflow internals unless they support clarity.

## Required Sections

The page should preserve this sequence:

1. `Hero`
2. `Why This PoC Exists`
3. `Orchestration Chain`
4. `Visible Results`
5. `Hosted PoC Package`
6. `What Is Not Included`
7. `Repository Access And Safety`
8. `Request Form`
9. `Self-Hosted Or Custom Option`

## Hero

The hero should sell the hosted orchestration test bench, not AI in general.

Working meaning:

- heading around the idea of trying a GitHub-based agent orchestration PoC on a real repository;
- support copy around the idea that repository events, starting with GitHub issue events, trigger containerized AI agents which return visible GitHub results and run evidence;
- visible `€50` hosted PoC price;
- primary CTA in the hero;
- secondary CTA nearby;
- no infrastructure-heavy copy, but the principle `event -> agent reaction -> new observable event` should be legible.

Localized variants should preserve the same hero-level conversion meaning even when wording changes for language quality.

Possible message direction:

- `Try event-driven AI-agent orchestration on a real GitHub repository without building the infrastructure first.`
- `Observe a controlled GitHub event -> agent reaction -> visible GitHub result loop for €50.`

## Why This PoC Exists

This section should describe the buyer pain:

- the buyer is capable of building similar infrastructure;
- the buyer does not want to spend days or weeks on webhooks, runners, Docker environments, agent configs, prompts, LLM keys, GitHub API access, logs, and safety limits before learning whether the principle is useful;
- the buyer wants practical exposure on a real repository before investing in broader setup.

The section should position the PoC as time saving and practical exposure:

- a managed hosted test bench;
- a way to observe the orchestration pattern on the buyer's own repository;
- a faster path than building the infrastructure first.

## Orchestration Chain

This section should explain the chain explicitly:

1. GitHub issue event
2. webhook
3. `github-flows-app`
4. workflow decision
5. containerized agent runtime
6. LLM, tools, and prompt
7. GitHub label and short comment result
8. new observable GitHub event
9. run report

The section should explain:

- the buyer is observing a working orchestration loop;
- GitHub Issues are the first visible event interface;
- not every received event becomes an agent run;
- the same pattern can later use other event sources or runners without claiming that those integrations already exist here.

## Visible Results

This section should make the deliverables concrete before deeper infrastructure explanation.

The first visible result should be:

- decision label on the created PoC issue.

The brief should stay short and may include:

- a short decision summary;
- a brief reason;
- a next-step hint or uncertainty note.

The section should also name the run evidence:

- run report per session or per issue;
- execution status;
- runtime;
- token usage;
- sanitized logs or log excerpts;
- model or provider and agent runtime used;
- prompt or template version used.

## Hosted PoC Package

The package section should define:

- one GitHub repository;
- hosted execution on Wired Geese infrastructure;
- GitHub event handling through webhooks and `github-flows-app`;
- a containerized agent runtime;
- default agent or model access provided by Wired Geese within the PoC limits;
- a starting prompt template that the buyer may adapt within scope;
- the buyer creates up to `5` test issues during the PoC;
- up to `10` processed events per created PoC issue;
- visible decision labels and short briefs in GitHub;
- a run report with execution status, runtime, token usage, and sanitized logs;
- delivery as a proof of concept, not as production automation.

The package should read as a controlled sandbox, not an unlimited hosted agent runtime.

The `€50` price must read as:

- a hosted PoC price;
- a low-risk validation step;
- not a full infrastructure setup or production deployment fee.

Public wording should stay careful:

`The PoC is a controlled sandbox, not an unlimited hosted agent runtime. It includes up to 5 newly created test issues and a limited number of processed issue events. Each agent session has runtime and token limits to keep the experiment predictable.`

## What Is Not Included

This section must explicitly exclude:

- bug fixing;
- pull request creation;
- automatic code changes;
- automatic merge;
- production SLA;
- self-hosted installation in the basic PoC;
- long-term hosting commitment;
- any guarantee that the AI analysis is fully correct.

It should also clarify:

- the landing page sells only the hosted PoC;
- advanced setup, self-hosted installation, custom agents, buyer-provided LLM keys, multi-repo orchestration, and non-GitHub event sources are separate follow-up discussions;
- the PoC is not positioned as a tool-selection service.

## Repository Access And Safety

The page should define a clear trust boundary:

- repository access is limited to what is needed for the hosted PoC;
- analytics or funnel logs must not contain repository contents, private code, credentials, tokens, or secrets;
- private repository use requires explicit discussion and trust approval;
- the first validation page should not imply blanket access to client infrastructure.

The page should also state:

- the buyer is not expected to build the workflow configuration from scratch;
- Wired Geese provides workflow templates;
- the buyer may adjust the starting prompt and decision rules;
- Wired Geese prepares the working configuration for the repository.

## Request Form

The form section should request only the minimum needed for validation:

- name;
- email;
- GitHub repository URL;
- public/private/test repository selection;
- confirmation that the buyer will create up to `5` PoC test issues during the experiment;
- checkbox confirming this is a hosted PoC, not a production setup.

The form must warn users not to paste secrets, tokens, credentials, private issue contents, or sensitive repository data.

If the first implementation is manual-only, the page may use a manual email submission path.
That implementation choice must remain consistent with environment and architecture documents.

If the page links to related pages or supporting contact paths, those links should resolve in the current visitor locale rather than forcing a fixed English route.

## Self-Hosted Or Custom Option

This section should exist, but it must remain secondary.

Its role is to capture visitors who already need:

- self-hosted deployment;
- custom workflow routing;
- labels or PR drafts;
- production validation or verification;
- multi-repository usage.

It should point toward direct contact rather than expanding the landing page into a second product page.

It may also note that Copilot and other native tools provide their own workflows, while this PoC demonstrates a more general repository-event orchestration pattern.

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
