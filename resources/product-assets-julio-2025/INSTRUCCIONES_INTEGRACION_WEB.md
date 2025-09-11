# 🚀 INSTRUCCIONES PARA INTEGRACIÓN WEB - PRILABSA WEBSITE 2025

## 📋 Resumen Ejecutivo

✅ **COMPLETADO**: Parseo y organización de 101 productos PRILABSA  
✅ **RESULTADO**: 100% PDFs organizados, 99% fotos organizadas  
✅ **ESTRUCTURA**: Nomenclatura estandarizada por código de producto  
✅ **MAPPING**: Archivo JSON completo para integración automática  

## 🎯 Archivos Listos para Integración

### 1. Assets Organizados
```
FOTOS PRODUCTO CODIGO/     # 100 fotos con nomenclatura: CODIGO_NOMBRE.ext
PDF PRODUCTOS CODIGO/      # 101 PDFs con nomenclatura: CODIGO_NOMBRE.pdf
```

### 2. Archivo de Mapping
```
product-assets-mapping.json    # Mapping completo para integración automática
```

### 3. Base de Datos
```
productos_inventario.csv       # 101 productos con información completa
```

## 🔧 Pasos de Integración al Proyecto Web

### PASO 1: Copiar Assets al Proyecto

```bash
# Navegar al directorio del proyecto web
cd /Users/nazcamedia/Documents/GitHub/PRILABSA-WEBSITE-2025

# Crear directorios de assets si no existen
mkdir -p public/assets/images/productos
mkdir -p public/assets/pdfs/productos

# Copiar fotos organizadas
cp -r "/Users/nazcamedia/Desktop/MODULO PRODUCTOS PRILABSA JULIO 2025/FOTOS PRODUCTO CODIGO/"* public/assets/images/productos/

# Copiar PDFs organizados
cp -r "/Users/nazcamedia/Desktop/MODULO PRODUCTOS PRILABSA JULIO 2025/PDF PRODUCTOS CODIGO/"* public/assets/pdfs/productos/

# Copiar archivo de mapping
cp "/Users/nazcamedia/Desktop/MODULO PRODUCTOS PRILABSA JULIO 2025/product-assets-mapping.json" src/data/
```

### PASO 2: Implementar Helper de Assets

Crear `src/utils/productAssets.js`:

```javascript
import productMapping from '../data/product-assets-mapping.json';

/**
 * Obtiene las rutas de assets para un producto específico
 * @param {string} productCode - Código del producto (ej: 'AD001')
 * @returns {object} - Objeto con rutas de foto y PDF
 */
export function getProductAssets(productCode) {
  const product = productMapping.products.find(p => p.codigo === productCode);
  
  if (!product) {
    return {
      photo: '/assets/images/productos/default.png',
      pdf: null,
      hasPhoto: false,
      hasPdf: false
    };
  }

  return {
    photo: product.assets.photo 
      ? `/assets/images/productos/${product.assets.photo.newFileName}`
      : '/assets/images/productos/default.png',
    pdf: product.assets.pdf 
      ? `/assets/pdfs/productos/${product.assets.pdf.newFileName}`
      : null,
    hasPhoto: !!product.assets.photo,
    hasPdf: !!product.assets.pdf,
    photoScore: product.assets.photo?.score || 0,
    pdfScore: product.assets.pdf?.score || 0
  };
}

/**
 * Obtiene todos los productos con sus assets
 * @returns {array} - Array de productos con assets
 */
export function getAllProductsWithAssets() {
  return productMapping.products.map(product => ({
    ...product,
    assets: getProductAssets(product.codigo)
  }));
}

/**
 * Obtiene estadísticas de cobertura de assets
 * @returns {object} - Estadísticas de cobertura
 */
export function getAssetsCoverage() {
  return productMapping.summary;
}
```

### PASO 3: Componente de Producto con Assets

Crear `src/components/ProductCard.jsx`:

```jsx
import React from 'react';
import { getProductAssets } from '../utils/productAssets';

const ProductCard = ({ product }) => {
  const assets = getProductAssets(product.codigo);

  return (
    <div className="product-card">
      {/* Imagen del producto */}
      <div className="product-image">
        <img 
          src={assets.photo} 
          alt={product.nombre}
          onError={(e) => {
            e.target.src = '/assets/images/productos/default.png';
          }}
        />
        {!assets.hasPhoto && (
          <div className="no-image-badge">Sin imagen</div>
        )}
      </div>

      {/* Información del producto */}
      <div className="product-info">
        <h3>{product.nombre}</h3>
        <p className="product-code">{product.codigo}</p>
        <p className="product-category">{product.categoria}</p>
        
        {/* Botón de descarga de PDF */}
        {assets.hasPdf ? (
          <a 
            href={assets.pdf} 
            download
            className="btn btn-download"
            target="_blank"
            rel="noopener noreferrer"
          >
            📄 Descargar Ficha Técnica
          </a>
        ) : (
          <span className="no-pdf">Ficha técnica no disponible</span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
```

### PASO 4: Hook Personalizado para Productos

Crear `src/hooks/useProducts.js`:

```javascript
import { useState, useEffect } from 'react';
import { getAllProductsWithAssets, getAssetsCoverage } from '../utils/productAssets';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [coverage, setCoverage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const productsWithAssets = getAllProductsWithAssets();
      const assetsCoverage = getAssetsCoverage();
      
      setProducts(productsWithAssets);
      setCoverage(assetsCoverage);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    products,
    coverage,
    loading,
    totalProducts: products.length
  };
}

export function useProductByCode(productCode) {
  const [product, setProduct] = useState(null);
  const [assets, setAssets] = useState(null);

  useEffect(() => {
    if (productCode) {
      const allProducts = getAllProductsWithAssets();
      const foundProduct = allProducts.find(p => p.codigo === productCode);
      
      if (foundProduct) {
        setProduct(foundProduct);
        setAssets(foundProduct.assets);
      }
    }
  }, [productCode]);

  return { product, assets };
}
```

### PASO 5: Página de Productos

Actualizar la página principal de productos:

```jsx
import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';

const ProductsPage = () => {
  const { products, coverage, loading } = useProducts();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  if (loading) {
    return <div className="loading">Cargando productos...</div>;
  }

  const filteredProducts = products.filter(product => {
    const matchesFilter = filter === 'all' || product.categoria === filter;
    const matchesSearch = product.nombre.toLowerCase().includes(search.toLowerCase()) ||
                         product.codigo.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const categories = ['all', 'aditivos', 'alimentos', 'equipos', 'probióticos', 'químicos'];

  return (
    <div className="products-page">
      {/* Header con estadísticas */}
      <div className="products-header">
        <h1>Catálogo de Productos PRILABSA</h1>
        {coverage && (
          <div className="coverage-stats">
            <span>📦 {coverage.totalProducts} productos</span>
            <span>📸 {coverage.productsWithPhoto} con foto</span>
            <span>📄 {coverage.productsWithPdf} con ficha técnica</span>
          </div>
        )}
      </div>

      {/* Filtros y búsqueda */}
      <div className="products-filters">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
            >
              {category === 'all' ? 'Todos' : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de productos */}
      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.codigo} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-results">
          No se encontraron productos que coincidan con los filtros.
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
```

## 🎨 Estilos CSS Sugeridos

Crear `src/styles/products.css`:

```css
.products-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.products-header {
  text-align: center;
  margin-bottom: 2rem;
}

.coverage-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #666;
}

.products-filters {
  margin-bottom: 2rem;
}

.search-input {
  width: 100%;
  max-width: 400px;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.category-filters {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: white;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover,
.filter-btn.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

.product-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-image-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255,0,0,0.8);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
}

.product-info {
  padding: 1rem;
}

.product-code {
  font-weight: bold;
  color: #007bff;
  margin: 0.5rem 0;
}

.product-category {
  text-transform: capitalize;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.btn-download {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #28a745;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: background 0.2s;
}

.btn-download:hover {
  background: #218838;
}

.no-pdf {
  color: #999;
  font-style: italic;
  font-size: 0.9rem;
}

.loading {
  text-align: center;
  padding: 4rem;
  font-size: 1.2rem;
  color: #666;
}

.no-results {
  text-align: center;
  padding: 4rem;
  color: #666;
  font-style: italic;
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
  
  .coverage-stats {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .category-filters {
    justify-content: center;
  }
}
```

## 🔍 Verificación Post-Integración

### Checklist de Validación:

- [ ] **Assets copiados**: Verificar que fotos y PDFs están en `/public/assets/`
- [ ] **Mapping importado**: Confirmar que `product-assets-mapping.json` se importa correctamente
- [ ] **Rutas funcionando**: Probar que las imágenes se cargan correctamente
- [ ] **PDFs descargables**: Verificar que los enlaces de descarga funcionan
- [ ] **Fallbacks**: Confirmar que la imagen por defecto se muestra cuando falta una foto
- [ ] **Responsive**: Probar en diferentes tamaños de pantalla
- [ ] **Performance**: Verificar tiempos de carga

### Comandos de Verificación:

```bash
# Verificar que los assets se copiaron
ls -la public/assets/images/productos/ | wc -l  # Debe mostrar ~100
ls -la public/assets/pdfs/productos/ | wc -l    # Debe mostrar ~101

# Verificar el mapping
node -e "console.log(require('./src/data/product-assets-mapping.json').summary)"
```

## 🚨 Consideraciones Importantes

1. **Imagen por Defecto**: Crear `/public/assets/images/productos/default.png`
2. **SEO**: Los nombres de archivos están optimizados para SEO
3. **Performance**: Considerar lazy loading para las imágenes
4. **Caché**: Implementar caché para el archivo de mapping
5. **Monitoreo**: Implementar logging para assets faltantes

## 📞 Soporte

- **Archivo de Mapping**: `product-assets-mapping.json` contiene toda la información
- **Logs de Procesamiento**: Revisar la salida del script de parseo
- **Assets Faltantes**: Consultar la sección `unmatchedAssets` en el mapping

---

**🎯 RESULTADO FINAL:**  
✅ 101 productos listos para integración web  
✅ 100% cobertura de PDFs  
✅ 99% cobertura de fotos  
✅ Nomenclatura estandarizada  
✅ Sistema de mapping automático  

**Generado por ECO-NAZCAMEDIA** | *27 Enero 2025*