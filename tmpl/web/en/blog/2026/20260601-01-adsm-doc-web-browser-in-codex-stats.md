---
title: "Codex analytics started tracking a local skill"
description: "A local skill for documenting the browser side of web applications appeared in Codex analytics within days, and OpenAI is already collecting usage stats on it."
date: 2026-06-01
display_date: "June 1, 2026"
image: "/img/blog/2026/20260601-01-agent-skill-stats.jpg"
image_alt: "Stats for the adsm-doc-web-browser skill in Codex"
---

# Codex analytics started tracking a local skill

<zoom-img src="/img/blog/2026/20260601-01-agent-skill-stats.jpg"
        alt="Stats for the adsm-doc-web-browser skill in Codex" width="100px"></zoom-img>

A few days earlier, a skill called **adsm-doc-web-browser** was put together to observe
        how agents use skills when producing documentation inside a project's cognitive context. It is built
        around a working model of how a typical web application is structured and how its browser-side layer
        can be described.

The skill is still an internal working draft. It is being used in ongoing experiments and refined
        through actual use, without rushing to turn it into a general-purpose package.

The more interesting part came later: the Codex web interface now shows a skills section under
        analytics, and **adsm-doc-web-browser** is already listed there. In a short span of
        time, a local experimental skill reached the point where OpenAI is already collecting usage statistics
        for it as a distinct part of agent work.

The practical takeaway is straightforward: skills become visible parts of the workflow very quickly.
        The gap between testing an idea locally and seeing it show up in platform telemetry turned out to be
        short. For experiments around structured agent instructions, that is a useful signal.
