---
title: "ES6 export como bloque de construcción"
description: "Destacó que export es el bloque base de los módulos ES6 y anticipó más publicaciones sobre espacios de nombres."
date: 2022-05-08
display_date: "8 de mayo de 2022"
image: "/img/post/2022050801.webp"
image_alt: "Ilustración de la publicación"
---

# ES6 export como bloque de construcción

<zoom-img
            src="/img/post/2022050801.webp"
            alt="Ilustración de la publicación"
            style="max-width: 100%; float: left; margin: 15px 15px 0 0;"
    ></zoom-img>

¿Qué es un bloque de construcción (*brick*) en las aplicaciones modernas de ES2015+? ¿Variable, función, clase,
        módulo? Mi respuesta es `export`. Hoy organizaremos el código JavaScript en módulos ES6 y los conectaremos
        mediante `import`:

```js
import {export1, export2} from "module-name";
```

Estoy convencido: JavaScript necesita espacios de nombres, como en los lenguajes "serios". Planeo continuar este tema en las próximas
        publicaciones.
