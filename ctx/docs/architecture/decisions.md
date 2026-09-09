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

- Decision: let primary navigation serve current commercial direction while Project Archive, Library, Journal, Books, and other retained knowledge remain meaningfully reachable through curated collection-level footer links, contextual relationships, preserved inbound paths, and deliberate redirects. Add a cross-collection hub only if evidence establishes a distinct discovery job.
- Rejected alternatives: erase the existing archive during a homepage repositioning; preserve the Home, Projects, Library, Journal, and Contact hierarchy solely because it exists or carries search value; leave retained pages online without internal discovery; create a mandatory `Resources` hub before showing that it improves navigation.
- Reasoning: preservation does not imply navigational prominence or a new aggregation layer. Existing collection identities, search value, and references can remain accessible while the primary commercial hierarchy changes.

## Decision 6: Defer new commercial automation

- Decision: use the existing contact capability or another later-approved minimal handoff while pricing and delivery are learned manually.
- Rejected alternatives: define a new offer form, analytics funnel, payment system, CRM, or automated PDE provisioning in this context rewrite.
- Reasoning: those commitments are premature without external buyer and delivery evidence.

## Decision 7: Expose accountable maker-led production

- Decision: represent Alex Gusev as the accountable human maker and AI agents as active production participants, while keeping buyer outcome and evidence ahead of production identity.
- Rejected alternatives: imply a larger organization; hide the single-maker model; treat agents as employees or as replacements for human authority; make Alex's identity the product.
- Reasoning: suitable early buyers may value direct ownership, transparency, and customization, but those strengths do not establish maturity, capacity, continuity, or commercial validation.

## Decision 8: Adopt products, Approach, and vision as primary semantics

- Decision: use Products, Approach, and Alarisa as the stable primary navigation meanings; use the brand for Home and a distinct shared commercial action for the human handoff. Keep About as secondary maker evidence. Treat customization as a cross-product capability owned by product journeys and Approach rather than as a parallel header business. Do not freeze exact labels or paths at the architecture level.
- Rejected alternatives: retain the current personal-site navigation; use Products, Custom Development, Alarisa, Technology, and About as equal primary destinations; expose only Products and Alarisa with no cross-product trust destination; place retained knowledge in the header; create separate applications for commercial and knowledge surfaces.
- Reasoning: the chosen model gives products the dominant discovery path, gives customization and shared foundations one buyer-oriented supporting destination, keeps Alarisa strategically visible, reduces portfolio and consultancy drift, and remains stable as products are added or retired.

## Decision 9: Separate vision, method, platform, system, product, and offer

- Decision: represent Alarisa as the guiding vision and R&D direction, ADSM as the development methodology, TeqFW as the technical platform, PDE as an independently useful technical system produced by Alarisa-guided exploration, and the Telegram setup as the current concrete commercial offer.
- Rejected alternatives: treat them as equal catalogue items; model Alarisa as a future product system containing PDE and every subsequent offer; treat one failed product experiment as failure of the vision.
- Reasoning: these objects have different purposes, boundaries, and lifecycles. Separating them keeps the strategic direction open while allowing products and discontinued branches to be evaluated independently.

## Decision 10: Treat product-specific cognitive context as an optional transfer asset

- Decision: allow an agreed product delivery to include a bounded cognitive context and development guidance for continued work by another accountable human-and-agent team, while keeping source access, context access, rights, authority, and support as separate agreement dimensions.
- Rejected alternatives: make all internal context part of every installation; equate source delivery with development continuity; promise autonomous agent maintenance; turn the public site into an automated context-transfer service.
- Reasoning: ADSM can preserve more development intent than source code alone, but transfer has confidentiality, intellectual-property, competence, authority, and continuity limits that require explicit human control.
