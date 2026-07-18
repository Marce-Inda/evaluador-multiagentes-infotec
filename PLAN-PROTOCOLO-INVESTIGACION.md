# Protocolo de Investigación - Programa de Veraneo INFOTEC 2026

**Línea de Postulación:** Regulación de las Tecnologías de la Información y Comunicación  
**Programa de Veraneo:** Investigación y Tecnología 2026 (3ª Edición)  
**Presenta:** Marcela Rosana Inda  
**Supervisor Asignado:** Dr. Federico César Lefranc Weegan  
**Institución:** INFOTEC Centro de Investigación y Desarrollo Tecnológico  

---

## 1. Tema
**Orquestación Multi-Agente y RAG para la Auditoría Automatizada de Cumplimiento Regulatorio Transfronterizo en Incidentes de Ciberseguridad en Latinoamérica.**

---

## 2. Resumen
Latinoamérica presenta un ecosistema de ciberseguridad y protección de datos personales altamente fragmentado, en el que marcos como la LFPDPPP (México), la LGPD (Brasil), la Ley 19.628 y la nueva Ley Marco de Ciberseguridad (Chile), así como la Ley 18.331 y la Circular 2318 (Uruguay), establecen plazos de notificación, autoridades competentes y sanciones divergentes ante incidentes de seguridad. En un contexto de brechas transfronterizas, las organizaciones deben tomar decisiones bajo fuerte presión de tiempo, con riesgo de multas millonarias y afectaciones a derechos humanos, mientras que las herramientas actuales se concentran casi exclusivamente en la contención técnica (EDR/SIEM), descuidando la auditoría regulatoria inmediata.

Este protocolo propone evaluar una arquitectura de Inteligencia Artificial multi-agente basada en Retrieval-Augmented Generation (RAG) como motor de auditoría normativa para incidentes de ciberseguridad en cuatro jurisdicciones clave de Latinoamérica (México, Brasil, Chile y Uruguay). El estudio adopta un diseño cuasi-experimental intrasujeto de medidas repetidas, en el cual cada participante interactúa secuencialmente con tres brazos de soporte: la consulta manual de leyes, el uso de un LLM genérico en la nube, y el motor multi-agente propuesto con verificación de hashes criptográficos. Se registrarán de forma objetiva la precisión regulatoria, la tasa de alucinaciones legales y la latencia de decisión mediante un Arnés de Búsqueda Académico web. Se espera aportar un benchmark regulatorio reproducible para la región y evidencia empírica sobre la capacidad de este tipo de arquitecturas para ofrecer dictámenes más precisos, explicables y éticamente aceptables en escenarios de crisis transfronteriza.

---

## 3. Introducción
La acelerada digitalización de América Latina ha incrementado tanto la dependencia de infraestructuras tecnológicas críticas como la exposición a incidentes de ciberseguridad complejos, incluidos ataques de ransomware y brechas masivas de datos personales. Informes recientes del Banco Interamericano de Desarrollo (BID), la OEA y la CEPAL muestran que, pese a ciertos avances, la región mantiene importantes brechas de madurez en ciberseguridad, con una proporción de países que aún no cuentan con estrategias integrales ni con capacidades suficientes para responder a incidentes de manera coordinada. Esta situación se agrava en sectores sensibles como salud y servicios financieros, donde un incidente puede comprometer la continuidad operativa, la seguridad de las personas y la confidencialidad de grandes volúmenes de datos.

Paralelamente, en los últimos años se ha consolidado en la región un entramado normativo de protección de datos y ciberseguridad inspirado en estándares como el Reglamento General de Protección de Datos (GDPR), pero con desarrollos heterogéneos a nivel nacional. Marcos como la LFPDPPP en México, la LGPD en Brasil, la Ley 19.628 y la nueva Ley Marco de Ciberseguridad en Chile, así como la Ley 18.331 y regulaciones del Banco Central en Uruguay, establecen obligaciones específicas de seguridad, notificación de incidentes y cooperación con autoridades que difieren en plazos, alcances y sanciones. En escenarios de brechas transfronterizas, estas diferencias plantean desafíos prácticos considerables para los equipos de ciberseguridad y cumplimiento, que deben tomar decisiones bajo intensa presión de tiempo y con riesgo de incumplimientos simultáneos en varias jurisdicciones.

En este contexto, la irrupción de la Inteligencia Artificial generativa y de arquitecturas basadas en RAG (Retrieval-Augmented Generation) abre nuevas posibilidades para apoyar la interpretación de marcos normativos complejos. No obstante, el problema de las alucinaciones legales de los modelos de lenguaje y la necesidad de explicabilidad y confianza limitan su adopción segura en dominios de alta responsabilidad. El presente protocolo aborda este cruce entre ciberseguridad, derecho y tecnologías de IA, proponiendo la evaluación de un motor multi-agente basado en RAG para auditoría de cumplimiento en incidentes transfronterizos en Latinoamérica.

---

## 4. Antecedentes
Diversos estudios y reportes especializados han documentado que América Latina y el Caribe se han convertido en una de las regiones de más rápido crecimiento en incidentes cibernéticos reportados. Informes de organismos como la CEPAL y el BID señalan que solo una fracción de las instituciones cumple con un porcentaje suficiente de controles de seguridad, mientras que gran parte de los países carece aún de planes robustos de protección de infraestructuras críticas y de capacidades sistemáticas de respuesta. Estos diagnósticos coinciden en subrayar la necesidad de fortalecer tanto los marcos normativos como las capacidades técnicas y humanas para incrementar la resiliencia digital regional.

En paralelo, la literatura sobre protección de datos describe un proceso de convergencia gradual hacia estándares como el GDPR de la Unión Europea, pero con velocidades y enfoques dispares. Mientras Uruguay destaca por su estatus de adecuación ante la Comisión Europea, Brasil opera bajo un modelo de supervisión proactiva mediante la ANPD, y Chile transiciona hacia un robusto modelo con la Ley Marco de Ciberseguridad. Esta diversidad normativa implica que una organización con operaciones distribuidas enfrenta un mosaico de obligaciones que deben cumplirse simultáneamente ante reguladores situados en diferentes países.

Por otro lado, la investigación en Inteligencia Artificial y Derecho ha explorado el uso de modelos de lenguaje de gran tamaño (LLMs) para la automatización del cumplimiento normativo. A pesar de su capacidad para sintetizar grandes volúmenes de texto, la presencia de alucinaciones legales —la invención de citas o de artículos de ley inexistentes— constituye la mayor barrera para su uso en producción. Para contrarrestar este fenómeno, las técnicas RAG y los sistemas multi-agente que integran roles de análisis, recuperación y validación cruzada representan el estado del arte actual, aunque su aplicación en marcos regulatorios fragmentados como los latinoamericanos aún carece de validación experimental empírica.

---

## 5. Planteamiento del Problema
A diferencia del mercado europeo unificado bajo el GDPR, Latinoamérica presenta un panorama regulatorio de privacidad y ciberseguridad altamente fragmentado. Las regulaciones nacionales (ej. LFPDPPP en México, LGPD en Brasil, Ley 19.628 y la nueva Ley Marco en Chile, Ley 18.331 y Circular 2318 en Uruguay) difieren sustancialmente en plazos de notificación (inmediatez, 24 horas, 72 horas), autoridades competentes y gravedad de las sanciones.

Cuando una organización con operaciones distribuidas en la región sufre una brecha de seguridad transfronteriza, la evaluación de cumplimiento normativo se realiza bajo extrema presión de tiempo. La toma de decisiones erróneas expone a las empresas a multas millonarias y violaciones de derechos humanos de los usuarios. Las herramientas actuales solo abordan la contención técnica (EDR/SIEM), descuidando la auditoría regulatoria inmediata. Existe la necesidad científica de validar cómo las tecnologías de Inteligencia Artificial Generativa y RAG pueden resolver "colisiones regulatorias transfronterizas" de forma confiable, explicable y libre de alucinaciones legales.

---

## 6. Pregunta de Investigación
¿En qué medida una arquitectura de Inteligencia Artificial multi-agente basada en RAG puede proporcionar dictámenes normativos más precisos, con menor tasa de alucinaciones legales, latencia de decisión aceptable y un apoyo más confiable y éticamente alineado que la consulta manual de leyes y que un LLM genérico, al guiar decisiones de cumplimiento regulatorio transfronterizo durante incidentes de ciberseguridad en cuatro jurisdicciones clave de Latinoamérica (México, Brasil, Chile y Uruguay)?

---

## 7. Justificación
El desarrollo de herramientas que asistan en la gobernanza y cumplimiento regulatorio es de vital importancia tanto para la seguridad nacional como para la soberanía digital en la región. La fragmentación actual de marcos legales en Latinoamérica no solo expone a las empresas a sanciones severas, sino que además ralentiza la respuesta oportuna ante incidentes críticos que pueden comprometer infraestructuras esenciales y derechos fundamentales. Evaluar empíricamente soluciones basadas en sistemas inteligentes de soporte a la decisión aporta evidencia cuantitativa que contribuye a la creación de metodologías de respuesta unificadas.

### Delimitación Geográfica del Estudio
Este estudio se centra en cuatro jurisdicciones clave de Latinoamérica: México, Brasil, Chile y Uruguay. Estos países fueron seleccionados por su relevancia económica y regulatoria en la región, así como por representar distintos grados de madurez normativa y modelos de protección de datos personales y ciberseguridad (por ejemplo, la adecuación de Uruguay ante la Unión Europea, el modelo LGPD en Brasil, el marco de la LFPDPPP en México y los procesos de reforma en Chile). El objetivo no es agotar todas las regulaciones latinoamericanas, sino construir un marco comparado profundo y metodológicamente riguroso que pueda ampliarse en futuras investigaciones a otras jurisdicciones de la región.

---

## 8. Objetivo General
Evaluar la precisión, confiabilidad y latencia de una arquitectura de Inteligencia Artificial multi-agente basada en RAG (Retrieval-Augmented Generation) para auditar y guiar decisiones de cumplimiento regulatorio transfronterizo en tiempo real durante incidentes de ciberseguridad en cuatro jurisdicciones clave de Latinoamérica (México, Brasil, Chile y Uruguay).

---

## 9. Objetivos Específicos
Para dar cumplimiento al objetivo general, se establecen los siguientes objetivos específicos:
*   **Diseñar e implementar un dataset de referencia (benchmark)** estructurado en vectores que mapee las normativas de ciberseguridad y privacidad de México, Brasil, Chile y Uruguay, orientado a la evaluación de algoritmos de auditoría regulatoria en incidentes de ciberseguridad transfronterizos.
*   **Medir la tasa de alucinaciones legales y la precisión regulatoria** de la arquitectura multi-agente utilizando validación cruzada y auditoría de agentes (orquestación Gemini + DeepSeek R1) en dilemas de crisis transfronterizas simuladas.
*   **Comparar la latencia de decisión y la exactitud del dictamen legal** obtenido por expertos humanos asistidos por distintos métodos de soporte (consulta manual de leyes, LLM genérico y motor multi-agente con RAG) frente al método de consulta manual tradicional.

---

## 10. Supuesto o Hipótesis

### Hipótesis General
*   **$H_1$ (general):** La arquitectura de Inteligencia Artificial multi-agente basada en RAG proporciona un apoyo significativamente mejor a la toma de decisiones de cumplimiento regulatorio transfronterizo que la consulta manual de leyes y que un LLM genérico, en términos de mayor precisión regulatoria, menor tasa de alucinaciones legales y latencia de decisión aceptable.
*   *Nota:* La hipótesis nula ($H_0$) establece que no existen diferencias significativas entre los tres métodos de soporte.

### Hipótesis Específicas
*   **$H_1a$ – Precisión regulatoria:** La precisión regulatoria promedio de los dictámenes emitidos con apoyo del motor multi-agente RAG será significativamente mayor que la precisión obtenida mediante consulta manual de leyes y mediante un LLM genérico en los mismos casos de crisis transfronteriza.
*   **$H_1b$ – Tasa de alucinaciones legales:** La tasa de alucinaciones legales (referencias normativas inexistentes o incorrectas) será significativamente menor en el motor multi-agente RAG que en el LLM genérico, y comparable o inferior a la consulta manual de leyes.
*   **$H_1c$ – Latencia de decisión:** La latencia de decisión para identificar el plazo de notificación y la autoridad competente será significativamente menor con el motor multi-agente RAG que con la consulta manual, y no será significativamente mayor que la latencia observada con un LLM genérico.
*   **$H_1d$ – Percepción de confiabilidad/ética:** La percepción de confiabilidad y alineación ética del apoyo recibido será significativamente más alta en el grupo que utiliza el motor multi-agente RAG que en el grupo que utiliza solo un LLM genérico, y comparable o superior al grupo de consulta manual.

---

## 11. Metodología y Diseño Experimental

El proyecto adopta un diseño cuasi-experimental intrasujeto de medidas repetidas para evaluar el desempeño de distintos métodos de soporte frente a casos simulados de incidentes transfronterizos. A diferencia de un diseño de grupos independientes, el diseño intrasujeto expone a cada participante de forma secuencial a las tres condiciones experimentales (Grupos A, B y C).

> [!IMPORTANT]
> **Justificación Metodológica de Escenarios Equivalentes pero Distintos (Contrabalanceo):**
> Para garantizar la validez interna del experimento, cada una de las tres condiciones experimentales se evalúa utilizando un escenario de incidente diferente (Uruguay, México, y Brasil/Chile). Si un participante evaluara el *mismo* escenario bajo las tres condiciones de soporte sucesivas, se produciría un **Efecto de Aprendizaje o Arrastre (Carryover Effect)**: el participante memorizaría las respuestas correctas de la primera corrida, reduciendo artificialmente la latencia y elevando la precisión al 100% en las corridas subsecuentes, independientemente del soporte de la IA. 
> 
> Para solucionar esto, el experimento emplea el principio de **contrabalanceo**: se diseñaron tres escenarios equivalentes en complejidad estructurada (cada uno consta de 3 preguntas referidas a plazos, autoridades y adecuación de cumplimiento) pero basados en marcos legales y respuestas fácticas completamente distintas. Así, cada participante completa tres ejecuciones consecutivas (ej. Corrida 1: Escenario 1 con Grupo A; Corrida 2: Escenario 2 con Grupo B; Corrida 3: Escenario 3 con Grupo C), registrando tres observaciones independientes libres de sesgo de repetición.

### Población y Muestra
La muestra objetivo estará constituida por $N = 30$ a $45$ participantes reclutados entre profesionales de ciberseguridad, derecho y estudiantes de posgrado afines a las TICs en INFOTEC. Al aplicar un diseño de medidas repetidas (donde cada sujeto evalúa los tres brazos experimentales), se generará un total de 90 a 135 observaciones cuantitativas independientes. Esto asegura la potencia estadística necesaria para llevar a cabo análisis paramétricos robustos.

### Procedimiento Experimental y Arnés Web
El experimento se ejecuta en una interfaz gráfica de usuario web estática (Web-App de Arnés Académico con `index.html` y `app.js`). La interfaz solicita el código de participante anónimo (ej. `CISO-4X8B`) y realiza el seguimiento de la sesión. El procedimiento consta de los siguientes tres brazos experimentales:

1.  **Grupo A (Búsqueda Manual):** El participante consulta leyes a través de un panel de búsqueda manual local que opera sobre el archivo estructurado [regulatory_corpus.json](file:///home/marce-i/Documentos/infotec/regulatory_corpus.json), simulando una consulta tradicional sin asistencia inteligente.
2.  **Grupo B (IA Estándar):** El participante realiza consultas directas y sin contexto (zero-shot) en la nube mediante **OpenRouter**. Con el fin de estudiar los sesgos geopolíticos y la injusticia epistémica algorítmica, el sistema realiza un balanceo geopolítico A/B asignando de forma aleatoria/equilibrada (50% Occidente y 50% Oriente) los modelos `meta-llama/llama-3.3-70b-instruct` y `deepseek/deepseek-v4-flash`, registrando el backend en los logs.
3.  **Grupo C (Motor Multi-Agente Avanzado):** El participante utiliza las recomendaciones generadas por el motor multi-agente de *The Responder 2.0* (FastAPI Core Backend) que incluye inyecciones contextuales RAG de ChromaDB y validación cruzada mediante DeepSeek R1 contra hashes SHA-256.

Durante la sesión, el arnés registra automáticamente las marcas de tiempo (timestamps) de forma invisible en segundo plano para mitigar el Efecto Hawthorne, calculando la latencia de decisión. El procedimiento implementa un **Modelo de Evaluación Tridimensional** estructurado en las siguientes fases:
*   **Fase de Inducción Contextual (Fase 3):** Se presenta el dilema y la *Cultura Ética Organizacional* del caso (el Acuerdo Previo).
*   **Fase de Cuestionario (Fase 4):** El participante responde a preguntas de conocimiento objetivo (Q1 y Q2, utilizadas para calcular la *Precisión Factual* $P_F$) y toma la decisión de cumplimiento (Q3). Al responder Q3, se dispara automáticamente la **Pausa de Gobernanza** (modal que interrumpe la interfaz y exige la selección obligatoria de un escudo argumentativo o justificación).
*   **Fase de Tablero de Consecuencias (Fase 5):** Reemplaza el éxito binario tradicional por un *Tablero de Consecuencias e Impactos* que detalla el impacto Operativo/Fáctico, Legal/Formal y Ético/Axiológico de la decisión del participante, mostrando la tensión filosófica en juego.

### Variables de Estudio

| Variable | Tipo | Definición Operativa | Escala / Medida |
| :--- | :--- | :--- | :--- |
| **Método de soporte** | Independiente | Condición asignada al participante: Grupo A (Manual), Grupo B (LLM Simple), Grupo C (Motor Multi-Agente RAG). | Nominal (A / B / C) |
| **Modelo de IA** | Control / Indep. | El modelo lingüístico utilizado para procesar la brecha (Occidente: Llama 3.3 / Oriente: DeepSeek V4 Flash). Registrado en la columna `Modelo_IA`. | Nominal (Llama / DeepSeek) |
| **Precisión fáctica ($P_F$)** | Dependiente | Porcentaje de aciertos al identificar plazos regulatorios y autoridades competentes en las preguntas objetivas Q1 y Q2. | Continua (0% / 50% / 100%) |
| **Tasa de alucinaciones** | Dependiente | Proporción de referencias normativas inexistentes, inventadas o incorrectas detectadas en el dictamen del participante. | Proporción (0.0 - 1.0) |
| **Latencia de decisión ($T_D$)** | Dependiente | Tiempo total en segundos transcurrido desde la presentación del caso hasta el envío del cuestionario definitivo (incluyendo la pausa de gobernanza). | Continua (Segundos) |
| **Tasa de infracción consciente ($I_C$)** | Dependiente | Frecuencia con la que el usuario decide desviarse de la norma formal con base en un escudo argumentativo válido. | Continua (0.0 - 1.0) |
| **Consistencia ético-organizacional ($C_{EO}$)** | Dependiente | Grado de alineación lógica entre la justificación seleccionada en la Pausa de Gobernanza y la cultura institucional asignada. | Continua (0.0 - 1.0) |
| **Confiabilidad percibida** | Dependiente (Subj.) | Puntuación obtenida mediante cuestionario breve de actitud/confianza en IA al final de la sesión. | Ordinal (Likert 1-5) |
| **Experiencia previa** | Control | Años de experiencia y nivel de formación declarada en derecho, cumplimiento o ciberseguridad. | Categorías ordinales |

### Plan de Análisis de Datos
Los datos de las sesiones se guardan de forma centralizada en `resultados_evaluacion.csv`. Dado que el experimento adopta un diseño cuasi-experimental intrasujeto de medidas repetidas (donde cada participante se evalúa bajo las tres condiciones sucesivas), las observaciones no son independientes sino que están correlacionadas. Por lo tanto, para respetar la dependencia intra-sujeto de los datos, la significancia estadística de los resultados se calcula mediante el analizador [analyze_results.py](file:///home/marce-i/Documentos/infotec/analyze_results.py) utilizando:
*   **Prueba t para muestras relacionadas/emparejadas (Paired t-test):** Para comparar la diferencia de medias de rendimiento (precisión y latencia) bajo variables paramétricas continuas.
*   **Prueba de rangos con signo de Wilcoxon (Wilcoxon Signed-Rank Test):** Como contraste no paramétrico emparejado idóneo para analizar diferencias en latencias no normales y puntuaciones Likert subjetivas de confianza percibida.

### Caracterización de Fallabilidad, Vulnerabilidad, Obsolescencia y Resiliencia del Artefacto

#### Dimensiones de Exposición del Sistema
El motor regulatorio multi-agente, concebido como un artefacto socio-técnico, debe caracterizarse bajo las siguientes dimensiones de exposición:
*   **Falibilidad:** El motor multi-agente es intrínsecamente falible. Existe el riesgo latente de alucinaciones en el modelo base de lenguaje y errores de indexación semántica en la base de datos ChromaDB.
*   **Vulnerabilidad:** El artefacto es vulnerable a ataques de inyección de prompts (donde un usuario intenta engañar al sistema para que valide decisiones ilegales) y a interrupciones en la infraestructura de red que impidan la comunicación con los endpoints de la API.
*   **Obsolescencia y Deriva Algorítmica (Algorithmic Drift):** Los marcos normativos y las directrices de ciberseguridad en Latinoamérica son dinámicos. Un corpus legal estático en ChromaDB se ve afectado por el envejecimiento normativo del sistema. Sin un ciclo de gobernanza continuo de re-indexación asíncrona ante cambios en la legislación o jurisprudencia local, las respuestas del RAG sufrirán deriva algorítmica, aplicando criterios obsoletos a incidentes activos.
*   **Dependencia de Terceros:** El sistema depende del acceso a modelos base de lenguaje alojados en la infraestructura de megacorporaciones tecnológicas (Google Gemini y Groq/Llama), que monopolizan el hardware de cómputo (GPUs/TPUs) y los pesos de los modelos de inteligencia artificial.

#### Respuestas a Fallas y Preguntas de Control ("What if...?")
Para mitigar la exposición anterior y asegurar la continuidad operativa de la auditoría regulatoria, el sistema ha sido diseñado bajo principios de resiliencia ante contingencias:
*   **¿Qué pasa si deja de estar en manos de la organización renovar una licencia o API key (por ejemplo, por cuotas agotadas o costos)?**  
    La arquitectura del arnés académico web y del backend cuenta con un mecanismo de **Degradación Elegante (Graceful Degradation)**. Al detectar un fallo de conexión, rate-limit (error 429), problemas de autenticación (error 401) o caída de servidores (error 503), el sistema deshabilita las llamadas cognitivas de los agentes de lenguaje y activa un módulo local de contingencia.
*   **¿Cómo afecta este fallo al sistema?**  
    El sistema deja de operar como un consultor lingüístico contextual (AI-powered) y pasa a operar como un motor de búsqueda local determinista sobre el corpus estático estructurado (`regulatory_corpus.json`). Se mantiene la exactitud factual de las leyes, pero se pierde la capacidad de explicación semántica estructurada de la recomendación de los agentes.
*   **¿Cómo afecta este fallo a otras personas (los participantes del experimento)?**  
    Los participantes asignados al Grupo C que experimenten el fallo perderán la guía consolidada y resumida de la IA. Aunque el sistema seguirá mostrándoles las leyes pertinentes recuperadas localmente, la latencia humana de decisión podría aumentar y la precisión podría disminuir debido a la sobrecarga cognitiva de tener que analizar el texto de ley en bruto sin el dictamen consolidado del agente. El arnés registrará este estado como una bandera especial (`ERROR_CONEXION` controlado) en los logs estadísticos para que no corrompa el análisis del rendimiento en condiciones óptimas.
*   **¿Cómo afecta al investigador/operador?**  
    El operador de la prueba es notificado visualmente en la consola del administrador. La solución requiere únicamente la actualización de las claves en las variables de entorno locales o en la interfaz web del arnés, sin necesidad de reprogramar el código fuente del sistema.
*   **¿Qué márgenes de tiempo se tienen para solucionar la falla en un escenario de crisis real?**  
    Los plazos de notificación regulatoria ante brechas críticas son extremadamente severos (por ejemplo, el plazo de 3 horas del CSIRT en Chile ante incidentes en infraestructuras críticas). Si el asistente de IA falla durante una crisis real, el margen de recuperación debe ser sub-segundo: la degradación elegante local del software debe activarse de forma instantánea e inmediata (en milisegundos) para evitar que el CISO quede desprovisto de la base normativa y cometa una infracción regulatoria por retraso.

### Consideraciones Éticas
El estudio se realiza bajo escenarios ficticios y datos sintéticos estructurados en el caso del Hospital UCI, garantizando que no se procesa información de incidentes reales ni datos personales de pacientes o clientes. Los participantes otorgan su consentimiento informado de forma voluntaria al inicio de la Web-App y sus identidades son anonimizadas mediante identificadores generados de manera aleatoria por el sistema (ej. `CISO-8Y9X`), cumpliendo con los estándares de privacidad PbD (Privacy by Design).

---

## 12. Marco Teórico

### Gobernanza Digital y Fragmentación Regulatoria en Latinoamérica
A nivel internacional, el Reglamento General de Protección de Datos (GDPR) de la Unión Europea ha establecido un estándar global de privacidad. En Latinoamérica, el desarrollo normativo se caracteriza por una convergencia progresiva hacia estos estándares pero con un diseño fragmentado y asimétrico. Brasil implementó la Ley General de Protección de Datos (LGPD) que instituye estrictos requerimientos de seguridad de la información; México regula el ámbito privado a través de la LFPDPPP; Uruguay mantiene su estatus de adecuación ante la UE mediante la Ley 18.331 y regulaciones del Banco Central del Uruguay (Circular 2318); mientras que Chile avanza en su Ley 19.628 y la nueva Ley Marco de Ciberseguridad. Cuando ocurre una brecha transfronteriza, la fragmentación de estos marcos legales obliga a las organizaciones a interpretar múltiples definiciones de "plazo razonable" e interactuar con distintas autoridades en paralelo.

### Límites Epistemológicos de la Decisión Normativa: La Ley de Hume
El objetivo de un asistente regulatorio basado en IA para "auditar y guiar decisiones de cumplimiento" debe analizarse a la luz de los límites epistemológicos de la inferencia normativa. Específicamente, la denominada Ley de Hume (o el problema del *es-deber ser*) establece que no es metodológica ni lógicamente posible derivar proposiciones normativas (deber ser/obligaciones) a partir de premisas puramente descriptivas (hechos/ser).

En el contexto de la ciberseguridad, los sistemas de telemetría y análisis forense proporcionan información puramente descriptiva: registros de red, hashes de archivos, volumen de datos exfiltrados y marcas de tiempo de incidentes (el *ser*). Por su parte, la arquitectura multi-agente procesa este conjunto de datos descriptivos y realiza una recuperación RAG de textos normativos (leyes locales y plazos regulatorios).

Sin embargo, el paso de "conocer el estado del hecho y la existencia de la regla" a "tomar la decisión de cumplimiento óptima" (el *deber ser*) exige un juicio de valor y una ponderación ética que escapan a la capacidad de inferencia lógica de la IA. Por ejemplo, ante una colisión de deberes —como el dilema de pagar un rescate de ransomware para salvaguardar la vida de pacientes en una unidad de cuidados intensivos (deber ético) frente a la prohibición corporativa y legal de financiar organizaciones criminales (deber legal)—, la IA puede describir las consecuencias normativas de ambas opciones, pero no puede resolver la decisión ética. Por lo tanto, el *Governance Agent* se delimita formalmente como un Sistema de Soporte a la Decisión (DSS) y no como un agente autónomo de toma de decisiones, asumiendo que el "salto de Hume" entre la descripción y la norma requiere de forma obligatoria la mediación y discrecionalidad ética del CISO humano.

### El Principio de Inevitabilidad en Ciberseguridad
La gobernanza moderna de la seguridad de la información ha transitado desde modelos preventivos perimetrales hacia marcos basados en el Principio de Inevitabilidad de la Brecha. Bajo el paradigma de Zero Trust ("asumir el compromiso"), se asume que cualquier sistema, independientemente de sus defensas técnicas, será eventualmente vulnerado.

Este principio reconfigura radicalmente el cumplimiento regulatorio: la conformidad legal ya no es un estado estático y preventivo, sino una capacidad de resiliencia y respuesta ágil en la post-brecha. El valor del *Governance Agent* reside en guiar las decisiones críticas precisamente en el momento en que ocurre la contingencia inevitable, donde el factor tiempo (latencia) define la legalidad de la respuesta.

Asimismo, el Principio de Inevitabilidad se aplica al propio artefacto tecnológico: la falla, indisponibilidad o hackeo del asistente de IA es también un hecho inevitable a lo largo del tiempo. Por lo tanto, el protocolo experimental debe incorporar y documentar la capacidad de respuesta y degradación del asistente ante sus propias fallas como una variable metodológica clave del estudio.

### IA Generativa y Retrieval-Augmented Generation (RAG) en el Dominio Legal
Aunque los modelos de lenguaje masivos (LLMs) destacan en la comprensión semántica de textos extensos, su uso en entornos jurídicos y de cumplimiento se ve limitado por su propensión a alucinar información fáctica o citar leyes inventadas. Para mitigar este riesgo, la arquitectura de Recuperación Aumentada por Generación (RAG) inyecta contexto verídico desde bases de datos vectoriales indexadas (como ChromaDB). En sistemas multi-agente, las tareas se desacoplan: un agente de gobernanza realiza la consulta RAG y un agente validador independiente (en este caso, orquestado con DeepSeek R1) audita la respuesta comparándola con las fuentes inyectadas mediante el cotejo de hashes criptográficos (SHA-256), reduciendo significativamente el error conceptual y garantizando la explicabilidad (XAI).

### La Caja Negra Hermenéutica vs. Explicabilidad Jurídica
El derecho no constituye una ciencia exacta de correspondencias sintácticas, sino una disciplina hermenéutica y de interpretación normativa en contexto. Los modelos de lenguaje masivos (LLMs) genéricos operan como *loros estocásticos* (stochastic parrots) que predicen palabras probabilísticamente, actuando como una *Caja Negra Hermenéutica* carente de comprensión jurisprudencial. En crisis transfronterizas de LATAM, un LLM genérico (Grupo B) suele alucinar plazos o inventar normativas al razonar bajo el sesgo geopolítico de legislaciones globales dominantes (como el GDPR europeo). Para mitigar este vacío epistémico, el uso de RAG local y validación con hashes SHA-256 (Grupo C) no pretende automatizar la hermenéutica legal, sino proveer explicabilidad fáctica (XAI) para que el CISO humano sea quien realice la ponderación interpretativa a partir de fuentes documentales íntegras.


### La Brecha de Responsabilidad (Responsibility Gap) en Decisiones Asistidas por IA
La incorporación de asistentes inteligentes de cumplimiento regulatorio plantea un dilema ético-jurídico conocido como la *Brecha de Responsabilidad* (Responsibility Gap). Al delegar el análisis regulatorio preliminar en agentes de lenguaje y motores RAG, surge el riesgo de que el operador humano desarrolle sumisión algorítmica, eludiendo la fiscalización activa de los dictámenes de la IA. No obstante, dado que un fallo del software (como alucinaciones normativas no detectadas o la deriva de datos) puede resultar en multas graves ante el Banco Central de Uruguay o el INAI, la responsabilidad moral y jurídica sobre la decisión final sigue siendo exclusivamente humana y no delegable en el artefacto. La arquitectura propuesta aborda esta brecha mediante un modelo de interacción *Human-in-the-Loop* (HITL). El motor opera como un Sistema de Soporte a la Decisión (DSS) donde el *Governance Agent* carece de autonomía decisoria: su función es puramente epistémica, estructurando y recomendando plazos mientras que el juicio moral y la firma de la notificación reguladora recaen irrestrictamente sobre el CISO humano.

### Sesgo de Automatización y Pérdida de Agencia Moral
El *Sesgo de Automatización* (Automation Bias) describe la propensión cognitiva a confiar desproporcionadamente en las recomendaciones de sistemas automatizados, pasando por alto errores o delegando el análisis crítico. En la gobernanza de ciberseguridad, este sesgo puede inducir al CISO a una pérdida de agencia moral y de su facultad de discernimiento normativo, asumiendo de forma acrítica las salidas del motor. Al evaluar empíricamente la confiabilidad percibida del motor multi-agente (Grupo C) frente al brazo manual (Grupo A), el protocolo analiza si la interfaz explicable (XAI) fomenta la discrecionalidad y el juicio independiente del CISO o si, por el contrario, fomenta una delegación de responsabilidad hacia el software.

---

## 13. Cronograma de Actividades
La estancia de investigación consta de un cronograma estructurado de 6 semanas:
*   **Semana 1: Fundamentación y Ajuste de Reglas.** Búsqueda de literatura científica y taxonomía legal inicial en ChromaDB.
*   **Semana 2: Refinamiento de la Tubería Cognitiva.** Ajuste fino de la API del motor de agentes en FastAPI y pruebas de integración.
*   **Semana 3: Configuración del Arnés Académico.** Configuración final de los tres escenarios experimentales interactivos en la Web-App y despliegue del warm-up check.
*   **Semana 4: Fase Experimental y Toma de Muestra.** Aplicación de las pruebas en INFOTEC a la muestra de participantes y registro automático de logs CSV.
*   **Semana 5: Análisis Estadístico de Resultados.** Procesamiento de los CSVs mediante `analyze_results.py` y contraste de hipótesis (t-test relacionado y rangos con signo de Wilcoxon).
*   **Semana 6: Redacción de Resultados.** Estructuración del reporte final, artículo de divulgación y presentación ante el supervisor.

---

## 14. Estrategia de Propiedad Intelectual (IP)
Con el propósito de proteger legalmente el código y las mecánicas comerciales del videojuego *The Responder 2.0* de cualquier reclamación institucional por parte de INFOTEC/Conahcyt, se adopta un diseño de arquitectura desacoplada:
1.  **Propiedad Preexistente Protegida:** El motor core de agentes y FastAPI se mantiene cerrado y es propiedad intelectual preexistente del postulante.
2.  **Acceso de Caja Negra:** La evaluación académica consume el backend de forma remota a través de peticiones HTTP REST. El único código fuente que se registrará y entregará en el repositorio público institucional de INFOTEC será el Arnés Académico Web standalone (`evaluador-multiagentes-infotec`).

---

## 15. Fuentes de Información
*   Banco Interamericano de Desarrollo (BID) & Organización de los Estados Americanos (OEA). (2020). *Ciberseguridad 2020: riesgos, avances y el camino a seguir en América Latina y el Caribe*. BID; OEA.
*   Bauer, S., et al. (2025). *Human and AI trust: Trust attitude measurement instrument*. arXiv preprint arXiv:2510.21535.
*   Comisión Económica para América Latina y el Caribe (CEPAL). (2023). *Ciberseguridad y transformación digital en América Latina y el Caribe*. Naciones Unidas.
*   González Fuster, G., et al. (2025). *Data governance in Latin America: an increasing alignment with the G20*. International Data Privacy Law, advance article. https://doi.org/10.1093/idpl/ipad045
*   Hagendorff, T., et al. (2025). *To trust or distrust AI: A questionnaire validation study*. Preprint.
*   Huang, X., et al. (2023). *A survey on hallucination in large language models*. arXiv preprint arXiv:2311.05232.
*   National Institute of Standards and Technology (NIST). (2024). *The NIST Cybersecurity Framework (CSF) 2.0*. NIST Special Publication 1299. https://doi.org/10.6028/NIST.SP.1299
*   Xiao, J., et al. (2025). *Large language models hallucination: A comprehensive survey. arXiv preprint arXiv:2510.06265.*

---

## 16. Índice Tentativo del Protocolo
1. Tema
2. Resumen
3. Introducción
4. Antecedentes
5. Planteamiento del Problema
6. Pregunta de Investigación
7. Justificación y Delimitación
8. Objetivo General
9. Objetivos Específicos
10. Supuesto o Hipótesis
11. Metodología y Diseño Experimental
   11.1 Población y Muestra
   11.2 Procedimiento Experimental y Arnés Web
   11.3 Variables de Estudio
   11.4 Plan de Análisis Estadístico
   11.5 Caracterización de Fallabilidad, Vulnerabilidad y Resiliencia del Artefacto
   11.6 Aspectos Éticos
12. Marco Teórico
   12.1 Gobernanza Digital y Fragmentación Regulatoria en LATAM
   12.2 Límites Epistemológicos de la Decisión Normativa: La Ley de Hume
   12.3 El Principio de Inevitabilidad en Ciberseguridad
   12.4 RAG y Sistemas Multi-Agente en el Dominio Legal
13. Cronograma de Actividades
14. Estrategia de Propiedad Intelectual
15. Fuentes de Información
16. Índice Tentativo
