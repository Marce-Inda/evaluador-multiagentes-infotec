# Seguridad, Gobernanza de Datos y Ética desde el Diseño (Privacy & Ethics by Design)

**Proyecto:** Evaluador Multiagente de Ciberseguridad  
**Programa:** Veraneo de Investigación y Tecnología INFOTEC 2026  
**Estatus:** IMPLEMENTADO Y VIGENTE ✔

Este documento registra los recaudos, principios y decisiones técnicas tomadas desde la fase de diseño para garantizar que el **Arnés de Evaluación Académica** cumpla con los más altos estándares de seguridad informática, gobernanza de datos y ética en Inteligencia Artificial. Bajo la premisa de *"en casa de herrero, cuchillo de acero"*, este proyecto predica con el ejemplo al auditar y registrar sus propias salvaguardas operativas.

---

## 1. Seguridad Informática y Protección de Infraestructura

### A. Desacoplamiento y Aislamiento de Código (Principio de Menor Exposición)
Para proteger la Propiedad Intelectual (IP) preexistente del videojuego comercial *The Responder 2.0* y, al mismo tiempo, evitar entregar código fuente explotable a los servidores públicos de INFOTEC, se implementó una **arquitectura desacoplada**:
*   El arnés experimental es una interfaz web estática e interactiva (`index.html` y archivos JS/CSS asociados) que opera bajo el modelo de "Caja Negra" (Black-Box API), eliminando el riesgo de seguridad de forzar al CISO a descargar binarios ejecutables en sus laptops corporativas.
*   El backend core de agentes no se duplica ni se almacena localmente en los entornos de prueba académicos, comunicándose únicamente a través de endpoints seguros cifrados con TLS (`https`).

### B. Resiliencia contra la Denegación de Cartera (Wallet-Exhaustion)
La Web-App interactúa con modelos fundacionales en la nube (Gemini, Groq) en segundo plano. Para prevenir que un participante malintencionado o un script automatizado agote los créditos de las API keys del proyecto:
*   Se configuró un sistema de control de excepciones que detecta el error de red `429 Rate Limit` (Límite de cuota excedido).
*   Ante un fallo de cuota o rate limit, la interfaz realiza una degradación elegante (*graceful degradation*) hacia dictámenes deterministas locales pre-configurados, impidiendo que el arnés reintente peticiones en bucles infinitos que disparen los costos de facturación.

---

## 2. Gobernanza de Datos y Privacidad

### A. Anonimización Absoluta de los Participantes (GDPR Art. 25 / LFPDPPP)
El cuasi-experimento requiere registrar datos de múltiples participantes para calcular la significancia estadística.
*   **Identificación Sintética:** La interfaz web solicita un identificador de participante al iniciar la sesión. Se prohíbe explícitamente el uso de nombres reales, correos electrónicos o matrículas institucionales. Los datos se guardan bajo códigos de anonimización (ej: `PARTICIPANTE-01`, `PARTICIPANTE-02`).
*   **Logs Limpios y Centralizados:** Las respuestas de los participantes se envían de forma cifrada mediante llamadas API POST al servidor backend centralizado para consolidarse en el archivo `resultados_evaluacion.csv` remoto. Esto evita la carga de recopilar archivos CSV individuales por correo y limita las métricas a datos puramente científicos: latencia de la IA (s), latencia de decisión del usuario (s), respuestas del cuestionario y porcentaje de precisión final, sin recopilar direcciones IP de los clientes ni marcas de tiempo vinculables a identidades.

### B. Uso de Datos Sintéticos para el Procesamiento en Nube
Dado que el Grupo B (IA Simple) y el Grupo C (Motor Multi-Agente) envían payloads a modelos en la nube de Google y Groq:
*   Los escenarios y dilemas propuestos en el Ground Truth se construyen sobre **casos de estudio 100% ficticios y sintéticos** (ej. brecha en el Hospital General de Especialidades de la CDMX, o logs de un procesador de pagos simulado).
*   Esto garantiza que **nunca se envíe información real corporativa, gubernamental o datos de infraestructura real a los endpoints de los LLMs**, mitigando cualquier riesgo de fuga de datos sensibles hacia APIs externas de terceros.

---

## 3. Ética Algorítmica y Responsabilidad en IA

### A. Soberanía Regulatoria y Mitigación de Sesgos Regionales
La mayoría de los modelos de lenguaje comercializados están entrenados primariamente con corpus legales anglosajones (como el GDPR europeo o leyes de EE.UU.).
*   Para equilibrar la balanza y dotar al sistema de relevancia regional, se construyó una base de datos legislativa local en [regulatory_corpus.json](file:///home/marce-i/Documentos/proyectos/evaluador-multiagentes-infotec/regulatory_corpus.json).
*   Este corpus inyecta en el RAG y en las consultas los artículos, plazos y autoridades locales de reguladores latinoamericanos (INAI de México, ANPD de Brasil, URCDP de Uruguay, CSIRT de Chile), previniendo que la IA recomiende medidas inapropiadas o ajenas a la realidad legal de la región de Latinoamérica.

### B. Mitigación Activa de Alucinaciones Legales (Validator Agent)
Las alucinaciones en el ámbito del derecho informático y cumplimiento regulatorio pueden conllevar sanciones millonarias e inhabilitaciones administrativas.
*   En el diseño del motor multi-agente evaluado en el Grupo C, se incluyó un **Validator Agent** (soportado por DeepSeek R1).
*   Este agente audita el dictamen generado por el orquestador principal, confrontándolo de manera cruzada contra las fuentes legales inyectadas por el RAG mediante hashes criptográficos (SHA-256).
*   Cualquier recomendación que no cuente con sustento en el corpus normativo es marcada como inconsistencia y rechazada por la IA, garantizando un dictamen seguro y auditable.

### C. Enfoque No Punitivo en Dilemas Organizacionales (Justicia Restaurativa)
Los dilemas éticos y de gobernanza de datos diseñados para la evaluación (como el caso de María García en el escenario de phishing de [docs/CASO-ESTUDIO-ETICA-NIVEL6.md](file:///home/marce-i/Documentos/proyectos/evaluador-multiagentes-infotec/docs/CASO-ESTUDIO-ETICA-NIVEL6.md)) desafían la mentalidad tradicionalista de las organizaciones.
*   El simulador penaliza las decisiones corporativas puramente punitivas (como el despido inmediato de un empleado por error de phishing) que incentiven ambientes de miedo y latencia en reportes futuros.
*   La IA del motor educa al participante para promover la **justicia restaurativa y el aprendizaje organizacional no punitivo**, alineándose con las mejores prácticas globales de gobernanza tecnológica contemporáneas.

---

## 4. Referencias y Alineación de Estándares
*   **ISO/IEC 42001 (Sistemas de Gestión de IA):** Marco para asegurar el ciclo de vida responsable y transparente de la tubería cognitiva del evaluador.
*   **OECD AI Principles (Principio 1.2: Transparencia y Explicabilidad):** Guía de diseño de la interfaz para que el analista siempre pueda ver de dónde proviene la ley citada.
*   **GDPR Art. 25 (Privacidad desde el Diseño):** Criterio técnico para el cifrado y la ofuscación de la telemetría de los participantes.
