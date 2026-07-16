# SSR Web Application Overview

- Path: `ctx/docs/code/web/ssr/overview.md`
- Template Version: `20260630`
- Changed: `20260716`

## Purpose

Describe the current SSR web application at implementation-facing level.

## Delivery Model

The site is a multilingual SSR site built on top of `@flancer32/teq-cms`.

The current project:

- stores authored page templates under `tmpl/web/{locale}/`;
- uses Nunjucks-style template inheritance and includes for page composition;
- injects project-specific render behavior through `src/Back/Di/Replace/Adapter.js`;
- serves generated or published output through the CMS runtime rather than treating `web/` as the primary authored source.

The site is SSR-first.
It may include light browser-side JavaScript, but the primary delivery model is server-rendered HTML.

## Implementation Anchors

The current SSR model is anchored in:

- [teqcms.config.mjs](../../../../../teqcms.config.mjs:1) for project wiring into the CMS runtime;
- [src/Back/Di/Replace/Adapter.js](../../../../../src/Back/Di/Replace/Adapter.js:1) for render-data interception;
- [src/Back/Web/Cms/Handler/Blog.js](../../../../../src/Back/Web/Cms/Handler/Blog.js:1) for blog-index enrichment;
- [src/Back/Web/Cms/Handler/Redirect.js](../../../../../src/Back/Web/Cms/Handler/Redirect.js:1) for request-path normalization and redirect-map application;
- [src/Back/Web/Handler/NotFound.js](../../../../../src/Back/Web/Handler/NotFound.js:1) for localized unresolved-route responses;
- [bin/generate-sitemap.mjs](../../../../../bin/generate-sitemap.mjs:1) for generated public route metadata;
- `tmpl/web/{locale}/` for locale-specific layouts, partials, and pages.

## SSR Chain

The current render chain is:

`HTTP request -> locale-aware route extraction -> redirect-map normalization -> CMS render-data assembly -> project metadata and optional route enrichment -> locale template render -> HTML response or localized 404 fallback`

The explicit project-specific enrichments visible in the current code are:

- redirect rewriting from `etc/redirect-map.json`;
- validated-origin canonical and alternate metadata;
- publication and not-found route classification;
- `blogIndex` injection for locale blog-index routes;
- signed form-token injection for the Agent Orchestration PoC landing page.

## Current Surface Model

The current SSR site surface is organized around:

- localized top-level pages such as home, contact, projects, and about;
- journal index pages and dated journal article pages;
- library index and article pages;
- project-detail pages;
- shared locale-specific layout partials under `inc/`;
- a locale-aware navigation shell.

## Boundaries

This SSR branch documents:

- request-visible route behavior;
- render-time enrichment;
- template composition structure;
- delivered assets and locale behavior.

It does not document:

- product messaging;
- content strategy;
- generic frontend implementation patterns beyond what the SSR model already exposes.
