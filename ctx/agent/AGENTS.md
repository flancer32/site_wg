# Agent Operational Context

- Path: `ctx/agent/AGENTS.md`
- Template Version: `20260610`
- Changed: `20260629`

## Purpose

Defines the structure of agent-facing operational context for this project.

This level contains service assets that guide agent execution through project-local prompts and iteration records.

## Level Map

- `prompt/` — reusable prompt assets for repository-local agent tasks.
- `report/` — iteration reports produced by agents as required by ADSM.
- `AGENTS.md` — level definition for `ctx/agent/`.

## Level Boundary

Defines:

- Agent-facing operational guidance for the project.
- Prompt and reporting boundaries for project-local routines.
- The structure of operational assets that support recurring agent work.

Does NOT define:

- Product meaning, domain scope, or user-facing requirements.
- Architecture ownership, system structure, or product-level engineering constraints.
- Runtime implementation behavior, source-code generation rules, or implementation decisions outside project-local agent operations.
