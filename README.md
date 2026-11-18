# Cultivation Universe — Portal oficial y comunitario

**Este repositorio contiene el sitio web oficial de Cultivation Universe. No es el videojuego y no contiene gameplay.**

Su propósito es presentar el videojuego y su universo, construir audiencia, publicar novedades del desarrollo y preparar la futura comunidad.

## Responsabilidades de este producto

- Landing cinematográfica para presentar el proyecto y dirigir a las personas hacia el videojuego.
- Lore y enciclopedia: cosmología, siete raíces, reinos, regiones, personajes, sectas, bestiario, técnicas y objetos.
- Mapa interactivo del mundo, con regiones y puntos de interés explorables desde la web.
- Galería de arte, capturas, vídeos, música original y material promocional con derechos documentados.
- Devlogs, noticias, roadmap público y registro de cambios.
- Enlaces a GitHub, canales sociales y futuras plataformas comunitarias.
- Preparación de futuras descargas, demos y enlaces a versiones publicadas, cuando existan.
- Futuras funciones comunitarias: perfiles, comentarios, suscripciones, contribuciones y moderación, sujetas a diseño y backend.

## Experiencia visual

La web debe sentirse como un portal premium e inmersivo: dirección de arte coherente con el videojuego, tipografía editorial, transiciones cuidadas, composición cinematográfica, responsive y accesible.

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

La web es un prototipo del portal oficial. Tiene una experiencia visual inicial, navegación narrativa y una sección que enlaza al repositorio del juego. El mapa completo, la enciclopedia ampliada, galería, devlogs, roadmap editorial y comunidad están pendientes de desarrollo.

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
