---
title: "LLM-first: Pair Programming Without Vibe Coding"
description: "Shared on Habr how I built a CMS with GPT and DeepSeek in 2 weeks using DI, Markdown and JSDoc. LLM as a co-author of architecture."
date: 2025-05-31
display_date: "May 31, 2025"
image: "/img/brand/habr.webp"
image_alt: "Publication on Habr: LLM-first"
relations:
  - teqcms
---

# LLM-first: Pair Programming Without Vibe Coding

<zoom-img
            src="https://habrastorage.org/r/w1560/getpro/habr/upload_files/ffc/364/c6f/ffc364c6f480bcd8b2c2972383eb23a0.png"
            alt="Habr publication"
            width="100px"
            style="float: left; margin: 15px 15px 0 0;"
    ></zoom-img>

An article titled ["LLM-first: Pair Programming Without Vibe Coding"](https://habr.com/ru/articles/914324/) has been published on the [Habr](https://habr.com/) platform. This summarizes my experience creating
        a multilingual CMS using ChatGPT and DeepSeek API - from architectural structure to unit tests and JSDoc.

I described in detail how I use LLM as a design partner: documenting goals and structure in Markdown,
        organizing DI via `@teqfw/di`, conducting isolated code generation and testing.

The key takeaway: LLM-first is not about playing with prompts, but a structured approach to development where
        Human and Model interact as equals, through architecture and text.

The TeqCMS project discussed is available at [cms.teqfw.com](https://cms.teqfw.com/),
        and its code is in the repository [teq-cms-demo](https://github.com/flancer32/teq-cms-demo).
