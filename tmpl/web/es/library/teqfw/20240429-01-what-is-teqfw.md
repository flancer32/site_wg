---
title: "¿Qué es TeqFW?"
description: "TeqFW es una plataforma JavaScript para aplicaciones web modulares de tamaño pequeño y mediano construidas por equipos reducidos."
date: 2024-04-29
---

TeqFW significa Tequila Framework: un framework de aplicaciones web
escrito en JavaScript puro. No pretende competir con plataformas grandes
como Angular, Laravel o Django; es un experimento práctico: comprobar si
una persona desarrolladora o un equipo full-stack pequeño puede crear
con solvencia aplicaciones para pequeñas y medianas empresas.

## Un lenguaje para toda la lógica

HTML y CSS son indispensables, pero la lógica programable de la web
puede vivir en un único lenguaje: JavaScript. Node.js hizo posible usar
la misma familia de herramientas en servidor y navegador. Para mí eso
implica menos cambios de contexto y más práctica en un instrumento:
dominar bien un lenguaje en frontend y backend en lugar de varios de
forma superficial.

## JSDoc en vez de transpilación

La transpilación es útil, pero el código que ejecuta el navegador pasa a
diferir del que se ve en el IDE. Eso complica depuración y
mantenimiento. TeqFW prefiere usar el mismo JavaScript que se ejecutará
y describir estructuras y contratos con [JSDoc](https://jsdoc.app/).
Ayuda a navegar y refactorizar sin limitar el lenguaje ni añadir una
fase de compilación.

## Inyección de dependencias

El elemento central es el [contenedor de
dependencias](https://github.com/teqfw/di), que funciona tanto en
navegador como en Node.js. Enlazar objetos en tiempo de ejecución reduce
acoplamiento, simplifica pruebas y permite que un plugin o envoltorio
modifique una función base sin cambiar su fuente.

En TeqFW, espacios de nombres, módulos ES y DI separan el código en tres
ámbitos:

- **Back**: solo servidor, Node.js y paquetes npm del servidor;
- **Front**: solo navegador, recursos web y lógica cliente;
- **Shared**: código común, enlazado cuando es posible mediante DI.

## Reutilización

El código se organiza en paquetes npm y se ensambla con un
`package.json` habitual. Los paquetes base son
[@teqfw/di](https://github.com/teqfw/di) y
[@teqfw/core](https://github.com/teqfw/core); según la necesidad se
añaden [@teqfw/db](https://github.com/teqfw/db),
[@teqfw/web](https://github.com/teqfw/web),
[@teqfw/i18n](https://github.com/teqfw/i18n) y otros.

Por ejemplo, una aplicación con área de cliente y administración puede
tener `@app/base` para modelos compartidos, `@app/client` y
`@app/admin`. Soluciones comunes como autenticación se extraen a
paquetes propios. Es habitual en Node.js, aunque menos común en el
navegador, donde muchas veces se construyen grandes bundles.

## Arquitectura de aplicación

TeqFW se dirige a aplicaciones de carga baja o moderada, mantenidas por
uno o dos equipos y orientadas al navegador móvil. PWA, Service Worker,
Cache Storage, IndexedDB y Web Push llevan procesamiento y caché
adecuados más cerca de la persona usuaria.

<zoom-img src="/medium/img/f84ab4c66abf/image-01.png" alt="Arquitectura típica de una aplicación TeqFW" width="100%"></zoom-img>

Los datos compartidos pueden residir en una base relacional del
servidor, los datos personales se cachean en IndexedDB y la lógica se
reparte entre frontend y backend. No es un conjunto de microservicios,
sino un monolito modular: dos aplicaciones independientes montadas a
partir de paquetes compatibles.

## Datos y capacidad de cambio

Para bases relacionales TeqFW usa una capa DBAL basada en Knex.js. Cada
paquete describe su fragmento de esquema y la aplicación los compone en
un Domain Entities Map para crear la estructura necesaria. Así un
paquete puede conectarse a distintos modelos de usuario en aplicaciones
distintas.

El objetivo principal es la modificabilidad: comprender rápido una pieza
y añadir una capacidad sin romper lo existente. DI, descomposición,
convenciones de argumentos y estructuras de archivos ayudan a ello. El
rendimiento máximo y la compatibilidad retrospectiva perfecta no son
prioridades absolutas; cada aplicación puede fijar versiones comprobadas
de sus paquetes.

## Conclusión

TeqFW explora el desarrollo modular de aplicaciones web JavaScript para
individuos y equipos pequeños. Su ecosistema incluye DI, ejecución
Node.js, bases de datos, correo, servidor web, HTTP/SSE/Web Push, Vue,
Quasar e internacionalización. Ya se usa en proyectos personales y
comerciales; su componente más maduro es
[@teqfw/di](https://github.com/teqfw/di).
