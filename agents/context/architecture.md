# Arquitectura del Proyecto

> Documento vivo. Lo mantiene el agente Arquitecto. Es la **fuente de verdad estructural** del proyecto.

## Última actualización

<YYYY-MM-DD por architect>

## Diagrama de alto nivel

\`\`\`mermaid
graph TD
    Cliente --> API
    API --> BD
    ...
\`\`\`

## Stack detallado

| Capa | Tecnología | Versión | Responsabilidad |
|------|------------|---------|-----------------|
| Frontend | ... | ... | ... |
| Backend | ... | ... | ... |
| Persistencia | ... | ... | ... |
| Cache | ... | ... | ... |
| Cola de mensajes | ... | ... | ... |
| CDN | ... | ... | ... |
| Observabilidad | ... | ... | ... |

## Estructura de carpetas

\`\`\`
proyecto/
├── src/
│   ├── components/
│   ├── services/
│   ├── models/
│   ├── utils/
│   └── ...
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/
├── config/
└── ...
\`\`\`

## Patrones aplicados

- **Repository:** <dónde>
- **Service Layer:** <dónde>
- **DTO/Mapper:** <dónde>
- **Factory:** <dónde>
- **Strategy:** <dónde>
- **Observer:** <dónde>
- **CQRS:** <sí/no, dónde>
- **Event Sourcing:** <sí/no, dónde>

## Convenciones de código

- **Lenguaje principal:** <ej. TypeScript strict>
- **Estilo:** <ESLint config, Prettier, etc.>
- **Naming:** <camelCase, PascalCase, kebab-case>
- **Comentarios:** <JSDoc, docstrings, etc.>
- **Tests:** <Jest, Vitest, etc.>
- **Coverage mínimo:** <%>

## Modelo de datos

\`\`\`mermaid
erDiagram
    User ||--o{ Order : places
    Order ||--|{ LineItem : contains
    ...
\`\`\`

## APIs externas

| API | Propósito | Autenticación | Rate limits |
|-----|-----------|---------------|-------------|
| ... | ... | ... | ... |

## Decisiones arquitectónicas relevantes

Ver `context/decisions-log.md` para el detalle. Resumen de las más importantes:

- ADR-XXXX: <título> — <fecha>
- ADR-XXXX: <título> — <fecha>
