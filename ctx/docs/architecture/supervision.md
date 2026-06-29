# Architecture Supervision

- Path: `ctx/docs/architecture/supervision.md`
- Template Version: `20260605`
- Changed: `20260629`

## Purpose

Describe how one human and many agents supervise architecture-level consistency.

## Human-Agent Supervision Principle

Humans own architectural direction and guardrails.

Agents operate within documented architectural boundaries.

Architecture documentation is the authoritative medium through which the human direction-setting loop and the agent refinement and execution-support loop coordinate at the architecture level.

Agents must surface architectural drift instead of silently resolving it.

Major architectural boundary changes require human approval.

## Human Responsibilities

The human:

- decides whether the site remains a thin adaptation of TeqCMS or becomes a larger custom application;
- approves new runtime areas, new persistent state, and new external integrations;
- resolves contradictions between product intent and implementation pressure.

## Agent Responsibilities

Agents may:

- refine existing template, publication, and adapter behavior within documented boundaries;
- improve architecture documentation when repository evidence clarifies the current model;
- prefer documentation updates before code when a new architectural concept appears.

Agents must not silently introduce new architectural owners or hidden state authority.

## Mandatory Approval Cases

Human approval is required for:

- new architectural owners;
- new persistent state;
- new external integrations;
- new major system boundaries.

## Drift Signals

Architecture drift is present when:

- generated output under `web/` starts carrying durable meaning unavailable in `tmpl/` or `ctx/`;
- repository-specific application code grows beyond thin adaptation without architecture updates;
- product-page behavior depends on integrations or state not named in architecture documents.

## Pre-Code Check Order

Before code-oriented work, agents should check:

```text
product
  -> architecture
  -> environment
  -> code
```

At the current project stage, `environment` and `code` branches are not yet instantiated, so agents must stop at architecture and surface any missing lower-level guidance explicitly.
