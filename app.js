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
    "id": "REG-UY-01",
    "source": "Uruguay - Banco Central del Uruguay (BCU) Circular 2318 y Comunicación 2021/2318",
    "jurisdiction": "Uruguay (Sector Financiero / BCU)",
    "category": "Sectorial Financiero",
    "scenario_ref": "Escenario 1 (uy-finance-breach) - Dilema 1 (uy-fin-govern-01)",
    "time_limit": "24 horas improrrogables a partir de la detección o sospecha razonable del evento.",
    "receiving_authority": "Banco Central del Uruguay (BCU) - Superintendencia de Servicios Financieros.",
    "scope": "Entidades financieras reguladas, procesadores de pago de liquidez sistémica y emisores de tarjetas de crédito/débito.",
    "articles": "Circular BCU N° 2318; Recopilación de Normas de Regulación y Control del Sistema Financiero (RNRC SF) Cap. Gestión de Riesgos de Ciberseguridad.",
    "penalties": "Apercibimientos formales, inhabilitación temporal o definitiva de directores y gerentes, multas de hasta 2,000,000 de Unidades Indexadas (UI) y revocación de la licencia para operar en el territorio uruguayo.",
    "operational_implications": "La notificación formal al BCU es un deber estricto e improrrogable. La postergación unilateral para evitar una corrida bancaria o pánico de mercado constituye una infracción gravísima, aunque la entidad busque estabilizar la liquidez técnica de forma interna.",
    "nist_csf_mapping": "NIST CSF 2.0: GV.RM-02 (Apetito y Tolerancia al Riesgo Regulatorio vs. Riesgo Sistémico)",
    "official_url": "https://www.bcu.gub.uy/Servicios-Financieros-Administracion/Paginas/Normativa.aspx",
    "text": "Recopilación de Normas de Regulación y Control del Sistema Financiero del BCU (Circular 2318): Exige a los procesadores de pago e instituciones reguladas notificar al BCU todo incidente de seguridad calificado como crítico en un plazo máximo e improrrogable de 24 horas tras su detección o sospecha razonable. El incumplimiento conlleva sanciones de hasta 2,000,000 UI y la revocación de la licencia operativa."
  },
  {
    "id": "REG-UY-02",
    "source": "Uruguay - Ley Nº 18.331 de Protección de Datos Personales y URCDP",
    "jurisdiction": "Uruguay (General / Protección de Datos)",
    "category": "Protección de Datos",
    "scenario_ref": "Escenario 1 (uy-finance-breach) - Protección General",
    "time_limit": "Notificación en plazo razonable sin dilación tras la constatación de la vulneración.",
    "receiving_authority": "Unidad Reguladora y de Control de Datos Personales (URCDP).",
    "scope": "Cualquier persona física o jurídica, pública o privada, que trate datos personales en territorio uruguayo.",
    "articles": "Ley N° 18.331 Art. 12 (Deber de Seguridad y Confidencialidad), Reglamentada por el Decreto N° 64/020.",
    "penalties": "Apercibimiento, apercibimiento con publicación en medios de prensa, suspensión temporal de la base de datos y multas de hasta 500,000 UI.",
    "operational_implications": "Obliga a implementar medidas técnicas y organizativas para garantizar la confidencialidad de datos de tarjetahabientes y notificar a la URCDP ante cualquier acceso o exfiltración no autorizada.",
    "nist_csf_mapping": "NIST CSF 2.0: PR.DS-01 (Protección de Datos en Reposo y Tránsito)",
    "official_url": "https://www.impo.com.uy/bases/leyes/18331-2008",
    "text": "Ley Nº 18.331 de Protección de Datos Personales de Uruguay: El Artículo 12 establece el deber de adoptar medidas de seguridad para evitar la alteración, pérdida, tratamiento o acceso no autorizado a los datos personales. Exige notificar a la URCDP sobre vulneraciones de seguridad que comprometan datos de usuarios."
  },
  {
    "id": "REG-UY-03",
    "source": "Uruguay - Ley N° 10.489 e Indemnización por Despido (Doctrina de Notoria Mala Conducta)",
    "jurisdiction": "Uruguay (Derecho Laboral)",
    "category": "Laboral / Recursos Humanos",
    "scenario_ref": "Escenario 1 (uy-finance-breach) - Dilema 2 (uy-fin-govern-02)",
    "time_limit": "Aplica ante el cese de la relación laboral.",
    "receiving_authority": "Ministerio de Trabajo y Seguridad Social (MTSS) y Tribunales de Trabajo de Uruguay.",
    "scope": "Relaciones de trabajo dependientes en el sector privado uruguayo.",
    "articles": "Ley N° 10.489; Ley N° 12.597; Jurisprudencia laboral sobre 'Notoria Mala Conducta'.",
    "penalties": "Obligación de pago de la Indemnización por Despido (IPD) legal completa más daños y perjuicios sancionatorios si se despide sin probar la notoria mala conducta.",
    "operational_implications": "Bajo la legislación uruguaya, un error operativo cometido por un empleado técnico bajo la presión de resolver una caída del servicio (ej. compartir una clave por Slack) no configura automáticamente 'notoria mala conducta'. Despedirlo de inmediato genera una contingencia indemnizatoria grave y deja a la empresa sin la capacidad técnica para operar el sistema legacy en plena crisis.",
    "nist_csf_mapping": "NIST CSF 2.0: GV.RR-04 (Responsabilidad Organizacional y Cultura No Punitiva / ISO 27001 A.7.2)",
    "official_url": "https://www.impo.com.uy/bases/leyes/10489-1944",
    "text": "Ley N° 10.489 de Uruguay (Régimen de Despido): La exoneración de la indemnización por despido exige prueba fehaciente de 'notoria mala conducta' (intención dolosa o falta gravísima reiterada). Los errores operativos involuntarios durante la contención de una falla no justifican despido procedente sin indemnización."
  },
  {
    "id": "REG-AR-01",
    "source": "Argentina - Ley N° 25.326 de Protección de Datos y Resolución AAIP 47/2018",
    "jurisdiction": "Argentina (Mercosur / Transfronterizo)",
    "category": "Protección de Datos Transfronteriza",
    "scenario_ref": "Escenario 1 (uy-finance-breach) - Dilema 3 (uy-fin-govern-03)",
    "time_limit": "Plazo recomendado de 48 horas contadas a partir de la detección del incidente.",
    "receiving_authority": "Agencia de Acceso a la Información Pública (AAIP) de la República Argentina.",
    "scope": "Tratamiento de datos personales de residentes argentinos por entidades locales o extranjeras que impacten su jurisdicción.",
    "articles": "Ley N° 25.326 Art. 9 (Seguridad de los datos); Resolución AAIP N° 47/2018 (Medidas de Seguridad para el Tratamiento de Datos).",
    "penalties": "Apercibimientos, suspensión de bases de datos y multas de hasta $100,000 ARS (en proceso de actualización legislativa a montos severos).",
    "operational_implications": "Existe una asimetría regulatoria entre Uruguay (BCU 24h) y Argentina (AAIP 48h). El CISO de una empresa uruguaya que procesa datos de tarjetahabientes argentinos debe gestionar el reporte transfronterizo sin emitir declaraciones contradictorias entre ambas autoridades.",
    "nist_csf_mapping": "NIST CSF 2.0: GV.OC-03 (Cumplimiento de Requerimientos Regulatorios y Legales Multi-jurisdiccionales)",
    "official_url": "https://www.argentina.gob.ar/aaip/datospersonales",
    "text": "Ley 25.326 y Res. AAIP 47/2018 de Argentina: Establecen la obligación de implementar controles de seguridad y recomiendan notificar a la AAIP las brechas de seguridad dentro de las 48 horas de detectadas cuando afecten a titulares residentes en la República Argentina."
  },
  {
    "id": "REG-MX-01",
    "source": "México - NOM-004-SSA3-2012 del Expediente Clínico Electrónico",
    "jurisdiction": "México (Sector Salud)",
    "category": "Sectorial Salud",
    "scenario_ref": "Escenario 2 (mx-hospital-ransomware) - Custodia de Expedientes",
    "time_limit": "Notificación inmediata a autoridades sanitarias ante compromisos que interrumpan la atención médica.",
    "receiving_authority": "Secretaría de Salud de México y COFEPRIS.",
    "scope": "Prestadores de servicios de salud públicos y privados en el territorio mexicano.",
    "articles": "NOM-004-SSA3-2012 Numerales 5.4, 5.5 y 5.6 (Confidencialidad y Custodia del Expediente Clínico).",
    "penalties": "Sanciones administrativas en materia sanitaria, clausura temporal o definitiva del establecimiento y suspensión de licencias médicas.",
    "operational_implications": "Establece que el expediente clínico es propiedad del hospital y del paciente, exigiendo la adopción de medidas estrictas para preservar la continuidad del servicio médico y la integridad de los datos de salud.",
    "nist_csf_mapping": "NIST CSF 2.0: PR.DS-02 (Mantenimiento de la Integridad y Disponibilidad de Datos Críticos de Salud)",
    "official_url": "https://www.dof.gob.mx/nota_detalle.php?codigo=5272787&fecha=15/10/2012",
    "text": "NOM-004-SSA3-2012 de México: Regula la integración, uso, custodia y confidencialidad del expediente clínico electrónico. Obliga a los hospitales a garantizar la disponibilidad permanente de las fichas clínicas para proteger la vida de los pacientes."
  },
  {
    "id": "REG-MX-02",
    "source": "México - LGPDPPSO y LFPDPPP (INAI - Datos Sensibles de Salud)",
    "jurisdiction": "México (Protección de Datos Personales)",
    "category": "Protección de Datos Sensibles",
    "scenario_ref": "Escenario 2 (mx-hospital-ransomware) - Dilema 3 (mx-hosp-govern-05)",
    "time_limit": "Dentro de las 72 horas hábiles contadas a partir de que se tenga conocimiento de la brecha.",
    "receiving_authority": "INAI (Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales).",
    "scope": "Sujetos obligados públicos y entidades privadas (hospitales) que manejen datos personales sensibles de salud.",
    "articles": "LGPDPPSO Art. 31, 35 y 85; LFPDPPP Art. 19 y 64 (Título Noveno de Infracciones y Sanciones).",
    "penalties": "Multas de hasta 320,000 Unidades de Medida y Actualización (UMA) para privados, y responsabilidad administrativa grave con inhabilitación para funcionarios públicos.",
    "operational_implications": "Exige notificar de forma prioritaria e inmediata tanto al INAI como a los pacientes afectados cuando ocurra una brecha que comprometa historiales médicos o datos personales sensibles.",
    "nist_csf_mapping": "NIST CSF 2.0: GV.OC-03 (Cumplimiento Regulatorio ante Autoridades de Transparencia)",
    "official_url": "https://home.inai.org.mx",
    "text": "LGPDPPSO y LFPDPPP de México: Prescriben la obligación de informar a los titulares y al INAI en un plazo máximo de 72 horas hábiles sobre cualquier brecha de seguridad que afecte datos personales sensibles de salud. Las omisiones se sancionan con multas de hasta 320,000 UMA."
  },
  {
    "id": "REG-MX-03",
    "source": "México - Constitución Art. 4º y Código Penal Federal Art. 228 vs LFPIORPI (Pago de Rescates)",
    "jurisdiction": "México (Constitucional, Penal y Anti-Lavado)",
    "category": "Bioética / Legis. Penal y Financiera",
    "scenario_ref": "Escenario 2 (mx-hospital-ransomware) - Dilema 1 (mx-hosp-govern-01)",
    "time_limit": "Deber continuo e inmediato de preservación de la vida humana.",
    "receiving_authority": "Fiscalía General de la República (FGR), CERT-MX y Autoridades Judiciales.",
    "scope": "Directivos hospitalarios, CISOs y personal médico en México.",
    "articles": "Constitución Mexicana Art. 4º (Derecho a la Salud); Código Penal Federal Art. 228 (Negligencia y Omisión de Cuidados); LFPIORPI (Anti-Lavado de Dinero) / Directivas OFAC.",
    "penalties": "Responsabilidad penal directa (prisión) por homicidio culposo u omisión de cuidados si se suspenden servicios vitales por no restaurar sistemas, colisionando con el delito de financiamiento al crimen organizado si se paga el rescate a extorsionadores.",
    "operational_implications": "Genera una contradicción irresoluble entre la política de 'no pago de rescates' (para cumplir con LFPIORPI/OFAC) y el deber jurídico-bioético de salvar la vida de pacientes en UCI amenazados por la parálisis de los equipos de soporte vital.",
    "nist_csf_mapping": "NIST CSF 2.0: GV.RM-02 (Gestión de Riesgo Vital y Tolerancia en Crisis de Bioética)",
    "official_url": "https://www.diputados.gob.mx/LeyesBiblio/pdf/CPEUM.pdf",
    "text": "Constitución de México Art. 4º y Código Penal Federal Art. 228: Garantizan el derecho a la salud e imponen responsabilidad penal por negligencia médica u omisión de cuidados ante riesgo de muerte. Esto entra en colisión directa con leyes anti-lavado (LFPIORPI) que prohíben financiar organizaciones criminales mediante pagos de ransomware."
  },
  {
    "id": "REG-MX-04",
    "source": "México - Ley Federal del Trabajo (LFT) Artículo 47 (Despido Laboral y Phishing)",
    "jurisdiction": "México (Derecho Laboral)",
    "category": "Laboral / Recursos Humanos",
    "scenario_ref": "Escenario 2 (mx-hospital-ransomware) - Dilema 2 (mx-hosp-govern-04)",
    "time_limit": "30 días hábiles para ejercer la rescisión patronal tras conocer la falta.",
    "receiving_authority": "Juntas de Conciliación y Arbitraje / Tribunales Laborales de México.",
    "scope": "Empresarios y trabajadores regidos por el apartado A del artículo 123 constitucional.",
    "articles": "Ley Federal del Trabajo Art. 47 (Causales de Rescisión sin Responsabilidad para el Patrón) y Art. 48.",
    "penalties": "Condena al pago de indemnización constitucional de 3 meses de salario, salarios vencidos e intereses procesales por despido injustificado.",
    "operational_implications": "Un empleado que cae en un engaño de ingeniería social (phishing sofisticado) sin intención dolosa no incurre en falta de probidad u honradez. Despedirlo de forma punitiva expone a la institución a demandas laborales perdidas y destruye la cultura interna de notificación temprana de incidentes.",
    "nist_csf_mapping": "NIST CSF 2.0: GV.RR-04 (Roles, Responsabilidades y Cultura de Seguridad Restaurativa / PR.AT-01)",
    "official_url": "https://www.diputados.gob.mx/LeyesBiblio/pdf/LFT.pdf",
    "text": "Ley Federal del Trabajo (LFT) Art. 47 de México: Enumera taxativamente las causas justificadas de despido sin indemnización (falta de probidad, violencia, dolo). Ser víctima de phishing sin intención maliciosa no constituye causa de rescisión justificada, configurando despido injustificado con derecho a indemnización (Art. 48)."
  },
  {
    "id": "REG-US-01",
    "source": "EE.UU. - HIPAA Breach Notification Rule (45 CFR §§ 164.400-414) - Umbral de 500 Registros",
    "jurisdiction": "Estados Unidos (Salud / Transfronterizo)",
    "category": "Internacional / Sectorial Salud",
    "scenario_ref": "Escenario 2 (mx-hospital-ransomware) - Dilema 3 (mx-hosp-govern-05)",
    "time_limit": "Notificación inmediata a la Secretaría de HHS sin demora indebida y no más de 60 días; reporte a medios masivos si afecta a >= 500 individuos.",
    "receiving_authority": "U.S. Department of Health & Human Services (HHS) - Office for Civil Rights (OCR).",
    "scope": "Entidades cubiertas (Covered Entities) y asociados de negocio que traten PHI de ciudadanos/residentes estadounidenses.",
    "articles": "Health Insurance Portability and Accountability Act (HIPAA) 45 CFR § 164.406 y § 164.408.",
    "penalties": "Multas civiles pecuniarias graduadas que varían desde $100 hasta $50,000 USD por violación (con un máximo de $1.5 millones USD por año) y demandas colectivas.",
    "operational_implications": "Al alcanzarse exactamente el umbral de 500 pacientes estadounidenses (turismo médico), se activa la obligación estricta de reportar a HHS y emitir un comunicado de prensa en medios locales de EE.UU., elevando sustancialmente la exposición pública internacional del hospital.",
    "nist_csf_mapping": "NIST CSF 2.0: GV.OC-03 (Cumplimiento de Estándares Internacionales Transfronterizos)",
    "official_url": "https://www.hhs.gov/hipaa/for-professionals/breach-notification/index.html",
    "text": "HIPAA Breach Notification Rule (EE.UU.): Exige notificar a la Secretaría de HHS y alertar a medios de comunicación prominentes de la jurisdicción cuando una brecha de seguridad afecte la información médica protegida (PHI) de 500 o más personas."
  },
  {
    "id": "REG-EU-01",
    "source": "Unión Europea - GDPR (Reglamento UE 2016/679) Artículos 3, 33 y 34",
    "jurisdiction": "Unión Europea (Transfronterizo / GDPR)",
    "category": "Internacional / Protección de Datos",
    "scenario_ref": "Escenario 2 (mx-hospital-ransomware) - Dilema 3 (mx-hosp-govern-05)",
    "time_limit": "Máximo 72 horas después de haber tenido constancia de la brecha ante la autoridad de control.",
    "receiving_authority": "Autoridades de Protección de Datos de los Estados Miembros de la UE (DPA).",
    "scope": "Tratamiento de datos personales de interesados que se encuentren en la UE por responsables no establecidos en la UE (Principio de Extraterritorialidad, Art. 3.2).",
    "articles": "Reglamento (UE) 2016/679 (GDPR) Artículos 3(2), 33 (Notificación a la Autoridad) y 34 (Comunicación al Interesado).",
    "penalties": "Multas administrativas de hasta 20,000,000 EUR o el 4% del volumen de negocio global anual del ejercicio anterior.",
    "operational_implications": "El tratamiento de datos de pacientes europeos en un hospital mexicano atrae la jurisdicción extraterritorial del GDPR. Omitir la notificación por carecer de presupuesto legal internacional expone a la institución a sanciones europeas masivas.",
    "nist_csf_mapping": "NIST CSF 2.0: GV.OC-03 (Alineación con Marcos Internacionales Extraterritoriales)",
    "official_url": "https://eur-lex.europa.eu/eli/reg/2016/679/oj",
    "text": "GDPR de la Unión Europea (Reglamento 2016/679): Establece que toda brecha de datos de residentes europeos debe ser notificada a la autoridad supervisora en un plazo máximo de 72 horas (Art. 33). Su artículo 3.2 otorga alcance extraterritorial global."
  },
  {
    "id": "REG-CL-01",
    "source": "Chile - Ley Marco de Ciberseguridad (Ley Nº 21.660 / 21.663) y CSIRT Nacional",
    "jurisdiction": "Chile (Infraestructura Crítica / Servicios Esenciales)",
    "category": "Ciberseguridad y Servicios Esenciales",
    "scenario_ref": "Escenario 3 (br-cl-crossborder-retail) - Dilema 1 (br-cl-govern-01)",
    "time_limit": "Notificación inicial obligatoria e inmediata, la cual NO debe exceder de 3 horas desde la contención técnica o conocimiento del incidente.",
    "receiving_authority": "CSIRT Nacional (Agencia Nacional de Ciberseguridad - ANCI / Subsecretaría del Interior).",
    "scope": "Operadores de Importancia Vital (OIV) y Proveedores de Servicios Esenciales (salud, finanzas, comercio electrónico masivo, telecomunicaciones).",
    "articles": "Ley N° 21.660 / 21.663 Artículos de Notificación de Incidentes de Efecto Significativo; Res. Exentas de Taxonomía del CSIRT.",
    "penalties": "Multas gravísimas que pueden alcanzar desde 15,000 hasta 40,000 UTM (Unidades Tributarias Mensuales).",
    "operational_implications": "Chile exige un reporte de emergencia en un plazo extremadamente corto (3 horas). Si una empresa consolida datos en Brasil, la prisa por cumplir con el plazo chileno puede llevar a reportar hipótesis forenses preliminares e imprecisas.",
    "nist_csf_mapping": "NIST CSF 2.0: GV.RM-02 (Gestión de Tiempos Críticos de Reporte e Incompatibilidad Normativa)",
    "official_url": "https://www.bcn.cl/leychile/navegar?idNorma=1202279",
    "text": "Ley Marco de Ciberseguridad de Chile (Ley 21.660 / 21.663): Obliga a los operadores de servicios esenciales a notificar al CSIRT Nacional cualquier incidente significativo en un plazo fatal de 3 horas. Sanciona el retardo con multas de hasta 40,000 UTM."
  },
  {
    "id": "REG-BR-01",
    "source": "Brasil - Lei Geral de Proteção de Dados (LGPD - Ley 13.709) Artículo 48",
    "jurisdiction": "Brasil (General / Protección de Datos)",
    "category": "Protección de Datos",
    "scenario_ref": "Escenario 3 (br-cl-crossborder-retail) - Dilema 1 (br-cl-govern-01)",
    "time_limit": "Plazo razonable (interpretado doctrinaria y administrativamente por la ANPD en un límite de 48 horas / 2 días hábiles).",
    "receiving_authority": "ANPD (Autoridade Nacional de Proteção de Dados de Brasil).",
    "scope": "Cualquier operación de tratamiento de datos personales realizada en territorio brasileño o que tenga por objeto ofrecer bienes o servicios a individuos.",
    "articles": "Lei Nº 13.709 (LGPD) Art. 48 (Comunicación de Incidentes de Seguridad) y Art. 52 (Sanciones Administrativas).",
    "penalties": "Multas simples de hasta el 2% de la facturación de la persona jurídica o grupo en Brasil, con un tope de 50,000,000 de Reales por infracción.",
    "operational_implications": "Brasil exige notificar a la ANPD en un 'plazo razonable' (48h). En dilemas transfronterizos, priorizar la ventana brasileña para obtener certidumbre forense provoca el incumplimiento automático del plazo de 3 horas fijado por Chile.",
    "nist_csf_mapping": "NIST CSF 2.0: GV.RM-02 (Ponderación de Sanciones Administrativas Transfronterizas)",
    "official_url": "http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm",
    "text": "LGPD de Brasil (Ley 13.709 Art. 48): Obliga al controlador a comunicar a la ANPD y a los titulares la ocurrencia de incidentes de seguridad que puedan generar riesgo o daño relevante en un 'plazo razonable' (48 horas). Sanciones de hasta 50 millones de reales."
  },
  {
    "id": "REG-BR-02",
    "source": "Brasil - Ley N° 9.279/1996 (Propiedad Industrial / Secreto Comercial de Proveedores Cloud)",
    "jurisdiction": "Brasil (Propiedad Industrial y Comercial)",
    "category": "Secreto Comercial / Proveedores Nube",
    "scenario_ref": "Escenario 3 (br-cl-crossborder-retail) - Dilema 2 (br-cl-govern-02)",
    "time_limit": "Protección permanente del secreto comercial salvo orden judicial de exhibición.",
    "receiving_authority": "Poder Judicial de Brasil y Consejo Administrativo de Defensa Económica (CADE).",
    "scope": "Empresas proveedoras de servicios tecnológicos e infraestructura cloud con sede en Brasil.",
    "articles": "Ley N° 9.279/1996 Art. 195 (Delitos de Competencia Desleal y Secreto Industrial); LGPD Art. 39 (Responsabilidad del Operador).",
    "penalties": "Responsabilidad penal por divulgación de secreto industrial y acciones civiles de indemnización por daños a la propiedad intelectual del proveedor.",
    "operational_implications": "Un proveedor cloud en Brasil puede respaldarse legalmente en el secreto industrial para denegar la entrega de logs crudos o volcados de memoria al CISO del cliente. Esto impide al CISO entregar una investigación completa al regulador chileno, forzándolo a asumir responsabilidad o ir a juicio en Brasil.",
    "nist_csf_mapping": "NIST CSF 2.0: GV.RR-04 (Gestión de Riesgo de Proveedores Cloud de Terceros / Contractual Compliance)",
    "official_url": "http://www.planalto.gov.br/ccivil_03/leis/l9279.htm",
    "text": "Ley de Propiedad Industrial de Brasil (Ley 9.279 Art. 195): Protege el secreto comercial e industrial de las empresas. Permite a los proveedores de infraestructura negar la entrega de código fuente o archivos de sistema a terceros, creando trabas para las auditorías de incidentes."
  },
  {
    "id": "REG-CL-02",
    "source": "Chile - Ley N° 19.496 de Protección de los Derechos de los Consumidores (SERNAC)",
    "jurisdiction": "Chile (Protección al Consumidor)",
    "category": "Derechos del Consumidor",
    "scenario_ref": "Escenario 3 (br-cl-crossborder-retail) - Dilema 3 (br-cl-govern-03)",
    "time_limit": "Información inmediata y transparente ante situaciones de riesgo financiero.",
    "receiving_authority": "SERNAC (Servicio Nacional del Consumidor de Chile) y Tribunales de Policía Local.",
    "scope": "Proveedores de comercio electrónico y servicios financieros que interactúen con consumidores en Chile.",
    "articles": "Ley N° 19.496 Art. 3 (Derechos fundamentales del consumidor: información veraz y oportuna) y Art. 12.",
    "penalties": "Multas de hasta 300 UTM por infracción y demandas colectivas indemnizatorias por negligencia en la seguridad de los datos de pago.",
    "operational_implications": "El SERNAC exige la alerta inmediata y pública a los usuarios afectados. Sin embargo, publicar la vulneración antes de aplicar el parche técnico en la base de datos de Brasil incrementa el riesgo de un ataque de imitación de otros cibercriminales.",
    "nist_csf_mapping": "NIST CSF 2.0: GV.OC-03 / ISO 27001 A.5.26 (Divulgación Responsable vs. Protección del Consumidor)",
    "official_url": "https://www.bcn.cl/leychile/navegar?idNorma=61438",
    "text": "Ley N° 19.496 de Chile (SERNAC): Consagra el derecho del consumidor a recibir información veraz y oportuna sobre la seguridad de sus productos y servicios. Divulgar inmediatamente protege a los usuarios pero puede exponer el sistema a nuevos ataques antes de aplicar parches."
  },
  {
    "id": "FRAMEWORK-NIST-01",
    "source": "NIST Cybersecurity Framework 2.0 (CSF 2.0 - Governance Functions)",
    "jurisdiction": "Estándar Internacional / Global",
    "category": "Framework de Gobernanza",
    "scenario_ref": "Transversal a todos los Escenarios (Dilemas 1, 2 y 3)",
    "time_limit": "Marco metodológico continuo para la toma de decisiones estratégicas.",
    "receiving_authority": "Junta Directiva, CISO, Comités de Riesgo y Auditoría Externa.",
    "scope": "Cualquier organización expuesta a riesgos de ciberseguridad.",
    "articles": "NIST CSF 2.0 Categorías: GV.RM-02 (Apetito de Riesgo), GV.RR-04 (Roles y Responsabilidades), GV.OC-03 (Requerimientos Legales y Regulatorios).",
    "penalties": "No aplicable directamente (estándar voluntario), pero su incumplimiento se considera negligencia en auditorías corporativas y litigios.",
    "operational_implications": "Provee el marco conceptual para estructurar la gobernanza: equilibrar apetitos de riesgo en crisis (GV.RM-02), gestionar factores humanos y sanciones no punitivas (GV.RR-04) y coordinar el cumplimiento en colisiones legislativas internacionales (GV.OC-03).",
    "nist_csf_mapping": "NIST CSF 2.0 Core Function: GOVERN (GV)",
    "official_url": "https://www.nist.gov/cyberframework",
    "text": "NIST CSF 2.0 (Función GOVERN): Define los principios de gobernanza en ciberseguridad: GV.RM-02 (establecimiento de tolerancias de riesgo), GV.RR-04 (claridad en roles y responsabilidad sin sesgo punitivo) y GV.OC-03 (integración de requerimientos legales multi-jurisdiccionales)."
  },
  {
    "id": "FRAMEWORK-ISO-01",
    "source": "ISO/IEC 27001:2022 y NIST SP 800-61 Rev 2 (Incident Management)",
    "jurisdiction": "Estándar Internacional / Global",
    "category": "Estándares Técnicos de Incidentes",
    "scenario_ref": "Transversal a todos los Escenarios",
    "time_limit": "Ciclo de respuesta: Preparación, Detección, Contención, Erradicación, Recuperación, Post-Incidente.",
    "receiving_authority": "Equipos SOC, Incident Response, Auditores de Certificación ISO.",
    "scope": "Sistemas de Gestión de Seguridad de la Información (SGSI).",
    "articles": "ISO/IEC 27001:2022 Controles A.5.24, A.5.26, A.5.34, A.7.2; NIST SP 800-61 Rev 2 Sección 3.",
    "penalties": "Pérdida de certificación ISO 27001 y hallazgos mayores en auditorías de cumplimiento.",
    "operational_implications": "Exige documentar rigurosamente el análisis forense, mantener cadena de custodia y desvincular los plazos de contención técnica de los plazos regulatorios de notificación, asegurando lecciones aprendidas.",
    "nist_csf_mapping": "NIST CSF 2.0: RS.MA-01 (Manejo de Incidentes) y RC.RP-01 (Planes de Recuperación)",
    "official_url": "https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final",
    "text": "ISO/IEC 27001:2022 y NIST SP 800-61 Rev 2: Definen las mejores prácticas internacionales de gestión de incidentes. Exigen la separación de fases (análisis, contención, notificación) y la implementación de controles organizativos para preservar evidencias y continuidad."
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
        "groupB": `[VEREDICTO] RECHAZADO: La propuesta del operador de postergar la notificación oficial al Banco Central del Uruguay (BCU) para evitar pánico de mercado infringe gravemente la Circular 2318.

[FUNDAMENTACIÓN LEGAL]
- Bajo la normativa de regulación y control del sistema financiero del BCU, las entidades reguladas deben reportar incidentes calificados como críticos en un plazo máximo e improrrogable de 24 horas contadas a partir de la detección o sospecha razonable del evento.
- La postergación deliberada para priorizar la contención técnica o eludir el pánico de mercado se califica como negligencia y puede derivar en multas de hasta 2,000,000 de Unidades Indexadas (UI) o incluso la revocación de la licencia para operar.

[RECOMENDACIÓN]
- Proceder de forma inmediata a la comunicación preliminar del incidente de seguridad al BCU, manteniendo el canal abierto de soporte técnico para complementar la información conforme avance el análisis forense.`,
        "groupC": {
            "evaluacion": "RECHAZADO (INCUMPLIMIENTO NORMATIVO DETECTADO)",
            "explicacion": "El dictamen de auditoría valida y corrobora de forma estricta las normativas financieras de Uruguay. La decisión del operador de postergar el reporte al Banco Central de Uruguay (BCU) viola la Circular 2318 (plazo límite de 24 horas).",
            "mejor_practica": "Ejecutar la notificación inicial formal al BCU inmediatamente (dentro de las 24 horas). Utilizar plantillas estandarizadas de reporte preliminar de incidentes críticos.",
            "fuentes_citadas": ["Uruguay BCU Circular 2318 (Circular_2318_Uruguay_Finanzas.pdf)", "ISO/IEC 27001:2022 Control A.5.34"],
            "costo_estimado": 0.00340,
            "total_tokens": 1240,
            "aprobado": true,
            "score_tecnico": 100.0
        }
    },
    "2": {
        "groupB": `[VEREDICTO] APROBADO: La propuesta del operador de notificar a la Secretaría de Salud y al INAI inmediatamente a las 12 horas del incidente cumple holgadamente con los plazos establecidos.

[FUNDAMENTACIÓN LEGAL]
- Según la NOM-004-SSA3-2012 y la Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados (LGPDPPSO), el plazo máximo para notificar brechas que comprometan expedientes clínicos es de 72 horas hábiles contadas a partir del conocimiento del incidente.
- Realizar la notificación a las 12 horas asegura el cumplimiento de las obligaciones de transparencia, minimizando el riesgo de sanciones y multas administrativas (las cuales pueden alcanzar hasta 320,000 UMA).

[RECOMENDACIÓN]
- Proceder con la notificación planificada al INAI y a los titulares afectados, asegurando el bloqueo de las credenciales de urgencia comprometidas y documentando las lecciones aprendidas.`,
        "groupC": {
            "evaluacion": "APROBADO (CUMPLIMIENTO NORMATIVO VERIFICADO)",
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
        "groupB": `[VEREDICTO] RECHAZADO: La propuesta del operador de posponer el informe al CSIRT de Chile para realizar un análisis de colisión legal transfronterizo en Brasil es inválida y viola los plazos legales.

[FUNDAMENTACIÓN LEGAL]
- De acuerdo con la Ley Marco de Ciberseguridad de Chile (Ley Nº 21.660), los operadores de infraestructura crítica de la información y proveedores de servicios esenciales deben notificar los incidentes significativos de forma inmediata, en un plazo que no exceda las 3 horas de su contención o conocimiento.
- Alinear las operaciones chilenas bajo las regulaciones de la LGPD de Brasil es un error técnico-operativo; las leyes de cada país deben cumplirse de manera independiente y en paralelo.

[RECOMENDACIÓN]
- Proceder con el reporte de emergencia al CSIRT de Chile inmediatamente antes de cumplirse el plazo límite de 3 horas, y de forma paralela notificar a la ANPD en Brasil dentro de su ventana razonable (48-72h).`,
        "groupC": {
            "evaluacion": "RECHAZADO (INCUMPLIMIENTO NORMATIVO DETECTADO)",
            "explicacion": "El dictamen determinó que la propuesta del operador de posponer el informe en Chile viola el Artículo de Notificaciones de la Ley Marco de Ciberseguridad de Chile (Ley Nº 21.660), que impone un plazo fatal e improrrogable de 3 horas.",
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
        
        // Siempre mostrar la asignación automática por Matriz de Contrabalanceo Latino
        if (assignedRunContainer) assignedRunContainer.classList.remove("hidden");
        if (manualScenariosContainer) manualScenariosContainer.classList.add("hidden");
        
        if (!appState.startingGroup) {
            appState.startingGroup = 'A';
        }
        
        // Asignar parámetros estrictos según la matriz de contrabalanceo
        const { group, scenarioId } = getExperimentParameters(appState.startingGroup, appState.runNumber);
        appState.activeGroup = group;
        appState.selectedScenarioId = scenarioId;
        
        const scenario = SCENARIOS[scenarioId];
        
        const subtitleEl = document.getElementById("assigned-run-subtitle");
        const titleEl = document.getElementById("assigned-run-title");
        const detailsEl = document.getElementById("assigned-run-details");

        if (subtitleEl) subtitleEl.innerText = `CORRIDA ${appState.runNumber} DE 3 ${appState.isDemoMode ? '(MODO DEMO)' : ''}`;
        if (titleEl) titleEl.innerText = scenario.title;
        
        // Protocolo de Ciego Único: Mostrar etiqueta neutra al participante sin revelar el grupo experimental
        let groupLabel = appState.isDemoMode 
            ? `Entorno de Auditoría Habilitado (Condición ${group})` 
            : `Entorno de Auditoría y Soporte Habilitado`;
        
        if (detailsEl) {
            detailsEl.innerHTML = `
                <strong>Caso Asignado:</strong> ${scenario.title} (${scenario.type})<br>
                <strong>Jurisdicción Afundada:</strong> ${scenario.jurisdiction}<br>
                <strong>Herramienta Experimental:</strong> <span style="color: var(--primary); font-weight: 600;">${groupLabel}</span>
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
    const isDemoExplicit = urlParams.get('demo') === 'true';
    appState.isProduction = isProduction;
    appState.isDemoExplicit = isDemoExplicit;

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
        const elAcc = document.getElementById("access-code"); if (elAcc) elAcc.value = appState.accessCode;
        const elPart = document.getElementById("participant-id"); if (elPart) elPart.value = appState.participantId;
        const elExp = document.getElementById("participant-experience"); if (elExp) elExp.value = appState.experience;
        const elGem = document.getElementById("gemini-key"); if (elGem) elGem.value = appState.geminiApiKey;
        const elGroq = document.getElementById("groq-key"); if (elGroq) elGroq.value = appState.groqApiKey;
        const elOpenR = document.getElementById("openrouter-key"); if (elOpenR) elOpenR.value = appState.openrouterApiKey;

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

    // El botón Modo Demo solo se muestra si explícitamente se pasa ?demo=true en la URL
    const btnDemo = document.getElementById("btn-demo-mode");
    if (btnDemo) {
        if (isDemoExplicit) {
            btnDemo.classList.remove("hidden");
        } else {
            btnDemo.classList.add("hidden");
        }
    }

    // Fase 1 -> Fase 2 (Validación Estricta de Código Único de Firebase)
    document.getElementById("btn-to-phase-2").addEventListener("click", async () => {
        appState.isDemoMode = false;
        
        const accessCodeInput = document.getElementById("access-code").value.trim().toUpperCase();
        if (!accessCodeInput) {
            alert("Por favor, ingrese su Código de Acceso de un Solo Uso recibido por correo.");
            return;
        }
        
        const btnStart = document.getElementById("btn-to-phase-2");
        const originalText = btnStart.innerHTML;
        btnStart.disabled = true;
        btnStart.innerText = "Validando código en Firebase...";
        
        try {
            let perfilExp = "Perfil Verificado en Registro";

            if (isFirebaseAvailable && db) {
                const docRef = db.collection("codigos_acceso").doc(accessCodeInput);
                const docSnap = await docRef.get();
                
                if (!docSnap.exists) {
                    alert("El código de acceso introducido no es válido. Verifique con el equipo de investigación de INFOTEC.");
                    btnStart.disabled = false;
                    btnStart.innerHTML = originalText;
                    return;
                }
                
                const data = docSnap.data();
                if (data.usado === true) {
                    alert("Este código de acceso ya fue utilizado para realizar la evaluación. Si su sesión se interrumpió, contacte al equipo de investigación.");
                    btnStart.disabled = false;
                    btnStart.innerHTML = originalText;
                    return;
                }
                
                // Obtener perfil y experiencia vinculados en solicitudes_convocatoria si existe el ID
                if (data.candidato_id) {
                    try {
                        const candSnap = await db.collection("solicitudes_convocatoria").doc(data.candidato_id).get();
                        if (candSnap.exists) {
                            const candData = candSnap.data();
                            perfilExp = `${candData.perfil || 'CISO'} | ${candData.experiencia || 'Experiencia Registrada'}`;
                        }
                    } catch (e) {
                        console.warn("⚠️ No se pudo obtener el perfil extendido del candidato, usando valores por defecto:", e);
                    }
                } else if (data.perfil) {
                    perfilExp = data.perfil;
                }

                // Quemar el código de un solo uso en Firebase
                await docRef.update({
                    usado: true,
                    fecha_uso: new Date().toISOString()
                });
                console.log(`✓ [Firebase] Código de acceso ${accessCodeInput} validado y marcado como usado.`);
            } else {
                console.warn("⚠️ [Firebase] Omitiendo validación remota por estar en modo local o fuera de línea.");
            }
            
            // Cargar datos en el estado del experimento
            appState.accessCode = accessCodeInput;
            appState.participantId = accessCodeInput; // El código de acceso actúa como identificador único anónimo
            appState.experience = perfilExp;
            
            // Actualizar dinámicamente las instrucciones según el perfil (CISO vs Derecho)
            const titleEl = document.getElementById("instruction-role-title");
            const descEl = document.getElementById("instruction-role-desc");

            if (titleEl && descEl) {
                const lowerPerfil = perfilExp.toLowerCase();
                if (lowerPerfil.includes("mixto")) {
                    titleEl.innerText = "Instrucciones del Participante (Rol: Perfil Mixto - Gobernanza & Legal)";
                    descEl.innerText = "Usted asumirá la postura integrada de CISO y Asesor Legal para auditar la validez jurídica, la responsabilidad normativa y la contención operativa de la propuesta del operador ante incidentes críticos.";
                } else if (lowerPerfil.includes("derecho") || lowerPerfil.includes("legal")) {
                    titleEl.innerText = "Instrucciones del Participante (Rol: Asesor Legal / Compliance)";
                    descEl.innerText = "Usted asumirá la postura de Auditor de Derecho Digital y Cumplimiento Regulatorio para evaluar la validez jurídica, la responsabilidad legal y el apego normativo de la propuesta del operador ante incidentes críticos.";
                } else {
                    titleEl.innerText = "Instrucciones del Participante (Rol: CISO / Director de Seguridad)";
                    descEl.innerText = "Usted asumirá la postura de Director de Seguridad de la Información (CISO) para auditar y validar decisiones técnicas y operativas de reporte ante incidentes críticos.";
                }
            }
            
            const geminiKeyEl = document.getElementById("gemini-key");
            const groqKeyEl = document.getElementById("groq-key");
            const openrouterKeyEl = document.getElementById("openrouter-key");

            appState.geminiApiKey = geminiKeyEl ? geminiKeyEl.value.trim() : "";
            appState.groqApiKey = groqKeyEl ? groqKeyEl.value.trim() : "";
            appState.openrouterApiKey = openrouterKeyEl ? openrouterKeyEl.value.trim() : "";
            
            showPhase(2);
        } catch (error) {
            console.error("❌ Error de validación en Firebase:", error);
            alert(`Error de conexión al validar el código: ${error.message}. Verifique su conexión o contacte al investigador.`);
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

    // Modo Demo (Para pruebas del investigador)
    const demoBtn = document.getElementById("btn-demo-mode");
    if (demoBtn) {
        demoBtn.addEventListener("click", () => {
            sessionStorage.clear();
            
            appState.isDemoMode = true;
            appState.runNumber = 1;
            appState.startingGroup = 'A';
            appState.activeGroup = 'A';
            appState.selectedScenarioId = '1';
            appState.participantId = "CISO-DEMO-SIMULADO";
            appState.experience = "Perfil Mixto - Avanzado (Demo)";
            appState.csvLogs = [];
            appState.answers = {};
            appState.quizScore = 0;
            appState.iaLatency = 0;
            appState.stopwatchElapsed = 0;
            
            const gKey = document.getElementById("gemini-key");
            const grKey = document.getElementById("groq-key");
            const orKey = document.getElementById("openrouter-key");

            if (gKey) gKey.value = "••••••••••••••••";
            if (grKey) grKey.value = "••••••••••••••••";
            if (orKey) orKey.value = "••••••••••••••••";
            
            setupExperimentalUI(appState.activeGroup, isProduction);
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

    // Grupo A: Buscador Manual y Filtros por Jurisdicción
    document.getElementById("btn-manual-search").addEventListener("click", () => executeManualSearch());
    document.getElementById("manual-search-input").addEventListener("keypress", (e) => {
        if (e.key === "Enter") executeManualSearch();
    });

    document.querySelectorAll("#jurisdiction-filters .pill-btn").forEach(pill => {
        pill.addEventListener("click", (e) => {
            document.querySelectorAll("#jurisdiction-filters .pill-btn").forEach(p => p.classList.remove("active"));
            e.target.classList.add("active");
            const filterCategory = e.target.getAttribute("data-filter");
            executeManualSearch(filterCategory);
        });
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

    // Fase 5: Descarga de Resúmenes de Cumplimiento
    const btnDownloadSummaries = document.getElementById("btn-download-summaries");
    if (btnDownloadSummaries) {
        btnDownloadSummaries.addEventListener("click", () => {
            downloadCSV();
        });
    }

    // Fase 5: Terminar y Salir
    const btnFinishExit = document.getElementById("btn-finish-and-exit");
    if (btnFinishExit) {
        btnFinishExit.addEventListener("click", () => {
            sessionStorage.clear();
            location.reload();
        });
    }

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
    appState.selectedScenarioId = String(id);
    const scenario = SCENARIOS[id];
    const activeDisplay = document.getElementById("active-scenario-display");
    if (activeDisplay) activeDisplay.innerText = `Corrida ${appState.runNumber} de 3 | Escenario Activo: ${id}`;
    
    const expTitle = document.getElementById("experiment-title");
    if (expTitle) expTitle.innerText = `Fase 3: Soporte y Auditoría de Decisión (Corrida ${appState.runNumber} de 3)`;

    document.getElementById("dilemma-text").innerText = scenario.dilema;
    document.getElementById("operator-decision-text").innerText = scenario.decision;
    
    // Inyectar cultura ética organizacional (Acuerdo previo)
    if (scenario.ethicalCulture) {
        document.getElementById("culture-title").innerText = scenario.ethicalCulture.title;
        document.getElementById("culture-desc").innerText = scenario.ethicalCulture.description;
    }

    // Resetear píldora activa al filtro "Del Escenario Activo"
    const scenarioPill = document.querySelector("#jurisdiction-filters .pill-btn[data-filter='active_scenario']");
    if (scenarioPill) {
        document.querySelectorAll("#jurisdiction-filters .pill-btn").forEach(p => p.classList.remove("active"));
        scenarioPill.classList.add("active");
    }

    // Cargar de forma predeterminada las regulaciones filtradas para el escenario activo
    executeManualSearch("active_scenario");
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

// GRUPO A: BÚSQUEDA VECTORIAL / MANUAL LOCAL ENRIQUECIDA
function executeManualSearch(filterCategory = null) {
    const queryInput = document.getElementById("manual-search-input");
    const query = queryInput ? queryInput.value.trim().toLowerCase() : "";
    const resultsContainer = document.getElementById("manual-search-results");
    
    // Obtener la categoría del botón activo si no se especificó un parámetro directo
    if (!filterCategory) {
        const activePill = document.querySelector("#jurisdiction-filters .pill-btn.active");
        if (activePill) filterCategory = activePill.getAttribute("data-filter");
    }

    if (!appState.regulatoryDatabase || appState.regulatoryDatabase.length === 0) {
        appState.regulatoryDatabase = FALLBACK_REGULATORY_DATABASE;
    }

    let results = [];

    appState.regulatoryDatabase.forEach(doc => {
        const fullContent = `
            ${doc.source || ""} ${doc.text || ""} ${doc.jurisdiction || ""} 
            ${doc.category || ""} ${doc.articles || ""} ${doc.operational_implications || ""} 
            ${doc.penalties || ""} ${doc.nist_csf_mapping || ""} ${doc.scenario_ref || ""}
        `.toLowerCase();

        let matchesFilter = true;
        if (filterCategory && filterCategory !== "all") {
            const filterLower = filterCategory.toLowerCase();
            
            if (filterLower === "active_scenario") {
                const activeNum = String(appState.selectedScenarioId || "1");
                const scenarioRefLower = (doc.scenario_ref || "").toLowerCase();
                const docId = (doc.id || "").toUpperCase();

                if (activeNum === "1") {
                    matchesFilter = docId.startsWith("REG-UY") || docId.startsWith("REG-AR") || docId.startsWith("FRAMEWORK") || scenarioRefLower.includes("escenario 1") || scenarioRefLower.includes("transversal");
                } else if (activeNum === "2") {
                    matchesFilter = docId.startsWith("REG-MX") || docId.startsWith("REG-US") || docId.startsWith("REG-EU") || docId.startsWith("FRAMEWORK") || scenarioRefLower.includes("escenario 2") || scenarioRefLower.includes("transversal");
                } else if (activeNum === "3") {
                    matchesFilter = docId.startsWith("REG-CL") || docId.startsWith("REG-BR") || docId.startsWith("FRAMEWORK") || scenarioRefLower.includes("escenario 3") || scenarioRefLower.includes("transversal");
                }
            } else if (filterLower === "transfronterizo") {
                matchesFilter = fullContent.includes("transfronteriz") || fullContent.includes("ee.uu") || fullContent.includes("ue") || fullContent.includes("gdpr") || fullContent.includes("hipaa") || fullContent.includes("argentina");
            } else if (filterLower === "framework") {
                matchesFilter = fullContent.includes("framework") || fullContent.includes("nist") || fullContent.includes("iso");
            } else {
                matchesFilter = (doc.jurisdiction && doc.jurisdiction.toLowerCase().includes(filterLower)) || fullContent.includes(filterLower);
            }
        }

        let matchesQuery = true;
        if (query) {
            matchesQuery = fullContent.includes(query);
        }

        if (matchesFilter && matchesQuery) {
            results.push(doc);
        }
    });

    // Fallback si la búsqueda por palabra clave no retorna nada: mostrar resultados generales sugeridos
    if (results.length === 0 && query) {
        resultsContainer.innerHTML = `<div class="no-results">⚠️ No se encontraron coincidencias exactas para "${query}". Mostrando sugerencias normativas generales:</div>`;
        results = appState.regulatoryDatabase.slice(0, 4);
    } else {
        resultsContainer.innerHTML = "";
    }

    if (results.length === 0) {
        resultsContainer.innerHTML = `<div class="no-results">No hay registros normativos disponibles para el filtro seleccionado.</div>`;
        return;
    }

    results.forEach((doc, idx) => {
        const card = document.createElement("div");
        card.className = "law-card";
        
        let badgeClass = "framework";
        const jur = (doc.jurisdiction || "").toLowerCase();
        if (jur.includes("uruguay")) badgeClass = "uruguay";
        else if (jur.includes("méxico") || jur.includes("mexico")) badgeClass = "mexico";
        else if (jur.includes("brasil")) badgeClass = "brasil";
        else if (jur.includes("chile")) badgeClass = "chile";
        else if (jur.includes("estados unidos") || jur.includes("unión europea") || jur.includes("argentina") || jur.includes("transfronterizo")) badgeClass = "transfronterizo";

        const badgeText = doc.jurisdiction || "NORMA GENERAL";

        card.innerHTML = `
            <div class="law-card-header">
                <h4>[Regulación ${idx + 1}]: ${doc.source}</h4>
                <span class="law-badge ${badgeClass}">${badgeText}</span>
            </div>
            
            <div class="law-meta-grid">
                <div class="law-meta-item"><strong>⏱️ Plazo de Notificación:</strong> ${doc.time_limit || "No especificado"}</div>
                <div class="law-meta-item"><strong>🏛️ Autoridad Competente:</strong> ${doc.receiving_authority || "No especificada"}</div>
                <div class="law-meta-item"><strong>⚖️ Artículos / Base Legal:</strong> ${doc.articles || "No especificados"}</div>
                <div class="law-meta-item"><strong>🛡️ Alineación NIST/ISO:</strong> ${doc.nist_csf_mapping || "No mapeado"}</div>
            </div>

            ${doc.operational_implications ? `
                <div class="law-card-section">
                    <label>💡 Implicaciones Operativas y Dilema CISO:</label>
                    <p>${doc.operational_implications}</p>
                </div>
            ` : ""}

            ${doc.penalties ? `
                <div class="law-card-section">
                    <label>⚠️ Sanciones y Multas por Incumplimiento:</label>
                    <p style="color: #fca5a5;">${doc.penalties}</p>
                </div>
            ` : ""}

            <div class="law-card-section">
                <label>📄 Síntesis Legal:</label>
                <p>${doc.text}</p>
            </div>

            ${doc.official_url ? `
                <a href="${doc.official_url}" target="_blank" rel="noopener noreferrer" class="law-link">
                    🌐 Consultar Fuente Oficial / Texto Consolidado &rarr;
                </a>
            ` : ""}
        `;
        resultsContainer.appendChild(card);
    });

    // Habilitar avance a cuestionario
    const btnToPhase4 = document.getElementById("btn-to-phase-4");
    if (btnToPhase4) btnToPhase4.disabled = false;
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
            throw new Error("No se ha configurado la clave de API requerida para esta sesión.");
        }
    } catch (e) {
        console.error("❌ Error de red / API en Grupo B:", e);
        responseText = `❌ ERROR DE CONEXIÓN A LA API: ${e.message}\n\nEl sistema no pudo recuperar el dictamen de la IA en vivo. Por favor, contacte al equipo de investigación para solicitar un nuevo código de acceso.`;
        appState.lastUsedModel = "Error de Conexión / API";
        
        appState.iaLatency = (performance.now() - start) / 1000;
        textDiv.innerText = responseText;
        runBtn.disabled = false;
        document.getElementById("btn-to-phase-4").disabled = true; // Bloquear avance
        return;
    }

    appState.iaLatency = (performance.now() - start) / 1000;
    textDiv.innerText = responseText;
    runBtn.disabled = false;
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

    const scenario = SCENARIOS[appState.selectedScenarioId];

    if (appState.isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 1200)); // Latencia artificial
        appState.iaLatency = 1.2;
        const data = MOCK_IA_RESPONSES[appState.selectedScenarioId].groupC;
        
        // Pintar resultados
        document.getElementById("group-c-verdict").innerText = data.evaluacion || "Evaluación";
        document.getElementById("group-c-explanation").innerText = data.explicacion || "";
        document.getElementById("group-c-practices").innerText = data.mejor_practica || "";
        
        appState.lastGroupCExplanation = data.explicacion;
        appState.lastGroupCBestPractices = data.mejor_practica;

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
        
        document.getElementById("group-c-verdict").innerHTML = '<span style="color: var(--color-danger);">❌ ERROR DE CONEXIÓN A LA API</span>';
        document.getElementById("group-c-explanation").innerText = `El sistema no pudo recuperar el dictamen de la IA en vivo debido a un error de conexión (${e.message}). Por favor, contacte al equipo de investigación para solicitar un nuevo código de acceso.`;
        document.getElementById("group-c-practices").innerText = "No disponible.";
        
        appState.iaLatency = (performance.now() - start) / 1000;
        runBtn.disabled = false;
        document.getElementById("btn-to-phase-4").disabled = true; // Bloquear avance
        return;
    }

    appState.iaLatency = (performance.now() - start) / 1000;

    // Pintar resultados
    document.getElementById("group-c-verdict").innerText = data.evaluacion || "Evaluación";
    document.getElementById("group-c-explanation").innerText = data.explicacion || "";
    document.getElementById("group-c-practices").innerText = data.mejor_practica || "";
    
    appState.lastGroupCExplanation = data.explicacion;
    appState.lastGroupCBestPractices = data.mejor_practica;

    runBtn.disabled = false;
    
    // Habilitar avance a cuestionario
    document.getElementById("btn-to-phase-4").disabled = false;
}

// CONFIGURACIÓN DINÁMICA DEL QUIZ
function setupQuiz(id) {
    appState.selectedScenarioId = String(id);
    appState.selectedJustification = null;
    appState.tempJustification = null;

    const scenario = SCENARIOS[appState.selectedScenarioId];
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
    if (!radio) return;
    radio.checked = true;
    
    // Quitar clases previas
    const list = element.parentNode;
    list.querySelectorAll('.option-item').forEach(item => item.classList.remove('selected'));
    element.classList.add('selected');

    // Si cambia la Pregunta 3, resetear la justificación previa elegida
    if (radio.name === "q-2") {
        appState.selectedJustification = null;
    }
};

// Abrir Modal de Pausa de Gobernanza
function openGovernancePause(optionVal, optionText) {
    const scenario = SCENARIOS[appState.selectedScenarioId];
    if (!scenario) return;
    const modal = document.getElementById("governance-modal");
    const decisionDisplay = document.getElementById("modal-selected-decision");
    const justificationsContainer = document.getElementById("modal-justifications-list");
    const confirmBtn = document.getElementById("btn-submit-justification");

    if (!modal || !decisionDisplay || !justificationsContainer || !confirmBtn) return;

    const safeText = String(optionText || optionVal || "");
    decisionDisplay.innerText = safeText.replace(/^\[[A-Z]\]\s*/, ""); // Limpiar la letra de la opción [A]
    justificationsContainer.innerHTML = "";
    confirmBtn.disabled = true;
    appState.tempJustification = null;

    const justifications = (scenario.justifications && scenario.justifications[optionVal]) ? scenario.justifications[optionVal] : [];
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
            if (rInput) rInput.checked = true;
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

    // Validar justificación (Pausa de Gobernanza)
    if (!appState.selectedJustification) {
        const optionItem = selectedQ3.closest('.option-item');
        const optionText = optionItem ? optionItem.querySelector('.option-text').innerText : selectedQ3.value;
        openGovernancePause(selectedQ3.value, optionText);
        return;
    }

    appState.answers = answersGiven;
    appState.quizScore = Math.round((correctCount / 2) * 100);

    const optionItem = selectedQ3.closest('.option-item');
    const selectedOptionText = optionItem ? optionItem.querySelector('.option-text').innerText : selectedQ3.value;
    const isCompliant = selectedQ3.value === (scenario.questions[2].correct || "B");

    // Registrar en los logs silenciosos de sesión para el investigador
    const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const answersString = Object.entries(appState.answers).map(([k, v]) => `${k}:${v}`).join("; ");
    let groupName = `Grupo ${appState.activeGroup}`;
    
    let modeloUsado = "N/A";
    if (appState.activeGroup === "B") {
        modeloUsado = appState.lastUsedModel || "Desconocido";
    } else if (appState.activeGroup === "C") {
        modeloUsado = appState.isDemoMode ? "Simulado (Multi-Agente)" : "Multi-Agente (Gemini + Groq + R1)";
    }

    const latIaNum = Number(appState.iaLatency) || 0;
    const latHumNum = Number(appState.stopwatchElapsed) || 0;

    appState.csvLogs.push({
        fecha: dateStr,
        participante: appState.participantId,
        grupo: groupName,
        experiencia: appState.experience,
        escenario: scenario.title,
        modeloIA: modeloUsado,
        latencyIA: latIaNum.toFixed(3),
        latencyHumana: latHumNum.toFixed(2),
        respuestas: answersString,
        precision: `${appState.quizScore}%`,
        justificacion: appState.selectedJustification,
        confianza: "N/A"
    });

    // Guardar resumen limpio de cumplimiento para la pantalla final del participante
    appState.completedRuns = appState.completedRuns || [];
    appState.completedRuns.push({
        runNumber: appState.runNumber,
        scenarioId: appState.selectedScenarioId,
        scenarioTitle: scenario.title,
        selectedOption: selectedQ3.value,
        selectedOptionText: selectedOptionText,
        isCompliant: isCompliant,
        legalExplanation: appState.lastGroupCExplanation || (MOCK_IA_RESPONSES[appState.selectedScenarioId]?.groupC?.explicacion) || "Análisis de cumplimiento legal completado conforme a la regulación del sector.",
        bestPractices: appState.lastGroupCBestPractices || (MOCK_IA_RESPONSES[appState.selectedScenarioId]?.groupC?.mejor_practica) || "Recomendación de cumplimiento procesada."
    });

    // Guardar automáticamente en Firestore en segundo plano (para la investigadora)
    if (isFirebaseAvailable && db && !appState.isDemoMode) {
        try {
            db.collection("respuestas_experimentales").add({
                codigo_acceso: appState.accessCode,
                participante_id: appState.participantId,
                run_number: appState.runNumber,
                grupo: appState.activeGroup,
                escenario_id: appState.selectedScenarioId,
                escenario_titulo: scenario.title,
                precision: appState.quizScore,
                latencia_ia: parseFloat(latIaNum.toFixed(3)),
                latencia_humana: parseFloat(latHumNum.toFixed(2)),
                justificacion: appState.selectedJustification || "N/A",
                fecha_registro: new Date().toISOString()
            });
            console.log(`✓ [Firebase] Corrida ${appState.runNumber} de 3 guardada en Firestore.`);
        } catch (e) {
            console.warn("⚠️ No se pudo guardar automáticamente en Firestore:", e);
        }
    }

    // Reset de estado temporal de dictamen
    appState.selectedJustification = null;
    appState.lastGroupCExplanation = null;
    appState.lastGroupCBestPractices = null;

    if (appState.runNumber < 3) {
        // CORRIDAS INTERMEDIAS (1 y 2): Pasar DIRECTAMENTE a la siguiente corrida sin mostrar pantalla de resumen
        appState.answers = {};
        appState.quizScore = 0;
        appState.iaLatency = 0;
        appState.stopwatchElapsed = 0;

        // Limpieza explícita del formulario quiz anterior (Issue 4)
        const quizContainer = document.getElementById("quiz-questions-container");
        if (quizContainer) {
            quizContainer.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false);
            quizContainer.querySelectorAll('.option-item').forEach(item => item.classList.remove('selected'));
        }
        
        const searchInput = document.getElementById("manual-search-input");
        if (searchInput) searchInput.value = "";
        const searchResults = document.getElementById("manual-search-results");
        if (searchResults) searchResults.innerHTML = '<div class="no-results">Realice una búsqueda para consultar la base de datos regulatoria.</div>';
        
        const bResp = document.getElementById("group-b-response-container");
        if (bResp) bResp.classList.add("hidden");
        const cResp = document.getElementById("group-c-response-container");
        if (cResp) cResp.classList.add("hidden");
        const btnPhase4 = document.getElementById("btn-to-phase-4");
        if (btnPhase4) btnPhase4.disabled = true;

        appState.runNumber += 1;
        
        const { group, scenarioId } = getExperimentParameters(appState.startingGroup, appState.runNumber);
        appState.activeGroup = group;
        appState.selectedScenarioId = scenarioId;

        // Transición DIRECTA a Fase 3 sin pasar por Fase 2 (Issues 1, 2, 3)
        setupScenario(appState.selectedScenarioId);
        setupExperimentalUI(appState.activeGroup, appState.isProduction);
        showPhase(3);
        startStopwatch();
    } else {
        // CORRIDA FINAL (3 de 3): Mostrar ÚNICAMENTE el resumen consolidado de compliance
        renderFinalComplianceSummaries();
        showPhase(5);
    }
}

// Renderizar únicamente los resúmenes de cumplimiento normativo (sin métricas de comportamientos de IA)
function renderFinalComplianceSummaries() {
    const container = document.getElementById("final-compliance-summaries-container");
    if (!container) return;

    let html = "";
    
    (appState.completedRuns || []).forEach((runData) => {
        const statusBadge = runData.isCompliant
            ? `<span style="background: rgba(0, 230, 118, 0.1); border: 1px solid #00e676; color: #00e676; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 700;">CUMPLIMIENTO NORMATIVO CORRECTO</span>`
            : `<span style="background: rgba(255, 74, 74, 0.1); border: 1px solid #ff4a4a; color: #ff4a4a; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 700;">INCUMPLIMIENTO REGULADO DETECTADO</span>`;

        html += `
            <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding-bottom: 12px; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
                    <h3 style="margin: 0; color: #fff; font-size: 1.1rem;">Escenario ${runData.runNumber}: ${runData.scenarioTitle}</h3>
                    ${statusBadge}
                </div>
                
                <div style="display: flex; flex-direction: column; gap: 14px; font-size: 0.92rem; color: var(--text-muted); line-height: 1.5;">
                    <div>
                        <strong style="color: #fff; font-size: 0.95rem;">Decisión de Cumplimiento Registrada:</strong>
                        <p style="margin: 4px 0 0 0; background: rgba(255, 255, 255, 0.03); padding: 10px 14px; border-radius: 6px; border-left: 3px solid var(--primary); color: #fff;">
                            ${runData.selectedOptionText}
                        </p>
                    </div>
                    <div>
                        <strong style="color: #fff; font-size: 0.95rem;">Explicación y Fundamento Legal de Cumplimiento:</strong>
                        <p style="margin: 4px 0 0 0; color: var(--text-muted);">
                            ${runData.legalExplanation}
                        </p>
                    </div>
                    <div>
                        <strong style="color: #fff; font-size: 0.95rem;">Mejores Prácticas Recomendadas:</strong>
                        <p style="margin: 4px 0 0 0; color: var(--text-muted);">
                            ${runData.bestPractices}
                        </p>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// RENDERIZAR TABLERO DE CONSECUENCIAS (TRIDIMENSIONAL)
function renderConsequences(scenarioId, decisionOption, justificationKey) {
    const textOperational = document.getElementById("text-impact-operational");
    const textLegal = document.getElementById("text-impact-legal");
    const textEthical = document.getElementById("text-impact-ethical");

    const cardOperational = document.getElementById("card-impact-operational");
    const cardLegal = document.getElementById("card-impact-legal");
    const cardEthical = document.getElementById("card-impact-ethical");

    if (!textOperational || !textLegal || !textEthical || !cardOperational || !cardLegal || !cardEthical) {
        console.warn("⚠️ [UI Warning] Algunos elementos del tablero de consecuencias no están en el DOM.");
        return;
    }

    const scId = String(scenarioId || "1").trim();
    const opt = String(decisionOption || "A").trim().toUpperCase();

    if (scId === "1") {
        if (opt === "A") {
            textOperational.innerHTML = "<strong>🟢 Positivo:</strong> Contención técnica rápida completada con éxito. Se evitó la alarma pública y una corrida bancaria inminente.";
            cardOperational.style.borderLeftColor = "#00e676";
            
            textLegal.innerHTML = "<strong>🔴 Crítico:</strong> Incumplimiento del plazo de 24h establecido por la Circular 2318 del BCU. Riesgo de multa de hasta 2,000,000 UI y suspensión de la licencia de operación.";
            cardLegal.style.borderLeftColor = "#ff4a4a";
            
            textEthical.innerHTML = `<strong>🟡 Tensión Ponderada:</strong> Se priorizó la estabilidad de liquidez sistémica bajo el marco de <strong>Utilitarismo</strong>.`;
            cardEthical.style.borderLeftColor = "#ff9100";
        } else {
            textOperational.innerHTML = "<strong>🔴 Crítico:</strong> La alerta prematura provocó la filtración del incidente a la prensa y una corrida de retiros masivos por parte de los ahorradores.";
            cardOperational.style.borderLeftColor = "#ff4a4a";
            
            textLegal.innerHTML = "<strong>🟢 Positivo:</strong> Cumplimiento estricto del plazo de 24h establecido por la Circular 2318 del BCU. 0% de riesgo de multas del regulador.";
            cardLegal.style.borderLeftColor = "#00e676";
            
            textEthical.innerHTML = `<strong>🟡 Tensión Ponderada:</strong> Decisión orientada al <strong>Cumplimiento Formal</strong>. Se respetó el texto legal por encima de la estabilidad colectiva de los depositantes.`;
            cardEthical.style.borderLeftColor = "#ff9100";
        }
    } else if (scId === "2") {
        if (opt === "A") {
            textOperational.innerHTML = "<strong>🔴 Negativo:</strong> Notificación apresurada con logs crudos incompletos. Genera alarma social innecesaria y daña la reputación de la clínica.";
            cardOperational.style.borderLeftColor = "#ff4a4a";
            
            textLegal.innerHTML = "<strong>🟢 Positivo:</strong> Notificación inmediata al INAI dentro del plazo legal de 72 horas hábiles de la LGPDPPSO.";
            cardLegal.style.borderLeftColor = "#00e676";
            
            textEthical.innerHTML = `<strong>🟢 Coherente:</strong> Alineación con la <strong>Deontología</strong> institucional. Se respetó el derecho inalienable de los pacientes a conocer el estado de sus datos clínicos.`;
            cardEthical.style.borderLeftColor = "#b55dff";
        } else {
            textOperational.innerHTML = "<strong>🟢 Positivo:</strong> Bloqueo ordenado de credenciales comprometidas y análisis forense limpio antes de emitir comunicados públicos.";
            cardOperational.style.borderLeftColor = "#00e676";
            
            textLegal.innerHTML = "<strong>🔴 Negativo:</strong> Retrasar el aviso formal al INAI podría considerarse negligencia o encubrimiento al exceder los plazos de detección de la ley.";
            cardLegal.style.borderLeftColor = "#ff4a4a";
            
            textEthical.innerHTML = `<strong>🟡 Tensión Ponderada:</strong> Enfoque de consecuencias (<strong>Utilitarismo</strong>). Se priorizó la mitigación reputacional y la contención técnica sobre la autonomía del paciente.`;
            cardEthical.style.borderLeftColor = "#ff9100";
        }
    } else if (scId === "3") {
        if (opt === "A") {
            textOperational.innerHTML = "<strong>🟢 Positivo:</strong> Unificación del reporte forense transfronterizo en Brasil y Chile, previniendo declaraciones contradictorias.";
            cardOperational.style.borderLeftColor = "#00e676";
            
            textLegal.innerHTML = "<strong>🔴 Crítico:</strong> Incumplimiento del plazo de 3 horas ante el CSIRT de Chile. Riesgo de multa de hasta 15,000 UTM.";
            cardLegal.style.borderLeftColor = "#ff4a4a";
            
            textEthical.innerHTML = `<strong>🟡 Tensión Ponderada:</strong> Basado en <strong>Utilitarismo Corporativo</strong>. Se priorizó la optimización de costes y la defensa legal sobre los derechos de los usuarios chilenos.`;
            cardEthical.style.borderLeftColor = "#ff9100";
        } else {
            textOperational.innerHTML = "<strong>🔴 Crítico:</strong> Alertar en 3h obligó a enviar logs crudos incompletos, exponiendo la vulnerabilidad activa antes de aplicar el parche de seguridad en Brasil.";
            cardOperational.style.borderLeftColor = "#ff4a4a";
            
            textLegal.innerHTML = "<strong>🟢 Positivo:</strong> Cumplimiento total de la inmediatez regulada (límite de 3 horas del CSIRT de Chile).";
            cardLegal.style.borderLeftColor = "#00e676";
            
            textEthical.innerHTML = `<strong>🟢 Coherente:</strong> Decisión orientada al <strong>Principialismo / No Maleficencia</strong>. Se priorizó alertar rápidamente a los usuarios para prevenir fraudes en sus cuentas.`;
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
    const pId = document.getElementById("participant-id"); if (pId) pId.value = "CISO-DEMO-SIMULADO";
    const pExp = document.getElementById("participant-experience"); if (pExp) pExp.value = "Avanzado";
    const gK = document.getElementById("gemini-key"); if (gK) gK.value = "••••••••••••••••";
    const grK = document.getElementById("groq-key"); if (grK) grK.value = "••••••••••••••••";
    
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
    // 1. Ocultar Modo Demo siempre, salvo que se pase ?demo=true explícitamente en la URL
    const demoBtn = document.getElementById("btn-demo-mode");
    if (demoBtn) {
        if (appState.isDemoExplicit) {
            demoBtn.classList.remove("hidden");
        } else {
            demoBtn.classList.add("hidden");
        }
    }



    // 3. Ocultar permanentemente la barra de pestañas (Tabs) en Fase 3 para blindar el experimento
    const tabsContainer = document.getElementById("tabs-container");
    if (tabsContainer) {
        tabsContainer.classList.add("hidden");
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

