---
title: "Demystifying Dependency Injection: A Simple Object Container for modern JS"
description: "In my [previous post](https://flancer32.com/ioc-in-vanilla-javascript-es6-1b2e701f331d), I described a straightforward example to illustrate the concept of Inversion of Control in"
date: 2023-07-31
---

In my [previous
post](https://flancer32.com/ioc-in-vanilla-javascript-es6-1b2e701f331d),
I described a straightforward example to illustrate the concept of
Inversion of Control in JavaScript code. By avoiding static imports and,
instead, adding dependencies through a factory function or constructor,
code coupling is reduced, leading to improved code maintenance and
refactoring in large projects. Code composed of such “bricks” (ES6
modules) can be employed in more complex “buildings” (applications)
because [the code’s dependencies on specific details (static imports)
are substituted with dependencies on abstractions (dependency
identifiers)](https://en.wikipedia.org/wiki/Dependency_inversion_principle).

**IMPORTANT**: All of this applies to regular JavaScript, not
TypeScript. TypeScript utilizes transpilation to convert into
JavaScript, so dependency injection is commonly performed in a different
manner (via annotations). The
[examples](https://github.com/teqfw/di/tree/20230804_demo_reddit/demo/basic)
in this post do not involve transpilation.

Here, I will show you step by step how to build your object container
that can download the source code of ES6 modules, create necessary
dependencies, and insert them in the correct locations. I must
immediately warn you that, in order to simplify the presentation in the
demo code, certain assumptions related to the object generation will be
made. The purpose of this article is to demonstrate the actual
technology of dependency injection, rather than providing a ready-made
“one-size-fits-all” solution. As a result, you should gain an
understanding of how to create your object container in modern JS if you
ever find the need for it (the final object container in the demo
contains about 35 lines of code).

I have divided the entire post into 6 parts to gradually enhance the
functionality of the demo code, leading to the creation of an actual
object container:

- The Composition Root
- The Factory
- The Specification of Dependencies
- The Spec Parser
- The Object Container
- The Resolver

## 1. The Composition Root

With direct control, the service imports a concrete logger:

``` js
import logger from './logger.js';
export default class Service {
  exec(opts) { logger.info(JSON.stringify(opts)); }
}
```

With inversion of control, it receives that dependency:

``` js
export default class Service {
  constructor(logger) {
    this.exec = (opts) => logger.info(JSON.stringify(opts));
  }
}
```

Somewhere the modules still have to be imported and assembled. That
place is the Composition Root:

``` js
import logger from './logger.js';
import Service from './service.js';
const service = new Service(logger);
service.exec({name: 'Composition Root'});
```

## 2. The Factory

To simplify the example, each module can export an asynchronous factory
that receives dependencies and returns a service:

``` js
export default async function Factory(logger) {
  return (opts) => logger.info(JSON.stringify(opts));
}
```

The composition root then calls those factories:

``` js
import fLogger from './logger.js';
import fService from './service.js';
const logger = await fLogger();
const service = await fService(logger);
service({name: 'The Factory'});
```

A real module may instead export a class, function, or object. The
factory convention only makes the next steps easier to demonstrate.

## 3. The Specification of Dependencies

Minification may rename positional parameters. Passing one object lets
us name each dependency explicitly:

``` js
function Factory({logger, config}) { /* ... */ }
```

A key can even be a module path:

``` js
export default async function Factory({['./logger.js']: logger}) {
  return (opts) => logger.info(JSON.stringify(opts));
}
```

For now, the composition root supplies that key:

``` js
const service = await fService({['./logger.js']: logger});
service({name: 'The Spec'});
```

## 4. The Spec Parser

The teaching example converts a factory to a string and extracts its
parameter keys. This simplified parser illustrates the mechanism; a
production container should use reliable, explicit dependency metadata.

``` js
function parse(definition) {
  const params = /function\s+\w+\s*\(\s*\{([^}]*)\}/s.exec(definition)?.[1];
  if (!params) return [];
  return params.split(',').map((dependency) =>
    dependency.split(':')[0].trim().replace(/[\[\]'"]/g, '')
  );
}
const paths = parse(factory.toString());
```

## 5. The Object Container

The container imports modules recursively, resolves their dependencies,
and caches the result:

``` js
const cache = {};
async function get(key) {
  if (cache[key]) return cache[key];
  const {default: factory} = await import(key);
  const spec = {};
  for (const path of parse(factory.toString())) spec[path] = await get(path);
  return (cache[key] = await factory(spec));
}
export default {get};
```

The composition root can now request the service through the container:

``` js
import container from './container.js';
const service = await container.get('./service.js');
service({name: 'The Object Container'});
```

## 6. The Resolver

Module paths in dependency specifications still tie code to details. We
can declare abstractions instead:

``` js
export default async function Factory({logger, config}) {
  return (opts) => logger.info(`${config.appName}: ${JSON.stringify(opts)}`);
}
```

A map in the composition root connects those abstractions to modules:

``` js
container.setMap({
  service: './service.js',
  logger: './logger.js',
  config: './config.js',
});
const service = await container.get('service');
```

We no longer use early binding (static binding) based on the details in
the code. Instead, we use abstractions in the specification (`logger`,
`config`) and can determine at runtime which details (`./log/console.js`
or `./log/file.js`) correspond to which abstraction (late binding). This
approach turns our code from a “welded structure” into a “bolted
structure”. We can unscrew a few bolts, detach a part of the structure,
and use it in another project.

If it seems to you that mapping for all the abstractions of a project is
very time consuming, then you are right. Nobody does that, especially in
big projects. Instead, the naming conventions used in the project are
worked out, and the path to the sources is restored by the dependency
identifier:

- <span class="citation"
  cites="vendor/package/src/Mod">@vendor/package/src/Mod</span>
- com.vendor.package.Mod
- /Vendor/Package/Mod
- Vendor_Package_Mod

All of these identifiers, when applying the appropriate conversion
rules, can point to the same ES6 module:

./node_modules/<span class="citation"
cites="vendor/package/src/Mod.js">@vendor/package/src/Mod.js</span> In
PHP, there has been an `autoload` function for a very long time, which
allows you to set the path to the source file by the name of the class
being loaded.

Moreover, since this is late binding, additional runtime-related data
can be added to the identifier. For example, the lifetime (singleton or
transient):

/Vendor/Package/Mod:singleton You can even use URL-like style to address
dependencies:

<span class="citation"
cites="vendor/package/path/module#export?singleton&amp;scope">@vendor/package/path/module#export?singleton&scope</span>=request&adapter=sock2
It all depends on the application’s requirements and the developers’
imagination.

## Conclusion

Dependency inversion can greatly reduce code coupling and can be useful
in applications with a large number of files and packages. Due to the
nature of JavaScript, these are basically Node.js applications. At the
front end, bundlers/packers are traditionally used, which create
separate bundles in which code from different packages is assembled.
Therefore, this technique is not well-suited for traditional web
applications.

However, it can be used in PWAs (Progressive Web Apps) because it allows
you to download sets of files with source codes through the Service
Worker and store them in the browser cache. In this case, this approach
allows you to create ES6 modules that will work the same way both on the
back end and on the front end.

If you want to try using dependency injection in your project and have a
questions, please [contact
me](https://www.linkedin.com/in/alex-gusev-011ba928/), I will try to
answer your questions.

If you enjoyed this article, please give it a clap and follow me for
more content!

Stay connected:

- [GitHub](https://github.com/flancer64)
- [LinkedIn](https://www.linkedin.com/in/aleksandrs-gusevs-011ba928/)
- [Upwork](https://www.upwork.com/freelancers/~0181de0a64c6981497)

Thank you for your support!
