# Workflow: Tarea Estándar (Media)

> Para features acotadas que tocan 2-5 archivos y no requieren cambios arquitectónicos mayores.

## Disparador

El usuario pide una feature/refactor/bugfix con scope claro y bien definido.

## Flujo

```
┌─────────────────────────────────────────────────────┐
│ 1. ORQUESTADOR                                     │
│    - Lee AGENTS.md, shared-context.md, project-    │
│      brief.md                                      │
│    - Clasifica: MEDIA                              │
│    - Crea context/active-plan.md (PLAN-XXX)        │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│ 2. ARQUITECTO (rápido)                             │
│    - Identifica archivos a tocar                   │
│    - Propone approach (1-2 párrafos)               │
│    - Output: agents/architect/outputs/...          │
│    - Tiempo objetivo: 5-10 min                     │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│ 3. LÍDER TÉCNICO (validación)                      │
│    - ¿El approach es coherente?                    │
│    - ¿Hay trade-offs evidentes?                    │
│    - ¿Definition of Done claro?                    │
│    - Output: agents/tech-lead/outputs/...          │
│    - Tiempo objetivo: 3-5 min                      │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│ 4. DESARROLLADOR SENIOR                            │
│    - Implementa según el approach                  │
│    - Escribe tests                                 │
│    - Ejecuta lint + typecheck + tests              │
│    - Output: agents/senior-dev/outputs/...         │
│    - Tiempo objetivo: 15-45 min                    │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│ 5. QA Y SEGURIDAD                                  │
│    - Ejecuta suite completa                        │
│    - Revisa seguridad del cambio                   │
│    - Reporta veredicto                             │
│    - Output: agents/qa-security/outputs/...        │
│    - Tiempo objetivo: 5-15 min                     │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│ 6. ORQUESTADOR (cierre)                            │
│    - Sintetiza para el usuario                     │
│    - Mueve plan a decisions-log.md                 │
│    - Cierra active-plan.md                         │
└─────────────────────────────────────────────────────┘
```

## Criterios para activar este workflow

- [ ] La tarea tiene un scope bien definido (no es ambigua).
- [ ] Toca entre 2 y 5 archivos.
- [ ] No introduce nueva dependencia mayor.
- [ ] No cambia el modelo de datos.
- [ ] No afecta la autenticación/autorización.

Si **cualquiera** de estos falla, escala a `complex-task.md`.
