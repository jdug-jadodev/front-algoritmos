# AGENTS.md — Registro Global del Sistema Multi-Agente

> **Sistema multi-agente transversal, basado en principios de Anthropic, optimizado para MiniMax M3.**
> Este archivo es el **punto de entrada y registro** de todos los agentes. Cualquier agente o instancia de IA que trabaje en el proyecto debe leer este archivo primero.

---

## 1. Identidad del Sistema

- **Nombre:** Multi-Agent Collaboration System (MACS)
- **Modelo host:** MiniMax M3 (también compatible con Fable 5, Opus 4.8, Sonnet 4.6, Haiku 4.5 según tarea)
- **Patrón base:** Orchestrator-Worker (tomado del artículo "Building a multi-agent research system" de Anthropic)
- **Versión:** 1.0.0
- **Transversalidad:** Diseñado para ser portable a cualquier proyecto. Se acopla a skills, MCPs, instrucciones de copilot, reportes de código y CLAUDE.md del proyecto huésped.

---

## 2. Los 6 Agentes del Sistema

| # | Agente | ID | Función principal |
|---|--------|-----|------------------|
| 1 | **Orquestador** | `orchestrator` | Planifica, coordina, delega y sintetiza |
| 2 | **Líder Técnico** | `tech-lead` | Decisiones técnicas de alto nivel, dirección de soluciones |
| 3 | **Arquitecto** | `architect` | Estructura del proyecto, stack, patrones, buenas prácticas |
| 4 | **Desarrollador Senior** | `senior-dev` | Implementación de código, refactors, features |
| 5 | **QA y Seguridad** | `qa-security` | Tests, validación funcional, auditoría de seguridad |
| 6 | **Gestor de Procesos** | `process-manager` | Flujo, dependencias, tracking, reportabilidad |

> Cada agente es un **rol que MiniMax M3 adopta** mediante un prompt y un conjunto de capacidades. No son instancias separadas en runtime, sino **modos de operación** con responsabilidades, contexto y formato de salida definidos.

---

## 3. Principios Rectores (del artículo de Anthropic aplicados a M3)

Estos principios rigen TODA la operación del sistema:

### 3.1 Pensar como el agente
Antes de delegar una tarea, simúlala mentalmente. Si no puedes predecir el resultado, divide la tarea o agrega contexto.

### 3.2 Delegación con descripciones detalladas
- Cada tarea delegada a un agente debe incluir: **objetivo, contexto relevante, restricciones, formato de salida esperado, criterios de éxito**.
- Una tarea mal delegada = un agente duplicará trabajo o fallará silenciosamente.

### 3.3 Esfuerzo proporcional a la complejidad
- **Tarea trivial** (typo, 1 archivo): 1 agente, sin orquestación.
- **Tarea media** (feature acotada, 2-5 archivos): Líder Técnico → Desarrollador.
- **Tarea compleja** (sistema nuevo, refactor mayor): Cadena completa + QA.
- **Tarea de investigación/descubrimiento**: Orquestador + paralelo (Arquitecto + Líder Técnico en paralelo).

### 3.4 Herramientas importan
- Antes de cualquier acción, verifica que la herramienta existe y su descripción es la correcta.
- Si una herramienta falla, **nunca improvises** — escala al Gestor de Procesos.

### 3.5 Mejora continua
- Después de cada tarea, el Orquestador pregunta: **"¿Qué bloqueó a los agentes? ¿Qué contexto faltó?"**
- Las mejoras se registran en `context/lessons-learned.md`.

### 3.6 Empezar amplio, luego narrow
- Investigación: primero visión panorámica, luego drill-down.
- Implementación: primero arquitectura, luego código, luego tests, luego seguridad.

### 3.7 Extended Thinking para planificación
- Toda decisión arquitectónica o plan complejo debe pasar por **pensamiento extendido** antes de actuar.
- En M3, esto se traduce en: **explícate a ti mismo el "por qué" antes del "cómo"**.

### 3.8 Paralelización agresiva
- Cuando varios agentes no dependen entre sí, lánzalos en paralelo.
- Ahorra tiempo y reduce dependencias innecesarias.

---

## 4. Flujo de Operación Estándar

```
┌─────────────────┐
│  Usuario / Tarea │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ 1. Orquestador recibe la consulta       │
│    - Lee AGENTS.md (este archivo)       │
│    - Lee context/shared-context.md      │
│    - Lee context/project-brief.md       │
│    - Clasifica complejidad (trivial/    │
│      media/compleja/investigación)      │
└────────┬────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ 2. Orquestador planifica                │
│    - Escribe plan en context/active-    │
│      plan.md                            │
│    - Selecciona agentes necesarios      │
│    - Identifica paralelizaciones        │
│    - Define criterios de éxito          │
└────────┬────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ 3. Delegación (secuencial o paralela)   │
│    - Cada agente escribe su output en   │
│      agents/<rol>/outputs/...           │
│    - Cada agente actualiza              │
│      context/shared-context.md          │
│    - El Gestor de Procesos hace track   │
└────────┬────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ 4. Síntesis                             │
│    - Orquestador recoge outputs         │
│    - QA valida la entrega               │
│    - Se documenta en context/           │
│      decisions-log.md                   │
└────────┬────────────────────────────────┘
         │
         ▼
┌─────────────────┐
│ Entrega final   │
└─────────────────┘
```

---

## 5. Contexto Compartido — Reglas de Oro

- **Antes de actuar**, todo agente lee:
  - `AGENTS.md` (este archivo)
  - `context/shared-context.md` (estado actual del proyecto)
  - `context/active-plan.md` (plan en ejecución, si existe)
  - El `README.md` o `CLAUDE.md` del proyecto huésped

- **Después de actuar**, todo agente actualiza:
  - `context/shared-context.md` con un bullet breve de qué hizo
  - `agents/<rol>/outputs/<timestamp>-<tarea>.md` con su entrega completa
  - Si tomó una decisión técnica, la agrega a `context/decisions-log.md`

- **Nunca** reescribas el contexto de otro agente. Solo añade.

---

## 6. Mantenimiento y Ciclo de Vida

El sistema distingue **3 categorías de archivos** con políticas distintas:

| Categoría | Archivos | Política |
|-----------|----------|----------|
| 🟢 **Estáticos** | `AGENTS.md`, `orchestrator.md`, `agents/*.md`, `workflows/*.md`, `templates/*.md`, `project-brief.md` | **Nunca** cambian por tarea |
| 🟡 **Vivos** | `active-plan.md`, snapshot de `shared-context.md` | Se **resetean** al cerrar un plan o rotar sesión |
| 🔴 **Históricos** | `decisions-log.md`, bitácora de `shared-context.md`, `agents/<rol>/outputs/*` | **Append-only**; se **archivan** periódicamente |

📖 **Política completa:** ver [`context/lifecycle.md`](context/lifecycle.md)

**Reglas rápidas:**
- El Orquestador ejecuta mantenimiento **al cerrar un plan** (archiva el plan y resetea `active-plan.md`).
- Al **cambiar de sesión**, ofrece archivar la bitácora.
- **Mensualmente** se revisan cardinalidades (outputs, ADRs, bitácora) y se mueven a `archive/`.
- **Nunca** se borran ADRs ni bitácora — solo se archivan.

---

## 7. Plantillas Disponibles

- `templates/agent-delegation.md` — Cómo delegar a un agente.
- `templates/agent-output.md` — Formato estándar de salida de un agente.
- `templates/context-update.md` — Cómo actualizar el contexto compartido.

---

## 8. Skills / MCPs / Instrucciones Externas

El sistema es **agnóstico al proyecto**. Si el proyecto huésped tiene:
- **Skills** definidas → el Orquestador las invoca a través del Gestor de Procesos.
- **MCPs** configurados → se usan según necesidad, declarándolos en `context/active-plan.md`.
- **Copilot/Claude instructions** → se leen al inicio y se respetan.
- **Reportes de código** (lint, coverage, audit) → el agente QA y Seguridad los consume.

---

## 9. Cómo Empezar

1. **Copia la carpeta `agents/` a la raíz de tu proyecto.**
2. **Lee `agents/README.md`** para el manual de uso.
3. **Personaliza `context/project-brief.md`** con la información de tu proyecto.
4. **Inicia sesión con MiniMax M3** y di: *"Activa el sistema MACS para el proyecto X"*.

---

## 10. Versión y Changelog

- **v1.0.0** — Sistema inicial con 6 agentes, contexto compartido, plantillas.
- **v1.1.0** — Política de ciclo de vida y mantenimiento (lifecycle.md, archive/).

**Mantenedor:** Jonathan Urrego
**Licencia:** Uso interno / personal.
