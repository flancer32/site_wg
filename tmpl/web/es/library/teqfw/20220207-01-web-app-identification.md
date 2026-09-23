---
title: "TeqFW: identificación de instalaciones web"
description: "Cómo una PWA móvil distingue una instalación de navegador de usuario o sesión, y la autentica al cambiar de red."
date: 2022-02-07
---

Las PWA móviles afrontan conectividad intermitente y cambios de
dirección IP al moverse entre redes. El servidor necesita reconocer una
instalación concreta de aplicación en navegador sin confundir identidad
con IP o nombre de navegador.

## frontUUID

Las PWA viven dentro de navegadores. local storage, IndexedDB, cookies y
caché pertenecen al origen y perfil del navegador. La misma PWA
instalada en dos navegadores, o en dos perfiles, son instalaciones
separadas; dos pestañas de un perfil comparten recursos.

<zoom-img src="/medium/img/8d951d13becf/image-01.png" alt="Instancias PWA en navegadores, perfiles y pestañas" width="100%"></zoom-img>

En el primer inicio, una aplicación Teq genera un UUID y lo guarda en
almacenamiento del navegador. Todas las pestañas que comparten ese
almacenamiento usan el mismo valor. TeqFW lo llama `frontUUID`.

## Dirigir el frontend

Para backend, solicitudes con el mismo `frontUUID` pertenecen a una
instalación frontend aunque cambie su dirección de red.

<zoom-img src="/medium/img/8d951d13becf/image-02.png" alt="Backend identificando instalaciones por frontUUID" width="100%"></zoom-img>

El frontend abre un canal SSE usando el identificador, por ejemplo
`https://server.example/sse/<frontUUID>`. El backend asocia el stream
activo a ese identificador para enviar eventos a la instalación
correcta. Si llega un stream nuevo para el mismo identificador —algo
común al cambiar de red— se cierra el antiguo.

## Un UUID no es autenticación

Un UUID es dirección, no prueba de posesión. Alguien que lo conozca
podría hacerse pasar por ese frontend y recibir mensajes destinados a
él, especialmente si la instalación genuina está offline. HTTPS lo
protege en tránsito, pero puede quedar expuesto por logs descuidados o
compromiso del dispositivo. Un UUID nunca debe usarse como token de
sesión ni credencial de autorización.

## Claves asimétricas e identidad de instalación

Para autenticar una instalación, el primer inicio genera par de claves
además del UUID. Clave pública y UUID se registran en backend; la
privada permanece en almacenamiento del navegador. La identidad queda
así:

``` json
{
  "uuid": "frontend UUID",
  "publicKey": "public key",
  "secretKey": "private key — never send to server"
}
```

El servidor desafía un stream SSE recién abierto. El frontend demuestra
posesión de clave privada firmando o descifrando material del desafío;
el backend verifica con la pública registrada. Una clave privada robada
derrota esta prueba, por lo que almacenamiento seguro y recuperación
siguen siendo esenciales.

## Flujo de conexión

<zoom-img src="/medium/img/8d951d13becf/image-03.png" alt="Flujo de registro y autenticación de instalación frontend" width="100%"></zoom-img>

1.  En el primer inicio, generar UUID y par de claves y persistirlos en
    IndexedDB.
2.  Registrar UUID y clave pública y recibir ID de registro del backend.
3.  Abrir el stream SSE.
4.  El backend envía un challenge por ese stream.
5.  El frontend demuestra posesión de clave privada y devuelve su ID de
    registro.
6.  El backend verifica, activa stream y confirma autenticación.

En posteriores inicios se omite registro. La solicitud de registro es el
único intercambio síncrono; los mensajes de eventos siguen siendo
asíncronos en ambos sentidos.

## Resumen

Una instalación PWA móvil es distinta de usuario, user agent, sesión o
IP. `frontUUID` ofrece al backend una dirección de enrutamiento estable;
una clave privada en el dispositivo prueba que la instalación es la
registrada. Este patrón sirve para clientes que se reconectan, pero debe
combinarse con autenticación y autorización de usuario normales,
almacenamiento seguro, logs cuidadosos y recuperación ante pérdida de
dispositivo.

## Fragmentos adicionales de código fuente

    “uuid”: “7dc933ff-5acd-434d-8703-7cef276d69e2”
    } Эта информация хранится в IndexedDB браузера и является общей для всех экземпляров одного и того же приложения, запущенного в разных вкладках (но не в профилях!).
