---
title: "Filosofía de la plataforma TeqFW"
date: 2025-02-12
---

<zoom-img
            src="/img/brand/teqfw.webp"
            alt="Filosofía de la plataforma TeqFW"
            width="100px"
            style="float: left; margin: 15px 15px 0 0;"
    ></zoom-img>

**La filosofía de Tequila Framework (TeqFW)** es mi visión personal
sobre el desarrollo web. Yo, Alex Gusev, he formulado este enfoque
basándome en mi propia experiencia y preferencias al crear aplicaciones
web. En su núcleo está el deseo de modularidad, flexibilidad y
adaptabilidad.

Esta filosofía abarca tanto aspectos aplicados del desarrollo web como
principios arquitectónicos más generales. Su objetivo es simplificar la
organización del código, reducir la complejidad y aumentar la
resistencia de los proyectos a los cambios.

Importante: mi experiencia se centra en el desarrollo de **monolitos
modulares**, no en microservicios. La prioridad principal es la
comodidad en el desarrollo y mantenimiento, sin gastos generales
excesivos.

Las ideas propuestas no requieren teoría compleja. Su fuerza radica en
la simplicidad y practicidad. Tequila Framework (TeqFW) sirve como
ejemplo de implementación de estos principios y como plataforma para
experimentos.

## Principios clave de TeqFW

1.  **Lenguaje único de desarrollo:** JavaScript (ES6+) en todos los
    niveles de la aplicación.
2.  **Vinculación tardía:** adaptación de enfoques de Java, C#, PHP —
    mediante contenedor de dependencias y espacios de nombres ES6.
3.  **Resistencia evolutiva:** el código se diseña considerando cambios
    sin necesidad de reescribir lo ya hecho.
4.  **Separación de datos y lógica:** aislamiento estricto entre DTO y
    manejadores.
5.  **Espacios de nombres:** para módulos, tablas, CLI, configuraciones
    y paquetes.
6.  **Sin transpilación:** JavaScript puro con JSDoc, sin TypeScript.
7.  **Integración de LLM en el desarrollo:** la estructura y estilo del
    proyecto consideran el trabajo con modelos de lenguaje.

## Detalles de los principios

### Lenguaje único de desarrollo

Usar JavaScript (ES6+) tanto en el cliente como en el servidor
simplifica el desarrollo, reduce la barrera de entrada y elimina la
brecha entre equipos. Esto reduce la redundancia lógica y facilita el
intercambio de conocimientos.

### Vinculación tardía

El contenedor de dependencias y los espacios de nombres permiten
gestionar flexiblemente las conexiones entre módulos. Este enfoque
facilita las pruebas y reduce riesgos en modificaciones.

### Resistencia evolutiva

El código se diseña considerando cambios: los argumentos de funciones se
pasan como objetos (destructuring), los DTO permiten campos "extra", se
usan interfaces e inyecciones en lugar de implementaciones rígidas.

### Separación de datos y lógica

DTO y manejadores están separados. Esto aumenta la modularidad, facilita
las pruebas y hace el código predecible en trabajo en equipo.

### Espacios de nombres

Cada tipo de entidad —desde módulos hasta CLI— se coloca en su propio
espacio de nombres. Esto simplifica la navegación, evita conflictos y
establece estándares para extender el código.

### Sin transpilación

TeqFW usa JavaScript moderno sin compilación ni tipado al estilo
TypeScript. En su lugar, se usan anotaciones JSDoc, lo que proporciona
soporte IDE sin complicar el pipeline.

### Integración de LLM en el desarrollo

El proyecto está organizado para que los LLM puedan analizar,
complementar y generar código. Se usa estructura plana, plantillas,
bloques repetitivos y niveles mínimos de anidación.

## Conclusión

Estos principios ayudan a construir monolitos modulares que son fáciles
de leer, desarrollar y adaptar. Incluso si la implementación puede ser
imperfecta, las ideas en sí siguen siendo prácticas y aplicables. Dan al
desarrollador una base para buscar soluciones por sí mismo —sin
dictados, pero con dirección.
