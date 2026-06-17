/**
 * bubble-sort.ts - Visualizador de Ordenamiento Burbuja.
 *
 * Implementa el algoritmo clásico de ordenamiento por intercambio directo:
 * en cada pasada recorre el arreglo comparando pares adyacentes; si están
 * en el orden incorrecto, los intercambia. Al final de cada pasada, el
 * elemento más grande del rango "burbujea" hacia su posición definitiva al
 * final. El proceso termina cuando una pasada completa no produce ningún
 * swap (ya está ordenado) o cuando se han completado n-1 pasadas.
 *
 * Animaciones del visualizador:
 *   - Pasada actual (i) indicada en el state display.
 *   - Celdas en comparación: borde naranja + neón amarillo en el valor.
 *   - Celdas en swap: borde violeta + neón violeta claro en ambos valores.
 *   - Sufijo ya ordenado: borde cian + opacidad reducida.
 *   - Banner final con número de pasadas y swaps realizados.
 *
 * Lógica: O(n²) en el peor caso, O(n) en el mejor caso (arreglo ya
 * ordenado). Estable (no altera el orden relativo de elementos iguales).
 *
 * @module lib/visualizers/bubble-sort
 */

import type { VisualizerConfig } from './types';

/**
 * Array original desordenado, capturado por referencia al inicializar el
 * config. Se usa para restaurar el state.array en cada reset, evitando
 * que el motor (que hace shallow copy del initialState) pierda el orden
 * original tras la primera ejecución del algoritmo.
 *
 * IMPORTANTE: debe estar en una closure del módulo (no dentro del config
 * ni del state) porque ambos se recrean en cada reset.
 */
const ORIGINAL_ARR: readonly number[] = [5, 3, 8, 1, 9, 2, 7, 4];

const config: VisualizerConfig = {
  id: 'bubble-sort',
  name: 'Ordenamiento Burbuja',
  subtitle: 'Compara pares adyacentes y los intercambia si están en orden incorrecto',
  complexity: 'O(n²)',
  description:
    'El ordenamiento burbuja recorre el arreglo comparando pares de elementos adyacentes; cuando un par está en el orden incorrecto, los intercambia. Tras cada pasada, el elemento más grande del rango activo queda en su posición definitiva. Es un algoritmo simple y estable, pero su complejidad cuadrática lo hace poco práctico para arreglos grandes.',
  needsTarget: false,
  example: {
    arr: [...ORIGINAL_ARR],
  },
  defaultSpeed: 700,
  minSpeed: 300,
  maxSpeed: 2000,
  styleHref: '/lib/visualizers/styles/bubble-sort.css',

  /**
   * Inicializar (o reiniciar) el estado del algoritmo.
   * El shell ya inicializa array, stepCount, done, matchIndex.
   * Aquí añadimos los específicos de bubble-sort.
   *
   * Variables:
   *   - i: número de pasada actual (0..n-1).
   *   - j: índice de comparación dentro de la pasada actual (0..n-2-i).
   *   - sorted: cantidad de elementos al final que ya están en su lugar.
   *   - swapped: si la pasada actual ha realizado al menos un swap.
   *   - totalSwaps: contador acumulado de swaps (pedagógico).
   *
   * NOTA IMPORTANTE: el motor hace shallow copy del initialState, así
   * que state.array es la MISMA referencia que initialState.array. Si
   * mutamos state.array in-place durante los swaps (necesario para que
   * el render vea el cambio), también estamos mutando el initialState.
   * Por eso restauramos el arreglo desde ORIGINAL_ARR (constante del
   * módulo, fuera del ciclo de vida del config) en cada reset.
   */
  onReset: (state) => {
    // Restaurar el arreglo a su forma desordenada original.
    for (let k = 0; k < state.array.length; k++) {
      state.array[k] = ORIGINAL_ARR[k];
    }
    state.i = 0;
    state.j = 0;
    state.sorted = 0;
    state.swapped = false;
    state.totalSwaps = 0;
    state.stepCount = 0;
    state.done = false;
    state.matchIndex = -1;
  },

  /**
   * Lógica de un paso: comparar ARR[j] y ARR[j+1], intercambiar si están
   * en orden incorrecto, avanzar j; al terminar la pasada incrementar i,
   * resetear j y registrar si hubo swaps.
   *
   * Estructura: el callback avanza UN solo paso lógico por invocación.
   * Si la pasada actual termina sin más comparaciones, se inicializa
   * la siguiente pasada (o se finaliza si era la última).
   */
  onStep: (state) => {
    if (state.done) return { continue: false };

    const arr = state.array;
    const n = arr.length;

    // Caso terminal: ya completamos n-1 pasadas -> arreglo ordenado.
    if (state.i >= n - 1) {
      state.done = true;
      state.matchIndex = -1;
      return { continue: false };
    }

    // Límite superior de la pasada: comparamos hasta n-2-i inclusive.
    // Si j sobrepasó el límite, cerramos la pasada actual.
    if (state.j >= n - 1 - state.i) {
      // Si no hubo swaps en esta pasada, el arreglo ya estaba ordenado
      // y podemos terminar antes.
      if (!state.swapped) {
        state.sorted = n; // todo el arreglo ya está en su lugar
        state.done = true;
        state.matchIndex = -1;
        return { continue: false };
      }
      // Preparar la siguiente pasada.
      state.i += 1;
      state.sorted = state.i; // los últimos i elementos están en su lugar
      state.j = 0;
      state.swapped = false;
      return { continue: true };
    }

    // Paso normal: comparar ARR[j] con ARR[j+1].
    state.stepCount += 1;
    const leftIdx = state.j;
    const rightIdx = state.j + 1;
    const leftVal = arr[leftIdx];
    const rightVal = arr[rightIdx];

    if (leftVal > rightVal) {
      // Swap: intercambiar valores en el array mutante del state.
      const tmp = arr[leftIdx];
      arr[leftIdx] = arr[rightIdx];
      arr[rightIdx] = tmp;
      state.swapped = true;
      state.totalSwaps += 1;

      (window as any).logStep?.(
        `Paso ${state.stepCount} (pasada ${state.i + 1}): ` +
          `Comparando <span class="left-c">ARR[${leftIdx}]=${leftVal}</span> con ` +
          `<span class="right-c">ARR[${rightIdx}]=${rightVal}</span> ` +
          `→ <span class="swap-c">${leftVal} > ${rightVal}, ¡intercambiando!</span>`
      );
    } else {
      (window as any).logStep?.(
        `Paso ${state.stepCount} (pasada ${state.i + 1}): ` +
          `Comparando <span class="left-c">ARR[${leftIdx}]=${leftVal}</span> con ` +
          `<span class="right-c">ARR[${rightIdx}]=${rightVal}</span> ` +
          `→ <span class="ok-c">${leftVal} ≤ ${rightVal}, sin intercambio.</span>`
      );
    }

    // Avanzar j al siguiente par. La renderización mostrará el swap (si
    // ocurrió) durante un step y al siguiente step se habrá movido j.
    state.j = state.j + 1;
    return { continue: true, data: { j: state.j } };
  },

  /**
   * Render del arreglo. Cada celda puede estar en uno de cuatro estados:
   *   - compare:  celda[j] o celda[j-1] en la comparación actual.
   *   - swap:     par de celdas que acaban de intercambiarse (efecto breve).
   *   - sorted:   parte final del arreglo ya ordenada (opacidad reducida).
   *   - normal:   sin marca especial.
   *
   * IMPORTANTE: el estado compare/swap tiene PRIORIDAD sobre sorted.
   * Cuando j apunta dentro del rango ya ordenado (p.ej. al inicio de una
   * nueva pasada donde state.sorted=2 y j=1), las celdas activas deben
   * seguir iluminándose aunque estén en el "sufijo ordenado" en términos
   * del conteo. Si no, el usuario ve celdas verdes que no se mueven
   * mientras la comparación ocurre y no entiende qué está pasando.
   */
  onRender: (state, dom) => {
    if (!dom.arrayArea) return;
    const arr = state.array;

    dom.arrayArea.innerHTML = arr
      .map((val: any, idx: number) => {
        let cls = 'cell';
        let wrapCls = 'cell-wrap';

        // 1) ¿Está esta celda participando en la comparación actual?
        //    state.j apunta al ÍNDICE IZQUIERDO del par a comparar.
        //    La celda derecha es j+1, pero la pintamos cuando acabamos
        //    de avanzar (j-1 era la última izquierda y ahora j es la nueva).
        const isInSwap = state.swapped && idx === state.j - 1;
        const isInCompare =
          !state.done && !isInSwap && (idx === state.j || idx === state.j - 1);

        if (isInSwap) {
          cls += ' swap-value';
          wrapCls += ' swap-wrap';
        } else if (isInCompare) {
          cls += ' compare-value';
          wrapCls += ' compare-wrap';
        } else if (idx < state.sorted) {
          // Sufijo ya ordenado: opacidad reducida + borde cian.
          // Solo se aplica cuando la celda NO está activa.
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
          `Ordenado en ${state.i} pasada(s) y ${state.totalSwaps} swap(s)`;
      } else {
        dom.stateValue.textContent =
          `Pasada ${state.i + 1} | j=${state.j} | sorted=${state.sorted}`;
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
      `[${arrStr}]. <strong>${state.totalSwaps}</strong> intercambio(s) en ` +
      `<strong>${state.i}</strong> pasada(s).`;
  },
};

export default config;
