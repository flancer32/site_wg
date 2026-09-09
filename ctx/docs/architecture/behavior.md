# Architecture Behavior

- Path: `ctx/docs/architecture/behavior.md`
- Template Version: `20260605`
- Changed: `20260909`

## Purpose

Describe the stable site flows required by the target product model.

## Authoring Flow

Product meaning is accepted in `ctx/docs/product/`, propagated through architecture, environment, and code context, and only later expressed in templates and implementation.

The flow ends when normative context and authored public sources are consistent. Generated output does not feed product meaning back upstream.

## Publication Flow

Template, asset, and configuration sources are rendered or served through TeqCMS and the project adapter. Browser-facing artifacts under `web/` remain derived output.

The commercial repositioning must preserve locale parity and must not bypass the established authored-source chain.

## Request-Time Flow

An inbound request is normalized, resolved to a locale-aware authored route, enriched with bounded project data where justified, and rendered through the shared site shell. Unresolved HTML requests return the localized not-found surface.

Offer-specific runtime enrichment is not a default requirement. It needs an approved page and interaction contract at higher levels before code-level design.

## Commercial Handoff Flow

The target commercial behavior is:

`visitor recognizes a problem -> sees a concrete outcome -> evaluates fit, evidence, and honest boundaries -> understands maker responsibility where useful -> chooses a commercial action -> Alex and the client agree scope, price, deployment, and trust boundaries outside the public page`

The website supports understanding and contact. It does not need to provision PDE, collect Telegram credentials, automate payment, or execute customer workflows.

The main discovery flow enters through Home or a direct offer route and moves among Products, the Telegram offer, Custom Development, the commercial action, and supporting Alarisa, Technology, or About detail without requiring traversal of historical taxonomy, biography, or Alarisa internals first. Technical depth, maker identity, R&D lineage, and retained proof support the decision after buyer value is clear.

The secondary discovery flow enters through Resources, footer navigation, contextual and related-content links, direct inbound URLs, or search access and then reaches Project archive, Library, Journal, Books, and selected evidence. It supports evidence and exploration without competing equally with active commercial actions.

## Preservation Flow

Before a future implementation changes routes or removes public material:

1. inventory affected URLs and content;
2. identify search, backlink, reference, and historical value;
3. choose keep, repurpose, redirect, archive-access, or reviewed removal;
4. define at least one meaningful internal discovery path for retained material;
5. implement locale-consistent routing and metadata;
6. verify the old and new public paths and internal reachability as appropriate.

This preservation flow protects useful public value without keeping discontinued offers commercially active.

## Failure Boundaries

- Product claims fail toward narrower, verifiable statements.
- Experimental system, capability, product, and offer statuses remain distinguishable when evidence is incomplete.
- Missing commercial automation falls back to direct human contact rather than invented workflow.
- Route changes fail toward preserving access or an intentional redirect rather than silent disappearance.
- Retained content fails toward a coherent secondary or contextual path rather than an orphaned URL.
- The website must not collect PDE or Telegram credentials as a shortcut around an undefined delivery process.

## Legacy Drift

The implementation may still contain a GitHub orchestration landing flow, signed token enrichment, dedicated form fields, and related event assumptions. These are not target behavior and must not be expanded or rebuilt. Their implementation retirement is outside this documentation-only task.
