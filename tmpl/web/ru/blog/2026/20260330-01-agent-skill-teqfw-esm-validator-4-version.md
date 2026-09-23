---
title: "Четвёртая версия agent-skill для проверки ESM-кода"
description: "Собрана четвёртая версия @flancer32/skill-teqfw-esm-validator: 12 проверок для TeqFW-кода и подтверждение, что скилы уже подходят для переноса межпроектных правил."
date: 2026-03-30
display_date: "30 марта 2026"
image: "/img/brand/agent-skills-cover.png"
image_alt: "Четвёртая версия agent-skill для проверки ESM-кода"
---

# Четвёртая версия agent-skill для проверки ESM-кода

<zoom-img src="/img/brand/agent-skills-cover.png"
        alt="Четвёртая версия agent-skill для проверки ESM-кода" width="100px"></zoom-img>

Для **@flancer32/skill-teqfw-esm-validator** была собрана четвёртая версия скила, которая
        фиксирует общий вид исходного кода в TeqFW-проектах. Основная работа была выполнена агентом через
        VSCode-плагин, а результатом стал набор из 12 проверок, который уже работает как переносимый слой
        спецификации. Такой формат позволяет проверять общий вид кода без ручного удержания всех правил в
        голове и постепенно выносить межпроектные правила в библиотеку скилов, экономя токены агентам.

В итоговый набор вошли проверки на наличие `export default`, запрет CommonJS, запрет статических
        импортов и re-export'ов, положение `__deps__` в списке export'ов, структуру `__deps__`, имя
        structured parameter для DI-конструктора, а также ограничения для behavior-классов. Список проверок
        получился таким:

- `RequireDefaultExport` — у модуля должен быть `export default`.

- `NoCommonjs` — запрещены `require()`, `module.exports` и `exports.*`.

- `NoStaticImports` — запрещены статические `import` и статические re-export'ы.

- `DependencyPosition` — `__deps__` должен быть последним top-level export.

- `ValidateDepsExport` — `__deps__` должен быть frozen descriptor object и совпадать с параметрами конструктора.

- `ConstructorClosureBehavior` — у экспортируемого behavior-класса должен быть constructor.

- `ExportedClassBehaviorScope` — проверки class-behavior применяются только к экспортируемым классам.

- `NoClassFieldBehavior` — у экспортируемых классов не должно быть class fields.

- `NoPrototypeMethodBehavior` — у экспортируемых классов не должно быть prototype-методов.

- `NoClassInheritanceBehavior` — экспортируемые behavioral-классы не должны наследоваться от других классов.

- `ModuleTopBlock` — модуль должен начинаться ровно с одного leading JSDoc-блока.

- `ConstructorDepsParameterName` — для DI-конструктора structured parameter должен называться `deps`.

Этот набор покрывает общий вид исходного кода в TeqFW-проектах и задаёт для агентов понятную точку
        контроля: модульную форму, DI-подпись и базовые ограничения на поведение экспортируемых классов.

Практический вывод здесь простой: такие скилы уже работают как переносимый слой спецификации. Они
        позволяют агентам проверять общий вид кода без ручного удержания всех правил в голове и дают основу
        для постепенного выноса межпроектных правил в библиотеку скилов.
