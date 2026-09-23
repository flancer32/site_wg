---
title: "¿Service Locator es realmente un antipatrón?"
description: "Una mirada práctica a Service Locator, la inyección de dependencias, los contratos explícitos y el contexto de ejecución."
date: 2021-01-28
---

Service Locator —al igual que su evolución hacia un contenedor de DI—
conecta elementos de una aplicación con sus dependencias durante la
ejecución. Conviene distinguir eso del código fuente que describe la
aplicación.

La tipificación estática fuerte detecta ciertos errores de enlace al
compilar, pero no garantiza que una dependencia tenga sentido en su
contexto real. Dos piezas pueden coincidir por interfaz y no por
significado: como una puerta de armario en la carrocería de un BMW E46.
Un enlace correcto necesita tanto *interfaces* como *contexto*.

La interfaz es la parte que ven la persona programadora, el compilador y
el IDE. Esta función PHP espera un callable que reciba dos valores y
devuelva uno:

``` php
function main($dep) {
    $res = $dep(12, 'str');
    echo $res;
}
$fn = function ($num, $str) { return $num . $str; };
main($fn);
```

Los argumentos y el resultado forman el contrato. Los archivos de
cabecera C/C++, como
[string.h](https://github.com/openbsd/src/blob/master/include/string.h),
son un ejemplo conocido de descripción de interfaces.

Con objetos la idea no cambia: `IDep` define qué métodos puede usar
`Main`.

``` php
interface IDep {
    public function get();
    public function put($data);
}

class Dep implements IDep {
    private $data;

    public function get() { return $this->data; }
    public function put($data) { $this->data = $data; }
}

class Main {
    public function run(IDep $dep) {
        $dep->put(4);
        echo $dep->get();
    }
}

$app = new Main();
$dep = new Dep();
$app->run($dep);
```

El compilador queda satisfecho cuando un objeto implementa `IDep`,
aunque sea semánticamente inadecuado. Las fábricas, builders y pools
aportan la otra mitad: ensamblar partes compatibles en el contexto
adecuado.

Con inyección de dependencias, una clase declara las interfaces que
necesita y deja la construcción y el cableado al entorno. Un contenedor
de DI también puede actuar como localizador:

``` php
// Inyección en el constructor
public function __construct(IDep $dep) { $this->dep = $dep; }
```

Como alternativa:

``` php
// Resolver al necesitarla
public function __construct(IContainer $di) {
    $this->dep = $di->get(IDep::class);
}
```

La segunda forma pierde información sobre qué clase pide la dependencia.
Es mejor conservar ese contexto:

``` php
$this->dep = $di->get(IDep::class, self::class);
```

La objeción habitual es que el localizador oculta dependencias y la
inyección por constructor las muestra. Es una preocupación legítima: una
clase acoplada a `ILocator` se reutiliza peor y sus dependencias no son
visibles de inmediato. Pero la inyección por constructor también puede
obligar al contenedor a construir un árbol completo, aunque algunos
servicios no se usen en ese modo de ejecución.

Resolver de forma perezosa evita esa construcción anticipada:

``` php
class Main {
    private $locator;
    public function __construct(ILocator $locator) { $this->locator = $locator; }
    private function depIDep() {
        return $this->locator->get(IDep::class, self::class);
    }
    public function run() { $dep = $this->depIDep(); }
}
```

La dependencia del localizador sigue existiendo, pero se puede hacer
visible por convención: concentrar las recuperaciones en métodos
claramente llamados `dep…`. En la práctica se parece a la inyección por
setter o propiedad; cambia el momento: la dependencia se crea cuando se
usa, no cuando se crea el objeto base.

Mi conclusión es pragmática: inyectar un contenedor DI o Service Locator
no es malo por sí mismo. Hay que usarlo con intención, conservar el
contexto de quien solicita el servicio y mantener las dependencias
reales fáciles de encontrar en el código.
