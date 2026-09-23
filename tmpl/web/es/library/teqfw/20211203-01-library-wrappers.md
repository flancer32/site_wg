---
title: "TeqFW: envoltorios para bibliotecas"
description: "Cómo exponer bibliotecas del navegador que no son módulos ES mediante espacios de nombres e inyección de dependencias de TeqFW."
date: 2021-12-03
---

Las aplicaciones suelen usar bibliotecas de terceros, sobre todo en el
navegador, que no son módulos ES6. Este artículo explica cómo
conectarlas para poder utilizarlas dentro de
[TeqFW](https://teqfw.com/).

Tomemos [tweetnacl](https://tweetnacl.js.org/) como ejemplo. El paquete
se carga en el navegador como un único bundle:

``` html
<script type="application/javascript" src="nacl-fast.min.js"></script>
```

Después queda disponible como objeto global:

``` js
window.nacl
```

TeqFW accede a los elementos de código mediante espacios de nombres.
Además, su contenedor de inyección de dependencias permite sustituir una
dependencia por otra, por ejemplo una interfaz por su implementación.
Por ello, para acceder a objetos globales se necesita un envoltorio
compatible con TeqFW DI.

Las aplicaciones TeqFW son principalmente PWA. Para funcionar sin
conexión, guardan en caché del navegador todos los recursos necesarios,
incluidas las bibliotecas externas. El app shell las carga de la forma
habitual:

``` html
<!-- These scripts are not ESM ready for loading with ES6 'import'. -->
<script type="application/javascript" src="./src/tweetnacl/nacl-fast.min.js"></script>
```

Para exponer el contenido del paquete npm `tweetnacl` al frontend, añade
instrucciones de recursos estáticos para `@teqfw/web` en `./teqfw.json`:

``` json
{
  "@teqfw/web": {
    "statics": { "/tweetnacl/": "/tweetnacl/" }
  }
}
```

Los archivos de `./node_modules/tweetnacl/…` estarán disponibles en
`https://…/src/tweetnacl/…`, y el paquete se declara normalmente en
`package.json`:

``` json
{ "dependencies": { "tweetnacl": "*" } }
```

Una vez cargada la biblioteca, crea un módulo ES6 como
`./src/Front/Lib/Nacl.mjs` para exponerla mediante TeqFW DI:

``` js
if (window.nacl === undefined) {
  throw new Error("Add TweetNaCl to your startup HTML to use it.");
}

export const {
  box, hash, lowlevel, randomBytes, scalarMult,
  secretbox, setPRNG, sign, verify,
} = window.nacl;
```

El envoltorio exporta las funciones del objeto global en una forma que
puede consumir un módulo ES6. Después otro módulo las obtiene mediante
TeqFW DI:

``` js
class Vnd_Plugin_Mod {
  constructor(spec) {
    const {box, secretbox} = spec['Fl32_Dup_Front_Lib_Nacl'];
  }
}
```

## Fragmentos adicionales de código fuente

    }
    export const {

    } = window.nacl; Оболочка экспортирует функционал, находящийся в global, в виде, доступном для использования в качестве es6-модуля.

    class Vnd_Plugin_Mod {
    constructor(spec) {
    // EXTRACT DEPS
    const {box, secretbox} = spec[‘Fl32_Dup_Front_Lib_Nacl’];
    // …
    }
    }
