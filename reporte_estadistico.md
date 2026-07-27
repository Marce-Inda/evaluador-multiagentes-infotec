# Reporte de Análisis Estadístico - Programa de Veraneo INFOTEC 2026

**Fecha de Análisis:** 2026-07-23 08:47:09
**Total de Muestras Analizadas:** 36 pruebas

## 1. Estadísticas Descriptivas

| Grupo Experimental | Muestras (N) | Media Latencia IA (s) | Media Latencia Humana (s) | Desv. Est. Humana (s) | Media Precisión (%) | Confiabilidad Promedio (1-5) | Tasa Infracción $I_C$ (%) | Consistencia $C_{EO}$ (%) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Grupo A: Búsqueda Manual | 12 | 0.000 | 176.09 | 39.92 | 66.3% | N/A (Manual) | 16.7% | 16.7% |
| Grupo B: IA Básica | 12 | 5.529 | 126.68 | 32.03 | 88.7% | 3.67 | 33.3% | 16.7% |
| Grupo C: Motor Multi-Agente | 12 | 16.178 | 69.25 | 10.12 | 100.0% | 4.50 | 0.0% | 100.0% |

## 2. Pruebas de Hipótesis y Significancia (Comparaciones Intrasujeto frente a Grupo C)

Dado que el experimento utiliza un diseño intrasujeto, las observaciones de un mismo participante están relacionadas. Se aplican la **Prueba t para muestras relacionadas** y la **Prueba de rangos con signo de Wilcoxon** para evaluar significancia.

| Comparación Evaluada | N emparejado | p-valor Latencia (Wilcoxon) | Significado Latencia | p-valor Precisión (Wilcoxon) | Significado Precisión | p-valor Confiabilidad | Significado Confiabilidad |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Grupo A: Búsqueda Manual vs Grupo C: Motor Multi-Agente | 12 | 0.00000 | 🟢 Significativo (p < 0.05) | 0.01675 | 🟢 Significativo (p < 0.05) | N/A | 🔴 No Significativo |
| Grupo B: IA Básica vs Grupo C: Motor Multi-Agente | 12 | 0.00008 | 🟢 Significativo (p < 0.05) | 0.17558 | 🔴 No Significativo | 0.11494 | 🔴 No Significativo |

## 3. Análisis de Sesgo Geopolítico en Grupo B (Occidente vs. Oriente)

Este análisis evalúa el rendimiento del participante bajo la asistencia de modelos de IA de origen Occidental (Google Gemini, Meta Llama) frente a modelos Orientales/Chinos (DeepSeek), analizando diferencias en latencia humana de decisión, precisión objetiva y nivel de confianza percibida.

| Origen del Modelo | Muestras (N) | Media Latencia Humana (s) | Media Precisión (%) | Confiabilidad Promedio (1-5) |
| :--- | :---: | :---: | :---: | :---: |
| Occidentales (Llama/Gemini) | 6 | 123.16s | 83.0% | 3.50 |
| Orientales (DeepSeek) | 6 | 130.20s | 94.3% | 3.83 |

*Nota: La diferencia en latencia y confianza refleja la susceptibilidad de los perfiles ante las alucinaciones o respuestas incompletas de cada modelo geopolítico.*

## 4. Discusión de Resultados Académicos

*   **Diseño Intrasujeto Balanceado:** El emparejamiento por participante cancela diferencias individuales de perfil técnico, aislando la verdadera efectividad del motor multi-agente.
*   **Latencia Humana:** Evalúa si el asistente multi-agente acelera la toma de decisiones críticas reguladas.
*   **Precisión de Cumplimiento y Alucinaciones:** Dado que las preguntas clave indagan sobre plazos y autoridades sujetas a error/alucinación en IA estándar, la precisión del quiz valida la efectividad del *Governance Agent*.

*Nota: Reporte generado automáticamente por el script `analyze_results.py` de tu repositorio.*