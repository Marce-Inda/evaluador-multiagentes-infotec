# Reporte de Avance de Protocolo: Integración de Dilemas Éticos y Colisiones Normativas

**Proyecto:** The Responder 2.0 (Incident Responder)  
**Investigadora:** Marcela Rosana Inda  
**Línea de Postulación:** Regulación de las Tecnologías de la Información y Comunicación  
**Supervisor / Mentor:** Dr. Federico César Lefranc Weegan  
**Institución:** INFOTEC Centro de Investigación y Desarrollo Tecnológico  

---

## 1. Introducción y Justificación Académica

El presente reporte detalla el avance en la formalización teórica y el rediseño metodológico del arnés de simulación de incidentes, elaborado en respuesta directa a las líneas de reflexión compartidas por la tutoría de investigación. **A la fecha de este informe, dicho rediseño ha sido completamente implementado y verificado en el código del arnés experimental (Frontend y persistencia de logs en CSV), asegurando la viabilidad operativa para la inminente toma de muestra.**

El punto de partida metodológico de esta actualización es la comprensión tridimensional del derecho: la norma jurídica no determina mecánicamente la conducta fáctica de un actor en crisis (el CISO), sino que actúa como el marco que **legitima o deslegitima** su respuesta a posteriori. En situaciones de brechas transfronterizas de ciberseguridad, los profesionales a menudo se enfrentan a colisiones normativas severas. 

Para que el experimento cuasi-experimental sea científicamente robusto, el software de evaluación se ha transitado de un **positivismo binario rígido** (donde desviarse de la norma se calificaba como incorrecto) hacia un **modelo de ponderación y consecuencias**, donde las decisiones se miden en función de su idoneidad fáctica y su profundidad de legitimación ética.

---

## 2. El Marco de Ponderación Normativo-Ético

El motor de auditoría del simulador estructurará su análisis en los tres niveles conceptuales propuestos por la tutoría:

```
┌────────────────────────────────────────────────────────┐
│             Nivel 3: Perspectiva Ética                 │
│                 (Acuerdo Ético Previo)                 │
│      ¿Quién es legítimo que se beneficie del deber?    │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│         Nivel 2: Incompatibilidades Normativas         │
│          Principios Ius-fundamentales (Vida/Paz)       │
│           (Ponderación Constitucional y Tratados)      │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│     Nivel 1: Interpretación de Contenido y Alcance    │
│            Contenido | Alcance | Límites               │
└────────────────────────────────────────────────────────┘
```

1.  **Nivel 1 (Interpretación Interna):** Identificar con precisión el **Contenido** (texto literal de los plazos y obligaciones), el **Alcance** (el fin explícito del legislador al crear la norma) y los **Límites** (los puntos de fricción con otras normativas concurrentes).
2.  **Nivel 2 (Incompatibilidades y Ponderación):** Cuando dos normas de sistemas distintos entran en colisión directa (ej. leyes de seguridad pública frente al derecho a la salud), el conflicto se eleva a la ponderación de principios ius-fundamentales (derechos humanos y constitucionales).
3.  **Nivel 3 (Perspectiva Ética - El Acuerdo Previo):** Para evaluar una conducta en crisis, los actores deben operar bajo un marco común acordado. Dado que en el ámbito tecnológico digital la perspectiva dominante es el utilitarismo, se introduce la pregunta crítica: *¿Quién es legítimo que se beneficie del cumplimiento estricto de la norma?* (El Estado, la corporación, o los titulares de los datos).

---

## 3. Estructuración de los Escenarios y sus Marcos Éticos

Para que los participantes del experimento experimenten y aprendan las diferencias operativas entre las grandes corrientes de la ética aplicada, se ha asignado una **postura ética previa (cultura organizacional)** específica para cada escenario:

| Escenario | Jurisdicción / Sector | Marco Ético Aplicado | Justificación de la Postura |
| :--- | :--- | :--- | :--- |
| **1. Código Azul** | Uruguay / Financiero | **Utilitarismo (Consecuencialismo)** | La organización prioriza la **estabilidad sistémica y el bienestar colectivo** del mercado financiero para evitar corridas bancarias y pánico social. |
| **2. Código Rojo** | México / Salud | **Principialismo Bioético** | La clínica está regida por los deberes absolutos de **No Maleficencia y Cuidado**. La preservación de la vida humana en la UCI es el principio supremo. |
| **3. Código Ámbar** | Brasil-Chile / Retail | **Deontología (Ética del Deber)** | La corporación opera bajo principios de **responsabilidad social y transparencia contractual**, reconociendo la autonomía del cliente sobre sus datos de forma inmediata. |

---

## 4. Rediseño del Flujo de Interacción Pedagógica

Para guiar al usuario sin actuar como un tribunal definitivo, el flujo interactivo del arnés experimental se reestructura de la siguiente manera:

```
[ Contexto del Escenario ] ──> [ Preguntas Factuales RAG ] ──> [ Toma de Decisión Crítica ]
                                                                           │
                                                                           ▼
[ Tablero de Consecuencias ] <── [ Auditoría del Validator ] <── [ Pausa de Gobernanza ]
```

1.  **Ficha de Inducción Contextual:** Presenta los datos técnicos del hackeo y el "acuerdo ético previo" (la cultura organizativa que rige a la entidad).
2.  **Evaluación Factual:** El participante identifica los plazos de reporte y las autoridades del caso concreto apoyado por la consulta al corpus normativo.
3.  **Decisión Crítica y Pausa de Gobernanza:** Al elegir una acción de respuesta (ej. pagar el rescate o retrasar la notificación), se activa una ventana emergente en la interfaz. En lugar de calificar la acción, el sistema solicita al usuario seleccionar el **escudo argumentativo** (justificación legal/ética) bajo el cual ampara su decisión (ej. apelar a un Estado de Necesidad).
4.  **Tablero de Consecuencias e Impactos (Veredicto):** El sistema analiza la decisión y muestra una retroalimentación tridimensional que expone las consecuencias reales del criterio del usuario:
    *   *Impacto Fáctico/Operativo:* Qué se logró salvar en la realidad del incidente (ej. continuidad de quirófanos o contención técnica del malware).
    *   *Impacto Legal/Cumplimiento:* Las investigaciones, multas o responsabilidades administrativas que arriesga al violar la literalidad del texto normativo.
    *   *Impacto Axiológico:* La tensión entre los principios éticos en colisión y la coherencia de su argumento frente a la cultura de la organización.
    *   *Evidencia Factual:* El fragmento de la ley y el artículo exacto (extraídos del corpus regulatorio) que fundamentan el impacto legal.

---

## 5. Metodología de Recolección de Datos (Variables del Experimento)

Para evaluar científicamente el impacto de este rediseño en las tres condiciones experimentales (Grupo A: Consulta Manual; Grupo B: LLM Genérico; Grupo C: Motor Multi-Agente RAG con Pausa de Gobernanza), el Arnés Académico recolectará de forma automatizada las siguientes variables por participante:

### A. Variables Cuantitativas (Métricas de Desempeño)
1.  **Latencia de Decisión ($T_D$):** Tiempo medido en segundos desde que se presenta el dilema hasta que el participante selecciona su acción y su correspondiente justificación en la Pausa de Gobernanza.
2.  **Precisión Factual ($P_F$):** Porcentaje de aciertos al identificar plazos regulatorios y autoridades competentes en las preguntas previas.
3.  **Tasa de Infracción Consciente ($I_C$):** Frecuencia con la que el usuario decide desviarse de la norma formal teniendo conocimiento exacto de ella (es decir, acierta la precisión factual pero elige una opción alternativa justificada), lo cual mide el criterio crítico del analista frente a la rigidez automática.
4.  **Consistencia Ético-Organizacional ($C_{EO}$):** Mapeo de si el escudo argumentativo seleccionado por el usuario en la Pausa de Gobernanza guarda coherencia lógica con el marco ético institucional (ej. en el escenario del Hospital, si eligió pagar el rescate y seleccionó la justificación principialista de No Maleficencia).

### B. Variables Cualitativas (Encuesta Postest)
Al finalizar las tres corridas experimentales, cada participante responderá un cuestionario de escala Likert (1 a 5) para medir:
1.  **Percepción de Confort Ético:** Si la interfaz del simulador le permitió tomar la decisión que consideraba correcta sin forzarlo a un cumplimiento formal perjudicial.
2.  **Claridad Pedagógica:** Si el Tablero de Consecuencias facilitó la comprensión de los impactos reales y la tensión axiológica detrás de su decisión.
3.  **Confianza en el Soporte de Decisiones:** El grado de certidumbre que sintió al justificar su postura legal ante las autoridades.

---

## 6. Resultados Esperados y Conclusiones de la Investigación

A partir de los datos recolectados, la investigación aspira a llegar a las siguientes conclusiones científicas:

### Conclusión 1: Mitigación del "Sesgo de Automatización" (Automation Bias)
El sesgo de automatización ocurre cuando el humano cede su criterio moral y técnico ante la recomendación automática de una máquina ("el sistema dice que es incorrecto pagar, por lo tanto no pago"). 
*   *Resultado esperado:* Demostrar que el flujo de **Pausa de Gobernanza** y **Tablero de Consecuencias** (Grupo C) incentiva el pensamiento crítico y la toma de responsabilidad humana. Los datos mostrarán que los participantes del Grupo C logran justificar éticamente desviaciones normativas necesarias para salvar vidas o estabilizar sistemas, mientras que el Grupo B (LLM Genérico) induce a decisiones rígidas o erráticas por falta de contexto institucional.

### Conclusión 2: Incremento de la Calidad Argumentativa del Profesional
*   *Resultado esperado:* Demostrar que la combinación de RAG (que inyecta la ley exacta) con la Pausa de Gobernanza eleva la coherencia del analista. El participante no solo decide "qué hacer", sino que aprende a estructurar justificaciones sólidas basadas en la ponderación constitucional (Nivel 2) y ética (Nivel 3). Los datos de *Consistencia Ético-Organizacional* ($C_{EO}$) serán significativamente mayores en el Grupo C.

### Conclusión 3: Viabilidad del Enfoque "Human-in-the-Loop" (HITL) para la Gobernanza de IA
*   *Resultado esperado:* Validar que en dominios de alta responsabilidad (Derecho y Ciberseguridad), la Inteligencia Artificial no debe funcionar como un agente autónomo ni como un calificador punitivo, sino como un **Sistema de Soporte a la Decisión (DSS)**. La investigación concluirá aportando evidencia empírica de que la explicabilidad factual combinada con la reflexión ética es el camino idóneo para cerrar la "Brecha de Responsabilidad" (Responsibility Gap) en el uso de IA pública y soberana.
