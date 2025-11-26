# AGENTS.md — Entry Instruction for LLM Agents

Version: 20251126

## Purpose

This is the root file for projects that use ADSM (Agent-Driven Software Management).
It defines the roles of the Human and the Agent, the structure of the context, and the operational invariants.
It is read by the agent first, before any local instructions.

---

## ADSM Principles

### Project Spaces

A project consists of two interconnected spaces:

- **Cognitive context** (`./ctx/`) — documentation, rules, specifications.
- **Software product** (everything outside `ctx/`) — source code and executable artifacts.

The context defines the rules for modifying the product; the product reflects the applied context.

### Interaction

- The Human formulates goals, manages the context, and approves changes.
- The Agent interprets the context and modifies the product within its boundaries.
- Each iteration ends with a report.

---

## Roles

**Human:** goals, context management, approval of changes, structural development.
**Agent:** task execution within the context, product modification, consistency maintenance, reporting.

---

## Minimal Project Structure

```text
/
├─ ctx/         ← cognitive context
├─ AGENTS.md    ← agent instruction
└─ README.md    ← project description
```

---

## Context Dependencies

The Agent’s behavior is defined by the documents located in:

```text
./ctx/
```

Recommended documents include:

- `ctx/agent/AGENTS.md` — local agent rules;
- `ctx/product/overview.md` — product purpose;
- `ctx/rules/architecture.md` — architectural principles;
- `ctx/rules/language.md` — language policy;
- `ctx/rules/privacy.md` — personal data rules.

---

## AGENTS.md Hierarchy Within the Project

If additional `AGENTS.md` files exist in the project
(e.g., `ctx/rules/web/AGENTS.md`, `src/module/AGENTS.md`), they are considered part of the cognitive context **within their respective levels**.

### ADSM Rule

When performing a task in directory `X`, the working context for the Agent is the combined set of all `AGENTS.md` files located along the path from the project root to directory `X`.
Priority: a deeper directory overrides the rules of the directories above it within its own space.

The Agent must:

- consider all such `AGENTS.md` files as a unified rule system;
- resolve intersections following the directory hierarchy;
- adhere to the invariants defined in the root `AGENTS.md`.

---

## Requirements for Local AGENTS.md Files (Level Maps)

Every `AGENTS.md` located in subdirectories of `ctx/` must contain a **Level Map** — a formal description of the documentation present in that directory.

### Level Map Invariant

1. **Required section:**

```md
## Level Map

- `<directory>/` — description of the directory’s purpose.
- …
- `<file>.md` — purpose of the file.
- …
```

2. **Formatting rules:**

- The list must begin with **directories**, followed by **files**.
- Directories must be sorted **alphabetically**.
- Files must be sorted **alphabetically**.
- Each item must declaratively describe its purpose.
- The `AGENTS.md` file of that level must be included in the list.
- The Level Map must reflect the actual directory structure and serve as the Agent’s navigation reference.

### Purpose of the Level Map

- defines the boundaries of the level where the rules apply;
- provides navigation for the level’s documentation without examining the file system;
- enforces consistent structuring of all context levels according to the root document.

---

## `@LLM-DOC` Comments

`@LLM-DOC` is an embedded protected context inside source code.

Rules:

1. Used only inside source files.
2. Written in English.
3. The Agent must detect it, must not modify it, and must not delete it.
4. Any violation equals `execution error`.

---

## Reporting

Each iteration must end with a report:

```text
./ctx/agent/report/YYYY/MM/DD/HH-MM-{title}.md
```

The report contains the iteration goal, completed actions, and artifacts.
Missing report = `execution error`.
If `ctx/agent/report-template.md` exists, the Agent must use it.

---

## Compatibility

The root `AGENTS.md` defines ADSM invariants and is used **unchanged** across all projects.
Project-specific rules are stored in `./ctx/` and in `@LLM-DOC`.

---

## `output.md` Files

`output.md` files are not part of the context and must be ignored by the Agent.

---
