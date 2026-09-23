---
title: "IoC en JavaScript normal (ES6+)"
description: "Una explicación práctica de la inversión de control en JavaScript con módulos ES, contratos e inyección de dependencias."
date: 2023-07-17
---

La inversión de control (IoC) puede resultar menos intuitiva en
JavaScript que en PHP, Java o TypeScript: el lenguaje no tiene
interfaces incorporadas. Aquí hablamos de código ES6+ organizado en
módulos ES y enlazado con `import`/`export`.

## Importar es depender

En el nivel de módulo, cualquier importación estática o dinámica es una
dependencia de otro módulo. Por ejemplo, `service` depende de un
`logger` concreto:

``` js
import logger from './logger.js';
export class Service { /* ... */ }
```

Quien desarrolla el servicio puede seguir ese import y ver la
implementación:

``` js
export default {
  error: (msg) => console.error(msg),
  info: (msg) => console.info(msg),
};
```

Después la usa directamente dentro del módulo:

``` js
import logger from './logger.js';
export class Service {
  exec() { logger.info('Service is running.'); }
}
```

Con este enfoque los módulos quedan unidos rígidamente por `import` en
una jerarquía única desde el momento de escribir el código.

## La inversión de control

Supongamos varios loggers: de consola, archivo, red o base de datos.
Distintas personas pueden crearlos por separado, pero primero deben
acordar el contrato:

``` js
/** @interface */
class ILogger {
  error(msg) {}
  info(msg) {}
}
```

No es código destinado a ejecutarse; es un acuerdo que JSDoc deja claro
para personas e IDE. Las implementaciones lo respetan:

``` js
class LoggerFile { error(msg) {} info(msg) {} }
class LoggerNet  { error(msg) {} info(msg) {} }
```

La persona que escribe `Service` no sabe qué logger se elegirá al
ejecutar la aplicación, así que acepta la dependencia desde fuera,
normalmente por el constructor:

``` js
export class Service {
  constructor(logger) { this.logger = logger; }
  exec() { this.logger.info('Service is running.'); }
}
```

Ahí aparece IoC: el servicio no decide de dónde llega su dependencia; lo
hace código externo, habitualmente un contenedor de objetos. Las
conexiones se establecen en tiempo de ejecución y pueden variar según
las condiciones, en lugar de quedar fijadas por imports estáticos en
todos los módulos.

## Qué aporta

En un proyecto con DI, casi todos los imports pueden quedarse en el
composition root, el lugar donde se ensambla la aplicación. Los módulos
deben permitir la inyección por constructor o setter. Así quedan menos
acoplados y pueden trasladarse a otro proyecto si este ofrece los
contratos necesarios.

Esto se aprecia especialmente al probar. En vez de un logger de archivo
o red, pasamos una pequeña simulación:

``` js
const logger = { error(msg) {}, info(msg) {} };
const service = new Service(logger);
service.exec();
```

La prueba controla el comportamiento de la dependencia sin remitirse a
una implementación concreta. Arquitectónicamente, IoC trata primero de
cómo se fabrican los «ladrillos» y después de cómo se unen. Unos módulos
bien preparados se pueden combinar de muchas maneras.

<zoom-img src="/medium/img/1b2e701f331d/image-01.jpg" alt="Ladrillos con los que se construye una aplicación" width="100%"></zoom-img>

Por eso, módulos ES6 que no están atados mediante imports estáticos a
servicios concretos pueden servir como bloques tanto para una aplicación
de navegador como para una de Node.js.
