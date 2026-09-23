# Crosscutting Verification

- Path: `ctx/docs/verification/AGENTS.md`
- Template Version: `20260923`
- Changed: `20260923`

## Purpose

Route an agent through evidence-based checks of the four authoritative documentation levels. This directory is a verification projection, not an additional level of project meaning.

## Level Map

- `AGENTS.md` — local reading and maintenance rules.
- `coverage.md` — complete source-document inventory and theme routing.
- `evidence.md` — claim, status, and commercial-truth checks.
- `overview.md` — verification protocol and result format.
- `publication.md` — authored-content, localization, routes, and discovery checks.
- `runtime.md` — website/runtime separation, configuration, trust, and implementation checks.

## Reading Order

Read `overview.md` and `coverage.md`, then run every thematic check affected by the task. For a whole-project audit, run all three thematic documents. Read the linked authoritative documents before interpreting a check; a verification document cannot change their meaning.

## Editing Rules

- Keep links and evidence probes current when authoritative documents or implementation paths change.
- Record an upstream gap or conflict instead of manufacturing a requirement here.
- Distinguish current implementation, accepted target, open decision, and historical material.
- Do not use a passing command as proof of a semantic claim that the command does not inspect.

## Level Boundary

Defines:

- Crosscutting evidence questions for the four documentation levels.
- Source-to-check coverage and inspectable proof expectations.
- A repeatable way to report pass, fail, unknown, and not-applicable findings.

Does NOT define:

- A fifth ADSM documentation authority level or new product meaning.
- New architecture, environment, or source-level requirements.
- A substitute for human acceptance of consequential claims and decisions.
