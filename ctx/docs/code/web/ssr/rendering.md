# SSR Rendering

- Path: `ctx/docs/code/web/ssr/rendering.md`
- Template Version: `20260630`
- Changed: `20260709`

## Purpose

Describe the current SSR request-to-render path and project-specific render enrichment.

## Project Wiring

The project registers a namespace root under `src/` and replaces the CMS adapter through [teqcms.config.mjs](/home/alex/work/wg/teqcms.config.mjs:1) and [src/Back/Di/Replace/Adapter.js](/home/alex/work/wg/src/Back/Di/Replace/Adapter.js:1).

This makes the project adapter the code-level hook point around normal CMS render-data generation.

## Request Processing Sequence

The current project-specific sequence is:

1. decode request path and extract locale-aware routing information;
2. apply redirect normalization through `App_Back_Web_Cms_Handler_Redirect`;
3. request base render data from the underlying CMS adapter;
4. enrich returned render data when a route-specific project rule exists;
5. render the matching locale template with the final data object.

## Redirect Handling

Redirect handling is applied before final render-data use.

The current redirect handler:

- reads `etc/redirect-map.json`;
- normalizes incoming path shapes;
- excludes static-resource paths from HTML redirect logic;
- overlays locale prefixes on redirect targets when appropriate;
- rewrites `req.url` in place for the downstream render path.

The current project treats redirects as request normalization inside the render pipeline rather than as a separate authored route tree.

## Blog Index Enrichment

The current blog index is enriched dynamically.

For locale-aware clean paths matching `/blog` or `/blog.html`, the project:

- locates `tmpl/web/{locale}/blog/`;
- scans year directories;
- scans HTML article files in reverse chronological order;
- extracts each article's `{% block blog_item %}` fragment;
- exposes the resulting collection as `data.blogIndex.items`.

The blog index template then renders those prepared fragments directly.

## Landing Form Token Enrichment

The current `land/agent-orchestration-poc` page is enriched dynamically as well.

For locale-aware clean paths matching:

- `/land/agent-orchestration-poc`
- `/land/agent-orchestration-poc/index.html`

the project:

- issues a server-generated signed `formToken`;
- signs it with a server-side secret resolved from `WG_FORM_TOKEN_SECRET` or a runtime fallback file;
- exposes the token as `data.formToken` for the landing-page template only.

## Render Data Expectations

The current SSR templates rely on CMS-provided and project-enriched fields such as:

- `locale`
- `allowedLocales`
- `canonicalUrl`
- `alternateUrls`
- `blogIndex`
- `formToken`

The current branch documents these only as named render-time dependencies.
It does not redefine the full CMS-internal data model.
