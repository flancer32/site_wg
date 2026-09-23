---
title: "Making JavaScript Code Resilient to Change"
description: "How decomposition, stable addresses, small public APIs, and deliberate interfaces make JavaScript applications easier to evolve."
date: 2021-09-22
---

Software development faces two persistent difficulties: complexity and
changing requirements. Decomposition helps with both, but only when the
resulting parts are themselves resilient to change. This article looks
at the elements of JavaScript code, their interfaces, and the boundaries
that protect a change from spreading through an entire application.

## Elements and their interfaces

At different levels of detail, JavaScript code contains objects,
functions, classes, ES modules, and npm packages. Objects, functions and
classes are basic elements; modules and packages combine them.

- An object exposes properties.
- A function exposes input and output arguments.
- A class exposes its public properties and methods.
- An ES module exposes its export object.
- An npm package exposes its name, version, entry point and, in
  practice, the modules consumers can reach.

Bottom-up development builds packages from smaller elements; top-down
work travels the other way. In either direction, good decomposition
seeks high cohesion inside a component and low coupling between
components.

<zoom-img src="/medium/img/e9a0fe4f1e1f/image-01.png" alt="High cohesion and low coupling as a design goal" width="100%"></zoom-img>

## Addressing code

In ES2015+ applications the ES module is the primary building block. In
a browser it is loaded through a URL-like hierarchy; in Node.js it is a
file within a package in `node_modules`.

<zoom-img src="/medium/img/e9a0fe4f1e1f/image-02.png" alt="ES modules loaded into a browser" width="100%"></zoom-img>

<zoom-img src="/medium/img/e9a0fe4f1e1f/image-03.jpg" alt="ES modules in Node.js package hierarchy" width="100%"></zoom-img>

An application-level address therefore has two parts: a module path and
an export name. Examples:

``` js
import { exportName } from 'https://domain.example/path/to/mod.mjs';
import { exportName } from '../../path/to/mod.mjs';
import { exportName } from '@vendor/project/src/path/to/mod.mjs';
```

<zoom-img src="/medium/img/e9a0fe4f1e1f/image-04.png" alt="ES module, exports, and package composition" width="100%"></zoom-img>

Absolute addresses are more fragile than relative or mapped ones. Import
maps can decouple consumers from a physical resource location.
`export default` also decouples a consumer from the internal export
name, though it limits a module to one default export.

<zoom-img src="/medium/img/e9a0fe4f1e1f/image-05.png" alt="Connections between exported code elements" width="100%"></zoom-img>

## Interfaces at each level

For a function, its name, inputs, and result form the interface. A
positional signature is concise:

``` js
function producer(x1, x2) { return x1 * x2; }
```

Destructuring a single object gives a more change-tolerant public
boundary:

``` js
function producer({ x1, x2 }) {
  return { sum: x1 + x2, product: x1 * x2 };
}
const { sum, product } = producer({ x1: 1, x2: 2 });
```

Fields can be added without shifting a position. The trade-off is more
verbose code and weaker immediate readability, so this pattern is most
valuable at public or long-lived boundaries. Classes expose names,
public members, and method contracts. An ES module exposes only what it
exports.

An npm package is the largest reusable unit. Its package name, version
and `main`/`exports` entry point are part of the contract. Consumers can
technically import internal files unless the package defines export
restrictions, so public/private conventions need to be explicit.

## Public and private areas

Everything outside an element’s interface is its private implementation.
A private nested function, private class field, or non-exported module
binding can change without forcing consumers to change:

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

More useful behaviour in the private area means a smaller public surface
and fewer dependencies to maintain. Packages can declare a primary entry
point and re-export intended APIs; they can also adopt folder
conventions, such as treating `Api/` as public and other modules as
internal.

## Practical rules

- Prefer high cohesion inside a module and low coupling across modules.
- Treat names and placement of packages, modules, classes, and exports
  as stable public addresses.
- Add new properties, arguments, and methods more freely than removing
  or renaming them; renaming creates widespread refactoring.
- Use object input/output and destructuring at evolving public
  boundaries; use positional arguments freely in private helpers.
- Use local aliases for external dependencies when they reduce the
  number of places tied to an external name.
- State public/private rules in package exports and source-layout
  conventions.

The larger the component, the more important the stability of its name
and interface. Thoughtful boundaries do not prevent change; they keep a
local change local.

## Additional source-code excerpts

    import func from ‘./mod.mjs’;
    import {fn} from ‘./mod.mjs’;

    function outer() {
    const obj = {};
    function inner() {
    const obj = {};
    }
    } > Глубоко вложенные области видимости ухудшают читаемость кода, а использование элементов кода с верхних уровней снижают устойчивость кода к изменениям (за исключением случая, когда элементы кода определяются на самом верхнем уровне — через импорты в es-модуле).

    const OBJ = {prop: ‘value’}function consumer() {
    console.log(OBJ.prop);
    } ### Функции

    function producer(x1, x2) {
    return x2 * x1;
    }const y = producer(1, 2); Я как-то уже размышлял на тему, что было бы, если бы у функции был только один входной параметр и один выходной:
    const y = fn(x); JS с его деструктирующим присваиванием вплотную подошёл к этому варианту:
    function producer({x1, x2}) {
    return {y1: x1 + x2, y2: x2 * x1};
    }const {y1, y2} = producer({x1: 1, x2: 2}); > Использование функций в таком виде добавляет коду устойчивости к изменениям относительно “классического” варианта. В этом случае мы можем смелее изменять входные и выходные аргументы (их количество и порядок следования), но платим за это читабельностью кода.

    {

    “another_dep”: “~2.2.0”
    }
    } Имя npm-пакета участвует в адресации es-модулей в nodejs-приложениях. В пакете может быть определён входной объект, в его ./package.json:
    {
    “main”: “lib/entry.js”
    }

    function producer(opts) {
    function nested() {}
    }

    class SomeClass {

    const nestedObj = {};
    this.instMethod = function () {
    nestedObj.prop = this.#privProp;
    }
    } setProp(data) {
    this.#privProp = data;
    }
    } privProp и nestedObj являются внутренними элементами кода для класса SomeClass и недоступны извне напрямую.

    {
    “main”: “src/Shared/Container.mjs”
    }

    import Container from ‘@teqfw/di’;

    import subModule from ‘./path/to/sub/modle.mjs’;export {

    }

    import * as module from ‘@scope/prj’;
    const sub = module.subModule; Но это именно “джентльменское соглашение” — ничто не мешает разработчику другого npm-пакета обратиться внутрь нашего npm-пакета к любому es-модулю напрямую.

    export default class TeqFw_Web_Back_Defaults {
    constructor(spec) {
    this.MOD_DI = spec[‘TeqFw_Di_Back_Defaults$’];
    }
    }
