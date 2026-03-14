# One Spec (Root Spec)

## Objetivo

Entregar la especificación técnica y operativa para la Fase 2 del proyecto "Plataforma Interactiva de Algoritmos": implementar, validar y publicar los 10 visualizadores de nivel 0 (algoritmos básicos) tal como se define en `PLAN_TRABAJO.md`. La especificación define requisitos funcionales, no funcionales, artefactos, pasos de implementación, criterios de aceptación y pruebas necesarias para que las páginas sean autocontenidas, pedagógicas y listas para integración en Astro.

## Alcance / No alcance

- Alcance:
	- Implementar 10 visualizadores del Nivel 0: `sum-array`, `linear-search`, `min-max`, `reverse-array`, `count-occurrences`, `fizzbuzz`, `palindrome-check`, `factorial`, `fibonacci-iter`, `two-sum-brute`.
	- Cada algoritmo: página en `src/pages/algoritmos/[id].astro`, 3 tabs obligatorios (¿Qué es?, ¿Cómo funciona?, ▶️ Pruébalo), visualizador autocontenido en HTML/JS/CSS, log en español, controles, speed slider, result banners.
	- Componentes reutilizables necesarios (si no existen): `ArrayBar.astro`, `Controls.astro`, `StepLog.astro`, `TabSystem.astro`. Documentar API en `VISUALIZER_API.md`.
	- Tests manuales y checklist de QA, pruebas de accesibilidad móvil y validación sin errores de consola.

- No alcance:
	- Persistencia remota (backend). Solo `localStorage` leve si aplica.
	- Implementación de motores complejos de grafos/árboles (eso pertenece a fases posteriores).
	- Internacionalización completa (solo español por ahora).

## Definiciones (lenguaje de dominio)

- Visualizador: UI interactiva que muestra pasos del algoritmo.
- Paso (step): unidad atómica de avance en `stepForward()` que actualiza estado y UI.
- Estado: objeto JS que describe la situación actual del visualizador (arrays, punteros, acumuladores, done, log, etc.).
- Auto-play: ejecución periódica de `stepForward()` según slider de velocidad.

## Principios / Reglas no negociables

- Usar las variables CSS del sistema de diseño definidas en `PLAN_TRABAJO.md`.
- Cada visualizador debe ser autocontenido: abrir el HTML resultante debe mostrar la demo sin dependencias de backend.
- El motor de pasos sigue las funciones obligatorias: `resetDemo()`, `stepForward()`, `renderState()`, `finalize(found, ...)`, `toggleAuto()`.
- El log está en español y explica qué, por qué y la decisión tomada en cada paso.
- El DOM se re-renderiza desde el estado actual en `renderState()` (no updates parciales).

## Límites

- Arrays demo: 6–10 elementos.
- Velocidad del slider: 300ms–2000ms; default 900ms.
- No usar librerías externas para highlight de código ni animaciones complejas.

## Eventos y estados (visión raíz)

- Eventos UI: `click` Reiniciar, `click` Siguiente, `click` Auto, `input` Slider velocidad, `change` target input.
- Estados clave en cada visualizador:
	- `state.array` (si aplica)
	- `state.i`, `state.j`, `state.l`, `state.r` (punteros según algoritmo)
	- `state.acc` (acumulador para sum/factorial, etc.)
	- `state.log` (array de mensajes HTML)
	- `state.done` (boolean)
	- `state.result` (valor final o null)
	- `state.autoInterval` (handle)

## Requisitos funcionales detallados (por visualizador)

- Entradas fijas: cada demo incluye un array fijo (6–8 elementos) y, cuando procede, un `target` editable por el usuario.
- UI obligatoria por demo (orden): `problem-card` (título, entrada fija, input objetivo, botón Reiniciar) → `legend` → `array-area` → `state-display` → `log-box` → `result-banner` → `speed-row` → `playing-badge` → `controls`.
- Clases CSS de estado para celdas: `.cell`, `.cell.active-a`, `.cell.active-b`, `.cell.match`, `.cell.swapping`, `.cell.sorted`, `.cell.visited`.
- Cada `stepForward()` realiza exactamente una acción lógica (mover un puntero, comparar, swap, actualizar acumulador, escribir en log).

## Requisitos no funcionales

- Rendimiento: sin reasignaciones pesadas en el bucle; `renderState()` debe ser eficiente para 10 elementos.
- Accesibilidad: controles con `aria-label`, preferencia `prefers-reduced-motion` respetada.
- Mobile: diseño responsive, legibilidad en 375px ancho.
- Calidad: 0 errores en consola en Chrome/Firefox.

## Entregables

- 10 archivos de página: `src/pages/algoritmos/{id}.astro` (uno por algoritmo).
- Componentes: `src/components/visualizer/ArrayBar.astro`, `Controls.astro`, `StepLog.astro`, `TabSystem.astro` (si faltan).
- API doc: `VISUALIZER_API.md` con ejemplos de uso del motor (hooks, estructura de estado).
- Checklist de QA: archivo `docs/PHASE2_QA.md` con pruebas y pasos de verificación.

## Plan de implementación (pasos ejecutables)

1. Preparación (1 día)
	 - Confirmar los componentes base existentes en `src/components/visualizer/`.
	 - Añadir variables CSS globales en `BaseLayout.astro` si falta.

2. Crear estructura de página y tabs (0.5 día)
	 - Implementar `TabSystem.astro` (3 tabs obligatorios) y `AlgoLayout.astro` si no existe.

3. Componentes reutilizables (1 día)
	 - `ArrayBar.astro`: presenta una celda con valor y estados CSS.
	 - `Controls.astro`: botones Reiniciar, Siguiente, Auto; disabled según `state.done`.
	 - `StepLog.astro`: render del `state.log` y helper `logStep(html)`.

4. Implementar motor de demo ligero (1 día)
	 - Añadir `scripts/visualizer-core.js` exportando helpers mínimos para Fase 2 (reset, stepForward, toggleAuto, renderState).
	 - Asegurar API de hooks `onStep` y `onFinish`.

5. Implementar 10 visualizadores (2–3 días)
	 - Para cada algoritmo: crear `[id].astro` que usa los componentes y el motor.
	 - Incluir array fijo, target editable (si aplica) y log en español.

6. Pruebas y QA (1 día)
	 - Ejecutar checklist en `docs/PHASE2_QA.md`: reinicio, auto-play, sin solución, mobile, console errors.
	 - Corregir defectos detectados.

7. Documentación y entrega (0.5 día)
	 - Actualizar `VISUALIZER_API.md` con ejemplos de estado y snippets.
	 - Añadir notas de integración a `README.md` para contribuidores.

## Criterios de aceptación (Fase 2)

- Funcionalidad:
	- Cada demo completa los 3 tabs con contenido correcto.
	- `stepForward()` avanza pasos y el log documenta qué y por qué en español.
	- `toggleAuto()` reproduce y pausa sin perder estado.
	- `resetDemo()` restaura estado inicial y limpia log/banners.
- Usabilidad:
	- Velocidad ajustable (300–2000ms) y badge de reproducción visible.
	- Resultado correcto para caso exitoso y caso sin solución (muestra banner rojo).
- Calidad técnica:
	- 0 errores en consola, responsive en 375px, `prefers-reduced-motion` respetado.
- Entregables:
	- 10 páginas en `src/pages/algoritmos/`, componentes en `src/components/visualizer/`, `VISUALIZER_API.md`, `docs/PHASE2_QA.md`.

## Pruebas y verificación (checklist)

- Para cada algoritmo:
	- [ ] Abrir página y verificar que el tab default sea `¿Qué es?`.
	- [ ] Ir a `▶️ Pruébalo` y confirmar que el `array` muestra 6–8 elementos.
	- [ ] Hacer `Siguiente paso` hasta finalizar; comprobar que el log explica cada paso.
	- [ ] Probar `Auto` a velocidad por defecto y a velocidad mínima/máxima.
	- [ ] Reiniciar y verificar estado limpio.
	- [ ] Probar caso objetivo sin solución y comprobar banner de fracaso.
	- [ ] Verificar en móvil (375px) y en desktop.
	- [ ] Abrir DevTools y confirmar 0 errores.

## Roles y responsabilidades (sugerido)

- Desarrollador UI: implementar páginas y componentes.
- Dev Experiencia: documentar `VISUALIZER_API.md` y QA checklist.
- QA / Reviewer: ejecutar checklist y reportar issues.

## Cronograma estimado (sprint de 1 semana)

- Día 1: Preparación + componentes base.
- Día 2: Motor ligero + TabSystem.
- Día 3–4: Implementación de 10 visualizadores (2–3 por día).
- Día 5: QA, correcciones y documentación.

## Trazabilidad

- Refiérase a `PLAN_TRABAJO.md` (Fase 2) para el catálogo y requisitos de diseño.
- Artefactos finales vinculados:
	- Páginas: `src/pages/algoritmos/*.astro`
	- Componentes: `src/components/visualizer/*`
	- Docs: `VISUALIZER_API.md`, `docs/PHASE2_QA.md`, `README.md` (sección Contribuir)

## Riesgos y mitigaciones

- Riesgo: falta de componentes base en el repo. Mitigación: crear versiones mínimas autocontenidas.
- Riesgo: comportamiento asíncrono del auto-play produce condiciones de carrera. Mitigación: `autoInterval` controlado y chequeos de `done` en `stepForward()`.
- Riesgo: accesibilidad no verificada. Mitigación: incluir pruebas manuales y `aria` en controles.

---

Especificación generada para guiar la implementación de la Fase 2. Siguiente paso propuesto: ejecutar la lista de tareas (TODOs) en el repositorio y empezar por crear los componentes base y `VISUALIZER_API.md`.

## Especificaciones por algoritmo (Fase 2 — detalle para cada página)

Para cada uno de los 10 algoritmos de Nivel 0 se incluye: `Qué es?` (analogía), `Cómo funciona?` (pasos numerados), y `Pruébalo` (array fijo, target por defecto, comportamiento esperado y ejemplos de mensajes para el `log`). El visualizador debe comportarse y verse como `doblepuntero.html` (misma estructura de tabs y controles).

1) `sum-array` — Suma de arreglo
- Qué es?: Imagínate que tienes una pila de monedas y las vas sumando una por una para conocer el total.
- Cómo funciona? (pasos):
	1. Inicializar índice `i=0` y acumulador `acc=0`.
	2. Mientras `i < n`: leer `arr[i]` y sumar a `acc`.
	3. Registrar en log: "Sumando X → suma parcial Y".
	4. Incrementar `i` y re-renderizar.
	5. Cuando `i === n` llamar `finalize(true, 'Suma total: ' + acc)`.
- Pruébalo: array fijo [3,1,4,1,5,9], target N/A. Resultado esperado: banner con "Suma total: 23". Mensajes de ejemplo: "Sumando 3. Suma parcial: 3".

2) `linear-search` — Búsqueda lineal
- Qué es?: Buscar un nombre en una lista leyendo uno por uno hasta encontrarlo.
- Cómo funciona? (pasos):
	1. Inicializar `i=0`.
	2. Comparar `arr[i]` con `target`.
	3. Log: "Comparando arr[i] con target".
	4. Si coincide → marcar celda `.match` y `finalize(true, 'Encontrado en índice ' + i)`.
	5. Si no coincide → `i++`, re-render; si `i===n` finalizar con fracaso.
- Pruébalo: array [2,7,11,15,3,6], target default 11. Debe encontrar en índice 2 y mostrar banner de éxito.

3) `min-max` — Mínimo y máximo
- Qué es?: Revisar una bolsa de frutas y recordar la más pequeña y la más grande que ves.
- Cómo funciona? (pasos):
	1. Inicializar `i=0`, `min = arr[0]`, `max = arr[0]`.
	2. Para cada `i`: comparar `arr[i]` con `min` y `max`, actualizar si corresponde.
	3. Log: "Nuevo mínimo X" o "Nuevo máximo Y" cuando ocurra.
	4. Incrementar `i` hasta n, luego `finalize(true, 'Min: ..., Max: ...')`.
- Pruébalo: array [8,2,6,3,10,1]. Resultado: Min 1 (idx 5), Max 10 (idx 4).

4) `reverse-array` — Invertir arreglo
- Qué es?: Colocar los libros en la estantería en orden inverso intercambiando pares desde los extremos.
- Cómo funciona? (pasos):
	1. Inicializar `l=0`, `r=n-1`.
	2. Mientras `l<r`: marcar A=l, B=r, log "Intercambiando índice l (val) con r (val)".
	3. Hacer swap `arr[l] <-> arr[r]`, `l++`, `r--`, render.
	4. Si `l>=r` → `finalize(true, 'Arreglo invertido')`.
- Pruébalo: array [1,2,3,4,5,6]. Después de completar, el arreglo debe ser [6,5,4,3,2,1]. Cada swap aparece en el log.

5) `count-occurrences` — Contar ocurrencias
- Qué es?: Contar cuántas veces aparece un color concreto entre canicas en una caja.
- Cómo funciona? (pasos):
	1. Inicializar `i=0`, `count=0`.
	2. Para cada `i`: si `arr[i] === target` → `count++` y log "Coincidencia en índice i. Contador: count".
	3. `i++` hasta n; `finalize(true, 'Total de ocurrencias: ' + count)`.
- Pruébalo: array [1,2,1,3,1,4], target 1. Resultado: 3 ocurrencias.

6) `fizzbuzz` — FizzBuzz
- Qué es?: Etiquetar números según reglas (divisible por 3 → Fizz, por 5 → Buzz, por 15 → FizzBuzz).
- Cómo funciona? (pasos):
	1. Inicializar `i=1` hasta `n` (n entre 6–10).
	2. Para cada `i`: calcular etiqueta y log "Número i → etiqueta".
	3. Mostrar resultados en la visualización (celdas coloreadas según etiqueta).
	4. Al terminar `finalize(true, 'Terminado FizzBuzz')`.
- Pruébalo: n = 1..6 (usar array [1,2,3,4,5,6]). Ejemplo: 3 → Fizz, 5 → Buzz, 6 → Fizz.

7) `palindrome-check` — Verificar palíndromo
- Qué es?: Leer una palabra desde ambos extremos para ver si es la misma (como leer una frase espejo).
- Cómo funciona? (pasos):
	1. `l=0`, `r=n-1`.
	2. Comparar `arr[l]` y `arr[r]`, log "Comparando a y b".
	3. Si difieren → `finalize(false, 'No es palíndromo')`.
	4. Si coinciden → `l++`, `r--` hasta cruzar; si termina, `finalize(true, 'Es palíndromo')`.
- Pruébalo: array ['r','a','c','e','c','a','r'] → debe completar y mostrar éxito.

8) `factorial` — Factorial iterativo
- Qué es?: Multiplicar una serie de números descendentes para obtener el factorial (n!).
- Cómo funciona? (pasos):
	1. Input `n` (target). Inicializar `i=1`, `acc=1`.
	2. Mientras `i <= n`: `acc *= i`, log "Multiplicando por i. Resultado: acc", `i++`.
	3. Al terminar `finalize(true, 'Factorial: ' + acc)`.
- Pruébalo: target 5 → resultado 120.

9) `fibonacci-iter` — Fibonacci iterativo
- Qué es?: Generar la secuencia de Fibonacci sumando los dos anteriores.
- Cómo funciona? (pasos):
	1. Input `n` (cantidad de términos deseada). Inicializar `a=0`, `b=1`, `i=1`.
	2. Mientras `i < n`: `next = a + b`, `a=b`, `b=next`, log "Siguiente Fibonacci: b"; `i++`.
	3. Al terminar `finalize(true, 'Fibonacci alcanzado: ' + b)`.
- Pruébalo: target 7 → la séptima salida esperada (según índice usado en la demo).

10) `two-sum-brute` — Two Sum fuerza bruta
- Qué es?: Probar todas las parejas posibles en una lista hasta encontrar dos que sumen el objetivo.
- Cómo funciona? (pasos):
	1. `i=0`; para cada `i` recorrer `j=i+1..n-1`.
	2. Log "Probando par (arr[i], arr[j]) → suma S".
	3. Si `S===target` → `finalize(true, 'Par encontrado: índices i, j')` y marcar celdas.
	4. Si no hay par → `finalize(false, 'No hay par que sume target')`.
- Pruébalo: array [3,2,4,6,1,5], target 9 → debe encontrar (4,5) u otra combinación correcta.

Notas de implementación comunes para los 10 demos:
- Logs: usar las clases `<span class="log-a">`, `<span class="log-b">`, `<span class="log-match">`, `<span class="log-hi">` tal como define `VISUALIZER_API.md`.
- Estados: exponer `state` con campos mínimos necesarios y renderizar con clases `.cell`, `.cell.active-a`, `.cell.active-b`, `.cell.match`.
- Controles: `🔄 Reiniciar`, `Siguiente paso →`, `▶ Auto`, `speed slider` (300–2000ms, default 900ms).
- Comportamiento de `Auto`: debe deshabilitar `Siguiente paso` mientras está reproduciendo y mostrar `playing-badge`.

Esta sección debe servir como plantilla por algoritmo. Al crear cada página, copia el patrón de `doblepuntero.html` y reemplaza la lógica interna de `stepForward()` y `resetDemo()` por la especificada aquí. El `log-box` debe contener mensajes pedagógicos en español en cada paso.
