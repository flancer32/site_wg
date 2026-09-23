---
title: "Telegram Translation Publisher: ADSM and the guided evolution of an agent-built app"
description: "A Node.js CLI built by an agent on top of an architecture defined upfront—an example of controlled project evolution with ADSM."
date: 2026-02-17
display_date: "February 17, 2026"
image: "/img/brand/teqfw.webp"
image_alt: "Telegram Translation Publisher: ADSM and the guided evolution of an agent-built app"
---

# Telegram Translation Publisher: ADSM and the guided evolution of an agent-built app

<zoom-img src="/img/brand/teqfw.webp"
        alt="Telegram Translation Publisher: ADSM and the guided evolution of an agent-built app"
        width="100px"></zoom-img>

I built a small Node.js CLI that automatically translates my Telegram posts from Russian into English and Spanish
        via the OpenAI API. The first working version was produced almost entirely by a Codex agent from a single prompt.
        I only made a few follow-up edits related to my DI container and integration into the chosen architecture.

Most of the work happened before any code was generated. I spent about four hours shaping the architectural
        baseline using the ADSM methodology: defining invariants, product boundaries, the interaction model with the
        Telegram API, and stack constraints. With that frame in place, the agent stayed within it and assembled the app
        in minutes.

By changing the product description in the context, I can get different system behavior without rebuilding the
        architecture. This makes evolution incremental and controlled: code becomes a consequence of structure that was
        fixed upfront. This case shows how, on a concrete stack—Node.js, the Telegram API, and the OpenAI API—you can set
        up an environment where an agent generates an implementation within a defined model.

[Project repository](https://github.com/flancer64/tg-wa-blog-post)

        [Architecture baseline and context (ctx/docs)](https://github.com/flancer64/tg-wa-blog-post/tree/main/ctx/docs)
