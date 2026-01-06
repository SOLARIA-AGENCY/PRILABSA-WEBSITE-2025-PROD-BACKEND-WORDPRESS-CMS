# Documentación del Sistema de Sincronización de PDFs (v2025)

## 1. Contexto y Problema

Anteriormente, el sitio web dependía de una "lógica de adivinación" para mostrar las fichas técnicas de los productos. El sistema intentaba construir una ruta estática en `/assets/pdfs/productos/` basada en el código y nombre del producto. Si bien esto funcionaba visualmente en el frontend, generaba varios problemas:

- **Falta de integridad**: No había confirmación real de que el archivo existiera en la base de datos de WordPress.
- **Inconsistencia en el Dashboard**: El panel administrativo no reflejaba estos archivos porque los campos ACF estaban vacíos.
- **Dificultad de Gestión**: El administrador no podía cambiar un PDF sin renombrar archivos manualmente en el servidor FTP.

## 2. Nueva Lógica: Vinculación de Datos Sólida

Se ha implementado una arquitectura impulsada por datos (Data-Driven) que prioriza la base de datos de WordPress sobre las conjeturas de archivos.

### Componentes Clave

1. **Prioridad de Fuente de Verdad**: El servicio `wordpressApi.ts` ahora busca el PDF en este orden:
   - Campo ACF `ficha_tecnica_pdf` (Directo o ID de Medios).
   - Campo raíz `pdf` de la API REST.
   - **Fallback (Solo si falla lo anterior)**: Generación de ruta estática basada en código (mantenido para retrocompatibilidad).

2. **Panel de Sincronización Masiva**:
   - Se ha añadido una herramienta en el `AdminDashboard` que escanea todos los productos.
   - Realiza peticiones `HEAD` al servidor para verificar la existencia real de archivos físicos.
   - Si el archivo existe, realiza una actualización mediante `WordPressWriteAPI` para grabar el enlace permanente en WordPress.

3. **Carga Inteligente en Formulario**:
   - Al subir un nuevo PDF, se carga a la mediateca de WordPress y el ID/URL se guarda inmediatamente en el producto, eliminando la necesidad de archivos con nombres fijos.

## 3. Guía de Uso Local y Producción

Para asegurar que el sistema sea sólido tras el despliegue a GoDaddy:

1. **Despliegue inicial**: Subir el sitio y los PDFs a la carpeta de assets.
2. **Sincronización**: Entrar al Dashboard Admin y presionar **"Sincronizar PDFs"**.
3. **Verificación**: El contador "Con PDF" debe actualizarse reflejando solo los vínculos reales guardados en la base de datos.

## 4. Consideraciones Técnicas

- **Sanitización**: El sistema de sincronización utiliza la misma lógica de sanitización de nombres que el frontend para garantizar coincidencias exactas.
- **Performance**: La sincronización es asíncrona y muestra el progreso para no bloquear la interfaz.
- **Seguridad**: Solo es accesible para usuarios con rol de Administrador.
