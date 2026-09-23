---
title: "First version of @teqfw/di"
description: "Six years after the first commit, the @teqfw/di library reached its first release. Published on npm."
date: 2025-08-22
display_date: "August 21, 2025"
image: "/img/brand/teqfw.webp"
image_alt: "First version of @teqfw/di"
---

# First version of @teqfw/di

<zoom-img
            src="/img/brand/teqfw.webp"
            alt="The @teqfw/di library"
            width="100px"
            style="float: left; margin: 15px 15px 0 0;"
    ></zoom-img>

I made the first commit for **@teqfw/di** on August 18, 2019. Back then the idea was a loader for ES6 modules similar to [requirejs](https://requirejs.org/) that works both in the browser and in Node.js. Over the years the library was rewritten several times and tested in various projects.

After an article on [Habr](https://habr.com/ru/articles/887646/) I realized that for broad use the ability to obtain the container itself as a dependency should not exist. It was convenient for a trusted team but too risky for open projects. Yesterday I removed this option and released the first version —
        [1.0.1 on npm](https://www.npmjs.com/package/@teqfw/di/v/1.0.1).

The other platform plugins still rely on the old container and are incompatible with the new version. They will have to be rewritten. But the main thing is that the platform's core library has finally grown out of its "infancy", and I am pleased with this step.
