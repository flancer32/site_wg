---
title: "TeqFW: fundamentos de eventos"
description: "Cómo TeqFW modela eventos locales y transfronterizos entre navegador y Node.js, con contratos explícitos de mensajes y entrega resiliente."
date: 2022-01-05
---

JavaScript encaja bien con programación asíncrona, donde los eventos son
centrales. Este artículo presenta cómo Tequila Framework utiliza eventos
para coordinar trabajo dentro de navegador o servidor y a través de la
frontera entre ambos.

## Qué es un evento

Un evento es un cambio significativo de estado, por ejemplo «la persona
usuaria se ha autenticado». Lleva datos —como un identificador—, nace de
una acción y puede provocar otras, como cargar el perfil.

<zoom-img src="/medium/img/541b01dfbe6b/image-01.png" alt="Productor, mensaje y manejadores de eventos" width="100%"></zoom-img>

En el caso más simple hay dos objetos funcionales y uno de datos: un
*Event Producer* cambia estado y emite un *Event Message*; uno o varios
*Event Handlers* reaccionan. El evento tiene tipo, como `onClick`, y un
mensaje con datos relacionados, como `MouseEvent`.

Los manejadores reaccionan de forma asíncrona, pueden cambiar el estado
y emitir nuevos eventos. Esto hace la aplicación más flexible que una
cadena de llamadas síncronas, pero exige disciplina y observabilidad.

## Eventos locales y transfronterizos

Una aplicación Teq suele tener frontend en navegador y backend Node.js.
Si productor y manejador se ejecutan en el mismo proceso, el evento es
local. Si están en lados opuestos, cruza la frontera.

Los mensajes transfronterizos viajan por Internet como JSON. Sus datos
deben serializarse y deserializarse sin pérdida. Un mensaje local no
sale del proceso y no tiene esa limitación de transporte.

## Nombres de evento

Cada tipo debe ser único en la aplicación. Los namespaces Teq permiten
que el nombre del módulo ES sea un identificador natural:

- `Vnd_Plug_Front_Event_Net_Status_Changed`: evento local de frontend;
- `Vnd_Plug_Back_Event_Sale_Order_Registered`: evento local de backend;
- `Vnd_Plug_Shared_Event_Front_Sale_Order_Confirmed`: evento
  transfronterizo originado en navegador;
- `Vnd_Plug_Shared_Event_Back_Sale_Order_Registered`: evento originado
  en backend.

El módulo ES encapsula nombre y forma DTO del mensaje. Así el contrato
queda explícito y puede reutilizarse a ambos lados.

## Eventos locales

Un productor local permite publicación y suscripción:

``` js
emit(eventName, message) {}
subscribe(eventName, handler) {}
unsubscribe(subscription) {}
```

Quien se suscribe indica qué evento necesita y aporta un manejador.
Cuando cambia el estado, el productor envía el mensaje.

<zoom-img src="/medium/img/541b01dfbe6b/image-02.png" alt="Suscripción y entrega de evento local" width="100%"></zoom-img>

Como ambas partes están en frontend o ambas en backend, este caso es
comparativamente simple.

## Eventos transfronterizos

Cuando el productor está en navegador y el manejador en servidor —o al
revés— una aplicación móvil tiene entre ambos un canal inestable.

<zoom-img src="/medium/img/541b01dfbe6b/image-03.png" alt="Transferencia entre frontend y backend" width="100%"></zoom-img>

El productor envía mensajes a una cola que vigila el canal y entrega
cuando puede. En el otro lado, un representante o «embajada» permite que
manejadores locales se suscriban a eventos remotos. Al recibir un
mensaje de red, lo enruta al manejador adecuado. El principio es igual
en ambos sentidos.

En producción también hay que definir identidad, orden, reintentos y
deduplicación; una cola por sí sola no garantiza entrega exactamente una
vez.

## Resumen

La arquitectura dirigida por eventos se adapta a la naturaleza asíncrona
de JavaScript y a entornos cambiantes. Su coste es un flujo menos
lineal. Por ello necesita logging y trazabilidad intencionales en
cliente y servidor, para entender qué ocurrió y recuperarse de fallos.
