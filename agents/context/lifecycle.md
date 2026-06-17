# Ciclo de Vida y Mantenimiento de Archivos

> Este documento explica **cuándo se limpia, cuándo se archiva y cuándo nunca se toca** cada archivo del sistema MACS. Léelo antes de cuestionar "¿por qué shared-context.md crece tanto?".

---

## 1. Las 3 Categorías

### 🟢 ESTÁTICOS — No cambian nunca
Son las **definiciones del sistema**. Equivalen a librerías en código: no se modifican por cada tarea.

| Archivo | Razón |
|---------|-------|
| `agents/AGENTS.md` | Registro de agentes — se actualiza solo si agregas un agente nuevo |
| `agents/orchestrator.md` | Definición del Orquestador — solo cambia entre versiones de MACS |
| `agents/agents/*.md` | Prompts de cada agente — solo cambian al evolucionar el rol |
| `agents/workflows/*.md` | Flujos de trabajo — son plantillas de proceso |
| `agents/templates/*.md` | Plantillas de output — son contratos de formato |
| `context/project-brief.md` | Brief del proyecto — evoluciona lento, no por tarea |

> **Regla:** si un archivo es una **definición** o un **contrato**, no se toca por tarea.

### 🟡 VIVOS — Se resetean o rotan
Representan el **estado actual**. Se limpian cuando termina el ciclo que representan.

| Archivo | Cuándo se limpia | Cómo se limpia |
|---------|------------------|----------------|
| `context/active-plan.md` | Al cerrar un plan | Mover a `context/archive/plans/` y resetear a template |
| `context/shared-context.md` (snapshot) | Al cambiar de sesión / semanalmente | Mover entradas antiguas a `context/archive/bitacora/` y dejar solo el snapshot + bitácora reciente |
| `context/architecture.md` (sección "estado actual") | Cuando cambia la arquitectura | Mover la versión anterior a `context/archive/architecture/` con fecha |

> **Regla:** lo que describe el **"ahora"** se limpia cuando ese "ahora" termina.

### 🔴 HISTÓRICOS — Nunca se borran, se archivan
Representan la **memoria institucional**. Son append-only, pero se mueven a archivo cuando crece demasiado.

| Archivo | Cuándo se archiva | Cómo se archiva |
|---------|-------------------|-----------------|
| `context/decisions-log.md` (ADRs) | **Nunca** se borra; opcionalmente se mueve a `context/archive/decisions/` si supera ~50 ADRs | Mover ADRs viejos con tag `[ARCHIVED]` |
| `context/shared-context.md` (bitácora completa) | Cada ~30 días o cuando supera ~200 entradas | Mover bloque de entradas a `context/archive/bitacora/YYYY-MM-bitacora.md` |
| `context/lessons-learned.md` | **Nunca** se borra; comprimir si supera 50 lecciones | Consolidar en un resumen anual en `context/archive/` |
| `agents/<rol>/outputs/*.md` | Cada ~30 días o cuando un agente tiene >20 outputs | Mover a `agents/<rol>/outputs/archive/YYYY-MM/` |

> **Regla:** la **historia** nunca se borra, pero se **empaqueta** para que el sistema siga siendo navegable.

---

## 2. Triggers de Mantenimiento

El mantenimiento tiene **3 niveles de automatización**, según quién decide y quién ejecuta:

| Nivel | ¿Quién decide? | ¿Quién ejecuta? | Ejemplo |
|-------|---------------|-----------------|---------|
| 🟢 **Totalmente automático** | M3 (Orquestador) | M3 mismo | Cerrar un plan cuando todos los criterios están ✅ |
| 🟡 **Semi-automático** | Tú (disparador) | M3 | Rotar sesión, mantenimiento mensual |
| 🔴 **Manual** | Tú (decisión) | M3 (herramientas) | Borrar un archivo, modificar el sistema |

> **Importante:** M3 TIENE las herramientas (Bash, Read, Write, Edit, Glob, Grep) para hacer TODA la manipulación de archivos. No hay un script externo que mantener. **M3 es el ejecutor.**

### 2.1 Mantenimiento al cerrar un plan (🟢 totalmente automático)

Cada vez que el Orquestador cierra un plan (`active-plan.md` → estado `completed`), ejecuta automáticamente:

```
📦 AL CERRAR UN PLAN (M3 lo hace solo)
├── 1. Mover active-plan.md → context/archive/plans/YYYY-MM-PLAN-XXX.md
├── 2. Resetear active-plan.md a estado de plantilla vacía
├── 3. Agregar entrada a decisions-log.md (ADR si hubo decisión arquitectónica)
├── 4. Actualizar architecture.md si cambió la arquitectura
└── 5. Cerrar cualquier output pendiente en agents/<rol>/outputs/
```

**Trigger:** M3 detecta que el plan activo tiene todos los criterios ✅ y la tarea está entregada. O le dices *"Cierra el plan"*.

### 2.2 Mantenimiento al cambiar de sesión (🟡 semi-automático)

**M3 no sabe cuándo termina tu sesión de trabajo real** (las sesiones son tuyas, no del archivo). Pero M3 puede:
- Detectar cardinalidad alta y sugerir rotación
- Preguntar al inicio de cada plan si rotar

Cuando inicias un plan o lo solicitas, M3 pregunta:

> *"⚠️ La bitácora tiene N entradas (umbral 200). Recomiendo rotar. ¿Procedo?"*

Si dices *"Sí"* o *"Rota la sesión"*:
```
🔄 ROTACIÓN DE SESIÓN (M3 ejecuta, tú confirmas)
├── 1. Mover bitácora completa de shared-context.md → context/archive/bitacora/YYYY-MM-DD-bitacora.md
├── 2. Dejar solo el snapshot + últimas 5 entradas en shared-context.md
├── 3. Resetear active-plan.md si estaba en estado pending/in_progress
└── 4. Mantener architecture.md, project-brief.md, decisions-log.md, lessons-learned.md
```

### 2.3 Mantenimiento periódico (🟡 semi-automático)

Una vez al mes, o cuando M3 detecta cardinalidad alta, sugiere mantenimiento. Tú confirmas y M3 ejecuta.

**Disparadores automáticos** (M3 los detecta al inicio de cada plan):
- Bitácora > 200 entradas → sugiere rotación
- Outputs por agente > 20 o > 30 días → sugiere archivo
- ADRs > 50 → sugiere marcado como [ARCHIVED]
- Drift `architecture.md` vs código → sugiere actualización

```
🗓️ MANTENIMIENTO MENSUAL (M3 ejecuta, tú confirmas)
├── 1. Contar outputs por agente
│   → Si >20 o >30 días: archivar a agents/<rol>/outputs/archive/YYYY-MM/
├── 2. Contar entradas en bitácora
│   → Si >200 o >30 días: archivar a context/archive/bitacora/YYYY-MM-bitacora.md
├── 3. Contar ADRs
│   → Si >50: marcar como [ARCHIVED] los más viejos
├── 4. Revisar architecture.md vs código real
│   → Si hay drift: levantar plan de actualización
└── 5. Resumir lessons-learned.md si tiene >50 entradas
```

**Trigger:** *"Limpia el contexto"*, *"Mantenimiento"*, o M3 lo sugiere al detectar cardinalidad alta.

---

## 3. Estructura de Archivo

```
agents/
├── context/
│   ├── shared-context.md          (snapshot + bitácora reciente)
│   ├── active-plan.md             (reset a plantilla al cerrar)
│   ├── project-brief.md           (estático)
│   ├── architecture.md            (vivo, se actualiza lento)
│   ├── decisions-log.md           (histórico, append-only)
│   ├── lessons-learned.md         (histórico, append-only)
│   ├── lifecycle.md               (ESTE ARCHIVO — estático)
│   └── archive/                   (todo lo histórico movido aquí)
│       ├── README.md
│       ├── plans/
│       │   └── YYYY-MM-PLAN-XXX.md
│       ├── bitacora/
│       │   └── YYYY-MM-DD-bitacora.md
│       ├── decisions/
│       │   └── YYYY-MM-decisions-archive.md
│       └── architecture/
│           └── YYYY-MM-DD-architecture-vX.md
│
└── agents/
    └── <rol>/
        └── outputs/
            ├── 20260616-1430-...md   (recientes)
            ├── 20260616-1500-...md
            └── archive/
                └── 2026-06/
                    └── 20260601-...md  (movidos aquí después de 30 días)
```

---

## 4. Política por Archivo (resumen ejecutivo)

| Archivo | Categoría | Limpieza | Archivo | NUNCA borrar |
|---------|-----------|----------|---------|--------------|
| `AGENTS.md` | 🟢 Estático | — | — | ✅ |
| `orchestrator.md` | 🟢 Estático | — | — | ✅ |
| `agents/*.md` | 🟢 Estático | — | — | ✅ |
| `workflows/*.md` | 🟢 Estático | — | — | ✅ |
| `templates/*.md` | 🟢 Estático | — | — | ✅ |
| `project-brief.md` | 🟢 Estático | — | — | ✅ |
| `lifecycle.md` | 🟢 Estático | — | — | ✅ |
| `active-plan.md` | 🟡 Vivo | Reset al cerrar plan | Por plan | ❌ (se resetea) |
| `shared-context.md` | 🟡/🔴 Mixto | Snapshot se mantiene, bitácora se archiva | Mensual | ❌ (se archiva) |
| `architecture.md` | 🟡 Vivo | Se actualiza al cambiar | Por versión | ❌ (se archiva versión) |
| `decisions-log.md` | 🔴 Histórico | — | Si >50 ADRs | ✅ |
| `lessons-learned.md` | 🔴 Histórico | Comprimir si >50 | Anual | ✅ (se resume) |
| `agents/<rol>/outputs/*.md` | 🔴 Histórico | — | Si >20 por agente | ✅ (se archiva) |

---

## 5. Comandos del Orquestador para Mantenimiento

El Orquestador responde a estos disparadores y niveles de automatización:

| Disparador del usuario | Nivel | Acción |
|------------------------|-------|--------|
| *"Cierra este plan"* / plan con todos los criterios ✅ | 🟢 Auto | Ejecuta `📦 AL CERRAR UN PLAN` |
| *"Rota la sesión"* / *"Nueva sesión"* | 🟡 Confirmación | Ejecuta `🔄 ROTACIÓN DE SESIÓN` |
| *"Mantenimiento"* / *"Limpia el contexto"* | 🟡 Confirmación | Ejecuta `🗓️ MANTENIMIENTO MENSUAL` |
| *"¿Cómo está el contexto?"* | 🟢 Auto | Reporta cardinalidad: # outputs, # ADRs, # entradas bitácora |
| *(M3 detecta cardinalidad alta al iniciar plan)* | 🟡 Confirmación | Sugiere rotación / mantenimiento |

### Resumen de la automatización

```
🟢 AUTO (M3 hace solo, sin preguntar):
  - Cerrar plan cuando criterios ✅
  - Mover archivos al cerrar plan
  - Resetear active-plan.md a plantilla
  - Actualizar bitácora con eventos
  - Reportar cardinalidad cuando se la pidas

🟡 SEMI-AUTO (M3 pregunta, tú confirmas):
  - Rotar sesión
  - Mantenimiento mensual
  - Archivar outputs/bitácora/ADRs por cardinalidad alta

🔴 MANUAL (tú decides, M3 ejecuta con herramientas):
  - Borrar un archivo del archive
  - Modificar definiciones del sistema (AGENTS.md, etc.)
  - Cambiar la política de mantenimiento
  - Resetear manualmente active-plan.md a media tarea
```

---

## 6. Anti-patrones de Mantenimiento

| ❌ NO hacer | ✅ Hacer en su lugar |
|------------|---------------------|
| Borrar entradas de la bitácora para "limpiar" | Mover a `archive/bitacora/` |
| Reescribir `active-plan.md` mientras está en uso | Cerrar el plan primero y luego resetear |
| Borrar outputs viejos "porque ya no sirven" | Archivar — pueden ser referencia histórica |
| Modificar prompts de agentes "para que funcione mejor" | Primero registrar en `lessons-learned.md` y luego mejorar la versión |
| Borrar ADRs viejos | Marcar como `[DEPRECATED]` o `[SUPERSEDED by ADR-XXXX]` |

---

## 7. Versionado del Sistema

El sistema MACS en sí tiene versiones. Los cambios al sistema (no al proyecto) se documentan aquí:

- **v1.0.0** — Sistema inicial con 6 agentes, contexto compartido, plantillas.

### Política de versionado

- **MAJOR:** cambios incompatibles (nuevo agente obligatorio, cambio de formato de output).
- **MINOR:** nuevo agente opcional, nuevo workflow, nueva plantilla.
- **PATCH:** corrección de typos, clarificaciones, mejoras de redacción.

---

**Mantenedor:** Jonathan Urrego
**Última actualización:** 2026-06-16
