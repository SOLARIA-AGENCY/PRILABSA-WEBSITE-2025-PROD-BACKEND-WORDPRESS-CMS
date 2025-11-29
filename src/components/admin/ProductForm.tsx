/**
 * Product Form Component
 * Full CRUD form for WordPress products with trilingual support
 */

import React, { useState, useCallback } from 'react';
import { useWordPressWrite } from '../../hooks/useWordPressWrite';
import type { ProductFormData } from '../../services/WordPressWriteAPI';
import type { WordPressProduct } from '../../types/wordpress';

// Categories available
const CATEGORIES = [
  { value: 'aditivos', label: 'Aditivos' },
  { value: 'alimentos', label: 'Alimentos' },
  { value: 'probioticos', label: 'Probioticos' },
  { value: 'quimicos', label: 'Quimicos' },
  { value: 'equipos', label: 'Equipos' },
];

// Languages
const LANGUAGES = ['es', 'en', 'pt'] as const;
type Language = typeof LANGUAGES[number];

interface ProductFormProps {
  product?: WordPressProduct | null;
  onSuccess?: (product: WordPressProduct) => void;
  onCancel?: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSuccess,
  onCancel,
}) => {
  const isEditing = Boolean(product);
  const { createProduct, updateProduct, uploadMedia, loading, error } = useWordPressWrite();

  // Form state
  const [formData, setFormData] = useState<ProductFormData>({
    title: product?.title?.rendered || '',
    codigo: product?.acf?.codigo || '',
    categoria: product?.acf?.categoria || 'aditivos',
    status: (product?.status as 'publish' | 'draft') || 'draft',

    // Spanish
    nombre_producto_es: product?.acf?.nombre_producto_es || '',
    descripcion_es: product?.acf?.descripcion_es || '',
    descripcion_corta_es: product?.acf?.descripcion_corta_es || '',
    beneficio_1_es: product?.acf?.beneficio_1_es || '',
    beneficio_2_es: product?.acf?.beneficio_2_es || '',
    beneficio_3_es: product?.acf?.beneficio_3_es || '',
    presentacion_es: product?.acf?.presentacion_es || '',
    especificaciones_es: product?.acf?.especificaciones_es || '',

    // English
    nombre_producto_en: product?.acf?.nombre_producto_en || '',
    descripcion_en: product?.acf?.descripcion_en || '',
    descripcion_corta_en: product?.acf?.descripcion_corta_en || '',
    beneficio_1_en: product?.acf?.beneficio_1_en || '',
    beneficio_2_en: product?.acf?.beneficio_2_en || '',
    beneficio_3_en: product?.acf?.beneficio_3_en || '',
    presentacion_en: product?.acf?.presentacion_en || '',
    especificaciones_en: product?.acf?.especificaciones_en || '',

    // Portuguese
    nombre_producto_pt: product?.acf?.nombre_producto_pt || '',
    descripcion_pt: product?.acf?.descripcion_pt || '',
    descripcion_corta_pt: product?.acf?.descripcion_corta_pt || '',
    beneficio_1_pt: product?.acf?.beneficio_1_pt || '',
    beneficio_2_pt: product?.acf?.beneficio_2_pt || '',
    beneficio_3_pt: product?.acf?.beneficio_3_pt || '',
    presentacion_pt: product?.acf?.presentacion_pt || '',
    especificaciones_pt: product?.acf?.especificaciones_pt || '',

    // Media
    imagen_producto: product?.acf?.imagen_producto?.ID || null,
    ficha_tecnica_pdf: product?.acf?.ficha_tecnica_pdf || '',
  });

  // Active language tab
  const [activeLanguage, setActiveLanguage] = useState<Language>('es');

  // Image upload state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    product?.acf?.imagen_producto?.url || null
  );

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

    // Prepare data with image ID
    const submitData: ProductFormData = {
      ...formData,
      imagen_producto: imageId,
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

        {/* Specifications */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.specs}
          </label>
          <textarea
            value={(formData[`especificaciones${suffix}` as keyof ProductFormData] as string) || ''}
            onChange={e => updateField(`especificaciones${suffix}` as keyof ProductFormData, e.target.value)}
            rows={4}
            placeholder="<ul><li><strong>Tipo:</strong> Valor</li></ul>"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">Formato HTML con lista de especificaciones</p>
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
            Codigo *
          </label>
          <input
            type="text"
            value={formData.codigo}
            onChange={e => updateField('codigo', e.target.value.toUpperCase())}
            placeholder="AD001"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 uppercase"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoria *
          </label>
          <select
            value={formData.categoria}
            onChange={e => updateField('categoria', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            {CATEGORIES.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
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

      {/* PDF URL */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ficha Tecnica PDF (URL)
        </label>
        <div className="flex items-center gap-4">
          <input
            type="url"
            value={formData.ficha_tecnica_pdf || ''}
            onChange={e => updateField('ficha_tecnica_pdf', e.target.value)}
            placeholder="https://..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {formData.ficha_tecnica_pdf && (
            <a
              href={formData.ficha_tecnica_pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 18h12a2 2 0 002-2V6.414A2 2 0 0017.414 5L15 2.586A2 2 0 0013.586 2H4a2 2 0 00-2 2v12a2 2 0 002 2zm9-13.586L14.586 6H13V4.414zM4 4h7v4h4v8H4V4z"/>
              </svg>
              Ver PDF
            </a>
          )}
        </div>
        {product?.acf?.ficha_tecnica_pdf && (
          <p className="text-xs text-green-600 mt-1">
            PDF actual desde WordPress
          </p>
        )}
      </div>

      {/* Language Tabs */}
      <div className="mb-6">
        <div className="flex border-b">
          {LANGUAGES.map(lang => (
            <button
              key={lang}
              type="button"
              onClick={() => setActiveLanguage(lang)}
              className={`px-6 py-3 font-medium text-sm transition-colors ${
                activeLanguage === lang
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
