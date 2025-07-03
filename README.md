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
TEQ_CMS_LOCALE_ALLOWED=en,ru
TEQ_CMS_LOCALE_BASE_DISPLAY=en
TEQ_CMS_LOCALE_BASE_TRANSLATE=ru
TEQ_CMS_TMPL_ENGINE=nunjucks
```

* `TEQ_CMS_LOCALE_ALLOWED` — comma-separated list of supported locales.
* `TEQ_CMS_LOCALE_BASE_DISPLAY` — default locale for URL redirection.
* `TEQ_CMS_LOCALE_BASE_TRANSLATE` — source locale for translations.
* `TEQ_CMS_TMPL_ENGINE` — template engine to use (`nunjucks` is recommended here).

## File structure

Templates and translations are stored as:

```
tmpl/web/
├── en/
│   └── about.html
├── ru/
│   └── about.html
├── es/
│   └── about.html
```

## Commands

### Start development server

```bash
npm start
```

This runs a local web server with SSR and locale routing.

### Translate content

```bash
npm run translate
```

This uses LLM to auto-translate `.html` files from the base locale to the others.
The translation metadata is stored in `/var/teq-cms/db_translate.json`.

## License

Apache-2.0

 