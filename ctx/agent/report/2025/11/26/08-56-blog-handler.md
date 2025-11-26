# Blog Handler Split

## Goal
Keep the application adapter thin by pushing the blog-value extraction into a dedicated handler so the adapter only enriches `/blog` without re-implementing default behavior.

## Actions
- Added `src/Back/Web/Cms/Handler/Blog.js`, a decomposed handler that walks the blog directory tree, reads `{% block blog_item %}`, and returns `{slug,url,html}` entries in chronological order.
- Updated `App_Back_Di_Replace_Adapter` to import the handler, delegate `/blog` enrichment to it, and only override `getRenderData` while `data.blogIndex.items` remains a raw HTML array.
- Documented the new responsibilities and the required data shape in `ctx/rules/teqcms/adapter.md` so future edits respect the handler/adapter split.

## Artifacts
- `src/Back/Web/Cms/Handler/Blog.js`
- `src/Back/Di/Replace/Adapter.js`
- `ctx/rules/teqcms/adapter.md`
