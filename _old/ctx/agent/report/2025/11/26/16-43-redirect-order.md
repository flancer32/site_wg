# Redirect order fix

## Goal
- run redirects based on the helper-provided clean path before routing decisions.

## Actions
- first resolve routing in `App_Back_Di_Replace_Adapter`, then call the redirect handler with that info and recompute routing for rendering.
- updated `App_Back_Web_Cms_Handler_Redirect` so it keys the map by the helper’s `cleanPath`, overlays locale afterwards, and documents the clean-path assumption with `@LLM-DOC`.
- ensured `etc/redirect-map.json` now stores locale-agnostic keys because the helper already strips the locale.

## Artifacts
- `src/Back/Di/Replace/Adapter.js`
- `src/Back/Web/Cms/Handler/Redirect.js`
- `etc/redirect-map.json`
