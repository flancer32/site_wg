---
title: "Codex agent in autonomous mode on a server"
description: "A Codex agent ran autonomously on a US virtual server, took three tries to produce a simple file, and showed what this setup costs in practice. The same pattern points toward webhook-driven issue triage and small automated development workflows."
date: 2026-03-12
display_date: "March 12, 2026"
image: "/img/brand/codex.png"
image_alt: "Codex agent in autonomous mode on a server"
---

# Codex agent in autonomous mode on a server

<zoom-img src="/img/brand/codex.png"
        alt="Codex agent in autonomous mode on a server" width="100px"></zoom-img>

On March 12, a Codex agent was put into autonomous mode on one of the virtual servers in the US and connected
        to OpenAI with an API key. It took three tries before it produced a simple result: a text file with the
        greeting `Hello World!` in the current directory.

The agent kept trying to switch into interactive mode. Creating one small file cost about 10,000 tokens, or
        roughly 3 cents. After that, the conclusion only got clearer: for ongoing work, Codex is probably better
        value on subscription than through one-off API use.

A $20 monthly subscription already goes a long way. Over the last six months, the limit was never reached,
        although nothing especially large was built through Codex either.

The next practical step is straightforward: a small web app for receiving GitHub webhooks, for example when
        an issue is opened, and then using it to launch the agent. The agent can inspect the task text, route it to
        work, or reject it outright. With enough funding, that is already enough to build a small automated software
        agency. In terms of speed, it would not be worse than handling issues manually in Magento. Token usage,
        though, would be noticeable.
