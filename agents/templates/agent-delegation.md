# Plantilla: Delegación a un Agente

> Esta plantilla la usa el **Orquestador** (o cualquier agente que delegue) para entregar contexto completo a otro agente.

---

## @<agente-id> — Delegación

### Tarea
<descripción en 1-2 frases>

### Contexto relevante
- **Plan activo:** <link a context/active-plan.md>
- **Bitácora reciente:** <últimas 5-10 entradas de shared-context.md>
- **Decisiones previas relacionadas:** <links a ADRs>
- **Arquitectura:** <link a context/architecture.md>
- **Brief del proyecto:** <link a context/project-brief.md>

### Restricciones
- <restricción 1>
- <restricción 2>

### Inputs disponibles
- <archivo o recurso 1>
- <archivo o recurso 2>

### Outputs esperados
- **Archivo:** `agents/<rol>/outputs/<YYYYMMDD-HHMM>-<tarea-corta>.md`
- **Contenido:** <qué debe contener>
- **Actualización a `shared-context.md`:** <qué entrada agregar>

### Criterios de éxito
- [ ] <criterio 1>
- [ ] <criterio 2>
- [ ] <criterio 3>

### Dependencias
- **Bloquea a:** <qué tareas/agentos dependen de esta>
- **Es bloqueada por:** <qué tareas/agentos deben terminar antes>

### Notas
<información adicional relevante>

---

**Firma:** Orquestador / <otro agente que delega>
**Fecha:** <YYYY-MM-DD HH:MM>
**Prioridad:** alta | media | baja
