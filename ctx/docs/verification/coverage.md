# Verification Coverage

- Path: `ctx/docs/verification/coverage.md`
- Template Version: `20260923`
- Changed: `20260923`

## Purpose

Route every current ordinary document in the four authoritative levels to crosscutting verification. The canonical specification homes are [product evidence](product/evidence.md), [product visitor paths](product/visitor-paths.md), [publication architecture](architecture/publication.md), [runtime boundary](architecture/runtime-boundary.md), [operational prerequisites](environment/operations.md), and [localized delivery](code/delivery.md). The check IDs in the tables resolve to headings in those files. Coverage means a document has an inspection path; it does not mean that every statement is already satisfied.

## Product Sources

| Source | Checks |
| --- | --- |
| [overview](../product/overview.md) | E1, E2, P1, R1 |
| [practitioner positioning](../product/practitioner-positioning.md) | E1, E2, P1 |
| [product system](../product/product-system.md) | E2, E3, P2, R1 |
| [commercial strategy](../product/commercial-strategy.md) | E3, P1, R2 |
| [commercial positioning](../product/commercial-positioning.md) | E3, P1, P2 |
| [PDE and Desks](../product/pde.md) | E2, E3, R1, R2 |
| [Journal and evidence](../product/journal-and-evidence.md) | E1, E2, P3 |
| [software estate](../product/software-estate.md) | E2, P2 |
| [information architecture](../product/information-architecture.md) | P1, P2, P4 |
| [Home composition](../product/home-page-composition.md) | P1, P2 |
| [transferable development](../product/transferable-development.md) | E1, E3, R1 |

## Architecture Sources

| Source | Checks |
| --- | --- |
| [overview](../architecture/overview.md) | E1, P1, R1 |
| [structure](../architecture/structure.md) | P1, P2, R1 |
| [behavior](../architecture/behavior.md) | E1, P1, P3, P4, R1 |
| [state](../architecture/state.md) | E2, P3, R1 |
| [integration](../architecture/integration.md) | E3, P4, R1, R2 |
| [constraints](../architecture/constraints.md) | E1, E3, P2, P4, R1, R2 |
| [decisions](../architecture/decisions.md) | E1, P3, P4, R1 |
| [supervision](../architecture/supervision.md) | E1, E2, E3, R1 |

## Environment Source

| Source | Checks |
| --- | --- |
| [overview](../environment/overview.md) | E3, R1, R2, R3 |

## Code Sources

| Source | Checks |
| --- | --- |
| [code overview](../code/overview.md) | E1, P1, P2, R1 |
| [web overview](../code/web/overview.md) | P1, P2, R1 |
| [SSR overview](../code/web/ssr/overview.md) | P1, P3, R1 |
| [assets](../code/web/ssr/assets.md) | P3, P4 |
| [layouts](../code/web/ssr/layouts.md) | P1, P4 |
| [localization](../code/web/ssr/localization.md) | P4, R3 |
| [navigation](../code/web/ssr/navigation.md) | P1, P2 |
| [page composition](../code/web/ssr/page-composition.md) | P1, P2 |
| [pages](../code/web/ssr/pages.md) | P1, P2 |
| [rendering](../code/web/ssr/rendering.md) | P3, P4, R3 |
| [responsive](../code/web/ssr/responsive.md) | P1, P4 |
| [routes](../code/web/ssr/routes.md) | P2, P4 |
| [UI states](../code/web/ssr/ui-states.md) | P1, P4 |
| [web components](../code/web/ssr/components/web-components.md) | P4, R1 |
| [widgets](../code/web/ssr/components/widgets.md) | P4 |
| [zoom image](../code/web/ssr/components/zoom-img.md) | P4 |
| [About](../code/web/ssr/pages/about.md) | E1, P1 |
| [Alarisa](../code/web/ssr/pages/alarisa.md) | E2, P2 |
| [Contact](../code/web/ssr/pages/contact.md) | E3, P1 |
| [Home](../code/web/ssr/pages/home.md) | P1, P2 |
| [How it works](../code/web/ssr/pages/how-it-works.md) | E1, P1 |
| [Products](../code/web/ssr/pages/products.md) | E2, P2 |
| [Projects](../code/web/ssr/pages/projects.md) | E2, P2 |
| [Work with me](../code/web/ssr/pages/work-with-me.md) | E3, P1 |

## Maintenance Check

Compare this table with `find ctx/docs/{product,architecture,environment,code} -type f -name '*.md'` while excluding `AGENTS.md` and `*.skin.*.md`. Every ordinary source must appear exactly once. Re-read the source before changing check assignments; a new requirement may need a new check rather than an arbitrary existing label.
