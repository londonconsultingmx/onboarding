// Generador del Word del Onboarding LCG (5 días)
// Branding: verde institucional #085E54, acento #03B585, crema #F2EEEB
// Tipografía: Georgia (títulos) + Segoe UI (cuerpo)

const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, PageOrientation, LevelFormat, HeadingLevel,
  BorderStyle, WidthType, ShadingType, VerticalAlign,
  PageNumber, PageBreak, Header, Footer, TabStopType, TabStopPosition
} = require('docx');

// === Colores LCG ===
const VERDE_OSCURO = "085E54";
const VERDE_CLARO = "03B585";
const VERDE_SUAVE = "BAF4E9";
const CREMA = "F2EEEB";
const GRIS_TEXTO = "333333";
const GRIS_BORDE = "D6D6D6";

// === Helpers ===
const border = { style: BorderStyle.SINGLE, size: 4, color: GRIS_BORDE };
const borders = { top: border, bottom: border, left: border, right: border };

// Párrafo simple con tipografía de cuerpo
const P = (text, opts = {}) => new Paragraph({
  spacing: { before: 60, after: 60 },
  children: [new TextRun({ text, font: "Segoe UI", size: 20, color: GRIS_TEXTO, ...opts })]
});

// Párrafo con bullet
const BULLET = (text, bold = false) => new Paragraph({
  numbering: { reference: "bullets", level: 0 },
  spacing: { before: 40, after: 40 },
  children: [new TextRun({ text, font: "Segoe UI", size: 20, color: GRIS_TEXTO, bold })]
});

// Bullet mixto (label bold + descripción regular)
const BULLET_MIX = (label, desc) => new Paragraph({
  numbering: { reference: "bullets", level: 0 },
  spacing: { before: 40, after: 40 },
  children: [
    new TextRun({ text: label, font: "Segoe UI", size: 20, color: GRIS_TEXTO, bold: true }),
    new TextRun({ text: desc, font: "Segoe UI", size: 20, color: GRIS_TEXTO })
  ]
});

// Heading H1 (portada y día)
const H1 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_1,
  spacing: { before: 480, after: 240 },
  children: [new TextRun({ text, font: "Georgia", size: 44, bold: true, color: VERDE_OSCURO })]
});

// Heading H2 (sección dentro de día)
const H2 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_2,
  spacing: { before: 320, after: 160 },
  children: [new TextRun({ text, font: "Georgia", size: 30, bold: true, color: VERDE_OSCURO })]
});

// Heading H3 (bloque dentro de sección)
const H3 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_3,
  spacing: { before: 220, after: 100 },
  children: [new TextRun({ text, font: "Georgia", size: 24, bold: true, color: VERDE_CLARO })]
});

// Celda de tabla genérica
const cell = (text, opts = {}) => new TableCell({
  borders,
  width: { size: opts.width || 2000, type: WidthType.DXA },
  shading: opts.fill ? { fill: opts.fill, type: ShadingType.CLEAR } : undefined,
  margins: { top: 100, bottom: 100, left: 140, right: 140 },
  verticalAlign: VerticalAlign.CENTER,
  children: [new Paragraph({
    alignment: opts.align || AlignmentType.LEFT,
    children: [new TextRun({
      text,
      font: "Segoe UI",
      size: opts.size || 18,
      bold: opts.bold || false,
      color: opts.color || GRIS_TEXTO
    })]
  })]
});

// === Tabla resumen de un día ===
function tablaResumenDia(rows) {
  const headerRow = new TableRow({
    tableHeader: true,
    children: [
      cell("Bloque", { width: 4500, fill: VERDE_OSCURO, color: "FFFFFF", bold: true, size: 20 }),
      cell("Duración", { width: 1500, fill: VERDE_OSCURO, color: "FFFFFF", bold: true, size: 20, align: AlignmentType.CENTER }),
      cell("Facilitador sugerido", { width: 3360, fill: VERDE_OSCURO, color: "FFFFFF", bold: true, size: 20 })
    ]
  });

  const bodyRows = rows.map((r, i) => new TableRow({
    children: [
      cell(r.bloque, { width: 4500, fill: i % 2 === 0 ? CREMA : "FFFFFF", size: 19 }),
      cell(r.dur, { width: 1500, fill: i % 2 === 0 ? CREMA : "FFFFFF", size: 19, align: AlignmentType.CENTER, bold: true, color: VERDE_OSCURO }),
      cell(r.fac, { width: 3360, fill: i % 2 === 0 ? CREMA : "FFFFFF", size: 19 })
    ]
  }));

  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [4500, 1500, 3360],
    rows: [headerRow, ...bodyRows]
  });
}

// === Callout box ===
function callout(titulo, texto, color = VERDE_SUAVE) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [9360],
    rows: [new TableRow({
      children: [new TableCell({
        borders: {
          top: { style: BorderStyle.SINGLE, size: 4, color: VERDE_OSCURO },
          bottom: { style: BorderStyle.SINGLE, size: 4, color: VERDE_OSCURO },
          left: { style: BorderStyle.SINGLE, size: 16, color: VERDE_OSCURO },
          right: { style: BorderStyle.SINGLE, size: 4, color: VERDE_OSCURO }
        },
        width: { size: 9360, type: WidthType.DXA },
        shading: { fill: color, type: ShadingType.CLEAR },
        margins: { top: 160, bottom: 160, left: 200, right: 200 },
        children: [
          new Paragraph({
            spacing: { after: 80 },
            children: [new TextRun({ text: titulo, font: "Georgia", size: 22, bold: true, color: VERDE_OSCURO })]
          }),
          new Paragraph({
            children: [new TextRun({ text: texto, font: "Segoe UI", size: 19, color: GRIS_TEXTO })]
          })
        ]
      })]
    })]
  });
}

// ============================================================
// PORTADA
// ============================================================
const portada = [
  new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { before: 1200, after: 240 },
    children: [new TextRun({ text: "LONDON CONSULTING GROUP", font: "Georgia", size: 20, color: VERDE_CLARO, characterSpacing: 60 })]
  }),
  new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { before: 0, after: 120 },
    children: [new TextRun({ text: "Onboarding LCG México", font: "Georgia", size: 72, bold: true, color: VERDE_OSCURO })]
  }),
  new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { before: 0, after: 480 },
    children: [new TextRun({ text: "Programa de 5 días · Inducción para nuevos ingresos", font: "Georgia", size: 28, italics: true, color: GRIS_TEXTO })]
  }),
  new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: VERDE_CLARO, space: 1 } },
    spacing: { before: 0, after: 240 },
    children: []
  }),
  new Paragraph({
    spacing: { before: 120, after: 60 },
    children: [new TextRun({ text: "Versión:", font: "Segoe UI", size: 20, bold: true, color: VERDE_OSCURO }),
               new TextRun({ text: "  v1.0 — Abril 2026", font: "Segoe UI", size: 20, color: GRIS_TEXTO })]
  }),
  new Paragraph({
    spacing: { before: 60, after: 60 },
    children: [new TextRun({ text: "Propietario:", font: "Segoe UI", size: 20, bold: true, color: VERDE_OSCURO }),
               new TextRun({ text: "  People & Culture — LCG México", font: "Segoe UI", size: 20, color: GRIS_TEXTO })]
  }),
  new Paragraph({
    spacing: { before: 60, after: 60 },
    children: [new TextRun({ text: "Modalidad:", font: "Segoe UI", size: 20, bold: true, color: VERDE_OSCURO }),
               new TextRun({ text: "  Presencial · San Pedro Garza García, N.L.", font: "Segoe UI", size: 20, color: GRIS_TEXTO })]
  }),
  new Paragraph({
    spacing: { before: 60, after: 60 },
    children: [new TextRun({ text: "Alcance:", font: "Segoe UI", size: 20, bold: true, color: VERDE_OSCURO }),
               new TextRun({ text: "  General LCG — aplicable a todos los nuevos ingresos", font: "Segoe UI", size: 20, color: GRIS_TEXTO })]
  }),
  new Paragraph({ children: [new PageBreak()] })
];

// ============================================================
// TABLA DE CONTENIDO / RESUMEN EJECUTIVO
// ============================================================
const resumenEjecutivo = [
  H1("Resumen ejecutivo"),
  P("Este documento describe el programa oficial de onboarding de London Consulting Group México. El programa está diseñado para que todo nuevo ingreso, independientemente del rol, comprenda en una semana la identidad, metodología, herramientas y expectativas de la firma, y termine con un plan de carrera individualizado y asignación a proyecto."),
  new Paragraph({ spacing: { before: 120 }, children: [] }),
  H3("Estructura general"),
  BULLET_MIX("Día 1 — Inducción corporativa: ", "identidad, cultura, organigrama y marco administrativo."),
  BULLET_MIX("Día 2 — Metodologías LCG: ", "PASER, PreDx, Análisis Exhaustivo, Gemba, Estudios Analíticos."),
  BULLET_MIX("Día 3 — Industrias y especialidades: ", "verticales de LCG México, Supply Chain, Lean 4.0, Excelencia Comercial."),
  BULLET_MIX("Día 4 — Herramientas & AI: ", "Power BI, Monday, Miro y bloque expandido de AI en Consultoría."),
  BULLET_MIX("Día 5 — Aplicación y cierre: ", "caso de uso integrado, plan de carrera y asignación a proyecto."),
  new Paragraph({ spacing: { before: 240 }, children: [] }),
  callout(
    "Cambio clave vs. versión anterior",
    "El Día 4 se rediseña de 'Herramientas' a 'Herramientas & AI'. Se comprime Power BI de 4h a 1.5h y se expande AI en Consultoría de 2h a 4.5h, alineando el onboarding con el Framework de Competencia AI LCG y el activo Academia Claude."
  ),
  new Paragraph({ children: [new PageBreak()] })
];

// ============================================================
// DÍA 1 — Inducción corporativa
// ============================================================
const dia1 = [
  H1("Día 1 · Inducción corporativa LCG"),
  P("Objetivo del día: que el nuevo ingreso comprenda quiénes somos, cómo nos organizamos y cuál es el marco de política y cultura que rige la operación en LCG México.", { italics: true }),

  H2("Agenda del día"),
  tablaResumenDia([
    { bloque: "Bienvenida + Accesos",       dur: "1h",     fac: "P&C (Mafer) + IT" },
    { bloque: "¿Quiénes somos?",            dur: "45m",    fac: "Dirección general" },
    { bloque: "Organigrama + Roles",        dur: "40m",    fac: "P&C (Mafer)" },
    { bloque: "Valores London",             dur: "30m",    fac: "P&C (Mafer)" },
    { bloque: "London Balance",             dur: "45m",    fac: "P&C (Mafer)" },
    { bloque: "Políticas de Viáticos",      dur: "45m",    fac: "Admin (Jorge)" },
    { bloque: "Políticas Generales",        dur: "1h",     fac: "Admin (Jorge)" }
  ]),

  H2("Detalle de bloques"),

  H3("Bienvenida + Accesos · 1h"),
  BULLET("Recepción formal por People & Culture."),
  BULLET("Firma de documentación de ingreso y formalización administrativa."),
  BULLET("Alta en M365 (cuenta @londoncg.mx), Teams, SharePoint, OneDrive."),
  BULLET("Entrega de equipo, credenciales de acceso físico y setup de estación."),
  BULLET("Tour de oficina: espacios comunes, salas de junta, áreas colaborativas."),

  H3("¿Quiénes somos? · 45m"),
  BULLET("Historia de London Consulting Group: fundación, trayectoria, presencia regional."),
  BULLET("Modelo de negocio: consultoría por consultor-semana."),
  BULLET("Propuesta de valor LCG: 'We make change happen together'."),
  BULLET("Claim de marca: 'Shape Your Business' — qué significa en la práctica."),
  BULLET("Statement: descubrimos oportunidades, implementamos soluciones, comprometemos resultados sostenibles."),

  H3("Organigrama + Roles · 40m"),
  BULLET("Estructura directiva de LCG México."),
  BULLET("Áreas de soporte: People & Culture, Administración, IT, Growth, Finanzas."),
  BULLET("Roles en proyecto: Director, Gerente, Consultor — responsabilidades y handoffs."),
  BULLET("Comité directivo y flujos de decisión."),

  H3("Valores London · 30m"),
  BULLET("Valores institucionales y cómo se viven día a día."),
  BULLET("Expectativas de comportamiento en cliente y en oficina."),
  BULLET("Casos cortos de situaciones reales y cómo se resolvieron con base en valores."),

  H3("London Balance · 45m"),
  BULLET("Filosofía de balance profesional-personal en LCG."),
  BULLET("Política de jornadas, viajes, descansos compensatorios."),
  BULLET("Canales de comunicación con People & Culture y líder directo."),
  BULLET("Mecanismos de feedback y escalación."),

  H3("Políticas de Viáticos · 45m"),
  BULLET("Tipos de viaje, topes y comprobación."),
  BULLET("Herramientas de registro de gastos."),
  BULLET("Tarjetas corporativas: uso y reglas."),
  BULLET("Reembolsos: proceso y tiempos."),

  H3("Políticas Generales · 1h"),
  BULLET("Código de conducta y ética profesional."),
  BULLET("Política de confidencialidad y manejo de información de cliente."),
  BULLET("Política de uso de equipo y sistemas."),
  BULLET("Política de comunicación externa y presencia en redes."),
  BULLET("Marco legal básico: NDAs, propiedad intelectual, cláusulas de proyecto."),

  new Paragraph({ spacing: { before: 240 }, children: [] }),
  callout(
    "Entregable del día",
    "Al cierre del Día 1, el nuevo ingreso tiene accesos operativos, conoce la estructura organizacional y ha firmado el marco normativo completo de LCG."
  ),
  new Paragraph({ children: [new PageBreak()] })
];

// ============================================================
// DÍA 2 — Metodologías LCG
// ============================================================
const dia2 = [
  H1("Día 2 · Metodologías LCG"),
  P("Objetivo del día: que el nuevo ingreso conozca el cuerpo metodológico que diferencia a LCG como firma de consultoría, y entienda cómo se estructura un proyecto desde el diagnóstico hasta la implementación.", { italics: true }),

  H2("Agenda del día"),
  tablaResumenDia([
    { bloque: "Retro Adet & Psico",               dur: "1h 30m", fac: "Director senior" },
    { bloque: "Metodología PASER",                dur: "1h",     fac: "Gerente senior" },
    { bloque: "Metodología PreDx Handoff",        dur: "30m",    fac: "Gerente senior" },
    { bloque: "Metodología Análisis Exhaustivo",  dur: "1h",     fac: "Gerente senior" },
    { bloque: "Gemba Walks + Flujos de Proc.",    dur: "1h",     fac: "Consultor senior" },
    { bloque: "Estudios Analíticos",              dur: "1h",     fac: "Consultor senior" },
    { bloque: "Metodologías de Proyecto",         dur: "1h",     fac: "Director senior" }
  ]),

  H2("Detalle de bloques"),

  H3("Retro Adet & Psico · 1h 30m"),
  BULLET("Retroalimentación de pruebas de ingreso (Adet & Psicométrica)."),
  BULLET("Perfil individual del nuevo ingreso: fortalezas, áreas de desarrollo, estilo de trabajo."),
  BULLET("Cómo se usa el perfil para asignación a proyecto y plan de carrera."),
  BULLET("Conversación 1-a-1 con líder directo sobre expectativas mutuas."),

  H3("Metodología PASER · 1h"),
  BULLET("Qué es PASER: Planeación, Análisis, Solución, Ejecución, Resultados."),
  BULLET("Cómo se aplica en cada fase de un proyecto LCG."),
  BULLET("Entregables típicos por fase."),
  BULLET("Caso real: recorrido por un proyecto completo usando PASER."),

  H3("Metodología PreDx Handoff · 30m"),
  BULLET("Qué es un Prediagnóstico (PreDx) en LCG."),
  BULLET("Handoff de comercial a operaciones: qué información transfiere y cómo."),
  BULLET("Responsabilidades del consultor que recibe el PreDx."),

  H3("Metodología Análisis Exhaustivo · 1h"),
  BULLET("Qué es el Análisis Exhaustivo y cuándo se aplica."),
  BULLET("Técnicas de levantamiento: entrevistas, observación, análisis documental."),
  BULLET("Construcción de hipótesis y validación con data."),
  BULLET("Entregable estándar: formato y calidad esperada."),

  H3("Gemba Walks + Flujos de Proceso · 1h"),
  BULLET("Filosofía Gemba: ir al lugar donde ocurre el trabajo."),
  BULLET("Cómo preparar, ejecutar y documentar un Gemba Walk."),
  BULLET("Mapeo de flujos de proceso: notación, herramientas y criterios."),
  BULLET("Identificación de desperdicios (muda) y oportunidades de mejora."),

  H3("Estudios Analíticos · 1h"),
  BULLET("Tipos de estudios analíticos en LCG (tiempos, productividad, capacidad, utilización)."),
  BULLET("Diseño muestral y rigor estadístico."),
  BULLET("Presentación de resultados a cliente: formato y narrativa."),

  H3("Metodologías de Proyecto · 1h"),
  BULLET("Plan de Vuelo: qué es, cómo se construye, cómo se actualiza."),
  BULLET("Performance Analysis: KPIs de proyecto y de consultor."),
  BULLET("Value Stream Analysis: mapeo de valor end-to-end."),
  BULLET("MEF (Modelo de Eficiencia Funcional)."),
  BULLET("Business Shaper: generación de hipótesis de valor para el cliente."),
  BULLET("moreworks: disciplina de ejecución y gestión visual."),

  new Paragraph({ spacing: { before: 240 }, children: [] }),
  callout(
    "Entregable del día",
    "Al cierre del Día 2, el nuevo ingreso identifica las metodologías core de LCG, sabe cuándo aplicar cada una y comprende el ciclo completo de un proyecto de consultoría."
  ),
  new Paragraph({ children: [new PageBreak()] })
];

// ============================================================
// DÍA 3 — Industrias y especialidades
// ============================================================
const dia3 = [
  H1("Día 3 · Industrias y especialidades LCG"),
  P("Objetivo del día: que el nuevo ingreso conozca los sectores donde opera LCG México y las especialidades técnicas que dan diferenciación a nuestras propuestas de valor.", { italics: true }),

  H2("Agenda del día"),
  tablaResumenDia([
    { bloque: "Verticales LCG México",   dur: "2h", fac: "Director senior por vertical" },
    { bloque: "Supply SCM",              dur: "2h", fac: "Especialista Supply Chain" },
    { bloque: "Lean 4.0",                dur: "2h", fac: "Especialista Lean" },
    { bloque: "Excelencia Comercial",    dur: "2h", fac: "Especialista Comercial" }
  ]),

  H2("Detalle de bloques"),

  H3("Verticales LCG México · 2h"),
  BULLET("Panorama de industrias donde LCG tiene presencia: manufactura, servicios financieros, retail, consumo, salud, agroindustria."),
  BULLET("Características y retos típicos de cada vertical."),
  BULLET("Casos representativos por industria."),
  BULLET("Cómo se adapta la metodología LCG a cada contexto."),

  H3("Supply SCM (Supply Chain Management) · 2h"),
  BULLET("Visión integral de la cadena de suministro: plan, source, make, deliver, return."),
  BULLET("Diagnóstico de problemas típicos en cadena: inventarios, lead times, servicio al cliente."),
  BULLET("Herramientas LCG para intervención en Supply Chain."),
  BULLET("Caso de éxito: transformación de cadena en cliente real."),

  H3("Lean 4.0 · 2h"),
  BULLET("Fundamentos Lean: valor, flujo, pull, perfección."),
  BULLET("Herramientas Lean: 5S, SMED, Kanban, Jidoka, A3, Kaizen."),
  BULLET("Lean 4.0: integración con tecnología (IoT, sensores, dashboards en tiempo real)."),
  BULLET("Cuándo proponer una intervención Lean en un cliente."),

  H3("Excelencia Comercial · 2h"),
  BULLET("Arquitectura de un área comercial de alto desempeño."),
  BULLET("Procesos críticos: pipeline, pronóstico, gestión territorial, administración de cuentas."),
  BULLET("Indicadores de desempeño comercial y cómo intervenirlos."),
  BULLET("Integración de tecnología comercial (CRM, herramientas de inteligencia)."),

  new Paragraph({ spacing: { before: 240 }, children: [] }),
  callout(
    "Entregable del día",
    "Al cierre del Día 3, el nuevo ingreso puede identificar la vertical y especialidad donde probablemente se desempeñará, y conoce los argumentos de diferenciación de LCG en cada campo."
  ),
  new Paragraph({ children: [new PageBreak()] })
];

// ============================================================
// DÍA 4 — Herramientas & AI (EL DÍA CENTRAL)
// ============================================================
const dia4 = [
  H1("Día 4 · Herramientas & AI"),
  P("Objetivo del día: que el nuevo ingreso domine las herramientas de productividad y análisis de LCG, y alcance fluidez operativa con el ecosistema Claude como copiloto diario de consultoría.", { italics: true }),

  callout(
    "Rediseño del Día 4",
    "Se comprime Power BI de 4h a 1.5h (fusionando los dos ejercicios en uno integrado), se reduce Monday & Miro de 2h a 1h, y se expande AI en Consultoría de 2h a 4h 30m. El nuevo balance refleja la centralidad de AI en la práctica consultora actual y aprovecha el activo Academia Claude de LCG."
  ),

  H2("Agenda del día"),
  tablaResumenDia([
    { bloque: "Power BI (M365 + ETL integrados)", dur: "1h 30m", fac: "Growth / Reportería" },
    { bloque: "Monday & Miro",                    dur: "1h",     fac: "IT / Platform" },
    { bloque: "AI-1 · Fundamentos AI",            dur: "45m",    fac: "Transformación Digital" },
    { bloque: "AI-2 · Ecosistema Claude",         dur: "1h 15m", fac: "Transformación Digital" },
    { bloque: "AI-3 · AI aplicada al proceso LCG", dur: "45m",    fac: "Director + TD" },
    { bloque: "AI-4 · Laboratorio práctico",       dur: "1h",     fac: "Consultor Digital" },
    { bloque: "AI-5 · Stack y cierre",             dur: "45m",    fac: "Transformación Digital" }
  ]),

  // --- BLOQUE PM: Power BI ---
  H2("Mañana · Herramientas de análisis y gestión (2h 30m)"),

  H3("Power BI integrado M365 + ETL · 1h 30m"),
  BULLET_MIX("Qué se cubre: ", "navegación por dashboards LCG existentes, conexión con M365, pipeline ETL básico."),
  BULLET_MIX("Foco: ", "leer y entender reportes LCG, no dominar Power BI como analista."),
  BULLET("Ejercicio integrado: cargar un dataset de ejemplo, construir un visual básico y publicarlo en SharePoint."),
  BULLET_MIX("Entregable: ", "un visual propio conectado a datos LCG anonimizados."),

  H3("Monday & Miro · 1h"),
  BULLET("Monday: tableros de proyecto LCG, integración con London-bo, gestión de tareas y visibilidad."),
  BULLET("Miro: uso para co-creación con cliente, mapas de proceso, workshops remotos."),
  BULLET("Cuándo usar Monday vs. Miro vs. PowerPoint."),
  BULLET_MIX("Ejercicio: ", "crear un tablero Monday con 5 tareas típicas de un proyecto, y un diagrama de flujo simple en Miro."),

  // --- BLOQUE AI (el corazón del día) ---
  H2("Tarde · AI en Consultoría (4h 30m)"),

  H3("AI-1 · Fundamentos AI · 45m"),
  P("Conceptos base que todo consultor LCG debe dominar antes de tocar una herramienta de AI:", { bold: true }),
  BULLET_MIX("Qué es un LLM y qué NO es: ", "no es buscador, no es base de datos, no 'sabe' datos en tiempo real por sí solo."),
  BULLET_MIX("Modelo vs. interfaz vs. agente: ", "Claude (modelo) vs. Claude.ai (interfaz) vs. un Managed Agent autónomo."),
  BULLET_MIX("Contexto y ventana de contexto: ", "por qué pegar documentos enteros cambia la calidad del output."),
  BULLET_MIX("Prompting: ", "claridad, rol, formato deseado, ejemplos. Diferencia entre prompt vago y prompt estructurado."),
  BULLET_MIX("Alucinaciones: ", "qué son, por qué ocurren, cómo detectarlas, qué hacer al detectarlas."),
  BULLET_MIX("Privacidad y confidencialidad LCG: ", "qué sí se puede subir (documentos internos, ejemplos genéricos) y qué no (data de cliente identificable, PII, información financiera sensible)."),
  BULLET_MIX("Sesgo y límites: ", "el modelo tiene sesgos y errores; el juicio humano siempre es la capa final."),
  BULLET_MIX("Dinámica: ", "comparar el mismo problema resuelto con Google vs. Claude mal prompteado vs. Claude bien prompteado. Ver la diferencia cualitativa en vivo."),

  H3("AI-2 · Ecosistema Claude en LCG · 1h 15m"),
  P("Las 4 formas de usar Claude en la operación LCG:", { bold: true }),

  BULLET_MIX("Claude.ai (web/app) — caballo de batalla diario: ", "Proyectos, Estilos, Memoria, Artifacts, búsqueda web integrada, creación de archivos (Word, Excel, PPT, PDF), código y visualizaciones."),
  BULLET_MIX("Claude Code — terminal para desarrollo: ", "uso por perfiles técnicos (Alfredo Chávez, Sistemas y Digital MX). Delegación de tareas de código. Conexión con London-bo."),
  BULLET_MIX("Cowork — automatización de escritorio: ", "organización de archivos, tareas repetitivas, automatización de flujos locales. Muy útil para operaciones y administración."),
  BULLET_MIX("API y Managed Agents — infraestructura: ", "cómo London-bo opera sobre la API de Claude. Concepto de agente autónomo."),

  P("Modelos disponibles y cuándo usar cada uno:", { bold: true }),
  BULLET_MIX("Claude Opus 4.7: ", "lo más potente. Para análisis profundos, propuestas complejas, estrategia."),
  BULLET_MIX("Claude Sonnet 4.6: ", "balance velocidad/calidad. Uso diario para la mayoría de tareas."),
  BULLET_MIX("Claude Haiku 4.5: ", "rápido y ligero. Para tareas simples, clasificación, volumen."),

  P("Integraciones vivas en LCG:", { bold: true }),
  BULLET("Claude + SharePoint (búsqueda de documentos internos, knowledge base LCG)."),
  BULLET("Claude + HubSpot (análisis de pipeline, enriquecimiento de cuentas)."),
  BULLET("Claude + M365 (Outlook, Teams, Word)."),
  BULLET("Claude + London-bo (módulos operativos con AI integrada)."),

  P("Academia Claude (portal LCG):", { bold: true }),
  BULLET("Recorrido por el portal de capacitación Claude para consultores y directores."),
  BULLET("Rutas de certificación interna por nivel."),

  H3("AI-3 · AI aplicada al proceso LCG · 45m"),
  P("Cómo Claude acelera cada fase de un proyecto de consultoría LCG:", { bold: true }),
  BULLET_MIX("PASER: ", "estructuración de hallazgos, generación de matrices causa-efecto, redacción de síntesis."),
  BULLET_MIX("PreDx: ", "análisis previo de cuenta e industria, mapeo rápido de tomadores de decisión, hipótesis de valor."),
  BULLET_MIX("Análisis Exhaustivo: ", "lectura masiva de documentos, extracción de patrones, consolidación de entrevistas."),
  BULLET_MIX("Gemba Walks: ", "transcripción y síntesis de observaciones en campo, identificación de desperdicios."),
  BULLET_MIX("Value Stream Analysis: ", "mapeo preliminar a partir de descripciones de proceso, cálculo de tiempos y lead times."),
  BULLET_MIX("Business Shaper: ", "generación de hipótesis de valor, cuantificación preliminar de oportunidades."),
  BULLET_MIX("Plan de Vuelo: ", "borrador inicial, identificación de dependencias, redacción de narrativa para cliente."),

  H3("AI-4 · Laboratorio práctico · 1h"),
  P("Un solo ejercicio end-to-end con un caso real anonimizado de LCG:", { bold: true }),
  new Paragraph({
    numbering: { reference: "numbered", level: 0 },
    children: [new TextRun({ text: "Crear un Proyecto en Claude.ai con contexto del caso (empresa, industria, retos, data disponible).", font: "Segoe UI", size: 20 })]
  }),
  new Paragraph({
    numbering: { reference: "numbered", level: 0 },
    children: [new TextRun({ text: "Cargar 2 o 3 documentos del cliente (anonimizados) como knowledge base del Proyecto.", font: "Segoe UI", size: 20 })]
  }),
  new Paragraph({
    numbering: { reference: "numbered", level: 0 },
    children: [new TextRun({ text: "Extraer 5 hallazgos clave con prompting estructurado.", font: "Segoe UI", size: 20 })]
  }),
  new Paragraph({
    numbering: { reference: "numbered", level: 0 },
    children: [new TextRun({ text: "Generar un resumen ejecutivo en formato LCG (Artifact).", font: "Segoe UI", size: 20 })]
  }),
  new Paragraph({
    numbering: { reference: "numbered", level: 0 },
    children: [new TextRun({ text: "Crear un Value Stream Analysis preliminar como Artifact visual.", font: "Segoe UI", size: 20 })]
  }),
  new Paragraph({
    numbering: { reference: "numbered", level: 0 },
    children: [new TextRun({ text: "Revisión en grupo: qué funcionó, dónde alucinó el modelo, qué habría que ajustar antes de entregar a cliente.", font: "Segoe UI", size: 20 })]
  }),

  H3("AI-5 · Stack complementario y cierre · 45m"),
  P("Otras herramientas AI del stack LCG (mapa mental, sin profundizar):", { bold: true }),
  BULLET_MIX("ChatGPT / Copilot: ", "complemento. Reconocer familiaridad, saber cuándo LCG prefiere Claude."),
  BULLET_MIX("Perplexity: ", "búsqueda con fuentes citadas. Útil para research de industria y benchmarks."),
  BULLET_MIX("HubSpot Breeze: ", "AI nativa del CRM. Para el flujo comercial."),
  BULLET_MIX("Sales Navigator AI: ", "señales de compra, enriquecimiento de leads."),
  BULLET_MIX("n8n: ", "orquestación de workflows con AI. Lo opera IT; el consultor identifica necesidades."),
  BULLET_MIX("Manus AI: ", "en evaluación. Tareas autónomas — conocer, no adoptar aún."),

  P("Framework de Competencia AI LCG:", { bold: true }),
  BULLET_MIX("Director: ", "priorización estratégica de casos de uso AI, gobernanza, alineación con cliente."),
  BULLET_MIX("Gerente: ", "diseño e implementación de workflows AI, prompt engineering de profundidad, orquestación."),
  BULLET_MIX("Consultor: ", "ejecución diaria con AI, uso fluido de Claude en tareas cotidianas."),
  BULLET("Para cada nivel, expectativas específicas en Operaciones, Transformación Digital y People & Culture."),
  BULLET("Plan de 30-60-90 días de desarrollo AI personalizado por nuevo ingreso."),

  P("Reglas de oro LCG para AI:", { bold: true }),
  new Paragraph({
    numbering: { reference: "numbered", level: 0 },
    children: [new TextRun({ text: "Nunca pegar data confidencial del cliente sin autorización explícita.", font: "Segoe UI", size: 20 })]
  }),
  new Paragraph({
    numbering: { reference: "numbered", level: 0 },
    children: [new TextRun({ text: "Siempre revisar el output antes de entregarlo o enviarlo.", font: "Segoe UI", size: 20 })]
  }),
  new Paragraph({
    numbering: { reference: "numbered", level: 0 },
    children: [new TextRun({ text: "Citar fuentes cuando Claude las proporcione y verificarlas.", font: "Segoe UI", size: 20 })]
  }),
  new Paragraph({
    numbering: { reference: "numbered", level: 0 },
    children: [new TextRun({ text: "Si el output se siente 'demasiado perfecto' o 'demasiado específico', probablemente alucinó. Verifica.", font: "Segoe UI", size: 20 })]
  }),
  new Paragraph({
    numbering: { reference: "numbered", level: 0 },
    children: [new TextRun({ text: "AI es copiloto. El juicio profesional es tuyo y tu responsabilidad.", font: "Segoe UI", size: 20 })]
  }),

  P("Entrega final del día:", { bold: true }),
  BULLET("Prompt library LCG (10-15 prompts probados por área)."),
  BULLET("Acceso configurado a Claude.ai, Academia Claude y herramientas del stack."),
  BULLET("Plan personal 30-60-90 de desarrollo AI firmado con líder directo."),

  new Paragraph({ spacing: { before: 240 }, children: [] }),
  callout(
    "Entregable del día",
    "Al cierre del Día 4, el nuevo ingreso opera con fluidez Claude.ai para tareas de consultoría, conoce todo el ecosistema Claude y tiene un plan 30-60-90 de desarrollo AI."
  ),
  new Paragraph({ children: [new PageBreak()] })
];

// ============================================================
// DÍA 5 — Aplicación y cierre
// ============================================================
const dia5 = [
  H1("Día 5 · Aplicación y cierre"),
  P("Objetivo del día: que el nuevo ingreso aplique todo lo aprendido en un caso integrado, conozca su plan de carrera en LCG y se prepare para su primera asignación a proyecto.", { italics: true }),

  H2("Agenda del día"),
  tablaResumenDia([
    { bloque: "Caso de Uso integrado (Vertical, Horizontal, Metodología, Herramientas)", dur: "3h",   fac: "Director + Gerente + TD" },
    { bloque: "Cierre y Retro de Caso & Semana",                                          dur: "2h",   fac: "P&C + Director" },
    { bloque: "Plan de Carrera y PID",                                                    dur: "1h 30m", fac: "P&C (Mafer) + líder directo" },
    { bloque: "Intro a Proyecto Asignación",                                              dur: "1h 30m", fac: "Gerente de proyecto asignado" }
  ]),

  H2("Detalle de bloques"),

  H3("Caso de Uso integrado · 3h"),
  BULLET("Caso real anonimizado que integra: vertical (industria), horizontal (especialidad técnica), metodología LCG y herramientas."),
  BULLET("Trabajo en equipos pequeños (2-3 nuevos ingresos)."),
  BULLET("Uso activo de Claude.ai para análisis, síntesis y entregables — aplicación directa de lo visto en Día 4."),
  BULLET("Presentación final de cada equipo al panel de Directores."),
  BULLET("Feedback inmediato sobre aplicación de metodología y calidad de entregable."),

  H3("Cierre y Retro de Caso & Semana · 2h"),
  BULLET("Retrospectiva grupal de la semana: qué funcionó, qué no, qué mejorar."),
  BULLET("Debrief del caso: hallazgos, aprendizajes, conexión con la práctica real."),
  BULLET("Compromisos personales: qué se llevan al primer proyecto."),
  BULLET("Encuesta de satisfacción del onboarding (input para mejora continua)."),

  H3("Plan de Carrera y PID · 1h 30m"),
  BULLET("Rutas de carrera en LCG: Consultor → Gerente → Director."),
  BULLET("Competencias esperadas en cada nivel y cómo se evalúan."),
  BULLET("Plan Individual de Desarrollo (PID): qué es, cómo se construye, cada cuándo se revisa."),
  BULLET("Sesión 1-a-1 con líder directo para firmar PID inicial."),
  BULLET("Conexión con el plan AI 30-60-90 elaborado en Día 4."),

  H3("Intro a Proyecto Asignación · 1h 30m"),
  BULLET("Presentación del proyecto donde se incorpora el nuevo ingreso."),
  BULLET("Equipo de trabajo: roles, stakeholders, ritmos de proyecto."),
  BULLET("Contexto del cliente, fase actual del proyecto, entregables próximos."),
  BULLET("Agenda de primer día en proyecto y expectativas de primera semana."),
  BULLET("Dudas y cierre formal del onboarding."),

  new Paragraph({ spacing: { before: 240 }, children: [] }),
  callout(
    "Entregable del día",
    "Al cierre del Día 5, el nuevo ingreso tiene su PID firmado, un plan de 30-60-90 de desarrollo AI, asignación formal a proyecto y contacto directo con su equipo. Queda listo para su primer día en cliente."
  ),
  new Paragraph({ children: [new PageBreak()] })
];

// ============================================================
// ANEXO: Gobernanza del programa
// ============================================================
const anexo = [
  H1("Anexo · Gobernanza del programa"),

  H2("Roles y responsabilidades"),
  BULLET_MIX("People & Culture (Mafer): ", "owner del programa. Agenda, facilitadores, materiales, feedback loop."),
  BULLET_MIX("Administración (Jorge): ", "bloques de políticas, viáticos, SharePoint, marco normativo."),
  BULLET_MIX("Sistemas y Digital MX (Alfredo Chávez): ", "setup técnico, accesos, demos de herramientas internas."),
  BULLET_MIX("Dirección general / Directores: ", "bienvenida, casos de uso, panel de cierre."),
  BULLET_MIX("Transformación Digital (Alfredo Chávez): ", "contenido AI, Academia Claude, Framework de Competencia AI."),
  BULLET_MIX("Gerentes de proyecto: ", "presentación de proyecto asignado, handoff formal al equipo."),

  H2("Indicadores de éxito del programa"),
  BULLET("Tasa de finalización del onboarding (objetivo: 100%)."),
  BULLET("Score de satisfacción del nuevo ingreso (objetivo: ≥ 4.5/5)."),
  BULLET("Tiempo a primera tarea productiva en proyecto (objetivo: día 1 de asignación)."),
  BULLET("Score de competencia AI post-onboarding (evaluación interna)."),
  BULLET("Retención a 6 meses (objetivo: ≥ 90%)."),

  H2("Mejora continua"),
  BULLET("Retro con facilitadores cada ciclo de onboarding."),
  BULLET("Encuesta al nuevo ingreso al cierre (Día 5) y a 30 días (ya en proyecto)."),
  BULLET("Revisión semestral del programa por People & Culture + Transformación Digital."),
  BULLET("Actualización del material de AI trimestralmente, dado el ritmo de cambio del ecosistema.")
];

// ============================================================
// Construir documento
// ============================================================
const doc = new Document({
  creator: "London Consulting Group México",
  title: "Onboarding LCG · Programa 5 días",
  description: "Programa oficial de onboarding para nuevos ingresos LCG México",
  styles: {
    default: {
      document: { run: { font: "Segoe UI", size: 20, color: GRIS_TEXTO } }
    },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 44, bold: true, font: "Georgia", color: VERDE_OSCURO },
        paragraph: { spacing: { before: 480, after: 240 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 30, bold: true, font: "Georgia", color: VERDE_OSCURO },
        paragraph: { spacing: { before: 320, after: 160 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: "Georgia", color: VERDE_CLARO },
        paragraph: { spacing: { before: 220, after: 100 }, outlineLevel: 2 } }
    ]
  },
  numbering: {
    config: [
      { reference: "bullets", levels: [
        { level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 540, hanging: 270 } },
                   run: { color: VERDE_CLARO } } }
      ]},
      { reference: "numbered", levels: [
        { level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 540, hanging: 270 } },
                   run: { color: VERDE_OSCURO, bold: true } } }
      ]}
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: VERDE_CLARO, space: 4 } },
          children: [new TextRun({ text: "LCG · Onboarding México · v1.0", font: "Segoe UI", size: 16, color: VERDE_OSCURO, characterSpacing: 20 })]
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "London Consulting Group México   |   ", font: "Segoe UI", size: 16, color: VERDE_OSCURO }),
            new TextRun({ text: "Página ", font: "Segoe UI", size: 16, color: GRIS_TEXTO }),
            new TextRun({ children: [PageNumber.CURRENT], font: "Segoe UI", size: 16, color: GRIS_TEXTO })
          ]
        })]
      })
    },
    children: [
      ...portada,
      ...resumenEjecutivo,
      ...dia1,
      ...dia2,
      ...dia3,
      ...dia4,
      ...dia5,
      ...anexo
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/claude/onboarding/Onboarding_LCG_5_dias.docx", buffer);
  console.log("OK: Onboarding_LCG_5_dias.docx generado");
});
