# Arquitectura del producto — Portal oficial

## Objetivo

Construir el portal oficial y comunitario de Cultivation Universe. Este producto presenta el videojuego y su universo, crea audiencia, publica el desarrollo y prepara la futura comunidad. No es un producto jugable.

## Límites de responsabilidad

| Capacidad | Web | Juego |
|---|---:|---:|
| Landing, marca, trailer, capturas y galería | Sí | No |
| Lore, wiki, cosmología, regiones y mapa visual | Sí | Datos fuente del mundo cuando aplique |
| Perfiles editoriales de personajes, sectas y bestiario | Sí | Implementación jugable y estado runtime |
| Devlogs, noticias y roadmap público | Sí | No |
| CMS y publicación editorial | Sí | No |
| Comunidad, comentarios, perfiles web y moderación | Sí | No |
| Enlaces a GitHub, redes, builds y descargas | Sí | Proporciona builds |
| Movimiento del personaje y cámara de juego | No | Sí |
| Combate, habilidades, IA y NPC | No | Sí |
| Inventario, misiones, loot y progresión | No | Sí |
| Colisiones, física, simulación y reglas jugables | No | Sí |

## Uso permitido de Three.js

Three.js puede renderizar fondos, escenarios decorativos, mapas, regiones, partículas, reliquias, portales y navegación inmersiva. Las interacciones son de exploración informativa: seleccionar una región, abrir su ficha, mostrar puntos de interés o navegar entre artículos.

No se debe crear en Three.js un controlador de personaje, combate, inventario funcional, IA, misiones, física de gameplay ni simulaciones que repliquen el videojuego.

## Módulos web objetivo

1. Landing cinematográfica y presentación del juego.
2. Universo / lore y enciclopedia.
3. Mapa interactivo, regiones y puntos de interés.
4. Personajes, cultivación (como contenido editorial), sectas, bestiario, técnicas y objetos.
5. Galería multimedia y material promocional.
6. Devlogs, noticias y roadmap.
7. Hub de comunidad, perfiles, comentarios y moderación (fase posterior).
8. Página de descargas y enlaces a builds (cuando haya releases).
9. GitHub, redes, prensa y contacto.

## Arquitectura de contenido

El contenido editorial debe estar separado de los componentes visuales. Cada entrada de lore debería tener identificador estable, slug, título, resumen, cuerpo, etiquetas, relaciones, estado de publicación y referencias a recursos multimedia con licencia/origen. Los mapas enlazan a las mismas entidades por ID; no duplican el lore en código Three.js.

## Criterios de aceptación

- Una persona nueva entiende en pocos segundos qué es el videojuego y dónde seguir su desarrollo.
- El portal diferencia claramente el contenido confirmado del contenido planeado.
- Todas las fichas y escenas 3D informativas tienen alternativa accesible en texto.
- La experiencia es responsive, rápida y respeta reduced-motion.
- Ninguna interacción de la web se presenta como mecánica real del juego.
- Las descargas solo aparecen como disponibles cuando exista una release verificable.
