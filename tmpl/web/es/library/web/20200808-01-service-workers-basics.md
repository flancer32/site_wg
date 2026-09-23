---
title: "Conceptos básicos de Service Worker"
description: "Introducción al registro de Service Worker, su ciclo de vida, cachés offline, gestión de fetch y actualizaciones seguras en una aplicación web."
date: 2020-08-08
---

Un Service Worker es un worker del navegador que se sitúa entre una
aplicación web y la red. Su función central es almacenar recursos
remotos en caché: acelera la aplicación y permite que siga funcionando
cuando se pierde la conexión.

## Registro

La página principal registra el worker:

``` js
navigator.serviceWorker
  .register('sw.js', { scope })
  .then(onSuccess, onFail);
```

Un `sw.js` mínimo puede registrar que ha arrancado. Su contexto global
es `self`. El navegador puede detener un worker inactivo y crear otra
instancia cuando haga falta un evento, así que el código no debe
depender de que el estado en memoria perdure.

## Estados del ciclo de vida

Un worker pasa por `parsed`, `installing`, `installed`, `activating`,
`activated` y finalmente `redundant`. Escuchar `statechange` ayuda mucho
a observar ese ciclo mientras se aprende o depura:

``` js
const sw = reg.installing ?? reg.active;
sw.addEventListener('statechange', (event) => {
  console.log('State changed:', event.target.state);
});
```

Desregistrar un worker activado permite ver la ruta completa hasta
`redundant`.

<zoom-img src="/medium/img/c7cda44c1c98/image-01.png" alt="Ciclo de vida completo de Service Worker" width="100%"></zoom-img>

En un registro repetido puede no existir worker en instalación: el
anterior ya está activo. Las herramientas de desarrollo también pueden
volver redundante a un worker manualmente.

<zoom-img src="/medium/img/c7cda44c1c98/image-02.png" alt="Controles de Service Worker en las herramientas de desarrollo" width="100%"></zoom-img>

## Eventos que dan forma a una PWA

Normalmente el registro se aplaza hasta que la primera página termine de
cargarse, para que el trabajo de caché no retrase el primer render:

``` js
window.addEventListener('load', () => {
  navigator.serviceWorker.register('sw.js').catch(console.error);
});
```

Los eventos centrales son:

- `install`: llenar una caché;
- `activate`: eliminar cachés obsoletas;
- `fetch`: responder desde caché o red.

También existen `push`, interacciones con notificaciones, `sync` en
segundo plano y eventos de pago.

## Install y activate

El manejador de instalación espera una caché versionada antes de
terminar:

``` js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('static-v2').then((cache) =>
      cache.addAll(['./index.html', './pwa.webmanifest'])
    )
  );
});
```

Al activar, se eliminan las cachés que no sean la versión actual:

``` js
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((names) =>
    Promise.all(names.map((name) =>
      name === 'static-v2' ? undefined : caches.delete(name)
    ))
  ));
});
```

Una política real de caché es más compleja que este patrón didáctico.
Los recursos cambian con más frecuencia que el worker; una aplicación de
producción necesita versionado y reinicio de caché deliberados.

## Fetch y la primera página

Un manejador sencillo cache-first devuelve una coincidencia o recurre a
la red:

``` js
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) =>
      cached || fetch(event.request)
    )
  );
});
```

Normalmente el worker no controla la página que lo registró hasta que
esta se recarga. Se puede reclamar clientes de forma deliberada o
recargar tras la activación si corresponde. No fuerce una recarga sin
explicar el cambio: el comportamiento de actualización es parte de la
experiencia de producto.

<zoom-img src="/medium/img/c7cda44c1c98/image-03.png" alt="Solicitudes de red en carga inicial, caché y recarga" width="100%"></zoom-img>

Los ejemplos de Service Worker suelen mostrar solo el camino sencillo.
Una PWA real debe decidir qué puede quedar desactualizado, cómo
recuperarse de una actualización interrumpida, cómo invalidar cachés y
cómo comportarse sin red. La mejor forma de comprenderlo es implantar y
probar estas decisiones en una aplicación real.
