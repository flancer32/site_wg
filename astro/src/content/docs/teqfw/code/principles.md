# Coding Principles for Tequila Framework (TeqFW)

## Introduction

This document contains detailed coding guidelines for developing applications and the Tequila Framework (TeqFW) platform itself. The main principles include modularity, portability, and code adaptability. These rules help organize code, manage dependencies, handle errors, and test, making it predictable and stable, which speeds up development and improves quality.

**Objective**: Provide developers with clear recommendations for creating reliable and easily adaptable applications on TeqFW.

---

## Key Coding Principles

### 1. Pure JavaScript Without Transpilation

TeqFW requires the use of pure JavaScript for developing teq-plugins. Transpilation is not used in `@teqfw/...` npm packages, in line with the platform philosophy to minimize dependency on external tools. Third-party plugins can be written in any language, as long as they are transpiled into JavaScript compatible with TeqFW.

**Requirements:**

- Exclude transpilation and TypeScript usage in `@teqfw/...` packages.
- Ensure compatibility of third-party plugins with TeqFW by transpiling them into JavaScript.

---

### 2. Using JSDoc for Typing

TeqFW uses **JSDoc** to describe types and improve IDE support. This approach allows for the advantages of static typing without the strict limitations of TypeScript, maintaining flexibility and supporting various runtimes, such as Node.js and browsers.

JSDoc annotations are crucial for better navigation, debugging, and modifying code, especially in dynamic typing environments like JavaScript. These annotations help code analysis tools and IDEs check types and identify potential errors.

---

### 3. Code Commenting

Comments in the code should describe business logic and architectural decisions. They should provide additional context, avoiding repetition of information that is already contained in variable, function, and class names. This is particularly important for LLM-based tools, which critically require textual context.

**Recommendations:**

- Comments should be concise and focus on complex parts of the code.
- Use English for writing comments to ensure accessibility for international development teams and integration with analysis tools.

---

### 4. Module and Plugin Architecture

Code in TeqFW is organized in the form of **ES6 modules** and **teq-plugins** — standard npm packages with a `./teqfw.json` file for platform integration. A unified plugin structure simplifies navigation and code maintenance.

**Recommendations:**

- **Plugin structure** should include:
  - `package.json` — npm package description and its dependencies.
  - `teqfw.json` — configuration for integration with TeqFW.
  - Source code directories (usually `./src/`):
    - `./Back/` — server-side code.
    - `./Front/` — client-side code.
    - `./Shared/` — shared code for both server and client.

> Detailed information on plugin creation and integration is available in the "Tequila Framework Plugin System" document.
> Guidance on organizing functional subdirectories can be found in the "Tequila Framework Code Structure Guide".

---

### 5. Naming Conventions

TeqFW uses **PascalCase** with level hierarchy separation by an underscore (`_`) for naming key objects such as classes. This style makes navigation easier and ensures compatibility with the autoloader system.

**Naming Rules:**

- **Class Names**: Names should follow PascalCase with underscores between segments that reflect the hierarchy. For example:
  - `GptAct_Back_Dto_Fl32_Bot_OpenAI_Thread`, where:
    - `GptAct` — main project or context,
    - `Back` — server-side designation,
    - `Dto` — type of object, e.g., Data Transfer Object,
    - subsequent segments specify the functional area.

- **File Names**: The file name matches the name of the class it contains, retaining PascalCase with underscores, e.g., `./src/GptAct/Back/Dto/Fl32/Bot/OpenAI/Thread.js`.

- **Variable and Function Names**: Use **camelCase** for variables and functions, except for interactions with external systems that are case insensitive (e.g., database table names or URL parameters), where **snake_case** is used.

- **Constants**: Use **SNAKE_CASE** in uppercase for global and modular constants.

---

### 6. Separation of Data and Functions

TeqFW follows the **Harvard architecture** principle, where data and the functions that process them are clearly separated. This simplifies development and testing while supporting a functional approach.

**Recommendations:**

- **Data** — containers for information transferred between application layers and external systems. Data should be serializable.
- **Functions** — handlers that accept data as input and return the processed result. Separation simplifies testing and supports code modularity and predictability.

---

### 7. Stable Function Signature with Flexible Parameters

TeqFW uses the **stable function signature with flexible parameters** principle, which allows for a fixed number of core arguments while providing the ability to add extra parameters via an options object. This ensures function predictability while allowing for flexibility and extensibility.

**Principle**: A function has a fixed number of required arguments, with additional parameters passed through an `opts` object, whose structure may change as needed. This approach helps avoid rewriting functions when adding new features and simplifies maintenance.

**Recommendations**:

- Use well-defined required arguments for fixed data needed by the function.
- Pass optional parameters through an `opts` object, whose structure can vary depending on the function's specific needs.
- The function should handle the absence of `opts` or individual fields, using default values or checking their existence.

**Example:**

```js
function methodClassical(trx, meta, data) {}

function methodExtended(trx, meta, data, opts = {}) {}

function methodUniversal({trx, meta, data} = {}) {
    return {entity, items};
}
```

Adhering to this principle helps maintain a stable and predictable function API while allowing for flexible parameter addition as functionality grows.

---

### 8. Inversion of Control (IoC)

**TeqFW** relies on **Inversion of Control (IoC)** to manage dependencies through an **Object Container**, employing **late binding**. This principle is key to the platform, facilitating interaction between independent plugins.

**Main Approach**: In TeqFW, dependencies are treated as **initialized code** — configured objects or factories ready for use. The developer defines the dependency specification, while the implementation is substituted at the configuration stage. The **Object Container** manages the selection and substitution of implementations configured by any plugin, allowing different implementations of the same dependency across applications.

**Important Note**: Due to the separation of data and handlers, most runtime objects created by the Object Container act as **singletons**. This boosts performance, as each handler is created once and reused, reducing overhead.

Late binding in TeqFW enables:

- **Flexibility**: Plugins are developed without being tied to specific implementations, making them universal and adaptable across applications.
- **Dependency configuration via Object Container**: Integrators can select or replace plugins with dependency implementations in the final application without modifying the base code.
- **Testing and Adaptation**: Dependencies can be swapped with test versions or mocks that meet specifications, simplifying the creation and maintenance of tests.

**Recommendations**:

- **Injection through Factories**: Use factories to create objects with specific characteristics. Dependencies are passed to constructors or factory functions as initialized objects, allowing for flexible replacement.
  
- **Avoid Static Imports**: Static imports rigidly bind code to a specific implementation, limiting flexibility. Dependencies should be loaded and bound dynamically via the Object Container.

**Example:**

```js
export default class MyService {
    /**
     * @param {App_Plugin_Dep} dep Dependency injected as a singleton via the Object Container
     */
    constructor(
        {
            App_Plugin_Dep$: dep // The Object Container uses the `App_Plugin_Dep$` key to inject the dependency as a singleton
        }
    ) {
        // Public method that uses the injected dependency to perform an action
        this.useDependency = () => {
            console.log(dep.exec());
        };
    }
}
```

---

### 9. Namespaces

TeqFW uses a robust **Dependency Injection (DI)** system based on namespaces to manage dependencies effectively and provide application flexibility. DI in TeqFW is designed to maintain code independence and modularity, allowing developers to manage dependencies between components, modules, and plugins easily.

**Namespaces** serve as unique identifiers for modules and their exports, enabling effective code organization and avoiding name conflicts when interacting with multiple independent modules.

#### Key Principles

- **Hierarchical Addressing**: Namespaces are structured to reflect the application's architecture. For example, modules and dependencies can be organized by levels (e.g., `App_Service`, `Core_Module`), simplifying navigation and dependency injection.
  
- **Late Binding and Flexible Injection**: DI in TeqFW uses late binding to substitute specific implementations at runtime. This is especially useful for applications with a wide range of configurations, as dependencies can be configured based on the runtime environment or context.

- **Addressing to Specific Exports**: TeqFW allows dependency injection down to individual exports within modules. This enables precise control over which components are injected and how — as singletons or as new instances, helping manage memory and performance more effectively.

- **Code Isolation and Modularity**: Namespaces help clearly delineate modules, ensuring their isolation and minimizing reliance on specific implementations. This makes testing, refactoring, and maintaining code easier and more adaptable to changes.

The DI system and namespaces in TeqFW allow for creating a flexible, easily configurable architecture where each component has a unique address and can be integrated according to the application's specifics.

**Example of Configuration in `teqfw.json`:**

```json
{
  "autoload": {
    "psr-4": {
      "Vendor\\Project\\": "./src/"
    }
  }
}
```

> For detailed information on DI and namespaces, see the "DI & Namespaces in Tequila Framework" document.

---

### 10. AZ-Structuring of Source Code

TeqFW applies the **AZ-structuring** principle to simplify code navigation and minimize cascading changes. AZ-structuring imposes a strict hierarchy of modules and components, ensuring clear boundaries between areas of code change.

**AZ-structuring** organizes source code such that each module has its specific area of responsibility, and changes in one module have minimal impact on others. This simplifies refactoring, maintenance, and team development, especially in large distributed applications.

#### Key Principles of AZ-Structuring

- **A and Z Structures**:
  - **A-Structure** is used for nested modules that are internal to a parent module and are not intended for use outside of it. Similar to `private` members of a class, modules in the `A` folder are intended solely for internal logic and should not be used by other modules outside their context.
  - **Z-Structure** is used for common dependencies that can be used across multiple modules at the same level. Modules placed in `Z` are accessible to all files at the same level but remain isolated from other structures.

#### Example Folder Structure

```plaintext
./Mod/
    ./Settings/
        ./A/
            ./Snippet1.mjs
            ./Snippet2.mjs
        ./Z/ 
            ./Snippet3.mjs
            ./Snippet4.mjs                   
        ./Payments.mjs
        ./Profile.mjs
        ./Security.mjs
    ./Settings.mjs
```

In this example:

- `Settings.mjs` is the main module that uses internal modules from the `A/` folder, such as `Snippet1.mjs` and `Snippet2.mjs`. These modules are intended **exclusively for use in `Settings.mjs`** and should not be used in other modules like `Payments.mjs`, `Profile.mjs`, or `Security.mjs`. The `A/` folder serves as an access limiter, preventing changes from propagating to other parts of the system.

- The `Z/` folder contains modules `Snippet3.mjs` and `Snippet4.mjs`, which are common and can be used by all files at the same level, including `Payments.mjs`, `Profile.mjs`, and `Security.mjs`. This helps avoid code duplication while maintaining isolation from other areas that do not have access to `Z/` content.

- **Localization of Changes**: AZ-structuring supports localization of changes: modifications in `A` modules remain isolated from the rest of the structure. At the same time, modules common to multiple components are placed in `Z` and can be used by a limited set of components at the same level.

AZ-structuring helps TeqFW maintain code cleanliness, predictability of refactoring, and ease of team collaboration, particularly when extending functionality and scaling the application.

---

### 11. AI-Oriented Design

TeqFW code formatting is designed to support large language models (LLMs), simplifying code analysis and autogeneration. Using namespaces, JSDoc annotations, and unified templates improves code readability and structure, increasing LLM accuracy and reducing rework costs.

**Key Advantages of the Approach:**

1. **Readability and Structured Layout**: Namespaces and JSDoc annotations form clear, standardized structures, making it easier for models to analyze the code. LLMs better understand the purpose and relationships between modules, reducing errors and improving code generation accuracy.

2. **Unified Templates**: Standardized templates for key code elements (data structures, modules, interfaces) provide models with a predictable foundation for generating components that align with TeqFW's architecture. This promotes code consistency and helps maintain uniformity.

3. **Faster Development**: While the unified style helps developers, its main purpose is to optimize LLM performance. With consistent formatting, models adapt more quickly and accurately to module and plugin requirements, minimizing the need for additional refactoring and adjustments.

Thus, TeqFW code formatting considering LLM requirements boosts the productivity of both models and the entire team, leading to readable, extensible, and high-quality code.

---

### 12. Mandatory Unit Testing

Unit testing is a fundamental element of development in TeqFW, especially in the context of code generation automation using large language models (LLMs). Tests ensure the correctness of autogenerated code, guaranteeing its stability and predictability.

#### Key Requirements for Unit Testing

1. **Coverage of Autogenerated Code**: Every component created with LLM assistance must be tested for correct functionality using unit tests. This helps detect errors quickly and ensures code reliability.

2. **Tests as Stability Guarantees**: Unit tests establish expected component behavior, creating "contracts" for functionality that must not be violated by subsequent changes.

3. **Minimizing Manual Checks**: Automated testing reduces the need for manual code checks and accelerates development by allowing confident integration of changes and new features.

4. **Mandatory Coverage of Critical Functions**: Special attention is given to testing key modules and components that provide core application logic. Tests should cover not only basic scenarios but also edge cases to ensure comprehensive verification.

Unit testing in TeqFW is not just about code verification; it is a foundation ensuring quality and resilience, particularly important when using LLMs for automated development.

---

## Terms and Abbreviations

- **Object Container** — a component that manages application dependencies by automatically injecting dependencies based on configuration.
- **Initialized Code** — objects or factories that are pre-configured and ready for use.
- **Singleton** — an object created once and reused.
- **Late Binding** — a principle where a dependency implementation is substituted at runtime rather than being determined in code at the time of writing.
- **Tequila Framework** — a platform developed for modular and distributed JavaScript applications, supporting dynamic dependency management.

Testing ensures code quality and prevents regressions.

**Recommendations:**

- Write unit tests for key modules and functions.
- Aim for high code coverage, especially for critical components.
- Organize tests in a separate directory, e.g., `./tests/`.

## Conclusion

Adhering to these coding principles ensures high quality and maintainability of code in TeqFW-based projects. Unified standards simplify collaboration among developers, facilitate onboarding of new team members, and contribute to the successful development of projects.

## Additional Resources

- [Tequila Framework Documentation](#)
- [JSDoc Guide](https://jsdoc.app/)
- [ES6 Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

---

**Author:** Alex Gusev <alex@teqfw.com>
