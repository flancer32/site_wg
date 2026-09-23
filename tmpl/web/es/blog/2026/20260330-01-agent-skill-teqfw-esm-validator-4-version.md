---
title: "Cuarta versión de la habilidad de agente para validar código ESM"
description: "La cuarta versión de @flancer32/skill-teqfw-esm-validator añade 12 comprobaciones para código TeqFW y muestra que las habilidades ya sirven para mover reglas compartidas a una capa portátil."
date: 2026-03-30
display_date: "30 de marzo de 2026"
image: "/img/brand/agent-skills-cover.png"
image_alt: "Cuarta versión de la habilidad de agente para validar código ESM"
---

# Cuarta versión de la habilidad de agente para validar código ESM

<zoom-img src="/img/brand/agent-skills-cover.png"
        alt="Cuarta versión de la habilidad de agente para validar código ESM" width="100px"></zoom-img>

La cuarta versión de **@flancer32/skill-teqfw-esm-validator** quedó orientada a fijar la
        forma general del código fuente en proyectos TeqFW. La mayor parte del trabajo la realizó el agente
        a través de la extensión de VSCode, y el resultado fue un conjunto de 12 comprobaciones que ya
        funciona como una capa portátil de especificación. Este formato permite sacar las reglas comunes de
        la memoria manual, ir trasladando reglas compartidas a habilidades y ahorrar tokens al agente.

Las comprobaciones cubren la presencia de `export default`, la prohibición de CommonJS, la
        prohibición de importaciones estáticas y de reexportaciones estáticas, la posición de
        `__deps__` entre los exportados de nivel superior, la forma de `__deps__`, el
        nombre del parámetro estructurado en el constructor de inyección de dependencias y las restricciones
        de las clases de comportamiento. La lista es:

- `RequireDefaultExport` — el módulo debe tener `export default`.

- `NoCommonjs` — se prohíben `require()`, `module.exports` y `exports.*`.

- `NoStaticImports` — se prohíben las importaciones estáticas y las re-exportaciones estáticas.

- `DependencyPosition` — `__deps__` debe ser el último exportado de nivel superior.

- `ValidateDepsExport` — `__deps__` debe ser un objeto descriptor congelado y coincidir con los parámetros del constructor.

- `ConstructorClosureBehavior` — una clase de comportamiento exportada debe tener un constructor.

- `ExportedClassBehaviorScope` — las comprobaciones de comportamiento de clase se aplican solo a las clases exportadas.

- `NoClassFieldBehavior` — las clases exportadas no deben tener campos de clase.

- `NoPrototypeMethodBehavior` — las clases exportadas no deben tener métodos en el prototipo.

- `NoClassInheritanceBehavior` — las clases de comportamiento exportadas no deben heredar de otras clases.

- `ModuleTopBlock` — el módulo debe empezar con exactamente un bloque JSDoc inicial.

- `ConstructorDepsParameterName` — el parámetro estructurado del constructor de inyección de dependencias debe llamarse `deps`.

La conclusión práctica es sencilla: habilidades de este tipo ya funcionan como una capa transportable
        de reglas. Permiten comprobar la forma común del código sin cargar todas las reglas en la cabeza y
        hacen viable mover especificaciones entre proyectos hacia una biblioteca de habilidades.
