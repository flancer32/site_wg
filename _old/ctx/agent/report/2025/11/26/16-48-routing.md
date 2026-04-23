# Routing anchor update

## Goal
- rely on the helper’s `cleanPath` once and keep the redirect prior to template loading.

## Actions
- kept a single `routeInfo` from `resolveRouting(req)`, added an `@LLM-DOC` reminder about the `{locale, cleanPath}` shape, and reused it after redirects instead of recomputing.
- ensured the redirect handler still receives that info before the CMS adapter runs so clean-path swaps happen before templates load.
- no application-visible logic changes beyond the earlier fix, but this aligns with the multi-locale architecture.

## Artifacts
- `src/Back/Di/Replace/Adapter.js`
