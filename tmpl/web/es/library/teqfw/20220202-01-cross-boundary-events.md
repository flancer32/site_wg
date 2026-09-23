---
title: "TeqFW: eventos transfronterizos"
description: "Cómo una PWA móvil puede mover eventos entre navegador y servidor con colas, SSE, POST y metadatos explícitos cuando la red es inestable."
date: 2022-02-02
---

TeqFW se dirige a PWA móviles que deben sobrevivir a un acceso a
Internet poco fiable. El intercambio clásico solicitud-respuesta no
encaja en todas las interacciones, por lo que frontend y backend se
coordinan mediante eventos. Este artículo describe el patrón para
transferirlos a través de la frontera de red.

## Dos canales unidireccionales

Cada cliente de navegador tiene un canal para eventos hacia servidor y
otro para eventos de vuelta. Los navegadores no aceptan conexiones
entrantes como servidores, por eso ambos canales los inicia el
navegador:

- navegador → servidor: una solicitud POST estándar;
- servidor → navegador:
  [EventSource](https://developer.mozilla.org/en-US/docs/Web/API/EventSource)
  / Server-Sent Events (SSE).

Los dos canales son unidireccionales, de publicador a suscriptor. La
respuesta POST solo confirma recepción, no es una respuesta de negocio
síncrona; SSE no ofrece respuesta inversa en el mismo canal.

<zoom-img src="/medium/img/73579bb1df2/image-01.png" alt="Canales unidireccionales entre frontend y servidor" width="100%"></zoom-img>

Un evento que nace en un lado y se maneja en el otro es transfronterizo.

## Colas de eventos

Las PWA que funcionan offline necesitan buffers para mensajes que no
pueden cruzar la red ahora mismo.

<zoom-img src="/medium/img/73579bb1df2/image-02.png" alt="Event bus, portal y cola de eventos" width="100%"></zoom-img>

Cada lado tiene un *Event Bus* que notifica a suscriptores locales de
eventos propios y remotos. Un *Event Portal* mueve mensajes
transfronterizos al bus del otro lado. Si no se puede entregar, una
*Events Queue* persiste el mensaje hasta volver la conectividad. El
esquema es simétrico en ambas direcciones.

## Vigilar conectividad

El frontend establece las conexiones. Si `navigator.onLine` indica que
está offline, almacena los mensajes salientes en una cola respaldada por
IndexedDB. Si hay Internet, intenta abrir el canal SSE con backend. Si
SSE no se establece, considera que el servidor no está disponible y
conserva los mensajes.

Los reintentos pueden empezar cada pocos segundos y aplicar backoff.
Cuando ambas direcciones están disponibles, se transfieren colas de
navegador y servidor. Esto se parece deliberadamente más a datagramas
que a solicitudes síncronas: un mensaje puede quedar obsoleto o
perderse. La lógica de negocio debe reconciliar estado, confirmar
mensajes críticos de forma asíncrona, reintentar cuando proceda y hacer
los manejadores idempotentes. Una cola por sí sola no garantiza entrega
exactamente una vez.

## UUID del frontend

Un backend sirve muchas instalaciones de navegador. Diferentes
navegadores, perfiles o dispositivos tienen cookies, cachés e IndexedDB
separados aunque carguen la misma PWA. Durante la instalación, una
aplicación Teq genera un UUID de frontend y lo guarda en almacenamiento
del navegador.

<zoom-img src="/medium/img/73579bb1df2/image-03.png" alt="Backend comunicándose con varias instancias de frontend" width="100%"></zoom-img>

El backend usa ese UUID para dirigirse a un frontend concreto y cerrar
una conexión SSE duplicada si, por ejemplo, un cambio de red deja una
conexión antigua colgada. Es un identificador de instalación, no un ID
de sesión ni un token; autenticación y autorización siguen siendo
responsabilidades separadas.

## Estructura del mensaje

Un mensaje transfronterizo es JSON con datos de negocio y metadatos de
enrutamiento:

``` json
{
  "data": {},
  "meta": {
    "name": "Event_Name",
    "uuid": "message UUID",
    "published": "2022-01-31T13:11:51.628Z",
    "frontUUID": "frontend UUID"
  }
}
```

`data` contiene el negocio. `meta` identifica tipo, mensaje, instante
UTC y frontend emisor o destino. Permite enrutar, deduplicar, expirar y
observar.

## Resumen

Las aplicaciones web orientadas a smartphone deben operar con
conectividad intermitente. La comunicación por eventos con colas
persistentes puede ser más realista que fingir que cada solicitud tiene
respuesta estable. El precio es definir entrega explícitamente:
metadatos en mensajes, manejadores tolerantes a reintentos y pérdidas, y
sincronización de estado al reconectar.
