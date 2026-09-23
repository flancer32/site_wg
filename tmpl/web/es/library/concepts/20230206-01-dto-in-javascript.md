---
title: "DTO en JavaScript"
description: "Principios para organizar y transformar datos con Data Transfer Object en JavaScript."
date: 2023-02-06
---

Los sistemas de información procesan datos, por lo que DTO ([Data
Transfer Object](https://en.wikipedia.org/wiki/Data_transfer_object)) es
un concepto importante del desarrollo moderno. En sentido clásico, un
DTO es un objeto sencillo, sin lógica, que describe los datos
transferidos por la red entre procesos remotos. Cuando los datos pasan
entre capas del mismo proceso se habla de [DTO
local](https://martinfowler.com/bliki/LocalDTO.html).

Un DTO tiene dos objetivos principales:

- **estructurar los datos** para facilitar el trabajo de desarrollo;
- **transformar los datos** desde un formato de transporte, como JSON,
  XML o YAML, al formato interno de la aplicación, por ejemplo un objeto
  JavaScript.

## DTO simple

En el caso simple, el DTO es una estructura plana cuyos atributos son
primitivos, como cadenas o números:

``` js
class Simple {
  aBool;
  aNumber;
  aString;
}
```

Para transformar la entrada, el constructor debe analizar los datos y
convertir sus tipos:

``` js
class Simple {
  constructor(data) {
    this.aBool = Boolean(data?.aBool);
    this.aNumber = Number.parseFloat(data?.aNumber);
    this.aString = String(data?.aString);
  }
}
```

## DTO complejo

Un DTO complejo contiene otros DTO, simples o complejos, además de
primitivas:

``` js
class Complex {
  constructor(data) {
    this.aDto = new Simple(data?.aDto);
    this.aString = String(data?.aString);
  }
}
```

La transformación de JSON a DTO puede ser:

``` js
const dto = new Complex({
  aDto: {aBool: true, aNumber: 16, aString: 'simple'},
  aString: 'complex',
});
```

## Conversión de tipos en cascada

Para convertir tipos en cascada, los componentes se conectan mediante
import-export. Estos son módulos separados:

``` js
// simple.mjs
export default class Simple1 {}
```

``` js
// complex.mjs
import Simple from './simple.mjs';
export default class Complex {}
```

Así se pueden construir DTO de gran complejidad y modificar sus
componentes de forma independiente. Cada nivel analiza su fragmento de
entrada, convierte los tipos y conecta los constructores de niveles
anidados.

## Recortar o convertir

Supongamos que JSON contiene `name`, `age` y `weight`, pero el DTO
Person conoce solo los dos primeros. Podemos conservar únicamente las
propiedades conocidas:

``` js
this.name = String(data?.name);
this.age = Number.parseInt(data?.age);
```

o copiar todo y convertir después las propiedades conocidas:

``` js
Object.assign(this, data);
this.name = String(data?.name);
this.age = Number.parseInt(data?.age);
```

<zoom-img src="/medium/img/3274a3063919/image-01.png" alt="Recortar y convertir datos en un DTO" width="100%"></zoom-img>

Si el código es el manejador final del DTO, conviene eliminar datos
innecesarios. Si es un manejador intermedio, conviene convertir los
tipos que usa directamente y conservar los datos que no conoce.

## Resumen

- Un DTO describe datos transferidos entre procesos o capas.
- Sus objetivos son organizar los datos y convertir tipos.
- Los DTO anidados permiten formar estructuras complejas.
- Al convertir la entrada, las propiedades conocidas se pueden recortar
  o convertir, conservando las demás cuando corresponda.
