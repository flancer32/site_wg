# Architecture Constraints

- Path: `ctx/docs/architecture/constraints.md`
- Template Version: `20260605`
- Changed: `20260630`

## Purpose

Record non-negotiable architecture restrictions and trust boundaries.

## Core Constraints

The architecture must preserve:

- cognitive context under `ctx/` remains the authoritative knowledge space above implementation;
- the site remains primarily a template-driven multilingual publication system rather than a large custom application;
- `web/` remains a derived publication artifact, not an independent authored source of truth;
- funnel data remains operational validation evidence rather than product truth;
- any future `pageViewId` or equivalent funnel correlation key remains single-page, memory-only state rather than persistent visitor identity;
- any future funnel reading remains primitive and low-traffic rather than evolving into a full analytics platform by default;
- the hosted PoC must remain a controlled sandbox with bounded issue count, event count, concurrency, runtime, and token use rather than reading as unlimited hosted agent execution;
- project-specific backend code stays thin and justified by concrete gaps in generic CMS behavior.

## Boundary Constraints

Architecture must not:

- redefine product meaning that already belongs to `ctx/docs/product/`;
- put repository contents, secrets, tokens, private code, or payment-sensitive data into analytics events or generic funnel logs;
- put email, name, GitHub repository URL, issue contents, or any long-term visitor identifier into generic funnel-event URLs or payloads;
- hide new persistent state inside runtime or generated artifacts;
- introduce third-party trackers, persistent databases, payment integrations, or lead-storage expansion without explicit approval;
- introduce fingerprinting, cross-visit tracking, cookies for funnel tracking, or `localStorage` / `sessionStorage` correlation without explicit approval;
- introduce heatmaps, mouse tracking, scroll-percentage telemetry, long-term journey tracking, or other high-granularity behavioral surveillance without explicit approval;
- imply implemented support for GitLab, Atlassian/Jira, non-Docker runners, arbitrary buyer-provided keys, or unlimited multi-agent hosting when those are only described as replaceable pattern components;
- normalize deployment-specific assumptions into product or architecture truth without explicit documentation.

## Change Constraints

These changes always require human approval:

- introducing new architectural owners or major runtime areas;
- introducing new persistent state or database-backed authority;
- introducing new external integrations or publication dependencies;
- introducing automated payment handling, CRM-like lead storage, or third-party tracking;
- turning generated site output into a primary editable source.
