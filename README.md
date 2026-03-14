# 🚀 Plataforma Interactiva de Algoritmos

> 110 algoritmos con visualizadores paso a paso, desde cero hasta nivel experto

**Stack:** Astro 4 + Vanilla JS + CSS Variables  
**Fase Actual:** FASE 0 - Fundamentos ✅

---

## 📋 Descripción

Una plataforma educativa tipo "roadmap interactivo" donde cada algoritmo tiene:
- **Página propia** generada estáticamente por Astro
- **Visualizador animado** paso a paso (en desarrollo)
- **Sistema de progreso** persistido en localStorage
- **Filtros por nivel** (0-4)
- **110 algoritmos** catalogados y organizados

---

## 🎯 Estado del Proyecto

### ✅ FASE 0 - Fundamentos (COMPLETADA)

- [x] Proyecto Astro 4 inicializado con configuración estática
- [x] Sistema de diseño completo (variables CSS, tipografías, paleta de colores)
- [x] `algorithms.json` con 110 algoritmos catalogados
- [x] Página principal con roadmap grid funcional
- [x] Sistema de filtros por nivel (0-4)
- [x] Rutas dinámicas para cada algoritmo (`/algoritmos/[slug]`)
- [x] Sistema de progreso persistido en localStorage
- [x] Componentes reutilizables (AlgoCard, LevelBadge)
- [x] Documentación básica (README.md)

**Próximo:** FASE 1 - Motor de Visualización

---

## 🛠️ Instalación

### Requisitos

- Node.js >= 18.x
- npm o pnpm

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repo>
   cd front-algoritmos
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:4321
   ```

---

## 📜 Scripts Disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| **Desarrollo** | `npm run dev` | Inicia servidor de desarrollo con hot reload |
| **Build** | `npm run build` | Genera build estático en carpeta `dist/` |
| **Preview** | `npm run preview` | Vista previa del build de producción |
| **Check** | `npm run astro check` | Verifica errores de TypeScript y Astro |

---

## 📁 Estructura del Proyecto

```
front-algoritmos/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   └── LevelBadge.astro      # Badge de nivel (0-4)
│   │   └── roadmap/
│   │       └── AlgoCard.astro         # Tarjeta de algoritmo
│   ├── data/
│   │   └── algorithms.json            # Catálogo de 110 algoritmos
│   ├── layouts/
│   │   └── BaseLayout.astro           # Layout con sistema de diseño
│   └── pages/
│       ├── index.astro                # Roadmap principal
│       └── algoritmos/
│           └── [slug].astro           # Páginas dinámicas de algoritmos
├── astro.config.mjs                   # Configuración de Astro (output: static)
├── package.json                       # Dependencias y scripts
├── tsconfig.json                      # Configuración TypeScript strict
├── ONE_SPEC.md                        # Especificación de FASE 0
├── PLAN_TRABAJO.md                    # Plan maestro (10 fases)
└── README.md                          # Este archivo
```

---

## 🎨 Sistema de Diseño

### Paleta de Colores

```css
:root {
  /* Paleta base */
  --bg: #0a0a0f;         /* Fondo general */
  --surface: #12121a;    /* Fondo de cajas internas */
  --card: #1a1a27;       /* Tarjetas */
  --border: #2a2a40;     /* Bordes */
  --accent: #7c3aed;     /* Violeta - acciones primarias */
  --accent2: #06b6d4;    /* Cyan - títulos de sección */
  --text: #e2e8f0;       /* Texto principal */
  --muted: #64748b;      /* Texto secundario */
  
  /* Colores de estado */
  --ptr-left: #f59e0b;   /* Elemento activo A */
  --ptr-right: #10b981;  /* Elemento activo B */
  --match: #ec4899;      /* Resultado encontrado */
  --error: #ef4444;      /* Estado de error */
  --swap: #8b5cf6;       /* Swap en progreso */
  --visited: #1e3a5f;    /* Nodo visitado */
  --current: #f59e0b;    /* Nodo actual */
  --highlight: #fbbf24;  /* Resaltado general */
}
```

### Tipografías

- **Space Mono** - Código y valores numéricos
- **Syne** - UI y títulos

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;700;800&display=swap" rel="stylesheet" />
```

---

## 🗺️ Catálogo de Algoritmos

### Distribución por Niveles

| Nivel | Nombre | Cantidad | Estado |
|-------|--------|----------|--------|
| **0** | Cero Absoluto | 10 | Sin visualizador |
| **1** | Principiante | 20 | Sin visualizador |
| **2** | Intermedio | 25 | Sin visualizador |
| **3** | Avanzado | 30 | Sin visualizador |
| **4** | Experto | 25 | Sin visualizador |
| **Total** | | **110** | |

### Ejemplos por Nivel

**Nivel 0:** Suma de arreglo, Búsqueda lineal, Mínimo y máximo, FizzBuzz...  
**Nivel 1:** Binary Search, Bubble Sort, Two Pointers, Stack, Queue...  
**Nivel 2:** Merge Sort, Quick Sort, Hash Table, Binary Tree BFS/DFS...  
**Nivel 3:** Dijkstra, BFS/DFS en Grafos, Trie, Segment Tree, DP Avanzado...  
**Nivel 4:** FFT, Dinic, Convex Hull, Suffix Automaton, Link-Cut Tree...

---

## 🧪 Funcionalidades FASE 0

### 1. Roadmap Interactivo

- **110 tarjetas** de algoritmos organizadas en un grid responsivo
- **Filtros por nivel** (Todos, 0, 1, 2, 3, 4)
- **Transiciones suaves** al filtrar
- **Hover effects** en tarjetas

### 2. Sistema de Progreso

- **localStorage** para persistir completado de algoritmos
- **Barra de progreso** visual (0/110 → 110/110)
- **Contador de algoritmos** completados
- **Indicador visual** en tarjetas completadas (borde rosado)

### 3. Rutas Dinámicas

- **110 páginas estáticas** generadas en build (`/algoritmos/[slug]`)
- **Navegación** anterior/siguiente entre algoritmos
- **Shell vacío** con información básica (próximamente visualizadores)

### 4. Componentes Reutilizables

- **AlgoCard:** Tarjeta con nombre, nivel, complejidad, descripción, botón completar
- **LevelBadge:** Badge con número y nombre del nivel, colores dinámicos

---

## 🚀 Deploy

### Vercel (Recomendado)

1. **Pushear a GitHub**
   ```bash
   git init
   git add .
   git commit -m "FASE 0 completada"
   git remote add origin <tu-repo>
   git push -u origin main
   ```

2. **Conectar con Vercel**
   - Ir a [vercel.com](https://vercel.com)
   - Import repository
   - Framework Preset: **Astro**
   - Deploy automático ✅

### Netlify

1. **Build settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Deploy**
   - Drag & drop de carpeta `dist/`
   - O conectar con GitHub para CD automático

---

## 📖 Documentación de Referencia

- **PLAN_TRABAJO.md** - Plan maestro con las 10 fases del proyecto
- **ONE_SPEC.md** - Especificación detallada de FASE 0
- [Astro Docs](https://docs.astro.build)
- [Documentación del sistema de diseño](PLAN_TRABAJO.md#sistema-de-diseño)

---

## 🔧 Tecnologías

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Astro** | 4.16.18 | Framework estático |
| **TypeScript** | 5.7.2 | Tipado estricto |
| **Vanilla CSS** | - | Variables CSS, sin frameworks |
| **Vanilla JS** | - | Lógica cliente (filtros, localStorage) |
| **Google Fonts** | - | Space Mono + Syne |

**Sin dependencias externas de UI** - Todo vanilla para bundle mínimo

---

## 🎯 Próximas Fases

### FASE 1 - Motor de Visualización (1 semana)
- [ ] Clase `VisualizerEngine` reutilizable
- [ ] Componentes: ArrayBar, Controls, TabSystem, StepLog
- [ ] Documentación de API del motor

### FASE 2 - Algoritmos Nivel 0 (1 semana)
- [ ] 10 visualizadores completos
- [ ] Analogías pedagógicas
- [ ] Log en español  
- [ ] Casos de prueba

### FASE 3-10
Ver [PLAN_TRABAJO.md](PLAN_TRABAJO.md) para el cronograma completo

---

## 🤝 Contribuir

Este proyecto sigue un plan de desarrollo estructurado en 10 fases. Para contribuir:

1. **Revisar** el [PLAN_TRABAJO.md](PLAN_TRABAJO.md) para entender la arquitectura
2. **Consultar** el [ONE_SPEC.md](ONE_SPEC.md) para la fase actual
3. **Crear** un issue describiendo tu propuesta
4. **Seguir** el sistema de diseño y principios no negociables

---

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

## 🙏 Créditos

- **Inspiración visual:** Doble Puntero (dark, neon, monospace)
- **Tipografías:** Google Fonts (Space Mono, Syne)
- **Framework:** Astro Team

---

**Estado:** FASE 0 ✅ | **Siguiente:** FASE 1 🚧 | **Versión:** 0.0.1
# front-algoritmos
