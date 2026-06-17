# Plantilla: Actualización de Contexto

> Cómo un agente actualiza `context/shared-context.md` después de actuar.

## 1. Lee primero

```bash
# Antes de actualizar, lee:
cat agents/context/shared-context.md
cat agents/context/active-plan.md (si existe)
cat agents/AGENTS.md
```

## 2. Identifica el último evento

Busca la última línea de la bitácora. Tu nueva entrada va **debajo**.

## 3. Formato de la entrada

```
[YYYY-MM-DD HH:MM] [agente-id] — <verbo breve> <objeto>: <resultado clave>
```

### Ejemplos válidos

```
[2026-06-16 14:32] [architect] — diseño estructura: propuesta de 3 capas (api/services/repos) lista en architecture.md
[2026-06-16 14:45] [tech-lead] — validó approach: ADR-0017 aprobado con observaciones
[2026-06-16 15:10] [senior-dev] — implementó user-auth: 3 archivos creados, 12 tests passing
[2026-06-16 15:25] [qa-security] — validó entrega: 0 críticos, 2 medios, 1 bajo — APROBADO CON OBS
[2026-06-16 15:30] [process-manager] — cerró plan: PLAN-20260616-01 completado en 58min
```

## 4. Reglas

- ✅ **Append-only**: nunca borres ni reescribas entradas previas.
- ✅ **Conciso**: una línea por evento. El detalle va en `agents/<rol>/outputs/`.
- ✅ **Con verbos**: diseñó, validó, implementó, rechazó, aprobó, etc.
- ✅ **Con resultado**: terminó / falló / bloqueado por X.

## 5. Cuándo actualizar

- **Al iniciar** una tarea: marca el "inicio".
- **Al cerrar** una tarea: marca el "fin con resultado".
- **Al bloquearte**: marca el bloqueo inmediatamente.
- **Al desbloquear**: marca el desbloqueo y la causa.
