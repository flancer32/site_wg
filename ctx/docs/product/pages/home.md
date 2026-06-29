# Home Page

- Path: `ctx/docs/product/pages/home.md`
- Template Version: `20260629`
- Changed: `20260629`

## Page Role

This document is subordinate to `ctx/docs/product/overview.md`.

The home page is a short introductory product storefront.
Its role is to sell the current hot offer quickly, strengthen trust in Alex, and move the visitor to the next action.

The page must not turn into:

- a long manifesto;
- a catalog of all products;
- a technical system explanation;
- a biography page.

## Audience

The main audience is:

- technically competent GitHub users;
- small teams and independent developers;
- people who want a practical pilot rather than an abstract AI-transformation narrative.

## Main Focus

The page should keep one dominant focus: `GitHub Flows` as the current hot offer.

The supporting product hierarchy on the page is:

- `GitHub Flows` as the current hot offer;
- `Tequila Framework` as the main engineering product;
- AI-generated SSG sites on top of TeqFW as the third showcased product;
- the book `Agent-Driven Development` as a supporting method product rather than part of the main trio.

The home page should announce no more than three products.
Everything else should unfold on dedicated pages.

## Hot Offer Meaning

The page should sell `GitHub Flows` as:

- a way to connect AI agents to an existing GitHub process;
- an automated chain around issues, labels, comments, PRs, and other GitHub signals;
- an agent step inside a controlled change chain;
- an observable result inside the GitHub process;
- automation that preserves product-owner boundaries and control.

The central promise is:

`GitHub Flows helps connect AI agents to GitHub and build automatic software-evolution chains from a GitHub event to an agent step, a PR, a label, or another observable result.`

The page should not sell:

- agents as standalone value;
- routine-cost reduction alone;
- universal development automation.

## Hero

The hero should sell a concrete first step rather than methodology.

Current working variant:

- heading: `Automated software-evolution chains on top of GitHub and AI agents`
- supporting text: `I configure GitHub Flows so that GitHub events trigger AI agents and other workflow steps, while product changes move through a controlled automatic chain inside GitHub.`

Hero requirements:

- one primary CTA: discuss a pilot;
- an optional secondary CTA nearby: demo;
- an explanatory link to `/{{ locale }}/library/concepts/20260519-controlled-product-evolution.html` embedded in the text;
- no overload of the first screen with implementation details.

Acceptable technical markers:

- GitHub App;
- webhook;
- Docker;
- CLI agent;
- VPS.

## Page Structure

The home page should preserve this sequence:

1. `Hero`
2. `Who I Am`
3. `Key Products`
4. `Method Layer And Book`
5. `Final CTA`

## Who I Am

This block should quickly answer why Alex can credibly sell this kind of solution.

It should show:

- Alex's engineering profile;
- a focus on JavaScript, self-hosted infrastructure, and agent workflows;
- that Alex uses his own tools in his own products;
- that those tools are also used on this site.

The block should stay short.
It is not a biography or resume.

## Key Products

This section is a compact commercial storefront, not a full portfolio list.

The home page shows only:

1. `Tequila Framework`
2. `GitHub Flows`
3. `AI-generated SSG sites on top of TeqFW`

### Tequila Framework

Positioning:

- the main engineering product;
- a foundational JavaScript platform;
- proof of architectural depth and systematic thinking.

Preferred link:

- `https://teqfw.com/ecosystem/philosophy`

### GitHub Flows

Positioning:

- the current hot offer;
- a workflow approach and software layer around GitHub events;
- a product suitable for pilot adoption.

`GitHub Flows App` is acceptable only as the technical name of the host application.
It is not the primary commercial label.

Preferred explanatory link:

- `/{{ locale }}/library/concepts/20260519-controlled-product-evolution.html`

### AI-Generated SSG Sites On Top Of TeqFW

Positioning:

- a separate applied product;
- sites on top of TeqFW with AI-assisted page generation and translation;
- proof that Alex's tools are used in real working products.

Preferred links:

- `https://cms.teqfw.com/en/`
- `https://cms.teqfw.com/ru/`

## Method Layer And Book

ADSM should sit below the practical offer.
It strengthens trust, but it should not open the page.

The role of this section is:

- to show that the practical offer is backed by discipline;
- to provide an entry to the book `Agent-Driven Development`;
- to avoid competing with the hero for attention.

Book links:

- `http://fly.wiredgeese.com/flancer/leanpub/adsm-en/`
- `http://fly.wiredgeese.com/flancer/leanpub/adsm-ru/`

## Final CTA

The final CTA should reinforce conversion without repeating the hero.

The hero sells the class of solution.
The final CTA sells the next step.

It should lead toward this idea:

- start with a bounded pilot;
- get an observable result;
- then decide which GitHub processes are worth automating further.

The final CTA should sound more concrete than plain `contact`, but it should not duplicate the first-screen wording.

## Quality Check

A new home-page version is successful if:

- the current offer is clear from the first screen;
- the page sells Alex rather than only a tool;
- the `Who I Am` block shows that Alex uses his own tools;
- the page contains no more than three product announcements;
- the final CTA strengthens the desire to start a pilot instead of repeating the hero.
