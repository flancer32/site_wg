---
title: "ADSM: Iterative and Hierarchical"
description: "The article explains how a Model’s limited context drives an iterative workflow and why a knowledge hierarchy is required to keep generation stable."
date: 2025-09-18
display_date: "18 September 2025"
image: "/img/blog/2025/20250918-01-adsm-iterative-and-hierarchical.png"
image_alt: "ADSM: Iterative and Hierarchical"
---

# ADSM: Iterative and Hierarchical

<zoom-img src="/img/blog/2025/20250918-01-adsm-iterative-and-hierarchical.png"
        alt="ADSM: Iterative and Hierarchical" width="100px"></zoom-img>

The limited output context defines the boundaries for applying Models when working with a codebase.
        Generation is only possible iteratively: a Model delivers a reliable result when the input context is
        significantly larger than the output, forming a predictable narrowing. The project is split into
        small files, each created within a tightly managed context. Repeatability is ensured through fixed
        knowledge fragments organized as a hierarchical tree—from general principles to the unique data of
        each source. This structure builds a stable foundation that lets Agents develop large projects without
        breaking the underlying logic. The full article is available in Russian on Habr.

[Read the original on Habr](https://habr.com/ru/articles/948282/)
