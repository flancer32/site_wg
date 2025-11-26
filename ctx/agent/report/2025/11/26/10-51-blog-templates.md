# Blog Templates

## Goal
Match the English and Spanish blog pages to the Russian template so all locales render the shared blog index instead of duplicated hardcoded entries.

## Actions
- Replaced `tmpl/web/en/blog.html` with the dynamic layout that iterates over `blogIndex.items`, keeps the English heading, and reuses the CSS from the Russian version for consistent styling.
- Rebuilt `tmpl/web/es/blog.html` with the same dynamic structure but Spanish titles to align the Spanish page with the shared blog index UI.

## Artifacts
- `tmpl/web/en/blog.html`
- `tmpl/web/es/blog.html`
