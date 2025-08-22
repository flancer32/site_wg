# AGENTS.md

## Purpose

This file defines the entry point for AI agents working with this repository.  
Agents assist in **automatic translation of site templates** and **sitemap updates**.  
General project description, setup, and commands are provided in [README.md](README.md).

---

## Agent Responsibilities

1. **Translation Workflow**
    - Detect new or updated files in `tmpl/web/ru/`.
    - Create or update corresponding templates in `tmpl/web/en/` and `tmpl/web/es/`.
    - Preserve structure, metadata (`title`, `date`, `tags`), and Nunjucks formatting.

2. **Sitemap Maintenance**
    - Ensure all localized versions of each page are listed in `/web/sitemap.xml`.
    - Add `xhtml:link` references for every available language.

3. **Consistency Rules**
    - Source of truth is always the Russian templates in `tmpl/web/ru/`.
    - English (`en`) and Spanish (`es`) are mandatory translations.
    - Do not add extra content, comments, or emojis in translated templates.
    - All commit messages must be in English.

4. **Task Naming and Logging**
    - Every translation task must explicitly mention the page name in its task title (e.g., `Translate about.html to en/es`).
    - All log messages must also reference the processed page (e.g., `Updated tmpl/web/en/about.html`).
    - Logs should clearly describe the performed action (translation, update, sitemap modification).

---

## Constraints

- Work strictly within Git-based version control.
- Follow the page categorization rules (`info`, `blog`, `docs`) defined in project documentation.
- Respect repository license: Apache-2.0.
