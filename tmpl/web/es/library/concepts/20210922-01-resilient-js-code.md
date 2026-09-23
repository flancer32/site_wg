---
title: "Código JavaScript resistente al cambio"
description: "Cómo la descomposición, direcciones estables, API públicas pequeñas e interfaces deliberadas hacen que una aplicación JavaScript evolucione mejor."
date: 2021-09-22
---

El desarrollo de software enfrenta dos dificultades persistentes:
complejidad y requisitos cambiantes. La descomposición ayuda con ambas,
pero solo si las partes resultantes resisten el cambio. Este artículo
repasa los elementos del código JavaScript, sus interfaces y las
fronteras que impiden que un cambio se propague por toda la aplicación.

## Elementos e interfaces

En distintos niveles de detalle, JavaScript contiene objetos, funciones,
clases, módulos ES y paquetes npm. Objetos, funciones y clases son
elementos básicos; módulos y paquetes los combinan.

- Un objeto expone propiedades.
- Una función expone argumentos de entrada y salida.
- Una clase expone propiedades y métodos públicos.
- Un módulo ES expone su objeto de exportaciones.
- Un paquete npm expone nombre, versión, punto de entrada y, en la
  práctica, módulos que el consumidor puede alcanzar.

El desarrollo bottom-up crea paquetes a partir de piezas pequeñas; el
top-down recorre el camino inverso. En ambos casos, una buena
descomposición busca alta cohesión dentro del componente y bajo
acoplamiento entre componentes.

<zoom-img src="/medium/img/e9a0fe4f1e1f/image-01.png" alt="Alta cohesión y bajo acoplamiento" width="100%"></zoom-img>

## Direccionar código

En aplicaciones ES2015+, el módulo ES es el bloque principal. En
navegador se carga mediante una jerarquía de URL; en Node.js es un
archivo dentro de un paquete de `node_modules`.

<zoom-img src="/medium/img/e9a0fe4f1e1f/image-02.png" alt="Módulos ES cargados en navegador" width="100%"></zoom-img>

<zoom-img src="/medium/img/e9a0fe4f1e1f/image-03.jpg" alt="Jerarquía de paquetes y módulos en Node.js" width="100%"></zoom-img>

La dirección a nivel de aplicación tiene dos partes: ruta del módulo y
nombre de exportación. Estas son tres alternativas de importación:

``` js
import { exportName } from 'https://domain.example/path/to/mod.mjs';
```

``` js
import { exportName } from '../../path/to/mod.mjs';
```

``` js
import { exportName } from '@vendor/project/src/path/to/mod.mjs';
```

<zoom-img src="/medium/img/e9a0fe4f1e1f/image-04.png" alt="Módulo ES, exportaciones y composición de paquete" width="100%"></zoom-img>

Las direcciones absolutas son más frágiles que las relativas o mapeadas.
Los import maps desacoplan al consumidor de la ubicación física.
`export default` también desacopla al consumidor del nombre interno de
exportación, aunque limita el módulo a un único export por defecto.

<zoom-img src="/medium/img/e9a0fe4f1e1f/image-05.png" alt="Conexiones entre elementos exportados" width="100%"></zoom-img>

## Interfaces en cada nivel

Para una función, nombre, entradas y resultado constituyen la interfaz.
Una firma posicional es concisa:

``` js
function producer(x1, x2) { return x1 * x2; }
```

Desestructurar un único objeto da una frontera pública más tolerante al
cambio:

``` js
function producer({ x1, x2 }) {
  return { sum: x1 + x2, product: x1 * x2 };
}
const { sum, product } = producer({ x1: 1, x2: 2 });
```

Se pueden añadir campos sin desplazar posiciones. A cambio hay más
código y menos legibilidad inmediata, así que el patrón es especialmente
valioso en fronteras públicas o duraderas. Las clases exponen nombres,
miembros públicos y contratos de método. Un módulo ES expone solo lo que
exporta.

Un paquete npm es la unidad reutilizable mayor. Nombre, versión y punto
de entrada `main`/`exports` forman parte del contrato. Sin restricciones
de exportación, un consumidor puede importar archivos internos; por eso
las convenciones público/privado deben estar claras.

## Áreas públicas y privadas

Todo lo que queda fuera de la interfaz es implementación privada. Una
función anidada, un campo privado de clase o una vinculación no
exportada puede cambiar sin obligar a cambiar a consumidores:

``` js
class SomeClass {
  #privateValue;
  constructor() {
    const internal = {};
    this.useInternal = () => { internal.value = this.#privateValue; };
  }
  setValue(value) { this.#privateValue = value; }
}
```

Cuanto más comportamiento útil se mantenga privado, menor será la
superficie pública y menos dependencias habrá que mantener. Un paquete
puede declarar entrada principal y reexportar API prevista; también
puede adoptar convenciones de carpetas, por ejemplo `Api/` pública y
demás módulos internos.

## Reglas prácticas

- Priorice cohesión alta dentro de un módulo y acoplamiento bajo entre
  módulos.
- Trate nombres y ubicación de paquetes, módulos, clases y exports como
  direcciones públicas estables.
- Añada propiedades, argumentos y métodos con más libertad que
  eliminarlos o renombrarlos; renombrar exige refactor amplio.
- Use entradas/salidas de objeto y desestructuración en fronteras
  públicas que evolucionan; use argumentos posicionales sin problema en
  helpers privados.
- Use alias locales para dependencias externas si reducen los lugares
  atados a un nombre externo.
- Declare reglas público/privado en exports del paquete y convenciones
  de estructura.

Cuanto mayor es el componente, más importa la estabilidad de nombre e
interfaz. Las buenas fronteras no evitan el cambio: mantienen local un
cambio local.
