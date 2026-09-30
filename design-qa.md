# Revisión de diseño y funcionamiento

Fecha: 30 de septiembre de 2026.

Resultado final: **passed**.

Este resultado cubre el prototipo local adaptado a España. No certifica una IA, una integración gubernamental, licencias comerciales ni un despliegue, que aún no existen.

## Referencia y condiciones

Referencia: https://america.gov/, inspeccionada en el navegador, con sus tipografías, iconos, estilos y estados visibles. Implementación: http://127.0.0.1:4173/, build de producción.

Se compararon escritorio de 1440 × 1000 y móvil de 390 × 844, DPR 1, portada en español, carrusel pausado, sin menú abierto y sin consulta escrita. La salida de capturas del navegador tiene 1394 × 993 y 380 × 822 píxeles respectivamente, igual en referencia e implementación final. Las primeras capturas de la implementación tenían un scrollbar distinto y se normalizaron únicamente para comparar; las finales no requieren escalado.

## Evidencia comparativa

Las imágenes combinadas sitúan la referencia a la izquierda y la implementación a la derecha:

- [Escritorio inicial](qa/desktop-initial.png) y [escritorio final](qa/desktop-final.png).
- [Móvil inicial](qa/mobile-initial.png) y [móvil final](qa/mobile-final.png).
- [Detalle del formulario](qa/composer-detail.png).
- [Página completa](qa/full-page-comparison.png), con iguales anchos y diferencias de longitud debidas al contenido adaptado.
- [Características en escritorio](qa/feature-desktop-final.png), [chat móvil](qa/chat-mobile-final.png) y [PDF leído](qa/pdf-test-passed.png).

## Cinco superficies de fidelidad

| Superficie | Evaluación final |
| --- | --- |
| Proporciones y composición | Cabecera, saludo, foto, formulario, carrusel, manifiesto, cuatro beneficios, avances y pie conservan la jerarquía. Las cuatro ilustraciones quedan a la izquierda en escritorio y se apilan en móvil. |
| Tipografía | Rhymes Text/Display y Helvetica Now locales. Saludo de 96/48 px; manifiesto grande de 96 px en escritorio; beneficios con Helvetica Display 500 de 36/28 px. Se ajustó el ritmo de líneas al texto español. |
| Espaciado y densidad | Foto central de 688 px, formulario con márgenes interiores de 16 px, botones de envío de 48 px, radios amplios y separación entre beneficios. La portada móvil no muestra desbordamiento horizontal. |
| Color y tratamiento visual | Tinta, azul marino y enlace siguen la referencia. La foto española y el mosaico esférico se generaron como activos propios; los logotipos españoles son recursos oficiales locales. Se conserva la composición del candado sobre estrellas y círculo blanco. |
| Anatomía, estados e interacción | Formulario, controles del carrusel, menú, fuentes, respuesta por pasos, copia, valoraciones y consultas siguientes funcionan. Menú y modales usan diálogo nativo, foco visible y cierre con Escape. Se respeta movimiento reducido. |

## Historial de correcciones

1. La portada inicial desplazaba su contenedor al pulsar el carrusel. Se corrigieron el recorte y el margen superior; el título recuperó su posición.
2. El campo perdía lo escrito al cambiar la diapositiva. Se mantuvo montado y el carrusel se pausa al enfocar la consulta.
3. Los controles móviles quedaban a la izquierda y tenían tamaños distintos. Se alinearon a la derecha y se ajustaron a 40/48 px; se corrigió el scrollbar horizontal.
4. Los títulos de beneficios usaban serif. Se sustituyeron por la fuente sans de la referencia y se comprobó la carga de Helvetica Display 500.
5. La comparación completa detectó filas alternadas y un manifiesto demasiado pequeño. Se igualó el orden de las cuatro filas y se amplió el manifiesto.
6. Dos SVG exportados no tenían espacio de nombres XML. Se restauró el atributo y el relleno de las estrellas; el candado recuperó su círculo blanco. Se corrigió además un texto alternativo que describía erróneamente una familia.

No quedan diferencias P1 o P2 abiertas dentro del alcance adaptado. Las diferencias intencionales son la identidad española, el aviso independiente, el contenido más breve de ciertas secciones, los organismos y fotografía propios, tres tarjetas de avances y el chat de guías locales. No se reproducen cifras, promesas de IA ni futuras gestiones de la referencia.

## Comprobaciones funcionales

- Carrusel anterior/siguiente/pausa, conservación de entrada, menú, Escape e idioma español/inglés.
- Guías de vida laboral y paro, fuentes oficiales, copia comprobada en el portapapeles, valoración, seguimiento y reinicio de conversación.
- Pregunta desconocida con respuesta de abstención, y bloqueo de un DNI sintético.
- PDF sintético de una página con lectura local correcta; error comprensible para archivo inválido. Sin subida, OCR ni resumen generado por IA.
- Páginas informativas, FAQ desplegable y formulario de opinión con aviso de que no envía datos.
- Cero errores de consola en la pestaña de revisión final.
- `npm test`: 9 pruebas aprobadas. `npm run build`: build generado con cliente, adaptador y contrato de alojamiento del starter.
- Repositorio limpio: `npm ci` seguido de `npm run build && npm test` finaliza correctamente. Netlify ejecuta el build antes de las pruebas que verifican sus archivos.

El dictado requiere soporte y permiso del navegador y no se probó con micrófono. No se enviaron datos personales reales.

## Crédito e identidad para compartir

Se añadió `Made with ♥ by apolmig`, a 12 px en escritorio y 11 px en móvil, junto al aviso del pie. El enlace apunta al perfil de GitHub, abre una pestaña nueva y usa `noopener noreferrer`; el corazón tiene un nombre accesible. Se comprobó que queda visible en ambos diseños: [escritorio](qa/footer-credit-desktop.png) y [móvil](qa/footer-credit-mobile.png).

Se revisaron el favicon SVG, los tres tamaños del ICO (16/32/48), el PNG de 32 px, el icono Apple de 180 px y los iconos del manifiesto de 192/512 px. La tarjeta social tiene exactamente 1200 × 630 px. El head servido incluye Open Graph, X, texto alternativo y URLs absolutas para el dominio previsto. Build y 9 pruebas aprobadas, sin errores de consola. Las vistas previas sociales públicas requieren el despliegue futuro del dominio.

## Tarjeta fotográfica para WhatsApp

La captura enviada por el usuario muestra un recorte central cuadrado de aproximadamente 90 px: la marca alineada a la izquierda de la v1 quedaba cortada y los textos pequeños no se leían. La v2 generada con ImageGen utiliza una vista cálida de Sevilla y una única marca dentro del área central. Se verificó la imagen completa y se compararon ambas versiones con el mismo [recorte central de 90 × 90 px](qa/social-card-thumbnail-comparison.png). Esta es una simulación de recorte, no una captura de una conversación real ni una garantía de formato para todos los clientes de WhatsApp.

La exportación mide 1200 × 630 px y pesa 275.101 bytes en JPEG. El head apunta a `https://espana.chat/social-card-v2.jpg`, con tipo `image/jpeg`, dimensiones y texto alternativo correctos. Se acortó la descripción social. El PNG anterior se actualiza con la misma imagen como compatibilidad; el nuevo nombre de URL permite distinguir la nueva versión. El dominio canónico sigue la redirección pública www → apex comprobada en esta sesión. El build y las 9 pruebas pasan.
