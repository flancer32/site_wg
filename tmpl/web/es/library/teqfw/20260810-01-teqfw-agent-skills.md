---
title: "TeqFW: un framework que sabe explicarse a los agentes de IA"
description: "Cómo los paquetes de TeqFW distribuyen Agent Skills versionadas para que los agentes trabajen con instrucciones alineadas con el código instalado."
date: 2026-08-10
---

<zoom-img
                src="/img/library/teqfw/20260810-01-teqfw-agent-skills.webp"
                alt="Un paquete de TeqFW proporciona código a la aplicación y una skill al agente de IA"
                width="100%"
        ></zoom-img>

Un agente de programación puede leer código fuente. Con tiempo
suficiente, llegará a entender una biblioteca desconocida: encontrará el
punto de entrada, revisará los tipos, comparará ejemplos y reconstruirá
las convenciones principales.

La cuestión es cuánto tiempo y cuánto espacio de la ventana de contexto
consumirá esa investigación, y qué versión de la documentación
encontrará el agente durante el proceso.

En <a href="https://teqfw.com/" target="_blank" rel="noopener">TeqFW</a>
resuelvo este problema desde los propios paquetes npm. Cada paquete
puede distribuir, junto con el código, una Agent Skill con instrucciones
para el agente:

``` text
@teqfw/package/
├── src/
├── types.d.ts
└── skills/
    └── teqfw-package/
        ├── SKILL.md
        └── references/
```

Una vez instalado el paquete, el agente puede acceder a instrucciones
escritas para la versión exacta del componente presente en
`node_modules`.

## Qué contiene una skill incluida en un paquete

[Agent Skills](https://agentskills.io/) es un formato abierto para
empaquetar instrucciones dirigidas a agentes de IA. El punto de entrada
de cada skill es el archivo `SKILL.md`. Este archivo puede indicar al
agente:

- de qué es responsable el paquete;
- cuándo debe usar la skill;
- cómo están organizados los contratos públicos;
- cómo integrar el componente en una aplicación;
- qué convenciones de TeqFW debe respetar;
- qué debe comprobar en el código fuente y las pruebas de la versión
  actual.

El formato Agent Skills no está vinculado a Codex. Otros entornos para
agentes de programación también lo admiten, aunque las rutas de
descubrimiento y los mecanismos de conexión varían. Por eso, el paquete
de TeqFW distribuye la skill y el proyecto consumidor la expone de la
forma que espera el entorno elegido.

Claude Code sigue el mismo patrón mediante `.claude/skills/`; el paquete
sigue siendo independiente de la ruta de descubrimiento propia de cada
agente.

Los materiales de referencia y los ejemplos se encuentran junto a
`SKILL.md` y forman parte del mismo paquete npm.

No se trata de reescribir el README para otro lector. El README ayuda al
desarrollador a empezar. La skill ofrece al agente una ruta por el
paquete: qué documentos leer, qué límites respetar y en qué contratos
apoyarse antes de modificar el código.

## Cómo se aplica en TeqFW

TeqFW está compuesto por paquetes independientes. Los componentes de la
plataforma distribuyen sus propias skills:

``` text
@teqfw/di           → teqfw-di
@teqfw/cfg          → teqfw-cfg
@teqfw/cli          → teqfw-cli
@teqfw/log          → teqfw-log
@teqfw/db           → teqfw-db
@teqfw/web  → teqfw-web
```

Por ejemplo, la skill `teqfw-di` explica al agente el modelo de enlace
entre módulos y las reglas para trabajar con el contenedor de inyección
de dependencias. `teqfw-cfg` describe las fuentes y el ciclo de vida de
la configuración. `teqfw-db` define los límites del trabajo con el
modelo de datos distribuido (DEM), los dialectos SQL, las transacciones
y la reconstrucción de la base de datos. `teqfw-web` describe el flujo
de solicitudes del servidor y los recursos estáticos.

Estas instrucciones pertenecen a paquetes concretos. Una skill no
sustituye la documentación del proyecto ni toma decisiones
arquitectónicas por su propietario. Explica cómo utilizar el componente
instalado dentro de las reglas de una aplicación determinada.

## Instrucciones que se mantienen alineadas con el código

Supongamos que una aplicación utiliza la versión `2.4` de un paquete,
pero el agente encuentra en Internet documentación para la versión `3.0`
o recuerda un ejemplo de una versión anterior. El código resultante
puede parecer correcto y, aun así, no corresponderse con la API
instalada.

Cuando la skill forma parte del paquete, el código y las instrucciones
se versionan juntos:

``` text
package 2.4
├── code 2.4
└── skill 2.4
```

`package-lock.json` fija la versión de la dependencia y, con ella, la
versión de las instrucciones para el agente.

Al actualizar el paquete, se actualiza también su skill. Al volver a una
versión anterior, regresan las instrucciones correspondientes. En lugar
de depender de una «documentación más reciente» en abstracto, el agente
puede usar las instrucciones incluidas en la dependencia realmente
instalada.

## Los paquetes distribuyen skills; los proyectos deciden cuáles usar

Distribuir una skill y ponerla a disposición del agente son acciones
diferentes.

Después de `npm install`, la skill se encuentra dentro del paquete:

``` text
node_modules/@teqfw/di/skills/teqfw-di
```

El paquete no modifica la configuración del proyecto ni activa la skill
automáticamente. El proyecto da al agente acceso explícito a las skills
que necesita. En Codex puede hacerse mediante un enlace simbólico:

``` text
.agents/skills/teqfw-di
    → ../../node_modules/@teqfw/di/skills/teqfw-di
```

Por ejemplo:

<div id="cb6" class="sourceCode">

``` sourceCode
mkdir -p .agents/skills

ln -s \
  ../../node_modules/@teqfw/di/skills/teqfw-di \
  .agents/skills/teqfw-di
```

</div>

El enlace puede guardarse en Git. De este modo, el repositorio registra
qué skills ha habilitado el proyecto, mientras que el lockfile registra
qué versiones de los paquetes las proporcionan.

Esta separación importa especialmente en aplicaciones con grandes
árboles de dependencias. Que un paquete esté presente en `node_modules`
no significa que sus instrucciones deban estar disponibles para el
agente. El propietario del proyecto elige el conjunto de skills con el
que se trabajará.

[Codex admite skills conectadas mediante enlaces
simbólicos](https://developers.openai.com/codex/build-skills), por lo
que no es necesario copiarlas en el proyecto. El paquete instalado sigue
siendo la única fuente de referencia.

## Por qué resulta útil en la práctica

Una skill reduce el trabajo de investigación previo a un cambio de
código. El autor del paquete proporciona al agente respuestas que, de
otro modo, tendría que reconstruir:

- dónde se encuentra el límite público del componente;
- qué convenciones son obligatorias;
- qué decisiones pertenecen al paquete y cuáles siguen correspondiendo a
  la aplicación;
- qué mecanismos obsoletos no deben trasladarse al código nuevo;
- cómo verificar el resultado.

Esto no garantiza un resultado correcto. El agente todavía debe revisar
los contratos y las pruebas actuales, y un desarrollador debe evaluar
los cambios. Sí hace reproducible el punto de partida: dos agentes que
trabajan con la misma versión de una dependencia reciben las mismas
instrucciones de su autor.

Para mí, esta preparación forma parte del trabajo de ingeniería
necesario para desarrollar con agentes. No basta con dar acceso al
repositorio a un modelo capaz. El repositorio y sus dependencias deben
exponer con claridad las reglas locales, para que el agente pueda
distinguirlas del conocimiento general sobre JavaScript y Node.js.

## TeqFW como plataforma preparada para agentes

TeqFW está construido alrededor de dependencias explícitas, límites
entre módulos y contratos accesibles para las herramientas de análisis
de código. Las skills incluidas en los paquetes añaden otra
representación: instrucciones operativas para el agente de IA.

Un mismo paquete puede ofrecer distintas representaciones a los
participantes del proceso de desarrollo:

``` text
código fuente       → entorno de ejecución
JSDoc y types.d.ts  → IDE y análisis estático
README              → desarrollador
SKILL.md            → agente de IA
```

Todas se publican juntas y corresponden a la misma versión del
componente.

Esto significa que desarrollo algo más que un conjunto de bibliotecas
JavaScript. También construyo un entorno de trabajo que proporciona a
los agentes de IA reglas explícitas para utilizarlas. Aplico el mismo
enfoque al preparar otros paquetes y aplicaciones para el desarrollo con
agentes: defino límites, formalizo convenciones, creo skills y las
vinculo a las versiones de los componentes.

Mi nombre de trabajo para este enfoque es **Dependency-bound Agent
Skills**: skills para agentes vinculadas a dependencias de software. No
es un estándar independiente. Es un modelo de distribución en el que el
código y las instrucciones necesarias para trabajar con él viajan a
través del mismo gestor de paquetes y se versionan juntos.

Fuera de TeqFW también se están explorando modelos parecidos. El
repositorio de Agent Skills contiene [una propuesta para distribuir
skills mediante paquetes
npm](https://github.com/agentskills/agentskills/issues/81), mientras que
el proyecto [skills-npm](https://github.com/antfu/skills-npm) estudia el
descubrimiento de skills dentro de las dependencias instaladas.

TeqFW ya utiliza este enfoque: los paquetes distribuyen las
instrucciones, las aplicaciones seleccionan las skills que necesitan y
los agentes trabajan con información alineada con el código instalado.

------------------------------------------------------------------------

### Referencias

- [Agent Skills](https://agentskills.io/)
- [Agent Skills Specification](https://agentskills.io/specification)
- [OpenAI Codex: Agent
  Skills](https://developers.openai.com/codex/build-skills)
- [RFC: Standardize npm/JavaScript Package
  Distribution](https://github.com/agentskills/agentskills/issues/81)
- [npm-based Agent Skills
  Convention](https://github.com/antfu/skills-npm/blob/main/PROPOSAL.md)
- [skills-npm](https://github.com/antfu/skills-npm)
