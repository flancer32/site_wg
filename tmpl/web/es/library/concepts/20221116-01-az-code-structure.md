---
title: "Estructuración AZ de archivos de código fuente"
description: "Un enfoque de estructura de archivos que marca las partes privadas del código y hace más visibles los límites de refactorización."
date: 2022-11-16
---

La estructuración AZ es mi forma de organizar archivos fuente en
proyectos cuyo código vive en un sistema de archivos: Java, PHP,
JavaScript/Node.js. Su objetivo es hacer el refactor más predecible.

## Por qué hace falta

El código se cambia más veces de las que se escribe desde cero. En
desarrollo web los requisitos se aclaran mientras se trabaja: vemos la
dirección, no todos los detalles. Por eso, en cada iteración añadimos,
quitamos y modificamos código. Es el modo normal de trabajo.

<zoom-img src="/medium/img/8ae5844696ea/image-01.png" alt="Modelo de desarrollo en cascada" width="100%"></zoom-img>

<zoom-img src="/medium/img/8ae5844696ea/image-02.png" alt="Modelo de desarrollo en espiral" width="100%"></zoom-img>

La dificultad principal es saber hasta dónde se propaga un cambio. La
encapsulación de la POO intenta resolver precisamente ese problema.

## Límites habituales

Un proyecto grande se compone de paquetes y archivos. En un módulo ES,
el código sin `export` se puede cambiar libremente dentro del archivo;
el código exportado puede usarse en cualquier parte. En un paquete npm,
`main` o `exports` definen la superficie pública y el resto es interno.

<zoom-img src="/medium/img/8ae5844696ea/image-03.jpg" alt="Límites de propagación de cambios" width="100%"></zoom-img>

Pero a veces el límite debe ser menor que el paquete. Las fuentes suelen
organizarse por rol o por dominio. Yo combino ambos: primero por rol y
después por funcionalidad.

    src/
      Back/Mod/RDb/
      Front/Mod/Store/Ui/
      Lib/Route/Home.mjs
      Shared/Dto/

El primer nivel es más estable y depende del framework; el segundo
cambia con el negocio. Un archivo puede tener alcance global dentro del
paquete o un alcance local, donde modificarlo no afecta a otros
archivos.

## Estructura A

La complejidad se vence con descomposición. Imaginemos una gran clase de
configuración en `Mod/Settings.mjs`. Sus partes se pueden extraer junto
a ella:

    Mod/
      Settings/
        Payments.mjs
        Profile.mjs
        Security.mjs
      Settings.mjs

La pareja `Settings/` y `Settings.mjs` ya sugiere un modelo con
detalles. Si esa estructura ya contiene varios modelos, marco los
fragmentos privados con el subdirectorio `A/`:

    Mod/
      Settings/
        A/
          Snippet1.mjs
          Snippet2.mjs
        Payments.mjs
        Profile.mjs
      Settings.mjs

Los archivos de `Settings/A/` son partes de `Settings.mjs`. El archivo
raíz se puede importar dentro del paquete; el contenido de `A/` está
destinado solo a él. Así el nivel de archivo adquiere una zona privada y
se ven mejor los límites de cambio. Se puede anidar:
`Route/Settings/A/Profile/A/Password/Change/A/Evt/Change.mjs`.

## Estructura Z

A veces el código auxiliar no corresponde a un único archivo, sino a un
grupo: una «biblioteca para el grupo». Para ello uso `Z/`:

    Cli/
      Data/
        Z/ListTables.mjs
        Export.mjs
        Import.mjs
        Init.mjs

Un cambio en `Cli/Data/Z/ListTables.mjs` no debería salir del límite
`Cli/Data/`.

## Conclusión

Marcar ámbitos privados directamente en la estructura de archivos
facilita ver hasta dónde llega un cambio. `A/` significa detalles de un
archivo raíz y `Z/`, detalles comunes de un grupo pequeño. No es una
regla del lenguaje ni sustituye una buena API: es un acuerdo de equipo
que ayuda mucho al refactorizar proyectos grandes.
