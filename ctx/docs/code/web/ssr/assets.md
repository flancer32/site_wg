# SSR Assets

- Path: `ctx/docs/code/web/ssr/assets.md`
- Template Version: `20260630`
- Changed: `20260630`

## Purpose

Describe browser-facing assets that are structurally relevant to the current SSR site.

## Shared Assets

The shared SSR shell currently depends on:

- `/styles/main.css` as the base site stylesheet;
- `/js/comp/zoom-img.js` as the shared module script for image zoom behavior;
- `/favicon.ico` through the navigation logo link and browser tab behavior.

## Route-Specific Assets

The current code and templates show limited route-specific asset inclusion.

Known explicit example:

- `/styles/blog.css` is included by locale `blog.html` templates through the `html_head_extra` block.

## Content Assets

Page content also references:

- `/img/...` hosted images and illustrations;
- brand assets such as GitHub, Codex, TeqFW, or article thumbnails;
- external image URLs in selected article templates.

These assets are content-facing resources, not independent SSR components.

## Asset Boundary

This branch documents only assets that matter to delivered page structure or visible SSR behavior.
It does not define asset-build mechanics or publication pipelines.
