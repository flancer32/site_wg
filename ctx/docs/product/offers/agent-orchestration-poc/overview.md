# Agent Orchestration PoC Offer Overview

- Path: `ctx/docs/product/offers/agent-orchestration-poc/overview.md`
- Template Version: `20260630`
- Changed: `20260701`

## Purpose

Define the canonical offer description for `Agent Orchestration PoC`.

## Offer Name

Primary offer name:

`Agent Orchestration PoC`

Preferred public explanation:

`A ready starter stand for quickly trying AI agents on issues of a real GitHub repository, seeing the result and execution logs, and deciding whether deeper workflow customization makes sense.`

## Parent Product

This offer belongs to `GitHub Flows`.

It is a narrow entry offer under the broader GitHub-based workflow product direction.

## Customer Pain

The intended buyer is interested in AI agents for development workflows, but still needs a safe first trial on a real repository.

Key open questions for that buyer are:

- how to try agents safely on a real repository;
- which issue-processing scenario is actually useful;
- what an agent run looks like in practice;
- which visible outputs and logs will be available;
- whether deeper customization is worth the effort;
- which technical direction should follow if the trial is useful.

## Target Audience

The offer is aimed at:

- technical founders;
- indie hackers;
- maintainers;
- lead developers;
- small teams using GitHub.

The buyer is expected to be technically literate and to prefer a concrete engineering check over a long discovery phase.

## Core Offer

The offer is:

- a bounded first paid trial on a real GitHub repository;
- a practical way to test an AI issue workflow on selected issues;
- a low-risk engineering check before deeper workflow customization;
- a small inspectable first commercial step rather than a broad consulting engagement.

The current public price is:

- `€50`

## Included Scope

The `€50` PoC includes:

- `1` GitHub repository;
- up to `5` test issues;
- hosted PoC execution;
- bounded agent analysis;
- visible GitHub labels and comments;
- execution logs or sanitized log excerpts;
- a short report;
- an engineering recommendation about next steps.

## Excluded Scope

The `€50` PoC does not include:

- code changes;
- pull requests;
- production deployment;
- long-term hosting;
- SLA;
- unlimited workflow customization.

It is not sold as a full infrastructure setup or as open-ended AI consulting.

## Observable Outputs

The buyer should receive observable outputs rather than only a conclusion:

- visible GitHub-side results such as labels and comments;
- execution status of the containerized run;
- accepted request handling through the site backend before manual engineering review begins;
- logs or sanitized log excerpts;
- a short report summarizing what happened;
- a recommendation about what deserves deeper work, if anything.

Logs and the report make the PoC inspectable and help explain what worked, what failed, which limits mattered, and what next technical direction is most reasonable.

## Differentiator

Unlike generic managed-tool usage, this PoC gives the buyer a small observable stand for testing how an agent workflow fits a specific repository process.

Its differentiators are:

- a small bounded repository trial;
- visible GitHub-side outcomes;
- logs or sanitized log excerpts;
- a short engineering report;
- a customizable follow-up path if the trial shows value.

## Access And Safety Boundary

The offer remains explicitly bounded:

- repository access is limited to what is needed for the agreed scenario;
- public or test repositories are preferred for the first PoC;
- private repositories require explicit discussion;
- the agent does not modify code in the first PoC;
- execution is bounded in scope and duration.

Safety should be communicated as a trust-building part of the offer:

- the buyer can inspect visible GitHub outputs instead of trusting a vague claim;
- the first PoC keeps the repository object narrow: `1` repository and up to `5` agreed issues;
- the first PoC avoids code changes and production deployment risk;
- access should stay limited to the agreed repository scenario only.

## Next Step Rule

If the PoC is useful, the next service should extend the tested workflow rather than restart from a generic AI-consulting conversation.
