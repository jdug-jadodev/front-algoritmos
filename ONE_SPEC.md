# One Spec (Root Spec)
 
## Objetivo
 
Establecer la infraestructura base del proyecto "Plataforma Interactiva de Algoritmos" con Astro 4, implementando el sistema de diseño completo y el roadmap interactivo con 110 algoritmos categorizados por niveles (0-4), incluyendo sistema de filtros y persistencia de progreso, todo listo para el despliegue inicial sin visualizadores activos.
 
 
## Alcance / No alcance

### ✅ Dentro del alcance (FASE 0)

- Inicialización del proyecto Astro 4 con configuración estática
- Implementación completa del sistema de diseño (variables CSS, tipografías, paleta de colores)
- Creación del archivo `algorithms.json` con los 110 algoritmos catalogados
- Página principal (`index.astro`) con roadmap grid funcional
- Sistema de filtros por nivel (0-4) en el roadmap
- Rutas dinámicas básicas para cada algoritmo (`[slug].astro`)
- Sistema de progreso persistido en localStorage
- Estructura de componentes base (layouts, cards)
- Deploy inicial en plataforma de hosting estático (Vercel/Netlify)
- Documentación básica del setup

### ❌ Fuera del alcance (FASE 0)

- Visualizadores interactivos de algoritmos (FASE 1-6)
- Sistema de tabs con contenido técnico detallado (FASE 2+)
- Motor de animaciones paso a paso (FASE 1)
- Visor de código con múltiples lenguajes (FASE 8)
- Sistema de búsqueda avanzada (FASE 10)
- Problemas de práctica linkados (FASE 9)
- Navegación entre algoritmos (FASE 10)
- Componentes de visualización (arrays, grafos, árboles) (FASE 1+)
- Contenido educativo completo de cada algoritmo (FASE 2+)
 
 
## Definiciones (lenguaje de dominio)

**Astro 4**: Framework web estático para generar sitios de alto rendimiento con mínimo JavaScript en cliente.

**Static Output**: Configuración de Astro que genera archivos HTML estáticos pre-renderizados en tiempo de build.

**Roadmap Grid**: Interfaz visual tipo cuadrícula que muestra los 110 algoritmos organizados como un mapa de ruta de aprendizaje.

**Algoritmo (entidad)**: Elemento individual del catálogo con propiedades: `id`, `name`, `level`, `tags`, `complexity`, `description`, `hasVisualizer`.

**Nivel**: Clasificación de 0 a 4 que indica dificultad del algoritmo (0=Cero Absoluto, 1=Principiante, 2=Intermedio, 3=Avanzado, 4=Experto).

**Slug**: Identificador único del algoritmo en formato URL-friendly (ej: `two-pointers`, `binary-search`).

**AlgoCard**: Componente de tarjeta individual que representa un algoritmo en el roadmap.

**BaseLayout**: Layout principal de Astro que contiene las configuraciones globales (HTML head, fonts, CSS variables).

**Sistema de Diseño**: Conjunto de variables CSS, tipografías y reglas visuales definidas en `:root` que mantienen consistencia visual.

**Progreso persistido**: Estado del usuario guardado en `localStorage` que registra qué algoritmos ha completado.

**Shell vacío**: Página de algoritmo con estructura básica pero sin contenido educativo ni visualizadores.

**SSG (Static Site Generation)**: Generación de sitios estáticos en tiempo de build, sin servidor backend.
 
 
## Principios / Reglas no negociables

### 1. Sistema de Diseño Inmutable
- Las variables CSS definidas en el plan NO pueden modificarse entre fases
- Paleta de colores fija: `--bg`, `--surface`, `--card`, `--border`, `--accent`, `--accent2`, `--text`, `--muted`, colores de estado
- Tipografías obligatorias: **Space Mono** (código/valores) y **Syne** (UI/títulos)
- Todas las páginas deben importar Google Fonts desde el CDN especificado

### 2. Configuración Estática
- `astro.config.mjs` debe configurarse con `output: 'static'`
- NO usar SSR (Server-Side Rendering) ni endpoints dinámicos
- Todas las rutas deben generarse en tiempo de build

### 3. Estructura de Datos Canónica
- `algorithms.json` es la única fuente de verdad para el catálogo
- Campos obligatorios por algoritmo: `id`, `name`, `level`, `tags`, `complexity`, `description`, `hasVisualizer`
- El `id` debe coincidir con el slug de la URL

### 4. Progreso del Usuario
- Persistencia únicamente en `localStorage` (sin backend)
- Estructura del dato: objeto con IDs de algoritmos como claves y booleanos como valores
- El clic en una tarjeta debe marcar/desmarcar el estado de completado

### 5. Autocontenido y Sin Dependencias Externas
- NO agregar librerías de CSS (Tailwind, Bootstrap, etc.)
- NO agregar librerías de animaciones (GSAP, Framer Motion, etc.)
- Solo dependencias: Astro 4 y sus paquetes core

### 6. Nomenclatura Consistente
- Archivos Astro: PascalCase para componentes (`AlgoCard.astro`)
- IDs de algoritmos: kebab-case (`two-pointers`, `binary-search`)
- Variables CSS: kebab-case con prefijo (`--ptr-left`, `--accent2`)

### 7. Performance First
- Bundle de JavaScript en cliente debe ser mínimo en FASE 0
- Solo JS necesario: filtros del roadmap y localStorage
- Imágenes y assets deben optimizarse desde el inicio

## Límites

### Temporales
- Duración máxima: 2 semanas
- No extender la fase para agregar features fuera del alcance

### Técnicos
- Node.js versión ≥ 18.x
- Solo navegadores modernos (últimas 2 versiones de Chrome, Firefox, Safari, Edge)
- No soporte para IE11 ni navegadores legacy

### Funcionales
- Máximo 110 algoritmos en `algorithms.json` (no agregar extras)
- 5 niveles fijos (0-4), no crear niveles intermedios
- Sin visualizadores interactivos en esta fase

### De Recursos
- Deploy gratuito (free tier de Vercel/Netlify)
- Sin servicios de backend o bases de datos
- Sin CDN de terceros más allá de Google Fonts

## Eventos y estados (visión raíz)

### Estados del Proyecto

1. **INICIAL**: Repositorio vacío o sin estructura Astro
2. **ASTRO_INICIALIZADO**: Proyecto Astro 4 configurado con `astro.config.mjs`
3. **DISEÑO_IMPLEMENTADO**: Variables CSS y tipografías configuradas en `BaseLayout.astro`
4. **CATÁLOGO_CREADO**: Archivo `algorithms.json` con 110 algoritmos completos
5. **ROADMAP_FUNCIONAL**: Página `index.astro` renderiza grid con filtros activos
6. **RUTAS_DINÁMICAS**: `[slug].astro` genera páginas individuales (shell vacío)
7. **PROGRESO_PERSISTENTE**: localStorage guarda/carga estado de completado
8. **DEPLOYADO**: Sitio accesible vía URL pública (Vercel/Netlify)

### Transiciones de Estado

```
INICIAL 
  → [npm create astro] → 
ASTRO_INICIALIZADO 
  → [crear BaseLayout + CSS] → 
DISEÑO_IMPLEMENTADO 
  → [crear algorithms.json] → 
CATÁLOGO_CREADO 
  → [implementar index.astro + filtros] → 
ROADMAP_FUNCIONAL 
  → [crear [slug].astro] → 
RUTAS_DINÁMICAS 
  → [implementar localStorage] → 
PROGRESO_PERSISTENTE 
  → [deploy] → 
DEPLOYADO
```

### Eventos del Usuario en el Roadmap

- **FILTRAR_POR_NIVEL**: Usuario selecciona un nivel → Grid muestra solo algoritmos de ese nivel
- **MARCAR_COMPLETADO**: Usuario hace clic en tarjeta → Estado se guarda en localStorage → Indicador visual de completado
- **DESMARCAR_COMPLETADO**: Usuario hace clic nuevamente → Estado se elimina → Vuelve a estado no completado
- **NAVEGAR_A_ALGORITMO**: Usuario hace clic en "Ver más" → Redirección a `/algoritmos/[slug]`
- **RESETEAR_FILTROS**: Usuario selecciona "Todos" → Grid muestra los 110 algoritmos

## Criterios de aceptación (root)

### CA-001: Proyecto Astro Inicializado
- [ ] Comando `npm create astro@latest` ejecutado exitosamente
- [ ] Estructura de carpetas estándar de Astro creada
- [ ] `package.json` con dependencias de Astro 4.x
- [ ] Servidor de desarrollo funciona con `npm run dev`
- [ ] Build estático funciona con `npm run build`

### CA-002: Configuración Estática
- [ ] Archivo `astro.config.mjs` existe
- [ ] Configuración `output: 'static'` establecida
- [ ] Build genera carpeta `dist/` con archivos estáticos
- [ ] No hay errores de build relacionados con SSR

### CA-003: Sistema de Diseño Completo
- [ ] `BaseLayout.astro` creado en `/src/layouts/`
- [ ] Variables CSS en `:root` coinciden exactamente con las del plan:
  - `--bg: #0a0a0f`
  - `--surface: #12121a`
  - `--card: #1a1a27`
  - `--border: #2a2a40`
  - `--accent: #7c3aed`
  - `--accent2: #06b6d4`
  - `--text: #e2e8f0`
  - `--muted: #64748b`
  - `--ptr-left: #f59e0b`
  - `--ptr-right: #10b981`
  - `--match: #ec4899`
  - `--error: #ef4444`
  - `--swap: #8b5cf6`
  - `--visited: #1e3a5f`
  - `--current: #f59e0b`
  - `--highlight: #fbbf24`
- [ ] Google Fonts importadas correctamente (Space Mono + Syne)
- [ ] Estilos base aplicados (background, colores de texto, box-sizing)

### CA-004: Catálogo de Algoritmos
- [ ] Archivo `algorithms.json` creado en `/src/data/`
- [ ] Contiene exactamente 110 algoritmos
- [ ] Cada algoritmo tiene todos los campos obligatorios:
  - `id` (string, kebab-case)
  - `name` (string)
  - `level` (number 0-4)
  - `tags` (array de strings)
  - `complexity` (string, notación Big O)
  - `description` (string)
  - `hasVisualizer` (boolean, false por defecto en FASE 0)
- [ ] Distribución correcta por niveles:
  - Nivel 0: 10 algoritmos
  - Nivel 1: 20 algoritmos
  - Nivel 2: 25 algoritmos
  - Nivel 3: 30 algoritmos
  - Nivel 4: 25 algoritmos
- [ ] IDs únicos sin duplicados

### CA-005: Página Principal (Roadmap)
- [ ] Archivo `index.astro` creado en `/src/pages/`
- [ ] Importa y renderiza todos los algoritmos desde `algorithms.json`
- [ ] Grid responsivo que muestra las 110 tarjetas
- [ ] Cada tarjeta muestra:
  - Nombre del algoritmo
  - Badge de nivel (0-4)
  - Complejidad (Big O)
  - Descripción breve
  - Indicador visual de completado (si aplica)
- [ ] Visual coherente con el sistema de diseño (colores, tipografías)

### CA-006: Sistema de Filtros
- [ ] Botones de filtro visible: [Todos] [0] [1] [2] [3] [4]
- [ ] Al hacer clic en un nivel, solo se muestran algoritmos de ese nivel
- [ ] Botón "Todos" muestra los 110 algoritmos
- [ ] Estado del filtro activo visualmente destacado (color --accent)
- [ ] Transiciones suaves al filtrar (fade-in/fade-out)

### CA-007: Rutas Dinámicas
- [ ] Archivo `[slug].astro` creado en `/src/pages/algoritmos/`
- [ ] Función `getStaticPaths()` genera 110 rutas desde `algorithms.json`
- [ ] Cada ruta accesible en `/algoritmos/[id]` (ej: `/algoritmos/two-pointers`)
- [ ] Página muestra:
  - Nombre del algoritmo
  - Nivel
  - Complejidad
  - Descripción
  - Mensaje temporal: "Visualizador próximamente" o similar
- [ ] Layout coherente (usa `BaseLayout.astro`)
- [ ] Sin errores 404 para ninguno de los 110 algoritmos

### CA-008: Persistencia de Progreso
- [ ] Al hacer clic en una tarjeta, el estado se guarda en `localStorage`
- [ ] Clave del localStorage: `algoritmos-progreso` o similar
- [ ] Formato: objeto JSON `{ "two-pointers": true, "binary-search": true, ... }`
- [ ] Al recargar la página, el progreso se mantiene
- [ ] Indicador visual de algoritmo completado (checkmark, borde verde, etc.)
- [ ] Contador de progreso visible: "X/110 completados"

### CA-009: Componentes Reutilizables
- [ ] `AlgoCard.astro` creado en `/src/components/roadmap/`
- [ ] `LevelBadge.astro` creado en `/src/components/layout/`
- [ ] Componentes reciben props correctamente
- [ ] Estilos encapsulados (scoped CSS en Astro)

### CA-010: Deploy Exitoso
- [ ] Repositorio Git inicializado y pusheado a GitHub
- [ ] Proyecto conectado a Vercel o Netlify
- [ ] Build automático exitoso
- [ ] Sitio accesible vía URL pública (ej: `algoritmos.vercel.app`)
- [ ] Sin errores en consola del navegador
- [ ] Todas las rutas funcionan correctamente en producción
- [ ] Fonts cargadas correctamente (sin FOUT/FOIT severo)

### CA-011: Performance Inicial
- [ ] Lighthouse Score Desktop: Performance ≥ 90
- [ ] Lighthouse Score Mobile: Performance ≥ 80
- [ ] Tiempo de carga inicial (FCP) < 1.5s
- [ ] Bundle de JavaScript < 50KB (gzipped)

### CA-012: Responsividad
- [ ] Grid del roadmap adaptable (1 columna en mobile, 2-4 en desktop)
- [ ] Tarjetas legibles en móvil (mínimo 375px de ancho)
- [ ] Sin scroll horizontal en ninguna resolución
- [ ] Botones de filtro accesibles en móvil

### CA-013: Documentación
- [ ] `README.md` con instrucciones de instalación
- [ ] Scripts de npm documentados (dev, build, preview)
- [ ] Estructura del proyecto explicada
- [ ] Link al sitio deployado en el README

## Trazabilidad

### Documentos de Referencia
- **PLAN_TRABAJO.md**: Documento maestro que define las 10 fases del proyecto
- **FASE 0 - Fundamentos**: Sección específica que define alcance, tareas y entregables de esta fase
- **Sistema de Diseño**: Variables CSS y estándares visuales definidos en sección "🎨 Sistema de Diseño"
- **Catálogo de Algoritmos**: Lista completa de 110 algoritmos con distribución por niveles

### Dependencias de Fases Futuras
- **FASE 1** (Motor de Visualización): Depende de que las rutas dinámicas estén funcionando
- **FASE 2-6** (Implementación de algoritmos): Requieren el catálogo `algorithms.json` completo
- **FASE 7-10** (Features avanzadas): Necesitan la estructura base y deploy funcional

### Artefactos Generados en FASE 0
```
/
├── astro.config.mjs              # Configuración estática de Astro
├── package.json                  # Dependencias del proyecto
├── README.md                     # Documentación del setup
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro      # Layout con sistema de diseño
│   ├── pages/
│   │   ├── index.astro           # Roadmap principal
│   │   └── algoritmos/
│   │       └── [slug].astro      # Páginas dinámicas
│   ├── components/
│   │   ├── roadmap/
│   │   │   └── AlgoCard.astro    # Tarjeta de algoritmo
│   │   └── layout/
│   │       └── LevelBadge.astro  # Badge de nivel
│   └── data/
│       └── algorithms.json       # Catálogo de 110 algoritmos
└── dist/                         # Build estático (generado)
```

### Checkpoints de Validación
1. **Checkpoint 1** (Día 2-3): Astro inicializado + sistema de diseño implementado
2. **Checkpoint 2** (Día 5-6): Catálogo `algorithms.json` completo + roadmap visible
3. **Checkpoint 3** (Día 8-9): Filtros funcionales + rutas dinámicas generadas
4. **Checkpoint 4** (Día 10-12): Progreso persistido + deploy exitoso
5. **Revisión Final** (Día 13-14): Validación de todos los criterios de aceptación

### Criterios de Entrada a FASE 1
- ✅ Todos los criterios de aceptación (CA-001 a CA-013) cumplidos
- ✅ Sitio deployado y accesible públicamente
- ✅ Sin errores críticos en build ni en consola
- ✅ README.md actualizado con instrucciones claras
- ✅ Repositorio Git con commits semánticos y estructura clara
