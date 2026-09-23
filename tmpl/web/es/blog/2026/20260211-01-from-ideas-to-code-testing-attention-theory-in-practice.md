---
title: "De las ideas al código: pongo a prueba la teoría de la atención en la práctica"
description: "Describo mi aplicación Mindstream , desarrollada con ADSM, donde las señales de atención en el navegador se convierten en un marcador de interés mediante embeddings; la publicación original explica el modelo y sus limitaciones."
date: 2026-02-11
display_date: "11 de febrero de 2026"
image: "/img/blog/2026/20260211-01-from-ideas-to-code-testing-attention-theory-in-practice.png"
image_alt: "De las ideas al código: pongo a prueba la teoría de la atención en la práctica"
---

# De las ideas al código: pongo a prueba la teoría de la atención en la práctica

<zoom-img src="/img/blog/2026/20260211-01-from-ideas-to-code-testing-attention-theory-in-practice.png"
        alt="De las ideas al código: pongo a prueba la teoría de la atención en la práctica" width="100px"></zoom-img>

Implementé Mindstream como un experimento de ingeniería y una aplicación funcional:
        [mindstream.app.wiredgeese.com](https://mindstream.app.wiredgeese.com/).
        El sistema lee Habr por RSS, genera anotaciones y resúmenes con LLM, y forma un único feed. La personalización se
        construye en el navegador: las acciones del usuario se interpretan como señales de atención y, a partir de ellas,
        se ensambla localmente un vector de intereses.

El marcador de interés se calcula a partir del embedding del resumen: el resumen sirve como un portador compacto
        del significado de la publicación, el embedding determina su posición en el espacio semántico y la distancia al
        vector actual de intereses se usa como un indicador relativo de correlación. La aplicación está escrita por mí
        usando el enfoque ADSM (Agent-Driven Software Management): la documentación fija invariantes, el código se deriva
        de ella y los agentes se utilizan como una herramienta de desarrollo guiado. El artículo completo en ruso está
        publicado en Habr.

[Leer el original en Habr](https://habr.com/ru/articles/995070/)
