# Agent Orchestration PoC Funnel

- Path: `ctx/docs/product/offers/agent-orchestration-poc/funnel.md`
- Template Version: `20260630`
- Changed: `20260630`

## Purpose

Define the minimal first-version funnel for `Agent Orchestration PoC`.

## Accepted Funnel Events

The accepted first-version funnel events are:

- `page_view`
- `workflow_seen`
- `scope_seen`
- `safety_seen`
- `cta_click`
- `form_start`
- `form_submit`

No additional browser-level funnel events are part of the accepted first version.

## Funnel Reading

The primitive reading path is:

`page_view -> workflow_seen -> scope_seen -> safety_seen -> cta_click -> form_start -> form_submit`

This funnel is only for early validation of page movement and request intent.

## Event Boundary

This document does not define:

- analytics transport architecture;
- runtime event endpoint design;
- later commercial states such as payment or delivery truth.

Those concerns belong elsewhere if they are implemented later.
