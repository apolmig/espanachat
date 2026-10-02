# Procedencia de activos

Recursos guardados localmente para España.chat. La versión de producción utiliza fuentes con licencia SIL Open Font License, iconos Phosphor con licencia MIT e imágenes españolas generadas para el proyecto. Las licencias se incluyen en `public/assets/fonts/` y `public/assets/icons/`.

Los archivos tipográficos, iconos y fotografías originales de America.gov se han retirado del directorio público. Su copia de estudio queda en `assets/reference-ui/`, carpeta local ignorada por Git y excluida del build. Las capturas de comparación en `qa/` tampoco se publican en la web.

La segunda versión sustituye todas las fotografías estadounidenses visibles por escenas españolas: mudanza en un piso, calle de Madrid y paseo costero inspirado en San Sebastián. Son imágenes sintéticas generadas con ImageGen, no fotografías documentales. Los maestros y los prompts están en `assets/photography/`; los WebP de entrega están en `public/assets/photos/spain-family-v2.webp`, `spain-work-v2.webp` y `spain-coast-v2.webp`. `scripts/prepare-spanish-photos.mjs` permite reproducir su optimización a 1200 × 800. Las tres fotos originales de la referencia permanecen archivadas, pero ya no se usan en la interfaz.

El favicon y los iconos de instalación son vectores originales del proyecto, con una burbuja de conversación y colores de España. La tarjeta social v2 completa se generó con ImageGen: escena sintética inspirada en la Plaza de España de Sevilla al atardecer y marca centrada. El maestro y el prompt están en `assets/branding/`. `scripts/generate-brand-assets.mjs` exporta el JPEG de entrega, un PNG compatible con la URL anterior y un contenedor SVG. `@napi-rs/canvas` usa licencia MIT y `@resvg/resvg-js` MIT/Apache-2.0. La tarjeta v2 no incorpora archivos tipográficos ni representa una fotografía documental.

| Activo                            | Procedencia                                                                                                                                                                                    |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Inter variable                    | [Proyecto oficial de Inter](https://rsms.me/inter/), `InterVariable.woff2` 4.1, licencia SIL OFL 1.1 incluida como `Inter-OFL.txt`                                                             |
| Libre Caslon Display              | [Google Fonts](https://github.com/google/fonts/tree/main/ofl/librecaslondisplay), archivo regular TTF, licencia SIL OFL 1.1 incluida como `LibreCaslonDisplay-OFL.txt`                         |
| Iconos de interfaz y dispositivos | `@phosphor-icons/react` 2.1.10, licencia MIT incluida como `Phosphor-MIT.txt`. `npm run assets:icons` exporta 11 iconos y 3 ilustraciones vectoriales de ordenador, móvil y navegador          |
| `photos/spain-life.webp`          | Imagen generada con ImageGen para este proyecto: pareja adulta paseando en un pueblo mediterráneo español, fotografía editorial natural, luz cálida, sin texto ni logotipos. Optimizada a WebP |
| `photos/portals-globe.png`        | Ilustración generada con ImageGen a partir de capturas reales de Cl@ve y SEPE. Mosaico esférico editorial, no una captura funcional de una integración                                         |
| `photos/portal-pag.png`           | Captura real de https://administracion.gob.es/                                                                                                                                                 |
| `photos/portal-clave.png`         | Captura real de https://clave.gob.es/registro                                                                                                                                                  |
| `photos/portal-sepe.png`          | Captura real de https://www.sepe.es/HomeSepe/prestaciones-desempleo.html                                                                                                                       |
| `icons/spain.svg`                 | `flag-icons` 7.5, bandera española 4:3, licencia MIT del paquete                                                                                                                               |
| Iconos complementarios            | `@phosphor-icons/react`, licencia MIT                                                                                                                                                          |
| Lectura PDF                       | `pdfjs-dist`, proyecto Mozilla, licencia Apache 2.0                                                                                                                                            |

Logotipos oficiales usados en la ilustración de fuentes, sin implicar afiliación:

- [Gobierno de España, servido por Cl@ve](https://clave.gob.es/content/experience-fragments/clave/es/experience-fragment/header/_jcr_content/root/header_dintel/img1.coreimg.svg/1761166163737/logo-gobierno.svg)
- [Cl@ve](https://clave.gob.es/content/experience-fragments/clave/es/experience-fragment/header/_jcr_content/root/header_dintel/img2.coreimg.png/1745911890791/logo-clave.png)
- [SEPE](https://www.sepe.es/dam/jcr:a0f14b29-31c9-4ddd-9433-0f5093549248/SEPE_web_cas.svg)

Las capturas comparativas están en `qa/`; el inventario original está en la carpeta de trabajo de la sesión. Los SVG exportados incluyen ajustes de espacio de nombres XML y relleno para su renderizado como imágenes independientes. La fotografía generada no documenta un lugar o unas personas reales.
