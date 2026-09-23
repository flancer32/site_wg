---
title: "Remote Console para supervisar logs de aplicaciones web"
description: "Una pequeña aplicación web para ver en tiempo real los logs de un navegador móvil."
date: 2024-02-24
---

¿Qué hace un desarrollador cuando necesita leer los logs de una
aplicación web que se ejecuta en un teléfono? En un navegador de
escritorio basta abrir DevTools y la consola; en un smartphone no es tan
cómodo.

La solución más sencilla consiste en enviar los logs a un servidor o
agregador. Al inicio de la aplicación se puede sustituir `console.log`:

``` js
const orig = console.log;
console.log = function () {
  orig.apply(console, arguments);
  navigator.sendBeacon(URL, arguments[0]);
};
```

Así, todo lo que llegue a `console.log(...)` se enviará a la URL
indicada. Uso la [Beacon
API](https://developer.mozilla.org/en-US/docs/Web/API/Beacon_API) porque
el navegador no espera respuesta del servidor: los mensajes viajan en
una sola dirección.

Después hay que reunir los logs y mostrarlos de forma legible. Para eso
escribí [Remote
Console](https://github.com/flancer64/spa-remote-console). Acepta
mensajes de cualquier dirección:

``` js
navigator.sendBeacon('https://console.wiredgeese.com/log/', 'any message');
```

y los retransmite por WebSocket a quienes estén mirando la consola. El
servidor no almacena logs: reenvía inmediatamente lo que recibe. Si
pueden contener datos confidenciales, conviene alojar Remote Console en
la red local o en el equipo del desarrollador:

``` bash
git clone https://github.com/flancer64/spa-remote-console.git
cd spa-remote-console/
npm install
npm start
```

## Canales

Los canales separan conjuntos de logs. Los mensajes enviados a
`https://console.wiredgeese.com/log/any-chars/` se ven solo en
`https://console.wiredgeese.com/any-chars/`. Al añadir un canal como
`/49bce4eb9e135c3580278b/` al servidor, solo quien conozca el nombre
puede seguir esos logs. No hay límite de usuarios que pueden observar un
canal a la vez.

## Unir logs

Para que los mensajes de varios navegadores aparezcan en una consola,
basta enviarlos al mismo canal. Es especialmente útil cuando interactúan
aplicaciones en dos navegadores o un navegador y un servidor: el
servidor también puede enviar logs a la consola.

## Orden y número de entradas

Cuando los logs se envían a `https://console.wiredgeese.com/log/`, el
servidor añade automáticamente la hora en formato `mm/dd hh:mm:ss.mmm`.
La ruta `/timed/` retransmite los mensajes sin cambios. El navegador
ordena las entradas de forma inversa suponiendo que el inicio contiene
la hora del evento. Por defecto se muestran 64 entradas, pero cada
persona puede elegir cualquier número positivo sin límite superior.

## Conclusión

Remote Console nació como una herramienta para observar la consola de un
navegador móvil. Sin embargo, retransmitir un origen a varios
navegadores, separar por canales y unir fuentes distintas resultó útil
en el trabajo diario. También puede servir en soporte: si la aplicación
duplica logs en una consola remota, una persona de soporte puede
observar qué ocurre en el teléfono del cliente.
