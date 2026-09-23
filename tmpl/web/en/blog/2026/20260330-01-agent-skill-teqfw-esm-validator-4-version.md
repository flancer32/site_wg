---
title: "Fourth version of the agent-skill for ESM code checks"
description: "The fourth version of @flancer32/skill-teqfw-esm-validator adds 12 checks for TeqFW code and shows that skills are already useful for moving shared rules into a portable layer."
date: 2026-03-30
display_date: "March 30, 2026"
image: "/img/brand/agent-skills-cover.png"
image_alt: "Fourth version of the agent-skill for ESM code checks"
---

# Fourth version of the agent-skill for ESM code checks

<zoom-img src="/img/brand/agent-skills-cover.png"
        alt="Fourth version of the agent-skill for ESM code checks" width="100px"></zoom-img>

The fourth version of **@flancer32/skill-teqfw-esm-validator** was built to pin down the
        overall shape of source code in TeqFW projects. Most of the work ran through the VSCode extension,
        and the result was a set of 12 checks that serves as a portable specification layer. This format
        keeps shared code rules out of manual memory, moves them into skills step by step, and saves tokens
        for agents.

The checks cover default export presence, CommonJS bans, static import and re-export bans, the
        position of `__deps__` among top-level exports, the shape of `__deps__`, the
        name of the structured parameter in the DI constructor, and the behavior-class constraints. The list
        is:

- `RequireDefaultExport` — the module must have `export default`.

- `NoCommonjs` — `require()`, `module.exports`, and `exports.*` are forbidden.

- `NoStaticImports` — static `import` statements and static re-exports are forbidden.

- `DependencyPosition` — `__deps__` must be the last top-level export.

- `ValidateDepsExport` — `__deps__` must be a frozen descriptor object and match the constructor parameters.

- `ConstructorClosureBehavior` — an exported behavior class must have a constructor.

- `ExportedClassBehaviorScope` — class-behavior checks apply only to exported classes.

- `NoClassFieldBehavior` — exported classes must not have class fields.

- `NoPrototypeMethodBehavior` — exported classes must not have prototype methods.

- `NoClassInheritanceBehavior` — exported behavior classes must not inherit from other classes.

- `ModuleTopBlock` — the module must start with exactly one leading JSDoc block.

- `ConstructorDepsParameterName` — the structured parameter in the DI constructor must be named `deps`.

The practical takeaway is simple: skills like this already work as a transportable rule set. They let
        agents check the common shape of the code without holding every rule in memory and make it realistic
        to move cross-project specifications into a skill library.
