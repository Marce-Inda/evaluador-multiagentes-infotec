# Guía de Verificación de Escenarios y Validación de Compliance
## Propuesta de Colaboración Académica y Mentoría - INFOTEC 2026

**Proyecto:** Evaluador Multiagente de Ciberseguridad (The Responder 2.0 - Governance Agent)  
**Línea de Investigación:** Regulación de las Tecnologías de la Información y Comunicación  
**Ubicación del Documento:** `docs/GUIA-VERIFICACION-Y-COMPLIANCE-INFOTEC.md`

Este documento consolida los escenarios experimentales y de ética que conforman el núcleo de la evaluación académica para la estancia en INFOTEC. Su propósito es servir como **guía de trabajo y revisión para los mentores asignados** en las áreas de *Derecho Informático, Regulación de TICs, Ética de la IA y Políticas Públicas*. Aquí se detallan los flujos de decisión, las bases normativas mapeadas y los puntos críticos donde se requiere la validación experta de INFOTEC.

### Declaración de Diseño Metodológico: Simplificación y Aislamiento de Variables
Es importante destacar que los escenarios y dilemas implementados en este evaluador representan una **versión deliberadamente simplificada** con respecto a la complejidad interactiva y de simulación de redes del videojuego original *The Responder 2.0*. Esta decisión de diseño responde a pautas rigurosas de control de ruido experimental:
1.  **Aislamiento de la Variable de Estudio:** El experimento busca medir *exclusivamente* la exactitud y latencia en el análisis legal y toma de decisiones regulatorias del participante. Al remover mecánicas jugables accesorias (como la contención técnica y gestión de firewalls del rol del analista SOC), nos aseguramos de que los tiempos registrados reflejen de forma pura el proceso de cumplimiento normativo.
2.  **Mitigación del Sesgo por Habilidad Lúdica y Fatiga:** Los participantes evaluados (particularmente el perfil CISO) presentan habilidades heterogéneas en el uso de videojuegos. Una interfaz web simplificada nivela la muestra, previniendo que la latencia humana de decisión sea afectada por dificultades de navegación o fatiga cognitiva por sobrecarga de interfaz.
3.  **Protección de Propiedad Intelectual:** El arnés opera como un cliente de caja negra que consume la API del motor de agentes remoto, manteniendo la lógica comercial del MVP resguardada y enfocando la entrega académica exclusivamente en el instrumento de evaluación reproducible.

---

## 1. Estructura de la Evaluación Cuasi-Experimental (Los Tres Brazos)

Para aislar científicamente el valor del **Governance Agent** (RAG multi-agente + validador), el experimento expone al participante a un escenario de crisis de ciberseguridad transfronteriza y lo asiste a través de tres configuraciones tecnológicas diferentes:

1.  **Grupo A (Consulta Manual):** El CISO busca leyes usando filtros en una base de datos estática ([regulatory_corpus.json](file:///home/marce-i/Documentos/proyectos/evaluador-multiagentes-infotec/regulatory_corpus.json)). No hay intervención de IA.
2.  **Grupo B (IA Básica - Zero-shot):** El CISO recibe recomendación directa de un LLM comercial (Gemini/Groq) a partir de un único prompt general, sin sustento de RAG ni validaciones cruzadas.
3.  **Grupo C (Motor Multi-Agente Avanzado):** El CISO recibe el dictamen completo del *Governance Agent* de *The Responder 2.0*, que integra RAG con normativas depuradas y es validado criptográficamente contra alucinaciones por un *Validator Agent* (DeepSeek R1).

En cada grupo, la interfaz registra en segundo plano la **latencia de decisión (tiempo de lectura y respuesta)** y califica la **precisión normativa** del CISO mediante un cuestionario de validación (*Ground Truth*).

---

## 2. Escenarios Experimentales: Flujos, Decisiones y Plazos Mapeados

Los tres escenarios del arnés evalúan la capacidad del participante (asistido o no por IA) de auditar decisiones de su equipo técnico que ponen en riesgo la conformidad legal de la empresa.

### Escenario 1: Incidente en Sector Financiero (Uruguay - BCU)
*   **El Incidente:** Exfiltración de credenciales y registros del procesador de pagos.
*   **La Decisión a Auditar:** *“Postergar la notificación oficial al regulador financiero para evitar pánico de mercado, priorizando la contención técnica interna del firewall.”*
*   **Flujo y Respuestas correctas del Quiz:**
    *   *Plazo regulatorio de notificación:* **24 horas** desde su detección.
    *   *Autoridad competente:* Banco Central del Uruguay (BCU) - Superintendencia de Servicios Financieros.
    *   *Veredicto de Cumplimiento:* **Rechazar la decisión** del operador. Postergar la notificación viola flagrantemente el plazo de 24 horas del BCU.
*   **Sustento Normativo:** Circular 2318 y Comunicación 2021/2318 del BCU. Sanciones aplicables de hasta 2,000,000 UI (Unidades Indexadas).

---

### Escenario 2: Incidente en Sector Salud (México - INAI / SS)
*   **El Incidente:** Un ataque de phishing compromete credenciales de un médico y permite la descarga masiva de 5,000 expedientes clínicos con datos sensibles de pacientes.
*   **La Decisión a Auditar:** *“Notificar a la Secretaría de Salud y al INAI inmediatamente a las 12 horas del incidente, activando el protocolo de bloqueo de credenciales comprometidas.”*
*   **Flujo y Respuestas correctas del Quiz:**
    *   *Plazo regulatorio de notificación:* **72 horas hábiles** a partir de tener conocimiento de la vulneración.
    *   *Autoridad competente:* Secretaría de Salud (NOM-004) y el INAI.
    *   *Veredicto de Cumplimiento:* **Aprobar la decisión**. Notificar a las 12 horas está en conformidad con el límite de 72 horas hábiles.
*   **Sustento Normativo:** Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados (LGPDPPSO) y Ley Federal (LFPDPPP) (en lo conducente a vulneraciones de datos sensibles), junto con la NOM-004-SSA3-2012 del Expediente Clínico.

---

### Escenario 3: Incidente Transfronterizo (Brasil LGPD / Chile Ley Marco)
*   **El Incidente:** Una base de datos alojada en Brasil que contiene información personal de ciudadanos chilenos es exfiltrada y publicada en foros clandestinos.
*   **La Decisión a Auditar:** *“Bloquear IPs de exfiltración, aislar el servidor base en Brasil y retrasar el informe a la CSIRT de Chile para realizar análisis de colisión legal transfronterizo.”*
*   **Flujo y Respuestas correctas del Quiz:**
    *   *Plazo regulatorio de notificación:* **Inmediato / máximo 3 horas** si afecta infraestructura crítica o servicios esenciales en Chile.
    *   *Autoridad competente:* ANPD (Autoridad Nacional de Protección de Datos de Brasil) y CSIRT Nacional (Chile).
    *   *Veredicto de Cumplimiento:* **Rechazar la decisión**. El retraso para el análisis legal transfronterizo infringe el estricto plazo de 3 horas del CSIRT chileno.
*   **Sustento Normativo:** Chile: Ley Marco de Ciberseguridad (Ley Nº 21.660) (Notificación a CSIRT en <3h). Brasil: Ley General de Protección de Datos (LGPD - Ley 13.709, Art. 48) (Notificación en "plazo razonable" / 48-72h).

---

## 3. Anexo Especial: Escenario Complejo de Dilemas Sociotécnicos (Nivel 6)

Este escenario, detallado en [docs/CASO-ESTUDIO-ETICA-NIVEL6.md](file:///home/marce-i/Documentos/proyectos/evaluador-multiagentes-infotec/docs/CASO-ESTUDIO-ETICA-NIVEL6.md), sirve como el marco cualitativo principal para las mentorías de Ética en IA. Narra el ataque de ransomware *Play* al sistema UCI de un Hospital de Especialidades en la Ciudad de México.

### Dilemas Evaluados:
1.  **Dilema de la Vida Humana vs. Cumplimiento Legal:** ¿Debe el CISO pagar un rescate de $500K USD para reactivar monitores de terapia intensiva en 6 horas (financiando al crimen organizado y violando la política interna) o cumplir estrictamente con la política y esperar a restaurar backups en 72 horas asumiendo el riesgo inminente de decesos de pacientes?
2.  **Cultura de Reporte No Punitiva:** ¿Debe despedirse de inmediato a una empleada que cometió un error al abrir un phishing sofisticado (generando un ambiente de miedo y ocultación en la organización) o aplicar justicia restaurativa mediante reentrenamiento?
3.  **Equidad y Presupuesto en Ciberseguridad:** ¿Cómo cumple una PyME del sector salud de un país en desarrollo cuando la legislación extraterritorial (como el GDPR europeo) le exige notificaciones internacionales de alto costo financiero ($50K USD en despachos) bajo amenaza de multas astronómicas?

---

## 4. Áreas de Verificación y Asistencia Técnica Solicitada a INFOTEC

Solicitamos la mentoría y apoyo del Comité Académico y de los investigadores de INFOTEC en los siguientes cuatro puntos del protocolo:

```
                  ┌───────────────────────────────────────────────┐
                  │    ÁREAS DE MENTORÍA E INVESTIGACIÓN INFOTEC   │
                  └──────┬──────────────┬──────────────┬──────────┘
                         │              │              │
                         ▼              ▼              ▼
                    [Rigor Legal]  [Ponderación]  [Bioética de IA]
                    - Plazos       - Sanciones    - Dilemas UCI
                    - Normas       - Severidad    - Pautas
```

### A. Validación Jurídica del Corpus Regulatorio (Compliance)
*   **Objetivo:** Revisar que las interpretaciones contenidas en [regulatory_corpus.json](file:///home/marce-i/Documentos/proyectos/evaluador-multiagentes-infotec/regulatory_corpus.json) y el mapeo de leyes de México, Uruguay, Brasil y Chile sean rigurosamente correctos frente a la doctrina administrativa actual.
*   **Pregunta clave:** ¿La interpretación doctrinal del "plazo razonable" de la LGPD de Brasil (establecido en el arnés como 48-72h) coincide con los últimos precedentes y resoluciones de la ANPD?

### B. Calibración del Impacto de las Sanciones
*   **Objetivo:** Ajustar el motor de evaluación para que las multas y el impacto reputacional calculados por el Governance Agent reflejen la severidad del criterio del INAI y otros reguladores de la región.
*   **Pregunta clave:** ¿Cómo calibrar la ponderación de multas en el escenario transfronterizo cuando hay colisión entre la capacidad económica de una organización en LATAM y los estándares internacionales (HIPAA/GDPR)?

### C. Estructuración Teórica del Validator Agent (Bioética)
*   **Objetivo:** Desarrollar los lineamientos éticos bajo los cuales el *Validator Agent* (DeepSeek R1) analiza y califica la decisión del usuario en el escenario de nivel 6 (ransomware en la UCI).
*   **Pregunta clave:** ¿Cómo evitar que la IA penalice una excepción bioética (ej. pagar para salvar vidas) de manera fría y puramente formalista, integrando principios de ética de la tecnología al motor de evaluación?

### D. Gobernanza y Diseño de Muestreo Experimental
*   **Objetivo:** Validar que el flujo de datos del arnés cumpla con la Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados (LGPDPPSO) mexicana.
*   **Pregunta clave:** Revisar y refinar el formato de **Consentimiento Informado** que se presentará a los estudiantes y profesionales de prueba antes de realizar las mediciones del experimento.
