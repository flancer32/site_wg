---
title: "AGENTS.md in ADSM: practice and observations"
description: "Personal experience applying AGENTS.md files during the development of Svyazist and their role in the ADSM methodology."
date: 2025-12-14
display_date: "December 14, 2025"
image: "/img/blog/2025/20251214-01-agents-files.png"
image_alt: "AGENTS.md in ADSM"
---

# AGENTS.md in ADSM: practice and observations

<zoom-img src="/img/blog/2025/20251214-01-agents-files.png" alt="AGENTS.md in ADSM" width="100px"></zoom-img>

During the development of the **Svyazist** project I gradually built
        the work with the LLM agent through the file structure and textual instructions.
        One of the key elements of this practice became the `AGENTS.md` files.

Over time it became clear that `AGENTS.md` work not as a set of commands,
        but as a mechanism for shaping the context within which the agent makes decisions.
        Their hierarchy, placement, and structure began to noticeably affect the stability
        and repeatability of the work.

In [this publication](/en/library/adsm/20251214-01-agents-files.html) I recorded
        my current experience of using AGENTS files:
        where they really help, what limitations they have,
        and why their role in ADSM should be perceived as architectural rather than directly controlling.
