# Project Brief — Plataforma Interactiva de Algoritmos

> Resumen ejecutivo del proyecto. Lo lee el Orquestador al activarse y al iniciar cada plan.
> **Última actualización:** 2026-06-16 (basado en `informe-exploracion.md`)

---

## 1. ¿Qué es este proyecto?

**Plataforma Interactiva de Algoritmos** es una aplicación web educativa diseñada para **aprender algoritmos de manera visual, entenderlos profundamente y saber cuándo y dónde usarlos**.

Está especialmente pensada para **personas con problemas de aprendizaje o de entendimiento**: el énfasis está en la **visualización paso a paso**, la **explicación pedagógica** y la **demostración interactiva** de cada algoritmo, no en memorizar código.

Es una plataforma tipo "roadmap" con **110 algoritmos catalogados**, organizados en **5 niveles de dificultad** (de 0 — Cero Absoluto — a 4 — Experto), donde el estudiante puede ver el algoritmo en acción, paso a paso, con animaciones, punteros, celdas resaltadas y logs de ejecución.

> **Diferenciador clave:** no es solo un catálogo de código — es un **tutor visual** que muestra QUÉ pasa, DÓNDE pasa, POR QUÉ pasa, y CUÁNDO usar cada algoritmo.

---

## 2. Objetivos

### Negocio
- Ser una **referencia educativa** en español para el aprendizaje de algoritmos.
- Reducir la brecha de entrada a la algoritmia para personas con dificultades de aprendizaje.
- Ofrecer una alternativa visual a plataformas como LeetCode, VisuAlgo, Algorithm Visualizer.

### Técnicos
- **Rendimiento óptimo** (sitio 100% estático, sin JS innecesario).
- **Escalabilidad** (agregar nuevos algoritmos debe ser trivial).
- **Mantenibilidad** (tipado estricto, componentes reutilizables, código documentado).
- **Accesibilidad** (a11y como prioridad, no como afterthought).

### Usuario
- Ver el algoritmo en acción, no solo leer su código.
- Entender **por qué** cada paso, **qué variable** cambia y **cómo** afecta el resultado.
- Saber **cuándo** aplicar cada algoritmo (cuál es más eficiente para qué problema).
- Llevar un **progreso personal** de los algoritmos que ya comprendió.

---

## 3. Restricciones

### Técnicas
- **Stack mínimo y deliberado:** Astro estático + Vanilla JS/CSS (sin React/Vue/Svelte).
- **SSG (Static Site Generation):** todas las 110 páginas se prerenderizan en build time.
- **Tipado estricto:** TypeScript en modo `strictest`.
- **Sin backend:** el progreso se persiste en `localStorage` (no hay servidor).
- **Despliegue:** Vercel.

### Pedagogía
- **Documentación 100% en español.**
- **Visualización antes que código** — el usuario debe ver el algoritmo funcionar.
- **Casos edge incluidos** — array vacío, target no encontrado, etc.
- **Explicación contextual** — qué problema resuelve, qué complejidad tiene, cuándo usarlo.

### Tiempo / Roadmap
- **Fase actual:** FASE 1 — Motor de Visualización (en progreso).
- **Meta:** 110/110 visualizadores implementados.
- **Ritmo objetivo:** 10-20 visualizadores por semana (según informe).

### Regulatorias
- No aplica (proyecto educativo sin datos personales sensibles; el `localStorage` es local al navegador).

---

## 4. Stack y Tecnologías

| Capa | Tecnología | Versión | Propósito |
|------|------------|---------|-----------|
| **Framework principal** | Astro | 4.16.18 | Generador estático de sitios (SSG) |
| **Lenguaje** | TypeScript | 5.7.2 | Tipado estricto, seguridad de tipos |
| **Estilos** | Vanilla CSS | — | Variables CSS, sin frameworks |
| **Scripting cliente** | Vanilla JavaScript | — | Filtros, localStorage, lógica de visualizadores |
| **Tipado Astro** | @astrojs/check | 0.9.4 | Verificación TS en `.astro` |
| **Fuentes** | Google Fonts | — | Space Mono (código) + Syne (UI) |
| **Deploy** | Vercel | — | Hosting y CI/CD |

### Salida
```js
// astro.config.mjs
output: 'static'  // SSG: 110+ páginas HTML pre-renderizadas
```

> **Decisión deliberada:** no usar React/Vue/Svelte para mantener el bundle pequeño. La lógica interactiva es vanilla JS atado a `VisualizerConfig`.

---

## 5. Stakeholders

- **Product Owner:** Jonathan Urrego
- **Tech Lead humano:** Jonathan Urrego
- **Equipo de desarrollo:** Jonathan Urrego (proyecto personal)
- **Equipo de QA:** Jonathan Urrego + auditoría automatizada del agente QA y Seguridad
- **Audiencia objetivo:** estudiantes y desarrolladores hispanohablantes con o sin dificultades de aprendizaje

---

## 6. Repositorios y Documentación

- **Repo principal:** `c:\Users\Usuario\Documents\front-algoritmos`
- **Documentación interna:**
  - `README.md` — Documentación principal
  - `ONE_SPEC.md` — Especificación única (plantilla)
  - `informe-exploracion.md` — Informe de exploración automática
  - `cambios-registro.md` — Registro de cambios automatizado
  - `agents/AGENTS.md` — Sistema multi-agente (este sistema)
- **Issue tracker:** N/A (proyecto personal)
- **Designs/UI:** Inspiración "Doble Puntero" + estética neon/dark mode

---

## 7. Convenciones Específicas del Proyecto

### Estructura de carpetas
```
src/
├── components/
│   ├── layout/          (LevelBadge, BaseLayout pieces)
│   ├── roadmap/         (AlgoCard)
│   └── visualizer/      (Controls, StepLog, TabSystem, Visualizer)
├── data/
│   └── algorithms.json  (110 algoritmos)
├── layouts/             (BaseLayout, AlgoLayout)
├── lib/
│   └── visualizers/     (registry, types, *.ts por algoritmo)
├── pages/
│   ├── index.astro      (roadmap principal)
│   └── algoritmos/
│       └── [slug].astro (generador dinámico de 110 páginas)
└── scripts/             (visualizer-core.js)
```

### Convenciones de código
- **Naming:** `camelCase` para variables/funciones, `PascalCase` para tipos/componentes, `kebab-case` para archivos de visualizadores (`linear-search.ts`).
- **Visualizadores:** cada uno implementa `VisualizerConfig` con 4 callbacks (`onStep`, `onRender`, `onComplete`, `onReset`).
- **Registro:** para agregar un visualizador, 3 pasos: crear `.ts` → importarlo → agregarlo a `registry.ts`.
- **Estilos:** CSS modular por visualizador, ubicado en `src/lib/visualizers/styles/<nombre>.css`.

### Commits
- **Mensajes en español** (por la naturaleza educativa del proyecto).
- **Formato sugerido:** `<tipo>: <descripción breve>` (feat, fix, docs, refactor, test).

### Sistema de diseño
- **Paleta oscura neon:**
  - `--bg: #0a0a0f`, `--surface: #12121a`, `--card: #1a1a27`, `--border: #2a2a40`
  - `--accent: #7c3aed` (violeta), `--accent2: #06b6d4` (cyan)
  - `--ptr-left: #f59e0b`, `--ptr-right: #10b981`, `--match: #ec4899`
- **Tipografías:** Space Mono (código) + Syne (UI, pesos 400/700/800).
- **Breakpoints:** 640px (móvil), 1024px (grid de visualizadores).

---

## 8. Riesgos Conocidos

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| 108/110 visualizadores faltantes | Crítico | Plan de implementación por fases (FASE 1-10) |
| `visualizer-core.js` sin documentar | Alto | Crear `VisualizerEngine` reutilizable con docs |
| Sin tests automatizados | Alto | Agregar Vitest (unit) + Playwright (e2e) |
| Sin validación de schema en `algorithms.json` | Medio | Adoptar Zod para validar en build |
| Accesibilidad no auditada | Medio | Auditoría Lighthouse + agregar ARIA + soporte teclado |
| Responsive design incompleto | Bajo | Diseñar visualizadores mobile-first |
| CI/CD manual | Bajo | GitHub Actions con `astro check` + tests |
| i18n no considerado | Bajo | Si se internacionaliza: `@astrojs/i18n` |

---

## 9. Skills / MCPs / Instrucciones externas disponibles

- **Sistema multi-agente:** `agents/AGENTS.md` (MACS) — **ESTE SISTEMA**
- **MCPs configurados:** `.mcp.json` (en revisión)
- **CLAUDE.md del proyecto:** N/A (puede crearse para instrucciones globales a Claude)
- **Copilot instructions:** N/A (pueden crearse en `.github/copilot-instructions.md`)
- **Informe automático:** `monitor.cjs` ejecuta análisis del proyecto

---

## 10. Estado del Proyecto y Roadmap

### Estado actual (FASE 0 ✅ COMPLETADA)
- ✅ Catálogo de 110 algoritmos en `algorithms.json`
- ✅ Roadmap interactivo en `index.astro` con filtros y progreso
- ✅ Sistema de generación dinámica de páginas
- ✅ 2/110 visualizadores implementados: `linear-search`, `binary-search`
- ✅ Sistema de progreso persistido en `localStorage`
- ✅ Diseño visual (paleta neon, fuentes, responsive básico)
- ✅ Despliegue en Vercel

### En progreso (FASE 1 — Motor de Visualización)
- 🚧 Documentar y extraer `visualizer-core.js` → clase `VisualizerEngine`
- 🚧 Componentes: `ArrayBar`, `Controls`, `TabSystem`, `StepLog`
- 🚧 Tests unitarios para registry y callbacks
- 🚧 Casos de prueba edge cases

### Próximas fases
- **FASE 2:** 10 algoritmos nivel 0 (suma, min/max, FizzBuzz, etc.)
- **FASE 3:** 20 algoritmos nivel 1 (sorting básico, estructuras)
- **FASE 4:** 25 algoritmos nivel 2 (grafos, DP)
- **FASE 5:** 30 algoritmos nivel 3 (avanzado)
- **FASE 6:** 25 algoritmos nivel 4 (experto)

### Mejoras transversales
- Auditoría accesibilidad (a11y) — Lighthouse + ARIA
- Responsividad mobile (visualizadores)
- Tests E2E (Playwright)
- CI/CD (GitHub Actions)
- Validación de schema (Zod)
- i18n (si aplica)

---

## 11. Glosario del Dominio

- **Algoritmo:** procedimiento computacional bien definido que toma un valor o conjunto de valores como entrada y produce un valor o conjunto de valores como salida.
- **Visualizador:** componente interactivo que ejecuta un algoritmo paso a paso mostrando el estado interno (variables, punteros, celdas).
- **VisualizerConfig:** contrato TypeScript que define cómo un visualizador expone su metadata, datos de ejemplo y callbacks (`onStep`, `onRender`, `onComplete`, `onReset`).
- **Nivel:** categoría de dificultad del algoritmo (0=Cero Absoluto, 1=Principiante, 2=Intermedio, 3=Avanzado, 4=Experto).
- **Roadmap:** vista principal del proyecto (`index.astro`) que muestra los 110 algoritmos en grid, con filtros por nivel y barra de progreso.
- **Step (paso):** iteración atómica de un visualizador; el callback `onStep` se llama una vez por paso y devuelve si continuar.
- **Estado del visualizador (state):** objeto mutable que persiste entre pasos (variables, índices, punteros, etc.).
- **Shell vacío:** página renderizada para algoritmos sin visualizador; muestra metadata pero no la simulación interactiva.
- **Caso edge:** situación límite (array vacío, target inexistente, números negativos, overflow) que el visualizador debe manejar explícitamente.
- **Puntero (pointer):** marcador visual (generalmente flecha o triángulo) que indica qué posición del array está siendo inspeccionada en un momento dado.
- **Progreso:** conjunto de IDs de algoritmos que el usuario marcó como comprendidos; persistido en `localStorage` bajo la clave `completed-algorithms`.

---

## 12. Arquitectura (en definición)

> ⚠️ **Nota:** La arquitectura completa del motor de visualización aún está en diseño. El sistema actual usa un patrón **registry-based** con archivos `.ts` por visualizador, y existe un `visualizer-core.js` que contiene lógica compartida pendiente de extraer y documentar.

### Lo que ya está decidido
- **Patrón:** Registry centralizado (`src/lib/visualizers/registry.ts`)
- **Contrato:** `VisualizerConfig` interface (`src/lib/visualizers/types.ts`)
- **Output:** SSG con 110 páginas pre-renderizadas
- **Persistencia:** `localStorage` para progreso

### Lo que está en diseño
- La separación exacta entre `visualizer-core.js`, los componentes Astro y los callbacks del `VisualizerConfig`.
- Cómo manejar la lógica de "play / pause / step / reset" de forma reutilizable.
- Cómo soportar algoritmos no basados en arrays (grafos, árboles, DP con tablas).
- Estrategia de testing para los callbacks.

> 📌 **Acción sugerida:** antes de seguir implementando visualizadores, abrir un plan de **arquitectura del motor de visualización** con el agente Arquitecto.

---

## 13. Próximos Pasos Inmediatos Sugeridos

1. **Activar el sistema MACS** con: *"Activa MACS para este proyecto"*
2. **Plan corto:** diseñar la arquitectura del motor de visualización (FASE 1).
3. **Plan medio:** implementar 10 visualizadores de nivel 0 (los más simples, para validar el motor).
4. **Auditoría:** pasar el agente QA y Seguridad sobre el código actual antes de escalar.

---

**Mantenedor del brief:** Jonathan Urrego
**Origen de la información:** `informe-exploracion.md` (16-06-2026) + conversación con el usuario.
