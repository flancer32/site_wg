# ADSM event date shift

## Goal

Change the 11 November 2025 ADSM blog entry to the 18 September 2025 date across all locales, including templates and the cover image.

## Actions

- Renamed each per-language template from the `20251111-01-adsm-iterative-and-hierarchical` slug to `20250918-01-adsm-iterative-and-hierarchical`, updating the `blog_item` blocks so the links point to the new paths.
- Adjusted the visible `time` text and `datetime` attributes to 18 September 2025 for the Russian, English, and Spanish pages.
- Renamed `web/img/blog/2025/20251111-01-adsm-iterative-and-hierarchical.png` to the 20250918 slug and wired the new asset into every template.

## Artifacts

- `tmpl/web/en/blog/2025/20250918-01-adsm-iterative-and-hierarchical.html`
- `tmpl/web/es/blog/2025/20250918-01-adsm-iterative-and-hierarchical.html`
- `tmpl/web/ru/blog/2025/20250918-01-adsm-iterative-and-hierarchical.html`
- `web/img/blog/2025/20250918-01-adsm-iterative-and-hierarchical.png`
