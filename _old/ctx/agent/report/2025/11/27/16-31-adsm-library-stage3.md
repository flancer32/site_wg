# ADSM library stage 3

## Goal
Move the stage‑3 ADSM immersion article out of the blog layer and make sure every reference now targets the library/adsm path.

## Actions
- Created `tmpl/web/{lang}/library/adsm/` and moved the localized `20251122-01-adsm-top-level-dirs.html` files there, removing the blog block and adding a note that stages 1+2 live in the ADSM top-level directories blog post.
- Updated `etc/redirect-map.json` and `web/sitemap.xml` so the old blog/post routes redirect to the new `/library/adsm/20251122-01-adsm-top-level-dirs.html` path across all locales.
- Verified that no live templates or metadata still point at the blog path (only the historical `ctx/agent/report/2025/11/26/18-32-blog-filenames.md` references it as part of past work).

## Artifacts
- `tmpl/web/en/library/adsm/20251122-01-adsm-top-level-dirs.html`
- `tmpl/web/es/library/adsm/20251122-01-adsm-top-level-dirs.html`
- `tmpl/web/ru/library/adsm/20251122-01-adsm-top-level-dirs.html`
- `etc/redirect-map.json`
- `web/sitemap.xml`
