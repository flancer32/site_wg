---
title: "TeqFW: Identifying Web Application Installations"
description: "How a mobile PWA distinguishes a browser installation from a user or session, and authenticates it across changing networks."
date: 2022-02-07
---

Mobile PWAs deal not only with intermittent connectivity but also
changing IP addresses as a device moves between networks. A server
therefore needs a way to recognize a particular browser-side application
installation without treating an IP address or browser name as identity.

## frontUUID

PWAs live inside browsers. Resources such as local storage, IndexedDB,
cookies, and cache belong to the browser origin and profile. The same
PWA installed in two browsers, or in two browser profiles, is two
separate installations; two tabs in one profile share the same
resources.

<zoom-img src="/medium/img/8d951d13becf/image-01.png" alt="PWA instances across browsers, profiles, and tabs" width="100%"></zoom-img>

On first start, a Teq application generates a UUID and stores it in
browser storage. All tabs sharing that storage use the same value. TeqFW
calls it `frontUUID`.

## Addressing the frontend

For the backend, requests with the same `frontUUID` belong to one
frontend installation even after its network address changes.

<zoom-img src="/medium/img/8d951d13becf/image-02.png" alt="Backend identifying application installations by frontUUID" width="100%"></zoom-img>

The frontend opens an SSE channel using its identifier, for example
`https://server.example/sse/<frontUUID>`. The backend maps the active
runtime stream to that identifier to send events to the correct
installation. If a new stream arrives for the same identifier — a common
outcome of switching networks — the old stream is closed.

## A UUID is not authentication

A UUID is an address, not proof of possession. Anyone who learns it
could impersonate that frontend and receive messages intended for it,
especially while the genuine installation is offline. HTTPS protects it
in transit, but identifiers can still be exposed through careless
logging or device compromise. UUIDs must not be used as session tokens
or authorization credentials.

## Asymmetric keys and installation identity

To authenticate the installation, first launch generates a key pair as
well as the UUID. The public key and UUID are registered with the
backend; the private key stays in browser storage on the device. The
installation identity is therefore:

``` json
{
  "uuid": "frontend UUID",
  "publicKey": "public key",
  "secretKey": "private key — never send to server"
}
```

The server challenges a newly opened SSE stream. The frontend proves
possession of its private key by signing or decrypting challenge
material; the backend verifies with the registered public key. A stolen
private key defeats this proof, so secure key storage and recovery
policy remain important.

## Connection flow

<zoom-img src="/medium/img/8d951d13becf/image-03.png" alt="Registration and authentication flow for a frontend installation" width="100%"></zoom-img>

1.  On the first run, generate UUID and key pair and persist them in
    IndexedDB.
2.  Register UUID and public key with the backend and receive a backend
    record ID.
3.  Open the SSE stream.
4.  The backend sends an authentication challenge on that stream.
5.  The frontend proves possession of the private key and returns its
    record ID.
6.  The backend verifies with the stored public key, activates the
    stream, and confirms authentication.

On later runs the registration step is skipped. The registration request
is the only synchronous exchange in this design; event messages remain
asynchronous in both directions.

## Summary

A mobile PWA installation is distinct from a user, browser user agent,
session, or IP address. `frontUUID` gives the backend a stable routing
address; a device-held private key provides proof that the installation
is the registered one. This pattern suits reconnecting browser clients,
but it must be combined with standard user authentication,
authorization, secure storage, careful logging, and a recovery story for
lost devices.
