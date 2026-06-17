# Workflow: Tarea Compleja

> Para features de gran alcance, refactors mayores, nuevos módulos o sistemas, migraciones, o cualquier tarea que afecte la arquitectura.

## Disparador

- Nueva feature que requiere varios componentes nuevos.
- Refactor que toca más de 5 archivos o reorganiza la estructura.
- Migración de stack, base de datos o framework.
- Cambios en autenticación, autorización o manejo de datos sensibles.
- El Orquestador clasifica como COMPLEJA.

## Flujo

```
┌─────────────────────────────────────────────────────┐
│ FASE 0 — PLANIFICACIÓN                             │
│ (Orquestador + Gestor de Procesos)                 │
│                                                     │
│ - Orquestador lee todo el contexto                 │
│ - Gestor de Procesos descompone en tareas          │
│ - Genera context/active-plan.md con DAG            │
│ - Identifica paralelizaciones                      │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│ FASE 1 — DISEÑO (en paralelo)                      │
│                                                     │
│ ┌─────────────────────┐  ┌─────────────────────┐   │
│ │ ARQUITECTO          │  │ LÍDER TÉCNICO       │   │
│ │ - Diseño detallado  │  │ - Análisis riesgos  │   │
│ │ - Stack, patrones   │  │ - Trade-offs        │   │
│ │ - Estructura        │  │ - DoD técnico       │   │
│ │ - Convenciones      │  │ - ADR               │   │
│ └─────────────────────┘  └─────────────────────┘   │
│                                                     │
│ ⟶ Sincronización: ambos outputs se contrastan     │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│ FASE 2 — DECISIÓN (síntesis)                       │
│ (Orquestador)                                      │
│                                                     │
│ - Combina outputs de Arquitecto y Líder Técnico    │
│ - Genera plan final consolidado                    │
│ - ADR final en decisions-log.md                    │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│ FASE 3 — IMPLEMENTACIÓN (puede fragmentarse)       │
│ (Desarrollador Senior)                             │
│                                                     │
│ - Implementa por sub-tareas                        │
│ - Cada sub-tarea: code + tests + lint OK           │
│ - Output incremental para QA                      │
│ - Sube output a active-plan.md al cerrar c/ sub    │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│ FASE 4 — VALIDACIÓN (QA + Seguridad)               │
│                                                     │
│ - Ejecuta suite completa                          │
│ - Auditoría de seguridad                          │
│ - Reporta veredicto final                         │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│ FASE 5 — CIERRE (Orquestador)                      │
│                                                     │
│ - Sintetiza para el usuario                       │
│ - Documenta lecciones en lessons-learned.md        │
│ - Cierra active-plan.md → decisions-log.md        │
└─────────────────────────────────────────────────────┘
```

## Reglas especiales para tareas complejas

1. **Sub-tareas con entregables incrementales**: el Desarrollador Senior entrega en bloques revisables, no en una sola mega-PR.
2. **ADR obligatorio**: toda decisión arquitectónica va a `decisions-log.md`.
3. **Checkpoints**: el Gestor de Procesos reporta al usuario al cierre de cada fase.
4. **Validación continua**: QA valida cada bloque, no espera al final.
5. **Si la tarea supera 4 horas estimadas**: dividir en planes más pequeños.
