---
title: Un flujo de ramas en Git
author: Bernardo A. Siverio
description: "Descripción de un flujo de ramas de Git que he usado en bastantes proyectos."
# image:
#   url: "https://docs.astro.build/assets/arc.webp"
#   alt: "Thumbnail of Astro arcs."
pubDate: 2024-03-12
tags: ["git", "programación", "flujo"]
---

Para ser sincero, no por mucho tiempo, pero he llegado a ver pases a producción a golpe de ZIP en empresas bastante importantes. He visto a estos proyectos evolucionar a Git, pasando por flujos en los que se mantenía una rama por entorno y he sufrito los problemas que esto acarréa.

La solución que describiré a continuación que me sigue gustando a día de hoy. No encaja en cualquier proyecto, pero en esos en los que no haya que mantener varias versiones simultaneamente, a mí me ha servido.

Lo ideal es tener al menos tres entornos: desarrollo, QA y producción, no sería complicado encajar más en el flujo.
En el repo, tendríamos dos ramas principales y permanentes:
- `main`: debe representar siempre el estado de producción.
- `develop`: se usa para añadir cualquier cambio y puede ser la rama que se despliga al entorno de desarrollo.

Además, habrá otras ramas que existirán temporalmente:
- `release/x.y.z`: se crea a partir de `develop`. Es la que se despliega en QA. Una vez validada, se mergea con `main`.
- `patch/x.y.z`: se crea a partir de `main`. Se usa para corregir errores en producción. También se despliega a QA. Una vez validada, se mergea de vuelta con `main` y, posteriormente, `main` con `develop`.

Tanto las ramas `release` como `patch` se pueden eliminar al mergearse a `main`, pero yo prefiero mantenerlas hasta que otra rama `release` o `patch` se despliegue a QA.

Por último, se creará un tag `version/x.y.z` a partir de main cada vez que se mergee una `release` o `patch`.

Adicionalmente, se podrían crear ramas `feature/<descripción_del_desarrollo>` a partir de develop para cada desarrollo. No entro en cómo gestionarlas, mergearlas o eliminarlas.

Ahora más detallado:

## Abordar un nuevo desarrollo

Si váis a usar pull request, puedes crear una rama para el desarrollo a partir de la rama `develop`. Si no vas a usar pull request, dependiendo de la complejidad del desarrollo, podrías incluso añadirlo directamente a `develop`.

```bash
git checkout develop
git checkout -b feature/<descripción_de_tarea>
```

Al finalizar el desarrollo, deberás crear la pull request para llevar los cambios a `develop` o mergearlos. Una vez mergeados, podrías eliminar la rama `feature`:

```bash
git checkout develop
git pull
git merge feature/branch_name
git push
```

Sin pull request, lo mejor es evitar pushear ramas `feature` en la medida de lo posible. Muchas veces acaban volviéndose basura obsoleta que nadie sabe si se puede desechar o no.

## Pruebas de nuevos desarrollos

Una vez todos los desarrollos de la siguiente versión hayan sido incluídos en `develop`, podemos crear una rama `release` a partir de `develop`. Hay que ser flexible. Es posible que en elgún caso te interese sacar la release cuando uno de los desarrolladores aun no ha terminado un desarrollo. Ese desarrollador pasaría a trabajar en la nueva `release` hasta terminar y el resto, seguiría desarrollando en `develop`.

```bash
git checkout develop
git pull
git checkout -b release/x.y.z
git push -u release/x.y.z
```

En caso de detectar errores en las pruebas, las correcciones se aplicarán directamente en `release/x.y.z`. Puedes mergear las correcciones a `develop` también. Yo no sería muy estricto con el cuándo... A veces interesará hacerlo en el momento, otras veces, tras validar en QA. Generalmente cualquier corrección en una `release` será necesaria también en `develop`.

## Paso a producción

Cuando `release/x.y.z` esté validada y aprobada, es el momento de mergear con `main` y generar una nueva versión.

```bash
git checkout main
git pull
git merge release/x.y.z
git push
git tag version/x.y.z
```

En este punto es buena idea mergear `main` con `develop` para que los posibles cambios introducidos en la release estén disponibles en el entorno de desarrollo.

```bash
git checkout develop
git pull
git merge main
git push
```

## Corrección de errores en producción

En cualquier momento pueden detectarse errores en producción. Para abordarlos, no podemos trabajar en develop puesto que puede haber muchos cambios que no queremos publicar aun. Sacaremos una rama `patch/x.y.z` a partir de `main`.

```bash
git checkout main
git pull
git checkout -b patch/x.y.z
git push -u patch/x.y.z
```

La trataremos exactamente igual que a una rama `release/x.y.z`. La desplegaremos a QA y, una vez validada, la mergearemos con `main`. En el caso de las ramas `patch`, el mergeo posterior de `main` con `develop` es obligatorio.
