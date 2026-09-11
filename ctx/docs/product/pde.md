# PDE And Desks

- Path: `ctx/docs/product/pde.md`
- Template Version: `20260911`
- Changed: `20260911`

## Purpose

Define the product meaning, current public boundary, and commercial role of Personal Digital Embassy (PDE) and its Desks at Wired Geese.

## Product Relationship

Alarisa is the broader, long-term direction for interaction between one Principal and digital Assistants. PDE is an independently useful product within that direction: personal infrastructure through which a person can give compatible software controlled access to selected digital services and resources.

PDE has its own Runtime, Owner-controlled access boundary, Desks, installation model, and possible user deployments. It is therefore both a practical product and evidence for the broader Alarisa direction. PDE does not reduce Alarisa to a utility, and Alarisa's ongoing experimental status does not prevent an independently useful PDE capability from being deployed early.

```text
Alarisa direction
  -> PDE personal infrastructure
    -> Desk for one coherent service
      -> controlled capability for the represented person
```

## Runtime, MCP, And Desks

A PDE Runtime represents one person and administers controlled, revocable delegation to compatible software Clients. A Desk is a functional PDE module for one coherent service or domain. It exposes its own operations, capability and permission semantics, and authorization decisions. A Desk is not merely an internal plugin when it offers a useful user-facing capability: it can be part of a full PDE deployment, a practical entry point, and an independently valuable product surface.

MCP is a technical protocol projection through which compatible agents can call selected PDE operations. It establishes neither a product category nor permission. The commercial proposition is a controlled PDE deployment or Desk capability for the person's own account and agents; it is not arbitrary MCP integration work.

## Current Telegram Desk

Telegram Desk is the current clearest independently useful Desk. In a person's own PDE deployment, it can give a compatible AI agent controlled access to that person's Telegram account or bot connection. The current executable slice supports account information, contact listing, known-chat listing and lookup, known-chat search, chat history, and plain-text message sending. Chat reads require a TDLib user connection; the Bot API connection does not provide those read operations.

The person configures the connection and explicit permissions. The Runtime evaluates current delegation before the Desk executes an operation; Telegram credentials, QR-login material, session state, and private configuration stay on the trusted deployment side. The product does not grant an agent unrestricted account access merely because the agent speaks MCP.

This is working early software, not a mature hosted service or a promise that every Telegram capability is available. It is useful for a person who wants their compatible agent to work with their own Telegram through controlled personal infrastructure, rather than asking Alex to build a Telegram integration inside an unrelated system.

## Near-Term Product Monetization

PDE and independently useful Desks may be offered before the whole Alarisa direction is mature. Valid early product paths include a managed PDE installation, Telegram Desk setup, supported early access, deployment on the user's own VPS, and future useful Desks as they become ready.

These are paid early product deployments: they can generate revenue and validate the product in real use. They are not generic consulting, staff augmentation, an MCP-integration offer, or an automated website provisioning promise. Scope, supported configuration, installation responsibility, price, access, updates, and support boundaries are agreed directly for each deployment.

## Pricing And Legacy Boundary

No canonical numeric PDE, Telegram Desk, installation, or support price is currently established in this context. A low-priced early deployment would not be legacy merely because of its price, but a price requires product-specific authority before publication.

The former GitHub Flows / Agent Orchestration PoC, its EUR 50 repository pilot, generic EUR 35-per-hour workflow work, and unrelated trial/setup funnels remain retired. They must not be confused with, restored as, or used to price PDE product deployments.

## Evidence Boundary

The public capability statement above is grounded in the current `pde-runtime` and `pde-desk-telegram` repositories. It does not establish external adoption, production reliability, security certification, commercial validation, a standard support model, or a guaranteed deployment outcome. `software-estate.md` remains the inventory authority and `journal-and-evidence.md` governs claim-specific evidence.
