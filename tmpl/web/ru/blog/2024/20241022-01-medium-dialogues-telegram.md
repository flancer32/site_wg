---
title: "Новая статья: Диалоги в Telegram-ботах на Node.js"
description: "Рассказываю, как строить интерактивные диалоги в Telegram-ботах на Node.js с использованием grammY."
date: 2024-10-22
display_date: "22 октября 2024"
image: "/img/blog/2024/10/22-01.png"
image_alt: "Статья о диалогах в Telegram-ботах"
---

# Новая статья: Диалоги в Telegram-ботах на Node.js

<zoom-img
            src="/img/blog/2024/10/22-01.png"
            alt="Диалоги в Telegram-ботах на Node.js"
            width="100px"
            style="float: left; margin: 15px 15px 0 0;"
    ></zoom-img>

Опубликовал новую статью на [Medium](https://wiredgoose.medium.com/telegram-bot-with-node-js-conversations-6d03ffb4059c) и [Habr](https://habr.com/ru/articles/852330/) — на этот раз о создании
        интерактивных диалогов в Telegram-ботах на платформе Node.js с использованием фреймворка [grammY](https://grammy.dev/).

В статье я подробно рассказываю, как обрабатывать пользовательский ввод, управлять состоянием диалога,
        реализовывать ветвление, циклы и избегать побочных эффектов в логике бота.

Вы можете посмотреть, как это работает, в демонстрационном боте:
        [@f64_demo_conversation_bot](https://t.me/f64_demo_conversation_bot)

К статье также прилагается репозиторий с полным исходным кодом:
        [@flancer64/tg-demo-all/conversation](https://github.com/flancer64/tg-demo-all/tree/conversation)

## Дополнительные фрагменты исходного кода

import {session} from ‘grammy’;
import {conversations} from ‘@grammyjs/conversations’; bot.use(session({initial: () => ({})}));
bot.use(conversations());
const conv = async (conversation, ctx) => {
} * `conversation`: an object that manages the state of the current conversation. * `ctx`: the standard *grammY* context corresponding to the current interaction between the user and the bot (the message).
import {createConversation} from ‘@grammyjs/conversations’; bot.use(createConversation(conv, ‘conversationStart’));
const cmd = async (ctx) => {
await ctx.conversation.enter(‘conversationStart’);
}
const conv = async (conversation, ctx) => {
return;
}; If for some reason the conversation cannot end properly (for example, the user enters another command instead of following the conversation script), you can forcibly terminate the conversation through `ctx.conversation.exit()`. For example:
bot.use(async (ctx, next) => {
if (ctx?.chat && (typeof ctx?.conversation?.active === ‘function’)) {
const {start} = await ctx.conversation.active();
if (start >= 1) {
logger.info(`An active conversation exists.`);
const commandEntity = ctx.message?.entities?.find(entity => entity.type === ‘bot_command’);
if (commandEntity) {
await ctx.conversation.exit(‘conversationStart’);
await ctx.reply(`The previous conversation has been closed.`);
}
}
}
await next();
});
const conv = async (conversation, ctx) => {
const username = ctx.from.username;
const sess = conversation.session;
sess.count = sess.count ?? 0;
sess.count++; logger.info(`username: ${username}, count: ${sess.count}`);
};
await ctx.reply(`Please select a service by number:\n${list}`);
let selected;
const response = await conversation.wait();
const id = parseInt(response.message.text);
if (!selected) await ctx.reply(`Invalid selection. Please enter a valid service number.`);
} while (!selected);
10/21 17:34:53.294 (info Demo_Back_Mod_Service): Service ‘Service 3’ read successfully (id:3).
const user = await conversation.external(
const dto = modUser.composeEntity();
dto.telegramId = telegramId;
modUser.create({dto});
}
); In this case, the user creation will only be executed once, during the very first call to the `external` method. On subsequent steps of the dialogue, the result of the first execution will be returned, and the external service won’t be called again.
let service = await conversation.external({
});
let selected;
const response = await conversation.wait();
const id = parseInt(response.message.text);
});
if (!selected) await ctx.reply(`Invalid selection. Please enter a valid service number.`);
} while (!selected); As you can see, the external service (*Demo_Back_Mod_Service*) is no longer called repeatedly for incorrect values (4 and 5), while the *Demo_Back_Mod_User* service is invoked every time (since it is not wrapped in `external`):
10/21 17:47:01.764 (info Demo_Back_Mod_Service): Service ‘Service 3’ read successfully (id:3).
const confirmation = await conversation.wait();
const confirmationText = confirmation.message.text.toLowerCase();
if (confirmationText === ‘yes’) {
} else if (confirmationText === ‘no’) {
} else {
}
let confirmed = false;
while (!confirmed) {
const confirmation = await conversation.wait();
const confirmationText = confirmation.message.text.toLowerCase();
if (confirmationText === ‘yes’) {
} else if (confirmationText === ‘no’) {
} else {
await ctx.reply(`Please respond with "yes" or "no".`);
}
}
