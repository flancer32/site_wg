---
title: "Aplicaciones de un solo uso y ADSM"
description: "Un pequeño experimento: la metodología ADSM ayudó a crear una utilidad desechable para monitorear anuncios de alquiler de apartamentos. El agente construyó la arquitectura, mientras que las pequeñas correcciones fue más fácil hacerlas a mano."
date: 2025-08-15
display_date: "15 de agosto de 2025"
image: "/img/avatar.jpg"
image_alt: "Aplicaciones de un solo uso y ADSM"
---

# Aplicaciones de un solo uso y ADSM

<zoom-img
            src="/img/avatar.jpg"
            alt="Aplicaciones de un solo uso y ADSM"
            width="100px"
            style="float: left; margin: 15px 15px 0 0;"
    ></zoom-img>

Surgió una necesidad familiar de crear una pequeña aplicación para monitorear anuncios de alquiler de apartamentos en un distrito concreto de nuestra ciudad. Aproveché la ocasión para probar cómo funciona la metodología **ADSM** como herramienta para desarrollar utilidades desechables.

La experiencia mostró que la separación entre código y contexto también funciona fuera de los sitios web. De hecho, la palabra «Site» de la sigla se convirtió en «Software»: **Agent Driven Software Management**. El agente ayudó a formar la arquitectura principal y a escribir la mayor parte del código; a mí me tocó precisar detalles. También quedó claro que las pequeñas correcciones es más sencillo hacerlas a mano que explicárselas al agente en el contexto.

Se hizo evidente que el contexto debe incluir bloques grandes de especificaciones: descripciones de la arquitectura y de los enfoques. Estos bloques deben trasladarse de un proyecto a otro si las tareas son similares. Este enfoque hace que ADSM sea aplicable al desarrollo de pequeñas utilidades necesarias aquí y ahora y permite usar agentes para escribir programas con un ciclo de vida limitado.
