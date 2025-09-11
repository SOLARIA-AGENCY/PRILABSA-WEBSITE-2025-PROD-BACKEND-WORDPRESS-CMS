import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Download, AlertTriangle, CheckCircle, Clock, FileText, Image, Plus, X, Upload, Edit } from 'lucide-react';
import { PRODUCTS_REGISTRY as DISCOVERED_PRODUCTS_REGISTRY } from '../data/products';
import { OptimizedProduct as DiscoveredProduct } from '../data/products/types';
import { useLanguage } from '../contexts/LanguageContext';

// Funciones de utilidad para productos
const getProductsByCategory = (category: string) => {
  return DISCOVERED_PRODUCTS_REGISTRY.filter(product => product.category === category);
};

const searchProducts = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return DISCOVERED_PRODUCTS_REGISTRY.filter(product => 
    product.name.toLowerCase().includes(lowerQuery) ||
    (product.codigo || product.productCode || '').toLowerCase().includes(lowerQuery) ||
    (product.description && product.description.toLowerCase().includes(lowerQuery))
  );
};

const getAvailableCategories = () => {
  const categories = new Set(DISCOVERED_PRODUCTS_REGISTRY.map(p => p.category));
  return Array.from(categories);
};

const validateProduct = (product: DiscoveredProduct) => {
  return {
    isValid: !!(product.name && (product.codigo || product.productCode) && product.category),
    errors: []
  };
};

// Estadísticas del registro
const REGISTRY_STATS = {
  totalProducts: DISCOVERED_PRODUCTS_REGISTRY.length,
  completenessRate: Math.round((DISCOVERED_PRODUCTS_REGISTRY.filter(p => p.name && (p.codigo || p.productCode)).length / DISCOVERED_PRODUCTS_REGISTRY.length) * 100),
  totalAssets: DISCOVERED_PRODUCTS_REGISTRY.length * 2, // Estimación
  categories: getAvailableCategories().length
};

// Clasificaciones temporales hasta migración completa
const CLASIFICACIONES = {
  aditivos: 'products.categories.aditivos',
  alimentos: 'products.categories.alimentos',
  probioticos: 'products.categories.probioticos', 
  quimicos: 'products.categories.quimicos',
  equipos: 'products.categories.equipos'
};
import Header from '../components/Header';
import Footer from '../components/Footer';

// Componente de estadísticas del dashboard
const InventarioStats: React.FC<{ stats: typeof REGISTRY_STATS }> = ({ stats }) => {
  const { t } = useLanguage();
  return (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
      <div className="flex items-center">
        <FileText className="h-8 w-8 text-blue-500" />
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{t('inventory.stats.totalProducts')}</p>
          <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
        </div>
      </div>
    </div>
    
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
      <div className="flex items-center">
        <CheckCircle className="h-8 w-8 text-green-500" />
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{t('inventory.stats.completeness')}</p>
          <p className="text-2xl font-bold text-gray-900">{stats.completenessRate}%</p>
        </div>
      </div>
    </div>
    
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
      <div className="flex items-center">
        <Image className="h-8 w-8 text-yellow-500" />
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{t('inventory.stats.totalAssets')}</p>
          <p className="text-2xl font-bold text-gray-900">{stats.totalAssets.toLocaleString()}</p>
        </div>
      </div>
    </div>
    
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
      <div className="flex items-center">
        <Filter className="h-8 w-8 text-purple-500" />
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{t('inventory.stats.categories')}</p>
          <p className="text-2xl font-bold text-gray-900">5</p>
        </div>
      </div>
    </div>
  </div>
  );
};

// Componente de thumbnail de producto con zoom hover mejorado
const ProductThumbnail: React.FC<{ product: DiscoveredProduct }> = ({ product }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
    console.warn(`Imagen no encontrada: ${product.assets.image?.path}`);
  };
  
  if (!product.assets.image?.exists || imageError) {
    return (
      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
        <AlertTriangle className="w-6 h-6 text-gray-400" />
      </div>
    );
  }
  
  return (
    <>
      <div 
        className="relative group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Imagen principal */}
        <img
          src={product.assets.image.path}
          alt={product.name}
          className={`w-16 h-16 object-cover rounded-lg border-2 border-gray-200 transition-all duration-200 ${
            imageLoaded ? 'opacity-100' : 'opacity-50'
          } hover:border-blue-400 hover:shadow-md`}
          onError={handleImageError}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Loading spinner */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {/* Indicador de zoom */}
        <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full shadow-lg">
            🔍
          </div>
        </div>
      </div>
      
      {/* Modal de imagen ampliada */}
      {isHovered && imageLoaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-75"></div>
          
          {/* Imagen ampliada */}
          <div className="relative z-10 max-w-2xl max-h-2xl p-4">
            <img
              src={product.assets.image.path}
              alt={`${product.name} - Ampliada`}
              className="max-w-full max-h-full object-contain rounded-lg border-4 border-white shadow-2xl animate-in zoom-in-95 duration-200"
            />
            
            {/* Información del producto */}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-3 rounded-b-lg">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-sm text-gray-300">{product.codigo}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Modal para editar productos existentes con gestión de assets
const ProductEditModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: DiscoveredProduct) => void;
  product: DiscoveredProduct;
}> = ({ isOpen, onClose, onSave, product }) => {
  const [formData, setFormData] = useState({
    nombre: product.name,
    descripcion: product.description || '',
    codigo: product.codigo || product.productCode || ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (product && isOpen) {
      setFormData({
        nombre: product.name,
        descripcion: product.description || '',
        codigo: product.codigo || product.productCode || ''
      });
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setImageFile(file);
        const reader = new FileReader();
        reader.onload = (e) => setImagePreview(e.target?.result as string);
        reader.readAsDataURL(file);
      } else {
        alert('Por favor selecciona un archivo de imagen válido (PNG, JPG, JPEG)');
      }
    }
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setPdfFile(file);
      } else {
        alert('Por favor selecciona un archivo PDF válido');
      }
    }
  };

  const handleSave = async () => {
    setIsUploading(true);
    try {
      // Simular guardado de assets (en un caso real, aquí subirías los archivos)
      const updatedProduct: DiscoveredProduct = {
         ...product,
         ...formData,
         assets: {
           ...product.assets,
           image: imageFile ? {
             filename: imageFile.name,
             path: URL.createObjectURL(imageFile),
             extension: imageFile.name.split('.').pop() || 'jpg',
             size: imageFile.size,
             exists: true
           } : product.assets.image,
           pdf: pdfFile ? {
             filename: pdfFile.name,
             path: product.assets.pdf?.path || '',
             size: `${(pdfFile.size / 1024 / 1024).toFixed(1)} MB`,
             downloadUrl: product.assets.pdf?.downloadUrl || '',
             exists: true
           } : product.assets.pdf
         }
       };
      
      onSave(updatedProduct);
      onClose();
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Error al guardar los cambios');
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Editar Producto</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Información básica */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Código</label>
                  <input
                    type="text"
                    value={formData.codigo}
                    onChange={(e) => setFormData({...formData, codigo: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              {/* Assets actuales */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Imagen actual */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Imagen Actual</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    {product.assets.image?.exists ? (
                      <div className="text-center">
                        <img 
                          src={imagePreview || product.assets.image.path} 
                          alt={product.name}
                          className="w-24 h-24 object-cover rounded-lg mx-auto mb-2"
                        />
                        <p className="text-sm text-gray-600">{product.assets.image.filename}</p>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500">
                        <Image className="w-12 h-12 mx-auto mb-2" />
                        <p className="text-sm">Sin imagen</p>
                      </div>
                    )}
                    
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="mt-2 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                </div>
                
                {/* PDF actual */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">PDF Técnico</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    {product.assets.pdf?.exists ? (
                      <div className="text-center">
                        <FileText className="w-12 h-12 text-red-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">{product.assets.pdf.filename}</p>
                        <p className="text-xs text-gray-500">{product.assets.pdf.size}</p>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500">
                        <FileText className="w-12 h-12 mx-auto mb-2" />
                        <p className="text-sm">Sin PDF</p>
                      </div>
                    )}
                    
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handlePdfChange}
                      className="mt-2 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={handleSave}
              disabled={isUploading}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
            >
              {isUploading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
            <button
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modal para agregar/editar productos (modal original mantenido para compatibilidad)
const ProductModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: any) => void;
  product?: DiscoveredProduct | null;
}> = ({ isOpen, onClose, onSave, product }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    descripcion: '',
    categoria: 'aditivos',
    clasificacion: 1,
    image: null,
    pdf: null,
    beneficios: [''],
    presentacion: [''],
    especificaciones: [{ key: '', value: '' }]
  });

  useEffect(() => {
    if (product) {
      setFormData({
        codigo: product.codigo || product.productCode || '',
        nombre: product.name,
        descripcion: product.description,
        categoria: product.category,
        clasificacion: product.clasificacion || 0,
        image: null,
        pdf: null,
        beneficios: [''],
        presentacion: [''],
        especificaciones: [{ key: '', value: '' }]
      });
    } else {
      setFormData({
        codigo: '',
        nombre: '',
        descripcion: '',
        categoria: 'aditivos',
        clasificacion: 1,
        image: null,
        pdf: null,
        beneficios: [''],
        presentacion: [''],
        especificaciones: [{ key: '', value: '' }]
      });
    }
  }, [product, isOpen]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field: 'beneficios' | 'presentacion', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: 'beneficios' | 'presentacion') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field: 'beneficios' | 'presentacion', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSpecificationChange = (index: number, field: 'key' | 'value', value: string) => {
    setFormData(prev => ({
      ...prev,
      especificaciones: prev.especificaciones.map((spec, i) => 
        i === index ? { ...spec, [field]: value } : spec
      )
    }));
  };

  const addSpecification = () => {
    setFormData(prev => ({
      ...prev,
      especificaciones: [...prev.especificaciones, { key: '', value: '' }]
    }));
  };

  const removeSpecification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      especificaciones: prev.especificaciones.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {product ? 'Editar Producto' : 'Agregar Nuevo Producto'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="px-6 py-4 space-y-6">
          {/* Información básica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código de Producto *
              </label>
              <input
                type="text"
                value={formData.codigo}
                onChange={(e) => handleInputChange('codigo', e.target.value.toUpperCase())}
                placeholder="Ej: AD001, AL001, etc."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoría *
              </label>
              <select
                value={formData.categoria}
                onChange={(e) => {
                  const category = e.target.value;
                  const classification = {
                    'aditivos': 1,
                    'alimentos': 2,
                    'probioticos': 3,
                    'quimicos': 4,
                    'equipos': 5
                  }[category] || 1;
                  
                  handleInputChange('categoria', category);
                  handleInputChange('clasificacion', classification);
                }}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="aditivos">{t('products.categories.aditivos')}</option>
                <option value="alimentos">{t('products.categories.alimentos')}</option>
                <option value="probioticos">{t('products.categories.probioticos')}</option>
                <option value="quimicos">{t('products.categories.quimicos')}</option>
                <option value="equipos">{t('products.categories.equipos')}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Producto *
            </label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => handleInputChange('nombre', e.target.value)}
              placeholder="Nombre completo del producto"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción *
            </label>
            <textarea
              value={formData.descripcion}
              onChange={(e) => handleInputChange('descripcion', e.target.value)}
              placeholder={t('navigation.inventory.form.descriptionPlaceholder')}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Archivos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('navigation.inventory.form.productPhoto')}
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <label className="cursor-pointer">
                    <span className="mt-2 block text-sm font-medium text-gray-700">
                      {t('navigation.inventory.form.uploadImage')}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleInputChange('image', e.target.files?.[0] || null)}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-2">{t('navigation.inventory.form.imageFormats')}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('navigation.inventory.form.technicalSheet')}
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <label className="cursor-pointer">
                    <span className="mt-2 block text-sm font-medium text-gray-700">
                      {t('navigation.inventory.form.uploadPdf')}
                    </span>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleInputChange('pdf', e.target.files?.[0] || null)}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-2">PDF hasta 20MB</p>
              </div>
            </div>
          </div>

          {/* Beneficios */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Beneficios del Producto
            </label>
            {formData.beneficios.map((beneficio, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={beneficio}
                  onChange={(e) => handleArrayChange('beneficios', index, e.target.value)}
                  placeholder={`Beneficio ${index + 1}`}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {formData.beneficios.length > 1 && (
                  <button
                    onClick={() => removeArrayItem('beneficios', index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => addArrayItem('beneficios')}
              className="mt-2 px-4 py-2 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
            >
              + Agregar Beneficio
            </button>
          </div>

          {/* Presentación */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Presentación del Producto
            </label>
            {formData.presentacion.map((presentacion, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={presentacion}
                  onChange={(e) => handleArrayChange('presentacion', index, e.target.value)}
                  placeholder={`Presentación ${index + 1} (Ej: Funda de 1kg, Cubeta de 5L)`}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {formData.presentacion.length > 1 && (
                  <button
                    onClick={() => removeArrayItem('presentacion', index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => addArrayItem('presentacion')}
              className="mt-2 px-4 py-2 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
            >
              + Agregar Presentación
            </button>
          </div>

          {/* Especificaciones técnicas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Especificaciones Técnicas
            </label>
            {formData.especificaciones.map((spec, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                <input
                  type="text"
                  value={spec.key}
                  onChange={(e) => handleSpecificationChange(index, 'key', e.target.value)}
                  placeholder="Especificación (Ej: Proteína Cruda)"
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={spec.value}
                    onChange={(e) => handleSpecificationChange(index, 'value', e.target.value)}
                    placeholder="Valor (Ej: 35% mín.)"
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {formData.especificaciones.length > 1 && (
                    <button
                      onClick={() => removeSpecification(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button
              onClick={addSpecification}
              className="mt-2 px-4 py-2 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
            >
              + Agregar Especificación
            </button>
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex items-center justify-end gap-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {product ? 'Actualizar Producto' : 'Añadir Producto'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente de fila de producto
const ProductoRow: React.FC<{
  producto: DiscoveredProduct;
  onUpdate?: (id: string, field: string, value: any) => void;
  onEdit: (producto: DiscoveredProduct) => void;
}> = ({ producto, onUpdate, onEdit }) => {
  const [estadoQA, setEstadoQA] = useState<'pendiente' | 'revision' | 'aprobado'>('pendiente');
  const [showDescriptionTooltip, setShowDescriptionTooltip] = useState(false);
  
  useEffect(() => {
    // Cargar datos del localStorage si existen
    const savedData = localStorage.getItem(`producto_${producto.id}`);
    if (savedData) {
      const data = JSON.parse(savedData);
      setEstadoQA(data.estadoQA || 'pendiente');
    }
  }, [producto.id]);
  
  const saveToLocalStorage = (field: string, value: any) => {
    const currentData = JSON.parse(localStorage.getItem(`producto_${producto.id}`) || '{}');
    const newData = { ...currentData, [field]: value };
    localStorage.setItem(`producto_${producto.id}`, JSON.stringify(newData));
    if (onUpdate) {
      onUpdate(producto.id, field, value);
    }
  };
  
  const handleEstadoQAChange = (value: 'pendiente' | 'revision' | 'aprobado') => {
    setEstadoQA(value);
    saveToLocalStorage('estadoQA', value);
  };
  
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'aprobado': return 'bg-green-100 text-green-800';
      case 'revision': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <tr className={`border-b hover:bg-gray-50 ${producto.metadata.needsReview ? 'bg-red-50' : ''}`}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-900">{producto.codigo || producto.productCode || 'N/A'}</span>
          {producto.metadata.needsReview && (
            <AlertTriangle className="w-4 h-4 text-red-500 ml-2" />
          )}
        </div>
      </td>
      
      <td className="px-6 py-4">
        <div className="text-sm font-medium text-gray-900">{producto.name}</div>
        <div className="text-sm text-gray-500">Clasificación {producto.clasificacion || 0}</div>
      </td>
      
      <td className="px-6 py-4 max-w-sm">
        <div 
          className="relative"
          onMouseEnter={() => setShowDescriptionTooltip(true)}
          onMouseLeave={() => setShowDescriptionTooltip(false)}
        >
          <div className="text-sm text-gray-900 truncate cursor-help">
            {producto.description}
          </div>
          {showDescriptionTooltip && producto.description && producto.description.length > 50 && (
            <div className="absolute z-50 bg-gray-900 text-white text-sm rounded-lg p-3 shadow-lg max-w-xs left-0 top-full mt-2 whitespace-normal">
              <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-900 transform rotate-45"></div>
              {producto.description}
            </div>
          )}
        </div>
      </td>
      
      <td className="px-6 py-4">
        <div className="group relative">
          <ProductThumbnail product={producto} />
        </div>
      </td>
      
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900">
          {producto.assets.image?.filename || 'Sin imagen'}
        </div>
        {producto.assets.image?.extension && (
          <div className="text-xs text-gray-500">
            {producto.assets.image.extension.toUpperCase()}
          </div>
        )}
      </td>
      
      <td className="px-6 py-4">
        <input
          type="checkbox"
          defaultChecked={producto.assets.image?.exists || false}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          onChange={(e) => {
            const key = `photo_ok_${producto.id}`;
            localStorage.setItem(key, e.target.checked.toString());
          }}
        />
      </td>
      
      <td className="px-6 py-4">
        {producto.assets.pdf?.exists ? (
          <a
            href={producto.assets.pdf.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full hover:bg-blue-200"
          >
            <Download className="w-3 h-3 mr-1" />
            {producto.assets.pdf.size}
          </a>
        ) : (
          <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
            <AlertTriangle className="w-3 h-3 mr-1" />
            No disponible
          </span>
        )}
      </td>
      
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900">
          {producto.assets.pdf?.filename || 'Sin PDF'}
        </div>
        {producto.assets.pdf?.exists && (
          <div className="text-xs text-gray-500">
            PDF
          </div>
        )}
      </td>
      
      <td className="px-6 py-4">
        <select
          value={estadoQA}
          onChange={(e) => handleEstadoQAChange(e.target.value as any)}
          className={`text-xs font-medium rounded-full px-3 py-1 border-0 ${getEstadoColor(estadoQA)}`}
        >
          <option value="pendiente">Pendiente</option>
          <option value="revision">En Revisión</option>
          <option value="aprobado">Aprobado</option>
        </select>
      </td>
      
      <td className="px-6 py-4">
        <button
          onClick={() => onEdit(producto)}
          disabled
          className="inline-flex items-center px-3 py-1 bg-gray-400 text-gray-600 text-xs font-medium rounded-md cursor-not-allowed italic"
          title="Función temporalmente deshabilitada"
        >
          <Edit className="w-3 h-3 mr-1" />
          Editar
        </button>
      </td>
    </tr>
  );
};

// Componente principal de inventario
const InventarioProductos: React.FC = () => {
  const { t } = useLanguage();
  const [productos] = useState<DiscoveredProduct[]>(DISCOVERED_PRODUCTS_REGISTRY);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [vistaCompleta, setVistaCompleta] = useState(false);
  const [loading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<DiscoveredProduct | null>(null);
  
  // Productos filtrados
  const productosFiltrados = useMemo(() => {
    let filtered = productos;
    
    // Filtro por término de búsqueda
    if (searchTerm.trim()) {
      filtered = searchProducts(searchTerm);
    }
    
    // Filtro por categoría
    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    // Filtro por estado de completitud
    if (filtroEstado === 'completos') {
      filtered = filtered.filter(p => !p.metadata.needsReview);
    } else if (filtroEstado === 'incompletos') {
      filtered = filtered.filter(p => p.metadata.needsReview);
    }
    
    return filtered.sort((a, b) => {
      // Ordenar por clasificación y luego por código
      if ((a.clasificacion || 0) !== (b.clasificacion || 0)) {
        return (a.clasificacion || 0) - (b.clasificacion || 0);
      }
      return (a.codigo || a.productCode || '').localeCompare(b.codigo || b.productCode || '');
    });
  }, [productos, searchTerm, selectedCategory, filtroEstado]);
  
  // Agrupar productos por clasificación
  const productosAgrupados = useMemo(() => {
    const grouped: Record<number, { nombre: string; productos: DiscoveredProduct[] }> = {};
    
    productosFiltrados.forEach(producto => {
      const clasificacion = producto.clasificacion || 0;
      if (!grouped[clasificacion]) {
        const categoryName = Object.entries(CLASIFICACIONES).find(
          ([key]) => key === producto.category
        )?.[1];
        grouped[clasificacion] = {
          nombre: categoryName?.toUpperCase() || `CLASIFICACIÓN ${clasificacion}`,
          productos: []
        };
      }
      grouped[clasificacion].productos.push(producto);
    });
    
    return grouped;
  }, [productosFiltrados]);
  

  const handleOpenModal = (product?: DiscoveredProduct) => {
    setSelectedProduct(product || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleSaveProduct = (productData: any) => {
    console.log('Producto guardado:', productData);
    // Aquí se implementaría la lógica para guardar el producto
    // Por ahora solo lo loggeamos
  };
  
  const exportToCSV = () => {
    const headers = ['Código', 'Nombre', 'Descripción', 'Clasificación', 'Categoría', 'Imagen', 'PDF', 'Estado QA'];
    const rows = productosFiltrados.map(p => [
      p.codigo || p.productCode || '',
      p.name,
      p.description || '',
      p.category,
      p.category,
      p.assets.image?.exists ? 'Sí' : 'No',
      p.assets.pdf?.exists ? 'Sí' : 'No',
      p.metadata.needsReview ? 'Pendiente' : 'OK'
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventario-productos-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando inventario de productos...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      
      {/* Mini-hero azul para evitar solapamiento con header */}
      <div className="bg-blue-900 opacity-60 h-32"></div>
      
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Inventario de Productos</h1>
          <p className="mt-2 text-gray-600">
            Sistema de gestión y auditoría del catálogo de productos Prilabsa
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Generado automáticamente el {new Date().toLocaleDateString('es-ES')} • 
            Productos encontrados: {REGISTRY_STATS.totalProducts} • 
            Assets: {REGISTRY_STATS.totalAssets.toLocaleString()}
          </div>
        </div>
        
        {/* Estadísticas */}
        <InventarioStats stats={REGISTRY_STATS} />
        
        {/* Controles de filtrado */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Controles de Inventario</h2>
            <button
              onClick={() => handleOpenModal()}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Añadir Producto
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Búsqueda */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder={t('products.search.placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Filtro de categoría */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="todos">Todas las categorías</option>
              {Object.keys(CLASIFICACIONES).map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            
            {/* Filtro de estado */}
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="todos">Todos los estados</option>
              <option value="completos">Completos</option>
              <option value="incompletos">Incompletos</option>
            </select>
            
            {/* Vista completa toggle */}
            <button
              onClick={() => setVistaCompleta(!vistaCompleta)}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center justify-center ${
                vistaCompleta 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <FileText className="h-4 w-4 mr-2" />
              {vistaCompleta ? 'Vista Agrupada' : 'Ver Todos (101)'}
            </button>
            
            {/* Exportar */}
            <button
              onClick={exportToCSV}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar CSV
            </button>
          </div>
        </div>
        
        {/* Resultados */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Productos encontrados: {productosFiltrados.length} {vistaCompleta ? '(Listado completo)' : '(Agrupado por clasificación)'}
            </h2>
          </div>
          
          {vistaCompleta ? (
            /* Vista completa - Todos los productos en una tabla */
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Código
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Categoría
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Descripción
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fotografía
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nombre Archivo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Foto OK
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      PDF
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nombre PDF
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      PDF OK
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado QA
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Anotaciones
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Responsable
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {productosFiltrados.map((producto, index) => (
                    <tr key={producto.id} className={`border-b hover:bg-gray-50 ${producto.metadata.needsReview ? 'bg-red-50' : ''}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900">{producto.codigo || producto.productCode || 'N/A'}</span>
                          {producto.metadata.needsReview && (
                            <AlertTriangle className="w-4 h-4 text-red-500 ml-2" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{producto.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          producto.category === 'aditivos' ? 'bg-blue-100 text-blue-800' :
                          producto.category === 'alimentos' ? 'bg-green-100 text-green-800' :
                          producto.category === 'probioticos' ? 'bg-purple-100 text-purple-800' :
                          producto.category === 'quimicos' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {producto.category.charAt(0).toUpperCase() + producto.category.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 max-w-xs">
                        <div className="text-sm text-gray-900 truncate" title={producto.description}>
                          {producto.description}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="group relative">
                          <ProductThumbnail product={producto} />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {producto.assets.image?.filename || 'Sin imagen'}
                        </div>
                        {producto.assets.image?.extension && (
                          <div className="text-xs text-gray-500">
                            {producto.assets.image.extension.toUpperCase()}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          defaultChecked={producto.assets.image?.exists || false}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          onChange={(e) => {
                            const key = `photo_ok_${producto.id}`;
                            localStorage.setItem(key, e.target.checked.toString());
                          }}
                        />
                      </td>
                      <td className="px-6 py-4">
                        {producto.assets.pdf?.exists ? (
                          <a
                            href={producto.assets.pdf.downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full hover:bg-blue-200"
                          >
                            <Download className="w-3 h-3 mr-1" />
                            {producto.assets.pdf.size}
                          </a>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            No disponible
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {producto.assets.pdf?.filename || 'Sin PDF'}
                        </div>
                        {producto.assets.pdf?.size && (
                          <div className="text-xs text-gray-500">
                            {producto.assets.pdf.size}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          defaultChecked={producto.assets.pdf?.exists || false}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          onChange={(e) => {
                            const key = `pdf_ok_${producto.id}`;
                            localStorage.setItem(key, e.target.checked.toString());
                          }}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          OK
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          placeholder="Agregar anotaciones..."
                          className="w-full text-sm border border-gray-300 rounded px-2 py-1"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          placeholder="Asignar responsable"
                          className="w-full text-sm border border-gray-300 rounded px-2 py-1"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* Vista agrupada por clasificación */
            <>
              {Object.entries(productosAgrupados).map(([clasificacion, grupo]) => (
            <div key={clasificacion} className="border-b border-gray-200 last:border-b-0">
              {/* Header de clasificación */}
              <div className="bg-gray-100 px-6 py-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {grupo.nombre}
                  </h3>
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {grupo.productos.length} producto{grupo.productos.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
              
              {/* Tabla de productos */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Código
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descripción
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fotografía
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre Archivo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Foto OK
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PDF
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre PDF
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado QA
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {grupo.productos.map(producto => (
                      <ProductoRow
                        key={producto.id}
                        producto={producto}
                        onEdit={(producto) => {
                          setSelectedProduct(producto);
                          setIsEditModalOpen(true);
                        }}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Separador ADITIVOS */}
              {clasificacion !== Object.keys(productosAgrupados)[Object.keys(productosAgrupados).length - 1] && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-center">
                  <span className="text-yellow-800 font-medium">ADITIVOS</span>
                </div>
              )}
            </div>
              ))}
            </>
          )}
          
          {productosFiltrados.length === 0 && (
            <div className="text-center py-12">
              <AlertTriangle className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No se encontraron productos</h3>
              <p className="mt-1 text-sm text-gray-500">
                Intenta ajustar los filtros de búsqueda.
              </p>
            </div>
          )}
        </div>

        {/* Modal para agregar/editar productos */}
        <ProductModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveProduct}
          product={selectedProduct}
        />
        
        {/* Modal para editar productos existentes */}
        {selectedProduct && isEditModalOpen && (
          <ProductEditModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedProduct(null);
            }}
            onSave={(updatedProduct) => {
                // Aquí podrías actualizar el producto en el estado si fuera necesario
                console.log('Producto actualizado:', updatedProduct);
                setIsEditModalOpen(false);
                setSelectedProduct(null);
              }}
              product={selectedProduct}
            />
          )}
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default InventarioProductos;