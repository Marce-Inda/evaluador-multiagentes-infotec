# Diagrama del Flujo Secuencial Completo - Modo Demo y Experimento

**Proyecto:** Incident Responder AI 2.0 / Evaluador Multiagentes INFOTEC  
**Fecha de generación:** 2026-07-27  
**Descripción:** Especificación técnica del diagrama de secuencia para el flujo experimental de 3 corridas con Pausa de Gobernanza integrada.

---

## 1. Diagrama de Secuencia Mermaid

```mermaid
flowchart TD
    Start([Inicio / Modo Demo]) --> Phase1[Fase 1: Registro & Credenciales]
    Phase1 --> Phase2_1[Fase 2: Asignación de Corrida 1 / Escenario 1]

    subgraph Escenario1 ["CORRIDA 1 (Escenario 1)"]
        Phase2_1 --> Phase3_1[Fase 3: Análisis del Caso & Herramienta de Soporte A/B/C]
        Phase3_1 -->|Clic en 'Proceder al Cuestionario'| Phase4_1[Fase 4: Cuestionario del Escenario 1]
        Phase4_1 -->|1. Responde Q1, Q2, Q3 + Clic en 'Enviar Evaluación'| CheckJust_1{¿Tiene Justificación Ética?}
        
        CheckJust_1 -->|No| Modal_1[Modal: Pausa de Gobernanza]
        Modal_1 -->|2. Selecciona Escudo Ético + Clic en 'Confirmar'| SaveJust_1[Guarda Justificación y Cierra Modal]
        SaveJust_1 -->|Vuelve a la vista del Cuestionario| Phase4_1
        
        CheckJust_1 -->|Sí| SaveRun1[3. Registra Datos de Corrida 1 + Reinicia Formulario]
    end

    SaveRun1 --> Phase2_2[Fase 2: Asignación de Corrida 2 / Escenario 2]

    subgraph Escenario2 ["CORRIDA 2 (Escenario 2)"]
        Phase2_2 --> Phase3_2[Fase 3: Análisis del Caso & Herramienta de Soporte B/C/A]
        Phase3_2 -->|Clic en 'Proceder al Cuestionario'| Phase4_2[Fase 4: Cuestionario del Escenario 2]
        Phase4_2 -->|1. Responde Q1, Q2, Q3 + Clic en 'Enviar Evaluación'| CheckJust_2{¿Tiene Justificación Ética?}
        
        CheckJust_2 -->|No| Modal_2[Modal: Pausa de Gobernanza]
        Modal_2 -->|2. Selecciona Escudo Ético + Clic en 'Confirmar'| SaveJust_2[Guarda Justificación y Cierra Modal]
        SaveJust_2 -->|Vuelve a la vista del Cuestionario| Phase4_2
        
        CheckJust_2 -->|Sí| SaveRun2[3. Registra Datos de Corrida 2 + Reinicia Formulario]
    end

    SaveRun2 --> Phase2_3[Fase 2: Asignación de Corrida 3 / Escenario 3]

    subgraph Escenario3 ["CORRIDA 3 (Escenario 3)"]
        Phase2_3 --> Phase3_3[Fase 3: Análisis del Caso & Herramienta de Soporte C/A/B]
        Phase3_3 -->|Clic en 'Proceder al Cuestionario'| Phase4_3[Fase 4: Cuestionario del Escenario 3]
        Phase4_3 -->|1. Responde Q1, Q2, Q3 + Clic en 'Enviar Evaluación'| CheckJust_3{¿Tiene Justificación Ética?}
        
        CheckJust_3 -->|No| Modal_3[Modal: Pausa de Gobernanza]
        Modal_3 -->|2. Selecciona Escudo Ético + Clic en 'Confirmar'| SaveJust_3[Guarda Justificación y Cierra Modal]
        SaveJust_3 -->|Vuelve a la vista del Cuestionario| Phase4_3
        
        CheckJust_3 -->|Sí| SaveRun3[3. Registra Datos de Corrida 3]
    end

    SaveRun3 --> Phase5[Fase 5: Resumen Consolidado de Cumplimiento & Descarga CSV]
    Phase5 --> End([Fin de la Evaluación])
```

---

## 2. Descripción Paso a Paso del Protocolo

1. **Paso 1 (Primer clic en "Enviar Evaluación"):**
   - El participante responde las 3 preguntas en la **Fase 4**.
   - Al presionar **Enviar Evaluación**, el sistema detecta que la pregunta de decisión de cumplimiento no cuenta aún con una justificación ética guardada.
   - Se despliega la ventana modal emergente de la **Pausa de Gobernanza**.

2. **Paso 2 (Confirmar Justificación):**
   - El participante selecciona la tarjeta con el argumento ético/deontológico/utilitarista.
   - Presiona el botón **Confirmar Justificación**.
   - El modal se cierra y el participante **vuelve a la vista del Cuestionario (Fase 4)** con sus opciones seleccionadas y la justificación debidamente registrada en el estado de la sesión.

3. **Paso 3 (Segundo clic en "Enviar Evaluación"):**
   - Al presionar **Enviar Evaluación** nuevamente, el sistema valida que las respuestas están completas y que la justificación ética ya existe.
   - Se guardan en memoria silenciosa (o Firestore) los logs de latencia, precisión y respuestas del Escenario 1.
   - El sistema avanza automáticamente a la tarjeta de la **Corrida 2 (Escenario 2)**.

4. **Ciclo de 3 Corridas:**
   - El mismo proceso paso a paso se repite de manera independiente para el **Escenario 2** y el **Escenario 3**.
   - Tras completar el Escenario 3, el sistema deriva al participante a la **Fase 5 (Resumen Consolidado de Cumplimiento)** donde se puede descargar el informe final en formato CSV.
