---
title: "Principios clave para crear documentación"
date: 2025-02-12
---

<zoom-img
            src="/img/brand/doc.svg"
            alt="Principios clave para crear documentación"
            width="100px"
            style="float: left; margin: 15px 15px 0 0;"
    ></zoom-img>

## Términos

- **Audiencia de la documentación** — grupo de personas y/o modelos de
  lenguaje (LLM) que utilizan la documentación para formar un contexto
  cognitivo. Incluye usuarios finales, desarrolladores, analistas y
  otras partes interesadas.
- **Contexto cognitivo** — conjunto de conocimientos, experiencia,
  expectativas y motivación que determina la percepción e interpretación
  de la información. Incluye tanto conocimientos previos como objetivos
  actuales.
- **Objeto de la documentación** — producto, proceso o concepto descrito
  en el documento: software, metodología, proceso de negocio, etc.

## Introducción

La documentación es el proceso de sincronizar el contexto cognitivo de
la audiencia (personas y LLM). El objetivo es garantizar una comprensión
integral del objeto descrito, comenzando con conceptos generales y
pasando a detalles. La información se presenta jerárquicamente, sin
duplicación, permitiendo tanto una revisión rápida como un estudio
profundo.

## Inmersión del lector en el contexto

La estructura de la documentación debe facilitar la rápida inmersión del
lector en el contexto cognitivo del objeto. Esto se logra con lógica,
secuencia y suficiente profundidad en la exposición.

## Jerarquía y estructura

La información se presenta por niveles: de lo general a lo específico.
Cada nivel complementa al anterior y forma una secuencia coherente,
orientada a las tareas actuales del lector.

### Niveles de documentación

- **Título** — nombre breve que refleja la esencia.
- **Resumen** — descripción muy breve del significado (ancla mental).
- **Introducción** — propósito del documento, su audiencia,
  establecimiento del contexto.
- **Resumen general** — breve exposición que permite evaluar la
  relevancia.
- **Sección principal** — descripción detallada, estructurada por
  dominio.

### Recomendaciones de volumen

- Título: 5–10 palabras, máximo \< 20
- Resumen: 30–50 palabras, máximo \< 150
- Introducción: 10–20 palabras, máximo \< 50
- Resumen general: 50–100 palabras, máximo \< 250
- Texto principal: 1000–3000 tokens, máximo \< 8000
  (<a href="https://platform.openai.com/tokenizer"
  target="_blank">tokenizador</a>)

## Accesibilidad de navegación

La documentación es una estructura interconectada donde cada documento
cubre un aspecto. Los hipervínculos, índices y referencias cruzadas
deben facilitar la navegación. El lector siempre debe entender su
posición en la estructura y tener la posibilidad de ir a temas
relacionados o volver al resumen general.

## Orientación a LLM

La documentación debe considerar las características de los modelos de
lenguaje y formatearse en Markdown. La información clave debe estar al
inicio de las secciones. Es importante usar terminología uniforme,
evitar ambigüedades. La estructura debe ser lógica, jerárquica, con
marcado claro de títulos y listas. Las secciones deben ser
autosuficientes pero interrelacionadas.
