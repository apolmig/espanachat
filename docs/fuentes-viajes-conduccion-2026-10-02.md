# Fuentes de viajes y conducción

Revisión de contenido público: 2 de octubre de 2026. Se recuperó y leyó el cuerpo de las páginas que llevan `reviewedAt` en `src/travel-driving-guides.js`. No se accedió a expedientes ni se probó una solicitud con identidad real.

## Tarjeta Sanitaria Europea y certificado provisional

| Clave     | Fuente oficial                                                                                                                                               | Evidencia utilizada                                                                                                     |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `tseInfo` | [Seguridad Social: TSE](https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/PrestacionesPensionesTrabajadores/10938/11566/1761?changeLanguage=es) | Apartados de solicitud, vigencia y usos excluidos. El cuerpo remite al Portal de Prestaciones para solicitar o renovar. |
| `cpsInfo` | [Seguridad Social: guía CPS](https://revista.seg-social.es/-/como-solicitar-el-certificado-provisional-sustitutorio-cps)                                     | Supuestos del CPS, solicitud por distintos métodos de identificación, descarga y carácter individual del documento.     |

La guía `tse` se diferencia de `sanitaria`: la primera trata estancias temporales en el extranjero; la segunda, la tarjeta del servicio autonómico de salud. El detalle `provisional` explica qué consultar si la tarjeta no puede emitirse o no llega para el viaje.

El Portal de Prestaciones está enlazado desde la información oficial, pero su [URL directa](https://prestaciones.seg-social.es/servicio/tarjeta-sanitaria-europea-certificado-provisional-sustitutorio.html) devolvió cuerpo vacío en las dos variantes consultadas durante esta revisión. Por ello, no se le asigna una fecha de revisión ni se presenta como formulario probado: las acciones abren las páginas informativas con cuerpo recuperado, desde las que se accede al servicio.

Límites editoriales: no decidir el derecho de una persona a la asistencia ni garantizar cobertura en un país concreto. No prometer entrega antes del viaje, gratuidad de toda asistencia o tramitación instantánea. No enumerar reglas de nacionalidad, documentación personal o plazos variables. No ofrecer consejo médico.

## Renovación y duplicado del permiso de conducir

| Clave              | Fuente oficial                                                                                                                                                                               | Evidencia utilizada                                                                                                      |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `dgtRenewal`       | [Sede DGT: renovación](https://sede.dgt.gob.es/es/permisos-de-conducir/obtencion-y-gestion-de-permisos/renovacion-de-permiso-proximo-a-caducar/)                                             | Rutas de renovación, informe de aptitud, conservación del justificante y procedimientos diferentes para otros supuestos. |
| `dgtRenewalInfo`   | [DGT: permiso próximo a caducar](https://www.dgt.es/nuestros-servicios/permisos-de-conducir/ha-caducado-o-necesitas-una-copia-de-tu-permiso/renovar-un-permiso-proximo-a-caducar/index.html) | Tramitación completa desde un centro autorizado, costes diferenciados y límites del provisional.                         |
| `dgtCentres`       | [DGT: centros autorizados](https://www.dgt.es/conoce-la-dgt/con-quien-trabajamos/centros-reconocimiento-conductores/)                                                                        | Directorio con filtros de provincia y población.                                                                         |
| `dgtDuplicate`     | [Sede DGT: duplicado](https://sede.dgt.gob.es/es/permisos-de-conducir/obtencion-y-gestion-de-permisos/duplicado-de-permisos)                                                                 | Permiso vigente, misma caducidad, canales y obtención del provisional.                                                   |
| `dgtDuplicateInfo` | [Revista DGT: solicitar duplicado](https://revista.dgt.es/es/tramites/2026/0624-Duplicado-permiso-de-conducir.shtml)                                                                         | Confirmación de pérdida, robo o deterioro y consulta de canales oficiales. Artículo publicado el 26 de agosto de 2026.   |

La guía `conducir` cubre renovar un permiso español con residencia en España. El detalle `duplicate` cubre sustitución del documento por pérdida, robo o deterioro mientras el permiso sigue vigente.

Límites editoriales: no presentar un duplicado como renovación; no cubrir obtención inicial, exámenes, canjes, pérdida de puntos, sanciones, autorizaciones ADR ni permiso de circulación de un vehículo. No evaluar aptitud psicofísica, calcular tasas personalizadas o prometer plazos de entrega. La renovación y el duplicado conservan todos los datos de identificación en los servicios oficiales.

## Contrato y comprobaciones de integración

- Dos guías y dos detalles, todos en español e inglés, con tres pasos y fuentes por paso.
- Ninguna guía solicita municipio, datos de identidad o información médica dentro del chat.
- `tse` / `provisional` y `conducir` / `duplicate` son los únicos identificadores nuevos que pueden incorporarse al catálogo y a enlaces compartidos.
- Las preguntas y palabras clave permiten integrar búsqueda y reconocimiento determinista; este módulo no añade un modelo de IA ni una conexión administrativa.
