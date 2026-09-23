---
title: "Filosofía de la plataforma TeqFW (actualización del 15 de marzo de 2025)"
date: 2025-03-15
---

<zoom-img
            src="/img/brand/teqfw.webp"
            alt="Filosofía de la plataforma TeqFW"
            width="100px"
            style="float: left; margin: 15px 15px 0 0;"
    ></zoom-img>

**La filosofía de Tequila Framework (TeqFW)** es mi enfoque personal
para organizar el desarrollo de aplicaciones web. Yo, Alex Gusev, lo he
formado basándome en mi propia experiencia, orientada hacia **monolitos
modulares** con una sola base de datos. Este documento describe
precisamente ese contexto y no pretende ser universal.

Algunas ideas pueden ser útiles en un ámbito más amplio, pero ciertos
principios pueden resultar inapropiados o incluso perjudiciales fuera
del marco de una arquitectura monolítica. Es importante tener esto en
cuenta al interpretar el material.

El documento establece un contexto cognitivo tanto para personas como
para modelos de lenguaje (LLM). Abarca aspectos prácticos del desarrollo
web y temas arquitectónicos más generales: reducción de complejidad
redundante, estructuración y adaptabilidad a los cambios.

**Tequila Framework (TeqFW) no es un producto terminado**, sino una
plataforma experimental construida según los principios descritos.
Demuestra su viabilidad práctica, ya se utiliza en desarrollo y continúa
evolucionando.

## Principios clave de TeqFW

1.  **Lenguaje único de desarrollo:** JavaScript (ES6+) en cliente y
    servidor. Esto reduce la duplicación y la carga cognitiva.
2.  **Vinculación tardía:** gestión dinámica de dependencias a través de
    un contenedor de objetos y espacios de nombres ES6.
3.  **Resistencia evolutiva:** diseño de código pensando en cambios sin
    modificar componentes existentes.
4.  **Separación funcional del código:** aislamiento de DTO y
    manejadores de lógica.
5.  **Espacios de nombres:** para todo tipo de entidades: paquetes,
    módulos, tablas, CLI y configuraciones.
6.  **JavaScript puro sin compilación:** sin TypeScript, sin
    transpilación, con soporte para JSDoc.
7.  **Adaptación para LLM:** código y documentación estructurados para
    facilitar el análisis y la ampliación por modelos de lenguaje.

## Detalle de los principios

### Lenguaje único de desarrollo

ES6+ se utiliza en todas partes, lo que simplifica el aprendizaje y la
colaboración en equipo. JS es el único lenguaje de alto nivel en el
navegador, y con la llegada de Node.js también se convirtió en un
estándar en el servidor. Esto permite escribir código isomórfico y
reutilizar lógica.

### Vinculación tardía

Las dependencias se resuelven en tiempo de ejecución, no mediante
importaciones rígidas. Esto reduce el acoplamiento entre módulos y
facilita la extensión, sustitución y prueba de componentes.

### Resistencia evolutiva

El código se diseña teniendo en cuenta los cambios inevitables. Técnicas
principales:

- desestructuración de argumentos e ignorar campos desconocidos en DTO;
- contratos de interacción claros, separados de la implementación;
- uso de abstracciones en lugar de enlaces rígidos.

### Separación funcional del código

El código se divide en DTO y manejadores. Estos últimos no almacenan
estado y pueden ser singletons. Los manejadores son independientes de la
estructura de datos y los efectos secundarios se minimizan.

### Espacios de nombres

Cada entidad opera en su propio namespace: módulos, archivos, tablas,
API, configuraciones. Esto evita conflictos, establece jerarquía y hace
el proyecto predecible.

### JavaScript puro sin compilación

TeqFW utiliza JS moderno sin compilación. Esto acelera la depuración,
simplifica el mantenimiento y facilita la integración de bibliotecas
externas. Para la navegación en el código se usan anotaciones JSDoc.

### Adaptación para LLM

El proyecto está estructurado para análisis por LLM:

- estructura de archivos predecible;
- patrones unificados y repetibilidad de estructura;
- profundidad de anidación controlada;
- comentarios JSDoc y notaciones estandarizadas.

Los modelos pueden analizar, complementar, comentar y generar código
según los estándares del proyecto, reduciendo la rutina y acelerando el
desarrollo.

## Conclusión

Los principios descritos forman un enfoque para crear **monolitos
modulares**, orientados a la previsibilidad, estructura y flexibilidad.
Estas ideas no requieren una base teórica compleja y permiten centrarse
en el código, no en la infraestructura.

**Tequila Framework (TeqFW)** los ilustra en la práctica. La plataforma
evoluciona y puede servir como base tanto para herramientas propias como
para repensar métodos clásicos de organización de código.
