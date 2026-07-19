/* ==========================================================================
   APPLICATION LOGIC - APP.JS
   Vanilla JavaScript with dynamic HTML5 rendering and resilient APIs
   ========================================================================== */
const BACKEND_URL = "https://boudiccadaain-soc-tutor-backend.hf.space";

// CONFIGURACIÓN DE FIREBASE E INICIALIZACIÓN DE FIRESTORE
const firebaseConfig = {
    projectId: "the-responder-264f2",
    appId: "1:717129732306:web:8393356d38f7735eeddd0b",
    storageBucket: "the-responder-264f2.firebasestorage.app",
    apiKey: "AIzaSyAy_bIBJelfHcMBx2QHr_hwtWjAa3_LKX0",
    authDomain: "the-responder-264f2.firebaseapp.com",
    messagingSenderId: "717129732306",
    measurementId: "G-XWHLRRVZ68"
};

let db = null;
const isFirebaseAvailable = typeof firebase !== "undefined";
if (isFirebaseAvailable) {
    try {
        const firebaseApp = firebase.initializeApp(firebaseConfig);
        db = firebaseApp.firestore();
        console.log("✓ [Firebase] Inicializado con éxito.");
    } catch (e) {
        console.error("❌ [Firebase] Error de inicialización:", e);
    }
} else {
    console.warn("⚠️ [Firebase] No disponible (Modo Offline o error de red CDN).");
}

// Base de datos de leyes interna (Fallback local ante fallos CORS en protocolo file://)
const FALLBACK_REGULATORY_DATABASE = [
    {
        "source": "Uruguay - Banco Central del Uruguay (BCU) Comunicación 2021/2318 y Circular 2318",
        "text": "Recopilación de Normas de Regulación y Control del Sistema Financiero del Banco Central del Uruguay (BCU): De conformidad con la Circular 2318 y la Comunicación 2021/2318, las entidades reguladas por el BCU (bancos, procesadores de pago, emisores de tarjetas) tienen la obligación legal de reportar al regulador financiero todo incidente de seguridad de la información calificado como crítico. Dicho reporte preliminar de vulneración debe presentarse en un plazo máximo e improrrogable de 24 horas contadas a partir de la detección o sospecha razonable del evento. Las sanciones por incumplimiento en la notificación o por reportes tardíos oscilan desde apercibimientos formales e inhabilitaciones temporales de directores, hasta multas pecuniarias de hasta 2,000,000 de Unidades Indexadas (UI) y la revocación de la licencia para operar en el territorio uruguayo."
    },
    {
        "source": "México - Secretaría de Salud (NOM-004-SSA3-2012) e INAI (LGPDPPSO)",
        "text": "Norma Oficial Mexicana NOM-004-SSA3-2012 del Expediente Clínico y la Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados (LGPDPPSO): El tratamiento de expedientes clínicos electrónicos en territorio mexicano implica la custodia de datos personales de carácter sensible. Ante una brecha de seguridad (acceso no autorizado, pérdida, copia o alteración de fichas clínicas), el CISO o Responsable del tratamiento debe dar aviso obligatorio tanto a los titulares afectados como al INAI (o Secretaría de Salud si corresponde al sector público) dentro de las 72 horas hábiles contadas a partir de que se tenga conocimiento del incidente. La omisión del deber de notificación se sanciona penal y administrativamente de acuerdo con el Título Noveno de la Ley, contemplando multas severas de hasta 320,000 Unidades de Medida y Actualización (UMA) e inhabilitación del personal médico y directivo involucrado en la negligencia."
    },
    {
        "source": "Brasil - Lei Geral de Proteção de Datos (LGPD - Ley 13.709) y ANPD",
        "text": "Ley General de Protección de Datos de Brasil (LGPD - Lei Nº 13.709): Conforme al Artículo 48 de la LGPD, el controlador del tratamiento de datos personales debe comunicar a la Autoridad Nacional de Protección de Datos (ANPD) y a los titulares la ocurrencia de cualquier incidente de seguridad que pueda generar riesgo o daño relevante para los individuos. La ley prescribe que la comunicación se debe realizar en un 'plazo razonable', el cual la ANPD y la jurisprudencia interpretan doctrinariamente como un período de 48 a 72 horas a partir del conocimiento del incidente. Las sanciones administrativas por incumplir con las obligaciones de gobernanza o notificación a tiempo pueden representar multas de hasta el 2% de la facturación de la persona jurídica en Brasil, con un tope de 50,000,000 de reales por infracción."
    },
    {
        "source": "Chile - Ley Marco de Ciberseguridad e Infraestructura Crítica y CSIRT Nacional",
        "text": "Chile - Ley Marco de Ciberseguridad (Ley Nº 21.660) y Normas Sectoriales del CSIRT: Las instituciones identificadas como operadores de infraestructura crítica de la información o proveedores de servicios esenciales (de salud, finanzas, transporte, energía) tienen la obligación legal estricta de notificar al CSIRT de la Subsecretaría del Interior y a las superintendencias correspondientes cualquier incidente cibernético calificado como de impacto significativo o grave. El plazo legal establecido para esta notificación inicial es inmediato y no debe exceder las 3 horas contadas desde el inicio de la contención técnica o el conocimiento del incidente. Las multas por retardo o no notificación varían según la gravedad y el sector, pudiendo alcanzar hasta las 15,000 UTM (Unidades Tributarias Mensuales) para operadores públicos o privados esenciales."
    },
    {
        "source": "Estándares Globales de Ciberseguridad y Gobernanza (ISO/IEC 27001 y NIST SP 800-61)",
        "text": "Estándares de Seguridad de la Información (ISO/IEC 27001:2022 Control A.5.34 y Guía NIST SP 800-61 Rev 2 para el Manejo de Incidentes): Las buenas prácticas internacionales de gobernanza técnica y organizativa estipulan que el ciclo de vida de gestión de incidentes debe estructurarse en fases bien delimitadas: Preparación, Detección y Análisis, Contención, Erradicación y Recuperación, y Actividades Post-Incidente. Las directrices exigen documentar sistemáticamente el análisis forense, registrar las lecciones aprendidas y establecer un plan de comunicación de crisis que diferencie los plazos técnicos de contención de los plazos legales de notificación a los reguladores correspondientes de cada país afectado por la brecha transfronteriza."
    }
];

// Ground Truth (Casos del Experimento)
const SCENARIOS = {
    "1": {
        "title": "Caso 1: Brecha de Datos Financieros (Uruguay)",
        "type": "Ransomware / Filtración de Datos de Tarjetas de Crédito",
        "jurisdiction": "Uruguay (Finanzas)",
        "dilema": "El analista de seguridad detecta la exfiltración activa de logs del procesador de pagos (con hashes de tarjetas comprometidos). El equipo técnico recomienda postergar la notificación oficial al Banco Central para priorizar el bloqueo técnico de puertos y evitar pánico financiero en el mercado.",
        "decision": "Postergar la notificación oficial al Banco Central para evitar pánico de mercado, priorizando la contención interna del firewall.",
        "badgeClass": "finances",
        "badgeText": "FINANZAS",
        "ethicalCulture": {
            "title": "Utilitarismo (Mitigación de Daño Sistémico)",
            "description": "La directiva de la empresa prioriza la estabilidad de la liquidez del mercado financiero y la prevención de pánico colectivo por encima de formalidades burocráticas."
        },
        "questions": [
            {
                "question": "¿Cuál es el plazo máximo regulatorio para notificar este incidente?",
                "options": {
                    "A": "Inmediato / hasta 3 horas",
                    "B": "24 horas desde su detección",
                    "C": "48 horas",
                    "D": "72 horas / hábiles",
                    "E": "No se requiere notificación"
                },
                "correct": "B"
            },
            {
                "question": "¿A qué autoridad reguladora se debe presentar la notificación oficial?",
                "options": {
                    "A": "Banco Central del Uruguay (BCU)",
                    "B": "Secretaría de Salud e INAI (México)",
                    "C": "ANPD (Brasil) y CSIRT (Chile)",
                    "D": "Ninguna de las anteriores"
                },
                "correct": "A"
            },
            {
                "question": "Con base en la normativa aplicable, ¿qué recomendación de cumplimiento darías?",
                "options": {
                    "A": "Aprobar la decisión del operador (retrasar la notificación es adecuado para no generar pánico)",
                    "B": "Rechazar la decisión (viola el plazo obligatorio de 24 horas del BCU)"
                },
                "correct": "B"
            }
        ],
        "justifications": {
            "A": [
                { "key": "utilitarian", "text": "Cálculo Consecuencialista: La demora protege el sistema financiero nacional de pérdidas millonarias y pánico de mercado (máxima utilidad social)." },
                { "key": "necessity", "text": "Estado de Necesidad: La urgencia de contener la brecha técnica en el procesador suspende temporalmente el deber de reporte inmediato." }
            ],
            "B": [
                { "key": "formalism", "text": "Cumplimiento Formal: La circular del BCU es absoluta; el cumplimiento regulatorio es prioritario frente a cualquier impacto en el mercado." },
                { "key": "deontology", "text": "Transparencia Deontológica: El público tiene derecho moral a saber del riesgo sobre sus tarjetas de crédito inmediatamente." }
            ]
        }
    },
    "2": {
        "title": "Caso 2: Filtración de Expedientes Clínicos (México)",
        "type": "Phishing / Acceso no autorizado a Ficha Clínica Electrónica",
        "jurisdiction": "México (Salud)",
        "dilema": "Un médico de urgencias compromete sus credenciales mediante un correo de phishing sofisticado. Se detecta la descarga masiva de 5,000 expedientes de pacientes con datos sensibles de salud. El equipo decide levantar el reporte inmediato al INAI a las 12 horas del incidente.",
        "decision": "Notificar a la Secretaría de Salud y al INAI inmediatamente a las 12 horas del incidente, activando el protocolo de bloqueo de credenciales comprometidas.",
        "badgeClass": "health",
        "badgeText": "SALUD",
        "ethicalCulture": {
            "title": "Deontología (Transparencia y Autonomía)",
            "description": "La clínica prioriza la transparencia contractual, la honestidad y el respeto absoluto a la autonomía de los titulares de los datos sobre su información íntima."
        },
        "questions": [
            {
                "question": "¿Cuál es el plazo máximo regulatorio para notificar este incidente?",
                "options": {
                    "A": "Inmediato / hasta 3 horas",
                    "B": "24 horas desde su detección",
                    "C": "48 horas",
                    "D": "72 horas / hábiles desde el conocimiento del incidente",
                    "E": "No se requiere notificación"
                },
                "correct": "D"
            },
            {
                "question": "¿A qué autoridad reguladora se debe presentar la notificación oficial?",
                "options": {
                    "A": "Banco Central del Uruguay (BCU)",
                    "B": "Secretaría de Salud y el INAI (México)",
                    "C": "ANPD (Brasil) y CSIRT (Chile)",
                    "D": "Ninguna de las anteriores"
                },
                "correct": "B"
            },
            {
                "question": "Con base en la normativa aplicable, ¿qué recomendación de cumplimiento darías?",
                "options": {
                    "A": "Aprobar la decisión del operador (notificar a las 12 horas está dentro del plazo legal de 72h hábiles)",
                    "B": "Rechazar la decisión (notificar a las 12 horas es prematuro y viola el protocolo de retardo)"
                },
                "correct": "A"
            }
        ],
        "justifications": {
            "A": [
                { "key": "deontology", "text": "Transparencia y Autonomía: El titular de los datos de salud tiene el derecho inalienable de saber del compromiso de su información íntima de forma inmediata." },
                { "key": "formalism", "text": "Deber Legal: El marco de la LGPDPPSO y los plazos de 72h hábiles son obligatorios y deben seguirse sin dilación." }
            ],
            "B": [
                { "key": "utilitarian", "text": "Mitigación de Pánico: Notificar con datos forenses incompletos genera alarma social innecesaria y daña la reputación del hospital." },
                { "key": "pragmatic", "text": "Prioridad Operativa: Es mejor retrasar el reporte para asegurar primero que las credenciales de los médicos estén 100% protegidas." }
            ]
        }
    },
    "3": {
        "title": "Caso 3: Data Breach Transfronterizo (Brasil/Chile)",
        "type": "Data Breach / Exfiltración Transfronteriza",
        "jurisdiction": "Brasil (LGPD) y Chile (Ley Marco)",
        "dilema": "Una base de datos de clientes chilenos hospedada en servidores de Brasil es vulnerada y expuesta en un foro de ciberdelincuencia. Para evitar complicaciones de análisis, el equipo técnico propone posponer la notificación al CSIRT de Chile hasta completar un análisis legal completo transfronterizo en Brasil.",
        "decision": "Bloquear IPs de exfiltración, aislar el servidor base en Brasil y retrasar el informe al CSIRT de Chile para realizar análisis legal transfronterizo.",
        "badgeClass": "critical",
        "badgeText": "TRANSFRONTERIZO",
        "ethicalCulture": {
            "title": "Principialismo (No Maleficencia y Justicia Procedimental)",
            "description": "La empresa prioriza la No Maleficencia y la protección directa e inmediata de los derechos y seguridad de los consumidores frente a riesgos cibernéticos."
        },
        "questions": [
            {
                "question": "¿Cuál es el plazo máximo regulatorio para notificar este incidente?",
                "options": {
                    "A": "Inmediato / máximo 3 horas si afecta infraestructura crítica o servicios esenciales",
                    "B": "24 horas desde su detección",
                    "C": "48 horas",
                    "D": "72 horas / hábiles",
                    "E": "No se requiere notificación"
                },
                "correct": "A"
            },
            {
                "question": "¿A qué autoridad reguladora se debe presentar la notificación oficial?",
                "options": {
                    "A": "Banco Central del Uruguay (BCU)",
                    "B": "Secretaría de Salud e INAI (México)",
                    "C": "ANPD (Brasil) y CSIRT (Chile)",
                    "D": "Ninguna de las anteriores"
                },
                "correct": "C"
            },
            {
                "question": "Con base en la normativa aplicable, ¿qué recomendación de cumplimiento darías?",
                "options": {
                    "A": "Aprobar la decisión del operador (es preferible analizar primero la colisión internacional)",
                    "B": "Rechazar la decisión (viola el plazo máximo estricto de 3 horas del CSIRT de Chile)"
                },
                "correct": "B"
            }
        ],
        "justifications": {
            "A": [
                { "key": "utilitarian", "text": "Eficiencia de Recursos: Centralizar la defensa en Brasil evita la duplicación de costos legales y multas en Chile." },
                { "key": "technical", "text": "Consistencia Forense: Retrasar la notificación evita reportar logs crudos e inexactos que puedan contradecirse después." }
            ],
            "B": [
                { "key": "principialism", "text": "No Maleficencia: Debemos alertar de inmediato a los consumidores chilenos para evitar fraudes en sus cuentas, previniendo daños." },
                { "key": "cooperation", "text": "Cooperación Transfronteriza: El respeto a la soberanía digital del CSIRT de Chile es una obligación moral insoslayable." }
            ]
        }
    }
};

// Respuestas de IA Simuladas para el Modo Demo
const MOCK_IA_RESPONSES = {
    "1": {
        "groupB": `--- DICTAMEN DE IA BÁSICA (SIN VALIDADOR - SIMULADO) ---
[VEREDICTO] RECHAZADO: La propuesta del operador de postergar la notificación oficial al Banco Central del Uruguay (BCU) para evitar pánico de mercado infringe gravemente la Circular 2318.

[FUNDAMENTACIÓN LEGAL]
- Bajo la normativa de regulación y control del sistema financiero del BCU, las entidades reguladas deben reportar incidentes calificados como críticos en un plazo máximo e improrrogable de 24 horas contadas a partir de la detección o sospecha razonable del evento.
- La postergación deliberada para priorizar la contención técnica o eludir el pánico de mercado se califica como negligencia y puede derivar en multas de hasta 2,000,000 de Unidades Indexadas (UI) o incluso la revocación de la licencia para operar.

[RECOMENDACIÓN]
- Proceder de forma inmediata a la comunicación preliminar del incidente de seguridad al BCU, manteniendo el canal abierto de soporte técnico para complementar la información conforme avance el análisis forense.`,
        "groupC": {
            "evaluacion": "RECHAZADO (DEMO MULTI-AGENTE)",
            "explicacion": "El dictamen de auditoría multi-agente valida y corrobora de forma estricta las normativas financieras de Uruguay. La decisión del operador de postergar el reporte al Banco Central de Uruguay (BCU) viola la Circular 2318 (plazo límite de 24 horas).",
            "mejor_practica": "Ejecutar la notificación inicial formal al BCU inmediatamente (dentro de las 24 horas). Utilizar plantillas estandarizadas de reporte preliminar de incidentes críticos.",
            "fuentes_citadas": ["Uruguay BCU Circular 2318 (Circular_2318_Uruguay_Finanzas.pdf)", "ISO/IEC 27001:2022 Control A.5.34"],
            "costo_estimado": 0.00340,
            "total_tokens": 1240,
            "aprobado": true,
            "score_tecnico": 100.0
        }
    },
    "2": {
        "groupB": `--- DICTAMEN DE IA BÁSICA (SIN VALIDADOR - SIMULADO) ---
[VEREDICTO] APROBADO: La propuesta del operador de notificar a la Secretaría de Salud y al INAI inmediatamente a las 12 horas del incidente cumple holgadamente con los plazos establecidos.

[FUNDAMENTACIÓN LEGAL]
- Según la NOM-004-SSA3-2012 y la Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados (LGPDPPSO), el plazo máximo para notificar brechas que comprometan expedientes clínicos es de 72 horas hábiles contadas a partir del conocimiento del incidente.
- Realizar la notificación a las 12 horas asegura el cumplimiento de las obligaciones de transparencia, minimizando el riesgo de sanciones y multas administrativas (las cuales pueden alcanzar hasta 320,000 UMA).

[RECOMENDACIÓN]
- Proceder con la notificación planificada al INAI y a los titulares afectados, asegurando el bloqueo de las credenciales de urgencia comprometidas y documentando las lecciones aprendidas.`,
        "groupC": {
            "evaluacion": "APROBADO (DEMO MULTI-AGENTE)",
            "explicacion": "Se valida que el reporte inmediato a las 12 horas cumple cabalmente con la NOM-004-SSA3-2012 y la LGPDPPSO de México, las cuales otorgan una ventana de hasta 72 horas hábiles. Cero alucinaciones detectadas.",
            "mejor_practica": "Continuar con la notificación formal a los titulares de datos de salud y documentar las medidas correctivas aplicadas a las cuentas de correo institucional comprometidas.",
            "fuentes_citadas": ["México NOM-004-SSA3-2012 (NOM_004_SSA3_Expediente_Clinico.pdf)", "LGPDPPSO Título Noveno, Artículos de Infracciones"],
            "costo_estimado": 0.00280,
            "total_tokens": 980,
            "aprobado": true,
            "score_tecnico": 100.0
        }
    },
    "3": {
        "groupB": `--- DICTAMEN DE IA BÁSICA (SIN VALIDADOR - SIMULADO) ---
[VEREDICTO] RECHAZADO: La propuesta del operador de posponer el informe al CSIRT de Chile para realizar un análisis de colisión legal transfronterizo en Brasil es inválida y viola los plazos legales.

[FUNDAMENTACIÓN LEGAL]
- De acuerdo con la Ley Marco de Ciberseguridad de Chile (Ley Nº 21.660), los operadores de infraestructura crítica de la información y proveedores de servicios esenciales deben notificar los incidentes significativos de forma inmediata, en un plazo que no exceda las 3 horas de su contención o conocimiento.
- Alinear las operaciones chilenas bajo las regulaciones de la LGPD de Brasil es un error técnico-operativo; las leyes de cada país deben cumplirse de manera independiente y en paralelo.

[RECOMENDACIÓN]
- Proceder con el reporte de emergencia al CSIRT de Chile inmediatamente antes de cumplirse el plazo límite de 3 horas, y de forma paralela notificar a la ANPD en Brasil dentro de su ventana razonable (48-72h).`,
        "groupC": {
            "evaluacion": "RECHAZADO (DEMO MULTI-AGENTE)",
            "explicacion": "El motor multi-agente determinó que la propuesta del operador de posponer el informe en Chile viola el Artículo de Notificaciones de la Ley Marco de Ciberseguridad de Chile (Ley Nº 21.660), que impone un plazo fatal e improrrogable de 3 horas.",
            "mejor_practica": "Ejecutar la alerta temprana de 3 horas en Chile e iniciar la investigación paralela de impacto para la ANPD brasileña de acuerdo al Art. 48 de la LGPD.",
            "fuentes_citadas": ["Chile Ley Marco de Ciberseguridad Ley 21.660 (Ley_Marco_CSIRT_Chile.pdf)", "Brasil LGPD Art. 48"],
            "costo_estimado": 0.00410,
            "total_tokens": 1560,
            "aprobado": true,
            "score_tecnico": 100.0
        }
    }
};

// FUNCIÓN DE CONTRABALANCEO LATINO (Matriz de asignación de Grupo + Escenario)
function getExperimentParameters(startingGroup, runNumber) {
    let group = 'A';
    let scenarioId = '1';
    
    if (startingGroup === 'A') {
        if (runNumber === 1) { group = 'A'; scenarioId = '1'; }
        else if (runNumber === 2) { group = 'B'; scenarioId = '2'; }
        else if (runNumber === 3) { group = 'C'; scenarioId = '3'; }
    } else if (startingGroup === 'B') {
        if (runNumber === 1) { group = 'B'; scenarioId = '2'; }
        else if (runNumber === 2) { group = 'C'; scenarioId = '3'; }
        else if (runNumber === 3) { group = 'A'; scenarioId = '1'; }
    } else if (startingGroup === 'C') {
        if (runNumber === 1) { group = 'C'; scenarioId = '3'; }
        else if (runNumber === 2) { group = 'A'; scenarioId = '1'; }
        else if (runNumber === 3) { group = 'B'; scenarioId = '2'; }
    }
    
    return { group, scenarioId };
}

// ESTADO GLOBAL DE LA APP
let appState = {
    participantId: "ANON",
    experience: "No declarada",
    geminiApiKey: "",
    groqApiKey: "",
    openrouterApiKey: "",
    lastUsedModel: "N/A",
    selectedScenarioId: "1",
    activeGroup: "A",
    regulatoryDatabase: FALLBACK_REGULATORY_DATABASE,
    stopwatchStart: 0,
    stopwatchElapsed: 0,
    iaLatency: 0,
    answers: {},
    quizScore: 0,
    csvLogs: [],
    isDemoMode: false,
    runNumber: 1,
    startingGroup: null,
    accessCode: ""
};

// SELECTORES DOM
const phases = {
    1: document.getElementById("phase-1"),
    2: document.getElementById("phase-2"),
    3: document.getElementById("phase-3"),
    4: document.getElementById("phase-4"),
    5: document.getElementById("phase-5")
};

// CARGAR CORPUS VECTORIAL LOCAL (Mapea RAG)
async function loadRegulatoryCorpus() {
    try {
        // fetch lanzará error CORS si se ejecuta desde file:/// en local
        const response = await fetch("regulatory_corpus.json");
        if (response.ok) {
            appState.regulatoryDatabase = await response.json();
            console.log("✓ Base de datos regulatory_corpus.json cargada con éxito.");
        }
    } catch (e) {
        console.warn("⚠️ Advertencia: No se pudo cargar regulatory_corpus.json mediante fetch (CORS o file://). Usando base de datos interna de respaldo.");
        appState.regulatoryDatabase = FALLBACK_REGULATORY_DATABASE;
    }
}

// INICIAR PRECALENTAMIENTO DEL BACKEND
function warmupBackend() {
    console.log("⏳ [Precalentamiento] Enviando ping al Hugging Face backend...");
    fetch(BACKEND_URL, { method: "GET", mode: "no-cors" })
        .then(() => console.log("✓ [Precalentamiento] Handshake de backend enviado."))
        .catch(e => console.warn("⚠️ [Precalentamiento] Error de ping de red:", e));
}

// CAMBIAR DE FASE (SPA NAVIGATION)
function showPhase(phaseNum) {
    Object.values(phases).forEach(p => p.classList.add("hidden"));
    phases[phaseNum].classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Guardar estado en sessionStorage para recuperación ante fallos de conexión o recargas accidentales
    sessionStorage.setItem("currentPhase", phaseNum);
    sessionStorage.setItem("accessCode", appState.accessCode);
    sessionStorage.setItem("participantId", appState.participantId);
    sessionStorage.setItem("experience", appState.experience);
    sessionStorage.setItem("geminiApiKey", appState.geminiApiKey);
    sessionStorage.setItem("groqApiKey", appState.groqApiKey);
    sessionStorage.setItem("openrouterApiKey", appState.openrouterApiKey);
    sessionStorage.setItem("runNumber", appState.runNumber);
    sessionStorage.setItem("startingGroup", appState.startingGroup || "");
    sessionStorage.setItem("activeGroup", appState.activeGroup);
    sessionStorage.setItem("selectedScenarioId", appState.selectedScenarioId);
    sessionStorage.setItem("isDemoMode", appState.isDemoMode);
    sessionStorage.setItem("csvLogs", JSON.stringify(appState.csvLogs));

    if (phaseNum === 2) {
        const assignedRunContainer = document.getElementById("assigned-run-container");
        const manualScenariosContainer = document.getElementById("manual-scenarios-container");
        if (appState.isDemoMode) {
            assignedRunContainer.classList.add("hidden");
            manualScenariosContainer.classList.remove("hidden");
        } else {
            assignedRunContainer.classList.remove("hidden");
            manualScenariosContainer.classList.add("hidden");
            
            // Asignar parámetros según la matriz de contrabalanceo
            const { group, scenarioId } = getExperimentParameters(appState.startingGroup, appState.runNumber);
            appState.activeGroup = group;
            appState.selectedScenarioId = scenarioId;
            
            const scenario = SCENARIOS[scenarioId];
            
            document.getElementById("assigned-run-subtitle").innerText = `CORRIDA ${appState.runNumber} DE 3`;
            document.getElementById("assigned-run-title").innerText = scenario.title;
            
            let groupLabel = "Grupo C: Motor Multi-Agente";
            if (group === "A") groupLabel = "Grupo A: Búsqueda Manual";
            if (group === "B") groupLabel = "Grupo B: IA Básica";
            
            document.getElementById("assigned-run-details").innerHTML = `
                <strong>Caso / Tipo:</strong> ${scenario.type}<br>
                <strong>Jurisdicción:</strong> ${scenario.jurisdiction}<br>
                <strong>Soporte tecnológico asignado:</strong> ${groupLabel}
            `;
        }
    }
}

// CONTROLADORES DE EVENTOS Y ENLACES
document.addEventListener("DOMContentLoaded", () => {
    // Inicialización
    loadRegulatoryCorpus();
    warmupBackend();

    // Manejar el cambio de calificación de confianza en vivo
    document.querySelectorAll('input[name="trust-rating"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (appState.csvLogs.length > 0) {
                appState.csvLogs[appState.csvLogs.length - 1].confianza = e.target.value;
                console.log(`[Confianza] Calificación registrada para la última corrida: ${e.target.value}`);
            }
        });
    });

    // Cargar parámetros de URL para control experimental
    const urlParams = new URLSearchParams(window.location.search);
    let urlGroup = urlParams.get('group');
    const isProduction = urlParams.get('production') === 'true';

    // Normalizar grupo
    if (urlGroup) {
        urlGroup = urlGroup.toUpperCase();
    }

    // Si el grupo no es válido o está ausente, asignar uno aleatorio (A, B, C)
    if (!['A', 'B', 'C'].includes(urlGroup)) {
        const groups = ['A', 'B', 'C'];
        urlGroup = groups[Math.floor(Math.random() * groups.length)];
        console.log(`[Ciego Único] Grupo no especificado. Asignado aleatoriamente: Grupo ${urlGroup}`);
    } else {
        console.log(`[Ciego Único] Grupo asignado por URL: Grupo ${urlGroup}`);
    }

    appState.activeGroup = urlGroup;
    appState.startingGroup = urlGroup;

    // Configurar la visibilidad de la interfaz según el grupo
    setupExperimentalUI(urlGroup, isProduction);

    // Intentar recuperar sesión activa existente ante recargas de página accidentales
    const cachedAccessCode = sessionStorage.getItem("accessCode");
    if (cachedAccessCode && cachedAccessCode !== "DEMO-MODE") {
        console.log("🔄 [Recuperación] Detectada sesión activa previa. Restaurando estado...");
        appState.accessCode = cachedAccessCode;
        appState.participantId = sessionStorage.getItem("participantId") || "ANON";
        appState.experience = sessionStorage.getItem("experience") || "No declarada";
        appState.geminiApiKey = sessionStorage.getItem("geminiApiKey") || "";
        appState.groqApiKey = sessionStorage.getItem("groqApiKey") || "";
        appState.openrouterApiKey = sessionStorage.getItem("openrouterApiKey") || "";
        appState.runNumber = parseInt(sessionStorage.getItem("runNumber") || "1", 10);
        appState.startingGroup = sessionStorage.getItem("startingGroup") || "A";
        appState.activeGroup = sessionStorage.getItem("activeGroup") || "A";
        appState.selectedScenarioId = sessionStorage.getItem("selectedScenarioId") || "1";
        appState.isDemoMode = sessionStorage.getItem("isDemoMode") === "true";
        
        try {
            const savedLogs = sessionStorage.getItem("csvLogs");
            if (savedLogs) appState.csvLogs = JSON.parse(savedLogs);
        } catch (e) {
            console.error("Error al deserializar logs guardados:", e);
        }

        // Rellenar visualmente los campos en Fase 1 por consistencia
        document.getElementById("access-code").value = appState.accessCode;
        document.getElementById("participant-id").value = appState.participantId;
        document.getElementById("participant-experience").value = appState.experience;
        document.getElementById("gemini-key").value = appState.geminiApiKey;
        document.getElementById("groq-key").value = appState.groqApiKey;
        document.getElementById("openrouter-key").value = appState.openrouterApiKey;

        // Redirigir a la fase en la que se quedó el participante
        const currentPhase = parseInt(sessionStorage.getItem("currentPhase") || "2", 10);
        console.log(`🔄 [Recuperación] Enviando al participante a Fase ${currentPhase}`);
        
        // Re-inicializar entorno específico de la fase
        if (currentPhase === 3) {
            setupScenario(appState.selectedScenarioId);
            setupExperimentalUI(appState.activeGroup, isProduction);
            startStopwatch();
        } else if (currentPhase === 4) {
            setupQuiz(appState.selectedScenarioId);
        }
        
        showPhase(currentPhase);
    }

    // Botón de generación de alias único
    const generateBtn = document.getElementById("btn-generate-alias");
    if (generateBtn) {
        generateBtn.addEventListener("click", () => {
            const randomHex = Math.floor(4096 + Math.random() * 61439).toString(16).toUpperCase();
            const alias = `CISO-${randomHex}`;
            document.getElementById("participant-id").value = alias;
            appState.participantId = alias;
            console.log(`[Alias] Generado alias único: ${alias}`);
        });
    }

    // Fase 1 -> Fase 2 (con Validación de Código)
    document.getElementById("btn-to-phase-2").addEventListener("click", async () => {
        appState.isDemoMode = false;
        
        const accessCodeInput = document.getElementById("access-code").value.trim().toUpperCase();
        if (!accessCodeInput) {
            alert("Por favor, ingrese su Código de Acceso de un Solo Uso.");
            return;
        }
        
        const idInput = document.getElementById("participant-id").value.trim();
        if (!idInput) {
            alert("Por favor, ingrese o genere su Código de Identificación de Participante (Alias).");
            return;
        }
        
        const expSelect = document.getElementById("participant-experience");
        if (!expSelect.value) {
            alert("Por favor, seleccione su nivel de experiencia antes de comenzar.");
            return;
        }
        
        const btnStart = document.getElementById("btn-to-phase-2");
        const originalText = btnStart.innerHTML;
        btnStart.disabled = true;
        btnStart.innerText = "Validando código...";
        
        try {
            if (isFirebaseAvailable && db) {
                const docRef = db.collection("codigos_acceso").doc(accessCodeInput);
                const docSnap = await docRef.get();
                
                if (!docSnap.exists) {
                    alert("El código de acceso introducido no es válido. Verifique con el investigador.");
                    btnStart.disabled = false;
                    btnStart.innerHTML = originalText;
                    return;
                }
                
                const data = docSnap.data();
                if (data.usado === true) {
                    alert("Este código de acceso ya ha sido utilizado. Si su sesión se interrumpió, solicite un nuevo código al investigador.");
                    btnStart.disabled = false;
                    btnStart.innerHTML = originalText;
                    return;
                }
                
                // Quemar el código
                await docRef.update({
                    usado: true,
                    participante: idInput,
                    fecha_uso: new Date().toISOString()
                });
                console.log(`✓ [Firebase] Código de acceso ${accessCodeInput} validado y quemado con éxito.`);
            } else {
                console.warn("⚠️ [Firebase] Omitiendo validación en el servidor por estar fuera de línea.");
            }
            
            // Cargar datos
            appState.accessCode = accessCodeInput;
            appState.participantId = idInput;
            appState.experience = expSelect.value;
            
            appState.geminiApiKey = document.getElementById("gemini-key").value.trim();
            appState.groqApiKey = document.getElementById("groq-key").value.trim();
            appState.openrouterApiKey = document.getElementById("openrouter-key").value.trim();
            
            showPhase(2);
        } catch (error) {
            console.error("❌ Error de validación en Firebase:", error);
            alert(`Error de red al validar el código: ${error.message}. Contacte al investigador.`);
        } finally {
            btnStart.disabled = false;
            btnStart.innerHTML = originalText;
        }
    });

    // Iniciar corrida asignada automáticamente (Fase 2 -> Fase 3)
    const startAssignedBtn = document.getElementById("btn-start-assigned-run");
    if (startAssignedBtn) {
        startAssignedBtn.addEventListener("click", () => {
            setupScenario(appState.selectedScenarioId);
            setupExperimentalUI(appState.activeGroup, isProduction);
            showPhase(3);
            startStopwatch();
        });
    }

    // Modo Demo
    const demoBtn = document.getElementById("btn-demo-mode");
    if (demoBtn) {
        demoBtn.addEventListener("click", () => {
            appState.isDemoMode = true;
            appState.participantId = "CISO-DEMO-SIMULADO";
            appState.experience = "Avanzado";
            document.getElementById("participant-id").value = "CISO-DEMO-SIMULADO";
            document.getElementById("participant-experience").value = "Avanzado";
            document.getElementById("gemini-key").value = "••••••••••••••••";
            document.getElementById("groq-key").value = "••••••••••••••••";
            document.getElementById("openrouter-key").value = "••••••••••••••••";
            showPhase(2);
        });
    }

    // Fase 2 -> Fase 3 (Selección de escenario)
    document.querySelectorAll(".scenario-option").forEach(card => {
        card.addEventListener("click", () => {
            appState.selectedScenarioId = card.getAttribute("data-id");
            setupScenario(appState.selectedScenarioId);
            showPhase(3);
            startStopwatch();
        });
    });

    // Fase 3: Gestión de Pestañas (Tabs de Grupos)
    document.querySelectorAll(".tab-btn").forEach(tab => {
        tab.addEventListener("click", () => {
            document.querySelectorAll(".tab-btn").forEach(t => t.classList.remove("active"));
            document.querySelectorAll(".tab-panel").forEach(p => p.classList.add("hidden"));

            tab.classList.add("active");
            appState.activeGroup = tab.getAttribute("data-group");
            document.getElementById(`panel-group-${appState.activeGroup}`).classList.remove("hidden");
        });
    });

    // Grupo A: Buscador Manual
    document.getElementById("btn-manual-search").addEventListener("click", executeManualSearch);
    document.getElementById("manual-search-input").addEventListener("keypress", (e) => {
        if (e.key === "Enter") executeManualSearch();
    });

    // Grupo B: Consulta Directa
    document.getElementById("btn-run-group-b").addEventListener("click", executeGroupB);

    // Grupo C: Motor Multi-Agente
    document.getElementById("btn-run-group-c").addEventListener("click", executeGroupC);

    // Fase 3 -> Fase 4
    document.getElementById("btn-to-phase-4").addEventListener("click", () => {
        stopStopwatch();
        setupQuiz(appState.selectedScenarioId);
        showPhase(4);
    });

    // Fase 4: Enviar Quiz
    document.getElementById("btn-submit-quiz").addEventListener("click", (e) => {
        e.preventDefault();
        evaluateQuiz();
    });

    // Fase 5: Descarga de Resultados
    document.getElementById("btn-download-csv").addEventListener("click", () => {
        if (appState.activeGroup === "B" || appState.activeGroup === "C") {
            const selectedRating = document.querySelector('input[name="trust-rating"]:checked');
            if (!selectedRating) {
                alert("Por favor, seleccione una calificación de confianza en la escala Likert antes de descargar el CSV.");
                return;
            }
        }
        downloadCSV();
    });

    // Reiniciar / Avanzar Corrida
    document.getElementById("btn-restart").addEventListener("click", () => {
        if (appState.activeGroup === "B" || appState.activeGroup === "C") {
            const selectedRating = document.querySelector('input[name="trust-rating"]:checked');
            if (!selectedRating) {
                alert("Por favor, seleccione una calificación de confianza en la escala Likert antes de continuar.");
                return;
            }
        }
        
        // Si no es modo demo y completó las 3 corridas, bloquear el reinicio
        if (!appState.isDemoMode && appState.runNumber >= 3) {
            alert("Ha completado las 3 corridas del experimento. Por favor, descargue su reporte de resultados final (.csv).");
            return;
        }

        appState.answers = {};
        appState.quizScore = 0;
        appState.iaLatency = 0;
        appState.stopwatchElapsed = 0;
        appState.selectedJustification = null;
        appState.tempJustification = null;
        document.getElementById("manual-search-input").value = "";
        document.getElementById("manual-search-results").innerHTML = '<div class="no-results">Realice una búsqueda para consultar la base de datos regulatoria.</div>';
        
        // Ocultar paneles de respuestas anteriores
        document.getElementById("group-b-response-container").classList.add("hidden");
        document.getElementById("group-c-response-container").classList.add("hidden");
        document.getElementById("btn-to-phase-4").disabled = true;

        if (!appState.isDemoMode) {
            // Avanzar a la siguiente corrida
            appState.runNumber += 1;
            
            // Recalcular parámetros según la matriz de contrabalanceo Latino
            const { group, scenarioId } = getExperimentParameters(appState.startingGroup, appState.runNumber);
            appState.activeGroup = group;
            appState.selectedScenarioId = scenarioId;
        }

        // Mantener el control experimental al reiniciar
        setupExperimentalUI(appState.activeGroup, isProduction);

        showPhase(2);
    });

    // Confirmar Justificación (Pausa de Gobernanza)
    const btnSubmitJust = document.getElementById("btn-submit-justification");
    if (btnSubmitJust) {
        btnSubmitJust.addEventListener("click", () => {
            appState.selectedJustification = appState.tempJustification;
            document.getElementById("governance-modal").classList.add("hidden");
            console.log(`✓ [Gobernanza] Justificación confirmada: ${appState.selectedJustification}`);
        });
    }

    // Autoplay check
    const autoplay = urlParams.get('autoplay');
    if (autoplay) {
        runAutoplay(autoplay);
    }
});

// CONFIGURACIÓN DINÁMICA DEL ESCENARIO
function setupScenario(id) {
    const scenario = SCENARIOS[id];
    document.getElementById("active-scenario-display").innerText = `Caso Activo: ${id}`;
    document.getElementById("dilemma-text").innerText = scenario.dilema;
    document.getElementById("operator-decision-text").innerText = scenario.decision;
    
    // Inyectar cultura ética organizacional (Acuerdo previo)
    if (scenario.ethicalCulture) {
        document.getElementById("culture-title").innerText = scenario.ethicalCulture.title;
        document.getElementById("culture-desc").innerText = scenario.ethicalCulture.description;
    }
}

// CRONÓMETRO INVISIBLE (Hawthorne Effect Mitigation)
function startStopwatch() {
    appState.stopwatchStart = performance.now();
    console.log("⏱️ [Stopwatch] Cronómetro invisible iniciado...");
}

function stopStopwatch() {
    const end = performance.now();
    appState.stopwatchElapsed = (end - appState.stopwatchStart) / 1000;
    console.log(`⏱️ [Stopwatch] Cronómetro detenido. Latencia humana: ${appState.stopwatchElapsed.toFixed(2)}s`);
}

// GRUPO A: BÚSQUEDA VECTORIAL ESTÁTICA LOCAL
function executeManualSearch() {
    const query = document.getElementById("manual-search-input").value.trim().toLowerCase();
    const resultsContainer = document.getElementById("manual-search-results");
    
    if (!query) {
        resultsContainer.innerHTML = '<div class="no-results">Ingrese un término para buscar.</div>';
        return;
    }

    // Coincidencia simple de palabras clave para simular el buscador manual
    let results = [];
    appState.regulatoryDatabase.forEach(doc => {
        if (doc.source.toLowerCase().includes(query) || doc.text.toLowerCase().includes(query)) {
            results.push(doc);
        }
    });

    // Fallback si no hay coincidencias
    if (results.length === 0) {
        // Devolver leyes generales del dataset
        results = appState.regulatoryDatabase.slice(-2);
    }

    resultsContainer.innerHTML = "";
    results.forEach((doc, idx) => {
        const card = document.createElement("div");
        card.className = "law-card";
        card.innerHTML = `
            <h4>Documento [${idx + 1}]: ${doc.source}</h4>
            <p>${doc.text}</p>
        `;
        resultsContainer.appendChild(card);
    });

    // Habilitar avance a cuestionario
    document.getElementById("btn-to-phase-4").disabled = false;
}

// GRUPO B: ASISTENTE DE IA SIMPLE (LLAMADA DIRECTA)
async function executeGroupB() {
    const runBtn = document.getElementById("btn-run-group-b");
    const container = document.getElementById("group-b-response-container");
    const textDiv = document.getElementById("group-b-response-text");

    runBtn.disabled = true;
    container.classList.remove("hidden");
    textDiv.innerHTML = '<div class="loading-spinner"></div> Consultando modelo en la nube...';

    const scenario = SCENARIOS[appState.selectedScenarioId];

    if (appState.isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 800)); // Latencia artificial
        appState.iaLatency = 0.8;
        textDiv.innerText = MOCK_IA_RESPONSES[appState.selectedScenarioId].groupB;
        runBtn.disabled = false;
        document.getElementById("btn-to-phase-4").disabled = false;
        return;
    }
    const prompt = `
    Actúa como un asesor de ciberseguridad. Evalúa la siguiente decisión frente al cumplimiento normativo aplicable.
    NO tienes acceso a una base de datos local de leyes actualizadas, responde con tu conocimiento general.
    
    Incidente: ${scenario.type}
    Jurisdicción: ${scenario.jurisdiction}
    Dilema: ${scenario.dilema}
    Decisión del Operador: ${scenario.decision}
    
    Por favor indica:
    1. Si la decisión es adecuada o incurre en infracciones de ley.
    2. Los plazos teóricos de notificación.
    3. Recomendaciones de cumplimiento.
    `;

    const start = performance.now();
    let responseText = "";

    // Helper asíncrono para llamar a OpenRouter en cascada ante falla del proveedor gratuito
    async function callOpenRouterFallback(originalErrorMsg) {
        if (!appState.openrouterApiKey) {
            throw new Error(originalErrorMsg);
        }
        console.warn(`⚠️ [Cascada de Resiliencia Grupo B] Proveedor gratuito falló (${originalErrorMsg}). Conmutando a OpenRouter de respaldo de pago...`);
        
        const charCodeSum = appState.participantId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const isWestern = charCodeSum % 2 === 0;
        const model = isWestern ? "meta-llama/llama-3.3-70b-instruct" : "deepseek/deepseek-v4-flash";
        appState.lastUsedModel = model + " (Paid Backup)";
        
        const url = "https://openrouter.ai/api/v1/chat/completions";
        const payload = {
            model: model,
            messages: [{ role: "user", content: prompt }]
        };
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${appState.openrouterApiKey}`,
                "HTTP-Referer": "http://localhost:8000",
                "X-Title": "INFOTEC Academic Study"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            let errDetail = "";
            try { errDetail = await response.text(); } catch(_) {}
            throw new Error(`OpenRouter Backup falló con código ${response.status}: ${errDetail || response.statusText}`);
        }
        const resData = await response.json();
        const content = resData.choices?.[0]?.message?.content || "";
        if (!content) throw new Error("Respuesta vacía del servidor OpenRouter Backup.");
        return content;
    }

    try {
        if (appState.geminiApiKey) {
            appState.lastUsedModel = "gemini-1.5-flash";
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${appState.geminiApiKey}`;
            const payload = {
                contents: [{ parts: [{ text: prompt }] }]
            };
            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    if (response.status === 429) {
                        throw new Error("Límite de peticiones excedido (429 Rate Limit) en Google Gemini.");
                    } else if (response.status === 400) {
                        throw new Error("Petición incorrecta (400 Bad Request) en Gemini.");
                    } else {
                        throw new Error(`Error de red de Gemini (Código ${response.status}): ${response.statusText}`);
                    }
                }
                const resData = await response.json();
                responseText = resData.candidates?.[0]?.content?.parts?.[0]?.text || "";
                if (!responseText) throw new Error("Respuesta vacía o malformada de Gemini.");
            } catch (geminiError) {
                // Conmutación en caliente a OpenRouter de pago
                responseText = await callOpenRouterFallback(geminiError.message);
            }
        } else if (appState.groqApiKey) {
            appState.lastUsedModel = "llama-3.3-70b-versatile";
            const url = "https://api.groq.com/openai/v1/chat/completions";
            const payload = {
                model: "llama-3.3-70b-versatile",
                messages: [{ role: "user", content: prompt }]
            };
            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${appState.groqApiKey}`
                    },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    if (response.status === 429) {
                        throw new Error("Límite de peticiones excedido (429 Rate Limit) en la API de Groq.");
                    } else if (response.status === 401) {
                        throw new Error("Autenticación fallida (401 Unauthorized) en la API de Groq.");
                    } else {
                        throw new Error(`Error de red de Groq (Código ${response.status}): ${response.statusText}`);
                    }
                }
                const resData = await response.json();
                responseText = resData.choices?.[0]?.message?.content || "";
                if (!responseText) throw new Error("Respuesta vacía o malformada de Groq.");
            } catch (groqError) {
                // Conmutación en caliente a OpenRouter de pago
                responseText = await callOpenRouterFallback(groqError.message);
            }
        } else if (appState.openrouterApiKey) {
            // No se configuró clave gratuita primaria, usar OpenRouter de pago directamente
            const charCodeSum = appState.participantId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            const isWestern = charCodeSum % 2 === 0;
            const model = isWestern ? "meta-llama/llama-3.3-70b-instruct" : "deepseek/deepseek-v4-flash";
            appState.lastUsedModel = model;
            console.log(`[OpenRouter Directo] Balanceo geopolítico A/B: Asignado a ${isWestern ? 'Occidente (Llama 3.3)' : 'Oriente (DeepSeek V4 Flash)'}. Modelo: ${model}`);

            const url = "https://openrouter.ai/api/v1/chat/completions";
            const payload = {
                model: model,
                messages: [{ role: "user", content: prompt }]
            };
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${appState.openrouterApiKey}`,
                    "HTTP-Referer": "http://localhost:8000",
                    "X-Title": "INFOTEC Academic Study"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                let errDetail = "";
                try { errDetail = await response.text(); } catch(_) {}
                if (response.status === 429) {
                    throw new Error(`Límite de peticiones excedido (429 Rate Limit) en OpenRouter.`);
                } else if (response.status === 401) {
                    throw new Error(`Autenticación fallida (401 Unauthorized) en OpenRouter.`);
                } else {
                    throw new Error(`Error de OpenRouter (Código ${response.status}): ${errDetail || response.statusText}`);
                }
            }
            const resData = await response.json();
            responseText = resData.choices?.[0]?.message?.content || "";
            if (!responseText) throw new Error("Respuesta vacía o malformada de OpenRouter.");
        } else {
            throw new Error("No se configuró ninguna clave de API en Fase 1.");
        }
    } catch (e) {
        console.error("❌ Error de red / API en Grupo B:", e);
        responseText = `❌ ERROR DE CONEXIÓN A LA API: ${e.message}\n\nEl sistema no pudo recuperar el dictamen de la IA. Por favor, verifique su conexión a internet, espere unos segundos y vuelva a presionar "Consultar IA" para reintentar. No es necesario reiniciar el navegador.`;
        appState.lastUsedModel = "Error de Conexión";
        
        appState.iaLatency = (performance.now() - start) / 1000;
        textDiv.innerText = responseText;
        runBtn.disabled = false;
        document.getElementById("btn-to-phase-4").disabled = true; // Bloquear avance a Fase 4
        return;
    }

    appState.iaLatency = (performance.now() - start) / 1000;
    textDiv.innerText = responseText;
    runBtn.disabled = false;
    
    // Habilitar avance a cuestionario solo si la API tuvo éxito
    document.getElementById("btn-to-phase-4").disabled = false;
}

// GRUPO C: MOTOR MULTI-AGENTE REMOTO (SOC-TUTOR-RAG)
async function executeGroupC() {
    const runBtn = document.getElementById("btn-run-group-c");
    const container = document.getElementById("group-c-response-container");

    runBtn.disabled = true;
    container.classList.remove("hidden");
    
    // Reset de visuales
    document.getElementById("group-c-verdict").innerText = "Procesando...";
    document.getElementById("group-c-explanation").innerText = "El motor de agentes está consultando el RAG y validando alucinaciones...";
    document.getElementById("group-c-practices").innerText = "Por favor espere...";
    document.getElementById("group-c-approved").innerText = "--";
    document.getElementById("group-c-score").innerText = "--";
    document.getElementById("group-c-cost").innerText = "--";
    document.getElementById("group-c-tokens").innerText = "--";
    document.getElementById("group-c-sources-list").innerHTML = "";

    const scenario = SCENARIOS[appState.selectedScenarioId];

    if (appState.isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 1200)); // Latencia artificial
        appState.iaLatency = 1.2;
        const data = MOCK_IA_RESPONSES[appState.selectedScenarioId].groupC;
        
        // Pintar resultados
        document.getElementById("group-c-verdict").innerText = data.evaluacion || "Evaluación";
        document.getElementById("group-c-explanation").innerText = data.explicacion || "";
        document.getElementById("group-c-practices").innerText = data.mejor_practica || "";
        
        const approvedSpan = document.getElementById("group-c-approved");
        approvedSpan.innerText = "🟢 APROBADO (Modo Demo Simulado - Cero alucinaciones)";
        
        document.getElementById("group-c-score").innerText = `${data.score_tecnico}%`;
        document.getElementById("group-c-cost").innerText = `$${(data.costo_estimado).toFixed(5)} USD`;
        document.getElementById("group-c-tokens").innerText = `${data.total_tokens} tokens`;

        // Fuentes
        const sourcesList = document.getElementById("group-c-sources-list");
        sourcesList.innerHTML = "";
        data.fuentes_citadas.forEach(src => {
            const li = document.createElement("li");
            li.innerText = src;
            sourcesList.appendChild(li);
        });

        runBtn.disabled = false;
        document.getElementById("btn-to-phase-4").disabled = false;
        return;
    }
    
    const payload = {
        decision: {
            accion: "Auditoría de cumplimiento legal de incidentes",
            target: scenario.jurisdiction,
            detalle: scenario.decision
        },
        contexto: {
            tipo_incidente: scenario.type,
            fase: "Containment",
            scenario_id: "infotec-experimental-case"
        },
        player_profile: {
            player_id: appState.participantId,
            level: 5,
            rol: "ciso"
        }
    };

    const start = performance.now();
    let data;

    try {
        const response = await fetch(`${BACKEND_URL}/feedback?user_id=${appState.participantId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            data = await response.json();
        } else {
            throw new Error(`Código de error HTTP: ${response.status}`);
        }
    } catch (e) {
        console.error("❌ Error de red / backend en Grupo C:", e);
        
        // Mostrar mensaje de error claro en pantalla
        document.getElementById("group-c-verdict").innerHTML = '<span style="color: var(--color-danger);">❌ ERROR DE CONEXIÓN</span>';
        document.getElementById("group-c-explanation").innerText = `El motor de agentes multi-agente no pudo comunicarse con el servidor remoto debido al siguiente error: ${e.message}. \n\nPor favor, verifique su conexión a internet, espere unos segundos y vuelva a presionar "Consultar Motor" para reintentar.`;
        document.getElementById("group-c-practices").innerText = "No disponible debido al fallo de conexión.";
        document.getElementById("group-c-approved").innerText = "Fallo";
        document.getElementById("group-c-score").innerText = "0%";
        document.getElementById("group-c-cost").innerText = "$0.00000 USD";
        document.getElementById("group-c-tokens").innerText = "0 tokens";
        
        appState.iaLatency = (performance.now() - start) / 1000;
        runBtn.disabled = false;
        document.getElementById("btn-to-phase-4").disabled = true; // Bloquear avance a Fase 4
        return;
    }

    appState.iaLatency = (performance.now() - start) / 1000;

    // Pintar resultados
    document.getElementById("group-c-verdict").innerText = data.evaluacion || "Evaluación";
    document.getElementById("group-c-explanation").innerText = data.explicacion || "";
    document.getElementById("group-c-practices").innerText = data.mejor_practica || "";
    
    const approvedSpan = document.getElementById("group-c-approved");
    const isApproved = data.aprobado ?? (data.validacion?.approved);
    approvedSpan.innerText = isApproved ? "🟢 APROBADO (Cero alucinaciones)" : "🔴 RECHAZADO / ADVERTENCIA";
    
    document.getElementById("group-c-score").innerText = `${data.score_tecnico ?? data.validacion?.quality_score ?? 100}%`;
    document.getElementById("group-c-cost").innerText = `$${(data.costo_estimado || 0).toFixed(5)} USD`;
    document.getElementById("group-c-tokens").innerText = `${data.total_tokens || 0} tokens`;
    const sourcesList = document.getElementById("group-c-sources-list");
    sourcesList.innerHTML = "";
    const sources = data.fuentes_citadas || [];
    if (sources.length === 0) {
        sourcesList.innerHTML = "<li>No se citaron fuentes externas.</li>";
    } else {
        sources.forEach(src => {
            const li = document.createElement("li");
            li.innerText = src;
            sourcesList.appendChild(li);
        });
    }

    runBtn.disabled = false;
    
    // Habilitar avance a cuestionario
    document.getElementById("btn-to-phase-4").disabled = false;
}

// CONFIGURACIÓN DINÁMICA DEL QUIZ
function setupQuiz(id) {
    const scenario = SCENARIOS[id];
    const container = document.getElementById("quiz-questions-container");
    container.innerHTML = "";

    scenario.questions.forEach((q, idx) => {
        const qBox = document.createElement("div");
        qBox.className = "quiz-question";
        
        let optionsHtml = "";
        for (const [key, val] of Object.entries(q.options)) {
            optionsHtml += `
                <div class="option-item" onclick="selectRadioOption(this)">
                    <input type="radio" name="q-${idx}" value="${key}" id="q-${idx}-${key}">
                    <span class="option-text"><strong>[${key}]</strong> ${val}</span>
                </div>
            `;
        }

        qBox.innerHTML = `
            <h3>Pregunta ${idx + 1}: ${q.question}</h3>
            <div class="options-list">
                ${optionsHtml}
            </div>
        `;
        container.appendChild(qBox);
    });
}

// Simular el click sobre la tarjeta del radio button
window.selectRadioOption = function(element) {
    const radio = element.querySelector('input[type="radio"]');
    radio.checked = true;
    
    // Quitar clases previas
    const list = element.parentNode;
    list.querySelectorAll('.option-item').forEach(item => item.classList.remove('selected'));
    element.classList.add('selected');

    // Si es la pregunta de decisión de cumplimiento (Pregunta 3, índice 2)
    if (radio.name === "q-2") {
        openGovernancePause(radio.value, element.querySelector('.option-text').innerText);
    }
};

// Abrir Modal de Pausa de Gobernanza
function openGovernancePause(optionVal, optionText) {
    const scenario = SCENARIOS[appState.selectedScenarioId];
    const modal = document.getElementById("governance-modal");
    const decisionDisplay = document.getElementById("modal-selected-decision");
    const justificationsContainer = document.getElementById("modal-justifications-list");
    const confirmBtn = document.getElementById("btn-submit-justification");

    decisionDisplay.innerText = optionText.replace(/^\[[A-Z]\]\s*/, ""); // Limpiar la letra de la opción [A]
    justificationsContainer.innerHTML = "";
    confirmBtn.disabled = true;
    appState.tempJustification = null;

    const justifications = scenario.justifications[optionVal] || [];
    justifications.forEach((just, idx) => {
        const item = document.createElement("div");
        item.className = "option-item";
        item.style.padding = "14px";
        item.style.marginBottom = "10px";
        item.style.borderRadius = "8px";
        item.style.border = "1px solid rgba(255,255,255,0.06)";
        item.style.background = "rgba(255,255,255,0.01)";
        item.style.cursor = "pointer";
        item.style.display = "flex";
        item.style.alignItems = "center";
        item.style.gap = "12px";
        item.style.transition = "all 0.2s ease";

        item.innerHTML = `
            <input type="radio" name="modal-just" value="${just.key}" id="just-${idx}" style="margin: 0; cursor: pointer;">
            <span style="font-size: 0.88rem; color: #e0e0e0; line-height: 1.4;">${just.text}</span>
        `;

        item.addEventListener("click", () => {
            justificationsContainer.querySelectorAll('.option-item').forEach(el => {
                el.classList.remove('selected');
                el.style.borderColor = "rgba(255,255,255,0.06)";
                el.style.background = "rgba(255,255,255,0.01)";
            });
            item.classList.add('selected');
            item.style.borderColor = "var(--badge-health)";
            item.style.background = "rgba(255, 145, 0, 0.03)";

            const rInput = item.querySelector('input[type="radio"]');
            rInput.checked = true;
            appState.tempJustification = just.key;
            confirmBtn.disabled = false;
        });

        justificationsContainer.appendChild(item);
    });

    modal.classList.remove("hidden");
}

// EVALUACIÓN DEL CUESTIONARIO Y PERSISTENCIA (ENFOQUE TRIDIMENSIONAL)
function evaluateQuiz() {
    const scenario = SCENARIOS[appState.selectedScenarioId];
    let correctCount = 0;
    let answersGiven = {};

    // Validar y evaluar Preguntas 1 y 2 (Métricas Factuales)
    for (let idx = 0; idx < 2; idx++) {
        const selectedRadio = document.querySelector(`input[name="q-${idx}"]:checked`);
        if (!selectedRadio) {
            alert("Por favor, responda todas las preguntas del cuestionario antes de enviar.");
            return;
        }
        const ans = selectedRadio.value;
        answersGiven[`Q${idx + 1}`] = ans;
        if (ans === scenario.questions[idx].correct) {
            correctCount++;
        }
    }

    // Validar Pregunta 3 (Decisión de cumplimiento)
    const selectedQ3 = document.querySelector('input[name="q-2"]:checked');
    if (!selectedQ3) {
        alert("Por favor, responda la decisión de recomendación de cumplimiento (Pregunta 3).");
        return;
    }
    answersGiven["Q3"] = selectedQ3.value;

    // Validar justificación
    if (!appState.selectedJustification) {
        alert("Falta justificar su decisión en la Pausa de Gobernanza. Por favor, vuelva a seleccionar su opción en la Pregunta 3 para abrir la ventana de justificación.");
        return;
    }

    appState.answers = answersGiven;
    // La precisión de diagnóstico mide solo la exactitud fáctica (Q1 y Q2)
    appState.quizScore = Math.round((correctCount / 2) * 100);

    // Pintar Fase 5
    document.getElementById("display-score").innerText = `${appState.quizScore}%`;
    document.getElementById("display-ia-latency").innerText = `${appState.iaLatency.toFixed(3)}s`;
    document.getElementById("display-human-latency").innerText = `${appState.stopwatchElapsed.toFixed(2)}s`;
    
    let groupName = "Grupo C: Motor Multi-Agente";
    if (appState.activeGroup === "A") groupName = "Grupo A: Búsqueda Manual";
    if (appState.activeGroup === "B") groupName = "Grupo B: IA Básica";
    document.getElementById("display-group-name").innerText = groupName;

    // Cambiar color del score circle según precisión
    const circle = document.querySelector(".score-circle");
    if (appState.quizScore === 100) {
        circle.style.borderColor = "var(--color-success)";
        document.getElementById("display-score").style.color = "var(--color-success)";
    } else if (appState.quizScore >= 50) {
        circle.style.borderColor = "var(--badge-health)";
        document.getElementById("display-score").style.color = "var(--badge-health)";
    } else {
        circle.style.borderColor = "var(--color-danger)";
        document.getElementById("display-score").style.color = "var(--color-danger)";
    }

    // Renderizar consecuencias
    renderConsequences(appState.selectedScenarioId, selectedQ3.value, appState.selectedJustification);

    // Mostrar/ocultar el cuestionario de confianza según el grupo
    const trustSurvey = document.getElementById("trust-survey-container");
    if (appState.activeGroup === "B" || appState.activeGroup === "C") {
        trustSurvey.classList.remove("hidden");
        document.querySelectorAll('input[name="trust-rating"]').forEach(r => r.checked = false);
    } else {
        trustSurvey.classList.add("hidden");
    }

    // Registrar en los logs de sesión
    const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const answersString = Object.entries(appState.answers).map(([k, v]) => `${k}:${v}`).join("; ");
    
    let modeloUsado = "N/A";
    if (appState.activeGroup === "B") {
        modeloUsado = appState.lastUsedModel || "Desconocido";
    } else if (appState.activeGroup === "C") {
        modeloUsado = appState.isDemoMode ? "Simulado (Multi-Agente)" : "Multi-Agente (Gemini + Groq + R1)";
    }

    appState.csvLogs.push({
        fecha: dateStr,
        participante: appState.participantId,
        grupo: groupName,
        experiencia: appState.experience,
        escenario: scenario.title,
        modeloIA: modeloUsado,
        latencyIA: appState.iaLatency.toFixed(3),
        latencyHumana: appState.stopwatchElapsed.toFixed(2),
        respuestas: answersString,
        precision: `${appState.quizScore}%`,
        justificacion: appState.selectedJustification,
        confianza: "N/A"
    });

    // Ajustar el botón de reinicio / siguiente corrida según la fase del experimento
    const btnRestart = document.getElementById("btn-restart");
    let completionMsg = document.getElementById("completion-msg");
    
    if (appState.isDemoMode) {
        btnRestart.innerText = "Evaluar otro Grupo / Escenario";
        btnRestart.classList.remove("hidden");
        if (completionMsg) completionMsg.classList.add("hidden");
    } else {
        if (appState.runNumber < 3) {
            btnRestart.innerText = `Continuar a la Corrida ${appState.runNumber + 1} de 3`;
            btnRestart.classList.remove("hidden");
            if (completionMsg) completionMsg.classList.add("hidden");
        } else {
            btnRestart.classList.add("hidden");
            
            const restartContainer = btnRestart.parentElement;
            if (!completionMsg) {
                completionMsg = document.createElement("div");
                completionMsg.id = "completion-msg";
                completionMsg.style.marginTop = "12px";
                completionMsg.style.padding = "14px";
                completionMsg.style.background = "rgba(0,230,118,0.1)";
                completionMsg.style.border = "1px solid var(--color-success)";
                completionMsg.style.borderRadius = "8px";
                completionMsg.style.fontSize = "0.9rem";
                completionMsg.style.color = "#00e676";
                completionMsg.style.width = "100%";
                completionMsg.style.boxSizing = "border-box";
                completionMsg.innerHTML = "<strong>🎉 ¡Experimento completado con éxito!</strong> Ha completado las 3 corridas del contrabalanceo. Por favor, descargue su archivo CSV final.";
                restartContainer.appendChild(completionMsg);
            } else {
                completionMsg.classList.remove("hidden");
            }
        }
    }

    showPhase(5);
}

// RENDERIZAR TABLERO DE CONSECUENCIAS (TRIDIMENSIONAL)
function renderConsequences(scenarioId, decisionOption, justificationKey) {
    const textOperational = document.getElementById("text-impact-operational");
    const textLegal = document.getElementById("text-impact-legal");
    const textEthical = document.getElementById("text-impact-ethical");

    const cardOperational = document.getElementById("card-impact-operational");
    const cardLegal = document.getElementById("card-impact-legal");
    const cardEthical = document.getElementById("card-impact-ethical");

    if (scenarioId === "1") {
        if (decisionOption === "A") {
            textOperational.innerHTML = "<strong>🟢 Positivo:</strong> Contención técnica rápida completada con éxito. Se evitó la alarma pública y una corrida bancaria inminente.";
            cardOperational.style.borderLeftColor = "#00e676";
            
            textLegal.innerHTML = "<strong>🔴 Crítico:</strong> Incumplimiento del plazo de 24h establecido por la Circular 2318 del BCU. Riesgo de multa de hasta 2,000,000 UI y suspensión de la licencia de operación.";
            cardLegal.style.borderLeftColor = "#ff4a4a";
            
            textEthical.innerHTML = `<strong>🟡 Tensión Ponderada:</strong> Se priorizó la estabilidad de liquidez sistémica bajo el marco de **Utilitarismo**. Justificación seleccionada: "${justificationKey === 'utilitarian' ? 'Cálculo de consecuencias netas' : 'Estado de Necesidad'}".`;
            cardEthical.style.borderLeftColor = "#ff9100";
        } else {
            textOperational.innerHTML = "<strong>🔴 Crítico:</strong> La alerta prematura provocó la filtración del incidente a la prensa y una corrida de retiros masivos por parte de los ahorradores.";
            cardOperational.style.borderLeftColor = "#ff4a4a";
            
            textLegal.innerHTML = "<strong>🟢 Positivo:</strong> Cumplimiento estricto del plazo de 24h establecido por la Circular 2318 del BCU. 0% de riesgo de multas del regulador.";
            cardLegal.style.borderLeftColor = "#00e676";
            
            textEthical.innerHTML = `<strong>🟡 Tensión Ponderada:</strong> Decisión orientada al **Cumplimiento Formal**. Se respetó el texto legal por encima de la estabilidad colectiva de los depositantes.`;
            cardEthical.style.borderLeftColor = "#ff9100";
        }
    } else if (scenarioId === "2") {
        if (decisionOption === "A") {
            textOperational.innerHTML = "<strong>🔴 Negativo:</strong> Notificación apresurada con logs crudos incompletos. Genera alarma social innecesaria y daña la reputación de la clínica.";
            cardOperational.style.borderLeftColor = "#ff4a4a";
            
            textLegal.innerHTML = "<strong>🟢 Positivo:</strong> Notificación inmediata al INAI dentro del plazo legal de 72 horas hábiles de la LGPDPPSO.";
            cardLegal.style.borderLeftColor = "#00e676";
            
            textEthical.innerHTML = `<strong>🟢 Coherente:</strong> Alineación con la **Deontología** institucional. Se respetó el derecho inalienable de los pacientes a conocer el estado de sus datos clínicos.`;
            cardEthical.style.borderLeftColor = "#b55dff";
        } else {
            textOperational.innerHTML = "<strong>🟢 Positivo:</strong> Bloqueo ordenado de credenciales comprometidas y análisis forense limpio antes de emitir comunicados públicos.";
            cardOperational.style.borderLeftColor = "#00e676";
            
            textLegal.innerHTML = "<strong>🔴 Negativo:</strong> Retrasar el aviso formal al INAI podría considerarse negligencia o encubrimiento al exceder los plazos de detección de la ley.";
            cardLegal.style.borderLeftColor = "#ff4a4a";
            
            textEthical.innerHTML = `<strong>🟡 Tensión Ponderada:</strong> Enfoque de consecuencias (**Utilitarismo**). Se priorizó la mitigación reputacional y la contención técnica sobre la autonomía del paciente.`;
            cardEthical.style.borderLeftColor = "#ff9100";
        }
    } else if (scenarioId === "3") {
        if (decisionOption === "A") {
            textOperational.innerHTML = "<strong>🟢 Positivo:</strong> Unificación del reporte forense transfronterizo en Brasil y Chile, previniendo declaraciones contradictorias.";
            cardOperational.style.borderLeftColor = "#00e676";
            
            textLegal.innerHTML = "<strong>🔴 Crítico:</strong> Incumplimiento del plazo de 3 horas ante el CSIRT de Chile. Riesgo de multa de hasta 15,000 UTM.";
            cardLegal.style.borderLeftColor = "#ff4a4a";
            
            textEthical.innerHTML = `<strong>🟡 Tensión Ponderada:</strong> Basado en **Utilitarismo Corporativo**. Se priorizó la optimización de costes y la defensa legal sobre los derechos de los usuarios chilenos.`;
            cardEthical.style.borderLeftColor = "#ff9100";
        } else {
            textOperational.innerHTML = "<strong>🔴 Crítico:</strong> Alertar en 3h obligó a enviar logs crudos incompletos, exponiendo la vulnerabilidad activa antes de aplicar el parche de seguridad en Brasil.";
            cardOperational.style.borderLeftColor = "#ff4a4a";
            
            textLegal.innerHTML = "<strong>🟢 Positivo:</strong> Cumplimiento total de la inmediatez regulada (límite de 3 horas del CSIRT de Chile).";
            cardLegal.style.borderLeftColor = "#00e676";
            
            textEthical.innerHTML = `<strong>🟢 Coherente:</strong> Decisión orientada al **Principialismo / No Maleficencia**. Se priorizó alertar rápidamente a los usuarios para prevenir fraudes en sus cuentas.`;
            cardEthical.style.borderLeftColor = "#b55dff";
        }
    }
}

// CONSTRUIR Y DESCARGAR EL CSV DE RESULTADOS
function downloadCSV() {
    if (appState.csvLogs.length === 0) {
        alert("No hay registros de evaluación en esta sesión.");
        return;
    }

    let csvContent = "Fecha,Participante,Grupo_Experimental,Experiencia_Previa,Escenario,Modelo_IA,Latencia_IA_s,Latencia_Humana_s,Respuestas,Precision,Justificacion,Confianza_Percibida\n";
    appState.csvLogs.forEach(log => {
        const row = [
            log.fecha,
            log.participante,
            log.grupo,
            log.experiencia || "No declarada",
            log.escenario,
            log.modeloIA || "N/A",
            log.latencyIA,
            log.latencyHumana,
            log.respuestas,
            log.precision,
            log.justificacion || "Ninguna",
            log.confianza || "N/A"
        ];
        
        const escapedRow = row.map(val => {
            const valStr = String(val);
            if (valStr.includes(",") || valStr.includes('"') || valStr.includes('\n')) {
                return `"${valStr.replace(/"/g, '""')}"`;
            }
            return valStr;
        });
        csvContent += escapedRow.join(",") + "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `evaluacion_${appState.participantId}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log("✓ Archivo CSV de evaluación descargado.");
}

// Función de Autoplay para captura de screenshots y demostraciones automatizadas
async function runAutoplay(targetPhase) {
    console.log(`🚀 [Autoplay] Iniciando reproducción automática hacia: ${targetPhase}`);
    
    // Configuración base
    appState.isDemoMode = true;
    appState.participantId = "CISO-DEMO-SIMULADO";
    appState.experience = "Avanzado";
    document.getElementById("participant-id").value = "CISO-DEMO-SIMULADO";
    document.getElementById("participant-experience").value = "Avanzado";
    document.getElementById("gemini-key").value = "••••••••••••••••";
    document.getElementById("groq-key").value = "••••••••••••••••";
    
    if (targetPhase === 'phase1') {
        return; // Queda en la pantalla de inicio
    }
    
    // Esperar un momento corto antes de avanzar
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Ir a fase 2
    showPhase(2);
    if (targetPhase === 'phase2') {
        return;
    }
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Seleccionar Escenario 1
    appState.selectedScenarioId = "1";
    setupScenario("1");
    showPhase(3);
    startStopwatch();
    
    if (targetPhase === 'phase3') {
        // Mostrar el Grupo C pre-cargado
        const tabC = document.querySelector('.tab-btn[data-group="C"]');
        if (tabC) tabC.click();
        // Ejecutar dictamen
        await executeGroupC();
        return;
    }
    
    if (targetPhase === 'phase4' || targetPhase === 'phase5') {
        const tabC = document.querySelector('.tab-btn[data-group="C"]');
        if (tabC) tabC.click();
        await executeGroupC();
        
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Detener cronómetro e ir a fase 4
        stopStopwatch();
        setupQuiz("1");
        showPhase(4);
        
        if (targetPhase === 'phase4') {
            return;
        }
        
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Responder preguntas automáticamente para obtener 100%
        const scenario = SCENARIOS["1"];
        scenario.questions.forEach((q, idx) => {
            const correctOption = q.correct;
            const radio = document.getElementById(`q-${idx}-${correctOption}`);
            if (radio) {
                radio.checked = true;
                const optionItem = radio.closest('.option-item');
                if (optionItem) optionItem.classList.add('selected');
            }
        });
        
        // Simular selección de justificación en la pausa de gobernanza para autoplay
        appState.selectedJustification = "utilitarian";
        
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Enviar evaluación para ir a fase 5
        evaluateQuiz();
    }
}

// Configuración de interfaz según el grupo activo y el modo producción (Control Ciego Único)
function setupExperimentalUI(group, isProduction) {
    // 1. Ocultar Modo Demo si es producción
    const demoBtn = document.getElementById("btn-demo-mode");
    if (demoBtn) {
        if (isProduction) {
            demoBtn.classList.add("hidden");
        } else {
            demoBtn.classList.remove("hidden");
        }
    }

    // 2. Visibilidad condicional de llaves en Fase 1
    const credsContainer = document.getElementById("credentials-container");
    if (credsContainer) {
        if (group === 'B') {
            credsContainer.classList.remove("hidden");
        } else {
            credsContainer.classList.add("hidden");
        }
    }

    // 3. Ocultar barra de pestañas (Tabs) en Fase 3 para blindar el experimento (excepto en modo demo)
    const tabsContainer = document.getElementById("tabs-container");
    if (tabsContainer) {
        if (appState.isDemoMode) {
            tabsContainer.classList.remove("hidden");
        } else {
            tabsContainer.classList.add("hidden");
        }
    }

    // 4. Mostrar únicamente el panel correspondiente al grupo activo
    document.querySelectorAll(".tab-panel").forEach(panel => {
        panel.classList.add("hidden");
    });
    const activePanel = document.getElementById(`panel-group-${group}`);
    if (activePanel) {
        activePanel.classList.remove("hidden");
    }

    // Marcar el tab correspondiente como activo internamente
    document.querySelectorAll(".tab-btn").forEach(tab => {
        tab.classList.remove("active");
        if (tab.getAttribute("data-group") === group) {
            tab.classList.add("active");
        }
    });

    console.log(`[Ciego Único UI] Interfaz configurada para Grupo ${group}. Producción: ${isProduction}`);
}

