# Bugfix Requirements Document

## Introduction

El flujo de ejecución secuencial entre escenarios (corridas 1→2→3) en el Evaluador Multiagentes INFOTEC presenta cuatro defectos que impiden la transición correcta entre escenarios intermedios. El más crítico es un `ReferenceError` al invocar `setupExperimentalUI(appState.activeGroup, isProduction)` desde la función global `evaluateQuiz()`, donde `isProduction` es una variable local del callback `DOMContentLoaded` y no está accesible en ese scope. Adicionalmente, la transición fuerza al participante a regresar a Fase 2 manualmente, el cronómetro no se reinicia, y no se garantiza la limpieza visual completa del formulario anterior.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN `evaluateQuiz()` ejecuta la transición intermedia (corrida 1→2 o 2→3) THEN el sistema lanza un `ReferenceError: isProduction is not defined` porque la variable `isProduction` es local al callback `DOMContentLoaded` y no es accesible desde la función global `evaluateQuiz()`.

1.2 WHEN la transición intermedia se ejecuta (si no fallara por Issue 1) THEN el sistema llama `showPhase(2)` forzando al participante a ver la pantalla de "Selección de Escenario" y hacer clic manualmente en "Comenzar Corrida" en lugar de fluir directamente al siguiente escenario.

1.3 WHEN la transición intermedia se ejecuta THEN el sistema resetea `appState.stopwatchElapsed = 0` pero NO reinicia el cronómetro con `startStopwatch()`, provocando que la medición de latencia humana del siguiente escenario sea incorrecta o acumulada desde el escenario anterior.

1.4 WHEN la transición intermedia se ejecuta THEN el sistema no limpia explícitamente los radio buttons del formulario quiz ni remueve las clases `.selected` de los `.option-item` del escenario anterior, dejando posibles rastros visuales si la regeneración del DOM no es completa.

### Expected Behavior (Correct)

2.1 WHEN `evaluateQuiz()` ejecuta la transición intermedia (corrida 1→2 o 2→3) THEN el sistema SHALL invocar `setupExperimentalUI()` con el valor de `isProduction` accesible correctamente (almacenado en `appState` o como variable de módulo), sin lanzar errores de referencia.

2.2 WHEN la transición intermedia se ejecuta exitosamente THEN el sistema SHALL presentar directamente el siguiente escenario en Fase 3 (información del caso y soporte de auditoría) sin requerir que el participante pase manualmente por Fase 2 ni haga clic adicional.

2.3 WHEN la transición intermedia se ejecuta THEN el sistema SHALL reiniciar el cronómetro llamando `startStopwatch()` para que la medición de latencia humana del nuevo escenario comience desde cero.

2.4 WHEN la transición intermedia se ejecuta THEN el sistema SHALL limpiar explícitamente todos los radio buttons del formulario quiz (deseleccionarlos) y remover las clases `.selected` de todos los `.option-item` del contenedor de preguntas, garantizando un formulario limpio para el siguiente escenario.

### Unchanged Behavior (Regression Prevention)

3.1 WHEN el participante completa la corrida 3 (última) THEN el sistema SHALL CONTINUE TO mostrar Fase 5 con el resumen consolidado de cumplimiento y los botones "Descargar CSV" y "Terminar y Salir".

3.2 WHEN el participante hace clic en "Enviar Evaluación" sin haber completado todas las preguntas THEN el sistema SHALL CONTINUE TO mostrar la alerta de validación sin proceder.

3.3 WHEN el participante hace clic en "Enviar Evaluación" sin justificación seleccionada (primer clic) THEN el sistema SHALL CONTINUE TO abrir el modal de Pausa de Gobernanza con las justificaciones éticas correspondientes a la opción Q3 seleccionada.

3.4 WHEN el participante confirma su justificación en el modal de Pausa de Gobernanza THEN el sistema SHALL CONTINUE TO cerrar el modal y regresar al formulario de Fase 4, almacenando la justificación en `appState.selectedJustification`.

3.5 WHEN `evaluateQuiz()` se ejecuta exitosamente THEN el sistema SHALL CONTINUE TO registrar los datos de la corrida en `appState.csvLogs` y en Firestore (si está disponible) con todos los campos correctos.

3.6 WHEN el participante está en modo demo THEN el sistema SHALL CONTINUE TO funcionar con el mismo flujo secuencial corregido, sin diferencias de comportamiento.

3.7 WHEN se invoca `setupExperimentalUI()` THEN el sistema SHALL CONTINUE TO configurar la visibilidad de tabs/paneles según el grupo activo y ocultar el botón de modo demo en producción.
