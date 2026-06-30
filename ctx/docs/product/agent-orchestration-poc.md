# Agent Orchestration PoC

- Path: `ctx/docs/product/agent-orchestration-poc.md`
- Template Version: `20260630`
- Changed: `20260630`

## Purpose

Defines `Agent Orchestration PoC` as the compact product-level description of the first paid validation offer under `GitHub Flows`.

This document is intentionally narrower than the broader site product overview and intentionally simpler than the detailed offer document under `ctx/docs/product/offers/`.

## Product Name

`Agent Orchestration PoC`

Preferred public explanation:

`A small paid proof of concept for controlled GitHub-based AI-agent orchestration.`

## Short Product Description

The product is a hosted validation step for repository owners who want to see whether an event-driven AI-agent workflow is useful on a real GitHub repository before investing in deeper custom integration.

It is not a mature SaaS, not a general automation platform, and not generic consulting.

## Practical Scenario

First practical scenario:

`GitHub issue -> bounded agent run -> GitHub labels/comments -> short run report`

This scenario is the first safe entry point, not the full product meaning.
The deeper value is controlled event-driven agent orchestration around repository events and observable repository outcomes.

## Core Value Proposition

The PoC helps a repository owner answer this question:

`Is an event-driven AI-agent workflow useful for my GitHub repository before I invest in a larger custom integration?`

The value is practical validation on a real repository without first building the surrounding infrastructure.

## Target Audience

The first target audience is:

- technical founders;
- indie hackers;
- maintainers;
- lead developers;
- small teams using GitHub.

The offer assumes a technically literate buyer who wants a concrete test, not a long abstract discovery process.

## What The PoC Includes

The PoC includes:

- `1` GitHub repository;
- up to `5` test issues;
- hosted execution;
- bounded agent analysis;
- GitHub labels and comments as visible results;
- a short run report;
- a recommendation about next steps.

The operational details may be refined in lower-level offer documents, but this document fixes the buyer-facing first-version scope.

## What The PoC Does Not Include

The PoC does not include:

- code changes;
- PR creation;
- production deployment;
- long-term hosting;
- SLA;
- unlimited custom workflow design.

It must not be sold as full repository automation or as a replacement for a development team.

## Access And Safety Boundaries

The PoC must remain explicitly bounded:

- repository access is limited to what is needed for the agreed scenario;
- public or test repositories are preferred for the first PoC;
- private repositories are a higher-trust path and require explicit discussion;
- the agent does not modify code in the first PoC;
- execution is bounded in scope and duration.

The first version should present trust boundaries clearly enough that the buyer understands this is a controlled experiment, not open-ended repository access.

## Expected Customer Outcome

After the PoC, the customer should have:

- a direct observation of the workflow on a repository;
- visible GitHub-side outcomes such as labels or comments;
- a short report summarizing what happened;
- a recommendation about whether deeper orchestration work is justified.

The expected outcome is validation and decision support, not delivered production automation.

## Business Role

The PoC is a paid validation and entry offer.

Its business role is:

- to publish quickly as a concrete offer;
- to test whether visitors understand and want the offer;
- to qualify repositories and buyers for deeper work;
- to create a low-risk commercial first step toward larger integration.

The `EUR 50` PoC is not the main profit center.
It is the entry point into possible follow-up work such as:

- improved workflow design;
- self-hosted setup;
- GitHub App integration;
- custom repository automation;
- broader AI-agent process design.

## Positioning Constraints

The product must not be positioned as:

- an AI issue triage bot;
- an AI automation platform;
- a LangGraph alternative;
- an `n8n` alternative;
- a Copilot alternative;
- a full AI developer replacement.

The preferred positioning is:

`A small paid proof of concept for controlled GitHub-based AI-agent orchestration.`

## Relationship To Existing Product Context

This PoC is subordinate to `GitHub Flows` in `ctx/docs/product/overview.md`.

The first landing-page implementation must follow `ctx/docs/product/agent-orchestration-poc-landing.md` as the primary source of truth.

The detailed commercial scope may be refined in:

- `ctx/docs/product/offers/event-driven-agent-orchestration-poc.md`
- `ctx/docs/product/pages/github-agent-orchestration-poc.md`

Those refinements must remain consistent with this compact product definition.
