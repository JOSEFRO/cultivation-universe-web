# Arquitectura y bibliotecas — Siete Raíces (Web)

## Objetivo
Mantener una estructura editorial única: datos versionados, IDs estables, validación en compilación y pruebas automáticas. Las propuestas no se mezclan con el canon aprobado.

## Bibliotecas elegidas
| Herramienta | Decisión | Motivo |
| --- | --- | --- |
| Zod 4 | Integrada | Valida JSON y deriva tipos TypeScript. |
| Vitest 5 | Integrada | Prueba esquemas y reglas junto a Vite. |
| Playwright | Integrada | Prueba el códice en Chromium real sobre la build de producción. |
| Three.js + GSAP + Lenis | Mantener | Ya cubren escena 3D y desplazamiento; no migrar sin necesidad. |
| Zustand | Diferida | El códice solo necesita estado local; incorporar cuando varias pantallas compartan estado. |
| i18next | Diferida | Incorporar cuando se apruebe el alcance multidioma. |
| TanStack Query | Diferida | No hay API remota que justifique caché de servidor. |
| MDX | Diferida | Evaluar al crear crónicas editoriales extensas. |

## Catálogos
- `src/data/roots.json`: las siete raíces establecidas.
- `src/data/catalogs/`: maestros, reinos, artefactos, técnicas, facciones, aventuras, misiones, criaturas y civilizaciones.
- Los catálogos nuevos empiezan vacíos intencionalmente. No se agrega contenido propuesto como canon sin aprobación.

## Contrato editorial
Cada entrada futura requiere `id` (slug estable y globalmente único), `name`, `status` (`canon`, `proposal`, `pending`, `deprecated`) y `summary`. Los campos especializados se validan por categoría. Zod comprueba IDs globales y referencias de maestros a raíces, reinos, facciones y técnicas; también comprueba requisitos de técnicas y relaciones de facciones.

## Versionado
Cada archivo usa `version: 1`. Cambiar la estructura requiere aumentar versión y preparar migración. No reutilizar IDs. Los datos JSON son declarativos y nunca se ejecuta código contenido en ellos.

## Pruebas
- `npm run test:unit`: raíces, versión, unicidad, estado editorial y referencias.
- `npm run build`: TypeScript y Vite.
- `npm run test:e2e`: build de producción y navegación del códice con Playwright.
- GitHub Actions ejecuta pruebas unitarias, build y browser smoke test en PR hacia `main`.

## Documentación oficial consultada
- [Zod — Basic usage](https://zod.dev/basics) y [API](https://zod.dev/api).
- [Vitest — Getting started](https://vitest.dev/guide/).
- [Playwright — Browser testing](https://playwright.dev/docs/intro) y [accessibility testing](https://playwright.dev/docs/accessibility-testing).
- [React Three Fiber — Documentation](https://r3f.docs.pmnd.rs/).
- [Zustand — Documentation](https://zustand.docs.pmnd.rs/).
- [React i18next — Documentation](https://react.i18next.com/).

## Política de dependencias
Instalar paquetes solo cuando resuelvan una necesidad real. Evitar estado global, caché remota o render 3D declarativo hasta que la aplicación lo necesite.
