---
title: "Key Principles of Documentation Creation"
description: "A practical guide to structuring documentation so people and language models can build context, navigate topics, and understand a subject."
date: 2025-02-12
---

<zoom-img
            src="/img/brand/doc.svg"
            alt="Key Principles of Documentation Creation"
            width="100px"
            style="float: left; margin: 15px 15px 0 0;"
    ></zoom-img>

## Terminology

- **Documentation audience** — a group of people and/or language models
  (LLMs) who use documentation to form cognitive context. Includes end
  users, developers, analysts, and other stakeholders.
- **Cognitive context** — the combination of knowledge, experience,
  expectations, and motivation that determines information perception
  and interpretation. Includes both prior knowledge and current goals.
- **Documentation subject** — the product, process, or concept being
  described in the document: software, methodology, business process,
  etc.

## Introduction

Documentation is the process of synchronizing the cognitive context of
the audience (people and LLMs). The goal is to provide a comprehensive
understanding of the subject, starting with general concepts and moving
to details. Information is presented hierarchically, without
duplication, allowing both quick familiarization and deep dive.

## Reader's Context Immersion

The documentation structure should facilitate the reader's quick
immersion into the cognitive context of the subject. This is achieved
through logic, sequence, and sufficient depth of presentation.

## Hierarchy and Structure

Information is presented by levels: from general to specific. Each level
complements the previous one and forms a coherent sequence focused on
the reader's current tasks.

### Documentation Levels

- **Title** — a brief name reflecting the essence.
- **Summary** — a very brief description of the meaning (mental anchor).
- **Introduction** — document purpose, its audience, context setting.
- **Overview** — a brief summary allowing relevance assessment.
- **Main section** — detailed description, structured by subject area.

### Volume Recommendations

- Title: 5–10 words, maximum \< 20
- Summary: 30–50 words, maximum \< 150
- Introduction: 10–20 words, maximum \< 50
- Overview: 50–100 words, maximum \< 250
- Main text: 1000–3000 tokens, maximum \< 8000
  (<a href="https://platform.openai.com/tokenizer"
  target="_blank">tokenizer</a>)

## Navigation Accessibility

Documentation is an interconnected structure where each document covers
one aspect. Hyperlinks, tables of contents, and cross-references should
aid navigation. The reader should always understand their position in
the structure and have the ability to jump to related topics or return
to the overview.

## LLM Orientation

Documentation should account for language models' characteristics and be
formatted in Markdown. Key information should be at the beginning of
sections. It's important to use consistent terminology and avoid
ambiguity. The structure should be logical, hierarchical, with clear
heading and list markup. Sections should be self-contained but
interconnected.
