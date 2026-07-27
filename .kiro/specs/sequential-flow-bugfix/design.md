# Sequential Flow Bugfix Design

## Overview

El flujo de transición secuencial entre corridas intermedias (1→2 y 2→3) en `evaluateQuiz()` presenta cuatro defectos interconectados que bloquean la progresión automática del participante. El defecto principal es un `ReferenceError` causado por el acceso a la variable local `isProduction` fuera de su scope. Los defectos secundarios (navegación incorrecta a Fase 2, cronómetro no reiniciado, y formulario no limpiado) se manifiestan una vez corregido el primero. La estrategia de corrección es mínima e invasiva solo en el bloque de transición intermedia de `evaluateQuiz()` y en la asignación inicial de `isProduction`.

## Glossary

- **Bug_Condition (C)**: La condición que dispara el bug — `evaluateQuiz()` ejecuta el bloque de corridas intermedias (`appState.runNumber < 3`) y referencia `isProduction` que no existe en su scope global.
- **Property (P)**: El comportamiento deseado — la transición intermedia presenta directamente el siguiente escenario en Fase 3, con cronómetro reiniciado y formulario limpio, sin errores de referencia.
- **Preservation**: El comportamiento existente de corrida final (Fase 5), validación de formulario, modal de Pausa de Gobernanza, persistencia en Firestore/CSV, y `setupExperimentalUI()` deben permanecer intactos.
- **evaluateQuiz()**: Función global en `app.js` (línea 1578) que calcula score, persiste datos, y controla la transición entre corridas.
- **setupExperimentalUI(group, isProduction)**: Función en `app.js` (línea 1982) que configura la visibilidad de paneles/tabs según el grupo activo y oculta el botón demo en producción.
- **setupScenario(id)**: Función en `app.js` (línea 996) que configura el DOM de Fase 3 con el dilema, decisión, cultura ética y regulaciones del escenario activo.
- **startStopwatch()**: Función en `app.js` (línea 1026) que inicia el cronómetro invisible para medir latencia humana de decisión.
- **appState**: Objeto global que mantiene el estado de la aplicación experimental.

## Bug Details

### Bug Condition

El bug se manifiesta cuando `evaluateQuiz()` ejecuta el bloque de transición intermedia (corridas 1→2 o 2→3). La variable `isProduction` es declarada dentro del callback `DOMContentLoaded` (línea 680) como `const isProduction = urlParams.get('production') === 'true'`, lo que la hace inaccesible desde `evaluateQuiz()` que opera en scope global. Además, incluso si se resolviera el ReferenceError, la transición usa `showPhase(2)` que fuerza una navegación manual innecesaria, no reinicia el cronómetro, y no limpia el formulario previo.

**Formal Specification:**
```
FUNCTION isBugCondition(input)
  INPUT: input of type AppState (estado al momento de invocar evaluateQuiz)
  OUTPUT: boolean
  
  RETURN input.runNumber < 3
         AND evaluateQuiz() reaches intermediate transition block
         AND (isProduction is NOT in accessible scope
              OR transition calls showPhase(2) instead of showPhase(3)
              OR startStopwatch() is NOT called after reset
              OR quiz form radio buttons are NOT explicitly cleared)
END FUNCTION
```

### Examples

- **Corrida 1→2 (ReferenceError)**: Participante completa corrida 1, `evaluateQuiz()` ejecuta, llega a `setupExperimentalUI(appState.activeGroup, isProduction)` → `ReferenceError: isProduction is not defined` → la transición aborta, el participante queda atrapado en Fase 4.
- **Corrida 1→2 (Navegación incorrecta, si se corrigiera solo el scope)**: El sistema llama `showPhase(2)` mostrando la pantalla de "Selección de Escenario" con el título de corrida 2, forzando un clic manual en "Comenzar" en lugar de fluir directamente a Fase 3.
- **Corrida 2→3 (Cronómetro no reiniciado)**: `appState.stopwatchElapsed = 0` se asigna pero `startStopwatch()` no se invoca, causando que `stopStopwatch()` al final de corrida 3 calcule latencia desde el `stopwatchStart` de corrida 2 (valor stale).
- **Corrida 1→2 (Formulario sucio)**: Los radio buttons de las preguntas Q1, Q2, Q3 del escenario anterior retienen `checked` y la clase `.selected` en `.option-item` hasta que `setupPhase4()` regenera el DOM — pero si el participante ve Fase 4 brevemente antes de la regeneración, observa respuestas del escenario anterior.

## Expected Behavior

### Preservation Requirements

**Unchanged Behaviors:**
- La corrida final (run 3 de 3) debe continuar mostrando Fase 5 con resúmenes de cumplimiento via `renderFinalComplianceSummaries()` y `showPhase(5)`.
- La validación de formulario incompleto (alertas de preguntas sin responder) debe seguir funcionando.
- El modal de Pausa de Gobernanza debe continuar abriéndose cuando no hay justificación seleccionada.
- La persistencia en `appState.csvLogs` y Firestore debe continuar registrando todos los campos correctos.
- `setupExperimentalUI()` debe seguir configurando paneles/tabs según grupo y ocultando demo en producción.
- El modo demo debe funcionar con el mismo flujo corregido.
- El reseteo de estado temporal (`appState.selectedJustification = null`, `appState.lastGroupCExplanation = null`, etc.) debe mantenerse antes de la bifurcación.

**Scope:**
Todos los inputs donde `appState.runNumber >= 3` (corrida final) o donde `evaluateQuiz()` no alcanza el bloque de transición intermedia deben ser completamente no afectados por este fix. Esto incluye:
- Flujo de corrida final (run 3 → Fase 5)
- Validaciones previas a la transición (formulario incompleto, justificación pendiente)
- Persistencia de datos (CSV y Firestore)
- Interacciones con la búsqueda manual (Grupo A)
- Respuestas de IA (Grupo B y C)

## Hypothesized Root Cause

Based on the bug description and code analysis, the confirmed issues are:

1. **Scope Closure de `isProduction`**: La variable se declara con `const` dentro del callback anónimo de `DOMContentLoaded` (línea 680). Este callback es una closure que no expone `isProduction` al scope global donde vive `evaluateQuiz()`. JavaScript scope rules impiden el acceso cross-function a variables locales de otra función.

2. **Navegación a Fase incorrecta**: El bloque de transición intermedia (línea 1714) invoca `showPhase(2)` que muestra la pantalla de selección/asignación de escenario. Esto requiere que el participante haga clic en "Comenzar Corrida" manualmente, rompiendo la promesa de flujo "directo" documentada en el código (`// Pasar DIRECTAMENTE a la siguiente corrida`).

3. **Cronómetro no reiniciado**: Se ejecuta `appState.stopwatchElapsed = 0` (línea 1695) para resetear el valor persistido, pero `startStopwatch()` — que asigna `appState.stopwatchStart = performance.now()` — nunca se invoca. Cuando `stopStopwatch()` se ejecute en la siguiente corrida, calculará `(performance.now() - stopwatchStart_viejo) / 1000`, produciendo una latencia inflada.

4. **Formulario no limpiado**: El código resetea `appState.answers = {}` y oculta contenedores de respuestas IA, pero no toca los radio buttons del DOM ni las clases `.selected` de `.option-item` en `#quiz-questions-container`. Aunque `setupPhase4()` regenera el innerHTML del contenedor, hay una ventana temporal donde el estado visual previo persiste.

## Correctness Properties

Property 1: Bug Condition - Transición Intermedia Completa Sin Errores

_For any_ input where `appState.runNumber < 3` and `evaluateQuiz()` reaches the intermediate transition block, the fixed function SHALL complete the transition without `ReferenceError`, presenting Phase 3 directly with the next scenario loaded (`setupScenario()`), experimental UI configured (`setupExperimentalUI()`), stopwatch restarted (`startStopwatch()`), and quiz form cleaned (radio buttons unchecked, `.selected` classes removed).

**Validates: Requirements 2.1, 2.2, 2.3, 2.4**

Property 2: Preservation - Corrida Final y Flujo Existente

_For any_ input where `appState.runNumber >= 3` (final run) OR where `evaluateQuiz()` does not reach the intermediate transition block, the fixed function SHALL produce exactly the same behavior as the original function, preserving the final summary display (Phase 5), form validation alerts, governance pause modal, data persistence (CSV/Firestore), and `setupExperimentalUI()` behavior.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7**

## Fix Implementation

### Changes Required

Assuming our root cause analysis is correct:

**File**: `app.js`

**Scope Change (Issue 1)**:

**Location**: Inside `DOMContentLoaded` callback, after line 680 where `isProduction` is declared.

**Change**: Store `isProduction` in `appState` so it's globally accessible:
```javascript
// After: const isProduction = urlParams.get('production') === 'true';
appState.isProduction = isProduction;
```

**Intermediate Transition Block (Issues 1-4)**:

**Location**: Inside `evaluateQuiz()`, the block under `if (appState.runNumber < 3)` (lines ~1690-1715).

**Specific Changes**:

1. **Replace `isProduction` reference with `appState.isProduction`**: Change `setupExperimentalUI(appState.activeGroup, isProduction)` to `setupExperimentalUI(appState.activeGroup, appState.isProduction)` — eliminates the ReferenceError.

2. **Add quiz form cleanup before transition**: Before incrementing `appState.runNumber`, clear all radio buttons and `.selected` classes:
   ```javascript
   // Limpieza explícita del formulario quiz anterior
   const quizContainer = document.getElementById("quiz-questions-container");
   if (quizContainer) {
       quizContainer.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false);
       quizContainer.querySelectorAll('.option-item').forEach(item => item.classList.remove('selected'));
   }
   ```

3. **Replace `showPhase(2)` with direct Phase 3 setup**: Instead of routing through the scenario selection screen, call the appropriate setup functions directly:
   ```javascript
   setupScenario(appState.selectedScenarioId);
   setupExperimentalUI(appState.activeGroup, appState.isProduction);
   showPhase(3);
   startStopwatch();
   ```

4. **Remove the now-redundant `setupExperimentalUI` call**: The original call before `showPhase(2)` is replaced by the one in the new direct transition sequence.

5. **Resulting block structure** (after all changes applied):
   ```javascript
   if (appState.runNumber < 3) {
       // CORRIDAS INTERMEDIAS: Transición DIRECTA al siguiente escenario
       appState.answers = {};
       appState.quizScore = 0;
       appState.iaLatency = 0;
       appState.stopwatchElapsed = 0;
       
       // Limpieza explícita del formulario quiz anterior
       const quizContainer = document.getElementById("quiz-questions-container");
       if (quizContainer) {
           quizContainer.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false);
           quizContainer.querySelectorAll('.option-item').forEach(item => item.classList.remove('selected'));
       }
       
       const searchInput = document.getElementById("manual-search-input");
       if (searchInput) searchInput.value = "";
       const searchResults = document.getElementById("manual-search-results");
       if (searchResults) searchResults.innerHTML = '<div class="no-results">Realice una búsqueda para consultar la base de datos regulatoria.</div>';
       
       const bResp = document.getElementById("group-b-response-container");
       if (bResp) bResp.classList.add("hidden");
       const cResp = document.getElementById("group-c-response-container");
       if (cResp) cResp.classList.add("hidden");
       const btnPhase4 = document.getElementById("btn-to-phase-4");
       if (btnPhase4) btnPhase4.disabled = true;

       appState.runNumber += 1;
       
       const { group, scenarioId } = getExperimentParameters(appState.startingGroup, appState.runNumber);
       appState.activeGroup = group;
       appState.selectedScenarioId = scenarioId;

       setupScenario(appState.selectedScenarioId);
       setupExperimentalUI(appState.activeGroup, appState.isProduction);
       showPhase(3);
       startStopwatch();
   }
   ```

## Testing Strategy

### Validation Approach

The testing strategy follows a two-phase approach: first, surface counterexamples that demonstrate the bug on unfixed code, then verify the fix works correctly and preserves existing behavior.

### Exploratory Bug Condition Checking

**Goal**: Surface counterexamples that demonstrate the bug BEFORE implementing the fix. Confirm or refute the root cause analysis. If we refute, we will need to re-hypothesize.

**Test Plan**: Execute `evaluateQuiz()` in a simulated DOM environment with `appState.runNumber = 1` and verify that the function throws `ReferenceError` and that even in patched scope scenarios, `showPhase(2)` is called instead of `showPhase(3)`. Run these tests on the UNFIXED code to observe failures.

**Test Cases**:
1. **ReferenceError Test**: Invoke `evaluateQuiz()` with `appState.runNumber = 1` after completing a valid quiz — observe `ReferenceError: isProduction is not defined` (will fail on unfixed code)
2. **Navigation Target Test**: Patch `isProduction` into global scope temporarily, invoke `evaluateQuiz()` with run 1 — observe that `showPhase(2)` is called instead of `showPhase(3)` (demonstrates Issue 2 on unfixed code)
3. **Stopwatch State Test**: After intermediate transition, check `appState.stopwatchStart` — observe it retains the stale value from the previous run (demonstrates Issue 3 on unfixed code)
4. **Form Cleanup Test**: After intermediate transition, query `#quiz-questions-container .option-item.selected` — observe elements still have `.selected` class (demonstrates Issue 4 on unfixed code)

**Expected Counterexamples**:
- `evaluateQuiz()` throws `ReferenceError` at line 1714 on `isProduction`
- If patched, visible phase after transition is Phase 2 (selector screen) not Phase 3 (scenario)
- `appState.stopwatchStart` not updated after transition
- DOM elements retain stale `.selected` classes

### Fix Checking

**Goal**: Verify that for all inputs where the bug condition holds, the fixed function produces the expected behavior.

**Pseudocode:**
```
FOR ALL input WHERE isBugCondition(input) DO
  result := evaluateQuiz_fixed(input)
  ASSERT no ReferenceError thrown
  ASSERT visiblePhase == 3
  ASSERT setupScenario was called with correct scenarioId
  ASSERT setupExperimentalUI was called with (activeGroup, appState.isProduction)
  ASSERT appState.stopwatchStart is fresh (performance.now() at transition time)
  ASSERT no .option-item has class 'selected' in quiz-questions-container
  ASSERT no radio button is checked in quiz-questions-container
END FOR
```

### Preservation Checking

**Goal**: Verify that for all inputs where the bug condition does NOT hold, the fixed function produces the same result as the original function.

**Pseudocode:**
```
FOR ALL input WHERE NOT isBugCondition(input) DO
  ASSERT evaluateQuiz_original(input) = evaluateQuiz_fixed(input)
END FOR
```

**Testing Approach**: Property-based testing is recommended for preservation checking because:
- It generates many test cases automatically across the input domain (different quiz answers, groups, scenarios)
- It catches edge cases that manual unit tests might miss (unusual appState combinations)
- It provides strong guarantees that behavior is unchanged for all non-intermediate-transition paths

**Test Plan**: Observe behavior on UNFIXED code first for final run transitions and validation paths, then write property-based tests capturing that behavior.

**Test Cases**:
1. **Final Run Preservation**: Verify that with `appState.runNumber = 3`, `evaluateQuiz()` calls `renderFinalComplianceSummaries()` and `showPhase(5)` — unchanged after fix
2. **Validation Preservation**: Verify that incomplete form (missing radio selections) triggers alert — unchanged after fix
3. **Governance Modal Preservation**: Verify that first submission without justification opens governance pause modal — unchanged after fix
4. **Data Persistence Preservation**: Verify that `appState.csvLogs` receives correct entry with all fields — unchanged after fix
5. **Firestore Persistence Preservation**: Verify that Firestore `add()` is called with correct payload — unchanged after fix

### Unit Tests

- Test that `appState.isProduction` is correctly set during `DOMContentLoaded` for both `?production=true` and default cases
- Test that intermediate transition (run 1→2) completes without errors and shows Phase 3
- Test that intermediate transition (run 2→3) completes without errors and shows Phase 3
- Test that `startStopwatch()` is called during intermediate transition (fresh `stopwatchStart`)
- Test that quiz form radio buttons are unchecked after transition
- Test that `.option-item.selected` classes are removed after transition
- Test that `setupScenario()` is called with the correct `scenarioId` from `getExperimentParameters()`

### Property-Based Tests

- Generate random `appState` configurations with `runNumber ∈ {1, 2}` and verify the transition always reaches Phase 3 without errors
- Generate random `appState` configurations with `runNumber = 3` and verify Phase 5 is always shown (preservation)
- Generate random quiz answer combinations and verify `csvLogs` entry is always correctly formed regardless of transition path

### Integration Tests

- Test full 3-run experimental flow: complete run 1 → automatic transition → complete run 2 → automatic transition → complete run 3 → Phase 5 summary
- Test that each run uses the correct scenario from the Latin Square counterbalancing matrix
- Test that stopwatch latency values are independent per run (no accumulation)
- Test that the participant never sees Phase 2 between intermediate runs
