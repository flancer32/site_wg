# Environment Overview

- Path: `ctx/docs/environment/overview.md`
- Template Version: `20260605`
- Changed: `20260709`

## Purpose

Describe the runtime and operational environment required by the system.

## Runtime Model

The project currently assumes two main execution environments:

- a local Node.js environment for site generation, translation, and repository maintenance;
- a Linux host environment for long-running site serving through `npx teq-cms web`.

For the hosted orchestration PoC validation flow, the current site-environment assumption should remain minimal:

- the site already includes backend support for form submission;
- first-party funnel events should be delivered to the backend through a local endpoint rather than through third-party analytics by default;
- backend-side logging for form submission and funnel events must remain subordinate to the static-site architecture and approval boundaries documented above this level.

The product context may describe a broader hosted PoC environment involving GitHub webhooks, `github-flows-app`, containerized agent execution, and bounded model usage.
Within this repository, those elements remain documented product and architecture context unless and until this site itself needs runtime support for them.

## External Dependencies

The stable external prerequisites are:

- Node.js `>=20`, as declared in `package.json`;
- npm-compatible dependency installation for `@flancer32/teq-cms` and `nunjucks`;
- shell access sufficient to run `npx teq-cms web` and `npx teq-cms translate`;
- a Linux service environment compatible with the current `systemd` unit and log rotation assets under `etc/`.

The current lead-form protection also assumes one of these secret sources:

- `WG_FORM_TOKEN_SECRET` provided through the host environment; or
- writable local runtime storage under `var/` for a generated fallback secret.

The development helper script under `bin/deploy/dev.sh` additionally assumes GitHub network access for cloning linked development dependencies.

Optional commercial-path dependencies may include:

- email delivery through the operator's normal contact channel;
- Fiverr as an optional escrow or payment-link path.

Third-party analytics platforms are not an environment requirement for this funnel.

## Environment Constraints

The environment must respect these stable constraints:

- runtime assumptions must remain compatible with Node.js and the TeqCMS-based execution model;
- operational configuration under `etc/` must stay environment-specific and must not replace product or architecture truth;
- new lead-capture or funnel-logging runtime pieces must remain small, reviewable, and justified by the validation experiment;
- local-first analytics is preferred: first-party backend intake plus local logs before any external analytics dependency is considered;
- runtime secret files under `var/` must stay outside version control and remain readable only to the service user where practical;
- deployment-specific paths, service users, and host logging behavior may vary by host, but any new class of runtime dependency should be documented before it becomes a durable requirement.
