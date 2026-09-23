---
title: "Is Service Locator Really an Anti-pattern?"
description: "A practical look at Service Locator, dependency injection, explicit contracts, and runtime context."
date: 2021-01-28
---

A Service Locator, like its evolution into a DI container, connects
application elements with their dependencies at runtime. That deserves
separate consideration from the source code which describes the
application.

Strong static typing can catch some wiring mistakes at compile time; it
cannot guarantee that a dependency is meaningful in its actual context.
Two parts may match structurally and still not belong together — like a
wardrobe door and the body of a BMW E46. Correct wiring rests on both
*interfaces* and *context*.

An interface is the part visible to a developer, compiler and IDE. This
PHP function expects a callable accepting two values and returning one:

``` php
function main($dep) {
    $res = $dep(12, 'str');
    echo $res;
}
$fn = function ($num, $str) { return $num . $str; };
main($fn);
```

Its arguments and return value make up the contract. C/C++ header files,
such as
[string.h](https://github.com/openbsd/src/blob/master/include/string.h),
are a familiar way to describe function interfaces.

For objects the idea is the same: `IDep` states which methods `Main` is
allowed to use.

``` php
interface IDep { public function get(); public function put($data); }
class Dep implements IDep { /* ... */ }
class Main {
    public function run(IDep $dep) { $dep->put(4); echo $dep->get(); }
}
```

The compiler is satisfied when an object implements `IDep`, even if it
is semantically the wrong object. Factories, builders and pools are
responsible for the other half: assembling compatible parts in the right
context.

With dependency injection, a class declares the interfaces it needs and
leaves construction and wiring to the outside environment. A DI
container can also be used as a locator:

``` php
// Constructor injection
public function __construct(IDep $dep) { $this->dep = $dep; }

// Resolve when needed
public function __construct(IContainer $di) {
    $this->dep = $di->get(IDep::class);
}
```

The second form loses information about the requesting class. Passing
that context is better:

``` php
$this->dep = $di->get(IDep::class, self::class);
```

The standard objection is that a locator hides dependencies, while
constructor injection exposes them. That concern is real: a class
coupled to `ILocator` is less portable, and readers cannot see all
dependencies in its constructor. Constructor injection also has a cost,
however: to start an application, the container may have to construct an
entire dependency tree even for services unused in the current mode.

Resolving a dependency lazily through a locator avoids that eager
construction:

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

The locator dependency remains, but the hidden dependencies can be made
explicit by convention: collect retrieval in clearly named `dep…`
methods. In practice this is close to setter or property injection; the
difference is timing — dependencies are built on first use rather than
with the base object.

My conclusion is pragmatic: injecting a DI container or Service Locator
into an object is not inherently harmful. Use it deliberately, preserve
the requester context, and keep the actual dependencies discoverable in
the code.

## Additional source-code excerpts

    {

    }
    }
    class Main
    {

    {

    }
    }

    // DI in constructor public function __construct(IDep $dep)
    {

    }// DI as ServiceLocator public function __construct(IContainer $di)
    {

    }

    {

    {

    Locator.GetService();
    var products = service.GetFeaturedProducts();
    return this.View(products);
    }
    }

    class Main
    {

    {

    }

    {

    }
    }

    class Main
    {

    {

    }

    {
    return $this->locator->get(IDep::class, self::class);
    }

    {

    }
    }
