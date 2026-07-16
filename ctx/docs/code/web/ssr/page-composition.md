# SSR Page Composition

- Path: `ctx/docs/code/web/ssr/page-composition.md`
- Template Version: `20260630`
- Changed: `20260716`

## Purpose

Connect route families to the shared SSR shell and route-specific page composition.

## Composition Matrix

The current composition model is:

- locale home page -> shared locale layout -> Site Header + Home Hero + profile + products + method + final CTA + Site Footer
- top-level standalone pages -> shared locale layout -> Site Header + page-local content + Site Footer
- journal index -> shared locale layout -> Site Header + journal introduction + blog-specific list + Site Footer
- journal article -> shared locale layout -> Site Header + article content + optional Zoomable Image + Publication Discussion CTA + Site Footer
- library index -> shared locale layout -> Site Header + library introduction + category grid + Site Footer
- library article -> shared locale layout -> Site Header + article content + optional Zoomable Image + Publication Discussion CTA + Site Footer
- projects index -> shared locale layout -> Site Header + featured work + chronological archive + Site Footer
- project detail -> shared locale layout -> Site Header + project identity + project content + status CTA + Site Footer
- landing page -> shared locale layout -> Site Header + conversion-oriented content and form + Site Footer
- 404 page -> shared locale layout -> Site Header + not-found recovery surface + Site Footer

## Shared Composition Rules

Across the current SSR site:

- locale-specific `inc/layout.html` acts as the universal outer shell;
- `inc/nav.html` and `inc/footer.html` are shared at layout level rather than repeated in pages;
- page-specific differentiation happens inside content blocks rather than through multiple competing shells;
- article-like pages commonly embed images or interactive media through delivered HTML and the shared `zoom-img` script;
- reusable surface identities and the `zoom-img` relationship are catalogued under `components/`;
- all layouts expose the same accessibility and responsive baseline.

## Route-Specific Exception

The main current route-specific composition exception is the blog index.

Its final rendered list is assembled from article-block fragments extracted from blog article source files rather than from a dedicated authored listing dataset.

The current landing-page implementation contract for the `land/agent-orchestration-poc/` branch is documented separately under:

- `ctx/docs/code/web/ssr/pages/land/agent-orchestration-poc.md`
