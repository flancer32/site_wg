---
title: "TeqFW: inyección de dependencias"
description: "Guía práctica del contenedor @teqfw/di: módulos ES, identificadores de dependencia, ciclos singleton y transitorio, y resolución de fuentes."
date: 2021-06-09
---

Toda aplicación JavaScript crea objetos y los conecta. La inyección de
dependencias (DI) es una forma consolidada de hacer esas conexiones
explícitas y flexibles. TeqFW implementa DI en el paquete independiente
[@teqfw/di](https://github.com/teqfw/di).

## Requisitos

En TeqFW DI, el código se organiza como módulos ES, normalmente `*.mjs`.
El constructor de una clase o una fábrica recibe un único objeto `spec`.
El contenedor debe resolver un identificador hacia una fuente de módulo
o recibir la dependencia directamente de la aplicación.

## Qué hace el contenedor

Una petición típica es `await container.get(id)`. El contenedor:

1.  interpreta identificador;
2.  devuelve objeto en caché si existe;
3.  si no, resuelve e importa dinámicamente módulo;
4.  descubre y resuelve dependencias de constructor/fábrica de forma
    recursiva;
5.  crea objeto pedido;
6.  lo guarda si su ciclo de vida lo exige.

Construye el árbol recursivo antes de devolver el objeto a quien llama.

## Qué puede aportar un módulo ES

Un módulo puede exportar clase, fábrica u objeto plantilla:

``` js
const template = { name: 'Simple Object' };
class Service { constructor(spec) { /* ... */ } }
function createService(spec) { return { name: 'Factory instance' }; }

export { template as ObjTmpl, Service as default, createService as Factory };
```

El contenedor puede devolver export tal cual, construir clase, invocar
fábrica o usar objeto como plantilla según identificador.

## Identificadores de dependencia

Las dependencias son entradas de `spec`:

``` js
constructor(spec) {
  const logger = spec['TeqFw_Log_Api_Logger$'];
}
```

Identificadores que empiezan en minúscula son dependencias con nombre,
entregadas manualmente:

``` js
container.set('connection', databaseConnection);
```

Los que empiezan en mayúscula son importables. Notación principal:

- `EsModuleId`: objeto módulo;
- `EsModuleId#` o `EsModuleId#default`: export por defecto;
- `EsModuleId#ExportName`: export nombrado;
- `EsModuleId$`: singleton creado desde default export;
- `EsModuleId$$`: instancia nueva desde default export;
- `EsModuleId#name$` / `$$`: singleton / instancia nueva desde export
  nombrado.

La primera petición de singleton lo crea y guarda; las siguientes
reciben el mismo objeto. Doble dólar pide objeto nuevo cada vez. El
ciclo debe elegirse con intención: servicios compartidos sin estado
suelen encajar como singleton; objetos mutables o de una solicitud, no.

## Declarar dependencias

La forma explícita deja identificadores a la vista:

``` js
constructor(spec) {
  const named = spec['namedSingleton'];
  const one = spec['EsModId#name$$'];
  const shared = spec['EsModId$'];
}
```

La desestructuración es compacta cuando no hay inicialización previa:

``` js
constructor({ namedSingleton, EsModId$, EsModId$$ }) { /* ... */ }
```

## Resolver fuentes

Los mappings conectan prefijo namespace con raíz de fuentes:

``` js
container.addSourceMapping('EsModId', './relative/path');
container.addSourceMapping('EsModId', '/absolute/path', true);
```

La forma relativa sirve para navegador; la absoluta, para Node.js.
Segmentos namespace se convierten en directorios: `EsModId_PathTo_Mod`
resuelve a `/absolute/path/PathTo/Mod.mjs`.

## Resumen

[@teqfw/di](https://github.com/teqfw/di) puede usar módulos ES completos
o exports individuales, crear objetos singleton o transitorios y aplicar
el mismo patrón de arquitectura en navegador y Node.js. La convención
hace visible y reemplazable el cableado de objetos, manteniendo
sistemática la resolución de fuentes.

## Fragmentos adicionales de código fuente

    import Container from ‘@teqfw/di’;
    const container = new Container();
    container.set(‘dep1’, {name: ‘first’});
    container.set(‘dep2’, {name: ‘second’});
    const obj = await container.get(‘dep1’);

    class Clazz {
    constructor(spec) {}
    }function Factory(spec) {} Как различить случай, когда мы хотим получить от контейнера сам класс (функцию), а когда — экземпляр объекта данного класса (результат работы функции)? В идентификаторе зависимости для @teqfw/di это отражается при помощи символа $:

    let id1 = ‘named’; // named singleton been added manually
    let id2 = ‘EsModId’; // ES module
    let id3 = ‘EsModId#’; // default export of ES module
    let id4 = ‘EsModId#name’; // named export of ES module
    let id5 = ‘EsModId$’; // singleton from default export
    let id6 = ‘EsModId$’; // new instance from default export
    let id7 = ‘EsModId#name$’; // singleton from named export
    let id8 = ‘EsModId#name$’; // new instance from named export

    constructor(spec) {
    const named = spec[‘namedSingleton’];
    const inst = spec[‘EsModId#name$’];
    const single = spec[‘EsModId$’];
    } Особенностью @teqfw/di является то, что контейнер прерывает процесс создания запрошенного объекта, если обнаруживает неизвестную зависимость, подгружает исходники зависимости и создает зависимость, после чего вновь пытается создать запрошенный объект. Таким образом, первые строки конструктора запрошенного объекта могут выполняться несколько раз, если в процессе приходилось несколько раз прерывать процесс и подгружать нужные исходники.

    constructor({named, EsModId, EsModId$}) {}

    container.addSourceMapping(‘EsModId’, ‘./relative/path’);
    container.addSourceMapping(‘EsModId’, ‘/absolute/path’, true); Первый способ применяется, если контейнер используется в браузере, второй — в nodejs-приложениях.

    export default class Mod {
    constructor(spec) {
    const Clazz = spec[‘Lib_Dep#’];
    const single = spec[‘Lib_Dep$’];
    const inst = spec[‘Lib_Dep$’];
    // …
    }
    }
