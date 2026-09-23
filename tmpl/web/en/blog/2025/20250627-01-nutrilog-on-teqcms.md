---
title: "NutriLog migrated from Astro to TeqCMS"
description: "Switched from Astro to TeqCMS with SSR and Mustache. Now translating pages via DeepSeek and deploying to server via GitHub Actions."
date: 2025-06-27
display_date: "June 27, 2025"
image: "/img/blog/2025/06/27-01.png"
image_alt: "NutriLog migrated from Astro to TeqCMS"
---

# NutriLog migrated from Astro to TeqCMS

<zoom-img
            src="/img/blog/2025/06/27-01.png"
            alt="NutriLog migrated from Astro to TeqCMS"
            width="100px"
            style="float: left; margin: 15px 15px 0 0;"
    ></zoom-img>

As of June 27, the [NutriLog](https://nutrilog.app.wiredgeese.com/) website no longer
        uses [Astro](https://astro.build/). I've completely migrated it to [TeqCMS](https://cms.teqfw.com/en/) — a file-based CMS implemented according to
        the **TeqFW** philosophy.

The goal of this transition was to simplify website management and integrate automatic translations through language model APIs,
        such as [DeepSeek](https://www.deepseek.com/en). Now I can create and
        edit pages locally on my laptop, run content translation, and publish the results via
        GitHub. Content in the Git repository is automatically deployed to the server using GitHub Actions.

Instead of static site generation (SSG), the site now uses **server-side page building on request**. This
        isn't suitable for high-traffic websites, but gives me as a developer maximum flexibility and simplicity.
        There's no client-side part — everything works server-side with Mustache templates.

In this project, TeqCMS has become more than just a generation engine — it's part of an architectural experiment: what content management
        might look like with fully automated localization, SSR, and version control.
