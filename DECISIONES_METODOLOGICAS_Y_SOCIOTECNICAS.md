# Decisiones Metodológicas, Socio-Técnicas y de Gobernanza

Este documento detalla el **Qué, el Por qué y el Para qué** de cada una de las decisiones críticas de diseño experimental y de arquitectura tecnológica adoptadas en el proyecto de investigación: *"Orquestación Multi-Agente y RAG para la Auditoría Automatizada de Cumplimiento Regulatorio Transfronterizo en Incidentes de Ciberseguridad en Latinoamérica"*.

Su propósito es servir como puente conceptual entre la **ingeniería de inteligencia artificial** y la **gobernanza de seguridad / epistemología jurídica**, facilitando la justificación del protocolo ante el comité evaluador y mentores de INFOTEC.

---

## 1. Decisiones Metodológicas (Diseño Experimental)

### 1.1 Diseño Cuasi-Experimental Intrasujeto de Medidas Repetidas
*   **Qué:** Un diseño de investigación en el cual cada uno de los participantes de la muestra ($N = 30$ a $45$) es expuesto de forma secuencial a las tres condiciones experimentales o brazos de soporte (Grupo A: Consulta Manual, Grupo B: LLM Simple, Grupo C: Motor Multi-Agente).
*   **Por qué:** Al evaluar a los mismos sujetos bajo las tres condiciones, cada participante actúa como su propio control. Esto cancela la varianza intersujeto (diferencias individuales en experiencia previa, rapidez de lectura o conocimientos jurídicos), lo cual maximiza la potencia estadística del estudio sin requerir una muestra masiva impracticable en entornos especializados.
*   **Para qué:** Para aislar con precisión científica el "efecto del soporte tecnológico" (la variable independiente) sobre la exactitud del diagnóstico regulatorio y la latencia de decisión (variables dependientes), posibilitando la aplicación de contrastes de hipótesis paramétricos y no paramétricos relacionados robustos (Prueba t para muestras relacionadas/emparejadas y Prueba de rangos con signo de Wilcoxon).

### 1.2 Contrabalanceo con Escenarios Equivalentes pero Distintos
*   **Qué:** El uso de tres incidentes regulatorios transfronterizos de estructura idéntica pero basados en marcos jurídicos y países diferentes (Uruguay - Financiero, México - Salud, Chile/Brasil - Retail), asignando un caso diferente a cada grupo experimental por participante.
*   **Por qué:** Si un participante evaluara el mismo incidente (ej. Caso 1) bajo el Grupo A y luego bajo el Grupo C, se produciría un *Efecto de Aprendizaje o Arrastre (Carryover Effect)*: el sujeto ya conocería los plazos y autoridades de la primera corrida, distorsionando las mediciones de latencia y precisión subsecuentes.
*   **Para qué:** Para neutralizar los sesgos cognitivos por repetición y memorización, garantizando la validez interna del experimento y permitiendo una comparación limpia del rendimiento en las tres fases del arnés.

---

## 2. Decisiones de Gobernanza Algorítmica y Ética

### 2.1 Modelo de Interacción Human-in-the-Loop (HITL) y Pausa de Gobernanza
*   **Qué:** La inhabilitación de decisiones autónomas en el *Governance Agent*, obligando a pausar la ejecución del software y solicitando una justificación cualitativa humana al detectar acciones de alto riesgo legal.
*   **Por qué:** Fundamentado en la **Brecha de Responsabilidad (Responsibility Gap)** y la **Ley de Hume (el problema del *es-deber ser*)**. Un agente de software no posee agencia moral ni responsabilidad legal ante los reguladores (ej. Banco Central del Uruguay o el INAI). La IA puede describir el estado de los hechos y recuperar la norma (el *ser*), pero la decisión de cumplimiento y sus consecuencias (el *deber ser*) requiere la discrecionalidad interpretativa y ética del CISO humano.
*   **Para qué:** Para mitigar el *Sesgo de Automatización* (deferencia ciega a la máquina) y asegurar que el sistema opere estrictamente como un **Sistema de Soporte a la Decisión (DSS)**, protegiendo la responsabilidad legal indelegable del CISO.

### 2.2 Explicabilidad Factual mediante Integridad de Hashes (SHA-256)
*   **Qué:** El cálculo e inyección de hashes criptográficos SHA-256 correspondientes a los fragmentos exactos del corpus legal indexados en ChromaDB, forzando al *Validator Agent* a verificar que el veredicto provenga textualmente del documento de ley.
*   **Por qué:** Los modelos de lenguaje comerciales actúan como una *Caja Negra Hermenéutica* propensa a alucinaciones de contenido o invención de plazos normativos. La fundamentación jurídica de una brecha exige trazabilidad absoluta y veracidad fáctica; un reporte regulatorio no puede sustentarse en conjeturas de un modelo probabilístico.
*   **Para qué:** Para asegurar la **explicabilidad factual (XAI)** del dictamen, erradicando alucinaciones legales y demostrando empíricamente que cada recomendación está vinculada criptográficamente a una fuente de derecho vigente y verídica.

---

## 3. Decisiones de Arquitectura Técnica y Datos

### 3.1 Aislamiento de Logs mediante Servidor MCP de Telemetría Dinámico
*   **Qué:** El despliegue de un servidor local de telemetría bajo el estándar Model Context Protocol (MCP) que expone recursos dinámicos (`siem://{scenario_id}/logs`) para segmentar los logs forenses por ID de escenario.
*   **Por qué:** Para evitar la fuga de datos (*data leakage*) entre incidentes. Los agentes cognitivos del SOC-Tutor deben emular las condiciones de un analista real, quien solo tiene acceso a la telemetría del sistema afectado y no a bases de datos de incidentes ajenos.
*   **Para qué:** Para garantizar la fidelidad de la simulación técnica, forzando al `AnalystAgent` a interrogar al servidor de logs en base al escenario activo de forma aislada, asegurando consistencia forense en cada prueba.

### 3.2 Descolonización Epistémica mediante RAG de Soberanía Local (ChromaDB)
*   **Qué:** La indexación y consulta prioritarias de un corpus normativo regional estructurado (`regulatory_corpus.json`) representativo de leyes en Uruguay, México, Brasil y Chile.
*   **Por qué:** Los modelos base de lenguaje (como Gemini o Llama) sufren de **Injusticia Epistémica Algorítmica / Sesgo Representacional**. Al ser entrenados mayoritariamente con corpora anglosajones o leyes europeas (GDPR), malinterpretan o ignoran las particularidades del derecho latinoamericano, priorizando marcos ajenos a la soberanía local de los países evaluados.
*   **Para qué:** Para obligar al modelo central a razonar bajo la realidad legislativa de cada jurisdicción latinoamericana, garantizando un análisis de cumplimiento jurídicamente exacto y soberano para la región de Latinoamérica.

### 3.3 Enrutamiento de Modelos Asimétrico (Model Routing) y Resiliencia de Pago
*   **Qué:** El desacoplamiento de tareas cognitivas asignando el procesamiento rápido a modelos de bajo costo (Groq/Llama-3.3-70B) y la validación cruzada a modelos de razonamiento (DeepSeek R1/V4). Se incorporó la cascada de fallbacks de **OpenRouter** de pago y el balanceo A/B geopolítico en el cliente.
*   **Por qué:** Para estudiar con rigor el sesgo geopolítico (Meta Llama 3.3 vs DeepSeek V4 Flash) y evitar cuellos de botella por cuotas gratuitas (errores 429/401). OpenRouter permite enrutar al proveedor más barato disponible (como DeepInfra) con una sola línea de código.
*   **Para qué:** Para blindar la estabilidad del backend ante agotamiento de cuotas y asegurar un score de precisión óptimo, así como capturar datos empíricos robustos sobre el impacto del origen geográfico del modelo de IA en el análisis legal.
