## Details of ES-Module Generation Rules for TeqFW (v2.0)

### 1. **Only ES-Modules (ESM)**

TeqFW uses **only ES-modules (ESM)** for code generation. This means that **any other formats, such as CommonJS, UMD,
AMD, IIFE, are not supported**.

#### 🔹 **Why is this important?**

- **ESM** is the standard for modularity in JavaScript and guarantees predictability and compatibility.
- **Using `require()`**, **`module.exports`**, and **`export =`** from CommonJS **is not allowed**. Modules based on
  these approaches cannot be used in TeqFW.

#### 🔹 **Example of bad practice**:

```js
// Bad practice - CommonJS
const fs = require('fs');
module.exports = function readFile() {
    fs.readFileSync('file.txt');
};
```

#### 🔹 **How to work with modules of other formats?**

- Interaction with modules of other formats, such as **CommonJS**, is allowed **only at runtime**, while maintaining
  isolation and compatibility with ESM. For such adapters, **factory functions or bridges** should be used.

### 2. **Module Isolation**

In TeqFW, **each module is isolated**, and its code cannot affect the global scope. Access to the module's code is only
possible through exported entities.

#### 🔹 **Why is this important?**

- Module isolation ensures **security** and **predictability**. Modules cannot accidentally modify global objects (
  `globalThis`, `window`, `document`), protecting against unexpected side effects.

#### 🔹 **Example of good practice**:

```js
// Good practice: module works with exported entities
export const myFunction = () => {};
```

### 3. **Strict API Control**

All exported entities must be **immutable** (use `Object.freeze()` or `const`). After the module is loaded, the API
should not be modified.

#### 🔹 **Why is this important?**

- **Strict API control** prevents unwanted changes, ensuring stability in interactions with external code.

#### 🔹 **Example of good practice**:

```js
const API = Object.freeze({
    process: () => console.log('Processing...')
});
export default API;
```

### 4. **Explicit Dependencies**

All dependencies must be **explicitly passed** (e.g., through constructor or factory function arguments). **Static and
dynamic imports** within the module are prohibited.

For architectural constraints regarding `import` usage,
see [TeqFW and ES Modules: Architectural Notes](#7-teqfw-and-es-modules-architectural-notes).

#### 🔹 **Why is this important?**

- Explicit dependency passing helps control which libraries or functions are used inside the module, avoiding implicit
  dependencies and hard-to-debug issues.

#### 🔹 **Example of good practice**:

```js
export default function createService({logger, fs}) {
    return {
        log: logger.log,
        readFile: fs.readFileSync
    };
}
```

#### 🔹 **Forbidden practices**:

```js
// Bad practice: using dynamic import without explicit control
export default async function loadLibrary() {
    const lib = await import('./some-lib.js');
    return lib.process();
}
```

### 5. **No Side Effects on Import**

When importing modules, **no side effects** should occur, such as logging, starting timers, network requests, or
modifying global objects.

#### 🔹 **Why is this important?**

- This avoids unwanted changes in the runtime environment upon importing a module, improving code predictability and
  security.

#### 🔹 **Example of bad practice**:

```js
// Bad practice - starting timers on import
import './someModule.js'; // starts setTimeout
```

#### 🔹 **Example of good practice**:

```js
// Good practice: side effects should occur only on explicit call
import {startTimer} from './timer.js';

startTimer();
```

### 6. **No Internal State**

Modules should not store **mutable internal state**. All data should be passed into functions or classes from the
outside.

#### 🔹 **Why is this important?**

- This simplifies testing and prevents unexpected side effects related to state changes within the module.

#### 🔹 **Example of bad practice**:

```js
// Bad practice: using global variables inside the module
let counter = 0;
counter++;
```

#### 🔹 **Example of good practice**:

```js
// Good practice: state is passed from the outside
export default function increment(counter) {
    return counter + 1;
}
```

---

**LLM must strictly follow these rules and clarify any discrepancies**, if the user requests code incompatible with ESM.
In such cases, the model is required to offer a correct solution consistent with TeqFW principles.

### 7. **TeqFW and ES Modules: Architectural Notes**

TeqFW adopts the **ES Module (ESM)** standard for all code but introduces a specific **architectural constraint**
regarding the use of `import`.

#### 🔹 Restriction on `import` in application-level modules

Application modules—such as logic handlers, DTOs, factories, coordinators, and configuration units—**must not
use `import` statements**, neither static (`import x from '...'`) nor dynamic (`await import(...)`). Instead, **all
dependencies must be injected explicitly** through constructor or factory parameters.

This restriction ensures:

- Full support for **late binding** and **dynamic dependency resolution**.
- **Improved testability** by allowing dependencies to be stubbed or replaced.
- Consistency with TeqFW’s object-container-based architecture.

#### 🔹 Exception: DI Container initialization

The only context where `import` is permitted is during the initialization of the **DI Container** (`@teqfw/di`). For
example:

```js
import Container from '@teqfw/di';

const container = new Container();
```

This usage is fully compatible with the ESM standard and limited to the startup/bootstrap layer of the application.

#### 🔹 Conformance to ESM

Although TeqFW modules do not use `import`, they remain **technically valid ES modules** by using `export` statements
and being interpreted by the JavaScript engine in ESM mode.

This distinction is crucial: the architectural constraint is **not a technical limitation**, but a deliberate design
decision to ensure **modularity, isolation, and LLM compatibility**.