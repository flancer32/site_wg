---
title: "Agent-friendly documentation for npm packages"
description: "I went through a Reddit discussion and my own ai/AGENTS.md experiment for @teqfw/di : how to give an agent a compact but useful package context."
date: 2026-03-07
display_date: "March 7, 2026"
image: "/img/blog/2026/20260307-01-photo-2026-03-07-13-13-51.jpg"
image_alt: "Agent-friendly documentation for npm packages"
---

# Agent-friendly documentation for npm packages

<zoom-img src="/img/blog/2026/20260307-01-photo-2026-03-07-13-13-51.jpg"
        alt="A note about agent-friendly package documentation" width="100px"></zoom-img>

On March 7 I posted a question in the Codex subreddit asking whether there are already established practices
        for explaining to agents how a package should be used: Maven, Composer, npm, and similar ecosystems.

There were no real answers. At least to me, it looked like there is still no shared practice in this area.
        So I ended up building my own approach together with GPT.

As an experiment, I shaped a compact agent interface for `@teqfw/di` in the form of
        `ai/AGENTS.md` plus a set of short topic-focused files. The idea is simple: `README.md`
        stays for humans, while `AGENTS.md` and the neighboring docs give the agent a concentrated view of
        how the package is meant to be used.

Original Reddit thread:
        [Agent-friendly documentation for npm packages](https://www.reddit.com/r/codex/comments/1rmdaxp/agentfriendly_documentation_for_npm_packages_how/).
        Experiment result in the repository:
        [teqfw/di: ai/AGENTS.md](https://github.com/teqfw/di/blob/2.0.3/ai/AGENTS.md).

In the end, the `di` documentation came to six files and 4,164K tokens in total, including the
        index `AGENTS.md`. I could have made it a single document, but I intentionally split it by topic
        so the agent can read the context step by step.

For now this feels like a workable pattern: a small entry file, then a guided reading path, and only after
        that the deeper details. I’ll keep watching how stable this approach turns out to be in practice.
