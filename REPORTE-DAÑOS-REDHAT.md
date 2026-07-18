# Reporte de Daños Simulados (Red Hat Analysis) - Carpeta INFOTEC

**Proyecto:** The Responder 2.0 (Incident Responder)  
**Objetivo de la Auditoría:** Someter a estrés y mentalidad adversaria la estrategia del protocolo de investigación en INFOTEC. Identificar los "Project Killers" (factores de destrucción académica, legal, financiera y técnica) y proponer cómo desactivarlos antes del inicio de la estancia.

---

## 1. The Kill Chain: Cómo destruir la Startup y el Protocolo en 4 Pasos

Este escenario describe la secuencia de eventos que llevaría al fracaso catastrófico de la postulación, el protocolo y la futura startup:

```
[PASO 1: Trampa de IP] ──► [PASO 2: Quiebra por APIs] ──► [PASO 3: Falla y Multa] ──► [PASO 4: Rechazo Académico]
  Firma de convenio          Ataque de wallet          Alucinación legal         Acusación de fraude
  estándar de INFOTEC        exhaustion en test        no detectada por R1       científico comercial
```

*   **Paso 1: La "Trampa de Propiedad Intelectual" (Fallo Legal)**
    El postulante es aceptado y, en el entusiasmo de iniciar, firma el convenio estándar de investigadores de INFOTEC sin leer las letras chiquitas. El convenio estipula que *"toda propiedad intelectual, algoritmo, base de datos o software adaptado, ejecutado o perfeccionado en el marco del programa pertenece al patrimonio de INFOTEC/Conahcyt"*. A mitad de la estancia, los abogados de INFOTEC reclaman la copropiedad del motor del *Governance Agent* y de la base vectorial. La startup queda legalmente bloqueada para levantar capital de riesgo (VCs) debido a que la IP está manchada ("dirty IP").
*   **Paso 2: La "Denegación de Cartera" o Wallet-Exhaustion (Fallo Financiero)**
    Durante la fase experimental (Semana 4), el arnés de búsqueda se despliega localmente en los laboratorios de INFOTEC para que 30 estudiantes realicen las pruebas de auditoría. Un alumno curioso (o un script malicioso en la red interna) descubre la dirección IP del backend y lanza un ataque automatizado de peticiones HTTP a la API. Al no existir control de tasa de peticiones (rate limiting) ni autenticación en tu FastAPI local, el servidor realiza miles de llamadas concurrentes a las APIs de Gemini 2.5 Flash y DeepSeek R1. En menos de 2 horas, tu saldo de API de Google/DeepSeek se agota, acumulando una factura de cientos de dólares, cancelando el experimento y dejándote sin presupuesto para continuar.
*   **Paso 3: La "Alucinación Crítica No Detectada" (Fallo Técnico y Reputacional)**
    En plena evaluación ante los mentores, el *Governance Agent* sufre un sesgo de contexto y emite un dictamen legal alucinante: ante un ataque de ransomware simulado que compromete datos en Brasil, la IA asegura que *"no es obligatorio notificar a la ANPD bajo la LGPD si se paga el rescate"*. El validador (DeepSeek R1) no detecta la alucinación porque el script de ChromaDB falló al recuperar el fragmento de la ley correcto debido a un error de codificación UTF-8 en el vector de la LGPD. Los mentores (expertos legales de INFOTEC) detectan de inmediato este error crítico y dictaminan que el sistema de IA es "altamente peligroso, inestable y metodológicamente inválido".
*   **Paso 4: La "Acusación de Fraude Científico" (Fallo Académico)**
    En la semana 6, el evaluador final del protocolo determina que el arnés de búsqueda es solo una pantalla cosmética y que el experimento carece de validez científica porque no se controlaron variables clave (ej. la latencia humana varió debido al lag del navegador o a la velocidad de lectura del usuario, no por el rendimiento de la IA). El protocolo es rechazado por "tratar de camuflar un test de software comercial (beta test del videojuego) como una investigación científica pública".

---

## 2. Puntos de Quiebre Críticos (Breakpoints)

*   **Breakpoint 1 (Costo):** Si el costo de procesamiento por llamada a la API sube de $0.003 USD a $0.05 USD (por ejemplo, si cambias a modelos más grandes como Gemini Pro o GPT-4 para evitar alucinaciones), el costo total de los experimentos del cuasi-experimento con 50 usuarios realizando 20 consultas cada uno superará el presupuesto disponible para la estancia.
*   **Breakpoint 2 (Latencia):** El validador de alucinaciones (DeepSeek R1) requiere análisis profundo de razonamiento. Si el tiempo de respuesta del endpoint supera los **15 segundos**, el arnés de búsqueda provocará frustración en los usuarios de prueba, sesgando la variable de "latencia de decisión" debido a la desesperación del usuario por la lentitud de la interfaz, arruinando la métrica experimental.
*   **Breakpoint 3 (Desconexión de API):** Si los servidores de DeepSeek o Google sufren una caída durante el día del experimento en INFOTEC, el backend colapsará por completo al no contar con un modelo local "failback" de respaldo (como un modelo Llama-3 de 8B corriendo en local mediante Ollama).

---

## 3. Checklist de Mitigación Adversaria (Defensas Red Hat)

Para desactivar la Kill Chain anterior, debes aplicar estas defensas técnicas y legales de inmediato:

- [ ] **Defensa de IP (Evitar Paso 1):** Antes de firmar cualquier convenio de estancia con INFOTEC, se debe enviar un escrito formal redactado por un abogado o asesor de IP declarando los repositorios de código preexistentes con sus respectivos marcas de tiempo (commits de Git previos al veraneo) para dejar constancia legal de que el software es propiedad previa del desarrollador.
- [ ] **Defensa Financiera (Evitar Paso 2):** Implementar de inmediato la librería `slowapi` (o un limitador de tasa basado en memoria) en el backend de FastAPI. Configurar un límite estricto de máximo 10 peticiones por minuto por dirección IP del cliente (`10/minute rate limit`).
- [ ] **Defensa contra Alucinaciones (Evitar Paso 3):** Crear una suite de pruebas estáticas locales (`tests/test_laws_rag.py`) que compruebe que, al ingresar palabras clave críticas de cada país (ej. "plazo Brasil", "plazo México", "multa Uruguay"), ChromaDB devuelva estrictamente los artículos correctos y no textos genéricos en inglés.
- [ ] **Defensa del Rigor Metodológico (Evitar Paso 4):** En el documento del protocolo, justificar matemáticamente cómo se controlará el "ruido de la interfaz" (ej. el arnés de búsqueda será idéntico en los tres grupos, solo cambiará la fuente de información que despliega en el mismo cuadro de texto).
- [ ] **Defensa de Latencia y Disponibilidad (Evitar Breakpoints):** Configurar un **Modelo Local de Respaldo (Backup LLM)**. Si la llamada API externa excede un timeout de 8 segundos, el sistema debe redirigir la consulta de forma automática a una instancia local de `Llama-3-8B` corriendo en Ollama (aunque sea ligeramente menos precisa, evita el congelamiento del sistema).
