---
title: "@teqfw/github-flows is packaged as a reusable library"
description: "The package is a library for intercepting GitHub webhooks, launching agents in Docker, and building workflows that can carry code to new releases."
date: 2026-03-25
display_date: "March 25, 2026"
image: "/img/brand/github.png"
image_alt: "GitHub"
---

# @teqfw/github-flows is packaged as a reusable library

<zoom-img src="/img/brand/github.png" alt="GitHub" width="100px"></zoom-img>

Together with Viktor Gusev, a separate repository was created for
        [@teqfw/github-flows](https://www.npmjs.com/package/@teqfw/github-flows).
        Viktor's profile is here:
        [viktor-gusev](https://github.com/viktor-gusev).

The package extends the earlier gateway from
        [Gateway from GitHub issues to Codex](/en/blog/2026/20260323-01-codex-github-issues-gateway.html)
        and turns it into a library foundation for web applications that build agent-based workflows. It intercepts
        GitHub webhooks, extracts the event, prepares the input data, and launches agents in Docker
        containers to process those events.

Our experiments showed the practical side of the approach. A human or another agent can start production
        chains that change code and carry the result through to a new release. This is no longer a prototype in
        the strict sense. It is a repeatable model for building workflows around GitHub events and agent execution.

[@teqfw/github-flows](https://www.npmjs.com/package/@teqfw/github-flows)
        packages this approach as a reusable solution. The package stays a library, while lifecycle and runtime
        remain the host application's responsibility.
