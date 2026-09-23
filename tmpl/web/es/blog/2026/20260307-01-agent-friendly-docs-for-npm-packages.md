---
title: "Documentación pensada para agentes en paquetes npm"
description: "Revisé una discusión en Reddit y mi propio experimento con ai/AGENTS.md para @teqfw/di : cómo darle a un agente un contexto compacto pero útil sobre un paquete."
date: 2026-03-07
display_date: "7 de marzo de 2026"
image: "/img/blog/2026/20260307-01-photo-2026-03-07-13-13-51.jpg"
image_alt: "Documentación pensada para agentes en paquetes npm"
---

# Documentación pensada para agentes en paquetes npm

<zoom-img src="/img/blog/2026/20260307-01-photo-2026-03-07-13-13-51.jpg"
        alt="Una nota sobre documentación de paquetes pensada para agentes" width="100px"></zoom-img>

El 7 de marzo publiqué en el subreddit de Codex una pregunta sobre si ya existen prácticas consolidadas para
        explicar a los agentes cómo debe usarse un paquete, ya sea en Maven, Composer, npm u otros entornos
        parecidos.

No hubo respuestas de fondo. Al menos a mí me quedó la impresión de que todavía no existe una práctica común
        en este terreno. Así que terminé armando mi propio enfoque junto con GPT.

Como experimento, organicé para `@teqfw/di` una interfaz compacta para agentes en forma de
        `ai/AGENTS.md` y varios archivos breves, cada uno centrado en un tema. La idea es sencilla:
        `README.md` queda para las personas, mientras que `AGENTS.md` y los documentos
        cercanos le dan al agente una visión concentrada de cómo se usa el paquete.

Hilo original en Reddit:
        [Agent-friendly documentation for npm packages](https://www.reddit.com/r/codex/comments/1rmdaxp/agentfriendly_documentation_for_npm_packages_how/).
        Resultado del experimento en el repositorio:
        [teqfw/di: ai/AGENTS.md](https://github.com/teqfw/di/blob/2.0.3/ai/AGENTS.md).

Al final, la documentación de `di` quedó en seis archivos y 4,164K tokens en total, incluido el
        `AGENTS.md` índice. Podría haberse quedado en un único documento, pero la dividí por temas a
        propósito para que el agente lea el contexto paso a paso.

Por ahora me parece un patrón que funciona: un archivo de entrada pequeño, luego una ruta de lectura guiada
        y, solo después, el detalle más fino. Seguiré viendo qué tan estable resulta este enfoque en la práctica.
