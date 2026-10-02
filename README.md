# España

Prototipo independiente inspirado en America.gov. Frontend en React y Vite, adaptado a servicios públicos españoles.

## Ejecutar

```powershell
npm install
npm run build
npm run preview -- --configLoader native --host 127.0.0.1 --port 4173
```

Abrir http://127.0.0.1:4173/. Las rutas funcionan al acceder directamente y al recargar. Para edición con recarga automática en un entorno sin la restricción de lectura del sandbox, usar `npm run dev -- --host 127.0.0.1 --port 4173`. En esta sesión se utiliza el servidor de preview porque esbuild no puede leer ciertos directorios superiores durante la optimización de dependencias del servidor de desarrollo. El build de producción funciona.

```powershell
npm test
```

## Funciones

- Portada con carrusel y controles de pausa, menú, seis páginas informativas y condiciones.
- Chat con catorce guías en español e inglés, fuentes por paso, seguimientos del mismo tema, copia y valoración local. Incluye TSE/CPS, renovación y duplicado del permiso de conducir, certificado de nacimiento y NUSS.
- Catálogo buscable con seis filtros por tema, accesible desde portada, chat y menú sin borrar la conversación. Enlace de guía o seguimiento copiable, con idioma y sin territorio ni texto de consulta.
- Orientación territorial para padrón y tarjeta sanitaria: selector de 19 comunidades/ciudades autónomas, enlaces municipales revisados y directorio oficial para el resto. El contexto se conserva solo al seguir con el mismo trámite y desaparece al borrar o recargar.
- Filtro básico de patrones de datos personales. No sustituye un sistema completo de protección.
- Lectura de texto PDF en el navegador, sin subir archivos. Máximo 10 MB, 20 páginas y 30.000 caracteres. Sin OCR ni IA.
- Dictado cuando el navegador lo admite, sujeto a su proveedor y permisos.
- Diseño responsive, navegación con teclado, diálogos nativos, foco visible y movimiento reducido.

No hay IA real conectada, cuentas, base de datos, seguimiento, solicitudes administrativas ni integraciones gubernamentales. El historial y las valoraciones son efímeros. El formulario de opinión no envía datos. No se necesitan claves en esta versión.

## Netlify y dominio

Producción: [España.chat](https://espana.chat), en el proyecto existente `espana-chat` de Netlify, conectado a [apolmig/espanachat](https://github.com/apolmig/espanachat), rama `main`. `netlify.toml` fija Node 24, ejecuta el build y las pruebas, publica `dist/client` y configura las rutas de la SPA. El dominio `www.espana.chat` redirige al dominio principal. Ver [NETLIFY.md](NETLIFY.md) para publicar y verificar una nueva versión.

## Estructura

| Archivo                         | Responsabilidad                                                            |
| ------------------------------- | -------------------------------------------------------------------------- |
| `src/Prototype.jsx`             | Portada, chat, navegación, formularios y diálogos                          |
| `src/InfoPage.jsx`              | Páginas de funcionamiento, privacidad, proyecto, FAQ, futuro y condiciones |
| `src/knowledge.js`              | Guías, fuentes, clasificación y detección básica de datos                  |
| `src/practical-guides.js`       | Padrón, tarjeta sanitaria autonómica y certificado FNMT                    |
| `src/travel-driving-guides.js`  | TSE/CPS y renovación/duplicado del permiso de conducir                     |
| `src/identity-social-guides.js` | Certificado de nacimiento y número de la Seguridad Social                  |
| `src/guide-navigation.js`       | Etiquetas bilingües, categorías y selección frecuente                      |
| `src/prototype.css`             | Fuentes, tokens, diseño y adaptación responsive                            |
| `public/assets/`                | Fotografías, fuentes, iconos y capturas locales                            |
| `tests/`                        | Clasificación, fuentes, privacidad básica y contrato del empaquetado       |
| `dist/client/`                  | Build estático                                                             |
| `dist/server/`                  | Adaptador de alojamiento del starter, sin API de IA                        |

Para la investigación y la arquitectura propuesta, ver [docs/arquitectura.md](docs/arquitectura.md). El informe de QA está en `design-qa.md`. La procedencia de imágenes, fuentes e iconos está en [ASSETS.md](ASSETS.md). Las fuentes Inter y Libre Caslon Display y los iconos Phosphor se sirven con sus licencias. Los archivos de la referencia sin permisos documentados quedan fuera de la publicación.

La expansión actual sigue [el plan de catorce guías](docs/plan-ampliacion-14-guias.md). Fuentes y límites: [padrón, TSI y FNMT](docs/fuentes-guias-practicas-2026-10-02.md), [viajes y conducción](docs/fuentes-viajes-conduccion-2026-10-02.md), [nacimiento y NUSS](docs/fuentes-identidad-seguridad-social-2026-10-02.md) y [territorios](docs/fuentes-territoriales-2026-10-02.md). La clasificación es determinista y se abstiene ante temas distintos o consultas fuera de cobertura; no interpreta cualquier frase ni usa IA. Los filtros por documentos, trabajo/ayudas, salud, conducción, trámites digitales e impuestos organizan el catálogo, mientras la portada conserva una selección breve y el acceso a todas las guías.

## Identidad y enlaces compartidos

El pie incluye un crédito discreto a [apolmig](https://github.com/apolmig). Se sirven favicon SVG, ICO y PNG, icono Apple de 180 px y un manifiesto con iconos de 192/512 px. La tarjeta social fotográfica mide 1200 × 630 px, usa un JPEG de unos 275 KB y tiene metadatos Open Graph y X con URL versionada en `https://espana.chat/social-card-v2.jpg`. La marca queda dentro del recorte central cuadrado y se evita texto pequeño.

Los activos de entrega están en `public/`. El maestro generado con ImageGen y el [prompt final](assets/branding/social-card-v2-prompt.md) están en `assets/branding/`. Para regenerar las exportaciones: `npm run assets:brand`. Se conserva `social-card.png` actualizado para referencias anteriores. La URL canónica sigue el dominio público observado, que redirige www a `espana.chat`. [Especificación Open Graph](https://ogp.me/).
