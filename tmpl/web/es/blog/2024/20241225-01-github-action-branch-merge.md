---
title: "Nuevo proyecto: GitHub Action para fusionar ramas con exclusión de archivos"
description: "Desarrollé un GitHub Action para fusionar ramas excluyendo archivos y configuré autenticación SSH para push seguro."
date: 2024-12-25
display_date: "25 de diciembre de 2024"
image: "/img/blog/2024/12/25-01.png"
image_alt: "GitHub Action con exclusión de archivos"
---

# Nuevo proyecto: GitHub Action para fusionar ramas con exclusión de archivos

<zoom-img
            src="/img/blog/2024/12/25-01.png"
            alt="GitHub Action: fusión de ramas con exclusiones"
            width="100px"
            style="float: left; margin: 15px 15px 0 0;"
    ></zoom-img>

He completado un proyecto para crear un **GitHub Action** que fusiona automáticamente una rama en otra excluyendo ciertos archivos. Luego, la rama actualizada se envía de vuelta al repositorio.

Durante la implementación, descubrí que para enviar cambios de forma segura no basta con un *Personal Access Token (PAT)* — fue necesario configurar la **autenticación SSH** para una interacción confiable con el repositorio.

Este proyecto ha sido una gran experiencia práctica. Si necesitas configurar CI/CD con GitHub Actions, te invito a ver mi
        [Gig en Fiverr](https://www.fiverr.com/wiredgeese/set-up-ci-cd-with-github-actions-for-deployment-on-virtual-server).

¡Feliz codificación!
