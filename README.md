# Siete Raíces — Portal oficial de Cultivation Universe

Portal web público del universo original **Siete Raíces**. Presenta su cosmología, regiones, crónicas y avances del proyecto de videojuego.

> Este repositorio contiene únicamente el portal web. El videojuego jugable se desarrolla por separado en [cultivation-universe-game](https://github.com/JOSEFRO/cultivation-universe-game).

## Experiencia actual

- Portada cinematográfica y navegación por ocho capítulos narrativos.
- Ocho ilustraciones SVG originales, locales y diferentes: Origen Primordial, Reinos Mortales, Órdenes Juramentadas, Mar de los Antiguos, Cielos Fragmentados, Siete Raíces, Frontera del Vacío y Primera Ruptura.
- Escena ambiental Three.js no jugable, animaciones GSAP y desplazamiento Lenis.
- Portal al proyecto del videojuego y hoja de ruta con estado transparente.
- Diseño adaptable a escritorio y móviles, con soporte para preferencias de movimiento reducido.
- Arte conceptual vectorial versionado dentro de `public/art/`; la web no depende de imágenes remotas para las escenas de sus capítulos.

## Dirección artística

Fantasía épica original de inspiración occidental: fortalezas, ciudades de piedra, paisajes antiguos, mares, cielos fragmentados y símbolos cósmicos. No se utilizan personajes, escenas ni estética visual de manhua, anime o franquicias externas.

Las ilustraciones SVG son arte conceptual del portal, no capturas del videojuego ni modelos finales.

## Tecnología

- React 19 + TypeScript
- Vite 7
- Three.js
- GSAP + ScrollTrigger
- Lenis
- CSS responsive
- GitHub Pages / GitHub Actions

## Desarrollo local

Requisito: Node.js 20.19 o superior.

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Publicación

El despliegue de producción se realiza mediante GitHub Actions al actualizar `main`. La compilación de CI ejecuta `npm run build`; el flujo de Pages publica el directorio `dist`.

- Sitio: https://josefro.github.io/cultivation-universe-web/
- Repositorio: https://github.com/JOSEFRO/cultivation-universe-web
- Acciones: https://github.com/JOSEFRO/cultivation-universe-web/actions

## Separación de productos

| Portal web | Videojuego |
|---|---|
| Presenta el universo, arte, lore y novedades. | Contiene la experiencia jugable. |
| Usa Three.js para ambientación y visualización. | Usa Godot para gameplay y sistemas interactivos. |
| No implementa combate, misiones ni progresión jugable. | Implementa las mecánicas del RPG. |

No se anuncia una fecha de lanzamiento ni una descarga pública hasta que exista una versión confirmada.

## Licencias y recursos

Las ilustraciones SVG incluidas en este repositorio fueron creadas para este proyecto. No se incorporan recursos de terceros sin documentar su procedencia y condiciones de uso.
