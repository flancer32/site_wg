---
title: "API and agents: two approaches to page translation"
description: "In TeqCMS, translations were done via API one file at a time, but I tried an agent approach: translating multiple pages per session while keeping context. Both methods are valuable."
date: 2025-07-18
display_date: "July 18, 2025"
image: "/img/avatar.jpg"
image_alt: "API and agents: two approaches to page translation"
---

# API and agents: two approaches to page translation

<zoom-img
            src="/img/avatar.jpg"
            alt="API and agents: two approaches to page translation"
            width="100px"
            style="float: left; margin: 15px 15px 0 0;"
    ></zoom-img>

In TeqCMS, page translations were initially done via API, one file at a time. This method is simple and reliable: one file — one request, and the result is easy to embed into CI/CD.

But recently I tried another option — using an **AI agent** that handles multiple pages in a single session. The agent can take the overall context of the site into account, translate a series of files sequentially and even make adjustments on the fly.

Both approaches are valuable: the API provides stability and predictability, while agents bring flexibility and allow working in an editorial manner. I see practical benefit in this combination and will continue to develop agent-based translations.
