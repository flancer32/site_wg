---
title: "JOIN в SELECT с Knex.js"
description: "Рассказал, как строить SELECT ... JOIN ... запросы в Knex, включая транзакции, присоединения и псевдонимы."
date: 2022-04-07
display_date: "7 апреля 2022"
image: "/img/post/2022040701.webp"
image_alt: "Логотип публикации"
---

# JOIN в SELECT с Knex.js

<zoom-img
            src="/img/post/2022040701.webp"
            alt="Логотип публикации"
            style="max-width: 100%; float: left; margin: 15px 15px 0 0;"
    ></zoom-img>

[Knex.js](https://knexjs.org/) — это отличная библиотека для взаимодействия с реляционными СУБД в
        Node.js-приложениях (MySQL/MariaDB, PostgreSQL, MSSQL, Oracle и др.). Это не [ORM](https://ru.wikipedia.org/wiki/ORM), а скорее инструмент уровня [DAL](https://ru.wikipedia.org/wiki/Слой_доступа_к_данным). В этой публикации я покажу, как
        создавать запросы `SELECT … JOIN …` с помощью Knex.

## Транзакция

Сначала нужно получить объект транзакции. Пример подключения к БД, создания транзакции и закрытия соединения:

```js
import knex from 'knex';

const conn = await knex({
    client: '...',
    connection: {...}
});

const trx = await conn.transaction();

try {
    // SQL-запросы здесь
    await trx.commit();
} catch (e) {
    await trx.rollback();
}

await conn.destroy();
```

## Простой SELECT

Выборка одной записи из таблицы:

```js
const trx = await conn.transaction();

try {
    const query = trx.queryBuilder();
    query.table('app_task');
    query.select();
    query.where('id', 3);

    console.log('SQL: ' + query.toString());
    const rs = await query;
    for (const one of rs) console.log(one);

    await trx.commit();
} catch (e) {
    await trx.rollback();
    console.log(e);
}
```

```
SQL: select * from `app_task` where `id` = 3
{
  id: 3,
  ...
}
```

## Простой JOIN

Пример соединения таблиц `app_task` и `app_upload`:

```js
const query = trx.queryBuilder();
query.table('app_task');
query.select();
query.leftJoin('app_upload', 'app_upload.id', 'image_ref');
console.log('SQL: ' + query.toString());
```

```
select * from `app_task`
left join `app_upload` on `app_upload`.`id` = `image_ref`
```

## "Профессиональный" JOIN

На практике часто требуется соединять несколько таблиц, использовать псевдонимы и выбирать определённые поля:

```sql
select
    app_task.id as taskId,
    app_upload.id as uploadId
from ...
```

Иногда одну таблицу подключают несколько раз с разными псевдонимами:

```sql
left join `app_upload` as taskImg on taskImg.id = ...
left join `app_upload` as userImg on userImg.id = ...
```

Пример более сложного запроса:

```js
// METADATA
const T_TASK = 'app_task';
const T_UPLOAD = 'app_upload';
const T_USER = 'app_user';

const T_TASK_A_ID = 'id';
const T_TASK_A_TITLE = 'title';
const T_TASK_A_IMAGE_REF = 'image_ref';
const T_TASK_A_USER_REF = 'user_ref';

const T_UPLOAD_A_ID = 'id';
const T_UPLOAD_A_UUID = 'uuid';

const T_USER_A_ID = 'id';
const T_USER_A_NAME = 'name';

// ALIASES
const asTask = 't';
const asUpload = 'up';
const asUser = 'usr';

const tTask = {[asTask]: T_TASK};
const tUpload = {[asUpload]: T_UPLOAD};
const tUser = {[asUser]: T_USER};

const query = trx.queryBuilder();

query.table(tTask);
query.select([
    {[`${asTask}.id`]: 'taskId'},
    {[`${asTask}.title`]: 'taskName'}
]);

query.leftJoin(tUpload, `${asUpload}.${T_UPLOAD_A_ID}`, `${asTask}.${T_TASK_A_IMAGE_REF}`);
query.select([{[`${asUpload}.${T_UPLOAD_A_UUID}`]: 'imgUuid'}]);

query.leftJoin(tUser, `${asUser}.${T_USER_A_ID}`, `${asTask}.${T_TASK_A_USER_REF}`);
query.select([{[`${asUser}.${T_USER_A_NAME}`]: 'userName'}]);

query.where(`${asTask}.${T_TASK_A_ID}`, 3);
```

```sql
select
    `t`.`id` as `taskId`,
    `t`.`title` as `taskName`,
    `up`.`uuid` as `imgUuid`,
    `usr`.`name` as `userName`
from `app_task` as `t`
left join `app_upload` as `up` on `up`.`id` = `t`.`image_ref`
left join `app_user` as `usr` on `usr`.`id` = `t`.`user_ref`
where `t`.`id` = 3
```

## Итог

SQL — это основа для работы с реляционными базами данных. Запросы `SELECT` с `JOIN` — один
        из самых часто используемых инструментов, и Knex позволяет создавать их любой сложности.
