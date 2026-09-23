---
title: "TeqFW: inicialización y detención de plugins"
description: "Cómo los plugins de TeqFW declaran acciones de inicio y detención y cómo el framework las ejecuta según la jerarquía de dependencias."
date: 2021-08-17
---

Algunos plugins de TeqFW necesitan realizar tareas cuando la aplicación
se inicia o se detiene; por ejemplo, abrir conexiones con la base de
datos al arrancar y cerrarlas al finalizar.

El plugin puede declarar en su descriptor TeqFW (`./teqfw.json`) un
módulo ES6 con una fábrica para el inicializador y otro para el
finalizador:

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

Un módulo ES6 típico tiene esta forma:

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

## Jerarquía de plugins

Los plugins de una aplicación forman una jerarquía según sus
dependencias. TeqFW las obtiene del nodo `/dependencies` de
`package.json`:

``` json
{
  "name": "@teqfw/web",
  "dependencies": { "@teqfw/core": "*" }
}
```

Los plugins de nivel básico, como `core`, se inicializan y detienen
antes que los de nivel superior, como `web`.

## Inicialización

La inicialización ocurre al iniciar una aplicación TeqFW, en
`TeqFw_Core_Back_App.init`, después de cargar la configuración local,
explorar plugins e inicializar el contenedor DI:

``` js
this.init = async function ({path, version}) {
  initBootConfig(config, path, version);
  config.loadLocal(path);
  const registry = await pluginScan.exec(path);
  initDiContainer(registry);
  await initPlugins(registry);
};
```

La aplicación ejecuta los inicializadores uno a uno, desde `core` hasta
niveles superiores como `app`.

## Detención

La detención se realiza mediante el método público
`TeqFw_Core_Back_App.stop`. Puede invocarse directamente y TeqFW también
lo llama al recibir una [señal del
proceso](https://nodejs.org/api/process.html#process_signal_events):

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

Los finalizadores se ejecutan en el mismo orden ascendente: de `core` a
`app`.
