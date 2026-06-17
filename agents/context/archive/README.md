# Archive — Material Histórico

> Esta carpeta contiene todo lo que el sistema ya cerró y no necesita estar "vivo", pero que conservamos por valor histórico.

## Estructura

```
archive/
├── README.md                  (este archivo)
├── plans/                     (planes cerrados)
│   └── YYYY-MM-PLAN-XXX.md
├── bitacora/                  (entradas antiguas de shared-context.md)
│   └── YYYY-MM-DD-bitacora.md
├── decisions/                 (ADRs muy viejos, marcados [ARCHIVED])
│   └── YYYY-MM-decisions-archive.md
└── architecture/              (versiones previas de architecture.md)
    └── YYYY-MM-DD-architecture-vX.md
```

## Convenciones

- **Nombrado por fecha:** `YYYY-MM-DD-<slug>.md` o `YYYY-MM-<slug>.md`.
- **Encabezado obligatorio** en cada archivo:

```markdown
# <tipo> — <título>

**Archivado el:** YYYY-MM-DD
**Razón del archivo:** <cierre de plan / rotación / mensual / otro>
**Período cubierto:** <desde> - <hasta>
**Link al original:** <path del archivo vivo al momento de archivar>

---

<contenido archivado>
```

## Política

- **Append-only en el archivo:** una vez archivado, no se modifica.
- **Recuperable:** si necesitas revisar un plan viejo, está aquí.
- **Indexable:** cada entrada de archivo se referencia desde el archivo vivo correspondiente.

## Mantenimiento del archivo

- El archivo **nunca se borra** (es la historia del proyecto).
- Si crece demasiado (>500 archivos), se comprime en tarballs anuales en `archive/yearly/`.
