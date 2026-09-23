---
title: "From ideas to code: testing attention theory in practice"
description: "I describe my app Mindstream , built with ADSM, where browser attention signals turn into an interest score via embeddings; the original post explains the model and its limitations."
date: 2026-02-11
display_date: "February 11, 2026"
image: "/img/blog/2026/20260211-01-from-ideas-to-code-testing-attention-theory-in-practice.png"
image_alt: "From ideas to code: testing attention theory in practice"
---

# From ideas to code: testing attention theory in practice

<zoom-img src="/img/blog/2026/20260211-01-from-ideas-to-code-testing-attention-theory-in-practice.png"
        alt="From ideas to code: testing attention theory in practice" width="100px"></zoom-img>

I built Mindstream as an engineering experiment and a working app:
        [mindstream.app.wiredgeese.com](https://mindstream.app.wiredgeese.com/).
        It reads Habr via RSS, generates LLM annotations and LLM digests, and assembles a single feed. Personalization
        happens in the browser: user actions are interpreted as attention signals, and a local interest vector is built
        from those signals.

The interest score is computed from the digest embedding: the digest serves as a compact carrier of the post’s
        meaning, the embedding places it in semantic space, and the distance to the current interest vector is used as a
        relative indicator of correlation. I wrote the app using the ADSM (Agent-Driven Software Management) approach:
        documentation captures invariants, code follows from it, and agents are used as a tool for guided development. The
        full article in Russian is published on Habr.

[Read the original on Habr](https://habr.com/ru/articles/995070/)
