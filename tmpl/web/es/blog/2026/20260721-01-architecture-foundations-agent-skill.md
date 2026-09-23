---
title: "Una habilidad para agentes sobre fundamentos de arquitectura"
description: "Una primera versión experimental para examinar la complejidad arquitectónica, los límites, la responsabilidad, la autoridad y el cambio en sistemas informáticos."
date: 2026-07-21
display_date: "21 de julio de 2026"
image: "/img/brand/agent-skills-cover.png"
image_alt: "Una habilidad para agentes para explorar la arquitectura de sistemas informáticos"
---

# Una habilidad para agentes sobre fundamentos de arquitectura

<zoom-img src="/img/brand/agent-skills-cover.png"
        alt="Una habilidad para agentes para explorar la arquitectura de sistemas informáticos" width="100px"></zoom-img>

Encontré un artículo de Habr, [Programación como metafísica experimental](https://habr.com/ru/articles/1061112/),
        escrito por [nifigase](https://habr.com/ru/users/nifigase/).
        Es una lectura fascinante y exigente: observa la arquitectura de los programas a través de varias distinciones
        filosóficas. Pedí a un agente de Codex que convirtiera sus ideas prácticas en una habilidad para examinar
        proyectos reales. El resultado es **architecture-foundations**, una primera versión pública y
        experimental.

La habilidad no pretende demostrar que una arquitectura concreta sea siempre la correcta. Ayuda al agente a
        hacer visibles las preguntas que suelen quedar ocultas en las decisiones de diseño: dónde están el estado y la
        identidad, quién se responsabiliza del estado y puede modificarlo, qué garantiza realmente un límite, cómo se
        coordinan los componentes y dónde se definen la autoridad y los objetivos.

Una conclusión útil es que la concurrencia se vuelve difícil cuando varios ejecutores comparten un estado que
        todos pueden modificar. Hay dos maneras independientes de reducir esa dificultad: compartir libremente valores
        que no cambian, o dejar el estado modificable bajo la responsabilidad de un único componente y comunicarse
        mediante mensajes explícitos. La
        misma perspectiva ayuda a distinguir una interfaz como contrato acotado de una herencia que transmite
        implementación y dependencia entre componentes.

Es especialmente relevante para sistemas de agentes de IA. En un modelo de lenguaje, las instrucciones, los
        datos y los objetivos pueden llegar todos como texto. Por tanto, un mensaje puede afectar no solo al estado
        almacenado, sino también a la interpretación de reglas y objetivos. El paso de mensajes no basta en los límites
        internos: hacen falta tipos de mensaje explícitos, instrucciones y datos separados, contenido validado,
        permisos limitados, un registro de auditoría y un procedimiento deliberado para cambiar la autoridad o los objetivos.

La habilidad tiene tres modos: análisis de un sistema existente, definición de un modelo de funcionamiento
        deseado y transición del modelo actual a ese modelo. Expone las evidencias, los supuestos, las incógnitas,
        los compromisos y las condiciones para revisar la decisión, de modo que una persona pueda valorar la conclusión
        en vez de aceptar un dictamen opaco.

Se puede instalar con una herramienta compatible para gestionar habilidades:

```
npx skills add flancer32/skill-architecture-foundations --skill architecture-foundations
```

También puede copiar el directorio `architecture-foundations` al lugar donde el agente busca sus
        habilidades, por ejemplo `~/.agents/skills/`. El código fuente, las instrucciones de instalación,
        los ejemplos y las limitaciones están en el [repositorio de GitHub](https://github.com/flancer32/skill-architecture-foundations).

Esta es la versión 0.1.0: una base de trabajo, no una teoría acabada. El siguiente paso es probarla en proyectos
        reales, comparar el trabajo con y sin la habilidad y comprobar si estas perspectivas ayudan a descubrir formas
        concretas de simplificar su evolución.
