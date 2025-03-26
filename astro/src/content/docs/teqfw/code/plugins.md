
# TeqFW Plugin System

## Introduction

The plugin system in Tequila Framework (TeqFW) is organized based on ES6 modules and npm packages, which provides a hierarchy: export — ES6 module — npm package. This approach allows efficient work with code on both the server-side and in the browser. In teq-applications, ES6 modules are dynamically loaded via `import`, ensuring code portability between the frontend and backend. On the server-side, modules are loaded from `./node_modules/`, while in the browser they can be loaded from a web server or via a CDN (e.g., jsDelivr or unpkg).

**Summary**: TeqFW uses a hierarchy of exports, ES6 modules, and npm packages to create a modular architecture that supports code portability between the frontend and backend.

## Key Elements of the Plugin System

TeqFW uses several levels of modularity to provide flexibility in application development. The main types in the hierarchy are:

- **npm package** — a standard "bundle" of code for distribution and dependency management, containing one teq-plugin inside.
- **teq-plugin** — a platform extension that contains code and configuration for integrating into the platform through the `teqfw.json` descriptor.
- **ES6 module** — a separate file with JavaScript code used to implement functionality and supports dynamic dependency loading.

### 1. NPM Packages

At the top level of the TeqFW component hierarchy are npm packages. Each plugin in TeqFW is an npm package that can be connected to a project using standard tools such as npm or yarn. This allows for the use of commonly accepted methods for versioning, publishing, and distributing plugins through npm registries.

**Summary**: npm packages are the basic unit in the TeqFW component hierarchy and are managed using standard tools.

### 2. TeqFW Plugins

npm packages are extended into teq-plugins by adding the `teqfw.json` file, which defines integration parameters with a teq-application, such as namespaces, code mount points, autoloading, and more. This allows each platform plugin to configure its relationships with other plugins.

The minimum structure of a teq-plugin includes:

- `package.json` — npm package dependencies and metadata;
- `teqfw.json` — parameters for integrating with a teq-application (namespaces, mount points, etc.);
- source code directory (`./src/`, `./sources/`, or another, configurable in `teqfw.json`).

**Summary**: An npm package becomes a teq-plugin through the `teqfw.json` file, which defines the parameters of its integration with the platform.

### 3. Plugin Descriptor — teqfw.json

The `teqfw.json` file is a key element of any teq-plugin, as it defines the plugin's integration with Tequila Framework. It determines the addressing, connection, and registration of the plugin in the teq-application.

The descriptor for each plugin can contain instructions for integrating with other plugins. The name of the plugin to which the instructions apply corresponds to the name of its npm package.

For example, the `@teqfw/web` plugin may include in its `teqfw.json` file instructions for the `@teqfw/di` and `@teqfw/core` plugins, as well as for itself:

```json
{
  "@teqfw/di": {},
  "@teqfw/core": {},
  "@teqfw/web": {}
}
```

When the application starts, the platform core scans all plugins and registers them in the `TeqFw_Core_Back_Api_Plugin_Registry`, which is globally accessible. The descriptor for each plugin becomes available to other plugins through this registry.

**Summary**: The `teqfw.json` descriptor defines the integration of a teq-plugin with the TeqFW platform, including its addressing and connection.

### 4. Source Code Structure

The source code of a teq-plugin is divided into three groups: `./Back/`, `./Front/`, and `./Shared/`:

- `./Back/` — server-side code that can use static imports to work with packages from `./node_modules/` alongside dynamic imports via the Object Container.
- `./Front/` — client-side code that can use static imports from a web server, alongside dynamic imports via the Object Container.
- `./Shared/` — code common to both the server and client sides, dynamically loaded via the Object Container.

This separation ensures a clear architecture and proper interaction between different application layers.

**Summary**: Teq-plugin code is organized into Back, Front, and Shared directories to clearly separate the logic between the server-side, client-side, and shared parts.

### 5. Namespaces

Namespaces in TeqFW are used to uniquely address ES6 modules within plugins. They simplify the application structure, where each ES6 module has a unique identifier, making it easier to find and load them. The TeqFW Object Container uses these identifiers for dynamic loading and module binding at runtime. The rules for converting namespaces into file paths and exports are configured in the `teqfw.json` file.

Example of an `autoload` section in `teqfw.json`:

```json
{
  "@teqfw/di": {
    "autoload": {
      "ns": "Vnd_Prj_App",
      "path": "./src|./sources/|...",
      "ext": "js|mjs"
    }
  }
}
```

**Summary**: Namespaces in TeqFW provide ES6 module addressing, simplifying dependency management and enabling dynamic loading.

### 6. Dependency Injection (IoC)

The main mechanism for dependency management in TeqFW is inversion of control (IoC) through the Object Container. ES6 modules export functions, classes, or objects, which the Object Container creates and binds through dependency injection. Injection is performed through class constructors or factory functions, ensuring dynamic management of dependencies at runtime.

Example of dependency injection:

```js
export default class TeqFw_Core_Shared_Logger {
    /**
     * @param {TeqFw_Core_Shared_Logger_Base} base
     */
    constructor(
        {
            TeqFw_Core_Shared_Logger_Base$: base,
        }
    ) {
        // ...
    }
}
```

**Summary**: Dependencies in TeqFW are managed through inversion of control, using the Object Container for dynamic injection into constructors and factory functions.

## Plugin Management

Since a teq-plugin is essentially an npm package, plugin management, versioning, and distribution are handled using standard JavaScript tools such as npm or yarn. Publishing and updating plugins is similar to working with regular npm packages, making the dependency management process transparent and efficient.

To develop and manage applications based on TeqFW, the following standard npm commands are used:

```shell
npm install
npm start
npm run
npm publish
```

**Summary**: Plugin management in TeqFW is done through npm, using familiar tools for dependency management.

# Conclusion

Tequila Framework (TeqFW) ensures code portability between the frontend and backend through dynamic imports in the Object Container when injecting dependencies via constructors. For Node.js applications, this approach does not result in significant performance losses. In browser applications, TeqFW uses file-by-file code loading via CDN or a web server, allowing the same code to be used in both the browser and Node.js without modification. Connecting any ES6 modules available in the CDN expands integration possibilities.

Dependency management is delegated to standard tools like npm and yarn, simplifying scaling. TeqFW plugins interact with each other through descriptors, and the platform core registers them for further use.

TeqFW provides a flexible and dynamic platform for developing applications with minimal restrictions on third-party code usage. This makes it a powerful tool for creating distributed and scalable applications, especially where a high degree of modularity and code reuse is required.

**Key Points:**

- ES6 modules are loaded dynamically, ensuring flexibility in code usage.
- Dependency management is handled via npm/yarn.
- Scaling is delegated to standard tools.
