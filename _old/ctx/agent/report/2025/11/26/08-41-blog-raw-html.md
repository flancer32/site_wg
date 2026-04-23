# Blog List HTML

## Goal
Ensure the blog adapter returns raw `{% block blog_item %}` fragments so the blog index page receives ready-made `<li>` entries instead of parsed metadata.

## Actions
- Rewrote `App_Back_Di_Replace_Adapter` so it delegates to the default adapter, preserves origin/alternate URL rewriting, and resolves routing via the web helper.
- Replaced the annotation parsing helpers with a simple extractor that returns the raw block HTML and updated `collectBlogIndex` to build `{slug, url, html}` entries.
- Added blog index enrichment in `getRenderData`, logging errors when template traversal fails without blocking other routes.

## Artifacts
- `src/Back/Di/Replace/Adapter.js`
