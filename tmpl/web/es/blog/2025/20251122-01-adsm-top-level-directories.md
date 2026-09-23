---
title: "ADSM: directorios de nivel superior"
description: "Mi enfoque personal para organizar la estructura básica de archivos de los proyectos en consonancia con la metodología ADSM."
date: 2025-11-22
display_date: "22 de noviembre de 2025"
image: "/img/blog/2025/20251122-01-adsm-top-level-directories.png"
image_alt: "ADSM: directorios de nivel superior"
---

# ADSM: directorios de nivel superior

<zoom-img src="/img/blog/2025/20251122-01-adsm-top-level-directories.png"
        alt="ADSM: directorios de nivel superior" width="100px"></zoom-img>

*La motivación del enfoque AFKP se explica en el artículo "[Cuando el conocimiento es demasiado](https://habr.com/ru/articles/963910/)". Este fragmento corresponde a la etapa 2 del AFKP (resonancia). En Habr también se publicó [otra variante](https://habr.com/ru/articles/967452/) de las dos primeras etapas del AFKP: enganche y resonancia. Esta es una versión más compacta del texto para la etapa de resonancia.*

En ADSM divido un proyecto en dos grandes áreas: código y documentación. El código depende del lenguaje de
        programación elegido, y la documentación la divido a su vez en tres zonas:

- **agent** – zona para comunicarse con los agentes, donde se registran los informes y las plantillas
            de prompt;

- **product** – descripción comercial del producto que establece el esqueleto de la aplicación futura
            y define el campo de acción del agente;

- **rules** – un conjunto de reglamentos que describe cómo debe crearse el producto de software en el
            lenguaje elegido.

Esta estructura de directorios refleja mi experiencia trabajando con agentes LLM y está diseñada para que la
        documentación y el código coexistan como un único espacio que tiene en cuenta la naturaleza lingüística de los
        modelos y sus limitaciones estadísticas. Ayuda a mantener el enfoque del agente y a guiar su trabajo dentro de los
        límites necesarios.

[Leer el texto completo (etapa 3 del AFKP – inmersión) .](/es/library/adsm/20251122-01-adsm-top-level-dirs.html)
