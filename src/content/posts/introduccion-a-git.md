---
title: "Introducción a Git. Lo básico para empezar a funcionar."
pubDate: 2024-03-11
published: true
description: "Guía con los comandos más típicos de Git y explicación de algunos conceptos básicos."
author: "Wandeber"
# image:
#   url: "https://docs.astro.build/assets/full-logo-light.png"
#   alt: "The full Astro logo."
tags: ["git", "programación", "introducción"]
---

He enseñado Git a varios estudiantes de FP que han hecho las prácticas en la empresa en la que trabajo.
Dependiendo del instituto del que vengan estudiado, algunos llegan sabiendo hacer commit y push. Otros sólo que Git existe.

Esta parte de la introducción que hacemos ya es rutina para mí, así que he pensado recopilar los comandos que decidí enseñar la última vez.
Sé con seguridad que me vendrá bien tenerlo a mano en el futuro.

## Qué es Git

Git es un sistema de control de versiones. ¿Qué significa esto? Es un programa para guardar archivos y los cambios realizados en ellos a lo largo del tiempo de forma que podamos volver a versiones anteriores en caso de necesitarlo. Imagina que has escrito código. Borras un bloque que no te convence. Pasan tres días y te das cuenta de que has borrado una línea que sí querías mantener. Con Git podrías ver cómo era tu código hace tres días y recuperar lo que necesitas.

Donde brilla realmente es en el trabajo en equipo. Si tienes que trabajar en un proyecto con más personas, podríais acordar que todos tengáis el código en vuestro ordenador y que cada uno vaya añadiendo y cambiando cosas por su cuenta. Podríais intentar organizaros para no tocar el mismo código varios y reuniros para juntar los cambios... ¿una vez al día?... Me pego un tiro. Al final borraríais código que necesita lo que hace el otro. Modificaríais ambos el mismo archivo y no sabríais cómo juntar los cambios de ambos porque incluso perderíais traza de lo que ha tocado cada uno.

> Mucho cuidado. Como decimos que es un sistema de control de versiones, puede no quedar claro cuánto ayuda a coordinar el trabajo entre varios desarrolladores. No caigas en el error de infravalorar su importancia. No es opcional aprenderlo. No puedes trabajar en un equipo de desarrollo de una empresa si no conoces Git o lo que sea que usen para arbitrar y coordinar el trabajo.

Git también puede mantener los archivos en un servidor remoto. Es decir, un lugar central al que todos los desarrolladores suben sus cambios y del que descargan los cambios de los demás.

## Para entendernos

Intentaré mantenerlo simple y no muy técnico.

- **Repositorio**: es una carpeta cuyos archivos están controlados por Git. Si creas, cambias o borras algo dentro de esa carpeta, Git se entera. La carpeta puede tener cualquier nombre, una carpeta cualquiera y normal. Podrás notar que una carpeta es un repositorio porque dentro de ella habrá otra carpeta llamada `.git`. Ahí es donde Git guarda toda la información que necesita. No la borres.
- **Repositio remoto**: es un servidor que guarda repositorios. Puede ser GitHub, GitLab, Bitbucket, Azure DevOps, etc. Tú trabajarías en tu repositorio local y subirías los cambios a un repositorio remoto.

## Al grano

### Lo primero:
- `git init`: crea un repo en el directorio actual.
- `git clone <url>`: descarga un repo remoto.

### Gestión de cambios:
- `git status`: muestra si hay archivos modificados, borrados… Organizados en varias catogorías:
  - **Untracked files**: son archivos que git no está teniendo en cuenta. No han sido commiteados nunca.
  - **Changes not staged for commit**: Archivos previamente commiteados a los que se les ha hecho algún cambio y aun no han sido añadidos con git add.
  - **Changes to be committed**: Archivos previamente commiteados que han sido modificados y se van a commitear próximamente.
- `git diff <file>`: Visualizar cambios hechos sobre un archivo.
- `git restore <file>`: Descartar cambios hechos sobre un archivo.
- `git add <archivo>`: Añade un archivo para el siguiente commit. 
- `git rm --cached <file>`: Quita un archivo untracked de los archivos a ser commiteados.
- `git restore --staged <file>`: Quita un archivo de los archivos a ser commiteados (previamente commiteado).
- `git commit -m 'Una descripción de los cambios'`: commitea todos los archivos añadidos previamente con git add.
- `git log`: Muestra el histórico de cambios/commits hechos de la rama actual.
- `git checkout <id de commit>`: Navegar o cambiar al commit indicado anterior. De esta forma se podrán ver todos los archivos como estaban en ese commit.

### Ramas:
- `git branch`: Mostrar ramas disponibles.
- `git checkout -b <nombre_nueva_rama>`: Crea una nueva rama a partir de la actual.
- `git checkout <nombre_rama>`: Cambia a la rama deseada.
- `git branch -D <nombre_rama>`: Borra una rama.

#### Mergear ramas:
1. `git checkout <rama_destino>`: Cambias a la rama a la que llevarás los cambios (rama_destino).
1. `git merge <rama_origen>`: Traes los cambios de una rama (rama_origen) a la rama activa (rama_destino).

### Subir y descargar cambios:
- `git push`: subir cambios de la rama actual
- `git pull`: descargar cambios en la rama actual
