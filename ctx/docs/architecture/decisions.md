# Architecture Decisions

- Path: `ctx/docs/architecture/decisions.md`
- Template Version: `20260605`
- Changed: `20260910`

## Purpose

Record the active durable architecture decisions and make revision or supersession of earlier decisions explicit.

Only the current decision text in this document is normative. A `Revised` or `Supersedes` note identifies historical continuity; superseded wording is not an active alternative.

## Decision 1: Keep TeqCMS With A Thin Project Adapter

- **Status:** retained.
- **Decision:** use TeqCMS as the site engine and keep repository-specific runtime behavior in a small Node.js adapter under `src/`.
- **Rejected alternatives:** rebuild the engine for semantic repositioning; create separate applications for commercial, Journal, current-work, or history surfaces; move runtime behavior into templates.
- **Reasoning:** the product change requires different public meaning and relationships, not a new platform.

## Decision 2: Keep Context And Authored Sources Authoritative

- **Status:** retained and clarified.
- **Decision:** keep product and engineering truth in `ctx/`, implementation inputs in `tmpl/`, source-controlled assets, code, and configuration, and `web/` as downstream output.
- **Rejected alternatives:** treat generated pages, existing route structure, or current code behavior as authority when they conflict with accepted context.
- **Reasoning:** product meaning must flow through `product -> architecture -> environment -> code`; implementation inertia cannot reinstate a superseded model.

## Decision 3: Keep One Locale-Aware Publication System

- **Status:** retained.
- **Decision:** keep one multilingual SSR/publication architecture and resolve locale and canonical route information at the shared application boundary before page-specific enrichment.
- **Rejected alternatives:** duplicate locale rules across templates or semantic surfaces; create locale- or surface-specific applications.
- **Reasoning:** identity, maturity, evidence, and commercial semantics must remain consistent across maintained locales.

## Decision 4: Keep Promoted And Customer Runtimes Outside The Site

- **Status:** retained and broadened.
- **Decision:** allow wiredgeese.com to present and sell external capabilities without becoming a PDE runtime, Desk host, customer MCP server, Telegram credential holder, customer storage owner, product deployment, CRM, payment processor, or provisioning system.
- **Rejected alternatives:** add a runtime responsibility merely because the site promotes, documents, links to, or commercially qualifies it.
- **Reasoning:** those systems have distinct state, credentials, authority, deployment, failure, support, and revocation boundaries.

## Decision 5: Separate Active Journal From Durable History

- **Status:** revised; supersedes the prior decision that grouped Journal with Project Archive, Library, Books, and other secondary retained knowledge.
- **Decision:** make Journal/Events a directly discoverable active evidence surface connected to current work, offers, hypotheses, and current status. Keep projects, older articles, books, technical material, and discontinued work on an intentionally reachable durable/history surface.
- **Rejected alternatives:** erase historical material; make Journal footer-only; treat Journal as an equivalent archive collection; let retained history dominate current meaning; require a generic cross-collection hub without a demonstrated visitor job.
- **Reasoning:** current evidence and chronology have a first-class architectural responsibility, while preservation still does not imply navigational dominance.

## Decision 6: Defer Commercial Automation

- **Status:** retained and generalized.
- **Decision:** use a direct, context-aware human handoff while qualification, scope, price, deployment, trust, and delivery boundaries are being learned.
- **Rejected alternatives:** infer a new form pipeline, analytics funnel, CRM, checkout, payment processor, provisioning service, or customer database from the existence of current offers.
- **Reasoning:** human-controlled commercial truth is sufficient at present and avoids premature state and authority owners.

## Decision 7: Expose The Accountable Maker And Agent Participation

- **Status:** retained and aligned with the Wired Geese identity.
- **Decision:** represent Alex Gusev as the accountable human maker and AI agents as hired, authorized working participants. Keep buyer outcome and claim-specific evidence ahead of production mythology.
- **Rejected alternatives:** imply a larger organization; hide human accountability; describe agents as employees, owners, or independent commercial authorities; make maker biography the product.
- **Reasoning:** the working model is central to trust and proof, but it does not establish unlimited capacity, organizational redundancy, maturity, or commercial success.

## Decision 8: Use Flexible Semantic Destinations Instead Of Fixed Primary Labels

- **Status:** supersedes the prior decision fixing `Products / How it works / Alarisa` as permanent primary semantics.
- **Decision:** require direct discovery of Brand/Home, current commercial entry points, current work and systems, Journal/Events, how the work is made, and a distinct commercial action. Allow labels, paths, grouping, header-link count, and the prominence of particular offers or systems to evolve under product authority.
- **Rejected alternatives:** preserve legacy personal-site navigation; require a generic Products catalogue before an offer; keep Journal in secondary navigation; freeze MCP, Telegram, or Alarisa as permanent header identity; create separate applications for semantic surfaces.
- **Reasoning:** durable architecture should preserve visitor jobs and relationships, not provisional labels or a catalogue-centered snapshot.

## Decision 9: Separate Foundation, Proof, Systems, And Commercial Objects

- **Status:** revised; supersedes the prior decision that made Alarisa the principal vision and Telegram the singular current concrete offer.
- **Decision:** keep TeqFW as technical North Star, ADSM as complementary methodology, Alarisa as major ongoing proof and long-term product direction, PDE and Desks as working but early external systems or capabilities, books as available knowledge products, Telegram as paid validation, and MCP integration as a provisional near-term engineering entry while product authority supports those statuses.
- **Rejected alternatives:** treat these objects as equivalent catalogue items; make Alarisa the foundation or universal container; present it as market-ready; make Telegram the assumed mature primary offer; make MCP permanent site identity; force every working capability into a product lifecycle.
- **Reasoning:** the objects have different architectural relationships and runtime boundaries. Current commercial priority may change without requiring a site-identity or platform redesign.

## Decision 10: Treat Product-Specific Context As An Optional Transfer Asset

- **Status:** retained.
- **Decision:** allow an agreed delivery to include bounded cognitive context and development guidance for another accountable human-and-agent team while keeping source, deployment, context, ownership, licensing, modification, operation, and support as separate grants.
- **Rejected alternatives:** include all internal context in every delivery; equate source access with development continuity; promise autonomous maintenance; make the site an automated context-transfer service.
- **Reasoning:** context can preserve development intent, but transfer creates confidentiality, rights, competence, authority, update, and support boundaries requiring explicit human control.

## Decision 11: Separate Event Chronology From Current Canonical State

- **Status:** added.
- **Decision:** let Events preserve dated observations and changes while product authority and corresponding current-state surfaces own the latest accepted status. Link the two without allowing publication to change status automatically.
- **Rejected alternatives:** use Journal as the only product-state store; rewrite old Events whenever status changes; infer canonical truth or validation from posting activity.
- **Reasoning:** an inspectable chronology and an unambiguous current state have different lifecycle and correction semantics.

## Decision 12: Preserve All Three Site Responsibilities Without Formal Symmetry

- **Status:** added.
- **Decision:** make Sell, Demonstrate, and Document structurally first-class, give aligned selling immediate operational priority, and avoid encoding equal visual or navigation weight as an architectural invariant.
- **Rejected alternatives:** reduce the site to a catalogue, portfolio, consultancy, archive, technical blog, or single-offer funnel; impose a three-column or equal-link structure merely to signal conceptual equality.
- **Reasoning:** the responsibilities reinforce one another, while the current funding stage and future evidence must be able to change attention without an architecture rewrite.
