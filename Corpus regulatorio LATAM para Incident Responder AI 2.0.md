# Corpus regulatorio LATAM para Incident Responder AI 2.0

## 1. Propósito del corpus y alcance

Este documento define una primera versión estructurada del corpus regulatorio para escenarios de simulación de respuesta a incidentes en Uruguay, México, Brasil y Chile, alineado con tu modelo de tres niveles (leyes generales, normas sectoriales y estándares técnicos) y con foco en incident response y protección de datos.[^1][^2]

El objetivo operativo es que cada registro del corpus pueda conectarse directamente con mecánicas de juego de Incident Responder AI 2.0 / The Responder (triggers de incidentes, plazos de notificación, destinatarios, sanciones) y con roles y niveles de madurez (L1–L6) en tus simulaciones.[^3][^4]

## 2. Marco metodológico: niveles de regulación

### 2.1 Nivel 1 – Leyes de protección de datos

Este nivel agrupa las leyes marco de protección de datos personales y privacidad que definen qué datos son protegidos, quién es responsable de su tratamiento y cuáles son los principios aplicables (licitud, finalidad, proporcionalidad, seguridad, confidencialidad, etc.).[^5][^2][^6]

En el corpus, estas normas se usan principalmente para modelar:

- Clasificación de datos (sensibles, financieros, de salud, menores, etc.).[^7][^8]
- Obligaciones de seguridad asociadas al tratamiento (medidas técnicas y organizativas, registros de actividades de tratamiento, evaluaciones de impacto).[^9][^5]

### 2.2 Nivel 2 – Leyes de ciberseguridad e infraestructura crítica

Este nivel recoge la normativa que establece obligaciones de ciberseguridad a nivel país, especialmente para servicios esenciales, operadores de importancia vital, infraestructura crítica y organismos públicos.[^4][^3]

En el corpus, este nivel es clave para modelar:

- Deberes de reporte de incidentes al CSIRT nacional o sectorial y a la agencia de ciberseguridad.[^10][^11]
- Plazos de notificación, criterios de “incidente significativo” y régimen de infracciones y sanciones.[^12][^3]

### 2.3 Nivel 3 – Circulares, normas oficiales y guías técnicas

Este nivel incluye circulares financieras, normas oficiales mexicanas (NOM), guías técnicas de autoridades de protección de datos y resoluciones específicas sobre taxonomía de incidentes o procedimientos de reporte.[^13][^14][^15][^1]

En el corpus, se utilizan para:

- Afinar condiciones específicas de reporte (canal, formato, responsables internos).[^16][^15]
- Detallar requisitos técnicos mínimos (controles de seguridad, registros de auditoría, estándares de gestión de seguridad).[^14][^1]

## 3. Fuentes oficiales por país (2026)

### 3.1 Uruguay

#### 3.1.1 Protección de datos – Ley Nº 18.331

La Ley Nº 18.331 de Protección de Datos Personales y Acción de Habeas Data establece el régimen de tratamiento de datos personales, principios generales y derechos de los titulares.[^2]

El texto consolidado y actualizado está disponible en el portal de IMPO (Centro de Información Oficial), con referencia a reformas como la Ley Nº 19.670 y al Decreto Nº 64/020 que la reglamenta.[^2]

#### 3.1.2 Sistema financiero y ciberseguridad

El Banco Central del Uruguay (BCU) publica la “Recopilación de Normas de Regulación y Control del Sistema Financiero”, que incluye circulares y disposiciones sobre gestión de riesgos, seguridad de la información y continuidad operativa de instituciones financieras.[^17][^1]

El portal del BCU permite acceder a secciones específicas por tipo de institución (instituciones financieras, AFAP, seguros y reaseguros) y a listados de circulares vigentes que pueden contener obligaciones de reporte de incidentes tecnológicos o de seguridad.[^1][^16]

### 3.2 México

#### 3.2.1 Sector salud – NOM-004-SSA3-2012 (expediente clínico)

La Norma Oficial Mexicana NOM-004-SSA3-2012 regula la integración, uso y conservación del expediente clínico, incluyendo requisitos de contenido, custodia, confidencialidad y conservación.[^18][^19][^13]

El texto oficial se encuentra en el Diario Oficial de la Federación (DOF), donde se especifica que la versión HTML puede omitir elementos y se recomienda consultar la imagen digitalizada o el PDF para referencia normativa.[^19][^18]

#### 3.2.2 Protección de datos personales en sujetos obligados – LGPDPPSO

La Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados (LGPDPPSO) establece el régimen de protección de datos personales para entidades públicas y otros sujetos obligados en México.[^20][^21]

El portal de la Cámara de Diputados ofrece el texto actualizado, con últimas reformas publicadas en el Diario Oficial de la Federación en 2025, y versiones en formatos PDF y Word para su consulta.[^21]

#### 3.2.3 Protección de datos personales en privados – LFPDPPP

La Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) regula el tratamiento de datos personales por parte de entidades privadas en México.[^22]

El texto oficial está disponible como PDF en el portal de la Cámara de Diputados y se relaciona con guías y lineamientos emitidos por el INAI sobre avisos de privacidad, medidas de seguridad y procedimientos de ejercicio de derechos ARCO.[^23][^22]

### 3.3 Brasil

#### 3.3.1 LGPD – Lei Nº 13.709

La Lei Nº 13.709, conocida como Lei Geral de Proteção de Dados Pessoais (LGPD), establece el marco general de protección de datos personales en Brasil y modifica el Marco Civil da Internet.[^5][^9]

El texto actualizado puede consultarse en el portal de la Presidencia (Planalto), que enlaza al texto consolidado de la ley y a publicaciones originales del Diário Oficial da União.[^9][^5]

#### 3.3.2 ANPD – guías y resoluciones

La Autoridade Nacional de Proteção de Dados (ANPD) publica guías, resoluciones y documentos institucionales que desarrollan aspectos operativos de la LGPD, incluyendo interpretación de principios, requisitos de seguridad y procedimientos de reporte de incidentes de seguridad con datos personales.[^14]

En el portal gov.br de la ANPD se encuentran documentos como versiones en inglés de la LGPD, guías sobre incidentes de seguridad y otras publicaciones técnicas que pueden servir como estándares para definir controles específicos en el corpus.[^14]

### 3.4 Chile

#### 3.4.1 Ley Marco de Ciberseguridad e Infraestructura Crítica (Ley Nº 21.663)

Chile cuenta con una Ley Marco de Ciberseguridad e Infraestructura Crítica de la Información que define servicios esenciales, operadores de importancia vital y crea la Agencia Nacional de Ciberseguridad (ANCI) y el CSIRT Nacional.[^24][^3][^4]

Análisis especializados destacan que la ley impone deberes generales y específicos de ciberseguridad, obligaciones de reporte de incidentes que puedan tener efectos significativos y la implementación de sistemas de gestión de seguridad de la información para operadores de importancia vital, con un régimen de sanciones que puede llegar hasta 40.000 UTM por infracciones gravísimas.[^11][^3][^4]

El Decreto con Fuerza de Ley publicado en diciembre de 2024 establece la entrada en vigencia de la ley y fija plazos para la iniciación de actividades de la ANCI y la vigencia de las normas, incluyendo fechas diferenciadas para la calificación de operadores de importancia vital, deberes específicos y el régimen de sanciones.[^10]

#### 3.4.2 Protección de datos – Ley Nº 19.628

La Ley Nº 19.628 sobre protección de la vida privada regula el tratamiento de datos de carácter personal por organismos públicos y particulares, definiendo datos personales y sensibles y estableciendo obligaciones de resguardo para garantizar la privacidad.[^8][^7]

Existen versiones consolidadas en Ley Chile y otros repositorios académicos que recogen las modificaciones y permiten consultar el texto completo con sus definiciones y principios.[^7][^8]

#### 3.4.3 Taxonomía de incidentes y normas técnicas

En el contexto de la implementación de la Ley Marco de Ciberseguridad, se han emitido resoluciones exentas que aprueban taxonomías de incidentes de ciberseguridad y lineamientos técnicos que especifican criterios para clasificar incidentes como de efecto significativo y para reportarlos al CSIRT nacional o sectoriales.[^15][^11]

Estos documentos son fundamentales para completar el nivel 3 del corpus chileno, ya que conectan las obligaciones legales con categorías operativas de incidentes y umbrales de criticidad.[^15][^11]

## 4. Plantilla de matriz del corpus

### 4.1 Campos propuestos

La matriz del corpus se construye como una tabla (hoja de cálculo o base de datos) con las siguientes columnas por registro:

- **ID del Control**: código único para cada norma o obligación específica (ej. `REG-CL-01` para primer control chileno).
- **País**: Uruguay, México, Brasil, Chile (posibilidad de expansión futura a otros países LATAM).
- **Nombre Oficial de la Norma**: denominación oficial tal como figura en el texto legal (por ejemplo, “Ley Marco de Ciberseguridad e Infraestructura Crítica de la Información, Ley Nº 21.663”).[^3][^12]
- **Organismo Regulador**: autoridad que fiscaliza o coordina la aplicación (BCU, ANPD, INAI, ANCI, CSIRT Nacional, etc.).[^1][^3][^14]
- **Ámbito de Aplicación**: descripción sintética de los sujetos obligados (servicios esenciales, operadores de importancia vital, instituciones financieras, sujetos obligados públicos, particulares, sector salud, etc.).[^13][^21][^3]
- **Disparador del Incidente (Trigger)**: tipo de evento que activa la obligación de reporte (brecha de datos personales, incidente de ciberseguridad con efecto significativo, sospecha razonable de vulneración, interrupción de servicios esenciales, etc.).[^4][^11][^3]
- **Plazo de Notificación**: tiempo máximo especificado para reportar (horas, días, “plazo razonable”, plazos diferenciados para autoridades y titulares, etc.).[^3][^10]
- **Destinatario del Reporte**: entidad, canal o plataforma a la que se reporta (CSIRT Nacional, CSIRT sectorial, ANCI, ANPD, INAI, BCU, registro de incidentes).[^11][^15][^3]
- **Sanciones por Incumplimiento**: referencia a multas y sanciones administrativas o penales (UMAs en México, UTM en Chile, UI en Uruguay, sanciones en reales en Brasil, inhabilitación, clausura, etc.).[^2][^4][^3]
- **Enlace al Texto Oficial**: URL directa al texto oficial de la ley, norma o circular en el boletín oficial, portal legislativo o sitio de la autoridad.[^18][^22][^8][^5][^1]

### 4.2 Ejemplo conceptual de registros

A modo conceptual (sin reproducir textos completos), la matriz podría contener entradas como:

| ID del Control | País | Nombre Oficial de la Norma | Organismo Regulador | Nivel | Ámbito de Aplicación | Disparador del Incidente | Plazo de Notificación | Destinatario del Reporte | Sanciones por Incumplimiento | Enlace al Texto Oficial |
|----------------|------|----------------------------|---------------------|-------|----------------------|---------------------------|-----------------------|---------------------------|-----------------------------|-------------------------|
| REG-UY-01 | Uruguay | Ley Nº 18.331 de Protección de Datos Personales | Unidad Reguladora y de Control de Datos Personales (URCDP) / IMPO | 1 | Tratamiento de datos personales por organismos públicos y privados | Vulneración de seguridad que afecte datos personales | Plazo razonable según reglamentación | Autoridad de protección de datos | Multas en unidades indexadas y sanciones administrativas | URL IMPO Ley 18.331[^2] |
| REG-MX-01 | México | NOM-004-SSA3-2012, Del expediente clínico | Secretaría de Salud / DOF | 3 | Prestadores de servicios de salud y expedientes clínicos | Pérdida, acceso no autorizado o modificación de expedientes clínicos | Plazos operativos internos y conforme otras normas de datos personales | Autoridad sanitaria y, según corresponda, INAI | Sanciones administrativas en materia sanitaria | URL DOF NOM-004-SSA3-2012[^13][^18] |
| REG-BR-01 | Brasil | Lei Nº 13.709 – LGPD | ANPD / Presidência da República | 1 | Controladores y operadores de datos personales | Incidente de seguridad que pueda implicar riesgo o daño relevante a titulares | Plazo definido en reglamentos ANPD (para comunicación de incidentes) | ANPD y titulares de datos | Multas administrativas hasta porcentaje de facturación y otras sanciones | URL Planalto LGPD[^5][^9] |
| REG-CL-01 | Chile | Ley Nº 21.663, Ley Marco de Ciberseguridad e Infraestructura Crítica | ANCI / CSIRT Nacional | 2 | Prestadores de servicios esenciales y operadores de importancia vital | Incidente de ciberseguridad con efecto significativo | Plazos específicos definidos en la ley y en resoluciones técnicas | CSIRT Nacional / CSIRT sectorial / Registro Nacional de Incidentes | Multas hasta 40.000 UTM por infracciones gravísimas | URL texto oficial Ley Marco de Ciberseguridad[^3][^12] |

Estos registros se pueden ir refinando a medida que se analicen en detalle los textos oficiales y se extraigan triggers, plazos y sanciones concretas.[^10][^11][^3]

## 5. Estructura técnica de carpetas

### 5.1 Propuesta de árbol de directorios

Se sugiere una estructura inicial como:

```text
corpus_regulatorio/
  uruguay/
    leyes_generales/
      ley_18331_proteccion_datos.pdf
    normas_sectoriales/
      bcu_recopilacion_sistema_financiero.pdf
    estandares_tecnicos/
      circulares_bcu_incidentes_seguridad/
  mexico/
    leyes_generales/
      lfpdppp_particulares.pdf
      lgpdppso_sujetos_obligados.pdf
    normas_sectoriales/
      nom_004_ssa3_2012_expediente_clinico.pdf
    estandares_tecnicos/
      lineamientos_inai_incidentes_seguridad/
  brasil/
    leyes_generales/
      lgpd_lei_13709_planalto.pdf
    normas_sectoriales/
      regulaciones_sectoriales_bancarias_anpd/
    estandares_tecnicos/
      guias_anpd_incidentes_seguridad.pdf
  chile/
    leyes_generales/
      ley_19628_proteccion_vida_privada.pdf
    normas_sectoriales/
      ley_21663_marco_ciberseguridad.pdf
    estandares_tecnicos/
      resoluciones_taxonomia_incidentes_csirt.pdf
```

Esta estructura permite relacionar directamente cada archivo con su país y nivel de regulación, facilitando el mapeo a IDs de control en la matriz.[^8][^5][^1][^3]

### 5.2 Convenciones de nombres

Se recomienda utilizar nombres de archivos que incluyan:

- País (código ISO, ej. `uy`, `mx`, `br`, `cl`).
- Tipo de norma (`ley`, `nom`, `resolucion`, `circular`).
- Número o referencia oficial (ej. `18331`, `13709`, `004_ssa3_2012`, `21663`).

Por ejemplo: `cl_ley_21663_marco_ciberseguridad.pdf`, `mx_nom_004_ssa3_2012_expediente_clinico.pdf`, `br_lei_13709_lgpd.pdf`, `uy_ley_18331_proteccion_datos.pdf`.[^13][^5][^2][^3]

## 6. Pipeline técnico para extracción y mapeo

### 6.1 Descarga y almacenamiento

1. Identificar la URL oficial de cada documento (DOF, IMPO, Planalto, Ley Chile, Cámara de Diputados, ANPD, BCU)..[^22][^20][^5][^8][^1][^13][^2][^3]
2. Descargar el PDF y guardarlo en la carpeta que corresponda según la estructura propuesta.
3. Versionar los archivos en tu repositorio (por ejemplo GitHub) para controlar cambios cuando haya reformas o nuevas resoluciones.[^21][^10]

### 6.2 Extracción de texto

Con librerías como `pypdf` o `pdfplumber` en Python se puede:

- Leer cada página del PDF.
- Eliminar encabezados y pies de página repetitivos propios de boletines oficiales.
- Normalizar espacios, saltos de línea y caracteres especiales.[^19][^18]

El resultado se almacena como JSON o texto plano por artículo o sección, lo que luego facilita el análisis de términos clave.

### 6.3 Búsqueda de palabras clave

Se recomienda implementar un script que, para cada documento, marque posiciones y contexto de términos asociados a:

- **Tiempo**: “horas”, “hábiles”, “inmediato”, “días”, “plazo razonable”.
- **Criticidad**: “crítico”, “grave”, “significativo”, “efecto significativo”, “incidente relevante”.[^12][^11][^3]
- **Castigo**: “multa”, “sanción”, “inhabilitación”, “clausura”, “UTM”, “UMA”, “UI”.[^4][^2][^3]

A partir de estas ocurrencias se pueden sugerir campos para:

- Disparador del incidente (frases que definen qué es un incidente de efecto significativo o una brecha relevante).[^11][^3][^4]
- Plazo de notificación (frases que mencionan tiempos exactos o criterios de razonabilidad).[^10]
- Sanciones (artículos que describen infracciones leves, graves, gravísimas y su escala de multas).[^3][^4]

### 6.4 Población semi-automática de la matriz

El flujo recomendado sería:

1. Ejecutar el extractor sobre cada PDF.
2. Cargar el texto en un índice (por ejemplo, usando herramientas de búsqueda de texto o embeddings).
3. Correr consultas estructuradas para encontrar artículos sobre reporte de incidentes, plazos y sanciones.
4. Generar propuestas de valores para cada columna de la matriz y revisarlas manualmente antes de consolidarlas, dado que los textos legales exigen interpretación cuidadosa.[^15][^3][^10]

Este enfoque semi-automático equilibra escalabilidad con precisión jurídica.

## 7. Expansión sugerida: caso Chile con leyes de privacidad complementarias

### 7.1 Conjunción Ley Marco de Ciberseguridad + Ley 19.628

En Chile, un incidente de ciberseguridad que afecta sistemas con datos personales puede implicar obligaciones simultáneas bajo la Ley Marco de Ciberseguridad y la Ley 19.628.[^7][^4][^11][^3]

En el corpus, esto se modela creando controles que combinen:

- Trigger de incidente significativo (según taxonomía de la Ley Marco y resoluciones técnicas).[^15][^11]
- Afectación de datos personales o sensibles (según definiciones de la Ley 19.628).[^8][^7]
- Plazos y destinatarios de reporte tanto al CSIRT como a la autoridad de protección de datos cuando exista.[^3][^15]

### 7.2 Matriz específica para Chile (borrador conceptual)

Se puede armar una sub-matriz para Chile con controles como:

| ID del Control | País | Norma | Nivel | Trigger | Plazo | Destinatario |
|----------------|------|-------|-------|---------|-------|-------------|
| REG-CL-01 | Chile | Ley Marco de Ciberseguridad (21.663) – reporte de incidentes de efecto significativo | 2 | Incidente que interrumpe un servicio esencial o afecta sistemas con datos personales | Plazo definido por la ley y reglamentos | CSIRT Nacional / CSIRT sectorial |[^3][^12][^11]|
| REG-CL-02 | Chile | Ley 19.628 – vulneración de datos personales | 1 | Tratamiento o acceso no autorizado que vulnere la privacidad de titulares | Plazos vinculados a principios de diligencia y seguridad | Autoridad competente en materia de datos personales |[^7][^8]|

Este tipo de estructura permite que, en tus simulaciones, un mismo incidente de ciberseguridad dispare varias obligaciones normativas simultáneas.

## 8. Integración con Incident Responder AI 2.0

Cada registro de la matriz puede vincularse a:

- Escenarios específicos (hospital público en México, banco privado en Uruguay, OIV eléctrico en Chile, fintech en Brasil).
- Roles del juego (analista SOC, CISO, oficial de cumplimiento, DPO).
- Niveles de dificultad (L1 guía pasito a pasito con hints normativos, L6 simulación sin asistencia con verificación posterior de cumplimiento regulatorio).

Al conectar triggers, plazos, destinatarios y sanciones directamente con decisiones de los jugadores (reportar o no, a quién, con qué contenido y en qué tiempo), el corpus regulatorio se convierte en la columna vertebral legal de la simulación, manteniendo el foco pedagógico y realista para LATAM.[^2][^4][^3]

---

## References

1. [Páginas - Recopilación-de-normas](https://www.bcu.gub.uy/Acerca-de-BCU/Normativa/Paginas/Recopilaci%C3%B3n-de-normas.aspx) - Recopilación de Normas de Regulación y Control del Sistema Financiero · Recopilación de Normas - AFA...

2. [Ley N° 18331 - IMPO](https://www.impo.com.uy/bases/leyes/18331-2008/12) - CAPITULO II - PRINCIPIOS GENERALES. Artículo 12. (Principio de responsabilidad).- El responsable de ...

3. [Ley N° 21.663: Ley Marco de Ciberseguridad](https://www.bdo.cl/es-cl/publicaciones/articulos/advisory/ley-n%C2%B0-21-663-ley-marco-de-ciberseguridad) - El pasado lunes 08 de abril de 2024 se promulgó en Chile la nueva Ley Marco de Ciberseguridad e Infr...

4. [El Senado de Chile aprueba la Ley Marco de Ciberseguridad e ...](https://www.garrigues.com/es_ES/noticia/senado-chile-aprueba-ley-marco-ciberseguridad-e-infraestructura-critica-informacion) - El texto legal crea un modelo de gobernanza que promueve la gestión de riesgos y la implementación d...

5. [Lei Geral de Proteção de Dados Pessoais (LGPDP) (2018)](https://www.lexml.gov.br/urn/urn:lex:br:federal:lei:2018-08-14;13709)

6. [1 PROTECCION DE LOS DATOS PERSONALES Ley ...](https://www.oas.org/juridico/pdfs/arg_ley25326.pdf) - La presente ley tiene por objeto la protección integral de los datos personales asentados en archivo...

7. [Ley N° 19.628, sobre protección de la vida privada - Regulación](https://digital.gob.cl/biblioteca/regulacion/ley-n-19628-sobre-proteccion-de-la-vida-privada/)

8. [Ley 19628](https://facso.uchile.cl/dam/jcr:27ff23e3-47b3-4c36-8b7a-e2687526ab2f/ley-19.628.pdf)

9. [L13709 - Planalto](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm)

10. [Entrada en vigencia de la Ley de Ciberseguridad - Carey Abogados](https://www.carey.cl/entrada-en-vigencia-de-la-ley-de-ciberseguridad) - El 24 de diciembre de 2024, se publicó en el Diario Oficial de Chile el Decreto con Fuerza de Ley N°...

11. [[PDF] ALCANCES LEY MARCO DE CIBERSEGURIDAD - CNC](https://cnc.cl/wp-content/uploads/2025/09/PPT-08092025-CNC.pdf) - Se considera un incidente de ciberseguridad de efecto significativo, cuando pueda: - Interrumpir la ...

12. [Ley marco de ciberseguridad Ley 21663, 26 de Marzo 2024](https://leyes-cl.com/ley_marco_de_ciberseguridad.htm) - Ley marco de ciberseguridad Ley 21663, 26 de Marzo 2024

13. [SALUD](https://www.dof.gob.mx/normasOficiales/4909/SALUD/SALUD.html)

14. [Brazilian Data Protection Law (LGPD) - Portal Gov.br](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/outros-documentos-e-publicacoes-institucionais/lgpd-en-lei-no-13-709-capa.pdf) - LGPD em Inglês

15. [Ley Chile - Resolución 7 Exenta (01-mar-2025) M. del ...](https://www.bcn.cl/leychile/navegar?idNorma=1211464) - Aprueba Taxonomía de Incidentes de Ciberseguridad

16. [Páginas - Instituciones Financieras - Circulares](https://www.bcu.gub.uy/Paginas/Instituciones-Financieras-Circulares.aspx) - RECOPILACIÓN DE NORMAS DE REGULACIÓN Y CONTROL DEL SISTEMA FINANCIERO - Adecuación de la normativa e...

17. [Recopilación de normas > Instituciones Financieras](https://www.bcu.gub.uy/Acerca-de-BCU/Normativa/Paginas/Reordenamiento_Instituciones.aspx)

18. [NORMA Oficial Mexicana NOM-004-SSA3-2012, Del expediente ...](https://sidof.segob.gob.mx/notas/5272787)

19. [NORMA Oficial Mexicana NOM-004-SSA3-2012, Del ...](https://www.dof.gob.mx/nota_detalle.php%3Fcodigo=5272787&fecha=15/10/2012)

20. [[PDF] Ley General de Protección de Datos Personales en Posesión de ...](https://www.diputados.gob.mx/LeyesBiblio/pdf/LGPDPPSO.pdf)

21. [Ley General de Protección de Datos Personales en ...](https://www.diputados.gob.mx/LeyesBiblio/ref/lgpdppso.htm)

22. [[PDF] Ley Federal de Protección de Datos Personales en Posesión de los ...](https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf)

23. [Ley simple: Datos personales](https://www.argentina.gob.ar/justicia/derechofacil/leysimple/datos-personales) - La ley de protección de datos personales o hábeas data te protege si tus datos de identidad, de salu...

24. [Ley Marco sobre Ciberseguridad e Infraestructura Crítica de la ...](https://derechocienciaytecnologia.uc.cl/seguimiento-legislativo/ley-marco-sobre-ciberseguridad-e-infraestructura-critica-de-la-informacion/) - 08 de abril de 2024, Publicación de Ley Marco sobre Ciberseguridad (Ley Nº 21.663) en el Diario Ofic...

