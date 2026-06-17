# Lecciones Aprendidas

> Memoria institucional del sistema multi-agente. Lo que funcionó, lo que no, lo que ajustaremos la próxima vez.

## Formato

\`\`\`
## [YYYY-MM-DD] <tarea/plan>

**Qué funcionó:**
- ...

**Qué no funcionó:**
- ...

**Acción correctiva:**
- ...
\`\`\`

## Lecciones

## [2026-06-16] PLAN-20260616-01 — Code examples + header simplificado

**Qué funcionó:**
- El generador idempotente (`scripts/generate-code-examples.cjs`) fue la decisión correcta: escribir 110 implementaciones × 3 lenguajes a mano en `algorithms.json` habría sido inviable; el script las centraliza y se puede regenerar.
- El componente `CodeExamples.astro` con `Props` opcional (`string | undefined`) evitó problemas con `exactOptionalPropertyTypes: true` después de añadir el `| undefined` explícito.
- Reutilizar el mismo componente en `Visualizer.astro` (como tab) y `ComingSoon.astro` (como sección inline) mantuvo consistencia visual entre los 2 algoritmos con visualizador y los 108 sin él.

**Qué no funcionó:**
- El IDE diagnostic corrió entre edits consecutivos y reportó errores stale (e.g. `level is declared but its value is never read` después de quitarlo, o `tags/complexity/description` no encontrados cuando ya estaban borrados). El `astro check` final los desmintió.
- La pestaña "¿Cómo funciona?" quedó en `demo-visualizer.astro` con su contenido antiguo porque ese template histórico no estaba en el radar inicial; un `grep -r "¿Cómo funciona?"` lo habría detectado antes.

**Acción correctiva:**
- Antes de tocar un layout, hacer `grep -r "<prop>" src/` para listar TODOS los call-sites, no solo los obvios.
- Considerar añadir un hook de CI que ejecute `astro check` después de cada batch de edits para detectar stale diagnostics al instante.

