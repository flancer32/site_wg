---
title: "Codex en modo autónomo en un servidor"
description: "Un agente Codex funcionó de manera autónoma en un servidor virtual de EE. UU., necesitó tres intentos para generar un archivo simple y dejó claro cuánto cuesta ese flujo en la práctica. El mismo patrón apunta a una gestión de issues mediante webhooks y a pequeños flujos automáticos de desarrollo."
date: 2026-03-12
display_date: "12 de marzo de 2026"
image: "/img/brand/codex.png"
image_alt: "Codex en modo autónomo en un servidor"
---

# Codex en modo autónomo en un servidor

<zoom-img src="/img/brand/codex.png"
        alt="Codex en modo autónomo en un servidor" width="100px"></zoom-img>

El 12 de marzo se puso un agente Codex en modo autónomo en uno de los servidores virtuales de Estados Unidos
        y se conectó a OpenAI con una clave de API. Hicieron falta tres intentos para obtener un resultado simple: el
        agente creó un archivo de texto con el saludo `Hello World!` en el directorio actual.

Lo curioso fue que el agente intentaba una y otra vez pasar al modo interactivo. Crear un archivo tan pequeño
        costó unos 10.000 tokens, es decir, aproximadamente 3 centavos. Después de eso quedó todavía más clara la
        impresión de que, para trabajo continuado, Codex probablemente sale más rentable por suscripción que por uso
        puntual de la API.

Una suscripción de 20 dólares al mes da para mucho. En los últimos seis meses no se llegó a los límites ni una
        sola vez, aunque tampoco se construyó nada especialmente grande con Codex.

El siguiente paso práctico parece claro: una pequeña aplicación web para recibir webhooks de GitHub, por
        ejemplo cuando se abre un issue, y usarla para lanzar el agente. El agente puede analizar el texto de la
        tarea, derivarla al trabajo o rechazarla directamente. Con suficiente financiación, eso ya alcanza para
        montar una pequeña agencia automática de desarrollo. En velocidad, no iría peor que gestionar issues
        manualmente en Magento. Eso sí, consumiría bastantes tokens.
