# SSR Pages

- Path: `ctx/docs/code/web/ssr/pages.md`
- Template Version: `20260630`
- Changed: `20260630`

## Purpose

Describe the current SSR page families as implementation-facing template groups.

## Page Families

The current locale template tree exposes these main page families:

- `home` — locale root entry page, currently represented by `index.html`;
- `top-level content pages` — about, contact, posts, projects, products, and related standalone pages;
- `blog index` — article listing page rendered from `blog.html` plus injected `blogIndex`;
- `blog article pages` — dated article documents under `blog/{year}/`;
- `library pages` — article-like documents grouped under `library/{section}/`;
- `project detail pages` — project-specific pages under `projects/{family}/`;
- `landing pages` — nested offer or experiment pages under custom route branches such as `land/`;
- `404 page` — locale-specific not-found document.

## Page Characteristics

The current SSR pages are mostly content-first documents that:

- extend the shared locale layout;
- fill layout blocks directly;
- optionally add page-local styles;
- sometimes add extra head assets such as blog-specific CSS.

## Index Pages Versus Detail Pages

The current surface has a clear distinction between:

- index-like pages such as home, blog index, posts, projects, and contact;
- detail-like pages such as individual blog posts, library entries, and project-detail pages.

The `blog.html` page is the only current page family with explicit project-side render enrichment visible in `src/`.

## Detailed Page Branches

When a concrete SSR page needs its own implementation contract, it should be documented under:

- `ctx/docs/code/web/ssr/pages/`

The current dedicated page documents are:

- `ctx/docs/code/web/ssr/pages/home.md`
- `ctx/docs/code/web/ssr/pages/contact.md`

The current dedicated landing-page implementation branch is:

- `ctx/docs/code/web/ssr/pages/land/agent-orchestration-poc.md`
