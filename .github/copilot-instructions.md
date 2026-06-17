---
applyTo: "**"
---

# Copilot Instructions — front-algoritmos

> Plataforma interactiva de algoritmos con visualizadores paso a paso.
> **Stack:** Astro 4 (estático) · TypeScript estricto · Vanilla JS + CSS Variables
> **Fase actual:** FASE 0 ✅ Fundamentos → FASE 1 🚧 Motor de Visualización

---

## 🎯 1. Identidad del proyecto

- **Nombre:** `plataforma-algoritmos`
- **Tipo:** Sitio estático educativo tipo "roadmap interactivo"
- **Catálogo:** 110 algoritmos distribuidos en 5 niveles (0–4)
- **Estado por algoritmo:** completado (persistido en `localStorage`) + visualizador
- **Deploy objetivo:** Vercel (output `static`)

---

## 🧱 2. Arquitectura y convenciones

### Estructura
```
src/
├── components/
│   ├── layout/         → LevelBadge, controles globales
│   ├── roadmap/        → AlgoCard, navegación
│   └── visualizer/     → Visualizer, Controls, StepLog, TabSystem
├── data/algorithms.json → Catálogo maestro (NO modificar slugs publicados)
├── layouts/            → BaseLayout, AlgoLayout
├── lib/visualizers/    → Lógica de algoritmos (TS puro, sin DOM)
│   ├── types.ts        → Interfaz Visualizer (contrato)
│   ├── registry.ts     → Registro slug → visualizer
│   └── <algoritmo>.ts  → Implementación por algoritmo
├── pages/
│   ├── index.astro
│   └── algoritmos/[slug].astro
└── scripts/            → Código cliente (filtros, progreso)
```

### Reglas de oro
1. **`algorithms.json` es la fuente de verdad** — un algoritmo nuevo requiere entrada aquí.
2. **Visualizers son TS puro** — sin acceso a `document` ni `window`; el motor Astro/JS los invoca.
3. **Sin frameworks UI** — solo vanilla CSS con variables del sistema de diseño.
4. **Output `static`** — todo lo que se genere debe funcionar en build estático (sin SSR runtime).
5. **TypeScript estricto** — `tsconfig` extiende `astro/tsconfigs/strictest`. No uses `any`.

---

## 🎨 3. Sistema de diseño (CSS variables)

Usa SIEMPRE las variables definidas en `BaseLayout.astro`. Nunca hardcodear colores.

| Variable | Uso |
|----------|-----|
| `--bg`, `--surface`, `--card` | Fondos por profundidad |
| `--border` | Separadores y contornos |
| `--accent` (violeta) | Acciones primarias |
| `--accent2` (cyan) | Títulos de sección |
| `--text`, `--muted` | Texto principal / secundario |
| `--ptr-left`, `--ptr-right` | Punteros en animaciones de arrays |
| `--match` (rosa) | Resultado encontrado |
| `--swap` (violeta claro) | Intercambio en curso |
| `--visited`, `--current`, `--highlight` | Estado de nodos en grafos/trees |

**Tipografías:**
- `Space Mono` → código, números, valores
- `Syne` → UI y títulos

---

## 🧩 4. Sistema MACS (multi-agente)

Este proyecto usa el sistema **MACS** definido en [agents/](../agents/README.md). Antes de actuar:

1. Lee [agents/AGENTS.md](../agents/AGENTS.md) y [agents/orchestrator.md](../agents/orchestrator.md).
2. Clasifica la tarea: **trivial** / **media** / **compleja** / **investigación**.
3. Sigue el workflow correspondiente en [agents/workflows/](../agents/workflows/).
4. Mantén el contexto global en [context/](../context/).

### Mapeo de roles → acciones

| Rol | Cuándo invocarlo |
|-----|------------------|
| **architect** | Diseño de arquitectura, contratos de tipos, decisiones técnicas grandes |
| **tech-lead** | Revisión de PRs, validación de patrones, escalación de deuda |
| **senior-dev** | Implementación directa, bugs, refactors acotados |
| **qa-security** | Validación, accesibilidad, auditoría de seguridad, performance |
| **process-manager** | Mantenimiento de contexto, archivo de planes, cardinalidad |
| **orchestrator** | Punto de entrada: clasifica y delega |

---

## 📐 5. Convenciones de código

### TypeScript
- Tipos exportados desde `src/lib/visualizers/types.ts` definen el contrato de un visualizer.
- Usar `interface` para objetos, `type` para uniones/aliases.
- Imports absolutos solo para tipos compartidos; relativos para el resto.
- Evitar `any`. Usar `unknown` + narrowing cuando el tipo sea incierto.

### Astro Components (`.astro`)
- Frontmatter: lógica de servidor/build. NO incluir JS pesado innecesario.
- Scripts cliente: con `is:inline` o módulos según el caso.
- Props siempre tipadas con `interface Props` en el frontmatter.
- Slots nombrados para composición (`<slot name="header" />`).

### CSS
- Una hoja por visualizer en `src/lib/visualizers/styles/`.
- BEM opcional pero preferido para clases de componentes.
- Mobile-first. Breakpoints: `480px`, `768px`, `1024px`, `1280px`.

### JavaScript cliente
- Sin dependencias externas (no jQuery, no Lodash, no React).
- Usar `localStorage` con namespace `algo:` (ej. `algo:progress`, `algo:settings`).
- Funciones puras cuando sea posible; aislar efectos en init.

---

## 📝 6. Workflows de tarea

### Tarea trivial (typo, 1 archivo, <5 min)
→ Ejecutar directamente con `senior-dev`.

### Tarea media (feature 2–5 archivos)
→ [standard-task.md](../agents/workflows/standard-task.md):
`architect` → `tech-lead` → `senior-dev` → `qa-security`

### Tarea compleja (refactor, módulo nuevo, >5 archivos)
→ [complex-task.md](../agents/workflows/complex-task.md):
cadena completa + paralelos donde aplique.

### Investigación
→ [research-task.md](../agents/workflows/research-task.md):
`architect` ‖ `tech-lead` ‖ `qa-security` → síntesis.

---

## ✅ 7. Quality gates

Antes de dar una tarea por terminada:

- [ ] `npm run check` pasa sin errores.
- [ ] `npm run build` genera `dist/` sin warnings nuevos.
- [ ] Probado en Chrome, Firefox y al menos un móvil.
- [ ] Si tocaste un visualizer, verificar paso a paso con un input pequeño.
- [ ] Si tocaste `algorithms.json`, validar JSON y que no rompa slugs existentes.
- [ ] Si añadiste dependencias, justificar en un ADR en [decisions-log.md](../context/decisions-log.md).
- [ ] Sin nuevos TODOs ni código comentado.
- [ ] Mensajes de commit en español, imperativo, scope claro.

---

## 🚫 8. Anti-patrones

- ❌ Añadir React/Vue/Svelte — el proyecto es **vanilla + Astro**.
- ❌ Hardcodear colores en lugar de usar variables CSS.
- ❌ Crear archivos en la raíz sueltos — todo va en `src/` con su rol claro.
- ❌ Modificar el `slug` de un algoritmo ya publicado (rompería URLs).
- ❌ Meter lógica de DOM dentro de los visualizers en `src/lib/visualizers/`.
- ❌ Importar desde `@/` (no hay path alias configurado en `tsconfig.json`).
- ❌ Borrar entradas de `decisions-log.md` o `lessons-learned.md` (append-only).
- ❌ Cambiar versiones de Astro/TypeScript sin ADR previo.

---

## 📚 9. Referencias clave

| Documento | Para qué |
|-----------|----------|
| [README.md](../README.md) | Visión general, instalación, deploy |
| [ONE_SPEC.md](../ONE_SPEC.md) | Spec raíz del proyecto |
| [agents/README.md](../agents/README.md) | Manual de MACS |
| [agents/AGENTS.md](../agents/AGENTS.md) | Registro de agentes |
| [agents/CHEATSHEET.md](../agents/CHEATSHEET.md) | Referencia rápida MACS |
| [agents/workflows/](../agents/workflows/) | Flujos por tipo de tarea |
| [agents/templates/](../agents/templates/) | Plantillas de output/contexto |
| [astro.config.mjs](../astro.config.mjs) | Configuración de Astro |
| [tsconfig.json](../tsconfig.json) | TypeScript estricto |

---

## 🗣️ 10. Idioma y comunicación

- **Código:** comentarios y nombres de variables en **inglés** (estándar industria).
- **UI/UX del producto:** en **español** (textos visibles al usuario).
- **Docs internas / ADRs / commits:** en **español**.
- **Respuestas de Copilot:** en español, concisas, con ejemplos de código cuando aporte.

---

> 💡 **Regla de oro:** si dudas entre dos enfoques, elige el más simple que
> funcione con el stack actual (Astro + vanilla). No añadas complejidad
> prematura.
