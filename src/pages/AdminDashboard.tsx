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
type ViewMode = 'list' | 'create' | 'edit' | 'logs' | 'users' | 'help';
type DisplayMode = 'table' | 'cards';

// Category configuration with proper names and colors
const CATEGORY_CONFIG: Record<string, { name: string; bg: string; text: string }> = {
  aditivos: { name: 'Aditivos', bg: 'bg-blue-100', text: 'text-blue-800' },
  alimentos: { name: 'Alimentos', bg: 'bg-green-100', text: 'text-green-800' },
  probioticos: { name: 'Probioticos', bg: 'bg-purple-100', text: 'text-purple-800' },
  quimicos: { name: 'Quimicos', bg: 'bg-orange-100', text: 'text-orange-800' },
  equipos: { name: 'Equipos', bg: 'bg-slate-800', text: 'text-white' },
};

const AdminDashboard: React.FC = () => {
  const { logout, user, users, createUser, updateUser, deleteUser, logAction, logs } = useAuth();

  // WordPress data - use raw products for admin CRUD
  const { products, loading, error, refresh, totalCount } = useWordPressRawProducts();
  const { categories } = useWordPressCategories();
  const { trashProduct, isConfigured, testConnection, updateProduct } = useWordPressWrite();

  // Local state
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [displayMode, setDisplayMode] = useState<DisplayMode>('table');
  const [selectedProduct, setSelectedProduct] = useState<WordPressProduct | null>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isSyncingPdfs, setIsSyncingPdfs] = useState(false);
  const [syncProgress, setSyncProgress] = useState({ current: 0, total: 0, successes: 0 });
  const [serverFoundPdfs, setServerFoundPdfs] = useState<Record<number, string>>({}); // productId -> URL
  const hasSyncedPdfsRef = React.useRef(false); // Ref to prevent multiple syncs per refresh
  // User Management State
  const [newUser, setNewUser] = useState({ username: '', password: '', name: '', role: 'editor' as 'admin' | 'editor' });
  const [showUserForm, setShowUserForm] = useState(false);
  const [userToEdit, setUserToEdit] = useState<any>(null); // Using any to avoid importing User type if not available here
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [connectionStatus, setConnectionStatus] = useState<'unknown' | 'connected' | 'failed'>('unknown');
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Password Change state
  const [passwordChangeData, setPasswordChangeData] = useState({ current: '', new: '', confirm: '' });

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
        .map(p => p.acf?.ficha_tecnica_pdf as unknown as string | number | null | undefined)
        .filter((id): id is string | number =>
          (typeof id === 'string' && id.length > 0 && !id.startsWith('http')) ||
          typeof id === 'number'
        );

      // Only fetch IDs we don't have yet
      const missingIds = allPdfIds.filter(id => !pdfUrls[String(id)]);
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
              setPdfUrls(prev => ({ ...prev, [String(mediaId)]: data.source_url }));
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
        (p.acf?.imagen_producto && typeof p.acf.imagen_producto === 'string' && p.acf.imagen_producto !== '') ||
        (p as any).imagen_producto;

      if (hasImage) withImage++;

      // Check for PDF - check DB field AND session-found PDFs
      const hasPdf = p.acf?.ficha_tecnica_pdf || (p as any).ficha_tecnica_pdf || (p as any).pdf || serverFoundPdfs[p.id];
      if (hasPdf) withPdf++;
    });
    return { withImage, withPdf };
  }, [products, serverFoundPdfs]);

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
      hasSyncedPdfsRef.current = false; // Allow re-sync after data change
      refresh();
      logAction('DELETE_PRODUCT', `Eliminado producto: ${product.acf?.nombre_producto_es || 'Sin nombre'} (ID: ${product.id})`);
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
    hasSyncedPdfsRef.current = false; // Allow re-sync after new data
    refresh();
    logAction(
      selectedProduct ? 'UPDATE_PRODUCT' : 'CREATE_PRODUCT',
      selectedProduct
        ? `Actualizado producto ID: ${selectedProduct.id}`
        : 'Creado nuevo producto'
    );
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

  // Helper to get expected PDF path based on naming convention
  const getExpectedPdfPath = useCallback((product: WordPressProduct) => {
    const productCode = product.acf?.codigo || (product as any).codigo || '';
    const productName = product.acf?.nombre_producto_es || product.title?.rendered || '';
    if (!productCode || !productName) return null;

    const sanitizedName = productName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[\/]/g, '_')
      .replace(/[^a-zA-Z0-9\s_]/g, '')
      .replace(/\s+/g, '_')
      .replace(/_+/g, '_')
      .trim();

    const pdfFilename = `${productCode}_${sanitizedName}.pdf`;
    return `/assets/pdfs/productos/${pdfFilename}`;
  }, []);

  // Function to sync PDFs that exist in assets but not in database
  const syncPdfsWithServer = useCallback(async (isAuto = true) => {
    // Only run if not already syncing and we have products
    if (isSyncingPdfs || products.length === 0) return;

    // For auto-sync, only run once per refresh
    if (isAuto && hasSyncedPdfsRef.current) return;

    // Filter products missing a linked PDF in DB
    const productsToSync = products.filter(p => !p.acf?.ficha_tecnica_pdf && !(p as any).pdf && !serverFoundPdfs[p.id]);

    // Only proceed if there are products to sync
    if (productsToSync.length === 0) {
      if (isAuto) hasSyncedPdfsRef.current = true;
      return;
    }

    setIsSyncingPdfs(true);
    setSyncProgress({ current: 0, total: productsToSync.length, successes: 0 });

    let successCount = 0;
    const newFoundPdfs: Record<number, string> = { ...serverFoundPdfs };

    for (let i = 0; i < productsToSync.length; i++) {
      const product = productsToSync[i];
      const pdfPath = getExpectedPdfPath(product);

      if (!pdfPath) {
        setSyncProgress(prev => ({ ...prev, current: i + 1 }));
        continue;
      }

      const fullPdfUrl = `https://productos.prilabsa.com${pdfPath}`;
      // Use proxy to avoid CORS issues for HEAD checks in development
      const proxyUrl = `/api${pdfPath}`;

      try {
        const checkRes = await fetch(proxyUrl, { method: 'HEAD' });
        if (checkRes.ok) {
          // Found on server!
          newFoundPdfs[product.id] = fullPdfUrl;

          // Try to persist if configured
          if (isConfigured) {
            const result = await updateProduct(product.id, {
              ficha_tecnica_pdf: fullPdfUrl
            });
            if (result.success) successCount++;
          } else {
            // If not configured, we still count it as a "success" for visual feedback
            successCount++;
          }
        }
      } catch (e) {
        console.warn(`Error syncing PDF at ${proxyUrl}:`, e);
      }

      setSyncProgress(prev => ({ ...prev, current: i + 1, successes: successCount }));

      // Update serverFoundPdfs incrementally so the UI (count and icons) updates in real-time
      if (newFoundPdfs[product.id]) {
        setServerFoundPdfs(prev => ({ ...prev, [product.id]: newFoundPdfs[product.id] }));
      }
    }

    setIsSyncingPdfs(false);

    if (isAuto) hasSyncedPdfsRef.current = true;

    if (!isAuto && isConfigured) {
      alert(`Sincronización finalizada. Se vincularon ${successCount} nuevos archivos PDF.`);
    }

    if (successCount > 0 && isConfigured) {
      refresh();
    }
  }, [products, isSyncingPdfs, updateProduct, refresh, isConfigured, serverFoundPdfs, getExpectedPdfPath]);

  // Initial products fetch and automatic sync
  useEffect(() => {
    // We run auto-sync even if !isConfigured to populate local 'serverFoundPdfs'
    if (products.length > 0 && !loading) {
      const timeout = setTimeout(() => {
        syncPdfsWithServer(true);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [products.length, loading, syncPdfsWithServer]);
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
    // 1. Check local state (found during auto-sync)
    if (serverFoundPdfs[product.id]) return serverFoundPdfs[product.id];

    // 2. Check DB field
    const pdfField = (product.acf?.ficha_tecnica_pdf || (product as any).ficha_tecnica_pdf || (product as any).pdf);
    if (!pdfField) return null;

    // If it's a full URL, return it
    if (typeof pdfField === 'string' && pdfField.startsWith('http')) {
      return pdfField;
    }
    // Check if we have the resolved URL in cache
    if (pdfUrls[String(pdfField)]) {
      return pdfUrls[String(pdfField)];
    }
    return null;
  };

  const getFileNameFromUrl = (url: string | null) => {
    if (!url) return '';
    try {
      const parts = url.split('/');
      return decodeURIComponent(parts[parts.length - 1]);
    } catch {
      return url;
    }
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
            {pdfUrl ? (
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-red-600 font-medium hover:underline"
                title={`Archivo: ${getFileNameFromUrl(pdfUrl)}`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.363 15.335h-.542v-1.145h.542c.342 0 .521.161.521.492 0 .321-.179.653-.521.653zm1.657-1.145h-.5c-.171 0-.306.015-.407.045v.691c.099.03.229.045.397.045.176 0 .278-.01.352-.03.111-.03.19-.08.241-.146.06-.08.09-.186.09-.321 0-.171-.06-.286-.171-.342a.574.574 0 0 0-.302-.045zM15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7l-5-5z" />
                </svg>
                PDF
              </a>
            ) : (() => {
              const expectedPath = getExpectedPdfPath(product);
              const expectedName = expectedPath ? getFileNameFromUrl(expectedPath) : 'desconocido';
              return (
                <span className="flex items-center gap-1 text-gray-400" title={`No encontrado. Archivo esperado: ${expectedName}`}>
                  <svg className="w-4 h-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Sin PDF
                </span>
              );
            })()}
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
  // Calculated pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
                className={`w-2 h-2 rounded-full ${connectionStatus === 'connected' ? 'bg-green-500' :
                  connectionStatus === 'failed' ? 'bg-red-500' : 'bg-gray-400'
                  }`}
              />
              <span className="text-gray-600 hidden sm:inline">
                {connectionStatus === 'connected' ? 'API Conectada' :
                  connectionStatus === 'failed' ? 'Error API' : 'Verificando...'}
              </span>
            </div>

            {/* Help / Support Button - Strict single line */}
            <button
              onClick={() => setViewMode('help')}
              className="px-4 py-2 text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-lg inline-flex flex-nowrap items-center gap-2 shadow-md transition-all border-b-2 border-orange-800"
              title="Manual de usuario - Solaria Agency"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>AYUDA</span>
            </button>

            {/* User Menu Dropdown */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  title={user.name}
                >
                  {/* Avatar icon only */}
                  <div className="w-9 h-9 rounded-full bg-[#3759C1] flex items-center justify-center text-white font-bold text-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                    <div className="p-4 border-b bg-gray-50/50">
                      <p className="text-sm font-bold text-gray-900 leading-tight">{user.name}</p>
                      <p className="text-[11px] text-gray-500 mt-1 font-mono">{user.username}</p>
                      <div className="mt-2">
                        <span className="inline-block px-2 py-0.5 text-[10px] bg-blue-50 text-blue-600 rounded-full font-bold uppercase tracking-wider">
                          {user.role}
                        </span>
                      </div>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => { setShowUserMenu(false); setIsChangingPassword(true); }}
                        className="w-full text-left px-5 py-3 text-sm text-gray-700 hover:bg-gray-100 inline-flex flex-nowrap items-center gap-4 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                        <span>Cambiar contraseña</span>
                      </button>
                      {user.role === 'admin' && (
                        <button
                          onClick={() => { setShowUserMenu(false); setViewMode('users'); }}
                          className="w-full text-left px-5 py-3 text-sm text-gray-700 hover:bg-gray-100 inline-flex flex-nowrap items-center gap-4 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                          <span>Roles y permisos</span>
                        </button>
                      )}
                    </div>
                    <div className="border-t">
                      <button
                        onClick={() => { setShowUserMenu(false); logout(); }}
                        className="w-full text-left px-5 py-3 text-sm text-red-600 hover:bg-red-50 inline-flex flex-nowrap items-center gap-4 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        <span>Cerrar sesión</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
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

      {/* Primary Actions - Unified size, optimized centering */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {/* Log de Cambios */}
        <button
          onClick={() => setViewMode('logs')}
          className="h-14 rounded-xl font-bold transition-all border-2 border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center justify-center bg-white shadow-sm group px-4"
          title="Ver historial de cambios"
        >
          <div className="flex flex-row items-center justify-center gap-3">
            <svg className="w-5 h-5 text-gray-400 group-hover:text-[#3759C1] transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="tracking-wide uppercase whitespace-nowrap">LOG CAMBIOS</span>
          </div>
        </button>

        {/* CSV Export */}
        <button
          onClick={exportToCSV}
          disabled={products.length === 0}
          className="h-14 rounded-xl font-bold transition-all bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-md px-4 active:scale-95"
          title="Exportar todos los productos a CSV"
        >
          <div className="flex flex-row items-center justify-center gap-3">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="tracking-wide uppercase whitespace-nowrap">DESCARGAR CSV</span>
          </div>
        </button>

        {/* Create New */}
        <button
          onClick={() => setViewMode('create')}
          className="h-14 rounded-xl text-white font-black transition-all hover:shadow-xl flex items-center justify-center shadow-lg px-4 active:scale-95 hover:scale-[1.01]"
          style={{ backgroundColor: '#3759C1' }}
        >
          <div className="flex flex-row items-center justify-center gap-3">
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
            </svg>
            <span className="tracking-wide uppercase whitespace-nowrap">AÑADIR PRODUCTO</span>
          </div>
        </button>
      </div>

      {/* Filter & View Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 flex-1">
            {/* Search */}
            <div className="relative w-full sm:max-w-md">
              <input
                type="text"
                placeholder="Buscar por nombre o codigo..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* View Toggle */}
            <div className="flex bg-gray-100 p-1 rounded-xl w-full sm:w-auto">
              <button
                onClick={() => setDisplayMode('table')}
                className={`flex-1 sm:flex-none px-6 py-2 text-xs font-bold rounded-lg transition-all ${displayMode === 'table' ? 'bg-white shadow-sm text-blue-700' : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                VISTA LISTA
              </button>
              <button
                onClick={() => setDisplayMode('cards')}
                className={`flex-1 sm:flex-none px-6 py-2 text-xs font-bold rounded-lg transition-all ${displayMode === 'cards' ? 'bg-white shadow-sm text-blue-700' : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                TARJETAS
              </button>
            </div>
          </div>

          {/* Sync Progress Inline if active */}
          {isSyncingPdfs && (
            <div className="flex items-center gap-3 px-4 py-2 bg-red-50 rounded-lg border border-red-100 text-red-700 text-xs font-medium">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
              Sincronizando PDFs... {syncProgress.current}/{syncProgress.total}
            </div>
          )}
        </div>

        {/* Categories - Now inside the filter bar context, below search/toggle */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-50">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${filterCategory === 'all'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            TODOS ({totalCount})
          </button>
          {Object.entries(CATEGORY_CONFIG).map(([slug, config]) => (
            <button
              key={slug}
              onClick={() => setFilterCategory(filterCategory === slug ? 'all' : slug)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${filterCategory === slug
                ? 'ring-2 ring-offset-1 ring-blue-500 ' + config.bg + ' ' + config.text
                : config.bg + ' ' + config.text + ' opacity-70 hover:opacity-100 shadow-sm'
                }`}
            >
              {config.name.toUpperCase()} ({categoryStats[slug] || 0})
            </button>
          ))}
        </div>
      </div>

      {/* Error / Warning */}
      {
        error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <strong>Error:</strong> {error.message}
          </div>
        )
      }
      {
        !isConfigured && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
            <strong>Advertencia:</strong> Credenciales WordPress no configuradas. Las operaciones de escritura no funcionaran.
          </div>
        )
      }

      {/* Content */}
      {
        loading && !products.length ? (
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
          /* Product List */
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Codigo</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Imagen</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">PDF</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedProducts.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-12 text-center text-gray-500">
                        {filteredProducts.length === 0 ? 'No se encontraron productos' : 'Página vacía'}
                      </td>
                    </tr>
                  ) : (
                    paginatedProducts.map(product => {
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
                            {pdfUrl ? (
                              <a
                                href={pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-8 h-8 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                                title={`Archivo: ${getFileNameFromUrl(pdfUrl)}`}
                              >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M11.363 15.335h-.542v-1.145h.542c.342 0 .521.161.521.492 0 .321-.179.653-.521.653zm1.657-1.145h-.5c-.171 0-.306.015-.407.045v.691c.099.03.229.045.397.045.176 0 .278-.01.352-.03.111-.03.19-.08.241-.146.06-.08.09-.186.09-.321 0-.171-.06-.286-.171-.342a.574.574 0 0 0-.302-.045zM15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7l-5-5z" />
                                </svg>
                              </a>
                            ) : (() => {
                              const expectedPath = getExpectedPdfPath(product);
                              const expectedName = expectedPath ? getFileNameFromUrl(expectedPath) : 'desconocido';
                              return (
                                <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-50 text-gray-300 rounded" title={`No encontrado. Archivo esperado: ${expectedName}`}>
                                  <svg className="w-5 h-5 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                </span>
                              );
                            })()}
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
          </div>
        )
      }
      {/* Results count */}
      <p className="mt-4 text-sm text-gray-500 text-center mb-4">
        Mostrando {Math.min((currentPage - 1) * itemsPerPage + 1, totalCount)} - {Math.min(currentPage * itemsPerPage, totalCount)} de {totalCount} productos
      </p>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 border-t bg-gray-50 px-4 rounded-b-xl">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Mostrar:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1); // Reset to first page
            }}
            className="border rounded px-2 py-1 text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>

          <span className="text-sm font-medium px-2">
            Página {currentPage} de {totalPages || 1}
          </span>

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div >
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
        pdfUrls={{
          ...pdfUrls,
          // Add PDFs found during sync (keyed by product ID)
          ...Object.fromEntries(
            Object.entries(serverFoundPdfs).map(([productId, url]) => [productId, url])
          ),
          // If selected product has a PDF URL from sync, add it with the product ID as key
          ...(selectedProduct && serverFoundPdfs[selectedProduct.id]
            ? { [selectedProduct.id]: serverFoundPdfs[selectedProduct.id] }
            : {}
          ),
        }}
        existingProducts={products}
        onSuccess={handleFormSuccess}
        onCancel={handleCancel}
      />
    </div>
  );

  // Render Logs View
  const renderLogsView = () => (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Registro de Auditoria</h2>
        <button
          onClick={() => setViewMode('list')}
          className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-gray-600"
        >
          Volver al Inventario
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Accion</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Detalle</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {logs.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  No hay registros de actividad recientes
                </td>
              </tr>
            ) : (
              logs.map((log, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {log.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${log.action.includes('DELETE') ? 'bg-red-100 text-red-800' :
                      log.action.includes('CREATE') ? 'bg-green-100 text-green-800' :
                        log.action.includes('UPDATE') ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                      }`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {log.details}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Render Users View
  const renderUsersView = () => (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Usuarios</h2>
        <div className="flex gap-2">
          {!showUserForm && (
            <button
              onClick={() => setShowUserForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow"
            >
              Nuevo Usuario
            </button>
          )}
          <button
            onClick={() => setViewMode('list')}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-gray-600"
          >
            Volver
          </button>
        </div>
      </div>

      {showUserForm && (
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h3 className="text-lg font-semibold mb-4">{userToEdit ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            if (userToEdit) {
              // Update mode
              const updateData: any = { name: newUser.name, role: newUser.role };
              if (newUser.password) { // Only update password if provided
                updateData.password = newUser.password;
              }
              if (updateUser(userToEdit.username, updateData)) {
                alert('Usuario actualizado correctamente');
                setNewUser({ username: '', password: '', name: '', role: 'editor' });
                setUserToEdit(null);
                setShowUserForm(false);
              } else {
                alert('Error al actualizar usuario');
              }
            } else {
              // Create mode
              if (createUser(newUser)) {
                alert('Usuario creado correctamente');
                setNewUser({ username: '', password: '', name: '', role: 'editor' });
                setShowUserForm(false);
              } else {
                alert('Error: El nombre de usuario ya existe');
              }
            }
          }} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Usuario (Login)</label>
              <input
                required
                type="text"
                disabled={!!userToEdit} // Cannot change username in edit
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${userToEdit ? 'bg-gray-100' : ''}`}
                value={newUser.username}
                onChange={e => setNewUser({ ...newUser, username: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {userToEdit ? 'Nueva Contraseña (Dejar en blanco para no cambiar)' : 'Contraseña'}
              </label>
              <input
                required={!userToEdit}
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={newUser.password}
                placeholder={userToEdit ? '••••••••' : ''}
                onChange={e => setNewUser({ ...newUser, password: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
              <input
                required
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={newUser.name}
                onChange={e => setNewUser({ ...newUser, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
              <select
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={newUser.role}
                onChange={e => setNewUser({ ...newUser, role: e.target.value as 'admin' | 'editor' })}
              >
                <option value="editor">Editor (Gestión de Productos)</option>
                <option value="admin">Administrador (Acceso Total)</option>
              </select>
            </div>
            <div className="md:col-span-2 flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={() => { setShowUserForm(false); setUserToEdit(null); setNewUser({ username: '', password: '', name: '', role: 'editor' }); }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                {userToEdit ? 'Actualizar Usuario' : 'Guardar Usuario'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contraseña</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((u) => (
              <tr key={u.username} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {u.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {u.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                    {u.role === 'admin' ? 'Administrador' : 'Editor'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded border">
                      {visiblePasswords[u.username] ? u.password : '••••••••'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setVisiblePasswords(prev => ({ ...prev, [u.username]: !prev[u.username] }))}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                      title={visiblePasswords[u.username] ? 'Ocultar' : 'Mostrar'}
                    >
                      {visiblePasswords[u.username] ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {u.username !== 'ADMIN-PRILABSA' && u.username !== user?.username ? (
                    <div className="flex justify-end gap-1">
                      {/* Edit Button */}
                      <button
                        onClick={() => {
                          setUserToEdit(u);
                          setNewUser({ username: u.username, password: '', name: u.name, role: u.role });
                          setShowUserForm(true);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Editar datos del usuario"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Editar
                      </button>
                      {/* Assign Permissions Button */}
                      <button
                        onClick={() => {
                          const newRole = u.role === 'admin' ? 'editor' : 'admin';
                          if (confirm(`¿Cambiar rol de ${u.name} a ${newRole === 'admin' ? 'Administrador' : 'Editor'}?`)) {
                            if (updateUser(u.username, { role: newRole })) {
                              alert(`Rol actualizado a ${newRole === 'admin' ? 'Administrador' : 'Editor'}`);
                            }
                          }
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        title="Cambiar permisos/rol del usuario"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Permisos
                      </button>
                      {/* Delete Button */}
                      <button
                        onClick={() => {
                          if (confirm(`¿Eliminar usuario ${u.name}? Esta acción no se puede deshacer.`)) {
                            deleteUser(u.username);
                            alert('Usuario eliminado');
                          }
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Eliminar usuario"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Eliminar
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400 italic">
                      {u.username === 'ADMIN-PRILABSA' ? 'Usuario protegido' : 'Tu cuenta'}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Render Help View
  const renderHelpView = () => (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manual de Usuario</h2>
        <button
          onClick={() => setViewMode('list')}
          className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-gray-600"
        >
          Volver al Inventario
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-6 space-y-6">
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold text-[#3759C1] mb-2">Bienvenido al Panel de Administración</h3>
          <p className="text-gray-600">Este panel te permite gestionar el inventario de productos de Prilabsa de forma sencilla.</p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">📦 Gestión de Productos</h4>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li><strong>Ver productos:</strong> En la vista principal puedes ver todos los productos en lista o tarjetas.</li>
            <li><strong>Buscar:</strong> Usa la barra de búsqueda para filtrar por nombre o código.</li>
            <li><strong>Filtrar por categoría:</strong> Haz clic en los botones de categoría (Aditivos, Alimentos, etc.).</li>
            <li><strong>Crear producto:</strong> Clic en "+ Nuevo Producto" para añadir uno nuevo.</li>
            <li><strong>Editar producto:</strong> Clic en el icono de lápiz en cualquier producto.</li>
            <li><strong>Eliminar producto:</strong> Clic en el icono X (requiere confirmación).</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">📄 Exportar y PDFs</h4>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li><strong>Exportar CSV:</strong> El botón verde descarga todos los productos en formato Excel/CSV.</li>
            <li><strong>Ver PDF:</strong> Los productos con ficha técnica muestran un icono rojo de PDF. Haz clic para descargar.</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">📝 Registro de Cambios</h4>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>El botón "Registrar Cambios" muestra el historial de todas las acciones realizadas.</li>
            <li>Incluye: creación, edición, eliminación de productos y gestión de usuarios.</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">👥 Gestión de Usuarios (Solo Administradores)</h4>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Accede desde el menú de usuario (icono azul arriba a la derecha).</li>
            <li>Selecciona "Roles y permisos" para crear o eliminar usuarios.</li>
            <li>Los roles disponibles son: Admin (acceso total) y Editor (gestión de productos).</li>
          </ul>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-semibold text-gray-800 mb-2">🛠️ Soporte Técnico</h4>
          <p className="text-gray-600">Para asistencia técnica contacta a:</p>
          <p className="text-[#3759C1] font-medium">Solaria Agency - soporte@prilabsa.com</p>
        </div>
      </div>
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
        {viewMode === 'list' && renderListView()}
        {viewMode === 'create' && renderFormView()}
        {viewMode === 'edit' && renderFormView()}
        {viewMode === 'logs' && renderLogsView()}
        {viewMode === 'users' && renderUsersView()}
        {viewMode === 'help' && renderHelpView()}
      </main>

      {/* Password Change Modal */}
      {isChangingPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Cambiar Contraseña</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nueva Contraseña</label>
                <input
                  type="password"
                  value={passwordChangeData.new}
                  onChange={e => setPasswordChangeData(prev => ({ ...prev, new: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
                <input
                  type="password"
                  value={passwordChangeData.confirm}
                  onChange={e => setPasswordChangeData(prev => ({ ...prev, confirm: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => { setIsChangingPassword(false); setPasswordChangeData({ current: '', new: '', confirm: '' }); }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (!passwordChangeData.new || passwordChangeData.new.length < 4) {
                    alert('La contraseña debe tener al menos 4 caracteres');
                    return;
                  }
                  if (passwordChangeData.new !== passwordChangeData.confirm) {
                    alert('Las contraseñas no coinciden');
                    return;
                  }
                  if (user) {
                    updateUser(user.username, { password: passwordChangeData.new });
                    alert('Contraseña actualizada correctamente');
                    setIsChangingPassword(false);
                    setPasswordChangeData({ current: '', new: '', confirm: '' });
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Actualizar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Site Footer */}
      <Footer />
    </div>
  );
};

export default AdminDashboard;
