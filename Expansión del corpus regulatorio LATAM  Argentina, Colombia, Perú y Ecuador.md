# Expansión del corpus regulatorio LATAM: Argentina, Colombia, Perú y Ecuador

## 1. Propósito de esta expansión

Este documento amplía el corpus regulatorio inicial incorporando Argentina, Colombia, Perú y Ecuador, con foco en protección de datos personales (privacidad) y normativas de ciberseguridad sectoriales, principalmente financieras y de infraestructura crítica.[^1][^2][^3][^4]

El objetivo es proveer información estructurada para que los escenarios de Incident Responder AI 2.0 integren triggers normativos, plazos, sanciones y organismos reguladores de estos cuatro países dentro de la misma matriz de controles que ya cubre Uruguay, México, Brasil y Chile.[^5][^6][^7]

## 2. Marco metodológico aplicado a los nuevos países

### 2.1 Nivel 1 – Leyes de protección de datos personales

En los cuatro países se identifican leyes marco de protección de datos personales que establecen principios, derechos de titulares y obligaciones de los responsables y encargados del tratamiento.[^8][^3][^1]

Estas normas se ubican en el Nivel 1 del corpus y permiten:

- Definir categorías de datos personales y sensibles relevantes para incidentes.[^3][^1]
- Establecer obligaciones de seguridad y de reporte ante vulneraciones de seguridad o brechas de datos personales.[^9][^10][^3]

### 2.2 Nivel 2 – Ciberseguridad e infraestructura crítica (principalmente sector financiero)

En paralelo, existen normas y circulares emitidas por bancos centrales y superintendencias financieras que imponen obligaciones específicas de gestión de riesgos tecnológicos y ciberseguridad, así como esquemas de reporte de incidentes críticos.[^6][^7][^4][^5]

Estas disposiciones se ubican en el Nivel 2 del corpus y son claves para modelar tiempos de reporte, canales y criterios de incidentes tecnológicos de alto impacto.

### 2.3 Nivel 3 – Circulares, reglamentos y directrices técnicas

El Nivel 3 se compone de resoluciones, reglamentos y directrices técnicas, tales como:

- Directrices de seguridad de la autoridad de datos personales (Argentina, Perú, Ecuador).[^10][^11][^9]
- Reglamentos específicos de gestión de seguridad de la información y ciberseguridad (Perú, Colombia).[^12][^5][^6]

Estos documentos afinan conceptos operativos como definición de incidente de seguridad, programas específicos de gestión de incidentes y requisitos mínimos técnicos.

## 3. Ecosistema regulatorio por país

### 3.1 Argentina

#### 3.1.1 Marco de privacidad – Ley Nº 25.326

La Ley Nº 25.326 de Protección de Datos Personales establece el régimen de tratamiento de datos personales, derechos de los titulares y obligaciones de los responsables, reglamentada por el Decreto 1558/01.[^2][^8]

El texto actualizado se encuentra en el portal de normativa del Estado argentino (Infoleg), que ofrece el “texto actualizado” con las modificaciones posteriores.[^2]

La autoridad de aplicación es la Agencia de Acceso a la Información Pública (AAIP), que además emite resoluciones complementarias sobre sanciones, criterios orientadores e indicadores de mejores prácticas.[^9][^2]

#### 3.1.2 Directrices de seguridad – Resolución AAIP 47/2018

La Resolución 47/2018 de la AAIP aprueba las “Medidas de Seguridad Recomendadas para el Tratamiento y Conservación de los Datos Personales en Medios Informatizados” y deroga disposiciones anteriores sobre medidas de seguridad.[^13][^9]

Estas directrices adoptan un enfoque de medidas recomendadas en lugar de obligatorias, pero sirven como referencia técnica para definir controles mínimos sobre recolección de datos, control de accesos, gestión de vulnerabilidades, incidentes de seguridad y medidas para datos sensibles.[^14]

En el contexto de simulaciones de incidentes, la resolución es relevante para modelar el deber de gestionar y reportar incidentes significativos con la mayor inmediatez posible, en línea con prácticas internacionales.

#### 3.1.3 Sector financiero – BCRA y Comunicación “A” 7266

El Banco Central de la República Argentina (BCRA) regula a las entidades financieras mediante comunicaciones que establecen requisitos mínimos de gestión, control y gobierno de la tecnología de la información.[^7]

La Comunicación “A” 7266 incorpora lineamientos sobre gestión de incidentes tecnológicos críticos y exige la notificación inmediata a la autoridad, en plazos que pueden ser de pocas horas desde la detección para eventos de alto impacto, conectados con requisitos mínimos de gestión del riesgo operativo y de seguridad de la información.[^7]

En tu matriz, esta comunicación se reflejará en triggers como “incidente tecnológico crítico que afecte servicios financieros o continuidad operativa” y plazos cortos de reporte hacia el BCRA.

### 3.2 Colombia

#### 3.2.1 Marco de privacidad – Ley Estatutaria 1581 de 2012

La Ley Estatutaria 1581 de 2012 establece el régimen general de protección de datos personales en Colombia, definiendo principios, derechos y obligaciones, y crea la obligación de registrar bases de datos en el Registro Nacional de Bases de Datos (RNBD).[^15]

La Superintendencia de Industria y Comercio (SIC) es la autoridad encargada de la vigilancia y control, y mediante resoluciones como la Resolución 003 de 2018 establece lineamientos para actualizar el RNBD y reportar incidentes de seguridad que afecten datos personales.[^15]

#### 3.2.2 Plazos de notificación en el RNBD

La SIC ha establecido que los incidentes de seguridad que afecten datos personales deben reportarse al RNBD dentro de los quince días hábiles siguientes al momento en que se detecta el incidente.[^15]

Este plazo es clave para la columna “Plazo de Notificación” del corpus en el contexto de incidentes de privacidad que involucren bases de datos registradas.

#### 3.2.3 Sector financiero – SFC y Circular Externa 007 de 2018

La Superintendencia Financiera de Colombia (SFC) expidió la Circular Externa 007 de 2018, que adiciona un capítulo sobre “Requerimientos mínimos para la gestión del riesgo de ciberseguridad” a la Circular Básica Jurídica.[^16][^6]

La circular establece obligaciones para entidades vigiladas y operadores de información sobre:

- Implementar programas de gestión del riesgo de ciberseguridad.
- Gestionar riesgos operativos y seguridad de la información.[^6]

Aunque la circular se centra en requerimientos mínimos, en la práctica se complementa con la obligación de reportar fallas e incidentes tecnológicos de impacto a través de plataformas de supervisión de la SFC de manera inmediata, configurando triggers para incidentes financieros significativos.[^17]

### 3.3 Perú

#### 3.3.1 Marco de privacidad – Ley Nº 29733 y Reglamento D.S. 003-2013-JUS

La Ley Nº 29733 de Protección de Datos Personales garantiza el derecho fundamental a la protección de datos personales y establece principios y obligaciones para el adecuado tratamiento.[^1]

El Decreto Supremo Nº 003-2013-JUS aprueba el Reglamento de la Ley 29733, con más de 130 artículos que desarrollan el régimen de tratamiento, registro de bancos de datos, derechos de los titulares y medidas de seguridad.[^10]

La Autoridad Nacional de Protección de Datos Personales (ANPD), dependiente del Ministerio de Justicia, es el ente encargado de la vigilancia y emite directivas y opiniones consultivas relacionadas con seguridad y notificación de incidentes.[^10]

#### 3.3.2 Plazos de notificación y directivas de la ANPD

Aunque la ley y su reglamento se refieren a la obligación de garantizar la seguridad de los datos y a la diligencia en el tratamiento, las directivas de la ANPD alinean los plazos de notificación de incidentes con estándares internacionales, típicamente en rangos de 48 a 72 horas para reportar filtraciones relevantes.[^10]

En tu matriz, esto se refleja como “plazo razonable (48–72 horas)” para vulneraciones de seguridad que comprometan datos personales.

#### 3.3.3 Ciberseguridad y sector financiero – Resolución SBS Nº 504-2021

La Superintendencia de Banca, Seguros y AFP (SBS) publicó el Reglamento para la gestión de seguridad de la información y ciberseguridad mediante la Resolución Nº 504-2021.[^4][^5]

Este reglamento exige a las entidades supervisadas:

- Implementar una organización interna y tecnología adecuada para gestionar ciberseguridad.
- Establecer niveles de gestión (simplificado, general, reforzado) según tamaño y complejidad.[^4]
- Contar con sistemas internos para el reporte oportuno de incidentes de ciberseguridad a la SBS y otras entidades especializadas.[^4]

En la práctica, los incidentes significativos deben reportarse de manera inmediata con un reporte preliminar dentro de un plazo sub-24 horas, que puede afinarse con otros instrumentos o proyectos de reglamento sobre programas de gestión de incidentes (PG-C).[^18][^12]

### 3.4 Ecuador

#### 3.4.1 Marco de privacidad – Ley Orgánica de Protección de Datos Personales (LOPDP)

La Ley Orgánica de Protección de Datos Personales fue publicada en el Registro Oficial Suplemento Nº 459 el 26 de mayo de 2021 y constituye el régimen general de protección de datos personales en Ecuador.[^19][^20][^3]

Su objeto es garantizar el derecho a la protección de datos personales, regulando principios, derechos, obligaciones y mecanismos de tutela, y crea la Superintendencia de Protección de Datos Personales como autoridad independiente.[^3][^19]

El Reglamento General, aprobado por Decreto Ejecutivo Nº 904 y publicado en noviembre de 2023, desarrolla procedimientos para ejercer derechos, notificar brechas y operar el registro nacional.[^21][^11]

#### 3.4.2 Plazo de notificación de vulneraciones y sanciones

La ley establece la obligación de notificar a la autoridad y a los titulares sobre cualquier vulneración de seguridad que entrañe riesgos, en un plazo máximo de 72 horas desde que se tiene constancia de la misma.[^21]

El régimen sancionatorio prevé multas que pueden llegar hasta el 1% del volumen de negocios anual, con un rango de 0,7% a 1% según gravedad, y sanciones adicionales para funcionarios públicos.[^21]

Estos elementos se reflejan en la matriz como “72 horas” en la columna de plazo y “hasta 1% de la facturación anual” en sanción máxima estimada.

## 4. Matriz del corpus: nuevos registros

### 4.1 Campos clave para Argentina, Colombia, Perú y Ecuador

Con base en la información anterior y tu tabla propuesta, se pueden definir los siguientes registros iniciales:

| ID | País | Regulación key | Regulador principal | Trigger del incidente | Plazo legal de reporte | Sanción máxima estimada | Nivel |
|----|------|----------------|---------------------|------------------------|------------------------|--------------------------|-------|
| REG-AR-01 | Argentina | Ley 25.326 / Res. AAIP 47/2018 / Com. “A” 7266 BCRA | AAIP / BCRA | Brecha de datos personales significativa / incidente tecnológico crítico bancario | Aproximación: “inmediato” para incidentes críticos (interpretado en práctica como ≤48 h en datos y ≤2 h en bancos) | Multas y sanciones administrativas bajo régimen AAIP; sanciones financieras en supervisión BCRA | 1–2[^9][^8][^7] |
| REG-CO-01 | Colombia | Ley 1581 de 2012 / Resolución SIC 003-2018 / CE 007 SFC | SIC / SFC | Violación de medidas de seguridad que compromete datos en RNBD / incidente de ciberseguridad de impacto en entidad financiera | 15 días hábiles para reporte de incidente de seguridad al RNBD; reporte inmediato vía plataformas de la SFC para incidentes financieros | Multas administrativas de hasta varios miles de SMMLV, cierre temporal o definitivo de operaciones según régimen sancionatorio SIC/SFC | 1–2[^15][^6][^17] |
| REG-PE-01 | Perú | Ley 29733 / D.S. 003-2013-JUS / Res. SBS 504-2021 | ANPD / SBS | Acceso no autorizado a datos personales / pérdida o afectación de activos críticos en entidades supervisadas | Plazo razonable alineado a estándares internacionales (48–72 h) para incidentes de datos; reporte inmediato y preliminar a SBS en menos de 24 h para incidentes significativos | Multas de hasta 100 UIT por infracciones en protección de datos y sanciones administrativas adicionales en supervisión SBS | 1–2[^1][^10][^5][^4] |
| REG-EC-01 | Ecuador | LOPDP / Reglamento General | Superintendencia de Protección de Datos Personales | Vulneración de confidencialidad, integridad o disponibilidad de datos personales que entrañe riesgo | Notificación obligatoria a autoridad y titulares en máximo 72 h desde que se tiene constancia de la vulneración | Multas de 0,7% a 1% del volumen de negocios anual por infracciones graves y muy graves | 1[^3][^19][^21] |

Estos registros sirven como punto de partida y deberán refinarse con lectura detallada de cada norma para precisar definiciones de “incidente significativo”, niveles de gravedad y rangos de sanciones por tipo de infracción.

## 5. Fuentes oficiales y rutas de búsqueda

### 5.1 Argentina

- **Ley 25.326 y Decreto 1558/01:** Portal de normativa del Estado argentino (Infoleg) con texto actualizado.[^2]
- **Resolución AAIP 47/2018:** Portal oficial argentina.gob.ar, sección normativa de la AAIP.[^13][^9]
- **Régimen sancionatorio AAIP:** Resoluciones AAIP 240/22 y 244/22 sobre sanciones y criterios orientadores, disponibles en boletín oficial y Infoleg.[^2]
- **Regulación bancaria:** Comunicaciones del BCRA, incluyendo “A” 7266, accesibles en el sitio oficial del banco.[^7]

### 5.2 Colombia

- **Ley 1581 de 2012:** Texto completo disponible en repositorios oficiales y en documentos de la SIC.[^15]
- **Resolución 003 de 2018:** Instrumento de la SIC que regula actualización del RNBD y reporte de incidentes de seguridad dentro de 15 días hábiles.[^15]
- **Circular Externa 007 de 2018:** Documento PDF de la SFC que incorpora requerimientos mínimos para gestión del riesgo de ciberseguridad.[^16][^6]

### 5.3 Perú

- **Ley 29733:** Texto oficial disponible en el portal del Congreso de la República y en el SPIJ.[^1]
- **D.S. 003-2013-JUS:** Reglamento de la Ley 29733 accesible en el portal del Ministerio de Justicia.[^10]
- **Resolución SBS Nº 504-2021:** Reglamento de gestión de seguridad de la información y ciberseguridad, disponible como PDF en el portal de la SBS.[^5][^4]

### 5.4 Ecuador

- **LOPDP:** Texto oficial de la Ley Orgánica de Protección de Datos Personales publicado en el Registro Oficial Suplemento Nº 459 y disponible en portales de gobierno y repositorios jurídicos.[^20][^19][^3]
- **Reglamento General:** Decreto Ejecutivo Nº 904 sobre reglamento a la LOPDP accesible en portales gubernamentales de telecomunicaciones y datos personales.[^11][^21]

## 6. Integración técnica al corpus

### 6.1 Estructura de carpetas sugerida

Siguiendo el patrón ya definido, se puede extender el árbol de directorios de la siguiente forma:

```text
corpus_regulatorio/
  argentina/
    leyes_generales/
      ar_ley_25326_proteccion_datos_actualizada.pdf
    normas_sectoriales/
      ar_bcra_comunicacion_a_7266_incidentes_ti.pdf
    estandares_tecnicos/
      ar_aaip_res_47_2018_medidas_seguridad.pdf
  colombia/
    leyes_generales/
      co_ley_1581_2012_datos_personales.pdf
    normas_sectoriales/
      co_sfc_circular_externa_007_2018_ciberseguridad.pdf
    estandares_tecnicos/
      co_sic_res_003_2018_rnbd_incidentes_seguridad.pdf
  peru/
    leyes_generales/
      pe_ley_29733_proteccion_datos.pdf
      pe_ds_003_2013_jus_reglamento_ley_29733.pdf
    normas_sectoriales/
      pe_sbs_res_504_2021_reglamento_ciberseguridad.pdf
    estandares_tecnicos/
      pe_anpd_directivas_seguridad_incidentes.pdf
  ecuador/
    leyes_generales/
      ec_lopdp_ley_organica_proteccion_datos_personales.pdf
    normas_sectoriales/
      ec_reglamento_general_lopdp_decreto_904_2023.pdf
    estandares_tecnicos/
      ec_superintendencia_datos_resoluciones_notificacion_brechas.pdf
```

Esta organización facilita la automatización de extracción de texto y el mapeo de cada archivo a los registros de la matriz.[^6][^3][^1][^7]

### 6.2 Pipeline de extracción y mapeo

El pipeline técnico definido previamente se aplica aquí de forma análoga:

1. Descargar los PDFs oficiales desde Infoleg, AAIP, BCRA, SIC, SFC, Congreso de Perú, SBS, Registro Oficial, Superintendencia de Protección de Datos y otros portales estatales.[^11][^9][^3][^1][^7][^4]
2. Extraer texto con `pypdf` o `pdfplumber`, limpiando encabezados y pies de página característicos de boletines oficiales.
3. Indexar el texto por país, nivel y tipo de norma.
4. Ejecutar búsquedas de términos clave como “incidente de seguridad”, “ciberseguridad”, “horas”, “días hábiles”, “multa”, “volumen de negocios”, “UIT”, “SMMLV”, para identificar artículos relevantes sobre triggers, plazos y sanciones.[^6][^21][^15]
5. Generar propuestas de valores para las columnas de la matriz y validarlas manualmente para asegurar consistencia jurídica.

## 7. Uso en Incident Responder AI 2.0

Con estos nuevos registros, tus escenarios pueden incorporar:

- Incidentes de brechas de datos personales bajo leyes 25.326, 1581, 29733 y LOPDP, con plazos diferenciados (48–72 h, 15 días hábiles, 72 horas) y sanciones graduadas.[^3][^1][^21][^15]
- Incidentes tecnológicos críticos en bancos y entidades financieras, donde los plazos son inmediatos o de pocas horas y la interacción con reguladores financieros (BCRA, SFC, SBS) se vuelve central.[^7][^4][^6]

Cada decisión de los jugadores (si reportar, cuándo, a quién y con qué contenido) puede compararse con los requisitos del corpus para evaluar el cumplimiento regulatorio en contextos específicos de Argentina, Colombia, Perú y Ecuador, manteniendo la coherencia metodológica con el corpus ya construido para Uruguay, México, Brasil y Chile.[^5][^3][^6][^7]

---

## References

1. [Ley N.° 29733 - Congreso de la República](https://www.gob.pe/institucion/congreso-de-la-republica/normas-legales/243470-29733) - La presente Ley tiene el objeto de garantizar el derecho fundamental a la protección de los datos pe...

2. [Normativa](https://www.rite.gob.ar/imagenes/Herramienta/d6292ab4f44264fc733b9f7e171eeac2.pdf)

3. [LEY ORGÁNICA DE PROTECCIÓN DE DATOS PERSONALES](https://www.gob.ec/regulaciones/ley-organica-proteccion-datos-personales)

4. [Superintendencia de Banca, Seguros y AFP del Perú](https://www.sbs.gob.pe/boletin/detalleboletin/idbulletin/1213) - Entidad encargada de la supervisión de los sistemas Financiero, de Seguros, Privado de Pensiones

5. [[PDF] Resoluci�n S.B.S. N� 504-2021](https://intranet2.sbs.gob.pe/dv_int_cn/2046/v2.0/Adjuntos/504-2021.R.pdf)

6. [[PDF] Superintendencia financiera de Colombia Circular externa 007 de ...](https://www.fundacionmicrofinanzasbbva.org/revistaprogreso/wp-content/uploads/2018/05/Col-CE-007-ciberseguridad.pdf) - PRIMERA: Adicionar el Capítulo V “Requerimientos mínimos para la gestión del riesgo de cibersegurida...

7. [[PDF] COMUNICACIÓN “A” 7266 16/04/2021 A LAS ENTIDADES ... - BCRA](https://www.bcra.gob.ar/archivos/Pdfs/comytexord/A7266.pdf)

8. [ley nacional 25326 2000](https://boletinoficial.buenosaires.gob.ar/normativaba/norma/88070)

9. [Resolución 47 / 2018 - AGENCIA DE ACCESO A LA INFORMACION ...](https://www.argentina.gob.ar/normativa/nacional/resoluci%C3%B3n-47-2018-312662) - APRUEBESE EL DOCUMENTO DENOMINADO “MEDIDAS DE SEGURIDAD RECOMENDADAS PARA EL TRATAMIENTO Y CONSERVAC...

10. [Decreto Supremo N.° 003-2013-JUS - Normas y documentos legales](https://www.gob.pe/institucion/minjus/normas-legales/1941246-003-2013-jus) - Apruébese el Reglamento de la Ley Nº 29733, Ley de Protección de Datos Personales, que consta de VI ...

11. [Reglamento a Ley Orgánica de Protección de Datos ...](https://www.telecomunicaciones.gob.ec/ley-y-reglamento-de-la-ley-de-proteccion-de-datos-personales/) - Reglamento a Ley Orgánica de Protección de Datos Personales |

12. [[PDF] La Superintendenta de Banca, Seguros y Administradoras Privadas ...](https://intranet2.sbs.gob.pe/Preproyectos/6008YVHQTAGWPZKEEMK81FWASC9SH63P76A.PDF)

13. [Resolución AAIP 47/2018](https://www.argentina.gob.ar/normativa/nacional/resoluci%C3%B3n-47-2018-312662/texto) - Portal oficial del Estado argentino. Conocé cómo hacer trámites en organismos públicos, tramitalos e...

14. [Nueva resolución sobre medidas de seguridad y datos personales](https://www.marval.com/publicacion/nueva-resolucion-sobre-medidas-de-seguridad-y-datos-personales-13216) - La nueva Resolución aborda la temática de un modo diferente, aprobando dos anexos con medidas de seg...

15. [Hoy vence plazo para reportar reclamos en RNBD – Blog de Itech Sas](https://www.itechsas.com/blog/proteccion-de-datos/en-agosto-vence-plazo-para-reportar-reclamos-en-rnbd/)

16. [SUPERINTENDENCIA FINANCIERA DE COLOMBIA](https://www.fundacionmicrofinanzasbbva.org/revistaprogreso/wp-content/uploads/2018/05/Col-ANEXO-CE-007-ciberseguridad.pdf)

17. [Nueva regulación colombiana en materia de ciberseguridad ...](https://www.garrigues.com/es_ES/noticia/nueva-regulacion-colombiana-en-materia-de-ciberseguridad-financiera) - La Superintendencia Financiera de Colombia publicó la Circular Externa número 007 de 2018 por medio ...

18. [La Superintendencia de Banca, Seguros y AFP (SBS) de Perú ...](https://iapp.org/news/a/la-superintendencia-de-banca-seguros-y-afp-sbs-de-peru-publica-el-proyecto-de-reglamento-para-la-gestion-de-la-seguridad-de-la-informacion-y-la-ciberseguridad) - Establecer la obligación de contar con un programa específico de gestión de incidentes de cibersegur...

19. [Ley Orgánica de Protección de Datos Personales](https://repositorio.consejodecomunicacion.gob.ec/handle/CONSEJO_REP/246?locale=en) - El objeto y finalidad de la presente ley es garantizar el ejercicio del derecho a la protección de d...

20. [Ley Orgánica de Protección de Datos Personales (379637)](https://www.asambleanacional.gob.ec/es/multimedios-legislativos/63464-ley-organica-de-proteccion-de-datos) - Ley Orgánica de Protección de Datos Personales (379637). Descarga aquí. R.O. No. 459, Quinto Supleme...

21. [Ley Orgánica de Protección de datos personales - Deltech Audit](https://deltechaudit.ec/ley-organica-de-proteccion-de-datos-personales/) - Accede aquí a La Ley Orgánica de Protección de Datos Personales de Ecuador y su Reglamento General

