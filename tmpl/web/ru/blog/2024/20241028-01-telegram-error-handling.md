---
title: "Новая статья: Повышение устойчивости Telegram-ботов через обработку ошибок"
description: "Разбираю, как с помощью Node.js и grammY повысить надёжность бота за счёт обработки ошибок и логирования."
date: 2024-10-28
display_date: "28 октября 2024"
image: "/img/blog/2024/10/28-01.png"
image_alt: "Статья об устойчивости Telegram-ботов"
---

# Новая статья: Повышение устойчивости Telegram-ботов через обработку ошибок

<zoom-img
            src="/img/blog/2024/10/28-01.png"
            alt="Обработка ошибок в Telegram-ботах на Node.js"
            width="100px"
            style="float: left; margin: 15px 15px 0 0;"
    ></zoom-img>

Опубликовал новую статью на [Medium](https://flancer32.com/telegram-bot-with-node-js-using-error-handling-to-boost-resilience-cd04f99074fc), посвящённую повышению устойчивости Telegram-ботов с помощью системной обработки
        ошибок в Node.js и фреймворке [grammY](https://grammy.dev/).

В статье рассматриваются стратегии предотвращения сбоев, организация глобальной и локальной обработки ошибок, а
        также методы логирования, которые помогают эффективно отслеживать и устранять неполадки в работе бота.

## Дополнительные фрагменты исходного кода

export default class Demo_Back_Bot_Cmd_Demo {
constructor({TeqFw_Core_Shared_Api_Logger$: logger}) {
return async (ctx) => {
await ctx.reply(`This is a demo command!`);
};
}
} This code provides a minimal command handler without error handling. For instance, if a user has blocked the bot, the `ctx.reply` command will fail. In `long polling` mode, this error causes the bot to terminate. Here’s an example of the error message you might see:
bot.catch((err) => {
const ctx = err.ctx;
const e = err.error; logger.error(`Error while handling update ${ctx.update?.update_id}:`);
if (e instanceof GrammyError && e.error_code === 403) {
logger.error(`User blocked the bot while sending a message to chat_id ${e.parameters?.chat_id}.`);
return;
}
if (e instanceof GrammyError) {
logger.error(`Error in request: ${e.description}`);
} else if (e instanceof HttpError) {
logger.error(‘Could not contact Telegram:’);
} else {
logger.error(‘Unknown error:’);
}
logger.exception(e);
});
{
}
}
}
} This configuration enables flexible substitution of the original classes from the `flancer32/teq-telegram-bot` plugin with custom ones adapted to the specific bot’s needs.
