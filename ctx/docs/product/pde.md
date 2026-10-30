# PDE And Desks

- Path: `ctx/docs/product/pde.md`
- Template Version: `20260911`
- Changed: `20261030`

## Purpose and Authority

Define the public and commercial meaning of Personal Digital Embassy Network (PDE) for Wired Geese. The independently maintained PDE skill owns network concepts and contracts; this document is not a second specification. Distinguish accepted v3 design, implementation evidence, owner-reported personal experience and plans.

## Product Relationship

PDE is an independently useful product in the broader Alarisa direction: personal digital representation and controlled delegation of operations over a Person's Resources to external Consumers such as AI assistants. The Person is the ultimate source of Resource authority. PDE is useful in its own right; Alarisa remains a broader long-term direction, not a prerequisite for PDE use or an assertion of Alarisa maturity.

## Current Network Model

The v3 architecture follows `Consumer → Gate → Office → Desk → Resource`. Gate is shared infrastructure owning accounts, OAuth, Consumer Access and routing. Office is an independent Person-controlled application organizing Desks and connecting to multiple Gate accounts. Desk is an independently implementable application integrating Resources, holding Resource credentials in its execution environment, owning Consumer Access Policies and enforcing permitted Operations. An individually approved Consumer Access belongs to one Gate Account; it is not a globally verified Consumer identity. Office does not grant Resource authority.

The Person can develop a compatible Desk independently, including with help from AI coding agents, and attach it through Office subject to the applicable trust and consent. Gate need not persist an authoritative catalogue of Desk types or Operations. Discovery obtains currently permitted Operations from available Desks; Desk checks its current Policy again at execution. Credentials remain in Desk's execution environment. Neither a discovered operation nor request routing proves execution or success.

A Desk may run in a browser or on a computer. If unavailable it cannot execute new requests through itself; already initiated Resource effects may still complete. A Gate operator may see requests and responses in transit; the Person must trust the Desk software and its environment. Do not claim absolute security, universal confidentiality, compatibility, or that a completed effect can be undone. MCP is an external protocol interface, not the product or proof of authorization.

## Current Evidence and Development

The owner reports personally using PDE v1 with ChatGPT for Telegram channels and Porkbun DNS. That experience is not proof of general availability or v3 compatibility. PDE v3 protocols and software are under active development; the owner reports functionality exists but infrastructure readiness for rapid evolution requires further work. Implementation conformance and production readiness require independent evidence. Telegram and Porkbun Desks are planned for v3; do not represent v1 capabilities as verified v3 functionality. Current PDE code is private and opening is planned after stabilization without a committed date.

The public information site https://pde.network/ explains PDE and invites enquiries. The owner is preparing a Gate and plans to register interested testers after software stabilization; enquiries are not immediate registration. Public Garage Gate and Echo Desk pages illustrate work in progress, not proof of end-to-end readiness. The bank-account scenario is an illustration of the desired level of control, not an available banking integration.

## Commercial Direction

PDE remains independently useful within the Alarisa direction. Alex offers to discuss paid help deploying a similar setup on a customer's VPS and creating or adapting Desks. Scope, timing, software availability, support and price are agreed individually. The website does not provision services, establish accounts, or promise immediate access, fixed pricing, guaranteed delivery, or a standard support model. Product-specific work does not reopen unrelated generic consulting or retired offer funnels.

## Telegram Digest Boundary

The Telegram Digest is prepared from a private community's channel through an external PDE deployment and published in the source channel. Wired Geese does not publish or archive the private source content or the digest. The source community is neither owned by nor affiliated with Wired Geese. The digest is not a standalone product or proof that every claimed fact is independently verified. Credentials and session state remain outside the website.

## Evidence and Evolution

The owner's reports, public website and architecture are evidence of their own stated scope, not evidence of external demand, security certification, interoperability, general readiness, commercial validation or future outcomes. Use `journal-and-evidence.md` for claim-specific evidence and `software-estate.md` for repository inventory. Current v3 meaning follows the PDE skill; do not impose obsolete compatibility or migration obligations from earlier versions.
