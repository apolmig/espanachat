# Revisión y mejora de navegación

Fecha: 2 de octubre de 2026. Base de producción capturada: `215458c`. Plan: [navegación y teclado](../../docs/plan-mejora-navegacion.md).

## Recorrido y hallazgos

1. **Entrada al chat.** Diez preguntas disponibles, pero acceder a otra guía después de consultar requiere escribirla o pasar por el menú. `01-before-chat.jpg` muestra el estado inicial. Mejora: botón Guías en el chat y catálogo filtrable desde el menú.
2. **Territorio.** Cambiar y cancelar desmontan el botón activo. Reproducción actual: foco en BODY al cambiar; formulario visible en `02-before-change.jpg`. Mejora: foco al campo y retorno a Cambiar, con restauración del valor real y limpieza de errores.
3. **Explicación.** `03-before-explanation.jpg` todavía enumera siete temas. Se corrige a diez y explica la selección territorial opcional. Resultado en `06-explanation-after.jpg`.
4. **Explorar y compartir.** Catálogo en `04-catalog-mobile.jpg` y `05-catalog-english.jpg`. Enlaces de guía principal y seguimiento con IDs permitidos e idioma; nunca texto, municipio, comunidad ni conversación. Reabrir muestra una guía general nueva.

## Verificación local

- Build correcto y 38 pruebas pasando. Incluye ida/vuelta de todos los enlaces ES/EN y sus seguimientos, parámetros desconocidos/duplicados, detalles inválidos y ausencia de contexto privado serializado.
- Catálogo a 320, 390, 768 y 1440 px: sin desbordamiento de documento o diálogo, campo de 48 px y resultado de 83 px.
- Cabecera inglesa en esos cuatro tamaños: sin desbordamiento, botones Guías/Menú de al menos 44 px y sin solapamiento.
- Buscar PADRON sin acento; FNMT en inglés; búsqueda sin resultados y recuperación de las diez guías.
- Elegir una guía conserva las respuestas previas; Escape restaura Explorar guías.
- Cambiar/Cancelar municipal y regional: campo/selector enfocado, valor anterior restaurado y error eliminado. Sin autofocus inicial.
- Seguir una respuesta mediante Enter: foco en la respuesta nueva. Enviar con Enter desde compositor: foco en textarea.
- Copiar certificado de padrón después de elegir Madrid: enlace sin Madrid. Abrir: seguimiento correcto, campo municipal vacío y una sola respuesta.
- Cambiar idioma de un enlace directo actualiza su URL; recarga conserva idioma. Borrar elimina parámetros del enlace.
- Explicación del chat actualizada a diez temas y selección opcional. Consolas de las dos pestañas de prueba sin errores ni advertencias.
- `npm audit`: 0 vulnerabilidades comunicadas por el registro.

Evidencia de DOM, foco, medidas y enlaces en `browser-checks.json`; pruebas en `tests.txt`; dependencias en `dependency-audit.json`. Las capturas se conservan fuera del directorio publicado. El registro posterior del despliegue estará en `release.json`.

## Límites

La revisión combina capturas, DOM y teclado de navegador. No certifica WCAG ni teclado virtual, lector de pantalla o teléfonos físicos. No se amplían temas ni se conecta IA. La fuente de Castilla-La Mancha fue reintentada; no se recuperó su contenido directamente, por lo que mantiene el aviso de revisión pendiente y directorio alternativo. No se completaron trámites autenticados.
