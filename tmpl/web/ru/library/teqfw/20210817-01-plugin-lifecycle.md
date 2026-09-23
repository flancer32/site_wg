---
title: "TeqFW: инициализация и останов плагинов"
description: "Некоторые teq-плагины могут нуждаться в выполнении определённых действий при запуске и останове приложения (например, установить соединения с базой данных при запуске и закрыть сое"
date: 2021-08-17
---

Некоторые teq-плагины могут нуждаться в выполнении определённых действий
при запуске и останове приложения (например, установить соединения с
базой данных при запуске и закрыть соединения при останове).

Для этого плагин может указать в teq-дескрипторе (`./teqfw.json`)
es6-модуль с фабричной функцией, которая создаёт функцию-инициализатор,
и es6-модуль с фабричной функцией для функции-финализатора:

    {

“core”: {

“plugin”: {

“onInit”: “Vnd_Prj_Back_Plugin_Init”,

    “onStop”: “Vnd_Prj_Back_Plugin_Stop”
    }
    }
    }

Типовое содержимое es6-модуля:

    export default function Factory(spec) {
    // EXTRACT DEPS
    // … // COMPOSE RESULT
    async function action() {
    // …
    } return action;
    }

## Иерархия плагинов

Все плагины приложения выстраиваются в иерархию в соответствии с
зависимостями друг от друга. Зависимости определяется по ноде
`/dependencies`из `package.json`.

    {

“name”: “[<span class="citation"
cites="teqfw/web">@teqfw/web</span>](http://twitter.com/teqfw/web)”,

“dependencies”: {

“[<span class="citation"
cites="teqfw/core">@teqfw/core</span>](http://twitter.com/teqfw/core)”:
“\*“,

…

    }
    }

Первыми и инициализируются, и останавливаются плагины базовых уровней
(`core`), а затем — более высоких (`web`)

## Инициализация

Инициализация плагинов происходит при старте teq-приложения
(`TeqFw_Core_Back_App.init`) — после загрузки локальной конфигурации,
сканирования плагинов и инициализации DI-контейнера:

    this.init = async function ({path, version}) {
    initBootConfig(config, path, version);
    // …
    config.loadLocal(path);
    const registry = await pluginScan.exec(path);
    initDiContainer(registry);
    await initPlugins(registry);
    // …
    }

Приложение по очереди запускает инициализационные функции плагинов
снизу-вверх, начиная от базовых уровней (`core`) и заканчивая верхними
(`app`).

## Останов

Останов плагинов происходит в методе `TeqFw_Core_Back_App.stop`. Это
публичный метод и может быть вызван напрямую. Если остановка приложения
происходит по
[сигналу](https://nodejs.org/api/process.html#process_signal_events), то
метод вызывается автоматом:

    this.run = async function () {
    const me = this; async function onStop() {
    await me.stop();
    process.exit();
    } process.on(‘SIGINT’, onStop);
    process.on(‘SIGTERM’, onStop);
    process.on(‘SIGQUIT’, onStop);
    // …
    };this.stop = async function () {/* … */} Функции останова плагинов запускаются также по очереди, снизу-вверх — от базовых уровне (core) к верхним (app).
