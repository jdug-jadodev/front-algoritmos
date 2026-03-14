const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
  LevelFormat, PageOrientation
} = require('docx');
const fs = require('fs');

// ─────────────────────────────────────────────────────────────
// DATOS COMPLETOS DE LOS 110 ALGORITMOS
// ─────────────────────────────────────────────────────────────
const algorithms = [
  // ═══ NIVEL 1 ═══
  {
    id: "linear-search", name: "Búsqueda Lineal",
    array: "[3, 7, 1, 9, 4, 6, 2, 8]", target: "6",
    analogy: "Es como buscar tus llaves en casa revisando cajón por cajón. No necesitas que estén ordenados — simplemente vas de principio a fin hasta encontrarlas o confirmar que no están.",
    steps: ["Empieza en el índice 0 (primer elemento)", "Compara el elemento actual con el objetivo", "Si coinciden → ¡Encontrado! Retorna el índice", "Si no coincide → avanza al siguiente (i++)", "Repite hasta llegar al final del arreglo", "Si llegaste al final sin encontrarlo → no existe"],
    logNoMatch: "Revisando índice [L] → valor ARR[L] vs objetivo T. No coincide. Avanzando...",
    logMatch: "¡Encontrado! El valor T está en el índice [L]. Revisé N elemento(s).",
    logEnd: "Recorrí todo el arreglo. El valor T no existe.",
    stepLogic: "Si i < ARR.length: marcar celda i como active-a. Si ARR[i] === target → finalize(true). Sino → i++. Si i >= ARR.length → finalize(false)."
  },
  {
    id: "binary-search", name: "Búsqueda Binaria",
    array: "[1, 3, 5, 7, 9, 11, 14, 17, 20, 24]", target: "14",
    analogy: "Como buscar una palabra en el diccionario: abres por la mitad, ves si la palabra va antes o después, y descartas la mitad que no sirve. Cada vez reduces el problema a la mitad.",
    steps: ["Define L=0 (inicio) y R=n-1 (final)", "Calcula el medio: mid = Math.floor((L+R)/2)", "Si ARR[mid] === target → ¡Encontrado!", "Si ARR[mid] < target → mueve L a mid+1 (busca en mitad derecha)", "Si ARR[mid] > target → mueve R a mid-1 (busca en mitad izquierda)", "Repite hasta que L > R (no existe)"],
    logNoMatch: "mid=[MID] valor ARR[MID]. Target T es [mayor/menor]. Descartando mitad [izquierda/derecha].",
    logMatch: "¡Encontrado! ARR[MID]=T en índice [MID]. Solo revisé N paso(s).",
    logEnd: "L > R. El valor T no existe en el arreglo.",
    stepLogic: "mid = Math.floor((L+R)/2). Marcar L como active-a, R como active-b, mid como match. Si ARR[mid]===target → finalize(true). Si ARR[mid]<target → L=mid+1. Else → R=mid-1. Si L>R → finalize(false)."
  },
  {
    id: "bubble-sort", name: "Ordenamiento Burbuja",
    array: "[5, 3, 8, 1, 9, 2, 7, 4]", target: "N/A (no usa target)",
    analogy: "Como ordenar libros en un estante comparando pares vecinos: si el de la derecha es más pequeño, los intercambias. El más grande 'burbujea' hasta el final con cada pasada.",
    steps: ["Pasada 1: compara pares adyacentes [0,1], [1,2], etc.", "Si ARR[j] > ARR[j+1] → intercambiar (swap)", "Al terminar la pasada, el mayor está al final", "Pasada 2: repite pero hasta n-2 (el último ya está ordenado)", "Continúa hasta que una pasada no haga ningún swap", "El arreglo está ordenado"],
    logNoMatch: "Comparando ARR[j]=A con ARR[j+1]=B. A > B → Intercambiando.",
    logMatch: "Comparando ARR[j]=A con ARR[j+1]=B. A ≤ B → Sin intercambio.",
    logEnd: "Pasada X completada. Arreglo ordenado.",
    stepLogic: "Estado: {i:0, j:0, swapped:false}. Cada step: si j < n-i-1 → comparar ARR[j] y ARR[j+1], si mayor → swap y marcar swapping. j++. Si j>=n-i-1 → i++, j=0. Si i>=n-1 → finalize(true)."
  },
  {
    id: "selection-sort", name: "Ordenamiento por Selección",
    array: "[6, 2, 8, 3, 9, 1, 5, 7]", target: "N/A",
    analogy: "Busca el número más pequeño de toda la lista y ponlo primero. Luego busca el siguiente más pequeño y ponlo segundo. Repite seleccionando siempre el mínimo del resto.",
    steps: ["Para cada posición i desde 0 hasta n-1:", "Busca el índice del mínimo en ARR[i..n-1]", "Intercambia ARR[i] con ARR[minIdx]", "El elemento en posición i ya está en su lugar definitivo", "Avanza i y repite con el subarreglo restante", "Termina cuando i = n-1"],
    logNoMatch: "Buscando mínimo desde índice I. Nuevo mínimo encontrado: ARR[j]=V en índice j.",
    logMatch: "Mínimo de la pasada: ARR[minIdx]=V. Intercambiando con posición I.",
    logEnd: "Todas las posiciones colocadas. Arreglo ordenado.",
    stepLogic: "Estado: {i:0, j:1, minIdx:0}. Cada step: si j<n → comparar ARR[j] con ARR[minIdx], actualizar minIdx si menor. j++. Si j>=n → swap ARR[i] con ARR[minIdx], i++, j=i+1, minIdx=i. Si i>=n-1 → finalize(true)."
  },
  {
    id: "insertion-sort", name: "Ordenamiento por Inserción",
    array: "[4, 7, 2, 9, 1, 5, 8, 3]", target: "N/A",
    analogy: "Como ordenar cartas en la mano: tomas una carta nueva y la insertas en la posición correcta dentro de las que ya tienes ordenadas, desplazando las demás hacia la derecha.",
    steps: ["Empieza con el segundo elemento (índice 1)", "Toma el elemento actual como 'key'", "Compara key con los elementos a su izquierda", "Desplaza los mayores una posición a la derecha", "Inserta key en el hueco que quedó", "Repite para todos los elementos hasta el final"],
    logNoMatch: "key=V. ARR[j]=W > key → desplazando W una posición a la derecha.",
    logMatch: "Insertando key=V en posición J. Subarreglo [0..I] ordenado.",
    logEnd: "Todos los elementos insertados. Arreglo ordenado.",
    stepLogic: "Estado: {i:1, j:0, key:ARR[1], phase:'compare'}. Cada step: si phase=compare y j>=0 y ARR[j]>key → ARR[j+1]=ARR[j], j--. Else → ARR[j+1]=key, i++, key=ARR[i], j=i-1, phase=compare. Si i>=n → finalize(true)."
  },
  {
    id: "merge-sort", name: "Merge Sort",
    array: "[5, 2, 8, 1, 9, 3, 7, 4]", target: "N/A",
    analogy: "Divide la baraja en dos mitades, ordena cada mitad por separado, y luego mezcla las dos mitades ordenadas comparando carta por carta. La magia está en que mezclar dos listas ya ordenadas es muy fácil.",
    steps: ["Divide el arreglo en dos mitades iguales", "Ordena recursivamente la mitad izquierda", "Ordena recursivamente la mitad derecha", "Mezcla (merge) las dos mitades ordenadas", "En merge: compara el primer elemento de cada mitad", "Toma el menor y avanza ese puntero. Repite hasta vaciar ambas mitades"],
    logNoMatch: "Mergeando: tomando A de la izquierda (A ≤ B).",
    logMatch: "Mergeando: tomando B de la derecha (B < A).",
    logEnd: "Merge completado. Subarreglo [L..R] ordenado.",
    stepLogic: "Simular iterativamente con stack de tareas {left, right, phase}. Visualizar el subarreglo activo marcando left-ptr y right-ptr. En merge step, mostrar comparación y resultado."
  },
  {
    id: "quicksort", name: "Quicksort",
    array: "[3, 6, 8, 10, 1, 2, 1]", target: "N/A",
    analogy: "Elige un elemento como 'pivote'. Mueve todos los menores a su izquierda y los mayores a su derecha. El pivote queda en su posición final. Repite con cada mitad.",
    steps: ["Elige el último elemento como pivote", "i = -1 (índice del elemento menor)", "Para cada j de 0 a n-2: si ARR[j] ≤ pivote → i++, swap ARR[i] con ARR[j]", "Al final swap ARR[i+1] con pivote → pivote en posición correcta", "Repite recursivamente con subarreglo izquierdo [0..i]", "Repite recursivamente con subarreglo derecho [i+2..n-1]"],
    logNoMatch: "j=J: ARR[J]=V > pivote P. Sin intercambio.",
    logMatch: "j=J: ARR[J]=V ≤ pivote P. i++. Swap ARR[I] con ARR[J].",
    logEnd: "Pivote P colocado en posición definitiva [POS].",
    stepLogic: "Estado: {stack: [{lo:0, hi:n-1}], i:-1, j:0, pivot:ARR[n-1], phase:'partition'}. Cada step avanza j comparando con pivot."
  },
  {
    id: "heapsort", name: "Heapsort",
    array: "[4, 10, 3, 5, 1, 8, 2, 7]", target: "N/A",
    analogy: "Construye una pirámide donde cada padre es mayor que sus hijos (max-heap). El tope de la pirámide es siempre el máximo. Extrae el máximo, reordena la pirámide, repite.",
    steps: ["Construir max-heap desde el arreglo (heapify)", "El elemento máximo está en ARR[0]", "Swap ARR[0] con el último elemento", "Reduce el tamaño del heap en 1", "Restaura la propiedad heap en la raíz (sift-down)", "Repite pasos 3-5 hasta que el heap tenga 1 elemento"],
    logNoMatch: "Heapify: ARR[I]=V < hijo ARR[J]=W. Bajando V.",
    logMatch: "Max extraído: V. Colocado en posición FINAL.",
    logEnd: "Heap vaciado. Arreglo ordenado.",
    stepLogic: "Dos fases: build-heap (n/2 heapify calls) y extract-max (n-1 swaps + heapify). Visualizar heap como árbol simplificado o como arreglo con marcas."
  },
  {
    id: "counting-sort", name: "Counting Sort",
    array: "[4, 2, 2, 8, 3, 3, 1, 4, 8, 2]", target: "N/A",
    analogy: "Cuenta cuántas veces aparece cada número (como contar votos). Luego reconstruye el arreglo poniendo cada número tantas veces como fue contado, en orden.",
    steps: ["Encuentra el valor máximo en el arreglo", "Crea arreglo 'count' de tamaño max+1, inicializado en 0", "Cuenta ocurrencias: count[ARR[i]]++", "Convierte a conteos acumulativos: count[i] += count[i-1]", "Construye el arreglo de salida usando count", "Copia el resultado al arreglo original"],
    logNoMatch: "Contando: ARR[I]=V → count[V]++ = C.",
    logMatch: "Reconstruyendo: colocando V en posición count[V]-1 = P.",
    logEnd: "Arreglo reconstruido. Conteo completado.",
    stepLogic: "Tres fases visualizadas: fase-count (recorrer ARR), fase-acum (recorrer count), fase-output (colocar elementos). Mostrar arreglo count junto al ARR principal."
  },
  {
    id: "radix-sort", name: "Radix Sort",
    array: "[170, 45, 75, 90, 802, 24, 2, 66]", target: "N/A",
    analogy: "Ordena números dígito a dígito de derecha a izquierda. Primero ordena por las unidades, luego por las decenas, luego por las centenas. Cada pasada deja un orden más refinado.",
    steps: ["Encuentra el número de dígitos del máximo", "Para cada posición de dígito (unidades, decenas, etc.):", "Aplica counting sort estable usando ese dígito", "El orden de pasadas previas se preserva (estabilidad)", "Después de procesar todos los dígitos → ordenado", "Solo funciona correctamente con sort estable"],
    logNoMatch: "Pasada dígito D: ordenando por dígito en posición D.",
    logMatch: "Elemento V → dígito en posición D = X. Colocado en bucket X.",
    logEnd: "Pasada D completada. Todos los dígitos procesados → ordenado.",
    stepLogic: "Mostrar 'digit = Math.floor(ARR[i] / 10^d) % 10'. Visualizar los buckets [0-9] durante cada pasada. Tres pasadas para este arreglo (unidades, decenas, centenas)."
  },
  {
    id: "arrays", name: "Estructura: Arreglo",
    array: "[10, 20, 30, 40, 50, 60, 70, 80]", target: "3 (índice a consultar)",
    analogy: "Como una fila de casilleros numerados en un gimnasio. Cada casillero tiene un número (índice) y guardar o sacar algo de cualquier casillero cuesta siempre el mismo tiempo, sin importar cuál sea.",
    steps: ["Acceso: ARR[i] → directo, O(1)", "Inserción al final: ARR[n] = val → O(1)", "Inserción en medio: desplazar elementos → O(n)", "Eliminación en medio: desplazar elementos → O(n)", "Búsqueda sin orden: revisar uno a uno → O(n)", "Búsqueda con orden: usar búsqueda binaria → O(log n)"],
    logNoMatch: "Operación: acceso a índice I. Valor: ARR[I]=V. Tiempo: O(1).",
    logMatch: "Inserción en índice I. Desplazando N-I elementos. Tiempo: O(n).",
    logEnd: "Operaciones demostradas. Memoria: contigua. Tamaño fijo.",
    stepLogic: "Demo interactivo de operaciones: highlight de índice consultado, simulación visual de inserción con desplazamiento, eliminación con compactación."
  },
  {
    id: "linked-list", name: "Lista Enlazada",
    array: "[A→B→C→D→E→F→null]", target: "D (nodo a buscar)",
    analogy: "Como una cadena de personas donde cada una sabe quién está justo detrás de ella, pero no puede saltar directamente a la quinta. Para llegar al quinto debes pasar por el primero, segundo, tercero...",
    steps: ["Cada nodo tiene: valor + puntero al siguiente", "Acceso: debes recorrer desde head → O(n)", "Inserción al inicio: nuevo.next = head, head = nuevo → O(1)", "Inserción en medio: recorre hasta posición → O(n)", "Eliminación: actualiza puntero del nodo anterior → O(n)", "No hay índices; navegas siguiendo los punteros"],
    logNoMatch: "Recorriendo: nodo actual = N. Buscando D. Siguiendo puntero →",
    logMatch: "¡Nodo D encontrado! Revisé K nodos.",
    logEnd: "Fin de lista (null). El nodo buscado no existe.",
    stepLogic: "Visualizar nodos como cajas con flechas. Resaltar nodo 'current' con active-a. Animar el salto de puntero en cada step."
  },
  {
    id: "stack", name: "Pila (Stack)",
    array: "Operaciones: PUSH 5, PUSH 3, PUSH 8, POP, PUSH 1, POP, POP", target: "N/A",
    analogy: "Como una pila de platos: solo puedes agregar o quitar platos por arriba. El último plato que pusiste es el primero que puedes quitar (LIFO: Last In, First Out).",
    steps: ["PUSH(val): coloca val en la cima → O(1)", "POP(): retira y retorna el elemento de la cima → O(1)", "PEEK()/TOP(): mira la cima sin quitar → O(1)", "isEmpty(): ¿la pila está vacía? → O(1)", "Usos: deshacer (Ctrl+Z), llamadas a funciones, paréntesis balanceados", "Error si haces POP en pila vacía (stack underflow)"],
    logNoMatch: "PUSH V: colocando V en la cima. Tamaño: N.",
    logMatch: "POP: extrayendo V de la cima. Tamaño: N.",
    logEnd: "Todas las operaciones ejecutadas.",
    stepLogic: "Visualizar la pila verticalmente. Cada PUSH añade celda arriba con animación. Cada POP la elimina. Mostrar puntero 'top'."
  },
  {
    id: "queue", name: "Cola (Queue)",
    array: "Operaciones: ENQUEUE 5, ENQUEUE 3, DEQUEUE, ENQUEUE 8, DEQUEUE, ENQUEUE 1", target: "N/A",
    analogy: "Como una fila de supermercado: el primero en llegar es el primero en ser atendido (FIFO: First In, First Out). No puedes colarte; entras por el final y sales por el frente.",
    steps: ["ENQUEUE(val): agrega val al final → O(1)", "DEQUEUE(): retira y retorna el elemento del frente → O(1)", "FRONT(): mira el frente sin quitar → O(1)", "isEmpty(): ¿la cola está vacía? → O(1)", "Usos: procesamiento de tareas, BFS, impresión", "Error si haces DEQUEUE en cola vacía"],
    logNoMatch: "ENQUEUE V: agregando V al final. Cola: [...].",
    logMatch: "DEQUEUE: extrayendo V del frente. Cola: [...].",
    logEnd: "Todas las operaciones ejecutadas.",
    stepLogic: "Visualizar cola horizontalmente con head a la izquierda y tail a la derecha. ENQUEUE añade celda a la derecha. DEQUEUE quita celda de la izquierda."
  },
  {
    id: "deque", name: "Cola Doble (Deque)",
    array: "Operaciones: pushBack 5, pushFront 3, pushBack 8, popFront, popBack", target: "N/A",
    analogy: "Como un tubo abierto por ambos extremos: puedes meter o sacar elementos por cualquiera de los dos lados. Combina stack y queue en una sola estructura.",
    steps: ["pushFront(val): agrega al inicio → O(1)", "pushBack(val): agrega al final → O(1)", "popFront(): quita del inicio → O(1)", "popBack(): quita del final → O(1)", "peekFront() / peekBack(): mirar sin quitar → O(1)", "Útil para: monotonic deque, sliding window, palíndromos"],
    logNoMatch: "pushBack V: agregando V al final. Deque: [...].",
    logMatch: "popFront: extrayendo del frente. Deque: [...].",
    logEnd: "Todas las operaciones ejecutadas.",
    stepLogic: "Visualizar como una lista horizontal. Mostrar punteros 'front' y 'back' en los extremos. Cada operación anima la celda que entra/sale."
  },
  {
    id: "hash-table", name: "Tabla Hash",
    array: "Claves: 'manzana'→1.50, 'pera'→2.00, 'uva'→3.50, 'mango'→4.00", target: "'pera' (buscar)",
    analogy: "Como un armario con cajones etiquetados por letra: si guardas 'manzana', va al cajón M. Para encontrarla, calculas la misma letra y vas directo. No revisas todos los cajones.",
    steps: ["hash(clave) → índice del bucket", "Insertar: calcula hash, guarda en bucket[hash]", "Buscar: calcula hash, ve a bucket[hash], busca la clave", "Colisión: cuando dos claves tienen el mismo hash", "Resolver colisión: chaining (lista en el bucket) o probing", "Factor de carga: n/capacidad. Si > 0.7 → redimensionar"],
    logNoMatch: "Buscando 'K'. hash('K') = H. Revisando bucket[H].",
    logMatch: "¡Encontrado! 'K' → V en bucket[H].",
    logEnd: "Clave no encontrada en ningún bucket.",
    stepLogic: "Visualizar una tabla de buckets (8-10 slots). Animar el cálculo del hash y el salto al bucket correcto. Mostrar colisiones si las hay."
  },
  {
    id: "recursion-basic", name: "Recursión Básica",
    array: "factorial(5) = 5 × 4 × 3 × 2 × 1", target: "5 (calcular 5!)",
    analogy: "Como las muñecas rusas (matryoshka): abres una y adentro hay otra más pequeña. Sigues abriendo hasta llegar a la más pequeña. Luego cierras de adentro hacia afuera.",
    steps: ["Caso base: la condición que para la recursión", "Caso recursivo: la función se llama a sí misma con un problema más pequeño", "factorial(n) = n × factorial(n-1)", "factorial(0) = 1 (caso base)", "Cada llamada se apila en el call stack", "Al llegar al caso base, las llamadas se resuelven de vuelta"],
    logNoMatch: "Llamando factorial(N). N > 0, no es caso base. Apilando...",
    logMatch: "factorial(0) = 1. ¡Caso base alcanzado! Resolviendo hacia atrás.",
    logEnd: "factorial(5) = 120. Stack vaciado.",
    stepLogic: "Visualizar el call stack creciendo hacia arriba con cada llamada recursiva. Al llegar al caso base, resolver y desapilar mostrando el valor de retorno."
  },
  {
    id: "permutations", name: "Permutaciones",
    array: "['A', 'B', 'C']", target: "N/A (generar todas: ABC, ACB, BAC, BCA, CAB, CBA)",
    analogy: "Cuántas formas diferentes puedes ordenar 3 personas en una fila? Primero decides quién va al frente (3 opciones), luego quién va en medio (2 opciones), luego el último (1 opción). Total: 3×2×1 = 6.",
    steps: ["Para cada posición, elige un elemento no usado", "Márcalo como 'usado' y avanza a la siguiente posición", "Cuando llenas todas las posiciones → permutación completa", "Desmarca el elemento (backtrack) y prueba el siguiente", "Repite hasta agotar todas las opciones de cada posición", "Total de permutaciones: n! (n factorial)"],
    logNoMatch: "Posición P: probando elemento E. Arreglo actual: [...].",
    logMatch: "¡Permutación completa: [...]! Total encontradas: N.",
    logEnd: "Todas las N! permutaciones generadas.",
    stepLogic: "Visualizar el arreglo actual construyéndose posición a posición. Cuando se hace backtrack, mostrar que la última posición se desmarca."
  },
  {
    id: "n-queens", name: "N-Queens (Backtracking)",
    array: "Tablero 4×4, colocar 4 reinas sin que se ataquen", target: "N/A",
    analogy: "Intentas colocar reinas en un ajedrez sin que ninguna amenace a otra. Si una reina no encaja, la quitas y pruebas otra posición. Siempre que algo no funciona, retrocedes y lo intentas diferente.",
    steps: ["Coloca reinas fila por fila (una por fila)", "Para cada columna en la fila actual: ¿es segura?", "Verifica: no hay otra reina en misma columna ni diagonal", "Si es segura → coloca la reina, avanza a la siguiente fila", "Si ninguna columna es segura → retrocede (backtrack) a la fila anterior", "Si llenas todas las filas → solución encontrada"],
    logNoMatch: "Fila R, col C: ¡Conflicto! Hay reina en col/diagonal. Probando siguiente.",
    logMatch: "Fila R, col C: ¡Segura! Colocando reina. Avanzando a fila R+1.",
    logEnd: "¡Solución encontrada! Reinas colocadas sin conflictos.",
    stepLogic: "Visualizar tablero 4×4. Marcar celdas con reina, celdas amenazadas, y celda que se está intentando. Backtrack muestra remoción de reina."
  },

  // ═══ NIVEL 2 ═══
  {
    id: "bst", name: "Árbol Binario de Búsqueda (BST)",
    array: "Insertar en orden: 5, 3, 7, 1, 4, 6, 8", target: "4 (buscar)",
    analogy: "Como el juego de adivinar un número: ¿es mayor o menor que 50? Si es menor, olvidas la mitad superior. Cada pregunta divide el espacio a la mitad. El árbol hace esto automáticamente.",
    steps: ["Raíz: primer elemento insertado", "Insertar N: si N < nodo → ir izquierda; si N > nodo → ir derecha", "Repetir hasta encontrar hueco vacío → insertar ahí", "Buscar N: mismo proceso, si encontramos N → hallado", "Si llegamos a null → N no existe en el árbol", "Nodo izquierdo siempre < padre < nodo derecho"],
    logNoMatch: "Nodo actual: N. Buscando T. T [</>] N → yendo a [izquierda/derecha].",
    logMatch: "¡Encontrado! Valor T en el nodo.",
    logEnd: "Llegamos a null. T no existe en el BST.",
    stepLogic: "Visualizar árbol como celdas conectadas con líneas. Resaltar nodo actual con active-a. Al ir izquierda/derecha, mostrar la dirección elegida."
  },
  {
    id: "two-pointers", name: "Two Pointers",
    array: "[1, 3, 5, 7, 9, 11, 14, 17]", target: "16",
    analogy: "Como dos personas buscando dos páginas en un libro cuyas palabras sumen 10: uno empieza al inicio y otro al final. Si la suma es muy grande, el de la derecha retrocede. Si es muy pequeña, el de la izquierda avanza.",
    steps: ["Coloca L=0 y R=n-1", "Calcula suma = ARR[L] + ARR[R]", "Si suma === target → ¡Encontrado!", "Si suma > target → R-- (necesitas un número más pequeño)", "Si suma < target → L++ (necesitas un número más grande)", "Si L >= R sin encontrar → no existe el par"],
    logNoMatch: "L=ARR[L] + R=ARR[R] = SUMA. [Mayor/Menor] que TARGET. Moviendo [R←/→L].",
    logMatch: "¡Par encontrado! ARR[L] + ARR[R] = TARGET.",
    logEnd: "L >= R. No existe par que sume TARGET.",
    stepLogic: "Igual que doblepuntero.html (ya implementado). Este es el algoritmo de referencia."
  },
  {
    id: "sliding-window", name: "Ventana Deslizante",
    array: "[2, 1, 5, 1, 3, 2, 3, 1, 2]", target: "k=3 (suma máxima de subarray de tamaño 3)",
    analogy: "Como una ventana de tren que muestra 3 postes a la vez: cuando avanzas, entra un poste nuevo por la derecha y sale uno por la izquierda. No necesitas recalcular todo, solo ajustas lo que cambia.",
    steps: ["Calcula la suma de los primeros k elementos (ventana inicial)", "Guarda como maxSum", "Desliza la ventana: suma += ARR[r] - ARR[l-1]", "Actualiza maxSum si suma > maxSum", "Avanza l y r en 1", "Repite hasta que r llega al final"],
    logNoMatch: "Ventana [L..R]: suma=S. maxSum sigue siendo M.",
    logMatch: "Ventana [L..R]: suma=S. ¡Nuevo máximo! maxSum=S.",
    logEnd: "Ventana llegó al final. Suma máxima: M en ventana [X..Y].",
    stepLogic: "Resaltar la ventana activa (k celdas consecutivas) con active-a. Mostrar el elemento que entra (derecha, active-b) y el que sale (izquierda, visited). Mostrar suma actual y maxSum."
  },
  {
    id: "bfs", name: "BFS (Búsqueda en Anchura)",
    array: "Grafo: 0→[1,2], 1→[3,4], 2→[5], 3→[], 4→[], 5→[]", target: "Nodo 5 (buscar desde 0)",
    analogy: "Como las ondas que hace una piedra en el agua: primero se expanden los vecinos más cercanos, luego los vecinos de los vecinos, y así sucesivamente. Visita todos los nodos a distancia 1 antes de los de distancia 2.",
    steps: ["Agrega el nodo inicial a la cola. Márcalo como visitado.", "Mientras la cola no esté vacía:", "Saca el primer nodo (dequeue)", "Procésalo (¿es el que buscamos?)", "Agrega todos sus vecinos NO visitados a la cola", "Marca esos vecinos como visitados"],
    logNoMatch: "Procesando nodo N (dist D). Agregando vecinos no visitados: [V1, V2].",
    logMatch: "¡Nodo objetivo encontrado! Distancia desde origen: D.",
    logEnd: "Cola vacía. El nodo objetivo no es alcanzable.",
    stepLogic: "Visualizar grafo como celdas con conexiones. Mostrar la cola de manera visual. Colorear nodos: no visitado (gris), en cola (naranja), visitado (verde)."
  },
  {
    id: "dfs", name: "DFS (Búsqueda en Profundidad)",
    array: "Grafo: 0→[1,2], 1→[3,4], 2→[5], 3→[], 4→[], 5→[]", target: "Nodo 5 (buscar desde 0)",
    analogy: "Como explorar un laberinto siguiendo siempre la pared izquierda: vas tan profundo como puedes por un camino. Si llegas a un callejón sin salida, retrocedes al último cruce y pruebas otro camino.",
    steps: ["Visita el nodo inicial. Márcalo como visitado.", "Para cada vecino no visitado del nodo actual:", "Llama DFS recursivamente en ese vecino", "Al retornar, continúa con el siguiente vecino", "Si no hay vecinos no visitados → backtrack", "Continúa hasta visitar todos los nodos alcanzables"],
    logNoMatch: "Visitando nodo N. Explorando vecino V (no visitado).",
    logMatch: "¡Nodo objetivo N encontrado en profundidad D!",
    logEnd: "DFS completado. Todos los nodos alcanzables visitados.",
    stepLogic: "Visualizar grafo. Mostrar pila de llamadas (call stack) al lado. Colorear: no visitado, en proceso (stack), completado."
  },
  {
    id: "topological-sort", name: "Ordenación Topológica",
    array: "Tareas: A→[C,D], B→[D,E], C→[F], D→[F], E→[F], F→[]", target: "N/A (orden válido)",
    analogy: "Como planificar tareas con dependencias: 'estudiar' antes de 'presentar examen', 'despertarse' antes de 'desayunar'. Debes respetar el orden de dependencias. Hay múltiples órdenes válidos.",
    steps: ["Calcula el 'in-degree' de cada nodo (cuántas flechas entran)", "Agrega a la cola todos los nodos con in-degree = 0", "Saca un nodo de la cola → es el siguiente en el orden", "Reduce el in-degree de sus vecinos en 1", "Si algún vecino llega a in-degree 0 → agrégalo a la cola", "Repite hasta vaciar la cola. Si hay ciclo → imposible"],
    logNoMatch: "Procesando nodo N. Reduciendo in-degree de vecino V: ahora D.",
    logMatch: "Nodo V tiene in-degree 0. Agregando a la cola.",
    logEnd: "Orden topológico: [A, B, C, D, E, F].",
    stepLogic: "Mostrar el grafo con in-degrees visibles. La cola de procesamiento lateral. El orden topológico construyéndose elemento a elemento."
  },
  {
    id: "dijkstra", name: "Dijkstra",
    array: "Grafo con pesos: 0→1(4), 0→2(1), 2→1(2), 1→3(1), 2→3(5)", target: "Distancias mínimas desde nodo 0",
    analogy: "Como un GPS que encuentra la ruta más corta: siempre expande primero el camino más barato que tienes disponible. Nunca te arrepientes de un camino ya elegido (con pesos positivos).",
    steps: ["Inicializa dist[origen]=0, dist[todos los demás]=∞", "Usa una min-heap (priority queue)", "Extrae el nodo con menor distancia conocida", "Para cada vecino: si dist[nodo]+peso < dist[vecino] → actualiza", "Agrega vecino actualizado a la heap", "Repite hasta procesar todos los nodos"],
    logNoMatch: "Procesando nodo N (dist D). Vecino V: dist actual INF > D+W. Actualizando a D+W.",
    logMatch: "Vecino V: dist actual X ≤ D+W. Sin actualización.",
    logEnd: "Distancias mínimas calculadas. dist[]=[...]",
    stepLogic: "Mostrar grafo con pesos en aristas. Tabla de distancias actualizándose. Colorear nodos: sin procesar, en heap, definitivo."
  },
  {
    id: "bellman-ford", name: "Bellman-Ford",
    array: "Grafo: 0→1(4), 0→2(5), 1→3(-3), 2→1(-4), 2→3(2)", target: "Distancias desde nodo 0",
    analogy: "Como Dijkstra pero más paciente: en lugar de ir al más barato primero, relaja TODAS las aristas una y otra vez. Tarda más pero puede manejar pesos negativos y detectar ciclos negativos.",
    steps: ["Inicializa dist[origen]=0, dist[otros]=∞", "Repite n-1 veces:", "Para cada arista (u,v,w): si dist[u]+w < dist[v] → dist[v]=dist[u]+w", "Después de n-1 iteraciones, las distancias son correctas", "Iteración n: si aún hay actualización → ciclo negativo detectado", "Con ciclos negativos, no hay camino mínimo definido"],
    logNoMatch: "Iter I, arista (U→V, peso W): dist[U]+W = X < dist[V]=Y. Actualizando.",
    logMatch: "Iter I, arista (U→V): sin mejora. dist[V]=Y ≤ dist[U]+W=X.",
    logEnd: "N-1 iteraciones completadas. Distancias mínimas estables.",
    stepLogic: "Mostrar contador de iteración actual. Recorrer todas las aristas resaltando la que se procesa. Actualizar tabla de distancias visualmente."
  },
  {
    id: "knapsack", name: "Mochila 0/1 (Knapsack)",
    array: "Items: [{peso:2,val:6},{peso:2,val:10},{peso:3,val:12}]. Capacidad: 5", target: "Maximizar valor",
    analogy: "Empacar una maleta con límite de peso: tienes objetos con diferente peso y valor. ¿Qué llevas para que la suma de valores sea máxima sin exceder el peso permitido?",
    steps: ["Crea tabla dp[n+1][W+1] inicializada en 0", "Para cada item i y cada capacidad w:", "Si peso[i] > w → dp[i][w] = dp[i-1][w] (no cabe)", "Si peso[i] ≤ w → dp[i][w] = max(dp[i-1][w], val[i]+dp[i-1][w-peso[i]])", "La respuesta está en dp[n][W]", "Rastrear qué items se incluyeron (backtrace)"],
    logNoMatch: "Item I (peso P, val V). Capacidad W. P>W → No cabe. dp[I][W]=dp[I-1][W]=X.",
    logMatch: "Item I (peso P, val V). Capacidad W. Max(sin_item=X, con_item=Y). dp[I][W]=Z.",
    logEnd: "Tabla DP completada. Valor máximo: dp[N][W]=R.",
    stepLogic: "Visualizar la tabla dp como una cuadrícula. Resaltar la celda que se está calculando. Mostrar los items disponibles arriba."
  },
  {
    id: "lis", name: "LIS (Longest Increasing Subsequence)",
    array: "[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]", target: "N/A (encontrar LIS)",
    analogy: "Busca la secuencia más larga de números que va siempre en aumento (sin importar que sean consecutivos en el arreglo). Como escalar escalones: siempre hacia arriba, aunque te saltes algunos.",
    steps: ["dp[i] = longitud de LIS que termina en índice i", "Para cada i, revisa todos los j < i", "Si ARR[j] < ARR[i] → dp[i] = max(dp[i], dp[j]+1)", "Inicialmente dp[i] = 1 (solo el elemento mismo)", "La respuesta es el máximo de todo el arreglo dp", "Reconstruir la subsequencia con backtrace"],
    logNoMatch: "i=I, j=J: ARR[J]=A < ARR[I]=B. dp[I] = max(dp[I], dp[J]+1) = N.",
    logMatch: "i=I: dp[I]=N. LIS más larga hasta aquí: N.",
    logEnd: "LIS calculada. Longitud máxima: L. Subsequencia: [...].",
    stepLogic: "Mostrar arreglo ARR y arreglo dp en paralelo. Resaltar con active-a el índice i actual, con active-b el j que se evalúa."
  },
  {
    id: "lcs", name: "LCS (Longest Common Subsequence)",
    array: "S1='ABCBDAB', S2='BDCAB'", target: "N/A (LCS='BCAB' o 'BDAB')",
    analogy: "Encuentra las letras en común que aparecen en el mismo orden en ambas palabras. Como buscar el hilo conductor entre dos historias: qué eventos ocurren en el mismo orden en ambas.",
    steps: ["Crea tabla dp[m+1][n+1] inicializada en 0", "Para cada i,j: si S1[i]===S2[j] → dp[i][j]=dp[i-1][j-1]+1", "Si S1[i]!==S2[j] → dp[i][j]=max(dp[i-1][j], dp[i][j-1])", "La respuesta está en dp[m][n]", "Reconstruir LCS con backtrace diagonal/arriba/izquierda", "Longitud de LCS = dp[m][n]"],
    logNoMatch: "i=I, j=J: S1[I]=A ≠ S2[J]=B. dp[I][J]=max(dp[I-1][J], dp[I][J-1])=N.",
    logMatch: "i=I, j=J: S1[I]=A = S2[J]. dp[I][J]=dp[I-1][J-1]+1=N.",
    logEnd: "LCS calculada. Longitud: N. Subsequencia: '[...]'.",
    stepLogic: "Visualizar tabla dp como cuadrícula con S1 en filas y S2 en columnas. Resaltar celda activa. Colorear celdas donde los chars coinciden."
  },
  {
    id: "dp-memoization", name: "DP con Memoización",
    array: "Fibonacci: fib(8) = fib(7) + fib(6) = ...", target: "fib(8) = 21",
    analogy: "Como resolver un crucigrama: si ya escribiste la palabra de 5 letras, no la piensas de nuevo cuando la necesitas en otra pista. Guardas los resultados que ya calculaste para no repetir el trabajo.",
    steps: ["Define la función recursiva con memoización", "Antes de calcular, revisa si ya está en el memo/cache", "Si está → retorna el valor guardado (O(1))", "Si no está → calcula, guarda en memo, retorna", "fib(n) = fib(n-1) + fib(n-2), memo[0]=0, memo[1]=1", "Sin memo: O(2^n). Con memo: O(n)"],
    logNoMatch: "fib(N): no está en memo. Calculando fib(N-1) + fib(N-2)...",
    logMatch: "fib(N): ¡ya está en memo! Retornando V directamente.",
    logEnd: "fib(8)=21. Memo usó N lookups. Sin memo serían 2^8=256 llamadas.",
    stepLogic: "Mostrar árbol de llamadas. Resaltar en verde las llamadas que usan el cache (memo hit). Mostrar el diccionario memo actualizándose."
  },
  {
    id: "quickselect", name: "Quickselect",
    array: "[3, 2, 1, 5, 6, 4]", target: "k=2 (encontrar el 2do mayor = 5)",
    analogy: "Como quicksort, pero solo te importa encontrar el k-ésimo elemento. Después de particionar, sabes en qué mitad está tu respuesta y descartas la otra. No necesitas ordenar todo.",
    steps: ["Elige un pivote y particiona el arreglo", "Si el pivote queda en posición k → ¡es la respuesta!", "Si pivote.pos > k → repite solo con la mitad izquierda", "Si pivote.pos < k → repite solo con la mitad derecha", "Caso promedio: O(n). Peor caso: O(n²)", "Para garantizar O(n): usa 'median of medians' para elegir pivote"],
    logNoMatch: "Pivote P en posición POS. k=K. POS [>/</=] K → buscando en mitad [der/izq/encontrado].",
    logMatch: "¡Pivote P está en posición K! Es el K-ésimo elemento.",
    logEnd: "K-ésimo elemento encontrado: V.",
    stepLogic: "Similar a quicksort pero mostrar qué subarreglo se descarta en cada paso. Resaltar el pivote con match color."
  },
  {
    id: "interval-scheduling", name: "Interval Scheduling (Greedy)",
    array: "Intervalos: [1-4], [2-5], [3-6], [5-7], [6-8], [4-9]", target: "Máximo de intervalos no solapados",
    analogy: "Tienes salas de reuniones y muchas reuniones para agendar. Para meter el mayor número de reuniones sin solapamiento, siempre elige la que termina más pronto. Deja el mayor tiempo libre para las siguientes.",
    steps: ["Ordena los intervalos por su tiempo de fin", "Selecciona el primer intervalo (el que termina antes)", "Para cada intervalo siguiente: si su inicio >= fin del último seleccionado → selecciónalo", "Si se solapa → descártalo", "Repite hasta revisar todos los intervalos", "La selección greedy es óptima (demostrable por intercambio)"],
    logNoMatch: "Intervalo [A-B]: inicio A < fin_último F. ¡Solapamiento! Descartando.",
    logMatch: "Intervalo [A-B]: inicio A >= fin_último F. ¡Sin solapamiento! Seleccionando.",
    logEnd: "Seleccionados N intervalos: [...]. Máximo posible.",
    stepLogic: "Visualizar intervalos como barras horizontales en una línea de tiempo. Colorear seleccionados (verde), descartados (rojo), pendientes (gris)."
  },
  {
    id: "union-find", name: "Union-Find (DSU)",
    array: "Nodos: 0,1,2,3,4,5,6. Uniones: (0,1),(2,3),(4,5),(0,2),(3,6)", target: "¿Están 1 y 6 conectados?",
    analogy: "Como grupos de amigos: si Ana y Beto son amigos, y Beto y Carlos son amigos, los tres están en el mismo grupo. Find te dice a qué grupo perteneces. Union fusiona dos grupos.",
    steps: ["Inicializa: cada nodo es su propio padre (parent[i]=i)", "Find(x): sigue los padres hasta llegar a la raíz", "Path compression: parent[x] = raíz directamente", "Union(x,y): find(x) y find(y), une las raíces", "Union by rank: la raíz de menor rank apunta a la de mayor", "Amortizado casi O(1) por operación"],
    logNoMatch: "Find(N): parent[N]=P. Siguiendo a P...",
    logMatch: "Union(A,B): raíces RA y RB. Uniendo RB bajo RA.",
    logEnd: "Find(1)=R1, Find(6)=R2. R1 [=/≠] R2 → [sí/no] conectados.",
    stepLogic: "Visualizar los nodos como árbol de padres. Mostrar path compression animado. Mostrar los componentes conexos con colores."
  },
  {
    id: "kmp", name: "KMP (Knuth-Morris-Pratt)",
    array: "Texto: 'ABABDABACDABABCABAB'. Patrón: 'ABABCABAB'", target: "Encontrar patrón en texto",
    analogy: "Como buscar una palabra en un libro sin empezar desde cero cada vez. Si fallas en la letra 5, usas lo que ya sabías de las letras 1-4 para no retroceder tanto. El 'truco' está en la tabla de fallos.",
    steps: ["Construye la tabla LPS (Longest Proper Prefix which is Suffix)", "Recorre el texto con un puntero i, el patrón con j", "Si texto[i]===patrón[j] → i++, j++", "Si j===m → ¡patrón encontrado en posición i-j!", "Si texto[i]!==patrón[j]: si j>0 → j=LPS[j-1]; else i++", "La tabla LPS evita retroceder i"],
    logNoMatch: "i=I, j=J: texto[I]=A ≠ patrón[J]=B. j=LPS[J-1]=K. Continuando.",
    logMatch: "i=I, j=J: texto[I]=A = patrón[J]. Avanzando ambos.",
    logEnd: "¡Patrón encontrado en posición P del texto!",
    stepLogic: "Mostrar texto y patrón alineados. Resaltar posición actual con active-a (texto) y active-b (patrón). Mostrar tabla LPS."
  },
  {
    id: "edit-distance", name: "Edit Distance (Levenshtein)",
    array: "S1='kitten', S2='sitting'", target: "Distancia = 3",
    analogy: "¿Cuántos cambios mínimos (insertar, borrar, sustituir una letra) necesitas para transformar 'kitten' en 'sitting'? Es como contar los pasos mínimos de un laberinto de letras.",
    steps: ["dp[i][j] = distancia entre S1[0..i] y S2[0..j]", "Caso base: dp[0][j]=j (insertar j chars), dp[i][0]=i (borrar i chars)", "Si S1[i]===S2[j] → dp[i][j]=dp[i-1][j-1] (sin operación)", "Si S1[i]!==S2[j] → dp[i][j]=1+min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])", "dp[i-1][j]: borrar. dp[i][j-1]: insertar. dp[i-1][j-1]: sustituir", "Respuesta: dp[m][n]"],
    logNoMatch: "i=I, j=J: S1[I]=A ≠ S2[J]=B. min(borrar=X, insertar=Y, sustituir=Z)+1=N.",
    logMatch: "i=I, j=J: S1[I]=A = S2[J]. dp[I][J]=dp[I-1][J-1]=N (sin costo).",
    logEnd: "Distancia mínima de edición: dp[M][N]=D.",
    stepLogic: "Visualizar tabla dp como cuadrícula. S1 en filas, S2 en columnas. Resaltar celda activa. Mostrar qué operación se eligió con flechas."
  },

  // ═══ NIVEL 3 (selección de los más visualizables) ═══
  {
    id: "segment-tree", name: "Segment Tree",
    array: "[2, 4, 5, 7, 2, 3, 1, 6, 8, 9]", target: "Consulta suma [2..6], Actualizar índice 3 = 10",
    analogy: "Como un índice de un libro que agrupa capítulos: el índice principal resume todo el libro, sub-índices resumen mitades, etc. Para sumar un rango, combinas solo los bloques relevantes.",
    steps: ["Construye árbol donde hoja i = ARR[i]", "Cada nodo interno = suma de sus hijos", "Query(l,r): combina segmentos que cubren [l,r]", "Update(i,val): actualiza la hoja i y recalcula los ancestros", "Build: O(n). Query: O(log n). Update: O(log n)", "Útil para sumas, mínimos, máximos de rangos con actualizaciones"],
    logNoMatch: "Query [L..R]: nodo actual cubre [NL..NR]. Parcialmente dentro. Dividiendo.",
    logMatch: "Nodo cubre [NL..NR] ⊆ [L..R]. Retornando valor N directamente.",
    logEnd: "Resultado de la consulta: V.",
    stepLogic: "Visualizar el árbol como niveles de nodos. En query, colorear nodos usados vs descartados. En update, mostrar el camino de la hoja a la raíz."
  },
  {
    id: "floyd-warshall", name: "Floyd-Warshall",
    array: "Matriz 4×4: [[0,3,∞,7],[8,0,2,∞],[5,∞,0,1],[2,∞,∞,0]]", target: "Caminos mínimos entre todos los pares",
    analogy: "Pregúntate: ¿hay un 'puente' intermedio que acorte el camino? Para cada posible punto intermedio k, revisa si ir A→k→B es más corto que A→B directo.",
    steps: ["Inicializa dist[i][j] con los pesos de las aristas", "Para cada nodo k como posible intermedio:", "Para cada par (i,j): si dist[i][k]+dist[k][j] < dist[i][j]", "Actualiza dist[i][j] = dist[i][k]+dist[k][j]", "Después de n iteraciones → todas las distancias mínimas", "Detectar ciclos negativos: si dist[i][i] < 0"],
    logNoMatch: "k=K, i=I, j=J: dist[I][K]+dist[K][J]=X ≥ dist[I][J]=Y. Sin mejora.",
    logMatch: "k=K, i=I, j=J: X < Y. ¡Actualizar! dist[I][J]=X (vía nodo K).",
    logEnd: "Iteración k=K completa. Matriz actualizada.",
    stepLogic: "Mostrar la matriz de distancias como cuadrícula. Resaltar fila K, columna K, y la celda (I,J) que se actualiza. Cambiar valor con animación."
  },
  {
    id: "bitmask-dp", name: "Bitmask DP",
    array: "TSP: 4 ciudades, matriz de distancias [[0,10,15,20],[10,0,35,25],[15,35,0,30],[20,25,30,0]]", target: "Mínimo recorrido que visita todas las ciudades",
    analogy: "Usa un número binario para representar qué ciudades ya visitaste. 0101 significa que visitaste las ciudades 0 y 2. Así puedes guardar el estado de 'qué he visitado' en un solo número.",
    steps: ["mask = bitmask de ciudades visitadas", "dp[mask][i] = costo mínimo de llegar a ciudad i habiendo visitado 'mask'", "Transición: dp[mask|(1<<j)][j] = min(dp[mask][i] + dist[i][j])", "Base: dp[1][0] = 0 (empezamos en ciudad 0, solo visitada)", "Respuesta: min(dp[(1<<n)-1][i] + dist[i][0]) para todo i", "O(2^n × n²) tiempo, O(2^n × n) espacio"],
    logNoMatch: "mask=M, ciudad=I: probando ir a J. dist[I][J]=D. dp[M|(1<<J)][J] no mejora.",
    logMatch: "mask=M, ciudad=I→J: costo total X < actual Y. ¡Actualizando!",
    logEnd: "DP completa. Costo mínimo del tour: C.",
    stepLogic: "Visualizar ciudades como puntos. Mostrar el bitmask en binario. Resaltar la ciudad actual y la que se intenta visitar."
  },
  {
    id: "sieve", name: "Criba de Eratóstenes",
    array: "Encontrar primos hasta n=50", target: "N/A (listar todos los primos)",
    analogy: "Como tamizar arena: empieza con todos los números y ve eliminando los que no son primos. Cuando encuentras un primo, taches todos sus múltiplos. Lo que queda en el tamiz son los primos.",
    steps: ["Crea un arreglo booleano isPrime[0..n] = true", "Marca isPrime[0]=false e isPrime[1]=false", "Para cada i desde 2 hasta √n:", "Si isPrime[i] es true → i es primo", "Marca todos los múltiplos de i como false: i², i²+i, i²+2i...", "Los índices que siguen en true son los primos"],
    logNoMatch: "i=I: marcando múltiplo I×J=M como no primo.",
    logMatch: "i=I: es primo (no fue marcado). Comenzando desde I²=X.",
    logEnd: "Criba completada. Primos encontrados: [2, 3, 5, 7, 11, ...].",
    stepLogic: "Mostrar arreglo de números del 2 al 50. Colorear: primo confirmado (verde), eliminado (rojo), actual siendo procesado (naranja)."
  },
  {
    id: "mod-exp", name: "Exponenciación Modular",
    array: "Calcular 2^10 mod 1000 = 1024 mod 1000 = 24", target: "2^10 mod 1000",
    analogy: "En lugar de multiplicar 2 por sí mismo 10 veces, usas el truco de los cuadrados: 2^10 = (2^5)^2 = ((2^2)^2 × 2)^2. Reduces el trabajo de exponente lineal a logarítmico.",
    steps: ["Si exp es par: base^exp = (base²)^(exp/2)", "Si exp es impar: base^exp = base × base^(exp-1)", "Aplica módulo en cada paso para mantener números pequeños", "resultado = 1. Mientras exp > 0:", "Si exp es impar → resultado = (resultado × base) % mod", "base = (base × base) % mod. exp = Math.floor(exp/2)"],
    logNoMatch: "exp=E (par): base=B, exp=E/2=E2. base²=B2 mod M.",
    logMatch: "exp=E (impar): resultado *= base. resultado=R mod M.",
    logEnd: "B^E mod M = R.",
    stepLogic: "Mostrar los valores de base, exp y resultado en cada iteración. Visualizar cómo el exponente se divide a la mitad en cada paso."
  },
  {
    id: "dijkstra", name: "Dijkstra",
    array: "Grafo: 0→1(4), 0→2(1), 2→1(2), 1→3(1), 2→3(5)", target: "Caminos mínimos desde nodo 0",
    analogy: "Como un GPS que siempre expande primero el camino más barato. Nunca 'se arrepiente' de una distancia ya fijada (porque los pesos son positivos).",
    steps: ["dist[0]=0, dist[todos]=∞, priority queue con (0, origen)", "Extrae nodo con menor distancia (u, d)", "Si d > dist[u] → descartar (ya procesado)", "Para cada vecino v con peso w: si dist[u]+w < dist[v]", "Actualiza dist[v] y agrega (dist[v], v) a la heap", "Repite hasta vaciar la heap"],
    logNoMatch: "Procesando (nodo=U, dist=D). Vecino V: D+W=X ≥ dist[V]=Y. Sin actualización.",
    logMatch: "Vecino V: D+W=X < dist[V]=Y. ¡Actualizando dist[V]=X!",
    logEnd: "Distancias finales: dist=[0, 3, 1, 4].",
    stepLogic: "Mostrar grafo con pesos. Tabla de distancias actualizable. Colorear nodos: sin procesar (blanco), en heap (naranja), finalizado (verde)."
  },

  // ═══ NIVEL 4 (selección) ═══
  {
    id: "convex-hull", name: "Convex Hull (Graham Scan)",
    array: "Puntos: (0,3),(1,1),(2,2),(4,4),(0,0),(1,2),(3,1),(3,3)", target: "N/A (envolvente convexa)",
    analogy: "Como tensar una liga elástica alrededor de clavos en un tablero: la liga solo toca los clavos del borde exterior. Esos clavos forman el casco convexo.",
    steps: ["Encuentra el punto más bajo (menor y). Es parte del hull.", "Ordena los demás puntos por ángulo polar respecto al punto base", "Usa una pila. Agrega los primeros 2 puntos", "Para cada punto siguiente: mientras los 3 últimos hacen giro a la derecha → pop", "Push del punto actual", "Al terminar, la pila contiene el casco convexo"],
    logNoMatch: "Punto P: giro a la derecha con los últimos dos. Eliminando punto anterior del hull.",
    logMatch: "Punto P: giro a la izquierda. Agregando al hull.",
    logEnd: "Convex hull completado. N puntos en el perímetro.",
    stepLogic: "Visualizar puntos como círculos en un canvas 2D. Mostrar la pila del hull. Animar el test de orientación de cada triplete de puntos."
  },
  {
    id: "bloom-filter", name: "Bloom Filter",
    array: "Insertar: 'gato','perro','pez'. Consultar: 'gato','caballo','serpiente'", target: "¿Pertenece al conjunto?",
    analogy: "Como una lista de invitados aproximada: cuando llega alguien, revisas 3 listas diferentes. Si aparece en todas → probablemente está invitado (puede ser falso positivo). Si falta en alguna → definitivamente NO está invitado (nunca falso negativo).",
    steps: ["Crea un arreglo de bits de tamaño m (todos en 0)", "Para insertar elem: calcula k hashes, activa esos k bits", "Para consultar elem: calcula los mismos k hashes", "Si todos esos bits están en 1 → PROBABLEMENTE presente", "Si algún bit es 0 → DEFINITIVAMENTE no presente", "Falsos positivos posibles. Falsos negativos: imposible"],
    logNoMatch: "Consultando 'E'. hash1=H1, hash2=H2, hash3=H3. bit[H2]=0. → No está (definitivo).",
    logMatch: "Insertando 'E'. Activando bits H1, H2, H3.",
    logEnd: "'E' → todos los bits en 1. Probablemente presente (puede ser falso positivo).",
    stepLogic: "Visualizar el arreglo de bits. Animar el cálculo de cada hash como flecha apuntando al bit. Colorear bits activados."
  },
  {
    id: "skip-list", name: "Skip List",
    array: "[1, 4, 7, 12, 15, 19, 23, 28, 35]", target: "19 (buscar)",
    analogy: "Como el tren expreso vs el tren local: el expreso solo para en estaciones grandes, saltando muchas. Si el expreso te pasa, te bajas y tomas el local para el último tramo. Búsqueda más rápida que lista enlazada.",
    steps: ["Múltiples niveles de listas enlazadas", "Nivel 0: todos los elementos (lista completa)", "Nivel 1: ~50% de los elementos (saltos más largos)", "Nivel 2: ~25% de los elementos (saltos aún más largos)", "Búsqueda: empieza en el nivel más alto, avanza hasta exceder el target, baja un nivel", "Insert: decide probabilísticamente a cuántos niveles agregar"],
    logNoMatch: "Nivel L, nodo N: N < TARGET. Avanzando al siguiente en nivel L.",
    logMatch: "Nivel L, nodo N: N ≥ TARGET. Bajando al nivel L-1.",
    logEnd: "Nodo TARGET encontrado (o confirmado ausente).",
    stepLogic: "Visualizar múltiples niveles de la lista. Mostrar el puntero 'current' moviéndose horizontalmente (avanzar) o verticalmente (bajar de nivel)."
  },
  {
    id: "hyperloglog", name: "HyperLogLog",
    array: "Stream de millones de IPs: '1.2.3.4','2.3.4.5','1.2.3.4',...", target: "Estimar cardinalidad (IPs únicas)",
    analogy: "Como estimar cuántas personas distintas pasaron por una puerta contando solo los rasgos más extremos: 'la persona con el número de serie más raro'. Suena absurdo pero funciona matemáticamente.",
    steps: ["hash(elem) → número binario", "Cuenta los ceros iniciales del hash (rho)", "El máximo de rho visto ≈ log₂(cardinalidad)", "En realidad usa múltiples 'buckets' para mayor precisión", "Estimación: (factor × m²) / (suma de 2^(-M[j]))", "Error estándar: ±1.04/√m donde m = número de buckets"],
    logNoMatch: "Procesando elemento E. hash=H. Ceros iniciales=Z. bucket[B]: max era M, ahora max(M,Z)=N.",
    logMatch: "Estimación actual de cardinalidad: ~C.",
    logEnd: "Stream procesado. Estimación final: ~C elementos únicos.",
    stepLogic: "Visualizar los buckets como un arreglo. Para cada elemento, mostrar el hash y cuántos ceros iniciales tiene. Actualizar el bucket correspondiente."
  },

  // Algoritmos restantes con datos básicos
  {
    id: "avl-tree", name: "Árbol AVL",
    array: "Insertar en orden: 10, 20, 30, 40, 50, 25", target: "N/A (árbol balanceado)",
    analogy: "Como un BST perfeccionista que no permite desequilibrios. Cada vez que se inclina demasiado a un lado, se 'rota' para restaurar el equilibrio. Factor de balance = altura(der) - altura(izq) ∈ {-1,0,1}.",
    steps: ["Inserta como BST normal", "Calcula factor de balance de cada nodo en el camino", "Si balance = 2 y hijo derecho tiene balance ≥ 0 → rotación izquierda", "Si balance = 2 y hijo derecho tiene balance < 0 → rotación derecha-izquierda", "Si balance = -2 y hijo izquierdo balance ≤ 0 → rotación derecha", "Si balance = -2 y hijo izquierdo balance > 0 → rotación izquierda-derecha"],
    logNoMatch: "Nodo N: balance=B. Árbol balanceado. Sin rotación.",
    logMatch: "Nodo N: balance=B (desequilibrado). Aplicando rotación [tipo].",
    logEnd: "Árbol AVL balanceado. Altura: H.",
    stepLogic: "Visualizar árbol con factores de balance en cada nodo. Animar la rotación como intercambio visual de nodos."
  },
  {
    id: "heap", name: "Heap (Montículo)",
    array: "[16, 14, 10, 8, 7, 9, 3, 2, 4, 1]", target: "Insertar 15, luego extraer max",
    analogy: "Como la jerarquía de una empresa: el jefe (raíz) siempre es el más importante (mayor). Cada jefe es más importante que sus empleados directos, pero no necesariamente que los de otro departamento.",
    steps: ["Max-heap: cada padre ≥ sus hijos", "Insert: agrega al final, luego 'sube' (sift-up) comparando con padre", "ExtractMax: guarda la raíz, mueve el último a la raíz, 'baja' (sift-down)", "Sift-up: si hijo > padre → swap y continúa subiendo", "Sift-down: si padre < mayor hijo → swap y continúa bajando", "Representado como arreglo: hijo izq = 2i+1, hijo der = 2i+2"],
    logNoMatch: "SiftUp: nodo I=V, padre P=W. V ≤ W. Ya en su lugar.",
    logMatch: "SiftUp: nodo I=V > padre P=W. ¡Swap! Subiendo.",
    logEnd: "Operación completada. Heap válido.",
    stepLogic: "Visualizar el heap como arreglo Y como árbol simultáneamente. Animar el swap mostrando ambas representaciones."
  },
  {
    id: "cycle-detection", name: "Detección de Ciclos",
    array: "Grafo: 0→1, 1→2, 2→3, 3→1 (ciclo), 4→5", target: "¿Hay ciclos?",
    analogy: "Como detectar si en un grupo hay relaciones circulares de deuda: A debe a B, B debe a C, C debe a A. El DFS usa colores: blanco=sin visitar, gris=en proceso, negro=terminado. Gris→gris = ciclo.",
    steps: ["Colorea todos los nodos: BLANCO (sin visitar)", "DFS: cuando visitas un nodo → GRIS (en el call stack actual)", "Cuando terminas de explorar todos sus vecinos → NEGRO", "Si encuentras una arista hacia un nodo GRIS → ¡ciclo detectado!", "Si el nodo es NEGRO → ya procesado, no es ciclo en DAG", "Para grafos no dirigidos: ciclo si encuentras un nodo ya visitado (no el padre)"],
    logNoMatch: "Arista (U→V): V es NEGRO. Ya procesado. No es ciclo.",
    logMatch: "Arista (U→V): V es GRIS. ¡Ciclo detectado!",
    logEnd: "DFS completado. [Ciclo encontrado / Sin ciclos].",
    stepLogic: "Visualizar grafo. Colorear nodos según estado: blanco, naranja(gris), verde(negro). Resaltar la arista que detecta el ciclo."
  },
  {
    id: "prim", name: "Algoritmo de Prim (MST)",
    array: "Grafo: 0-1(2), 0-3(6), 1-2(3), 1-3(8), 1-4(5), 2-4(7), 3-4(9)", target: "Árbol de expansión mínima desde nodo 0",
    analogy: "Como tender cables eléctricos entre ciudades al menor costo. Empieza desde una ciudad y siempre conecta la ciudad más cercana (menor cable) que aún no está conectada. Nunca formes ciclos.",
    steps: ["Empieza con nodo 0. key[0]=0, key[todos]=∞", "inMST[i]: ¿ya está en el árbol?", "Extrae el nodo u con menor key no en MST. Agrega a MST.", "Para cada vecino v de u: si !inMST[v] y peso(u,v) < key[v]", "Actualiza key[v] = peso(u,v), parent[v] = u", "Repite n-1 veces"],
    logNoMatch: "Vecino V: ya en MST. Ignorando.",
    logMatch: "Vecino V: peso W < key[V]=K. Actualizando key[V]=W.",
    logEnd: "MST completo. Peso total: T.",
    stepLogic: "Visualizar el grafo. Mostrar aristas del MST construido en verde. Resaltar la arista que se agrega en cada paso."
  },
  {
    id: "kruskal", name: "Algoritmo de Kruskal (MST)",
    array: "Aristas ordenadas: (0-1,1),(0-3,2),(1-2,2),(2-3,3),(1-3,4),(2-4,5)", target: "MST de menor peso total",
    analogy: "Como conectar ciudades eligiendo siempre el cable más barato disponible, pero asegurándote de no crear ciclos. Usa Union-Find para saber si dos ciudades ya están conectadas.",
    steps: ["Ordena todas las aristas por peso (menor a mayor)", "Inicializa Union-Find: cada nodo es su propio componente", "Para cada arista (u,v,w) en orden:", "Si find(u) ≠ find(v) → aristas sin ciclo, agrégala al MST, union(u,v)", "Si find(u) === find(v) → formaría ciclo, descártala", "Para cuando el MST tiene n-1 aristas"],
    logNoMatch: "Arista (U-V, peso W): find(U)=find(V). ¡Ciclo! Descartando.",
    logMatch: "Arista (U-V, peso W): find(U)≠find(V). Agregando al MST. union(U,V).",
    logEnd: "MST completo con N-1 aristas. Peso total: T.",
    stepLogic: "Mostrar lista de aristas ordenadas. Visualizar el grafo con aristas del MST en verde y descartadas en rojo."
  },
  {
    id: "ford-fulkerson", name: "Ford-Fulkerson (Flujo Máximo)",
    array: "Red: S→A(10), S→B(8), A→B(2), A→T(5), B→T(10)", target: "Flujo máximo de S a T",
    analogy: "Como maximizar el agua que fluye por tuberías de diferentes capacidades desde una fuente hasta un destino. Busca caminos con espacio disponible, envía agua por ahí, repite hasta que no haya más caminos.",
    steps: ["Flujo inicial = 0 en todas las aristas", "Busca un camino S→T en el grafo residual con capacidad > 0", "Encuentra el cuello de botella: min de capacidades en el camino", "Envía ese flujo por el camino (reduce capacidad directa, aumenta la inversa)", "Actualiza el flujo total += cuello de botella", "Repite hasta que no exista camino S→T"],
    logNoMatch: "Camino aumentante: S→...→T. Cuello de botella = C. Enviando C unidades.",
    logMatch: "No hay más caminos de S a T. Flujo máximo alcanzado.",
    logEnd: "Flujo máximo = F.",
    stepLogic: "Visualizar red con capacidades. Animar el camino aumentante. Mostrar flujo actual/capacidad en cada arista."
  },
  {
    id: "rabin-karp", name: "Rabin-Karp",
    array: "Texto: 'AABABAB'. Patrón: 'ABAB'", target: "Encontrar todas las ocurrencias",
    analogy: "Como identificar personas por huella digital en vez de cara: calculas un número (hash) para el patrón y para cada ventana del texto. Si los hashes coinciden, confirmas letra por letra. Mucho más rápido en promedio.",
    steps: ["Calcula hash del patrón", "Calcula hash de la primera ventana del texto (tamaño m)", "Si hash(ventana) === hash(patrón) → compara letra por letra", "Si coinciden → ¡patrón encontrado!", "Desliza la ventana: actualiza hash en O(1) con rolling hash", "Repite para todas las posiciones del texto"],
    logNoMatch: "Ventana [I..I+M]: hash=H ≠ hash_patrón=HP. Descartando. Deslizando.",
    logMatch: "Ventana [I..I+M]: hash=H = hash_patrón. ¡Verificando coincidencia!",
    logEnd: "Búsqueda completada. Ocurrencias en posiciones: [...].",
    stepLogic: "Mostrar texto y patrón. La ventana deslizante resaltada con active-a. Mostrar hash calculado vs hash patrón."
  },
  {
    id: "scc", name: "Componentes Fuertemente Conexas (Kosaraju)",
    array: "Grafo: 0→1, 1→2, 2→0, 2→3, 3→4, 4→3, 4→5", target: "Encontrar SCCs",
    analogy: "Un grupo de personas donde todos pueden comunicarse entre sí (directa o indirectamente). Si A puede llegar a B y B puede llegar a A, están en el mismo componente fuertemente conexo.",
    steps: ["DFS sobre el grafo original. Al terminar cada nodo, push a un stack", "Transponer el grafo (invertir todas las aristas)", "DFS sobre el grafo transpuesto en orden del stack", "Cada DFS completo en el transpuesto encuentra una SCC", "Repite hasta procesar todos los nodos del stack", "Resultado: grupos de nodos mutuamente alcanzables"],
    logNoMatch: "DFS transpuesto desde nodo N. Visitando vecino V (no visitado). Agregando a SCC actual.",
    logMatch: "Nodo N ya visitado. Finalizando SCC: {N1,N2,...}.",
    logEnd: "SCCs encontradas: [{0,1,2},{3},{4},{5}].",
    stepLogic: "Dos fases visualizadas. Fase 1: mostrar el orden de finalización. Fase 2: mostrar SCCs formándose en el grafo transpuesto con colores."
  },
  {
    id: "fft", name: "FFT (Fast Fourier Transform)",
    array: "Polinomio A: [1,2,3]. Polinomio B: [4,5,6]. Multiplicar A×B.", target: "Producto = [4,13,28,27,18]",
    analogy: "Multiplicar polinomios directamente es O(n²). La FFT convierte los polinomios a 'dominio frecuencia' donde multiplicar es O(n). Luego convierte de vuelta. Es como multiplicar en código morse y convertir.",
    steps: ["Evalúa ambos polinomios en n puntos especiales (raíces de la unidad)", "En esos puntos, la multiplicación es solo elemento a elemento", "Divide y vencerás: evalúa en pares/impares recursivamente", "Combina (butterfly): A[k] = A_even[k] + w^k × A_odd[k]", "Multiplica los valores punto a punto", "Aplica FFT inversa para obtener los coeficientes del producto"],
    logNoMatch: "Nivel L, nodo N: butterfly. A_even=X, A_odd=Y, w^k=W. A[K]=X+W×Y.",
    logMatch: "Evaluación completada. Multiplicando punto a punto.",
    logEnd: "IFFT completada. Coeficientes del producto: [4,13,28,27,18].",
    stepLogic: "Visualizar el árbol de recursión del butterfly. Mostrar la combinación en cada nivel con active-a y active-b."
  },
  {
    id: "extended-gcd", name: "Extended GCD",
    array: "gcd(35, 15) = 5, y 35×1 + 15×(-2) = 5", target: "GCD y coeficientes de Bézout",
    analogy: "El GCD normal solo te dice el máximo común divisor. El extendido también te da dos números mágicos x e y tal que a×x + b×y = gcd(a,b). Útil para encontrar inversos modulares.",
    steps: ["Algoritmo de Euclides: gcd(a,b) = gcd(b, a mod b)", "En cada paso, rastrea cómo expresar el residuo como combinación de a y b", "Caso base: gcd(a,0) = a, x=1, y=0", "Paso recursivo: usa los coeficientes de la llamada anterior", "x = x_prev_call. y = x_prev_call - (a/b) × y_prev_call", "Al final: a×x + b×y = gcd(a,b)"],
    logNoMatch: "gcd(A, B): B>0. Llamando gcd(B, A mod B = R).",
    logMatch: "gcd(A, 0) = A. x=1, y=0. Comenzando retorno.",
    logEnd: "gcd(35,15)=5. x=1, y=-2. Verificación: 35×1+15×(-2)=5 ✓.",
    stepLogic: "Mostrar la tabla de a, b, cociente, residuo, y los coeficientes x,y en cada iteración de Euclides."
  },
  {
    id: "miller-rabin", name: "Miller-Rabin",
    array: "Probar si 997 es primo (sí lo es)", target: "¿Es 997 primo?",
    analogy: "Como inspectores de calidad: si 5 inspectores diferentes dicen que el producto es bueno, confiamos en que lo es (con altísima probabilidad). Cada 'testigo' reduce la probabilidad de error a 1/4.",
    steps: ["Escribe n-1 = 2^r × d (factoriza potencias de 2)", "Para cada testigo a aleatorio:", "Calcula x = a^d mod n", "Si x=1 o x=n-1 → posiblemente primo, siguiente testigo", "Repite r-1 veces: x = x² mod n. Si x=n-1 → posiblemente primo", "Si nunca fue n-1 → n es COMPUESTO (certeza)"],
    logNoMatch: "Testigo a=A. x=A^d mod n=X. x≠1 y x≠n-1. Elevando al cuadrado...",
    logMatch: "x=n-1. Posiblemente primo con este testigo. Siguiente testigo.",
    logEnd: "Todos los testigos coinciden. 997 es primo (con probabilidad ≥ 1-(1/4)^k).",
    stepLogic: "Mostrar los pasos de la exponenciación modular. Para cada testigo, mostrar la secuencia de x² mod n y si pasa o falla."
  },
  {
    id: "lca", name: "LCA (Lowest Common Ancestor)",
    array: "Árbol: 1→[2,3], 2→[4,5], 3→[6,7]. LCA(4,6)=1, LCA(4,5)=2", target: "LCA(4, 6)",
    analogy: "El ancestro común más bajo de dos nodos en un árbol genealógico: el antepasado compartido más reciente. Para nodos 4 y 6, el abuelo común es el nodo 1.",
    steps: ["Preprocesamiento: para cada nodo, guarda su padre a 1, 2, 4, 8... saltos (binary lifting)", "up[v][j] = ancestro de v dando 2^j saltos hacia arriba", "Para LCA(u,v): primero iguala la profundidad (sube el más profundo)", "Luego sube ambos en paralelo hasta que sus ancestros a 2^j difieran", "El padre de ese punto es el LCA", "Preprocesamiento O(n log n). Consulta O(log n)"],
    logNoMatch: "Igualando profundidad. Nodo U (prof D1) > Nodo V (prof D2). Subiendo U por 2^J saltos.",
    logMatch: "up[U][J] ≠ up[V][J]. Subiendo ambos. Acercándose al LCA.",
    logEnd: "LCA(4,6) = 1.",
    stepLogic: "Visualizar árbol. Animar el proceso de igualación de profundidades y la subida sincronizada hasta encontrar el LCA."
  },
  {
    id: "tree-dp", name: "Tree DP",
    array: "Árbol: 1→[2,3], 2→[4,5], 3→[6]. Valores: [_,3,2,5,1,4,6]. Max Independent Set.", target: "Máximo conjunto independiente de vértices",
    analogy: "Como elegir empleados para una fiesta donde ningún jefe y su empleado directo pueden venir juntos. ¿A quién invitas para maximizar el 'valor' total? La decisión de incluir un nodo afecta a sus hijos.",
    steps: ["dp[v][0] = máximo valor del subárbol de v si v NO está seleccionado", "dp[v][1] = máximo valor del subárbol de v si v SÍ está seleccionado", "Si v no seleccionado: hijos pueden estar o no → dp[v][0] = Σ max(dp[h][0], dp[h][1])", "Si v seleccionado: hijos NO pueden estar → dp[v][1] = val[v] + Σ dp[h][0]", "Procesa el árbol en post-orden (hijos antes que padres)", "Respuesta: max(dp[raíz][0], dp[raíz][1])"],
    logNoMatch: "Nodo N (sin seleccionar): hijo H contribuye max(dp[H][0]=X, dp[H][1]=Y)=Z.",
    logMatch: "Nodo N (seleccionado, val=V): hijo H contribuye dp[H][0]=X.",
    logEnd: "Max Independent Set = max(dp[1][0], dp[1][1]) = R.",
    stepLogic: "Visualizar árbol. Procesar nodos en post-orden (hojas primero). Mostrar dp[v][0] y dp[v][1] para cada nodo."
  },
  {
    id: "fenwick-tree", name: "Fenwick Tree (BIT)",
    array: "[3, 2, -1, 6, 5, 4, -3, 3, 7, 2, 3]", target: "Suma [2..6], luego Update índice 3 += 5",
    analogy: "Como un árbol de cajas donde cada caja guarda la suma de un grupo de números. El tamaño del grupo sigue un patrón binario. Actualizar o consultar suma de prefijo solo requiere tocar O(log n) cajas.",
    steps: ["BIT[i] guarda suma de cierto rango (basado en el bit menos significativo)", "Query(i): suma prefija de 1 a i. i -= i&(-i) para bajar niveles", "Update(i, delta): agrega delta a BIT[i]. i += i&(-i) para subir niveles", "Suma de rango [l,r] = query(r) - query(l-1)", "Índices basados en 1 (no 0)", "O(log n) por operación. Muy rápido en práctica"],
    logNoMatch: "Query(I): acumulando BIT[I]=V. i=I-(I&-I)=J. Bajando.",
    logMatch: "Update(I, +D): BIT[I]+=D. i=I+(I&-I)=J. Subiendo.",
    logEnd: "Suma [2..6] = X. Update completado.",
    stepLogic: "Mostrar el arreglo BIT junto al arreglo original. Animar el recorrido de índices (subir/bajar) con flechas."
  },
  {
    id: "sqrt-decomposition", name: "Sqrt Decomposition",
    array: "[1, 3, 5, 7, 9, 2, 6, 8, 4, 10, 11, 13]", target: "Suma [2..9], Update índice 5 = 7",
    analogy: "Divide el arreglo en bloques de tamaño √n. Cada bloque guarda su suma. Para una consulta, procesas bloques completos en O(1) cada uno y partes de bloques en los extremos elemento a elemento.",
    steps: ["Divide en bloques de tamaño B=⌈√n⌉", "Precalcula la suma de cada bloque", "Query [l,r]: suma elementos sueltos del inicio + bloques completos + elementos sueltos del final", "Update i: cambia ARR[i], recalcula solo la suma de su bloque", "Query: O(√n). Update: O(1)", "Más simple que Segment Tree, útil para offline queries"],
    logNoMatch: "Query [L..R]: procesando bloque completo B. suma_bloque=S. Acumulando.",
    logMatch: "Query [L..R]: procesando elemento suelto índice I. ARR[I]=V. Acumulando.",
    logEnd: "Suma [2..9] = R.",
    stepLogic: "Visualizar el arreglo dividido en bloques con colores alternados. Mostrar el bloque que cubre cada elemento. Animar la consulta separando bloques completos de elementos sueltos."
  },

  // Completar los restantes con estructura básica
  {
    id: "trie", name: "Trie (Árbol de Prefijos)",
    array: "Palabras: 'apple','app','application','apply','banana'", target: "'app' (buscar si existe)",
    analogy: "Como el autocompletado de tu teléfono: cada letra que escribes te lleva más profundo en un árbol. Todos los que empiezan con 'app' comparten el mismo camino hasta la letra 'p'.",
    steps: ["Cada nodo representa un carácter", "Inserta 'apple': raíz→a→p→p→l→e (marca e como fin de palabra)", "Busca 'app': sigue raíz→a→p→p, ¿está marcado como fin? Sí → encontrado", "Prefijo 'ap': sigue raíz→a→p, ¿tiene hijos? Sí → hay palabras con ese prefijo", "Inserta en O(m) donde m = longitud de la palabra", "Búsqueda en O(m). Espacio: O(total de caracteres)"],
    logNoMatch: "Buscando 'Q'. En nodo 'N', el carácter siguiente no existe. → No encontrado.",
    logMatch: "Insertando 'W': creando nodo para carácter C en profundidad D.",
    logEnd: "'app' encontrado. Es una palabra completa en el trie.",
    stepLogic: "Visualizar el trie como árbol. Resaltar el camino que sigue la búsqueda/inserción letra por letra."
  },
  {
    id: "z-algorithm", name: "Z-Algorithm",
    array: "S='aabxaayaabaab'. Z=[0,1,0,0,3,1,0,2,2,0,3,1,0]", target: "Patrón 'aab' en texto 'aabxaayaabaab'",
    analogy: "Para cada posición i, cuántas letras desde i coinciden con el inicio del string. Es como preguntar: ¿cuánto del comienzo de la palabra ves repetido a partir de cada posición?",
    steps: ["Z[0] = longitud del string (especial)", "Para cada i: Z[i] = longitud del prefijo más largo que coincide con S[i..]", "Usa ventana [l,r] ya calculada para acelerar comparaciones", "Si i < r: Z[i] = min(r-i+1, Z[i-l]) como punto de partida", "Luego extiende comparando S[Z[i]] con S[i+Z[i]]", "Para encontrar patrón: concatena patrón + '$' + texto, Z[i]≥m → ocurrencia"],
    logNoMatch: "Posición I: Z[I]=Z. El prefijo de longitud Z no puede extenderse más.",
    logMatch: "Posición I: Z[I] ≥ M (longitud del patrón). ¡Ocurrencia encontrada!",
    logEnd: "Z-array completo. Ocurrencias en posiciones: [...].",
    stepLogic: "Mostrar el Z-array construyéndose. Visualizar la ventana [l,r] y cómo se usa para acelerar."
  },
  {
    id: "topological-sort", name: "Ordenación Topológica",
    array: "Cursos con prerequisitos: A→C, A→D, B→D, B→E, C→F, D→F", target: "Orden válido de cursado",
    analogy: "Como planificar cursos universitarios con prerequisitos: no puedes tomar Cálculo II sin antes tener Cálculo I. El orden topológico da un horario válido donde siempre tomas prerequisitos antes.",
    steps: ["Calcula in-degree de cada nodo", "Inicializa cola con nodos de in-degree 0", "Saca un nodo, agrégalo al resultado", "Reduce in-degree de sus vecinos", "Si in-degree llega a 0 → agrégalo a la cola", "Si el resultado tiene n nodos → éxito. Sino → hay ciclo (imposible)"],
    logNoMatch: "Procesando A. Reduciendo in-degree de C: ahora 0. Agregando C a la cola.",
    logMatch: "Cola: [A, B]. Procesando A. Resultado: [A].",
    logEnd: "Orden topológico: [A, B, C, D, E, F].",
    stepLogic: "Mostrar grafo con in-degrees. Visualizar la cola y el resultado construyéndose. Colorear nodos procesados."
  },
  {
    id: "red-black-tree", name: "Árbol Rojo-Negro",
    array: "Insertar: 7, 3, 18, 10, 22, 8, 11, 26", target: "N/A (árbol balanceado)",
    analogy: "Como el AVL pero con reglas de coloración: cada nodo es rojo o negro. Las reglas garantizan que el árbol no se desbalancee más de 2x. Menos rotaciones que AVL pero altura garantizada O(log n).",
    steps: ["Inserta como BST normal, colorea el nuevo nodo en ROJO", "Si padre es negro → OK, no hay violación", "Si padre es rojo → violación. Aplica casos:", "Caso 1 (tío rojo): recolorea padre+tío=negro, abuelo=rojo", "Caso 2 (tío negro, línea recta): rotación simple + recolorea", "Caso 3 (tío negro, zigzag): rotación doble + recolorea"],
    logNoMatch: "Insertando N (rojo). Padre P es negro. Sin violación.",
    logMatch: "Insertando N (rojo). Padre P es rojo. ¡Violación! Aplicando caso K.",
    logEnd: "Árbol rojo-negro válido. Altura: H.",
    stepLogic: "Visualizar árbol con nodos rojos y negros. Animar la recoloración y rotaciones."
  },
  {
    id: "hopcroft-karp", name: "Hopcroft-Karp",
    array: "Grafo bipartito: L={1,2,3}, R={4,5,6}. Aristas: 1-4,1-5,2-5,2-6,3-6", target: "Matching máximo",
    analogy: "Asignar empleados a proyectos donde cada uno puede trabajar en ciertos proyectos. Queremos asignar el máximo número de parejas (empleado, proyecto) sin repetir.",
    steps: ["BFS para encontrar caminos aumentantes más cortos (en capas)", "Cada capa alterna entre nodos libres y emparejados", "DFS para encontrar caminos aumentantes disjuntos simultáneamente", "Augment: invierte el matching a lo largo del camino", "Repite BFS+DFS hasta que no existan caminos aumentantes", "O(E√V) más rápido que Ford-Fulkerson para bipartitos"],
    logNoMatch: "BFS: nodo L1 no alcanza nodo libre en R. Nivel actual: K.",
    logMatch: "Camino aumentante encontrado: L1→R1→L2→R2. Invirtiendo matching.",
    logEnd: "Matching máximo: M pares.",
    stepLogic: "Visualizar grafo bipartito en dos columnas. Colorear aristas del matching. Animar el camino aumentante."
  },
  {
    id: "suffix-array", name: "Suffix Array",
    array: "S='banana'", target: "Suffix array = [5,3,1,0,4,2] → 'a','ana','anana','banana','na','nana'",
    analogy: "Como un índice al final de un libro que ordena todos los sufijos de un texto. Permite buscar cualquier patrón en O(m log n) después de O(n log n) de preprocesamiento.",
    steps: ["Genera todos los sufijos: banana, anana, nana, ana, na, a", "Ordénalos alfabéticamente: a, ana, anana, banana, na, nana", "El suffix array SA guarda los índices de inicio: [5,3,1,0,4,2]", "Para buscar patrón P: búsqueda binaria sobre SA", "LCP array: longitudes de prefijos comunes entre sufijos adyacentes", "Construir SA eficientemente en O(n log n) con radix sort doble"],
    logNoMatch: "Ordenando: sufijo 'K' < sufijo 'J' lexicográficamente. Colocando antes.",
    logMatch: "Patrón P encontrado en posición SA[I]=POS.",
    logEnd: "SA=[5,3,1,0,4,2]. Búsqueda completada.",
    stepLogic: "Mostrar la lista de sufijos ordenándose. Visualizar el SA como arreglo. Para búsqueda, mostrar la búsqueda binaria sobre el SA."
  },
  {
    id: "meet-in-middle", name: "Meet in the Middle",
    array: "[3,7,1,9,5,2,8,4]. Suma objetivo: 25", target: "¿Existe subconjunto que sume 25?",
    analogy: "En vez de revisar los 2^8=256 subconjuntos, parte el conjunto en dos mitades de 4. Genera todas las sumas de cada mitad (16 cada una). Luego busca si algún par de sumas complementarias existe. 16+16 << 256.",
    steps: ["Divide el arreglo en dos mitades iguales", "Genera todas las 2^(n/2) sumas de subconjuntos de la mitad izquierda", "Genera todas las 2^(n/2) sumas de subconjuntos de la mitad derecha", "Ordena las sumas de la derecha", "Para cada suma S_izq, busca target-S_izq en las sumas derechas (búsqueda binaria)", "Si encuentras → subconjunto hallado"],
    logNoMatch: "S_izq=X. Buscando target-X=Y en sumas derechas. No encontrado.",
    logMatch: "S_izq=X. target-X=Y encontrado en sumas derechas. ¡Solución!",
    logEnd: "Solución: subconjunto izq + subconjunto der = 25.",
    stepLogic: "Mostrar las dos mitades. Listar las sumas generadas para cada mitad. Visualizar la búsqueda binaria en la mitad derecha."
  },
  {
    id: "ntt", name: "NTT (Number Theoretic Transform)",
    array: "Igual que FFT pero mod 998244353 (primo especial). A=[1,2,3], B=[4,5,6]", target: "A×B mod 998244353",
    analogy: "Exactamente como la FFT pero sin punto flotante. Usamos un primo especial que tiene raíces de la unidad en aritmética modular. Resultados exactos, sin errores de redondeo.",
    steps: ["Elige primo p = 998244353 = 119 × 2^23 + 1 (NTT-friendly)", "Raíz primitiva g = 3", "Raíz de la unidad: ω = g^((p-1)/n) mod p", "Aplica FFT pero con multiplicación modular", "La inversa usa ω^(-1) = ω^(p-2) mod p (pequeño teorema de Fermat)", "Todos los cálculos son enteros exactos"],
    logNoMatch: "Igual que FFT. Butterfly: A[K] = A_even[K] + w^K × A_odd[K] (mod p).",
    logMatch: "INTT: dividir cada coeficiente por n (multiplicar por inv(n) mod p).",
    logEnd: "Producto: [4,13,28,27,18] (exacto, sin errores de punto flotante).",
    stepLogic: "Idéntico al visualizador de FFT pero mostrando que los valores se mantienen como enteros. Mostrar 'mod p' en cada operación."
  },
  {
    id: "polynomial-mult", name: "Multiplicación de Polinomios",
    array: "A(x) = 1 + 2x + 3x². B(x) = 4 + 5x + 6x²", target: "A×B = 4 + 13x + 28x² + 27x³ + 18x⁴",
    analogy: "Multiplicar (1+2x+3x²)×(4+5x+6x²) directamente es O(n²). Con FFT: convierte a valores en puntos, multiplica los valores (O(n)), convierte de vuelta. Como multiplicar en dominio frecuencia.",
    steps: ["Representa polinomios como arreglos de coeficientes", "Evalúa A y B en 2n puntos usando FFT: O(n log n)", "Multiplica los valores punto a punto: C[i] = A[i] × B[i]: O(n)", "Aplica FFT inversa a C para obtener coeficientes del producto: O(n log n)", "Total: O(n log n) vs O(n²) de la multiplicación directa", "El producto tiene grado deg(A) + deg(B)"],
    logNoMatch: "Multiplicación directa: coef C[K] += A[I] × B[K-I].",
    logMatch: "FFT: evaluando en punto W^K. A(W^K)=X, B(W^K)=Y. C(W^K)=X×Y.",
    logEnd: "C(x) = 4 + 13x + 28x² + 27x³ + 18x⁴.",
    stepLogic: "Comparar visualización de multiplicación directa (O(n²)) vs FFT. Mostrar ambos enfoques paso a paso."
  },
  {
    id: "crt", name: "Teorema Chino del Resto",
    array: "x ≡ 2 (mod 3), x ≡ 3 (mod 5), x ≡ 2 (mod 7). Solución: x ≡ 23 (mod 105)", target: "Encontrar x",
    analogy: "Un número mágico que, dividido entre 3 deja resto 2, entre 5 deja resto 3, y entre 7 deja resto 2. El CRT garantiza que existe exactamente una solución entre 0 y 3×5×7=105.",
    steps: ["Verifica que los módulos sean coprimos entre sí (gcd(mi,mj)=1)", "M = m1 × m2 × m3 = 3×5×7 = 105", "Mi = M / mi para cada i", "Calcula yi = Mi^(-1) mod mi (inverso modular con Extended GCD)", "Solución: x = Σ(ai × Mi × yi) mod M", "Verificar: 23 mod 3=2 ✓, 23 mod 5=3 ✓, 23 mod 7=2 ✓"],
    logNoMatch: "Calculando inverso de M1=35 mod m1=3. 35×1≡1 (mod 3). y1=1.",
    logMatch: "Término i=1: a1×M1×y1 = 2×35×1 = 70.",
    logEnd: "x = (70+45+14) mod 105 = 129 mod 105 = 23.",
    stepLogic: "Mostrar tabla con columnas: i, ai, mi, Mi, yi, ai×Mi×yi. Calcular cada columna paso a paso."
  },
  {
    id: "segment-tree-lazy", name: "Segment Tree con Lazy Propagation",
    array: "[1, 3, 5, 7, 9, 11, 13, 15]", target: "Sumar +5 a rango [2..5], luego consultar suma [1..6]",
    analogy: "Como un jefe perezoso que recibe la orden 'dale +5 a tu equipo' pero no se lo dice a nadie todavía. Solo cuando alguien de su equipo es consultado directamente, el jefe pasa la información. Evita trabajo innecesario.",
    steps: ["Lazy[node] guarda actualizaciones pendientes del nodo", "Actualización de rango: si el nodo está completamente cubierto → guarda en lazy, no bajes", "Al consultar o actualizar hijos: primero propaga lazy a los hijos (pushdown)", "Pushdown: suma lazy[node] a los hijos y resetea lazy[node]", "La actualización se propaga solo cuando es necesario", "O(log n) por operación en vez de O(n) sin lazy"],
    logNoMatch: "Nodo N cubre [NL..NR] ⊆ [L..R]. lazy[N]+=D. Sin bajar a hijos.",
    logMatch: "Pushdown nodo N: propagando lazy=L a hijos. lazy[N]=0.",
    logEnd: "Actualización completada. Consulta suma [1..6] = R.",
    stepLogic: "Mostrar árbol con valores actuales y lazy values. Resaltar nodos con lazy pendiente. Animar el pushdown cuando se accede a los hijos."
  },
  {
    id: "hld", name: "Heavy-Light Decomposition",
    array: "Árbol: 1→[2,3], 2→[4,5,6], 3→[7]. Pesos en nodos: [_,5,3,8,2,7,4,6]", target: "Consulta max en camino 4→7",
    analogy: "Como dividir el árbol en autopistas (cadenas pesadas) y caminos locales. Un camino entre dos nodos solo usa O(log n) autopistas. Cada autopista es un segment tree. Consultas de caminos en O(log²n).",
    steps: ["Para cada nodo, el hijo 'pesado' es el que tiene el subárbol más grande", "Cadena pesada: nodo → hijo pesado → hijo pesado del hijo → ...", "Cada cadena se mapea a un segment tree lineal", "Para consulta en camino u→v: sube por cadenas hasta el LCA", "Cada salto entre cadenas es O(log n), hay O(log n) saltos", "Total: O(log²n) por consulta con segment tree, O(log n) con Fenwick"],
    logNoMatch: "Nodo U en cadena C1. Nodo V en cadena C2. Consultando hasta la cabeza de C1.",
    logMatch: "U y V en la misma cadena. Consulta directa en segment tree [PU..PV].",
    logEnd: "Max en camino 4→7 = 8.",
    stepLogic: "Visualizar árbol coloreando cadenas pesadas con diferentes colores. Mostrar el segment tree implícito de cada cadena."
  },
  {
    id: "centroid-decomposition", name: "Centroid Decomposition",
    array: "Árbol de 8 nodos. Contar pares de nodos a distancia ≤ 3", target: "Pares de nodos a distancia ≤ 3",
    analogy: "Como dividir el árbol por su centro de gravedad: el centroide es el nodo que, al quitarlo, ningún subárbol tiene más de n/2 nodos. Divide y vencerás: los caminos pasan por el centroide o están completamente en un subárbol.",
    steps: ["Encuentra el centroide del árbol actual", "Procesa todos los caminos que PASAN por el centroide", "Quita el centroide del árbol", "Repite recursivamente para cada subárbol resultante", "La altura del 'centroid tree' es O(log n)", "Total: O(n log n) operaciones"],
    logNoMatch: "Subárbol de tamaño S. Centroide: nodo N. Ningún subcomponente > S/2.",
    logMatch: "Procesando caminos que pasan por centroide N. Distancias: [D1, D2, ...].",
    logEnd: "Centroid decomposition completa. Pares contados: K.",
    stepLogic: "Visualizar árbol. Resaltar el centroide en cada nivel de recursión con diferentes colores. Mostrar los subárboles que se procesan."
  },
  {
    id: "min-cost-max-flow", name: "Min-Cost Max-Flow",
    array: "Red: S→A(cap=4,cost=1), S→B(cap=2,cost=3), A→T(cap=3,cost=2), B→T(cap=3,cost=1), A→B(cap=2,cost=1)", target: "Flujo máximo con costo mínimo",
    analogy: "Como Ford-Fulkerson pero siempre elige el camino aumentante más barato (menor costo). Usa Bellman-Ford o Dijkstra (con potenciales Johnson) para encontrar el camino más barato cada vez.",
    steps: ["Flujo=0, Costo=0", "Busca camino S→T más barato con capacidad disponible (Bellman-Ford)", "Si no existe → hemos alcanzado el flujo máximo al menor costo posible", "Envía flujo por ese camino (cuello de botella)", "Actualiza flujo total y costo total", "Repite desde paso 2"],
    logNoMatch: "Camino más barato: S→A→T, costo/unidad=3. Enviando 3 unidades.",
    logMatch: "No hay más caminos aumentantes. Flujo máximo con costo mínimo alcanzado.",
    logEnd: "Flujo máximo=5, Costo mínimo=12.",
    stepLogic: "Mostrar red con capacidad y costo en cada arista. Resaltar el camino más barato encontrado. Actualizar flujos visualmente."
  },
  {
    id: "hungarian", name: "Algoritmo Húngaro",
    array: "Trabajadores W1,W2,W3 y Tareas T1,T2,T3. Costos: [[3,4,5],[1,2,3],[4,5,6]]", target: "Asignación de costo mínimo",
    analogy: "Como asignar trabajadores a tareas minimizando el costo total. Si W1 hace T2 y W2 hace T1, el total es diferente que W1→T1 y W2→T2. El algoritmo húngaro garantiza el mínimo global.",
    steps: ["Resta el mínimo de cada fila (reduce costos)", "Resta el mínimo de cada columna", "Cubre todos los ceros con el mínimo número de líneas", "Si número de líneas = n → solución óptima encontrada", "Si no → resta el mínimo no cubierto de todo, suma a intersecciones", "Repite hasta tener n líneas"],
    logNoMatch: "Cubriendo ceros con K líneas. K < N. Ajustando matriz.",
    logMatch: "N líneas cubren todos los ceros. Asignación óptima encontrada.",
    logEnd: "Asignación: W1→T2, W2→T1, W3→T3. Costo mínimo: C.",
    stepLogic: "Visualizar la matriz de costos. Mostrar el proceso de reducción y marcado de líneas. Resaltar la asignación final."
  },
  {
    id: "burrows-wheeler", name: "Burrows-Wheeler Transform",
    array: "S='banana$' → BWT='annb$aa'", target: "Transformar y recuperar 'banana'",
    analogy: "Reorganiza los caracteres de un texto de manera que caracteres similares queden juntos, facilitando la compresión. Como reorganizar una biblioteca para que todos los libros del mismo tema estén juntos.",
    steps: ["Agrega carácter especial '$' al final (menor que todo)", "Genera todas las rotaciones del string", "Ordénalas alfabéticamente", "BWT = última columna de la matriz ordenada", "Para revertir: usa la primera y última columna para reconstruir", "Propiedad: caracteres similares quedan agrupados → mejor compresión"],
    logNoMatch: "Generando rotación I: S[I..]+S[..I-1].",
    logMatch: "Matriz ordenada. Última columna = BWT.",
    logEnd: "BWT('banana$')='annb$aa'. Reconstrucción exitosa.",
    stepLogic: "Mostrar la matriz de rotaciones ordenándose. Resaltar la primera y última columna."
  },
  {
    id: "suffix-automaton", name: "Suffix Automaton",
    array: "S='abcbc'", target: "N/A (construcción del autómata)",
    analogy: "Como un mapa de metro compacto que reconoce todos los sufijos de una palabra. En vez de un trie con todas las ramas, es un grafo comprimido que representa lo mismo usando mucho menos espacio.",
    steps: ["Estado inicial = último estado = empty", "Para cada carácter c, crea un nuevo estado 'cur'", "Enlaza desde 'last' a 'cur' con c, propaga hacia arriba por suffix links", "Si ya existe estado con c: verificar si continúa correctamente", "Si no: clonar el estado y redirigir", "Resultado: autómata con O(n) estados y O(n) transiciones"],
    logNoMatch: "Procesando c='C'. Creando nuevo estado. Propagando suffix links.",
    logMatch: "Estado Q ya tiene transición por C. Clonando si es necesario.",
    logEnd: "Suffix automaton de 'abcbc' construido. N estados, M transiciones.",
    stepLogic: "Visualizar el autómata como grafo dirigido. Cada nuevo carácter añade estados y transiciones. Mostrar suffix links como aristas especiales."
  },
  {
    id: "aho-corasick", name: "Aho-Corasick",
    array: "Patrones: ['he','she','his','hers']. Texto: 'ahishers'", target: "Encontrar todos los patrones en el texto",
    analogy: "Como KMP pero para múltiples palabras simultáneamente. En vez de buscar cada palabra por separado, construye un autómata que busca todas a la vez en un solo recorrido del texto.",
    steps: ["Construye un trie con todos los patrones", "Calcula 'failure links' (similar a tabla LPS de KMP)", "Failure link de un estado = el estado que representa el sufijo más largo que también es prefijo", "Recorre el texto: avanza en el trie, si falla → sigue failure link", "Cuando llegas a un estado final → patrón encontrado", "O(n + m + z) donde z = número de ocurrencias"],
    logNoMatch: "Texto[I]=C. Estado actual S no tiene transición por C. Siguiendo failure link a S'.",
    logMatch: "Estado S es final. Patrón '[P]' encontrado en posición I.",
    logEnd: "Patrones encontrados: 'his'@1, 'she'@3, 'hers'@5.",
    stepLogic: "Visualizar el trie con failure links. Animar el recorrido del texto mostrando el estado activo."
  },
  {
    id: "persistent-segment-tree", name: "Persistent Segment Tree",
    array: "[1, 3, 5, 7, 2, 4, 6, 8]. Query: suma [2..5] en versión 3", target: "Consultas en versiones históricas",
    analogy: "Como tener copias del árbol en diferentes momentos del tiempo. En vez de copiar todo el árbol (O(n)), solo copias el camino modificado (O(log n) nodos). Puedes volver a cualquier versión pasada.",
    steps: ["Versión 0 = árbol inicial", "Actualización: crea una nueva 'raíz', copia solo el camino de la raíz a la hoja modificada", "Los demás subárboles son compartidos con la versión anterior", "Cada versión tiene su propia raíz", "Consulta en versión k: usa la raíz de la versión k", "O(log n) por actualización, O(log n) por consulta"],
    logNoMatch: "Versión 2: actualizando índice I. Copiando camino raíz→hoja. O(log n) nodos nuevos.",
    logMatch: "Consulta en versión 3, rango [2..5]. Usando raíz v3.",
    logEnd: "Suma [2..5] en versión 3 = R.",
    stepLogic: "Mostrar múltiples versiones del árbol. Resaltar nodos compartidos entre versiones (gris) y nodos nuevos (color)."
  },
  {
    id: "mos-algorithm", name: "Mo's Algorithm",
    array: "[1, 4, 2, 6, 3, 7, 5, 2, 1, 8]. Queries: [2..6],[1..4],[3..8],[0..3]", target: "Suma de cada query",
    analogy: "Ordena las consultas de forma inteligente para que el 'cursor' [L,R] se mueva lo menos posible entre consultas. Agrupa por bloques de √n. Dentro de cada bloque, ordena por R. Reduce movimientos de O(n×q) a O((n+q)√n).",
    steps: ["Divide el arreglo en bloques de tamaño √n", "Ordena queries: primero por bloque de L, luego por R (alterno)", "Mantén ventana actual [curL, curR]", "Para cada query: expande o contrae L y R hasta llegar a [queryL, queryR]", "Cada extensión/contracción: add o remove elemento", "Después de procesar, guarda la respuesta"],
    logNoMatch: "curR=R. queryR=QR > R. Expandiendo: add ARR[R+1]. curR++.",
    logMatch: "curL=L. queryL=QL > L. Contrayendo: remove ARR[L]. curL++.",
    logEnd: "Todas las queries respondidas. Movimientos totales: M.",
    stepLogic: "Mostrar el arreglo con la ventana [curL,curR] resaltada. Las queries ordenadas. Animar la expansión/contracción de la ventana."
  },
  {
    id: "b-tree", name: "B-Tree / B+ Tree",
    array: "Insertar en orden: 10,20,5,6,12,30,7,17. Grado mínimo t=2", target: "N/A (árbol balanceado)",
    analogy: "Como los archivadores de una oficina: cada cajón puede tener entre t-1 y 2t-1 archivos. Cuando un cajón se llena, se divide en dos. Perfecto para bases de datos donde cada 'cajón' es una página en disco.",
    steps: ["Cada nodo tiene entre t-1 y 2t-1 claves (t=2: entre 1 y 3 claves)", "Insertar: busca la hoja correcta, inserta ordenado", "Si la hoja se llena (2t-1 claves): split. La clave del medio sube al padre", "El padre puede llenarse también → split recursivo hacia arriba", "La raíz puede crecer (única forma en que aumenta la altura)", "Todas las hojas están al mismo nivel (árbol perfectamente balanceado)"],
    logNoMatch: "Insertando K en hoja [claves]. No hay overflow.",
    logMatch: "Hoja llena tras insertar K. Split: clave media M sube al padre.",
    logEnd: "B-Tree válido. Todas las hojas al mismo nivel.",
    stepLogic: "Visualizar el árbol. Animar la inserción y el split de nodos."
  },
  {
    id: "veb-tree", name: "Van Emde Boas Tree",
    array: "Universo {0..15}. Insertar: 2,3,4,7,9,14. Query: successor(4)=7", target: "Successor(4) = 7",
    analogy: "Como un sistema de búsqueda de números de teléfono ultra-rápido: en vez de buscar en una lista, divides el universo recursivamente en raíces cuadradas. Cada operación tarda O(log log u), increíblemente rápido.",
    steps: ["Divide el universo de tamaño u en √u 'clusters'", "Cada elemento x: cluster = ⌊x/√u⌋, offset = x mod √u", "Estructura recursiva: summary (min en cada cluster) + clusters (recursivos)", "Insert x: actualiza cluster[high(x)] y summary", "Successor(x): busca en cluster actual, o en summary para el siguiente cluster", "O(log log u) por operación"],
    logNoMatch: "Successor(4) en cluster 1 (4,5,6,7): min mayor que 4 es 7.",
    logMatch: "Cluster 1 tiene successor. Reconstruyendo: high=1, low=3 → x=7.",
    logEnd: "Successor(4)=7 encontrado en O(log log 16)=2 pasos.",
    stepLogic: "Visualizar la estructura recursiva como árbol de clusters. Mostrar el recorrido para encontrar el sucesor."
  },
  {
    id: "wavelet-tree", name: "Wavelet Tree",
    array: "[3,1,4,1,5,9,2,6,5,3,5]", target: "k-ésimo elemento más pequeño en rango [2..7] = ?",
    analogy: "Como un árbol de decisiones binarias: ¿este número es ≤ mediana o > mediana? Responde preguntas complicadas como 'cuántos números en el rango [l,r] son ≤ k' en O(log n).",
    steps: ["Divide el rango de valores por la mediana", "Nodo izquierdo: elementos ≤ mediana. Nodo derecho: elementos > mediana", "Cada nivel registra cuántos elementos fueron a la izquierda", "Para k-ésimo en rango [l,r]: ¿cuántos van a la izquierda en este rango?", "Si k ≤ count_izq → busca recursivamente en el hijo izquierdo", "Sino → busca en hijo derecho con k ajustado"],
    logNoMatch: "Nivel L: rango de valores [LO..HI]. Mediana=MID. Elemento X → [izquierda/derecha].",
    logMatch: "En rango [L..R], K elementos van a la izquierda (≤ MID). k=K' ≤ K → bajar izquierda.",
    logEnd: "3er elemento más pequeño en [2..7] = 3.",
    stepLogic: "Visualizar el wavelet tree como árbol binario. En cada nivel, mostrar cómo se divide la secuencia."
  },
  {
    id: "persistent-ds", name: "Persistent Data Structures",
    array: "Lista enlazada: v0=[1,2,3]. v1=prepend(0) → [0,1,2,3]. v2=tail(v0) → [2,3]", target: "Acceder a v0, v1, v2 simultáneamente",
    analogy: "Como git: cada commit es una nueva 'versión' que comparte la mayor parte del historial con las versiones anteriores. Nunca borras nada, solo añades nodos nuevos que apuntan a los anteriores.",
    steps: ["Estructura funcional: las modificaciones crean nuevas versiones sin alterar las anteriores", "Prepend: crea nuevo nodo que apunta a la cabeza de la versión anterior → O(1)", "Tail: retorna la misma lista sin el primer nodo → O(1)", "Path copying: para árboles, solo copia el camino modificado", "Trade-off: más memoria, pero historial completo disponible", "Base de sistemas funcionales como Clojure, Haskell"],
    logNoMatch: "v0=[1,2,3] intacta. v1 comparte nodos [1,2,3] con v0.",
    logMatch: "Creando v1: nuevo nodo '0' → v0.head. Solo 1 nodo nuevo.",
    logEnd: "v0, v1, v2 coexisten. Memoria compartida: N nodos (no 3N).",
    stepLogic: "Visualizar los nodos de la lista con flechas. Mostrar qué nodos son compartidos entre versiones con colores."
  },
  {
    id: "count-min-sketch", name: "Count-Min Sketch",
    array: "Stream: A,B,A,C,A,B,D,A,B,A. Consultar frecuencia de 'A'", target: "Frecuencia aproximada de 'A' = 5",
    analogy: "Como contar visitas a páginas web con memoria limitada: en vez de guardar todos los visitantes, usas varias listas de conteo con funciones hash. El mínimo de los conteos es tu estimación (nunca subestima).",
    steps: ["Crea tabla d×w (d funciones hash, w = ancho)", "Para cada elemento: incrementa count[i][hash_i(elem)] para cada fila i", "Consulta: retorna min(count[i][hash_i(elem)]) para todas las filas", "El mínimo evita el peor caso de colisiones (siempre sobrestima)", "Error garantizado: con probabilidad 1-δ, error ≤ ε×N", "d=⌈log(1/δ)⌉, w=⌈e/ε⌉"],
    logNoMatch: "Procesando 'A'. hash1=H1, hash2=H2, hash3=H3. Incrementando count[i][Hi].",
    logMatch: "Consulta 'A': min(count[0][H1], count[1][H2], count[2][H3]) = 5.",
    logEnd: "Estimación de frecuencia('A') = 5 (real = 5). Sin error en este caso.",
    stepLogic: "Visualizar la tabla d×w. Para cada elemento, mostrar los hash que se incrementan. Para consulta, resaltar las celdas consultadas y el mínimo."
  },
  {
    id: "randomized", name: "Algoritmos Probabilísticos",
    array: "Monte Carlo: estimar π con 1000 puntos aleatorios en [0,1]×[0,1]", target: "π ≈ 3.14...",
    analogy: "Lanzas dardos al azar dentro de un cuadrado que contiene un cuarto de círculo. La proporción de dardos dentro del cuarto de círculo converge a π/4. Más dardos → mejor estimación.",
    steps: ["Genera punto aleatorio (x,y) en [0,1]×[0,1]", "Si x²+y² ≤ 1 → el punto está dentro del cuarto de círculo", "Cuenta puntos dentro / total puntos ≈ π/4", "π ≈ 4 × (puntos dentro / total)", "Con n=1000: error típico ≈ 1/√1000 ≈ 3%", "Monte Carlo: resultado correcto con alta probabilidad (no certeza)"],
    logNoMatch: "Punto (X, Y): X²+Y²=R. R > 1 → fuera del círculo. Dentro: N/Total.",
    logMatch: "Punto (X, Y): X²+Y²=R. R ≤ 1 → dentro del círculo. Dentro: N/Total.",
    logEnd: "1000 puntos. Estimación π ≈ 4×(DENTRO/1000) = P.",
    stepLogic: "Mostrar el cuadrado con el cuarto de círculo. Cada punto aparece como un dot: rojo si afuera, verde si adentro. Actualizar estimación de π en tiempo real."
  },
  {
    id: "treewidth", name: "Treewidth / Pathwidth",
    array: "Grafo: K4 (completo de 4 nodos). treewidth = 3", target: "Calcular treewidth de K4",
    analogy: "Mide qué tan 'parecido a un árbol' es un grafo. Un árbol tiene treewidth 1. Una cuadrícula n×n tiene treewidth n. Grafos de baja treewidth permiten resolver problemas NP-hard en tiempo polinomial.",
    steps: ["Tree decomposition: asigna cada nodo a uno o más 'bags'", "Regla 1: cada nodo del grafo aparece en al menos un bag", "Regla 2: si arista (u,v) existe → hay un bag que contiene ambos", "Regla 3: los bags que contienen nodo v forman un subárbol conexo", "Width = tamaño del bag más grande - 1", "Treewidth = mínima width sobre todas las tree decompositions posibles"],
    logNoMatch: "Bag B = {U, V, W}. Verificando reglas de tree decomposition.",
    logMatch: "Tree decomposition válida. Width = max bag size - 1 = W.",
    logEnd: "Treewidth(K4) = 3. (K4 necesita siempre un bag de tamaño 4).",
    stepLogic: "Mostrar el grafo y su tree decomposition en paralelo. Resaltar cada bag y sus nodos correspondientes en el grafo."
  },
  {
    id: "blossom", name: "Blossom Algorithm",
    array: "Grafo: {0-1,1-2,2-3,3-4,4-5,5-0,0-3}. Matching máximo", target: "Matching máximo = 3 aristas",
    analogy: "Como Hopcroft-Karp pero para grafos no bipartitos. El reto: los ciclos impares ('blossoms') complican los caminos aumentantes. Se 'contraen' en un supernodo para poder encontrar el camino y luego se 'expanden'.",
    steps: ["Busca camino aumentante desde un nodo libre", "Si encuentras un ciclo impar (blossom): contráelo en un supernodo", "Continúa la búsqueda de camino aumentante en el grafo contraído", "Si encuentras el camino: expande los blossoms y actualiza el matching", "Repite hasta que no existan caminos aumentantes", "Matching máximo garantizado en grafos generales"],
    logNoMatch: "Encontrado blossom: ciclo impar [U→V→...→U]. Contrayendo en supernodo B.",
    logMatch: "Camino aumentante encontrado. Expandiendo blossom B. Actualizando matching.",
    logEnd: "Matching máximo: M aristas.",
    stepLogic: "Visualizar el grafo. Resaltar aristas del matching actual. Animar la contracción y expansión de blossoms."
  },
  {
    id: "sparse-table", name: "Sparse Table / RMQ",
    array: "[4, 2, 7, 1, 8, 3, 9, 5, 6, 2]", target: "RMQ(2, 7) = mínimo en [2..7] = 1",
    analogy: "Como preparar respuestas anticipadas a todas las preguntas posibles sobre rangos. Para cada par (i, 2^j), precalcula el mínimo. Consultar cualquier rango [l,r] tarda O(1) porque siempre puedes cubrirlo con dos rangos precalculados.",
    steps: ["Construye tabla sparse[i][j] = mínimo de ARR[i..i+2^j-1]", "Base: sparse[i][0] = ARR[i]", "Para j≥1: sparse[i][j] = min(sparse[i][j-1], sparse[i+2^(j-1)][j-1])", "Query [l,r]: k = ⌊log₂(r-l+1)⌋. Return min(sparse[l][k], sparse[r-2^k+1][k])", "Los dos rangos pueden solaparse (OK para RMQ)", "O(n log n) precalculo, O(1) consulta"],
    logNoMatch: "Construyendo sparse[I][J] = min(sparse[I][J-1], sparse[I+2^(J-1)][J-1]).",
    logMatch: "RMQ(2,7): k=2. min(sparse[2][2]=1, sparse[4][2]=3)=1.",
    logEnd: "RMQ(2,7) = 1 (en posición 3).",
    stepLogic: "Mostrar la tabla sparse construyéndose. Para la consulta, mostrar los dos rangos que se solapan."
  },
  {
    id: "lsh", name: "Locality-Sensitive Hashing",
    array: "Documentos: D1='el gato en el tejado', D2='el tejado del gato', D3='un perro en casa'", target: "D1 similar a D2, D3 es diferente",
    analogy: "Como organizar libros en estanterías donde los similares quedan cerca. Si busco libros parecidos a uno, solo reviso los de su estantería, no toda la librería. Funciona porque libros similares tienen el mismo 'hash'.",
    steps: ["Representa documentos como conjuntos de shingles (n-gramas)", "MinHash: para cada función hash, el mínimo hash de los shingles del doc", "La probabilidad de que MinHash(D1)=MinHash(D2) = Jaccard(D1,D2)", "LSH: divide el vector MinHash en bandas", "Si alguna banda es idéntica → los documentos son candidatos similares", "Solo compara candidatos, no todos los pares"],
    logNoMatch: "D1 y D3: Jaccard=0.1. Las bandas de MinHash no coinciden. No son candidatos.",
    logMatch: "D1 y D2: banda 2 coincide. Son candidatos similares. Verificando Jaccard.",
    logEnd: "Similares encontrados: (D1,D2) con Jaccard≈0.6.",
    stepLogic: "Mostrar los vectores MinHash de cada documento. Visualizar las bandas y cuáles coinciden."
  },
  {
    id: "streaming-kmeans", name: "Streaming K-Means",
    array: "Stream de puntos: (1,1),(8,8),(1,2),(7,8),(2,1),(9,7),(1,3),(8,9)", target: "K=2 clusters",
    analogy: "Como agrupar estudiantes en dos equipos viendo sus calificaciones una por una, sin poder ver todas al mismo tiempo. Mantienes centroides aproximados y los actualizas conforme llegan nuevos datos.",
    steps: ["Inicializa K centroides (primeros K puntos del stream)", "Para cada nuevo punto: asígnalo al centroide más cercano", "Actualiza ese centroide: nuevo_centroide = (suma + punto) / (n + 1)", "Donde n = número de puntos en ese cluster hasta ahora", "El centroide se mueve gradualmente hacia la densidad real", "Error garantizado en O(1) memoria respecto al óptimo offline"],
    logNoMatch: "Punto (X,Y): distancia a C1=D1 > distancia a C2=D2. Asignando a C2.",
    logMatch: "Punto (X,Y): asignado a C1. Actualizando centroide C1 = (NX, NY).",
    logEnd: "Stream procesado. Centroides finales: C1=(1.5,1.8), C2=(8.2,8.0).",
    stepLogic: "Mostrar plano 2D con puntos. Los centroides se mueven con cada punto asignado. Colorear puntos por cluster."
  },
  {
    id: "berlekamp-massey", name: "Berlekamp-Massey",
    array: "Secuencia: [0,1,1,0,1,0,0,1]. Fibonacci mod 2: LRSS de longitud 2", target: "Recurrencia: a(n) = a(n-1) + a(n-2) mod 2",
    analogy: "Dado un libro de respuestas parcial, encuentra la regla más corta que genera esa secuencia. Como descifrar el patrón de una sucesión numérica con la menor cantidad de términos anteriores posible.",
    steps: ["Inicializa: recurrencia actual = vacía, longitud L = 0", "Para cada nuevo término a[n]: calcula discrepancia d", "Si d = 0 → la recurrencia actual predice a[n] correctamente", "Si d ≠ 0 → actualiza la recurrencia usando la última que falló", "Nuevo L = max(L, n+1-L)", "Al final: recurrencia de longitud mínima que genera toda la secuencia"],
    logNoMatch: "n=N: recurrencia predice P. Valor real V. Discrepancia=0. Sin cambio.",
    logMatch: "n=N: discrepancia=D. Actualizando recurrencia. Nueva longitud: L.",
    logEnd: "LFSR de longitud 2: a(n) = a(n-1) XOR a(n-2).",
    stepLogic: "Mostrar la secuencia y la recurrencia actual. Para cada término, mostrar la predicción y si hubo discrepancia."
  },
  {
    id: "kitamasa", name: "Kitamasa",
    array: "Fibonacci: a(n) = a(n-1)+a(n-2). Calcular fib(50)", target: "fib(50) = 12586269025",
    analogy: "Fibonacci directo es O(n). Con exponenciación de matrices es O(log n). Kitamasa hace lo mismo sin matrices explícitas, usando el polinomio característico de la recurrencia. Muy útil para recurrencias largas.",
    steps: ["Expresa la recurrencia como polinomio: p(x) = x^k - c1*x^(k-1) - ... - ck", "Representar x^n mod p(x) como combinación lineal de {1, x, ..., x^(k-1)}", "Usa exponenciación binaria para calcular x^n mod p(x) en O(k² log n)", "Cada multiplicación de polinomios mod p(x) cuesta O(k²)", "a(n) = Σ coef[i] × a(i) donde coef = coeficientes de x^n mod p(x)", "Para k=2, igual que multiplicación de matrices 2×2"],
    logNoMatch: "Paso expo binaria: n es par. Elevando al cuadrado el polinomio actual mod p(x).",
    logMatch: "Paso expo binaria: n es impar. Multiplicando por x mod p(x).",
    logEnd: "fib(50) = 12586269025.",
    stepLogic: "Mostrar la exponenciación binaria del polinomio. Visualizar el polinomio actual en cada paso."
  },
  {
    id: "approximation", name: "Algoritmos de Aproximación",
    array: "Vertex Cover: Grafo {0-1,1-2,2-3,3-4,4-0,0-2}. OPT=3", target: "2-aproximación en tiempo polinomial",
    analogy: "Para problemas NP-hard, en vez de buscar la solución perfecta (tarda exponencial), busca una que sea 'suficientemente buena'. Una 2-aproximación garantiza que tu solución nunca es más del doble del óptimo.",
    steps: ["Vertex Cover 2-aproximación: mientras haya aristas no cubiertas", "Elige cualquier arista (u,v) sin cubrir", "Agrega AMBOS u y v al cover (aunque quizás solo uno era necesario)", "Marca todas las aristas incidentes a u y v como cubiertas", "Repite hasta cubrir todas las aristas", "El cover resultante ≤ 2 × OPT (demostrable)"],
    logNoMatch: "Arista (U,V) no cubierta. Agregando U y V al cover.",
    logMatch: "Todas las aristas de U y V marcadas como cubiertas.",
    logEnd: "Vertex Cover aproximado: {U,V,...}. Tamaño: N ≤ 2×OPT.",
    stepLogic: "Visualizar el grafo. Colorear nodos en el cover (verde) y aristas cubiertas (verde) vs sin cubrir (rojo)."
  },
  {
    id: "fpt", name: "FPT Algorithms",
    array: "Vertex Cover de tamaño k=3 en grafo {0-1,1-2,2-3,3-4,4-0,0-2}", target: "¿Existe vertex cover de tamaño ≤ 3?",
    analogy: "En vez de O(2^n), logras O(2^k × n) donde k es el parámetro. Si k es pequeño (k=3), el algoritmo es práctico incluso con n grande. El exponente solo está en el parámetro, no en el tamaño del input.",
    steps: ["Para cada arista (u,v): al menos u o v debe estar en el cover", "Branching: rama 1 = incluir u; rama 2 = incluir v", "Elimina el nodo elegido y sus aristas del grafo", "Reduce k en 1", "Si k=0 y quedan aristas → esta rama falla", "Si no quedan aristas → cover de tamaño ≤ k encontrado"],
    logNoMatch: "k=K. Arista (U,V). Rama 1: incluir U. Explorando con k=K-1.",
    logMatch: "k=0. No quedan aristas. ¡Cover de tamaño ≤ 3 encontrado!",
    logEnd: "Vertex Cover de tamaño K encontrado en O(2^K × n) = O(8n).",
    stepLogic: "Mostrar el árbol de branching. Visualizar el grafo reduciéndose en cada rama. Resaltar el nodo elegido en cada decisión."
  },
  {
    id: "closest-pair", name: "Closest Pair of Points",
    array: "Puntos: (0,0),(3,4),(1,1),(4,3),(7,0),(5,5),(2,8),(6,2)", target: "Par más cercano: (3,4)-(4,3) dist≈1.41",
    analogy: "Buscar los dos puntos más cercanos en O(n log n) en vez de O(n²). Divide el plano a la mitad, resuelve recursivamente cada mitad, y luego comprueba solo los puntos cerca de la línea divisoria (franja de ancho 2δ).",
    steps: ["Ordena los puntos por x", "Divide en dos mitades por la mediana de x", "Resuelve recursivamente cada mitad → δ_izq, δ_der", "δ = min(δ_izq, δ_der)", "Filtra puntos en la franja |x - median| < δ", "Para cada punto en la franja: compara solo con los siguientes 7 (demostrable)"],
    logNoMatch: "Franja: punto P. Comparando con vecinos en franja. Ninguno mejora δ=D.",
    logMatch: "¡Par más cercano actualizado! (P1, P2) dist=D < δ anterior.",
    logEnd: "Par más cercano: (3,4)-(4,3) distancia=√2≈1.41.",
    stepLogic: "Visualizar los puntos en plano 2D. Mostrar la línea divisoria. Resaltar la franja central y los pares comparados."
  },
  {
    id: "delaunay-voronoi", name: "Delaunay / Voronoi",
    array: "Puntos: (1,1),(4,1),(2,4),(5,3),(1,5)", target: "Diagrama de Voronoi y triangulación de Delaunay",
    analogy: "Voronoi: divide el plano en regiones donde cada región pertenece al punto más cercano. Como los territorios de varios reinos: cada punto del mapa pertenece al castillo (semilla) más cercano. Delaunay es el dual.",
    steps: ["Para cada semilla s, su región de Voronoi = todos los puntos más cercanos a s", "Delaunay: el dual del diagrama de Voronoi (conecta semillas cuyos territorios comparten frontera)", "Propiedad Delaunay: ningún punto está dentro del círculo circunscrito de ningún triángulo", "Algoritmo incremental: inserta puntos uno a uno, repara la propiedad Delaunay con flips", "Flip: si el cuadrilátero formado por dos triángulos viola Delaunay → intercambia la diagonal", "O(n log n) en promedio"],
    logNoMatch: "Arista (U,V): cuadrilátero satisface condición Delaunay. Sin flip necesario.",
    logMatch: "Arista (U,V): punto W está dentro del circuncírculo. ¡Flip!",
    logEnd: "Triangulación de Delaunay completada. N triángulos.",
    stepLogic: "Visualizar puntos en 2D. Construir triangulación incrementalmente. Mostrar el círculo circunscrito al verificar cada arista."
  },
  {
    id: "half-plane", name: "Half-Plane Intersection",
    array: "Semiplanos: x≥0, y≥0, x+y≤4, x-y≤2, -x+y≤2", target: "Polígono de intersección",
    analogy: "Cada semiplano es 'todo el territorio a un lado de una frontera'. La intersección de varios semiplanos es el territorio que está dentro de todas las fronteras simultáneamente. Útil para programación lineal geométrica.",
    steps: ["Convierte cada restricción lineal en un semiplano", "Ordena los semiplanos por ángulo de su normal", "Usa una deque (cola doble) para mantener el polígono actual", "Para cada semiplano: elimina de la deque los semiplanos que quedan completamente fuera", "Agrega el nuevo semiplano a la deque", "Al final, la deque contiene el polígono de intersección"],
    logNoMatch: "Semiplano S: el último vértice de la deque está fuera. Eliminando.",
    logMatch: "Semiplano S: agregando a la deque. Nuevo vértice de intersección calculado.",
    logEnd: "Polígono de intersección: N vértices.",
    stepLogic: "Visualizar el plano 2D. Cada semiplano se agrega como un corte. Mostrar el polígono resultante actualizándose."
  },
  {
    id: "external-sort", name: "External Sorting",
    array: "100 números en disco, RAM: solo caben 10 a la vez. Ordenar todo.", target: "Arreglo completamente ordenado en disco",
    analogy: "Como ordenar 1000 fichas cuando solo puedes tener 10 en la mano. Creas grupos de 10 ordenados (runs), los guardas en archivos, y luego los fusionas de a dos hasta tener un solo archivo ordenado.",
    steps: ["Fase 1 - Crear runs: lee bloques de k elementos, ordénalos en memoria, escríbelos al disco", "Fase 2 - Merge: mezcla runs de a k usando una min-heap de k elementos", "Primera fusión: k runs de tamaño B → k/k runs de tamaño B×k", "Repite fusiones hasta tener 1 solo run ordenado", "Número de pasadas: O(log_k(n/B))", "I/O total: O((n/B) × log_k(n/B)) transferencias de bloque"],
    logNoMatch: "Leyendo bloque I de disco. Ordenando en memoria. Escribiendo run R.",
    logMatch: "Mergeando runs R1 y R2. Tomando mínimo de los frentes.",
    logEnd: "Ordenamiento externo completado. Total de pasadas: P.",
    stepLogic: "Simular con N=20 elementos, RAM=5. Mostrar los runs en disco y el proceso de merge con flechas."
  },
  {
    id: "advanced-flows", name: "Flujos Avanzados en Redes",
    array: "Red con lower bounds: S→A(2,5), S→B(1,4), A→T(3,5), B→T(2,3), A→B(0,2)", target: "Flujo factible (respeta lower bounds)",
    analogy: "Como la distribución de agua con tuberías que deben tener un flujo mínimo (no puedes cerrar una tubería principal) y máximo. Primero encuentra un flujo válido, luego optimízalo.",
    steps: ["Flujo con lower bounds: cada arista tiene [mínimo, máximo]", "Transforma el problema: nueva fuente S', nuevo sumidero T'", "Para arista (u,v) con lower bound l: S'→v con cap l, u→T' con cap l", "Resuelve flujo máximo en la red transformada", "Si el flujo satura todas las aristas de S' → flujo factible existe", "Añade la arista T→S con cap ∞, encuentra flujo máximo"],
    logNoMatch: "Arista (U,V) [L,C]: transformada. S'→V cap L, U→T' cap L.",
    logMatch: "Flujo factible encontrado. Maximizando sobre el flujo base.",
    logEnd: "Flujo máximo con lower bounds = F.",
    stepLogic: "Mostrar la red original con lower/upper bounds. Visualizar la transformación a la red sin lower bounds."
  },
  {
    id: "simplex", name: "Simplex (Programación Lineal)",
    array: "Maximizar: 5x+4y. s.a.: 6x+4y≤24, x+2y≤6, x,y≥0", target: "Óptimo: x=3,y=1.5, valor=21",
    analogy: "El espacio de soluciones factibles es un poliedro (en 2D es un polígono). El óptimo siempre está en un vértice. El simplex camina de vértice en vértice mejorando el valor hasta llegar al óptimo.",
    steps: ["Convierte a forma estándar con variables de holgura: 6x+4y+s1=24, x+2y+s2=6", "Tabla simplex: filas = restricciones, columnas = variables", "Variable entrante: mayor coeficiente positivo en la función objetivo", "Variable saliente: mínimo ratio (restricción más restrictiva)", "Pivoteo: hace la columna entrante una columna unitaria", "Repite hasta que no haya coeficientes positivos en la función objetivo"],
    logNoMatch: "Variable entrante: X (mayor coef positivo=5). Ratios: [4,6]. Var saliente: S1.",
    logMatch: "Pivoteo en fila I, columna J. Actualizando tabla.",
    logEnd: "No hay coeficientes positivos. Óptimo: x=3, y=1.5, Z=21.",
    stepLogic: "Mostrar la tabla simplex actualizándose en cada iteración. Resaltar el elemento pivote."
  },
  {
    id: "branch-and-bound", name: "Branch and Bound",
    array: "Mochila 0/1: items [{p:2,v:5},{p:3,v:9},{p:4,v:10},{p:5,v:11}]. Cap=7", target: "Valor máximo = 16",
    analogy: "Como explorar un laberinto inteligentemente: si en un pasillo ya sabes que nunca podrás mejorar la mejor solución actual, ni lo intentas. Poda las ramas 'sin esperanza' para explorar solo lo prometedor.",
    steps: ["Nodo raíz: no se ha tomado ninguna decisión", "Branching: para cada item → rama 0 (no tomar) o rama 1 (tomar)", "Bounding: calcula el máximo teórico de cada rama (relajación fraccionaria)", "Si bound ≤ mejor solución conocida → poda esa rama", "Actualiza la mejor solución cuando encuentres una hoja válida", "Explora en orden de mayor bound primero (best-first)"],
    logNoMatch: "Nodo (item=I, tomados=[...]): bound=B ≤ mejor=M. ¡Podando rama!",
    logMatch: "Hoja válida: valor=V, peso=P ≤ Cap. ¡Nuevo mejor: V!",
    logEnd: "Solución óptima: {item2, item3}, valor=16.",
    stepLogic: "Visualizar el árbol de branching. Nodos podados en rojo, explorados en verde, pendientes en gris."
  },
  {
    id: "quantum-intro", name: "Algoritmos Cuánticos (Grover)",
    array: "Lista no ordenada de 16 elementos. Buscar el marcado.", target: "Encontrar el elemento en √16 = 4 pasos",
    analogy: "Clásicamente buscar en N elementos tarda O(N). Grover en cuántico tarda O(√N). Es como si pudieras revisar todas las cajas simultáneamente, y con 'interferencia' amplificar la probabilidad de la correcta.",
    steps: ["Inicializa superposición uniforme de todos los N estados", "Oráculo: invierte la fase del estado marcado (lo 'marca')", "Difusor de Grover: invierte respecto a la media (amplifica el marcado)", "Repite O(√N) veces: oráculo + difusor", "Mide: el estado marcado tiene probabilidad ≈ 1", "Para N=16: solo 4 iteraciones vs 8 en promedio clásico"],
    logNoMatch: "Iteración K: oráculo aplicado. Fase del estado marcado invertida.",
    logMatch: "Difusor aplicado. Amplitud del estado marcado: A. Probabilidad: A².",
    logEnd: "Después de 4 iteraciones: probabilidad del estado correcto ≈ 97%.",
    stepLogic: "Visualizar las amplitudes de los 16 estados como barras. Mostrar cómo la barra del estado marcado crece con cada iteración."
  },
  {
    id: "modern-techniques", name: "Técnicas Modernas en Algoritmos",
    array: "Comparando: BFS vs A* en laberinto 8×8", target: "A* encuentra el camino óptimo explorando menos nodos",
    analogy: "Como la diferencia entre explorar a ciegas (BFS) y explorar con un mapa (A*). La heurística h(n) estima la distancia al destino. A* combina el costo real g(n) con la estimación h(n): f(n)=g(n)+h(n).",
    steps: ["A*: f(n) = g(n) + h(n)", "g(n) = costo real desde el inicio hasta n", "h(n) = estimación admisible del costo de n al objetivo (ej: distancia Manhattan)", "Extrae siempre el nodo con menor f(n) (priority queue)", "Si h(n) es admisible (nunca sobreestima) → A* es óptimo", "Si h(n)=0 → A* se convierte en Dijkstra. Si h(n)=constante_grande → se convierte en BFS greedy"],
    logNoMatch: "Nodo N: g=G, h=H, f=F. No mejora el camino conocido a N.",
    logMatch: "Nodo N: f=F es el menor. Expandiendo. Vecinos: [V1,V2,V3].",
    logEnd: "Camino óptimo encontrado. A* exploró K nodos. BFS exploraría M.",
    stepLogic: "Visualizar el laberinto 8×8. Mostrar nodos explorados por A* vs BFS con colores. Mostrar los valores f=g+h en los nodos."
  }
];

// ─────────────────────────────────────────────────────────────
// HELPERS PARA GENERAR EL DOCX
// ─────────────────────────────────────────────────────────────

const border = { style: BorderStyle.SINGLE, size: 1, color: "DDDDDD" };
const borders = { top: border, bottom: border, left: border, right: border };

function heading1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun({ text, bold: true, size: 32, font: "Arial", color: "1a1a27" })],
    spacing: { before: 400, after: 200 }
  });
}

function heading2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    children: [new TextRun({ text, bold: true, size: 26, font: "Arial", color: "7c3aed" })],
    spacing: { before: 280, after: 140 }
  });
}

function heading3(text) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 22, font: "Arial", color: "06b6d4" })],
    spacing: { before: 200, after: 100 }
  });
}

function para(text, opts = {}) {
  return new Paragraph({
    children: [new TextRun({ text, font: "Arial", size: 20, ...opts })],
    spacing: { before: 80, after: 80 }
  });
}

function monoText(text) {
  return new Paragraph({
    children: [new TextRun({ text, font: "Courier New", size: 18, color: "06b6d4" })],
    spacing: { before: 60, after: 60 }
  });
}

function bullet(text) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    children: [new TextRun({ text, font: "Arial", size: 20 })],
    spacing: { before: 40, after: 40 }
  });
}

function labelValue(label, value, color = "555555") {
  return new Paragraph({
    children: [
      new TextRun({ text: `${label}: `, bold: true, font: "Arial", size: 20, color: "222222" }),
      new TextRun({ text: value, font: "Courier New", size: 18, color })
    ],
    spacing: { before: 60, after: 60 }
  });
}

function divider() {
  return new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: "7c3aed", space: 1 } },
    spacing: { before: 200, after: 200 }
  });
}

function algoSection(algo) {
  const rows = [];

  // TÍTULO Y NIVEL
  rows.push(heading2(`${algo.name} (id: "${algo.id}")`));
  rows.push(para(`Nivel: ${["0 - Cero Absoluto","1 - Principiante","2 - Intermedio","3 - Avanzado","4 - Experto"][algo.level] || algo.level}`, { bold: true }));
  rows.push(new Paragraph({ children: [], spacing: { before: 0, after: 80 } }));

  // DATOS DEL VISUALIZADOR
  rows.push(heading3("🎮 Datos del Visualizador"));
  rows.push(labelValue("const ARR", algo.array, "d97706"));
  rows.push(labelValue("target / objetivo", algo.target, "10b981"));

  // LÓGICA stepForward
  rows.push(heading3("⚙️ Lógica de stepForward()"));
  rows.push(monoText(algo.stepLogic));

  // LOGS
  rows.push(heading3("📋 Plantillas de Log Pedagógico"));
  rows.push(labelValue("Sin coincidencia", algo.logNoMatch));
  rows.push(labelValue("Con coincidencia", algo.logMatch));
  rows.push(labelValue("Finalización", algo.logEnd));

  // CONTENIDO EDUCATIVO
  rows.push(heading3("🧠 Tab '¿Qué es?' — Analogía"));
  rows.push(para(algo.analogy));

  rows.push(heading3("📋 Tab '¿Cómo funciona?' — Pasos"));
  algo.steps.forEach((step, i) => {
    rows.push(bullet(`Paso ${i+1}: ${step}`));
  });

  rows.push(divider());
  return rows;
}

// ─────────────────────────────────────────────────────────────
// DOCUMENTO PRINCIPAL
// ─────────────────────────────────────────────────────────────

const children = [];

// PORTADA
children.push(new Paragraph({
  children: [new TextRun({ text: "⟵ GUÍA DE ALGORITMOS PARA COPILOT ⟶", bold: true, size: 48, font: "Arial", color: "7c3aed" })],
  alignment: AlignmentType.CENTER,
  spacing: { before: 800, after: 400 }
}));
children.push(new Paragraph({
  children: [new TextRun({ text: "Datos completos de los 110 algoritmos", size: 28, font: "Arial", color: "64748b" })],
  alignment: AlignmentType.CENTER,
  spacing: { before: 0, after: 200 }
}));
children.push(new Paragraph({
  children: [new TextRun({ text: "Plataforma Interactiva de Algoritmos — Astro 4 + Vanilla JS", size: 22, font: "Arial", color: "94a3b8" })],
  alignment: AlignmentType.CENTER,
  spacing: { before: 0, after: 800 }
}));

// INSTRUCCIONES DE USO
children.push(heading1("📖 CÓMO USAR ESTE DOCUMENTO"));
children.push(para("Para cada algoritmo, este documento proporciona:"));
children.push(bullet("const ARR: el arreglo de demostración exacto a usar"));
children.push(bullet("target / objetivo: el valor a buscar (si aplica)"));
children.push(bullet("Lógica de stepForward(): descripción precisa de cada paso"));
children.push(bullet("Plantillas de log pedagógico: los mensajes QUÉ/POR QUÉ/CUÁL"));
children.push(bullet("Analogía: texto listo para el tab '¿Qué es?'"));
children.push(bullet("Pasos numerados: listos para el tab '¿Cómo funciona?'"));
children.push(new Paragraph({ children: [], spacing: { before: 0, after: 200 } }));
children.push(para("Copia estos datos directamente en el prompt del template. No necesitas inventar nada — todo está aquí.", { bold: false }));
children.push(divider());

// ÍNDICE RÁPIDO
children.push(heading1("📑 ÍNDICE DE ALGORITMOS"));
const grouped = { 0: [], 1: [], 2: [], 3: [], 4: [] };
algorithms.forEach(a => { if (grouped[a.level]) grouped[a.level].push(a); });
const levelNames = ["Cero Absoluto (Nivel 0)", "Principiante (Nivel 1)", "Intermedio (Nivel 2)", "Avanzado (Nivel 3)", "Experto (Nivel 4)"];
Object.entries(grouped).forEach(([level, algos]) => {
  if (algos.length > 0) {
    children.push(heading3(`${levelNames[level]}`));
    algos.forEach(a => children.push(bullet(`${a.name} → id: "${a.id}"`)));
  }
});
children.push(divider());

// SECCIONES POR NIVEL
Object.entries(grouped).forEach(([level, algos]) => {
  if (algos.length > 0) {
    children.push(heading1(`NIVEL ${level}: ${levelNames[level].toUpperCase()}`));
    algos.forEach(algo => {
      algoSection(algo).forEach(row => children.push(row));
    });
  }
});

// APÉNDICE: PROMPT TEMPLATE
children.push(heading1("🔧 PROMPT TEMPLATE PARA COPILOT"));
children.push(para("Usa este template y rellena los campos con los datos de cada algoritmo:"));
const templateLines = [
  "Implementa el visualizador de [NOMBRE] (id: '[ID]') en mi proyecto Astro.",
  "",
  "GOLDEN STANDARD: doblepuntero.html (replicar estructura exacta)",
  "Stack: Astro 4, Vanilla JS, mismas CSS Variables",
  "",
  "ARCHIVO A CREAR: src/pages/algoritmos/[ID].astro",
  "",
  "const ARR = [DATOS_DEL_ARRAY];",
  "const DEFAULT_TARGET = [TARGET]; // o N/A si no aplica",
  "",
  "LÓGICA stepForward():",
  "[PEGAR LÓGICA DE STEPFORWARD DEL DOCUMENTO]",
  "",
  "LOGS PEDAGÓGICOS (usar este estilo exacto):",
  "Sin match: '[PEGAR LOG_NO_MATCH]'",
  "Con match: '[PEGAR LOG_MATCH]'",
  "Final: '[PEGAR LOG_END]'",
  "",
  "TAB '¿QUÉ ES?': [PEGAR ANALOGÍA]",
  "TAB '¿CÓMO FUNCIONA?': [PEGAR PASOS NUMERADOS]",
  "",
  "IDs de DOM obligatorios: arrayArea, logBox, resultBanner,",
  "targetInput (si aplica), speedSlider, playingBadge.",
  "Funciones: resetDemo(), stepForward(), renderArray(),",
  "finalize(found, msg), toggleAuto().",
  "",
  "NO crear plan. NO imports. Escribir archivo completo ahora."
];
templateLines.forEach(line => {
  children.push(new Paragraph({
    children: [new TextRun({ text: line, font: "Courier New", size: 18, color: line.startsWith("//") ? "64748b" : "0a0a0f" })],
    spacing: { before: 40, after: 40 }
  }));
});

// CREAR EL DOCUMENTO
const doc = new Document({
  numbering: {
    config: [{
      reference: "bullets",
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: "•",
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } }
      }]
    }]
  },
  styles: {
    default: { document: { run: { font: "Arial", size: 20 } } },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: "1a1a27" },
        paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 }
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: "7c3aed" },
        paragraph: { spacing: { before: 280, after: 140 }, outlineLevel: 1 }
      }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 }
      }
    },
    children
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('/mnt/user-data/outputs/guia_algoritmos_copilot.docx', buffer);
  console.log('✅ Documento generado exitosamente');
  console.log('📊 Algoritmos incluidos:', algorithms.length);
});