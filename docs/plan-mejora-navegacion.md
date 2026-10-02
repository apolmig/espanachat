# Navegación y teclado de las guías

Fecha: 2 de octubre de 2026. Base publicada: `215458c`. Continuación autorizada por el usuario.

## Problemas observados

1. Cambiar o cancelar el territorio desmonta el control activo y deja el foco en el cuerpo de la página.
2. Un seguimiento deshabilita el botón que lo abrió, desplaza la página y deja el foco fuera de la respuesta.
3. El diálogo de funcionamiento sigue enumerando siete temas.
4. Tras iniciar una consulta, acceder a otra guía depende del menú, de escribir una pregunta o de borrar el chat. Falta una forma directa de explorar el catálogo.

Capturas actuales de producción y notas: `qa/usability-2026-10-02/`. El alcance usa los controles, tipografía y diálogos existentes; mantiene portada y fotografías.

## Entrega acotada

- Corregir foco de cambiar, cancelar y seguimiento. Cancelar restablece la selección real y limpia el error. Escribir conserva el foco del compositor.
- Catálogo buscable de diez guías desde la cabecera del chat y el menú. Elegir una añade una respuesta sin borrar las anteriores; búsqueda sin resultados permite recuperar el catálogo.
- Copiar enlace de guía principal o seguimiento con identificadores permitidos e idioma. Reabrir `/chat` muestra esa guía. No se codifican consultas, municipio, comunidad, documentos ni conversación en el enlace.
- Corregir explicación ES/EN y documentar selección territorial opcional.
- Revalidar Castilla-La Mancha; mantener aviso pendiente si no se recupera contenido oficial verificable.

## Criterios de aceptación

1. Cambiar → campo; cancelar → Cambiar; seguimiento → respuesta; compositor → mismo campo. Sin autofocus al leer una guía general.
2. Catálogo accesible a 320, 390, 768 y 1440 px, resultados en ambos idiomas, Escape/restauración de foco y conversación conservada.
3. Enlaces permitidos reabren principal/seguimiento/idioma; parámetros inválidos no ejecutan texto libre ni añaden contexto territorial.
4. Build y pruebas pasan, activos y Sites conservados, consola sin errores en el recorrido.
5. GitHub y Netlify comparten commit; estado `ready`; verificación de catálogo, enlace directo y teclado en producción.

Sin nuevas dependencias, almacenamiento de consultas ni IA. La revisión con tamaños emulados no certifica WCAG ni teléfonos físicos.
