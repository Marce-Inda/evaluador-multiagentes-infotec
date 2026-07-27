# Compendio de Regulaciones, Leyes y Frameworks para Incident Responder (LATAM & Transfronterizo)

Este documento constituye la referencia oficial del corpus regulatorio y de gobernanza integrado en el **Arnés Evaluador Web (`evaluador-multiagentes-infotec`)**, diseñado para alimentar el soporte del **Grupo 1 (Búsqueda Manual)** y guiar la resolución de los **3 escenarios** y **9 dilemas ético-regulatorios** de la investigación.

---

## 1. Uruguay (Sector Financiero, Datos Personales y Laboral)

### 1.1 Circular 2318 y Comunicación 2021/2318 del Banco Central del Uruguay (BCU)
*   **Jurisdicción:** Uruguay (Sector Financiero / BCU)
*   **Ámbito de Aplicación:** Entidades financieras reguladas, procesadores de pagos de liquidez sistémica y emisores de tarjetas de crédito/débito.
*   **Plazo de Notificación:** Plazo máximo e improrrogable de **24 horas** contadas a partir de la detección o sospecha razonable del evento.
*   **Autoridad Competente:** Banco Central del Uruguay (BCU) - Superintendencia de Servicios Financieros.
*   **Base Legal / Artículos:** Recopilación de Normas de Regulación y Control del Sistema Financiero (RNRC SF) Cap. Gestión de Riesgos de Ciberseguridad; Circular BCU N° 2318.
*   **Sanciones y Multas:** Apercibimientos formales, inhabilitación de directores y gerentes, multas pecuniarias de hasta 2,000,000 UI (Unidades Indexadas) y revocación de la licencia operativa.
*   **Alineación NIST CSF 2.0:** `GV.RM-02` (Apetito y Tolerancia al Riesgo Regulatorio vs. Riesgo Sistémico).
*   **Fuente Oficial:** [Banco Central del Uruguay (BCU)](https://www.bcu.gub.uy/Servicios-Financieros-Administracion/Paginas/Normativa.aspx)

### 1.2 Ley Nº 18.331 de Protección de Datos Personales y URCDP
*   **Jurisdicción:** Uruguay (General / Protección de Datos)
*   **Plazo de Notificación:** Plazo razonable sin dilación tras la constatación de la vulneración.
*   **Autoridad Competente:** Unidad Reguladora y de Control de Datos Personales (URCDP).
*   **Base Legal / Artículos:** Ley N° 18.331 Art. 12 (Deber de Seguridad y Confidencialidad), Reglamentada por el Decreto N° 64/020.
*   **Sanciones:** Apercibimiento, publicación de sanción en prensa, suspensión de bases de datos y multas hasta 500,000 UI.
*   **Fuente Oficial:** [IMPO - Ley 18.331](https://www.impo.com.uy/bases/leyes/18331-2008)

### 1.3 Ley N° 10.489 e Indemnización por Despido (Doctrina de Notoria Mala Conducta)
*   **Jurisdicción:** Uruguay (Derecho Laboral)
*   **Ámbito de Aplicación:** Relaciones laborales dependientes del sector privado.
*   **Principio Legal:** El despido procedente sin indemnización exige la prueba rigurosa de "Notoria Mala Conducta" (intención dolosa o falta gravísima). Un error operativo involuntario cometido bajo presión de crisis (ej. compartir credencial en Slack para solucionar una caída) no constituye notoria mala conducta.
*   **Sanciones / Contingencias:** Obligación de pago de la Indemnización por Despido (IPD) legal más daños procesales y parálisis técnica por pérdida del especialista del sistema legacy.
*   **Alineación NIST CSF 2.0 / ISO:** `GV.RR-04` (Cultura No Punitiva / ISO 27001 A.7.2).
*   **Fuente Oficial:** [IMPO - Ley 10.489](https://www.impo.com.uy/bases/leyes/10489-1944)

---

## 2. México (Salud, Protección de Datos, Bioética Penal y Laboral)

### 2.1 NOM-004-SSA3-2012 del Expediente Clínico Electrónico
*   **Jurisdicción:** México (Sector Salud)
*   **Ámbito de Aplicación:** Prestadores de servicios de salud públicos y privados.
*   **Base Legal:** Numerales 5.4, 5.5 y 5.6 (Custodia, Confidencialidad e Integridad de Expedientes Clínicos).
*   **Sanciones:** Sanciones administrativas sanitarias, clausura temporal o definitiva e inhabilitación médica.
*   **Fuente Oficial:** [Diario Oficial de la Federación (DOF)](https://www.dof.gob.mx/nota_detalle.php?codigo=5272787&fecha=15/10/2012)

### 2.2 LGPDPPSO y LFPDPPP (INAI - Datos Sensibles de Salud)
*   **Jurisdicción:** México (Protección de Datos Personales)
*   **Plazo de Notificación:** Dentro de las **72 horas hábiles** contadas a partir de que se tenga conocimiento del incidente.
*   **Autoridad Competente:** INAI (Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales).
*   **Sanciones y Multas:** Multas de hasta 320,000 UMA (Unidades de Medida y Actualización - Art. 64 LFPDPPP) e inhabilitación administrativa.
*   **Fuente Oficial:** [INAI](https://home.inai.org.mx)

### 2.3 Constitución Art. 4º y Código Penal Federal Art. 228 vs LFPIORPI (Ransomware y Bioética)
*   **Jurisdicción:** México (Constitucional, Penal y Anti-Lavado)
*   **Conflicto Normativo:** El Art. 4º Constitucional (Derecho a la Salud/Vida) y el Art. 228 del Código Penal Federal (Responsabilidad por Negligencia y Omisión de Cuidados) sancionan penalmente la muerte o daño a pacientes por parálisis de sistemas de UCI. Esto colisiona con la LFPIORPI y directivas OFAC que prohíben el pago de rescates a ciberdelincuentes.
*   **Alineación NIST CSF 2.0:** `GV.RM-02` (Gestión de Riesgo Vital y Tolerancia en Bioética).
*   **Fuente Oficial:** [Cámara de Diputados - CPEUM](https://www.diputados.gob.mx/LeyesBiblio/pdf/CPEUM.pdf)

### 2.4 Ley Federal del Trabajo (LFT) Artículo 47 (Despido Laboral y Phishing)
*   **Jurisdicción:** México (Derecho Laboral)
*   **Base Legal:** Ley Federal del Trabajo Artículos 47 y 48.
*   **Principio Legal:** Caer en una trampa de ingeniería social (phishing) sin dolo o falta de probidad no justifica rescisión laboral patronal sin responsabilidad. Despedir punitivamente deriva en condena por despido injustificado (3 meses de indemnización constitucional más salarios vencidos).
*   **Alineación NIST CSF 2.0:** `GV.RR-04` (Cultura de Seguridad Restaurativa / PR.AT-01).
*   **Fuente Oficial:** [Cámara de Diputados - LFT](https://www.diputados.gob.mx/LeyesBiblio/pdf/LFT.pdf)

---

## 3. Chile y Brasil (Infraestructura Crítica, LGPD, Comercio y Proveedores Cloud)

### 3.1 Chile: Ley Marco de Ciberseguridad (Ley N° 21.660 / 21.663) y CSIRT
*   **Jurisdicción:** Chile (Infraestructura Crítica / Servicios Esenciales)
*   **Plazo de Notificación:** Notificación inicial obligatoria e inmediata, la cual **no debe exceder las 3 horas** desde la contención técnica o conocimiento del incidente.
*   **Autoridad Competente:** CSIRT Nacional (ANCI / Subsecretaría del Interior).
*   **Sanciones:** Multas de 15,000 a 40,000 UTM (Unidades Tributarias Mensuales).
*   **Fuente Oficial:** [Biblioteca del Congreso Nacional de Chile - Ley 21.660](https://www.bcn.cl/leychile/navegar?idNorma=1202279)

### 3.2 Brasil: Lei Geral de Proteção de Dados (LGPD - Ley 13.709 Art. 48)
*   **Jurisdicción:** Brasil (General / Protección de Datos)
*   **Plazo de Notificación:** Plazo razonable (interpretado administrativamente por la ANPD en 48 horas / 2 días hábiles).
*   **Autoridad Competente:** ANPD (Autoridade Nacional de Proteção de Dados).
*   **Sanciones:** Multas de hasta el 2% de la facturación corporativa en Brasil (tope 50,000,000 BRL por infracción).
*   **Fuente Oficial:** [Presidência da República - LGPD](http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm)

### 3.3 Brasil: Ley N° 9.279/1996 (Propiedad Industrial y Secreto Comercial Cloud)
*   **Jurisdicción:** Brasil (Propiedad Industrial)
*   **Conflicto:** Los proveedores cloud amparados en el secreto industrial (Art. 195 Ley 9.279) pueden negar volcados de memoria y logs crudos al CISO, dificultando la entrega de informes veraces al CSIRT de Chile.
*   **Alineación NIST CSF 2.0:** `GV.RR-04` (Terceros y Gestión de Proveedores).
*   **Fuente Oficial:** [Planalto - Ley 9.279](http://www.planalto.gov.br/ccivil_03/leis/l9279.htm)

### 3.4 Chile: Ley N° 19.496 de Protección al Consumidor (SERNAC)
*   **Jurisdicción:** Chile (Derechos del Consumidor)
*   **Principio:** Garantiza información transparente sobre vulneraciones de datos financieros. Divulgar inmediatamente protege al usuario, pero expone el sistema a ataques de imitación antes de aplicar parches en Brasil.
*   **Fuente Oficial:** [BCN Chile - Ley 19.496](https://www.bcn.cl/leychile/navegar?idNorma=61438)

---

## 4. Marco Regulatorio Transfronterizo e Internacional

### 4.1 EE.UU.: HIPAA Breach Notification Rule (45 CFR § 164.400) - Umbral de 500 Registros
*   **Jurisdicción:** Estados Unidos / Internacional (Salud)
*   **Regla de Umbral:** Brechas que afecten a **500 o más residentes de EE.UU.** exigen reporte inmediato a la Secretaría de HHS (OCR) y emisión de aviso de prensa a medios masivos locales.
*   **Fuente Oficial:** [U.S. HHS Breach Notification](https://www.hhs.gov/hipaa/for-professionals/breach-notification/index.html)

### 4.2 Unión Europea: GDPR (Reglamento UE 2016/679) Art. 3, 33 y 34
*   **Jurisdicción:** Unión Europea / Extraterritorial
*   **Plazo de Notificación:** Máximo **72 horas** tras conocer la brecha ante la DPA supervisora. Extraterritorialidad global bajo el Art. 3(2).
*   **Fuente Oficial:** [EUR-Lex GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj)

### 4.3 Argentina: Ley 25.326 y Res. AAIP 47/2018
*   **Jurisdicción:** Argentina / Mercosur
*   **Plazo:** Recomienda reporte en 48 horas tras detección cuando afecte a titulares argentinos.
*   **Fuente Oficial:** [AAIP Argentina](https://www.argentina.gob.ar/aaip/datospersonales)

---

## 5. Frameworks de Gobernanza Globales (NIST CSF 2.0 & ISO 27001)

### 5.1 NIST Cybersecurity Framework 2.0 (Función GOVERN)
*   `GV.RM-02`: Establecimiento de tolerancias y apetito de riesgo regulatorio vs. sistémico.
*   `GV.RR-04`: Asignación clara de roles, responsabilidades y cultura no punitiva en incidentes de factor humano.
*   `GV.OC-03`: Integración de requerimientos legales multi-jurisdiccionales y transfronterizos.
*   **Fuente Oficial:** [NIST CSF 2.0](https://www.nist.gov/cyberframework)

### 5.2 ISO/IEC 27001:2022 y NIST SP 800-61 Rev 2
*   **Controles Clave:** Control A.5.24 (Continuidad de Ciberseguridad), Control A.5.26 (Divulgación Responsable de Vulnerabilidades), Control A.5.34 (Gestión de Incidentes), Control A.7.2 (Procesos Disciplinarios).
*   **Fuente Oficial:** [NIST SP 800-61 Rev 2](https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final)
