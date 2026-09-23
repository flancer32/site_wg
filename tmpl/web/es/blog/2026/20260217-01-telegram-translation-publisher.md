---
title: "Telegram Translation Publisher: ADSM y la evolución guiada de una aplicación creada por un agente"
description: "Una herramienta CLI en Node.js creada por un agente sobre una arquitectura definida de antemano: un ejemplo de evolución controlada del proyecto con ADSM."
date: 2026-02-17
display_date: "17 de febrero de 2026"
image: "/img/brand/teqfw.webp"
image_alt: "Telegram Translation Publisher: ADSM y la evolución guiada de una aplicación creada por un agente"
---

# Telegram Translation Publisher: ADSM y la evolución guiada de una aplicación creada por un agente

<zoom-img src="/img/brand/teqfw.webp"
        alt="Telegram Translation Publisher: ADSM y la evolución guiada de una aplicación creada por un agente"
        width="100px"></zoom-img>

Creé una pequeña herramienta de consola en Node.js que traduce automáticamente mis publicaciones de Telegram del
        ruso al inglés y al español a través de la API de OpenAI. La primera versión funcional se generó casi por
        completo con un agente de Codex a partir de un solo prompt. Después solo hice algunos ajustes, sobre todo por el
        uso de mi contenedor de DI y la integración con la arquitectura elegida.

La mayor parte del trabajo ocurrió antes de escribir código. Dedique unas cuatro horas a construir la base
        arquitectónica con la metodología ADSM: fijé invariantes, límites del producto, el modelo de interacción con la
        API de Telegram y las restricciones del stack. Con ese marco definido, el agente trabajó dentro de él y armó la
        aplicación en cuestión de minutos.

Al cambiar la descripción del producto en el contexto, obtengo un comportamiento distinto del sistema sin tener
        que reconstruir la arquitectura. Así la evolución del proyecto es gradual y controlada: el código pasa a ser una
        consecuencia de una estructura definida de antemano. Este caso muestra cómo, con un stack concreto—Node.js, la
        API de Telegram y la API de OpenAI—se puede crear un entorno donde un agente genera la implementación dentro de
        un modelo preestablecido.

[Repositorio del proyecto](https://github.com/flancer64/tg-wa-blog-post)

        [Base arquitectónica y contexto (ctx/docs)](https://github.com/flancer64/tg-wa-blog-post/tree/main/ctx/docs)
