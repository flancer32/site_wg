---
title: "Single-use apps and ADSM"
description: "A small experiment: the ADSM methodology helped build a one-off utility for monitoring apartment rental ads. The agent created the architecture, while minor fixes were easier to apply manually."
date: 2025-08-15
display_date: "August 15, 2025"
image: "/img/avatar.jpg"
image_alt: "Single-use apps and ADSM"
---

# Single-use apps and ADSM

<zoom-img
            src="/img/avatar.jpg"
            alt="Single-use apps and ADSM"
            width="100px"
            style="float: left; margin: 15px 15px 0 0;"
    ></zoom-img>

A family need arose to make a small app for tracking apartment rental ads in a specific area of our city. I used this opportunity to check how the **ADSM** methodology works as a tool for developing disposable utilities.

The experience showed that separating code and context works outside websites too. In fact, the "Site" in the acronym turned into "Software" — **Agent Driven Software Management**. The agent helped shape the main architecture and write most of the code, while I only clarified details. It also became obvious that minor fixes are easier to apply manually than to explain to the agent in context.

I realized that the context should include large blocks of specifications — descriptions of architecture and approaches. These blocks should move from project to project if tasks are similar. This approach makes ADSM applicable to small utilities needed here and now and allows using agents to write programs with a limited life cycle.
