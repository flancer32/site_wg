---
title: "Новая статья: Раннее и позднее связывание в JavaScript"
description: "Объясняю ключевые различия между ранним и поздним связыванием и их влияние на архитектуру кода."
date: 2024-11-12
display_date: "12 ноября 2024"
image: "/img/blog/2024/11/12-01.png"
image_alt: "Статья о связывании в JavaScript"
---

# Новая статья: Раннее и позднее связывание в JavaScript

<zoom-img
            src="/img/blog/2024/11/12-01.png"
            alt="Раннее и позднее связывание в JavaScript"
            width="100px"
            style="float: left; margin: 15px 15px 0 0;"
    ></zoom-img>

Опубликовал статью на [Medium](https://flancer32.com/understanding-early-vs-late-binding-in-javascript-d80c6b985f4b)
        и [Habr](https://habr.com/ru/articles/856578/), где делюсь своим взглядом на различия
        между **ранним** и **поздним связыванием** в JavaScript.

Через практические примеры я объясняю, как эти подходы влияют на структуру кода, и как они связаны с концепцией
        внедрения зависимостей. Если вы стремитесь создавать более гибкие и масштабируемые архитектуры — эта статья
        будет полезна.

Надеюсь, она прояснит ключевые моменты и вдохновит на применение новых подходов в проектах.

## Дополнительные фрагменты исходного кода

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
