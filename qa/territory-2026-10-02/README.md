# QA: diez guías y orientación territorial

Fecha: 2 de octubre de 2026. Plan registrado antes de integrar: [plan de versión](../../docs/plan-version-10-guias.md). Base: `a11b8b3`.

## Resultado local

- Build de producción correcto y empaquetado Sites conservado.
- 32 pruebas automatizadas: preguntas, variantes ES/EN, ambigüedad, seguimientos, territorio, referencias y empaquetado.
- Revisión independiente de 144 combinaciones de contenido, idiomas y destinos: referencias y acciones válidas.
- `npm audit`: 0 vulnerabilidades comunicadas por el registro.
- Portada: 10 accesos, sin imágenes rotas ni desbordamiento horizontal a 320 × 740, 390 × 844, 768 × 1024 y 1440 × 1000.
- Formulario sanitario inglés: sin desbordamiento a los mismos anchos, controles de al menos 48 px de altura.
- Consola del recorrido local: sin errores ni advertencias.

## Recorrido de navegador

`browser-checks.json` guarda observaciones de DOM y medidas. Las capturas JPEG se conservan localmente fuera del directorio publicado.

1. Padrón general → Madrid: alta en su enlace propio; certificado en un destino distinto.
2. Madrid → Barcelona; seguimiento de la tarjeta antigua conserva Madrid.
3. Alpedrete desde campo explícito: aviso de enlace municipal no revisado y directorio oficial. Cuenca desde una frase libre: guía general y selector, sin heredar municipio anterior.
4. Tarjeta sanitaria general: 19 territorios. Ceuta usa INGESA; Cataluña diferencia primera tarjeta y duplicado.
5. Fuentes oficiales en 320 px y cierre mediante Escape.
6. Dos trámites simultáneos: respuesta de falta de coincidencia. Renovación FNMT: contenido de renovación en español e inglés.
7. Respuesta corta «Andalucía» tras tarjeta sanitaria inglesa conserva el trámite y elige su servicio.
8. Error municipal para texto de puntuación, etiquetas visibles y envío con teclado. Nueva respuesta recibe foco; borrar vuelve a `main` y diez sugerencias.

## Límites

No se completaron solicitudes administrativas ni accesos autenticados. La clasificación es local y conservadora. Solo siete ayuntamientos tienen enlace revisado; los demás usan el directorio. Castilla-La Mancha muestra una ficha oficial localizada cuyo contenido no se pudo recuperar, con aviso explícito y alternativa de Sanidad. La emulación no sustituye lector de pantalla, teclado virtual ni dispositivos físicos.

El registro de publicación y comprobación del mismo commit se guardará en `release.json`; la publicación no se considera confirmada hasta estado `ready` y revisión del sitio vivo.
