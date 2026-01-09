# Iteration Goal

Verify that `web/sitemap.xml` exactly matches the set of page templates in `tmpl/web/` (3 locales), with no missing and no extra entries.

# Completed Actions

- Parsed `web/sitemap.xml` and extracted canonical `<loc>` routes plus `xhtml:link` alternates.
- Inventoried all `.html` templates under `tmpl/web/{en,ru,es}` and mapped them to public routes, excluding `inc/` partials and `404.html`.
- Compared template-derived routes to sitemap routes and fixed discrepancies by updating `web/sitemap.xml`.
- Re-ran the comparison to confirm `missing = 0`, `extra = 0`, `alternate mismatches = 0`.

# Artifacts

- Updated sitemap: `web/sitemap.xml`
- Comparison logic was executed via one-off `node` commands (no committed scripts).

# Result

`web/sitemap.xml` now reflects all page templates in `tmpl/web/` (excluding partials and 404) and contains no entries without a corresponding template.

