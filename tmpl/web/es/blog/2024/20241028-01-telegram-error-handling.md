---
title: "Nuevo artículo: Mejorando la resiliencia de bots de Telegram mediante manejo de errores"
description: "Analizo cómo aumentar la confiabilidad de un bot con Node.js y grammY mediante manejo de errores y logging."
date: 2024-10-28
display_date: "28 de octubre de 2024"
image: "/img/blog/2024/10/28-01.png"
image_alt: "Artículo sobre resiliencia en bots de Telegram"
---

# Nuevo artículo: Mejorando la resiliencia de bots de Telegram mediante manejo de errores

<zoom-img
            src="/img/blog/2024/10/28-01.png"
            alt="Manejo de errores en bots de Telegram con Node.js"
            width="100px"
            style="float: left; margin: 15px 15px 0 0;"
    ></zoom-img>

He publicado un nuevo artículo en [Medium](https://flancer32.com/telegram-bot-with-node-js-using-error-handling-to-boost-resilience-cd04f99074fc), dedicado a mejorar la resiliencia de bots de Telegram mediante el manejo sistemático de errores en Node.js y el framework [grammY](https://grammy.dev/).

El artículo explora estrategias para prevenir fallos, organizar el manejo global y local de errores, así como métodos de registro que ayudan a monitorear y resolver problemas en el funcionamiento del bot de manera efectiva.

## Fragmentos adicionales de código fuente

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
