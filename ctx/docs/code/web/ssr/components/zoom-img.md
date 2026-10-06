# Web Component: `zoom-img`

- Path: `ctx/docs/code/web/ssr/components/zoom-img.md`
- Template Version: `20260630`
- Changed: `20261006`

## Purpose

Provide an optional enlarged view for authored article and library images while preserving useful image text and keyboard access.

## Element Contract

- Tag: `zoom-img`.
- Required attribute: `src` identifies the delivered image asset.
- Image URLs are assigned after connection and refreshed when `src`, `alt`, or `width` changes.
- Missing, empty, or literal `null`/`undefined` image sources leave both internal images without a `src` attribute and disable the trigger; they must never become relative requests.
- Optional attribute: `alt` provides the image alternative and labels the enlarged view.
- Optional attribute: `width` constrains the thumbnail while the full view remains viewport-bounded.

## Visible States

- `thumbnail` — the image is shown in document flow through a button with a visible keyboard focus state.
- `expanded` — a modal full-screen view is visible over the page.
- `closed` — the modal is removed from the accessibility and visual flow, and focus returns to the trigger.

## Interaction And Accessibility

- Pointer or keyboard activation of the thumbnail opens the expanded view.
- The dedicated close button, the backdrop, or `Escape` closes the view.
- The expanded view uses dialog semantics and prevents background-page scrolling.
- Both thumbnail and expanded image preserve the authored alternative text.
- Reduced-motion preference removes non-essential thumbnail animation.

## Implementation Anchor

The delivered module is `/js/comp/zoom-img.js`, loaded by every locale layout.
