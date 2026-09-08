# Architecture State

- Path: `ctx/docs/architecture/state.md`
- Template Version: `20260605`
- Changed: `20260908`

## Purpose

Define sources of truth and state ownership for the target site while separating website state from promoted-product and customer state.

## Authoritative State

- `ctx/` is authoritative for product meaning and engineering guidance.
- `tmpl/`, source-controlled assets, source code, and configuration are authoritative for approved implementation inputs.
- Commercial agreements and confirmed customer delivery records are human-controlled business truth outside generic site analytics.
- Each PDE deployment owns its operational configuration, credentials, grants, and customer data within the deployment boundary agreed with that client.

## Derived And Ephemeral State

- `web/` contains derived publication output.
- render data, normalized route information, and publication command state are ephemeral site state.
- runtime secrets required by existing site forms may exist outside version control, but they do not define product truth.
- traffic or contact-intent observations, if approved, are diagnostic evidence rather than proof of revenue or validation.

## Ownership Boundaries

- Site runtime code may render product information and accept an approved contact request; it does not own product strategy.
- The website must not own Telegram session credentials, Telegram content, PDE configuration, or customer AI-system grants unless a later architecture decision explicitly creates and governs that responsibility.
- Credential ownership, administrative access, configuration storage, updates, and revocation for a customer deployment belong to the commercial agreement and that deployment's own context.
- Alex or the client may operate deployment state only within the authority explicitly granted for that arrangement.

## Commercial Truth

Visits, page events, submitted forms, and marketplace messages do not by themselves prove a qualified customer, payment, delivery, reusable capability, or product demand.

Early commercial validation requires evidence from external paying customers and completed setups. Human confirmation remains authoritative unless a separately approved trusted business system is introduced.

## Change Discipline

New persistent site state, customer credential storage, automated provisioning, CRM-like records, payment authority, or cross-system identity require explicit product and architecture approval before environment or code documentation may define them.

Legacy state used only by the discontinued GitHub funnel may remain in current code temporarily, but it has no target-state authority.
