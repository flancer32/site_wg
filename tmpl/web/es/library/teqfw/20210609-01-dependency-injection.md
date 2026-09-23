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
class Consumer {
constructor(spec) {
  const logger = spec['TeqFw_Log_Api_Logger$'];
}
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
class Consumer {
constructor(spec) {
  const named = spec['namedSingleton'];
  const one = spec['EsModId#name$$'];
  const shared = spec['EsModId$'];
}
}
```

La desestructuración es compacta cuando no hay inicialización previa:

``` js
class Consumer {
constructor({ namedSingleton, EsModId$, EsModId$$ }) { /* ... */ }
}
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
