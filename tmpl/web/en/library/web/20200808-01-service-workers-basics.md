---
title: "Service Worker Basics"
description: "An introduction to registering a Service Worker, its lifecycle, offline caches, fetch handling, and safe update behaviour in a web app."
date: 2020-08-08
---

A Service Worker is a browser worker that sits between a web application
and the network. Its central job is caching remote resources: making the
application faster and allowing it to keep working when the connection
disappears.

## Registration

The main application page registers the worker:

``` js
navigator.serviceWorker
  .register('sw.js', { scope })
  .then(onSuccess, onFail);
```

A minimal `sw.js` can log that it has started. Its global context is
`self`. A browser may stop an inactive worker and start a new instance
whenever an event needs it, so code must not rely on in-memory state
surviving.

## Lifecycle states

A worker moves through `parsed`, `installing`, `installed`,
`activating`, `activated`, and eventually `redundant`. Listening for
`statechange` is an excellent way to observe this lifecycle while
learning or debugging:

``` js
const sw = reg.installing ?? reg.active;
sw.addEventListener('statechange', (event) => {
  console.log('State changed:', event.target.state);
});
```

Unregistering an activated worker demonstrates the full route to
`redundant`.

<zoom-img src="/medium/img/c7cda44c1c98/image-01.png" alt="The complete Service Worker lifecycle" width="100%"></zoom-img>

On a repeat registration there may be no installing worker: the previous
one is already active. Developer Tools can also make a worker redundant
manually.

<zoom-img src="/medium/img/c7cda44c1c98/image-02.png" alt="Service Worker controls in browser developer tools" width="100%"></zoom-img>

## Events that shape a PWA

Registration is commonly postponed until the first page finishes
loading, so cache work does not slow first render:

``` js
window.addEventListener('load', () => {
  navigator.serviceWorker.register('sw.js').catch(console.error);
});
```

The core events are:

- `install` — populate a cache;
- `activate` — remove obsolete caches;
- `fetch` — respond to requests from cache or network.

Other useful events include `push`, notification interactions,
background `sync`, and payment-handler events.

## Install and activate

An install handler waits for a versioned cache to be ready before
installation completes:

``` js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('static-v2').then((cache) =>
      cache.addAll(['./index.html', './pwa.webmanifest'])
    )
  );
});
```

On activation, delete caches other than the current version:

``` js
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((names) =>
    Promise.all(names.map((name) =>
      name === 'static-v2' ? undefined : caches.delete(name)
    ))
  ));
});
```

Real cache policy is more nuanced than this tutorial pattern. Individual
application resources change more often than the worker, so a production
app needs a deliberate cache-version and reset strategy rather than
relying only on worker reinstallation.

## Fetch and the first page

A simple cache-first handler returns a matching response, otherwise
reaches the network:

``` js
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) =>
      cached || fetch(event.request)
    )
  );
});
```

A worker normally does not control the very page that registered it
until the page reloads. You can claim clients deliberately, or reload
after activation when that is truly appropriate. Avoid forcing a reload
without communicating what changed: update behaviour is part of the
product experience.

<zoom-img src="/medium/img/c7cda44c1c98/image-03.png" alt="Network requests during initial load, caching, and cache reload" width="100%"></zoom-img>

Service Worker examples tend to show only the simple path. A real PWA
must decide which resources can be stale, how to recover from an
interrupted update, how to invalidate caches, and how to work without
network access. The best way to understand it is to implement and test
these choices in a real application.

## Additional source-code excerpts

    sw.addEventListener(“statechange”, (e) => {
    console.log(“State is changed:”, e.target.state);

    // console.log(“Uninstall SW after activation.”);
    // reg.unregister();
    // }_}); то вывод на консоль для первой загрузки выглядит так:
    index.html:12 before SW registration.
    index.html:30 after SW registration.
    index.html:44 end of body.
    sw.js:1 registering itself, state: parsed
    index.html:18 SW registration done, state: installing
    index.html:21 SW state is changed: installed
    index.html:21 SW state is changed: activating
    index.html:21 SW state is changed: activated Service worker доходит до своего рабочего состояния (“activated”) и остаётся в нём. При повторной загрузке страницы вывод на консоль уже такой:
    index.html:12 before SW registration.
    index.html:30 after SW registration.
    index.html:44 end of body.
    index.html:18 SW registration done, state: activated Правда для этого нужно изменить строку:
    // const sw = reg.installing;
    const sw = reg.installing ?? reg.active; так как при попытке повторной регистрации того же самого service worker’а возвращается уже установленный (active).

    window.addEventListener(‘load’, function () {
    navigator.serviceWorker.register(‘sw.js’)

    });

    self.addEventListener(“install”, (event) => {
    event.waitUntil(
    caches.open(“static-v2”)

    return cache.addAll(
    [

    “./pwa.webmanifest”
    ]
    );
    })

    console.log(“Cache is loaded.”);
    })
    );
    }); Диспетчер событий ожидает выполнения промиса, переданного в event.waitUntil, и только после загрузки кэша переводит service worker из состояния installing в installed.

    self.addEventListener(“activate”, (event) => {
    event.waitUntil(
    caches.keys().then((cacheNames) => {
    return Promise.all(
    cacheNames.map((cacheName) => {
    // delete all caches except “static-v2” if (cacheName !== “static-v2”) {
    return caches.delete(cacheName);
    }
    })
    );
    })
    );
    }); Вообще-то правила работы с кэшем в web-приложении могут быть довольно разнообразны. В примерах, как правило, приводится самый простой вариант: при регистрации заполнили новый кэш, при активации — удалили старый. Но service worker обладает меньшей изменчивостью, чем всё приложение в целом (вернее, отдельные его ресурсы — HTML/CSS/JS). Поэтому web-приложение должно обладать возможностью принудительной ре-инициализации кэша (например, при переходе по ссылке /sw/cache/reset) без переинсталляции service worker’а.

    self.addEventListener(“fetch”, (event) => {
    event.respondWith(
    caches.match(event.request)

    if (response) {
    return response;
    }
    return fetch(event.request)
    })
    );
    }); Примеры кода также выложены на github.

    await clients.claim(); или просто повесить обработчик на событие смены статуса service worker’а в index.html:
    window.addEventListener(‘load’, function () {
    navigator.serviceWorker.register(‘sw.js’)

    sw.addEventListener(“statechange”, (e) => {
    console.log(“State is changed:”, e.target.state);
    if (e.target.state === “activated”) {
    location.reload();
    }
    });
    });
    });

A Service Worker is one way a browser supports autonomous application
behaviour. For the wider view of execution, state, and lifecycles, see
[Browser as an Operating System for Developing Modern
Applications](/en/books/browser-as-operating-system.html).
