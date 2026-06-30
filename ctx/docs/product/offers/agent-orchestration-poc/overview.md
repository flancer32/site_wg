# Agent Orchestration PoC Offer Overview

- Path: `ctx/docs/product/offers/agent-orchestration-poc/overview.md`
- Template Version: `20260630`
- Changed: `20260630`

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

The intended buyer is interested in AI agents for development workflows, but does not yet know:

- how to try agents safely on a real repository;
- which issue-processing scenario is actually useful;
- what an agent run looks like in practice;
- which visible outputs and logs will be available;
- whether deeper customization is worth the effort;
- which technical direction should follow if the trial is useful.

The PoC solves this with a small bounded trial on a real repository.

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

- a typical starting solution for trial;
- a guided engineering check;
- a practical way to understand agent workflows before building custom infrastructure;
- a bounded first commercial step before deeper customization work.

The current public price is:

- `€50`

## Included Scope

The `€50` PoC includes:

- `1` GitHub repository;
- up to `5` test issues;
- hosted PoC execution;
- bounded agent analysis;
- visible GitHub labels and comments;
- visible execution logs or sanitized log excerpts;
- a short report;
- engineering assessment and recommendation about next steps.

## Excluded Scope

The `€50` PoC does not include:

- code changes;
- PR creation;
- production deployment;
- long-term hosting;
- SLA;
- unlimited custom workflow design.

It is not sold as a full infrastructure setup or as open-ended AI consulting.

## Observable Outputs

The buyer should receive observable outputs rather than only a conclusion:

- visible GitHub-side results such as labels and comments;
- execution status of the containerized run;
- visible logs or sanitized log excerpts;
- a short report summarizing what happened;
- a recommendation about what deserves deeper work, if anything.

Logs and the report are part of the offer value because they make the PoC inspectable and clarify what worked, what failed, which limits mattered, and what next technical direction is most reasonable.

## Differentiator And Follow-Up Path

Unlike generic managed-tool usage, this PoC gives the buyer a small observable stand for testing how an agent workflow fits a specific repository process.

Its differentiators are:

- a small guided trial;
- visible container execution logs;
- visible GitHub-side outcomes;
- an engineering assessment after the run;
- a customizable follow-up path if the trial shows value.

Possible follow-up directions include:

- self-hosted setup;
- local model usage;
- GitLab instead of GitHub;
- custom prompts;
- custom labels;
- more complex agent workflows;
- another agent CLI such as Codex, OpenCode, or Claude Code where applicable.

These are possible next directions, not included features of the `€50` PoC.

## Access And Safety Boundary

The offer remains explicitly bounded:

- repository access is limited to what is needed for the agreed scenario;
- public or test repositories are preferred for the first PoC;
- private repositories require explicit discussion;
- the agent does not modify code in the first PoC;
- execution is bounded in scope and duration.

## Next Step Rule

If the PoC is useful, the next service should extend the tested workflow rather than restart from a generic AI-consulting conversation.
