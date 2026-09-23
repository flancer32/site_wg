---
title: "LLM-first: парная разработка без вайбкодинга"
description: "Рассказал на Хабре, как за 2 недели построил CMS с GPT и DeepSeek, используя DI, Markdown и JSDoc. LLM как соавтор архитектуры."
date: 2025-05-31
display_date: "31 мая 2025"
image: "/img/brand/habr.webp"
image_alt: "Публикация на Хабре: LLM-first"
relations:
  - teqcms
---

# LLM-first: парная разработка без вайбкодинга

<zoom-img
            src="https://habrastorage.org/r/w1560/getpro/habr/upload_files/ffc/364/c6f/ffc364c6f480bcd8b2c2972383eb23a0.png"
            alt="Публикация на Хабре"
            width="100px"
            style="float: left; margin: 15px 15px 0 0;"
    ></zoom-img>

На платформе [Habr](https://habr.com/) опубликована статья
        [«LLM-first: парная разработка без вайбкодинга»](https://habr.com/ru/articles/914324/). Это обобщение моего опыта создания
        мультиязычной CMS с помощью ChatGPT и DeepSeek API — от архитектурной структуры до юнит-тестов и JSDoc.

Я подробно описал, как использую LLM как партнёра по проектированию: фиксирую цели и структуру в Markdown,
        организую DI через `@teqfw/di`, провожу изолированную генерацию и тестирование кода.

Главный вывод: LLM-first — это не игра с промптами, а структурный подход к разработке, в котором
        Человек и Модель взаимодействуют на равных, через архитектуру и текст.

Проект TeqCMS, о котором идёт речь, доступен по адресу [cms.teqfw.com](https://cms.teqfw.com/),
        а его код — в репозитории [teq-cms-demo](https://github.com/flancer32/teq-cms-demo).
