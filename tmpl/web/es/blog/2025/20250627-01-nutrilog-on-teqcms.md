---
title: "NutriLog migrado de Astro a TeqCMS"
description: "Abandoné Astro en favor de TeqCMS con SSR y Mustache. Ahora traduzco páginas con DeepSeek y las subo al servidor mediante GitHub Actions."
date: 2025-06-27
display_date: "27 de junio de 2025"
image: "/img/blog/2025/06/27-01.png"
image_alt: "NutriLog migrado de Astro a TeqCMS"
---

# NutriLog migrado de Astro a TeqCMS

<zoom-img
            src="/img/blog/2025/06/27-01.png"
            alt="NutriLog migrado de Astro a TeqCMS"
            width="100px"
            style="float: left; margin: 15px 15px 0 0;"
    ></zoom-img>

Desde el 27 de junio, el sitio web [NutriLog](https://nutrilog.app.wiredgeese.com/) ya no
        utiliza [Astro](https://astro.build/). Lo he migrado completamente a [TeqCMS](https://cms.teqfw.com/en/) — un CMS basado en archivos, implementado según
        la filosofía **TeqFW**.

El objetivo de la migración es simplificar la gestión del sitio e integrar traducciones automáticas mediante API de modelos lingüísticos,
        como [DeepSeek](https://www.deepseek.com/en). Ahora puedo crear y editar páginas localmente, en mi portátil, ejecutar traducciones del contenido y publicar los resultados a través de GitHub. El contenido en el repositorio Git se transfiere automáticamente al servidor mediante GitHub Actions.

En lugar de generación estática (SSG), ahora se utiliza **construcción de páginas en el servidor bajo demanda**. Esto
        no es adecuado para sitios con alto tráfico, pero me ofrece, como desarrollador, máxima flexibilidad y simplicidad.
        No hay parte cliente en el sitio — todo funciona en el lado del servidor, con generación mediante plantillas Mustache.

TeqCMS en este proyecto no es solo un motor de generación, sino parte de un experimento arquitectónico: cómo podría ser
        la gestión de contenido en condiciones de automatización completa de localización, SSR y control de versiones.
