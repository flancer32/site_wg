---
title: "TeqFW: Обёртки для библиотек"
description: "В приложениях зачастую приходится использовать сторонние библиотеки (как правило — в браузере), которые не являются es6-модулями. В данной публикации описано, каким образом подключ"
date: 2021-12-03
---

В приложениях зачастую приходится использовать сторонние библиотеки (как
правило — в браузере), которые не являются `es6`-модулями. В данной
публикации описано, каким образом подключать сторонние библиотеки, чтобы
их можно было использовать внутри платформы
[TeqFW](https://wiredgeese.com/%D1%87%D1%82%D0%BE-%D1%82%D0%B0%D0%BA%D0%BE%D0%B5-teqfw-208d5938205).

Возьмём, например, пакет [tweetnacl](https://tweetnacl.js.org/).
Разработчики пакета предусматривают, что весь функционал пакета
загружается в браузер в виде единого бандла:

```html
<script type="application/javascript" src="nacl-fast.min.js"></script>
```

После чего он становится доступным для использования в браузере в виде
глобального объекта:

```js
window.nacl
```

В TeqFW обращение к элементам кода организуется через пространство имён, а использование контейнера для внедрения зависимостей позволяет подменять одни зависимости другими (например, интерфейсы их реализациями). Поэтому для доступа к глобальным объектам в teq-приложениях необходима обёртка, совместимая с TeqFW DI.

Teq-приложения — это прежде всего PWA. В PWA все необходимые ресурсы
подгружаются в кэш браузера, чтобы обеспечить возможность работы
приложения в offline. В том числе и внешние библиотеки. Загрузка внешних
библиотек и их монтирование в `globals` производится в оболочке
приложения (`app shell`) стандартными средствами:

```html
<!DOCTYPE html>
…
<script type="application/javascript" src="./src/tweetnacl/nacl-fast.min.js"></script>
```

Чтобы фронт получил доступ к содержимому `npm`-пакета `tweetnacl`, в
файле `./teqfw.json` (дескрипторе приложения или плагина) нужно добавить
инструкции плагину `@teqfw/web` для обработки статики:

```json
{
  "@teqfw/web": {
    "statics": {
      "/tweetnacl/": "/tweetnacl/"
    }
  }
}
```

После чего все файлы в каталоге `./node_modules/tweetnacl/…` станут
доступны с фронта по адресу `https://…/src/tweetnacl/…`. Сам `npm`-пакет
подключается в приложение обычным способом, в `package.json` (приложения
или плагина):

```json
{
  "dependencies": {
    "tweetnacl": "*"
  }
}
```

Если сделать всё указанное выше, то библиотека загружается на фронте.
Чтобы сделать её функционал доступным через TeqFW DI, нужно создать
примерно такой `es6`-модуль `./src/Front/Lib/Nacl.mjs`:

```js
/**
 * Wrap TweetNaCl library to use as ES6 module in TeqFW on the front.
 * @namespace Fl32_Dup_Front_Lib_Nacl
 */
if (window.nacl === undefined) {
  throw new Error(`
Add '<script type="application/javascript" src="./src/tweetnacl/nacl-fast.min.js"></script>'
to your startup HTML to use TweetNaCl.
`);
}
export const {
  box,
  hash,
  lowlevel,
  randomBytes,
  scalarMult,
  secretbox,
  setPRNG,
  sign,
  verify,
} = window.nacl;
```

Оболочка экспортирует функционал, находящийся в global, в виде, доступном для использования в качестве es6-модуля.

Теперь функционал библиотеки можно использовать через [TeqFW
DI](https://wiredgeese.com/%D0%B2%D0%BD%D0%B5%D0%B4%D1%80%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B7%D0%B0%D0%B2%D0%B8%D1%81%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D0%B5%D0%B9-%D0%B2-teqfw-b1beb319ca56):

```js
class Vnd_Plugin_Mod {
  constructor(spec) {
    // EXTRACT DEPS
    const {box, secretbox} = spec['Fl32_Dup_Front_Lib_Nacl'];
    // …
  }
}
```
