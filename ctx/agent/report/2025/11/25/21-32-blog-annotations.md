# Blog annotation sync

## Goal

Duplicate every blog list annotation into the matching `blog_item` block inside the per-language templates so the list can be rebuilt from the sources.

## Actions

- Parsed each locale’s `tmpl/web/<locale>/blog.html` list and mapped every `/blog/YYYY/MM` annotation snippet to its template path.
- Injected or replaced `{% block blog_item %}` sections (117 files across `tmpl/web/en`, `tmpl/web/es`, `tmpl/web/ru`) with the block from the list page, keeping the localized wording intact.
- Logged the one missing target template (`tmpl/web/ru/blog/2025/09/09-01-llm-roles.html`) so future iterations can add it before expecting an annotation.

## Artifacts

- Updated templates now expose the list-ready annotations via `{% block blog_item %}` (see e.g. `tmpl/web/ru/blog/2025/09/05-01-abdsm-habr.html:36`).
- Scripted conversion recorded in the shell history (Python helpers) and the new blocks in the localized bundles.
