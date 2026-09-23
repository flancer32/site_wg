---
title: "Hablar cuesta poco. El código también"
date: 2026-04-15
---

<zoom-img src="/img/blog/2026/20260416-01-cost-of-ai-code.png"
        alt="Hablar cuesta poco. El código también" width="100px"></zoom-img>

Hoy la conocida frase de Linus Torvalds "Talk is cheap. Show me the
code." puede reformularse como "Code is cheap. Show me the spec." En
este texto explico por qué pienso así.

Tengo varios artículos en Habr unidos por una misma idea: ADSM (Agent
Driven Software Management). En la práctica, es mi intento de convertir
mi experiencia personal con Spec-Driven Development (SDD) en algo
parecido a una metodología. En este artículo comparto los resultados de
aplicar ese enfoque SDD, en su versión ADSM, al desarrollo de una
aplicación sencilla: un ayudante para crear listas de reproducción de
Spotify
(<a href="https://www.npmjs.com/package/@flancer32/spotify-playlist"
target="_blank" rel="noopener">@flancer32/spotify-playlist</a>). También
muestro qué ocurre cuando el mismo agente (Codex, GPT-5.4) regenera
código a partir del mismo contexto con distintos niveles de
razonamiento: alto, medio y bajo.

## Antecedentes

Para uno de los eventos familiares necesitábamos una lista de
reproducción de unas cuatro o cinco horas para un tema concreto. ChatGPT
resolvió bien la tarea y generó una lista de 100 temas con sus títulos y
autores. El siguiente paso era convertir esa lista en una lista de
reproducción de Spotify. Antes lo hacíamos manualmente y llevaba
bastante tiempo, pero hoy este tipo de tareas se automatizan con
facilidad mediante agentes de IA.

Otra persona quizá habría hecho una aplicación similar en media hora, o
incluso en diez minutos. Yo no programo por impulso; trabajo con SDD.
Por eso la primera versión de la aplicación me llevó unas dos horas de
trabajo concentrado.

## Historia

Antes de empezar este proyecto, no tenía experiencia real integrando
Spotify con aplicaciones externas. ChatGPT me señaló
<a href="https://developer.spotify.com/" target="_blank"
rel="noopener">developer.spotify.com</a> y me explicó qué había que
registrar para crear mi propia aplicación.

Resultó que la autenticación de Spotify usa OAuth, y eso exige un
dominio y un certificado TLS. Ya tenía dominio, y el certificado se
obtiene con Let's Encrypt. Llevo mucho tiempo programando solo en
JavaScript, así que la elección del lenguaje era obvia. Y la de la
plataforma también: TeqFW y punto.

Creé un repositorio privado en GitHub y lo cloné en local. Después añadí
al contexto `(./ctx/spec/)` el código tipo para aplicaciones Node.js
basado en mi biblioteca `@teqfw/di`. Durante algo más de una hora estuve
hablando con el agente Codex en VSCode sobre los detalles de la
implementación: cómo arrancar, cómo configurar, qué dependencias usar.
El agente fue dejando todo eso en el contexto del proyecto
`(./ctx/docs/)`. Luego le pedí crear `./package.json`, el archivo de
arranque `./bin/cli.mjs` y el archivo principal `./src/Main.mjs`.
Después le pedí dos iteraciones: 1) pruebas de integración y código para
obtener y guardar el token de autenticación mediante el servidor web; 2)
carga y análisis de un archivo de texto con temas musicales, búsqueda de
temas en Spotify y creación de la lista de reproducción, también con
pruebas de integración y código fuente. Verifiqué el formato de los
módulos ES6 con <a
href="https://www.npmjs.com/package/@flancer32/skill-teqfw-esm-validator"
target="_blank" rel="noopener">teq-esm-validator</a>.

Fui comprobando la aplicación por partes: la base, la obtención del
token, el análisis del archivo y la búsqueda de temas, la creación de la
lista de reproducción y la inserción de las pistas encontradas. En algo
más de dos horas de tiempo concentrado, la aplicación creó una nueva
lista de reproducción de Spotify con más de 80 temas. El resto de los
temas de la lista no se encontraron en Spotify.

## Consecuencias

A menudo veo en los comentarios de Habr la idea de que los agentes LLM
no sirven para desarrollo porque no ofrecen resultados deterministas.
Para mí, programar sigue siendo en parte un arte. Si Leonardo da Vinci
hubiera pintado la Mona Lisa diez veces, habría obtenido diez cuadros
distintos representando a la misma mujer. Si cualquier programador
implementa diez veces una aplicación suficientemente compleja, obtendrá
diez aplicaciones distintas con el mismo comportamiento previsto.

"resultado determinista" != "código determinista"

Para demostrarlo, publiqué el código original generado por el agente
Codex (GPT-5.4, razonamiento alto) como versión 1.0.0. Publiqué solo el
código; el contexto lo retiré a propósito. Luego le pedí a Codex
(GPT-5.4, razonamiento medio) que borrara `./src/` y `./test/` y
regenerara desde cero las pruebas y el código fuente usando el mismo
contexto sin cambios de `./ctx/` (para simplificar, conservé
`package.json` y el archivo de arranque). Eso produjo la versión 2.0.0.
Repetí el mismo proceso con GPT-5.4 en razonamiento bajo y obtuve la
versión 3.0.0.

## Prompt para regenerar el código fuente

Aquí está el resumen del código fuente generado por el agente:

    Versión    Archivos en src   Carpetas en src   Líneas totales   Código   Comentarios   Blancas
    1.0.0      23                9                 1546             983      404           159
    2.0.0      18                10                1436             844      462           130
    3.0.0      20                10                993              665      274           54

Puedes seguir los enlaces y revisar el código resultante: no es
idéntico. Cualquiera de las tres versiones se puede instalar, obtener el
token de autenticación de Spotify y crear listas de reproducción -
<a href="https://www.npmjs.com/package/@flancer32/spotify-playlist"
target="_blank" rel="noopener">@flancer32/spotify-playlist</a> funciona
igual.

## Notas

Llevo meses construyendo las especificaciones de mi estilo de desarrollo
`(./ctx/spec/code/platform/teqfw/)` y todavía sigo evolucionando esa
documentación. Pero forma parte del contexto reutilizado en todos mis
proyectos. Me llevó un par de horas describir el producto en sí,
escribiendo los documentos en `./ctx/docs/`. Generar las pruebas y el
código de cada versión le tomó al agente unos diez minutos. Y,
curiosamente, independientemente del nivel de razonamiento, cada
generación consumió aproximadamente un 4% de mi cuota semanal de ChatGPT
Plus.

Las tres versiones tropezaron con la creación de la lista de
reproducción en Spotify. Pasaban la prueba en seco y localizaban los
temas, pero al añadirlos a la lista el agente usó las tres veces una API
obsoleta y tuve que señalar el error una y otra vez. Si no hubiera
intentado mantener el experimento bastante limpio, habría añadido al
contexto una indicación para usar la nueva API de Spotify, pero quise
hacer la generación sobre el mismo contexto. Así que, además del
comportamiento funcional determinista resultante, también apareció el
determinismo de los errores de lectura del contexto por parte del
agente.

La tercera versión, hecha por el agente con razonamiento bajo, no logró
mantener en marcha el servidor web. Más exactamente, sí arrancó el
servidor, pero la aplicación lo cerró enseguida sin esperar el token de
autenticación de Spotify. En las versiones con razonamiento alto y medio
ese problema no apareció.

Para visualizar la relación entre el volumen de los documentos del
contexto y el código generado:

    Archivos en ctx   53
    Carpetas en ctx   27
    Líneas totales    5378
    Blancas           1869

En bytes, el desglose es este:

    Archivos en ctx      152Kb
    src v1 (high)        48Kb
    src v2 (medium)      42Kb
    src v3 (low)         36Kb

Sí, esa es mi postura deliberada: los documentos de contexto deben
ocupar varias veces más que el código resultante.

## Skills

Los skills merecen una mención aparte. Mi plataforma usa vinculación
tardía de los archivos fuente en tiempo de ejecución. Todas las
dependencias se inyectan por constructor, lo que significa que en ningún
archivo de `./src/` hay imports estáticos. Ninguno. Es una forma
bastante poco convencional de escribir JavaScript, y los agentes suelen
llevarse muy mal con eso.

Cuando me encontré con la insistencia de los agentes en crear código
clásico con imports estáticos, tuve que crear mi propio skill - <a
href="https://www.npmjs.com/package/@flancer32/skill-teqfw-esm-validator"
target="_blank" rel="noopener"><code>teqesm-validator</code></a>. El
agente Codex también creó ese skill con la misma metodología ADSM. Una
vez que pude mencionar ese skill en la instrucción para validar el
código fuente, el problema de enlazado se redujo muchísimo. Al menos en
este proyecto de la lista de reproducción de Spotify no volvió a
aparecer.

## Conclusión

Comparo el comportamiento de los agentes LLM al generar código con el
agua de lluvia que, siguiendo la forma del terreno, se recoge en hilos,
arroyos, ríos y acaba dirigiéndose al océano. El agente genera código
del mismo modo: sigue el camino de menor resistencia. En esa analogía,
los documentos de contexto actúan como presas y canales, mientras que
los skills y las pruebas son las bombas que elevan el agua a otro nivel.
Desde ahí puede volver a fluir hacia abajo, pero por otro camino.

El coste principal de este enfoque es la infraestructura: esas presas,
canales y compuertas. Pero una vez creada esa infraestructura, el agua
suele acabar donde los constructores querían. Para mí, el código no es
el artefacto final, sino uno derivado: el resultado de la interacción
entre el contexto cognitivo y el agente.

Por eso considero que el contexto del proyecto (esos 53 archivos en
`./ctx/`) es más importante que el código mismo (18-23 archivos en
`./src/`). Cuando tienes el contexto, el agente te genera el código que
necesitas en minutos. Incluso algo tan exótico como TeqFW.

Puedes revisar libremente el código de las tres versiones: es barato.
Pero si quieres ver el contexto del proyecto, escríbeme. Compartiré el
contexto gratis a cambio de comentarios sobre si este enfoque podría ser
útil en tus proyectos.

P. D. Y un poco de belleza. Los agentes de IA gestionan sin problema el
boilerplate y hacen innecesarias muchas dependencias en
`./node_modules/`:

No les cuesta nada fijar una API web en el código y rehacer esa parte
cuando la API cambia. En mi aplicación solo hay dos dependencias en
tiempo de ejecución (mis propias bibliotecas) y otras dos dependencias
para el modo de desarrollo (resolución de tipos de Node.js).
