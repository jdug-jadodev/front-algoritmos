# 📋 Cheatsheet — MACS

> Referencia rápida. Para el manual completo, ver [README.md](README.md).

## Activar el sistema

```
Activa el sistema MACS para el proyecto X
```

## Clasificación de tareas

| Tipo | Disparador | Workflow | Agentes |
|------|-----------|----------|---------|
| **Trivial** | typo, 1 archivo, <5 min | directo | senior-dev |
| **Media** | feature 2-5 archivos | [standard-task.md](workflows/standard-task.md) | architect → tech-lead → senior-dev → qa-security |
| **Compleja** | refactor, nuevo módulo, >5 archivos | [complex-task.md](workflows/complex-task.md) | todos en cadena + paralelo |
| **Investigación** | "¿qué es mejor?", "investiga" | [research-task.md](workflows/research-task.md) | architect ‖ tech-lead ‖ qa-security → synth |

## Comandos rápidos

| Necesito... | Dile al Orquestador |
|-------------|---------------------|
| Implementar feature | *"Implementa X feature" → clasifica MEDIA* |
| Refactor | *"Refactoriza X módulo" → clasifica MEDIA/COMPLEJA* |
| Investigar | *"Investiga X" → clasifica INVESTIGACIÓN* |
| Auditar seguridad | *"Audita la seguridad de X" → QA y Seguridad directo* |
| Diseñar arquitectura | *"Diseña la arquitectura de X" → Arquitecto directo* |
| Solo arreglar un bug | *"Arregla el bug de X" → Senior Dev directo* |
| Cerrar plan actual | *"Cierra este plan"* → ejecuta 📦 mantenimiento |
| Cambiar de sesión | *"Rota la sesión"* → ejecuta 🔄 mantenimiento |
| Mantenimiento | *"Limpia el contexto"* → ejecuta 🗓️ mantenimiento |
| Estado del contexto | *"¿Cómo está el contexto?"* → reporta cardinalidad |

## Archivos clave

| Archivo | Categoría | Para qué |
|---------|-----------|----------|
| `AGENTS.md` | 🟢 Estático | Registro de agentes — **lee primero** |
| `orchestrator.md` | 🟢 Estático | Definición del Orquestador |
| `context/project-brief.md` | 🟢 Estático | Info del proyecto — **personaliza** |
| `context/lifecycle.md` | 🟢 Estático | Política de mantenimiento |
| `context/shared-context.md` | 🟡/🔴 Mixto | Snapshot + bitácora (se archiva) |
| `context/active-plan.md` | 🟡 Vivo | Plan en ejecución (se resetea) |
| `context/decisions-log.md` | 🔴 Histórico | ADRs (append-only) |
| `context/architecture.md` | 🟡 Vivo | Arquitectura (se actualiza) |
| `context/lessons-learned.md` | 🔴 Histórico | Lecciones (append-only) |
| `context/archive/` | 🔴 Histórico | Todo lo archivado |
| `agents/<rol>.md` | 🟢 Estático | Prompt/comportamiento de cada agente |
| `agents/<rol>/outputs/` | 🔴 Histórico | Outputs (se archivan) |

## Antes de empezar

1. ✅ Copia `agents/` a la raíz de tu proyecto
2. ✅ Personaliza `context/project-brief.md`
3. ✅ Activa MACS con el comando
4. ✅ Empieza con una tarea pequeña para probar el flujo

## Reglas de oro

- **Append-only en `shared-context.md` y `decisions-log.md`** — nunca borres entradas de otros.
- **Cada output a su carpeta** — `agents/<rol>/outputs/...`.
- **Cada decisión va a un ADR** — `context/decisions-log.md`.
- **Cada plan cerrado va a `context/archive/plans/`** con resultado.
- **El Orquestador nunca escribe código** — delega a Senior Dev.
- **El Senior Dev nunca aprueba su propio código** — pasa a QA.
- **Los archivos estáticos no se tocan por tarea** — solo se actualizan en nuevas versiones de MACS.

## Mantenimiento del sistema

📖 **Política completa:** [`context/lifecycle.md`](context/lifecycle.md)

### Lo que M3 hace solo (🟢 automático)

M3 mismo ejecuta estas operaciones — no tienes que mover archivos tú.

| Cuándo | Qué hace M3 |
|--------|-------------|
| Plan con todos los criterios ✅ | 📦 Cierra plan: mueve a `archive/plans/`, resetea `active-plan.md`, genera ADR si aplica |
| Un agente toma decisión arquitectónica | 📝 Agrega ADR a `decisions-log.md` |
| Cualquier agente actúa | 📋 Agrega entrada a `shared-context.md` |
| *"¿Cómo está el contexto?"* | 📊 Reporta cardinalidad (outputs, ADRs, entradas) |

### Lo que M3 pregunta antes de hacer (🟡 semi-automático)

| Disparador tuyo | Qué pregunta M3 | Qué hace si dices sí |
|-----------------|-----------------|---------------------|
| *"Rota la sesión"* | (o lo sugiere si bitácora > 200) | 🔄 Archiva bitácora, deja snapshot + 5 últimas |
| *"Limpia el contexto"* / *"Mantenimiento"* | (o lo sugiere si cardinalidad alta) | 🗓️ Archiva outputs >30d, bitácora >200, ADRs >50 |
| *(M3 detecta cardinalidad alta al iniciar plan)* | *"⚠️ Detecté N entradas. ¿Procedo con mantenimiento?"* | Ejecuta el mantenimiento correspondiente |

### Lo que tú decides explícitamente (🔴 manual)

| Acción | Cuándo |
|--------|--------|
| Borrar un archivo del `archive/` | Casi nunca (el archive es historia) |
| Modificar definiciones del sistema (`AGENTS.md`, `orchestrator.md`, etc.) | Solo al actualizar versión de MACS |
| Cambiar la política de mantenimiento | Editando `lifecycle.md` |

### Resumen de las 3 categorías

| Categoría | Archivos | Política |
|-----------|----------|----------|
| 🟢 **Estáticos** | `AGENTS.md`, `orchestrator.md`, `agents/*.md`, `workflows/*.md`, `templates/*.md`, `project-brief.md`, `lifecycle.md` | **Nunca** cambian por tarea |
| 🟡 **Vivos** | `active-plan.md`, snapshot de `shared-context.md` | Se **resetean** al cerrar un plan o rotar sesión |
| 🔴 **Históricos** | `decisions-log.md`, bitácora de `shared-context.md`, `agents/<rol>/outputs/*` | **Append-only**; se **archivan** periódicamente |

## Señales de que algo va mal

- 🚨 Un agente está leyendo archivos de otro rol sin haber sido delegado → re-llamar al Orquestador.
- 🚨 Hay contradicciones entre `architecture.md` y `decisions-log.md` → escalada a Líder Técnico.
- 🚨 El plan lleva más del doble del tiempo estimado → Gestor de Procesos escala.
- 🚨 QA y Seguridad encuentra un crítico → bloquea, no avanza.
- 🚨 `shared-context.md` tiene >200 entradas → rotar o archivar.
- 🚨 `decisions-log.md` tiene >50 ADRs → marcar antiguos como `[ARCHIVED]`.

## Personalización rápida

| Quiero... | Edito... |
|-----------|----------|
| Cambiar el stack por defecto | `context/project-brief.md` sección 4 |
| Cambiar el flujo de tareas | `workflows/*.md` |
| Agregar un agente nuevo | `agents/<nuevo>.md` + registrar en `AGENTS.md` |
| Cambiar convenciones de código | `context/architecture.md` |
| Agregar skills/MCPs | `context/project-brief.md` sección 9 |
| Cambiar política de mantenimiento | `context/lifecycle.md` |

---

**¿Dudas?** Lee [`README.md`](README.md), [`AGENTS.md`](AGENTS.md) o [`context/lifecycle.md`](context/lifecycle.md).
