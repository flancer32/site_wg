---
title: "Integración de @teqfw/di y OpenAI SDK en una extensión de Chrome"
description: "Un prototipo de extensión MV3 que usa @teqfw/di mostró tres problemas: manejo de rutas, límites de CSP y ejecución del OpenAI SDK en el navegador. El contenedor DI facilitó probar el código en Node.js y ejecutarlo en la extensión, pero ya requiere mejoras."
date: 2025-08-28
display_date: "28 de agosto de 2025"
image: "/img/blog/2025/08/28-01-di-openai-extension.png"
image_alt: "@teqfw/di y OpenAI SDK"
---

# Integración de @teqfw/di y OpenAI SDK en una extensión de Chrome

<zoom-img
    src="/img/blog/2025/08/28-01-di-openai-extension.png"
    alt="@teqfw/di y OpenAI SDK"
    width="100px"
    style="float: left; margin: 15px 15px 0 0"
  ></zoom-img>

Probé crear un prototipo de extensión de Chrome (MV3) para comprobar cómo funciona
    [@teqfw/di](https://github.com/teqfw/di) en un entorno restringido y al conectar un SDK de terceros. De inmediato aparecieron tres áreas problemáticas: configuración del contenedor, restricciones de CSP y ejecución del OpenAI SDK en el navegador.

### 1. Rutas relativas

**Problema**: en la extensión no se pueden usar rutas absolutas al configurar el espacio de nombres en el contenedor. Las rutas absolutas dentro de una extensión de Chrome funcionan de forma distinta a un navegador normal o a Node.js.

- En **Node.js**, los módulos se cargan mediante `file://…`.

- En el **navegador** — mediante `http(s)://…`.

- En una **extensión de Chrome** — solo a través de `chrome-extension:// /…`.

**Solución**: al configurar el contenedor de objetos, usar siempre `import.meta.url` para construir rutas relativas.

### 2. CSP y análisis de dependencias

La CSP en MV3 prohíbe por completo `new Function`. En una versión anterior del contenedor se utilizaba este recurso para analizar dependencias, pero fue necesario pasar a una opción compatible sin código dinámico. Gracias a ello, el contenedor DI sigue funcionando bajo las estrictas limitaciones de las extensiones.

### 3. OpenAI SDK y limitaciones del navegador

El propio **OpenAI SDK** en el navegador requiere activar la opción `dangerouslyAllowBrowser: true`. Es una protección contra la filtración accidental de la clave API. En mi prototipo, la clave se almacena en `chrome.storage.local` en texto plano. Para una extensión eso es aceptable, pero aun así conviene añadir al menos una ligera ofuscación.

### Ventajas del contenedor DI

El contenedor DI [@teqfw/di](https://github.com/teqfw/di) integró los módulos ESM del OpenAI SDK como dependencias normales. Esto dio dos efectos inmediatos: el código se puede probar en **Node.js** y ejecutar en la **extensión de Chrome** sin cambios. El contenedor trabaja solo con los **módulos ESM** del SDK, lo cual coincide con el formato moderno.

Hace una semana lancé la primera versión estable de
    [@teqfw/di](https://wiredgeese.com/ru/blog/2025/20250821-02-teqfw-di-release.html), pero ya han surgido nuevas solicitudes de mejora: se necesita un "modo seguro" sin `new Function`. Este experimento demostró que incluso con las estrictas limitaciones de MV3 es posible construir una arquitectura flexible basada en
    [@teqfw/di](https://github.com/teqfw/di).
