# Blog filenames

## Goal
Align all localized blog templates under `tmpl/web/{lang}/blog/` with the `YYYYMMDD-NN-…` naming mask and make sure any templates or redirects that link to them refer to the correct names.

## Actions
- Renamed the 2022 Knex and ES6 posts plus the Nov 22, 2025 ADSM directory post in every locale so the order number is separated from the publication date by a hyphen.
- Updated the localized blog item `href`s inside those templates to point at the renamed files while leaving unrelated assets (e.g., `/img/post/…`) untouched.
- Adjusted the redirect targets in `etc/redirect-map.json` so the old routes now resolve to the new filenames.

## Artifacts
- `tmpl/web/en/blog/2022/20220407-01-joined-select-knex.html`
- `tmpl/web/es/blog/2022/20220407-01-joined-select-knex.html`
- `tmpl/web/ru/blog/2022/20220407-01-joined-select-knex.html`
- `tmpl/web/en/blog/2022/20220508-01-export-as-brick.html`
- `tmpl/web/es/blog/2022/20220508-01-export-as-brick.html`
- `tmpl/web/ru/blog/2022/20220508-01-export-as-brick.html`
- `tmpl/web/en/blog/2025/20251122-01-adsm-top-level-dirs.html`
- `tmpl/web/es/blog/2025/20251122-01-adsm-top-level-dirs.html`
- `tmpl/web/ru/blog/2025/20251122-01-adsm-top-level-dirs.html`
- `etc/redirect-map.json`
