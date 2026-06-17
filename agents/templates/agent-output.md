# Plantilla: Output Estándar de un Agente

> Todo agente que entrega trabajo debe usar esta estructura para que el Orquestador y otros agentes puedan consumir su output sin ambigüedad.

---

# Output — <agente-id>

**Tarea:** <descripción>
**Plan:** <link a active-plan.md>
**Fecha:** <YYYY-MM-DD HH:MM>
**Estado:** completed | partial | blocked | failed

## Resumen ejecutivo
<2-3 líneas: qué se hizo y el resultado>

## Entregables

| # | Entregable | Ubicación | Tipo |
|---|------------|-----------|------|
| 1 | <qué> | <path> | código / doc / decisión / reporte |

## Cambios detallados
<si aplica: lista de cambios>

## Validación realizada
- [x] <validación 1>
- [x] <validación 2>

## Issues / Bloqueos
- <issue 1>: <estado>
- <issue 2>: <estado>

## Recomendaciones para el siguiente agente
- <recomendación 1>
- <recomendación 2>

## Entrada a `shared-context.md`
\`\`\`
[YYYY-MM-DD HH:MM] [agente-id] — <acción breve>
\`\`\`

## Entrada a `decisions-log.md` (si aplica)
- ADR-XXXX: <título>

---

**Firma:** <agente-id>
