---
title: "Why Dependency Injection Matters in JavaScript"
date: 2026-07-21
---

<zoom-img
                src="/img/library/concepts/20260721-why-dependency-injection-matters-in-javascript/kdpv.webp"
                alt="Dependency injection in JavaScript"
                width="100%"
        ></zoom-img>

Every now and then, I come across claims that dependency injection does
not make much sense in JavaScript.

The argument usually goes like this: JavaScript is dynamic, objects can
be modified at runtime, and DI is an object-oriented technique imported
from the Java world.

> What problem does dependency injection solve if you can replace almost
> anything at runtime anyway?

For example, the following browser code can be pasted directly into the
console. It modifies `console.log()` so that every message is also sent
to a server:

``` js
const originalLog = console.log.bind(console);

console.log = (...args) => {
  navigator.sendBeacon("/api/log", JSON.stringify(args));
  originalLog(...args);
};
```

There is no container, no declared interface, and no special
architectural machinery. We simply replaced a method on an object.

My answer is that dependency injection helps keep the cost of verifying
a complex application under control.

It separates a component from the choice of its concrete environment.
This allows us to verify the component against explicit expectations
without constructing the entire graph of real dependencies every time.

DI alone does not guarantee independent verification. That also requires
sufficiently complete contracts and separate tests for consumers and
implementations. Dependency injection provides the boundary that makes
this separation possible.

We can derive this conclusion from a few lines of ordinary JavaScript,
without classes, inheritance, decorators, or a DI container.

## Code Without External Dependencies

Let us begin with a pure function:

``` js
export function normalizeName(name) {
  return name.trim().toLowerCase();
}
```

The function depends only on its input, so it can be tested directly:

``` js
import assert from "node:assert/strict";
import { normalizeName } from "./normalizeName.mjs";

assert.equal(normalizeName(" Alex "), "alex");
assert.equal(normalizeName("BOB"), "bob");
```

Everything required for execution is already present in the function
arguments. There is no external environment to replace, so dependency
injection would add nothing useful here.

## A Dependency on the Outside World

Now let us add a storage module:

``` js
// storage.mjs
const values = [];

export async function save(value) {
  values.push(value);
}

export async function loadAll() {
  return [...values];
}
```

The `saveName()` function normalizes a name and stores the result:

``` js
// saveName.mjs
import { save } from "./storage.mjs";

export async function saveName(name) {
  const value = name.trim().toLowerCase();
  await save(value);
  return value;
}
```

The normalization can be checked independently:

``` js
assert.equal(await saveName(" Alex "), "alex");
```

The storage module can also be checked independently:

``` js
await save("alex");

assert.deepEqual(await loadAll(), ["alex"]);
```

But these two tests do not verify the connection between the components.

It is easy to introduce the following error:

``` js
export async function saveName(name) {
  const value = name.trim().toLowerCase();
  await save(name);
  return value;
}
```

The normalization still works. The storage module still stores whatever
value it receives. Yet the components behave incorrectly when used
together: `" Alex "` is stored instead of `"alex"`.

To detect the problem, we have to test them as a connected unit:

``` js
await saveName(" Alex ");

assert.deepEqual(await loadAll(), ["alex"]);
```

At this point, the unit being verified is no longer just `saveName()`.
It is the combination of `saveName()` and this particular `storage.mjs`.

If the storage module itself depends on the file system, configuration,
and logging, then a test of the higher-level component begins to
construct the entire transitive dependency graph.

Imagine a component that depends on three modules, each of which depends
on three more:

``` text
1 + 3 + 9 = 13 modules
```

This is not yet multiplicative growth in the number of configurations.
What grows first is the size of the unit under test. A local component
test gradually becomes an integration test of the connected graph.

A second problem appears later, once dependencies acquire alternative
implementations. At that point, the number of possible assemblies begins
to grow as a product.

## Where the Interface Comes From

Consider this expression:

``` js
await storage.save(value);
```

An interface is already present here.

The component expects the external object to provide a `save()` method.
It expects that method to accept a value, and it expects the result to
be awaitable.

JavaScript does not require this interface to be declared. But the
absence of a declaration does not mean that the expectations between the
components do not exist.

From the consumer's perspective, the interface is defined at the point
of use. An object may expose dozens of methods, while a particular
consumer needs only one or two. Those requirements form the interface of
that specific relationship.

> An interface describes a consumer's expectations at the boundary with
> a dependency.

This is also why duck typing should not be understood as a complete
classification of an object.

Different consumers may care about different aspects of the same duck.
An ornithologist may care about identifying characteristics. A farmer
may care about feeding and egg production. The object is the same, but
the interfaces differ because the consumers have different expectations.

The expression `storage.save(value)` defines the structural part of the
interface: the method name, its arguments, and the way it is called.

A useful contract must also include semantics.

What does “save” mean? When is the operation considered complete? Must
the stored value later be returned by `loadAll()`? Which errors are
allowed?

Structure can be described with types and annotations. Behavioral
meaning must be documented and verified with tests.

## Injecting the Dependency

To make `saveName()` an independent unit again, we can remove its
knowledge of the concrete `storage.mjs`.

The dependency does not disappear. The function still has to store the
normalized name. Only the way the components are connected changes.

``` js
// saveName.mjs
export function createSaveName({ storage }) {
  return async function saveName(name) {
    const value = name.trim().toLowerCase();
    await storage.save(value);
    return value;
  };
}
```

The module no longer imports a concrete storage implementation. It only
states an expectation: when the function is created, it must receive an
object with a `save()` method.

The real application connects the components elsewhere:

``` js
// bootstrap.mjs
import * as storage from "./storage.mjs";
import { createSaveName } from "./saveName.mjs";

const saveName = createSaveName({ storage });

await saveName(" Alex ");
```

This is the application's Composition Root: the place where independent
components are assembled into a working system.

The concrete storage implementation is selected here rather than inside
`saveName.mjs`.

A test can assemble the same component with a minimal test
implementation:

``` js
import assert from "node:assert/strict";
import { createSaveName } from "./saveName.mjs";

const saved = [];

const storage = {
  async save(value) {
    saved.push(value);
  },
};

const saveName = createSaveName({ storage });

assert.equal(await saveName(" Alex "), "alex");
assert.deepEqual(saved, ["alex"]);
```

This test verifies only the behavior of `saveName()`:

``` text
the name is normalized;
the normalized value is passed to storage.save();
the correct result is returned.
```

The real storage implementation and its dependencies are not needed. The
test assembles the smallest environment required to exercise the
component.

A statically imported dependency can also be replaced in a test.
However, the test runner must then intercept module loading, transform
the source code, or provide a dedicated mocking API.

With explicit dependency injection, no intervention in the module system
is required. The test supplies the desired implementation as a regular
function argument.

> A static `import` fixes a concrete connection inside the component. DI
> moves the choice of implementation to the composition point.

Dependency injection does not create a fundamentally new testing
capability. It makes independent verification a normal property of the
architecture rather than a special trick performed by the testing
infrastructure.

## Interfaces in JavaScript

ECMAScript has no active `interface` syntax. However, the effective
language of a project is usually broader than the syntax understood by
the JavaScript engine.

It may include conventions, documentation, static analysis, tests, CI
rules, and structural requirements.

For this example, we can define the project language as:

> JavaScript + JSDoc + conventions for interfaces and their
> implementations.

We can describe the storage interface as a structural type:

``` js
// NameStorage.mjs

/**
 * Storage for string values.
 *
 * @typedef {object} NameStorage
 * @property {(value: string) => Promise<void>} save
 *   Stores a value.
 * @property {() => Promise<string[]>} loadAll
 *   Returns the stored values.
 */

export {};
```

The previously implicit expectations now have a name and a structural
description.

Because the example does not use classes, implementations can be
expressed as object factories:

``` js
// MemoryStorage.mjs

/** @import {NameStorage} from "./NameStorage.mjs" */

/**
 * @returns {NameStorage}
 */
export function createMemoryStorage() {
  const values = [];

  return {
    async save(value) {
      values.push(value);
    },

    async loadAll() {
      return [...values];
    },
  };
}
```

A file-based implementation may look like this:

``` js
// FileStorage.mjs
import { appendFile, readFile } from "node:fs/promises";

/** @import {NameStorage} from "./NameStorage.mjs" */

/**
 * @param {string} path
 * @returns {NameStorage}
 */
export function createFileStorage(path) {
  return {
    async save(value) {
      await appendFile(path, `${value}\n`);
    },

    async loadAll() {
      const content = await readFile(path, "utf8");
      return content.split("\n").filter(Boolean);
    },
  };
}
```

For a database implementation, we can describe the narrower database
contract that this component needs:

``` js
// DatabaseStorage.mjs

/** @import {NameStorage} from "./NameStorage.mjs" */

/**
 * @typedef {object} NameRow
 * @property {string} value
 */

/**
 * @typedef {object} Database
 * @property {(sql: string, params?: unknown[]) => Promise<void>} execute
 * @property {(sql: string, params?: unknown[]) => Promise<NameRow[]>} select
 */

/**
 * @param {Database} database
 * @returns {NameStorage}
 */
export function createDatabaseStorage(database) {
  return {
    async save(value) {
      await database.execute("INSERT INTO names (value) VALUES (?)", [value]);
    },

    async loadAll() {
      const rows = await database.select("SELECT value FROM names ORDER BY id");

      return rows.map((row) => row.value);
    },
  };
}
```

The dependency of `saveName()` can also be declared explicitly:

``` js
// saveName.mjs

/** @import {NameStorage} from "./NameStorage.mjs" */

/**
 * @param {{storage: NameStorage}} dependencies
 * @returns {(name: string) => Promise<string>}
 */
export function createSaveName({ storage }) {
  return async function saveName(name) {
    const value = name.trim().toLowerCase();
    await storage.save(value);
    return value;
  };
}
```

To the JavaScript engine, all three storage implementations are still
ordinary objects. In the language of the project, however, they are
implementations of the same contract.

``` js
const memoryStorage = createMemoryStorage();
const fileStorage = createFileStorage("./names.txt");
const databaseStorage = createDatabaseStorage(database);

const saveToMemory = createSaveName({
  storage: memoryStorage,
});

const saveToFile = createSaveName({
  storage: fileStorage,
});

const saveToDatabase = createSaveName({
  storage: databaseStorage,
});
```

JSDoc annotations alone do not enforce anything. For
`JavaScript + JSDoc` to function as a real project language, its
conventions must be checked.

A project may require injected dependencies to have declared interfaces,
factory return values to be typed, hidden external dependencies to be
prohibited, and static analysis and contract tests to run in CI.

For example, JSDoc types can be checked with the TypeScript analyzer:

``` text
tsc --allowJs --checkJs --noEmit
```

JSDoc does not create the interfaces. Those interfaces already exist at
component boundaries. The annotations move them from the developer's
head into the explicit language of the project, where they become
available to people, IDEs, analyzers, and coding agents.

## Verifying the Contract

Structural compatibility does not guarantee behavioral compatibility.

An object may provide both `save()` and `loadAll()` while implementing
them incorrectly:

``` js
const brokenStorage = {
  async save(value) {
    // Stores nothing.
  },

  async loadAll() {
    return [];
  },
};
```

The shape is correct. The behavior is not.

Implementations therefore need a shared contract test:

``` js
import assert from "node:assert/strict";

/** @import {NameStorage} from "./NameStorage.mjs" */

/**
 * @param {() => NameStorage | Promise<NameStorage>} createStorage
 */
export async function verifyNameStorage(createStorage) {
  const storage = await createStorage();

  await storage.save("alex");

  assert.deepEqual(await storage.loadAll(), ["alex"]);
}
```

The same checks can be applied to each implementation:

``` js
await verifyNameStorage(createMemoryStorage);

await verifyNameStorage(() => createFileStorage("./temporary-test-file.txt"));

await verifyNameStorage(() => createDatabaseStorage(testDatabase));
```

In a real test suite, the file implementation should receive a fresh
temporary file, while the database implementation should use an isolated
schema or transaction. Otherwise, state from one test run may leak into
another.

The verification work is now divided into two independent tasks.

The `saveName()` component is tested against the `NameStorage`
interface.

Each concrete implementation is separately tested against the same
behavioral contract.

DI moves the choice of implementation out of the consumer. The interface
describes the boundary. Contract tests verify the implementations.
Together, these mechanisms provide a basis for substitutability.

## Multiple Dependencies

A single dependency does not yet show how quickly the configuration
space can grow.

Let us extend the example. In addition to storage, the function now
needs a clock and a logger.

``` js
/**
 * @typedef {object} NameRecord
 * @property {string} name
 * @property {string} createdAt
 */

/**
 * @typedef {object} NameRecordStorage
 * @property {(value: NameRecord) => Promise<void>} save
 */

/**
 * @typedef {object} Clock
 * @property {() => string} now
 */

/**
 * @typedef {object} Logger
 * @property {(message: string) => void} write
 */
```

The component receives all three dependencies:

``` js
/**
 * @param {{
 *   storage: NameRecordStorage,
 *   clock: Clock,
 *   logger: Logger
 * }} dependencies
 * @returns {(name: string) => Promise<NameRecord>}
 */
export function createSaveName({ storage, clock, logger }) {
  return async function saveName(name) {
    const record = {
      name: name.trim().toLowerCase(),
      createdAt: clock.now(),
    };

    logger.write("Saving name");
    await storage.save(record);

    return record;
  };
}
```

Assume that each interface has three implementations:

``` text
Storage:
MemoryStorage
FileStorage
DatabaseStorage

Clock:
SystemClock
FixedClock
OffsetClock

Logger:
ConsoleLogger
FileLogger
RemoteLogger
```

The number of possible assemblies is the product:

``` text
3 × 3 × 3 = 27
```

Adding a fourth dependency with three implementations increases the
number to 81:

``` text
3 × 3 × 3 × 3 = 81
```

Dependency injection does not reduce the number of possible assemblies.
All 27 or 81 configurations still exist.

What changes is how they can be verified.

The `createSaveName()` component can be tested once against its three
interfaces by supplying minimal test implementations:

``` js
import assert from "node:assert/strict";
import { createSaveName } from "./saveName.mjs";

const saved = [];
const messages = [];

const storage = {
  async save(value) {
    saved.push(value);
  },
};

const clock = {
  now() {
    return "2026-07-21T12:00:00.000Z";
  },
};

const logger = {
  write(message) {
    messages.push(message);
  },
};

const saveName = createSaveName({
  storage,
  clock,
  logger,
});

const result = await saveName(" Alex ");

assert.deepEqual(result, {
  name: "alex",
  createdAt: "2026-07-21T12:00:00.000Z",
});

assert.deepEqual(saved, [result]);
assert.deepEqual(messages, ["Saving name"]);
```

This test covers the component's own logic and its interactions with the
three interfaces. It does not depend on `MemoryStorage`, `SystemClock`,
or `ConsoleLogger`.

The real implementations of each interface are verified separately.

If correctness is established by testing every concrete assembly, the
number of combinations grows as a product:

``` text
k₁ × k₂ × ... × kₙ
```

With interface-based decomposition, the baseline verification cost has a
different shape:

``` text
consumer tests
+ implementation tests
+ selected integration scenarios
```

For one consumer and three interfaces with three implementations each,
the decomposition looks approximately like this:

``` text
1 consumer
+ 3 Storage implementations
+ 3 Clock implementations
+ 3 Logger implementations
+ significant integration combinations
```

This does not mean there will literally be ten test functions. A single
component or contract may require many scenarios.

The important change is structural. A large portion of the combinatorial
verification effort can be replaced with independent tests of consumers
and implementations. The baseline cost grows more like a sum than a
product.

Some concrete assemblies still need integration testing. A
`DatabaseStorage` implementation should be tested with the real database
driver. A `RemoteLogger` should be tested against the remote service or
a sufficiently realistic substitute.

Some defects also appear only in particular combinations of
implementations. DI does not eliminate integration testing.

It does, however, allow the most important and highest-risk combinations
to be selected deliberately instead of requiring a mechanical traversal
of the entire configuration space.

> With sufficiently complete contracts, DI allows a significant part of
> combinatorial verification to be replaced with independent
> verification of consumers and implementations.

The more components and alternative implementations an application
contains, the more valuable this distinction becomes.

## When DI Is Unnecessary

DI is useful when it reduces verification cost or allows the application
environment to be selected explicitly.

The inverse is also true: if a concrete dependency does not make a
component harder to verify, extracting it behind an interface may
provide little value.

Pure functions are the simplest example:

``` js
export function normalizeName(name) {
  return name.trim().toLowerCase();
}
```

Everything required for execution is already supplied as input. There is
no external environment to replace.

Injecting anything here would be pointless.

The same is true for many internal utilities:

``` js
import { normalizeName } from "./normalizeName.mjs";

export function createUserRecord(name, createdAt) {
  return {
    name: normalizeName(name),
    createdAt,
  };
}
```

`normalizeName()` is stable, stateless, and free of external effects.
Its static import does not pull in an expensive integration graph, and
it does not prevent `createUserRecord()` from being tested
independently.

It could still be injected:

``` js
export function createUserRecordFactory({ normalizeName }) {
  return function createUserRecord(name, createdAt) {
    return {
      name: normalizeName(name),
      createdAt,
    };
  };
}
```

But there is little practical benefit. The design now contains an
additional composition point, while the verification cost has not
decreased.

DI may also be unnecessary inside a small group of components that are
always used and changed together.

If the connection is stable, inexpensive to construct in tests, and has
no practical need for substitution, a static import remains a reasonable
choice.

The number of production implementations does not determine whether DI
is useful.

An interface may have only one production implementation and still
require several meaningful testing contexts:

``` text
DatabaseStorage — production
MemoryStorage — ordinary tests
FailingStorage — error-path tests
```

There is only one production implementation, but the dependency is
already variable from the perspective of verification.

The relevant boundary is the cost of the connection.

> DI is unnecessary when a concrete dependency is stable, transparent,
> and does not prevent the component from being verified independently.

Static imports are usually appropriate for pure functions, local
transformations, mathematical operations, and small internal utilities.

Injection becomes more useful for connections to the outside world,
mutable environments, and independently evolving components: storage
systems, clocks, loggers, file systems, networks, queues, and
third-party services.

The goal is not to inject every dependency. The application should be
divided only at boundaries where doing so genuinely reduces verification
cost or makes system configuration easier to control.

## Conclusion

Dependency injection is not inherently tied to classes, inheritance, or
any particular programming language.

In functional JavaScript, an ordinary function can receive ordinary
objects that provide the methods it expects:

``` js
const saveName = createSaveName({
  storage,
  clock,
  logger,
});
```

That is already dependency injection.

The consumer defines its expectations.

Implementations are supplied from the outside.

The concrete configuration is selected at the composition point.

A DI container is not required. It may automate the assembly of a large
application, but it does not create dependency injection itself.

Explicit boundaries and composition rules come first. Only then may a
tool become useful for maintaining those rules at scale.

The practical question is therefore not:

> Can this dependency be replaced?

In a dynamic language, almost anything can be replaced somehow.

A better question is:

> Does this connection make the component harder to verify
> independently?

If it does, the dependency is a good candidate for being moved outside
the component and supplied explicitly.

If it does not, a static import is usually the simpler design.

DI does not guarantee a sound architecture by itself. Combined with
explicit interfaces, behavioral contract tests, and selective
integration testing, however, it helps keep verification cost manageable
as an application grows.
