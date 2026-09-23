---
title: "Declaración de (No)Dependencias para ESM"
date: 2026-02-25
---

<zoom-img src="https://habrastorage.org/r/w1560/getpro/habr/upload_files/e70/f5f/89c/e70f5f89c3ce225e396777a85357c14e.png" alt="Declaración de (No)Dependencias para ESM" width="100px" style="float: left; margin: 15px 15px 0 0;"></zoom-img>

Mi nombre es Alex Gusev y hoy voy a contar cómo ChatGPT me convenció de
reescribir la biblioteca **@teqfw/di**, que llevo cultivando con cuidado
desde 2019, y por qué al final acepté.

Esta biblioteca JS me permite usar enlace tardío en mis aplicaciones web
y escribir código isomórfico que funciona sin cambios en el navegador y
en el backend. Sin transpilar el código fuente, sin registrar
dependencias a mano, tal como estaba acostumbrado a hacerlo en Java y
PHP. Durante casi siete años revisé manualmente cada línea de esta
biblioteca, y la semana pasada la dejé en manos de un agente Codex. Esto
fue lo que hizo con ella.

KDPV basada en la canción "Dva korablya" de Agata Kristi.

Lo que tenía

Tenía una biblioteca que permitía prescindir de importaciones estáticas
en el código de aplicación (enlace temprano) y aplicaba el principio de
Inversion of Control mediante inyección de dependencias en el
constructor (enlace tardío). Mi código de aplicación típico se veía así:

``` js
export default class Namespace_Package_Module_Component {
    constructor({
        Namespace_Package_Module_Dep1: dep1,
        Namespace_Package_Module_Dep2: dep2,
    }) { ... }
}
```

Mi contenedor de objetos (después de la configuración, claro está)
analizaba las claves del objeto pasado al constructor y creaba por
nombre de clave las dependencias que el constructor necesitaba (tengo
muchos artículos sobre este tema, donde se describe en detalle toda la
mecánica).

Si era necesario, a las dependencias se les podían añadir bibliotecas
del propio nodejs o paquetes de ./node_mpdules/ (usando el prefijo node:
en el nombre de la clave). En resumen, al final las importaciones
estáticas solo quedaban en composition root (bootstrap) y en @teqfw/di.

## Tiempos de cambio

El problema llegó de donde no se esperaba - de los agentes LLM. En el
sector IT se ha consolidado una idea pública de que los agentes LLM
deben ayudar a crear código. Que están entrenados con toneladas de
ejemplos y superan no solo a los juniors, sino también a los mid-level.
¡Lo único que hace falta es un prompt claro!

Bueno, yo no podía quedarme al margen de esa ola - lo probé (una vez,
dos, tres). Sí, efectivamente, los agentes (al menos Codex) pueden crear
código si se les dan instrucciones claras. Escriben código horrible
(desde mi punto de vista), pero funciona. Y lo más importante: lo hacen
rápido. Muy rápido. Casi tan rápido como decir "pastel de arándanos".

Sí, tengo un estilo algo peculiar de enlazar archivos JS, un estilo
específico de formatear módulos ES6 y de usar anotaciones JSDoc. Pero
todo eso se resolvía con documentación normal. Los agentes son
disciplinados, por más que se diga de su naturaleza estocástica.

Naturalmente, no podía evitar confiar a los agentes el desarrollo de mi
paquete más básico - @teqfw/di. Y la semana pasada lo hice.

## Lo que obtuvo el agente

GPT y yo pasamos toda la semana escribiendo el cuerpo de documentación
según mi propia metodología ADSM (también tengo publicaciones sobre
eso). Íbamos de nivel en nivel, alineando descripciones, terminología,
funcionalidad, arquitectura, convenciones, etc. Yo ya lo sabía todo,
claro, pero había que dejarlo por escrito en una documentación
contextual que los agentes pudieran usar para escribir código (o más
bien, reescribirlo).

Con los agentes hubo entendimiento total, bajo mi presión cuidadosa,
hasta el momento mismo de generar el código de la biblioteca. Decidí
cambiar un poco la gramática de codificación de dependencias para poder
obligar a tsserver en vscode a entender el código generado mediante
anotaciones JSDoc. Había un par de detalles desagradables en mi
gramática actual que chocaban con JSDoc.

Así que le di un poco de libertad al agente en este punto. El agente
propuso: a partir de ahora, en el código de aplicación describirás las
dependencias así:

``` js
export const __deps__ = {
    default: {
        dep1: 'Namespace_Package_Module_Dep1',
        dep2: 'Namespace_Package_Module_Dep2',
    },
};
export default class Namespace_Package_Module_Component {
    constructor({ dep1, dep2 }) { }
}
```

“¡Uf! — le digo. — ¡Genial! ¿Y por qué así? ¡Eso duplica los lugares
donde se describen las dependencias! Y si además añades una anotación
@typedef de JSDoc, sería todavía más!”

Y él me responde: “A mí me resulta más cómodo. Me da igual si son uno,
dos o tres lugares, siempre que sigan una plantilla. Su DRY me da lo
mismo, sobre todo si todo está en un solo archivo y no hay que ir a
ningún sitio.”

Y empezó a insistir con argumentos del tipo: tu forma de ensamblar
dependencias solo funciona de forma recursiva (¡como si yo no lo
supiera!), al crear el objeto mediante el contenedor, mientras que mi
forma (es decir, la suya) permite analizar todo el árbol de dependencias
sin crear objetos (bueno, argumento, no lo discuto).

## Resumen

¿Sabes cuál fue el argumento de hierro del agente? ¡La práctica! No solo
construyó en un par de iteraciones código en la biblioteca (código
horrible, repito, pero funcional!), que introduce (ya según su esquema)
en JS enlace tardío sin transpilar y sin registro manual de dependencias
en el contenedor (¡su contenedor!). Además, en una sola iteración (2-3
minutos) migró mi último proyecto del viejo esquema de declaración de
dependencias (el mío) al nuevo (el suyo).

Creamos reglas de desarrollo de software para personas, y ahora hay que
reescribir esas reglas para agentes. Y a los agentes DRY les da igual,
así es. Ellos necesitan claridad:

``` js
export const __deps__ = {
    configManager: 'Ttp_Back_Configuration_Manager$',
    storage: 'Ttp_Back_Storage_Repository$',
    aggregateFactory: 'Ttp_Back_Aggregate_Factory$',
    telegramReader: 'Ttp_Back_External_TelegramReader$',
    telegramPublisher: 'Ttp_Back_External_TelegramPublisher$',
    llmTranslator: 'Ttp_Back_External_LlmTranslator$',
    promptProvider: 'Ttp_Back_Prompt_Provider$',
    logger: 'Ttp_Back_Logger$',
};
```

Y eso es todo. Sin moraleja.
