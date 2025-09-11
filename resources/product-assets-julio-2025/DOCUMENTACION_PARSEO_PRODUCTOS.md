# 📋 DOCUMENTACIÓN DEL PARSEO DE PRODUCTOS PRILABSA

## 🎯 Objetivo
Organizar y estructurar los assets (fotos y PDFs) de los 101 productos de PRILABSA con nomenclatura estandarizada por código de producto para facilitar la integración web.

## 📁 Estructura de Directorios Creada

```
MODULO PRODUCTOS PRILABSA JULIO 2025/
├── productos_inventario.csv              # Base de datos de productos (101 productos)
├── FOTOS PRODUCTO CODIGO/                # Fotos organizadas por código
│   ├── AD001_COMBACID_XL.png
│   ├── AD002_CAROPHYLL_PINK.png
│   └── ... (100 fotos)
├── PDF PRODUCTOS CODIGO/                 # PDFs organizados por código
│   ├── AD001_COMBACID_XL.pdf
│   ├── AD002_CAROPHYLL_PINK.pdf
│   └── ... (101 PDFs)
├── product-assets-mapping.json           # Mapping completo para integración web
├── parse-products-assets.js              # Script de parseo inteligente
└── DOCUMENTACION_PARSEO_PRODUCTOS.md     # Esta documentación
```

## 🔄 Proceso de Parseo Realizado

### 1. Análisis de Fuentes
- **CSV Base**: `productos_inventario.csv` con 101 productos
- **Fotos Fuente**: `FOTOS SIN PARSEAR/` (estructura por categorías)
- **PDFs Fuente**: `FICHAS TÉCNICAS/` (estructura por categorías)

### 2. Algoritmo de Matching Inteligente

El script implementa un sistema de scoring para hacer matching automático:

#### Criterios de Matching:
- **Similitud de texto**: Algoritmo Levenshtein distance
- **Coincidencia de código**: Bonus +50 puntos si el archivo contiene el código del producto
- **Palabras clave**: +10 puntos por cada palabra común (>2 caracteres)
- **Umbral mínimo**: Score >30 para considerar un match válido

#### Normalización:
- Conversión a minúsculas
- Eliminación de caracteres especiales
- Normalización de espacios

### 3. Nomenclatura Estandarizada

Todos los archivos se renombran con el formato:
```
{CODIGO_PRODUCTO}_{NOMBRE_NORMALIZADO}.{extension}
```

**Ejemplos:**
- `AD001_COMBACID_XL.png`
- `QU011_FORMALDEH_DO_FORMOL_.pdf`
- `EQ001_OXIGEN_METRO___OAKTON_260.png`

## 📊 Resultados del Parseo

### Estadísticas Generales:
- ✅ **Productos procesados**: 101
- 📸 **Productos con foto**: 100 (99%)
- 📄 **Productos con PDF**: 101 (100%)
- 🔍 **Fotos sin asignar**: 88
- 🔍 **PDFs sin asignar**: 48

### Distribución por Categorías:

| Categoría | Productos | Fotos | PDFs |
|-----------|-----------|-------|------|
| ADITIVOS | 13 | 13 | 13 |
| ALIMENTOS | 4 | 4 | 4 |
| EQUIPOS | 43 | 43 | 43 |
| PROBIÓTICOS | 4 | 4 | 4 |
| QUÍMICOS | 37 | 36 | 37 |

## 🗂️ Archivo de Mapping para Integración Web

### `product-assets-mapping.json`

Este archivo contiene toda la información necesaria para la integración web:

```json
{
  "timestamp": "2025-01-27T...",
  "summary": {
    "totalProducts": 101,
    "productsWithPhoto": 100,
    "productsWithPdf": 101,
    "unmatchedPhotos": 88,
    "unmatchedPdfs": 48
  },
  "products": [
    {
      "id": "1",
      "codigo": "AD001",
      "nombre": "COMBACID XL",
      "categoria": "aditivos",
      "slug": "combacid-xl",
      "assets": {
        "photo": {
          "originalFile": "Combacid XL.png",
          "originalPath": "/path/to/original",
          "newFileName": "AD001_COMBACID_XL.png",
          "score": 95.2
        },
        "pdf": {
          "originalFile": "COMBACID XL.pdf",
          "originalPath": "/path/to/original",
          "newFileName": "AD001_COMBACID_XL.pdf",
          "score": 98.1
        }
      }
    }
  ],
  "unmatchedAssets": {
    "photos": [...],
    "pdfs": [...]
  }
}
```

## 🔧 Integración con prilabsa-website-2025

### Pasos para Integración:

1. **Copiar directorios organizados**:
   ```bash
   cp -r "FOTOS PRODUCTO CODIGO" "/path/to/prilabsa-website-2025/public/assets/images/productos/"
   cp -r "PDF PRODUCTOS CODIGO" "/path/to/prilabsa-website-2025/public/assets/pdfs/productos/"
   ```

2. **Utilizar el mapping JSON**:
   - Importar `product-assets-mapping.json` en el proyecto web
   - Usar para generar rutas dinámicas de assets
   - Implementar fallbacks para productos sin foto

3. **Estructura de rutas sugerida**:
   ```
   /assets/images/productos/{CODIGO_PRODUCTO}_{NOMBRE}.{ext}
   /assets/pdfs/productos/{CODIGO_PRODUCTO}_{NOMBRE}.pdf
   ```

### Código de Ejemplo para React/Next.js:

```javascript
// Hook para obtener assets de producto
function useProductAssets(productCode) {
  const mapping = productAssetsMapping.products.find(
    p => p.codigo === productCode
  );
  
  return {
    photo: mapping?.assets?.photo ? 
      `/assets/images/productos/${mapping.assets.photo.newFileName}` : 
      '/assets/images/productos/default.png',
    pdf: mapping?.assets?.pdf ? 
      `/assets/pdfs/productos/${mapping.assets.pdf.newFileName}` : 
      null
  };
}
```

## 🔍 Assets No Asignados

### Fotos sin asignar (88):
- Muchas son variaciones o versiones alternativas
- Algunas tienen nombres muy genéricos
- Requieren revisión manual para posible asignación

### PDFs sin asignar (48):
- Algunos son duplicados con nombres diferentes
- Otros corresponden a productos descontinuados
- Fichas técnicas genéricas o de categorías

## ⚠️ Consideraciones Importantes

1. **Calidad de Matching**: Score promedio >85% indica alta confiabilidad
2. **Archivos Faltantes**: 1 producto sin foto (revisar manualmente)
3. **Nomenclatura**: Los nombres se normalizaron automáticamente
4. **Extensiones**: Se mantuvieron las extensiones originales
5. **Duplicados**: El algoritmo selecciona el mejor match por score

## 🚀 Próximos Pasos

1. **Revisión Manual**: Verificar productos con scores bajos (<50)
2. **Optimización de Imágenes**: Comprimir fotos para web
3. **Validación de PDFs**: Verificar integridad de archivos PDF
4. **Implementación Web**: Integrar con el sistema de productos
5. **SEO**: Optimizar nombres de archivos para SEO

## 📞 Soporte

Para dudas sobre la estructura o integración:
- Revisar `product-assets-mapping.json` para detalles específicos
- Consultar logs del script para información de procesamiento
- Verificar archivos en directorios organizados

---

**Generado automáticamente por ECO-NAZCAMEDIA**  
*Fecha: 27 de Enero, 2025*  
*Productos procesados: 101*  
*Éxito de matching: 99.5%*