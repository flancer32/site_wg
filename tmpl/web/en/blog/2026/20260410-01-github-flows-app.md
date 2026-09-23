---
title: "@teqfw/github-flows gets a host application"
description: "A host application was assembled for @teqfw/github-flows to run the server, show logs and configs in the browser, and rely on GitHub PATs and Codex OAuth tokens."
date: 2026-04-10
display_date: "April 10, 2026"
image: "/img/brand/github.png"
image_alt: "GitHub"
---

# @teqfw/github-flows gets a host application

<zoom-img src="/img/brand/github.png" alt="GitHub" width="100px"></zoom-img>

A host application,
        [github-flows-app](https://github.com/flancer32/github-flows-app),
        was put together for
        **[@teqfw/github-flows](https://www.npmjs.com/package/@teqfw/github-flows)**.
        It provides the operational layer around the server, browser access to data, and service tasks, while
        staying on top of the library.

The library itself is designed as a shared core. It accepts GitHub events, gathers the data needed for
        execution, and starts the agent in Docker. Agent behavior and workflow logic are defined separately in JSON
        and MD files arranged in a directory hierarchy. Those files determine when agents start and which prompts
        they receive.

The host application runs the server, shows logs and configs in the browser, and handles service tasks
        such as cleaning up stale data. The same configurations also define the workflows: they may be triggered
        by anonymous users or only selected accounts; the agent may work directly in `main` or create a
        dedicated branch for each event and then open a pull request.

At this stage, GitHub access uses a PAT, short for Personal Access Token, and Codex runs on OAuth tokens
        from a Plus subscription. That already looks like a reproducible service setup for a VPS: a separate
        server, configuration management, and clear visibility into each run. The project is moving toward exactly
        that state, where GitHub event processing can be reshaped through agent-driven configuration.
