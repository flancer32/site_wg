---
title: "JOIN en SELECT con Knex.js"
description: "Mostró cómo construir consultas SELECT ... JOIN ... con Knex, incluyendo transacciones, uniones y alias."
date: 2022-04-07
display_date: "7 de abril de 2022"
image: "/img/post/2022040701.webp"
image_alt: "Logo de la publicación"
---

# JOIN en SELECT con Knex.js

<zoom-img
            src="/img/post/2022040701.webp"
            alt="Logo de la publicación"
            style="max-width: 100%; float: left; margin: 15px 15px 0 0;"
    ></zoom-img>

[Knex.js](https://knexjs.org/) es una excelente biblioteca para interactuar con bases de datos relacionales en aplicaciones Node.js (MySQL/MariaDB, PostgreSQL, MSSQL, Oracle, etc.). No es un [ORM](https://es.wikipedia.org/wiki/Mapeo_objeto-relacional), sino más bien una herramienta de nivel [DAL](https://es.wikipedia.org/wiki/Capa_de_acceso_a_datos). En esta publicación mostraré cómo crear consultas `SELECT … JOIN …` usando Knex.

## Transacción

Primero necesitamos obtener un objeto de transacción. Ejemplo de conexión a la base de datos, creación de transacción y cierre de conexión:

```js
import knex from 'knex';

const conn = await knex({
    client: '...',
    connection: {...}
});

const trx = await conn.transaction();

try {
    // Consultas SQL aquí
    await trx.commit();
} catch (e) {
    await trx.rollback();
}

await conn.destroy();
```

## SELECT simple

Selección de un registro de una tabla:

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

## JOIN simple

Ejemplo de unión de tablas `app_task` y `app_upload`:

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

## JOIN "profesional"

En la práctica, a menudo es necesario unir varias tablas, usar alias y seleccionar campos específicos:

```sql
select
    app_task.id as taskId,
    app_upload.id as uploadId
from ...
```

A veces una tabla se conecta varias veces con diferentes alias:

```sql
left join `app_upload` as taskImg on taskImg.id = ...
left join `app_upload` as userImg on userImg.id = ...
```

Ejemplo de una consulta más compleja:

```js
// METADATOS
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

## Conclusión

SQL es la base para trabajar con bases de datos relacionales. Las consultas `SELECT` con `JOIN` son una de las herramientas más utilizadas, y Knex permite crearlas con cualquier nivel de complejidad.
