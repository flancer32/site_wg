# Architecture Integration

- Path: `ctx/docs/architecture/integration.md`
- Template Version: `20260605`
- Changed: `20260908`

## Purpose

Define the site's external integrations, internal contracts, and boundary with products promoted through the site.

## Site Integrations

The stable site integrations are:

- TeqCMS under the `@teqfw/cli` host for rendering and site workflows;
- Node.js for local execution and publication commands;
- Nunjucks-compatible templates for authored page composition;
- SMTP for existing programmatic form-to-email delivery;
- public external destinations used as evidence, communication, or product references;
- host-level deployment surfaces represented by `bin/` and `etc/`.

These are website integrations. They do not make the website a host for the products it sells.

## Internal Contracts

- Root package and TeqCMS configuration bind the project namespace, lifecycle plugin, DI replacements, and template engine.
- Request routing resolves locale and canonical route information before page-specific enrichment.
- Template sources produce browser-facing output through the CMS runtime.
- Redirect configuration supports intentional preservation and normalization of public URLs.
- Contact delivery sends approved page input to the operator without becoming a general customer database.

Detailed implementation contracts remain in the code documentation when they are durable and current.

## PDE Commercial Boundary

The site may describe a PDE capability and route a visitor to a commercial conversation. The following are outside the website integration boundary unless separately approved:

- MCP interaction with a customer's AI system;
- Telegram authentication, sessions, messages, and publishing authority;
- Shared Files storage;
- PDE deployment, monitoring, updates, and termination;
- client VPS access or managed hosting.

These responsibilities belong to PDE and to client-specific delivery arrangements. Selling an external capability does not imply runtime coupling to the selling site.

## Trust And Authority

Any future website interaction involving credentials, private resource identifiers, deployment administration, or product provisioning would transfer materially more authority than an ordinary contact request. It must be documented upstream, minimized, and approved before implementation.

The current offer therefore favors a human agreement on deployment and credential boundaries before sensitive access is requested.

## Legacy Integration Drift

The current code may still contain a GitHub-offer landing form, offer-specific token injection, and fields tied to repository validation. Those are implementation remnants of a discontinued direction. They must not be treated as reusable contracts for the Telegram offer.

## Change Rule

New runtime integrations, automated payment or provisioning, external analytics, CRM dependencies, or customer-data owners require explicit architectural review. Product destinations and ordinary evidence links may evolve without becoming runtime dependencies.
