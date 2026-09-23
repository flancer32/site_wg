---
title: "ES6 export as a Building Block"
description: "Framed export as the building block of ES6 modules and hinted at future posts about namespaces."
date: 2022-05-08
display_date: "May 8, 2022"
image: "/img/post/2022050801.webp"
image_alt: "Publication illustration"
---

# ES6 export as a Building Block

<zoom-img
            src="/img/post/2022050801.webp"
            alt="Publication illustration"
            style="max-width: 100%; float: left; margin: 15px 15px 0 0;"
    ></zoom-img>

What is a building block (*brick*) in modern ES2015+ applications? A variable, function, class,
        module? My answer is `export`. Today we organize JavaScript code as ES6 modules and connect them
        via `import`:

```js
import {export1, export2} from "module-name";
```

I'm convinced: JavaScript needs namespaces, like in "serious" languages. I plan to continue this topic in future
        posts.
