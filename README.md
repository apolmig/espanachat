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
- Chat con siete guías en español e inglés, fuentes, consultas sugeridas, copia y valoración local.
- Filtro básico de patrones de datos personales. No sustituye un sistema completo de protección.
- Lectura de texto PDF en el navegador, sin subir archivos. Máximo 10 MB, 20 páginas y 30.000 caracteres. Sin OCR ni IA.
- Dictado cuando el navegador lo admite, sujeto a su proveedor y permisos.
- Diseño responsive, navegación con teclado, diálogos nativos, foco visible y movimiento reducido.

No hay IA real conectada, cuentas, base de datos, seguimiento, solicitudes administrativas ni integraciones gubernamentales. El historial y las valoraciones son efímeros. El formulario de opinión no envía datos. No se han configurado claves ni desplegado el sitio.

## Netlify y dominio

El destino es [apolmig/espanachat](https://github.com/apolmig/espanachat), rama `main`. `netlify.toml` fija Node 24, ejecuta pruebas y build, publica `dist/client` y configura las rutas de la SPA. Ver [NETLIFY.md](NETLIFY.md) para conectar más adelante `www.espana.chat`. No se ha creado un sitio Netlify ni cambiado DNS.

## Estructura

| Archivo             | Responsabilidad                                                            |
| ------------------- | -------------------------------------------------------------------------- |
| `src/Prototype.jsx` | Portada, chat, navegación, formularios y diálogos                          |
| `src/InfoPage.jsx`  | Páginas de funcionamiento, privacidad, proyecto, FAQ, futuro y condiciones |
| `src/knowledge.js`  | Guías, fuentes, clasificación y detección básica de datos                  |
| `src/prototype.css` | Fuentes, tokens, diseño y adaptación responsive                            |
| `public/assets/`    | Fotografías, fuentes, iconos y capturas locales                            |
| `tests/`            | Clasificación, fuentes, privacidad básica y contrato del empaquetado       |
| `dist/client/`      | Build estático                                                             |
| `dist/server/`      | Adaptador de alojamiento del starter, sin API de IA                        |

Para la investigación y la arquitectura propuesta, ver [docs/arquitectura.md](docs/arquitectura.md). El informe de QA está en `design-qa.md`. Revisar `ASSETS.md` antes de publicar.
