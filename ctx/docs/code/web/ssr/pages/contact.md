# SSR Page: Contact

- Path: `ctx/docs/code/web/ssr/pages/contact.md`
- Template Version: `20260630`
- Changed: `20260630`

## Purpose

Define the implementation-facing SSR page contract for the contact page.

## Semantic Source Of Truth

The product source of truth for site-level priorities is:

- `ctx/docs/product/overview.md`

The current narrow entry offer, when referenced on this page, is defined in:

- `ctx/docs/product/offers/agent-orchestration-poc/overview.md`

This document must not redefine product hierarchy or commercial scope.
It translates accepted commercial meaning into page-level SSR structure.

## Route Role

The page belongs to the top-level standalone SSR page family.

The current route shape is:

- `/{locale}/contact.html`

## Page Role

The contact page is a contact-first conversion surface for the current hot offer.

Its page-level role is:

- to make it clear why writing now is worthwhile;
- to keep `GitHub Flows` visible as the current practical topic;
- to expose direct contact paths without competing with the main storefront role of the home page;
- to support a direct next step for visitors who are already interested.

## Required Structure

The page should preserve this sequence:

1. `Hero`
2. `Hot Offer`
3. `What To Write In The First Message`
4. `Direct Contacts`
5. `Supporting Links`
6. `Short Technical Background`
7. `Business Details`

## Hero Contract

The hero should stay short and communicate:

- that `GitHub Flows` is the current topic;
- that the current offer path is test connection, client-side deployment, and workflow setup help;
- that direct contact options are available below on the page.

## Offer And Contact Contract

The `Hot Offer` block may show current working terms such as:

- `€50` for the hosted GitHub issue AI-agent trial PoC;
- `from €150` for deployment on the client's VPS;
- `€35 / hour` for consultation.

The page may mention `Agent Orchestration PoC` as the smallest entry step under `GitHub Flows`, but it should point to the localized landing page instead of retelling that landing page.

The first-message block should ask only for basic qualification details:

- repository visibility;
- what the visitor wants to test;
- whether the visitor wants the hosted PoC specifically;
- whether the visitor wants a `GitHub Flows` trial run;
- whether the visitor wants a pilot, deployment, or consultation discussion.

## Persistent Data Blocks

The page should preserve these durable blocks:

- direct contact channels with email first;
- supporting links for trust and self-study;
- a short technical background;
- business details as a short factual appendix.

The page may use the photo `/img/avatar.jpg`.

## Composition Expectations

The page should:

- remain a top-level standalone SSR page rather than a `land/` page;
- extend the shared locale layout;
- keep contact data below the offer-focused opening blocks;
- keep page-local copy and ordering in the contact page template branch;
- avoid expanding into a large product page or a full service catalogue.

## Quality Check

A revised contact page remains acceptable when:

- the current reason to write is clear immediately;
- contact details remain easy to find;
- the page still reads as a focused next-step surface rather than a second home page;
- supporting links and business details remain present without dominating the page.
