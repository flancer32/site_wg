# Blog Item Links

## Goal
Keep blog-item cards statically linked to their locale so the `href` inside `{% block blog_item %}` no longer depends on the `{{ locale }}` variable.

## Actions
- Replaced each `href="/{{ locale }}/blog/..."`/`href="/{{locale}}/blog/..."` inside `block blog_item` with `/<lang>/blog/...` for the appropriate locale (en/es/ru).
- Ensured the change only affected the blog-item links and left navigation/includes untouched.

## Artifacts
- `tmpl/web/en/blog/`
- `tmpl/web/es/blog/`
- `tmpl/web/ru/blog/`
