---
title: "GitHub Issues and Codex Agents in a Single Workflow"
description: "A workflow that connects GitHub Issues and Codex agents is now running on a real repository. The idea of controlled product evolution through agent workflows is now taking concrete form."
date: 2026-05-19
display_date: "May 19, 2026"
image: "/img/library/concepts/20260519-controlled-product-evolution/04-parts.png"
image_alt: "GitHub Issues and Codex Agents in a Single Workflow"
---

# GitHub Issues and Codex Agents in a Single Workflow

<zoom-img src="/img/library/concepts/20260519-controlled-product-evolution/04-parts.png"
        alt="Event-driven workflow architecture for agents" width="100px"></zoom-img>

I have reached an important practical milestone in agent-assisted software development.

For some time I have been working on bringing **GitHub Issues** and
        **Codex agents** into a single controlled workflow. The idea is simple: a task begins as an
        ordinary GitHub issue, and from that point on it moves through a set of agent configurations, rules, and
        prompts rather than a chain of manual handoffs between people and chats.

Within that process, different agents handle the task step by step: intake, admission, planning,
        implementation, pull request creation, validation, merge decision, and issue finalization.

I connected this workflow to the repository
        [viktor-gusev/dnd-game-master](https://github.com/viktor-gusev/dnd-game-master).
        Its issues are now flowing through that process. You can already inspect concrete examples directly on GitHub:
        [#17](https://github.com/viktor-gusev/dnd-game-master/issues/17),
        [#19](https://github.com/viktor-gusev/dnd-game-master/issues/19),
        [#21](https://github.com/viktor-gusev/dnd-game-master/issues/21).

For me, this is more than a technical experiment. Since February I have been developing the idea that
        users should be able to influence the code of their applications more directly, but not through a chaotic
        stream of prompts to a model. It should happen through a controlled process in which the product owner
        defines the approved boundaries of change in advance.

That idea has now become a working system you can actually inspect. It confirms my understanding of how
        people and language models can work together in software development: not as occasional participants in isolated
        chats, but as participants in a reproducible process with roles, constraints, and verifiable outcomes.

I described the broader model separately in the publication
        [Turning User Intent Into Controlled Product Evolution](/en/library/concepts/20260519-controlled-product-evolution.html).
        It provides the conceptual backdrop for this post: what was still a general idea not long ago is now beginning
        to work in practice.
