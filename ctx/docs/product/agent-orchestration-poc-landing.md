# Agent Orchestration PoC Landing

- Path: `ctx/docs/product/agent-orchestration-poc-landing.md`
- Template Version: `20260630`
- Changed: `20260630`

## Purpose

Defines the first publishable landing-page structure for `Agent Orchestration PoC`.

This is a compact landing contract intended for early publication and feedback collection.
It is not the final product page and it is not a full browser-implementation specification.
For the first landing-page implementation, this document is the primary source of truth.
More detailed page-level documents are supporting context and must not expand the first public page into a larger page.

## Landing Objective

The page should help a technical visitor quickly understand the offer, decide whether it is relevant, and move to external contact or request submission.

The page is selling a small paid PoC:

`A small paid proof of concept for controlled GitHub-based AI-agent orchestration.`

## AFKP Framing

The page should follow this AFKP movement:

- `hook` — show the concrete GitHub-based orchestration test immediately;
- `resonance` — show that the visitor's actual uncertainty is whether this is useful before building infrastructure;
- `immersion` — make the workflow, scope, boundaries, and deliverables concrete enough to evaluate;
- `external reflection/contact` — move the visitor into request or discussion.

The page should stay compact.
AFKP is used here to justify sequence and reader movement, not to add theory to the public copy.

## Positioning Rule

The page must help the visitor answer this question:

`Is an event-driven AI-agent workflow useful for my GitHub repository before I invest in a larger custom integration?`

The page must not position the offer as:

- an issue triage bot;
- a generic automation platform;
- a visual workflow builder;
- a Copilot replacement;
- a mature SaaS.

## Page Structure

The first publishable structure should use these sections in order.

### 1. Hero

Purpose:

- deliver the hook immediately;
- state the concrete offer in direct language;
- give the visitor an obvious next step.

Required elements:

- direct headline;
- short subheadline;
- primary CTA.

Working direction:

- headline should say this is a small paid PoC for GitHub-based agent orchestration;
- subheadline should explain that a GitHub issue can trigger a bounded agent run with visible GitHub results and a short report;
- primary CTA should invite a request, not a vague exploration.

Example direction:

- headline: `Test GitHub-based agent orchestration on your repository before building it yourself`
- subheadline: `A EUR 50 hosted PoC: GitHub issue in, bounded agent run, labels/comments back, short report after.`
- CTA: `Request the PoC`

### 2. Simple Workflow

Purpose:

- make the orchestration loop concrete in seconds;
- show that issue triage is only the first visible scenario inside a broader repo-level pattern.

Required content:

`GitHub issue -> agent run -> GitHub result -> run report`

The section should stay visual and compact.
It should explain that the value is controlled orchestration around repository events, not comment generation alone.

### 3. Who It Is For

Purpose:

- create resonance through fast audience recognition;
- filter out poor-fit visitors without a long explanation.

Required audience list:

- technical founders;
- indie hackers;
- maintainers;
- lead developers;
- small teams using GitHub.

### 4. What Is Included

Purpose:

- define the entry offer clearly enough to reduce ambiguity before contact.

Required items:

- `1` GitHub repository;
- up to `5` test issues;
- hosted execution;
- agent analysis;
- GitHub labels and comments;
- short run report;
- recommendation about next steps.

The section should make the PoC feel bounded and practical, not open-ended.

### 5. What Is Not Included

Purpose:

- prevent scope confusion early;
- keep the offer distinct from implementation work or platform promises.

Required exclusions:

- no code changes;
- no PR creation;
- no production deployment;
- no long-term hosting;
- no SLA;
- no unlimited custom workflow design.

### 6. Access And Safety

Purpose:

- reduce trust friction by making boundaries explicit;
- preserve the safe first-scenario framing.

Required points:

- limited repository access;
- preferably a public or test repository for the first PoC;
- no code modification;
- bounded execution.

The section should communicate control, not fear.

### 7. Differentiation

Purpose:

- stop the visitor from mapping the offer to the wrong product category;
- clarify why the PoC exists.

Required contrasts:

- not another coding agent;
- not a visual workflow builder;
- not a generic automation platform;
- a small practical check of whether repo-level agent orchestration is useful before deeper integration.

### 8. Request Form Fields

Purpose:

- collect only the information needed to qualify the request and choose the next conversation.

Required fields:

- name;
- email;
- repository URL;
- public/private/test repository;
- what the user wants to test;
- whether up to `5` test issues can be created;
- whether the user wants hosted PoC or custom/self-hosted discussion.

The form should also warn the visitor not to submit secrets or sensitive repository contents.

### 9. FAQ

Purpose:

- remove the most likely purchase blockers without expanding the page into a long essay.

Required questions:

- private repository support;
- whether the agent changes code;
- what the customer receives after the PoC;
- how many issues are included;
- what happens after the PoC.

## Copy Priorities

The first version should emphasize:

- the concrete GitHub-based scenario;
- the bounded nature of the PoC;
- the visible output inside GitHub;
- the short report and recommendation;
- the next-step path after the PoC.

The first version should avoid:

- long explanations of TeqFW, ADSM, or AFKP;
- generic AI-agent theory;
- architecture-heavy details;
- claims that imply mature platform coverage.

TeqFW, ADSM, or related method background may appear only as supporting credibility where needed.
The landing page must primarily sell the PoC itself.

## Business Trajectory

The page should support this business path:

1. landing page goes live quickly;
2. visitor requests a small PoC;
3. PoC validates interest and repository fit;
4. customer receives a short report and recommendation;
5. follow-up discussion may lead to improved workflow, self-hosted setup, GitHub App integration, custom repository automation, or broader AI-agent process design.

The `EUR 50` PoC is a validation and entry offer, not the main profit center.

## Relationship To Existing Site Context

This landing page must remain aligned with `ctx/docs/product/overview.md`:

- the site sells practical engineering offers, not AI abstraction;
- the page should move the reader from quick interest to practical understanding and then to external contact;
- the page remains subordinate to the broader `GitHub Flows` product direction.

Lower-level offer and page documents may refine execution details, but they must keep this compact landing structure intact.
