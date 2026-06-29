# Architecture Behavior

- Path: `ctx/docs/architecture/behavior.md`
- Template Version: `20260605`
- Changed: `20260629`

## Purpose

Describe major internal architectural flows and processing behavior.

## Major Flows

The current architecture has three major flows:

- content-authoring flow from cognitive context and templates into repository changes;
- publication flow from template and asset sources into rendered output under `web/`;
- request-time rendering flow through TeqCMS with project-specific adapter logic.

## Flow Boundaries

### Content-authoring flow

The flow starts when a human or agent changes product documents, prompt assets, or template sources.

It passes through repository editing under `ctx/` and `tmpl/`.

The flow ends when the durable source material is committed as project truth.

### Publication flow

The flow starts from template, asset, and configuration sources.

TeqCMS translates those sources into publishable artifacts under `web/`.

The flow ends when browser-facing files such as HTML, CSS, images, and `sitemap.xml` exist in the publication block.

### Request-time rendering flow

The flow starts from an inbound HTTP request handled by TeqCMS.

The project adapter resolves locale-aware routing, applies redirect logic, requests render data from the CMS adapter, and conditionally injects blog-index data for blog index routes.

The flow ends when render data is returned for page rendering or when redirect handling terminates the original request path.

## Failure And Recovery

Architectural failure handling is intentionally narrow:

- missing blog index input is tolerated when it results only in `ENOENT`;
- unexpected blog aggregation failures are logged rather than normalized silently;
- redirect and route-normalization logic must fail visibly rather than fork product meaning into duplicate routes.

## Product Dependency

These flows exist to realize the product intent of a multilingual site that sells Alex Gusev and his product line through public pages.

If product behavior changes materially, these flows must be revalidated against product documentation before implementation changes proceed.
