# Workflow: Investigación / Descubrimiento

> Para tareas donde el "qué" no está claro: hay que explorar, evaluar opciones, investigar tecnologías o diagnosticar un problema desconocido.

## Disparador

- "Investiga cómo hacer X"
- "Evalúa si，我们应该 usar Y o Z"
- "Encuentra por qué está fallando..."
- "Analiza el código y propón mejoras"
- El Orquestador clasifica como INVESTIGACIÓN.

## Flujo

```
┌─────────────────────────────────────────────────────┐
│ FASE 0 — SCOPING                                   │
│ (Orquestador)                                      │
│                                                     │
│ - Lee contexto completo                            │
│ - Formula la pregunta de investigación claramente  │
│ - Define qué outputs se esperan                   │
│ - Acota el alcance (qué NO se va a investigar)    │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│ FASE 1 — INVESTIGACIÓN EN PARALELO                 │
│                                                     │
│ ┌──────────────────┐ ┌──────────────────┐ ┌──────┐│
│ │ ARQUITECTO       │ │ LÍDER TÉCNICO   │ │ QA   ││
│ │ - Explora el     │ │ - Analiza        │ │ -    ││
│ │   código/        │ │   trade-offs,    │ │ inves││
│ │   estructura     │ │   riesgos,       │ │ tiga ││
│ │ - Investiga      │ │   alternativas   │ │ vulne││
│ │   patrones       │ │ - Investiga      │ │ rabil││
│ │   usados         │ │   performance    │ │ idad ││
│ └──────────────────┘ └──────────────────┘ └──────┘│
│                                                     │
│ ⟶ 3-5 sub-agentes idealmente, en paralelo        │
│ ⟶ Cada uno escribe a agents/<rol>/outputs/...    │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│ FASE 2 — CROSS-REFERENCE                           │
│ (Líder Técnico)                                     │
│                                                     │
│ - Compara outputs de los sub-agentes              │
│ - Identifica contradicciones                       │
│ - Sintetiza hallazgos                              │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│ FASE 3 — RECOMENDACIÓN                             │
│ (Orquestador)                                      │
│                                                     │
│ - Genera reporte final con:                       │
│   - Hallazgos clave                                │
│   - Recomendación argumentada                      │
│   - Próximos pasos propuestos                      │
│ - Output: agents/orchestrator/outputs/...         │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│ FASE 4 — DECISIÓN DEL USUARIO                      │
│                                                     │
│ - El usuario revisa la recomendación              │
│ - Decide: proceder / ajustar / descartar          │
│ - Si procede: se inicia un nuevo plan estándar     │
│   o complejo según el caso                        │
└─────────────────────────────────────────────────────┘
```

## Tipos de investigación soportados

- **Tecnológica:** "¿Deberíamos usar X o Y?"
- **De código:** "¿Cómo funciona este módulo?"
- **De bugs:** "¿Por qué falla X?"
- **De mercado/competencia:** "¿Cómo lo hacen otros?"
- **De seguridad:** "¿Hay vulnerabilidades?"

## Output esperado

Un **reporte de investigación** en `agents/orchestrator/outputs/<fecha>-research-<tema>.md` con:

1. **Pregunta de investigación** (clara y específica)
2. **Metodología** (qué se buscó, qué fuentes se consultaron)
3. **Hallazgos** (con citas a fuentes o archivos)
4. **Análisis comparativo** (si aplica)
5. **Recomendación argumentada**
6. **Riesgos conocidos**
7. **Próximos pasos sugeridos**
