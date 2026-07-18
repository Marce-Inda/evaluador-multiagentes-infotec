# Guía de Preparación para la Ponencia y Análisis de Datos
**Proyecto:** Governance Agent Backend (The Responder 2.0)  
**Programa:** Veraneo de Investigación INFOTEC 2026  
**Fecha de Creación:** Julio 2026  

Este documento sirve como material de referencia y guía de defensa académica para la preparación de la ponencia, artículo de divulgación y presentación final ante el comité de INFOTEC. Consolida la estructura de los análisis de datos y la evaluación crítica del protocolo desde la perspectiva de la IA ética y el derecho tecnológico.

---

## Parte 1: Mapa del Análisis de Datos (Qué y Cómo)

Para que el reporte de resultados (Semana 5 y 6) posea rigor científico, el procesamiento de los datos recolectados en `resultados_evaluacion.csv` debe dividirse en cuatro dimensiones:

### 1. Análisis Cuantitativo de Rendimiento (Estadística Inferencial)
*   **Métricas Evaluadas:** Latencia de Decisión (s), Precisión Regulatoria (%), Tasa de Alucinaciones (%).
*   **Pruebas Estadísticas:**
    *   **Paired t-test (Muestras Relacionadas):** Para comparar la diferencia de medias en precisión y latencia entre el Grupo A (Manual), Grupo B (IA Zero-shot) y Grupo C (Multi-agente). Solo aplicable en datos con distribución normal.
    *   **Prueba de Rangos con Signo de Wilcoxon:** Contraste no paramétrico para comparar medianas en variables que no siguen distribución normal (usualmente la latencia de tiempo) y puntuaciones ordinales de la escala Likert de **Confianza/Confiabilidad Percibida**.
    *   **RM-ANOVA (Medidas Repetidas):** Para corroborar de forma global si el soporte tecnológico (variable independiente) ejerce un efecto estadísticamente significativo sobre el rendimiento del participante.
*   **Herramienta de Soporte:** Script automatizado [analyze_results.py](file:///home/marce-i/Documentos/infotec/analyze_results.py).

### 2. Auditoría y Análisis de Sesgos Algorítmicos y Sociotécnicos
*   **Sesgo de Representación / Injusticia Epistémica Algorítmica:**
    *   *Concepto:* Los LLMs base están sobre-entrenados con normativas del Norte Global (GDPR de la UE o HIPAA de EE.UU.) y tienden a proyectar o "colonizar" el derecho latinoamericano.
    *   *Cómo analizarlo:* Comparar las respuestas del Grupo B contra el Grupo C. Rastrear la frecuencia de palabras clave como *"GDPR"*, *"HIPAA"*, o *"EE.UU."* en incidentes correspondientes a México, Uruguay y Chile. Calcular el porcentaje de veces que el LLM Zero-shot aplica plazos europeos en dilemas latinoamericanos.
*   **Sesgo de Automatización (Automation Bias):**
    *   *Concepto:* La tendencia del humano a someterse al dictamen del software y dejar de auditar críticamente los resultados.
    *   *Cómo analizarlo:* Evaluar el comportamiento de los usuarios en "casos trampa" o ante fallos de conexión (degradación elegante). Medir la **Tasa de Sumisión Algorítmica** (porcentaje de usuarios que aprueban un dictamen incorrecto de la IA) y cruzarla con el nivel de experiencia del participante (Variable de Control).
*   **Sesgo de Usabilidad e Interfaz:**
    *   *Concepto:* La latencia humana de decisión puede estar sesgada por la destreza del usuario con la interfaz web y no por su rapidez mental.
    *   *Cómo analizarlo:* Correlacionar la edad y años de experiencia informática de los sujetos contra su latencia en el Grupo A (Manual) mediante pruebas de Spearman.

### 3. Análisis de Alucinaciones Legales (Veracidad Fáctica)
*   **Métrica:** Tasa de Falsedad Normativa (citas de leyes, artículos o plazos inexistentes).
*   **Cómo analizarlo:**
    *   Cotejo por doble ciego de las salidas textuales contra el Ground Truth de [regulatory_corpus.json](file:///home/marce-i/Documentos/infotec/regulatory_corpus.json).
    *   Medir la eficiencia del **Validator Agent** (DeepSeek R1): porcentaje de alucinaciones del *Governance Agent* que fueron bloqueadas o reanalizadas con éxito mediante la verificación cruzada de hashes SHA-256.

### 4. Análisis Cualitativo de Dilemas Bioéticos (Nivel 6)
*   **Concepto:** Evaluación hermenéutica de cómo responde la IA y el usuario ante colisiones de deberes (ej. pagar un ransomware ilegal en el Hospital UCI para salvar vidas vs. cumplir formalmente la ley y esperar 72 horas).
*   **Cómo analizarlo:**
    *   **Análisis de Contenido Cualitativo:** Clasificar los textos descriptivos aportados por participantes e IAs bajo tres teorías éticas: **Deontología** (cumplir la regla pase lo que pase), **Utilitarismo** (evaluar consecuencias de vidas salvadas) y **Ética del Cuidado** (justicia restaurativa y resiliencia humana).

---

## Parte 2: Evaluación Crítica y Defensa Académica

Para defender la solidez del protocolo ante el sínodo de INFOTEC, ten en cuenta el siguiente análisis de debilidades y fortalezas:

### Fortalezas Clave del Proyecto
1.  **Originalidad Temática:** Aporta el primer benchmark reproducible de auditoría de ciberseguridad transfronteriza adaptado a la fragmentación legal de Latinoamérica (México, Brasil, Chile y Uruguay).
2.  **Solidez de Diseño:** El diseño intrasujeto y el contrabalanceo de escenarios neutralizan el "efecto de aprendizaje", elevando la validez interna de la muestra sin requerir cientos de participantes.
3.  **Profundidad Teórica:** No es una "IA de caja negra". Integra de forma explícita la **Ley de Hume** (el paso del *ser* técnico al *deber ser* ético) para fundamentar por qué la IA no sustituye la agencia moral del CISO humano.
4.  **Soberanía Tecnológica:** Justifica el uso de RAG local como herramienta de descolonización epistémica ante el sesgo pro-GDPR de las grandes multinacionales tecnológicas.

### Breakpoints y Preguntas de Defensa (¿Cómo responder?)

*   **Pregunta del Sínodo:** *¿El corpus legal (5 bloques) no es demasiado pequeño para requerir un RAG? ¿No es matar una mosca a cañonazos?*
    *   **Respuesta:** *"El corpus implementado en el arnés actúa como un **modelo de representación simplificado (Benchmark de Referencia)** para aislar variables y garantizar la reproducibilidad del experimento en la estancia de 6 semanas. Sin embargo, la infraestructura técnica (ChromaDB + FastAPI Core) está construida bajo estándares SOA para escalar de forma transparente a bases de datos jurisprudenciales masivas."*
*   **Pregunta del Sínodo:** *¿Por qué utilizar estudiantes y no CISOs reales para toda la muestra? ¿Cómo afecta la validez externa?*
    *   **Respuesta:** *"El reclutamiento de perfiles expertos de ciberseguridad y derecho es una limitación real en entornos de investigación acotados en el tiempo. Por ello, se introdujo el nivel de experiencia como una **Variable de Control** en la Fase 1. En el análisis de datos, se segmentarán las observaciones y se aplicará análisis de covarianza (ANCOVA) para medir cómo el perfil del participante influye en la latencia y en el sesgo de automatización."*
*   **Pregunta del Sínodo:** *¿Por qué desacoplar el experimento del videojuego comercial en una web estática (Search Harness)?*
    *   **Respuesta:** *"El videojuego introduce variables de ruido experimental complejas (habilidad psicomotriz, fatiga visual por interfaces dinámicas, distracción por elementos lúdicos). El arnés de búsqueda web estático aísla de forma pura la variable de estudio (toma de decisiones de cumplimiento) y, al mismo tiempo, actúa como una API de caja negra que protege la Propiedad Intelectual preexistente del core comercial."*

---

## Parte 3: Recomendaciones para la Ponencia Final

1.  **Foco en el Artefacto Socio-Técnico:** Presenta tu trabajo bajo el framework de *Design Science Research (DSR)*. El Governance Agent es un artefacto diseñado para resolver un problema de gobernanza real.
2.  **No sobre-vendas la Inteligencia Artificial:** Al contrario, resalta que tu investigación demuestra la **falibilidad** de los LLMs (Grupo B) y cómo tu arquitectura multi-agente con hashes SHA-256 e interacción *Human-in-the-Loop* es la única forma segura y ética de aplicar IA en el dominio legal y de ciberseguridad.
3.  **Resalta la degradación elegante:** Enfatiza que tu software es resiliente. Si la API de nube falla o es saboteada en ancho de banda, el sistema se degrada a un buscador determinista local, demostrando diseño robusto para escenarios de crisis de infraestructura crítica.
