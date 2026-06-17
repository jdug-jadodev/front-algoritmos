# Decisions Log — Bitácora de Decisiones Técnicas (ADR)

> Este archivo es el **historial de decisiones arquitectónicas** del proyecto. Sigue el formato ADR (Architecture Decision Record).

## Formato de cada entrada

```markdown
## ADR-<NNNN> — <título corto de la decisión>

**Fecha:** <YYYY-MM-DD>
**Estado:** Propuesta | Aceptada | Deprecated | Superseded by ADR-XXXX
**Decisor:** <agente que tomó la decisión>
**Contexto:** <tarea/plan que motivó la decisión>

### Contexto
<situación que llevó a la decisión>

### Decisión
<qué se decidió>

### Consecuencias
**Positivas:**
- ...

**Negativas:**
- ...

**Riesgos residuales:**
- ...

### Alternativas consideradas
- <alternativa>: <por qué se descartó>
```

---

## Índice de Decisiones

| ID | Título | Fecha | Estado |
|----|--------|-------|--------|
| ADR-0001 | Code examples en algorithms.json + componente CodeExamples.astro | 2026-06-16 | Aceptada |
| ADR-0002 | Header de algoritmo: solo título + LevelBadge | 2026-06-16 | Aceptada |

---

## Decisiones

## ADR-0001 — Code examples en algorithms.json + componente CodeExamples.astro

**Fecha:** 2026-06-16
**Estado:** Aceptada
**Decisor:** orchestrator
**Contexto:** PLAN-20260616-01 — reemplazar la pestaña "¿Cómo funciona?" por ejemplos de código en JavaScript, Java y Python para los 110 algoritmos.

### Contexto
El usuario pidió que la sección "¿Cómo funciona?" dejara de ser un placeholder textual y mostrara ejemplos de código comparables en 3 lenguajes, manteniendo los estilos existentes.

### Decisión
- Añadir el campo `codeExamples: { js, java, python }` a cada uno de los 110 algoritmos en `src/data/algorithms.json`.
- Los ejemplos se generan con un script idempotente (`scripts/generate-code-examples.cjs`) para que la fuente de verdad sea reproducible.
- Renderizar los 3 ejemplos apilados con un nuevo componente `src/components/visualizer/CodeExamples.astro` que reutiliza el estilo `info-card`/`surface` del resto del visualizador.
- El componente se enchufa tanto en `Visualizer.astro` (pestaña "💻 Ejemplos de código") como en `ComingSoon.astro` (sección inline), para que los algoritmos sin visualizador también tengan ejemplos.

### Consecuencias
**Positivas:**
- Pedagogía reforzada: el mismo algoritmo en 3 lenguajes facilita la transferencia mental.
- Una sola fuente de verdad (`algorithms.json`); el script garantiza consistencia.
- Reutilizable: el componente `CodeExamples` se puede usar en cualquier otro `info-card`.

**Negativas:**
- `algorithms.json` crece ~108 KB (de ~24 KB a 132 KB, 1872 líneas).
- Mantenimiento: si un algoritmo cambia de signature, hay que regenerar.

**Riesgos residuales:**
- Para algoritmos muy avanzados (Blossom, Ukkonen, quantum) las implementaciones son esquemáticas; se documenta explícitamente que se debe consultar la referencia canónica.

### Alternativas consideradas
- **Archivo separado `code-examples.json`:** descartado por fragmentar la fuente de verdad.
- **Generar ejemplos on-the-fly con IA:** descartado por coste y determinismo.
- **Solo para los 2 algoritmos con visualizador:** descartado porque el usuario pidió "en los algoritmos" (plural general).

---

## ADR-0002 — Header de algoritmo: solo título + LevelBadge

**Fecha:** 2026-06-16
**Estado:** Aceptada
**Decisor:** orchestrator
**Contexto:** PLAN-20260616-01 — simplificar la cabecera de la página de algoritmo.

### Contexto
El usuario pidió eliminar de la cabecera inicial "el resto" (descripción, complejidad, tags) y dejar solo el nombre y el nivel.

### Decisión
- En `src/layouts/AlgoLayout.astro` se eliminan los bloques `description`, `complexity` y `tags` del `<header class="algo-header">`.
- El `interface Props` se reduce a `{ title, algoId, level }`.
- `src/pages/algoritmos/[slug].astro` deja de pasar `complexity`, `description` y `tags` al layout.
- `src/pages/algoritmos/demo-visualizer.astro` (template histórico) se ajusta al nuevo contrato.
- La metadata del algoritmo sigue disponible en `algorithms.json` y se renderiza en la pestaña "💻 Ejemplos de código" (header del CodeExamples) o en la pestaña "¿Qué es?" del Visualizer.

### Consecuencias
**Positivas:**
- Cabecera más limpia y enfocada en identidad (nombre + nivel).
- Contrato del layout más estricto (3 props en vez de 6).
- Las clases CSS `.algo-description`, `.algo-meta`, `.tags`, `.tag`, `.meta-label`, `.meta-value` quedan huérfanas — candidatas a limpieza futura.

**Negativas:**
- Descripción, complejidad y tags ya no son visibles "above the fold"; se accede vía tabs.

**Riesgos residuales:**
- Si el roadmap (`index.astro`) dependiera de la cabecera para SEO/visualización, podría romperse. No aplica: el roadmap usa `AlgoCard` propio.

### Alternativas consideradas
- **Mantener todo y añadir toggle "compact/expanded":** descartado por sobre-ingeniería para el cambio pedido.

