# Environment Overview

- Path: `ctx/docs/environment/overview.md`
- Template Version: `20260605`
- Changed: `20260910`

## Purpose

Define durable runtime and operational assumptions for wiredgeese.com while keeping product-delivery environments outside the site boundary.

## Website Runtime

The site currently assumes:

- a local Node.js environment for site generation, translation, validation, and repository maintenance;
- a Linux host environment for long-running site serving through `npm start` and the `@teqfw/cli` host;
- the TeqCMS-based rendering and publication model documented at architecture level;

The stable external prerequisites include:

- Node.js `>=20`, as declared in `package.json`;
- npm-compatible dependency installation;
- shell access sufficient for documented repository commands;
- a Linux service environment compatible with current operational assets under `etc/`;
- a valid public base URL supplied through `TEQ_CMS__BASE_URL`, with the documented production fallback;

Template locale settings use the `TEQFW_TMPL__*` namespace, web transport settings use `TEQFW_WEB__*`, and CMS-specific settings use `TEQ_CMS__*`.

## Product-Delivery Boundary

PDE, MCP access, Telegram sessions, Shared Files, and client-specific product deployments are not website runtime dependencies.

The site may sell or explain those capabilities while the corresponding runtime operates on:

- a client's existing VPS;
- a VPS controlled by the client;
- a dedicated host provisioned for the engagement;
- a host controlled by Alex when separately agreed.

This list describes possible product-level arrangements, not a website deployment topology or a promise that every option is routinely supported.

Environment documentation for a concrete PDE deployment belongs with that product or delivery context after its boundaries are agreed. It must not be invented here.

## Credential And Configuration Boundary

Website environment configuration must not become an implicit store for Telegram credentials, PDE secrets, customer AI-system grants, channel data, or client VPS access.

For each future product delivery, deployment location, credential ownership, administrative access, configuration storage, update responsibility, and termination or revocation procedure require explicit agreement before environment-specific instructions are created.

## Commercial Operations

Early qualification, pricing, payment confirmation, deployment agreement, and delivery validation may remain manual. No CRM, payment integration, automated provisioning, telemetry funnel, or managed-hosting control plane is an environment requirement.

Ordinary access logs and direct-contact conversations may remain operational evidence. They do not establish commercial validation or revenue truth.

## Environment Constraints

- Runtime configuration remains subordinate to product and architecture context.
- Secrets remain outside version control and are scoped to the runtime that needs them.
- New classes of site dependency require documentation and approval before they become durable requirements.
- Local development must not require live PDE, Telegram, customer credentials, or product-delivery infrastructure.
- The retired GitHub offer creates no current environment requirement and must not be generalized into future environment rules.
