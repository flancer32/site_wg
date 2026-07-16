# Architecture Behavior

- Path: `ctx/docs/architecture/behavior.md`
- Template Version: `20260605`
- Changed: `20260716`

## Purpose

Describe major internal architectural flows and processing behavior.

## Major Flows

The current architecture has these major flows:

- content-authoring flow from cognitive context and templates into repository changes;
- publication flow from template and asset sources into rendered output under `web/`;
- request-time rendering flow through TeqCMS with project-specific adapter logic;
- a conversion-validation flow for narrow commercial landing pages when such pages exist.

## Flow Boundaries

### Content-authoring flow

Starts when a human or agent changes product documents, prompt assets, or template sources under `ctx/` or `tmpl/`.
Ends when that durable source material is committed as project truth.

### Publication flow

Starts from template, asset, and configuration sources.
TeqCMS translates them into publishable artifacts under `web/`.
Ends when browser-facing files such as HTML, CSS, images, and `sitemap.xml` exist in the publication block.

### Request-time rendering flow

Starts from an inbound HTTP request handled by TeqCMS.
The project adapter resolves locale-aware routing, applies redirect logic, requests render data from the CMS adapter, derives trusted-origin localized metadata, classifies route state, and conditionally injects blog-index or form-token data.
Ends when render data is returned for page rendering or when the final site handler returns a localized not-found surface with HTTP status `404`.

### Conversion-validation flow

Starts when a visitor arrives on a validation landing page or follows a CTA toward a bounded commercial next step.
In the current model, the page communicates the offer, may emit local-first funnel events to the backend, and may submit the request form to the backend.
Before submission, the landing page receives a server-generated signed `form_token` during SSR render.
The form POSTs to `/api/send-email`; the email handler (`App_Back_Web_Handler_SendEmail`) verifies the token, validates `repository_url` as a GitHub repository URL, composes the accepted form data into an HTML email, and delivers it via SMTP to the site owner.
Funnel events should use a fire-and-forget browser delivery pattern such as `navigator.sendBeacon()` where appropriate, with `fetch(..., {keepalive: true})` as a fallback when Beacon is unavailable or unsuitable.
Ends when accepted form submission is acknowledged by the backend, event logging completes on a best-effort basis, or an error is returned to the browser for the submission path.

The dominant product meaning behind the current validation flow is a hosted PoC for event-driven AI-agent orchestration, with the Agent Orchestration PoC landing page as the first live form submission surface.
The site does not execute that orchestration loop itself, but it must describe the loop consistently:

`GitHub issue event -> webhook -> github-flows-app -> workflow decision -> containerized agent runtime -> LLM/tools/prompt -> GitHub label/comment result -> new observable GitHub event -> run report`

## Failure And Recovery

Architectural failure handling is intentionally narrow:

- missing blog index input is tolerated when it results only in `ENOENT`;
- unexpected blog aggregation failures are logged rather than normalized silently;
- malformed or unresolved HTML routes fail into a localized noindex 404 surface rather than an empty or host-dependent response;
- public canonical metadata trusts only validated runtime configuration and never inbound host or forwarding headers;
- validation-funnel evidence must fail safely by omission rather than by over-collecting sensitive repository or payment data;
- public product wording must fail toward narrower claims rather than overpromising unsupported integrations or unlimited runtime;
- redirect and route-normalization logic must fail visibly rather than fork product meaning into duplicate routes.

## Product Dependency

These flows exist to realize the documented product behavior of the site.
If that behavior changes materially, the flows must be revalidated against product documentation before implementation changes proceed.
