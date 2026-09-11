# Architecture Integration

- Path: `ctx/docs/architecture/integration.md`
- Template Version: `20260605`
- Changed: `20260910`

## Purpose

Define stable website integrations, ordinary outbound connections, and the runtime, authority, and trust boundaries between wiredgeese.com and the systems or commercial work it presents.

## Stable Site Integrations

The website architecture integrates with:

- TeqCMS under the `@teqfw/cli` host for rendering and site workflows;
- Node.js for local execution and publication commands;
- Nunjucks-compatible templates for authored page composition;
- source-controlled configuration, templates, and public assets;
- host-level deployment surfaces represented by `bin/` and `etc/`.

These integrations support one multilingual SSR/publication system. The revised product model does not justify replacing the site engine or creating separate applications for commercial, current-work, Journal, or historical surfaces.

## Internal Contracts

- Root package and TeqCMS configuration bind the project namespace, lifecycle plugin, DI replacements, and template engine.
- Request routing resolves locale and canonical route information before page-specific enrichment.
- Template sources produce browser-facing output through the CMS runtime.
- Redirect and routing configuration support intentional preservation and normalization of public URLs.
- Shared navigation and contextual links provide direct discovery among commercial entries, current work, Journal, working-model explanation, and retained knowledge.
- Contact provides a context-aware route to human conversation without creating a server-side sales pipeline or customer database by default.

Detailed implementation contracts belong in code documentation when durable and current.

## Outbound Links Are Not Runtime Integrations

The site may expose ordinary links to:

- the Work with Alex and Contact paths for new-product or existing-PDE-capability conversations;
- PDE, Telegram Desk, Shared Files Desk, TeqCMS, Alarisa, and other current-work, product, or evidence destinations;
- `teqfw.com` for primary TeqFW depth;
- confirmed book sellers such as Leanpub or the browser-book publisher;
- public artifacts, repositories, communication channels, and other approved evidence.

An outbound link neither transfers authority nor creates a runtime dependency beyond ordinary web navigation. External purchase destinations do not make wiredgeese.com a payment processor. Public evidence links do not make it an evidence store or owner of the referenced system.

## Product And Customer Runtime Boundary

The following remain outside the website integration boundary unless a separately approved architecture creates them:

- MCP servers delivered for customers and interaction with customer services or APIs;
- PDE and Desk runtimes;
- Telegram authentication, sessions, messages, channel data, and publishing authority;
- Shared Files storage and access grants;
- customer identities, credentials, private resources, logs, and operational data;
- product deployment, monitoring, updates, termination, support, and incident handling;
- customer VPS access or managed hosting.

Demonstrating PDE and Desks does not make the site their host or give it their credentials or sessions. A new-product conversation does not change these runtime boundaries.

## Commercial Handoff Boundary

The public site may carry `product` or `pde` origin context into a direct contact action. Human-controlled qualification and agreement establish scope, price, acceptance, deployment, credentials, confidentiality, evidence disclosure, rights, support, and stopping conditions before sensitive access or external delivery begins.

No particular form, payment, CRM, scheduling, analytics, or provisioning system is implied. A later integration must have an explicit owner, minimum data boundary, retention and revocation semantics, and upstream approval.

## Cognitive-Context Transfer Boundary

An agreed delivery may include source, configuration and deployment knowledge, and bounded product-specific cognitive context for continued human-directed, AI-agent-assisted development. This is a transfer between accountable parties, not a runtime integration with wiredgeese.com.

The delivered context must be intentionally selected. It must not implicitly include unrelated Wired Geese strategy, other customer material, credentials, third-party restricted content, or access to Alex's live internal source of truth. A snapshot, separately owned repository, and ongoing collaboration have different state and authority semantics; none is selected automatically.

The receiving human owner controls goals, acceptance, credentials, permissions, and consequential changes after transfer. AI-agent access conveys only the technical capability authorized within that receiving boundary.

## Trust And Authority

Any future website behavior involving credentials, private resources, deployment administration, payment, product provisioning, or customer records would transfer materially more authority than an ordinary contact or outbound link. It must be minimized, documented upstream, and approved before implementation.

MCP, Telegram, external sellers, agent environments, and third-party services do not become secure, compliant, supported, reliable, endorsed, or owned by Wired Geese merely because they are linked or used in an external delivery.

## Retired Integration

The former GitHub Flows landing form, offer-specific token injection, repository-validation fields, and mail pipeline are retired implementation only. They are not current integrations or reusable contracts.

## Change Rule

New runtime integrations, customer-data owners, automated payment or provisioning, analytics or CRM dependencies, managed product operation, or synchronized context-transfer services require explicit product need and architecture review. Current offers, systems, Journal links, book destinations, and public evidence references may evolve without being hard-coded as permanent runtime dependencies.
