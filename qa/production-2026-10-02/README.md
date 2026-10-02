# Revisión de producción, 2 de octubre de 2026

Destino existente: [España.chat](https://espana.chat), proyecto Netlify `espana-chat`, ID `b8e12f31-147d-4b85-a10a-c5b96588c189`, rama `main`.

## Antes de publicar

- Portada a 320, 390, 768 y 1440 px: sin desbordamiento horizontal, siete temas accesibles, fuentes cargadas y sin imágenes completas rotas.
- Guía de vida laboral, seguimiento del mismo tema y panel de fuentes comprobados en móvil.
- PDF de prueba sintético, generado por `create-fixture.mjs`, sin datos personales: una página, extracción del texto y enlace a una guía relacionada. No se transmite a un servidor.
- Inter y Libre Caslon Display autoalojadas con SIL OFL; iconos Phosphor con MIT. Activos originales de la referencia archivados fuera de `public` y excluidos del build.
- Build correcto, 15 pruebas correctas y consola sin errores ni advertencias en el recorrido.
- Vite actualizado a 6.4.3 y dependencias transitivas corregidas dentro de sus rangos compatibles. `npm audit fix`: cero vulnerabilidades comunicadas por el registro. Esto no equivale a una auditoría exhaustiva.

## Evidencia

Las capturas y `browser-checks.json` se conservan en el workspace local, fuera del directorio publicado. `release.json` registra después de la publicación el commit, el ID del despliegue, su estado y las comprobaciones sobre el dominio principal. Esta carpeta no se copia a `dist/client`.

Los registros anteriores de `qa/audit-2026-10-02`, `qa/responsive-2026-10-02` y `qa/guides-2026-10-02` describen las mejoras que se incluyen en la misma versión.

Límites: emulación de viewports, sin certificación WCAG ni teléfonos físicos; guías preparadas sin IA; enlaces oficiales informativos sin ejecutar trámites autenticados.
