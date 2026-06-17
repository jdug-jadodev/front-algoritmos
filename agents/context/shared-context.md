# Contexto Compartido — Estado Actual del Proyecto

> Este archivo es la **memoria persistente** del sistema multi-agente. Todos los agentes lo leen al iniciar una tarea y lo actualizan al terminar.
> **Categoría:** 🟡/🔴 Mixto — el snapshot se mantiene siempre; la bitácora se archiva periódicamente. Política completa en [`context/lifecycle.md`](lifecycle.md).

## Reglas

1. **Append-only en bitácora**: cada agente SOLO agrega líneas/bloques nuevos. NO borra ni modifica lo que otro agente escribió.
2. **Marca de tiempo**: cada entrada tiene fecha, agente y acción.
3. **Contexto histórico**: este archivo conserva el rastro completo de la sesión/proyecto. Para detalles profundos, ver `agents/<rol>/outputs/`.
4. **Rotación**: cuando la bitácora supere ~200 entradas, se archiva el bloque antiguo a `context/archive/bitacora/YYYY-MM-DD-bitacora.md`.

---

## Snapshot del Proyecto

| Campo | Valor |
|-------|-------|
| **Nombre** | Plataforma Interactiva de Algoritmos |
| **Stack principal** | TypeScript + Astro 4.16.18 + Vanilla JS/CSS |
| **Versión actual** | 0.0.1 |
| **Última actualización** | 2026-06-16 12:00 |
| **Estado** | desarrollo (FASE 1 en curso) |

---

## Bitácora de Eventos (append-only)

> Formato: `[YYYY-MM-DD HH:MM] [agente] — acción breve`

<!-- Los agentes agregan sus entradas aquí, nunca borran las anteriores -->

- [2026-06-16 12:00] [orchestrator] — Sistema MACS activado. Leí AGENTS.md, project-brief.md, shared-context.md, active-plan.md, decisions-log.md, architecture.md y lessons-learned.md. Listo para recibir tareas.
- [2026-06-16 12:05] [orchestrator] — Abro PLAN-20260616-01 (media) sobre Code Examples y simplificación de header. Ver plan en `archive/plans/2026-06/PLAN-20260616-01.md`.
- [2026-06-16 12:28] [senior-dev] — Implementé: `scripts/generate-code-examples.cjs` (generador idempotente), `CodeExamples.astro`, cambios en `Visualizer.astro` (tab renombrada), `ComingSoon.astro` (sección code), `AlgoLayout.astro` (header simplificado) y `[slug].astro` + `demo-visualizer.astro` (ajuste de contrato). 110/110 algoritmos con codeExamples. Build: 112 páginas OK. `astro check`: 0 errores.
- [2026-06-16 12:30] [orchestrator] — Cierro PLAN-20260616-01. ADRs 0001 y 0002 registradas en `decisions-log.md`. `active-plan.md` reseteado a plantilla.
- [2026-06-17 09:30] [orchestrator] — **Re-activación de MACS a petición del usuario.** Sistema multi-agente listo. Leí `agents/AGENTS.md`, `agents/orchestrator.md`, `agents/CHEATSHEET.md`, `context/project-brief.md`, `context/shared-context.md`, `context/active-plan.md`, `context/architecture.md`, `context/decisions-log.md` y `context/lifecycle.md`. Estado: 0 planes activos, 2 ADRs registradas, FASE 1 (Motor de Visualizació) en curso. Recordatorio de preferencia del usuario: para tareas triviales (1 archivo, < 5 min, movimientos HTML/CSS/copy) NO ejecutar el flujo completo MACS — basta con plan corto al usuario, `npm run check` + `npm run build` al final, y `manage_todo_list` si hay > 3 pasos. Reservar MACS completo para tareas medias/complejas. Listo para recibir tareas.
- [2026-06-17 14:00] [orchestrator] — Plan medio **PLAN-BUBBLE-SORT-01** (visualizador ordenamiento burbuja). Agentes: architect → senior-dev → qa-security. 3 archivos tocados.
- [2026-06-17 14:00] [architect] — Diseñé plan replicando estándar de linear-search/binary-search. Archivos: `src/lib/visualizers/bubble-sort.ts`, `public/lib/visualizers/styles/bubble-sort.css`, registro en `registry.ts`. No requiere tocar `[slug].astro` (auto-descubre vía `hasVisualizer()`).
- [2026-06-17 14:30] [senior-dev] — Implementé: `bubble-sort.ts` con estado `{i, j, sorted, swapped, totalSwaps}` y lógica de pasadas + swap; `bubble-sort.css` con 4 estados (compare, swap, sorted, normal) + keyframe `vz-bs-swap`; registry actualizado. `needsTarget: false`. `defaultSpeed: 700` (más rápido que búsqueda porque hay más pasos).
- [2026-06-17 14:40] [qa-security] — `npm run check`: 0 errors / 0 warnings (1 hint preexistente en `algo.js`). `npm run build`: 112 páginas generadas OK. Smoke test en browser: array se intercambia correctamente, logs pedagógicos en español, state display se actualiza, navegación prev/next integra bubble-sort entre binary-search y selection-sort. Listo para producción.
- [2026-06-17 15:00] [orchestrator] — Plan medio **PLAN-SELECTION-SORT-01** (visualizador ordenamiento por selección). Mismo workflow y lecciones aprendidas de PLAN-BUBBLE-SORT-01.
- [2026-06-17 15:00] [architect] — Plan: 3 archivos (`selection-sort.ts`, `selection-sort.css`, registry). Decisión: aplicar lecciones aprendidas del bug de reset de bubble-sort: usar `ORIGINAL_ARR` como constante del módulo desde el inicio. Decisión: priorizar `compare`/`swap` sobre `sorted` en `onRender` desde el primer intento. Estado: `{i, j, minIdx, totalComparisons, totalSwaps}`. 4 estados visuales: `current-i` (cian), `min-current` (violeta), `searching` (naranja), `swap` (violeta claro), `sorted-prefix` (verde).
- [2026-06-17 15:20] [senior-dev] — Implementé: `selection-sort.ts` con constantes `ORIGINAL_ARR` y `defaultSpeed: 600`; onStep con dos fases (búsqueda del mínimo + cierre de pasada con swap); onRender con prioridad explícita de estados; onComplete con métricas. `selection-sort.css` con 5 estados visuales + keyframe `vz-ss-swap`. Registry actualizado.
- [2026-06-17 15:35] [qa-security] — `npm run check`: 0 errors / 0 warnings. `npm run build`: 112 páginas OK. Smoke test exhaustivo: (1) snapshot inicial correcto, (2) step manual muestra celda i en cian + celda j en naranja + log pedagógico, (3) 8 pasos cierran pasada 1 con swap correcto, (4) 50 pasos completan todas las pasadas → 28 comparaciones, 5 swaps, banner "¡Arreglo ordenado! [1,2,3,5,6,7,8,9]", botón Auto deshabilitado, (5) reset restaura array a `[6,2,8,3,9,1,5,7]`, (6) auto-play completo en 30s con mismo resultado. Listo para producción.
