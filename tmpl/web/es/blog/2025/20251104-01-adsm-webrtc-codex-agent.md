---
title: "ADSM: videollamada WebRTC mediante un agente Codex"
description: "La publicación en Habr describe mi experimento creando un chat de vídeo WebRTC con un agente Codex. El texto está disponible en el enlace ."
date: 2025-11-04
display_date: "4 de noviembre de 2025"
image: "/img/blog/2025/20251104-01-adsm-webrtc-codex-agent.png"
image_alt: "ADSM: videollamada WebRTC mediante un agente Codex"
---

# ADSM: videollamada WebRTC mediante un agente Codex

<zoom-img src="/img/blog/2025/20251104-01-adsm-webrtc-codex-agent.png"
        alt="ADSM: videollamada WebRTC mediante un agente Codex" width="100px"></zoom-img>

Verifiqué hasta qué punto el proceso de desarrollo puede controlarse cuando se apoya estrictamente en ADSM y se
        trabaja a través de un agente Codex. Creé una PWA sencilla para videollamadas WebRTC en la que el agente generó
        la lógica de conexión, los canales de señalización y la estructura de componentes a partir de mis indicaciones
        textuales. La mayor dificultad no fue el código sino la necesidad de documentar cada detalle de la arquitectura,
        ya que el agente no usa contexto fuera del texto. Para mantener el proyecto bajo control tuve que redactar una
        documentación volumétrica que superó con creces el volumen del código. El experimento confirmó que se pueden usar
        modelos para construir sistemas funcionales si se les proporciona un contexto estable y límites estrictos. El
        artículo completo está escrito en ruso y publicado en Habr.

[Leer el original en Habr](https://habr.com/ru/articles/963082/)
