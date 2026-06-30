# SSR Routes

- Path: `ctx/docs/code/web/ssr/routes.md`
- Template Version: `20260630`
- Changed: `20260630`

## Purpose

Describe the current route families and path conventions of the SSR site.

## Locale Prefix Model

The current site is locale-prefixed.

Visible locale roots are:

- `/en`
- `/es`
- `/ru`

The SSR model expects locale-aware route resolution before template rendering.
The locale list is provided by CMS configuration and consumed by the project adapter and locale switcher.

## Route Families

The current SSR route families visible in `tmpl/web/{locale}/` are:

- locale home page: `/{locale}/`
- top-level content pages: `/{locale}/about.html`, `/{locale}/contact.html`, `/{locale}/posts.html`, `/{locale}/projects.html`
- blog index: `/{locale}/blog/` and `/{locale}/blog.html`
- blog article pages: `/{locale}/blog/{year}/{slug}.html`
- library article pages: `/{locale}/library/{section}/{slug}.html`
- project-detail pages: `/{locale}/projects/{project-family}/{slug}.html`
- dedicated landing pages below nested route families such as `/{locale}/land/...`
- locale 404 page: `/{locale}/404.html`

## Blog Route Special Case

The blog index route is not only a static template.

For clean paths `/blog` and `/blog.html`, the project adapter injects `blogIndex.items` based on the locale blog directory.
This creates a render-time route specialization for blog index pages.

## Redirected Legacy Paths

The current SSR model supports declarative redirects through `etc/redirect-map.json`.

Visible redirect families include:

- old dated blog URL shapes redirected to the current flat dated slug shape;
- old `/doc/...` paths redirected into `/library/...`;
- selected `/post/...` aliases redirected into canonical blog or library targets.

Locale overlay is preserved when redirect targets are applied to locale-prefixed incoming routes.

## Non-HTML Boundary

The redirect handler intentionally treats HTML-like routes differently from static-resource routes.

Static resources such as images, CSS, JavaScript, fonts, JSON, and similar file types are excluded from the HTML redirect path normalization branch.
