---
title: "Talk is cheap. So is code"
description: "A practical experiment showed that context preserves the behavior of the project, while code can be regenerated. The full text is on Habr and a copy is in the site library."
date: 2026-04-16
display_date: "April 16, 2026"
image: "/img/blog/2026/20260416-01-cost-of-ai-code.png"
image_alt: "Talk is cheap. So is code"
---

# Talk is cheap. So is code

<zoom-img src="/img/blog/2026/20260416-01-cost-of-ai-code.png" alt="Talk is cheap. So is code"
        width="100px"></zoom-img>

I ran a practical ADSM experiment. First I built a Spotify playlist helper for roughly one hundred
        songs, then I deleted the code and tests and regenerated the application twice from the context
        alone. The result was clear: the context keeps the behavior of the project intact even after the
        implementation is removed.

After that, I published the full [article](https://habr.com/ru/articles/1023900/) on Habr.
        A copy is also available in the [site library](/en/library/adsm/20260415-01-conversations-code-cost.html).
        The short conclusion is simple: context matters more than code, and code can be regenerated.
