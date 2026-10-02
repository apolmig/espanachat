# Próxima versión: diez guías y orientación territorial

Fecha: 2 de octubre de 2026. Base publicada: commit `a11b8b3`, Netlify `espana-chat`, https://espana.chat. El usuario autoriza planificar, implementar y publicar los puntos 1 y 2 propuestos.

## Resultado y alcance

Diez familias de guías preparadas, en español e inglés: las siete existentes más padrón, tarjeta sanitaria individual y certificado digital FNMT de persona física. El chat entiende variantes naturales y solicita el territorio necesario para encontrar el organismo responsable. Se mantiene la composición de America.gov, las fotografías españolas y los avisos de prototipo independiente.

La conexión de IA y la recogida de valoraciones pertenecen a una fase posterior. En esta versión las consultas se resuelven localmente, los PDF no se suben y no hay nuevos proveedores, almacenamiento de conversaciones ni solicitudes administrativas.

## Orden de trabajo y responsabilidades

1. Revisar contratos actuales y registrar el plan antes de editar la integración.
2. Investigar fuentes oficiales en paralelo: contenido de las tres guías, servicios territoriales y corpus de consultas. Cada agente tiene archivos exclusivos; la integración y la publicación las hace el agente principal.
3. Integrar datos, resolución de consultas, contexto territorial y controles accesibles en la respuesta. Revisar las fuentes y los cambios de cada agente.
4. Verificar respuestas y casos límite con pruebas y navegador, comparar con la composición publicada y corregir los fallos.
5. Construir, comprobar dependencias, guardar el commit, subir a `main` y confirmar el mismo commit en producción. Verificar después el dominio principal y registrar evidencias.

## Contratos de contenido

- Cada guía tiene pregunta, título, introducción, dos o tres pasos, fuentes numeradas por paso, acciones con etiqueta precisa, ámbito, revisión y un seguimiento con contenido distinto, todo en español e inglés.
- Cada fuente conserva nombre, URL HTTPS, dominio y fecha de revisión solo si se ha recuperado su contenido. Los enlaces no equivalen a integraciones.
- Padrón orienta al ayuntamiento y distingue alta y documentación acreditativa. Tarjeta sanitaria individual orienta al servicio territorial y no absorbe la tarjeta europea o consultas clínicas. Certificado digital corresponde a FNMT persona física; Cl@ve conserva su propia guía.
- No se inventan tasas, plazos, documentos personalizados, elegibilidad ni vigencia de convocatorias.

## Contrato de conversación y territorio

- Preguntas completas y seguimientos preparados tienen prioridad. El clasificador reconoce frases útiles y se abstiene ante dos objetivos distintos, ambigüedad o temas fuera de cobertura.
- La identificación como medio de acceso no desplaza el objetivo: «vida laboral con Cl@ve» sigue siendo vida laboral.
- Padrón pregunta por municipio; tarjeta sanitaria por comunidad o ciudad autónoma. La guía general siempre permanece disponible. No se pide dirección, DNI, código postal, teléfono ni credenciales.
- El selector sanitario cubre las 17 comunidades y Ceuta/Melilla. Las fuentes recuperadas reciben fecha de revisión; Castilla-La Mancha conserva una ficha oficial localizada con aviso de contenido pendiente de revisión y alternativa del directorio. Se revisan enlaces municipales de siete ciudades; para el resto se indica claramente que no hay un enlace local revisado y se ofrece el directorio oficial.
- El contexto pertenece a cada respuesta. Se conserva al seguir en el mismo tema, cambia si el usuario selecciona otro territorio y se elimina al borrar o al cambiar de tema. Una respuesta sin cobertura no conserva contexto anterior.
- Un territorio escrito dentro de una pregunta solo se usa si se reconoce de manera inequívoca. Un nombre genérico, una dirección o una localidad desconocida no produce una falsa personalización.
- Los municipios no reconocidos se aceptan solo en el campo explícito. Frases como «en internet» y territorios escritos de forma ambigua eliminan la ubicación heredada y vuelven al selector.
- Las opciones territoriales no crean peticiones externas: los enlaces se abren únicamente por acción del usuario.

## Interfaz y accesibilidad

- Diez accesos en portada y chat vacío, con etiquetas cortas. No se modifica el carrusel ni las fotografías.
- El selector/formulario territorial vive dentro de la respuesta, con etiquetas visibles, errores junto al campo y botones de tamaño adecuado. Los controles son utilizables con teclado y en móvil.
- El foco y el desplazamiento de nuevas respuestas siguen el contrato existente: respuesta visible bajo la cabecera, escritura conserva el foco y borrar vuelve al inicio.
- Sin desbordamientos horizontales a 320, 390, 768 y 1440 px. El inglés también se revisa.

## Criterios de aceptación

1. Las diez preguntas y sus seguimientos ES/EN resuelven correctamente; cada referencia y acción existe y corresponde al organismo descrito.
2. Corpus de variantes, preguntas múltiples y negativas sin falsos positivos críticos. Los certificados de padrón y la tarjeta europea no se confunden con FNMT/TSI.
3. Selección sanitaria completa, Ceuta/Melilla con organismo correcto, municipio conocido y no cubierto, cambio de territorio, seguimiento y reinicio verificados.
4. Diez temas accesibles, controles etiquetados, respuestas y fuentes legibles en los cuatro tamaños y consola sin errores en el recorrido.
5. Build, pruebas de clasificación/conversación/empaquetado y comprobación de dependencias correctos; activos y adaptador Sites preservados.
6. Netlify en estado `ready`, mismo commit que `main`, HTTPS, `www` al dominio principal, rutas directas, recursos y recorrido territorial verificados en producción.

## Fallos previstos y respuesta

Una fuente inaccesible no recibe una revisión ficticia; se busca una alternativa oficial o se presenta un enlace general con su alcance. Una localidad no cubierta conserva la guía general y el directorio. Una consulta ambigua muestra opciones en vez de adivinar. Si falla el build o una prueba de requisitos, se corrige antes de publicar. Ante un fallo confirmado de producción se puede recuperar el despliegue anterior `6abf44331ab7050008e1e1b7` y repetir las verificaciones.

## Evidencia y límites

Fuentes y contrato en `docs/`; pruebas en `tests/`; capturas, medidas y registro de despliegue en una nueva carpeta de `qa/`. Las capturas se conservan fuera del directorio publicado. La emulación responsive no sustituye dispositivos físicos ni certifica WCAG. El corpus de preguntas no demuestra comprensión general de lenguaje ni IA.
