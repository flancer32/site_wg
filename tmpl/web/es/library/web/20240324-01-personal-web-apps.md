---
title: "Aplicaciones web personales"
description: "Cómo una aplicación web puede guardar datos personales en los dispositivos de su propietario, sincronizarlos y reducir el papel del servidor central."
date: 2024-03-24
---

Antes de la web, las aplicaciones solían guardar los datos en el
ordenador de su dueño. Con la web, los datos pasaron a servidores
corporativos y la privacidad se redujo. ¿Qué ocurriría si los datos
personales de una aplicación web vivieran principalmente en el teléfono
u ordenador de la propia persona usuaria?

## Qué distingue a una aplicación web

Las diferencias principales son sencillas: se ejecuta en el navegador y
normalmente necesita un servidor para distribuirse. El navegador se ha
convertido en una especie de sistema operativo para estas aplicaciones:
ofrece Web API, reglas de seguridad y acceso a pantalla, teclado, ratón,
cámara y otras capacidades. Es un acceso más limitado que el de una OS
nativa, pero basta para conectar persona, dispositivo y otros programas.

Antes el software llegaba en disquetes y CD; ahora llega casi siempre
por red. Sin embargo, las restricciones del navegador aún impiden
ejecutar una aplicación web completa simplemente desde una memoria USB:
necesita un origen seguro desde el que obtener el código.

<zoom-img src="/medium/img/3787d028d653/image-01.png" alt="Aplicación web convencional con servidor y navegador" width="100%"></zoom-img>

En el esquema habitual, tanto el código como los principales datos de
usuarios están en el servidor.

## Almacenamiento personal

Los navegadores modernos pueden guardar y procesar volúmenes
considerables de datos en el cliente mediante
[IndexedDB](https://en.wikipedia.org/wiki/Indexed_Database_API). Los
límites dependen de dispositivo y navegador, y pueden alcanzar decenas
de gigabytes. Por ello, la información personal de una aplicación puede
residir directamente en el dispositivo de su propietaria o propietario.

<zoom-img src="/medium/img/3787d028d653/image-02.png" alt="Aplicación web personal con datos en el dispositivo" width="100%"></zoom-img>

Algunos datos, por ejemplo para la autenticación inicial, pueden seguir
en el servidor. Pero mover el procesamiento personal principal al
dispositivo reduce las exigencias de la infraestructura central y la
cantidad de información que esta ve.

## El papel del servidor

El servidor todavía distribuye el código y ayuda a trasladar datos entre
personas. Si la destinataria está conectada, el mensaje puede llegar al
instante. Si no, el servidor conserva temporalmente un mensaje cifrado
hasta la siguiente conexión. Se parece al correo POP3 temprano, donde el
servidor guardaba el mensaje hasta que lo recogía el cliente.

<zoom-img src="/medium/img/3787d028d653/image-03.png" alt="El servidor transmite temporalmente datos entre personas" width="100%"></zoom-img>

## WebRTC

Si ambas partes están conectadas, [WebRTC](https://webrtc.org/?hl=en)
puede transferir datos de forma directa; el servidor solo coordina el
contacto inicial. La carga se distribuye entonces entre pares en vez de
atravesar un único nodo central.

<zoom-img src="/medium/img/3787d028d653/image-04.png" alt="Transferencia directa mediante WebRTC" width="100%"></zoom-img>

Con cifrado asimétrico, las partes intercambian claves públicas, cifran
y verifican mensajes. El servidor puede reenviar un búfer cifrado a
quien estaba desconectado sin conocer el contenido. En la práctica
también hay que diseñar protección de claves, verificación de identidad,
copias de seguridad y recuperación de acceso.

## Nubes y pods

Una persona suele tener varios dispositivos con la misma aplicación. Si
cada uno conserva su propia base de datos, hace falta replicación: una
nube personal o pod que sincronice portátil y teléfono.

<zoom-img src="/medium/img/3787d028d653/image-05.png" alt="La misma aplicación en varios dispositivos" width="100%"></zoom-img>

<zoom-img src="/medium/img/3787d028d653/image-06.png" alt="Replicación de datos mediante nube o pod" width="100%"></zoom-img>

Dropbox, Google Drive, OneDrive y planteamientos como
[Solid](https://solidproject.org/about) ya pueden cumplir esa función.
Incluso con un solo dispositivo, un almacenamiento externo sirve como
copia de seguridad si se pierde el teléfono u ordenador.

## Conclusión

Una aplicación web personal no elimina el servidor: redistribuye
responsabilidades. El dispositivo guarda y procesa datos personales; el
servidor entrega código y coordina el intercambio; un almacenamiento
elegido por la persona usuaria sincroniza y respalda los datos. Esta
arquitectura es prometedora si, junto a la privacidad, se diseñan
sincronización fiable, cifrado y recuperación de información.

El almacenamiento personal, los perfiles y la relación entre
dispositivos forman parte de la visión más amplia del navegador recogida
en [El navegador como sistema operativo para desarrollar aplicaciones
modernas](/es/books/browser-as-operating-system.html).
