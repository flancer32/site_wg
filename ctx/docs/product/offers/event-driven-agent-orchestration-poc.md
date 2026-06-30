# Hosted PoC For Event-Driven AI-Agent Orchestration

- Path: `ctx/docs/product/offers/event-driven-agent-orchestration-poc.md`
- Template Version: `20260629`
- Changed: `20260630`

## Product Name

`Hosted PoC for event-driven AI-agent orchestration`

Compact product-level public label:

`Agent Orchestration PoC`

Multilingual public variants may use a localized equivalent name where needed, but they must preserve the same product identity and must remain recognizably the same offer.
The public offer name is `Hosted PoC for event-driven AI-agent orchestration`.
GitHub issue triage may appear only as the first narrow scenario inside the PoC.

This detailed offer document refines the compact definition in `ctx/docs/product/agent-orchestration-poc.md`.

## Parent Offer Family

This offer belongs to `GitHub Flows`.

It is a narrow validation entry offer under the broader `GitHub Flows` concept.
It is not an independent platform and must not compete with the parent product for meaning.

## Validation Status

Current status:

- validation offer;
- commercial experiment;
- hosted proof of concept, not production automation.

## Target Audience

The intended buyers are:

- technical founders;
- maintainers;
- lead developers;
- indie hackers;
- small development teams who understand repositories, CI/CD, GitHub issues, LLMs, and coding agents;
- technically competent buyers who prefer a concrete test over a long discovery cycle.

## Pain

The offer addresses this pain:

- the buyer is technically capable of building similar infrastructure, but does not want to spend days or weeks setting up webhooks, runners, Docker environments, agent configs, prompts, LLM keys, GitHub API access, logs, and safety limits just to understand whether the orchestration principle is useful;
- the buyer wants practical exposure on a real repository before committing to self-hosted or broader workflow automation;
- the buyer wants to observe how repository events trigger bounded agent behavior and visible GitHub results without building the infrastructure first.

## Positioning

This offer is positioned around practical familiarity with event-driven AI-agent orchestration.

It sells a controlled hosted sandbox where a technical repository owner can observe a working orchestration loop on a real GitHub repository.
It does not replace the developer and does not promise autonomous implementation.

## Promise

Core promise:

`Try event-driven AI-agent orchestration on a real GitHub repository without building the infrastructure first.`

Longer explanation:

`The PoC gives a technical repository owner a ready test bench where GitHub issue events trigger containerized AI agents. The agent reacts to repository events, produces visible GitHub results such as labels and short briefs, and generates run evidence such as logs, runtime, and token usage. The buyer can observe the principle of agent-driven software development orchestration without building the infrastructure first.`

The visible first implementation uses GitHub Issues, but the product meaning is broader:

`event -> agent reaction -> new observable event`

GitHub Issues are used as the visible event interface for controlled AI-agent orchestration.

The first publishable landing structure is defined separately in `ctx/docs/product/agent-orchestration-poc-landing.md`.

## Market Fit Boundary

This offer is most relevant for technically capable repository owners who want to explore orchestration quickly on a real repository without first building the infrastructure stack.

It is weaker for:

- visitors who only want generic AI discussion;
- buyers who expect unlimited hosted runtime;
- teams that already know they need a larger self-hosted workflow and do not need a PoC;
- highly sensitive private repositories where the trust boundary is unacceptable for a hosted PoC.

## Hosted PoC Scope

The initial paid offer is:

- `Hosted PoC — €50`

Included scope:

- one GitHub repository;
- hosted execution on Wired Geese infrastructure;
- GitHub event handling through webhooks and `github-flows-app`;
- a containerized agent runtime;
- default agent/model access provided by Wired Geese within the PoC limits;
- a starting prompt template that the buyer may adapt within scope;
- the buyer creates up to `5` test issues during the PoC;
- up to `10` processed events per created PoC issue;
- visible GitHub results such as decision labels and short briefs;
- a run report with execution status, runtime, token usage, and sanitized logs.

The offer must be described as:

- a test of the orchestration principle on a real repository;
- a bounded service;
- an observable orchestration loop inside GitHub;
- a way to experience agent-driven software-development orchestration before building infrastructure.

Multilingual variants must keep the same hosted PoC scope, the same `€50` public price, the same exclusions, the same safety boundaries, and the same upsell path.
Translations must not silently broaden the offer into AI consulting, self-hosted setup, code fixing, or production automation.

## Price Logic

The `€50` price is justified as:

- a low-risk commercial validation step;
- a paid proof that the orchestration pattern is useful in the buyer's own workflow;
- a filter for real buyer intent rather than a free curiosity demo.

The price must not be described as payment for:

- production deployment;
- long-term hosting;
- self-hosted setup;
- general AI consulting.

## Public Limits Wording

Public-facing wording should remain careful:

`The PoC is a controlled sandbox, not an unlimited hosted agent runtime. It includes up to 5 newly created test issues and a limited number of processed issue events. Each agent session has runtime and token limits to keep the experiment predictable.`

Public-facing documents should avoid exact token-cap numbers.

## Explicit Exclusions

The offer excludes:

- bug fixing;
- pull request creation;
- automatic code changes;
- automatic merge;
- production SLA;
- self-hosted installation in the basic PoC;
- long-term hosting commitment;
- any guarantee that the AI analysis is fully correct.

The offer also excludes:

- bug fixing or implementation work as part of the `€50` PoC;
- production hosting commitments;
- buyer-provided workflow configuration from scratch;
- multi-repository orchestration;
- non-GitHub event sources as part of the base offer;
- buyer-provided LLM keys or custom agents as part of the base offer.

## Repository Access Safety Boundary

The hosted PoC may require access to issue text and repository context, but it must remain within a narrow trust boundary:

- access is limited to what is required to inspect the issue and relevant repository context;
- no credentials, tokens, secrets, or private code may appear in funnel analytics or generic site logs;
- analytics events must never include repository contents;
- private-repository access is a higher-trust step and must be explicitly acknowledged by the lead.

The page and offer copy must not imply:

- unrestricted repository access;
- persistent client data retention beyond the PoC need;
- production-grade hosting guarantees.

## Buyer Participation

The buyer is not expected to build the infrastructure.

- provide the repository URL;
- create up to `5` PoC test issues;
- connect or allow the required GitHub integration;
- grant minimal write access to issues, labels, and comments when needed;
- adapt the provided starting prompt template if desired;
- define or approve decision labels and expected agent behavior;
- review labels, briefs, logs, runtime, and token usage.

Preferred wording:

`Wired Geese provides workflow templates. The buyer may adjust the starting prompt and decision rules. Wired Geese prepares the working configuration for the repository.`

## Internal Operational Limits

The internal controlled-sandbox limits are:

- max created PoC issues: `5`
- max processed events per issue: `10`
- max total processed events: `50`
- max agent sessions or runs: `50`
- max runtime per agent session: fixed hard cap
- max tokens per agent session: fixed hard cap
- max concurrent agent sessions: `1`

Terminology:

- `received event` — an event delivered to the PoC entry point;
- `eligible event` — a received event that matches the workflow's scenario and boundary rules;
- `processed event` — an event that passes through the PoC workflow decision layer;
- `agent run` — a processed event that actually starts the agent runtime.

Not every received event becomes an agent run.

`Processed events` must include skipped, rejected, ignored, and safety-blocked events when they pass through the PoC workflow decision layer.
The buyer must not be able to create unlimited agent-triggering activity through comments, labels, reopen events, or repeated edits.

## Deliverables

The PoC deliverables are:

- visible decision labels on created PoC issues;
- short decision briefs in issue comments;
- run report per agent session or per issue;
- sanitized logs or log excerpts;
- execution status;
- runtime;
- token usage;
- model or provider and agent runtime used;
- prompt or template version used.

The label must be the first visible result.
The brief should stay short.
Detailed logs belong to the run report.

## Orchestration Chain

The product meaning should make the first orchestration loop explicit:

`GitHub issue event -> webhook -> github-flows-app -> workflow decision -> containerized agent runtime -> LLM/tools/prompt -> GitHub label/comment result -> new observable GitHub event -> run report`

The buyer is not buying a comment generator alone.
The buyer is observing a working orchestration loop.

## Replaceable Components

GitHub is the first event source and visible result surface.
In principle, the same orchestration pattern may later use GitLab, Atlassian/Jira, or another event platform.
Docker is the first execution environment, but another isolated runner may replace it.
Agents, LLMs, prompts, tools, and skills are replaceable parts of the orchestration chain.

These statements describe the pattern, not current implementation coverage.

## Relationship To Native Agent Tools

Copilot and other native tools provide their own agent workflows.
This PoC demonstrates a more general orchestration principle: repository events can trigger different agents, models, prompts, and execution environments, with visible results returned to the development workflow.

The offer is a practical introduction to this principle.
It is not framed as a direct Copilot replacement or as proof of superiority.

## Upsell Path

If the PoC is useful, the next possible steps are higher-scope services such as:

- self-hosted setup;
- custom workflows;
- multi-flow routing;
- PR drafts;
- labels and verification logic;
- production deployment;
- recurring or multi-repository usage.

Those steps are separate services.
The PoC should open the conversation, not silently expand into them.
