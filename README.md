<div align="center">

<img src="https://d8j0ntlcm91z4.cloudfront.net/user_3MJ8xX039ib9919oo3CFVd7NjMx/hf_20261119_141634_45e1cde3-6bfe-4b45-917a-1a20b403bf1b.webp" alt="Arte conceptual del portal Siete Raíces" width="100%">

# SIETE RAÍCES — Portal oficial

**Un portal cinematográfico para presentar el universo, documentar el desarrollo y reunir a la comunidad.**

[Repositorio](https://github.com/JOSEFRO/cultivation-universe-web) · [Videojuego](https://github.com/JOSEFRO/cultivation-universe-game) · [Desarrollo y tareas](https://github.com/JOSEFRO/cultivation-universe-web/issues)

![Estado](https://img.shields.io/badge/estado-desarrollo-blue)
![React](https://img.shields.io/badge/React-19-149ECA?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)
![Three.js](https://img.shields.io/badge/3D-Three.js-black?logo=threedotjs)

</div>

## 1. Propósito del producto

Este repositorio contiene el sitio web oficial de Siete Raíces. Su función es presentar el proyecto, comunicar su identidad, documentar el universo narrativo y publicar novedades del desarrollo.

**Este repositorio no es el videojuego y no contiene el gameplay del RPG.** El producto jugable se desarrolla por separado en [cultivation-universe-game](https://github.com/JOSEFRO/cultivation-universe-game).

## 2. Alcance funcional del portal

- Landing page cinematográfica.
- Presentación del mundo y su cosmología.
- Enciclopedia de regiones, personajes, órdenes, criaturas, técnicas y objetos.
- Mapas y visualizaciones interactivas de carácter informativo.
- Galería de arte y material promocional con derechos documentados.
- Devlogs, noticias y hoja de ruta.
- Enlaces a repositorios, comunidad y futuras versiones descargables.
- Posibles funciones comunitarias futuras, sujetas a diseño y backend.

## 3. Dirección artística

La identidad visual debe ser original y coherente con el videojuego: fantasía épica, composición cinematográfica, tipografía editorial, escenarios atmosféricos y una experiencia responsive.

Three.js se reserva para presentación y exploración visual: fondos 3D, mapas, reliquias, partículas, portales y efectos de profundidad.

No se implementarán aquí sistemas de gameplay como combate, IA de NPC, inventario funcional, progresión, físicas, misiones ejecutables ni control de personajes. Esas responsabilidades pertenecen al videojuego.

## 4. Arquitectura y tecnologías

- React 19 y TypeScript.
- Vite 7.
- Three.js para visualización 3D.
- GSAP para animaciones.
- Lenis para desplazamiento suavizado.
- CSS responsive.
- GitHub Pages como plataforma de publicación prevista.

## 5. Requisitos y desarrollo local

Requisitos: Node.js 20.19 o superior y npm.

```bash
git clone https://github.com/JOSEFRO/cultivation-universe-web.git
cd cultivation-universe-web
npm install
npm run dev
```

Para validar la compilación:

```bash
npm run build
npm run preview
```

## 6. Calidad, rendimiento y accesibilidad

- Adaptación a móviles, tabletas y escritorio.
- Imágenes optimizadas y formatos modernos cuando proceda.
- Carga diferida de recursos pesados.
- Respeto por `prefers-reduced-motion`.
- Navegación por teclado y foco visible.
- Contraste y jerarquía semántica.
- Fallback 2D si WebGL no está disponible.
- Control de peso de modelos, texturas y efectos.
- Prevención de errores de hidratación/ejecución y limpieza de animaciones.

## 7. Seguridad

- No incluir secretos ni credenciales en el cliente.
- Usar HTTPS en enlaces y recursos externos.
- Validar contenido externo antes de mostrarlo.
- Restringir dominios y atributos de embeds.
- Documentar licencias y procedencia de recursos visuales y sonoros.
- Evitar dependencias y scripts externos innecesarios.

## 8. Estado y publicación

El portal está en desarrollo. La URL pública debe considerarse confirmada únicamente cuando GitHub Pages esté configurado y el despliegue de la rama principal finalice correctamente.

- Código y cambios: [GitHub](https://github.com/JOSEFRO/cultivation-universe-web).
- Ejecuciones de CI/CD: [GitHub Actions](https://github.com/JOSEFRO/cultivation-universe-web/actions).
- Configuración de despliegue: [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

## 9. Separación de productos

| Portal web | Videojuego |
|---|---|
| Presenta el proyecto y su mundo. | Contiene la experiencia jugable. |
| Publica lore, arte y devlogs. | Implementa movimiento, interacción y misiones. |
| Usa 3D para visualización y navegación. | Usa el motor para gameplay y simulación. |
| No contiene sistemas jugables. | Es el producto que se juega. |

## 10. Licencia

No se ha incorporado una licencia de reutilización. El código y los recursos permanecen reservados a su titular salvo autorización expresa.
