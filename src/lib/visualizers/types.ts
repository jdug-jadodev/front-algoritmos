/**
 * VisualizerConfig - Contrato entre un visualizador de algoritmo y el shell canónico.
 *
 * Cada algoritmo con visualizador (linear-search, binary-search, ...) exporta un
 * objeto VisualizerConfig desde su archivo .ts en src/lib/visualizers/.
 *
 * El shell canónico (Visualizer.astro) carga el config por id, lee sus callbacks
 * y los pasa al VisualizerEngine. De esta forma agregar un nuevo algoritmo es
 * solo crear un archivo en el registry.
 *
 * @module lib/visualizers/types
 */

/**
 * Refs DOM cacheados que el shell resuelve una sola vez y comparte con los
 * callbacks del visualizador (onStep, onRender, onComplete, onReset).
 *
 * Los campos opcionales existen porque no todos los visualizadores los necesitan
 * (p.ej. linear-search no usa valL/valMid/valR).
 */
export interface DomRefs {
  /** Contenedor donde se renderizan las celdas del array */
  arrayArea: HTMLElement;
  /** Caja de log pedagógica (provista por StepLog.astro) */
  logBox: HTMLElement;
  /** Display textual de estado (Paso: X | i=Y) */
  stateDisplay?: HTMLElement | undefined;
  /** Span interno del stateDisplay donde se actualiza el texto */
  stateValue?: HTMLElement | undefined;
  /** Banner que muestra el resultado final (encontrado / no encontrado) */
  resultBanner?: HTMLElement | undefined;
  /** Contenedor del sub-display de punteros (binary-search) */
  ptrDisplay?: HTMLElement | undefined;
  valL?: HTMLElement | undefined;
  valMid?: HTMLElement | undefined;
  valR?: HTMLElement | undefined;
  valTarget?: HTMLElement | undefined;
  /** Input opcional para el target del algoritmo (búsqueda) */
  targetInput?: HTMLInputElement | undefined;
  /** Etiqueta opcional para mostrar el target actual (binary) */
  speedValue?: HTMLElement | undefined;
}

/**
 * Contexto que el shell pasa al callback onStep en cada paso.
 * Contiene el target actual (si aplica) y las refs DOM cacheadas.
 */
export interface StepContext {
  target: any;
  dom: DomRefs;
}

/**
 * Retorno del callback onStep. El engine usa `continue` para saber si debe
 * seguir ejecutando, y `data` para mergear campos en el estado.
 */
export interface StepResult {
  continue: boolean;
  data?: Record<string, any>;
}

/**
 * Configuración completa de un visualizador.
 *
 * Esta es la "interfaz canónica" que el shell espera. Cada archivo en
 * src/lib/visualizers/*.ts exporta un objeto que cumple con esta forma.
 */
export interface VisualizerConfig {
  /** Identificador kebab-case único. Debe coincidir con algo.id en algorithms.json */
  id: string;

  /** Nombre legible para mostrar en el header (p.ej. "Búsqueda lineal") */
  name: string;

  /** Subtítulo debajo del título (p.ej. "Divide y vencerás — O(log n)") */
  subtitle?: string;

  /** Complejidad algorítmica (p.ej. "O(n)", "O(log n)") */
  complexity?: string;

  /** Descripción larga del algoritmo (se muestra en tab "Qué es") */
  description?: string;

  /** Datos del ejemplo por defecto: arreglo, target, y extras libres */
  example: {
    arr: any[];
    target?: any;
    extra?: Record<string, any>;
  };

  /** Velocidad por defecto del auto-play en ms (default 900) */
  defaultSpeed?: number;

  /** Velocidad mínima en ms (default 300) */
  minSpeed?: number;

  /** Velocidad máxima en ms (default 2000) */
  maxSpeed?: number;

  /** Si true, el shell muestra el input de target */
  needsTarget?: boolean;

  /** Etiqueta del input target (default "Target") */
  targetLabel?: string;

  /** Ruta al CSS específico de este visualizador (servido desde /public) */
  styleHref?: string;

  /**
   * Callback ejecutado en cada paso.
   * Debe retornar { continue: boolean, data?: any }.
   * Si continue es false, el algoritmo termina y se llama onComplete.
   */
  onStep: (state: any, ctx: StepContext) => StepResult;

  /** Callback para repintar el DOM después de cada cambio de estado */
  onRender: (state: any, dom: DomRefs) => void;

  /** Callback ejecutado al terminar el algoritmo (una vez) */
  onComplete: (state: any, dom: DomRefs) => void;

  /** Callback ejecutado al reiniciar (limpia estado interno del config) */
  onReset: (state: any, dom: DomRefs) => void;
}
