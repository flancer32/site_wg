---
title: "Espacio de nombres: ¿ámbito o dirección?"
description: "Una comparación de los espacios de nombres en Java, PHP y JavaScript: por qué dan contexto y ayudan a encontrar el código."
date: 2022-11-03
---

Comparemos el concepto de `namespace` en Java, PHP y JavaScript. En
sentido general, un espacio de nombres es un conjunto de signos para
identificar objetos: hace únicos los nombres y permite referirse a
ellos. También aporta contexto, por lo que «espacio de nombres» y
«ámbito» suelen aparecer juntos.

## Java

En Java, el espacio de nombres se llama `package`:

``` java
package java.awt.event;
```

Normalmente cada clase vive en un archivo y los paquetes forman una
jerarquía. Por eso el código de `java.applet.AppletContext` está
previsiblemente en `./java/applet/AppletContext.java`, y el de
`java.awt.event.ActionListener`, en
`./java/awt/event/ActionListener.java`. El sistema de archivos aporta
unicidad, mientras que el paquete crea un contexto: las clases sin
modificador explícito pueden verse dentro del paquete.

Para la unicidad global, Java toma prestado DNS: quien posee
`company.com` puede usar `com.company`. Por eso, en Java el espacio de
nombres sirve primero para direccionar código y después para delimitar
visibilidad.

## PHP

Los espacios de nombres llegaron a PHP en la versión 5.3 y están aún más
cerca del sistema de archivos:

``` php
namespace Zend;
```

Técnicamente puede haber varios espacios de nombres en un archivo,
aunque no es una práctica recomendable. Se anidan y se pueden resolver
de forma absoluta o relativa, como rutas de archivos; un alias se parece
a un enlace simbólico.

``` php
namespace Project;
use Project\ModuleA as ModA;
$modA = new ModuleA();
$modA2 = new ModA();
```

PHP ofrece una dirección más flexible que Java, pero en ambos lenguajes
la persona desarrolladora y el IDE encuentran un origen a partir de su
nombre completo (FQN). Además, el espacio de nombres define su contexto,
igual que un paquete Java.

## JavaScript

JavaScript no incluye declaraciones `namespace` ni `package`. La
respuesta clásica a «¿cómo declaro un namespace?» es crear un ámbito con
nombre:

``` js
const MyNamespace = (function () { /* ... */ })();
```

Este «namespace» de JS trata sobre todo de aislamiento, no de dirección.
Los ámbitos anidados pueden tener una función con el mismo nombre:

``` js
const MyNamespace = (() => {
  function myFunc() { console.log('Main space.'); }
  return { fn: myFunc };
})();
((mainSpace) => {
  function myFunc() { console.log('Nested space.'); }
  mainSpace.subSpace = { fn: myFunc };
})(MyNamespace);
```

En ejecución quedan aisladas, pero para una persona y su IDE es difícil
dar una dirección única a cada `myFunc`. «Copy Reference» suele devolver
solo el nombre, y «Find Usage» pierde utilidad en un proyecto muy
grande. Esta limitación ayuda a entender la aparición de TypeScript.

El JavaScript actual, con módulos ES y npm, se acerca mucho más a las
necesidades de proyectos grandes. Aun así, el proyecto debe imponer con
disciplina y herramientas una forma coherente de direccionar globalmente
los elementos de código.

## Conclusión

Un espacio de nombres es a la vez dirección y ámbito, como una dirección
postal y el lugar real. Cada dirección corresponde a un lugar, pero no
todo lugar tiene dirección propia. La función más importante del
namespace es ayudar a la persona desarrolladora a localizar código
fuente, no ayudar al ordenador a acceder a un objeto durante la
ejecución.

<zoom-img src="/medium/img/9037fada36f2/image-01.jpg" alt="Dirección y lugar como metáfora del espacio de nombres" width="100%"></zoom-img>
