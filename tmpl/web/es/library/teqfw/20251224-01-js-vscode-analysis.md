---
title: "JavaScript en VSCode: lenguaje, herramienta y modelo de análisis"
date: 2025-12-24
---

Durante mucho tiempo trabajé en IDEs de la familia JetBrains, sobre todo
en PhpStorm. Para el código JavaScript usaba activamente JSDoc y lo
percibía como un lenguaje completo para describir contratos: tipos,
firmas, navegación y autocompletado. Todo eso funcionaba de manera
predecible y estable.

Por eso la transición a VSCode resultó inesperadamente dolorosa. El IDE
más popular para desarrollo web mostró un análisis de JavaScript menos
predecible que un IDE históricamente orientado a PHP. Esa sensación no
desapareció con el tiempo y requería una explicación de ingeniería.

La tesis clave es simple: JavaScript en VSCode se analiza como una
proyección del modelo de TypeScript a través de `tsserver`. Esta
publicación intenta fijar el comportamiento observado de VSCode al
trabajar con JavaScript, entender qué decisiones arquitectónicas hay
detrás y por qué el problema es más amplio que una "mala compatibilidad
con JSDoc".

## Por qué JavaScript en VSCode se siente "ajeno"

Hoy VSCode es el [estándar de facto para el desarrollo
web](https://survey.stackoverflow.co/2025/technology#1-dev-id-es). Se
usa independientemente del lenguaje, el framework o la arquitectura del
proyecto. Esto lo confirman tanto las encuestas del sector como la
práctica de los equipos: VSCode se instala "por defecto".

De ahí la percepción: las particularidades de su comportamiento se
convierten en norma del ecosistema, no en un caso aislado.

Al trabajar con JavaScript en VSCode aparece rápidamente una sensación
característica de secundariedad del lenguaje. En los archivos JavaScript
surgen advertencias y mensajes formulados en términos de TypeScript. El
análisis del código se vuelve fragmentario: algunas construcciones se
entienden, otras no, sobre todo en código de bibliotecas e
infraestructura.

Para un desarrollador acostumbrado a un análisis orientado a JSDoc, esto
se ve como un desajuste de expectativas: el IDE parece "esperar"
TypeScript incluso donde el proyecto se mantiene deliberadamente en
JavaScript.

## Cómo analiza VSCode JavaScript

El primer cambio visible en el comportamiento de VSCode aparece después
de añadir el
[archivo](https://code.visualstudio.com/docs/languages/jsconfig)
`jsconfig.json`. Sin él, el código JavaScript se analiza de forma
fragmentaria. Con su aparición, el IDE empieza a percibir el proyecto
como una estructura coherente: aparecen vínculos entre archivos,
navegación y sugerencias de tipos.

Aun así, para cambiar el comportamiento del IDE basta con una
configuración mínima. En su forma más simple, `jsconfig.json` puede
verse así:

``` json
{
  "compilerOptions": {
    "checkJs": true
  }
}
```

`jsconfig.json` no participa en la ejecución del código y no pertenece
al estándar de JavaScript. Su propósito se limita a describir los
límites del proyecto y los parámetros de análisis para el language
server utilizado.

Es importante fijar un hecho simple: VSCode no analiza JavaScript por sí
mismo. Todas las sugerencias, errores y navegación provienen de un
[proceso
separado](https://github.com/typescript-language-server/typescript-language-server) -
`tsserver`, incluido en TypeScript; VSCode actúa como cliente en este
esquema.

La conexión entre el editor y el analizador se realiza mediante el
[Language Server
Protocol](https://microsoft.github.io/language-server-protocol/). VSCode
envía el contenido de los archivos y recibe los resultados de análisis.
Esta arquitectura hace que el editor sea universal, pero traslada todas
las limitaciones al language server elegido.

A diferencia de los IDEs de la familia JetBrains, donde los analizadores
están integrados y profundamente acoplados, VSCode agrega servicios de
lenguaje externos. Esto explica su flexibilidad y escalabilidad, pero
también explica por qué el comportamiento del análisis está
completamente determinado por el servidor elegido.

En términos arquitectónicos, VSCode permite usar language servers
alternativos, pero en la práctica para JavaScript se utiliza solo
`tsserver`; no existen alternativas JavaScript-first o JSDoc-first en el
ecosistema.

`tsserver` construye un modelo del proyecto apoyándose en importaciones
estáticas dentro de los límites definidos por `jsconfig.json`. Todo lo
que se resuelve de forma dinámica o se determina en tiempo de ejecución
no entra en ese modelo. Lo percibo bien en mis propios proyectos: en mi
arquitectura se utiliza enlace tardío e inyección de dependencias a
través del constructor, implementado en la biblioteca
[@teqfw/di](https://github.com/teqfw/di). Las importaciones estáticas se
usan de forma mínima: en la práctica solo para cargar la biblioteca DI,
mientras que el enlace posterior de módulos se hace mediante
importaciones dinámicas y queda fuera del análisis de `tsserver`.

## TypeScript como modelo de análisis para JavaScript

El comportamiento de VSCode en archivos JavaScript coincide en gran
medida con su comportamiento en TypeScript. Esto se refleja en
advertencias idénticas, reglas de navegación y principios para construir
sugerencias. Esa similitud es natural: JavaScript en VSCode se analiza a
través del mismo modelo de tipos que sustenta TypeScript.

En primer lugar se analizan con seguridad las construcciones que se
pueden reducir de forma fácil y unívoca al modelo de TypeScript. Entre
ellas están las clases y funciones con firmas explícitas, los literales
de objetos con estructura fija y las dependencias expresadas mediante
importaciones estáticas. En esos casos el analizador puede construir un
modelo estable del código, proporcionar navegación y ofrecer información
de tipos sin anotaciones adicionales.

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

En este ejemplo la forma del código encaja bien en el modelo TypeScript:
se ven las entidades exportadas, la estructura de la clase, las firmas
de los métodos y los valores devueltos. En VSCode esto se expresa en una
navegación estable por símbolos, sugerencias de tipos para los
parámetros y autocompletado correcto al usar la API.

La situación cambia cuando JavaScript empieza a usar sus capacidades
dinámicas. El enlace tardío, las fábricas, las dependencias calculadas y
los contratos de comportamiento no tienen una representación directa en
el modelo de tipos TypeScript. En esos casos el análisis se apoya en
heurísticas o se detiene en la forma sintáctica, sin llegar a la
estructura real de interacción.

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

// uso
const container = createContainer(loadModule);
const service = container.get("userService");
```

Aquí una parte significativa de la arquitectura se forma en tiempo de
ejecución: las dependencias concretas, sus tipos y sus relaciones se
determinan de forma dinámica. Para el analizador esto permanece opaco,
porque esas construcciones no se reducen a un modelo de tipos estático.
Como resultado, VSCode ve solo la forma de los objetos y las llamadas:
las sugerencias de tipos se vuelven genéricas y la navegación por los
contratos reales entre partes del sistema queda limitada.

En conjunto, esto lleva a que en VSCode no exista un modo separado de
análisis de "JavaScript puro". Existe un modelo único basado en
TypeScript, y el código JavaScript se analiza solo en la medida en que
pueda reducirse a ese modelo. Todo lo que queda fuera es parcialmente
visible o queda totalmente excluido del análisis.

## Los contratos como base para entender el código

En VSCode, el análisis de JavaScript se apoya en el contrato público de
una biblioteca. Para `tsserver`, las descripciones declarativas del API
fijan el límite entre el módulo y su uso, determinando qué información
se incluye en el modelo de análisis del proyecto consumidor. El código
fuente de la dependencia se utiliza sobre todo para navegación y no
participa en la construcción del modelo de tipos.

Ese contrato lo cumplen los archivos de declaraciones `.d.ts`. En ellos
se describen las entidades exportadas y sus firmas, y es en ese formato
como la información de la biblioteca se incorpora al análisis. La
presencia de la implementación en `node_modules`, incluido el código
JavaScript con anotaciones JSDoc, no afecta a la formación del modelo de
tipos del proyecto externo.

La conexión del contrato público se realiza a través de `package.json`.
Para el analizador es importante qué archivo se declara como punto de
entrada de la información de tipos del paquete.

``` json
{
  "name": "@teqfw/di",
  "version": "x.y.z",
  "main": "src/index.js",
  "types": "types.d.ts"
}
```

El campo `types` indica a `tsserver` qué archivo debe utilizar como
contrato público de la biblioteca. La información de tipos fuera de ese
archivo permanece como parte de la implementación interna y no se toma
en cuenta al analizar un proyecto externo.

Dentro de las declaraciones suelen distinguirse dos niveles de
descripciones de tipos. El primer nivel se aplica durante el desarrollo
de la biblioteca y refleja su estructura interna: tipos auxiliares,
detalles de implementación y acuerdos de servicio. Estos tipos
permanecen locales al módulo y se usan dentro del proyecto.

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

El segundo nivel forma el contrato externo de la biblioteca: el conjunto
de tipos y firmas disponible para los consumidores y usado por
`tsserver` al analizar un proyecto de terceros.

``` ts
// index.d.ts

declare global {
  type TeqFw_Di_Api_Container_Parser = import("./src/Api/Container/Parser.js").default;
}

export {};
```

Esta separación corresponde al modelo de análisis de `tsserver`, en el
que se distinguen los tipos usados para el desarrollo interno del
paquete y los tipos que definen su contrato externo. El proyecto
consumidor trabaja solo con los tipos explícitamente incluidos en la
capa pública, independientemente de la disponibilidad del código fuente
de la biblioteca.

JSDoc en este esquema se utiliza dentro del mismo modelo de tipos. En el
análisis orientado a TypeScript se consideran únicamente las anotaciones
que se proyectan de forma inequívoca al modelo de tipos. Ayudan a
mejorar la navegación y el autocompletado al desarrollar la biblioteca,
pero no amplían el contrato público para el análisis externo.

Como resultado, la comprensión del código en VSCode se construye
alrededor de contratos descritos de forma explícita. Esto convierte a
los archivos `.d.ts` en el elemento clave del análisis de tipos en
proyectos JavaScript y define el rol de JSDoc como una herramienta
auxiliar de documentación dentro del modelo `tsserver` elegido.

## Conclusión

El comportamiento de JavaScript en VSCode está determinado por la
arquitectura y la lógica de producto del ecosistema en el que el editor
evoluciona. VSCode y TypeScript se diseñan y evolucionan como
herramientas interconectadas, por lo que el análisis de JavaScript está
integrado en el instrumental de TypeScript y se apoya en su modelo de
tipos, reglas de interpretación y prioridades de desarrollo.

Para un ecosistema así, la apuesta por TypeScript parece natural. Un
modelo formal de análisis único, un único language server y un conjunto
de herramientas coordinado permiten un comportamiento predecible del
IDE, un DX estable y escalabilidad a nivel de toda la plataforma. En
esta configuración, JavaScript se considera como un código que puede
analizarse a través del modelo TypeScript en distintos grados, según
cuánto su estructura y anotaciones encajen en ese modelo.

El soporte de JSDoc en VSCode se construye en la misma lógica. Las
anotaciones se usan como fuente de información de tipos si se proyectan
de forma inequívoca en el modelo TypeScript. Los aspectos semánticos,
descriptivos y de comportamiento de JSDoc quedan fuera del análisis
porque no se incluyen en la proyección formal de tipos con la que
trabaja `tsserver`. Esta situación es consecuencia del modelo de
análisis elegido y no de la calidad o expresividad de JSDoc.

El desarrollo de una combinación completa ES6 + JSDoc como base
independiente para el análisis de JavaScript no está entre las
prioridades estratégicas de Microsoft. Mantener un único modelo de
análisis en torno a TypeScript simplifica la evolución de las
herramientas y reduce la fragmentación del ecosistema. Como resultado,
JSDoc permanece como un mecanismo auxiliar que complementa el modelo
TypeScript, pero no forma una dirección de desarrollo independiente.

En definitiva, JavaScript en VSCode se percibe y se analiza a través del
prisma del instrumental de TypeScript. Esto fija límites claros de lo
posible y explica el comportamiento observado del IDE. Comprender estos
límites permite trabajar con la herramienta de manera más consciente,
apoyándose en sus supuestos arquitectónicos reales y en la lógica del
ecosistema.
