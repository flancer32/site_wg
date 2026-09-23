---
title: "Simular interfaces en JavaScript con anotaciones JSDoc"
description: "Cómo definir contratos claros entre el código que llama y sus implementaciones en JavaScript usando JSDoc."
date: 2024-08-07
---

JavaScript no incorpora interfaces como TypeScript. Aun así, cuando una
aplicación crece, conviene fijar una estructura y un comportamiento
comunes para sus piezas. Una interfaz expresa un contrato: los métodos
que un objeto debe ofrecer. Reduce supuestos ocultos y hace el código
más fácil de mantener. En JavaScript podemos representarlo con código
normal y las anotaciones JSDoc
[`@interface`](https://jsdoc.app/tags-interface) y
[`@implements`](https://jsdoc.app/tags-implements).

<zoom-img src="/medium/img/f4fbd41a3500/image-01.png" alt="Frank Martin anuncia las condiciones del contrato" width="100%"></zoom-img>

Las reglas de Frank Martin en la película «Transporter» lo explican
bien:

1.  no cambiar nunca el trato;
2.  sin nombres;
3.  no abrir nunca el paquete.

Quien quiera contratarlo debe aceptar esas condiciones. En la pareja
«quien realiza el trabajo — cliente», quien realiza el trabajo define
las reglas. En el código, ese papel corresponde a la interfaz.

Imaginemos tres paquetes npm: `plugin` presta una función de negocio
—repartir— y `app1`, `app2` la usan con datos distintos. El plugin
expone `drive(pack, route)`. Para entregar necesita dimensiones y peso
del paquete, origen y destino. Sus expectativas pueden escribirse así:

``` js
/** @interface */
class Package {
  getSize() { throw new Error('Implement this method.'); }
  getWeight() { throw new Error('Implement this method.'); }
}
/** @interface */
class Route {
  getPlaceFrom() { throw new Error('Implement this method.'); }
  getPlaceTo() { throw new Error('Implement this method.'); }
}
```

Se podría usar solamente JSDoc, pero los IDE modernos no siempre lo
interpretan de la misma manera. Por eso prefiero código JavaScript
corriente marcado con `@interface`: el contrato queda claro tanto para
las personas como para las herramientas.

La primera aplicación entrega un objeto con los métodos requeridos:

``` js
function app1() {
  const pack = {
    getSize: () => ({ length: 150, width: 50, height: 50 }),
    getWeight: () => 50,
  };
  const route = {
    getPlaceFrom: () => 'Marseille',
    getPlaceTo: () => 'Nice',
  };
  drive(pack, route);
}
```

La segunda utiliza datos diferentes, pero cumple el mismo contrato:

``` js
function app2() {
  const pack = {
    getSize: () => ({ length: 45, width: 30, height: 10 }),
    getWeight: () => 1,
  };
  const route = {
    getPlaceFrom: () => 'Nice',
    getPlaceTo: () => 'Grenoble',
  };
  drive(pack, route);
}
```

Los IDE ya pueden analizar este código, completar métodos y navegar
hasta sus definiciones.

<zoom-img src="/medium/img/f4fbd41a3500/image-02.png" alt="Autocompletado de la interfaz en IDEA" width="100%"></zoom-img>

En resumen:

- el código que llama define el contrato;
- la implementación debe respetarlo;
- JSDoc permite que el IDE reconozca la relación entre contrato e
  implementación.

Las interfaces ayudan a dividir un sistema complejo en componentes
manejables y a dibujar límites explícitos entre ellos. JavaScript ya
tiene las piezas necesarias: acordar la forma de los objetos, documentar
el acuerdo en el código y recordar el principio de Frank Martin: las
reglas las establece quien ejecuta el trabajo.

Hay demostraciones en
[app1](https://flancer64.github.io/demo-di-if-app1/) y
[app2](https://flancer64.github.io/demo-di-if-app2/). Ambas usan
[@teqfw/di](https://www.npmjs.com/package/@teqfw/di) para vincular
interfaces e implementaciones mediante inyección de dependencias por
constructor.
