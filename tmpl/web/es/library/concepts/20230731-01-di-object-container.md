---
title: "Dependency Injection sin misterio: un contenedor de objetos simple para JavaScript moderno"
description: "Un recorrido paso a paso desde el Composition Root hasta un contenedor de objetos y enlace tardío de módulos ES en JavaScript."
date: 2023-07-31
---

IoC reduce el acoplamiento del código JavaScript: un módulo no importa
estáticamente una implementación concreta, sino que recibe los objetos
necesarios desde fuera. Este es un recorrido didáctico hacia un
contenedor de objetos pequeño. Se refiere a JavaScript ES6+ sin
transpilación, no a decoradores TypeScript.

El objetivo no es una biblioteca universal lista para usar, sino
comprender la mecánica: cargar módulos ES, crear dependencias e
insertarlas en el lugar adecuado. El contenedor de demostración ocupa
unas 35 líneas.

## 1. Composition Root

Con control directo, el servicio importa su logger:

``` js
import logger from './logger.js';
export default class Service {
  exec(opts) { logger.info(JSON.stringify(opts)); }
}
```

Con inversión, el servicio recibe la dependencia por constructor:

``` js
export default class Service {
  constructor(logger) {
    this.exec = (opts) => logger.info(JSON.stringify(opts));
  }
}
```

Alguien sigue teniendo que importar y crear los objetos. Ese lugar es el
Composition Root:

``` js
import logger from './logger.js';
import Service from './service.js';
const service = new Service(logger);
service.exec({ name: 'Composition Root' });
```

## 2. Fábricas

Para simplificar la demostración, cada módulo exporta una fábrica
asíncrona que recibe dependencias y produce el resultado:

``` js
export default async function factory(logger) {
  return (opts) => logger.info(JSON.stringify(opts));
}
```

En código real un export puede ser clase, función u objeto; este acuerdo
solo aclara el siguiente paso.

## 3. Especificación de dependencias

Los nombres de argumentos comunes pueden cambiar con minificación. Por
eso se pasan dependencias en un solo objeto:

``` js
function factory({ logger, config }) { /* ... */ }
```

Al principio se puede usar temporalmente la ruta del módulo como clave:

``` js
export default async function factory({ ['./logger.js']: logger }) {
  return (opts) => logger.info(JSON.stringify(opts));
}
```

Así el contenedor recibe la información que debe analizar.

## 4. Analizador de especificación

El ejemplo simplificado convierte una función en texto, extrae
parámetros con una expresión regular y obtiene las claves. Es un recurso
didáctico, no una recomendación de producción: en un contenedor real el
contrato debe declararse mediante metadatos explícitos y fiables.

## 5. Contenedor

El contenedor importa recursivamente módulos, encuentra dependencias,
construye la especificación y guarda resultados en caché:

``` js
const cache = {};
async function get(key) {
  if (cache[key]) return cache[key];
  const { default: factory } = await import(key);
  const spec = {};
  for (const path of parse(factory.toString())) spec[path] = await get(path);
  return (cache[key] = await factory(spec));
}
```

Ahora el Composition Root se reduce a una línea:

``` js
const service = await container.get('./service.js');
```

## 6. Resolver y enlace tardío

Las rutas en la especificación aún atan el código a detalles. El paso
final deja únicamente abstracciones:

``` js
export default async function factory({ logger, config }) {
  return (opts) => logger.info(`${config.appName}: ${JSON.stringify(opts)}`);
}
```

La correspondencia entre abstracción e implementación se mueve a un mapa
de root:

``` js
container.setMap({
  service: './service.js',
  logger: './logger.js',
  config: './config.js',
});
const service = await container.get('service');
```

Eso es enlace tardío: al iniciar se puede elegir un logger de consola o
archivo sin reescribir el servicio. El código pasa de ser una estructura
«soldada» a una «atornillada»: un módulo se separa y reutiliza con más
facilidad.

En un proyecto grande nadie mantiene manualmente un mapa para cada
nombre. Las convenciones convierten `Vendor_Package_Mod` en una ruta
como `node_modules/@vendor/package/src/Mod.js`; el identificador incluso
puede incluir ciclo de vida o ámbito.

## Conclusión

DI resulta especialmente útil con muchos archivos y paquetes: reduce
acoplamiento y mejora pruebas. En frontend tradicional los bundlers
suelen ocultar módulos individuales, pero en una PWA Service Worker
puede descargar y cachear conjuntos de archivos ES. Así el mismo
principio de enlace funciona en Node.js y navegador. Para producción
conviene usar un contenedor maduro como
[@teqfw/di](https://github.com/teqfw/di), no el parser didáctico del
artículo.

## Fragmentos adicionales de código fuente

    export default async function Factory({[‘./logger.js’]: logger}) {
    return function (opts) {
    logger.info(Service is running with: ${JSON.stringify(opts)});
    };
    }

    import fLogger from ‘./logger.js’;
    import fService from ‘./service.js’; const logger = await fLogger();
    const serv = await fService({[‘./logger.js’]: logger});
    serv({name: ‘The Spec’});

    function Factory(
    {
    }
    ) { }

    function parser (def) {
    const res = [];
    const parts = /function Factory({(.)})./s.exec(def);
    if (parts?.[1]) {
    const deps = parts[1].split(‘,’);
    for (const dep of deps) {
    const left = dep.split(‘:’)[0];
    const path = left.trim()

    res.push(path);
    }
    }
    return res;
    }; const paths = parser(factory.toString());

    const deps = {}; const FN = /function Factory({(.)})./s;
    function parser(def) {
    const res = [];
    const parts = FN.exec(def);
    if (parts?.[1]) {
    const deps = parts[1].split(‘,’);
    for (const dep of deps) {
    const left = dep.split(‘:’)[0];
    const path = left.trim()

    res.push(path);
    }
    }
    return res;
    }
    async function get(key) {
    if (deps[key]) return deps[key];
    else {
    const {default: factory} = await import(key);
    const def = factory.toString();
    const paths = parser(def);
    const spec = {};
    for (const path of paths)
    spec[path] = await get(path);
    const res = factory(spec);
    deps[key] = res;
    return res;
    }
    }
    export default {get};

    import container from ‘./container.js’; const serv = await container.get(‘./service.js’);
    serv({name: ‘The Object Container’});

    import logger from ‘./logger.js’; export default function {
    logger.info(Service is running with: ${JSON.stringify(opts)});
    }

    export default async function Factory({[‘./logger.js’]: logger}) {
    return function (opts) {
    logger.info(Service is running with: ${JSON.stringify(opts)});
    };
    } In both cases, we use “details” (speaking in terms of the Dependency Inversion Principle). In this step, we remove the details from the dependency specification and leave only abstractions:
    export default async function Factory({logger, config}) {
    return function (opts) {
    logger.info(Service '${config.appName}' is running with: ${JSON.stringify(opts)});
    };
    }

    import container from ‘./container.js’; const map = {

    };
    container.setMap(map);
    const serv = await container.get(‘service’);
    serv({name: ‘The Resolver’});
