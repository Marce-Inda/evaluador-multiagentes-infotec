# Propuestas de Mejora de Diseño: Gobernanza, Ética y Toma de Decisiones en Ciberseguridad

Este documento recopila las decisiones de diseño metodológico, pedagógico y sociotécnico tomadas a partir de la retroalimentación del **Dr. Federico César Lefranc Weegan** (INFOTEC) para el simulador **The Responder 2.0 (Incident Responder)**. Su propósito es servir como registro de avance y base para la comunicación académica con el mentor.

---

## 1. El Diagnóstico: Del Cumplimiento Rígido a la Legitimación en Crisis

### El Problema del Enfoque Original
Originalmente, el simulador evaluaba el comportamiento del usuario en base a un **positivismo formal (cumplimiento binario)**:
*   Si la ley estipula un plazo de 24 horas y el usuario reporta en ese plazo, se consideraba "correcto".
*   Si la ley prohíbe pagar extorsiones y el usuario decide pagar para restablecer el servicio de un hospital en urgencias, se consideraba "incorrecto" y se le penalizaba.

**Limitación Académica y Práctica:** En el mundo real de la ciberseguridad transfronteriza, las decisiones se toman bajo colisiones de deberes normativos. Castigar de forma binaria una acción fáctica que busca salvar vidas o evitar colapsos sistémicos debilita el valor didáctico de la simulación y desdibuja la complejidad del rol del CISO.

### La Premisa del Mentor
> *"El derecho -la norma- no causa la conducta, únicamente la legitima."*

Ante un incidente, existen dos respuestas:
1.  **La acción fáctica idónea:** La contención operativa de la crisis.
2.  **La legitimación profunda:** Los argumentos (legales, constitucionales y éticos) que justifican esa acción fáctica ante la colisión de normas.

---

## 2. Decisiones de Rediseño del Flujo de Usuario (Human-in-the-Loop)

Para evitar que la Inteligencia Artificial actúe como un "juez de respuestas correctas", el simulador se rediseñará bajo un enfoque de **Simulador de Consecuencias y Ponderación**:

### Mejora A: La "Pausa de Gobernanza" (Scaffolding Pedagógico)
*   **Qué es:** Una ventana emergente intermedia que aparece cuando el usuario toma una decisión que viola la literalidad de una norma pero atiende a un bien mayor (ej. pagar el rescate o retrasar una notificación).
*   **Propósito:** En lugar de requerir que el usuario redacte teoría legal (lo cual restaría agilidad didáctica), se le presentan opciones estructuradas de **escudos argumentativos** para que elija cómo pretende justificar su decisión.
*   **Opciones de Justificación:**
    *   *Estado de Necesidad:* Justificación de romper una ley ordinaria menor para salvaguardar un bien supremo (ej. la salud de pacientes críticos bajo el Art. 4º Constitucional).
    *   *Cálculo de Consecuencias (Utilitarismo):* Ponderación de que el impacto económico o regulatorio directo es inferior al impacto del downtime operativo general.
    *   *Deber de Cuidado Inmediato (Principialismo/No Maleficencia):* Priorizar la mitigación del daño directo sobre los involucrados activos antes que el cumplimiento abstracto de metas institucionales.

### Mejora B: El "Tablero de Consecuencias e Impactos" (El Rol de No-Juez)
*   **Qué es:** Una pantalla de resultados tridimensional al finalizar cada escenario en la que no existe una calificación de "aprobado/reprobado".
*   **Estructura del Tablero:**
    1.  **Dimensión Operativa/Fáctica:** ¿Qué lograste salvar o mitigar en la realidad? (Ej. "0 muertes registradas", "sistemas operativos en 6 horas").
    2.  **Dimensión Legal/Formal:** ¿Qué sanciones o investigaciones arriesgas por violar la literalidad del texto normativo? (Ej. "Riesgo de investigación por parte de la OFAC").
    3.  **Dimensión Ética/Axiológica:** Muestra la tensión entre los marcos éticos en conflicto. (Ej. *"Priorizaste la No Maleficencia con tus pacientes activos, pero pusiste en tensión el principio de Justicia al desviar fondos públicos hacia extorsionadores"*).

---

## 3. Elementos Adicionales Planteados por el Mentor (Por Resolver)

Además de los niveles normativos e ius-fundamentales, el Dr. Lefranc plantea un aspecto crítico que debemos analizar para la base de conocimientos del simulador:

### La Tensión Ética: Utilitarismo vs. Principialismo
El mentor señala que para valorar éticamente una conducta debe haber una **postura común previa** entre los actores. En tecnología digital, el utilitarismo (cálculo de costos y beneficios para la mayoría) es la perspectiva dominante.

#### La Pregunta Guía: *"¿Quién es legítimo que se beneficie por el cumplimiento de la norma?"*
Esto nos obliga a estructurar cómo la base de conocimientos RAG y el motor de IA evalúan las opciones. Debemos examinar esta pregunta en cada uno de los tres escenarios:

1.  **Escenario de Uruguay (Finanzas):** 
    *   Si se cumple formalmente el plazo de 24 horas y se reporta inmediatamente un hackeo sensible que provoca una corrida bancaria:
        *   *¿Quién se beneficia legítimamente del cumplimiento?* ¿El regulador (para resguardar su métrica de control) o los ahorradores? 
        *   *Conflicto:* Cumplir la norma formal beneficia la burocracia, pero perjudica gravemente a los usuarios de la banca.

2.  **Escenario de México (Salud):**
    *   Si el hospital se apega a la política rígida de no pagar el ransomware, perdiendo capacidad en urgencias:
        *   *¿Quién se beneficia del cumplimiento?* El Estado (al evitar el financiamiento indirecto del crimen organizado) o el hospital (al evitar multas de la OFAC).
        *   *Conflicto:* El beneficio abstracto del Estado se logra a costa de la muerte concreta de pacientes en el quirófano.

3.  **Escenario de Chile-Brasil (Retail transfronterizo):**
    *   Si se alerta públicamente a los consumidores chilenos en 3 horas según exige el CSIRT, antes de aplicar el parche en la base de datos de Brasil:
        *   *¿Quién se beneficia del cumplimiento?* ¿Los competidores o los atacantes de imitación que descubran la vulnerabilidad expuesta?
        *   *Conflicto:* Cumplir con la inmediatez regulatoria desprotege técnicamente la infraestructura, perjudicando a la larga a los mismos consumidores que se pretendía proteger.

---

## 4. Estructura Pedagógica: Tres Escenarios, Tres Marcos Éticos

Para garantizar que el jugador aprenda de manera práctica las diferencias entre las principales familias de la ética aplicada, cada escenario del simulador estará anclado a un **acuerdo previo de marco ético (cultura institucional)** diferente:

### Escenario 1: Sector Financiero (Uruguay) -> Marco: Utilitarismo (Consecuencialismo)
*   **Cultura Institucional:** La directiva prioriza la **estabilidad sistémica y continuidad operativa** por encima de formalidades burocráticas. Se evalúa el éxito midiendo la minimización del daño financiero y reputacional colectivo (costo-beneficio).
*   **El Aprendizaje para el Jugador:** Aprender a calcular consecuencias a gran escala. Comprender que a veces retrasar un reporte (asumiendo multas locales) es la mejor decisión para evitar un colapso macroeconómico.

### Escenario 2: Sector Salud (México) -> Marco: Principialismo Bioético
*   **Cultura Institucional:** La clínica está regida por los principios de **No Maleficencia** (no hacer daño directo) y **Beneficencia** hacia el paciente. 
*   **El Aprendizaje para el Jugador:** Comprender que la vida humana y la salud son principios absolutos y no negociables. El jugador experimenta que ante una crisis médica, las leyes de seguridad pública (no financiar al crimen) entran en conflicto y deben ser ponderadas frente a un deber de cuidado inmediato.

### Escenario 3: Sector Retail (Chile-Brasil) -> Marco: Deontología (Ética del Deber y Transparencia)
*   **Cultura Institucional:** La empresa tiene un compromiso de Responsabilidad Social Corporativa basado en la **transparencia contractual y el respeto a la autonomía del cliente**. Su máxima es: *"El cliente tiene el derecho inalienable de saber de inmediato qué datos se exfiltraron"*.
*   **El Aprendizaje para el Jugador:** Experimentar la ética basada en el deber moral y el respeto al individuo. El jugador aprende que ocultar un parche para "proteger el sistema" (que sería una justificación utilitaria) viola la autonomía del cliente, obligándolo a confrontar que ser ético bajo la deontología implica asumir pérdidas técnicas y reputacionales inmediatas en favor de la honestidad.

---

## 5. Estrategia de Implementación Técnica en el Arnés Académico

### Respuesta a la Pregunta Crítica de la Investigadora
**¿Debo modificar el proyecto base "The Responder" o el código deslindado del Arnés Académico?**
> [!IMPORTANT]
> **Debes implementar estos cambios directamente en el código del Arnés Académico (este repositorio / app.js).** 
>
> **Por qué:** El Arnés Académico es la herramienta de medición científica del experimento con los 30-45 participantes en INFOTEC. Si el Arnés sigue programado con el modelo de evaluación binario antiguo, los datos empíricos de precisión, latencia y alucinaciones que recopiles medirán un paradigma rígido e inadecuado. Al implementar el rediseño en el código del Arnés, el experimento validará si la asistencia del motor multi-agente RAG (Grupo C) realmente mejora la toma de decisiones complejas y la capacidad argumentativa ética de los usuarios en condiciones de crisis real. Una vez validada científicamente la efectividad en el Arnés, se podrá portar esta lógica al juego comercial "The Responder".

### Cómo se lleva a cabo utilizando el Corpus Regulatorio (`regulatory_corpus.json`)
El flujo técnico de datos para dar soporte a este nuevo diseño utilizará la arquitectura RAG y el servidor MCP de la siguiente manera:

```
                              [ Interfaz del Arnés (app.js) ]
                                             │
             ┌───────────────────────────────┴───────────────────────────────┐
             ▼ (Selección de Acción)                                         ▼ (Invocación RAG)
   [ Acción del Usuario ]                                            [ Consulta al Corpus Vectorial ]
             │                                                               │
             ▼                                                               ▼
 [ Pausa de Gobernanza ]                                             [ Recuperación de Normas ]
 (Usuario elige justificación)                                       (Texto legal + Referencia local)
             │                                                               │
             └───────────────────────────────┬───────────────────────────────┘
                                             ▼
                                   [ Validator Agent (IA) ]
                      Compara: Acción + Justificación vs. Norma + Alcance
                                             │
                                             ▼
                               [ Tablero de Consecuencias ]
                        (Feedback Operativo, Legal y Ético en UI)
```

1.  **Carga del Contexto:** Al inicializar un escenario en la UI (`app.js`), se inyecta la ficha de cultura institucional (Ej. Principialismo para el Hospital) que establece el "acuerdo previo".
2.  **Invocación del RAG:** Ante la decisión de cumplimiento, el motor multi-agente consulta el corpus (`regulatory_corpus.json` o base vectorial ChromaDB). Recupera la norma aplicable, su *alcance* (fines declarados de la norma) y sus *límites*.
3.  **Procesamiento de la "Pausa de Gobernanza":** El sistema captura la acción (ej. Pagar rescate) y el escudo argumentativo seleccionado por el usuario.
4.  **Generación del Dictamen en el Back-End (FastAPI) y Explicabilidad Factual:**
    *   **Lo que ve el Jugador (Frontend):** Para maximizar la retención didáctica y reducir la carga cognitiva, el simulador **no mostrará hashes criptográficos al usuario**. En su lugar, el `Tablero de Consecuencias` mostrará la **citación textual exacta de la ley** y su localización (*Ej: "De acuerdo con el Artículo 48, párrafo segundo de la LGPD de Brasil..."*). Esto permite al usuario contrastar su decisión directamente con la fuente del derecho.
    *   **Lo que procesa la Arquitectura (Backend):** El hash SHA-256 del fragmento legal recuperado del corpus se mantiene en segundo plano de forma invisible para el usuario. Se utiliza como mecanismo de **auditoría interna de alucinaciones** para corroborar científicamente en el arnés que el `Validator Agent` no inventó ni alteró el fragmento de la ley que le presentó al jugador.
5.  **Renderizado en Pantalla:** `app.js` recibe el JSON de impacto y renderiza el **Tablero de Consecuencias** de manera interactiva, mostrando las tensiones y permitiendo al jugador aprender sobre las repercusiones de su criterio.
