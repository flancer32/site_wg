# SSR Responsive Behavior

- Path: `ctx/docs/code/web/ssr/responsive.md`
- Template Version: `20260909`
- Changed: `20260909`

## Purpose

Define viewport-dependent composition and attention constraints for the multilingual SSR surface, with the accepted Home mobile-first behavior mapped from product context.

## Shared Reflow Model

- **Wide:** primary navigation is inline; page regions may use multiple columns when relationships remain clear.
- **Medium:** navigation and content grids reduce density; labels and translated content receive more space rather than being truncated.
- **Compact:** navigation uses an explicit keyboard-operable menu; major content collections use one readable column; actions may become full-width.
- **Minimum supported reflow:** content remains usable at `320px` CSS width without horizontal page scrolling.

Viewport changes may alter layout, emphasis, and repetition of navigation actions. They must not remove substantive content, conceal maturity when it changes buyer expectations, hide required actions, or create a different information architecture.

## Home Desktop Attention Contract

Before significant scrolling, a wide-screen visitor must be able to discover both:

- the concise Wired Geese and Alex product-maker proposition;
- at least one real current product or a very direct route into product discovery.

The visitor must not pass through methodology, biography, Alarisa, proof, or a technology inventory before discovering products. Showing a compact hero and featured-product preview side by side is the current preferred design hypothesis because the product can act as opening evidence. It is not a required column structure; another layout is valid when it satisfies the same attention and routing contract. Additional product previews remain part of the same ordered collection regardless of visual grouping.

Later Home regions may use two-column explanation, compact proof rows, or contrast panels from the established visual system, but their visual weight must preserve the product-first sequence defined in `../../../product/home-page-composition.md`.

## Home Compact Behavior

Compact Home is not the desktop page mechanically stacked. It applies these constraints:

1. show only the product-maker proposition, one short support statement, the Products action, and an optional low-emphasis How-it-works action in the hero;
2. place the first current-product preview immediately after the hero;
3. omit proof chips, process diagrams, career history, Alarisa, deployment detail, and technical foundations from the opening;
4. keep each product's identity, result, two or three selected capabilities, and product-path action together; show maturity when it changes buyer expectations, and add fit or proof only when needed;
5. stack additional product previews in commercial order without making a horizontal carousel the only discovery mechanism;
6. render the adaptation bridge as a short inline continuation;
7. shorten the How-it-works preview to no more than three inline principles;
8. keep Alarisa after products and production-model context;
9. limit Home maker/evidence content to a concise accountability statement and no more than two compact proof summaries;
10. keep one dominant final commercial action before the stacked footer groups.

On a common phone viewport, the first product identity and outcome begin before significant scrolling. Longer Russian and Spanish copy may move supporting product detail below the viewport, but no unrelated content region may be inserted before the product. A compact Home preview serves discovery, relevance, and routing; methodology, general trust, deployment, detailed qualification, and deep proof remain owned by Product Detail or supporting destinations so the action stays reachable without excessive scrolling.

## Collection Scaling

- One product uses one recognizable preview without empty sibling cells or decorative status and proof elements.
- Two products become two peers on wide layouts and an explicit ordered stack on compact layouts.
- Larger catalogues use the same product-preview object and a direct Products-catalogue action; adding products does not create new responsive page regions.
- Cards and sections grow with translated content. Fixed-height treatment must not clip meaning or force semantic truncation.

## Accessibility And Enhancement

- Reflow preserves a logical reading and focus order that matches the visible product-first order.
- The compact menu remains keyboard operable, exposes expanded state, and closes through its documented interaction.
- Actions remain distinguishable without relying only on color or position.
- Touch targets, visible focus, reduced-motion behavior, alternative text, and semantic headings follow the shared layout baseline.
- Browser enhancement may improve menu, locale, and link behavior, but core content and navigation remain available from SSR output.

Exact breakpoints, grid definitions, column count, hero/product adjacency, card placement, card dimensions, type sizes, spacing, visual grouping, and visual treatments remain provisional interface and CSS decisions.
