# Architecture Integration

- Path: `ctx/docs/architecture/integration.md`
- Template Version: `20260605`
- Changed: `20260701`

## Purpose

Describe external integrations and major internal contracts between architectural blocks.

## External Integrations

The architecturally significant external integrations are:

- TeqCMS as the site engine used for rendering and translation-oriented workflows;
- Node.js as the runtime for local execution and publication commands;
- public external sites linked as product destinations;
- optional manual commercial surfaces such as email contact and Fiverr for payment or escrow paths;
- SMTP email delivery for programmatic form submission from commercial landing pages;
- host-level deployment surfaces implied by `bin/` and `etc/`, including service and redirect configuration artifacts.

## Internal Contracts

The major internal contract surfaces are:

- the contract between `teqcms.config.mjs` and `src/`, where the project replaces the generic CMS adapter with repository-specific behavior;
- the contract between request routing and multilingual template content, where locale extraction selects the rendered content branch;
- the contract between validation landing-page content and first-party funnel logging, where event payloads must stay bounded and non-sensitive;
- the contract between the landing page and funnel-event naming, where the stable page identifier for this offer is `github-agent-orchestration-poc`;
- the contract between browser-side page interactions and a first-party event endpoint such as `/funnel/evt`, where requests should be fire-and-forget and return only a minimal success status;
- the contract between browser-side event delivery and the backend, where `navigator.sendBeacon()` is preferred for non-blocking event delivery and `fetch(..., {keepalive: true})` is the fallback;
- the contract between first-party event requests and ordinary web-server access logs, where raw log lines may later be parsed into weekly aggregate counts;
- the contract between the landing-page form and the email delivery endpoint (`POST /api/send-email`), where the browser sends form data as `application/x-www-form-urlencoded` and expects a JSON response with `{ok: boolean}`;
- the contract between the email handler and the SMTP server, where `nodemailer` delivers a composed HTML email using `EMAIL_*` environment variables for transport authentication and recipient routing;
- the contract between template sources and the publication block, where TeqCMS materializes browser-facing output into `web/`.

The product-level integration chain described by the landing page is also architecturally significant as a documented boundary model:

- GitHub issue event as the first event source;
- webhook delivery into `github-flows-app`;
- workflow decision before agent execution;
- containerized agent runtime as the first execution environment;
- LLM, prompt, and tool selection inside the agent run;
- GitHub labels and issue comments as the first visible result surface;
- run evidence such as execution status, runtime, token usage, and sanitized logs.

These components are described as replaceable parts of one orchestration pattern.
That does not imply the site repository already implements alternative event platforms or runners.

## Boundary Rules

- New runtime integrations must be documented here before they become durable implementation assumptions.
- SMTP credentials and recipient addresses are configured via environment variables (`EMAIL_*` prefix) and must not be tracked in the repository.
- Internal contract descriptions must stay at boundary level rather than module-by-module API detail.
- Manual commercial integrations are acceptable as bounded links or operator workflows; automated payment or CRM integrations require explicit review.
- Product destinations may evolve, but new categories of external dependency require architectural review.
- Access logs may be used as raw funnel evidence for approved first-party event requests, but that does not authorize a full analytics or customer-data platform.
