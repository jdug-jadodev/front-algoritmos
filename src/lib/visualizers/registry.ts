/**
 * Registry - Mapa de algoritmos con visualizador.
 *
 * Fuente única de verdad para "qué algoritmos tienen visualizador".
 * Cualquier componente o página que necesite saber si un algoritmo tiene
 * visualizador consulta `hasVisualizer(id)` aquí, NO el campo `hasVisualizer`
 * de algorithms.json (que se eliminó para evitar dos fuentes de verdad).
 *
 * Para agregar un nuevo visualizador:
 *   1. Crear src/lib/visualizers/<id>.ts exportando un VisualizerConfig.
 *   2. Importarlo abajo y agregarlo al objeto REGISTRY.
 *
 * @module lib/visualizers/registry
 */

import type { VisualizerConfig } from './types';
import linearSearch from './linear-search';
import binarySearch from './binary-search';
import bubbleSort from './bubble-sort';
import selectionSort from './selection-sort';

/**
 * Mapa id â†’ VisualizerConfig.
 * TypeScript verifica que cada entry cumpla con la interfaz.
 */
const REGISTRY: Record<string, VisualizerConfig> = {
  'linear-search': linearSearch,
  'binary-search': binarySearch,
  'bubble-sort': bubbleSort,
  'selection-sort': selectionSort,
};

/**
 * Obtiene el config de un visualizador por id.
 * Retorna null si el algoritmo no tiene visualizador registrado.
 */
export function getVisualizer(id: string): VisualizerConfig | null {
  return REGISTRY[id] ?? null;
}

/**
 * Indica si un algoritmo tiene visualizador registrado.
 * Es la fuente de verdad que consulta [slug].astro.
 */
export function hasVisualizer(id: string): boolean {
  return id in REGISTRY;
}

/**
 * Lista los ids de todos los algoritmos con visualizador.
 * Útil para debugging y para tests.
 */
export function listVisualizers(): string[] {
  return Object.keys(REGISTRY);
}
