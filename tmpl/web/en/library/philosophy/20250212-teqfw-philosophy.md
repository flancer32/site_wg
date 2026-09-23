---
title: "TeqFW Platform Philosophy"
date: 2025-02-12
---

<zoom-img
            src="/img/brand/teqfw.webp"
            alt="TeqFW Platform Philosophy"
            width="100px"
            style="float: left; margin: 15px 15px 0 0;"
    ></zoom-img>

**Tequila Framework (TeqFW) Philosophy** is my personal perspective on
web development. I, Alex Gusev, have formed this approach based on my
own experience and preferences when creating web applications. At its
core is the pursuit of modularity, flexibility, and adaptability.

This philosophy covers both practical aspects of web development and
more general architectural principles. Its goal is to simplify code
organization, reduce complexity, and increase project resilience to
changes.

Important: my experience focuses on developing **modular monoliths**,
not microservices. The main priority is development and maintenance
convenience without excessive overhead.

The proposed ideas don't require complex theory. Their strength lies in
simplicity and practicality. Tequila Framework (TeqFW) serves as an
example of implementing these principles and as a platform for
experimentation.

## Key Principles of TeqFW

1.  **Single development language:** JavaScript (ES6+) at all
    application levels.
2.  **Late binding:** adapting approaches from Java, C#, PHP — through
    dependency containers and ES6 namespaces.
3.  **Evolutionary resilience:** code is designed with changes in mind
    without rewriting existing implementations.
4.  **Separation of data and logic:** strict isolation of DTOs and
    handlers.
5.  **Namespaces:** for modules, tables, CLI, configurations, and
    packages.
6.  **No transpilation:** pure JS with JSDoc, no TypeScript.
7.  **LLM integration in development:** project structure and style
    account for language model operations.

## Principle Details

### Single Development Language

Using JavaScript (ES6+) on both client and server simplifies
development, lowers the entry barrier, and bridges the gap between
teams. This reduces logic redundancy and facilitates knowledge sharing.

### Late Binding

Dependency containers and namespaces allow flexible management of module
relationships. This approach simplifies testing and reduces risks during
modifications.

### Evolutionary Resilience

Code is designed with changes in mind: function arguments are passed as
objects (destructuring), DTOs allow "extra" fields, interfaces and
injections are used instead of rigid implementations.

### Separation of Data and Logic

DTOs and handlers are separated. This increases modularity, simplifies
testing, and makes code predictable during team collaboration.

### Namespaces

Each entity type — from modules to CLI — is placed in its own namespace.
This simplifies navigation, eliminates conflicts, and sets standards for
code extension.

### No Transpilation

TeqFW uses modern JavaScript without build steps or TypeScript-style
typing. Instead, JSDoc annotations are used, providing IDE support
without complicating the pipeline.

### LLM Integration in Development

The project is organized so LLMs can analyze, supplement, and generate
code. Flat structure, templates, repeating blocks, and minimal nesting
levels are used.

## Conclusion

These principles help build modular monoliths that are easy to read,
develop, and adapt. Even if implementations may be imperfect, the ideas
themselves remain practical and applicable. They give developers a
foundation for independent problem-solving — without dictation, but with
direction.
