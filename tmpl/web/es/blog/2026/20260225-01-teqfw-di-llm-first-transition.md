---
title: "@teqfw/di pasa a un flujo de trabajo LLM-first"
description: "Pasé @teqfw/di a un flujo donde la documentación para el agente pesa más que retener todo el contexto en la cabeza. También republico el artículo sobre este cambio como una página separada de biblioteca."
date: 2026-02-25
display_date: "25 de febrero de 2026"
image: "/img/brand/teqfw.webp"
image_alt: "@teqfw/di en un flujo de trabajo LLM-first"
---

# @teqfw/di pasa a un flujo de trabajo LLM-first

<zoom-img src="/img/brand/teqfw.webp" alt="@teqfw/di en un flujo de trabajo LLM-first" width="100px"></zoom-img>

Hace aproximadamente una semana cambié el desarrollo de **@teqfw/di** a un flujo de trabajo
        nuevo: ahora escribo no solo código y mis propias reglas, sino ante todo documentación para un agente LLM,
        que después aplica esas reglas a una gran cantidad de archivos pequeños.

Este cambio afectó no solo mi forma de trabajar, sino también la arquitectura del paquete. La versión
        [@teqfw/di 2.0.0](https://www.npmjs.com/package/@teqfw/di/v/2.0.0)
        es incompatible con la línea `1.2.0` porque allí cambia el concepto de declaración de dependencias.

El análisis detallado de por qué tomé esta decisión, cómo el agente Codex reescribió la biblioteca y cómo
        están cambiando las reglas para personas y agentes está reunido en una página separada de la biblioteca:
        [Declaración de (No)Dependencias para ESM](/es/library/teqfw/20260225-01-deklaratsiya-ne-zavisimostey-dlya-esm.html).

En resumen, ahora la persona define los límites y el agente los rellena con código funcional. Para cambios
        pequeños y repetibles, eso ya resulta más práctico que intentar mantener todo el proyecto en modo manual.
