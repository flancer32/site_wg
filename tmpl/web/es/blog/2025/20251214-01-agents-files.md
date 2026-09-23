---
title: "AGENTS.md en ADSM: práctica y observaciones"
description: "Experiencia personal aplicando archivos AGENTS.md en el desarrollo de Svyazist y su rol en la metodología ADSM."
date: 2025-12-14
display_date: "14 de diciembre de 2025"
image: "/img/blog/2025/20251214-01-agents-files.png"
image_alt: "AGENTS.md en ADSM"
---

# AGENTS.md en ADSM: práctica y observaciones

<zoom-img src="/img/blog/2025/20251214-01-agents-files.png" alt="AGENTS.md en ADSM" width="100px"></zoom-img>

Durante el desarrollo del proyecto **Svyazist** fui configurando progresivamente
        el trabajo con el agente LLM mediante la estructura de archivos y las instrucciones textuales.
        Uno de los elementos clave de esta práctica fueron los archivos `AGENTS.md`.

Con el tiempo quedó claro que `AGENTS.md` funcionan no como un conjunto de órdenes,
        sino como un mecanismo de formación del contexto dentro del cual el agente toma decisiones.
        Su jerarquía, ubicación y estructura comenzaron a influir notablemente en la estabilidad del trabajo
        y en la repetibilidad de los resultados.

En [esta publicación](/es/library/adsm/20251214-01-agents-files.html) registré mi experiencia actual
        usando archivos AGENTS: dónde realmente ayudan, qué limitaciones tienen
        y por qué su papel en ADSM debe entenderse como arquitectónico
        y no como un control directo.
