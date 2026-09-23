---
title: "@teqfw/di switches to an LLM-first workflow"
description: "I moved @teqfw/di to a workflow where documentation for the agent matters more than keeping all the context in my head. I also republished the article about this transition as a separate library page."
date: 2026-02-25
display_date: "February 25, 2026"
image: "/img/brand/teqfw.webp"
image_alt: "@teqfw/di in an LLM-first workflow"
---

# @teqfw/di switches to an LLM-first workflow

<zoom-img src="/img/brand/teqfw.webp" alt="@teqfw/di in an LLM-first workflow" width="100px"></zoom-img>

About a week ago I changed the development of **@teqfw/di** to a new workflow: I now write not
        only code and my own rules, but first of all documentation for an LLM agent, which then applies those rules
        across large numbers of small files.

This shift affected not only the way I work, but also the package architecture itself. Version
        [@teqfw/di 2.0.0](https://www.npmjs.com/package/@teqfw/di/v/2.0.0)
        is incompatible with the `1.2.0` line because the dependency declaration concept changes there.

A detailed explanation of why I made this move, how the Codex agent rewrote the library, and how the rules for
        people and agents are changing is collected on a separate library page:
        [Declaration of (Non)Dependencies for ESM](/en/library/teqfw/20260225-01-deklaratsiya-ne-zavisimostey-dlya-esm.html).

In short, a person now defines the boundaries, and the agent fills them with working code. For small,
        repeatable changes, that is already more practical than trying to keep the whole project in manual mode.
