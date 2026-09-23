---
title: "Declaration of (Non)Dependencies for ESM"
date: 2026-02-25
---

<zoom-img src="https://habrastorage.org/r/w1560/getpro/habr/upload_files/e70/f5f/89c/e70f5f89c3ce225e396777a85357c14e.png" alt="Declaration of (Non)Dependencies for ESM" width="100px" style="float: left; margin: 15px 15px 0 0;"></zoom-img>

My name is Alex Gusev, and today I will tell you how ChatGPT convinced
me to rewrite the **@teqfw/di** library, which I have been carefully
growing since 2019, and why I eventually agreed.

This JS library lets me use late binding in my web applications and
write isomorphic code that runs unchanged in the browser and on the
backend. No transpilation, no manual dependency registration - the way I
used to do it in Java and PHP. I spent almost seven years manually
checking every line of this library, and last week I handed it over to a
Codex agent. This is what it did with it.

KDPV based on the song "Dva korablya" by Agatha Christie.

What I had

I had a library that made it possible to avoid static imports in
application code (early binding) and apply Inversion of Control through
constructor injection (late binding). My typical application code looked
like this:

``` js
export default class Namespace_Package_Module_Component {
    constructor({
        Namespace_Package_Module_Dep1: dep1,
        Namespace_Package_Module_Dep2: dep2,
    }) { /* ... */ }
}
```

My object container (after configuration, of course) analyzed the keys
of the object passed into the constructor and created the dependencies
the constructor needed from those key names (I have many articles on
this topic, where the whole mechanism is described in detail).

If needed, the dependencies could include libraries from nodejs itself
or packages from ./node_mpdules/ (using the node: prefix in the key
name). In the end, static imports were only in the composition root
(bootstrap) and in @teqfw/di itself.

## Time for change

The trouble came from where I did not expect it - from LLM agents. In
IT, it has become common to believe that LLM agents should help create
code. That they are trained on tons of examples and outperform not only
juniors but also mid-level developers. All you need is a clear prompt!

Well, I could not stay on the sidelines of that movement - I tried it
(once, twice, three times). Yes, agents (at least Codex) can generate
code if you give them clear instructions. They write terrible code (from
my point of view), but it works. And most importantly - they do it fast.
Very fast. Almost as fast as saying "blueberry pie".

Yes, I have a somewhat unusual style for wiring JS files, a specific
style for formatting ES6 modules, and for using JSDoc annotations. But
all of that could be handled with ordinary documentation. Agents are
disciplined fellows, whatever people may say about their stochastic
nature.

Naturally, I could not resist trying to entrust the agents with the
development of my most basic package - @teqfw/di. And last week I did
exactly that.

## What the agent got

GPT and I spent the whole week writing the documentation corpus
according to my own ADSM methodology (I also have publications about
that). We moved from level to level, aligning descriptions, terminology,
functionality, architecture, conventions, and so on. Of course I already
knew all of that, but it had to be written down as contextual
documentation that agents could use to write code (or rather, rewrite
it).

There was full understanding with the agents - under my careful
pressure, right up to the moment of generating the library code. I
decided to slightly change the grammar for encoding dependencies so that
tsserver in VSCode could understand the generated code through JSDoc
annotations. There were a couple of unpleasant moments in my current
grammar that conflicted with JSDoc.

So I gave the agent a little freedom on this point. The agent came back
with: from now on you will describe dependencies in application code
like this:

``` js
export const __deps__ = {
    default: {
        dep1: 'Namespace_Package_Module_Dep1',
        dep2: 'Namespace_Package_Module_Dep2',
    },
};
export default class Namespace_Package_Module_Component {
    constructor({ dep1, dep2 }) { }
}
```

"Wow! - I say. - Great! But why like that? That doubles the places where
dependencies are described!! And if you also add a @typedef JSDoc
annotation - that makes it triple!!!"

And it answers me - "I find it more convenient! I do not care whether
there are one, two, or three places if it follows a template. Your DRY
is irrelevant to me, especially if everything is in one file and I do
not have to go anywhere."

Then it started arguing that your dependency assembly approach only
works recursively (as if I did not know that!), when creating an object
through the container, while my (that is, its) approach allows analyzing
the entire dependency tree without creating objects (a fair point, I
will not argue).

## Summary

Do you know what became the agent's ironclad argument? Practice! Not
only did it build code in the library in a couple of passes (ugly code,
I repeat, but working!), which brings late binding into JS without
transpilation and without manual dependency registration in the
container (its container!). It also, in one iteration (2-3 minutes),
migrated my latest project from my old dependency declaration scheme to
its new one.

We used to create software development rules for people, and now those
rules need to be rewritten for agents. And DRY is irrelevant to agents,
plain and simple. They need clarity:

``` js
export const __deps__ = {
    configManager: 'Ttp_Back_Configuration_Manager$',
    storage: 'Ttp_Back_Storage_Repository$',
    aggregateFactory: 'Ttp_Back_Aggregate_Factory$',
    telegramReader: 'Ttp_Back_External_TelegramReader$',
    telegramPublisher: 'Ttp_Back_External_TelegramPublisher$',
    llmTranslator: 'Ttp_Back_External_LlmTranslator$',
    promptProvider: 'Ttp_Back_Prompt_Provider$',
    logger: 'Ttp_Back_Logger$',
};
```

And that is that. No moral here.
