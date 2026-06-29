# Blog Event Drafting Prompt

- Path: `ctx/agent/prompt/codex/blog.md`
- Template Version: `20260629`
- Changed: `20260629`

## Purpose

Reusable prompt asset for drafting Russian-language blog event pages from a short source post and a reference example.

## Source Pattern

Use this prompt when the human provides:

- a short Telegram or note-style source text;
- a target publication date or filename slot;
- optionally an image filename to be used as the visual basis.

## Task Shape

Produce a Russian-language blog-event page following the style of an existing repository example such as `tmpl/web/ru/blog/2026/20260225-01-teqfw-di-llm-first-transition.html`.

The expected output should include:

- a full event description;
- a short event description;
- copy suitable for a blog-event page rather than a release note.

## Content Constraints

- Do not restate the event date in body text when the page already displays it separately.
- When a link is needed, embed it into a semantically relevant fragment instead of exposing a bare URL block.
- Keep the text focused on the concrete event rather than on self-promotion.

## Style Constraints

Use a neutral diary-like tone with emphasis on the event rather than on the author.

Prefer short concrete formulations, practical observations, and calm narration.

Avoid promotional phrasing and minimize oppositional constructions of the form `не А, а Б`.

The title should announce the event, while the body should develop it without duplicating the title wording.

## Repository Targets

- `tmpl/web/ru/blog/` — Nunjucks templates for Russian-language blog-event pages.
- `web/img/blog/` — image files for blog pages.

Template and image filenames should start with the publication date in the `YYYYMMDD-XX` format, where `XX` is the sequence number for that date.
