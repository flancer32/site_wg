---
title: "TeqFW: A Framework That Explains Itself to AI Coding Agents"
description: "How TeqFW packages ship version-matched Agent Skills so coding agents work with guidance aligned to the installed code."
date: 2026-08-10
---

<zoom-img
                src="/img/library/teqfw/20260810-01-teqfw-agent-skills.webp"
                alt="A TeqFW package provides code to the application and a skill to the AI agent"
                width="100%"
        ></zoom-img>

A coding agent can read source code. Given enough time, it can make
sense of an unfamiliar library: find the entry point, inspect the types,
compare examples, and reconstruct the main conventions.

The question is how much time and how much of the model's context window
that investigation will consume—and which version of the documentation
the agent will find along the way.

In
<a href="https://teqfw.com/" target="_blank" rel="noopener">TeqFW</a>, I
address this at the npm package level. Each package can ship an Agent
Skill alongside its code:

``` text
@teqfw/package/
├── src/
├── types.d.ts
└── skills/
    └── teqfw-package/
        ├── SKILL.md
        └── references/
```

Once the package is installed, the agent can access guidance written for
the exact component version present in `node_modules`.

## What goes into a package-owned skill

[Agent Skills](https://agentskills.io/) is an open format for packaging
instructions for AI agents. Each skill uses `SKILL.md` as its entry
point. The file can tell an agent:

- what the package is responsible for;
- when to use the skill;
- how the public contracts are structured;
- how to integrate the component into an application;
- which TeqFW conventions to follow;
- what to verify against the current source code and tests.

The Agent Skills format is not tied to Codex. Other coding-agent
environments support it as well, although discovery paths and
installation methods vary. A TeqFW package ships the skill itself; the
consuming project exposes it in the way its chosen environment expects.

Claude Code follows the same pattern through `.claude/skills/`; the
package remains independent of the agent-specific discovery path.

Reference materials and examples sit alongside `SKILL.md` and are
included in the same npm package.

This is not a README rewritten for another audience. A README helps a
developer get started. A skill gives an agent a route through the
package: which documents to read, which boundaries to preserve, and
which contracts to rely on before changing code.

## The pattern in TeqFW

TeqFW is composed of separate packages. Its platform components ship
their own skills:

``` text
@teqfw/di           → teqfw-di
@teqfw/cfg          → teqfw-cfg
@teqfw/cli          → teqfw-cli
@teqfw/log          → teqfw-log
@teqfw/db           → teqfw-db
@teqfw/web  → teqfw-web
```

For example, the `teqfw-di` skill explains the module-linking model and
the rules for working with the dependency injection container.
`teqfw-cfg` describes configuration sources and lifecycle. `teqfw-db`
defines the boundaries for working with the distributed data model
(DEM), SQL dialects, transactions, and database rebuilds. `teqfw-web`
describes the server-side request pipeline and static resources.

This guidance is scoped to a specific package. It does not replace
project documentation or make architectural decisions for the project
owner. It explains how to use the installed component within the rules
of a particular application.

## Instructions that stay aligned with the code

Suppose an application uses package version `2.4`, but the agent finds
documentation for `3.0` online or recalls an example from an older
release. The resulting code may look plausible while failing to match
the installed API.

When the skill is part of the package, the code and guidance are
versioned together:

``` text
package 2.4
├── code 2.4
└── skill 2.4
```

`package-lock.json` pins the dependency version. In doing so, it also
pins the version of the agent instructions.

Upgrade the package and the skill is upgraded with it. Roll back the
package and the matching instructions return. Instead of relying on an
abstract “latest documentation,” the agent can use the guidance bundled
with the dependency that is actually installed.

## Packages ship skills; projects opt in

Shipping a skill and making it available to an agent are separate
actions.

After `npm install`, the skill is present inside the package:

``` text
node_modules/@teqfw/di/skills/teqfw-di
```

The package does not alter project configuration or mount itself
automatically. The project explicitly gives the agent access to the
skills it needs. In Codex, this can be done with a symbolic link:

``` text
.agents/skills/teqfw-di
    → ../../node_modules/@teqfw/di/skills/teqfw-di
```

For example:

<div id="cb6" class="sourceCode">

``` sourceCode
mkdir -p .agents/skills

ln -s \
  ../../node_modules/@teqfw/di/skills/teqfw-di \
  .agents/skills/teqfw-di
```

</div>

The link can be committed to Git. The repository then records which
skills the project has enabled, while the lockfile records which package
versions provide them.

This separation matters in applications with large dependency trees. A
package being present in `node_modules` does not mean its instructions
should be available to the agent. The project owner chooses the working
set of skills.

[Codex supports skills mounted through symbolic
links](https://developers.openai.com/codex/build-skills), so there is no
need to copy them into the project. The installed package remains the
single source of truth.

## Why this matters in practice

A skill reduces the amount of investigation required before a code
change. The package author gives the agent answers it would otherwise
have to reconstruct:

- where the component's public boundary lies;
- which conventions are mandatory;
- which decisions belong to the package and which remain with the
  application;
- which legacy mechanisms must not be carried into new code;
- how to verify the result.

This does not guarantee a correct result. The agent still needs to
inspect current contracts and tests, and a developer still needs to
review the changes. It does make the starting point reproducible: two
agents working with the same dependency version receive the same
instructions from its author.

For me, this is part of the engineering work behind agent-driven
development. Giving a capable model access to a repository is not
enough. The repository and its dependencies need to expose local rules
clearly, so the agent can distinguish them from general knowledge about
JavaScript and Node.js.

## TeqFW as an agent-ready development platform

TeqFW is built around explicit dependencies, module boundaries, and
contracts available to code-analysis tools. Package-owned skills add
another representation: operational guidance for an AI agent.

A package can expose different representations to different participants
in the development process:

``` text
source code         → runtime
JSDoc and types.d.ts → IDE and static analysis
README              → developer
SKILL.md            → AI agent
```

They are released together and refer to the same component version.

This means I am developing more than a set of JavaScript libraries. I am
also building a working environment that gives AI agents explicit rules
for using them. I apply the same approach when preparing other packages
and applications for agent-driven development: defining boundaries,
formalizing conventions, creating skills, and tying those skills to
component versions.

My working name for this approach is **Dependency-bound Agent Skills**:
agent skills tied to software dependencies. It is not a separate
standard. It is a distribution model in which code and the guidance
required to work with it travel through the same package manager and are
versioned together.

Similar models are being explored outside TeqFW. The Agent Skills
repository contains [a proposal for distributing skills through npm
packages](https://github.com/agentskills/agentskills/issues/81), while
the [skills-npm](https://github.com/antfu/skills-npm) project explores
discovery of skills inside installed dependencies.

TeqFW already uses this approach: packages ship the instructions,
applications select the skills they need, and agents work with guidance
aligned to the installed code.

------------------------------------------------------------------------

### References

- [Agent Skills](https://agentskills.io/)
- [Agent Skills Specification](https://agentskills.io/specification)
- [OpenAI Codex: Agent
  Skills](https://developers.openai.com/codex/build-skills)
- [RFC: Standardize npm/JavaScript Package
  Distribution](https://github.com/agentskills/agentskills/issues/81)
- [npm-based Agent Skills
  Convention](https://github.com/antfu/skills-npm/blob/main/PROPOSAL.md)
- [skills-npm](https://github.com/antfu/skills-npm)
