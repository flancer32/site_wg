---
title: "Пример веб-приложения на TeqFW"
description: "Как собрать браузерное ToDo-приложение из ES-модулей с контейнером зависимостей @teqfw/di."
date: 2024-06-14
---

В [демонстрации](https://github.com/flancer64/demo_web_app_di) показано
применение контейнера объектов и внедрения зависимостей
[@teqfw/di](https://github.com/teqfw/di) в браузерном приложении. Это
знакомый ToDo List без серверной части: набор статических файлов
загружается и исполняется в браузере.

<zoom-img src="/medium/img/add155627b58/image-01.png" alt="Демонстрационное ToDo-приложение" width="100%"></zoom-img>

Чистый JavaScript с ES-модулями даёт важное преимущество при отладке: в
браузере видны те же файлы, что и в IDE.

<zoom-img src="/medium/img/add155627b58/image-02.png" alt="Исходники приложения в браузере" width="100%"></zoom-img>

<zoom-img src="/medium/img/add155627b58/image-03.png" alt="Те же исходники в IDE" width="100%"></zoom-img>

## Подключение контейнера

Библиотека доступна как ES-модуль, например через unpkg:

``` html
<script type="module">
  import Container from 'https://unpkg.com/@teqfw/di';
</script>
```

## Создание и настройка

Контейнер не хранит заранее подготовленные объекты. Его Resolver
вычисляет путь к исходнику по идентификатору зависимости. После создания
контейнера связываем пространство имён `Demo` с папкой `./js`:

``` js
const container = new Container();
const root = new URL(location.href).href.replace('index.html', '');
const resolver = container.getResolver();
resolver.addNamespaceRoot('Demo', root + '/js');
```

Тогда имена превращаются в адреса модулей:

- `Demo_App` → `…/js/App.js`;
- `Demo_Defs` → `…/js/Defs.js`;
- `Demo_ToDo_Item` → `…/js/ToDo/Item.js`;
- `Demo_ToDo_List` → `…/js/ToDo/List.js`.

## Запуск приложения

Символ `$` в конце идентификатора означает singleton. Контейнер создаёт
его один раз и затем возвращает тот же объект:

``` js
const app = await container.get('Demo_App$');
app.run();
```

Базовые формы идентификаторов:

- `Demo_App` — default export как есть;
- `Demo_App$` — singleton из default export;
- `Demo_App$I` — новый экземпляр;
- `Demo_App.` — объект модуля;
- `Demo_App.export` — именованный export;
- суффиксы `$` и `$I` работают также для именованного export.

## Описание зависимостей

Статический импорт нужен только для самого контейнера; остальные модули
связываются идентификаторами в конструкторе:

``` js
export default class Demo_App {
  constructor({
    Demo_Defs$: defs,
    Demo_ToDo_List$: list,
  }) {
    this.defs = defs;
    this.list = list;
  }
}
```

Контейнер загрузит модули, создаст нужные singleton-объекты и передаст
их приложению. Если нужен сам класс, а не его объект, запрос выглядит
проще:

``` js
export default class Demo_ToDo_List {
  constructor({ Demo_ToDo_Item: ToDoItem }) {
    this.item = new ToDoItem();
  }
}
```

## Вывод

[@teqfw/di](https://github.com/teqfw/di) переносит привычные
enterprise-подходы — контейнер объектов и пространства имён — в SPA и
PWA. Для запуска демо достаточно разместить папку `web/` на статическом
хостинге. Позднее связывание избыточно для маленькой статичной страницы,
но становится полезным в больших приложениях и наборах пакетов; тот же
подход также позволяет разделять код фронтенда и Node.js-бэкенда.
