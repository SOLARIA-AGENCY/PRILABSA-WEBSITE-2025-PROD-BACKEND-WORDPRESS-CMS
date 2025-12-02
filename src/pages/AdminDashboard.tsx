/**
 * Admin Dashboard - PRILABSA Product Management
 * Corporate branded dashboard for WordPress product CRUD
 * All data synced with WordPress REST API
 */

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useWordPressRawProducts, useWordPressCategories } from '../hooks/useWordPressProducts';
import { useWordPressWrite } from '../hooks/useWordPressWrite';
import { ProductForm } from '../components/admin/ProductForm';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import type { WordPressProduct } from '../types/wordpress';

// View modes
type ViewMode = 'list' | 'create' | 'edit';
type DisplayMode = 'table' | 'cards';

// Category configuration with proper names and colors
const CATEGORY_CONFIG: Record<string, { name: string; bg: string; text: string }> = {
  aditivos: { name: 'Aditivos', bg: 'bg-blue-100', text: 'text-blue-800' },
  alimentos: { name: 'Alimentos', bg: 'bg-green-100', text: 'text-green-800' },
  probioticos: { name: 'Probioticos', bg: 'bg-purple-100', text: 'text-purple-800' },
  quimicos: { name: 'Quimicos', bg: 'bg-orange-100', text: 'text-orange-800' },
  equipos: { name: 'Equipos', bg: 'bg-gray-100', text: 'text-gray-800' },
};

const AdminDashboard: React.FC = () => {
  // Auth
  const { logout } = useAuth();

  // WordPress data - use raw products for admin CRUD
  const { products, loading, error, refresh, totalCount } = useWordPressRawProducts();
  const { categories } = useWordPressCategories();
  const { trashProduct, isConfigured, testConnection } = useWordPressWrite();

  // Local state
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [displayMode, setDisplayMode] = useState<DisplayMode>('table');
  const [selectedProduct, setSelectedProduct] = useState<WordPressProduct | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [connectionStatus, setConnectionStatus] = useState<'unknown' | 'connected' | 'failed'>('unknown');

  // PDF URL cache (media ID -> URL)
  const [pdfUrls, setPdfUrls] = useState<Record<string, string>>({});

  // Test connection on mount using public API
  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Test with public products endpoint (no auth needed)
        // Uses /api/wp-json proxy configured in vite.config.ts
        const response = await fetch('/api/wp-json/wp/v2/productos?per_page=1');
        setConnectionStatus(response.ok ? 'connected' : 'failed');
      } catch {
        setConnectionStatus('failed');
      }
    };
    checkConnection();
  }, []);

  // Fetch PDF URLs for products that have PDF IDs
  useEffect(() => {
    const fetchPdfUrls = async () => {
      const allPdfIds = products
        .map(p => p.acf?.ficha_tecnica_pdf)
        .filter((id): id is string => typeof id === 'string' && id.length > 0 && !id.startsWith('http'));

      // Only fetch IDs we don't have yet
      const missingIds = allPdfIds.filter(id => !pdfUrls[id]);
      const uniqueIds = [...new Set(missingIds)];

      console.log('[PDF] Total products:', products.length, 'PDF IDs:', allPdfIds.length, 'Missing:', uniqueIds.length);

      if (uniqueIds.length === 0) return;

      for (const mediaId of uniqueIds) {
        try {
          console.log('[PDF] Fetching media ID:', mediaId);
          const response = await fetch(`/api/wp-json/wp/v2/media/${mediaId}`);
          console.log('[PDF] Response status:', response.status);
          if (response.ok) {
            const data = await response.json();
            console.log('[PDF] Got URL:', data.source_url);
            if (data.source_url) {
              setPdfUrls(prev => ({ ...prev, [mediaId]: data.source_url }));
            }
          }
        } catch (err) {
          console.error('[PDF] Fetch error:', err);
        }
      }
    };

    if (products.length > 0) {
      fetchPdfUrls();
    }
  }, [products]); // Remove pdfUrls from deps to avoid re-fetching

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = searchQuery === '' ||
        p.acf?.nombre_producto_es?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.acf?.codigo?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = filterCategory === 'all' ||
        p.acf?.categoria === filterCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, filterCategory]);

  // Category stats
  const categoryStats = useMemo(() => {
    const stats: Record<string, number> = {};
    products.forEach(p => {
      const cat = p.acf?.categoria || 'otros';
      stats[cat] = (stats[cat] || 0) + 1;
    });
    return stats;
  }, [products]);

  // Media stats
  const mediaStats = useMemo(() => {
    let withImage = 0;
    let withPdf = 0;
    products.forEach(p => {
      // Check for image - can be in featured_image_url or acf.imagen_producto (as URL or ID)
      const hasImage = p.featured_image_url ||
        (p.acf?.imagen_producto && typeof p.acf.imagen_producto === 'object' && p.acf.imagen_producto.url) ||
        (p.acf?.imagen_producto && typeof p.acf.imagen_producto === 'string' && p.acf.imagen_producto !== '');
      if (hasImage) withImage++;

      // Check for PDF
      if (p.acf?.ficha_tecnica_pdf) withPdf++;
    });
    return { withImage, withPdf };
  }, [products]);

  // Handle edit
  const handleEdit = useCallback((product: WordPressProduct) => {
    setSelectedProduct(product);
    setViewMode('edit');
  }, []);

  // Handle delete
  const handleDelete = useCallback(async (product: WordPressProduct) => {
    if (!confirm(`Eliminar "${product.acf?.nombre_producto_es}"?`)) return;

    const result = await trashProduct(product.id);
    if (result.success) {
      refresh();
      alert('Producto eliminado correctamente');
    } else {
      console.error('Delete failed:', result.error);
      alert(`Error al eliminar: ${result.error?.message || 'Error de autenticacion. Verifica las credenciales de WordPress en .env.local'}`);
    }
  }, [trashProduct, refresh]);

  // Handle form success
  const handleFormSuccess = useCallback(() => {
    setViewMode('list');
    setSelectedProduct(null);
    refresh();
  }, [refresh]);

  // Handle cancel
  const handleCancel = useCallback(() => {
    setViewMode('list');
    setSelectedProduct(null);
  }, []);

  // Export products to CSV
  const exportToCSV = useCallback(() => {
    if (products.length === 0) return;

    // CSV headers
    const headers = [
      'ID',
      'Codigo',
      'Nombre (ES)',
      'Nombre (EN)',
      'Nombre (PT)',
      'Categoria',
      'Estado',
      'Descripcion Corta (ES)',
      'Descripcion (ES)',
      'Beneficio 1 (ES)',
      'Beneficio 2 (ES)',
      'Beneficio 3 (ES)',
      'Presentacion (ES)',
      'Imagen URL',
      'PDF URL',
      'Fecha Creacion',
      'Fecha Modificacion'
    ];

    // Map products to rows
    const rows = products.map(p => [
      p.id,
      p.acf?.codigo || '',
      p.acf?.nombre_producto_es || '',
      p.acf?.nombre_producto_en || '',
      p.acf?.nombre_producto_pt || '',
      p.acf?.categoria || '',
      p.status || '',
      (p.acf?.descripcion_corta_es || '').replace(/"/g, '""'),
      (p.acf?.descripcion_es || '').replace(/"/g, '""').replace(/\n/g, ' '),
      p.acf?.beneficio_1_es || '',
      p.acf?.beneficio_2_es || '',
      p.acf?.beneficio_3_es || '',
      (p.acf?.presentacion_es || '').replace(/"/g, '""'),
      getProductImageUrl(p) || '',
      getProductPdfUrl(p) || '',
      p.date || '',
      p.modified || ''
    ]);

    // Build CSV content
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `productos-prilabsa-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [products]);

  // Get category display info
  const getCategoryInfo = (slug: string) => {
    return CATEGORY_CONFIG[slug] || { name: slug, bg: 'bg-gray-100', text: 'text-gray-800' };
  };

  // Get product image URL (handles different data structures)
  const getProductImageUrl = (product: WordPressProduct): string | null => {
    // First check featured_image_url (added by REST API)
    if (product.featured_image_url) {
      return product.featured_image_url;
    }
    // Then check ACF image object
    if (product.acf?.imagen_producto && typeof product.acf.imagen_producto === 'object' && product.acf.imagen_producto.url) {
      return product.acf.imagen_producto.url;
    }
    return null;
  };

  // Get PDF URL (ficha_tecnica_pdf is string|null - either URL or media ID)
  const getProductPdfUrl = (product: WordPressProduct): string | null => {
    const pdfField = product.acf?.ficha_tecnica_pdf;
    if (!pdfField) return null;
    // If it's a full URL, return it
    if (pdfField.startsWith('http')) {
      return pdfField;
    }
    // Check if we have the resolved URL in cache
    if (pdfUrls[pdfField]) {
      return pdfUrls[pdfField];
    }
    // Still loading or not found
    return null;
  };

  // Render product card (for cards view)
  const renderProductCard = (product: WordPressProduct) => {
    const category = product.acf?.categoria || 'otros';
    const catInfo = getCategoryInfo(category);
    const imageUrl = getProductImageUrl(product);
    const pdfUrl = getProductPdfUrl(product);
    const productSlug = product.slug || product.acf?.codigo?.toLowerCase();
    const webUrl = `https://productos.prilabsa.com/productos/${category}/${productSlug}`;

    return (
      <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden relative z-0">
        {/* Image */}
        <div className="h-32 bg-gray-100 overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.acf?.nombre_producto_es || ''}
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              Sin imagen
            </div>
          )}
        </div>
        {/* Category badge - positioned relative to card */}
        <span className={`absolute top-2 left-2 px-2 py-0.5 text-xs font-medium rounded z-10 ${catInfo.bg} ${catInfo.text}`}>
          {catInfo.name}
        </span>

        {/* Content */}
        <div className="p-3">
          <p className="font-mono text-xs text-gray-500">{product.acf?.codigo || 'N/A'}</p>
          <p className="font-medium text-sm text-gray-900 truncate">
            {product.acf?.nombre_producto_es || product.title.rendered}
          </p>

          {/* Indicators */}
          <div className="flex items-center gap-2 mt-2 text-xs">
            {pdfUrl && (
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:text-red-800 underline"
              >
                PDF
              </a>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 mt-3 pt-2 border-t">
            <a
              href={webUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-1 text-xs text-green-600 hover:bg-green-50 rounded"
            >
              Ver
            </a>
            <button
              onClick={() => handleEdit(product)}
              className="flex-1 text-center py-1 text-xs text-blue-600 hover:bg-blue-50 rounded"
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(product)}
              className="flex-1 text-center py-1 text-xs text-red-600 hover:bg-red-50 rounded"
            >
              X
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render list view
  const renderListView = () => (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Admin Header Bar */}
      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: '#3759C1' }}>
              Panel de Administracion
            </h1>
            <p className="text-sm text-gray-600">
              Gestion de productos WordPress
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* Connection Status */}
            <div className="flex items-center gap-2 text-sm">
              <div
                className={`w-2 h-2 rounded-full ${
                  connectionStatus === 'connected' ? 'bg-green-500' :
                  connectionStatus === 'failed' ? 'bg-red-500' : 'bg-gray-400'
                }`}
              />
              <span className="text-gray-600">
                {connectionStatus === 'connected' ? 'API Conectada' :
                 connectionStatus === 'failed' ? 'Error API' : 'Verificando...'}
              </span>
            </div>
            <button
              onClick={logout}
              className="px-3 py-1 text-sm text-gray-600 hover:text-red-600 border rounded"
            >
              Cerrar Sesion
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Total Productos</p>
          <p className="text-2xl font-bold" style={{ color: '#3759C1' }}>{totalCount}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Categorias</p>
          <p className="text-2xl font-bold text-purple-600">{Object.keys(categoryStats).length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Con Imagen</p>
          <p className="text-2xl font-bold text-green-600">
            {mediaStats.withImage}<span className="text-sm font-normal text-gray-400">/{totalCount}</span>
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Con PDF</p>
          <p className="text-2xl font-bold text-red-600">
            {mediaStats.withPdf}<span className="text-sm font-normal text-gray-400">/{totalCount}</span>
          </p>
        </div>
      </div>

      {/* Category Filter Cards */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilterCategory('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            filterCategory === 'all'
              ? 'bg-gray-800 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
          }`}
        >
          Todos ({totalCount})
        </button>
        {Object.entries(CATEGORY_CONFIG).map(([slug, config]) => (
          <button
            key={slug}
            onClick={() => setFilterCategory(filterCategory === slug ? 'all' : slug)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all shadow ${
              filterCategory === slug
                ? 'ring-2 ring-blue-500 ' + config.bg + ' ' + config.text
                : config.bg + ' ' + config.text + ' opacity-80 hover:opacity-100'
            }`}
          >
            {config.name} ({categoryStats[slug] || 0})
          </button>
        ))}
      </div>

      {/* Actions Bar */}
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <div className="flex items-center gap-4 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <input
              type="text"
              placeholder="Buscar por nombre o codigo..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* View Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setDisplayMode('table')}
              className={`px-4 py-2 text-sm rounded-md transition-colors ${
                displayMode === 'table' ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Lista
            </button>
            <button
              onClick={() => setDisplayMode('cards')}
              className={`px-4 py-2 text-sm rounded-md transition-colors ${
                displayMode === 'cards' ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Tarjetas
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* CSV Export */}
          <button
            onClick={exportToCSV}
            disabled={products.length === 0}
            className="px-4 py-2 rounded-lg font-medium transition-colors border border-green-600 text-green-600 hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            title="Exportar todos los productos a CSV"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Exportar CSV
          </button>
          {/* Create New */}
          <button
            onClick={() => setViewMode('create')}
            className="px-6 py-2 rounded-lg text-white font-medium transition-colors hover:opacity-90"
            style={{ backgroundColor: '#3759C1' }}
          >
            + Nuevo Producto
          </button>
        </div>
      </div>

      {/* Error / Warning */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <strong>Error:</strong> {error.message}
        </div>
      )}
      {!isConfigured && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
          <strong>Advertencia:</strong> Credenciales WordPress no configuradas. Las operaciones de escritura no funcionaran.
        </div>
      )}

      {/* Content */}
      {loading && !products.length ? (
        <div className="bg-white rounded-xl shadow p-12 text-center text-gray-500">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          Cargando productos desde WordPress...
        </div>
      ) : displayMode === 'cards' ? (
        /* Cards View */
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full bg-white rounded-xl shadow p-12 text-center text-gray-500">
              No se encontraron productos
            </div>
          ) : (
            filteredProducts.map(product => renderProductCard(product))
          )}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Codigo</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoria</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Imagen</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">PDF</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-gray-500">
                    No se encontraron productos
                  </td>
                </tr>
              ) : (
                filteredProducts.map(product => {
                  const category = product.acf?.categoria || 'otros';
                  const catInfo = getCategoryInfo(category);
                  const imageUrl = getProductImageUrl(product);
                  const pdfUrl = getProductPdfUrl(product);
                  const productSlug = product.slug || product.acf?.codigo?.toLowerCase();
                  const webUrl = `https://productos.prilabsa.com/productos/${category}/${productSlug}`;

                  return (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="font-mono text-sm font-medium text-gray-900">
                          {product.acf?.codigo || 'N/A'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900 truncate max-w-xs">
                          {product.acf?.nombre_producto_es || product.title.rendered}
                        </p>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded ${catInfo.bg} ${catInfo.text}`}>
                          {catInfo.name}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {imageUrl ? (
                          <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                            <img
                              src={imageUrl}
                              alt=""
                              className="w-10 h-10 rounded object-cover border hover:border-blue-500 mx-auto"
                            />
                          </a>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {product.acf?.ficha_tecnica_pdf ? (
                          pdfUrl ? (
                            <a
                              href={pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center w-8 h-8 bg-red-50 text-red-600 rounded hover:bg-red-100"
                              title="Ver PDF"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zm-3 9h2v6h-2v-6zm4 0h2v6h-2v-6zm-8 0h2v6H6v-6z"/>
                              </svg>
                            </a>
                          ) : (
                            <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-400 rounded" title="Cargando PDF...">
                              <svg className="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4z"/>
                              </svg>
                            </span>
                          )
                        ) : (
                          <span className="text-gray-300 text-sm">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={webUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded"
                          >
                            Ver
                          </a>
                          <button
                            onClick={() => handleEdit(product)}
                            className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(product)}
                            className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Results count */}
      <p className="mt-4 text-sm text-gray-500 text-center">
        Mostrando {filteredProducts.length} de {totalCount} productos
      </p>
    </div>
  );

  // Render form view (create/edit)
  const renderFormView = () => (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <button
        onClick={handleCancel}
        className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver a la lista
      </button>

      <ProductForm
        product={selectedProduct}
        onSuccess={handleFormSuccess}
        onCancel={handleCancel}
      />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Blue hero section behind header */}
      <div className="bg-gradient-to-r from-[#3759C1] to-[#2a4494] pt-32 pb-8">
        {/* This creates the blue background visible behind the transparent header */}
      </div>

      {/* Site Header - fixed, will overlay the blue section */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 -mt-4">
        {viewMode === 'list' ? renderListView() : renderFormView()}
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  );
};

export default AdminDashboard;
