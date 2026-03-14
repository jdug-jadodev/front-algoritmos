/**
 * VisualizerEngine - Motor reutilizable para visualizadores de algoritmos
 * 
 * Sistema de gestión de estados y pasos para visualizadores educativos.
 * Implementa el patrón de composición sobre herencia, permitiendo que cada
 * visualizador inyecte su lógica específica mediante callbacks.
 * 
 * @version 1.0.0
 * @author Front-Algoritmos Team
 */

// Estados posibles del motor
const STATES = {
  INITIAL: 'initial',      // Recién creado o después de reset
  RUNNING: 'running',      // Ejecutando pasos (auto-play activo)
  PAUSED: 'paused',        // Pausado manualmente (puede continuar)
  COMPLETED: 'completed'   // Algoritmo terminó (no puede continuar, solo reset)
};

// Transiciones permitidas entre estados
const TRANSITIONS = {
  initial: ['running', 'paused'],
  running: ['paused', 'completed'],
  paused: ['running', 'completed', 'initial'],
  completed: ['initial']
};

/**
 * Clase principal del motor de visualización
 */
export class VisualizerEngine {
  /**
   * @param {Object} config - Configuración del motor
   * @param {Function} config.onStep - Callback ejecutado en cada paso (debe retornar {continue: boolean, data: any})
   * @param {Function} config.onRender - Callback para actualizar UI después de cada cambio de estado
   * @param {Function} config.onComplete - Callback ejecutado al terminar el algoritmo
   * @param {Function} config.onReset - Callback ejecutado al reiniciar
   * @param {Object} config.initialState - Estado inicial del visualizador
   * @param {number} config.defaultSpeed - Velocidad por defecto en ms (default: 900)
   */
  constructor(config = {}) {
    // Validar que se proporcionen los callbacks necesarios
    if (typeof config.onStep !== 'function') {
      throw new Error('VisualizerEngine: onStep callback is required');
    }

    // Callbacks del visualizador específico
    this.onStepCallback = config.onStep;
    this.onRenderCallback = config.onRender || (() => {});
    this.onCompleteCallback = config.onComplete || (() => {});
    this.onResetCallback = config.onReset || (() => {});
    this.onSpeedChangeCallback = config.onSpeedChange || (() => {});

    // Estado inicial
    this.initialState = config.initialState || {};
    this.currentState = { ...this.initialState };

    // Estado del motor
    this.engineState = STATES.INITIAL;

    // Auto-play
    this.autoInterval = null;
    this.speed = config.defaultSpeed || 900; // ms entre pasos
    this.minSpeed = 300;
    this.maxSpeed = 2000;

    // Contador de pasos para debugging
    this.stepCount = 0;
  }

  /**
   * Ejecuta un paso del algoritmo
   * @returns {boolean} - true si el paso se ejecutó, false si no se pudo
   */
  step() {
    // No permitir pasos si el algoritmo ya terminó
    if (this.engineState === STATES.COMPLETED) {
      console.warn('VisualizerEngine: Cannot step when completed. Reset first.');
      return false;
    }

    // Cambiar a estado PAUSED si estamos en INITIAL
    if (this.engineState === STATES.INITIAL) {
      this._setState(STATES.PAUSED);
    }

    // Ejecutar el callback del paso específico del algoritmo
    const stepResult = this.onStepCallback(this.currentState);

    // Incrementar contador de pasos
    this.stepCount++;

    // El callback debe retornar { continue: boolean, data: any }
    if (!stepResult || typeof stepResult.continue !== 'boolean') {
      console.error('VisualizerEngine: onStep must return {continue: boolean, data: any}');
      return false;
    }

    // Actualizar estado si hay datos
    if (stepResult.data) {
      this.currentState = { ...this.currentState, ...stepResult.data };
    }

    // Llamar al callback de render
    this.onRenderCallback(this.currentState);

    // Si el algoritmo terminó, cambiar a COMPLETED
    if (!stepResult.continue) {
      this._setState(STATES.COMPLETED);
      this.onCompleteCallback(this.currentState);
      this.stopAuto();
    }

    return true;
  }

  /**
   * Reinicia el motor al estado inicial
   */
  reset() {
    // Detener auto-play si está activo
    this.stopAuto();

    // Resetear estado
    this.currentState = { ...this.initialState };
    this._setState(STATES.INITIAL);
    this.stepCount = 0;

    // Llamar al callback de reset
    this.onResetCallback();

    // Renderizar estado inicial
    this.onRenderCallback(this.currentState);
  }

  /**
   * Inicia o pausa el modo auto-play
   * @returns {boolean} - true si se inició auto, false si se pausó
   */
  toggleAuto() {
    if (this.autoInterval) {
      this.stopAuto();
      return false;
    } else {
      this.startAuto();
      return true;
    }
  }

  /**
   * Inicia el modo auto-play
   */
  startAuto() {
    // No permitir auto-play si ya terminó
    if (this.engineState === STATES.COMPLETED) {
      console.warn('VisualizerEngine: Cannot start auto when completed. Reset first.');
      return;
    }

    // Cambiar a estado RUNNING
    this._setState(STATES.RUNNING);

    // Crear intervalo que ejecuta pasos
    this.autoInterval = setInterval(() => {
      const success = this.step();
      
      // Si el paso falló o el algoritmo terminó, detener auto-play
      if (!success || this.engineState === STATES.COMPLETED) {
        this.stopAuto();
      }
    }, this.speed);
  }

  /**
   * Detiene el modo auto-play
   */
  stopAuto() {
    if (this.autoInterval) {
      clearInterval(this.autoInterval);
      this.autoInterval = null;

      // Volver a PAUSED si no está COMPLETED
      if (this.engineState === STATES.RUNNING) {
        this._setState(STATES.PAUSED);
      }
    }
  }

  /**
   * Cambia la velocidad del auto-play
   * @param {number} ms - Milisegundos entre pasos (300-2000)
   */
  setSpeed(ms) {
    // Validar rango
    const newSpeed = Math.max(this.minSpeed, Math.min(this.maxSpeed, ms));
    this.speed = newSpeed;

    // Si auto-play está activo, reiniciarlo con nueva velocidad
    if (this.autoInterval) {
      const wasRunning = true;
      this.stopAuto();
      if (wasRunning && this.engineState !== STATES.COMPLETED) {
        this.startAuto();
      }
    }

    // Llamar al callback de cambio de velocidad
    this.onSpeedChangeCallback(newSpeed);
  }

  /**
   * Obtiene el estado actual del algoritmo
   * @returns {Object} - Copia del estado actual
   */
  getState() {
    return { ...this.currentState };
  }

  /**
   * Obtiene el estado del motor
   * @returns {string} - Estado actual del motor
   */
  getEngineState() {
    return this.engineState;
  }

  /**
   * Verifica si está en modo auto-play
   * @returns {boolean}
   */
  isAutoPlaying() {
    return this.autoInterval !== null;
  }

  /**
   * Verifica si el algoritmo ha terminado
   * @returns {boolean}
   */
  isCompleted() {
    return this.engineState === STATES.COMPLETED;
  }

  /**
   * Cambia el estado del motor (privado)
   * @private
   * @param {string} newState - Nuevo estado
   */
  _setState(newState) {
    // Validar que la transición sea permitida
    const allowedTransitions = TRANSITIONS[this.engineState] || [];
    
    if (!allowedTransitions.includes(newState)) {
      console.warn(`VisualizerEngine: Invalid state transition from ${this.engineState} to ${newState}`);
      return;
    }

    this.engineState = newState;
  }
}

/**
 * Ejemplo de uso:
 * 
 * const engine = new VisualizerEngine({
 *   initialState: { array: [1, 2, 3], left: 0, right: 2 },
 *   onStep: (state) => {
 *     // Lógica del algoritmo aquí
 *     state.left++;
 *     return { 
 *       continue: state.left < state.right, 
 *       data: state 
 *     };
 *   },
 *   onRender: (state) => {
 *     // Actualizar DOM aquí
 *     console.log('Rendering:', state);
 *   },
 *   onComplete: (state) => {
 *     console.log('Completed!', state);
 *   },
 *   onReset: () => {
 *     console.log('Reset!');
 *   }
 * });
 * 
 * engine.step();        // Ejecuta un paso
 * engine.toggleAuto();  // Inicia auto-play
 * engine.setSpeed(500); // Cambia velocidad
 * engine.reset();       // Reinicia
 */
