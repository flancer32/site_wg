---
title: "Пример консольного приложения на TeqFW"
description: "Как модульное Node.js-приложение на TeqFW ежедневно очищает устаревшие записи в базе данных магазина."
date: 2024-06-05
---

Этот небольшой, но рабочий проект — [консольное
приложение](https://github.com/flancer64/autobalta_cleaner) для магазина
autobalta.com. Оно ежедневно по cron удаляет из базы устаревшие журналы
обмена с внешними системами и старые пользовательские сессии.

<zoom-img src="/medium/img/e038e31766dd/image-01.png" alt="Проект очистки базы данных в IDE" width="100%"></zoom-img>

Очищаются таблицы `oc_latakko_api_log`, `oc_latakko_api_queue`,
`oc_latakko_log` и `oc_session`.

## `package.json`

TeqFW живёт в экосистеме npm/Node.js, поэтому приложение начинается с
`package.json`. Поле `"type": "module"` означает ES-модули: TypeScript и
транспиляция не нужны. Версии платформенных пакетов фиксируются, чтобы
рабочая инсталляция воспроизводилась:

``` json
{
  "type": "module",
  "dependencies": {
    "@teqfw/core": "0.24.0",
    "@teqfw/db": "0.21.0",
    "@teqfw/di": "0.22.0",
    "mysql": "^2.18.1"
  },
  "scripts": { "start": "node ./bin/tequila.mjs app-clean" }
}
```

- `@teqfw/di` загружает ES-модули, создаёт singleton и
  transient-объекты, внедряет зависимости;
- `@teqfw/core` задаёт правила идентификаторов и связывает приложение с
  commander;
- `@teqfw/db` даёт единообразный доступ к реляционным БД поверх Knex.js;
- `mysql` — драйвер MySQL/MariaDB.

Запуск — обычный `npm start`.

## Общий launcher

Файл `bin/tequila.mjs` одинаков для backend-приложений TeqFW: находит
корень проекта и передаёт его ядру.

``` js
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import teq from '@teqfw/core';

const path = join(dirname(fileURLToPath(import.meta.url)), '..');
teq({ path }).catch(console.error);
```

Ядро сканирует `node_modules`, находит Teq-плагины, настраивает
контейнер объектов и собирает CLI-команды.

## `teqfw.json` и конфигурация

Teq-плагин — обычный npm-пакет с дескриптором `teqfw.json`. Приложение
объявляет свой namespace и путь к исходникам, а также добавляет команду:

``` json
{
  "@teqfw/di": { "autoload": { "ns": "Ab_Clean", "path": "./src" } },
  "@teqfw/core": { "commands": ["Ab_Clean_Back_Cli_Clean"] }
}
```

Единый файл `cfg/local.json` содержит конфигурацию всех плагинов. Здесь
`@teqfw/db` получает параметры Knex.js и MySQL-соединения. Секреты
остаются только в локальном, не публикуемом конфиге.

## Команда `app-clean`

Команда описывается объектом с префиксом (realm), именем, описанием и
действием. Префикс `app` отделяет команды приложения от команд других
плагинов:

``` js
const command = fCommand.create();
command.realm = 'app';
command.name = 'clean';
command.desc = 'Clean up expired data.';
command.action = action;
```

Поэтому `./bin/tequila.mjs app-clean` запускает функцию очистки.

## Работа с базой

`@teqfw/db` описывает используемые таблицы отдельными schema-модулями и
предоставляет соединение `TeqFw_Db_Back_RDb_IConnect` вместе с
CRUD-движком `TeqFw_Db_Back_Api_RDb_CrudEngine`. Типичный шаблон всегда
использует транзакцию:

``` js
const trx = await conn.startTransaction();
try {
  // Read or change data.
  await trx.commit();
} catch (error) {
  await trx.rollback();
  throw error;
} finally {
  await conn.disconnect();
}
```

Например, очистка сессий старше 45 дней передаёт CRUD-движку транзакцию,
метаданные таблицы и условие:

``` js
const date = util.formatDate(util.subtractDays(45));
const rows = await crud.deleteSet(trx, rdbSession, function () {
  this.where(A_SESS.EXPIRE, '<', date);
});
logger.info(`Total '${rows}' sessions were deleted.`);
```

## Вывод

Этот пример показывает, как TeqFW собирает Node.js-задачу из модулей:
плагины объявляют свои возможности, контейнер связывает объекты во время
запуска, а CLI-команда выполняет понятную бизнес-операцию. Такая
структура хорошо подходит для повторяемых фоновых задач, интеграций и
сервисных утилит, когда важны изоляция модулей, тестируемость и
контролируемое изменение кода.
