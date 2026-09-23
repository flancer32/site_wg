---
title: "ADSM: WebRTC video chat through a Codex agent"
description: "The Habr publication describes my experiment building a WebRTC video chat via a Codex agent. The text is available via the link ."
date: 2025-11-04
display_date: "4 November 2025"
image: "/img/blog/2025/20251104-01-adsm-webrtc-codex-agent.png"
image_alt: "ADSM: WebRTC video chat through a Codex agent"
---

# ADSM: WebRTC video chat through a Codex agent

<zoom-img src="/img/blog/2025/20251104-01-adsm-webrtc-codex-agent.png"
        alt="ADSM: WebRTC video chat through a Codex agent" width="100px"></zoom-img>

I tested how controllable the development process becomes when strictly relying on ADSM and working through a
        Codex agent. I built a simple WebRTC video-chat PWA where the agent generated wiring logic, signaling channels,
        and component structure from my textual directives. The hardest part was not the code but the need to document every
        architecture detail, because the agent ignores any context outside the text. To keep the project manageable I had to
        create voluminous documentation that far exceeded the size of the code. The experiment proved that models can be
        used to build working systems if they receive a stable context and rigid boundaries. The full article is written in
        Russian and published on Habr.

[Read the original on Habr](https://habr.com/ru/articles/963082/)
