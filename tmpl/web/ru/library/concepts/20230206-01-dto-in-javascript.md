---
title: "DTO в JavaScript"
description: "Принципы организации и преобразования данных через Data Transfer Object в JavaScript."
date: 2023-02-06
---

Информационные системы обрабатывают данные, поэтому DTO ([Data Transfer
Object](https://en.wikipedia.org/wiki/Data_transfer_object)) — важное
понятие современной разработки. В классическом смысле DTO — простой
объект без логики, описывающий структуру данных, передаваемых по сети
между удалёнными процессами. При передаче между слоями одного процесса
говорят о [локальном DTO](https://martinfowler.com/bliki/LocalDTO.html).

У DTO две основные задачи:

- **структурировать данные**, упрощая работу разработчиков;
- **преобразовать данные** из транспортного формата — например JSON, XML
  или YAML — во внутренний формат приложения, например JavaScript
  Object.

Ниже — принципы, которых я придерживаюсь в JavaScript-приложениях.

## Простой DTO

В простом случае DTO — плоская структура, где каждый атрибут имеет
примитивный тип, например строку или число:

``` js
class Simple {
  aBool;
  aNumber;
  aString;
}
```

Это решает задачу структурирования. Для преобразования нужно принять
входные данные и привести типы:

``` js
class Simple {
  constructor(data) {
    this.aBool = Boolean(data?.aBool);
    this.aNumber = Number.parseFloat(data?.aNumber);
    this.aString = String(data?.aString);
  }
}
```

## Сложный DTO

Сложный DTO состоит из других DTO — простых и сложных — и примитивов:

``` js
class Complex {
  constructor(data) {
    this.aDto = new Simple(data?.aDto);
    this.aString = String(data?.aString);
  }
}
```

Преобразование JSON в DTO выглядит так:

``` js
const dto = new Complex({
  aDto: {aBool: true, aNumber: 16, aString: 'simple'},
  aString: 'complex',
});
```

## Каскадное приведение типов

Для каскадного приведения типов в сложных объектах исходники связываются
через import-export:

``` js
export default class Simple1 {}
import Simple from './simple.mjs';
export default class Complex {}
```

Так можно строить DTO очень высокой сложности и независимо менять
отдельные компоненты. На каждом уровне компонент разбирает свой фрагмент
входных данных, приводит типы и подключает конструкторы вложенных
уровней.

## Отсечение или приведение

Пусть JSON содержит `name`, `age` и `weight`, а DTO Person готов
обработать только первые два свойства. Можно явно оставить известные
свойства:

``` js
this.name = String(data?.name);
this.age = Number.parseInt(data?.age);
```

или сначала скопировать всё, а затем привести известные поля:

``` js
Object.assign(this, data);
this.name = String(data?.name);
this.age = Number.parseInt(data?.age);
```

<zoom-img src="/medium/img/3274a3063919/image-01.png" alt="Отсечение и приведение данных в DTO" width="100%"></zoom-img>

Если код — конечный обработчик DTO, лишние данные лучше отсечь. Если это
промежуточный обработчик, лучше привести типы свойств, с которыми он
работает, а незнакомые данные сохранить.

## Итог

- DTO описывает данные, передаваемые между процессами или слоями
  приложения.
- Его цели — организация данных и приведение типов.
- Вложенные DTO позволяют строить сложные структуры.
- При преобразовании входа известные свойства можно либо отсечь, либо
  привести, сохранив остальные.

## Дополнительные фрагменты исходного кода

    {

    } … and DTO for this data:
    class Person {
    name;
    age;
    }

    constructor(data) {
    this.name = String(data?.name);
    this.age = Number.parseInt(data?.age);
    }
    constructor(data) {
    Object.assign(this, data);
    this.name = String(data?.name);
    this.age = Number.parseInt(data?.age);
    }
