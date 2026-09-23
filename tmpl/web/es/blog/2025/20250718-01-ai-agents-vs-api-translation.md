---
title: "API y agentes: dos enfoques para traducir páginas"
description: "En TeqCMS las traducciones se hacían mediante la API archivo por archivo, pero probé el enfoque con un agente: traducir varias páginas por sesión manteniendo el contexto. Ambos métodos son valiosos."
date: 2025-07-18
display_date: "18 de julio de 2025"
image: "/img/avatar.jpg"
image_alt: "API y agentes: dos enfoques para traducir páginas"
---

# API y agentes: dos enfoques para traducir páginas

<zoom-img
            src="/img/avatar.jpg"
            alt="API y agentes: dos enfoques para traducir páginas"
            width="100px"
            style="float: left; margin: 15px 15px 0 0;"
    ></zoom-img>

En TeqCMS, las traducciones de páginas se realizaban inicialmente a través de la API, archivo por archivo. Este método es simple y fiable: un archivo — una solicitud, y el resultado se integra fácilmente en CI/CD.

Pero recientemente probé otra opción: usar un **agente de IA** que trabaja con varias páginas en una sola sesión. El agente puede tener en cuenta el contexto general del sitio, traducir una serie de archivos de manera secuencial e incluso hacer ajustes sobre la marcha.

Ambos enfoques son valiosos: la API garantiza estabilidad y previsibilidad, mientras que los agentes aportan flexibilidad y permiten trabajar en un estilo editorial. Veo utilidad práctica en esta combinación y seguiré desarrollando las traducciones con agentes.
