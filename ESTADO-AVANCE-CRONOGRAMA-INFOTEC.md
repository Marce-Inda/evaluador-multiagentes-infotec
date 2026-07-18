# Reporte de Avance del Protocolo de Investigación
**Programa de Veraneo INFOTEC 2026**

*   **Proyecto:** Orquestación Multi-Agente y RAG para la Auditoría Automatizada de Cumplimiento Regulatorio Transfronterizo en Incidentes de Ciberseguridad en Latinoamérica (Governance Agent Backend)
*   **Presenta:** Marcela Rosana Inda
*   **Supervisor:** Dr. Federico César Lefranc Weegan
*   **Fecha de Reporte:** Sábado 4 de Julio, 2026 (Fin de la Semana 3 / Inicio de la Semana 4)

---

## Estimado Mentor,

A continuación, presento el estado de avance de las actividades correspondientes a nuestro plan de trabajo de 6 semanas. Actualmente nos encontramos al **inicio de la Semana 4**. 

El software experimental (Arnés Web, Corpus Legal y Módulo Estadístico) se encuentra completamente construido, probado y fortificado frente a fallos operacionales. Esta infraestructura se encuentra desacoplada del core del videojuego comercial para garantizar el blindaje de la Propiedad Intelectual de *The Responder 2.0*.

> [!NOTE]
> Cabe destacar que el avanzado estado de desarrollo de la infraestructura técnica (el backend del motor de agentes) se debe a que se adaptó y tomó como base una arquitectura y código base preexistentes de mi autoría (alineado con la declaración de propiedad intelectual del protocolo). Esto nos ha permitido evitar la fase de codificación básica desde cero y concentrar los esfuerzos de estas primeras semanas en lo sustantivo de la investigación: el diseño cuasi-experimental, la rigurosa estructuración del corpus legal latinoamericano y la preparación de las pruebas estadísticas de contraste.

Agradeceré enormemente sus observaciones, recomendaciones y guía sobre los puntos pendientes para asegurar el rigor académico de las siguientes fases.

---

## Cronograma de Tareas (Semana por Semana)

### **Semana 1: Fundamentación y Ajuste de Reglas**
* **Objetivo:** Delimitación jurídica del marco regional, justificación del protocolo e hipótesis de investigación.
* **Estatus:** **100% Completada** ✔

- [x] Búsqueda de literatura científica sobre ciberseguridad, RAG y protección de datos en Latinoamérica (México, Brasil, Chile, Uruguay).
- [x] Mapeo de la taxonomía legal e indexación inicial en la base vectorial (ChromaDB / corpus estático).
- [x] Planteamiento teórico de la Ley de Hume (inhabilitación de decisiones autónomas por IA) y del Principio de Inevitabilidad de la Brecha.
- [x] Redacción y fundamentación del protocolo inicial ([PLAN-PROTOCOLO-INVESTIGACION.md](file:///home/marce-i/Documentos/infotec/PLAN-PROTOCOLO-INVESTIGACION.md)).

---

### **Semana 2: Refinamiento de la Tubería Cognitiva**
* **Objetivo:** Configuración de la API del motor de agentes multi-agente, pruebas internas de robustez y resiliencia.
* **Estatus:** **100% Completada** ✔

- [x] Configuración de API keys en variables de entorno locales para modelos de lenguaje base (Gemini y Groq) en la nube.
- [x] Implementación de la API unificada del motor de agentes en FastAPI como una "caja negra" remota en Hugging Face Spaces.
- [x] Ejecución del test de baseline inicial (11 de Junio, 2026) para documentar el punto de partida e identificar fallas de cuotas y autenticación ([REPORTE-BASELINE-EVALUACION.md](file:///home/marce-i/Documentos/infotec/REPORTE-BASELINE-EVALUACION.md)).
- [x] Programación del mecanismo de **Degradación Elegante** para el Grupo C (si la API falla, el sistema se degrada automáticamente a un buscador determinista local, protegiendo la sesión del participante).

---

### **Semana 3: Configuración del Arnés Académico**
* **Objetivo:** Creación y despliegue del Arnés de Búsqueda Académico web y diseño de casos experimentales.
* **Estatus:** **100% Completada** ✔

- [x] Desarrollo del frontend web standalone ([index.html](file:///home/marce-i/Documentos/infotec/index.html), [app.js](file:///home/marce-i/Documentos/infotec/app.js) y [style.css](file:///home/marce-i/Documentos/infotec/style.css)) con cronómetro de latencia humana invisible para evitar el efecto Hawthorne.
- [x] Desacoplamiento y estructuración del corpus legal latinoamericano en [regulatory_corpus.json](file:///home/marce-i/Documentos/infotec/regulatory_corpus.json).
- [x] Diseño e implementación de los 3 incidentes transfronterizos de opción múltiple (Uruguay - BCU, México - Salud/INAI, Brasil/Chile - Retail) con contrabalanceo de escenarios para neutralizar el efecto de aprendizaje.
- [x] Integración de un ping de precalentamiento (*warm-up check*) para evitar penalizaciones por arranque en frío de la nube.
- [x] Redacción del caso ético complejo de nivel 6 (ransomware en la UCI de un hospital) y de la guía de validación para mentores ([GUIA-VERIFICACION-Y-COMPLIANCE-INFOTEC.md](file:///home/marce-i/Documentos/infotec/GUIA-VERIFICACION-Y-COMPLIANCE-INFOTEC.md)).
- [x] Implementación y verificación del **Rediseño Tridimensional de la Evaluación** (inyección de Cultura Ética en Fase 3, ventana emergente de Pausa de Gobernanza con justificaciones obligatorias en Fase 4, y Tablero de Consecuencias e Impactos tridimensional en Fase 5, con guardado de justificación en los logs CSV).

---

### **Semana 4: Fase Experimental / Toma de Muestra**
* **Objetivo:** Ejecución de pruebas cuasi-experimentales con participantes de prueba.
* **Estatus:** **En Progreso / Pendiente** ⏳

- [ ] Reclutamiento final de la muestra de participantes ($N = 30$ a $45$) entre profesionales de ciberseguridad, derecho y estudiantes de posgrado.
- [ ] Presentación y firma del Consentimiento Informado anónimo integrado en la interfaz web.
- [ ] Aplicación de las pruebas experimentales intrasujeto (brazos A, B y C) utilizando el Arnés de Búsqueda Web.
- [ ] Recolección y almacenamiento de métricas (latencia humana, latencia de IA, respuestas y precisión) en el archivo consolidado `resultados_evaluacion.csv`.

---

### **Semana 5: Análisis Estadístico de Resultados**
* **Objetivo:** Procesamiento automatizado de los datos experimentales y contrastación de hipótesis.
* **Estatus:** **Desarrollo Técnico Completado; Pendiente de Ejecución con Datos Reales** ⏳

- [x] Programación completa y testeo de la lógica de análisis en el script [analyze_results.py](file:///home/marce-i/Documentos/infotec/analyze_results.py) (medias, desviaciones estándar, Paired t-test y Prueba de Wilcoxon).
- [ ] Carga del archivo `resultados_evaluacion.csv` obtenido de la Semana 4.
- [ ] Ejecución del analizador de resultados estadísticos.
- [ ] Generación automática e interpretación del documento académico final `reporte_estadistico.md`.

---

### **Semana 6: Redacción de Resultados**
* **Objetivo:** Presentación del protocolo final, reporte técnico y borrador de artículo científico.
* **Estatus:** **Pendiente** ⏳

- [ ] Estructuración del borrador del artículo de divulgación científica con coautoría INFOTEC.
- [ ] Redacción de la memoria técnica de la estancia de investigación.
- [ ] Preparación y presentación final oral de resultados ante el supervisor y el comité académico.
- [ ] Registro y entrega del repositorio público `evaluador-multiagentes-infotec` como entregable institucional.

---

## Temas Específicos sobre los que solicito su Retroalimentación:

1.  **Muestra y Reclutamiento (Semana 4):** ¿Las pruebas se realizarán con participantes reclutados dentro de INFOTEC o debo gestionar los sujetos de prueba de manera externa y presentar únicamente los resultados finales? Asimismo, yo puedo encargarme de buscar participantes con perfil de CISO/analistas de seguridad, pero ¿sería posible que INFOTEC me apoye con participantes del área de derecho para balancear la muestra?
2.  **Validación del Corpus Legal (Semana 3):** ¿Considera conveniente realizar una revisión detallada de la doctrina administrativa del "plazo razonable" (48-72h) de la LGPD brasileña de acuerdo a los criterios más recientes de la ANPD?
3.  **Evaluación Bioética de la IA (Nivel 6):** En el escenario del hospital de especialidades (ransomware UCI), ¿qué pautas bioéticas de la IA o marcos de decisión recomendaría inyectar como criterios lógicos de validación para el *Validator Agent* (DeepSeek R1)?
