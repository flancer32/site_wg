---
title: "TeqFW: Plugin Initialization and Shutdown"
description: "How TeqFW plugins declare startup and shutdown actions and how the framework runs them through the dependency hierarchy."
date: 2021-08-17
---

Some TeqFW plugins need to perform work when an application starts or
stops—for example, opening database connections at startup and closing
them at shutdown.

A plugin can declare in its TeqFW descriptor (`./teqfw.json`) an ES6
module with a factory for its initializer and another one for its
finalizer:

``` json
{
  "core": {
    "plugin": {
      "onInit": "Vnd_Prj_Back_Plugin_Init",
      "onStop": "Vnd_Prj_Back_Plugin_Stop"
    }
  }
}
```

An ES6 module normally has this shape:

``` js
export default function Factory(spec) {
  // EXTRACT DEPS
  // ...
  // COMPOSE RESULT
  async function action() {
    // ...
  }
  return action;
}
```

## Plugin hierarchy

All application plugins form a hierarchy according to their
dependencies. TeqFW derives these dependencies from the `/dependencies`
node in `package.json`:

``` json
{
  "name": "@teqfw/web",
  "dependencies": {
    "@teqfw/core": "*"
  }
}
```

Base-level plugins such as `core` are initialized and stopped first;
higher-level plugins such as `web` follow.

## Initialization

Plugin initialization happens while a TeqFW application starts, in
`TeqFw_Core_Back_App.init`, after local configuration is loaded, plugins
are scanned, and the DI container is initialized:

``` js
this.init = async function ({path, version}) {
  initBootConfig(config, path, version);
  // ...
  config.loadLocal(path);
  const registry = await pluginScan.exec(path);
  initDiContainer(registry);
  await initPlugins(registry);
};
```

The application calls plugin initializers one after another, from lower
levels such as `core` up to higher levels such as `app`.

## Shutdown

Plugin shutdown is performed by the public `TeqFw_Core_Back_App.stop`
method, which can be called directly. When the process receives a
[signal](https://nodejs.org/api/process.html#process_signal_events),
TeqFW calls it automatically:

``` js
this.run = async function () {
  const me = this;
  async function onStop() {
    await me.stop();
    process.exit();
  }
  process.on('SIGINT', onStop);
  process.on('SIGTERM', onStop);
  process.on('SIGQUIT', onStop);
};
this.stop = async function () { /* ... */ };
```

Finalizers run in the same bottom-up order, from `core` to `app`.

## Additional source-code excerpts

    this.init = async function ({path, version}) {
    initBootConfig(config, path, version);
    // …
    config.loadLocal(path);
    const registry = await pluginScan.exec(path);
    initDiContainer(registry);
    await initPlugins(registry);
    // …
    }

    this.run = async function () {
    const me = this; async function onStop() {
    await me.stop();
    process.exit();
    } process.on(‘SIGINT’, onStop);
    process.on(‘SIGTERM’, onStop);
    process.on(‘SIGQUIT’, onStop);
    // …
    };this.stop = async function () {/* … */} Функции останова плагинов запускаются также по очереди, снизу-вверх — от базовых уровне (core) к верхним (app).
