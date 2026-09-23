---
title: "Nuevo artículo: Enlace temprano vs tardío en JavaScript"
description: "Explico las diferencias clave entre early y late binding y su impacto en la arquitectura del código."
date: 2024-11-12
display_date: "12 de noviembre de 2024"
image: "/img/blog/2024/11/12-01.png"
image_alt: "Artículo sobre binding en JavaScript"
---

# Nuevo artículo: Enlace temprano vs tardío en JavaScript

<zoom-img
            src="/img/blog/2024/11/12-01.png"
            alt="Enlace temprano vs tardío en JavaScript"
            width="100px"
            style="float: left; margin: 15px 15px 0 0;"
    ></zoom-img>

He publicado un artículo en [Medium](https://flancer32.com/understanding-early-vs-late-binding-in-javascript-d80c6b985f4b)
        y [Habr](https://habr.com/ru/articles/856578/), donde comparto mi perspectiva sobre las diferencias
        entre el **enlace temprano** y el **enlace tardío** en JavaScript.

A través de ejemplos prácticos, explico cómo estos enfoques afectan la estructura del código y cómo se relacionan con el concepto
        de inyección de dependencias. Si buscas crear arquitecturas más flexibles y escalables, este artículo
        te será útil.

Espero que aclare los puntos clave y te inspire a aplicar nuevos enfoques en tus proyectos.

## Fragmentos adicionales de código fuente

export class Cat {
speak(): void {
console.log(“Meow”);
}
}
import {Cat} from “./cat”; export function animalSound(animal: Cat): void {
animal.speak();
}
import {animalSound} from ‘./animal’;
import {Cat} from ‘./cat’; const myCat = new Cat();
animalSound(myCat);
import {Cat} from “./cat”;
import {Dog} from “./dog”; export function animalSound(animal: Cat | Dog): void {
animal.speak();
}
export interface Animal {
speak(): void;
}
import {Animal} from “./iAnimal”; export function animalSound(animal: Animal): void {
animal.speak();
}
import {Animal} from ‘./iAnimal’; export class Cat implements Animal {
speak(): void {
console.log(“Meow”);
}
}
import {animalSound} from ‘./animal’;
import {Cat} from ‘./cat’; const myCat = new Cat();
animalSound(myCat);
import {Animal} from ‘./animal’; export class Dog implements Animal {
speak(): void {
console.log(“Woof”);
}
}
export interface Animal {
speak(): void;
} import {Animal} from “./iAnimal”;
export function animalSound(animal: Animal): void {
animal.speak();
}
export {}; export function animalSound(animal) {
animal.speak();
}
class IAction {
act(opts) {}
}
export class FindUser {
act(opts) {}
}
export function animalSound(animal) {
animal.speak();
} We can see that the `animalSound` function relies on (or depends on) the `animal` object. However, there are no `import` statements linking this function to any specific implementation elsewhere in the code.
export default function (
{
}
) {}
