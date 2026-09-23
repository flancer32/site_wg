---
title: "Turning User Intent Into Controlled Product Evolution"
description: "Turning User Intent Into Controlled Product Evolution"
date: 2026-05-19
---

*AI agents should not replace product ownership. They can help product
owners open controlled channels through which user intent becomes
product change.*

A user request is usually treated as feedback. Someone reports a bug,
asks for a small improvement, describes a missing feature, or points out
that the product does not behave as expected.

In an agent-driven product workflow, that request can become something
more: the beginning of a controlled product change.

This does not mean that users should directly control the product. It
also does not mean that every user request should automatically become
code. The idea is more careful than that.

A product owner can define approved paths for change. Inside those
paths, AI agents may act with limited authority. Outside those paths,
the request still goes through normal human review.

This creates a different way to think about product development.

<zoom-img
                src="/img/library/concepts/20260519-controlled-product-evolution/01-common-scheme.png"
                alt="Controlled path from user intent to product change"
                width="100%"
        ></zoom-img>

*Figure 1. Controlled path from user intent to product change.*

The user becomes more than a passive source of feedback. The agent
becomes more than a coding assistant. The product owner keeps control by
defining the rules, limits, and review points.

------------------------------------------------------------------------

## 1. User Intent Is an Underused Source of Product Change

Every product changes because someone wants it to change.

A user notices a bug. A customer needs a missing feature. A tester sees
confusing behavior. A developer notices that the documentation no longer
matches the product. These observations are not just noise around the
product. They are signals about how the product could evolve.

Today, most of these signals follow a long manual path.

A user writes feedback, sends a message, opens a ticket, or creates an
issue. Someone from the team reads it, interprets it, decides whether it
matters, turns it into a task, sends it to development, waits for
implementation, reviews the result, and finally accepts or rejects the
change.

This process works, but it is slow. Many small useful changes never
reach the product. They are not necessarily rejected. They are delayed,
forgotten, deprioritized, or lost in the normal pressure of product
work.

AI agents can shorten this path.

If an agent can read a task, inspect a repository, change files, run
checks, and prepare a pull request, then some user requests no longer
need to wait for the full manual cycle. They can enter a controlled
workflow where the agent handles the routine work.

The important word is controlled.

The goal is not to let users change the product directly. The goal is to
create a reliable channel through which user intent can become product
change when the product owner has already allowed that kind of change.

## 2. The Product Owner Must Not Lose Control

A product is not just a list of features. It has direction, constraints,
architecture, security rules, user experience principles, business
goals, and many trade-offs that are not visible from a single user
request.

Users often see real problems, but they do not always see the whole
product.

One request may improve one scenario and damage another. A small change
may break an architectural rule. A good idea may conflict with the
product strategy. A valid request may simply not be the right next step.

For this reason, not every user request should become code.

> A user opens an issue, and an AI agent automatically changes the
> product.

This is the unsafe version of the idea. The safer model is different:

> A user opens an issue. The workflow checks whether the request belongs
> to an area where the product owner has already allowed agent action.
> If it does, an AI agent may process it. If it does not, the request
> follows the normal human review path.

<zoom-img
                src="/img/library/concepts/20260519-controlled-product-evolution/02-basic-paths.png"
                alt="Request routing after boundary check"
                width="100%"
        ></zoom-img>

*Figure 2. Request routing after boundary check.*

This distinction matters.

Delegation is not giving up control. Delegation means deciding in
advance which decisions an agent may make without asking, and which
decisions must be escalated to a human.

The product owner remains responsible for the product. AI agents do not
remove that responsibility. They only make it possible to delegate part
of the operational work.

## 3. Approved Paths for Change

For agents to be useful and safe, the product owner needs to define
approved paths for change.

> Changes of this kind are allowed if they stay within these limits and
> pass these checks.

Examples may include fixing obvious bugs, improving documentation,
adding missing tests, correcting small interface problems, updating
examples, or implementing behavior that is already described in the
product specification.

This does not mean that every change is automatically merged. It means
that the agent is allowed to start working without asking for a separate
decision every time.

The guardrails must be clear enough for the agent to act.

An approved path may define what kind of request is allowed, which files
or modules may be changed, what behavior must not be changed, which
product documents must be followed, which checks must pass, what
evidence must be recorded, and when the agent must stop and ask for a
human decision.

This is where documentation becomes more than a passive description of
the product. It becomes an operational control surface.

The better the product owner describes the product, the safer it becomes
to delegate work to agents.

Without clear guardrails, agent autonomy is risky. With clear
guardrails, autonomy becomes a practical tool.

## 4. AI Agents as Delegated Intermediaries

In this model, an AI agent is not simply a coding assistant.

It acts as a delegated intermediary between users and the product owner.

The user expresses intent. The product owner defines the guardrails. The
agent works between them. It reads the request, checks it against the
product context, and decides which path the request should follow.

<zoom-img
                src="/img/library/concepts/20260519-controlled-product-evolution/03-roles.png"
                alt="The agent as a delegated intermediary"
                width="100%"
        ></zoom-img>

*Figure 3. The agent as a delegated intermediary.*

If the request is inside the approved guardrails, the agent can process
it. It can analyze the issue, prepare a plan, change the code, create a
pull request, and record what it has done.

If the request is unclear, risky, or changes the boundaries of the
product, the agent should not guess. It should stop, summarize the
situation, and ask the product owner for a decision.

If the request clearly goes against the product direction, the agent
should reject it or mark it for discussion.

This gives the agent a precise role.

The agent is not working for the user directly. It must not blindly
satisfy every request.

The agent is not replacing the product owner. It must not redefine the
product.

The agent is a limited representative of the product owner, allowed to
act only where the owner has already defined the rules.

This is the key shift.

The creative role of the user becomes more active, but only through a
controlled channel. The user can initiate product change. The agent can
process allowed changes. The owner keeps control through guardrails,
evidence, and review.

## 5. Event-Driven Workflow as the Execution Model

To make this practical, agent work should not depend only on manual chat
sessions.

Chat is useful for discussion, exploration, and thinking. But product
change needs something more stable. It needs a process that can be
observed, repeated, checked, and audited.

Software repositories already provide a good foundation for this.

A user creates an issue. A label is added. A comment is posted. A pull
request is opened. A review is submitted. A merge happens. Each of these
actions can generate an event.

An event-driven workflow uses these events to move the task through a
controlled process. The issue captures the user's intent. The repository
event starts the process. The workflow engine checks the rules and
chooses the next step. If the request is allowed, an AI agent is started
in a restricted working environment. The agent performs the task and
records the result back into the repository.

<zoom-img
                src="/img/library/concepts/20260519-controlled-product-evolution/04-parts.png"
                alt="Event-driven agent workflow architecture"
                width="100%"
        ></zoom-img>

*Figure 4. Event-driven agent workflow architecture.*

The result may be a pull request, a comment, a label, a validation
result, or another visible trace.

This is different from asking a model to "fix this" in a chat window.

In an event-driven workflow, the agent does not act in isolation. It
acts as part of a process. The process can include admission, planning,
implementation, validation, human review, merge, and finalization.

Each step has a meaning. Each transition can be checked. Each decision
can be recorded.

This is how delegation becomes engineering instead of wishful thinking.

## 6. Evidence Keeps Autonomy Accountable

Agent autonomy is acceptable only when agent actions remain visible.

If an AI agent changes a product, the owner should be able to answer
basic questions:

- Why was the agent started?
- What user request triggered the work?
- What rules allowed the agent to proceed?
- What files did the agent change?
- What result did it produce?
- What checks were performed?
- Who accepted the final change?

This is why evidence matters.

An issue records the original request. A label can show the current
state. A comment can explain the agent's decision. A pull request shows
the actual code change. A validation result shows whether checks passed.
A review records human acceptance or rejection.

Without this trace, agent work is difficult to trust.

With this trace, the product owner can let agents act more freely inside
approved guardrails, because every important action remains visible and
reviewable.

The owner does not need to manually perform every small task. But the
owner must be able to inspect the process, change the rules, stop unsafe
behavior, and decide what enters the product.

> Agents may act autonomously only to the extent that their actions are
> observable, bounded, and reviewable.

The purpose of the workflow is not only to automate work. It is to make
delegated work accountable.

## 7. ADSM and github-flows: From Idea to a Working System

This approach needs two layers.

The first layer is methodological. The product owner must describe the
product, its boundaries, its architecture, its allowed changes, and its
validation rules. Without this, agents have no stable ground for
autonomous decisions.

This is the role of
<a href="https://teqfw.com/method" target="_blank" rel="noopener">ADSM,
Agent Driven Software Management</a>.

ADSM treats documentation as the source of truth for agent-driven
development. Documentation is not just a human-readable description. It
defines the context in which agents can work. It explains what the
product is, what it should become, and where the limits of autonomous
change are.

The second layer is technical. The process must be executable.

This is the role of
<a href="https://www.npmjs.com/package/@teqfw/github-flows"
target="_blank" rel="noopener">@teqfw/github-flows</a>.

<a href="https://www.npmjs.com/package/@teqfw/github-flows"
target="_blank" rel="noopener">@teqfw/github-flows</a> is an
experimental Node.js library for agent-driven software development. It
reacts to repository events, checks workflow rules, starts CLI agents in
isolated runtime environments, and records results back into the
repository through issues, pull requests, labels, comments, and
evidence.

This base library provides the core workflow functionality, but it
intentionally does not provide service functions such as log viewing or
configuration management.

Those service capabilities are implemented at a minimal level in
<a href="https://github.com/flancer32/github-flows-app" target="_blank"
rel="noopener">github-flows-app</a>, which is a simple web application
wrapper that makes the base functionality runnable in practice.

This split is deliberate. It is still not clear what the right long-term
shape of agent orchestration and workflow configuration should be.
Because of that, I prefer to keep the base library focused and allow
others to experiment with it and build their own wrappers in the form
they consider most practical.

In the current implementation, GitHub issues can move through a
controlled process: admission, planning, implementation, pull request
creation, validation, merge decision, and issue finalization. Agents
such as Codex can run in Docker-based environments. Labels and comments
are used to record state and decisions.

I currently use this approach in a real GitHub repository:
[viktor-gusev/dnd-game-master](https://github.com/viktor-gusev/dnd-game-master/issues?q=is%3Aissue%20state%3Aclosed).
Issues
[\#17](https://github.com/viktor-gusev/dnd-game-master/issues/17),
[\#19](https://github.com/viktor-gusev/dnd-game-master/issues/19), and
[\#21](https://github.com/viktor-gusev/dnd-game-master/issues/21) were
processed by agents through this workflow.

This is still experimental, but it is already more than a concept. It is
an executable workflow that connects user intent, repository events,
delegated AI agents, pull requests, validation, and finalization.

The specific implementation uses GitHub, CLI agents, and Docker. The
broader model is not limited to these tools.

AI agents are not important only because they can write code. They
become more important when they can act as controlled intermediaries
between users and product owners.

They can help transform user creativity into product change. But they
can do so only when the owner defines the guardrails, the workflow
enforces the process, and every important action leaves evidence.

The future of agent-driven development is not only about making agents
more powerful.

It is about making their power governable.

If you are experimenting with AI coding agents, GitHub Issues, or
automated pull request workflows, I would be interested to compare
approaches and discuss practical use cases. You can reach me through the
[contact page](/en/contact.html).
