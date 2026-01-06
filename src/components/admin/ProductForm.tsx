/**
 * Product Form Component
 * Full CRUD form for WordPress products with trilingual support
 */

import React, { useState, useCallback, useMemo } from 'react';
import { useWordPressWrite } from '../../hooks/useWordPressWrite';
import type { ProductFormData } from '../../services/WordPressWriteAPI';
import type { WordPressProduct } from '../../types/wordpress';
import { productTranslations } from '../../data/products/product-translations';

// Categories available with their code prefixes
const CATEGORIES = [
  { value: 'aditivos', label: 'Aditivos', prefix: 'AD' },
  { value: 'alimentos', label: 'Alimentos', prefix: 'AL' },
  { value: 'probioticos', label: 'Probioticos', prefix: 'PB' },
  { value: 'quimicos', label: 'Quimicos', prefix: 'QU' },
  { value: 'equipos', label: 'Equipos', prefix: 'EQ' },
];

// Languages
const LANGUAGES = ['es', 'en', 'pt'] as const;
type Language = typeof LANGUAGES[number];

// Helper to generate next product code for a category
const generateProductCode = (category: string, existingProducts: WordPressProduct[]): string => {
  const categoryConfig = CATEGORIES.find(c => c.value === category);
  if (!categoryConfig) return '';

  const prefix = categoryConfig.prefix;

  // Find all existing codes for this category
  const existingCodes = existingProducts
    .map(p => p.acf?.codigo || '')
    .filter(code => code.startsWith(prefix))
    .map(code => {
      const numPart = code.replace(prefix, '');
      return parseInt(numPart, 10) || 0;
    });

  // Find the highest number and add 1
  const maxNum = existingCodes.length > 0 ? Math.max(...existingCodes) : 0;
  const nextNum = maxNum + 1;

  // Format with leading zeros (3 digits)
  return `${prefix}${String(nextNum).padStart(3, '0')}`;
};

interface ProductFormProps {
  product?: WordPressProduct | null;
  pdfUrls?: Record<string, string>; // Map of media ID -> URL
  existingProducts?: WordPressProduct[]; // For auto-generating codes
  onSuccess?: (product: WordPressProduct) => void;
  onCancel?: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  pdfUrls = {},
  existingProducts = [],
  onSuccess,
  onCancel,
}) => {
  const isEditing = Boolean(product);
  const { createProduct, updateProduct, uploadMedia, loading, error } = useWordPressWrite();

  // Get the initial category for code generation
  const initialCategory = product?.acf?.categoria || 'aditivos';

  // Helper to get ACF field from any possible location
  const getField = useCallback((fieldName: string, defaultValue: any = '') => {
    if (!product) return defaultValue;
    // Check root level
    if ((product as any)[fieldName] !== undefined && (product as any)[fieldName] !== null) {
      return (product as any)[fieldName];
    }
    // Check ACF object
    if (product.acf && (product.acf as any)[fieldName] !== undefined && (product.acf as any)[fieldName] !== null) {
      return (product.acf as any)[fieldName];
    }
    // Check acf_fields
    if (product.acf_fields && (product.acf_fields as any)[fieldName] !== undefined && (product.acf_fields as any)[fieldName] !== null) {
      return (product.acf_fields as any)[fieldName];
    }
    return defaultValue;
  }, [product]);

  // Get static translations fallback for a product code
  const getStaticTranslation = useCallback((code: string, lang: 'es' | 'en' | 'pt', field: string): any => {
    const translation = productTranslations[code]?.[lang];
    if (!translation) return null;
    return (translation as any)[field] ?? null;
  }, []);

  // Helper to convert specifications array to plain text for editing (Key: Value per line)
  const specsArrayToPlainText = useCallback((specs: Array<{ key: string; value: string }> | null | undefined): string => {
    if (!specs || specs.length === 0) return '';
    return specs.map(s => `${s.key}: ${s.value}`).join('\n');
  }, []);

  // Get the product code for static lookup
  const productCode = useMemo(() => {
    return product?.acf?.codigo || (product as any)?.codigo || '';
  }, [product]);

  // Form state
  const [formData, setFormData] = useState<ProductFormData>(() => {
    // For new products, auto-generate the code
    const initialCat = getField('categoria', 'aditivos');
    const autoCode = !product ? generateProductCode(initialCat, existingProducts) : getField('codigo');

    return {
      title: product?.title?.rendered || '',
      codigo: autoCode,
      categoria: initialCat,
      status: (product?.status as 'publish' | 'draft') || 'draft',

      // Spanish - with fallback to static translations (plain text for specs)
      nombre_producto_es: getField('nombre_producto_es') || product?.title?.rendered || '',
      descripcion_es: getField('descripcion_es') || getField('descripcion'),
      descripcion_corta_es: getField('descripcion_corta_es') || '',
      beneficio_1_es: getField('beneficio_1_es'),
      beneficio_2_es: getField('beneficio_2_es'),
      beneficio_3_es: getField('beneficio_3_es'),
      presentacion_es: getField('presentacion_es') || getField('presentacion'),
      especificaciones_es: getField('especificaciones_es') || getField('especificaciones') || (productCode ? specsArrayToPlainText(getStaticTranslation(productCode, 'es', 'specifications')) : '') || '',

      // English - with fallback to static translations (plain text for specs)
      nombre_producto_en: getField('nombre_producto_en') || '',
      descripcion_en: getField('descripcion_en') || '',
      descripcion_corta_en: getField('descripcion_corta_en') || '',
      beneficio_1_en: getField('beneficio_1_en'),
      beneficio_2_en: getField('beneficio_2_en'),
      beneficio_3_en: getField('beneficio_3_en'),
      presentacion_en: getField('presentacion_en'),
      especificaciones_en: getField('especificaciones_en') || (productCode ? specsArrayToPlainText(getStaticTranslation(productCode, 'en', 'specifications')) : '') || '',

      // Portuguese - with fallback to static translations (plain text for specs)
      nombre_producto_pt: getField('nombre_producto_pt') || '',
      descripcion_pt: getField('descripcion_pt') || '',
      descripcion_corta_pt: getField('descripcion_corta_pt') || '',
      beneficio_1_pt: getField('beneficio_1_pt'),
      beneficio_2_pt: getField('beneficio_2_pt'),
      beneficio_3_pt: getField('beneficio_3_pt'),
      presentacion_pt: getField('presentacion_pt'),
      especificaciones_pt: getField('especificaciones_pt') || (productCode ? specsArrayToPlainText(getStaticTranslation(productCode, 'pt', 'specifications')) : '') || '',

      // Media
      imagen_producto: product?.acf?.imagen_producto?.ID || (product as any)?.imagen_producto?.ID || null,
      // PDF: check ACF field first, then look in pdfUrls by product ID (for sync-found PDFs)
      ficha_tecnica_pdf: getField('ficha_tecnica_pdf') || getField('pdf') || (product?.id && pdfUrls[String(product.id)]) || '',

      // Extra fallbacks for saving
      beneficios: getField('beneficios'),
      descripcion: getField('descripcion'),
      especificaciones: getField('especificaciones'),
      presentacion: getField('presentacion'),
      subcategoria: getField('subcategoria'),
    };
  });

  // Handle category change - regenerate code for new products
  const handleCategoryChange = useCallback((newCategory: string) => {
    setFormData(prev => {
      const updates: Partial<ProductFormData> = { categoria: newCategory };
      // Only auto-generate code for new products
      if (!isEditing) {
        updates.codigo = generateProductCode(newCategory, existingProducts);
      }
      return { ...prev, ...updates };
    });
  }, [isEditing, existingProducts]);

  // Active language tab
  const [activeLanguage, setActiveLanguage] = useState<Language>('es');

  // Image upload state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    product?.acf?.imagen_producto?.url || (product as any)?.featured_image_url || (product as any)?.imagen_producto?.url || null
  );

  // PDF upload state
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const getPdfInitialName = () => {
    const val = getField('ficha_tecnica_pdf') || getField('pdf');
    if (!val) return null;
    if (typeof val === 'string' && val.startsWith('http')) return 'PDF vinculado (URL)';
    if (pdfUrls[String(val)]) return `PDF vinculado (ID: ${val})`;
    return `ID: ${val}`;
  };
  const [pdfName, setPdfName] = useState<string | null>(getPdfInitialName());

  // Update form field
  const updateField = useCallback((field: keyof ProductFormData, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  // Handle image selection
  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  // Handle PDF selection
  const handlePdfChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPdfFile(file);
      setPdfName(file.name);
    }
  }, []);

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Upload image if new one selected
    let imageId = formData.imagen_producto;
    if (imageFile) {
      const uploadResult = await uploadMedia(imageFile);
      if (uploadResult.success && uploadResult.data) {
        imageId = uploadResult.data.id;
      } else {
        return; // Error handled by hook
      }
    }

    // Upload PDF if new one selected
    let pdfUrl = formData.ficha_tecnica_pdf;
    if (pdfFile) {
      const uploadResult = await uploadMedia(pdfFile);
      if (uploadResult.success && uploadResult.data) {
        // Store the media URL directly for PDFs
        pdfUrl = uploadResult.data.url;
      } else {
        return; // Error handled by hook
      }
    }

    // Prepare data with image ID and PDF URL
    const submitData: ProductFormData = {
      ...formData,
      imagen_producto: imageId,
      ficha_tecnica_pdf: pdfUrl || '',
      title: formData.nombre_producto_es, // Use Spanish name as title
    };

    // Create or update
    const result = isEditing && product
      ? await updateProduct(product.id, submitData)
      : await createProduct(submitData);

    if (result.success && result.data) {
      onSuccess?.(result.data);
    }
  };

  // Render language-specific fields
  const renderLanguageFields = (lang: Language) => {
    const suffix = `_${lang}` as const;
    const langLabels = {
      es: { name: 'Nombre', desc: 'Descripcion', short: 'Descripcion Corta', benefits: 'Beneficios', presentation: 'Presentacion', specs: 'Especificaciones' },
      en: { name: 'Name', desc: 'Description', short: 'Short Description', benefits: 'Benefits', presentation: 'Presentation', specs: 'Specifications' },
      pt: { name: 'Nome', desc: 'Descricao', short: 'Descricao Curta', benefits: 'Beneficios', presentation: 'Apresentacao', specs: 'Especificacoes' },
    };
    const labels = langLabels[lang];

    return (
      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.name} *
          </label>
          <input
            type="text"
            value={(formData[`nombre_producto${suffix}` as keyof ProductFormData] as string) || ''}
            onChange={e => updateField(`nombre_producto${suffix}` as keyof ProductFormData, e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required={lang === 'es'}
          />
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.short}
          </label>
          <input
            type="text"
            value={(formData[`descripcion_corta${suffix}` as keyof ProductFormData] as string) || ''}
            onChange={e => updateField(`descripcion_corta${suffix}` as keyof ProductFormData, e.target.value)}
            maxLength={150}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">Para cards de producto (max 150 caracteres)</p>
        </div>

        {/* Full Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.desc}
          </label>
          <textarea
            value={(formData[`descripcion${suffix}` as keyof ProductFormData] as string) || ''}
            onChange={e => updateField(`descripcion${suffix}` as keyof ProductFormData, e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Benefits */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.benefits}
          </label>
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <input
                key={i}
                type="text"
                placeholder={`Beneficio ${i}`}
                value={(formData[`beneficio_${i}${suffix}` as keyof ProductFormData] as string) || ''}
                onChange={e => updateField(`beneficio_${i}${suffix}` as keyof ProductFormData, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ))}
          </div>
        </div>

        {/* Presentation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.presentation}
          </label>
          <textarea
            value={(formData[`presentacion${suffix}` as keyof ProductFormData] as string) || ''}
            onChange={e => updateField(`presentacion${suffix}` as keyof ProductFormData, e.target.value)}
            rows={2}
            placeholder="Lista de presentaciones (HTML permitido)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Specifications - Plain text input (Key: Value per line) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.specs}
          </label>
          <textarea
            value={(formData[`especificaciones${suffix}` as keyof ProductFormData] as string) || ''}
            onChange={e => updateField(`especificaciones${suffix}` as keyof ProductFormData, e.target.value)}
            rows={6}
            placeholder={`Proteína Cruda: 50% mín\nGrasa Cruda: 9% mín\nFibra Cruda: 3% máx\nHumedad: 5% máx`}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">Una especificación por línea. Formato: <code className="bg-gray-100 px-1 rounded">Clave: Valor</code></p>
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b pb-4 mb-6">
        <h2 className="text-2xl font-bold" style={{ color: '#3759C1' }}>
          {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          {isEditing ? `ID: ${product?.id} | Codigo: ${product?.acf?.codigo}` : 'Complete los campos para crear un nuevo producto'}
        </p>
      </div>

      {/* Error display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 font-medium">{error.message}</p>
          {error.code && <p className="text-red-500 text-sm">Code: {error.code}</p>}
        </div>
      )}

      {/* Basic Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Product Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Codigo {isEditing ? '(No editable)' : '*'}
          </label>
          <input
            type="text"
            value={formData.codigo}
            onChange={e => !isEditing && updateField('codigo', e.target.value.toUpperCase())}
            placeholder="AD001"
            className={`w-full px-4 py-2 border rounded-lg uppercase font-mono font-bold text-lg ${isEditing
              ? 'bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed'
              : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              }`}
            required
            readOnly={isEditing}
            disabled={isEditing}
          />
          {!isEditing && (
            <p className="text-xs text-blue-600 mt-1">Auto-generado según categoría. Puedes editarlo si es necesario.</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoria *
          </label>
          <select
            value={formData.categoria}
            onChange={e => handleCategoryChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            {CATEGORIES.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label} ({cat.prefix})</option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estado
          </label>
          <select
            value={formData.status}
            onChange={e => updateField('status', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="draft">Borrador</option>
            <option value="publish">Publicado</option>
          </select>
        </div>
      </div>

      {/* Image Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Imagen del Producto
        </label>
        <div className="flex items-start gap-4">
          {/* Current image from WordPress */}
          {imagePreview ? (
            <a
              href={imagePreview}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg border hover:border-blue-500 transition-colors cursor-pointer"
                title="Click para ver en tamaño completo"
              />
            </a>
          ) : (
            <div className="w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm">
              Sin imagen
            </div>
          )}
          <div className="flex-1">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">PNG, JPG o WEBP. Max 5MB</p>
            {product?.acf?.imagen_producto?.url && !imageFile && (
              <p className="text-xs text-green-600 mt-1">
                Imagen actual desde WordPress
              </p>
            )}
          </div>
        </div>
      </div>

      {/* PDF Section - Prominent display */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ficha Técnica PDF
        </label>

        {/* Current PDF Display - Prominent */}
        {(formData.ficha_tecnica_pdf || getField('ficha_tecnica_pdf') || getField('pdf')) && !pdfFile && (() => {
          const pdfValue = formData.ficha_tecnica_pdf || getField('ficha_tecnica_pdf') || getField('pdf');
          const isUrl = typeof pdfValue === 'string' && pdfValue.startsWith('http');
          const pdfUrl = isUrl ? pdfValue : pdfUrls[String(pdfValue)] || '';
          const fileName = isUrl ? pdfValue.split('/').pop() : (pdfUrls[String(pdfValue)]?.split('/').pop() || `ID: ${pdfValue}`);

          return (
            <div className="mb-4 p-4 bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl">
              <div className="flex flex-col gap-3">
                {/* Header with icon and filename */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-red-800 text-lg">PDF Vinculado</p>
                      <p className="text-sm font-semibold text-red-700">{fileName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={pdfUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-md"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Descargar
                    </a>
                    <a
                      href={pdfUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 border-2 border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors font-medium"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Ver
                    </a>
                  </div>
                </div>
                {/* Full URL display */}
                {pdfUrl && (
                  <div className="bg-white/60 rounded-lg px-3 py-2 border border-red-200">
                    <p className="text-xs text-red-500 font-medium mb-1">Dirección del archivo:</p>
                    <p className="text-sm text-red-800 font-mono break-all select-all">{pdfUrl}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {/* Upload new PDF or set URL */}
        <div className="flex items-start gap-4">
          {/* New PDF file indicator */}
          {pdfFile && (
            <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
              </svg>
              <div className="text-sm">
                <p className="font-medium text-green-700 truncate max-w-[150px]">{pdfName}</p>
                <p className="text-green-500 text-xs">Nuevo archivo (se subirá al guardar)</p>
              </div>
            </div>
          )}
          <div className="flex-1 space-y-2">
            {/* File upload input */}
            <div>
              <p className="text-sm text-gray-600 mb-2">
                {formData.ficha_tecnica_pdf ? 'Subir un nuevo PDF para reemplazar el actual:' : 'Subir un archivo PDF:'}
              </p>
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={handlePdfChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:bg-red-50 file:text-red-700 file:font-medium hover:file:bg-red-100"
              />
              <p className="text-xs text-gray-500 mt-1">Sube un archivo PDF (max 10MB)</p>
            </div>
            {/* OR divider */}
            <div className="flex items-center gap-2">
              <div className="flex-1 border-t border-gray-200" />
              <span className="text-xs text-gray-400">o pega URL directamente</span>
              <div className="flex-1 border-t border-gray-200" />
            </div>
            {/* URL input */}
            <input
              type="url"
              value={formData.ficha_tecnica_pdf || ''}
              onChange={e => {
                updateField('ficha_tecnica_pdf', e.target.value);
                if (e.target.value) {
                  setPdfFile(null);
                  setPdfName(null);
                }
              }}
              placeholder="https://ejemplo.com/ficha.pdf"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Language Tabs */}
      <div className="mb-6">
        <div className="flex border-b">
          {LANGUAGES.map(lang => (
            <button
              key={lang}
              type="button"
              onClick={() => setActiveLanguage(lang)}
              className={`px-6 py-3 font-medium text-sm transition-colors ${activeLanguage === lang
                ? 'border-b-2 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
                }`}
              style={activeLanguage === lang ? { borderColor: '#3759C1', color: '#3759C1' } : {}}
            >
              {lang === 'es' ? 'Espanol' : lang === 'en' ? 'English' : 'Portugues'}
            </button>
          ))}
        </div>
        <div className="pt-4">
          {renderLanguageFields(activeLanguage)}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 pt-6 border-t">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 rounded-lg text-white font-medium transition-colors disabled:opacity-50"
          style={{ backgroundColor: '#3759C1' }}
        >
          {loading ? 'Guardando...' : isEditing ? 'Actualizar Producto' : 'Crear Producto'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
