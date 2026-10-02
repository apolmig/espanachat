# Ampliación a 14 guías: comprobación

Fecha: 2 de octubre de 2026. Base: `b941d04`.

## Cambios comprobados

- Cuatro familias nuevas: TSE/CPS, renovación/duplicado del permiso español, nacimiento con alternativa sin Cl@ve y NUSS con acreditación del número existente. Principales y seguimientos ES/EN tienen pasos, acciones y fuentes oficiales revisadas.
- Catálogo de 14 guías con seis filtros combinables con búsqueda. Portada e inicio del chat conservan seis consultas frecuentes y acceso al catálogo completo; fuera de cobertura abre el mismo catálogo.
- Selección desde el catálogo conserva conversación. Seguimiento lleva el foco a la respuesta. Escape devuelve el foco al acceso que abrió el diálogo; recuperar resultados vacíos restablece búsqueda/categoría y lleva el foco al campo.
- Enlace NUSS/consult sin conversación ni territorio; reabre una única respuesta y actualiza idioma al elegir inglés. Contrato automatizado recorre las 14 principales y los 14 seguimientos en ambos idiomas.
- Filtro básico NUSS compacto y con barras, guiones o espacios; ensayo de navegador con número sintético bloqueado y mensaje específico.

## Validación

`npm run build` y `npm test`: **43 pruebas pasan**, incluidas licencias y empaquetado Sites. Resultado en `tests.txt`. No se cambian dependencias ni los cuatro archivos protegidos de Sites.

`browser-checks.json` registra vistas de 320, 390, 768 y 1440 px: sin desbordamiento horizontal, filtros y controles del formulario de al menos 44 px. Se recorrieron nacimiento, NUSS, TSE y conducción con seguimientos, fuentes, enlace y catálogo en inglés. Consultas naturales sobre partida de nacimiento con DNI, acreditación del NUSS y European health card abren sus guías; NUSS y vida laboral juntos se abstienen.

La revisión independiente encontró y corrigió confusiones entre puntos y pérdida del documento, ADR/permisos extranjeros, partida y certificado FNMT, inscripción de nacimiento, alta de trabajador y modalidad presencial. Los casos quedan en el corpus de regresiones. Las páginas TSE/CPS abren información oficial verificada que enlaza la solicitud; no se afirma que el formulario de Prestaciones haya sido probado, pues devolvió cuerpo vacío.

Capturas locales: `local-health-catalog-mobile.jpg`, `local-driving-catalog-english.jpg` y `local-privacy-320.jpg`. Consola del recorrido sin avisos ni errores.

## Publicación

Tras el commit y el push se comprueba el estado `ready` del proyecto Netlify existente y su correspondencia con el commit. La evidencia de producción se guarda en `release.json`, `production-browser-checks.json` y `production-catalog-mobile.jpg`, excluidas del build.

## Límites

Tamaños emulados y controles observados no constituyen certificación WCAG ni pruebas en teléfonos físicos. No se realizan solicitudes ni se usan cuentas reales. No hay IA, integración gubernamental, subida de documentos ni recogida de opiniones. La privacidad sigue siendo un filtro básico de patrones.
