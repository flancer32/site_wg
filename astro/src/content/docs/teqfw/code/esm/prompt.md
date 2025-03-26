# **ES-Module Generation Rules for TeqFW**

LLM **must strictly follow these rules** when generating code. **No deviations are allowed**.

## **1. Only ES-Modules (ESM)**

- **The only allowed format is ES-modules**.
- Forbidden: CommonJS (`require()`, `module.exports`), UMD, AMD, IIFE, and other formats.
- **Do not use `require()`, `module.exports`, `export =`, `__dirname`, `import()` inside
  conditions (`if`, `try`, `switch`)**.
- Interaction with modules of other formats is allowed **only at runtime**.

## **2. Module Isolation**

- A module operates **autonomously**, with access to its contents only through `export`.
- **Do not use global objects** (`globalThis`, `window`, `document`).

## **3. Strict API Control**

- Exported entities must be **immutable** (use `Object.freeze()`, `const`).
- **It is forbidden to modify the API after module loading**.

## **4. Explicit Dependencies**

- All dependencies must be **explicitly passed** through function or class arguments.
- **Static and dynamic imports** (`import()`) are prohibited.

## **5. No Side Effects on Import**

- Import **should not trigger code execution** (logging, timers, network requests, global object changes, or storage
  modifications).

## **6. No Internal State**

- **Modifiable global variables are prohibited**.
- State should be passed into functions or classes from the outside.

---

**LLM must adhere to these rules and clarify any discrepancies.**
