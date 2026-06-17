/**
 * selection-sort.ts - Visualizador de Ordenamiento por Selección.
 *
 * Algoritmo: en cada pasada, busca el índice del elemento más pequeño
 * en el subarreglo ARR[i..n-1] y lo intercambia con ARR[i]. Después de
 * cada swap, el prefijo [0..i] queda en su posición definitiva. El
 * proceso continúa hasta que i = n-1.
 *
 * Animaciones del visualizador:
 *   - Celda i (posición a llenar): borde cian, marca el "hueco" actual.
 *   - minIdx (candidato actual a mínimo): borde violeta con scale 1.10.
 *   - j (celda explorada en la búsqueda): borde naranja con neón amarillo.
 *   - swap: el par i ↔ minIdx se resalta con keyframe durante un step.
 *   - Prefijo ordenado: opacidad reducida + borde verde, escala completa.
 *
 * Lógica: O(n²) en todos los casos. No es estable. Más predecible que
 * bubble sort en términos de número de swaps (exactamente n-1), aunque
 * sigue siendo O(n²) en comparaciones.
 *
 * @module lib/visualizers/selection-sort
 */

import type { VisualizerConfig } from './types';

/**
 * Array original desordenado, capturado en una constante del módulo para
 * sobrevivir a los resets del motor. El motor hace shallow copy del
 * initialState, así que cualquier mutación in-place de state.array
 * también afecta a initialState. Restaurar desde aquí garantiza que el
 * reset siempre devuelva el arreglo a su forma desordenada original.
 *
 * (Lección aprendida: bug latente del engine resuelto a nivel de
 * visualizer, idéntico al patrón usado en bubble-sort.ts.)
 */
const ORIGINAL_ARR: readonly number[] = [6, 2, 8, 3, 9, 1, 5, 7];

const config: VisualizerConfig = {
  id: 'selection-sort',
  name: 'Ordenamiento por Selección',
  subtitle: 'Busca el mínimo del resto y lo coloca en su posición definitiva',
  complexity: 'O(n²)',
  description:
    'El ordenamiento por selección divide el arreglo en dos partes: un prefijo ordenado y un sufijo por explorar. En cada pasada, busca el elemento más pequeño del sufijo y lo intercambia con el primer elemento del sufijo (que pasa a ser el último del prefijo ordenado). Realiza exactamente n-1 intercambios, pero O(n²) comparaciones.',
  needsTarget: false,
  example: {
    arr: [...ORIGINAL_ARR],
  },
  defaultSpeed: 600,
  minSpeed: 300,
  maxSpeed: 2000,
  styleHref: '/lib/visualizers/styles/selection-sort.css',

  /**
   * Inicializar (o reiniciar) el estado.
   *
   * Variables:
   *   - i: índice del hueco a llenar (0..n-2). Tras la swap, el prefijo
   *     [0..i] queda ordenado.
   *   - j: índice explorado en la búsqueda del mínimo (i+1..n-1).
   *   - minIdx: índice del candidato actual a mínimo (i..n-1).
   *   - swappedThisPass: si la última iteración actualizó minIdx (pedagógico).
   *   - totalComparisons: contador acumulado de comparaciones.
   *   - totalSwaps: contador acumulado de swaps (= n-1 al final).
   */
  onReset: (state) => {
    // Restaurar el arreglo a su forma desordenada original.
    for (let k = 0; k < state.array.length; k++) {
      state.array[k] = ORIGINAL_ARR[k];
    }
    state.i = 0;
    state.j = 1;
    state.minIdx = 0;
    state.swappedThisPass = false;
    state.totalComparisons = 0;
    state.totalSwaps = 0;
    state.stepCount = 0;
    state.done = false;
    state.matchIndex = -1;
  },

  /**
   * Lógica de un paso.
   *
   * Estructura del algoritmo:
   *   1. Si ya terminamos (i >= n-1) → finalizar.
   *   2. Si j está dentro del rango de búsqueda:
   *      - Comparar ARR[j] con ARR[minIdx].
   *      - Si es menor → minIdx = j.
   *      - Avanzar j.
   *   3. Si j salió del rango (j >= n):
   *      - Si minIdx != i, swap ARR[i] ↔ ARR[minIdx].
   *      - Avanzar i, resetear j = i+1, minIdx = i.
   *      - Si i >= n-1 → finalizar.
   *
   * Cada invocación del callback avanza UN paso lógico.
   */
  onStep: (state) => {
    if (state.done) return { continue: false };

    const arr = state.array;
    const n = arr.length;

    // Caso terminal: i llegó al final del rango rellenable.
    if (state.i >= n - 1) {
      state.done = true;
      state.matchIndex = -1;
      return { continue: false };
    }

    // Fase 1: cerrar la pasada actual si j salió del rango de búsqueda.
    if (state.j >= n) {
      // Swap final de la pasada: colocar el mínimo encontrado en la
      // posición i. (Ojo: si minIdx == i, "swap" no hace nada pero
      // totalSwaps no debe incrementarse porque pedagógicamente no fue
      // un intercambio real.)
      if (state.minIdx !== state.i) {
        const tmp = arr[state.i];
        arr[state.i] = arr[state.minIdx];
        arr[state.minIdx] = tmp;
        state.totalSwaps += 1;

        (window as any).logStep?.(
          `Paso ${state.stepCount} (pasada ${state.i + 1}): ` +
            `<span class="ok-c">Mínimo encontrado en posición [${state.minIdx}]</span> ` +
            `(valor <span class="highlight">${arr[state.i]}</span>). ` +
            `<span class="swap-c">Intercambiando ARR[${state.i}] ↔ ARR[${state.minIdx}].</span>`
        );
      } else {
        (window as any).logStep?.(
          `Paso ${state.stepCount} (pasada ${state.i + 1}): ` +
            `El mínimo del resto ya está en posición [${state.i}]. ` +
            `<span class="ok-c">Sin intercambio.</span>`
        );
      }

      // Avanzar a la siguiente pasada.
      state.i += 1;
      if (state.i >= n - 1) {
        // Tras esta swap, ya no quedan más pasadas.
        state.done = true;
        state.matchIndex = -1;
        return { continue: false };
      }
      state.j = state.i + 1;
      state.minIdx = state.i;
      state.swappedThisPass = false;
      return { continue: true };
    }

    // Fase 2: comparación normal durante la búsqueda.
    state.stepCount += 1;
    const jIdx = state.j;
    const jVal = arr[jIdx];
    const minVal = arr[state.minIdx];

    if (jVal < minVal) {
      // Nuevo candidato a mínimo.
      const oldMin = state.minIdx;
      state.minIdx = jIdx;
      state.swappedThisPass = true;

      (window as any).logStep?.(
        `Paso ${state.stepCount} (pasada ${state.i + 1}): ` +
          `Comparando <span class="left-c">ARR[${jIdx}]=${jVal}</span> con ` +
          `mínimo actual <span class="right-c">ARR[${oldMin}]=${minVal}</span> ` +
          `→ <span class="min-c">${jVal} &lt; ${minVal}, nuevo mínimo en [${jIdx}].</span>`
      );
    } else {
      (window as any).logStep?.(
        `Paso ${state.stepCount} (pasada ${state.i + 1}): ` +
          `Comparando <span class="left-c">ARR[${jIdx}]=${jVal}</span> con ` +
          `mínimo actual <span class="right-c">ARR[${state.minIdx}]=${minVal}</span> ` +
          `→ <span class="ok-c">${jVal} ≥ ${minVal}, sin cambio.</span>`
      );
    }
    state.totalComparisons += 1;

    state.j = state.j + 1;
    return { continue: true, data: { j: state.j } };
  },

  /**
   * Render del arreglo. Estados posibles por celda (en orden de prioridad):
   *   - current-i: celda que se va a llenar en esta pasada (idx === i).
   *   - min-current: candidato a mínimo en esta búsqueda (idx === minIdx).
   *   - swap: par i ↔ minIdx justo después del intercambio (un step).
   *   - searching: celda explorada actualmente (idx === j).
   *   - sorted-prefix: prefijo ya ordenado (idx < i).
   *   - normal: resto del sufijo aún por explorar.
   *
   * IMPORTANTE: la prioridad importa. Si una celda es a la vez
   * current-i y sorted-prefix (no debería pasar al inicio pero por
   * seguridad), gana current-i.
   */
  onRender: (state, dom) => {
    if (!dom.arrayArea) return;
    const arr = state.array;

    dom.arrayArea.innerHTML = arr
      .map((val: any, idx: number) => {
        let cls = 'cell';
        let wrapCls = 'cell-wrap';

        // Determinar estado. Orden de checks: del más específico al
        // más general, para que las marcas activas tengan prioridad.
        const isInSwap =
          state.swappedThisPass &&
          !state.done &&
          (idx === state.i || idx === state.minIdx);
        const isCurrentI = !state.done && !isInSwap && idx === state.i;
        const isMinCurrent =
          !state.done && !isInSwap && idx === state.minIdx && state.minIdx !== state.i;
        const isSearching =
          !state.done &&
          !isInSwap &&
          !isCurrentI &&
          !isMinCurrent &&
          idx === state.j;
        const isSortedPrefix = idx < state.i;

        if (isInSwap) {
          cls += ' swap-value';
          wrapCls += ' swap-wrap';
        } else if (isCurrentI) {
          cls += ' current-i-value';
          wrapCls += ' current-i-wrap';
        } else if (isMinCurrent) {
          cls += ' min-current-value';
          wrapCls += ' min-current-wrap';
        } else if (isSearching) {
          cls += ' searching-value';
          wrapCls += ' searching-wrap';
        } else if (isSortedPrefix) {
          cls += ' sorted-value';
          wrapCls += ' sorted-wrap';
        }

        return `
          <div class="${wrapCls}">
            <span class="value-label">Valor</span>
            <div class="${cls}">
              <div class="cell-value">${val}</div>
            </div>
            <span class="idx-label">${idx}</span>
          </div>
        `;
      })
      .join('');

    // Estado textual opcional.
    if (dom.stateValue) {
      if (state.done) {
        dom.stateValue.textContent =
          `Ordenado en ${state.totalComparisons} comparación(es) y ${state.totalSwaps} swap(s)`;
      } else {
        dom.stateValue.textContent =
          `Pasada ${state.i + 1} | j=${state.j} | minIdx=${state.minIdx}`;
      }
    }
  },

  /**
   * Banner con el resultado final: arreglo ordenado + métricas.
   */
  onComplete: (state, dom) => {
    if (!dom.resultBanner) return;
    dom.resultBanner.classList.remove('hidden');
    dom.resultBanner.className = 'result-banner found';
    const arrStr = state.array.join(', ');
    dom.resultBanner.innerHTML =
      `<span class="match-c">¡Arreglo ordenado!</span> ` +
      `[${arrStr}]. <strong>${state.totalComparisons}</strong> comparación(es) ` +
      `y <strong>${state.totalSwaps}</strong> intercambio(s).`;
  },
};

export default config;
