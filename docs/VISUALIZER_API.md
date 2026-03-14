# 📚 Visualizer API - Guía Completa

> **Versión:** 1.0.0  
> **Última actualización:** 2026-03-13  
> **Fase del proyecto:** FASE 1 - Motor de Visualización

---

## 📖 Índice

1. [Introducción](#introducción)
2. [Guía de Inicio Rápido (5 minutos)](#guía-de-inicio-rápido-5-minutos)
3. [VisualizerEngine - API del Motor](#visualizerengine---api-del-motor)
4. [Componentes Astro](#componentes-astro)
5. [Sistema de Estilos CSS](#sistema-de-estilos-css)
6. [Ejemplos Completos](#ejemplos-completos)
7. [Troubleshooting](#troubleshooting)
8. [Arquitectura del Sistema](#arquitectura-del-sistema)

---

## Introducción

El sistema de visualización de Front-Algoritmos está diseñado para que **crear un nuevo visualizador tome menos de 2 horas**. Está compuesto por:

- **Motor reutilizable** (`VisualizerEngine`) que gestiona estados, pasos y auto-play
- **Componentes Astro** para UI común (ArrayBar, Controls, StepLog, TabSystem)
- **Layout maestro** (`AlgoLayout`) con navegación y breadcrumb
- **Sistema de diseño inmutable** con variables CSS consistentes

### Principios Clave

1. **Composición sobre herencia** - Inyecta lógica mediante callbacks
2. **Render completo, nunca parcial** - Re-renderiza TODO el DOM en cada paso
3. **Logs pedagógicos obligatorios** - Explica QUÉ, POR QUÉ, CUÁL en cada paso
4. **Accesibilidad desde el inicio** - Keyboard nav, ARIA, reduced motion

---

## Guía de Inicio Rápido (5 minutos)

### Paso 1: Copia la Plantilla

```bash
# Copia el algoritmo demo
cp src/pages/algoritmos/demo-visualizer.astro src/pages/algoritmos/tu-algoritmo.astro
```

### Paso 2: Modifica las Secciones Marcadas con 🔧

Busca las secciones con comentario `🔧 MODIFICAR` en el archivo:

1. **Metadata del algoritmo** (línea ~30)
2. **Tab "¿Qué es?"** - Analogía cotidiana
3. **Tab "¿Cómo funciona?"** - Pasos específicos
4. **Tab "Pruébalo"** - Array demo y lógica
5. **Estado inicial** (línea ~550)
6. **Función stepForward()** (línea ~560)
7. **Función renderState()** (línea ~590)

### Paso 3: Define tu Algoritmo

```javascript
// Estado inicial
const DEMO_ARRAY = [1, 2, 3, 4, 5];
let left = 0;
let right = DEMO_ARRAY.length - 1;
let done = false;

// Lógica del paso
function stepForward(state) {
  // Tu algoritmo aquí
  left++;
  
  // Log pedagógico
  logStep(`Moviendo puntero izquierdo a índice <span class="log-a">${left}</span>`);
  
  // ¿Continuar?
  return { 
    continue: left <= right, 
    data: { left, right } 
  };
}

// Renderizar estado
function renderState(state) {
  arrayArea.innerHTML = DEMO_ARRAY.map((val, idx) => {
    let cellState = 'neutral';
    if (idx === left) cellState = 'active-a';
    if (idx === right) cellState = 'active-b';
    
    return `<div class="cell ${cellState}"><div class="cell-value">${val}</div></div>`;
  }).join('');
}
```

### Paso 4: Prueba

```bash
npm run dev
# Abre http://localhost:4321/algoritmos/tu-algoritmo
```

---

## VisualizerEngine - API del Motor

### Constructor

```javascript
import { VisualizerEngine } from '../../scripts/visualizer-core.js';

const engine = new VisualizerEngine({
  // Estado inicial del algoritmo
  initialState: { 
    array: [1, 2, 3], 
    left: 0, 
    right: 2 
  },
  
  // Callback ejecutado en cada paso (OBLIGATORIO)
  onStep: (state) => {
    // Lógica del algoritmo
    state.left++;
    
    // Retornar si continuar y nuevo estado
    return { 
      continue: state.left <= state.right, 
      data: state 
    };
  },
  
  // Callback para actualizar UI (OBLIGATORIO)
  onRender: (state) => {
    // Re-renderizar DOM completo desde state
    updateUI(state);
  },
  
  // Callback al completar (OPCIONAL)
  onComplete: (state) => {
    showResultBanner();
  },
  
  // Callback al resetear (OPCIONAL)
  onReset: () => {
    clearLog();
  },
  
  // Callback al cambiar velocidad (OPCIONAL)
  onSpeedChange: (newSpeed) => {
    console.log(`Nueva velocidad: ${newSpeed}ms`);
  },
  
  // Velocidad por defecto en ms (OPCIONAL, default: 900)
  defaultSpeed: 900
});
```

### Métodos

#### `engine.step()`

Ejecuta **un paso** del algoritmo.

```javascript
// Ejecuta un paso manualmente
const success = engine.step();

// Retorna:
// - true si el paso se ejecutó
// - false si no se pudo (ej: ya completado)
```

**Estados permitidos:** `initial`, `paused`  
**Cambia a:** `paused` (si continúa) o `completed` (si terminó)

---

#### `engine.reset()`

Reinicia el motor al estado inicial.

```javascript
engine.reset();

// Efectos:
// - Detiene auto-play si estaba activo
// - Restaura initialState
// - Llama a onReset()
// - Llama a onRender() con estado inicial
// - Cambia estado del motor a 'initial'
```

---

#### `engine.toggleAuto()`

Inicia o pausa el modo auto-play.

```javascript
const isPlaying = engine.toggleAuto();

// Retorna:
// - true si se INICIÓ auto-play
// - false si se PAUSÓ auto-play
```

**Comportamiento:**
- Si no está en auto-play → lo inicia
- Si está en auto-play → lo pausa
- La velocidad se toma de `setSpeed()` o `defaultSpeed`

---

#### `engine.setSpeed(ms)`

Cambia la velocidad del auto-play.

```javascript
engine.setSpeed(1200); // 1.2 segundos entre pasos

// Rango permitido: 300ms - 2000ms
// Si está fuera de rango, se ajusta automáticamente
```

**Nota:** Si auto-play está activo, se reinicia con la nueva velocidad.

---

#### `engine.startAuto()` / `engine.stopAuto()`

Control manual de auto-play (alternativa a `toggleAuto()`).

```javascript
engine.startAuto();  // Inicia auto-play
engine.stopAuto();   // Detiene auto-play

// Útil cuando necesitas control explícito
```

---

#### `engine.getState()`

Obtiene una **copia** del estado actual del algoritmo.

```javascript
const state = engine.getState();
console.log(state); // { array: [...], left: 2, right: 5 }

// Retorna una copia, no la referencia original
// Modificar el objeto retornado NO afecta el estado interno
```

---

#### `engine.getEngineState()`

Obtiene el estado del motor (no del algoritmo).

```javascript
const engineState = engine.getEngineState();
// Retorna: 'initial' | 'running' | 'paused' | 'completed'
```

---

#### `engine.isAutoPlaying()`

Verifica si está en modo auto-play.

```javascript
if (engine.isAutoPlaying()) {
  console.log('Reproduciendo automáticamente');
}
```

---

#### `engine.isCompleted()`

Verifica si el algoritmo terminó.

```javascript
if (engine.isCompleted()) {
  console.log('Algoritmo completado');
}
```

---

### Máquina de Estados del Motor

```
┌─────────────┐
│   INITIAL   │  ← Recién creado o después de reset()
└──────┬──────┘
       │ step() o startAuto()
       ▼
┌─────────────┐
│   RUNNING   │  ← Ejecutando auto-play
└──────┬──────┘
       │ stopAuto() o step completo
       ▼
┌─────────────┐
│   PAUSED    │  ← Pausado, puede continuar
└──────┬──────┘
       │ step() o startAuto()
       │ (o algoritmo termina)
       ▼
┌─────────────┐
│  COMPLETED  │  ← Terminado, solo reset() posible
└─────────────┘
       │ reset()
       ▼
   [vuelve a INITIAL]
```

---

## Componentes Astro

### ArrayBar.astro

Celda individual de array con estados visuales.

#### Props

```typescript
interface Props {
  value: number | string;   // Valor a mostrar
  index: number;            // Índice en el array
  state?: 'neutral' | 'active-a' | 'active-b' | 'match' | 'swapping' | 'sorted' | 'visited';
  showBar?: boolean;        // Si true, muestra barra de altura
  maxValue?: number;        // Valor máximo para calcular altura de barra
  label?: string;           // Label opcional (ej: "L", "R")
}
```

#### Uso

```astro
---
import ArrayBar from '../components/visualizer/ArrayBar.astro';
---

<!-- Celda simple -->
<ArrayBar value={5} index={0} state="neutral" />

<!-- Celda activa A (puntero izquierdo) -->
<ArrayBar value={3} index={1} state="active-a" label="L" />

<!-- Celda con barra para sorting -->
<ArrayBar 
  value={8} 
  index={2} 
  state="swapping" 
  showBar={true} 
  maxValue={10} 
/>
```

#### Estados Visuales

| Estado | Color | Uso |
|--------|-------|-----|
| `neutral` | Gris (`--border`) | Estado por defecto |
| `active-a` | Naranja (`--ptr-left`) | Puntero izquierdo, primer elemento comparado |
| `active-b` | Verde (`--ptr-right`) | Puntero derecho, segundo elemento comparado |
| `match` | Rosado (`--match`) | Resultado encontrado, coincidencia |
| `swapping` | Violeta (`--swap`) | Intercambio en progreso |
| `sorted` | Cyan (`--accent2`) | Ya en posición final |
| `visited` | Azul oscuro | Nodo/elemento visitado |

---

### Controls.astro

Botones de control del visualizador.

#### Props

```typescript
interface Props {
  stepDisabled?: boolean;      // Si true, deshabilita "Siguiente paso"
  autoDisabled?: boolean;      // Si true, deshabilita "Auto"
  isAutoPlaying?: boolean;     // Si true, muestra icono de pausa
}
```

#### Uso

```astro
---
import Controls from '../components/visualizer/Controls.astro';
---

<Controls 
  stepDisabled={done}
  autoDisabled={done}
  isAutoPlaying={engine?.isAutoPlaying()}
/>

<!-- Los botones tienen IDs fijos para capturar en <script>:
  - resetBtn
  - stepBtn
  - autoBtn
-->
```

#### Script de Conexión

```javascript
const resetBtn = document.getElementById('resetBtn');
const stepBtn = document.getElementById('stepBtn');
const autoBtn = document.getElementById('autoBtn');

resetBtn?.addEventListener('click', () => engine.reset());
stepBtn?.addEventListener('click', () => engine.step());
autoBtn?.addEventListener('click', () => engine.toggleAuto());
```

---

### StepLog.astro

Caja de logs pedagógicos con auto-scroll.

#### Props

```typescript
interface Props {
  title?: string;       // Título del log (default: "Registro de pasos")
  maxEntries?: number;  // Máximo de entradas (default: 50)
}
```

#### Uso

```astro
---
import StepLog from '../components/visualizer/StepLog.astro';
---

<StepLog title="Registro de pasos" maxEntries={50} />
```

#### API Global

El componente expone dos funciones globales:

##### `window.logStep(htmlContent)`

Agrega una entrada al log.

```javascript
// Uso básico
logStep('Comparando elementos...');

// Con colores contextuales
logStep(`Comparamos <span class="log-a">${left}</span> + <span class="log-b">${right}</span> = ${sum}`);

// Explicación completa
logStep(`
  Movemos el puntero <span class="log-a">izquierdo</span> hacia la derecha.
  Como la suma ${sum} es <span class="log-error">mayor</span> que el objetivo ${target},
  necesitamos un número <span class="log-hi">más pequeño</span>.
`);
```

**Clases CSS disponibles:**

| Clase | Color | Uso |
|-------|-------|-----|
| `.log-a` | `--ptr-left` (naranja) | Elemento activo A |
| `.log-b` | `--ptr-right` (verde) | Elemento activo B |
| `.log-match` | `--match` (rosado) | Resultado, match |
| `.log-hi` | `--text` con fondo | Valor importante |
| `.log-error` | `--error` (rojo) | Error, valor muy grande |
| `.log-success` | `--accent2` (cyan) | Éxito, completado |

##### `window.clearLog()`

Limpia todo el log.

```javascript
function resetDemo() {
  clearLog();
  // ... resto del reset
}
```

---

### TabSystem.astro

Sistema de navegación por tabs.

#### Props

```typescript
interface Tab {
  id: string;      // ID único del tab
  icon: string;    // Emoji o icono
  label: string;   // Texto del tab
}

interface Props {
  tabs: Tab[];
  defaultTab?: string;  // ID del tab activo por defecto
}
```

#### Uso

```astro
---
import TabSystem from '../components/visualizer/TabSystem.astro';
---

<TabSystem 
  tabs={[
    { id: 'what', icon: '🧠', label: '¿Qué es?' },
    { id: 'how', icon: '📋', label: '¿Cómo funciona?' },
    { id: 'demo', icon: '▶️', label: 'Pruébalo' },
    { id: 'code', icon: '💻', label: 'Código' }
  ]}
  defaultTab="demo"
>
  <div slot="what">
    <h2>Contenido del tab "¿Qué es?"</h2>
    <p>Analogía cotidiana...</p>
  </div>
  
  <div slot="how">
    <h2>Contenido del tab "¿Cómo funciona?"</h2>
    <ol>...</ol>
  </div>
  
  <div slot="demo">
    <h2>Visualizador</h2>
    <!-- ArrayArea, Controls, etc. -->
  </div>
  
  <div slot="code">
    <h2>Código fuente</h2>
    <pre>...</pre>
  </div>
</TabSystem>
```

**Características:**
- Navegación con click
- Navegación con teclado (flechas, Home, End)
- Persistencia en `sessionStorage`
- Animación suave de transición (fade)
- ARIA compliant

---

### AlgoLayout.astro

Layout maestro para páginas de algoritmos.

#### Props

```typescript
interface Props {
  title: string;          // Título del algoritmo
  algoId: string;         // ID único del algoritmo
  level: number;          // Nivel (0-4)
  complexity?: string;    // Complejidad (ej: "O(n)")
  description?: string;   // Descripción breve
}
```

#### Uso

```astro
---
import AlgoLayout from '../../layouts/AlgoLayout.astro';
import TabSystem from '../../components/visualizer/TabSystem.astro';
---

<AlgoLayout 
  title="Two Pointers"
  algoId="two-pointers"
  level={1}
  complexity="O(n)"
  description="Técnica de dos punteros para búsqueda eficiente en arrays ordenados"
>
  <TabSystem tabs={[...]}>
    <!-- Contenido de tabs -->
  </TabSystem>
</AlgoLayout>
```

**Características:**
- Breadcrumb automático (Inicio > Nivel X > Algoritmo)
- Badge de nivel
- Navegación prev/next automática (calcula del mismo nivel)
- Footer con 3 botones: ← Anterior | Ver todos | Siguiente →

---

## Sistema de Estilos CSS

### Variables CSS Obligatorias

**NUNCA usar colores hardcodeados.** Siempre usar estas variables:

```css
:root {
  /* Fondos */
  --bg: #0a0a0f;         /* Fondo general */
  --surface: #12121a;    /* Fondo de cajas internas */
  --card: #1a1a27;       /* Tarjetas */
  --border: #2a2a40;     /* Bordes */
  
  /* Colores de acción */
  --accent: #7c3aed;     /* Violeta - acciones primarias */
  --accent2: #06b6d4;    /* Cyan - títulos de sección */
  
  /* Textos */
  --text: #e2e8f0;       /* Texto principal */
  --muted: #64748b;      /* Texto secundario */
  
  /* Estados del visualizador */
  --ptr-left: #f59e0b;   /* Elemento activo A / puntero izquierdo */
  --ptr-right: #10b981;  /* Elemento activo B / puntero derecho */
  --match: #ec4899;      /* Coincidencia / resultado encontrado */
  --error: #ef4444;      /* Error / suma muy grande */
  --swap: #8b5cf6;       /* Swap en progreso */
}
```

### Tipografías

```css
/* Para valores, código, números */
font-family: 'Space Mono', monospace;

/* Para UI, títulos, labels */
font-family: 'Syne', sans-serif;
```

**Importar en BaseLayout:**

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;700;800&display=swap" rel="stylesheet">
```

### Transiciones Consistentes

**SIEMPRE usar esta curva de timing:**

```css
transition: all 0.35s cubic-bezier(.34, 1.56, .64, 1);
```

Esta curva produce un "bounce" suave perfecto para educación.

### Accesibilidad - Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

---

## Ejemplos Completos

### Ejemplo 1: Búsqueda Lineal

```javascript
// Estado inicial
const ARRAY = [5, 2, 8, 1, 9];
const TARGET = 8;
let currentIndex = -1;
let found = false;
let done = false;

// Paso
function stepForward(state) {
  currentIndex++;
  
  if (ARRAY[currentIndex] === TARGET) {
    found = true;
    logStep(`¡<span class="log-match">Encontrado!</span> El valor ${TARGET} está en índice ${currentIndex}.`);
    return { continue: false, data: { found, currentIndex } };
  }
  
  logStep(`Comparando índice ${currentIndex}: <span class="log-a">${ARRAY[currentIndex]}</span> ≠ ${TARGET}`);
  
  const shouldContinue = currentIndex < ARRAY.length - 1;
  return { continue: shouldContinue, data: { currentIndex } };
}

// Render
function renderState(state) {
  arrayArea.innerHTML = ARRAY.map((val, idx) => {
    let cellState = 'neutral';
    if (idx === currentIndex && !found) cellState = 'active-a';
    if (idx === currentIndex && found) cellState = 'match';
    
    return `<div class="cell ${cellState}"><div class="cell-value">${val}</div></div>`;
  }).join('');
}
```

### Ejemplo 2: Two Pointers (Two Sum)

```javascript
// Estado inicial
const ARRAY = [1, 3, 5, 7, 9, 11];
const TARGET = 14;
let left = 0;
let right = ARRAY.length - 1;
let found = false;
let done = false;

// Paso
function stepForward(state) {
  const sum = ARRAY[left] + ARRAY[right];
  
  if (sum === TARGET) {
    found = true;
    logStep(`<span class="log-match">¡Encontrado!</span> ${ARRAY[left]} + ${ARRAY[right]} = ${TARGET}`);
    return { continue: false, data: { found, left, right } };
  }
  
  if (sum < TARGET) {
    logStep(`${ARRAY[left]} + ${ARRAY[right]} = ${sum} < ${TARGET}. Moviendo <span class="log-a">izquierdo</span> →`);
    left++;
  } else {
    logStep(`${ARRAY[left]} + ${ARRAY[right]} = ${sum} > ${TARGET}. Moviendo <span class="log-b">derecho</span> ←`);
    right--;
  }
  
  const shouldContinue = left < right;
  return { continue: shouldContinue, data: { left, right } };
}

// Render
function renderState(state) {
  arrayArea.innerHTML = ARRAY.map((val, idx) => {
    let cellState = 'neutral';
    let label = '';
    
    if (idx === left) {
      cellState = found ? 'match' : 'active-a';
      label = 'L';
    }
    if (idx === right) {
      cellState = found ? 'match' : 'active-b';
      label = 'R';
    }
    
    return `
      <div class="cell ${cellState}">
        ${label ? `<div class="cell-label">${label}</div>` : ''}
        <div class="cell-value">${val}</div>
      </div>
    `;
  }).join('');
}
```

### Ejemplo 3: Bubble Sort (con barras)

```javascript
// Estado inicial
const ARRAY = [5, 2, 8, 1, 9];
let i = 0;
let j = 0;
let swapped = false;
let done = false;

// Paso
function stepForward(state) {
  if (j >= ARRAY.length - i - 1) {
    // Fin de pasada
    if (!swapped) {
      logStep(`<span class="log-success">¡Ordenamiento completo!</span>`);
      return { continue: false, data: {} };
    }
    
    i++;
    j = 0;
    swapped = false;
    logStep(`Pasada ${i} completada. Iniciando siguiente...`);
    return { continue: true, data: { i, j } };
  }
  
  // Comparar elementos adyacentes
  if (ARRAY[j] > ARRAY[j + 1]) {
    // Swap
    [ARRAY[j], ARRAY[j + 1]] = [ARRAY[j + 1], ARRAY[j]];
    swapped = true;
    logStep(`<span class="log-swap">Intercambio:</span> ${ARRAY[j + 1]} ⇄ ${ARRAY[j]}`);
  } else {
    logStep(`${ARRAY[j]} ≤ ${ARRAY[j + 1]}, no se intercambia.`);
  }
  
  j++;
  return { continue: true, data: { i, j } };
}

// Render con barras
function renderState(state) {
  const maxValue = Math.max(...ARRAY);
  
  arrayArea.innerHTML = ARRAY.map((val, idx) => {
    let cellState = 'neutral';
    
    if (idx === j || idx === j + 1) {
      cellState = 'active-a';
    }
    if (idx >= ARRAY.length - i) {
      cellState = 'sorted';
    }
    
    const barHeight = (val / maxValue) * 100;
    
    return `
      <div class="cell ${cellState}">
        <div class="cell-bar-container">
          <div class="cell-bar" style="height: ${barHeight}%"></div>
          <div class="cell-value">${val}</div>
        </div>
      </div>
    `;
  }).join('');
}
```

---

## Troubleshooting

### ❌ Error: "onStep callback is required"

**Causa:** No se pasó la función `onStep` al crear el motor.

**Solución:**

```javascript
// ❌ Incorrecto
const engine = new VisualizerEngine({});

// ✅ Correcto
const engine = new VisualizerEngine({
  onStep: stepForward
});
```

---

### ❌ El paso no avanza / botones no responden

**Causa:** Los IDs de los botones no coinciden o el event listener no está conectado.

**Solución:**

```javascript
// Verificar IDs exactos
const resetBtn = document.getElementById('resetBtn');  // ✅ ID correcto
const stepBtn = document.getElementById('stepBtn');    // ✅ ID correcto
const autoBtn = document.getElementById('autoBtn');    // ✅ ID correcto

// Envolver en DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  // Conectar aquí
});
```

---

### ❌ El log no se muestra / logStep no está definido

**Causa:** El componente `StepLog` no está incluido en la página.

**Solución:**

```astro
<!-- Incluir StepLog en el tab "demo" -->
<StepLog title="Registro de pasos" />
```

---

### ❌ Los colores no se aplican / celdas sin estilo

**Causa:** La función `renderState` no está aplicando las clases CSS correctamente.

**Solución:**

```javascript
// ❌ Incorrecto - className sin concatenar
return `<div class="cell">${val}</div>`;

// ✅ Correcto - Interpolación de className
return `<div class="cell ${cellState}">${val}</div>`;
```

---

### ❌ Auto-play no se detiene al completar

**Causa:** La función `stepForward` no retorna `{ continue: false }` al terminar.

**Solución:**

```javascript
function stepForward(state) {
  // ... lógica del algoritmo
  
  if (algoritmoTerminado) {
    return { continue: false, data: {} };  // ✅ Detiene auto-play
  }
  
  return { continue: true, data: state };
}
```

---

### ❌ El estado no se actualiza / render muestra valores antiguos

**Causa:** La función `renderState` no lee del estado actual, sino de variables globales antiguas.

**Solución:**

```javascript
// ❌ Incorrecto - Variables globales pueden estar desactualizadas
function renderState(state) {
  console.log(currentIndex); // Podría ser valor viejo
}

// ✅ Correcto - Leer desde state
function renderState(state) {
  const { currentIndex, array } = state;
  console.log(currentIndex); // Valor actualizado
}
```

---

## Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                    PÁGINA DEL ALGORITMO                      │
│                  (demo-visualizer.astro)                     │
└────────────────────┬────────────────────────────────────────┘
                     │
         ┌───────────┴────────────┐
         │                        │
         ▼                        ▼
┌──────────────────┐    ┌──────────────────┐
│   AlgoLayout     │    │   TabSystem      │
│   (estructura)   │    │   (navegación)   │
└───────┬──────────┘    └────────┬─────────┘
        │                        │
        │              ┌─────────┴──────────┐
        │              │                    │
        │              ▼                    ▼
        │      ┌──────────────┐    ┌──────────────┐
        │      │ Tab: ¿Qué es?│    │ Tab: ¿Cómo?  │
        │      └──────────────┘    └──────────────┘
        │              │
        │              ▼
        │      ┌──────────────────────────────────┐
        │      │      Tab: Pruébalo (DEMO)        │
        │      ├──────────────────────────────────┤
        │      │ ┌───────────┐  ┌──────────────┐ │
        │      │ │ ArrayBar  │  │   Controls   │ │
        │      │ │ (celda)   │  │  (botones)   │ │
        │      │ └───────────┘  └──────────────┘ │
        │      │ ┌──────────────────────────────┐│
        │      │ │        StepLog (logs)        ││
        │      │ └──────────────────────────────┘│
        │      └──────────────────────────────────┘
        │
        ▼
┌──────────────────────────────────────────────────────┐
│              VISUALIZADOR <script>                   │
├──────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────────┐         ┌────────────────────┐   │
│  │Estado del    │◄────────┤ VisualizerEngine   │   │
│  │Algoritmo     │         │ (motor JS)         │   │
│  │              │         │                    │   │
│  │• array       │         │• step()            │   │
│  │• left, right │         │• reset()           │   │
│  │• found       │         │• toggleAuto()      │   │
│  │• done        │         │• setSpeed()        │   │
│  └──────┬───────┘         └─────────┬──────────┘   │
│         │                           │              │
│         │                           │              │
│         ▼                           ▼              │
│  ┌──────────────┐         ┌────────────────────┐   │
│  │stepForward() │         │  onStep callback   │   │
│  │              │────────►│  (lógica del algo) │   │
│  └──────────────┘         └────────────────────┘   │
│         │                                          │
│         ▼                                          │
│  ┌──────────────┐         ┌────────────────────┐   │
│  │renderState() │────────►│  Actualiza DOM     │   │
│  │              │         │  (re-render total) │   │
│  └──────────────┘         └────────────────────┘   │
│         │                                          │
│         ▼                                          │
│  ┌──────────────────────────────────────────────┐  │
│  │         logStep() - Escribe en log          │  │
│  └──────────────────────────────────────────────┘  │
│                                                    │
└────────────────────────────────────────────────────┘
```

### Flujo de Ejecución de un Paso

```
1. Usuario click en "Siguiente paso"
   ↓
2. Event listener captura click
   ↓
3. Llama a engine.step()
   ↓
4. Motor verifica estado (¿completed?)
   ↓
5. Motor llama a onStep(state)
   ↓
6. stepForward() ejecuta lógica del algoritmo
   ↓
7. stepForward() retorna { continue, data }
   ↓
8. Motor actualiza estado interno
   ↓
9. Motor llama a onRender(newState)
   ↓
10. renderState() actualiza DOM completo
    ↓
11. Visualizador llama a logStep()
    ↓
12. ¿Algoritmo terminó? → SI
    ↓
13. Motor cambia a COMPLETED
    ↓
14. Motor llama a onComplete()
    ↓
15. Visualizador muestra banner de resultado
```

---

## Recursos Adicionales

- **ONE_SPEC.md** - Especificación completa de la Fase 1
- **PLAN_TRABAJO.md** - Plan general del proyecto
- **demo-visualizer.astro** - Plantilla completa con comentarios
- **BaseLayout.astro** - Sistema de diseño y variables CSS

---

## Contribución

¿Encontraste un bug o tienes una mejora para el motor?

1. Abre un issue describiendo el problema
2. Si es una mejora, incluye ejemplo de código
3. Sigue las reglas no negociables del ONE_SPEC
4. Asegúrate de que los tests pasen (cuando estén implementados)

---

**¡Feliz visualización! 🚀**
