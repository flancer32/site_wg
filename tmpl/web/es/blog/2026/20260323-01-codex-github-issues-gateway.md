---
title: "Puerta de enlace de incidencias de GitHub para Codex"
description: "Se montó una prueba de concepto para pasar incidencias de GitHub a un agente Codex. La puerta de enlace funciona con la cuenta adsm-agent y ya cubre varios repositorios, aunque todavía necesita más trabajo para quedar estable."
date: 2026-03-23
display_date: "23 de marzo de 2026"
image: "/img/blog/2026/20260323-01-codex-github-issues-gateway.jpg"
image_alt: "Puerta de enlace entre GitHub Issues y Codex"
---

# Puerta de enlace de incidencias de GitHub para Codex

<zoom-img src="/img/blog/2026/20260323-01-codex-github-issues-gateway.jpg"
        alt="Puerta de enlace de incidencias de GitHub para Codex" width="100px"></zoom-img>

Se montó una puerta de enlace entre incidencias de GitHub y un agente Codex como prueba de concepto. El
        flujo ya funcionaba. Se conecta a GitHub con la cuenta `adsm-agent` y tiene enlazados tres
        repositorios: la propia puerta de enlace, `teqfw.com` y el traductor de publicaciones de
        Telegram al inglés y al español. El perfil del agente está disponible en GitHub:
        [github.com/adsm-agent](https://github.com/adsm-agent).

A través de esta configuración se crearon varias incidencias que luego procesó el agente. En algunas el
        resultado fue muy bueno y rápido. En otras aparecieron límites de contexto y de manejo de restricciones.
        El balance general quedó claro: el concepto funciona, pero todavía hay que llevar su comportamiento a un
        estado estable de trabajo.

En la práctica, esto ya da una vía cómoda para pasar tareas al agente desde GitHub. El siguiente paso
        consiste en ajustar las reglas, afinar la entrada y dar un tratamiento más uniforme a los distintos tipos
        de incidencias.

Una tarea aparte que el agente ya procesó:
        [teqfw/di#44](https://github.com/teqfw/di/issues/44).
