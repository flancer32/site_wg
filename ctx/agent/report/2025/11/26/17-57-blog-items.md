# Blog item blocks

## Goal
- Ensure every `tmpl/web/{lang}/blog` template provides a `{% block blog_item %}` entry summarizing the post for its locale-specific event listing.

## Completed
- Scanned all `tmpl/web/{lang}/blog` directories (ru/en/es) to identify the templates lacking the block.
- Added localized `blog_item` fragments to each missing article, using the existing title, image, and date details to describe the event and point to the correct `/{lang}/blog/...` URL.
- Updated `etc/redirect-map.json` with redirects from the old `/blog/{year}/{month}/{day}-{slug}.html` URLs to the new `/blog/{year}/{year}{month}{day}{suffix}.html` counterparts so the renamed posts stay reachable.
- Replaced all occurrences of the legacy `/blog/{year}/{day}-...` links inside `tmpl/web` with their current `/blog/{year}/{year}{month}{day}...` equivalents so the templates now point directly to up-to-date URLs instead of relying on redirects.

## Artifacts
- `tmpl/web/ru/blog/2022/04/07-01-joined-select-knex.html`
- `tmpl/web/en/blog/2022/04/07-01-joined-select-knex.html`
- `tmpl/web/es/blog/2022/04/07-01-joined-select-knex.html`
- `tmpl/web/ru/blog/2022/05/08-01-export-as-brick.html`
- `tmpl/web/en/blog/2022/05/08-01-export-as-brick.html`
- `tmpl/web/es/blog/2022/05/08-01-export-as-brick.html`
- `tmpl/web/ru/blog/2025/11/22-01-adsm-top-level-dirs.html`
- `tmpl/web/en/blog/2025/11/22-01-adsm-top-level-dirs.html`
- `tmpl/web/es/blog/2025/11/22-01-adsm-top-level-dirs.html`
- `etc/redirect-map.json`
