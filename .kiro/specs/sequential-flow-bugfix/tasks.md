# Tasks

## Task 1: Store `isProduction` in `appState` for global accessibility [done]
### Description
Add `appState.isProduction` assignment inside the `DOMContentLoaded` callback immediately after `isProduction` is declared (line 680), so that `evaluateQuiz()` and other global functions can access the production flag without scope errors.

### Sub-tasks
- [ ] Add `appState.isProduction = isProduction;` after line 680 (`const isProduction = urlParams.get('production') === 'true';`)
- [ ] Verify no other references to the local `isProduction` need updating (closures within DOMContentLoaded can still use the local variable)

## Task 2: Fix intermediate transition in `evaluateQuiz()` to go directly to Phase 3 [done]
### Dependencies
- Task 1

### Description
Replace the intermediate transition block in `evaluateQuiz()` (the `if (appState.runNumber < 3)` branch) to: (a) clean the quiz form explicitly, (b) use `appState.isProduction` instead of `isProduction`, (c) call `setupScenario()` + `setupExperimentalUI()` + `showPhase(3)` + `startStopwatch()` instead of `showPhase(2)`.

### Sub-tasks
- [ ] Add explicit quiz form cleanup (uncheck radio buttons, remove `.selected` classes from `.option-item`) before incrementing `runNumber`
- [ ] Replace `setupExperimentalUI(appState.activeGroup, isProduction)` with `setupExperimentalUI(appState.activeGroup, appState.isProduction)`
- [ ] Replace `showPhase(2)` with `setupScenario(appState.selectedScenarioId)` + `setupExperimentalUI(appState.activeGroup, appState.isProduction)` + `showPhase(3)` + `startStopwatch()`

## Task 3: Verify regression - Final run (Phase 5) and existing behaviors unchanged [done]
### Dependencies
- Task 2

### Description
Manually verify that the final run path (`appState.runNumber >= 3`) still calls `renderFinalComplianceSummaries()` and `showPhase(5)`, and that form validation, governance pause modal, and data persistence remain intact. No code changes expected - verification only.

### Sub-tasks
- [ ] Confirm the `else` branch (final run) in `evaluateQuiz()` is untouched
- [ ] Confirm `openGovernancePause()` logic and `btn-submit-justification` handler remain unchanged
- [ ] Confirm CSV log entry formation and Firestore persistence are unaffected
