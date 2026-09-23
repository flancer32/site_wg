---
title: "Dependency Injection без магии: простой контейнер объектов для современного JavaScript"
description: "Пошаговый путь от Composition Root к контейнеру объектов и позднему связыванию ES-модулей в JavaScript."
date: 2023-07-31
---

IoC уменьшает связанность JavaScript-кода: модуль не делает статический
импорт конкретной реализации, а получает нужные объекты извне. Здесь —
учебный путь к небольшому контейнеру объектов. Он рассчитан на обычный
ES6+ JavaScript без транспиляции, а не на TypeScript-декораторы.

Цель не в готовой универсальной библиотеке, а в понимании механики: как
загрузить ES-модули, создать их зависимости и передать их в правильные
места. Демонстрационный контейнер занимает около 35 строк.

## 1. Composition Root

При прямом управлении сервис сам импортирует логгер:

``` js
import logger from './logger.js';
export default class Service {
  exec(opts) { logger.info(JSON.stringify(opts)); }
}
```

При инверсии сервис принимает зависимость в конструкторе:

``` js
export default class Service {
  constructor(logger) {
    this.exec = (opts) => logger.info(JSON.stringify(opts));
  }
}
```

Кто-то всё равно должен импортировать модули и создать объекты. Это
место называется Composition Root:

``` js
import logger from './logger.js';
import Service from './service.js';
const service = new Service(logger);
service.exec({ name: 'Composition Root' });
```

## 2. Фабрики

Для упрощения учебного примера каждый модуль экспортирует асинхронную
фабрику, которая получает зависимости и создаёт результат:

``` js
export default async function factory(logger) {
  return (opts) => logger.info(JSON.stringify(opts));
}
```

В реальном коде export может быть классом, функцией или объектом;
фабричное соглашение здесь лишь делает следующий шаг понятнее.

## 3. Спецификация зависимостей

Имена обычных аргументов могут измениться при минификации. Поэтому
зависимости передаются одним объектом:

``` js
function factory({ logger, config }) { /* ... */ }
```

Сначала ключом можно временно сделать путь к модулю:

``` js
export default async function factory({ ['./logger.js']: logger }) {
  return (opts) => logger.info(JSON.stringify(opts));
}
```

Так контейнер получает данные, которые нужно разобрать.

## 4. Парсер спецификации

Упрощённый пример превращает функцию в строку, извлекает блок параметров
регулярным выражением и выделяет ключи зависимостей. Это учебный приём,
не совет для production: в настоящем контейнере контракт зависимостей
лучше задавать надёжной явной метаинформацией.

``` js
function parse(definition) {
  const params = /function\s+\w+\s*\(\s*\{([^}]*)\}/s.exec(definition)?.[1];
  if (!params) return [];
  return params.split(',').map((dependency) =>
    dependency.split(':')[0].trim().replace(/[\[\]'\"]/g, '')
  );
}
const paths = parse(factory.toString());
```

## 5. Контейнер

Контейнер рекурсивно импортирует модуль, находит его зависимости, строит
объект спецификации и кэширует результат:

``` js
const cache = {};
async function get(key) {
  if (cache[key]) return cache[key];
  const { default: factory } = await import(key);
  const spec = {};
  for (const path of parse(factory.toString())) spec[path] = await get(path);
  return (cache[key] = await factory(spec));
}
```

Теперь Composition Root превращается в единственную строку:

``` js
const service = await container.get('./service.js');
```

## 6. Resolver и позднее связывание

Пути в спецификации всё ещё привязывают код к деталям. Последний шаг —
оставить в модулях только абстракции:

``` js
export default async function factory({ logger, config }) {
  return (opts) => logger.info(`${config.appName}: ${JSON.stringify(opts)}`);
}
```

А соответствие абстракции реализации вынести в карту root:

``` js
container.setMap({
  service: './service.js',
  logger: './logger.js',
  config: './config.js',
});
const service = await container.get('service');
```

Это и есть позднее связывание: во время запуска можно выбрать консольный
или файловый логгер, не переписывая сервис. Вместо «сварной» конструкции
код становится «болтовой» — модуль легче отделить и применить в другом
проекте.

В крупном проекте не поддерживают вручную карту для каждого имени.
Соглашения преобразуют идентификатор вроде `Vendor_Package_Mod` в путь
`node_modules/@vendor/package/src/Mod.js`; к идентификатору можно
добавить срок жизни или область действия.

## Вывод

DI особенно полезна там, где много файлов и пакетов: она снижает
связанность и улучшает тестирование. В традиционном фронтенде бандлеры
часто скрывают отдельные модули, но в PWA Service Worker может загрузить
и кэшировать набор ES-файлов. Тогда одинаковый принцип связи подходит и
Node.js, и браузеру. Для практического применения стоит использовать
зрелый контейнер — например [@teqfw/di](https://github.com/teqfw/di) — а
не учебный парсер из статьи.
