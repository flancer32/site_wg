# Project Documentation

- Path: `ctx/docs/AGENTS.md`
- Template Version: `20260605`
- Changed: `20260629`

## Purpose

Defines the structure of project-level declarative documentation organized by ADSM levels.

Documents at this level describe the system as a design object, including meaning, structure, environment, and implementation constraints.

## Level Map

- `architecture/` — architecture-level documentation that translates product intent into stable engineering structure.
- `environment/` — environment-level documentation that defines runtime and operational prerequisites.
- `product/` — product-level documentation that defines the site's commercial meaning and page-level intent.
- `AGENTS.md` — level definition for `ctx/docs/`.
- `filesystem.md` — declarative description of top-level repository directories and root-level files, defining repository boundaries and serving as a navigation map.

## Level Boundary

Defines:

- System meaning and domain intent through the documentation dependency chain rooted in `product`.
- Repository-level structural constraints that bound any valid implementation.
- The documentation dependency order for future architecture, environment, and code branches.

Does NOT define:

- Agent operations, workflow execution, or prompt-routing assets under `ctx/agent/`.
- Concrete implementation artifacts such as `src/`, `bin/`, `tmpl/`, or `web/`.
- Ad hoc task instructions that bypass or override the documentation dependency order.

## Level Order

Documentation levels form a strict dependency order:

```text
product
↓
architecture
↓
environment
↓
code
```

Lower levels may refine but must not redefine statements established at higher levels.

When a lower branch does not yet exist, its meaning must not be guessed into sibling documents.
