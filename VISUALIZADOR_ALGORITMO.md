Implementa el visualizador del algoritmo "Búsqueda Lineal" (id: "linear-search") 
en mi proyecto Astro de algoritmos educativos.

## CONTEXTO DEL PROYECTO

Ya existe un archivo de referencia funcional: `doblepuntero.html`. 
Ese archivo es el GOLDEN STANDARD — debes replicar exactamente su estructura 
y comportamiento, adaptando solo la lógica del algoritmo nuevo.

El proyecto usa:
- Astro 4 con rutas dinámicas en `src/pages/algoritmos/[slug].astro`
- Vanilla JavaScript (sin React/Vue)
- CSS Variables ya definidas (--bg, --surface, --card, --border, --accent, 
  --accent2, --left, --right, --match, --text, --muted)
- Fuentes: Syne (títulos) y Space Mono (código/números)

## LO QUE DEBES CREAR

Crea el archivo: `src/pages/algoritmos/linear-search.astro`

Este archivo debe ser AUTOCONTENIDO — todo el HTML, CSS y JS en un solo archivo, 
igual que doblepuntero.html. NO uses imports de componentes externos todavía.

## ESTRUCTURA OBLIGATORIA (copia de doblepuntero.html)

El archivo debe tener exactamente estas 3 partes:

### PARTE 1 — CSS
- Mismas variables CSS que doblepuntero.html
- Mismas clases: .cell, .cell.left-ptr, .cell.right-ptr, .cell.both-ptr
- Mismas animaciones: @keyframes pulse, @keyframes blink
- Layout idéntico: tabs, array-area, sum-display, log-box, controls

### PARTE 2 — HTML
3 tabs con estos IDs exactos:
- `tab-analogia` — Explicación con analogía cotidiana
- `tab-como` — Lista numerada de pasos del algoritmo  
- `tab-demo` — El visualizador interactivo

El tab demo DEBE tener estos IDs exactos:
- `arrayArea` — donde se renderizan las celdas
- `logBox` — caja de logs pedagógicos
- `resultBanner` — banner verde/rojo de resultado
- `targetInput` — input para el número a buscar
- `speedSlider` — slider de velocidad
- `playingBadge` — badge "reproduciendo..."
- Botones: onclick="resetDemo()", onclick="stepForward()", onclick="toggleAuto()"

### PARTE 3 — JAVASCRIPT (la lógica específica del algoritmo)
```javascript
const ARR = [3, 7, 1, 9, 4, 6, 2, 8]; // Array fijo para la demo

let L, done, autoInterval, stepCount;

function resetDemo() {
  // Limpia todo y vuelve al estado inicial
  // L = 0, done = false, stepCount = 0
  // Limpia logBox, resultBanner, habilita botones
  // Llama renderArray(-1) para mostrar array sin highlights
}

function stepForward() {
  if (done) return;
  const target = parseInt(document.getElementById('targetInput').value);
  stepCount++;
  
  // LÓGICA DE BÚSQUEDA LINEAL:
  // Si L < ARR.length:
  //   Resaltar celda L con clase "left-ptr"
  //   Si ARR[L] === target → finalize(true)
  //   Sino → logStep explicando que no coincide → L++
  // Sino:
  //   finalize(false)
  
  // El log DEBE explicar en español:
  // QUÉ está haciendo (comparando elemento X con objetivo Y)
  // POR QUÉ (buscamos coincidencia)
  // CUÁL fue la decisión (no coincide / ¡encontrado!)
}

function renderArray(activeIndex) {
  // Re-renderiza TODO el array (igual que doblepuntero.html)
  // Cada celda es un .cell-wrap con: ptr-label, .cell, .idx-label
  // Si i === activeIndex → clase "left-ptr" y label "⬆ L"
  // Si es el resultado encontrado → clase "both-ptr" y label "✓"
}

function finalize(found, ...args) {
  // Igual que doblepuntero.html:
  // done = true, clearInterval, deshabilitar botones
  // resultBanner con clase "found" o "not-found"
}

function toggleAuto() {
  // Igual que doblepuntero.html
}
```

## CONTENIDO EDUCATIVO DE LOS TABS

### Tab "¿Qué es?" — usa esta analogía:
La búsqueda lineal es como buscar tus llaves en casa: revisas cada lugar 
uno por uno (cajón 1, cajón 2, cajón 3...) hasta encontrarlas o confirmar 
que no están. Es simple pero funciona siempre, sin importar si los cajones 
están ordenados o no.

### Tab "¿Cómo funciona?" — pasos numerados:
1. Empieza en el primer elemento (índice 0)
2. Compara el elemento actual con el objetivo
3. Si coinciden → ¡Encontrado! Retorna el índice
4. Si no coincide → avanza al siguiente elemento
5. Repite pasos 2-4 hasta llegar al final
6. Si llegaste al final sin encontrarlo → no existe en el arreglo

## EJEMPLO DE LOG PEDAGÓGICO (replica este estilo exacto)
```javascript
// Para cuando NO coincide:
logBox.innerHTML = `Paso ${stepCount}: Revisando índice <span class="highlight">[${L}]</span>
→ valor <span class="left-c">${ARR[L]}</span> vs objetivo 
<span class="right-c">${target}</span> 
<strong style="color:#ef4444">No coincide</strong>. Avanzando...`;

// Para cuando SÍ coincide:
logBox.innerHTML = `<span class="match-c">✅ ¡Encontrado!</span> 
El valor <span class="highlight">${target}</span> está en el 
índice [${L}]. Solo revisé ${stepCount} elemento(s).`;
```

## LO QUE NO DEBES HACER
- NO crear un plan o documentación
- NO usar componentes Astro externos
- NO usar imports
- NO simplificar el CSS (cópialo completo de doblepuntero.html)
- NO escribir el JS fuera de un tag <script> al final del body

## RESULTADO ESPERADO
Un archivo .astro completamente funcional que al abrirlo en el navegador 
se vea y funcione EXACTAMENTE igual que doblepuntero.html, 
pero con la lógica de búsqueda lineal.

Escribe el archivo completo ahora, sin explicaciones previas.