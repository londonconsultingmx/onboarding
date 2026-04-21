# CLAUDE.md · Onboarding LCG México

Knowledge base para iteración continua del programa de onboarding con Claude Code.

---

## Contexto del proyecto

Este repositorio contiene el material oficial del programa de onboarding de **London Consulting Group México**. El programa es una semana (5 días) presencial en San Pedro Garza García, diseñado para todo nuevo ingreso sin importar el rol.

**Owner:** People & Culture (Mafer).
**Patrocinador técnico / AI:** Transformación Digital (Fray, Director de Operaciones).
**Alcance:** general LCG, aplicable a consultores, gerentes y roles de soporte.

El proyecto tiene **dos productos paralelos que se mantienen sincronizados**:

1. **Material documental** (Word + Markdown) — para Design System y referencia textual.
2. **Portal HTML interactivo** — prototipo navegable en la carpeta `portal/`.

---

## Archivos de este proyecto

### Raíz — Material documental

- `ONBOARDING.md` — contenido completo del programa, los 5 días en detalle. **Fuente de verdad textual.**
- `Onboarding_LCG_5_dias.docx` — versión Word con branding LCG. **Para subir al Design System.**
- `generate_docx.js` — script Node.js que genera el Word desde cero. Usar para regenerar tras cambios mayores.
- `CLAUDE.md` — este archivo. Instrucciones y contexto para Claude en futuras iteraciones.
- `README.md` — guía rápida de uso del proyecto.
- `package.json` — dependencias Node (solo `docx`).

### `portal/` — Prototipo HTML del portal

- `landing.html` — página de aterrizaje del portal (hero, overview de los 5 días, animaciones SVG isométricas).
- `day.html` — vista de un día con timeline de sesiones, filter bar y toggle de vista.
- `session.html` — vista de una sesión individual (hero, meta, contenido).
- `progress.html` — vista de progreso personal del nuevo ingreso.
- `shared/tokens.css` — design tokens (colores, tipografía, radios, sombras, layout).
- `shared/iso.css` — estilos específicos de las animaciones isométricas.
- `shared/app.js` — lógica compartida: tweaks panel con paletas de color alternativas.
- `shared/iso-builders.js` — constructores SVG de animaciones isométricas (pilares del programa).
- `assets/` — logos LCG (verde, verde oscuro, emblema).

### `assets/` (raíz) — Logos oficiales LCG para material documental

Logos oficiales en PNG. Usar en Word, Design System y cualquier artefacto documental fuera del portal.

- `logo-lcg-verde.png` — wordmark LCG, verde primario (`#03B585`).
- `logo-lcg-verde-oscuro.png` — wordmark LCG, verde institucional (`#085E54`).
- `emblema-verde.png` — emblema (sin wordmark), verde primario.
- `emblema-verde-oscuro.png` — emblema (sin wordmark), verde institucional.

> Nota: [portal/assets/](portal/assets/) contiene logos propios para el portal HTML. Mantener ambos en sincronía si se actualiza el branding.

### `screenshots/` — Referencias visuales e iteraciones de diseño

Capturas de pantalla del portal y variantes de animaciones, para referencia en iteraciones de diseño. Úsalas como input visual cuando el usuario pida ajustes sobre un estado existente.

- `landing-full.png`, `landing-check.png` — capturas de la landing del portal.
- `helix.png` … `helix7.png` — iteraciones de la animación helix (pilares isométricos).

---

## Estructura general del programa

| Día | Tema | Duración |
|-----|------|----------|
| 1 | Inducción corporativa | 6h 25m (8 bloques) |
| 2 | Metodologías LCG | 6h 30m (7 bloques) |
| 3 | Industrias y especialidades | 8h (4 bloques de 2h) |
| 4 | **Herramientas & AI** | 7h (2h 30m herramientas + 4h 30m AI) |
| 5 | Aplicación y cierre | 8h (4 bloques) |

### Cambio fundamental de esta versión (v1.0)

El **Día 4** fue rediseñado. Versión anterior: Power BI (4h) + Monday/Miro (2h) + AI (2h). Versión nueva: Power BI (1h 30m) + Monday/Miro (1h) + **AI expandido (4h 30m)**. Razón: alinear con el Framework de Competencia AI LCG y capitalizar el activo Academia Claude.

---

## Branding LCG (referencia para todo material del programa)

### Colores core

| Color | Hex | Token CSS | Uso |
|---|---|---|---|
| Verde institucional oscuro | `#085E54` | `--lcg-dark` | Títulos, encabezados, elementos principales |
| Verde primario | `#03B585` | `--lcg-green` | Destacados, acentos, íconos |
| Verde mint | `#8AF4E9` | `--lcg-mint` | Highlights, hover, selección |
| Crema | `#F2EEE8` | `--lcg-cream` | Fondos cálidos, filas alternas |

### Paleta por día (v2, definida en `portal/shared/tokens.css`)

| Día | Categoría | Hex | Fondo |
|---|---|---|---|
| D1 | Identidad | `#3A7561` (verde bosque) | `#E4EEE8` |
| D2 | Metodología | `#085E54` (verde oscuro LCG) | `#E4EFEC` |
| D3 | Industria | `#C68A3E` (ocre cálido) | `#F5ECDC` |
| D4 | Herramientas & AI | `#7A4EB5` (violeta) | `#EEE7F8` |
| D5 | Aplicación | `#03B585` (verde LCG) | `#DFF5EB` |

### Tipografía

- **Serif (títulos):** Fraunces (Google Fonts). Fallback: Playfair Display, Georgia.
- **Sans (cuerpo y UI):** Manrope (Google Fonts). Fallback: Segoe UI, system-ui.
- **Metadata/números (Design System B&P v02):** DIN 2014.

### Taglines y voz de marca

- Tagline: **"Shape Your Business"**
- Claim: **"We make change happen together"**
- Statement: "WE UNCOVER OPPORTUNITIES, implement solutions and commit to sustainable results"
- Fotografía: documental, no stock genérico.

---

## Glosario de metodologías LCG (vocabulario activo)

- **Plan de Vuelo** — plan de trabajo estructurado del proyecto.
- **Performance Analysis** — análisis de desempeño del cliente / proyecto.
- **Value Stream Analysis (VSA)** — mapeo del flujo de valor end-to-end.
- **MEF** — Modelo de Eficiencia Funcional.
- **PASER** — Planeación, Análisis, Solución, Ejecución, Resultados.
- **PID** — Plan Individual de Desarrollo (del consultor).
- **PreDx** — Prediagnóstico (antes del proyecto formal).
- **Análisis Exhaustivo** — levantamiento profundo de información.
- **Gemba Walks** — observación en el lugar donde ocurre el trabajo.
- **moreworks** — disciplina de ejecución y gestión visual.
- **Business Shaper** — generación de hipótesis de valor para cliente.
- **Verticales LCG Mx** — industrias donde opera LCG México.
- **Excelencia Comercial** — especialidad LCG en transformación comercial.
- **Lean 4.0** — Lean integrado con tecnología (IoT, sensores, dashboards).
- **Supply SCM** — intervención en cadena de suministro completa.

---

## Ecosistema tecnológico (contexto para bloque AI)

### Productos Claude disponibles en LCG

- **Claude.ai** — chat (web y app). Proyectos, Estilos, Memoria, Artifacts, búsqueda web, creación de archivos.
- **Claude Code** — CLI para desarrollo. En uso por Ricardo y equipo Platform.
- **Cowork** — automatización de escritorio (archivos, tareas repetitivas).
- **Claude API** — base de integraciones propias (London-bo).
- **Managed Agents** — agentes autónomos sobre la API.

### Modelos vigentes

- **Claude Opus 4.7** (`claude-opus-4-7`) — más potente. Análisis complejos, estrategia.
- **Claude Sonnet 4.6** (`claude-sonnet-4-6`) — balance. Uso diario.
- **Claude Haiku 4.5** (`claude-haiku-4-5-20251001`) — ligero. Alto volumen.

### Integraciones activas LCG

- Claude + SharePoint (knowledge base)
- Claude + HubSpot (CRM, pipeline)
- Claude + M365 (Outlook, Teams, Word)
- Claude + London-bo (plataforma interna de operaciones)

### Stack complementario

- **ChatGPT / Copilot** — complemento, familiaridad.
- **Perplexity** — research con fuentes citadas.
- **HubSpot Breeze** — AI nativa del CRM.
- **Sales Navigator AI** — prospección.
- **n8n** — orquestación de workflows.
- **Manus AI** — en evaluación.

### Activos internos LCG

- **Academia Claude** — portal de capacitación interna (HTML, Claude Code project).
- **London-bo** — plataforma back-office LCG con 10 módulos.
- **Framework de Competencia AI** — matriz nivel (Director/Gerente/Consultor) × área (Ops/TD/P&C).

---

## Portal HTML — arquitectura y decisiones

### Estructura de navegación

```
landing.html  →  day.html  →  session.html
                               ↓
                          progress.html (lateral, desde sidebar)
```

### App shell

Todas las páginas usan el mismo shell (sidebar + topbar):

- **Sidebar** — `.app > .sidebar` (288px fijo). Incluye brand, user card, progress card con gradiente verde, lista de días navegables y sesiones expandibles.
- **Topbar** — `.topbar` sticky con backdrop-blur, breadcrumb y acciones.
- **Main** — contenedor `.container` con `max-width: 1200px`.

### Sistema de tweaks (paletas alternativas)

El archivo `portal/shared/app.js` expone un panel flotante (abajo-derecha) que permite cambiar la paleta de categorías en vivo. Útil para validar alternativas de color sin recompilar. Paletas incluidas: `mono` (monocromático verde) y `warm` (verde + cálidos).

### Animaciones isométricas

`portal/shared/iso-builders.js` genera SVGs isométricos que representan los "pilares" del programa. Cada builder dibuja un blueprint técnico que se anima al entrar en viewport. Usado en la landing.

### Versionado de CSS

Los HTMLs referencian `tokens.css?v=3` e `iso.css?v=3`. Al hacer cambios mayores a los estilos, incrementar el `?v=` para bustear caché.

### Cómo previsualizar el portal localmente

Desde la raíz del proyecto:

```bash
cd portal
python3 -m http.server 8000
# abrir http://localhost:8000/landing.html
```

No requiere build — es HTML/CSS/JS plano.

---

## Roles y facilitadores del programa

| Rol interno | Responsable | Bloques |
|---|---|---|
| Owner del programa | Mafer (P&C) | Coordinación general |
| Políticas y admin | Jorge González | Día 1 (políticas, viáticos, SharePoint) |
| Platform / IT | Ricardo | Día 4 (herramientas técnicas) |
| Bienvenida / casos | Luis Ortiz (Director) | Día 1, Día 5 |
| Contenido AI | Fray (TD) + equipo | Día 4 (bloques AI-1 a AI-5) |
| Gerente de proyecto asignado | Variable por ingreso | Día 5 (intro proyecto) |
| Directores senior | Variable | Día 2 (metodologías), Día 3 (verticales) |

---

## Reglas de oro LCG para AI (contenido central del Día 4)

1. Nunca pegar data confidencial del cliente sin autorización explícita.
2. Siempre revisar el output antes de entregarlo o enviarlo.
3. Citar fuentes cuando Claude las proporcione y verificarlas.
4. Si el output se siente "demasiado perfecto" o "demasiado específico", probablemente alucinó. Verifica.
5. AI es copiloto. El juicio profesional es tuyo y tu responsabilidad.

---

## Indicadores de éxito del programa

- Tasa de finalización: 100%.
- Satisfacción del nuevo ingreso: ≥ 4.5/5.
- Tiempo a primera tarea productiva: día 1 de asignación.
- Score de competencia AI post-onboarding.
- Retención a 6 meses: ≥ 90%.

---

## Cómo iterar sobre este proyecto

### Regla de sincronía

**Los tres artefactos principales (MD, Word, Portal) deben mantenerse alineados en contenido.** Cuando se edite uno, propagar el cambio a los otros dos.

| Cambio | `ONBOARDING.md` | Word | Portal |
|---|---|---|---|
| Texto de un bloque | ✏️ editar | ⚙️ regenerar | ✏️ editar HTML correspondiente |
| Nueva sesión / nuevo día | ✏️ agregar | ⚙️ editar script | ✏️ nueva card/row + actualizar sidebar |
| Tiempos o facilitadores | ✏️ editar | ⚙️ regenerar | ✏️ editar meta en session.html |
| Cambio de branding | — | ⚙️ ajustar colores en script | ✏️ tokens.css |

### Para cambios menores (texto, tiempos, facilitadores)

1. Editar `ONBOARDING.md` (fuente de verdad textual).
2. Propagar cambios relevantes al HTML del portal correspondiente.
3. Regenerar el Word con `npm run build` (o `node generate_docx.js`).
4. Actualizar la versión en portada del Word y header del MD.

### Para cambios mayores (nuevo día, rediseño de bloque)

1. Discutir el cambio con Mafer (owner) y con Fray (AI/TD).
2. Reflejar el cambio primero en `ONBOARDING.md`.
3. Actualizar `generate_docx.js` para regenerar el Word.
4. Crear/ajustar HTMLs del portal (mantener consistencia con design tokens).
5. Validar el Word.
6. Subir versión nueva al Design System.
7. Actualizar `CLAUDE.md` si hay cambios estructurales.

### Revisión periódica

- **Trimestral:** revisar bloque AI (ritmo de cambio del ecosistema Claude y herramientas externas).
- **Semestral:** revisión integral del programa con P&C + TD.
- **Anual:** alineación con estrategia LCG México y Framework de Competencia AI.

---

## Notas de diseño / aprendizajes

- Los **íconos "día nombrado"** (estilo cards) funcionan bien en el prototipo HTML; conservar esa lógica.
- La **navegación por día** (sticky tabs) es preferida para el portal — no scroll largo.
- Para **callouts en Word**, implementar como `Table` de una celda con borde izquierdo grueso y shading — los párrafos estilizados no son confiables para fondos de color.
- **Progreso ponderado** por bloque (no conteo plano) para cualquier tracker de avance en Monday.
- **Academia Claude** es el punto de entrada a todo contenido AI — el Día 4 debe referirla activamente.
- **No inventar benchmarks**: los indicadores citados (4.5/5, 90% retención, etc.) son objetivos institucionales; marcar nuevos datos como ilustrativos si no están validados.
- **Portal: mantener `viewport width=1440`** — el diseño actual es desktop-first, no está optimizado para mobile. Si se requiere mobile, hacer un rediseño responsive consciente, no patching.
- **Tokens CSS antes que valores hardcodeados** — cualquier edición en HTMLs del portal debe usar las variables de `tokens.css`, no colores literales.

---

## Pendientes / backlog

- [ ] Poblar la vista del Día 4 en el portal con el detalle de los 5 bloques AI (AI-1 a AI-5).
- [ ] Responsive / mobile del portal (si aplica).
- [ ] Definir prompt library LCG (10-15 prompts) por área.
- [ ] Crear caso integrado del Día 5 con data anonimizada real.
- [ ] Plantilla de plan 30-60-90 AI para nuevo ingreso.
- [ ] Evaluación de competencia AI post-onboarding (instrumento).
- [ ] Material audiovisual: 1 video corto de bienvenida del CEO.
- [ ] Encuesta de satisfacción digital (posiblemente via Monday forms).
- [ ] Conectar portal con datos reales (hoy es prototipo estático).
- [ ] Integrar portal con London-bo (SSO, progreso sincronizado).

---

**Última actualización:** abril 2026 · v1.0
**Mantenedor:** Fray (Transformación Digital) + Mafer (P&C)
