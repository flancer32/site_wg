---
title: "ADSM: top-level directories"
description: "ADSM: top-level directories"
date: 2025-11-22
---

*AFKP stage 3 (immersion). Stage 2 (resonance) is described in the blog
post [ADSM: top-level
directories](/en/blog/2025/20251122-01-adsm-top-level-directories.html).*

## The linguistic nature of agents

The most popular agents used today to build software applications are
based on Large Language Models (LLMs). The main thing that makes an
"*intelligent*" agent is preparing a request for the LLM (a prompt),
then parsing the inference result and recording it as a new text file
(for example, with source code) or as changes to an existing one.

At the moment I can formulate four statements that I call the "*4 ADSM
axioms*":

1.  By its nature, a language model can serve as a tool for transforming
    knowledge into code *without the need to understand it*.
2.  All interaction with the model happens only through text.
3.  The model works only with texts that are statistically significant
    for it.
4.  The model performs inference within a finite context where the
    density of statistical connections declines as the volume grows.

My approach to structuring project files is shaped by these axioms. I
already [noted](https://habr.com/ru/articles/948282/) that a human and
an agent interact iteratively through a hierarchically structured array
of texts. In this publication I describe the top-level directory
structure I currently use in my projects with LLM agents.

## Code and documents

Initially, I split all the files into two GitHub repositories:

- **project documents**: the cognitive context where a human and an LLM
  agent work together.
- **application code (sources)**: the end result of their interaction.

To let the agent act in both spaces, the two repositories were joined
into a single file structure when configuring the cloud version of the
Codex agent. I mounted the documents repository into the `./ctx`
directory of the base repository (with the sources) when starting the
Codex agent, and for the agent it was one file structure even though it
actually spread across different repositories. At the same time, the
agent could commit changes only into the base repository. The project
documents were used in read-only mode.

This experience helped me realize that the same product documentation
can be mounted into different code bases using various programming
languages. The same product can be released as different applications
written for different platforms.

It is obvious that the programming language chosen for implementation
imposes its own requirements on the file structure of the source code
repository. A Python project will differ from a Node.js project, but in
both cases you can mount a `./ctx/` directory into the source repository
and place the cognitive context documents there. Or you can skip the
mounting and create the `./ctx/` directory directly inside the source
repository if the project is not too large. In that case you get a
bonus—the agent can also edit the documentation whenever needed.

## Product and application

From this understanding came the idea that all documentation inside
`./ctx/` can be divided into two unequal parts:

- **business description of the product**: a small corpus of documents
  describing the product idea.
- **rules for creating the corresponding application**: a larger body of
  documents regulating the rules for building the product in the chosen
  programming language or group of languages.

<!-- -->

    ./ctx/
        product/
        rules/


Documents inside `product/` set the skeleton of the future application.
They regulate **what** the application should do but do not explain
*how*. Essentially, these documents define the agent’s field of action
and steer its attention toward business-critical points. This is a
description of statistically unique propositions. Typically each
business idea strives to differ from competing ones, and these documents
contain statements that were unlikely to be part of the model’s training
dataset.

Documents inside `rules/` are the most important part for code
generation or editing by the agent. They govern the agent’s actions at
the level required to write source code. Because of the statistical
nature of LLMs, the more "average" these documents are formulated—the
closer they remain to the training dataset’s "average"— the less text
the agent needs to generate working source code guided by these rules.

In my demo project I built a web application using my own object
container with dependency injection in the constructor, which required
several separate documents inside `./rules/` that regulated how new ES6
modules could be created for the container.

## Human communication with the agent

    ./ctx/
        agent/


Broadly speaking, this directory stores operational information that
immediately becomes archival. Through this catalog the agent reports to
its supervisor (a human) what actions it undertook during the current
iteration of work on the code (task execution). Typically the person who
assigns a task stays within the task context at the moment of setting
it, but that context dissipates and is forgotten quickly (roughly within
two weeks, in my experience).

If a person works alone on a project, like me, the need for such reports
is not obvious—the agents work fast enough that I do not have time to
lose the task context (less than an hour). But for team development or
longer projects, such reports help any "meat" team member restore the
development context when it is lost. They are also useful if the agent
executes commands incorrectly—analyzing them helps identify why the
agent misunderstood the task.

Initially, when I separated the context documents and sources into
different repositories, this directory did not belong to the cognitive
context because it had to be part of the base repository in order to
commit changes in the cloud version of the Codex agent. When running the
CLI version of the agent or when both the sources and the cognitive
context are in the same repository, the `./agent/` directory can live
inside the cognitive context (`./ctx`).

## Summary

Since the heart of any agent—not only Codex—is preparing a prompt for an
LLM and transforming the inference result, the files in a project should
be arranged to account for the nature of LLMs. In my case this results
in the following top-level directory structure:

    ./ctx/
        agent/
        product/
        rules/


This structure is not an established standard—it simply reflects my
experience with the Codex agent. Broadly speaking, I have reflected on
and recorded my practice in this publication. The subdirectory structure
at lower levels is already taking shape, but I am not ready to lock it
in yet. You can explore the structure I describe in my [demo
project](https://github.com/flancer64/pwa-home-call/tree/milestone/20251122-adsm-top-level-dirs).

*You can implement AFKP stage 4 (sense-making) in this [Telegram
channel](https://t.me/alexgusev_lab_en) if you wish.*
