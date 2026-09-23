---
title: "AGENTS.md en ADSM: experiencia personal y conclusiones"
date: 2025-12-14
---

## Introducción

Esta publicación describe el uso de archivos `AGENTS.md` en mis
proyectos tomando como ejemplo el proyecto
[Svyazist](https://github.com/flancer64/pwa-home-call).

El proyecto Svyazist lo desarrollo junto con el agente Codex dentro de
mi propio enfoque ADSM. Este enfoque surgió como resultado de la
práctica de programación contextual con agentes y está orientado a
trabajar de forma sistemática con el contexto, las reglas y las
restricciones arquitectónicas.

La publicación analiza el lugar que ocupa `AGENTS.md` dentro de la
estructura del proyecto, las funciones que cumple en el proceso de
trabajo y cómo se utiliza en la interacción con el agente. La
descripción se basa en la configuración real del proyecto y refleja la
práctica consolidada.

- el rol del `AGENTS.md` raíz en la organización del proyecto;
- el principio de construcción y uso de la jerarquía de archivos AGENTS;
- el propósito del mapa de nivel y su aplicación al trabajar con el
  contexto;
- la influencia de `AGENTS.md` sobre el comportamiento del agente al
  ejecutar tareas;
- los elementos de la estructura que demostraron resiliencia durante el
  trabajo a largo plazo.

La publicación registra el estado actual de esta práctica y sirve como
base para su desarrollo futuro dentro del enfoque ADSM.

------------------------------------------------------------------------

## Destino típico de `AGENTS.md`

El archivo `AGENTS.md` se utiliza como [el lugar
estándar](https://agents.md/) para las instrucciones destinadas a las
herramientas agent. Complementa el `README.md` al trasladar a un
documento separado la información que necesita el agente para trabajar
con el proyecto.

El `AGENTS.md` típico contiene la descripción de la estructura del
proyecto, los comandos de compilación y prueba, las convenciones de
estilo de código, las reglas del repositorio y otras instrucciones que
el agente emplea al ejecutar tareas.

El formato del archivo permanece flexible y no impone requisitos
estrictos de estructura.

Para proyectos con una estructura desarrollada se aplica una jerarquía
de archivos `AGENTS.md`. El agente considera todos los archivos
`AGENTS.md` a lo largo de la ruta desde la raíz del repositorio hasta el
directorio de trabajo actual, y las instrucciones más cercanas al lugar
de trabajo tienen prioridad.

En el agente Codex este mecanismo está implementado directamente: el
agente descubre automáticamente los `AGENTS.md`, construye la cadena de
instrucciones activas y las aplica durante el trabajo.

------------------------------------------------------------------------

## Tipos de `AGENTS.md`

En el enfoque ADSM, los archivos `AGENTS.md` conforman un sistema
jerárquico de instrucciones donde cada nivel cumple funciones distintas.

En el nivel superior del proyecto se encuentra el `AGENTS.md` raíz.
Define los límites generales de la actividad del agente, establece los
roles básicos, los principios para trabajar con el contexto y los
invariantes que se mantienen en todos los proyectos.

Más abajo en la estructura se hallan los `AGENTS.md` locales. Su
propósito depende de su posición en la estructura de archivos y de
significado. Estos archivos aclaran las reglas que rigen dentro de un
espacio específico y sólo aplican dentro de su nivel.

Así se forma un sistema multinivel de instrucciones, donde el archivo
raíz define la arquitectura general de la interacción y los archivos
locales detallan el comportamiento del agente en secciones concretas del
proyecto.

------------------------------------------------------------------------

## `AGENTS.md` locales

Los archivos `AGENTS.md` locales se emplean para fijar reglas y
describir la estructura del trabajo en un nivel concreto del proyecto.
Ese nivel puede corresponder a una parte del contexto cognitivo o a un
segmento del código fuente.

    # <Nombre del nivel de documentación o código>

    Path: `path/to/AGENTS.md`

    ## Propósito

    <breve descripción del propósito de los documentos/código de este nivel>

    ## Mapa de nivel

    - `dir/` — propósito del directorio en este nivel.
    - `AGENTS.md` — el documento actual.
    - `file.ext` — propósito del archivo en este nivel.

    ## <Las secciones siguientes dependen del nivel>

Esta estructura se usa para fijar los límites del nivel y las reglas de
funcionamiento en su interior. El mapa de nivel describe de forma
declarativa el contenido del directorio y sirve como modelo compacto de
la estructura sin necesidad de abrir los archivos.

El título indica a qué nivel pertenece el archivo. La ruta fija su
posición en la estructura del proyecto. La sección de propósito describe
el rol del nivel y el ámbito de aplicación de las instrucciones.

Las secciones restantes dependen del tipo de nivel: en el contexto
describen cómo trabajar con la documentación y cómo modificarla; en el
código detallan las restricciones y convenciones que se emplean al
editar los orígenes.

Los archivos locales se colocan sólo allí donde es necesario fijar
explícitamente las reglas de trabajo y los límites de responsabilidad.

------------------------------------------------------------------------

## `AGENTS.md` raíz

En cada proyecto se utiliza un único archivo `AGENTS.md` raíz ubicado en
la raíz del repositorio. Este archivo lo lee el agente primero y define
las reglas generales de trabajo.

El `AGENTS.md` raíz establece el modelo básico del proyecto, incluyendo
la división entre contexto y producto, y fija el orden de interacción
entre ambos. También define los roles del humano y del agente, así como
el modo de tomar en cuenta las instrucciones a lo largo del proyecto.

El archivo describe el mecanismo de jerarquía de `AGENTS.md`, los
requisitos para las instrucciones locales, el uso de mapas de nivel, la
protección de comentarios importantes en el código y la obligación de
reportar al final de cada iteración.

El `AGENTS.md` raíz se utiliza sin cambios y proporciona una base
estable sobre la que se apoyan todas las reglas del proyecto.

Un ejemplo de un `AGENTS.md` raíz típico utilizado en mis proyectos está
disponible en:\
\<enlace al AGENTS.md raíz de ejemplo\>

Este archivo establece una forma uniforme de trabajar con los agentes y
permite aplicar el mismo enfoque en distintos proyectos.

------------------------------------------------------------------------

## El impacto de `AGENTS.md` en el trabajo del agente

Los archivos `AGENTS.md` no son programas en el sentido habitual. No se
ejecutan y no imponen un comportamiento rígido al agente. El agente
puede considerar las instrucciones parcialmente o ignorarlas, incluso si
las exigencias están formuladas de forma explícita.

En la práctica esto se ve, por ejemplo, en los requerimientos de
reporte. Aunque la obligación de terminar la iteración con un informe
esté fijada en el archivo raíz, el agente puede olvidarse de generarlos
o hacerlo de forma irregular. Esta observación resulta importante para
entender correctamente el papel de `AGENTS.md` en el proyecto.

Al mismo tiempo, Codex sí escanea el sistema de archivos del proyecto y
detecta los `AGENTS.md` en distintos niveles. Se puede ver esto en su
comportamiento y en los registros de trabajo. Por lo tanto, los archivos
son leídos por el agente, pero no lo controlan directamente.

<zoom-img src="/img/blog/2025/20251214-01-agents-files.png"
            alt="Captura de los registros de Codex detectando AGENTS.md" width="100px"></zoom-img>



------------------------------------------------------------------------

## Los límites de la gobernabilidad

La práctica muestra que las instrucciones en `AGENTS.md` funcionan como
orientaciones más que como mandatos. No garantizan acciones concretas,
pero influyen en el contexto que el agente conforma para resolver una
tarea.

El agente obtiene su contexto de trabajo de forma independiente a partir
de los documentos disponibles. Qué fragmentos elige y cómo los combina
no se conoce de antemano. Esto impone límites naturales sobre el grado
de gobernabilidad del comportamiento del agente mediante instrucciones
textuales.

En ese sentido, `AGENTS.md` no fijan el comportamiento de forma directa,
pero aumentan la probabilidad de que el agente opere dentro de los
marcos previstos.

------------------------------------------------------------------------

## El `AGENTS.md` raíz como punto de entrada

En mis proyectos el `AGENTS.md` raíz actúa como el punto de entrada del
agente en el proyecto. Su tarea es ofrecer una visión general de la
estructura del proyecto, los roles y los principios de trabajo, no
describir detalles.

En el archivo raíz se registran las direcciones: dónde está el contexto,
dónde reside el producto, qué reglas se consideran básicas y qué
invariantes deben preservarse. La detallación en este nivel no resulta
eficiente y puede sobrecargar el contexto.

Este enfoque permite al agente orientarse en el proyecto sin que se le
impongan instrucciones excesivas al comenzar a trabajar.

------------------------------------------------------------------------

## El contexto de la tarea

Al realizar una tarea concreta el agente conforma su propio contexto de
trabajo. Este contexto se construye a partir de los documentos del
proyecto y depende de la estructura de archivos, su volumen y su
cohesión interna.

Es importante tener en cuenta que el agente no usa todo el contexto del
proyecto. Selecciona fragmentos que considera relevantes para la tarea y
los combina según sus reglas internas. Este proceso es opaco y no puede
controlarse completamente.

Por eso el autor del contexto del proyecto no debe intentar describirlo
todo en un único lugar, sino crear condiciones que permitan formar un
contexto de trabajo coherente para la tarea.

------------------------------------------------------------------------

## Distribución de sentidos

La práctica muestra que los documentos grandes y monolíticos aumentan el
riesgo de contradicciones en el contexto de la tarea. Cuando se carga un
archivo así, el agente debe operar con un volumen amplio de significados
diversos, lo cual complica formar un contexto interno consistente.

Un resultado más estable se obtiene distribuyendo los sentidos en varios
documentos compactos y relacionados. Cada uno de ellos contiene un
conjunto denso de significados vinculados a un área o nivel concreto.

De ese modo al agente le resulta más sencillo armar el contexto de
trabajo a partir de bloques coherentes en lugar de fragmentos dispersos
de un texto voluminoso.

------------------------------------------------------------------------

## Condiciones para la efectividad de `AGENTS.md`

`AGENTS.md` funcionan bien en tareas que requieren coordinación,
cumplimiento de restricciones arquitectónicas y repetibilidad del
proceso. Son especialmente útiles en proyectos con una estructura
contextual desarrollada y un ciclo de vida prolongado.

Al mismo tiempo, en tareas pequeñas o puntuales el efecto de `AGENTS.md`
puede ser mínimo. En esos casos el agente a menudo se apoya en el
contexto local de la tarea y en sus propias heurísticas.

Esto indica que el uso de `AGENTS.md` tiene sentido no en todas partes,
sino principalmente donde es importante gobernar el proceso a largo
plazo.

------------------------------------------------------------------------

## `AGENTS.md` en ADSM

En el enfoque ADSM los archivos `AGENTS.md` se emplean como un elemento
de apoyo para trabajar con el contexto del proyecto. Definen la
estructura dentro de la cual el agente forma contextos de trabajo para
tareas concretas, y enlazan la documentación, las reglas y el código en
un único sistema.

`AGENTS.md` no están pensados para controlar directamente al agente. No
dictan algoritmos ni garantizan el cumplimiento de las instrucciones. Su
papel consiste en organizar el entorno en el que el agente trabaja y
disminuir la incertidumbre semántica al formar el contexto de la tarea.

El `AGENTS.md` raíz establece el marco general y la dirección, mientras
que los archivos locales precisan las reglas en niveles particulares.
Juntos conforman una jerarquía de contexto que permite al agente
orientarse en la estructura del proyecto y tomar en cuenta las
restricciones sin atarse rígidamente a escenarios concretos.

Este enfoque no elimina por completo la incertidumbre, pero la hace
manejable y reproducible. Permite utilizar agentes en proyectos
complejos y de larga duración conservando la coherencia del contexto y
la repetibilidad del proceso.

------------------------------------------------------------------------

*Esta página corresponde a la segunda etapa de AFKP (Acceptance-First
Knowledge Principle) — "despliegue". La cuarta etapa ("comprensión") se
puede realizar en este [canal de
Telegram](https://t.me/alexgusev_lab_es/4) o directamente
<a href="https://habr.com/ru/articles/976760/" target="_blank">en
Habr</a>.*

------------------------------------------------------------------------
