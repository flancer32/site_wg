# SSR Page: Contact

- Path: `ctx/docs/code/web/ssr/pages/contact.md`
- Template Version: `20260630`
- Changed: `20260910`

## Purpose

Define the shared direct-human commercial handoff and current query-context boundary.

## Current State

`/{locale}/contact.html` is the established localized handoff. It supports render contexts `default`, `commercial`, `mcp-integration`, `chatgpt-telegram`, and legacy `product`; unknown values use `default` and never reflect into public copy. The optional `topic` query records inbound context rather than a page identity; variants retain the clean canonical URL and locale alternates. This is current implementation state, not permanent offer taxonomy.

## Target Role

The handoff supports context from current offers and aligned needs without making Telegram the default commercial object. It may help start a conversation about MCP integration, paid validation, an owned capability, emerging ADSM work, or another qualified aligned need. The site does not perform automated qualification, payment, provisioning, or delivery.

No contact surface requests credentials, session data, client-host secrets, broad administrative access, or customer cognitive context as ordinary fields. The current page has no form or mail pipeline; any future form or topic needs architecture and product approval. GitHub Flows remains historical and supplies no form or lead-flow contract.
