# Environment Overview

- Path: `ctx/docs/environment/overview.md`
- Template Version: `20260605`
- Changed: `20260629`

## Purpose

Describe the runtime and operational environment required by the system.

## Runtime Model

The project currently assumes two main execution environments:

- a local Node.js environment for site generation, translation, and repository maintenance;
- a Linux host environment for long-running site serving through `npx teq-cms web`.

## External Dependencies

The stable external prerequisites are:

- Node.js `>=20`, as declared in `package.json`;
- npm-compatible dependency installation for `@flancer32/teq-cms` and `nunjucks`;
- shell access sufficient to run `npx teq-cms web` and `npx teq-cms translate`;
- a Linux service environment compatible with the current `systemd` unit and log rotation assets under `etc/`.

The development helper script under `bin/deploy/dev.sh` additionally assumes GitHub network access for cloning linked development dependencies.

## Environment Constraints

The environment must respect these stable constraints:

- runtime assumptions must remain compatible with Node.js and the TeqCMS-based execution model;
- operational configuration under `etc/` must stay environment-specific and must not replace product or architecture truth;
- deployment-specific paths, service users, and host logging behavior may vary by host, but any new class of runtime dependency should be documented before it becomes a durable requirement.
