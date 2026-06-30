# SSR Page Composition

- Path: `ctx/docs/code/web/ssr/page-composition.md`
- Template Version: `20260630`
- Changed: `20260630`

## Purpose

Connect route families to the shared SSR shell and route-specific page composition.

## Composition Matrix

The current composition model is:

- locale home page -> shared locale layout -> shared nav + main content blocks + shared footer
- top-level standalone pages -> shared locale layout -> shared nav + page-local content + shared footer
- blog index -> shared locale layout -> shared nav + blog-specific CSS + `blogIndex.items` list + shared footer
- blog article page -> shared locale layout -> shared nav + article content + optional media embeds + shared footer
- library page -> shared locale layout -> shared nav + article content + optional media embeds + shared footer
- project-detail page -> shared locale layout -> shared nav + project content + shared footer
- landing page -> shared locale layout -> shared nav + conversion-oriented content + shared footer
- 404 page -> shared locale layout -> shared nav + not-found content + shared footer

## Shared Composition Rules

Across the current SSR site:

- locale-specific `inc/layout.html` acts as the universal outer shell;
- `inc/nav.html` and `inc/footer.html` are shared at layout level rather than repeated in pages;
- page-specific differentiation happens inside content blocks rather than through multiple competing shells;
- article-like pages commonly embed images or interactive media through delivered HTML and the shared `zoom-img` script.

## Route-Specific Exception

The main current route-specific composition exception is the blog index.

Its final rendered list is assembled from article-block fragments extracted from blog article source files rather than from a dedicated authored listing dataset.

The current landing-page implementation contract for the `land/agent-orchestration-poc/` branch is documented separately under:

- `ctx/docs/code/web/ssr/pages/land/agent-orchestration-poc.md`
