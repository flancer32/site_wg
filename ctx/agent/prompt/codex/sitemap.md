# Sitemap And Publication Finalization Prompt

- Path: `ctx/agent/prompt/codex/sitemap.md`
- Template Version: `20260629`
- Changed: `20260629`

## Purpose

Reusable prompt asset for final repository cleanup after site-content changes that affect public URLs.

## Task Shape

Use this prompt when content or routing changes require publication-oriented finalization.

The routine is:

- regenerate or update `web/sitemap.xml`;
- review the current repository diff before any VCS action;
- commit only the intended changes for the current task;
- push the current branch when the human explicitly asks for publication-oriented delivery;
- optionally trigger the publication workflow after a successful push when the human explicitly includes that step.

## Boundary Rules

- Do not commit unrelated third-party or human work implicitly.
- Do not assume that every sitemap refresh must be followed by push or production publication.
- Treat workflow triggering as a separate explicit action, not as a default side effect.
