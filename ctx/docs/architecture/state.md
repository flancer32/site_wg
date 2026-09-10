# Architecture State

- Path: `ctx/docs/architecture/state.md`
- Template Version: `20260605`
- Changed: `20260910`

## Purpose

Define sources of truth and state ownership for the target site while separating website state from promoted-product and customer state.

## Authoritative State

- `ctx/` is authoritative for product meaning and engineering guidance.
- `tmpl/`, source-controlled assets, source code, and configuration are authoritative for approved implementation inputs.
- Commercial agreements and confirmed customer delivery records are human-controlled business truth outside generic site analytics.
- Each PDE deployment owns its operational configuration, credentials, grants, and customer data within the deployment boundary agreed with that client.

The repository's live `ctx/` is authoritative for Wired Geese development. A delivered cognitive-context snapshot or separately transferred repository becomes an engineering asset within the receiving boundary defined by the agreement; it is not automatically a shared mutable reference to Wired Geese's ongoing internal context.

## Derived And Ephemeral State

- `web/` contains derived publication output.
- render data, normalized route information, and publication command state are ephemeral site state.
- The current website/contact architecture has no server-side form pipeline and therefore requires no form-delivery runtime secrets.
- traffic or contact-intent observations, if approved, are diagnostic evidence rather than proof of revenue or validation.

## Ownership Boundaries

- Site runtime code may render product information and provide a direct-contact handoff; it does not own product strategy.
- The website must not own Telegram session credentials, Telegram content, PDE configuration, or customer AI-system grants unless a later architecture decision explicitly creates and governs that responsibility.
- Credential ownership, administrative access, configuration storage, updates, and revocation for a customer deployment belong to the commercial agreement and that deployment's own context.
- Alex or the client may operate deployment state only within the authority explicitly granted for that arrangement.
- Source-code access, cognitive-context access, continued-development rights, and operational authority are separate grants. Possession of one does not imply the others.

## Commercial Truth

Visits, page events, submitted forms, and marketplace messages do not by themselves prove a qualified customer, payment, delivery, reusable capability, or product demand.

Early commercial validation requires evidence from external paying customers and completed setups. Human confirmation remains authoritative unless a separately approved trusted business system is introduced.

Alex's personal operation of software developed along the Alarisa direction and of PDE, together with selected installations for close or experimental users, is practical-use evidence. It must remain distinguishable from commercial evidence and must not be promoted into claims of market demand, mature support, production-grade security, or repeatable external deployment.

## Change Discipline

New persistent site state, customer credential storage, automated provisioning, CRM-like records, payment authority, or cross-system identity require explicit product and architecture approval before environment or code documentation may define them.

Any future synchronized context-sharing or automated handoff service would create new state ownership, confidentiality, update, conflict, and revocation responsibilities. It requires separate product and architecture approval and must not be inferred from the optional transfer model.

State formerly associated with the discontinued GitHub funnel is retired. It has no current website runtime owner or target-state authority.
