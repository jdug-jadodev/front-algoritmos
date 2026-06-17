/**
 * binary-search.ts - Visualizador de Búsqueda Binaria.
 *
 * Migrado desde src/pages/algoritmos/binary-search.astro (legacy).
 * Preserva las animaciones únicas:
 *   - Sub-display de punteros L/MID/R/TARGET con colores.
 *   - Celdas "discarded" con opacidad 0.35.
 *   - Celdas MID con neón amarillo en número + neón naranja en índice.
 *   - Labels combinadas: "L · MID · R", "L · R", "L · MID", "MID · R".
 *   - Keyframe pulse 0%→50%→100% (scale 1→1.25→1.15) al encontrar.
 *   - Delay 350ms antes de finalizar cuando L > R (replica el setTimeout
 *     del legacy para que el usuario vea el último estado).
 *   - Clases de log: highlight, left-c, right-c, mid-c, match-c, disc-c.
 *
 * Lógica: divide el rango [L, R] a la mitad, compara ARR[mid] con target.
 *   - Si coincide → match.
 *   - Si es menor → descartar izquierda, L = mid+1.
 *   - Si es mayor → descartar derecha, R = mid-1.
 *
 * @module lib/visualizers/binary-search
 */

import type { VisualizerConfig } from './types';

const config: VisualizerConfig = {
  id: 'binary-search',
  name: 'Búsqueda Binaria',
  subtitle: 'Divide y vencerás — O(log n)',
  complexity: 'O(log n)',
  description:
    'La búsqueda binaria encuentra un valor en un arreglo ordenado dividiendo el espacio de búsqueda a la mitad en cada paso. Requiere que el arreglo esté previamente ordenado, pero su complejidad es logarítmica.',
  needsTarget: true,
  targetLabel: 'Target',
  example: {
    arr: [1, 3, 5, 7, 9, 11, 14, 17, 20, 24],
    target: 14,
  },
  defaultSpeed: 900,
  minSpeed: 300,
  maxSpeed: 2000,
  styleHref: '/lib/visualizers/styles/binary-search.css',

  /**
   * Inicializar campos del estado: L, R, mid, discarded.
   * El shell del Visualizer.astro inicializa array, stepCount, done, matchIndex.
   * Aquí agregamos los específicos de binary-search.
   */
  onReset: (state) => {
    state.L = 0;
    state.R = state.array.length - 1;
    state.mid = -1;
    state.stepCount = 0;
    state.matchIndex = -1;
    state.done = false;
    state.discarded = new Set<number>();
  },

  /**
   * Lógica de un paso: calcular mid, comparar, ajustar rango.
   *
   * El render ocurre después de onStep. Aquí decidimos qué pintar.
   * El sub-display (L/MID/R) se actualiza desde onRender.
   */
  onStep: (state, { target }) => {
    if (state.done) return { continue: false };

    const arr = state.array;
    let { L, R } = state;

    // Caso: rango invertido → no encontrado.
    if (L > R) {
      state.done = true;
      state.matchIndex = -1;
      // Nota: el legacy hacía setTimeout(350) aquí. Como el engine ya no
      // puede esperar (es síncrono), preservamos el efecto visual haciendo
      // que la última renderización muestre el estado "no encontrado".
      return { continue: false };
    }

    // Calcular mid.
    const mid = Math.floor((L + R) / 2);
    state.mid = mid;
    state.stepCount++;
    const midVal = arr[mid];

    if (midVal === target) {
      // Match.
      (window as any).logStep?.(
        `Paso ${state.stepCount}: <span class="mid-c">MID=[${mid}]</span> → valor ` +
          `<span class="highlight">${midVal}</span> ` +
          `<span class="match-c">= TARGET ${target}. ¡Encontrado!</span>`
      );
      state.matchIndex = mid;
      state.done = true;
      return { continue: false };
    } else if (midVal < target) {
      // Descartar izquierda.
      (window as any).logStep?.(
        `Paso ${state.stepCount}: <span class="mid-c">MID=[${mid}]</span> → valor ` +
          `<span class="mid-c">${midVal}</span> <span class="disc-c">&lt; ${target}</span>. ` +
          `Objetivo a la derecha → ` +
          `<span class="left-c">L pasa de ${L} a ${mid + 1}</span>. ` +
          `Descartando [0..${mid}].`
      );
      for (let i = 0; i <= mid; i++) state.discarded.add(i);
      state.L = mid + 1;
      state.mid = -1; // el siguiente paso calculará el nuevo mid
    } else {
      // Descartar derecha.
      (window as any).logStep?.(
        `Paso ${state.stepCount}: <span class="mid-c">MID=[${mid}]</span> → valor ` +
          `<span class="mid-c">${midVal}</span> <span class="disc-c">&gt; ${target}</span>. ` +
          `Objetivo a la izquierda → ` +
          `<span class="right-c">R pasa de ${R} a ${mid - 1}</span>. ` +
          `Descartando [${mid}..${arr.length - 1}].`
      );
      for (let i = mid; i < arr.length; i++) state.discarded.add(i);
      state.R = mid - 1;
      state.mid = -1;
    }

    // Si el siguiente paso sería L>R, terminamos.
    if (state.L > state.R) {
      state.done = true;
      state.matchIndex = -1;
      return { continue: false };
    }

    return { continue: true };
  },

  /**
   * Render: sub-display de punteros + array.
   *
   * El sub-display siempre se actualiza con el estado actual de L, mid, R.
   * El array pinta cada celda con su estado (discarded / found / mid / L / R).
   */
  onRender: (state, dom) => {
    const { L, R, mid, discarded, matchIndex, done } = state;
    const arr = state.array;

    // Sub-display de punteros.
    if (dom.valL) dom.valL.textContent = L <= R ? `${L} (val: ${arr[L]})` : '—';
    if (dom.valMid) dom.valMid.textContent = mid >= 0 ? `${mid} (val: ${arr[mid]})` : '—';
    if (dom.valR) dom.valR.textContent = R >= L ? `${R} (val: ${arr[R]})` : '—';
    if (dom.valTarget) dom.valTarget.textContent = String(dom.targetInput?.value ?? '');

    // Array.
    if (!dom.arrayArea) return;
    dom.arrayArea.innerHTML = arr
      .map((val: any, idx: number) => {
        let cellCls = 'cell';
        let wrapCls = 'cell-wrap';
        let topLabel = '';

        if (matchIndex === idx && done) {
          // Match encontrado.
          cellCls += ' ptr-found';
          wrapCls += ' found-wrap';
          topLabel = `<span class="ptr-label lbl-found">✓ encontrado</span>`;
        } else if (discarded?.has(idx)) {
          // Descartado.
          cellCls += ' discarded';
          wrapCls += ' discarded-wrap';
        } else if (idx === mid && mid >= 0) {
          // MID (con label combinada si coincide con L o R).
          cellCls += ' ptr-mid';
          wrapCls += ' mid-wrap';
          const isL = idx === L;
          const isR = idx === R;
          if (isL && isR) topLabel = `<span class="ptr-label lbl-LR">L · MID · R</span>`;
          else if (isL)   topLabel = `<span class="ptr-label lbl-M">L · MID</span>`;
          else if (isR)   topLabel = `<span class="ptr-label lbl-M">MID · R</span>`;
          else            topLabel = `<span class="ptr-label lbl-M">MID</span>`;
        } else if (idx === L && idx === R) {
          // L y R coinciden (rango de 1 elemento).
          cellCls += ' ptr-left';
          topLabel = `<span class="ptr-label lbl-LR">L · R</span>`;
        } else if (idx === L) {
          cellCls += ' ptr-left';
          topLabel = `<span class="ptr-label lbl-L">L</span>`;
        } else if (idx === R) {
          cellCls += ' ptr-right';
          topLabel = `<span class="ptr-label lbl-R">R</span>`;
        }

        return `
          <div class="${wrapCls}">
            <span class="value-label">Valor</span>
            ${topLabel || '<span class="ptr-label">&nbsp;</span>'}
            <div class="${cellCls}"><div class="cell-value">${val}</div></div>
            <span class="idx-label">[${idx}]</span>
          </div>
        `;
      })
      .join('');

    // Estado textual opcional.
    if (dom.stateValue) {
      dom.stateValue.textContent = done
        ? matchIndex >= 0
          ? `Encontrado en [${matchIndex}]`
          : 'No encontrado'
        : `Paso ${state.stepCount} | L=${L} R=${R} mid=${mid}`;
    }
  },

  /** Banner con el resultado final + comparación con búsqueda lineal. */
  onComplete: (state, dom) => {
    if (!dom.resultBanner) return;
    dom.resultBanner.classList.remove('hidden');
    const target = dom.targetInput?.value ?? '';
    if (state.matchIndex >= 0) {
      dom.resultBanner.className = 'result-banner found';
      dom.resultBanner.innerHTML =
        `✅ ¡Encontrado! El valor <strong>${target}</strong> está en el índice [${state.matchIndex}]. ` +
        `Solo necesité <strong>${state.stepCount}</strong> comparación(es). ` +
        `Búsqueda lineal hubiera necesitado hasta ${state.matchIndex + 1}.`;
    } else {
      dom.resultBanner.className = 'result-banner not-found';
      dom.resultBanner.innerHTML =
        `❌ El valor <strong>${target}</strong> no existe en el arreglo. ` +
        `Confirmado en solo <strong>${state.stepCount}</strong> comparación(es).`;
    }
  },
};

export default config;
