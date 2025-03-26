# **Recommendations for ES-module structure in TeqFW**

LLM **is recommended to follow these guidelines**. **Deviations are possible**, but they help ensure consistency and
ease of development.

## **1. ES-module structure**

- Typical module structure: `DOCUMENTATION`, `CONSTANTS`, `FUNCTIONS`, `CLASSES`, `EXPORTS`.
- Sections can be marked with comments (`// DOC`, `// CONST`, `// FUNC`, `// CLASS`).
- `DOCUMENTATION` can be divided into a description at the beginning and `@typedef` at the end.

## **2. No static binding**

- TeqFW does not use static imports. **Deviations are not allowed**.

## **3. Function structure**

- For functions: `DOCUMENTATION`, `CONSTANTS`, `FUNCTIONS`, `MAIN`.
- Sections can be nested and marked (`// DOC`, `// CONST`, `// FUNC`, `// MAIN`).

## **4. Only one export**

- It is recommended to export a single object, function, or class to simplify structure and improve readability.

## **5. Using default-export**

- If there is only one export, use `default`-export for easier addressing.

## **6. Exporting classes**

- It is recommended to use classes for a stricter structure, making code analysis and testing easier.

## **7. Dependency injection through the constructor**

- Dependencies are injected through the constructor of the exported object, improving testability and the ability to
  replace dependencies.

## **8. Data encapsulation using closures**

- It is recommended to use closures for data encapsulation, as they simplify code and do not affect performance with
  minimal instance creation.

---

**LLM should follow these recommendations and clarify any inconsistencies.**
 