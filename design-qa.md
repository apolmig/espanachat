# QA del prototipo: responsive y guías

final result: passed

Fecha: 2 de octubre de 2026. Implementación local: http://127.0.0.1:4173/. Esta revisión aplica el encargo de mantener la máxima semejanza con America.gov, mejorar móvil y tablet, sustituir las escenas estadounidenses y conservar las siete guías prácticas.

## Fuentes y comparación

Fuente visual: `qa/audit-2026-10-02/01-america-desktop.jpg` y `qa/audit-2026-10-02/03-america-mobile.jpg`, capturas de America.gov obtenidas durante la comparación previa de este proyecto. Se abrieron de nuevo y se compararon con la implementación renderizada, mediante imágenes conjuntas, antes de aceptar el resultado.

Implementación: `qa/responsive-2026-10-02/desktop-1440-final.jpg` y `mobile-390-final.jpg`.

- Escritorio: viewport solicitado 1440 × 1000; ambas capturas guardadas miden 1430 × 993 píxeles.
- Móvil: viewport solicitado 390 × 844; ambas capturas guardadas miden 380 × 822 píxeles.
- El navegador devuelve esas dimensiones para los JPEG. No se remuestrearon las parejas de comparación ni se asumió una densidad física de dispositivo.
- Estado: portada sin consulta enviada, aviso y menú cerrados, carrusel detenido. Fotos, país y ejemplo de consulta se localizan deliberadamente. La referencia de escritorio tiene foco y cursor en el campo; la implementación tiene foco en un control del carrusel. Esa diferencia explica el contorno del campo y no se utiliza para evaluar medidas del diseño.
- Comparaciones completas: `qa/responsive-2026-10-02/desktop-comparison.jpg` y `mobile-comparison.jpg`.
- Comparación del campo y los iconos, a escala de captura: `qa/responsive-2026-10-02/composer-comparison.jpg`.
- Composición de entrega con capturas reales: `qa/responsive-2026-10-02/responsive-preview.jpg`.

## Historial de corrección

1. [P2] En móvil, la altura y el recorte dejaban la parte superior de una persona demasiado cerca del campo superpuesto. Evidencia: `mobile-390-v1.jpg`. Se cambió la proporción móvil a cuadrada y se ajustaron el relleno y la altura del campo. Verificación posterior: `mobile-390-final.jpg`, `mobile-work-final.jpg` y `mobile-coast-final.jpg`. Los rostros se pueden leer; la foto costera conserva un recorte más ajustado en el pelo, considerado refinamiento P3.
2. [P2] Al ocultar los saltos de línea del manifiesto, varias frases quedaban unidas y se cortaban horizontalmente. Evidencia: `mobile-manifesto-v1.jpg`. Se añadieron espacios explícitos en JSX. Verificación posterior: `mobile-manifesto-final.jpg`; las frases se separan y envuelven dentro del ancho disponible en ambos idiomas.
3. [P2] El ejemplo de alquiler producía un scrollbar de un píxel por la altura del textarea. Se aumentó a 48 px con línea de 22 px. Verificación posterior: controles de viewport e imágenes finales; clientHeight y scrollHeight son iguales en 320 y 390.

No quedan hallazgos accionables P0, P1 o P2 dentro del alcance implementado.

## Cinco superficies de fidelidad

- **Tipografía:** se mantienen las familias del prototipo, Rhymes y Helvetica Now, el gran saludo serif y el cuerpo sans. En escritorio se conserva la escala y el ritmo de la referencia. Los tamaños fluidos se limitan a tablet y móvil. Los títulos largos y las preguntas envuelven sin cortar palabras. La legibilidad del pie del chat pasa de 9 a 12 px en móvil.
- **Espaciado y estructura:** saludo, subtítulo, fotografía con pregunta, controles circulares y secciones amplias siguen en el mismo orden. La foto es más baja en móvil y los accesos a guías aparecen después del carrusel, como modificación solicitada. Tablet usa columnas con mínimo cero y las tarjetas conceptuales se apilan en el tramo 701–900. No hay desbordamientos en los elementos medidos.
- **Colores y tokens:** se conservan azul marino #002664, texto #000c1f, fondos claros, sombras suaves y bordes redondeados. El brillo fotográfico cambia de color con las escenas españolas, como en el carrusel original.
- **Imágenes y activos:** las tres fotografías estadounidenses ya no aparecen en la interfaz. Las nuevas escenas sintéticas de piso, calle de Madrid y paseo costero tienen iluminación editorial natural; los WebP son 1200 × 800 y pesan aproximadamente 100–142 KB. Se revisaron los maestros y su uso en portada y tarjeta conceptual. La fotografía previa del pueblo español se conserva. No se han sustituido imágenes por dibujos CSS o iconos improvisados.
- **Texto y contenido:** se mantienen las siete guías, sus pasos y enlaces. Los accesos cortos están traducidos y abren su guía. Se mantiene el aviso de prototipo independiente y la declaración de guías locales sin IA. La clasificación se abstiene para sanidad y padrón en vez de devolver DNI/Cl@ve por un término genérico. Esto no amplía la cobertura a esos temas.

## Verificación funcional y responsive

`viewport-checks.json` contiene medidas del navegador para 320 × 740, 390 × 844, 768 × 1024, 1024 × 768 y 1440 × 1000. En todos los tamaños: siete accesos, ningún elemento principal medido fuera del ancho y ningún desbordamiento horizontal de documento.

Probado en el navegador:

- Portadas y recortes a los cinco tamaños; titulares, tarjetas inferiores y la nueva foto familiar en móvil.
- Carrusel: anterior, siguiente y pausa.
- Menú móvil, selector de idioma, traducción al inglés y retorno a español.
- Acceso Work history desde la portada, respuesta con sus tres pasos y enlace oficial.
- Panel de fuentes móvil y cierre mediante Escape.
- Borrar la conversación y comprobar las siete sugerencias del chat vacío.
- Consulta real de prueba “Quiero renovar mi tarjeta sanitaria”: muestra falta de guía y enlace al PAG, sin guía de DNI.
- Consola: no se registraron errores ni advertencias en las pruebas.
- `npm run build`: correcto; conserva los archivos requeridos de Sites.
- `npm test`: diez pruebas correctas, incluidos los casos de regresión del clasificador y el empaquetado.
- `git diff --check`: correcto.

Capturas de interacción: `menu-mobile-final.jpg`, `mobile-english-final.jpg`, `chat-mobile-english-final.jpg`, `sources-mobile-final.jpg`, `chat-empty-mobile-final.jpg`, `no-coverage-mobile-final.jpg`, `roadmap-mobile-final.jpg` y `preview-cards-mobile-final.jpg`.

## Límites y siguiente pulido

- [P3] Puede afinarse el encuadre del pelo en la escena costera, manteniendo el rostro visible y el campo sobre la fotografía.
- La revisión usa emulación de tamaños. No certifica WCAG ni reemplaza pruebas de teclado virtual, lector de pantalla y teléfonos físicos.
- No se ha conectado IA, cambiado el contenido administrativo de las guías, actualizado sus fechas por fuente ni publicado la web. Las mejoras de cobertura territorial y trazabilidad documental quedan para la siguiente fase.

## Lista de aceptación

- [x] Estilo de America.gov conservado y comparación conjunta realizada.
- [x] Móvil y tablet revisados; controles de adjuntar, voz y envío de al menos 44 px en móvil.
- [x] Fotografías españolas incorporadas y optimizadas; prompts y maestros documentados.
- [x] Siete guías accesibles desde portada y chat.
- [x] Casos de clasificación incorrecta reproducidos y corregidos.
- [x] Build, pruebas y consola revisados; preview local listo para seguir iterando.

## Segunda iteración: guías y fuentes

Resultado: pasado. Fecha: 2 de octubre de 2026. Esta sección actualiza la mejora de trazabilidad que quedaba pendiente en la primera revisión. Evidencia completa y fuentes primarias: `qa/guides-2026-10-02/README.md`.

Se mantiene la composición responsive anterior. En el chat, las siete familias incorporan un seguimiento propio con contenido distinto, enlace para volver a la guía principal, referencias por paso, acciones concretas y ámbito del organismo. Las guías muestran su revisión editorial y las fuentes recuperables su propia fecha. La respuesta sin cobertura ofrece los siete temas y una sola fuente pertinente, sin fecha ficticia. Los certificados digitales dejan de activar la guía de registro en Cl@ve.

Correcciones verificadas:

1. [P2] Las sugerencias anteriores cambiaban de tema. Ahora resuelven una duda del mismo trámite en español e inglés. Las pruebas verifican que el contenido del seguimiento difiere de la guía principal.
2. [P2] Una consulta sin cobertura podía dejar contexto de una guía anterior para la siguiente pregunta corta. Se usa la última respuesta, incluida la que no tiene cobertura. Reproducción de navegador guardada en `browser-checks.json`.
3. [P2] La respuesta nueva se desplazaba hasta el final y ocultaba el principio en móvil. Ahora se alinea al inicio con un margen de 112 px para la cabecera. Medida de verificación: título a 158 px y final de cabecera a 80 px.
4. [P2] Al desaparecer las sugerencias iniciales, se perdía el foco de teclado. El foco pasa a la respuesta solo si desaparece el control que la abrió; se conserva en el campo al escribir. Borrar sitúa el foco en el contenido y vuelve al inicio.

Las superficies visuales conservan tipografía, anchura central, azul marino, campo fijo y diálogo redondeado. Se compararon de nuevo las capturas de America.gov de chat y fuentes con `desktop-guide-final.jpg`, `desktop-source.jpg` y las capturas móviles. Las citas numeradas y la indicación de ámbito son cambios deliberados de contenido; no se modifica la portada ni su fotografía. No quedan hallazgos accionables P0, P1 o P2 en este alcance.

Verificación: 14 pruebas correctas y build correcto. Viewports 320, 390, 768 y 1440 px sin desbordamientos medidos. Fuentes y Escape, navegación por teclado, respuesta sin cobertura, seguimiento escrito, traducción y copia del seguimiento comprobados. Consola sin errores ni advertencias. Las capturas de comparación se conservan como historial; `guides-preview.jpg` presenta el resultado de esta iteración.

Límites: guías preparadas sin IA conectada; enlaces informativos comprobados sin completar trámites autenticados. No se certifica WCAG ni el comportamiento de un teclado virtual o lector de pantalla físico. El refinamiento P3 de la fotografía costera de la primera iteración permanece fuera de esta mejora.

## Revisión para producción

Fecha: 2 de octubre de 2026. Sitio existente confirmado: `espana-chat` en Netlify, `https://espana.chat`. La publicación está autorizada por el usuario. Se conserva su configuración de dominios y la compatibilidad de empaquetado con Sites.

- Se retiran del directorio público las fuentes Rhymes/Helvetica Now, las fotografías estadounidenses y los SVG de la referencia sin permisos documentados. Inter y Libre Caslon Display, bajo SIL OFL, conservan el contraste entre serif y sans. Los iconos y las ilustraciones de dispositivos se generan con Phosphor bajo MIT. Las licencias se distribuyen junto a los activos.
- Se mantiene el saludo central, el campo fotográfico, el carrusel, el azul marino, las secciones amplias y las escenas españolas. Capturas locales a 320, 390 y 1440 px en `qa/production-2026-10-02/`. Mediciones a 320, 390, 768 y 1440 px: sin desbordamiento horizontal, siete accesos visibles en la navegación y ningún error de carga de imagen completa.
- Se evita enviar una consulta con Enter durante la composición de texto con IME. Se comprueban una guía, su seguimiento y el panel de fuentes en móvil. Un PDF sintético de una página se lee localmente y ofrece la guía relacionada. Consola sin errores ni advertencias en este recorrido.
- Se añade una prueba de empaquetado que exige las nuevas fuentes y sus licencias y evita publicar los activos archivados, las fotografías originales y las capturas de QA.
- La revisión de dependencias detectó avisos en Vite y dependencias del build. Se aplica Vite 6.4.3 y actualizaciones compatibles de dependencias transitivas. `npm audit fix` termina con cero vulnerabilidades comunicadas por el registro. [Aviso oficial de Vite](https://github.com/vitejs/vite/security/advisories/GHSA-fx2h-pf6j-xcff). La web publicada es estática, sin servidor de desarrollo.

El build y las 15 pruebas pasan antes de publicar. La verificación del despliegue debe confirmar estado `ready`, commit y dominio principal, además de las rutas, guías, recursos y PDF en producción. El registro operativo posterior y sus capturas se conservan en la carpeta de QA local. No se declara una certificación de accesibilidad ni una auditoría exhaustiva de seguridad. Sigue siendo un prototipo independiente con guías preparadas y sin IA conectada.
