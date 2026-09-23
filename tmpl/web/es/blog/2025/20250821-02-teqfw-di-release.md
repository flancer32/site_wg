---
title: "Primera versión de @teqfw/di"
description: "Seis años después del primer commit, la biblioteca @teqfw/di recibió su primera versión. Se publicó en npm."
date: 2025-08-22
display_date: "21 de agosto de 2025"
image: "/img/brand/teqfw.webp"
image_alt: "Primera versión de @teqfw/di"
---

# Primera versión de @teqfw/di

<zoom-img
            src="/img/brand/teqfw.webp"
            alt="La biblioteca @teqfw/di"
            width="100px"
            style="float: left; margin: 15px 15px 0 0;"
    ></zoom-img>

El primer commit para **@teqfw/di** lo hice el 18 de agosto de 2019. Entonces surgió la idea:
        un cargador para módulos ES6 parecido a [requirejs](https://requirejs.org/) que
        funcionara tanto en el navegador como en Node.js. Durante estos años la biblioteca se reescribió varias
        veces y se probó en diferentes proyectos.

Después del artículo en [Habr](https://habr.com/ru/articles/887646/) comprendí que,
        para un uso amplio de la biblioteca, no debía existir la posibilidad de obtener el contenedor como dependencia.
        Para un equipo de confianza era conveniente, pero para proyectos abiertos resultaba demasiado arriesgado. Ayer
        cerré esa posibilidad y publiqué la primera versión —
        [1.0.1 en npm](https://www.npmjs.com/package/@teqfw/di/v/1.0.1).

Los demás plugins de la plataforma todavía se basan en el contenedor antiguo y son incompatibles con la nueva
        versión. Habrá que reescribirlos. Pero lo principal es que la biblioteca base de la plataforma por fin salió de
        la «etapa infantil», y estoy satisfecho con este paso.
