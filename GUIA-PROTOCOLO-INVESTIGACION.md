# Guía de Planificación: Construyendo un Protocolo de Investigación Científica

Esta guía está diseñada para estructurar paso a paso el protocolo de investigación para la estancia en INFOTEC, enfocada en evaluar el **Governance Agent** en el simulador *The Responder 2.0*.

---

## 1. Estructura Estándar de un Protocolo (CONAHCYT / INFOTEC)

Un protocolo de investigación es el plano técnico de un experimento científico. Debe responder a tres preguntas básicas: *¿Qué se va a investigar?*, *¿Por qué es importante?* y *¿Cómo se va a realizar?*

```
┌────────────────────────────────────────────────────────┐
│          ESTRUCTURA DEL PROTOCOLO DE INVESTIGACIÓN     │
├────────────────────────────────────────────────────────┤
│  1. Título Científico                                  │
│  2. Planteamiento del Problema (Justificación)         │
│  3. Marco Teórico (Estado del Arte)                    │
│  4. Preguntas e Hipótesis de Investigación             │
│  5. Objetivos (General y Específicos)                  │
│  6. Metodología y Diseño Experimental                  │
│  7. Cronograma (Gantt)                                 │
│  8. Resultados Esperados e Impacto                     │
│  9. Referencias Bibliográficas (APA/IEEE)              │
└────────────────────────────────────────────────────────┘
```

---

## 2. Paso a Paso para Construir tu Protocolo

### Paso 1: Búsqueda Bibliográfica y Estado del Arte (Marco Teórico)
No puedes proponer algo sin demostrar qué han hecho otros investigadores antes. Debes buscar qué se ha publicado sobre:
*   *RAG (Retrieval-Augmented Generation) aplicado al dominio legal.*
*   *Uso de LLMs para auditorías automáticas de cumplimiento (Compliance).*
*   *Simuladores interactivos en la enseñanza de ciberseguridad.*

### Paso 2: Definición de Variables e Hipótesis
Toda investigación experimental requiere definir qué vas a medir:
*   **Variable Independiente (Causa):** El uso del *Governance Agent* RAG multi-agente vs. métodos de consulta estáticos (manuales PDF).
*   **Variable Dependiente (Efecto):** La exactitud en el diagnóstico normativo de la brecha y el tiempo requerido para tomar la decisión.
*   **Hipótesis:** *"El uso de un Governance Agent basado en una arquitectura RAG multi-agente reduce el tiempo de diagnóstico de cumplimiento transfronterizo en un 50% y aumenta la precisión de las notificaciones obligatorias en un 30% en comparación con la consulta manual de normativas."*

### Paso 3: Diseño de la Metodología (¿Cómo vas a medir?)
Debes explicar el diseño experimental:
*   ¿Quiénes serán los sujetos de prueba? (ej. 30 profesionales de ciberseguridad o estudiantes avanzados).
*   ¿Cómo se dividirá el grupo? (Grupo Control sin el agente de IA vs. Grupo Experimental asistido por el Governance Agent).
*   ¿Qué datos registrará el simulador de manera inmutable? (logs de clics, marca de tiempo del reporte, etc.).

### Paso 4: Redacción y Revisión de Citación
Escribir el documento formalizando los objetivos (siempre con verbos en infinitivo medibles: *Evaluar, Medir, Comparar, Diseñar*) y referenciar correctamente.

---

## 3. Metodologías y Frameworks Científicos Recomendados

Para dar el máximo rigor académico a tu propuesta, debes adoptar y citar metodologías científicas formales. Te recomiendo usar:

### A. Design Science Research Methodology (DSRM)
*   **Qué es:** Un framework ampliamente aceptado en sistemas de información y ciencias de la computación para investigaciones que involucran la creación de un "artefacto tecnológico" (en tu caso, el Governance Agent + Simulador).
*   **Fases a documentar:**
    1.  *Identificación del problema:* Fragmentación de leyes de LATAM.
    2.  *Definición de objetivos de la solución:* Latencia < 5s, precisión > 90%.
    3.  *Diseño y desarrollo:* Arquitectura multi-agente.
    4.  *Demostración:* Uso del simulador en un escenario de crisis.
    5.  *Evaluación:* Comparación estadística de resultados de usuarios.
    6.  *Comunicación:* El paper/artículo científico final.

### B. Diseño Cuasi-Experimental (Metodología Empírica)
*   Como no puedes aleatorizar completamente a toda la población de expertos en ciberseguridad de LATAM, tu experimento con usuarios reales clasifica como un **Diseño Cuasi-Experimental con grupo de control no equivalente y pretest/postest**.

---

## 4. Herramientas y Técnicas Clave para el Desarrollo del Protocolo

### A. Herramientas de Investigación y Búsqueda Académica
*   **Buscadores de Papers Indexados:**
    *   *Google Scholar (Google Académico):* El punto de partida más rápido.
    *   *IEEE Xplore / ACM Digital Library:* Imprescindibles para la parte de arquitectura de IA, multi-agentes y ciberseguridad.
    *   *Connected Papers:* Herramienta visual excelente. Pones un paper clave (ej. el paper original de RAG de Lewis et al., 2020) y te genera un mapa de todos los papers relacionados.
*   **Gestores de Referencias (Obligatorios para automatizar citas):**
    *   *Zotero:* Gratuito, de código abierto y cuenta con una extensión de navegador excelente para guardar papers con un clic y generar la bibliografía en formato IEEE o APA.
    *   *Mendeley:* Alternativa de Elsevier, muy usada en ámbitos médicos e ingenierías.

### B. Frameworks de Evaluación Científica de IA (Métricas de RAG)
No puedes decirle a INFOTEC: "Mi IA responde bien porque la probé y me gustó". Tienes que usar métricas matemáticas de evaluación de LLMs. Utiliza:
*   **Framework Ragas (Retrieval Augmented Generation Assessment):** Te permite evaluar tu backend usando métricas cuantificables sin necesidad de evaluadores humanos constantes:
    *   *Faithfulness (Fidelidad):* ¿La respuesta del agente se basa estrictamente en la ley inyectada, o está alucinando? (Mide la precisión).
    *   *Answer Relevance (Relevancia de la Respuesta):* ¿La recomendación del agente responde directamente al dilema del CISO?
    *   *Context Recall (Recuperación de Contexto):* ¿ChromaDB recuperó el artículo de la ley correcto para responder al incidente?
*   **TruLens:** Alternativa para rastrear y evaluar la "Tríada de RAG" (Relevancia del Contexto, Fidelidad y Relevancia de la Respuesta).

### C. Frameworks de Ciberseguridad y Gobernanza (El sustento legal/técnico)
Debes citar la alineación del simulador con los estándares que audita el agente:
*   **NIST CSF 2.0 (Cybersecurity Framework):** Específicamente la función de *Gobernar (GV)* y *Responder (RS)*.
*   **ISO/IEC 27001 (Control A.5.34 - Cumplimiento legal y regulatorio):** Justificación internacional de por qué auditar esto es crítico.
*   **Leyes Locales de LATAM:**
    *   *México:* Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).
    *   *Brasil:* Lei Geral de Proteção de Datos (LGPD).
    *   *Chile:* Ley 19.628 de Protección de la Vida Privada e infraestructura crítica (Ley Marco).
    *   *Uruguay:* Ley 18.331 y Circulares del Banco Central del Uruguay (BCU).

*   **Python (Pandas / SciPy):** Para analizar los logs de tus usuarios. Necesitarás realizar pruebas estadísticas de hipótesis para muestras relacionadas:
    *   *Prueba t para muestras relacionadas (Paired t-test):* Para comparar si la diferencia en los tiempos de decisión entre las condiciones experimentales de un mismo participante es estadísticamente significativa (p < 0.05).
    *   *Rangos con signo de Wilcoxon:* Como equivalente no paramétrico cuando los datos no siguen una distribución normal o para variables ordinales como la confianza percibida.

---

## 5. Plantilla de Trabajo para Redactar el Protocolo

Puedes empezar a llenar tu borrador en formato Markdown estructurando cada sección así:

1.  **Resumen Ejecutivo:** (150-250 palabras). Síntesis del problema, metodología y resultados esperados.
2.  **Introducción y Antecedentes:** Breve repaso de cómo ha evolucionado la respuesta a incidentes y por qué la gobernanza se ha vuelto tan compleja en LATAM.
3.  **Definición del Problema:** Evidencia cuantitativa sobre las multas de protección de datos en la región (puedes citar reportes del INAI o de la ANPD de Brasil).
4.  **Justificación:** ¿Por qué es relevante que INFOTEC te asesore en esto? (Alineación con la soberanía digital y políticas públicas).
5.  **Metodología:** Detallar el experimento paso a paso (Fases de DSRM o del diseño cuasi-experimental).
6.  **Infraestructura Tecnológica:** Descripción simplificada de los agentes (Guard, Analyst, Governance, Explainer, Validator).
7.  **Aspectos Éticos:** Asegurar que los datos recolectados de los usuarios de prueba serán completamente anonimizados (conforme al GDPR y leyes locales).
