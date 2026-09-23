---
title: "TeqFW: Cross-Boundary Events"
description: "How a mobile PWA can move events between browser and server through queues, SSE, POST, and explicit delivery metadata when the network is unstable."
date: 2022-02-02
---

TeqFW targets mobile PWAs that must survive unreliable Internet access.
A classic request-response exchange is a poor fit for every interaction
in that environment, so frontend and backend coordinate through events.
This article describes the platform pattern for transferring those
events across the network boundary.

## Two one-way channels

Each browser client has one channel for events going to the server and
one for events coming back. Browsers cannot accept incoming connections
like servers, so both channels are initiated by the browser:

- browser → server: a standard POST request;
- server → browser:
  [EventSource](https://developer.mozilla.org/en-US/docs/Web/API/EventSource)
  / Server-Sent Events (SSE).

Both channels are one-way from publisher to subscriber. The POST
response is only an acknowledgement, not a synchronous business reply;
SSE provides no reverse response through the same channel.

<zoom-img src="/medium/img/73579bb1df2/image-01.png" alt="One-way frontend-server event channels" width="100%"></zoom-img>

An event that originates on one side and is handled on the other is
cross-boundary.

## Event queues

Offline-capable PWAs need buffers for messages that cannot currently
cross the network.

<zoom-img src="/medium/img/73579bb1df2/image-02.png" alt="Event bus, event portal, and event queue" width="100%"></zoom-img>

Each side has an *Event Bus*, notifying local subscribers about both
local and remote events. An *Event Portal* moves cross-boundary messages
to the bus on the other side. When delivery is impossible, an *Events
Queue* persists the message until connectivity returns. The arrangement
is symmetric in both directions.

## Watching connectivity

The frontend owns connection establishment. If `navigator.onLine` says
the browser is offline, it stores outgoing messages in an
IndexedDB-backed queue. If the Internet exists, it tries to establish
the backend SSE channel. If SSE cannot be established, the server is
treated as unavailable and messages remain queued.

Reconnect attempts may start every few seconds and back off over time.
Once both directions are available, queued browser and server messages
are transferred. This is deliberately closer to a datagram model than a
synchronous request model: a message can become stale or get lost.
Business logic must therefore reconcile state, acknowledge critical
messages asynchronously, retry when appropriate, and make handlers
idempotent. A queue alone does not guarantee exactly-once delivery.

## Frontend UUID

One backend serves many browser installations. Different browsers,
browser profiles, or devices have separate cookies, caches and IndexedDB
stores even when they load the same PWA. During installation, a Teq
application generates a frontend UUID and keeps it in browser storage.

<zoom-img src="/medium/img/73579bb1df2/image-03.png" alt="Backend communicating with multiple frontend instances" width="100%"></zoom-img>

The backend uses this UUID to address a particular frontend and to close
a duplicate SSE connection if, for example, a network switch leaves an
old connection hanging. It is an identifier of an application
installation, not a session ID or access token; authentication and
authorization remain separate concerns.

## Message shape

A cross-boundary message is JSON with business data and routing
metadata:

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

`data` holds business content. `meta` identifies the event type, this
message, its publication time in UTC, and the sending or destination
frontend. These fields make routing, deduplication, expiration and
observability possible.

## Summary

Smartphone-oriented web applications need to operate through
intermittent connectivity. Event-driven communication with persisted
queues can be more realistic than pretending every request has a stable
synchronous response. The price is explicit delivery semantics: messages
need metadata, handlers need to tolerate retries and loss, and the
application must synchronize state when the network reconnects.
