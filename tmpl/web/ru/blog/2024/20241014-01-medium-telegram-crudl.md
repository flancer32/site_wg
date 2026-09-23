---
title: "Новая статья: Telegram-бот с аргументами команд и CRUD-L"
description: "Рассказал, как реализовать аргументы команд и CRUD-L в Telegram-боте на Node.js с помощью grammY."
date: 2024-10-14
display_date: "14 октября 2024"
image: "/img/blog/2024/10/14-01.png"
image_alt: "Новая статья о CRUD-L для Telegram-бота"
---

# Новая статья: Telegram-бот с аргументами команд и CRUD-L

<zoom-img
            src="/img/blog/2024/10/14-01.png"
            alt="Telegram-бот с аргументами команд и CRUD-L"
            width="100px"
            style="float: left; margin: 15px 15px 0 0;"
    ></zoom-img>

Опубликовал новую статью на [Medium](https://flancer32.com/telegram-bot-with-node-js-implementing-crud-l-operations-using-command-arguments-fcfb38991efa) и [Habr](https://habr.com/ru/articles/850294/) — на
        этот раз о создании Telegram-бота, поддерживающего аргументы команд для операций **CRUD-L**
        (создание, чтение, обновление, удаление, список).

В статье подробно разбирается, как реализовать обработку команд с аргументами на платформе Node.js с
        использованием [grammY](https://grammy.dev/). Пошаговое руководство подойдёт и
        начинающим, и тем, кто уже работает с ботами.

Все примеры кода собраны в демонстрационном репозитории:
        [@flancer64/tg-demo-crudl](https://github.com/flancer64/tg-demo-crudl)

## Дополнительные фрагменты исходного кода

export default class Demo_Crudl_Back_Bot_Cmd_Create {
constructor(
{
}
) {}
} * **Logger** (`TeqFw_Core_Shared_Api_Logger`): For logging the execution of commands. * **Database Connection** (`TeqFw_Db_Back_RDb_IConnect`): To handle database transactions. * **CRUD Engine** (`TeqFw_Db_Back_Api_RDb_CrudEngine`): To perform basic database operations. * **DTO for Database Structure** (`Demo_Crudl_Back_Store_RDb_Schema_Phone`): A Data Transfer Object (DTO) that defines the database structure.
class Dto {
date_created;
id;
name;
phone;
}
); This structure is sufficient to give you an idea of how the data is organized in the database. While the demo bot uses SQLite, Knex.js, a database abstraction layer (DBAL), allows you [to work](https://knexjs.org/guide/#node-js) with PostgreSQL, MariaDB/MySQL, MS SQL, and Oracle as well. You just need to install the appropriate npm package for the desired database system.
$ ./bin/tequila.mjs db-init
$ ./bin/tequila.mjs db-export -f ./var/data.json
$ ./bin/tequila.mjs db-import -f ./var/data.json The command names are self-explanatory: `db-init` initializes the database structure (table), while `db-export` and `db-import` handle data export and import in JSON format, respectively.
const handler = async (ctx) => {
let msg = ‘The command has failed.’;
const from = ctx.message.from;
logger.info(`Command has been received from user '${from.username}' (id:${from.id})`);
const trx = await conn.startTransaction();
// const parts = ctx.message.text.split(’ ’);
// …
await trx.commit();
} catch (e) {
await trx.rollback();
logger.error(msg);
}
// https://core.telegram.org/bots/api#sendmessage
await ctx.reply(msg, {
});
};
const parts = ctx.message.text.split(’ ’);
const dto = rdbPhone.createDto();
dto.name = parts[1];
dto.phone = parts[2];
const {[A_PHONE.ID]: id} = await crud.create(trx, rdbPhone, dto);
await trx.commit();
logger.info(msg);
} catch (e) {…}
$ ./bin/tequila.mjs db-init Start the bot in long polling mode:
$ ./bin/tequila.mjs tg-bot-start or
$ npm start ### Get the Help
