# Architecture Behavior

- Path: `ctx/docs/architecture/behavior.md`
- Template Version: `20260605`
- Changed: `20260630`

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
The project adapter resolves locale-aware routing, applies redirect logic, requests render data from the CMS adapter, and conditionally injects blog-index data for blog index routes.
Ends when render data is returned for page rendering or when redirect handling terminates the original request path.

### Conversion-validation flow

Starts when a visitor arrives on a validation landing page or follows a CTA toward a bounded commercial next step.
In the current model, the page communicates the offer and may direct the visitor to a programmatic form submission handled by the backend.
The form POSTs to `/api/send-email`; the email handler (`App_Back_Web_Handler_SendEmail`) composes the form data into an HTML email and delivers it via SMTP to the site owner.
Ends when the email is queued for delivery, the visitor receives a success confirmation, or an error is returned to the browser.

The dominant product meaning behind the current validation flow is a hosted PoC for event-driven AI-agent orchestration, with the Agent Orchestration PoC landing page as the first live form submission surface.
The site does not execute that orchestration loop itself, but it must describe the loop consistently:

`GitHub issue event -> webhook -> github-flows-app -> workflow decision -> containerized agent runtime -> LLM/tools/prompt -> GitHub label/comment result -> new observable GitHub event -> run report`

## Failure And Recovery

Architectural failure handling is intentionally narrow:

- missing blog index input is tolerated when it results only in `ENOENT`;
- unexpected blog aggregation failures are logged rather than normalized silently;
- validation-funnel evidence must fail safely by omission rather than by over-collecting sensitive repository or payment data;
- public product wording must fail toward narrower claims rather than overpromising unsupported integrations or unlimited runtime;
- redirect and route-normalization logic must fail visibly rather than fork product meaning into duplicate routes.

## Product Dependency

These flows exist to realize the documented product behavior of the site.
If that behavior changes materially, the flows must be revalidated against product documentation before implementation changes proceed.
