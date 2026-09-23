---
title: "JOIN in SELECT with Knex.js"
description: "Showed how to build SELECT ... JOIN ... queries with Knex, covering transactions, joins, and alias usage."
date: 2022-04-07
display_date: "April 7, 2022"
image: "/img/post/2022040701.webp"
image_alt: "Publication logo"
---

# JOIN in SELECT with Knex.js

<zoom-img
            src="/img/post/2022040701.webp"
            alt="Publication logo"
            style="max-width: 100%; float: left; margin: 15px 15px 0 0;"
    ></zoom-img>

[Knex.js](https://knexjs.org/) is an excellent library for working with relational databases in Node.js applications (MySQL/MariaDB, PostgreSQL, MSSQL, Oracle, etc.). It's not an [ORM](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping), but rather a [DAL](https://en.wikipedia.org/wiki/Data_access_layer) level tool. In this post I'll show how to create `SELECT … JOIN …` queries using Knex.

## Transaction

First you need to get a transaction object. Example of connecting to DB, creating transaction and closing connection:

```js
import knex from 'knex';

const conn = await knex({
    client: '...',
    connection: {...}
});

const trx = await conn.transaction();

try {
    // SQL queries here
    await trx.commit();
} catch (e) {
    await trx.rollback();
}

await conn.destroy();
```

## Simple SELECT

Selecting a single record from a table:

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

## Simple JOIN

Example of joining tables `app_task` and `app_upload`:

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

## "Professional" JOIN

In practice, you often need to join multiple tables, use aliases and select specific fields:

```sql
select
    app_task.id as taskId,
    app_upload.id as uploadId
from ...
```

Sometimes the same table is joined multiple times with different aliases:

```sql
left join `app_upload` as taskImg on taskImg.id = ...
left join `app_upload` as userImg on userImg.id = ...
```

Example of a more complex query:

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

## Conclusion

SQL is the foundation for working with relational databases. `SELECT` queries with `JOIN` are one of the most frequently used tools, and Knex allows you to create them with any complexity.
