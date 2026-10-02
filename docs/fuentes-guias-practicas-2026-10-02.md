# Fuentes de las tres guías prácticas

Revisión realizada el 2 de octubre de 2026. El contenido es orientación preparada en español e inglés. No hay consulta de expedientes, comprobación de derechos ni presentación de solicitudes.

## Contrato del módulo

`src/practical-guides.js` exporta `practicalSources` y `practicalGuides`. Los IDs de guía son `padron`, `sanitaria` y `certificado`. Cada guía contiene pregunta, título, introducción, dos o tres pasos, referencias por paso, alcance bilingüe, acciones oficiales, palabras clave, fecha de revisión, versión inglesa y un seguimiento distinto de la guía principal.

El padrón utiliza `territoryKind: "municipality"`; la tarjeta sanitaria, `territoryKind: "region"`. La selección territorial debe guiar al ayuntamiento o servicio competente sin afirmar que el prototipo ha verificado requisitos locales. El certificado FNMT no necesita selección territorial. Todos los identificadores de referencia y acción existen en `practicalSources` y todos los enlaces utilizan HTTPS.

## Padrón municipal

| Fuente                                                                                                                                                                       | Hechos utilizados                                                                                   | Comprobación                                                              |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| [INE: Información general](https://www.ine.es/dyngs/AYU/index.htm?cid=118), sección «Datos de población», pregunta 3                                                         | Altas, bajas y modificaciones corresponden al ayuntamiento.                                         | Contenido de la página recuperado.                                        |
| [Punto de Acceso General: directorio de entidades locales](https://administracion.gob.es/espanaadmon/quienesquien/entidades-locales-ayuntamientos-estructuras-y-directorios) | Permite localizar entidades locales por provincia y municipio.                                      | Página recuperada, con título y selector de ayuntamientos.                |
| [INE: instrucciones técnicas de gestión padronal](https://idapadron.ine.es/repositorio/legislacion/RESOL2FEB.htm), apartados 5.1 y 8.1.1                                     | Alta y documentación padronal son gestiones distintas. El certificado acredita; el volante informa. | Texto consolidado recuperado, publicado desde el índice normativo de INE. |

No se prescribe una lista universal de documentos, una cita, un plazo, una tasa ni el tipo de certificado aceptado por otra administración. El seguimiento orienta a comprobar el documento exigido por el trámite receptor y a solicitarlo en el ayuntamiento.

Se utiliza la URL canónica del directorio sin parámetros de municipio. La URL antigua `pagFront` fue recuperada con una redirección a una entidad local concreta; no se incorpora esa selección accidental. La consulta de inscripción de la sede de INE no se utiliza como acción de alta ni como emisión de certificado municipal. La herramienta de lectura no pudo recuperar esa consulta de sede; la guía se basa en las páginas anteriores, cuyo contenido sí se obtuvo.

## Tarjeta Sanitaria Individual

| Fuente                                                                                                              | Hechos utilizados                                             | Comprobación                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| [Sanidad: Tarjeta Sanitaria Individual](https://www.sanidad.gob.es/areas/saludDigital/tarjetaSanitariaSNS/home.htm) | Identificación en el SNS; emisión autonómica o por INGESA.    | Página recuperada; describe gestión y emisión.                                                                |
| [Sanidad: organismos autonómicos de salud](https://www.sanidad.gob.es/organizacion/ccaa/directorio/home.htm)        | Directorio territorial para localizar el organismo sanitario. | Página recuperada; el HTML contiene 19 áreas del mapa enlazadas, incluidos Ceuta y Melilla.                   |
| [Sanidad: comunidades y ciudades autónomas](https://www.sanidad.gob.es/organizacion/ccaa/home.htm)                  | INGESA atiende el ámbito de Ceuta y Melilla.                  | Contenido y enlace a INGESA recuperados. Fuente de comprobación, no acción adicional de la guía.              |
| [Junta de Andalucía: tarjeta sanitaria](https://www.juntadeandalucia.es/temas/salud/servicios/tarjeta.html)         | Ejemplo de procedimiento propio para pérdida y deterioro.     | Página recuperada. Comprobación de variación territorial; no se trasladan sus requisitos a otras comunidades. |

El seguimiento de pérdida se limita a recomendar buscar el procedimiento de sustitución y contactar con el organismo emisor. No se presenta como procedimiento nacional de duplicado, no se promete gestión en línea para todas las comunidades y no se importan documentos, plazos ni canales de Andalucía al resto del país. Sus referencias visibles respaldan la autoridad competente y el directorio, no una lista universal de requisitos.

Se excluyen consejos médicos y decisiones sobre el derecho a asistencia. La TSI y la Tarjeta Sanitaria Europea son servicios diferentes. Para comprobar esta distinción se consultó también [Sanidad: convenio especial de asistencia sanitaria](https://www.sanidad.gob.es/servCiudadanos/internacional/convenioEspecial.htm). No se integra una guía de la tarjeta europea ni se reutiliza su trámite como solicitud de TSI.

El mapa de Sanidad es una ayuda general. Antes de afirmar que un enlace conduce directamente al trámite de tarjeta de una comunidad, se debe verificar su portal. Si se añade selección territorial, debe utilizar enlaces comprobados por separado y mantener una salida general al directorio.

## Certificado digital FNMT de persona física

| Fuente                                                                                                                 | Hechos utilizados                                                                            | Comprobación                                                             |
| ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [FNMT: certificado de ciudadano](https://www.sede.fnmt.gob.es/certificados/persona-fisica)                             | Certificado individual descargable; distintas vías para obtenerlo.                           | Página actual recuperada con sus cuatro modalidades.                     |
| [FNMT: acreditación presencial](https://www.sede.fnmt.gob.es/certificados/persona-fisica/obtener-certificado-software) | Orden de preparación, solicitud, acreditación y descarga; copia de seguridad recomendada.    | Página actual recuperada. Las instrucciones se limitan a esta modalidad. |
| [FNMT: renovación](https://www.sede.fnmt.gob.es/certificados/persona-fisica/renovar)                                   | Renovación condicionada al certificado anterior; algunos casos requieren nueva acreditación. | Página actual recuperada, incluido el aviso de casos especiales.         |

La renovación tiene seguimiento propio y referencias propias. La guía evita decidir si un certificado concreto puede renovarse y remite a comprobar las condiciones oficiales. No reproduce ventanas de renovación ni tiempos de descarga para evitar tratarlos como una promesa individual.

Las vías DNIe y dispositivo móvil son métodos publicados por FNMT para obtener su certificado; esto no convierte el certificado FNMT en un DNIe ni en un registro Cl@ve. La separación respecto a Cl@ve es una aclaración del producto basada en que son trámites distintos. No se da soporte a certificados de empresa u otros emisores. Ninguna guía pide al usuario subir el certificado, contraseñas o códigos a España.chat.

## Límites y mantenimiento

La fecha de revisión identifica cuándo se recuperó el contenido público. No garantiza disponibilidad futura ni que se haya probado una solicitud autenticada. Los enlaces llevan al sitio oficial responsable; pueden solicitar identificación, cambiar su navegación o redirigir.

No se utilizaron cuentas personales ni se realizó ninguna gestión administrativa durante esta revisión. La capa de conversación debe abstenerse ante «certificado» sin más contexto y distinguir expresamente certificado FNMT, certificado de padrón, Cl@ve y DNIe. Las preguntas territoriales deben pedir solo municipio o comunidad, sin dirección completa, números de documento o información sanitaria.
