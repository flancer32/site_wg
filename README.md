# wiredgeese.com

The source code of the personal website [wiredgeese.com](https://wiredgeese.com), powered by [TeqCMS](https://cms.teqfw.com/) — a minimalist multilingual CMS with AI-assisted localization and server-side rendering.

## Features

- Static multilingual site with Nunjucks templates.
- Server-side rendering (SSR) without a database or frontend build.
- AI-powered translation system based on OpenAI-compatible API.
- Content stored as HTML files in Git.

## Requirements

- Node.js >= 20
- Access to OpenAI-compatible API (for translation)
- `@flancer32/teq-cms` (included in dependencies)

## Configuration

The site is configured via environment variables. Set these before starting the server:

```env
TEQ_CMS__BASE_URL=https://wiredgeese.com
TEQFW_TMPL__ALLOWED_LOCALES=en,ru,es
TEQFW_TMPL__DEFAULT_LOCALE=en
TEQ_CMS__LOCALE_BASE_TRANSLATE=ru
TEQFW_TMPL__ENGINE=nunjucks
TEQFW_WEB__PORT=3000
TEQFW_WEB__TYPE=http
APP__EMAIL_HOST=smtp.example.com
APP__EMAIL_PORT=465
APP__EMAIL_SECURE=true
APP__EMAIL_TO=recipient@example.com
APP__EMAIL_AUTH_USER=sender@example.com
APP__EMAIL_AUTH_PASS=app-password
```

- `TEQ_CMS__BASE_URL` — trusted public origin used for canonical and alternate links.
- `TEQFW_TMPL__ALLOWED_LOCALES` — comma-separated list of supported locales.
- `TEQFW_TMPL__DEFAULT_LOCALE` — default locale for URL redirection.
- `TEQ_CMS__LOCALE_BASE_TRANSLATE` — source locale for translations.
- `TEQFW_TMPL__ENGINE` — template engine to use (`nunjucks` is recommended here).
- `TEQFW_WEB__PORT` and `TEQFW_WEB__TYPE` — web-server transport settings.
- `APP__EMAIL_*` — SMTP transport and recipient settings for form submissions. The `@teqfw/cfg` reader projects these values from the `APP` namespace; do not commit real credentials. Use port `465` with `APP__EMAIL_SECURE=true`, or usually port `587` with `APP__EMAIL_SECURE=false` for STARTTLS.

## File structure

Templates and translations are stored as:

```
tmpl/web/
├── en/
│   └── about.html
├── es/
│   └── about.html
├── ru/
│   └── about.html
```

## Commands

### Start development server

```bash
npm start
```

This runs a local web server with SSR and locale routing.

### Validate the site

```bash
npm test
```

This checks render-data metadata, journal-card normalization, localized 404 behavior, form protection, and sitemap/template consistency.

### Refresh the sitemap

```bash
npm run sitemap
```

This regenerates `web/sitemap.xml` from the current English, Russian, and Spanish templates with reciprocal alternate links.

### Translate content

```bash
npm run translate
```

This uses LLM to auto-translate `.html` files from the base locale to the others.
The translation metadata is stored in `/var/teq-cms/db_translate.json`.

## License

Apache-2.0
