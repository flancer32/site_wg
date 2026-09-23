---
title: "ADSM: top-level directories"
description: "My personal approach to the baseline file structure of projects in accordance with the ADSM methodology."
date: 2025-11-22
display_date: "22 November 2025"
image: "/img/blog/2025/20251122-01-adsm-top-level-directories.png"
image_alt: "ADSM: top-level directories"
---

# ADSM: top-level directories

<zoom-img src="/img/blog/2025/20251122-01-adsm-top-level-directories.png"
        alt="ADSM: top-level directories" width="100px"></zoom-img>

*The motivation for the AFKP approach is explained in the article "[When Knowledge Is Too Much](https://habr.com/ru/articles/963910/)". This excerpt corresponds to AFKP stage 2 (resonance). Habr also published [another variant](https://habr.com/ru/articles/967452/) of the first two AFKP stages – engagement and resonance. This is a more compact version of the text for the resonance stage.*

In ADSM I divide a project into two broad areas: code and documentation. The code depends on the chosen programming
        language, and the documentation I further split into three zones:

- **agent** – a zone for communicating with agents, where reports and prompt templates are recorded;

- **product** – the business description of the product that sets the skeleton of the future
            application and shapes the agent’s field of action;

- **rules** – a set of regulations that describe how the software product should be created on the
            chosen language.

This directory structure reflects my experience working with LLM agents and is designed so that documentation and
        code coexist as a single space that takes into account the linguistic nature of models and their statistical
        limitations. It helps keep the agent focused and steer its work within the required boundaries.

[Read the full text (AFKP stage 3 – immersion) .](/en/library/adsm/20251122-01-adsm-top-level-dirs.html)
