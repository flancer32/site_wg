# Page Translation Prompt

- Path: `ctx/agent/prompt/codex/translate.md`
- Changed: `20260630`

## Purpose

This is an execution prompt for an agent that performs multilingual page translation in this repository.

The agent must translate all changed and new documents located under `tmpl/web/ru/**`.

## Pages

- Source page pattern: `tmpl/web/ru/**/*.html`
- English target pattern: `tmpl/web/en/**/*.html`
- Spanish target pattern: `tmpl/web/es/**/*.html`

## Task

Translate the requested Russian pages according to the default translation chain defined below.

Preserve the page structure, translate only user-facing text, and keep links, markup, and technical identifiers consistent with the source unless the task explicitly requires changing them.

## Default Translation Chain

The default chain is:

- translate from Russian to English;
- translate from English to Spanish.

This preserves the current repository workflow for multilingual page evolution.

## Translation Requirements

- Preserve the original meaning and approximate text volume.
- Adapt the result for the stylistic expectations of the target-language reader.
- Remove literal calques, russisms in English, and anglicisms in Spanish.
- Prefer natural phrasing over word-for-word correspondence.

## Review Pass

After the initial translation, run a second editorial pass on each target language.

The second pass should:

- detect tone drift from normal English or Spanish usage;
- remove overly literal constructions;
- improve fluency without changing the meaning.

## Language-Specific Rules

### English

Translate the relevant source pages from Russian to English.

Adapt the result for an English-speaking reader while preserving meaning.

### Spanish

Translate the corresponding English pages from English to Spanish.

Adapt the result for a Spanish-speaking reader while preserving meaning.
