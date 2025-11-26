# Redirect handler iteration

## Goal
- Provide silent redirect support for HTML paths using a configurable map.

## Actions
- Built `App_Back_Web_Cms_Handler_Redirect` that loads `etc/redirect-map.json`, detects locale-aware routes, and rewrites `req.url` only for HTML requests while preserving query data.
- Added `etc/redirect-map.json` so the handler has a place to store mappings.
- Wired the redirect handler into `App_Back_Di_Replace_Adapter` so the substitution runs before render data is built.

## Artifacts
- `src/Back/Web/Cms/Handler/Redirect.js`
- `src/Back/Di/Replace/Adapter.js`
- `etc/redirect-map.json`
