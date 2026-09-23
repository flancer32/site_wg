---
title: "ADSM: iteratividad y jerarquía"
description: "El artículo explica por qué el contexto limitado del Modelo impone un desarrollo iterativo y por qué se requiere una jerarquía de conocimiento para mantener la generación estable."
date: 2025-09-18
display_date: "18 de septiembre de 2025"
image: "/img/blog/2025/20250918-01-adsm-iterative-and-hierarchical.png"
image_alt: "ADSM: iteratividad y jerarquía"
---

# ADSM: iteratividad y jerarquía

<zoom-img src="/img/blog/2025/20250918-01-adsm-iterative-and-hierarchical.png" alt="ADSM: iteratividad y jerarquía"
        width="100px"></zoom-img>

La limitación del contexto de salida determina los límites del uso de los Modelos al trabajar con una
        base de código. La generación solo es posible de forma iterativa: un Modelo produce un resultado fiable
        cuando el contexto de entrada es significativamente mayor que el de salida, provocando un estrechamiento
        predecible. El proyecto se divide en archivos pequeños, cada uno creado dentro de un contexto controlado.
        La repetibilidad se garantiza gracias a fragmentos de conocimiento fijos organizados como un árbol
        jerárquico: desde los principios generales hasta los datos únicos de cada origen. Esta estructura forma
        una base estable que permite a los Agentes desarrollar grandes proyectos sin romper la lógica subyacente.
        El artículo completo está disponible en ruso en Habr.

[Leer el original en Habr](https://habr.com/ru/articles/948282/)
