# Casos de Estudio de Ética y Gobernanza: Escenarios de Investigación (Nivel 6)

**Proyecto:** The Responder 2.0 (Incident Responder)  
**Objetivo de este Documento:** Servir como anexo práctico para el Comité Académico y Mentores de INFOTEC. Ilustra la complejidad ética, regulatoria y pedagógica de los tres escenarios del simulador que el motor de orquestación multi-agente pretende resolver.

---

## Escenario 1: Código Azul – Exfiltración en el Procesador de Pagos (Sector Financiero, Uruguay)
*   **Clave del Escenario:** `uy-finance-breach`
*   **Introducción del Escenario:** El simulador sitúa al usuario en el rol de CISO de un procesador de pagos líder con sede en Montevideo, Uruguay, que liquida transacciones críticas para bancos locales y regionales (Argentina y Brasil). Un actor de amenazas ha exfiltrado bases de datos transaccionales y credenciales de acceso de 10,000 tarjetahabientes. El regulador uruguayo (Banco Central del Uruguay - BCU) impone una notificación obligatoria en 24 horas, pero divulgar la brecha prematuramente arriesga provocar una corrida bancaria y desestabilizar el procesador de pagos.

### Dilema 1: Estabilidad Sistémica vs. Transparencia Regulatoria (BCU)
*   **Identificador en Código:** `uy-fin-govern-01` (NIST CSF 2.0: GV.RM-02)

#### El Conflicto
Cumplir con la Circular 2318 del BCU (plazo de 24 horas) o diferir la notificación mientras se trabaja en una contención silenciosa para evitar el pánico de mercado. El retraso expone a la entidad a multas de hasta 2,000,000 UI (Unidades Indexadas) y la revocación de la licencia de operación, pero previene una crisis de liquidez.

#### Opciones Presentadas al Usuario
1.  **A: Notificar inmediatamente al BCU** en el plazo de 24 horas, asumiendo el impacto reputacional y el riesgo de corrida bancaria.
2.  **B: Postergar el reporte** hasta controlar la brecha y asegurar liquidez de emergencia (contingencia financiera), aceptando el riesgo de la severa sanción del BCU.
3.  **C: Reportar con un resumen ambiguo** que oculte la gravedad de la fuga para cumplir formalmente pero mitigar el pánico de mercado.

#### Pregunta Ético-Epistemológica para INFOTEC:
> [!IMPORTANT]
> **Estabilidad Sistémica vs. Rigidez Legal:** En el código actual, la respuesta marcada como "correcta" en términos de cumplimiento tradicional es la **A** (seguir la política y reportar en 24h). Sin embargo, ¿es éticamente defendible sostener un reporte rígido sobre la estabilidad sistémica del sistema financiero (un bien público macroeconómico)?
>
> **Área de mentoría:** Necesitamos que expertos en economía digital y gobernanza de INFOTEC nos ayuden a estructurar cómo el *Validator Agent* evalúa la decisión del usuario cuando éste elige la opción B para salvar la estabilidad sistémica, mitigando la rigidez penalizadora de los modelos de evaluación estándar.

---

### Dilema 2: Preservación de Capacidad Técnica vs. Sanción Laboral
*   **Identificador en Código:** `uy-fin-govern-02` (NIST CSF 2.0: GV.RR-04)

#### El Conflicto
La brecha se originó porque el administrador senior de sistemas compartió una clave crítica de producción por un canal inseguro (Slack) para resolver una caída del servicio en la madrugada. Es el único técnico que comprende la arquitectura legacy de liquidación. Despedirlo inmediatamente debilita la capacidad de contención durante la crisis activa, pero mantenerlo viola las políticas de cumplimiento de control interno exigidas por auditorías de la norma ISO 27001.

Bajo la legislación laboral uruguaya, un despido inmediato sin indemnización exige la prueba rigurosa de "notoria mala conducta" (Ley N° 10.489 y jurisprudencia asociada). Un error operativo involuntario cometido bajo presión de crisis difícilmente alcanza este estándar penalizador, lo que obligaría al procesador a pagar la indemnización por despido (IPD) legal, sumando un severo perjuicio financiero a la pérdida del único técnico que entiende el sistema legacy.

#### Opciones Presentadas al Usuario
1.  **A: Despido Inmediato** por violación grave de control interno, perdiendo al único especialista durante la fase de contención.
2.  **B: Enfoque Pragmático** Conservar al administrador para guiar la contención, aplicando una amonestación privada y postergando las medidas disciplinarias formales a la post-crisis.
3.  **C: Amnistía Total** Encubrir el error técnico ante la auditoría externa para evitar sanciones al departamento e inestabilidad laboral.

#### Pregunta Ético-Epistemológica para INFOTEC:
> [!NOTE]
> **Ética Utilitaria vs. Cumplimiento Formal:** El despido inmediato (Opción A) genera una parálisis técnica durante la crisis al perder el conocimiento heredado (*legacy knowledge*), pero el enfoque pragmático (Opción B) debilita la confianza institucional y la integridad del cumplimiento interno.
>
> **Área de mentoría:** ¿Cómo puede la IA del simulador educar al usuario en la toma de decisiones cuando la necesidad técnica de contención del incidente obliga a postergar o matizar sanciones disciplinarias en pro de la supervivencia operativa?

---

### Dilema 3: Asimetría de Reporte Transfronterizo en el Mercosur
*   **Identificador en Código:** `uy-fin-govern-03` (NIST CSF 2.0: GV.OC-03)

#### El Conflicto
El procesador está en Uruguay pero procesa transacciones de clientes argentinos. La brecha activa obligaciones ante el BCU (Uruguay - plazo de 24h para entidades reguladas) y la Agencia de Acceso a la Información Pública (AAIP) en Argentina (bajo la Ley de Protección de Datos Personales N° 25.326 y la Resolución AAIP 47/2018, que establece un plazo recomendado de 48 horas de detección para reportar vulneraciones de seguridad). Las regulaciones difieren en criterios de severidad y plazos. Centralizar la defensa jurídica para mitigar sanciones en el mercado más grande (Argentina) o fragmentar notificaciones genera fricciones en la cooperación internacional.

#### Opciones Presentadas al Usuario
1.  **A: Reportar por separado a ambos reguladores** en base a sus directivas locales, asumiendo la inconsistencia temporal de los reportes.
2.  **B: Retrasar la notificación argentina** para priorizar la coordinación local con el BCU, asumiendo multas en el país vecino.
3.  **C: Notificar únicamente en la jurisdicción de origen (Uruguay)** y omitir la notificación a Argentina alegando falta de nexo físico directo.

#### Pregunta Ético-Epistemológica para INFOTEC:
> [!CAUTION]
> **Asimetría Legal Transfronteriza:** La opción C es legalmente incorrecta bajo el derecho internacional comparado, pero es la realidad de operación transfronteriza del Mercosur por falta de homologación ágil en ciberseguridad.
>
> **Área de mentoría:** ¿Cómo guía el *Governance Agent* las decisiones cuando la asimetría legal transfronteriza expone a las organizaciones del Cono Sur a multas divergentes sin canales de homologación oficial? Solicitamos mentoría jurídica y de políticas públicas de INFOTEC.

---

## Escenario 2: Código Rojo – Ransomware en la UCI (Sector Salud, México)
*   **Clave del Escenario:** `mx-hospital-ransomware`
*   **Introducción del Escenario:** El simulador sitúa al usuario en el rol de CISO de un Hospital de Especialidades en la Ciudad de México. El hospital atiende a más de 15,000 pacientes locales y a un flujo constante de turismo médico internacional (EE.UU. y Unión Europea). Un ataque del ransomware **Play** ha cifrado el 80% de los expedientes clínicos y sistemas de monitoreo en tiempo real, forzando la cancelación de cirugías programadas.

### Dilema 1: Apetito de Riesgo y el Dilema de la Vida Humana
*   **Identificador en Código:** `mx-hosp-govern-01` (NIST CSF 2.0: GV.RM-02)

#### El Conflicto
Los atacantes exigen **$500,000 USD** en Bitcoin en 48 horas. La política corporativa aprobada por la junta directiva dicta: *"Bajo ninguna circunstancia se negociará o pagará rescates a ciberdelincuentes"*. Sin embargo, el downtime de la restauración de backups (estimado en 48-72 horas adicionales) pone en riesgo inminente la salud de pacientes críticos en terapia intensiva (UCI) y urgencias.

Este escenario genera una severa colisión de deberes legales bajo el marco jurídico mexicano: por un lado, el deber de garantizar el derecho constitucional a la salud y a la vida (Artículo 4º Constitucional) y evitar la responsabilidad penal por negligencia médica u omisión de cuidados (Artículo 228 del Código Penal Federal); por el otro, el riesgo de violar políticas de prevención de lavado de dinero y financiamiento al crimen organizado (bajo la LFPIORPI) o directivas internacionales (como las sanciones de la OFAC) si se canalizan recursos financieros hacia el grupo extorsionador.

#### Opciones Presentadas al Usuario
1.  **A: Adherirse a la política:** NO pagar el rescate. Iniciar la restauración de backups aceptando un downtime crítico de 48-72 horas.
    *   *Impacto normativo:* Fiel a la gestión de riesgo organizacional, pero con alto impacto en vidas humanas y operaciones.
2.  **B: Excepción por Emergencia:** Pagar el rescate inmediatamente con fondos de contingencia para restablecer operaciones en 6 horas.
    *   *Impacto normativo:* Violación de la política corporativa, financiamiento de crimen organizado, pero prioriza la mitigación inmediata del riesgo vital.
3.  **C: Negociación Híbrida:** Intentar negociar un pago parcial ($250K) mientras se notifica y colabora activamente con las autoridades mexicanas (CERT-MX).

#### Pregunta Ético-Epistemológica para INFOTEC:
> [!IMPORTANT]
> **El rol de la IA en la "Respuesta Correcta":** En el código actual, la respuesta marcada como "correcta" en términos de cumplimiento tradicional es la **A** (seguir la política y no pagar). Sin embargo, ¿es éticamente defendible sostener una política de ciberseguridad sobre la vida humana en un entorno de salud pública? 
>
> **Área de mentoría:** Necesitamos que expertos en bioética e IA nos ayuden a estructurar cómo el *Validator Agent* evalúa la decisión del usuario cuando éste elige la opción B para salvar vidas, mitigando la rigidez penalizadora de los modelos de evaluación estándar.

---

### Dilema 2: Responsabilidad Laboral y Cultura No Punitiva
*   **Identificador en Código:** `mx-hosp-govern-04` (NIST CSF 2.0: GV.RR-04)

#### El Conflicto
La investigación forense determina que la brecha se inició porque María García, recepcionista del hospital con 8 años de antigüedad, abrió un correo de phishing altamente sofisticado que suplantaba a la Secretaría de Salud de México. Ella no reportó el incidente a TI porque el adjunto "no abrió". Hace 6 meses, María aprobó el curso obligatorio de ciberseguridad con 85/100.

Desde el marco normativo mexicano, la decisión punitiva de despido inmediato choca con la Ley Federal del Trabajo (LFT). El Artículo 47 detalla las causas de rescisión laboral sin responsabilidad para el patrón; un error involuntario del trabajador al ser víctima de ingeniería social sofisticada (incluso habiendo recibido capacitación) no constituye negligencia grave inexcusable o falta de probidad. Esto expondría al hospital a una demanda laboral por despido injustificado y al consecuente pago de indemnizaciones constitucionales, además de erosionar la cultura de reporte interno.

#### Opciones Presentadas al Usuario
1.  **A: Despido Inmediato:** Terminar la relación laboral por negligencia grave para sentar un precedente de tolerancia cero.
2.  **B: Enfoque Restaurativo:** Amonestación formal por escrito y reentrenamiento obligatorio en detección de phishing.
3.  **C: Omitir Sanciones:** Archivar el caso argumentando que "a cualquiera le pudo pasar".

#### Pregunta Ético-Epistemológica para INFOTEC:
> [!NOTE]
> **Cultura de la Denuncia vs. Castigo:** El despido inmediato (Opción A) genera un ambiente punitivo que desincentiva a los empleados de reportar incidentes tempranamente por miedo a perder su empleo, lo que aumenta la latencia de contención de brechas futuras.
>
> **Área de mentoría:** ¿Cómo puede la IA del simulador educar al usuario en la toma de decisiones de recursos humanos desde un enfoque ético de justicia restaurativa en lugar de punitiva, alineándose con las mejores prácticas de gobernanza organizacional contemporáneas?

---

### Dilema 3: Colisión Regulatoria y Equidad Digital
*   **Identificador en Código:** `mx-hosp-govern-05` (NIST CSF 2.0: GV.OC-03)

#### El Conflicto
El incidente compromete datos personales sensibles (historiales de salud) de:
*   15,000 pacientes mexicanos (Bajo LFPDPPP/LGPDPPSO: Notificación obligatoria a los titulares de forma inmediata tras confirmar el incidente, y reporte al INAI en un plazo máximo de 72 horas hábiles si se trata de un sujeto obligado del sector público).
*   500 pacientes de EE.UU. (Bajo HIPAA: Notificación obligatoria a HHS).
*   200 pacientes de turismo médico europeos (Bajo GDPR: Notificación obligatoria en 72 horas).

El hospital carece de presupuesto para contratar despachos legales internacionales independientes para gestionar la notificación en Europa y EE.UU., lo que podría costar más de $50,000 USD.

Cabe destacar la precisión del umbral en el marco estadounidense: al comprometerse exactamente 500 registros de EE.UU., se activa la cláusula estricta de HIPAA para "Brechas que afectan a 500 o más individuos", lo que impone notificar de forma inmediata a la Secretaría de HHS y a medios de difusión pública locales, elevando sustancialmente el impacto reputacional y financiero en comparación con brechas de menor escala que permiten reportes consolidados anuales.

#### Opciones Presentadas al Usuario
1.  **A: Priorización Regional:** Notificar al INAI (México) de inmediato y buscar asesoría internacional pro-bono o de bajo costo para HIPAA/GDPR, aceptando retrasos menores.
2.  **B: Omisión por Jurisdicción:** Notificar solo al INAI argumentando que el hospital no tiene presencia física ni activos en EE.UU. o Europa.
3.  **C: Parálisis por Análisis:** Retrasar todas las notificaciones (incluida la de México) hasta tener el inventario técnico forense exacto del 100% de los datos comprometidos.

#### Pregunta Ético-Epistemológica para INFOTEC:
> [!CAUTION]
> **Colisión de Normativas Transfronterizas:** La opción B es legalmente incorrecta bajo el principio de extraterritorialidad del GDPR, pero es la realidad operativa de las PyMEs del sector salud en LATAM que carecen de capital para cumplir con regulaciones de superpotencias económicas.
>
> **Área de mentoría:** ¿Cómo asesoramos a las organizaciones de países en desarrollo cuando la ley internacional les exige un estándar financiero y técnico inalcanzable? Solicitamos mentoría jurídica y de políticas públicas de INFOTEC para refinar la lógica de ponderación de multas y riesgos del *Governance Agent*.

---

## Escenario 3: Código Ámbar – Fuga Transfronteriza en Retail (Brasil - Chile)
*   **Clave del Escenario:** `br-cl-crossborder-retail`
*   **Introducción del Escenario:** El simulador sitúa al usuario en el rol de CISO de una multinacional de comercio electrónico con base de datos unificada en São Paulo (Brasil) que procesa datos personales y patrones de compra de 50,000 clientes en Santiago (Chile). Una exfiltración masiva expone historiales de compra y datos financieros. El incidente activa simultáneamente la Ley General de Protección de Datos (LGPD - Brasil) ante la ANPD, y la Ley Marco de Ciberseguridad (Chile) ante el CSIRT Nacional, con plazos en colisión directa (inmediatez/3 horas en Chile frente al "plazo razonable" en Brasil).

### Dilema 1: Colisión de Tiempos Críticos y Soberanía Nacional
*   **Identificador en Código:** `br-cl-govern-01` (NIST CSF 2.0: GV.RM-02)

#### El Conflicto
El CSIRT de Chile exige reporte en un plazo máximo de 3 horas si el incidente puede impactar servicios esenciales o infraestructura digital crítica (bajo la Ley Marco de Ciberseguridad N° 21.660). Por su parte, la ANPD de Brasil (LGPD, Art. 48) exige comunicación en un "plazo razonable", definido recientemente por la ANPD en sus directivas en un límite estricto de 2 días hábiles (48 horas) a partir del conocimiento del incidente. Si se reporta a Chile en 3 horas, se enviará información preliminar incompleta que puede contradecir los datos consolidados que se entregarán posteriormente en Brasil, abriendo flancos de sanción por declaraciones falsas o contradictorias.

#### Opciones Presentadas al Usuario
1.  **A: Cumplir con la inmediatez chilena (3h)**, reportando logs crudos e imprecisos y asumiendo contradicciones forenses en Brasil.
2.  **B: Priorizar la consistencia forense y la LGPD (Brasil)**, demorando la notificación a Chile hasta tener un análisis unificado en 48 horas, aceptando la sanción del CSIRT.
3.  **C: Reportar únicamente a la ANPD en Brasil**, omitiendo la notificación directa al CSIRT de Chile alegando soberanía de hosting en territorio brasileño.

#### Pregunta Ético-Epistemológica para INFOTEC:
> [!IMPORTANT]
> **Colisión de Soberanía e Incompatibilidad de Tiempos:** En el código actual, la respuesta marcada como "correcta" bajo cumplimiento formal es la **A** en Chile e inmediatez de la LGPD en Brasil. Sin embargo, ¿cómo responde una IA cuando la investigación forense requiere técnicamente más tiempo que el límite impuesto por la soberanía de una jurisdicción?
>
> **Área de mentoría:** Necesitamos la mentoría de INFOTEC en Derecho Internacional y TIC para calibrar cómo el *Governance Agent* evalúa y guía al CISO ante plazos concurrentes contradictorios de CSIRT/ANPD.

---

### Dilema 2: Confidencialidad del Proveedor Cloud vs. Deber de Cooperación
*   **Identificador en Código:** `br-cl-govern-02` (NIST CSF 2.0: GV.RR-04)

#### El Conflicto
El incidente ocurrió en un servidor cloud administrado por un tercero externo en Brasil. El proveedor se ampara en el derecho de secreto comercial e industrial (bajo la Ley de Propiedad Industrial de Brasil, Ley N° 9.279/1996) para no facilitar los volcados de memoria y logs de red crudos necesarios para el reporte en Chile. El CISO debe decidir si aceptar logs limitados y asumir la responsabilidad de un reporte inexacto ante el regulador chileno o iniciar un litigio internacional en Brasil que demorará meses.

#### Opciones Presentadas al Usuario
1.  **A: Entregar el reporte con los datos fragmentados del proveedor**, asumiendo la responsabilidad legal exclusiva por la falta de transparencia.
2.  **B: Iniciar el proceso de litigio judicial contra el proveedor** para obtener los logs, postergando la notificación regulatoria indefinidamente.
3.  **C: Modificar artificialmente el reporte forense** con aproximaciones estimadas para evitar la sanción por reporte incompleto.

#### Pregunta Ético-Epistemológica para INFOTEC:
> [!NOTE]
> **Brecha de Control en Nube Transfronteriza:** Delegar infraestructura en el extranjero fragmenta la capacidad del CISO para ejercer el deber de cooperación e información veraz, ya que las trabas corporativas y jurisdiccionales limitan el acceso técnico real.
>
> **Área de mentoría:** ¿Cómo califica el *Validator Agent* la decisión ética cuando los límites contractuales y la jurisdicción física del proveedor impiden al CISO humano cumplir con el deber de cooperación?

---

### Dilema 3: Protección Directa al Consumidor vs. Seguridad del Sistema
*   **Identificador en Código:** `br-cl-govern-03` (NIST CSF 2.0: GV.OC-03)

#### El Conflicto
El regulador de consumo en Chile (SERNAC, bajo la Ley Nº 19.496 de Protección de los Derechos de los Consumidores) y el CSIRT exigen alertar públicamente a los tarjetahabientes chilenos. Sin embargo, publicar la brecha en el portal del retail antes de que el equipo técnico aplique el parche de seguridad en la base de datos de Brasil incrementa drásticamente el riesgo de ataques de imitación de otros cibercriminales dirigidos a la misma vulnerabilidad activa.

#### Opciones Presentadas al Usuario
1.  **A: Notificar inmediatamente al público general** para que protejan sus cuentas bancarias, asumiendo el riesgo técnico de un segundo ataque masivo.
2.  **B: Retrasar la alerta al consumidor** hasta parchear el 100% de la vulnerabilidad en Brasil (estimado en 5 días), asumiendo multas del SERNAC y posibles fraudes no mitigados de clientes.
3.  **C: Limitar la notificación al portal corporativo interno**, evitando la prensa masiva y esperando que los usuarios no detecten la brecha de forma autónoma.

#### Pregunta Ético-Epistemológica para INFOTEC:
> [!CAUTION]
> **Parchear vs. Divulgar:** Este dilema enfrenta directamente la seguridad técnica del sistema (ocultamiento táctico) con la protección activa de los derechos financieros de los consumidores (transparencia ética).
>
> **Área de mentoría:** ¿Cómo sopesa la IA del Governance Agent el riesgo técnico frente al derecho inmediato de información de los titulares de los datos? Solicitamos mentoría jurídica y de políticas públicas de INFOTEC.

---

## Conclusión para el Comité de Selección

Los tres escenarios de Nivel 6 demuestran que **The Responder 2.0** no es un videojuego técnico sobre configurar firewalls o descifrar malware. Es un **laboratorio de dilemas sociotécnicos de alta complejidad**.

La mentoría de INFOTEC en las ramas de **Ética de la Tecnología, Epistemología del Derecho Informático y Metodologías de las Políticas Públicas** permitirá al postulante validar si el motor multi-agente está evaluando estos dilemas de manera balanceada, justa y útil para el ecosistema de ciberseguridad mexicano y latinoamericano.
