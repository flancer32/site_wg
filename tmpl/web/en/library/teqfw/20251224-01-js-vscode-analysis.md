---
title: "JavaScript in VSCode: language, tool, and analysis model"
date: 2025-12-24
---

For a long time I worked in IDEs from the JetBrains family, primarily
PhpStorm. For JavaScript code I actively used JSDoc and treated it as a
full language for describing contracts: types, signatures, navigation,
and autocompletion. All of that worked predictably and consistently.

Therefore the move to VSCode turned out to be unexpectedly painful. The
most popular IDE for web development showed less predictable JavaScript
analysis than an IDE historically focused on PHP. That feeling did not
fade over time and required an engineering explanation.

The key thesis is simple: JavaScript in VSCode is analyzed as a
projection of the TypeScript model through `tsserver`. This publication
is an attempt to capture the observed behavior of VSCode when working
with JavaScript, to understand the architectural decisions behind it,
and why the problem is broader than "poor JSDoc support".

## Why JavaScript in VSCode feels "not its own"

Today VSCode is the de facto [standard for web
development](https://survey.stackoverflow.co/2025/technology#1-dev-id-es).
It is used regardless of language, framework, or project architecture.
This is confirmed by industry surveys and by team practice: VSCode is
installed by default.

Hence the perception: its behavioral traits become the norm of the
ecosystem rather than a special case.

When working with JavaScript in VSCode, a characteristic sense of the
language being secondary appears quickly. In JavaScript files, warnings
and messages are phrased in TypeScript terms. Code analysis becomes
fragmented: some constructs are understood, others are not, especially
in library and infrastructure code.

For a developer accustomed to JSDoc-oriented analysis, this looks like a
mismatch of expectations: the IDE seems to "expect" TypeScript even
where the project deliberately stays on JavaScript.

## How VSCode analyzes JavaScript

The first noticeable shift in VSCode behavior appears after adding the
[jsconfig.json
file](https://code.visualstudio.com/docs/languages/jsconfig). Without
it, JavaScript code is analyzed fragmentarily. With it, the IDE starts
to perceive the project as a coherent structure: links between files,
navigation, and type hints appear.

At the same time, changing IDE behavior requires only minimal
configuration. In its simplest form, `jsconfig.json` can look like this:

``` json
{
  "compilerOptions": {
    "checkJs": true
  }
}
```

`jsconfig.json` does not participate in code execution and is not part
of the JavaScript standard. Its purpose is limited to describing project
boundaries and analysis options for the language server in use.

It is important to record a simple fact: VSCode itself does not analyze
JavaScript. All hints, errors, and navigation come from a [separate
process](https://github.com/typescript-language-server/typescript-language-server) -
`tsserver`, which is part of TypeScript; VSCode acts as a client in this
scheme.

The connection between the editor and the analyzer is established via
the [Language Server
Protocol](https://microsoft.github.io/language-server-protocol/). VSCode
sends file contents and receives analysis results. This architecture
makes the editor universal but transfers all limitations to the chosen
language server.

Unlike IDEs from the JetBrains family, where analyzers are built in and
deeply integrated, VSCode aggregates external language services. This
explains its flexibility and scalability, but it also explains why
analysis behavior is completely defined by the chosen server.

Architecturally, VSCode allows alternative language servers, but in
practice for JavaScript only `tsserver` is used; there are no
JavaScript-first or JSDoc-first alternatives in the ecosystem.

`tsserver` builds a project model based on static imports within the
boundaries defined by `jsconfig.json`. Everything resolved dynamically
or determined at runtime does not enter that model. I feel this well in
my own projects: my architecture uses late binding and dependency
injection through the constructor, implemented in the
[@teqfw/di](https://github.com/teqfw/di) library. Static imports are
minimal - essentially only for loading the DI library itself - while
further module wiring happens through dynamic imports and stays outside
`tsserver` analysis.

## TypeScript as the analysis model for JavaScript

The behavior of VSCode in JavaScript files largely matches its behavior
in TypeScript. This is reflected in identical warnings, navigation
rules, and principles for building hints. Such similarity is expected:
JavaScript in VSCode is analyzed through the same type model that
underlies TypeScript.

First of all, constructs that are easy and unambiguous to reduce to the
TypeScript model are analyzed confidently. These include classes and
functions with explicit signatures, object literals with fixed
structure, and dependencies expressed through static imports. In such
cases, the analyzer can build a stable code model, provide navigation,
and surface type information without additional annotations.

``` js
// example-good.js

export class UserService {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  getUser(id) {
    return this.apiClient.fetch(`/users/${id}`);
  }
}

export function createService(apiClient) {
  return new UserService(apiClient);
}
```

In this example, the code form fits the TypeScript model well: exported
entities are visible, the class structure is clear, method signatures
are present, and return values are explicit. In VSCode this translates
into stable symbol navigation, type hints for parameters, and correct
autocomplete when using the API.

A different situation arises where JavaScript starts using its dynamic
capabilities. Late binding, factories, computed dependencies, and
behavioral contracts have no direct representation in the TypeScript
type model. In such cases analysis either relies on heuristics or stops
at the syntactic form without reaching the actual interaction structure.

``` js
// example-dynamic.js

export function createContainer(loader) {
  return {
    get(name) {
      const Module = loader(name);
      return new Module();
    },
  };
}

// usage
const container = createContainer(loadModule);
const service = container.get("userService");
```

Here a significant part of the architecture is formed at runtime:
specific dependencies, their types, and relationships are determined
dynamically. For the analyzer this remains opaque because such
constructs do not reduce to a static type model. As a result VSCode sees
only the shape of objects and calls: type hints become generic, and
navigation across actual contracts between parts of the system is
limited.

Taken together, this leads to the absence of a separate "pure
JavaScript" analysis mode in VSCode. There is a single model based on
TypeScript, and JavaScript code is analyzed only to the extent that it
can be reduced to that model. Everything outside it is either partially
visible or fully excluded from analysis.

## Contracts as the basis for understanding code

In VSCode, JavaScript analysis relies on a library's public contract.
For `tsserver`, declarative API descriptions define the boundary between
a module and its usage, determining what information enters the analysis
model of the consuming project. The dependency source code is used
mainly for navigation and does not participate in building the type
model.

That contract is provided by `.d.ts` declaration files. They describe
exported entities and their signatures, and this is the form in which
library information is plugged into analysis. The presence of an
implementation in `node_modules`, including JavaScript code with JSDoc
annotations, does not affect the type model of an external project.

The public contract is connected through `package.json`. For the
analyzer it matters which file is declared as the entry point for the
package's type information.

``` json
{
  "name": "@teqfw/di",
  "version": "x.y.z",
  "main": "src/index.js",
  "types": "types.d.ts"
}
```

The `types` field tells `tsserver` which file to use as the public
contract of the library. Type information outside that file remains part
of the internal implementation and is not considered when analyzing an
external project.

Inside the declarations there are typically two levels of type
descriptions. The first level is used when developing the library and
reflects its internal structure: helper types, implementation details,
and service conventions. These types stay local to the module and are
used within the project.

``` ts
// src/Api/Container/types.d.ts

export interface ParserContext {
  readonly source: string;
  readonly options?: Record<string, unknown>;
}

export interface ParserResult {
  readonly ast: object;
  readonly errors: readonly Error[];
}
```

The second level forms the external contract of the library - the set of
types and signatures that are available to consumers and used by
`tsserver` when analyzing a third-party project.

``` ts
// index.d.ts

declare global {
  type TeqFw_Di_Api_Container_Parser = import("./src/Api/Container/Parser.js").default;
}

export {};
```

This separation corresponds to the `tsserver` analysis model, which
distinguishes between types used for internal package development and
types that define its external contract. The consuming project works
only with the types explicitly included in the public layer, regardless
of the availability of the library's source code.

JSDoc in this scheme is used within the same type model. In
TypeScript-oriented analysis, only annotations that unambiguously map to
the type projection are considered. They help improve navigation and
autocompletion when developing the library itself, but they do not
expand the public contract for external analysis.

As a result, understanding code in VSCode is formed around explicitly
described contracts. This makes `.d.ts` files the key element of type
analysis for JavaScript projects and defines the role of JSDoc as an
auxiliary documentation tool within the chosen `tsserver` model.

## Conclusion

The behavior of JavaScript in VSCode is defined by the architecture and
product logic of the ecosystem in which the editor evolves. VSCode and
TypeScript are designed and developed as connected tools, so JavaScript
analysis is built into the TypeScript toolchain and relies on its type
model, interpretation rules, and development priorities.

For such an ecosystem, the bet on TypeScript looks natural. A single
formal analysis model, a single language server, and a coordinated
toolchain provide predictable IDE behavior, stable DX, and scalability
across the platform. In this configuration JavaScript is treated as code
that can be analyzed through the TypeScript model to varying degrees,
depending on how well its structure and annotations fit that model.

JSDoc support in VSCode follows the same logic. Annotations are used as
a source of type information if they map unambiguously to the TypeScript
model. Semantic, descriptive, and behavioral aspects of JSDoc stay
outside the analysis because they are not included in the formal type
projection used by `tsserver`. This situation is a consequence of the
chosen analysis model, not of the quality or expressiveness of JSDoc.

The development of a full ES6 + JSDoc pairing as an independent basis
for JavaScript analysis is not among Microsoft's strategic priorities.
Maintaining a single analysis model around TypeScript simplifies the
evolution of tools and reduces ecosystem fragmentation. As a result,
JSDoc remains an auxiliary mechanism that complements the TypeScript
model but does not create a separate direction of development.

In the end, JavaScript in VSCode is perceived and analyzed through the
lens of the TypeScript toolchain. This sets clear boundaries of what is
possible and explains the observed behavior of the IDE. Understanding
these boundaries makes it possible to work with the tool more
deliberately, based on its real architectural assumptions and ecosystem
logic.
