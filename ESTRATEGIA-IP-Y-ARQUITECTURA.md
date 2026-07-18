# Estrategia de Propiedad Intelectual (IP) y Arquitectura para INFOTEC

**Proyecto:** The Responder 2.0 (Incident Responder)  
**Tema:** Análisis de duplicación de código vs. arquitectura desacoplada para protección legal de IP y prevención de deuda técnica.
**Estatus:** IMPLEMENTADO ✔ (Repositorio Independiente y Arnés de Búsqueda)

---

## 1. El Dilema: ¿Duplicar el Sistema Multi-Agente?

Para evaluar el sistema en INFOTEC enfocándose en la "búsqueda y calidad de respuesta" reguladora (y no en el videojuego), existen dos caminos posibles. El análisis estratégico (Red Hat / Blue Hat) revela lo siguiente:

```
Opción A: Duplicar y Modificar Código (Crear repo "Buscador INFOTEC")
   ├── RIESGO: Deuda técnica por divergencia de código (code drift).
   └── RIESGO: Copropiedad legal forzosa de INFOTEC sobre el código modificado.

Opción B: Backend Unificado + Cliente de Búsqueda Independiente (Search Harness) [ELEGIDA E IMPLEMENTADA]
   ├── VENTAJA: El código del backend y del juego se mantiene 100% privado bajo IP Preexistente.
   ├── VENTAJA: Aislamiento total en repositorio propio `evaluador-multiagentes-infotec`.
   └── VENTAJA: Sin duplicación. El videojuego comercial y la herramienta académica operan de forma independiente.
```

---

## 2. Análisis de Riesgos de la Opción A (Duplicar el Código)

1.  **Exposición de Propiedad Intelectual (Riesgo Legal):** Si creas una copia del backend, eliminas la UI del juego y entregas esa copia a los servidores de INFOTEC o en sus reportes de entregables, legalmente estarás entregando el "know-how" del sistema. Los términos de Conahcyt/INFOTEC podrían clasificar ese repositorio como un producto de la estancia, reclamando derechos sobre él.
2.  **Sincronización Bifurcada (Code Drift):** Cualquier mejora que hagas al motor de agentes en el proyecto de INFOTEC tendrás que copiarla y pegarla manualmente en tu juego, y viceversa. Esto destruye la mantenibilidad a 12 meses.
3.  **Esfuerzo de Re-adaptación:** Separar la lógica para que no sea un juego y luego volver a unirla es un proceso propenso a errores que te costará valiosas horas de desarrollo de tu MVP comercial.

---

## 3. La Solución Realizada: Arquitectura Desacoplada y Repositorio Standalone (API Black-Box)

La mejor manera de proteger tu IP, evitar problemas legales y no duplicar código es diseñar el sistema bajo una arquitectura orientada a servicios (SOA) y aislar el entorno experimental en un repositorio independiente.

### A. La API como "Caja Negra" (Black-Box)
El motor principal del backend de agentes (`FastAPI Python Backend`) se mantiene como un **único motor unificado** en el repositorio del videojuego. Para las pruebas de INFOTEC, el backend puede ejecutarse de forma remota (producción/servidor) o local, exponiendo endpoints REST específicos.
*   **Legalmente:** El backend es **Propiedad Intelectual Preexistente Protegida**. Tú eres dueño del servicio.

### B. Repositorio Independiente y Aislado (`evaluador-multiagentes-infotec`)
Para evitar cualquier filtración de código comercial en entregables académicos, hemos creado un repositorio independiente que contiene únicamente los archivos de la evaluación:

1.  **Cliente A (El Videojuego - En repo `juego-ciberseguridad`):** Tu frontend premium en React que interactúa con el backend para la simulación jugable.
2.  **Cliente B (La Web-App del Arnés Académico - En repo `evaluador-multiagentes-infotec`):** Una interfaz gráfica de usuario web estática (HTML5/Vanilla CSS/Vanilla JS) que se ejecuta en el navegador del participante sin necesidad de instalaciones, descargas ni interacción con terminales de comandos.

```
┌──────────────────────────────────────┐
│  juego-ciberseguridad (Repo Privado)  │
│  - Frontend React & Backend Motor    │
└──────────────────┬───────────────────┘
                   │
  Expone API REST  │ (Grupo C)
                   ▼
┌────────────────────────────────────────────────────────┐
│      evaluador-multiagentes-infotec (Repo Público)     │
│  - Interfaz Web de Evaluación (`index.html` / JS)     │
│  - Base de Leyes Desacoplada (`regulatory_corpus.json`)│
│  - Cliente API Directo a Gemini/Groq (Grupo B)         │
│  - Cliente API Remoto al Backend Core (Grupo C)        │
└────────────────────────────────────────────────────────┘
```

---

## 4. Funcionamiento de la Web-App del Arnés Académico (`index.html` / `app.js`)

La Web-App de evaluación permite a los participantes (particularmente perfiles no técnicos como CISOs) ejecutar el experimento en cualquier navegador web. Esta interfaz realiza llamadas REST en segundo plano a las APIs de nube (Gemini, Groq, OpenRouter) y al backend de Hugging Face sin requerir dependencias locales:

1.  **Modo A (Búsqueda Manual - RAG Estático):** La Web-App carga el archivo `regulatory_corpus.json` dinámicamente y expone un cuadro de búsqueda local interactivo para consultar las leyes de LATAM, midiendo la latencia de resolución manual sin intermediación de Inteligencia Artificial.
2.  **Modo B (IA Estándar - Zero-shot API):** La interfaz web realiza peticiones `fetch()` directas a Google Gemini, Groq o **OpenRouter** en la nube utilizando la clave provista. Al usar OpenRouter, se realiza un balanceo A/B en caliente para estudiar sesgos representacionales (Occidente: `meta-llama/llama-3.3-70b-instruct` vs Oriente: `deepseek/deepseek-v4-flash`), registrando el modelo utilizado en el CSV final.
3.  **Modo C (Motor Multi-Agente Remoto):** Se realiza una consulta HTTP POST al endpoint del backend core remoto. El backend cuenta con una **cascada de fallbacks de 4 niveles** (Gemini/Groq con conmutación por fallo a OpenRouter de pago y DeepSeek de respaldo) para garantizar alta disponibilidad de las consultas multi-agente RAG ante bloqueos de cuota o rate-limits.

### Cuestionario, Reloj de Latencia y Persistencia Centralizada
*   **Identificador de Usuario:** La interfaz solicita un código de participante anónimo (ej. `PARTICIPANTE-01`) en un formulario web de inicio.
*   **Stopwatch de Latencia Humana:** Un temporizador en JavaScript (`performance.now()`) calcula con precisión de milisegundos el tiempo total que le toma al usuario leer la información normatizada y responder la evaluación.
*   **Cuestionario Dinámico:** La interfaz presenta formularios estéticos de opción múltiple según el escenario de brecha (Uruguay, México, Brasil/Chile).
*   **Registro Centralizado:** Los resultados (ID, grupo, escenario, latencia de IA, latencia humana y respuestas) se envían mediante un POST al endpoint de guardado en el servidor backend central, consolidándose en un único archivo `resultados_evaluacion.csv` remoto (simplificando la recolección de métricas del investigador).

---

## 5. Automatización del Análisis Estadístico (`analyze_results.py`)

Para la evaluación científica en la Semana 5, se implementó el script `analyze_results.py`. Este módulo:
1.  Importa los datos registrados en `resultados_evaluacion.csv`.
2.  Calcula métricas descriptivas básicas (media, mediana, desviación estándar) agrupando por cada brazo experimental (Grupos A, B y C).
3.  Ejecuta pruebas de hipótesis avanzadas para muestras relacionadas (Paired t-test y prueba de rangos con signo de Wilcoxon) para determinar de forma matemática la significancia de los resultados.
4.  Genera de forma autónoma el reporte académico formativo `reporte_estadistico.md` listo para ser anexado a los artículos de divulgación de la estancia.

---

## 6. Estrategia Jurídica de la IP de Cara a INFOTEC

1.  **Declaración de Preexistencia:** Antes del inicio del programa de veraneo, se entregará una declaración de los repositorios de código preexistentes para delimitar legalmente que el motor del orquestador y la interfaz de juego React no son propiedad de INFOTEC.
2.  **Código Entregable:** Al finalizar la estancia, el único código fuente que se subirá al repositorio público/institucional de INFOTEC será el contenido de **`evaluador-multiagentes-infotec`** (arnés de consola, analizador de datos, CSVs y documentación de resultados), sirviendo como "instrumento experimental reproducible" y manteniendo la lógica propietaria del videojuego cerrada y protegida de cualquier reclamación institucional.
