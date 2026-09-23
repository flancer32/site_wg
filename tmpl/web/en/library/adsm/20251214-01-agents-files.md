---
title: "AGENTS.md in ADSM: personal experience and takeaways"
description: "AGENTS.md in ADSM: personal experience and takeaways"
date: 2025-12-14
---

## Introduction

This publication describes the use of `AGENTS.md` files in my projects
taking the [Svyazist](https://github.com/flancer64/pwa-home-call)
project as an example.

The Svyazist project is developed by me together with the Codex agent in
the framework of my own ADSM approach. This approach emerged from the
practice of contextual programming with agents and focuses on systematic
handling of context, rules, and architectural constraints during
development.

The publication examines the place that `AGENTS.md` occupies within the
project structure, the functions it fulfills in the workflow, and how it
is used when interacting with an agent. The description is based on the
real project configuration and reflects the practice that has evolved.

- the role of the root `AGENTS.md` in organizing the project;
- the principle of building and using the AGENTS file hierarchy;
- the purpose of the level map and its application when working with
  context;
- the influence of `AGENTS.md` on the agent's behavior when executing
  tasks;
- the structural elements that proved resilient during long-term work.

The publication captures the current state of this practice and serves
as a basis for its further development within the ADSM approach.

------------------------------------------------------------------------

## The typical purpose of `AGENTS.md`

The `AGENTS.md` file is used as [the standard place](https://agents.md/)
for instructions intended for agent tools. It complements the
`README.md` by moving the information that an agent needs into a
separate document.

The typical `AGENTS.md` contains a description of the project structure,
build and test commands, code style conventions, repository rules, and
other instructions that the agent uses when performing tasks.

The file format remains flexible and does not impose strict requirements
on the structure.

For projects with a developed structure, a hierarchy of `AGENTS.md`
files is applied. The agent considers all `AGENTS.md` files along the
path from the repository root to the current working directory, while
instructions that are closer to the working location have priority.

In the Codex agent, this mechanism is implemented directly: the agent
automatically discovers `AGENTS.md`, builds the chain of active
instructions, and applies them during work.

------------------------------------------------------------------------

## Types of `AGENTS.md`

In the ADSM approach, `AGENTS.md` files form a hierarchical system of
instructions where different levels fulfill different functions.

At the top level of the project sits the root `AGENTS.md`. It defines
the general boundaries of the agent's activity, fixes the basic roles,
principles for working with context, and invariants that are preserved
across projects.

Lower in the structure there are local `AGENTS.md` files. Their purpose
depends on their position in the file and conceptual structure. Such
files clarify the rules that apply within a specific space and operate
only within their level boundaries.

Together they form a multi-level instruction system where the root file
sets the common interaction architecture and the local files specify the
agent's behavior in particular parts of the project.

------------------------------------------------------------------------

## Local `AGENTS.md`

Local `AGENTS.md` files are used to define rules and describe the
structure of work at a specific level of the project. That level can
correspond to a portion of the cognitive context or a fragment of the
source code.

    # <Name of the documentation or code level>

    Path: `path/to/AGENTS.md`

    ## Purpose

    <brief description of the purpose of documents/code at this level>

    ## Level Map

    - `dir/` — purpose of the directory at this level.
    - `AGENTS.md` — this document.
    - `file.ext` — purpose of the file at this level.

    ## <Further sections depend on the level>

This structure is used to fix the boundaries of the level and the rules
that apply within it. The level map declaratively describes the contents
of the directory and serves as a compact model of the structure without
opening the files.

The heading indicates which level the file belongs to. The path fixes
its location in the project structure. The purpose section describes the
role of the level and the area of applicability of the instructions.

The remaining sections depend on the type of level: in context they
describe how to work with the documentation and how to modify it, while
in code they describe restrictions and conventions for editing the
source.

Local files are placed only where it is necessary to explicitly fix
rules of work and boundaries of responsibility.

------------------------------------------------------------------------

## Root `AGENTS.md`

Each project has a single root `AGENTS.md` file located at the
repository root. This file is read by the agent first and defines the
general rules of work.

The root `AGENTS.md` sets up the basic project model, including the
split between context and product, and fixes the order of interaction
between them. It also defines the roles of the human and the agent, as
well as how instructions should be taken into account throughout the
project.

The file describes the hierarchy mechanism, requirements for local
instructions, the use of level maps, the protection of significant
comments in the code, and the mandatory reporting at the end of each
iteration.

The root `AGENTS.md` is used unchanged and provides a stable base for
all project rules.

An example of a typical root `AGENTS.md` used in my projects is
available at:\
\<link to the example root AGENTS.md\>

This file specifies a uniform way of working with agents and allows the
same approach to be applied across projects.

------------------------------------------------------------------------

## The impact of `AGENTS.md` on the agent's work

`AGENTS.md` files are not programs in the usual sense. They are not
executed and do not dictate rigid agent behavior. The agent can use
instructions partially or ignore them even if the requirements are
clearly formulated.

In practice, this is evident, for example, in expectations about
reporting. Even though the obligation to finish an iteration with a
report is fixed in the root file, the agent may forget to create such
reports or do it irregularly. This observation is important for properly
understanding the role of `AGENTS.md` in the project.

At the same time, Codex truly scans the project filesystem and detects
`AGENTS.md` files at different levels. You can see this in its behavior
and logs. Thus, the files are read by the agent, but they do not control
it directly.

<zoom-img src="/img/blog/2025/20251214-01-agents-files.png" alt="Screenshot of Codex logs detecting AGENTS.md"
            width="100px"></zoom-img>



------------------------------------------------------------------------

## Limits of governability

Experience shows that instructions in `AGENTS.md` work as guides rather
than commands. They do not guarantee specific actions, but they
influence which context the agent builds for solving a task.

The agent independently collects its working context from the documents
available to it. Which fragments it selects and how it combines them is
not known in advance. This imposes natural limits on how much agent
behavior can be governed through textual instructions.

In this sense, `AGENTS.md` do not directly define behavior, but they
increase the probability that the agent will operate within the expected
boundaries.

------------------------------------------------------------------------

## The root `AGENTS.md` as an entry point

In my projects the root `AGENTS.md` acts as the agent's entry point into
the project. Its task is to give a general idea of the project
structure, roles, and operating principles, not to describe details.

The root file fixes the directions: where the context is located, where
the product resides, which rules are considered basic, and which
invariants must be preserved. Detailing at this level is ineffective and
can overload the context.

This approach allows the agent to orient itself in the project without
being forced to handle excessive instructions at the start.

------------------------------------------------------------------------

## The task context

When performing a specific task, the agent forms its own working
context. This context is assembled from the project documents and
depends on the file structure, their volume, and internal cohesion.

It is important to keep in mind that the agent does not use the entire
project context. It selects fragments that it deems relevant to the task
and combines them according to its internal rules. This process is
opaque and cannot be fully controlled.

Therefore, the author of the project context should not aim to describe
everything in one place, but rather create conditions for forming a
consistent working context for the task.

------------------------------------------------------------------------

## Distribution of meanings

Experience shows that large monolithic documents increase the risk of
contradictions in the task context. When such a file is loaded in full,
the agent has to work with a large volume of diverse meanings, which
complicates forming an internally consistent context.

More stable results come from distributing meanings into several
compact, connected documents. Each such document contains a dense set of
meanings related to a single area or level.

In that case, the agent can more easily compose the working context from
consistent blocks rather than from fragmented parts of one big text.

------------------------------------------------------------------------

## Conditions for effective `AGENTS.md`

`AGENTS.md` work well in tasks that require coordination, compliance
with architectural constraints, and repeatable processes. They are
especially useful in projects with a developed contextual structure and
a long lifecycle.

At the same time, in small or one-off tasks the effect of `AGENTS.md`
may be minimal. In such cases, the agent often relies on the local task
context and its own heuristics.

This means that `AGENTS.md` are not always useful, but primarily where
long-term process control matters.

------------------------------------------------------------------------

## `AGENTS.md` in ADSM

In the ADSM approach, `AGENTS.md` files serve as an anchor for working
with the project context. They define the structure within which the
agent forms working contexts for specific tasks, tying documentation,
rules, and code into a single system.

`AGENTS.md` are not designed to directly control the agent. They do not
prescribe algorithms or guarantee compliance. Their role is to organize
the environment in which the agent operates and to reduce semantic
uncertainty when building the task context.

The root `AGENTS.md` sets the general framework and direction, while
local files specify rules for individual levels. Together they form a
context hierarchy that helps the agent navigate the project structure
and take constraints into account without rigidly tying to specific
scenarios.

This approach does not completely remove uncertainty, but it makes it
manageable and reproducible. It allows agents to be used in complex,
long-lived projects while keeping the context consistent and the process
repeatable.

------------------------------------------------------------------------

*This page corresponds to the second stage of AFKP (Acceptance-First
Knowledge Principle) — "unfolding". The fourth stage ("sense-making")
can be pursued in this [Telegram
channel](https://t.me/alexgusev_lab_en/4) or directly
<a href="https://habr.com/ru/articles/976760/" target="_blank">on
Habr</a>.*

------------------------------------------------------------------------
