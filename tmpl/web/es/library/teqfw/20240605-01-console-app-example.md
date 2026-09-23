---
title: "Ejemplo de aplicación de consola basada en TeqFW"
description: "Cómo una aplicación Node.js modular con TeqFW elimina cada día registros obsoletos de la base de datos de una tienda."
date: 2024-06-05
---

Este proyecto pequeño pero operativo es una [aplicación de
consola](https://github.com/flancer64/autobalta_cleaner) para la tienda
autobalta.com. Cada día, mediante cron, elimina de la base datos de
intercambio obsoletos con sistemas externos y sesiones antiguas de
usuarios.

<zoom-img src="/medium/img/e038e31766dd/image-01.png" alt="Proyecto de limpieza de base de datos en el IDE" width="100%"></zoom-img>

Limpia las tablas `oc_latakko_api_log`, `oc_latakko_api_queue`,
`oc_latakko_log` y `oc_session`.

## `package.json`

TeqFW vive en el ecosistema npm/Node.js, por lo que la aplicación
comienza en `package.json`. `"type": "module"` activa módulos ES: no
necesita TypeScript ni transpilación. Las versiones de plataforma se
fijan para que la instalación sea reproducible:

``` json
{
  "type": "module",
  "dependencies": {
    "@teqfw/core": "0.24.0",
    "@teqfw/db": "0.21.0",
    "@teqfw/di": "0.22.0",
    "mysql": "^2.18.1"
  },
  "scripts": { "start": "node ./bin/tequila.mjs app-clean" }
}
```

- `@teqfw/di` carga módulos ES, crea objetos singleton y transitorios e
  inyecta dependencias;
- `@teqfw/core` define reglas de identificadores y conecta con
  commander;
- `@teqfw/db` ofrece acceso uniforme a bases relacionales sobre Knex.js;
- `mysql` es el driver MySQL/MariaDB.

Se ejecuta con el habitual `npm start`.

## Launcher común

    bin/tequila.mjs es igual para las aplicaciones backend TeqFW: encuentra la raíz del proyecto y se la entrega al núcleo.
    import { dirname, join } from 'node:path';
    import { fileURLToPath } from 'node:url';
    import teq from '@teqfw/core';

    const path = join(dirname(fileURLToPath(import.meta.url)), '..');
    teq({ path }).catch(console.error);

El núcleo examina `node_modules`, descubre plugins Teq, configura el
contenedor y compone los comandos CLI.

## `teqfw.json` y configuración

Un plugin Teq es un paquete npm normal con el descriptor `teqfw.json`.
La aplicación declara su namespace, ruta de fuentes y el comando que
añade:

``` json
{
  "@teqfw/di": { "autoload": { "ns": "Ab_Clean", "path": "./src" } },
  "@teqfw/core": { "commands": ["Ab_Clean_Back_Cli_Clean"] }
}
```

El archivo único `cfg/local.json` contiene configuración de todos los
plugins. Aquí `@teqfw/db` recibe parámetros de Knex.js y conexión MySQL.
Los secretos quedan en configuración local no publicada.

## El comando `app-clean`

El comando se describe con prefijo (realm), nombre, descripción y
acción. El prefijo `app` lo separa de los comandos de otros plugins:

``` js
const command = fCommand.create();
command.realm = 'app';
command.name = 'clean';
command.desc = 'Clean up expired data.';
command.action = action;
```

Así `./bin/tequila.mjs app-clean` invoca la función de limpieza.

## Base de datos

    @teqfw/db describe las tablas usadas en módulos de esquema y ofrece la conexión TeqFw_Db_Back_RDb_IConnect junto al motor CRUD TeqFw_Db_Back_Api_RDb_CrudEngine. El patrón usa siempre una transacción:
    const trx = await conn.startTransaction();
    try {
      // Read or change data.
      await trx.commit();
    } catch (error) {
      await trx.rollback();
      throw error;
    } finally {
      await conn.disconnect();
    }

Por ejemplo, para borrar sesiones de más de 45 días se pasan al CRUD la
transacción, metadatos de tabla y condición:

``` js
const date = util.formatDate(util.subtractDays(45));
const rows = await crud.deleteSet(trx, rdbSession, function () {
  this.where(A_SESS.EXPIRE, '<', date);
});
logger.info(`Total '${rows}' sessions were deleted.`);
```

## Conclusión

Este ejemplo muestra cómo TeqFW compone una tarea Node.js con módulos:
los plugins declaran capacidades, el contenedor enlaza objetos al
arrancar y el comando CLI realiza una operación de negocio clara. La
estructura encaja bien en trabajos programados, integraciones y
utilidades de servicio donde importan aislamiento, pruebas y evolución
controlada del código.

## Fragmentos adicionales de código fuente

    ]
    }
    }

    {

    }
    }
    } The local configuration description structure follows the configuration parameters for the knexjs library:

    ]
    } The result of the Ab_Clean_Back_Cli_Clean function is an object whose structure matches that specified in the script TeqFw_Core_Back_Api_Dto_Command. The platform core sequentially connects all commands described in the descriptors of all used teq-plugins to the commander. In our case, it looks something like this:
    const res = fCommand.create();
    res.realm = DEF.CLI_PREFIX;
    res.name = ‘clean’;
    res.desc = ‘clean up the expired data’;
    res.action = action;
    return res; The command name is prefixed (realm) common to all commands of one plugin. In our case, DEF.CLI_PREFIX = ‘app’. When running the application with the parameter:
    $ ./bin/tequila.mjs app-clean the action function will be called. The realm is needed to separate commands of one plugin from commands of another. As a rule, the name of the teq-plugin serves as the realm. If the teq-plugin is not intended for use by other teq-plugins, the prefix app is a good option.

    const trx = await conn.startTransaction();

    await trx.commit();
    } catch (e) {
    await trx.rollback();
    }
    await conn.disconnect();

    async function cleanSessions(trx) {
    const from = util.subtractDays(45);
    const date = util.formatDate(from);
    logger.info(Clean up the sessions started before '${date}'.);
    const where = function () {
    this.where(A_SESS.EXPIRE, ‘<’, date);
    };
    const rows = await crud.deleteSet(trx, rdbSession, where);
    logger.info(Total '${rows}' sessions were deleted.);
    return rows;
    } Note the functional style of performing CRUD operations. All necessary information is passed to the corresponding method of the crud object:
