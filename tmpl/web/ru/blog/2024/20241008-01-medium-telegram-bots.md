---
title: "Новая статья на Medium: Первые шаги с Telegram-ботами"
description: "Опубликовал подробное руководство для начинающих по созданию Telegram-ботов с grammY и Node.js."
date: 2024-10-08
display_date: "8 октября 2024"
image: "/img/blog/2024/10/08-01.png"
image_alt: "Новая статья о Telegram-ботах"
---

# Новая статья на Medium: Первые шаги с Telegram-ботами

<zoom-img
            src="/img/blog/2024/10/08-01.png"
            alt="Новая статья на Medium: Первые шаги с Telegram-ботами"
            width="100px"
            style="float: left; margin: 15px 15px 0 0;"
    ></zoom-img>

Опубликовал новую статью на Medium под заголовком **«Telegram-боты: первые шаги»**. Это подробное
        пошаговое руководство для начинающих по созданию Telegram-ботов с использованием фреймворка
        **grammY** и платформы Node.js.

Если вы только начинаете осваивать ботов, статья поможет быстро погрузиться в тему с практическими примерами.

Прочитать статью:
        [Telegram-боты: первые шаги](https://link.medium.com/s1OcU4hPwNb)

Также доступен демонстрационный репозиторий с кодом всех примеров:
        [@flancer64/tg-demo-base](https://github.com/flancer64/tg-demo-base)

## Дополнительные фрагменты исходного кода

$ mkdir ./my-bot
$ cd ./my-bot
$ git init
$ git config –global init.defaultBranch main
$ npm init -y
$ npm pkg set name=“my-bot”
$ npm pkg set version=“0.1.0”
$ npm pkg set type=“module”
$ npm pkg set description=“Telegram Bots: The First Steps”
$ npm pkg set author=“Your Name [your@email.com](mailto:your@email.com)”
$ npm install @flancer32/teq-telegram-bot –save This will set the foundation for building your Telegram bot using the *grammY* framework and other tools we will introduce later.
import {dirname, join} from ‘node:path’;
import {fileURLToPath} from ‘node:url’;
import teq from ‘@teqfw/core’; const url = new URL(import.meta.url);
const script = fileURLToPath(url);
const bin = dirname(script);
const path = join(bin, ‘..’);
teq({path}).catch((e) => console.error(e));
$ chmod a+x ./bin/tequila.mjs To verify that the application is working, run the script:
$ ./bin/tequila.mjs Expected output:
{
}
} ### Configuring Git
/**/node_modules/
/**/package-lock.json
/**/tmp/
$ git add .
$ git status
$ git commit -m “Initial commit: setup project structure and configuration”
$ ./bin/tequila.mjs tg-bot-start
…
$ mkdir -p ./src/Back/Bot
$ touch ./src/Back/Bot/Setup.js Now, add the following content to the `./src/Back/Bot/Setup.js` file:
export default class MyBot_Back_Bot_Setup {
constructor() { this.commands = async function (bot) {
return bot;
};
this.handlers = function (bot) {
return bot;
};
}
}
{
},
}
}
}
} The `@teqfw/di` dependency container locates the source code in a manner similar to PHP’s [PSR-4 standard](https://www.php-fig.org/psr/psr-4/). In our case, the `MyBot` namespace maps to the `./src` directory. Additionally, there is an instruction for the container to replace the `Telegram_Bot_Back_Api_Setup` interface with its implementation `MyBot_Back_Bot_Setup`.
$ ./bin/tequila.mjs tg-bot-start
export default class MyBot_Back_Bot_Setup {
constructor() {
this.commands = async function (bot) {
await bot.api.setMyCommands([
{command: ‘help’, description: ‘Display this text.’},
{command: ‘settings’, description: ‘Configure bot settings.’},
{command: ‘start’, description: ‘Start using the bot.’},
]);
return bot;
};
}
} In this code, the `bot` parameter in the `commands` method is a [grammY object](https://github.com/grammyjs/grammY/blob/v1.29.0/src/bot.ts#L151) with the [appropriate API](https://grammy.dev/guide/api). This method is called when the bot starts (both in long polling mode and webhook mode) and creates the list of commands for the user.
export default class MyBot_Back_Bot_Setup {
constructor() {
this.handlers = function (bot) {
bot.command(‘help’, (ctx) => {
const msg = `
;
ctx.reply(msg, {
});
});
bot.command(‘settings’, (ctx) => {
ctx.reply(‘Configure bot settings.’);
});
bot.command(‘start’, (ctx) => {
ctx.reply(‘Start using the bot.’);
});
return bot;
};
}
}
