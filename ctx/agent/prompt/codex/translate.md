# Page Translation Prompt

- Path: `ctx/agent/prompt/codex/translate.md`
- Template Version: `20260629`
- Changed: `20260629`

## Purpose

Reusable prompt asset for multilingual page translation in this repository.

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

Translate the relevant pages from Russian to English.

Adapt the result for an English-speaking reader while preserving meaning.

### Spanish

Translate the relevant pages from English to Spanish.

Adapt the result for a Spanish-speaking reader while preserving meaning.
