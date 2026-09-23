---
title: "Service Workers Basics"
description: "Прочитал статью “[Визуализация работы сервис-воркеров](https://habr.com/ru/post/491840/)” и почувствовал необходимость разобраться с основами работы service worker’ов, тем более, ч"
date: 2020-08-08
---

Прочитал статью “[Визуализация работы
сервис-воркеров](https://habr.com/ru/post/491840/)” и почувствовал
необходимость разобраться с основами работы service worker’ов, тем
более, что как раз занимаюсь этой темой.

## Регистрация service worker’а

[Регистрация](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register)
происходит на главной странице web-приложения:

    navigator.serviceWorker

.register(“sw.js”, {scope})

    .then(onSuccess, onFail);

## Простой service worker

Самый простой service worker просто сообщает о факте своей загрузке
(файл `sw.js`):

    console.log(

“SW: registering itself, state:”,

    self.serviceWorker.state
    ); Состояние worker’а берётся из собственного контекста — self. Если worker продолжительное время неактивен, то браузер завершает поток, в котором он существует, и создаёт новый, как только в worker’е вновь возникает необходимость.

## Service Worker States

Всего у service worker’а может быть [6
состояний](https://w3c.github.io/ServiceWorker/#dfn-state):

- parsed
- installing
- installed
- activating
- activated
- redundant

Для трассировки изменения состояний worker’а сразу же после регистрации
добавим к нему обработчик событий смены состояния worker’а:

    // onSuccess:

(reg) =\> {

    // get service worker from registration const sw = reg.installing;
    console.log(“SW registration done, state:”, sw.state);
    // setup handler to “statechange” event to trace changes sw.addEventListener(“statechange”, (e) => {
    console.log(“State is changed:”, e.target.state);
    if (e.target.state === “activated”) {
    console.log(“uninstall SW after activation.”);
    reg.unregister();
    }
    });
    } Код можно посмотреть на github’е. В итоге получаем примерно такой вывод в консоли браузера:
    index.html:12 before SW registration.
    index.html:30 after SW registration.
    index.html:44 end of body.
    sw.js:1 registering itself, state: parsed
    index.html:18 SW registration done, state: installing
    index.html:21 SW state is changed: installed
    index.html:21 SW state is changed: activating
    index.html:21 SW state is changed: activated
    index.html:23 uninstall service worker after activation.
    index.html:21 SW state is changed: redundant Так как в обработчике после перехода в рабочее состояние “activated” вызывается де-регистрация service worker’а, то получается полный цикл всех возможных состояний:

<figure>
<img src="/medium/img/c7cda44c1c98/image-01.png" alt="Image 2" />
</figure>

Если же убрать де-регистрацию service worker’а после перехода в рабочее
состояние:

    sw.addEventListener(“statechange”, (e) => {
    console.log(“State is changed:”, e.target.state);

\_// if (e.target.state === “activated”) {

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

Перевести service worker в состояние “*redundant*” можно вручную, через
панель инструментов разработчика:

<figure>
<img src="/medium/img/c7cda44c1c98/image-02.png" alt="Image 3" />
</figure>

## Service Worker Events

Основным назначением service worker’а является кэширование удалённого
контента для ускорения работы пользователя web-приложения и обеспечения
работоспособности web-приложения при потере соединения с интернетом (в
offline-режиме).

Как правило, регистрацию service worker’а
[откладывают](https://developers.google.com/web/fundamentals/primers/service-workers/registration)
до завершения загрузки головной страницы web-приложения (`index.html`),
чтобы загрузка кэша worker’ом не влияла на загрузку головной страницы:

    window.addEventListener(‘load’, function () {
    navigator.serviceWorker.register(‘sw.js’)

.then()

.catch();

    });

В самом service worker’е обычно вешают обработчики на события для
выполнения следующих типовых задач:

- `install`: заполнение кэша;
- `activate`: зачистка устаревшего кэша предыдущей версии service
  worker’а;
- `fetch`: обработка клиентских запросов (возврат данных их кэша или из
  сети);

Есть ещё такие
[события](https://w3c.github.io/ServiceWorker/#execution-context-events):

- `push`: получение [push](https://w3c.github.io/push-api/)-сообщений от
  сервера;
- `notificationclick`и `notificationclose`: связаны с обработкой
  [системных уведомлений](https://notifications.spec.whatwg.org/);
- `sync`: [синхронизация
  данных](https://wicg.github.io/background-sync/spec/) в фоновом
  режиме;
- `canmakepayment`и`paymentrequest`: поддержка платежей [кредитными
  картами](https://w3c.github.io/payment-handler/);

### install

Как правило обработчик события `install` заполняет
[кэш](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage)
service worker’а данными из сети:

    self.addEventListener(“install”, (event) => {
    event.waitUntil(
    caches.open(“static-v2”)

.then((cache) =\> {

    return cache.addAll(
    [

“./index.html”,

    “./pwa.webmanifest”
    ]
    );
    })

.then(() =\> {

    console.log(“Cache is loaded.”);
    })
    );
    }); Диспетчер событий ожидает выполнения промиса, переданного в event.waitUntil, и только после загрузки кэша переводит service worker из состояния installing в installed.

### activate

Этот обработчик удаляет из кэша данные, относящиеся к предыдущей версии
service worker’а

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

### fetch

Опять-таки, вот один из самых простых вариантов — возвращаем ресурс из
кэша, если он там есть, или запрашиваем из сети:

    self.addEventListener(“fetch”, (event) => {
    event.respondWith(
    caches.match(event.request)

.then(response =\> {

    if (response) {
    return response;
    }
    return fetch(event.request)
    })
    );
    }); Примеры кода также выложены на github.

### Обновление основной страницы

У service worker’а есть особенность — он не обрабатывает запросы той
страницы, которая запросила его регистрацию. По-умолчанию service worker
обработает все `fetch`-запросы только после перезагрузки страницы
(`reload`’а).

При необходимости можно сообщить браузеру, что service worker [готов к
выполнению](https://developer.mozilla.org/en-US/docs/Web/API/Clients/claim)`fetch`-запросов
регистрационной страницы через:

    await clients.claim(); или просто повесить обработчик на событие смены статуса service worker’а в index.html:
    window.addEventListener(‘load’, function () {
    navigator.serviceWorker.register(‘sw.js’)

.then((reg) =\> {

const sw = (reg.installing) ? reg.installing\
(reg.waiting) ? reg.waiting

(reg.active);

<!-- -->

    sw.addEventListener(“statechange”, (e) => {
    console.log(“State is changed:”, e.target.state);
    if (e.target.state === “activated”) {
    location.reload();
    }
    });
    });
    });

и принудительно обновить страницу после того, как service worker будет
готов к обработке запросов.

Вот так выглядят запросы к сети с точки зрения браузера в
[демо-приложении](https://github.com/flancer64/demo_pwa_sw/blob/master/02_events/index.html)
(второй вариант, перезагрузка через `location.reload`):

<figure>
<img src="/medium/img/c7cda44c1c98/image-03.png" alt="Image 4" />
</figure>

- `зелёный`: первая загрузка головной страницы приложения и связанных
  ресурсов (всё тянется из сети);
- `морковный`: кэширование ресурсов service worker’ом;
- `синий`: вторая загрузка головной страницы приложения (из кэша service
  worker’а);

Материалов о service worker’ах в Сети довольно много, но большинство —
как и эта публикация — рассматривает самый простой сценарий. В реальном
приложении требования к service worker’у обычно заметно сложнее.

Для более глубокого понимания лучше обратиться к детальному описанию
API:

- [Service Worker
  API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Service Workers Nightly](https://w3c.github.io/ServiceWorker/)

написать свою собственную статью или, что лучше всего, внедрить service
worker в реальное приложение.

Service Worker показывает один из способов, которым браузер поддерживает
автономное поведение приложения. Общая картина исполнения, состояния и
жизненных циклов собрана в книге [«Браузер как операционная система для
разработки современных
приложений»](/ru/books/browser-as-operating-system.html).
