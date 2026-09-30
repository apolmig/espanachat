# Desplegar después en Netlify

El repositorio contiene la configuración. No se ha creado un sitio Netlify, cambiado DNS ni publicado el dominio.

1. En Netlify, importar `apolmig/espanachat` y elegir `main` como rama de producción.
2. Mantener el directorio base vacío. `netlify.toml` fija `npm test && npm run build`, publicación en `dist/client` y Node 24.
3. Comprobar el sitio temporal de Netlify: portada, acceso directo y recarga de `/chat`, `/privacidad` y `/preguntas`, y lectura local de PDF. No se necesitan variables de entorno en esta versión.
4. Añadir `www.espana.chat` como dominio personalizado principal y `espana.chat` como dominio adicional. Usar los registros DNS que Netlify muestre para el sitio concreto. No se han inventado valores de DNS en este proyecto.
5. Una vez propagados los registros, comprobar HTTPS y la redirección del dominio secundario al principal en Netlify.

La regla SPA deja intactos los archivos existentes y sirve `index.html` para las rutas de la aplicación. `/api/*` devuelve un JSON con estado 404: no existe un backend de IA. Al implementar una API, reemplazar esa regla por la ruta real.

No hay una redirección forzada hacia `www.espana.chat` en el código, para que las vistas previas de Netlify funcionen antes de conectar el dominio. No hay claves en el frontend ni en `netlify.toml`. Si se conecta IA, los secretos deben estar en el servidor.

Documentación oficial: [dependencias y versión de Node](https://docs.netlify.com/build/configure-builds/manage-dependencies/), [React en Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/react/).

Antes de la publicación, revisar `ASSETS.md` y sustituir recursos de la referencia que no tengan permiso de reutilización.
