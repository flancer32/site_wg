# **Recommendations for ES-module structure in TeqFW**

TeqFW uses **ES-modules** and **does not support static imports**. To fully leverage the platform’s capabilities, follow
these recommendations.

## **1. ES-module structure**

Each TeqFW ES-module is divided into sections to improve readability and code navigation. The recommended section order
is:

- `DOCUMENTATION`
- `CONSTANTS`
- `FUNCTIONS`
- `CLASSES`
- `EXPORTS`

The `DOCUMENTATION` section can be split into two parts: a description at the beginning and `@typedef` at the end. Each
section can be marked with corresponding comments, such as `// DOC`, `// CONST`, `// FUNC`, `// CLASS`.

Example of a module structure:

```js
/**
 * Documentation for whole module.
 */
// CONST
const PI = 3.14;

// FUNC
function calculateArea(radius) {
    return PI * radius * radius;
}

// CLASSES
class MyClass {
    // class body
}

// EXPORTS
export default MyClass;

// DOCS
/**
 * @typedef
 */
```

Sections can be combined or omitted. A typical module might look like this:

```js
/**
 * Documentation for whole module.
 */
export default class MyClass {};
```

## **2. No static binding**

- **Static imports are not used** in TeqFW.
- All dependencies must be injected dynamically through the constructor.
- **Deviations are not allowed**.

Example of an **incorrect** approach:

```js
import {existsSync} from 'node:fs';  // Wrong
```

## **3. Function structure**

Functions can also be divided into sections:

- `DOCUMENTATION`
- `CONSTANTS`
- `FUNCTIONS`
- `MAIN`

Example:

```js
/**
 * Documentation for the function.
 * @param radius
 * @returns {number}
 */
function calculateArea(radius) {
    // CONST
    const PI = 3.14;

    // FUNC
    function power2(x) {
        return x * x;
    }

    // MAIN
    return PI * power2(radius);
}
```

Sections can be nested if one function calls another.

## **4. Only one export**

- **It is recommended to export only one object, function, or class** to simplify the structure and improve readability.

Example:

```js
export default class MyClass {
    // class body
}
```

## **5. Using default-export**

- If there is only one export, it is recommended to use `default`-export to simplify addressing exports and working with
  dependencies.

Example:

```js
export default function calculateArea(radius) {
    return Math.PI * radius * radius;
}
```

## **6. Exporting classes**

- **Classes are preferred over functions** because they provide a stricter and more predictable structure for static
  analysis.

Example of a class:

```js
export default class MyClass {
    constructor(name) {
        this.name = name;
    }

    greet() {
        return `Hello, ${this.name}!`;
    }
}
```

## **7. Dependency injection through constructor**

- All dependencies, including packages from `node_modules`, are injected through the constructor of the exported object.

Example:

```js
export default class MyClass {
    constructor({dependency1, dependency2}) { }
}
```

## **8. Data encapsulation using closures**

- Use **closures** for data encapsulation instead of private properties and methods to shorten the code.

Example:

```js
export default class MyClass {
    constructor({dependency1, dependency2}) {
        this.run = function () {
            dependency1.doSomething();
            dependency2.doSomethingElse();
        };
    }
}
```

## **Typical ES-module code for TeqFW**

Example of a typical module:

```js
/**
 *  Documentation for whole module.
 */
// CONST
const PI = 3.14;

// FUNC
function calculateCircumference(radius) {
    return 2 * PI * radius;
}

/**
 * Documentation for the main class.
 */
export default class Circle {
    /**
     * @param {{calculate: function}} areaCircle
     * @param {function} timesTwo
     */
    constructor({areaCircle, timesTwo}) {
        this.calculate = ({radius}) => {
            const {area} = areaCircle.calculate({radius});
            const circumference = calculateCircumference(radius);
            const diameter = timesTwo(radius);
            return {area, circumference, diameter};
        };
    }
}
```

---

These recommendations will help you effectively develop code for TeqFW, ensuring standards, improving readability, and
enhancing testability.