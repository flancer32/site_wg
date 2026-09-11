# Architecture Overview

- Path: `ctx/docs/architecture/overview.md`
- Template Version: `20260605`
- Changed: `20260911`

## Purpose

Provide the entry point to the target architecture of wiredgeese.com and identify the authority and runtime boundaries that govern the rest of this branch.

## Architecture Role

wiredgeese.com remains one multilingual, content-oriented TeqCMS site that is primarily rendered and published through SSR behavior with a thin project-specific Node.js adapter.

The site is the public and commercial surface of the Wired Geese model: one accountable human maker, Alex Gusev, working with hired AI agents. Architecture must make all three product responsibilities structurally realizable:

- `SELL` — direct access to truthful current commercial entry points and a human commercial handoff;
- `DEMONSTRATE` — inspectable current systems, capabilities, development, and proof;
- `DOCUMENT` — a first-class Journal/Event evidence stream connected to current status.

All three are first-class responsibilities, but architecture does not impose equal visual space, navigation weight, or implementation effort. During the current funding stage, aligned selling has immediate operational priority. Demonstration and documentation remain directly discoverable because they compound evidence, trust, acquisition value, and future commercial strength.

wiredgeese.com is also part of Alex's own software estate and is developed through the same human-directed work with AI agents that it describes. The site therefore contributes working evidence that the model is practiced, while `../product/overview.md` and `../product/journal-and-evidence.md` remain authoritative for the meaning and limits of that evidence.

Development-time agent participation is distinct from production-runtime behavior. Agents may help Alex inspect, design, implement, test, verify, document, and prepare or perform explicitly authorized operations for the site; Alex retains intent, consequential decisions, acceptance, and accountability. This does not require every implementation action to be agent-generated or place autonomous agents inside the public website runtime.

## Architectural Style

The stable publication flow is:

`authoritative context -> authored templates and assets -> TeqCMS plus thin project adapter -> SSR or published browser output`

The revised product model changes semantic surfaces, visitor paths, and evidence relationships. It does not authorize a new site engine, separate applications for those surfaces, or incorporation of promoted-product runtimes into the website process.

The public system must support direct discovery of current commercial entries, current work, Journal/Events, the working model, and a distinct commercial action. Brand/Home, About, books, durable knowledge, projects, and history remain intentionally reachable according to their product responsibilities. These are semantic capabilities, not frozen labels, routes, link counts, or a required symmetrical navigation layout.

## Product Translation Boundary

Architecture consumes rather than restates the product model:

- `../product/overview.md` owns site identity, foundation, and the three site jobs;
- `../product/practitioner-positioning.md` owns the practitioner-first position, feedback loop, and ADSM/TeqFW epistemic boundaries;
- `../product/product-system.md` owns object kinds and current status;
- `../product/commercial-strategy.md` owns the new-product commercial direction;
- `../product/commercial-positioning.md` owns the canonical proposition, fit, ownership, pricing mechanism, and exclusions;
- `../product/journal-and-evidence.md` owns evidence meaning and Journal semantics;
- `../product/information-architecture.md` owns semantic hierarchy and visitor jobs;
- `../product/home-page-composition.md` owns Home attention and content responsibilities;
- `../product/transferable-development.md` owns its bounded continuation capability.

Architecture defines structural reachability, state separation, runtime boundaries, and durable downstream constraints needed to realize those authorities. It must not fix open product or presentation decisions.

## Major Boundaries

- `ctx/` owns normative product and engineering context.
- `tmpl/` and source-controlled assets own authored public content and composition.
- `src/` plus `teqcms.config.mjs` own thin justified site-specific runtime adaptation.
- `web/` contains derived browser-delivered or generated output.
- `bin/` and `etc/` support site operation without defining product meaning.
- Product and customer deployments own their own data, credentials, operation, and lifecycle outside the wiredgeese.com runtime.
- Human-controlled agreements and confirmed delivery records own commercial truth; traffic and publication do not manufacture validation.

TeqFW is the technical North Star and ADSM the complementary development-management methodology Alex evolves through practice. The architecture must support their product-authorized relationship to Alarisa without presenting either as a universal prescription:

`TeqFW + ADSM -> capacity to build increasingly complex systems -> Alarisa as the most ambitious current ongoing proof`

Detailed TeqFW promotion belongs primarily to `teqfw.com`. Alarisa is a long-term product direction, not the foundation, completed proof, or a market-ready offer. PDE is an independently useful early product within that direction, and its Desks may have their own early deployment path. Selling or demonstrating them does not make the site their runtime.

## Documentation Map

- `structure.md` defines site blocks, semantic surfaces, and page-family relationships.
- `behavior.md` defines publication, visitor, evidence, handoff, preservation, and continuation flows.
- `state.md` defines sources of truth and state ownership.
- `integration.md` defines site integrations, outbound-link semantics, and external-runtime boundaries.
- `constraints.md` defines non-negotiable restrictions.
- `decisions.md` records active durable choices and explicit supersession.
- `supervision.md` defines human-agent governance and drift detection.

## Target And Legacy

This branch is normative for the accepted target architecture. Current implementation is evidence of existing behavior, not authority to preserve superseded semantics.

GitHub Flows and its campaign route are retired. Their campaign form, token enrichment, mail handler, and offer copy are not target architecture; their former URLs must redirect deliberately.
