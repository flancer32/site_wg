# Publication Architecture

- Path: `ctx/docs/verification/architecture/publication.md`
- Template Version: `20260923`
- Changed: `20260923`

## P3 — Authored Sources And Evidence Chronology

Read [Journal and evidence](../../product/journal-and-evidence.md), [architecture state](../../architecture/state.md), [publication decisions](../../architecture/decisions.md), and [rendering](../../code/web/ssr/rendering.md). Trace a current Journal and Library article from locale Markdown in `tmpl/web/` through publication handling to HTML and raw Markdown responses. Verify titles and publication metadata, chronology, article relationships, current-state links, and discoverability. Check that generated `web/` content, indexes, sitemap, and `/llms.txt` match authored sources without becoming their authority. Run `npm test` and `npm run sitemap` where the publication scope changes; inspect the resulting routes and sitemap rather than relying on command exit alone. A historical event may remain accurate while its current status has changed.

**Applicability:** Journal or Library Markdown is authored for a maintained locale.

**Expected observation:** Canonical Markdown drives HTML/raw routes, discovery output, and chronology/current-state relationships.

**Reach and blind spot:** Passing tests and generated indexes cannot establish the truth of article claims or external events.

**Follow-up:** Record provenance and the observed state. If the expectation fails, localize the failing declaration before proposing a cause; after an authorized correction, repeat this check against the same expectation.
