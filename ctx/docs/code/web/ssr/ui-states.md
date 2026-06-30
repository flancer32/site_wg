# SSR UI States

- Path: `ctx/docs/code/web/ssr/ui-states.md`
- Template Version: `20260630`
- Changed: `20260630`

## Purpose

Describe the main visible SSR-facing states and exceptional outcomes that are explicit in the current code and templates.

## Common Delivered States

The current SSR surface visibly supports these common states:

- normal rendered page state for standard locale pages;
- localized blog index state with rendered article items;
- localized article/detail page state;
- redirected route state where the incoming legacy path resolves to a canonical target;
- not-found state through locale `404.html`.

## Blog Index State

The blog index has at least two practical SSR states:

- populated index state when `blogIndex.items` contains extracted article fragments;
- empty index state when no entries are collected or the locale blog directory is missing.

The current code treats missing blog directories quietly when the failure is `ENOENT`.

## Navigation State

The shared navigation shell includes a visible mobile toggle state:

- closed menu;
- opened menu after client-side toggle.

This is a small browser-side enhancement layered onto the SSR-delivered shell.

## Exceptional Outcomes

The current SSR branch makes these exceptional outcomes explicit:

- legacy-path normalization through redirect-map application;
- HTML-route versus static-resource differentiation in redirect logic;
- locale-preserving redirect overlay;
- locale `404.html` for not-found rendering.

## Current Boundary

The current project does not expose a broader client-side async state model in repository-visible code.

This SSR state document therefore stays focused on:

- request-visible route outcomes;
- rendered content availability;
- small delivered-shell interaction states.
