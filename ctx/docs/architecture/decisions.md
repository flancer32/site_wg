# Architecture Decisions

- Path: `ctx/docs/architecture/decisions.md`
- Template Version: `20260605`
- Changed: `20260909`

## Purpose

Record durable architecture decisions in a short ADR-like form.

## Decision 1: Keep the site on TeqCMS with a thin project adapter

- Decision: use TeqCMS as the primary site engine and keep repository-specific runtime logic in a small adapter layer under `src/`.
- Rejected alternatives: rebuild the site engine for the repositioning; move runtime behavior into templates.
- Reasoning: the new commercial model changes meaning and hierarchy, not the demonstrated need for a new website platform.

## Decision 2: Keep context and authored sources authoritative

- Decision: keep durable product meaning in `ctx/`, public source material in `tmpl/` and source-controlled assets, and `web/` as downstream output.
- Rejected alternatives: treat generated pages or current code behavior as authoritative when they conflict with the accepted target state.
- Reasoning: the repositioning must propagate from product meaning rather than preserve obsolete implementation by inertia.

## Decision 3: Keep multilingual routing locale-aware at the application boundary

- Decision: resolve locale and clean route information centrally before route-specific render enrichment.
- Rejected alternatives: duplicate locale rules across templates or new offer handlers.
- Reasoning: commercial restructuring must preserve consistent locale behavior and canonical public paths.

## Decision 4: Keep promoted-product runtimes outside the site boundary

- Decision: allow wiredgeese.com to explain and sell PDE capabilities without making PDE, MCP, Telegram, or customer deployments part of the site runtime.
- Rejected alternatives: add product runtime responsibilities merely because the site promotes the product.
- Reasoning: the systems have different state, credentials, trust, failure, deployment, and revocation boundaries.

## Decision 5: Separate preservation from navigational prominence

- Decision: let primary navigation serve current commercial direction while retained knowledge and history remain meaningfully reachable through deliberate secondary or contextual paths. Inventory existing URLs and content before implementation, retaining access or adding redirects where value warrants it.
- Rejected alternatives: erase the existing archive during a homepage repositioning; preserve the Home, Projects, Library, Journal, and Contact hierarchy solely because it exists or carries search value; leave retained pages online without internal discovery.
- Reasoning: preservation does not imply navigational prominence. Search, backlink, reference, proof, and historical value can remain accessible while the primary commercial hierarchy changes.

## Decision 6: Defer new commercial automation

- Decision: use the existing contact capability or another later-approved minimal handoff while pricing and delivery are learned manually.
- Rejected alternatives: define a new offer form, analytics funnel, payment system, CRM, or automated PDE provisioning in this context rewrite.
- Reasoning: those commitments are premature without external buyer and delivery evidence.

## Decision 7: Expose accountable maker-led production

- Decision: represent Alex Gusev as the accountable human maker and AI agents as active production participants, while keeping buyer outcome and evidence ahead of production identity.
- Rejected alternatives: imply a larger organization; hide the single-maker model; treat agents as employees or as replacements for human authority; make Alex's identity the product.
- Reasoning: suitable early buyers may value direct ownership, transparency, and customization, but those strengths do not establish maturity, capacity, continuity, or commercial validation.

## Decision 8: Adopt a product-led primary route model

- Decision: use Products, Custom Development, Alarisa, Technology, and About as primary navigation meanings; use the brand for Home and a distinct `Discuss your need` action for Contact; place Resources and retained knowledge in the footer and contextual discovery model defined by product information architecture.
- Rejected alternatives: retain the current personal-site navigation; place Resources in the header as an equal commercial category; hide Alarisa under an archive; create separate applications for commercial and knowledge surfaces.
- Reasoning: the chosen model gives the current offer a direct path, keeps Alarisa strategically visible, exposes customization and maker trust, and preserves accumulated knowledge without letting it dominate the commercial journey.
