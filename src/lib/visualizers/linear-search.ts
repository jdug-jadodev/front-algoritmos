/**
 * linear-search.ts - Visualizador de Búsqueda Lineal.
 *
 * Migrado desde src/pages/algoritmos/linear-search.astro (legacy).
 * Preserva las animaciones únicas:
 *   - Neón amarillo (#ffff00 con triple text-shadow) en la celda activa.
 *   - Neón naranja (#ff6a00 con doble text-shadow) en el índice activo.
 *   - Keyframe pulse 0%→50%→100% (scale 1→1.25→1.15) al match.
 *   - Clases de log: highlight, left-c, right-c, match-c.
 *
 * Lógica: recorre el array secuencialmente comparando con el target.
 * Termina al encontrar match (return continue:false) o al llegar al final.
 *
 * @module lib/visualizers/linear-search
 */

import type { VisualizerConfig } from './types';

const config: VisualizerConfig = {
  id: 'linear-search',
  name: 'Búsqueda Lineal',
  subtitle: 'Busca un número comprobando elemento por elemento',
  complexity: 'O(n)',
  description:
    'La búsqueda lineal recorre un arreglo elemento por elemento hasta encontrar el valor buscado. Es el algoritmo más simple y funciona en arreglos desordenados, pero su complejidad es lineal en el peor caso.',
  needsTarget: true,
  targetLabel: 'Target',
  example: {
    arr: [3, 7, 1, 9, 4, 6, 2, 8],
    target: 9,
  },
  defaultSpeed: 900,
  minSpeed: 300,
  maxSpeed: 2000,
  styleHref: '/lib/visualizers/styles/linear-search.css',

  /**
   * Lógica de un paso: comparar ARR[L] con target, avanzar o terminar.
   * El estado interno vive en el objeto `state` que persiste entre pasos.
   */
  onStep: (state, { target }) => {
    // Si ya terminó, no hacer nada.
    if (state.done) return { continue: false };

    const arr = state.array;
    const i = state.i; // índice actual

    // Llegamos al final sin encontrar.
    if (i >= arr.length) {
      state.done = true;
      state.matchIndex = -1;
      return { continue: false };
    }

    state.stepCount++;
    const val = arr[i];

    // Log pedagógico: ¿coincide o no?
    if (val === target) {
      // Match: pintar log y dejar que onComplete muestre el banner.
      (window as any).logStep?.(
        `<span class="match-c">✅ ¡Encontrado!</span> El valor <span class="highlight">${target}</span> está en el índice <span class="highlight">[${i}]</span>. Solo revisé ${state.stepCount} elemento(s).`
      );
      state.matchIndex = i;
      state.done = true;
      return { continue: false };
    } else {
      // No coincide: avanzar.
      (window as any).logStep?.(
        `Paso ${state.stepCount}: Revisando índice <span class="highlight">[${i}]</span> → valor <span class="left-c">${val}</span> vs objetivo <span class="right-c">${target}</span> <strong style="color:#ef4444">No coincide</strong>. Avanzando...`
      );
      state.i = i + 1;
      return { continue: state.i < arr.length, data: { i: state.i } };
    }
  },

  /**
   * Render del array: cada celda se pinta con la clase que corresponda
   * (active-value, both-ptr) y el label superior opcional (✓ en match).
   */
  onRender: (state, dom) => {
    if (!dom.arrayArea) return;
    const arr = state.array;
    dom.arrayArea.innerHTML = arr
      .map((val: any, idx: number) => {
        let cls = 'cell';
        let label = '';
        let wrapCls = 'cell-wrap';

        if (idx === state.matchIndex && state.matchIndex >= 0) {
          // Estado match: borde rosado + pulse + label ✓
          cls += ' both-ptr';
          wrapCls += ' match-wrap';
          label = `<span class="ptr-label B">✓</span>`;
        } else if (idx === state.i && !state.done) {
          // Estado activo: borde naranja + neón en número/índice
          cls += ' active-value';
          wrapCls += ' active-wrap';
          label = '';
        }

        return `
          <div class="${wrapCls}">
            <span class="value-label">Valor</span>
            ${label}
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
      dom.stateValue.textContent = state.done
        ? state.matchIndex >= 0
          ? `Encontrado en [${state.matchIndex}]`
          : 'No encontrado'
        : `Paso ${state.stepCount} | i=${state.i}`;
    }
  },

  /** Mostrar banner con el resultado final. */
  onComplete: (state, dom) => {
    if (!dom.resultBanner) return;
    dom.resultBanner.classList.remove('hidden');
    if (state.matchIndex >= 0) {
      dom.resultBanner.className = 'result-banner found';
      dom.resultBanner.innerHTML = `<span class="match-c">✅ ¡Encontrado!</span> El valor <strong>${state.array[state.matchIndex]}</strong> está en el índice [${state.matchIndex}]. Solo revisé ${state.stepCount} elemento(s).`;
    } else {
      dom.resultBanner.className = 'result-banner not-found';
      dom.resultBanner.innerHTML = `🔍 No se encontró el objetivo en el arreglo después de revisar ${state.stepCount} elemento(s).`;
    }
  },

  /** Reset del estado interno (el shell también limpia el log y el banner). */
  onReset: (state) => {
    state.i = 0;
    state.stepCount = 0;
    state.matchIndex = -1;
    state.done = false;
  },
};

export default config;
