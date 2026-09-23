---
title: "Gateway from GitHub issues to Codex"
description: "A proof of concept was built for passing GitHub issues to a Codex agent. The gateway runs under adsm-agent and already covers several repositories, but it still needs more work before it becomes stable."
date: 2026-03-23
display_date: "March 23, 2026"
image: "/img/blog/2026/20260323-01-codex-github-issues-gateway.jpg"
image_alt: "GitHub Issues gateway for Codex"
---

# Gateway from GitHub issues to Codex

<zoom-img src="/img/blog/2026/20260323-01-codex-github-issues-gateway.jpg"
        alt="Gateway from GitHub issues to Codex" width="100px"></zoom-img>

A gateway between GitHub issues and a Codex agent was put together as a proof of concept. The flow already
        worked. It connected to GitHub under the `adsm-agent` account, and three repositories were wired
        into it: the gateway itself, `teqfw.com`, and the Telegram post translator for English and
        Spanish. The agent profile is available on GitHub:
        [github.com/adsm-agent](https://github.com/adsm-agent).

Several issues were created through this setup and then processed by the agent. Some of them went through
        cleanly and quickly. Others exposed gaps in context handling and in how the agent dealt with constraints.
        The overall result was clear enough: the concept works, but the behavior still needs to be brought to a
        stable working level.

In practical terms, this already provides a usable route for sending tasks to an agent through GitHub.
        The next step is to tighten the rules, tune the intake flow, and smooth out how different issue types are
        handled.

One of the tasks the agent already handled:
        [teqfw/di#44](https://github.com/teqfw/di/issues/44).
