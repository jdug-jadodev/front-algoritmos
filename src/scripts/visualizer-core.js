const STATES = {
  INITIAL: 'initial',     
  RUNNING: 'running',     
  PAUSED: 'paused',      
  COMPLETED: 'completed'   
};

const TRANSITIONS = {
  initial: ['running', 'paused'],
  running: ['paused', 'completed'],
  paused: ['running', 'completed', 'initial'],
  completed: ['initial']
};

export class VisualizerEngine {
  constructor(config = {}) {
    if (typeof config.onStep !== 'function') {
      throw new Error('VisualizerEngine: onStep callback is required');
    }

    this.onStepCallback = config.onStep;
    this.onRenderCallback = config.onRender || (() => {});
    this.onCompleteCallback = config.onComplete || (() => {});
    this.onResetCallback = config.onReset || (() => {});
    this.onSpeedChangeCallback = config.onSpeedChange || (() => {});

    this.initialState = config.initialState || {};
    this.currentState = { ...this.initialState };

    this.engineState = STATES.INITIAL;

    this.autoInterval = null;
    this.speed = config.defaultSpeed || 900; // ms entre pasos
    this.minSpeed = 300;
    this.maxSpeed = 2000;

    this.stepCount = 0;
  }

  step() {
    if (this.engineState === STATES.COMPLETED) {
      console.warn('VisualizerEngine: Cannot step when completed. Reset first.');
      return false;
    }

    if (this.engineState === STATES.INITIAL) {
      this._setState(STATES.PAUSED);
    }

    const stepResult = this.onStepCallback(this.currentState);

    this.stepCount++;

    if (!stepResult || typeof stepResult.continue !== 'boolean') {
      console.error('VisualizerEngine: onStep must return {continue: boolean, data: any}');
      return false;
    }

    if (stepResult.data) {
      this.currentState = { ...this.currentState, ...stepResult.data };
    }

    this.onRenderCallback(this.currentState);

    if (!stepResult.continue) {
      this._setState(STATES.COMPLETED);
      this.stopAuto();
      this.onCompleteCallback(this.currentState);
    }

    return true;
  }

  reset() {
    this.stopAuto();

    this.currentState = { ...this.initialState };
    this._setState(STATES.INITIAL);
    this.stepCount = 0;

    this.onResetCallback(this.currentState);

    this.onRenderCallback(this.currentState);
  }

  toggleAuto() {
    if (this.autoInterval) {
      this.stopAuto();
      return false;
    } else {
      this.startAuto();
      return true;
    }
  }

  startAuto() {
    if (this.engineState === STATES.COMPLETED) {
      console.warn('VisualizerEngine: Cannot start auto when completed. Reset first.');
      return;
    }

    this._setState(STATES.RUNNING);

    this.autoInterval = setInterval(() => {
      const success = this.step();
      
      if (!success || this.engineState === STATES.COMPLETED) {
        this.stopAuto();
      }
    }, this.speed);
  }

  stopAuto() {
    if (this.autoInterval) {
      clearInterval(this.autoInterval);
      this.autoInterval = null;

      if (this.engineState === STATES.RUNNING) {
        this._setState(STATES.PAUSED);
      }
    }
  }

  setSpeed(ms) {
    const newSpeed = Math.max(this.minSpeed, Math.min(this.maxSpeed, ms));
    this.speed = newSpeed;

    if (this.autoInterval) {
      const wasRunning = true;
      this.stopAuto();
      if (wasRunning && this.engineState !== STATES.COMPLETED) {
        this.startAuto();
      }
    }

    this.onSpeedChangeCallback(newSpeed);
  }

  getState() {
    return { ...this.currentState };
  }

  getEngineState() {
    return this.engineState;
  }

  isAutoPlaying() {
    return this.autoInterval !== null;
  }

  isCompleted() {
    return this.engineState === STATES.COMPLETED;
  }

  _setState(newState) {
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
