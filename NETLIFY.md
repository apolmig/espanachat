# Producción en Netlify

El proyecto existente es [espana-chat](https://app.netlify.com/projects/espana-chat), ID `b8e12f31-147d-4b85-a10a-c5b96588c189`. Está conectado a `apolmig/espanachat`, rama `main`, y sirve [https://espana.chat](https://espana.chat). `www.espana.chat` redirige al dominio principal. No es necesario crear otro sitio ni modificar DNS para publicar mejoras.

## Publicar una versión

1. Ejecutar `npm run build` y después `npm test`. Las pruebas de empaquetado y activos necesitan que el build ya exista.
2. Revisar los cambios, las guías y las vistas de móvil y escritorio. Comprobar `ASSETS.md` si se añaden recursos.
3. Subir la versión revisada a `main`. Publicar desde el proyecto existente de Netlify y esperar a que el despliegue esté en estado `ready`. Si la integración ya ha iniciado un despliegue de ese commit, usar ese despliegue.
4. Verificar en el dominio principal el commit publicado, HTTPS, portada, acceso directo y recarga de `/chat`, `/privacidad` y `/preguntas`, fuentes y lectura local de PDF. Comprobar que `www` sigue redirigiendo al dominio principal.

`netlify.toml` fija `npm run build && npm test`, directorio de publicación `dist/client` y Node 24. No se necesitan variables de entorno en esta versión. Los maestros de las fotografías, las capturas de QA y los archivos de referencia archivados no se copian al directorio publicado.

La regla SPA deja intactos los archivos existentes y sirve `index.html` para las rutas de la aplicación. `/api/*` devuelve un JSON con estado 404: no existe un backend de IA. Al implementar una API, reemplazar esa regla por la ruta real. No hay claves en el frontend ni en `netlify.toml`.

## Recuperación

Ante un fallo confirmado, en la pestaña Deploys del proyecto se puede volver a publicar un despliegue de producción anterior que estuviese listo. Después, verificar el dominio principal y corregir el cambio en el repositorio antes de una nueva publicación. Conservar el ID del despliegue y el commit en el registro de la revisión.

Documentación oficial: [dependencias y versión de Node](https://docs.netlify.com/build/configure-builds/manage-dependencies/), [React en Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/react/), [gestión de despliegues](https://docs.netlify.com/deploy/manage-deploys/).
