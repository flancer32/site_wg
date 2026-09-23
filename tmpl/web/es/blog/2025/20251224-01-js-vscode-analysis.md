---
title: "JavaScript en VSCode: lenguaje, herramienta y modelo de análisis"
description: "Por qué el análisis de JavaScript en VSCode se apoya en el modelo TypeScript, cómo funciona tsserver y dónde dejan de verse los enlaces dinámicos."
date: 2025-12-24
display_date: "24 de diciembre de 2025"
image: "/img/blog/2025/20251224-01-js-vscode-analysis.png"
image_alt: "JavaScript en VSCode"
---

# JavaScript en VSCode: lenguaje, herramienta y modelo de análisis

<zoom-img src="/img/blog/2025/20251224-01-js-vscode-analysis.png" alt="JavaScript en VSCode" width="100px"></zoom-img>

En VSCode, JavaScript se analiza no como un lenguaje independiente, sino como una proyección del modelo de tipos
        de TypeScript, atendida por `tsserver`. Esto fija los límites de lo que la IDE puede ver en el código y
        explica por qué algunas construcciones se analizan de forma predecible mientras otras quedan opacas.

En la publicación examino el rol de `jsconfig.json`, la arquitectura del Language Server Protocol y el
        lugar de JSDoc en el modelo de análisis orientado a TypeScript. También muestro por qué las dependencias dinámicas
        y el enlace tardío quedan fuera del modelo TypeScript que usa VSCode.

El texto completo está disponible en el
        [material de la biblioteca](/es/library/teqfw/20251224-01-js-vscode-analysis.html).
