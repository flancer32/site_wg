---
title: "TeqFW Guide: Enum — an architecture assistant for onboarding"
description: "I launched a custom GPT chat to align understanding of Enum in TeqFW and support onboarding for the team."
date: 2026-02-18
display_date: "February 18, 2026"
image: "/img/brand/teqfw.webp"
image_alt: "TeqFW Guide: Enum — an architecture assistant for onboarding"
---

# TeqFW Guide: Enum — an architecture assistant for onboarding

<zoom-img src="/img/brand/teqfw.webp" alt="TeqFW Guide: Enum — an architecture assistant for onboarding"
        width="100px"></zoom-img>

In TeqFW, Enum has a strictly defined place in the architecture and is governed by formal constraints. In
        practice, developers interpret enums differently: as a set of constants, as a value object, or as part of the
        domain model. This creates divergence in understanding and blurs responsibility boundaries. I formalized the
        Enum specification within the late-binding and DI model, and then packaged it as a dedicated tool.

[TeqFW Guide: Enum](https://fly.wiredgeese.com/flancer/gpt/teqfw/guide/enum/) is a personal GPT assistant trained on the project’s architecture documents. It conveys a coherent
        view of Enum’s role, clarifies requirements for a flat structure and a closed set of values, and helps verify
        code against the adopted model. The assistant does not expand the architecture or propose alternative forms — it
        supports discipline and predictability in the system.

[More about TeqFW Guide: Enum.](/en/projects/custom-gpt/solo-teqfw-guide-enum.html)
