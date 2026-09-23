---
title: "TeqFW: Wrappers for Libraries"
description: "How to expose browser libraries that are not ES modules through TeqFW namespaces and dependency injection."
date: 2021-12-03
---

Applications often use third-party libraries, especially in the browser,
that are not ES6 modules. This article explains how to connect such
libraries so that they can be used inside [TeqFW](https://teqfw.com/).

Take [tweetnacl](https://tweetnacl.js.org/) as an example. Its authors
expect the package to be loaded in the browser as one bundle:

``` html
<script type="application/javascript" src="nacl-fast.min.js"></script>
```

It then becomes available as a global browser object:

``` js
window.nacl
```

TeqFW addresses code through namespaces. Its dependency-injection
container can also replace one dependency with another, for example an
interface with its implementation. A TeqFW-compatible wrapper is
therefore needed to access global objects.

TeqFW applications are primarily PWAs. They cache all required resources
in the browser so they can work offline, including external libraries.
The application shell loads and mounts such libraries into globals in
the conventional way:

``` html
<!-- These scripts are not ESM ready for loading with ES6 'import'. -->
<script type="application/javascript" src="./src/tweetnacl/nacl-fast.min.js"></script>
```

To expose the contents of the `tweetnacl` npm package to the frontend,
add static-resource instructions for `@teqfw/web` to `./teqfw.json`:

``` json
{
  "@teqfw/web": {
    "statics": { "/tweetnacl/": "/tweetnacl/" }
  }
}
```

Files from `./node_modules/tweetnacl/…` then become available to the
frontend at `https://…/src/tweetnacl/…`. The package itself is installed
normally through `package.json`:

``` json
{ "dependencies": { "tweetnacl": "*" } }
```

Once the library is loaded in the frontend, create an ES6 module such as
`./src/Front/Lib/Nacl.mjs` to expose it through TeqFW DI:

``` js
if (window.nacl === undefined) {
  throw new Error("Add TweetNaCl to your startup HTML to use it.");
}

export const {
  box, hash, lowlevel, randomBytes, scalarMult,
  secretbox, setPRNG, sign, verify,
} = window.nacl;
```

The wrapper exports functionality from the global object in a form that
an ES6 module can consume. A dependent module can then obtain the
required functions through TeqFW DI:

``` js
class Vnd_Plugin_Mod {
  constructor(spec) {
    const {box, secretbox} = spec['Fl32_Dup_Front_Lib_Nacl'];
  }
}
```
