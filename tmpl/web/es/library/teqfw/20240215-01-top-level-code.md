---
title: "TeqFW: organización del código de nivel superior"
description: "Por qué los plugins TeqFW separan fuentes en Back, Front y Shared, y cómo eso permite usar módulos ES con seguridad en navegador y Node.js."
date: 2024-02-15
---

TeqFW permite usar parte del código JavaScript sin cambios en servidor y
navegador, por ejemplo constantes y DTO. Pero frontend y backend
resuelven tareas diferentes: el frontend se relaciona con personas y el
backend con bases de datos, colas y otros sistemas. Por eso conviene
hacer visible la frontera desde la estructura del paquete.

## Tres ámbitos de fuentes

En un paquete npm ordinario podría verse así:

    src/
      back/
      front/
      shared/

TeqFW usa CamelCase para directorios y archivos:

    src/
      Back/
      Front/
      Shared/
        Dto/
          UserAuth/

**Back** guarda solo código de servidor; **Front**, solo código de
navegador; **Shared**, código válido en ambos entornos. Si un paquete no
tiene código de un ámbito, no necesita dicho directorio.

## Nombres de módulo y DI

A partir de la ruta de un módulo ES, TeqFW forma un nombre lógico que
utiliza el contenedor de dependencias. Por ejemplo,
`src/Shared/Dto/UserAuth/Permission.js` puede llamarse:

    Vendor_App_Shared_Dto_UserAuth_Permission

El contenedor usa ese nombre para direccionar e inyectar dependencias.
La separación de directorios ayuda a leer la arquitectura y a mantener
un mecanismo común de enlace entre módulos.

## Por qué es obligatorio

La plataforma entrega al navegador las fuentes de `Front` y `Shared`.
Por tanto, no pueden contener dependencias disponibles solo en Node.js.
Por ejemplo:

``` js
import { existsSync, mkdirSync, rmSync } from 'node:fs';
```

El navegador no puede ejecutar la API de sistema de archivos de Node.js.
Ese import es válido en `Back`, pero rompería la carga en cliente. El
límite del nivel superior evita el error antes de que llegue a quien usa
el producto.

Ejemplos de paquetes con esta estructura:
[demo-webauthn-pubkey](https://github.com/flancer64/demo-webauthn-pubkey/tree/main/src),
[spa-remote-console](https://github.com/flancer64/spa-remote-console/tree/main/src)
y [teqfw/core](https://github.com/teqfw/core/tree/main/src).

## Conclusión

El directorio raíz puede llamarse `src`, `source` o de otro modo. Pero
en un plugin Teq la separación `Back`, `Front` y `Shared` es
obligatoria. Dentro de cada ámbito la estructura es libre; en el nivel
superior, esta regla fija el entorno de uso de cada módulo y hace
manejable el JavaScript compartido entre navegador y Node.js.
