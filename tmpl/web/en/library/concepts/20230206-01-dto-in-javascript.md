---
title: "DTO in JavaScript"
description: "Information systems are designed to process data, and DTO ([Data Transfer Object](https://en.wikipedia.org/wiki/Datatransferobject)) is an important concept in modern development."
date: 2023-02-06
---

Information systems are designed to process data, and DTO ([Data
Transfer Object](https://en.wikipedia.org/wiki/Data_transfer_object)) is
an important concept in modern development. In the “*classical*” sense,
DTOs are simple objects (without logic) that describe data structures
that are transferred “*over the network*” between remote processes. If
data is transferred between application layers within the same process,
then such DTOs are called [local
DTOs](https://martinfowler.com/bliki/LocalDTO.html).

The key objectives of a DTO are:

- **data structuring**: making it easier for the application developers
  to work with;
- **data transformation**: transform the data from the format used for
  transfer (e.g. JSON, XML, YAML) into the internal format used by the
  application (e.g. JavaScript Object);

Here, I will outline the principles I follow when building DTOs in my
JavaScript applications.

## Simple DTO

In a simple case, the DTO is a flat structure where each attribute is a
[primitive](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)
data type, such as a string or integer:

``` js
class Simple {
  aBool;
  aNumber;
  aString;
}
```

That provides structure. To transform data, the DTO accepts input and
casts its values:

``` js
class Simple {
  constructor(data) {
    this.aBool = Boolean(data?.aBool);
    this.aNumber = Number.parseFloat(data?.aNumber);
    this.aString = String(data?.aString);
  }
}
```

## Complex DTO

A complex DTO consists of other DTOs and primitive values:

``` js
class Complex {
  constructor(data) {
    this.aDto = new Simple(data?.aDto);
    this.aString = String(data?.aString);
  }
}
```

JSON-to-DTO transformation then looks like this:

``` js
const dto = new Complex({
  aDto: {aBool: true, aNumber: 16, aString: 'simple'},
  aString: 'complex',
});
```

## Waterfall Type Casting

For waterfall casting of types in complex objects, connect the code
sources with import and export. These are separate modules:

``` js
// simple.mjs
export default class Simple1 {}
```

``` js
// complex.mjs
import Simple from './simple.mjs';
export default class Complex {}
```

This lets us create deeply nested DTOs and modify individual components.
At each level, the component parses its input fragment, casts data types,
and connects constructors for nested levels.

## Cutting vs. Casting

Suppose input JSON contains `name`, `age`, and `weight`, while a `Person`
DTO handles only the first two properties. We can cut unknown properties:

``` js
this.name = String(data?.name);
this.age = Number.parseInt(data?.age);
```

Or copy everything and cast the known properties:

``` js
Object.assign(this, data);
this.name = String(data?.name);
this.age = Number.parseInt(data?.age);
```

<figure>
<img src="/medium/img/3274a3063919/image-01.png" alt="Cutting and casting data in a DTO" />
</figure>

If our code is the final DTO handler, it is better to eliminate unnecessary
data. An intermediate handler can cast the types it uses and leave
unfamiliar data unchanged.

## Resume

- DTO is a simple object that describes the data structure being
  transferred between remote processes or application layers.
- The main goals of a DTO are data organization and type casting.
- DTOs can have nested structures, making them capable of forming
  complex structures.
- In input data conversion to a DTO, data can either be cut off or have
  its types casted for known properties.
