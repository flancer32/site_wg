---
title: "Las incidencias de GitHub y los agentes de Codex en un mismo flujo"
description: "Ya está en marcha un flujo real que conecta las incidencias de GitHub con agentes de Codex. La idea de evolución controlada del producto mediante un proceso con agentes ya ha tomado una forma práctica."
date: 2026-05-19
display_date: "19 de mayo de 2026"
image: "/img/library/concepts/20260519-controlled-product-evolution/04-parts.png"
image_alt: "Las incidencias de GitHub y los agentes de Codex en un mismo flujo"
---

# Las incidencias de GitHub y los agentes de Codex en un mismo flujo

<zoom-img src="/img/library/concepts/20260519-controlled-product-evolution/04-parts.png"
        alt="Arquitectura de un flujo de trabajo basado en eventos para agentes" width="100px"></zoom-img>

He alcanzado un resultado práctico importante en desarrollo asistido por agentes.

Llevo un tiempo trabajando en unir **las incidencias de GitHub** y **los agentes de Codex**
        dentro de un mismo flujo controlado. La idea es sencilla: una tarea nace como una incidencia normal en GitHub y,
        a partir de ahí, deja de depender de saltos manuales entre personas y chats para seguir un conjunto de
        configuraciones, reglas e instrucciones para agentes.

Dentro de ese proceso, distintos agentes se ocupan de manera secuencial de la recepción de la tarea, la
        autorización para trabajar, la planificación, la implementación, la creación del *pull request*, la validación,
        la decisión de integración y el cierre de la incidencia.

Conecté este flujo al repositorio
        [viktor-gusev/dnd-game-master](https://github.com/viktor-gusev/dnd-game-master).
        Las incidencias de ese repositorio ya están pasando por este proceso. Ya se pueden ver ejemplos concretos
        directamente en GitHub:
        [#17](https://github.com/viktor-gusev/dnd-game-master/issues/17),
        [#19](https://github.com/viktor-gusev/dnd-game-master/issues/19),
        [#21](https://github.com/viktor-gusev/dnd-game-master/issues/21).

Para mí esto es algo más que un experimento técnico. Desde febrero venía madurando una idea: permitir
        que los usuarios influyan de forma más directa en el código de sus aplicaciones, pero no a través de una cadena
        caótica de peticiones a un modelo, sino mediante un proceso controlado en el que la persona responsable del
        producto define de antemano los límites permitidos.

Ahora esa idea se ha convertido por primera vez en un sistema real que ya se puede examinar en funcionamiento. Eso
        confirma mi manera de entender la colaboración entre personas y modelos de lenguaje en el desarrollo de
        software: no como conversaciones aisladas y dispersas, sino como un proceso reproducible con papeles definidos,
        límites claros y resultados verificables.

Expliqué el esquema general por separado en la publicación
        [Cómo convertir la intención del usuario en una evolución controlada del producto](/es/library/concepts/20260519-controlled-product-evolution.html).
        Esa publicación funciona aquí como marco de referencia: lo que hasta hace poco era una idea general ya ha empezado
        a funcionar en la práctica.
