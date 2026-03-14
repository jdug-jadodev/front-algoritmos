# 🚀 Plan de Trabajo: Plataforma Interactiva de Algoritmos
> **Stack:** Astro 4 + Vanilla JS + CSS Variables · **Inspiración visual:** Doble Puntero (dark, neon, monospace)  
> **Meta:** 110 algoritmos con visualizadores paso a paso, para programadores desde cero hasta senior

---

## 📐 Visión General del Proyecto

Una plataforma educativa tipo "roadmap interactivo" donde cada algoritmo tiene:
- **Página propia** generada estáticamente por Astro
- **Visualizador animado** paso a paso (igual al Doble Puntero)
- **3 variantes de código** (Python, JavaScript, pseudocódigo)
- **Complejidad explicada** visualmente
- **Problemas de práctica** linkados (LeetCode, etc.)
- **Progreso persistido** en localStorage

---

## 🎨 Sistema de Diseño (mantener del Doble Puntero)

```css
/* Paleta base — NO CAMBIAR entre algoritmos */
:root {
  --bg: #0a0a0f;
  --surface: #12121a;
  --card: #1a1a27;
  --border: #2a2a40;
  --accent: #7c3aed;      /* violeta — acciones primarias */
  --accent2: #06b6d4;     /* cyan — títulos de sección */
  --text: #e2e8f0;
  --muted: #64748b;
  
  /* Colores de estado del visualizador */
  --ptr-left: #f59e0b;    /* puntero izquierdo / elemento activo A */
  --ptr-right: #10b981;   /* puntero derecho / elemento activo B */
  --match: #ec4899;       /* coincidencia / resultado encontrado */
  --error: #ef4444;       /* suma muy grande / estado negativo */
  --swap: #8b5cf6;        /* swap en progreso */
  --visited: #1e3a5f;     /* nodo visitado (grafos) */
  --current: #f59e0b;     /* nodo actual */
  --highlight: #fbbf24;   /* resaltado general */
}

/* Tipografía */
/* Space Mono — código y valores numéricos */
/* Syne — títulos y UI */
```

---

## 🗂️ Estructura del Proyecto (Astro)

```
src/
├── components/
│   ├── visualizer/
│   │   ├── ArrayBar.astro          # celda de array reutilizable
│   │   ├── ArrayArea.astro         # contenedor del array
│   │   ├── StepLog.astro           # caja de log de pasos
│   │   ├── SumDisplay.astro        # display L + R = suma
│   │   ├── Controls.astro          # botones paso/auto/reset
│   │   ├── SpeedSlider.astro       # control de velocidad
│   │   ├── GraphCanvas.astro       # para grafos/árboles
│   │   └── CodeViewer.astro        # visor de código con tabs
│   ├── layout/
│   │   ├── AlgoShell.astro         # wrapper de página de algoritmo
│   │   ├── TabSystem.astro         # tabs ¿Qué es? / ¿Cómo? / Demo / Código
│   │   └── LevelBadge.astro        # badge de nivel (0-4)
│   └── roadmap/
│       ├── RoadmapGrid.astro       # grid del roadmap
│       └── AlgoCard.astro          # tarjeta individual
├── layouts/
│   ├── BaseLayout.astro
│   └── AlgoLayout.astro
├── pages/
│   ├── index.astro                 # roadmap principal
│   └── algoritmos/
│       └── [slug].astro            # página dinámica por algoritmo
├── data/
│   ├── algorithms.json             # catálogo de 110 algoritmos
│   └── levels.json                 # definición de niveles
└── scripts/
    ├── visualizer-core.js          # motor de pasos reutilizable
    ├── array-utils.js              # helpers para arrays
    └── graph-utils.js              # helpers para grafos/árboles
```

---

## 📋 Catálogo Completo: 110 Algoritmos

### Nivel 0 — Cero Absoluto (10 algoritmos)
| # | ID | Nombre | Complejidad |
|---|-----|--------|-------------|
| 1 | `sum-array` | Suma de arreglo | O(n) |
| 2 | `linear-search` | Búsqueda lineal | O(n) |
| 3 | `min-max` | Mínimo y máximo | O(n) |
| 4 | `reverse-array` | Invertir arreglo | O(n) |
| 5 | `count-occurrences` | Contar ocurrencias | O(n) |
| 6 | `fizzbuzz` | FizzBuzz | O(n) |
| 7 | `palindrome-check` | Verificar palíndromo | O(n) |
| 8 | `factorial` | Factorial iterativo | O(n) |
| 9 | `fibonacci-iter` | Fibonacci iterativo | O(n) |
| 10 | `two-sum-brute` | Two Sum fuerza bruta | O(n²) |

### Nivel 1 — Principiante (20 algoritmos)
| # | ID | Nombre | Complejidad |
|---|-----|--------|-------------|
| 11 | `binary-search` | Búsqueda binaria | O(log n) |
| 12 | `bubble-sort` | Bubble Sort | O(n²) |
| 13 | `selection-sort` | Selection Sort | O(n²) |
| 14 | `insertion-sort` | Insertion Sort | O(n²) |
| 15 | `two-pointers` | Two Pointers (Two Sum) | O(n) |
| 16 | `stack-basic` | Pila (Stack) | O(1) |
| 17 | `queue-basic` | Cola (Queue) | O(1) |
| 18 | `linked-list-traversal` | Recorrer lista enlazada | O(n) |
| 19 | `linked-list-reverse` | Invertir lista enlazada | O(n) |
| 20 | `fibonacci-recur` | Fibonacci recursivo | O(2ⁿ) |
| 21 | `binary-search-rotated` | Búsqueda binaria rotada | O(log n) |
| 22 | `merge-sorted-arrays` | Merge de arreglos ordenados | O(n+m) |
| 23 | `valid-parentheses` | Paréntesis válidos | O(n) |
| 24 | `prefix-sum` | Prefix Sum / Suma prefija | O(n) |
| 25 | `sliding-window-fixed` | Ventana deslizante fija | O(n) |
| 26 | `dutch-flag` | Dutch National Flag | O(n) |
| 27 | `remove-duplicates` | Eliminar duplicados | O(n) |
| 28 | `move-zeroes` | Mover ceros al final | O(n) |
| 29 | `container-water` | Contenedor de agua | O(n) |
| 30 | `anagram-check` | Verificar anagrama | O(n) |

### Nivel 2 — Intermedio (25 algoritmos)
| # | ID | Nombre | Complejidad |
|---|-----|--------|-------------|
| 31 | `merge-sort` | Merge Sort | O(n log n) |
| 32 | `quicksort` | Quick Sort | O(n log n) |
| 33 | `heap-sort` | Heap Sort | O(n log n) |
| 34 | `counting-sort` | Counting Sort | O(n+k) |
| 35 | `radix-sort` | Radix Sort | O(d·n) |
| 36 | `hash-table` | Tabla Hash / HashMap | O(1) prom. |
| 37 | `sliding-window-var` | Ventana deslizante variable | O(n) |
| 38 | `fast-slow-pointers` | Fast & Slow Pointers | O(n) |
| 39 | `cycle-detection` | Detección de ciclos (Floyd) | O(n) |
| 40 | `lru-cache` | LRU Cache | O(1) |
| 41 | `binary-tree-bfs` | BFS en árbol binario | O(n) |
| 42 | `binary-tree-dfs` | DFS en árbol binario | O(n) |
| 43 | `bst-insert-search` | BST: Insertar y Buscar | O(log n) |
| 44 | `bst-validate` | Validar BST | O(n) |
| 45 | `heap-min-max` | Min-Heap / Max-Heap | O(log n) |
| 46 | `recursion-tree` | Recursión con árbol | O(2ⁿ) |
| 47 | `backtracking-permutations` | Permutaciones (backtracking) | O(n!) |
| 48 | `backtracking-subsets` | Subconjuntos | O(2ⁿ) |
| 49 | `backtracking-nqueens` | N-Reinas | O(n!) |
| 50 | `dp-fibonacci-memo` | DP: Fibonacci memoizado | O(n) |
| 51 | `dp-climbing-stairs` | DP: Escaleras | O(n) |
| 52 | `dp-coin-change` | DP: Cambio de monedas | O(n·m) |
| 53 | `dp-longest-common` | DP: LCS | O(n·m) |
| 54 | `quickselect` | Quickselect (k-ésimo) | O(n) prom. |
| 55 | `monotonic-stack` | Pila monótona | O(n) |

### Nivel 3 — Avanzado (30 algoritmos)
| # | ID | Nombre | Complejidad |
|---|-----|--------|-------------|
| 56 | `graph-bfs` | BFS en Grafo | O(V+E) |
| 57 | `graph-dfs` | DFS en Grafo | O(V+E) |
| 58 | `topological-sort` | Ordenación topológica | O(V+E) |
| 59 | `union-find` | Union-Find / DSU | O(α(n)) |
| 60 | `dijkstra` | Dijkstra | O((V+E) log V) |
| 61 | `bellman-ford` | Bellman-Ford | O(V·E) |
| 62 | `floyd-warshall` | Floyd-Warshall | O(V³) |
| 63 | `kruskal` | Kruskal (MST) | O(E log E) |
| 64 | `prim` | Prim (MST) | O(E log V) |
| 65 | `scc-kosaraju` | SCC: Kosaraju | O(V+E) |
| 66 | `avl-tree` | Árbol AVL | O(log n) |
| 67 | `trie-basic` | Trie básico | O(m) |
| 68 | `trie-autocomplete` | Trie: Autocompletar | O(m) |
| 69 | `segment-tree` | Segment Tree | O(log n) |
| 70 | `fenwick-tree` | Fenwick Tree (BIT) | O(log n) |
| 71 | `dp-knapsack` | DP: Mochila 0/1 | O(n·W) |
| 72 | `dp-lis` | DP: LIS | O(n log n) |
| 73 | `dp-edit-distance` | DP: Distancia de edición | O(n·m) |
| 74 | `dp-matrix-chain` | DP: Multiplicación matrices | O(n³) |
| 75 | `dp-interval` | DP de intervalos | O(n³) |
| 76 | `kmp` | KMP (búsqueda de patrones) | O(n+m) |
| 77 | `z-algorithm` | Z-Algorithm | O(n) |
| 78 | `rabin-karp` | Rabin-Karp | O(n+m) |
| 79 | `suffix-array` | Suffix Array | O(n log n) |
| 80 | `lca-binary-lifting` | LCA: Binary Lifting | O(log n) |
| 81 | `bitmask-dp` | DP con máscaras de bits | O(2ⁿ·n) |
| 82 | `monotonic-deque` | Deque monótona | O(n) |
| 83 | `sparse-table-rmq` | Sparse Table / RMQ | O(1) consulta |
| 84 | `a-star` | A* (pathfinding) | O(E log V) |
| 85 | `backtracking-sudoku` | Backtracking: Sudoku | O(9^m) |

### Nivel 4 — Experto (25 algoritmos)
| # | ID | Nombre | Complejidad |
|---|-----|--------|-------------|
| 86 | `segment-tree-lazy` | Segment Tree Lazy | O(log n) |
| 87 | `hld` | Heavy-Light Decomp. | O(log² n) |
| 88 | `centroid-decomp` | Centroid Decomposition | O(n log n) |
| 89 | `fft` | FFT | O(n log n) |
| 90 | `ntt` | NTT | O(n log n) |
| 91 | `ford-fulkerson` | Ford-Fulkerson (flujo) | O(E·max_f) |
| 92 | `dinic` | Dinic | O(V²·E) |
| 93 | `hopcroft-karp` | Hopcroft-Karp | O(E√V) |
| 94 | `convex-hull` | Convex Hull | O(n log n) |
| 95 | `line-sweep` | Line Sweep | O(n log n) |
| 96 | `sieve-eratosthenes` | Criba de Eratóstenes | O(n log log n) |
| 97 | `miller-rabin` | Miller-Rabin | O(k log³ n) |
| 98 | `pollard-rho` | Pollard's Rho | O(n^¼) |
| 99 | `mod-exp` | Exponenciación modular | O(log n) |
| 100 | `crt` | Teorema Chino del Resto | O(n log n) |
| 101 | `mo-algorithm` | Mo's Algorithm | O((n+q)√n) |
| 102 | `sqrt-decomp` | Sqrt Decomposition | O(√n) |
| 103 | `persistent-seg-tree` | Persistent Segment Tree | O(log n) |
| 104 | `suffix-automaton` | Suffix Automaton | O(n) |
| 105 | `aho-corasick` | Aho-Corasick | O(n+m+z) |
| 106 | `red-black-tree` | Árbol Rojo-Negro | O(log n) |
| 107 | `treap` | Treap | O(log n) prom. |
| 108 | `blossom` | Blossom (matching general) | O(V²·E) |
| 109 | `wavelet-tree` | Wavelet Tree | O(log σ) |
| 110 | `link-cut-tree` | Link-Cut Tree | O(log n) |

---

## 🧠 Prompt Universal para la IA — Cómo Crear Cada Visualizador

> **Pega este prompt al inicio de cada conversación cuando le pidas a la IA crear un algoritmo nuevo.**

---

```
Eres un desarrollador de herramientas educativas interactivas. Tu tarea es crear 
el visualizador HTML completo para el algoritmo [NOMBRE DEL ALGORITMO].

## SISTEMA DE DISEÑO OBLIGATORIO

Usa exactamente estas variables CSS (no las cambies):
  --bg: #0a0a0f         (fondo general)
  --surface: #12121a    (fondo de cajas internas)
  --card: #1a1a27       (tarjetas)
  --border: #2a2a40     (bordes)
  --accent: #7c3aed     (violeta — botón primario)
  --accent2: #06b6d4    (cyan — títulos de sección)
  --text: #e2e8f0       (texto principal)
  --muted: #64748b      (texto secundario)
  --ptr-left: #f59e0b   (elemento activo A / puntero izq.)
  --ptr-right: #10b981  (elemento activo B / puntero der.)
  --match: #ec4899      (resultado encontrado / match)
  --error: #ef4444      (estado de error / muy grande)
  --swap: #8b5cf6       (swap en progreso)

Tipografías: 'Space Mono' para valores/código, 'Syne' para UI/títulos.
Importa de Google Fonts:
  https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;700;800

## ESTRUCTURA OBLIGATORIA DE TABS

El archivo debe tener exactamente 3 tabs:
1. **🧠 ¿Qué es?** — Analogía con objetos cotidianos (NO usar términos técnicos en 
   el primer párrafo). Explica para alguien que NUNCA ha programado. 
   Incluye: para qué sirve, por qué es útil, condición importante si existe.
   
2. **📋 ¿Cómo funciona?** — Lista numerada de pasos exactos con step-num circles 
   violetas. Cada paso describe UNA acción concreta. Máximo 8 pasos.
   
3. **▶️ Pruébalo** — El visualizador interactivo completo.

## ESTRUCTURA DEL VISUALIZADOR (TAB 3) — OBLIGATORIA

Debe incluir en este orden:
1. **problem-card**: título con el input fijo, descripción breve, input del objetivo si aplica + botón Reiniciar
2. **legend**: colores usados en la animación (siempre visible)
3. **array-area** o **graph-area**: la visualización principal animada
4. **state-display**: muestra el estado actual (suma actual, comparaciones, etc.)
5. **log-box**: log en tiempo real que explica EN ESPAÑOL cada decisión tomada
6. **result-banner**: banner de éxito (rosado) o fracaso (rojo) al terminar
7. **speed-row**: slider de velocidad (300ms a 2000ms, default 900ms)
8. **playing-badge**: indicador parpadeante "reproduciendo automáticamente..."
9. **controls**: 3 botones — [🔄 Reiniciar] [Siguiente paso →] [▶ Auto]

## REGLAS DEL MOTOR DE PASOS

```javascript
// Estado inicial — siempre en función resetDemo()
function resetDemo() {
  clearInterval(autoInterval);
  // resetear variables de estado del algoritmo
  // resetear UI: log, banners, displays
  // llamar a renderState() con estado inicial
  // habilitar botones
}

// Un paso — siempre en función stepForward()  
function stepForward() {
  if (done) return;
  // ejecutar UN paso del algoritmo
  // actualizar variables de estado
  // llamar a renderState()
  // escribir en el log QUÉ pasó y POR QUÉ
  // si terminó, llamar a finalize()
}

// Renderizado — siempre en función renderState()
function renderState() {
  // re-renderizar TODO el DOM desde el estado actual
  // aplicar clases CSS según el estado de cada elemento
  // NUNCA actualizar DOM parcialmente — siempre re-renderizar completo
}

// Finalizar — siempre en función finalize(found, ...args)
function finalize(found) {
  done = true;
  clearInterval(autoInterval);
  // mostrar result-banner
  // deshabilitar botones de paso y auto
}

// Auto-play — siempre en función toggleAuto()
function toggleAuto() {
  if (autoInterval) {
    // pausar
  } else {
    // iniciar interval que llama stepForward()
    // velocidad desde el slider
  }
}
```

## CLASES CSS DE ESTADO — OBLIGATORIAS

Para celdas de array:
- `.cell` — estado neutro (fondo --surface, borde --border)
- `.cell.active-a` — puntero/elemento A (borde --ptr-left, fondo rgba de --ptr-left, scale 1.1, glow)
- `.cell.active-b` — puntero/elemento B (borde --ptr-right, fondo rgba de --ptr-right, scale 1.1, glow)
- `.cell.match` — coincidencia/resultado (borde --match, animación pulse, glow rosado)
- `.cell.swapping` — en proceso de swap (borde --swap, glow violeta)
- `.cell.sorted` — ya en posición final (borde --accent2 pero tenue, opacity 0.6)
- `.cell.visited` — visitado (borde --visited tenue)

Transiciones: `transition: all 0.35s cubic-bezier(.34,1.56,.64,1)` en todas las celdas.

## EL LOG (log-box) — REGLAS

- Siempre en español, tono pedagógico ("Estamos mirando...", "Como la suma es...")
- Usa spans coloreados con los mismos colores del visualizador:
  `<span class="log-a">valor A</span>` (color --ptr-left)
  `<span class="log-b">valor B</span>` (color --ptr-right)  
  `<span class="log-match">resultado</span>` (color --match)
  `<span class="log-hi">valor importante</span>` (color --text, bold)
- Siempre dice: qué se está comparando + qué decisión se toma + por qué

## INPUTS FIJOS (no personalizables por el usuario)

El array/grafo de demostración debe ser FIJO y diseñado para que:
- Tenga entre 6 y 10 elementos (arrays) 
- La solución exista para el valor default del objetivo
- Haya casos interesantes (varios pasos antes de encontrar, o no encontrar)
- El array esté en el nivel correcto de complejidad para el algoritmo

El usuario SÍ puede cambiar el "objetivo" (target) cuando aplique.

## VARIANTES DE CÓDIGO — TAB OPCIONAL

Si el algoritmo lo permite, agrega un tab "💻 Código" con:
- Sub-tabs: Python | JavaScript | Pseudocódigo
- Syntax highlighting con colores de la paleta (sin librerías externas)
- Comentarios en español explicando cada línea clave

## COMPLEJIDAD VISUAL

Al final del tab "¿Cómo funciona?", agrega una tarjeta con:
- Complejidad temporal: O(...)
- Complejidad espacial: O(...)
- Comparación visual: "Si tuvieras 1000 elementos, fuerza bruta haría X operaciones vs este algoritmo que hace Y"
```

---

## 🗺️ Fases de Desarrollo

---

### FASE 0 — Fundamentos (1-2 semanas)
**Objetivo:** Tener el proyecto Astro corriendo con el sistema de diseño listo.

#### Tareas:
- [ ] Inicializar proyecto Astro 4: `npm create astro@latest`
- [ ] Configurar `astro.config.mjs` (static output)
- [ ] Crear `BaseLayout.astro` con las Google Fonts y variables CSS
- [ ] Crear `algorithms.json` con los 110 algoritmos (campos: id, name, level, tags, complexity, description, hasVisualizer)
- [ ] Crear página `index.astro` con el roadmap grid (clonar lógica del roadmap existente)
- [ ] Implementar `[slug].astro` con shell vacío para páginas de algoritmos
- [ ] Sistema de filtros por nivel funcional en el roadmap
- [ ] Progreso en localStorage (click en tarjeta = completado)
- [ ] Deploy inicial en Vercel/Netlify para tener URL

#### Entregable:
Roadmap funcional con 110 tarjetas, filtros por nivel, progreso persistido. Sin visualizadores aún.

---

### FASE 1 — Motor de Visualización (1 semana)
**Objetivo:** Crear el sistema reutilizable que todos los visualizadores usarán.

#### Tareas:
- [ ] Crear `visualizer-core.js` con clase `VisualizerEngine`:
  ```javascript
  class VisualizerEngine {
    constructor(config) { /* array, target, callbacks */ }
    reset() {}
    step() {}
    toggleAuto(speed) {}
    setSpeed(ms) {}
    onStep(callback) {}    // hook para actualizar DOM
    onFinish(callback) {}  // hook para mostrar resultado
  }
  ```
- [ ] Crear `ArrayBar.astro` — celda animada reutilizable
- [ ] Crear `Controls.astro` — botones con estados disabled
- [ ] Crear `TabSystem.astro` — sistema de 3-4 tabs
- [ ] Crear `AlgoLayout.astro` — layout completo con header, tabs, footer de navegación (← anterior / siguiente →)
- [ ] Crear `StepLog.astro` — caja de log con helper `logStep(html)`
- [ ] Documentar en un archivo `VISUALIZER_API.md` cómo usar el motor

#### Entregable:
Componentes reutilizables listos. Un "algoritmo demo vacío" que demuestra todos los componentes funcionando.

---

### FASE 2 — Algoritmos Nivel 0 (1 semana)
**Objetivo:** Los 10 algoritmos más simples, perfectos y bien explicados.

#### Algoritmos a implementar:
1. `sum-array` — array de barras que se van sumando
2. `linear-search` — puntero que recorre celda por celda
3. `min-max` — dos valores rastreados (min en rojo, max en verde)
4. `reverse-array` — intercambios simétricos con animación
5. `count-occurrences` — contador que sube con cada match
6. `fizzbuzz` — línea de números que cambian de color
7. `palindrome-check` — dos punteros desde afuera hacia adentro
8. `factorial` — acumulador que crece
9. `fibonacci-iter` — dos variables avanzando
10. `two-sum-brute` — nested loop con resaltado de pares

#### Para cada algoritmo crear:
- Página en `pages/algoritmos/[id].astro`
- 3 tabs (analogía, pasos, demo)
- Log pedagógico en español
- Input de objetivo editable donde aplique

#### Entregable:
10 algoritmos 100% funcionales. Sirven como template para todos los demás.

---

### FASE 3 — Algoritmos Nivel 1 (1-2 semanas)
**Objetivo:** 20 algoritmos incluyendo el Two Pointers (ya existe como ejemplo).

#### Algoritmos especiales a destacar:
- `binary-search` — array dividido visualmente en mitades
- `bubble-sort` — barras que "burbujean" hacia arriba
- `two-pointers` — PRIORIDAD: ya tienes el código de referencia (Doble Puntero)
- `stack-basic` — pila que crece y decrece visualmente
- `queue-basic` — cola con entrada por un lado y salida por otro

#### Nota de implementación:
Para los algoritmos de ordenamiento, el visualizador debe mostrar **barras de altura proporcional** al valor, no solo celdas con números. Las barras permiten ver el ordenamiento visualmente de forma más intuitiva.

```
Celdas (números): [3][1][4][1][5]   ← para búsqueda y punteros
Barras (altura):  |   |   |   |     ← para ordenamiento
                  |   | ▓ |   |
                  | ▓ | ▓ |   | ▓
                  | ▓ | ▓ | ▓ | ▓
```

---

### FASE 4 — Algoritmos Nivel 2 (2 semanas)
**Objetivo:** 25 algoritmos incluyendo los primeros de árboles y DP.

#### Nuevos tipos de visualizadores necesarios:

**Para árboles binarios** (`binary-tree-bfs`, `binary-tree-dfs`, `bst-insert-search`):
```
Visualización SVG o HTML con posicionamiento absoluto:
       [8]
      /   \
    [3]   [10]
    / \     \
  [1] [6]  [14]
  
- Nodos: círculos con --surface, borde --border
- Nodo activo: borde --ptr-left, glow
- Nodo visitado: fondo --visited tenue
- Aristas: líneas SVG
```

**Para pilas/colas** (`stack-basic`, `queue-basic`, `monotonic-stack`):
```
Stack visual (crece hacia arriba):     Queue (fluye de izquierda a derecha):
  [ 5 ]  ← tope                       entrada → [ 1 ][ 3 ][ 5 ] → salida
  [ 3 ]
  [ 1 ]  ← fondo
```

**Para DP** (`dp-fibonacci-memo`, `dp-climbing-stairs`):
```
Tabla de memoización que se va llenando celda por celda:
  [0][1][1][2][3][5][8][13]...
      ↑ calculando este
```

#### Entregable:
25 algoritmos funcionando con 3 tipos nuevos de visualizadores.

---

### FASE 5 — Algoritmos Nivel 3 — Grafos y DP Avanzado (2-3 semanas)
**Objetivo:** 30 algoritmos de grafos y DP avanzado.

#### Nuevo visualizador: Grafo General

```
Para BFS, DFS, Dijkstra, etc. necesitas:
- Canvas con nodos posicionados (coordenadas fijas o force-directed)
- Aristas con pesos mostrados
- Animación de "frente de búsqueda" que avanza
- Cola/pila de nodos pendientes mostrada al lado

Componente GraphCanvas con API:
  setNodes([{id, x, y, label}])
  setEdges([{from, to, weight}])
  highlightNode(id, color)
  highlightEdge(from, to, color)
  setNodeState(id, 'visited'|'current'|'queued'|'done')
```

#### Estrategia para grafos complejos:
- Usar grafos pequeños fijos (6-8 nodos) para que quepan en pantalla
- Mostrar la estructura de datos auxiliar (cola para BFS, pila para DFS) al lado del grafo
- Para Dijkstra: tabla de distancias que se actualiza en cada paso

#### Para DP Avanzado (`dp-knapsack`, `dp-lis`, `dp-edit-distance`):
- Matrices 2D que se llenan progresivamente
- Color degradado: celda no calculada = --surface, calculada = tono de --accent proporcional al valor
- Puntero que indica la celda siendo calculada

---

### FASE 6 — Algoritmos Nivel 4 + Extras (2-3 semanas)
**Objetivo:** Completar los 25 algoritmos experto.

#### Nota: simplificar sin perder rigor
Los algoritmos de nivel 4 son matemáticamente complejos. La estrategia:
- **No visualizar el algoritmo completo** — visualizar el CONCEPTO CLAVE
- Ejemplo FFT: no visualizar la transformada completa, sino mostrar cómo se dividen los subproblemas (butterfly diagram simplificado)
- Ejemplo Convex Hull: mostrar puntos en plano cartesiano, luego el envolvente construyéndose
- Ejemplo Bloom Filter: mostrar el array de bits y cómo se activan con hash

---

### FASE 7 — Múltiples Variantes por Algoritmo (2 semanas)
**Objetivo:** Cada algoritmo muestra 2-3 variantes/aplicaciones del mismo concepto.

#### Estructura de variantes:
```
Ejemplo: Two Pointers
  Variante 1: Two Sum (la que ya existe)
  Variante 2: Contenedor de agua más grande
  Variante 3: Remover duplicados de array ordenado
  
Ejemplo: Sliding Window
  Variante 1: Suma máxima de subarray de tamaño k
  Variante 2: Substring más larga sin repetir
  Variante 3: Mínimo subarray con suma ≥ target
```

#### Implementación:
- Agregar sub-tabs dentro del tab "▶️ Pruébalo": `[Variante 1] [Variante 2] [Variante 3]`
- Cada variante tiene su propio array fijo y lógica de stepForward
- El tab "¿Cómo funciona?" muestra los pasos de la variante seleccionada

---

### FASE 8 — Visor de Código (1 semana)
**Objetivo:** Tab de código con Python, JS y pseudocódigo para cada algoritmo.

#### Implementación:
```html
<!-- Sub-tabs de lenguaje -->
<div class="code-tabs">
  <button class="code-tab active">Python</button>
  <button class="code-tab">JavaScript</button>  
  <button class="code-tab">Pseudocódigo</button>
</div>

<!-- Visor con highlight manual (sin librerías) -->
<pre class="code-block">
  <code id="codeContent"></code>
</pre>

<!-- Botón copiar -->
<button onclick="copyCode()">📋 Copiar</button>
```

#### Highlight manual (sin Prism/Highlight.js para mantener el bundle pequeño):
```javascript
function highlight(code, lang) {
  const keywords = {
    python: ['def','for','while','if','elif','else','return','in','range','len','None'],
    javascript: ['function','const','let','var','for','while','if','else','return','of']
  };
  // reemplazar keywords con spans coloreados
  // strings con --match
  // comentarios con --muted
  // números con --ptr-left
}
```

---

### FASE 9 — Problemas de Práctica (1 semana)
**Objetivo:** Linkear cada algoritmo a problemas de LeetCode/HackerRank.

#### Estructura en `algorithms.json`:
```json
{
  "id": "two-pointers",
  "problems": [
    { "name": "Two Sum II", "url": "https://leetcode.com/problems/two-sum-ii/", "difficulty": "medium", "platform": "leetcode" },
    { "name": "Container With Most Water", "url": "...", "difficulty": "medium", "platform": "leetcode" },
    { "name": "3Sum", "url": "...", "difficulty": "medium", "platform": "leetcode" }
  ]
}
```

#### UI de problemas:
```
┌─────────────────────────────────────┐
│ 🎯 Practica estos problemas         │
├────────────────┬──────────┬─────────┤
│ Two Sum II     │ Medium   │ LeetCode│
│ 3Sum           │ Medium   │ LeetCode│
│ Trapping Rain  │ Hard     │ LeetCode│
└────────────────┴──────────┴─────────┘
```

---

### FASE 10 — Pulido y Experiencia (1 semana)
**Objetivo:** Micro-interacciones, navegación, SEO, accesibilidad.

#### Tareas:
- [ ] Navegación ← → entre algoritmos del mismo nivel
- [ ] Breadcrumb: Inicio > Nivel 1 > Two Pointers
- [ ] Página de búsqueda por nombre/tag
- [ ] "Algoritmo del día" en la homepage (aleatorio)
- [ ] Animación de transición entre tabs (fade suave)
- [ ] Modo "sin animaciones" para personas con vestibular disorders (`prefers-reduced-motion`)
- [ ] Meta tags OG para compartir en redes (cada algoritmo tiene su imagen generada)
- [ ] Sitemap.xml automático de Astro
- [ ] `README.md` con instrucciones para contribuir nuevos algoritmos

---

## 📊 Cronograma Resumido

| Fase | Contenido | Duración estimada | Algoritmos al final |
|------|-----------|-------------------|---------------------|
| 0 | Setup + Roadmap | 1-2 sem | 0 (solo tarjetas) |
| 1 | Motor de visualización | 1 sem | 0 (componentes) |
| 2 | Nivel 0 completo | 1 sem | 10 |
| 3 | Nivel 1 completo | 1-2 sem | 30 |
| 4 | Nivel 2 completo | 2 sem | 55 |
| 5 | Nivel 3 completo | 2-3 sem | 85 |
| 6 | Nivel 4 completo | 2-3 sem | 110 |
| 7 | Variantes | 2 sem | 110 + variantes |
| 8 | Visor de código | 1 sem | — |
| 9 | Problemas | 1 sem | — |
| 10 | Pulido | 1 sem | — |
| **Total** | | **~16-22 semanas** | **110** |

---

## 🔧 Decisiones Técnicas

| Decisión | Elección | Razón |
|----------|----------|-------|
| Framework | Astro 4 (static) | Cero JS en cliente por defecto, rutas automáticas |
| CSS | Vanilla CSS + variables | Ya definido en el diseño, sin overhead |
| Animaciones | CSS transitions + JS | Sin GSAP/Framer, más control y menor bundle |
| Highlight de código | Vanilla JS | Sin Prism, bundle pequeño |
| Grafos | SVG inline | Sin D3, más control visual |
| Estado | Variables JS locales | Sin React/Vue, cada página es autocontenida |
| Persistencia | localStorage | Sin backend, fácil de deployar |
| Deploy | Vercel/Netlify | Free tier, CD automático desde GitHub |

---

## 📝 Template de Algoritmo para la IA

Cuando le pidas a la IA crear un algoritmo nuevo, usa este template:

```
Crea el visualizador completo para el algoritmo: [NOMBRE]

Nivel: [0/1/2/3/4]
Complejidad temporal: O(...)
Complejidad espacial: O(...)

Array de ejemplo fijo: [valores]
Objetivo default: [valor] (si aplica)

Casos que debe demostrar:
- Caso 1: [descripción] → resultado esperado
- Caso 2: [descripción] → resultado esperado

Analogía cotidiana para el tab "¿Qué es?":
[Describe la analogía en términos de vida diaria]

Sigue el PROMPT UNIVERSAL DE DISEÑO definido en el plan del proyecto.
El resultado debe ser un archivo HTML completo, autocontenido, 
que se pueda abrir directamente en el navegador.
```

---

## 🚦 Criterios de Calidad por Visualizador

Antes de marcar un algoritmo como "listo", debe cumplir:

- [ ] **Analogía clara**: Una persona sin conocimientos de programación entiende el concepto
- [ ] **Pasos correctos**: El log muestra exactamente qué y por qué en cada paso
- [ ] **Colores consistentes**: Usa exactamente los colores del sistema de diseño
- [ ] **Auto-play funciona**: La velocidad es ajustable y pausa/resume correctamente
- [ ] **Reiniciar funciona**: Estado completamente limpio tras reiniciar
- [ ] **Caso sin solución**: Si aplica, demuestra cuando no hay resultado
- [ ] **Mobile**: Se ve bien en pantallas de 375px (no necesita scroll horizontal)
- [ ] **Sin errores de consola**: 0 errores en DevTools
- [ ] **Log en español**: Todas las explicaciones en español, tono pedagógico

---

## 🗒️ Notas para el Equipo

1. **Siempre probar con el objetivo que NO tiene solución** — es el caso que más falla
2. **El log es lo más importante** — un visualizador sin log pedagógico no enseña nada
3. **Preferir arrays pequeños** — 6-8 elementos es suficiente y se ve mejor
4. **Las animaciones no deben ser tan rápidas que confundan** — default 900ms es correcto
5. **Cada archivo HTML debe ser autocontenido** — fácil de extraer e integrar en Astro
6. **Usar IDs únicos en el DOM** — si hay múltiples visualizadores en una página, los IDs deben ser únicos

---

*Plan v1.0 — Generado como guía de desarrollo para la plataforma de algoritmos interactivos*