# Plan Activo

> Plan en ejecución. Cuando se cierra, se mueve a `context/archive/plans/YYYY-MM-PLAN-XXX.md` y este archivo se **resetea** a estado de plantilla.
> **Categoría:** 🟡 Vivo — se resetea al cerrar. Política completa en [`context/lifecycle.md`](lifecycle.md).

## Metadata

- **ID del plan:** _pendiente_
- **Tarea:** _pendiente_
- **Orquestador:** MiniMax M3 (MACS)
- **Fecha inicio:** _YYYY-MM-DD_
- **Estado:** _pendiente_

## Clasificación

_trivial | media | compleja | investigación_

## Agentes involucrados

1. ...

## Plan de ejecución

1. ...

## Criterios de éxito

- [ ] ...

## Outputs generados

| Agente | Archivo de output | Estado |
|--------|-------------------|--------|
| orchestrator | `agents/orchestrator/outputs/PLAN-XXX.md` | pendiente |
| ... | ... | ... |

## Bloqueos activos

_Ninguno._

## Decisiones tomadas durante el plan

- ...

## Resultado final (al cerrar)

_Pendiente_

## Lecciones aprendidas (para `lessons-learned.md`)

_Pendiente_

---

## 🧹 Acciones de cierre (ejecutadas por el Orquestador)

Al pasar este plan a estado `completed`, el Orquestador ejecuta:

- [ ] Mover este archivo a `context/archive/plans/YYYY-MM-PLAN-XXX.md`
- [ ] Agregar encabezado de archivo con fecha y link al plan original
- [ ] Resetear `active-plan.md` a esta plantilla
- [ ] Si hubo decisión arquitectónica → ADR en `decisions-log.md`
- [ ] Si cambió la arquitectura → actualizar `architecture.md` y archivar versión previa
- [ ] Agregar entrada a `shared-context.md` cerrando el plan
- [ ] Si hay lecciones → agregar a `lessons-learned.md`
