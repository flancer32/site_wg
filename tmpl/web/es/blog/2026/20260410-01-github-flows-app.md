---
title: "@teqfw/github-flows recibe una aplicación anfitriona"
description: "Se preparó una aplicación anfitriona para @teqfw/github-flows, con servidor, registros y configuraciones en el navegador, y apoyada en tokens de acceso personal de GitHub y tokens OAuth de Codex."
date: 2026-04-10
display_date: "10 de abril de 2026"
image: "/img/brand/github.png"
image_alt: "GitHub"
---

# @teqfw/github-flows recibe una aplicación anfitriona

<zoom-img src="/img/brand/github.png" alt="GitHub" width="100px"></zoom-img>

Para
        **[@teqfw/github-flows](https://www.npmjs.com/package/@teqfw/github-flows)**
        se preparó la aplicación anfitriona
        [github-flows-app](https://github.com/flancer32/github-flows-app).
        Aporta la capa operativa alrededor del servidor, el acceso a los datos desde el navegador y las tareas de
        servicio, y se mantiene por encima de la biblioteca.

La biblioteca está pensada como núcleo común. Recibe eventos de GitHub, reúne los datos necesarios para la
        ejecución y pone en marcha al agente en Docker. El comportamiento de los agentes y la lógica de los
        flujos se definen aparte, en archivos JSON y MD organizados en una jerarquía de directorios. Esos archivos
        deciden cuándo arrancan los agentes y qué instrucciones reciben.

La aplicación anfitriona sirve para arrancar el servidor, ver los registros y las configuraciones en el
        navegador, y ejecutar tareas de mantenimiento como limpiar datos antiguos. Con esas mismas
        configuraciones también se definen los flujos: se puede permitir que los activen usuarios anónimos o solo
        cuentas concretas; el agente puede trabajar directamente en `main` o crear una rama para cada
        evento y abrir luego una solicitud de extracción.

En este momento, el acceso a GitHub usa un token de acceso personal, y Codex funciona con tokens OAuth de
        una suscripción Plus. Ya se ve como una configuración de servicio reproducible para un VPS: un servidor
        separado, gestión de configuraciones y visibilidad clara de cada ejecución. El proyecto avanza precisamente
        hacia ese estado, en el que el procesamiento de eventos de GitHub puede reconfigurarse mediante reglas
        guiadas por agentes.
