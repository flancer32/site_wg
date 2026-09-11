# Practitioner Positioning

- Path: `ctx/docs/product/practitioner-positioning.md`
- Template Version: `20260911`
- Changed: `20260911`

## Canonical Position

Alex Gusev is an experienced software practitioner who develops, uses, and continuously tests his own approach to building software with AI agents. He does not claim to teach a universal correct method for agent-driven development or to define industry best practices for everyone else.

His authority in this area comes from repeatedly building and evolving real software, observing the consequences, correcting failed assumptions, and taking responsibility for the resulting systems. The current approach is an accountable engineering practice under active development, not a finished doctrine.

The canonical question is therefore not "what should every team do with AI agents?" but "how does Alex currently build with agents, what has that practice produced, and what does it allow him to build next?"

## How Alex Works

Manual code writing remains available when useful, but it is no longer Alex's primary interface to software development. He works mainly by directing AI agents inside explicit engineering boundaries.

Alex defines goals, desired behavior, architecture, constraints, and acceptance boundaries; maintains contextual documentation; decomposes and authorizes work; reviews agent results; detects incorrect assumptions; corrects context, tools, architecture, or process; verifies behavior; and decides what to accept or reject. Agents perform much of the direct analysis, code production, testing, documentation, and other explicitly authorized work. Alex retains intent, integration responsibility, consequential decisions, acceptance, and accountability.

This must never be reduced to "AI writes the code for Alex." Nor does agent participation imply autonomous delivery, agent ownership, or an absence of human engineering judgment.

## Practice Feedback Loop

Theory, architecture, documentation, tools, and methodology are control instruments for practical software development. They arise from practice and return to it through a continuing loop:

```text
build -> observe -> understand -> document -> change the approach -> build again
```

Working products, repositories, product decisions, failures, corrections, and accumulated development practice are the primary evidence in this loop. Documentation records the present model, exposes limits and decisions to agents and humans, and makes the next iteration more controlled; it is not detached theorizing or proof that the model is universally correct.

## ADSM And TeqFW

ADSM is the development-management methodology Alex has developed to make his own agent-driven work more controlled, reproducible, inspectable, and effective. It is derived from this practice and changes when practical results warrant change. It may be useful to others, but neither its use nor its documentation establishes a universal correct methodology.

TeqFW expresses Alex's opinionated engineering philosophy and is tested through repeated use in the systems he builds. Alex believes this foundation is right for those systems and accepts responsibility for that choice. It does not establish that every other architecture is wrong or that all teams should adopt the same platform.

## Proof By Construction

The strongest proof that Alex understands agent-driven software development is that he repeatedly uses agents to build and evolve real software. Supported examples include Alarisa, PDE and its Desks, TeqFW, TeqCMS, Mindstream, wiredgeese.com, and the other current systems recorded in `software-estate.md`.

These are evidence of sustained practical construction, not claims of maturity, adoption, scale, market success, superior productivity, or customer outcomes. `journal-and-evidence.md` remains authoritative for what a particular artifact, observation, or commercial result can prove.

## Commercial Meaning

This practice has concrete client value: Alex can apply an accumulated engineering system to turn a client's product idea into working software. He brings practical control over architecture, context, agent work, verification, integration, and iterative evolution while the client brings the business problem, domain knowledge, required capabilities, and real constraints.

Clients hire Alex to build products through that system, not to receive generic AI-agent adoption advice, a universal agent workflow, or best-practice consulting. The field remains young and Alex's approach remains under active refinement; accumulated practice is nevertheless sufficient to create accountable, concrete product-building value now. `commercial-positioning.md` governs the resulting offer boundary.

## Public Content Boundary

Wired Geese should favor showing what is being built and what was learned while building it over prescribing how everyone should develop software. Useful evidence includes a delivered capability, architectural decision, agent experiment, failed assumption, contextual correction, or changed workflow and its observed result.

The site may explain ideas deeply, but its epistemic stance is "this is what Alex observed and how he currently works," not "this is the correct way everyone should work." Strong personal engineering convictions are allowed; unsupported universal prescriptions, guru framing, thought-leadership claims, and claims of definitive agent-development expertise are not.
