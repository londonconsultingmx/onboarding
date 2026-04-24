# Onboarding LCG México · Proyecto Claude Code

Knowledge base y material oficial del programa de onboarding de **London Consulting Group México**. Diseñado para iteración continua con Claude Code.

El proyecto tiene **dos productos paralelos**:

1. **Material documental** — Word con branding LCG para subir al Design System.
2. **Portal HTML interactivo** — prototipo navegable del onboarding (carpeta `portal/`).

---

## Estructura

```
onboarding-lcg/
├── CLAUDE.md                        ← knowledge base para Claude (leer primero)
├── README.md                        ← este archivo
├── ONBOARDING.md                    ← contenido textual del programa (fuente de verdad)
├── generate_docx.js                 ← script para regenerar el Word
├── Onboarding_LCG_5_dias.docx       ← Word con branding LCG
├── package.json                     ← dependencias Node
├── .gitignore
└── portal/                          ← prototipo HTML del portal
    ├── landing.html                 ← página de aterrizaje
    ├── day.html                     ← vista de un día
    ├── session.html                 ← vista de una sesión
    ├── progress.html                ← vista de progreso
    ├── assets/                      ← logos LCG
    └── shared/
        ├── tokens.css               ← design tokens (colores, tipografía, layout)
        ├── iso.css                  ← estilos de animaciones isométricas
        ├── app.js                   ← tweaks panel y lógica compartida
        └── iso-builders.js          ← constructores SVG de animaciones
```

---

## Cómo empezar

### 1. Instalar dependencias (una sola vez)

```bash
npm install
```

### 2. Regenerar el Word tras cambios en el contenido

```bash
npm run build
```

### 3. Previsualizar el portal localmente

```bash
cd portal
python3 -m http.server 8000
```

Luego abre `http://localhost:8000/landing.html` en el navegador.

El portal no requiere build — es HTML/CSS/JS plano.

### 4. Iterar con Claude Code

Abre Claude Code en la raíz de la carpeta. Claude leerá automáticamente `CLAUDE.md` y tendrá todo el contexto: branding LCG, glosario de metodologías, stack tecnológico, arquitectura del portal, roles y reglas de iteración.

---

## Regla clave de sincronía

**Los tres artefactos (ONBOARDING.md, Word, Portal) deben mantenerse alineados.** Ver tabla de propagación de cambios en `CLAUDE.md`.

---

## Ejemplos de peticiones a Claude Code

- "Ajusta el Día 4 en ONBOARDING.md y propaga el cambio al Word y al portal."
- "Poblar la vista del Día 4 en el portal con los 5 bloques AI."
- "Genera la session.html para el bloque AI-4 Laboratorio Práctico."
- "Agrega un toggle de idioma ES/EN al portal."
- "Crea una plantilla de plan 30-60-90 AI para nuevo ingreso."
- "Conecta el portal a Monday para que lea el progreso real del usuario."

---

## Versionado

- `v1.0` — abril 2026. Versión inicial con rediseño del Día 4 (AI expandido) + portal integrado.

---

## Mantenedores

- **Alfredo Chávez** — Director de Operaciones / Transformación Digital.
- **Mafer** — People & Culture (owner del programa).
