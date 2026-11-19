# Cultivation Universe — Portal oficial y comunitario

<p align="center"><img src="https://d8j0ntlcm91z4.cloudfront.net/user_3MJ8xX039ib9919oo3CFVd7NjMx/hf_20261119_141634_45e1cde3-6bfe-4b45-917a-1a20b403bf1b.webp" alt="Arte conceptual del mundo de Cultivation Universe: islas celestes, montañas jade y templo" width="100%"></p>

> **Arte conceptual de presentación generado para este repositorio.** No es una captura de la web publicada ni una escena del videojuego.

**Este repositorio contiene el sitio web oficial de Cultivation Universe. No es el videojuego y no contiene gameplay.**

Su propósito es presentar el videojuego y su universo, construir audiencia, publicar novedades del desarrollo y preparar la futura comunidad.


## Arte y dirección visual

El portal incorpora ilustraciones vectoriales originales para el Valle del Primer Alba, el Santuario de la Raíz, las Islas Celestes y el Mar Antiguo. Consulta [la guía de dirección visual](docs/VISUAL_ART_DIRECTION.md) y los recursos versionados en `public/art/`. Son ilustraciones conceptuales propias, no capturas del videojuego.

## Responsabilidades de este producto

- Landing cinematográfica para presentar el proyecto y dirigir a las personas hacia el videojuego.
- Lore y enciclopedia: cosmología, siete raíces, reinos, regiones, personajes, órdenes, bestiario, técnicas y objetos.
- Mapa interactivo del mundo, con regiones y puntos de interés explorables desde la web.
- Galería de arte, capturas, vídeos, música original y material promocional con derechos documentados.
- Devlogs, noticias, roadmap público y registro de cambios.
- Enlaces a GitHub, canales sociales y futuras plataformas comunitarias.
- Preparación de futuras descargas, demos y enlaces a versiones publicadas, cuando existan.
- Futuras funciones comunitarias: perfiles, comentarios, suscripciones, contribuciones y moderación, sujetas a diseño y backend.

## Experiencia visual

La web debe sentirse como un portal premium e inmersivo: dirección de arte de fantasía épica occidental, original y coherente con el videojuego, tipografía editorial, transiciones cuidadas, composición cinematográfica, responsive y accesible.

Three.js está permitido exclusivamente como tecnología de presentación:
- Fondos y paisajes 3D decorativos.
- Mapas y globos visuales interactivos.
- Reliquias, símbolos, partículas, portales y escenas ambientales.
- Navegación inmersiva y visualización de regiones.
- Efectos de cámara y profundidad que no controlen un personaje ni simulen sistemas de juego.

**Prohibido en este repositorio:** movimiento de personajes como gameplay, combate, IA, NPC con lógica jugable, inventario funcional del RPG, misiones ejecutables, estadísticas/progresión de personajes, físicas de juego o simulación de mecánicas. Todo eso pertenece a `cultivation-universe-game`.

## Relación con el videojuego

- Producto jugable: [cultivation-universe-game](https://github.com/JOSEFRO/cultivation-universe-game).
- Este portal presenta el proyecto, documenta su mundo y enlaza las builds oficiales cuando estén disponibles.
- La web no sustituye al juego, no es una versión web del RPG y no debe prometer funciones que todavía no existan en el videojuego.

## Estado actual

La web funciona como presentación pública inicial del proyecto. Incluye una experiencia narrativa cinematográfica, cosmología de las Siete Raíces y una guía de identidad narrativa occidental, información transparente sobre el estado del videojuego, hoja de ruta de desarrollo y enlaces a los repositorios oficiales. La enciclopedia ampliada, mapa interactivo, galería editorial, devlogs periódicos y comunidad se desarrollarán por etapas.

**Importante:** el videojuego todavía está en desarrollo. No hay fecha de lanzamiento confirmada ni una versión pública descargable anunciada.

## Tecnología actual

- React 19
- TypeScript
- Vite 7
- Three.js
- GSAP
- Lenis
- CSS responsive
- GitHub Pages para publicación

## Desarrollo local

```bash
npm install
npm run dev
npm run build
```

## Principio de producto

**El portal inspira, informa y reúne a la comunidad. El videojuego permite jugar.** Mantener estas responsabilidades separadas es un requisito de arquitectura.
