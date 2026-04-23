# Blog List HTML

## Goal
Ensure the blog adapter returns raw `{% block blog_item %}` fragments so the blog index page receives ready-made `<li>` entries instead of parsed metadata while keeping the wrapper focused on present interface needs.

## Actions
- Replaced the generic `delegateCmsMethods` instrumentation with a minimal wrapper that only overrides `getRenderData`, leaving every other interaction to the base adapter through direct delegation.
- Confirmed routing checks and HTML extraction logic still populate `data.blogIndex.items` with `{slug,url,html}` entries only for `/blog`.

## Artifacts
- `src/Back/Di/Replace/Adapter.js`
