# Verification Overview

- Path: `ctx/docs/verification/overview.md`
- Template Version: `20260923`
- Changed: `20260923`

## Purpose

Help an agent verify that the current project realizes the accepted requirements of [product](../product/AGENTS.md), [architecture](../architecture/AGENTS.md), [environment](../environment/AGENTS.md), and [code](../code/AGENTS.md). The linked source documents remain authoritative. These checks are a derived reading aid and introduce no new requirement.

## Method

1. Define the audit scope and record the current commit, worktree status, and changed paths. Read the applicable `AGENTS.md` hierarchy and authoritative documents in dependency order.
2. Use [coverage](coverage.md) to find every source document and the relevant crosscutting checks under `product/`, `architecture/`, `environment/`, and `code/`. Read each source document, including its current status, exclusions, and open decisions. Read any paired semantic skin before proposing a documentation edit.
3. For each check, inspect the cited authored source, runtime configuration, tests, generated output, or external record. Run the probe where feasible. Compare the observed result to the source requirement; do not infer broad conformance from a narrow test.
4. Classify each check as `pass`, `fail`, `unknown`, or `not applicable`. `Unknown` covers missing, stale, indirect, or inaccessible evidence. An accepted target not yet implemented is a gap, even if current code matches an older model. A deviation localizes a failed expectation, not its cause.
5. Report the source clause, observation, evidence path or command with result, and proposed correction or decision owner. Keep the observation record and unresolved operational feedback outside this durable specification corpus. Fix documentation and product together when authorized, then re-observe the original expectation before closing a deviation. Escalate conflicting upstream meaning to the human instead of resolving it downstream.

## Evidence Rules

- Product claims need public projection plus claim-specific evidence; a test can prove wording or structure but cannot establish customers, revenue, maturity, or outcomes.
- Architecture claims need matching source ownership and actual behavior, with negative checks for prohibited runtime or state expansion.
- Environment claims need package/configuration/operational evidence; local command success alone cannot prove production deployment.
- Code claims need source inspection and focused tests or rendered output. Generated `web/` is corroboration, not authored truth.
- A shell search is an inventory lead. Inspect context and relevant counterexamples before declaring a semantic pass.

## Result Record

For each finding, record `check ID | source document and clause | applicable state | status | observed evidence and provenance | reach or limitation | next action/owner | re-verification`. Include the exact commit and environment used. Aggregate counts by status and list unresolved human decisions separately. The observation record is evidence, not a verification specification or authoritative declaration. Do not commit an audit result as authoritative context unless the task requests a durable report.
