---
title: "¿Para qué sirve la inyección de dependencias en JavaScript?"
date: 2026-07-21
---

<zoom-img
                src="/img/library/concepts/20260721-why-dependency-injection-matters-in-javascript/kdpv.webp"
                alt="Inyección de dependencias en JavaScript"
                width="100%"
        ></zoom-img>

De vez en cuando encuentro afirmaciones según las cuales la inyección de
dependencias no tiene demasiado sentido en JavaScript.

El argumento suele ser el siguiente: JavaScript es un lenguaje dinámico,
los objetos pueden modificarse durante la ejecución y la inyección de
dependencias es una técnica orientada a objetos importada del mundo de
Java.

> ¿Qué problema resuelve la inyección de dependencias si, de todos
> modos, en JavaScript se puede sustituir casi cualquier cosa durante la
> ejecución?

Por ejemplo, el siguiente código puede ejecutarse directamente en la
consola del navegador. Modifica `console.log()` para que cada mensaje
también se envíe a un servidor:

``` js
const originalLog = console.log.bind(console);

console.log = (...args) => {
  navigator.sendBeacon("/api/log", JSON.stringify(args));
  originalLog(...args);
};
```

No hay ningún contenedor, ninguna interfaz declarada ni ninguna
construcción arquitectónica especial. Simplemente hemos sustituido un
método de un objeto.

Mi respuesta es que la inyección de dependencias ayuda a mantener bajo
control el costo de verificar una aplicación compleja.

Permite separar un componente de la elección de su entorno concreto. De
esta forma, podemos comprobar el componente respecto a unas expectativas
explícitas sin tener que construir cada vez todo el grafo de
dependencias reales.

La inyección de dependencias, por sí sola, no garantiza una verificación
independiente. Para conseguirla también hacen falta contratos
suficientemente completos y pruebas separadas para los componentes que
utilizan esos contratos y para sus implementaciones. La inyección de
dependencias proporciona la frontera que permite establecer esa
separación.

Podemos llegar a esta conclusión a partir de unas pocas líneas de
JavaScript corriente, sin clases, herencia, decoradores ni contenedores
de DI.

## Código sin dependencias externas

Comencemos con una función pura:

``` js
export function normalizeName(name) {
  return name.trim().toLowerCase();
}
```

La función depende únicamente de su argumento, por lo que puede
comprobarse directamente:

``` js
import assert from "node:assert/strict";
import { normalizeName } from "./normalizeName.mjs";

assert.equal(normalizeName(" Alex "), "alex");
assert.equal(normalizeName("BOB"), "bob");
```

Todo lo necesario para ejecutarla ya está contenido en sus argumentos.
No existe ningún entorno externo que debamos sustituir, por lo que
aplicar inyección de dependencias aquí no aportaría nada.

## Una dependencia del mundo exterior

Añadamos ahora un módulo de almacenamiento:

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

La función `saveName()` normaliza un nombre y almacena el resultado:

``` js
// saveName.mjs
import { save } from "./storage.mjs";

export async function saveName(name) {
  const value = name.trim().toLowerCase();
  await save(value);
  return value;
}
```

Podemos comprobar la normalización de forma aislada:

``` js
assert.equal(await saveName(" Alex "), "alex");
```

También podemos comprobar el módulo de almacenamiento por separado:

``` js
await save("alex");

assert.deepEqual(await loadAll(), ["alex"]);
```

Sin embargo, estas dos pruebas no verifican la conexión entre ambos
componentes.

Es fácil introducir el siguiente error:

``` js
export async function saveName(name) {
  const value = name.trim().toLowerCase();
  await save(name);
  return value;
}
```

La normalización sigue funcionando. El almacenamiento también guarda
correctamente el valor que recibe. Sin embargo, cuando ambos componentes
trabajan juntos, el resultado es incorrecto: se almacena `" Alex "` en
lugar de `"alex"`.

Para detectar el problema tenemos que comprobarlos como una unidad
conectada:

``` js
await saveName(" Alex ");

assert.deepEqual(await loadAll(), ["alex"]);
```

A partir de este momento, la unidad que estamos verificando ya no es
únicamente `saveName()`. Es la combinación de `saveName()` con esta
implementación concreta de `storage.mjs`.

Si el módulo de almacenamiento depende a su vez del sistema de archivos,
de la configuración y de un logger, la prueba del componente superior
empieza a construir todo el grafo transitivo de dependencias.

Imaginemos un componente que depende de tres módulos y que cada uno de
ellos depende de otros tres:

``` text
1 + 3 + 9 = 13 módulos
```

Todavía no estamos ante un crecimiento multiplicativo del número de
configuraciones. Lo primero que aumenta es el tamaño de la unidad
sometida a prueba. Una comprobación local de un componente se convierte
gradualmente en una prueba de integración de todo el grafo conectado.

El segundo problema aparece más adelante, cuando las dependencias
adquieren implementaciones alternativas. Entonces el número de
configuraciones posibles empieza a crecer como un producto.

## De dónde surge la interfaz

Consideremos esta expresión:

``` js
await storage.save(value);
```

Aquí ya existe una interfaz.

El componente espera que el objeto externo proporcione un método
`save()`. Espera que ese método acepte un valor y que su resultado pueda
utilizarse con `await`.

JavaScript no obliga a declarar formalmente esa interfaz. Pero la
ausencia de una declaración no significa que las expectativas entre los
componentes no existan.

Desde el punto de vista del componente que utiliza la dependencia, la
interfaz se define en el lugar de uso. Un objeto puede exponer decenas
de métodos, aunque un componente concreto solo necesite uno o dos. Esos
requisitos forman la interfaz de esa relación específica.

> Una interfaz describe las expectativas de un componente en la frontera
> con una dependencia.

Por esa razón, el *duck typing* no debería entenderse como una
clasificación completa del objeto.

Distintos componentes pueden esperar comportamientos diferentes del
mismo pato. A un ornitólogo pueden interesarle sus características
biológicas. A un granjero, su alimentación y su capacidad para poner
huevos. El objeto es el mismo, pero las interfaces son distintas porque
las expectativas también lo son.

La expresión `storage.save(value)` define la parte estructural de la
interfaz: el nombre del método, sus argumentos y la forma de invocarlo.

Sin embargo, un contrato útil también debe incluir el significado del
comportamiento.

¿Qué significa exactamente «guardar»? ¿Cuándo se considera terminada la
operación? ¿Debe el valor almacenado devolverse después mediante
`loadAll()`? ¿Qué errores están permitidos?

La estructura puede describirse mediante tipos y anotaciones. El
significado del comportamiento debe documentarse y comprobarse mediante
pruebas.

## Inyección de la dependencia

Para volver a convertir `saveName()` en una unidad independiente,
podemos eliminar su conocimiento sobre el `storage.mjs` concreto.

La dependencia no desaparece. La función sigue teniendo que almacenar el
nombre normalizado. Lo único que cambia es la forma de conectar los
componentes.

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

El módulo ya no importa una implementación concreta del almacenamiento.
Solo declara una expectativa: al crear la función debe proporcionarse un
objeto que tenga un método `save()`.

La aplicación real conecta los componentes en otro lugar:

``` js
// bootstrap.mjs
import * as storage from "./storage.mjs";
import { createSaveName } from "./saveName.mjs";

const saveName = createSaveName({ storage });

await saveName(" Alex ");
```

Este es el *Composition Root* de la aplicación: el lugar donde los
componentes independientes se combinan para formar un sistema operativo.

La implementación concreta del almacenamiento se elige aquí y no dentro
de `saveName.mjs`.

Una prueba puede construir el mismo componente con una implementación
mínima:

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

Esta prueba verifica únicamente el comportamiento de `saveName()`:

``` text
el nombre se normaliza;
el valor normalizado se pasa a storage.save();
la función devuelve el resultado correcto.
```

No necesitamos el almacenamiento real ni sus propias dependencias. La
prueba construye el entorno mínimo necesario para ejecutar el
componente.

También es posible sustituir durante una prueba una dependencia
importada de forma estática. Sin embargo, para hacerlo el runner debe
interceptar la carga del módulo, transformar el código fuente o
proporcionar una API específica de mocks.

Con una inyección de dependencias explícita no hace falta intervenir en
el sistema de módulos. La prueba entrega la implementación necesaria
como un argumento corriente de la función.

> Un `import` estático fija una conexión concreta dentro del componente.
> La inyección de dependencias traslada la elección de la implementación
> al punto de composición.

La inyección de dependencias no crea una posibilidad de prueba
completamente nueva. Convierte la verificación independiente en una
propiedad normal de la arquitectura, en lugar de depender de un
mecanismo especial proporcionado por la infraestructura de pruebas.

## Interfaces en JavaScript

ECMAScript no dispone de una construcción activa `interface`. Sin
embargo, el lenguaje efectivo de un proyecto suele ser más amplio que la
sintaxis comprendida por el motor de JavaScript.

También puede incluir convenciones, documentación, análisis estático,
pruebas, reglas de CI y requisitos estructurales.

En este ejemplo podemos definir el lenguaje del proyecto de la siguiente
manera:

> JavaScript + JSDoc + convenciones para las interfaces y sus
> implementaciones.

Podemos describir la interfaz del almacenamiento como un tipo
estructural:

``` js
// NameStorage.mjs

/**
 * Almacenamiento de valores de texto.
 *
 * @typedef {object} NameStorage
 * @property {(value: string) => Promise<void>} save
 *   Guarda un valor.
 * @property {() => Promise<string[]>} loadAll
 *   Devuelve los valores almacenados.
 */

export {};
```

Las expectativas que antes eran implícitas ahora tienen un nombre y una
descripción estructural.

Como el ejemplo no utiliza clases, las implementaciones pueden
expresarse mediante fábricas de objetos:

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

Una implementación basada en archivos podría tener este aspecto:

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

Para una implementación basada en una base de datos podemos describir el
contrato más reducido que necesita este componente:

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

La dependencia de `saveName()` también puede declararse explícitamente:

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

Para el motor de JavaScript, las tres implementaciones siguen siendo
objetos corrientes. Sin embargo, dentro del lenguaje del proyecto son
implementaciones del mismo contrato.

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

Las anotaciones JSDoc, por sí solas, no imponen ninguna regla. Para que
`JavaScript + JSDoc` funcione como un verdadero lenguaje de proyecto,
sus convenciones deben comprobarse.

Un proyecto puede exigir que las dependencias inyectadas tengan
interfaces declaradas, que los resultados de las fábricas estén tipados,
que se prohíban dependencias externas ocultas y que el análisis estático
y las pruebas de contrato se ejecuten en CI.

Por ejemplo, los tipos JSDoc pueden comprobarse mediante el analizador
de TypeScript:

``` text
tsc --allowJs --checkJs --noEmit
```

JSDoc no crea las interfaces. Esas interfaces ya existen en las
fronteras entre los componentes. Las anotaciones las trasladan desde la
cabeza del desarrollador hasta el lenguaje explícito del proyecto, donde
quedan disponibles para las personas, los IDE, los analizadores y los
agentes de programación.

## Verificación del contrato

La compatibilidad estructural no garantiza la compatibilidad del
comportamiento.

Un objeto puede proporcionar tanto `save()` como `loadAll()` y, aun así,
implementarlos de manera incorrecta:

``` js
const brokenStorage = {
  async save(value) {
    // No guarda nada.
  },

  async loadAll() {
    return [];
  },
};
```

La forma es correcta. El comportamiento no lo es.

Por tanto, las implementaciones necesitan una prueba de contrato común:

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

Las mismas comprobaciones pueden aplicarse a cada implementación:

``` js
await verifyNameStorage(createMemoryStorage);

await verifyNameStorage(() => createFileStorage("./temporary-test-file.txt"));

await verifyNameStorage(() => createDatabaseStorage(testDatabase));
```

En una suite de pruebas real, la implementación basada en archivos
debería recibir un archivo temporal nuevo. La implementación de base de
datos debería utilizar un esquema aislado o una transacción
independiente. De lo contrario, el estado de una ejecución podría
filtrarse a la siguiente.

El trabajo de verificación queda ahora dividido en dos tareas
independientes.

El componente `saveName()` se comprueba respecto a la interfaz
`NameStorage`.

Cada implementación concreta se comprueba por separado respecto al mismo
contrato de comportamiento.

La inyección de dependencias traslada la elección de la implementación
fuera del componente que la utiliza. La interfaz describe la frontera.
Las pruebas de contrato verifican las implementaciones. En conjunto,
estos mecanismos proporcionan una base para la sustitución segura de
unas implementaciones por otras.

## Varias dependencias

Una sola dependencia todavía no permite ver con claridad la rapidez con
la que puede crecer el espacio de configuraciones.

Ampliemos el ejemplo. Además del almacenamiento, la función necesita
ahora un reloj y un logger.

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

El componente recibe las tres dependencias:

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

Supongamos que cada interfaz tiene tres implementaciones:

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

El número de configuraciones posibles se calcula como un producto:

``` text
3 × 3 × 3 = 27
```

Si añadimos una cuarta dependencia con otras tres implementaciones, el
número aumenta hasta 81:

``` text
3 × 3 × 3 × 3 = 81
```

La inyección de dependencias no reduce el número de configuraciones
posibles. Las 27 o 81 combinaciones siguen existiendo.

Lo que cambia es la forma de verificarlas.

Podemos comprobar una sola vez el componente `createSaveName()` respecto
a sus tres interfaces, proporcionándole implementaciones mínimas para la
prueba:

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

Esta prueba cubre la lógica propia del componente y sus interacciones
con las tres interfaces. No depende de `MemoryStorage`, `SystemClock` ni
`ConsoleLogger`.

Las implementaciones reales de cada interfaz se verifican por separado.

Si intentamos demostrar la corrección del sistema probando cada
configuración concreta, el número de combinaciones crece como un
producto:

``` text
k₁ × k₂ × ... × kₙ
```

Con una descomposición basada en interfaces, el costo básico de
verificación adopta otra forma:

``` text
pruebas de los componentes consumidores
+ pruebas de las implementaciones
+ escenarios de integración seleccionados
```

Para un componente y tres interfaces con tres implementaciones cada una,
la descomposición sería aproximadamente la siguiente:

``` text
1 componente consumidor
+ 3 implementaciones de Storage
+ 3 implementaciones de Clock
+ 3 implementaciones de Logger
+ combinaciones de integración significativas
```

Esto no significa que existan literalmente diez funciones de prueba. Un
solo componente o contrato puede necesitar muchos escenarios.

El cambio importante es estructural. Una parte considerable del esfuerzo
combinatorio puede sustituirse por pruebas independientes de los
componentes y de las implementaciones. El costo básico se aproxima más a
una suma que a un producto.

Algunas configuraciones concretas siguen necesitando pruebas de
integración. Una implementación `DatabaseStorage` debe probarse con el
driver real de la base de datos. Un `RemoteLogger` debe comprobarse
contra el servicio remoto o contra un sustituto suficientemente
realista.

También existen defectos que solo aparecen en determinadas combinaciones
de implementaciones. La inyección de dependencias no elimina las pruebas
de integración.

Sin embargo, permite seleccionar deliberadamente las combinaciones más
importantes o de mayor riesgo, en lugar de recorrer mecánicamente todo
el espacio de configuraciones.

> Con contratos suficientemente completos, la inyección de dependencias
> permite sustituir una parte significativa de la verificación
> combinatoria por comprobaciones independientes de los componentes y de
> las implementaciones.

Cuantos más componentes e implementaciones alternativas contenga una
aplicación, mayor será el valor de esta separación.

## Cuándo no hace falta DI

La inyección de dependencias resulta útil cuando reduce el costo de
verificación o permite seleccionar explícitamente el entorno de la
aplicación.

También se cumple la afirmación inversa: si una dependencia concreta no
dificulta la verificación de un componente, extraerla detrás de una
interfaz puede aportar muy poco.

Las funciones puras son el ejemplo más sencillo:

``` js
export function normalizeName(name) {
  return name.trim().toLowerCase();
}
```

Todo lo necesario para la ejecución ya se proporciona como entrada. No
existe ningún entorno externo que debamos sustituir.

Inyectar una dependencia aquí no tendría sentido.

Lo mismo ocurre con muchas utilidades internas:

``` js
import { normalizeName } from "./normalizeName.mjs";

export function createUserRecord(name, createdAt) {
  return {
    name: normalizeName(name),
    createdAt,
  };
}
```

`normalizeName()` es una función estable, sin estado y sin efectos
externos. Su importación estática no introduce un grafo de integración
costoso ni impide comprobar `createUserRecord()` de forma independiente.

Aun así, podríamos inyectarla:

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

Pero la utilidad práctica sería mínima. El diseño contiene ahora un
punto de composición adicional, mientras que el costo de verificación no
ha disminuido.

La inyección de dependencias también puede ser innecesaria dentro de un
pequeño grupo de componentes que siempre se utilizan y evolucionan
juntos.

Si la conexión es estable, resulta barata de construir durante las
pruebas y no existe una necesidad práctica de sustituirla, una
importación estática sigue siendo una decisión razonable.

El número de implementaciones utilizadas en producción tampoco determina
por sí solo si DI resulta útil.

Una interfaz puede tener una única implementación de producción y, al
mismo tiempo, varios contextos significativos para las pruebas:

``` text
DatabaseStorage — producción
MemoryStorage — pruebas ordinarias
FailingStorage — pruebas de rutas de error
```

Solo existe una implementación en producción, pero desde el punto de
vista de la verificación la dependencia ya es variable.

La frontera relevante está determinada por el costo de la conexión.

> DI no hace falta cuando una dependencia concreta es estable,
> transparente y no impide verificar el componente de forma
> independiente.

Las importaciones estáticas suelen ser apropiadas para funciones puras,
transformaciones locales, operaciones matemáticas y pequeñas utilidades
internas.

La inyección resulta más útil para las conexiones con el mundo exterior,
los entornos variables y los componentes que evolucionan de forma
independiente: sistemas de almacenamiento, relojes, loggers, sistemas de
archivos, redes, colas y servicios de terceros.

El objetivo no consiste en inyectar todas las dependencias. La
aplicación solo debe dividirse en aquellas fronteras donde esa
separación reduzca realmente el costo de verificación o facilite el
control de la configuración.

## Conclusión

La inyección de dependencias no está vinculada necesariamente con las
clases, la herencia ni ningún lenguaje de programación concreto.

En JavaScript funcional, una función corriente puede recibir objetos
corrientes que proporcionen los métodos que espera:

``` js
const saveName = createSaveName({
  storage,
  clock,
  logger,
});
```

Eso ya es inyección de dependencias.

El componente define sus expectativas.

Las implementaciones se proporcionan desde el exterior.

La configuración concreta se elige en el punto de composición.

No hace falta un contenedor de DI. Puede automatizar la composición de
una aplicación grande, pero no crea la inyección de dependencias.

Primero aparecen las fronteras explícitas y las reglas de composición.
Solo después puede resultar útil una herramienta que mantenga esas
reglas a medida que el sistema crece.

Por tanto, la pregunta práctica no debería ser:

> ¿Es posible sustituir esta dependencia?

En un lenguaje dinámico casi siempre existe alguna forma de hacerlo.

Una pregunta más útil es:

> ¿Esta conexión dificulta la verificación independiente del componente?

Si la dificulta, la dependencia es una buena candidata para trasladarse
fuera del componente y proporcionarse explícitamente.

Si no la dificulta, una importación estática suele ser la solución más
sencilla.

La inyección de dependencias no garantiza por sí sola una arquitectura
sólida. Sin embargo, combinada con interfaces explícitas, pruebas de
contratos de comportamiento y pruebas de integración selectivas, ayuda a
mantener bajo control el costo de verificación a medida que la
aplicación crece.
