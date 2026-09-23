---
title: "TeqFW: Dependency Injection"
description: "A practical guide to the @teqfw/di container: ES modules, dependency identifiers, singleton and transient lifetimes, and source resolution."
date: 2021-06-09
---

Every JavaScript application creates objects and connects them.
Dependency injection (DI) is a long-established way to make those
connections explicit and flexible. TeqFW implements DI in the standalone
[@teqfw/di](https://github.com/teqfw/di) package.

## Requirements

For TeqFW DI, code is organized as ES modules, usually `*.mjs`. A class
constructor or factory receives one `spec` object. The container must
either resolve a dependency identifier to a module source or receive
that dependency explicitly from the application.

## What the container does

A typical request is `await container.get(id)`. The container:

1.  interprets the identifier;
2.  returns a cached object if one exists;
3.  otherwise resolves and dynamically imports its module;
4.  discovers and resolves the constructor/factory dependencies
    recursively;
5.  creates the requested object;
6.  caches it when its lifetime requires it.

The recursive dependency tree is built before the caller receives its
requested object.

## What an ES module can provide

A module can export a class, a factory, or an object template:

``` js
const template = { name: 'Simple Object' };
class Service { constructor(spec) { /* ... */ } }
function createService(spec) { return { name: 'Factory instance' }; }

export { template as ObjTmpl, Service as default, createService as Factory };
```

The container can return an export itself, construct a class, invoke a
factory, or use an object as a template according to the identifier.

## Dependency identifiers

Dependencies are entries in `spec`:

``` js
constructor(spec) {
  const logger = spec['TeqFw_Log_Api_Logger$'];
}
```

Identifiers beginning with lowercase are named dependencies supplied
manually:

``` js
container.set('connection', databaseConnection);
```

Identifiers beginning with uppercase are importable dependencies. The
main notation is:

- `EsModuleId`: module object;
- `EsModuleId#` or `EsModuleId#default`: default export;
- `EsModuleId#ExportName`: named export;
- `EsModuleId$`: singleton built from default export;
- `EsModuleId$$`: a new instance built from default export;
- `EsModuleId#name$` / `$$`: singleton / new instance from a named
  export.

The first request for a singleton builds and stores it; later requests
receive the same object. A double dollar requests a fresh object every
time. Choose lifetimes deliberately: shared stateless services often
suit singletons, while request-specific or mutable short-lived objects
do not.

## Declaring dependencies

The explicit form makes identifiers easy to inspect:

``` js
constructor(spec) {
  const named = spec['namedSingleton'];
  const one = spec['EsModId#name$$'];
  const shared = spec['EsModId$'];
}
```

Destructuring is compact when no setup must precede resolution:

``` js
constructor({ namedSingleton, EsModId$, EsModId$$ }) { /* ... */ }
```

## Resolving sources

Mappings connect a namespace prefix with its source root:

``` js
container.addSourceMapping('EsModId', './relative/path');
container.addSourceMapping('EsModId', '/absolute/path', true);
```

The relative form is suitable for browser use, the absolute form for
Node.js. Namespace segments map to directories, for example
`EsModId_PathTo_Mod` resolves to `/absolute/path/PathTo/Mod.mjs`.

## Summary

[@teqfw/di](https://github.com/teqfw/di) can use whole ES modules or
individual exports as dependencies, create singleton or transient
objects, and run the same architectural pattern in browsers and Node.js.
The convention makes object wiring visible and replaceable while keeping
module source resolution systematic.

## Additional source-code excerpts

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
