---
title: "Cómo convertir la intención del usuario en una evolución controlada del producto"
date: 2026-05-19
---

*Los agentes de IA no deben sustituir a la persona responsable del
producto. Pero sí pueden ayudarle a abrir canales controlados a través
de los cuales la intención del usuario se convierte en cambio real.*

Normalmente una petición de un usuario se trata solo como comentario.
Alguien informa de un fallo, pide una pequeña mejora, describe una
función que falta o señala que el producto no se comporta como esperaba.

En un proceso de desarrollo apoyado en agentes, esa petición puede
convertirse en algo más: el inicio de un cambio controlado en el
producto.

Eso no significa que los usuarios deban gobernar el producto de forma
directa. Tampoco significa que cualquier petición tenga que
transformarse automáticamente en código. La propuesta es bastante más
prudente.

La persona responsable del producto puede definir de antemano qué tipos
de cambios están permitidos. Dentro de esos límites, los agentes de IA
pueden actuar con autoridad restringida. Fuera de ellos, la solicitud
sigue el camino habitual de revisión humana.

Eso obliga a pensar el desarrollo del producto de otra manera.

*Nota: las etiquetas de los esquemas se mantienen en inglés para
conservar la misma versión visual en las tres traducciones. El texto
explica la lógica de cada esquema.*

<zoom-img
                src="/img/library/concepts/20260519-controlled-product-evolution/01-common-scheme.png"
                alt="Camino controlado desde la intención del usuario hasta el cambio del producto"
                width="100%"
        ></zoom-img>

*Figura 1. Camino controlado desde la intención del usuario hasta el
cambio del producto.*

En este modelo, el usuario deja de ser una fuente pasiva de comentarios.
El agente deja de ser solo una herramienta que escribe código. Y la
persona responsable del producto conserva el control al fijar reglas,
límites y puntos de revisión.

------------------------------------------------------------------------

## 1. La intención del usuario es una fuente de cambio poco aprovechada

Todo producto cambia porque alguien quiere que cambie.

Un usuario detecta un fallo. Un cliente necesita una función que falta.
Una persona de QA ve un comportamiento confuso. Un desarrollador nota
que la documentación ya no refleja el estado real del sistema. Todo eso
no es ruido: son señales de por dónde podría evolucionar el producto.

Hoy, la mayoría de esas señales recorren un camino largo y manual.

El usuario envía un comentario, abre una incidencia o crea una tarea.
Luego alguien del equipo la lee, la interpreta, decide si importa, la
convierte en trabajo concreto, la pasa a desarrollo, espera la
implementación, revisa el resultado y finalmente lo acepta o lo
descarta.

Ese proceso funciona, pero es lento. Muchos cambios pequeños y útiles
nunca llegan al producto. No siempre se rechazan de forma explícita: a
menudo se posponen, se olvidan, pierden prioridad o se diluyen entre el
trabajo diario.

Los agentes de IA pueden acortar ese camino.

Si un agente puede leer una tarea, inspeccionar un repositorio,
modificar archivos, ejecutar comprobaciones y preparar una propuesta de
cambio, algunas peticiones ya no necesitan esperar todo el ciclo manual.
Pueden entrar en un proceso controlado en el que el agente asume la
parte rutinaria.

La palabra importante aquí es **controlado**.

La idea no es que el usuario cambie el producto directamente. La idea es
construir un canal fiable por el que la intención del usuario pueda
convertirse en cambio cuando la persona responsable del producto ya haya
permitido ese tipo de actuación.

## 2. La persona responsable del producto no debe perder el control

Un producto no es solo una lista de funciones. Tiene dirección, límites,
arquitectura, criterios de seguridad, principios de experiencia de uso,
objetivos de negocio y una larga serie de compromisos que no se ven
desde una sola petición.

Los usuarios suelen detectar problemas reales, pero no tienen por qué
ver el producto en su conjunto.

Una solicitud puede mejorar un caso y empeorar otro. Un cambio pequeño
puede romper una regla arquitectónica. Una buena idea puede chocar con
la estrategia del producto. Y una petición razonable puede no ser,
sencillamente, el siguiente paso adecuado.

Por eso no toda petición del usuario debe terminar en código.

> La lectura insegura de esta idea sería la siguiente: un usuario crea
> una tarea y un agente de IA cambia el producto automáticamente.

Pero eso no es lo que se propone aquí. El modelo más seguro es otro:

> El usuario crea una tarea. El proceso comprueba si esa petición
> pertenece a un ámbito en el que la persona responsable del producto ya
> ha autorizado la intervención del agente. Si la respuesta es sí, el
> agente puede procesarla. Si no, la petición sigue el circuito normal
> de revisión humana.

<zoom-img
                src="/img/library/concepts/20260519-controlled-product-evolution/02-basic-paths.png"
                alt="Rutas posibles de una solicitud tras comprobar los límites"
                width="100%"
        ></zoom-img>

*Figura 2. Rutas posibles de una solicitud tras comprobar los límites.*

La diferencia es fundamental.

Delegar no significa renunciar al control. Significa decidir de antemano
qué puede resolver el agente por sí mismo y qué debe escalarse a una
persona.

La responsabilidad sobre el producto sigue donde estaba. Los agentes de
IA no la eliminan. Lo que hacen es permitir delegar parte del trabajo
operativo.

## 3. Rutas de cambio previamente autorizadas

Para que los agentes sean útiles y seguros, la persona responsable del
producto tiene que definir rutas de cambio autorizadas.

> Los cambios de este tipo están permitidos si se mantienen dentro de
> estos límites y superan estas comprobaciones.

Por ejemplo: corregir fallos evidentes, mejorar documentación, añadir
pruebas que faltan, resolver pequeños problemas de interfaz, actualizar
ejemplos o implementar comportamientos que ya estén descritos en la
especificación del producto.

Eso no significa que todo vaya a integrarse automáticamente. Significa
que, dentro de ese marco, el agente puede empezar a trabajar sin pedir
una decisión separada en cada ocasión.

Esos límites deben ser lo bastante claros como para que el agente pueda
actuar de verdad dentro de ellos.

Una ruta autorizada puede definir qué tipo de peticiones son admisibles,
qué archivos o módulos pueden tocarse, qué comportamientos no deben
alterarse, qué documentos del producto deben seguirse, qué
comprobaciones deben pasar, qué evidencias deben quedar registradas y en
qué momento el agente tiene que detenerse y pedir una decisión humana.

Es ahí donde la documentación deja de ser una simple descripción pasiva
del producto. Se convierte en una herramienta práctica de gobierno.

Cuanto mejor esté descrito el producto, más seguro resulta delegar
trabajo en agentes.

Sin límites claros, la autonomía del agente es arriesgada. Con límites
claros, se convierte en una herramienta útil.

## 4. Los agentes de IA como intermediarios delegados

En este modelo, un agente de IA no es solo un asistente de programación.

Actúa como un intermediario delegado entre los usuarios y la persona
responsable del producto.

El usuario expresa una intención. La persona responsable del producto
fija los límites. El agente trabaja entre ambos: lee la petición, la
contrasta con el contexto del producto y decide qué camino debe seguir.

<zoom-img
                src="/img/library/concepts/20260519-controlled-product-evolution/03-roles.png"
                alt="El agente como intermediario delegado"
                width="100%"
        ></zoom-img>

*Figura 3. El agente como intermediario delegado.*

Si la petición encaja dentro de los límites autorizados, el agente puede
analizarla, preparar un plan, cambiar el código, abrir un *pull
request*, es decir, una propuesta de integración de cambios, y dejar
constancia de lo que ha hecho.

Si la petición es ambigua, arriesgada o toca los límites del producto,
el agente no debe improvisar. Debe pararse, resumir la situación y pedir
una decisión a la persona responsable del producto.

Y si la solicitud contradice claramente el rumbo del producto, el agente
debe rechazarla o dejarla marcada para discusión.

Eso define bien su papel: no sirve al usuario de forma ciega ni
sustituye a la persona responsable del producto. Es un intermediario
delegado con autoridad limitada, autorizado a actuar solo donde las
reglas ya están marcadas de antemano.

Ahí está el giro importante.

El papel creativo del usuario se vuelve más activo, pero solo a través
de un canal controlado. El usuario puede iniciar un cambio. El agente
puede tramitar los cambios permitidos. Y la persona responsable del
producto conserva el control mediante límites, evidencias y revisión.

## 5. El flujo de trabajo basado en eventos como modelo de ejecución

Para que todo esto sea algo más que una buena idea, el trabajo del
agente no puede depender solo de conversaciones manuales en un chat.

El chat sirve para hablar, explorar y pensar. Pero cambiar un producto
exige algo más estable: un proceso que pueda observarse, repetirse,
verificarse y, si hace falta, revisarse después paso a paso.

Los repositorios de software ya ofrecen una base muy buena para eso.

Un usuario crea una tarea. Se le asigna una etiqueta. Aparece un
comentario. Se abre un *pull request*. Se publica una revisión.
Finalmente, los cambios se integran. Cada una de esas acciones puede
generar un evento.

Un flujo de trabajo basado en eventos utiliza precisamente esos eventos
para mover la tarea por un proceso controlado. La tarea recoge la
intención del usuario. El evento en el repositorio pone en marcha el
proceso. El motor del flujo revisa las reglas y decide el siguiente
paso. Si la petición está permitida, se lanza un agente en un entorno de
trabajo restringido. El agente hace su parte y devuelve el resultado al
repositorio.

<zoom-img
                src="/img/library/concepts/20260519-controlled-product-evolution/04-parts.png"
                alt="Arquitectura de un flujo de trabajo basado en eventos para agentes"
                width="100%"
        ></zoom-img>

*Figura 4. Arquitectura de un flujo de trabajo basado en eventos para
agentes. La idea principal es sencilla: un evento en el repositorio pone
en marcha un proceso controlado, el agente actúa dentro de límites
predefinidos y el resultado vuelve al repositorio con trazabilidad.*

El resultado puede ser un *pull request*, un comentario, una etiqueta,
un resultado de validación o cualquier otro rastro visible del trabajo
realizado.

Eso no se parece a escribir en una ventana de chat: “arréglalo”.

En un flujo de trabajo así, el agente no actúa aislado. Forma parte de
un proceso. Ese proceso puede incluir la admisión de la tarea, la
planificación, la implementación, la validación, la revisión humana, la
integración de cambios y el cierre.

Cada paso tiene sentido. Cada transición puede comprobarse. Cada
decisión puede quedar registrada.

Así es como la delegación se convierte en una práctica de ingeniería y
deja de ser una idea bonita pero difusa.

## 6. La evidencia hace que la autonomía sea verificable

La autonomía de un agente solo es aceptable si sus acciones siguen
siendo visibles.

Si un agente de IA modifica un producto, la persona responsable del
producto debería poder responder preguntas básicas:

- ¿Por qué se puso en marcha el agente?
- ¿Qué petición del usuario activó el trabajo?
- ¿Qué reglas permitieron que el agente siguiera adelante?
- ¿Qué archivos cambió?
- ¿Qué resultado produjo?
- ¿Qué comprobaciones se realizaron?
- ¿Quién aceptó o rechazó el cambio final?

Por eso la evidencia importa tanto.

La tarea registra la petición original. La etiqueta puede mostrar el
estado actual. Un comentario puede explicar la decisión del agente. El
*pull request* muestra el cambio real en el código. El resultado de
validación muestra si las comprobaciones pasaron. Y la revisión humana
deja constancia de la aceptación o del rechazo.

Sin esa traza, cuesta confiar en el trabajo del agente.

Con esa traza, la persona responsable del producto puede dejar que los
agentes actúen con más libertad dentro de los límites autorizados,
porque cada acción importante sigue siendo visible y revisable.

Eso le evita tener que ejecutar manualmente cada tarea pequeña. Pero no
le quita la capacidad de inspeccionar el proceso, cambiar las reglas,
detener comportamientos inseguros y decidir qué entra realmente en el
producto.

> Los agentes solo pueden actuar con autonomía en la medida en que sus
> acciones sean observables, estén acotadas y puedan revisarse.

La función del flujo de trabajo no es solo automatizar tareas. También
es hacer que el trabajo delegado sea comprobable y responsable.

## 7. ADSM y github-flows: de la idea a un sistema real

Para que este enfoque funcione hacen falta dos capas.

La primera es metodológica. La persona responsable del producto tiene
que describir el producto, sus límites, su arquitectura, los cambios
permitidos y las reglas de validación. Sin esa base, los agentes no
tienen suelo firme sobre el que tomar decisiones autónomas.

Ese es el papel de
<a href="https://teqfw.com/method" target="_blank" rel="noopener">ADSM
(Agent Driven Software Management)</a>.

ADSM entiende la documentación como la fuente de verdad para el
desarrollo asistido por agentes. No es solo un texto para que lo lean
personas. Es el contexto de trabajo del agente: ahí se define qué es el
producto, hacia dónde puede evolucionar y dónde están los límites de los
cambios autónomos.

La segunda capa es técnica. El proceso tiene que poder ejecutarse.

Ahí entra <a href="https://www.npmjs.com/package/@teqfw/github-flows"
target="_blank" rel="noopener">@teqfw/github-flows</a>.

<a href="https://www.npmjs.com/package/@teqfw/github-flows"
target="_blank" rel="noopener">@teqfw/github-flows</a> es la capa
técnica de esta idea. Conecta los eventos de GitHub con el trabajo de
los agentes: reacciona a lo que ocurre en el repositorio, comprueba las
reglas del proceso, lanza agentes de línea de comandos en entornos
aislados basados en Docker y devuelve el resultado al repositorio
mediante tareas, *pull request*, etiquetas, comentarios y evidencias.

Para los experimentos prácticos utilizo también
<a href="https://github.com/flancer32/github-flows-app" target="_blank"
rel="noopener">github-flows-app</a>, una aplicación sencilla que
envuelve ese mecanismo y facilita su ejecución.

Lo importante para esta publicación no es la arquitectura interna de la
herramienta, sino el hecho de que el modelo ya es ejecutable en la
práctica.

Ahora mismo utilizo este enfoque en un repositorio real de GitHub:
[viktor-gusev/dnd-game-master](https://github.com/viktor-gusev/dnd-game-master/issues?q=is%3Aissue%20state%3Aclosed).
Las incidencias
[\#17](https://github.com/viktor-gusev/dnd-game-master/issues/17),
[\#19](https://github.com/viktor-gusev/dnd-game-master/issues/19) y
[\#21](https://github.com/viktor-gusev/dnd-game-master/issues/21) fueron
procesadas por agentes dentro de este esquema.

Sigue siendo un experimento, sí. Pero ya es más que una idea: es un
sistema ejecutable que conecta intención del usuario, eventos del
repositorio, agentes delegados, cambios de código, validación y cierre
de tareas.

La implementación concreta se apoya en GitHub, agentes de línea de
comandos y Docker. Pero el modelo general va bastante más allá de esas
herramientas.

Los agentes de IA no son importantes solo porque puedan escribir código.
Se vuelven mucho más relevantes cuando pueden actuar como intermediarios
controlados entre los usuarios y la persona responsable del producto.

Pueden ayudar a convertir la creatividad del usuario en evolución del
producto. Pero solo si la persona responsable define los límites, el
proceso impone disciplina y cada acción importante deja un rastro.

El futuro del desarrollo con agentes no consiste solo en hacerlos más
potentes.

Consiste en hacer gobernable esa potencia.

Si estás experimentando con agentes de IA para programar, con
incidencias de GitHub o con flujos automatizados en torno a *pull
requests*, me interesará comparar enfoques y hablar de casos prácticos.
Puedes escribirme a través de la [página de contacto](/es/contact.html).
