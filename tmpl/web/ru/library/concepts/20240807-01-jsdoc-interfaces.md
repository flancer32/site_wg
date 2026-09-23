---
title: "Имитация интерфейсов в JavaScript с аннотациями JSDoc"
description: "Как описывать контракт между вызывающим кодом и реализацией в JavaScript с помощью JSDoc и понятных объектов."
date: 2024-08-07
---

В JavaScript нет встроенных интерфейсов, как в TypeScript. Но по мере
роста приложения становится важно закреплять общую структуру и поведение
его частей. Интерфейс задаёт контракт: какие методы должен предоставить
объект. Это уменьшает число скрытых предположений и упрощает
сопровождение. В JavaScript такой контракт удобно выразить обычным кодом
и аннотациями JSDoc [`@interface`](https://jsdoc.app/tags-interface) и
[`@implements`](https://jsdoc.app/tags-implements).

<zoom-img src="/medium/img/f4fbd41a3500/image-01.png" alt="Фрэнк Мартин объявляет условия контракта" width="100%"></zoom-img>

Хорошая иллюстрация — правила Фрэнка Мартина из фильма «Перевозчик»:

1.  никогда не менять условия сделки;
2.  не называть имён;
3.  никогда не открывать посылку.

Клиент получает услугу, только согласившись с правилами исполнителя. В
паре «исполнитель — заказчик» именно исполнитель формулирует условия. В
коде эту роль играет интерфейс.

Представим три npm-пакета: `plugin` выполняет бизнес-функцию — доставку;
`app1` и `app2` используют его с разными данными. Плагин экспортирует
`drive(pack, route)`. Чтобы доставить посылку, ему нужны размеры и вес,
место отправки и место назначения. Ожидания можно описать так:

``` js
/** @interface */
class Package {
  getSize() { throw new Error('Implement this method.'); }
  getWeight() { throw new Error('Implement this method.'); }
}
/** @interface */
class Route {
  getPlaceFrom() { throw new Error('Implement this method.'); }
  getPlaceTo() { throw new Error('Implement this method.'); }
}

/**
 * @param {Package} pack
 * @param {Route} route
 */
function drive(pack, route) {}
```

Только аннотаций JSDoc тоже достаточно, но современные IDE не всегда
одинаково хорошо их понимают. Поэтому я предпочитаю обычный
JavaScript-код с аннотацией `@interface`. Так контракт виден человеку и
доступен инструментам.

Первое приложение может передать объект с нужными методами:

``` js
function app1() {
  const pack = {
    getSize: () => ({ length: 150, width: 50, height: 50 }),
    getWeight: () => 50,
  };
  const route = {
    getPlaceFrom: () => 'Marseille',
    getPlaceTo: () => 'Nice',
  };
  drive(pack, route);
}
```

Во втором приложении данные другие, но контракт тот же:

``` js
function app2() {
  const pack = {
    getSize: () => ({ length: 45, width: 30, height: 10 }),
    getWeight: () => 1,
  };
  const route = {
    getPlaceFrom: () => 'Nice',
    getPlaceTo: () => 'Grenoble',
  };
  drive(pack, route);
}
```

IDE уже умеют разбирать такой код: подсказывать методы и переходить к их
определениям.

<zoom-img src="/medium/img/f4fbd41a3500/image-02.png" alt="Автодополнение интерфейса в IDEA" width="100%"></zoom-img>

Итак:

- вызывающая сторона формулирует контракт;
- реализация обязана ему соответствовать;
- JSDoc помогает IDE видеть связь между контрактом и реализациями.

Интерфейсы полезны потому, что делят сложную систему на более простые
части и ясно проводят границы между ними. В JavaScript уже есть всё
необходимое: договориться об объектах, выразить договорённость в коде и
не забывать принцип Фрэнка Мартина — правила задаёт тот, кто выполняет
работу.

Демонстрации: [app1](https://flancer64.github.io/demo-di-if-app1/) и
[app2](https://flancer64.github.io/demo-di-if-app2/). Для связывания
интерфейсов и реализаций в них используется
[@teqfw/di](https://www.npmjs.com/package/@teqfw/di) — внедрение
зависимостей через конструктор.
