---
title: "Ejemplo de aplicación web basada en TeqFW"
description: "Cómo montar una aplicación ToDo de navegador con módulos ES y el contenedor de dependencias @teqfw/di."
date: 2024-06-14
---

La [demostración](https://github.com/flancer64/demo_web_app_di) muestra
el uso del contenedor de objetos e inyección de dependencias
[@teqfw/di](https://github.com/teqfw/di) en una aplicación de navegador.
Es una ToDo List conocida, sin parte de servidor: un conjunto de
archivos estáticos que se carga y ejecuta en el navegador.

<zoom-img src="/medium/img/add155627b58/image-01.png" alt="Aplicación ToDo de demostración" width="100%"></zoom-img>

JavaScript puro con módulos ES aporta una ventaja importante al depurar:
en el navegador se ven los mismos archivos que en el IDE.

<zoom-img src="/medium/img/add155627b58/image-02.png" alt="Fuentes de la aplicación en el navegador" width="100%"></zoom-img>

<zoom-img src="/medium/img/add155627b58/image-03.png" alt="Las mismas fuentes en el IDE" width="100%"></zoom-img>

## Conectar el contenedor

La biblioteca está disponible como módulo ES, por ejemplo desde unpkg:

``` html
<script type="module">
  import Container from 'https://unpkg.com/@teqfw/di';
</script>
```

## Crear y configurar

El contenedor no guarda objetos preparados de antemano. Su Resolver
calcula la ruta del archivo fuente a partir de un identificador de
dependencia. Tras crearlo, asociamos el espacio de nombres `Demo` con
`./js`:

``` js
const container = new Container();
const root = new URL(location.href).href.replace('index.html', '');
const resolver = container.getResolver();
resolver.addNamespaceRoot('Demo', root + '/js');
```

Así los nombres se convierten en direcciones de módulos:

- `Demo_App` → `…/js/App.js`;
- `Demo_Defs` → `…/js/Defs.js`;
- `Demo_ToDo_Item` → `…/js/ToDo/Item.js`;
- `Demo_ToDo_List` → `…/js/ToDo/List.js`.

## Inicializar la aplicación

El símbolo `$` al final del identificador pide un singleton: el
contenedor lo crea una vez y devuelve siempre el mismo objeto.

``` js
const app = await container.get('Demo_App$');
app.run();
```

Las formas básicas son:

- `Demo_App`: default export tal cual;
- `Demo_App$`: singleton del default export;
- `Demo_App$I`: instancia nueva;
- `Demo_App.`: objeto módulo;
- `Demo_App.export`: export nombrado;
- los sufijos `$` y `$I` también funcionan con exports nombrados.

## Describir dependencias

Solo el contenedor se importa estáticamente; los demás módulos se
enlazan mediante identificadores en el constructor:

``` js
export default class Demo_App {
  constructor({
    Demo_Defs$: defs,
    Demo_ToDo_List$: list,
  }) {
    this.defs = defs;
    this.list = list;
  }
}
```

El contenedor carga los módulos, crea los singleton requeridos y los
entrega a la aplicación. Si se necesita la clase, no el objeto, la
petición es más simple:

``` js
export default class Demo_ToDo_List {
  constructor({ Demo_ToDo_Item: ToDoItem }) {
    this.item = new ToDoItem();
  }
}
```

## Conclusión

[@teqfw/di](https://github.com/teqfw/di) lleva prácticas enterprise
—contenedor de objetos y espacios de nombres— a SPA y PWA. Para ejecutar
la demo basta con publicar la carpeta `web/` en alojamiento estático. El
enlace tardío es excesivo para una página estática pequeña, pero resulta
útil en aplicaciones grandes y conjuntos de paquetes; el mismo enfoque
también permite compartir planteamientos entre frontend y backend
Node.js.
