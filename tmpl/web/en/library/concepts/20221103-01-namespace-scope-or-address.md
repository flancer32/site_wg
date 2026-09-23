---
title: "Namespace: scope or address?"
description: "In this post I’ll compare the namespace concept in Java/PHP/JS and I’ll try to answer the question in the title."
date: 2022-11-03
---

In this post I’ll compare the `namespace` concept in Java/PHP/JS and
I’ll try to answer the question in the title.

First of all, what is `namespace` in common? Wiki
[says](https://en.wikipedia.org/wiki/Namespace):

> In computing, a namespace is a set of signs (names) that are used to
> identify and refer to objects of various kinds. A namespace ensures
> that all of a given set of objects have unique names so that they can
> be easily identified.

So, in a common `namespace` is something related to identification and
referencing (i.e. addressing).

> A namespace name may provide context (scope in computer science) to a
> name, and the terms are sometimes used interchangeably.

… and is something related to scopes too.

## Java

I guess `namespaces` in Java were from the beginning — they already were
when I first time learned to write Java code many years ago. `Namespace`
in Java [is called](https://en.wikipedia.org/wiki/Java_package) a
`package`:

``` java
package java.awt.event;
```

Each Java class lives in a separate file. Packages and files form a
hierarchy such as `java/applet/AppletContext.java` and
`java/awt/event/ActionListener.java`.

It is very easy to navigate Java code — sources
for`java.applet.AppletContext` class will be in
`./java/applet/AppletContext.java`, sources
for`java.awt.event.ActionListener` class will be in
`./java/awt/event/ActionListener.java`.

The uniqueness of identifiers within a `namespace` is provided by a file
system. Each `package` (`namespace`) forms its own context where all
classes without explicit access control modifiers are available to each
other (see
[package-private](https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html)).

For global coverage of all Java code with `namespaces`, the language
designers have proposed using
[DNS](https://en.wikipedia.org/wiki/Domain_Name_System) to ensure that
identifiers are unique throughout the all Java code. You should use
package `com.company` if you are an owner of domain `company.com`.

So, I consider that `namespaces` in Java are firstly about
identification (addressing) and only secondly about scopes (contexts).

## PHP

`Namespaces` appeared in PHP since [version
5.3](https://www.php.net/manual/en/language.namespaces.rationale.php)
and they are closer to the filesystem than `namespaces` in Java:

``` php
namespace Zend;
```

Unlike Java, a PHP file can declare more than one namespace, although
combining them in a single file is discouraged.

`Namespaces` in PHP can be
[nested](https://www.php.net/manual/en/language.namespaces.nested.php):

``` php
namespace Project;
use Project\ModuleA as ModA;

$modA = new ModuleA();
$modA2 = new ModA();
```

Namespaces can be addressed absolutely or relatively, much like paths
in a filesystem. An alias resembles a symbolic link.

PHP `namespaces` have more flexible options for addressing code elements
than Java `packages` but both languages allow IDE (and the developer) to
find source code by
[FQN](https://en.wikipedia.org/wiki/Fully_qualified_name).

Of cause, each `namespace` in PHP sets its own scope, just like a
`package` in Java. I believe it’s a natural ability of the `namespace`.

## JavaScript

`Namespace` in JS is not a concept of language itself. JS does not
contain any statements like `namespace` or `package` and the question
“[How do I declare a namespace in
JavaScript?](https://stackoverflow.com/questions/881515/how-do-i-declare-a-namespace-in-javascript)”
is a very-very old question that has more than one [right
answer](https://www.oreilly.com/library/view/learning-javascript-design/9781449334840/ch13s15.html).
The most popular answer I know — “*just create named scope*”:

``` js
const MyNamespace = (function () { /* ... */ })();
```

Unlike Java and PHP, a JavaScript namespace is primarily a scope, not
an address. Nested scopes can each define a `myFunc`:

``` js
const MyNamespace = (() => {
  function myFunc() { console.log('Main space.'); }
  return {fn: myFunc};
})();

((mainSpace) => {
  function myFunc() { console.log('Nested space.'); }
  mainSpace.subSpace = {fn: myFunc};
})(MyNamespace);

MyNamespace.fn();
MyNamespace.subSpace.fn();
```

But different `myFunc`s still cannot be addressed uniquely. An IDE’s
*Copy Reference* action returns only `myFunc`, without a namespace.

It is a big problem of this language — we don’t have one commonly used
rule to address code elements (constants, objects, functions, classes)
globally. To address for developer, not for computer. Try to launch the
‘*Find Usage*’ action for any of `myFunc`s in any IDE. This action is
almost useless in a big (a really big!) projects. Perhaps, this moment
is a one of the reasons for the
[TypeScript](https://www.typescriptlang.org/) appearance many years ago.

Of cause, modern JS with [ES6
modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
and with [npm](https://en.wikipedia.org/wiki/Npm_(software)) is closer
to enterprise level language than it was in 2012 (when `TypeScript`
first appeared). But JS is not as convenient for large projects as
Java/PHP because of the lack of the right `namespaces`.

## Resume

So, what is the answer to the question in the title? I’m sure, the
`namespace` is an address ***and*** is a scope. It’s like a regular post
address and a real place.

<figure>
<img src="/medium/img/9037fada36f2/image-01.jpg" alt="Image 2" />
</figure>

Every post address matches a real place but not every real place has its
own address. But more importantly, `namespace` is about addressing in
source code (for developers), not about addressing in runtime (for
computers). In my opinion of course :)

If you enjoyed this article, please give it a clap and follow me for
more content!

Stay connected:

- [GitHub](https://github.com/flancer64)
- [LinkedIn](https://www.linkedin.com/in/aleksandrs-gusevs-011ba928/)
- [Upwork](https://www.upwork.com/freelancers/~0181de0a64c6981497)

Thank you for your support!
