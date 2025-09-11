import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Play, Download, Copy, CheckCircle, Menu, X, Palette, Type, Grid, Layers, ArrowRight, Eye, Code } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

// Importar contenido markdown
/* import _overviewContent from '../../docs/design_system/README.md?raw'; */
/* import _colorsContent from '../../docs/design_system/01-colores.md?raw'; */
/* import _typographyContent from '../../docs/design_system/02-tipografia.md?raw'; */

// Tipos para el sistema
interface DesignToken {
  name: string;
  value: string;
  category: 'color' | 'typography' | 'spacing' | 'shadow' | 'border';
  description?: string;
  cssVar?: string;
}

interface ComponentShowcase {
  name: string;
  category: string;
  description: string;
  code: string;
  preview: React.ReactNode;
  props?: Record<string, any>;
  variants?: string[];
}

// Datos de tokens extraídos de la auditoría COMPLETA
const colorTokens: DesignToken[] = [
  { name: 'prilabsa-orange-primary', value: '#e17e01', category: 'color', description: 'Color principal naranja de la marca', cssVar: '--color-orange-primary' },
  { name: 'prilabsa-orange-secondary', value: '#f6921d', category: 'color', description: 'Color naranja secundario para botones', cssVar: '--color-orange-secondary' },
  { name: 'prilabsa-blue-primary', value: '#00246a', category: 'color', description: 'Color principal azul de la marca', cssVar: '--color-blue-primary' },
  { name: 'prilabsa-blue-secondary', value: '#3759C1', category: 'color', description: 'Color azul secundario usado en footer y títulos', cssVar: '--color-blue-secondary' },
  { name: 'gray-50', value: '#f9fafb', category: 'color', description: 'Fondo claro para secciones', cssVar: '--color-gray-50' },
  { name: 'gray-100', value: '#f3f4f6', category: 'color', description: 'Fondo de inputs y elementos', cssVar: '--color-gray-100' },
  { name: 'gray-500', value: '#6b7280', category: 'color', description: 'Texto secundario', cssVar: '--color-gray-500' },
  { name: 'gray-600', value: '#4b5563', category: 'color', description: 'Texto principal', cssVar: '--color-gray-600' },
  { name: 'gray-800', value: '#1f2937', category: 'color', description: 'Texto de títulos', cssVar: '--color-gray-800' },
  { name: 'gray-900', value: '#111827', category: 'color', description: 'Texto principal oscuro', cssVar: '--color-gray-900' },
];

const typographyTokens: DesignToken[] = [
  { name: 'font-family-primary', value: 'Gotham', category: 'typography', description: 'Fuente principal para cuerpo de texto', cssVar: '--font-primary' },
  { name: 'font-family-secondary', value: 'Montserrat', category: 'typography', description: 'Fuente secundaria para títulos', cssVar: '--font-secondary' },
  { name: 'font-size-xs', value: '0.75rem', category: 'typography', description: 'Texto muy pequeño', cssVar: '--text-xs' },
  { name: 'font-size-sm', value: '0.875rem', category: 'typography', description: 'Texto pequeño', cssVar: '--text-sm' },
  { name: 'font-size-base', value: '1rem', category: 'typography', description: 'Texto base', cssVar: '--text-base' },
  { name: 'font-size-lg', value: '1.125rem', category: 'typography', description: 'Texto grande', cssVar: '--text-lg' },
  { name: 'font-size-xl', value: '1.25rem', category: 'typography', description: 'Texto extra grande', cssVar: '--text-xl' },
  { name: 'font-size-2xl', value: '1.5rem', category: 'typography', description: 'Título H3', cssVar: '--text-2xl' },
  { name: 'font-size-3xl', value: '1.875rem', category: 'typography', description: 'Título H2', cssVar: '--text-3xl' },
  { name: 'font-size-4xl', value: '2.25rem', category: 'typography', description: 'Título H1', cssVar: '--text-4xl' },
];

const spacingTokens: DesignToken[] = [
  { name: 'spacing-1', value: '0.25rem', category: 'spacing', description: 'Espaciado muy pequeño', cssVar: '--spacing-1' },
  { name: 'spacing-2', value: '0.5rem', category: 'spacing', description: 'Espaciado pequeño', cssVar: '--spacing-2' },
  { name: 'spacing-3', value: '0.75rem', category: 'spacing', description: 'Espaciado mediano-pequeño', cssVar: '--spacing-3' },
  { name: 'spacing-4', value: '1rem', category: 'spacing', description: 'Espaciado mediano', cssVar: '--spacing-4' },
  { name: 'spacing-6', value: '1.5rem', category: 'spacing', description: 'Espaciado mediano-grande', cssVar: '--spacing-6' },
  { name: 'spacing-8', value: '2rem', category: 'spacing', description: 'Espaciado grande', cssVar: '--spacing-8' },
  { name: 'spacing-12', value: '3rem', category: 'spacing', description: 'Espaciado extra grande', cssVar: '--spacing-12' },
  { name: 'spacing-16', value: '4rem', category: 'spacing', description: 'Espaciado muy grande', cssVar: '--spacing-16' },
];

const shadowTokens: DesignToken[] = [
  { name: 'shadow-sm', value: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', category: 'shadow', description: 'Sombra pequeña', cssVar: '--shadow-sm' },
  { name: 'shadow-md', value: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', category: 'shadow', description: 'Sombra mediana', cssVar: '--shadow-md' },
  { name: 'shadow-lg', value: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', category: 'shadow', description: 'Sombra grande', cssVar: '--shadow-lg' },
  { name: 'shadow-xl', value: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', category: 'shadow', description: 'Sombra extra grande', cssVar: '--shadow-xl' },
];

// Componentes completos extraídos de la web real
const componentShowcases: ComponentShowcase[] = [
  {
    name: 'Hero Video',
    category: 'Hero Sections',
    description: 'Sección hero con video de fondo y overlay',
    code: `<section className="relative h-96 flex items-center justify-center text-white">
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute top-0 left-0 w-full h-full object-cover z-0"
    src="/video.mp4"
  />
  <div className="absolute top-0 left-0 w-full h-full bg-blue-900 opacity-60 z-10"></div>
  <div className="relative z-20 text-center px-4">
    <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wider">
      TÍTULO PRINCIPAL
    </h1>
    <p className="mt-4 text-lg md:text-xl">Subtítulo descriptivo</p>
  </div>
</section>`,
    preview: (
      <div className="relative h-48 w-full flex items-center justify-center text-white bg-gradient-to-r from-blue-900 to-blue-700 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-blue-900 opacity-60"></div>
        <div className="relative z-20 text-center px-4">
          <h1 className="text-2xl font-bold uppercase tracking-wider">
            TÍTULO PRINCIPAL
          </h1>
          <p className="mt-2 text-sm">Subtítulo descriptivo</p>
        </div>
        <div className="absolute top-2 right-2 text-white/70">
          <Play size={20} />
        </div>
      </div>
    )
  },
  {
    name: 'Static Hero',
    category: 'Hero Sections',
    description: 'Sección hero con imagen de fondo estática',
    code: `<section className="relative h-96 bg-cover bg-center flex items-center justify-center text-white" style={{backgroundImage: 'url(/hero-bg.jpg)'}}>
  <div className="absolute top-0 left-0 w-full h-full bg-blue-900 opacity-60 z-10"></div>
  <div className="relative z-20 text-center px-4">
    <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wider">TÍTULO</h1>
    <p className="mt-4 text-lg md:text-xl">Subtítulo</p>
  </div>
</section>`,
    preview: (
      <div className="relative h-48 w-full flex items-center justify-center text-white bg-gradient-to-br from-orange-500 to-blue-600 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-blue-900 opacity-40"></div>
        <div className="relative z-20 text-center px-4">
          <h1 className="text-2xl font-bold uppercase tracking-wider">TÍTULO</h1>
          <p className="mt-2 text-sm">Subtítulo descriptivo</p>
        </div>
      </div>
    )
  },
  {
    name: 'ArticleCard',
    category: 'Cards',
    description: 'Tarjeta de artículo del blog con hover effects y transiciones',
    code: `<div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out hover:shadow-xl group flex flex-col">
  <div className="p-4 flex flex-col flex-grow">
    <p className="text-sm text-gray-500 mb-2">
      2025-01-15 - Admin
    </p>
    <h3 className="text-lg font-bold uppercase mb-2 text-blue-900 group-hover:text-orange-500 transition-colors duration-300 line-clamp-2">
      Título del Artículo
    </h3>
    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
      Resumen del artículo que describe el contenido...
    </p>
    <div className="mt-auto">
      <button className="inline-block px-6 py-2 rounded font-semibold uppercase tracking-wider text-sm text-white transition-colors duration-300 hover:opacity-90" style={{ backgroundColor: '#f6921d' }}>
        Leer Más
      </button>
    </div>
  </div>
</div>`,
    preview: (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out hover:shadow-xl group flex flex-col max-w-sm">
        <div className="p-4 flex flex-col flex-grow">
          <p className="text-sm text-gray-500 mb-2">
            2025-01-15 - Admin
          </p>
          <h3 className="text-lg font-bold uppercase mb-2 text-blue-900 group-hover:text-orange-500 transition-colors duration-300 line-clamp-2">
            Título del Artículo
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            Resumen del artículo que describe el contenido principal y los puntos más importantes...
          </p>
          <div className="mt-auto">
            <button className="inline-block px-6 py-2 rounded font-semibold uppercase tracking-wider text-sm text-white transition-colors duration-300 hover:opacity-90" style={{ backgroundColor: '#f6921d' }}>
              Leer Más
            </button>
          </div>
        </div>
      </div>
    )
  },
  {
    name: 'CategoryCard',
    category: 'Cards',
    description: 'Tarjeta de categoría con icono y fondo naranja',
    code: `<div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
  <div className="w-16 h-16 bg-[#f6921d] rounded-xl mx-auto mb-4 flex items-center justify-center">
    <span className="text-white font-bold text-2xl">🍎</span>
  </div>
  <h3 className="font-semibold text-gray-800">{t('products.categories.alimentos')}</h3>
</div>`,
    preview: (
      <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow max-w-xs">
        <div className="w-16 h-16 bg-[#f6921d] rounded-xl mx-auto mb-4 flex items-center justify-center">
          <span className="text-white font-bold text-2xl">🍎</span>
        </div>
        <h3 className="font-semibold text-gray-800">{(() => { const { t } = useLanguage(); return t('products.categories.alimentos'); })()}</h3>
      </div>
    )
  },
  {
    name: 'Product Card',
    category: 'Cards',
    description: 'Tarjeta de producto con imagen y información',
    code: `<div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
  <div className="h-48 bg-gray-100 flex items-center justify-center">
    <span className="text-gray-400 text-4xl">📦</span>
  </div>
  <div className="p-4">
    <h3 className="font-bold text-gray-800 mb-2">Nombre del Producto</h3>
    <p className="text-gray-600 text-sm mb-3">Descripción breve del producto</p>
    <div className="flex items-center justify-between">
      <span className="text-2xl font-bold text-orange-500">$99.99</span>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
        Agregar
      </button>
    </div>
  </div>
</div>`,
    preview: (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow max-w-xs">
        <div className="h-32 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400 text-3xl">📦</span>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-gray-800 mb-2">Nombre del Producto</h3>
          <p className="text-gray-600 text-sm mb-3">Descripción breve del producto</p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-orange-500">$99.99</span>
            <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors text-sm">
              Agregar
            </button>
          </div>
        </div>
      </div>
    )
  },
  {
    name: 'Brand Logo Card',
    category: 'Cards',
    description: 'Tarjeta para mostrar logos de marcas con efecto hover',
    code: `<div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
  <div className="h-20 flex items-center justify-center">
    <img src="/logo.png" alt="Brand Logo" className="max-h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300" />
  </div>
</div>`,
    preview: (
      <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 max-w-xs">
        <div className="h-20 flex items-center justify-center">
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
            <span className="text-gray-500 font-bold text-sm">LOGO</span>
          </div>
        </div>
      </div>
    )
  },
  {
    name: 'SearchBar',
    category: 'Forms',
    description: 'Barra de búsqueda con focus states',
    code: `<div className="relative">
  <input
    type="text"
    placeholder={t('products.search.placeholder')}
    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
</div>`,
    preview: (
      <div className="relative max-w-xs">
        <input
          type="text"
          placeholder="Buscar productos..."
          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
    )
  },
  {
    name: 'Button Primary',
    category: 'Buttons',
    description: 'Botón principal con color naranja PRILABSA',
    code: `<button className="bg-[#f6921d] hover:bg-[#e17e01] text-white font-bold py-2 px-4 rounded transition-colors duration-300">
  Botón Principal
</button>`,
    preview: (
      <button className="bg-[#f6921d] hover:bg-[#e17e01] text-white font-bold py-2 px-4 rounded transition-colors duration-300">
        Botón Principal
      </button>
    )
  },
  {
    name: 'Button Secondary',
    category: 'Buttons',
    description: 'Botón secundario con color azul PRILABSA',
    code: `<button className="bg-[#3759C1] hover:bg-[#00246a] text-white font-bold py-2 px-4 rounded transition-colors duration-300">
  Botón Secundario
</button>`,
    preview: (
      <button className="bg-[#3759C1] hover:bg-[#00246a] text-white font-bold py-2 px-4 rounded transition-colors duration-300">
        Botón Secundario
      </button>
    )
  },
  {
    name: 'Button Outline',
    category: 'Buttons',
    description: 'Botón con borde y fondo transparente',
    code: `<button className="border-2 border-[#f6921d] text-[#f6921d] hover:bg-[#f6921d] hover:text-white font-bold py-2 px-4 rounded transition-colors duration-300">
  Botón Outline
</button>`,
    preview: (
      <button className="border-2 border-[#f6921d] text-[#f6921d] hover:bg-[#f6921d] hover:text-white font-bold py-2 px-4 rounded transition-colors duration-300">
        Botón Outline
      </button>
    )
  },
  {
    name: 'Newsletter Form',
    category: 'Forms',
    description: 'Formulario de suscripción al newsletter',
    code: `<div className="bg-blue-50 p-8 rounded-lg">
  <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: '#3759C1' }}>
    SUSCRÍBETE A NUESTRO NEWSLETTER
  </h2>
  <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
    <input 
      type="email" 
      placeholder="Tu correo electrónico" 
      className="flex-grow px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button className="text-white font-bold py-3 px-8 rounded-md uppercase transition-colors duration-300" style={{ backgroundColor: '#f6921d' }}>
      Suscribirme
    </button>
  </div>
</div>`,
    preview: (
      <div className="bg-blue-50 p-6 rounded-lg max-w-lg">
        <h2 className="text-xl font-bold mb-4 text-center" style={{ color: '#3759C1' }}>
          SUSCRÍBETE A NUESTRO NEWSLETTER
        </h2>
        <div className="flex flex-col gap-3">
          <input 
            type="email" 
            placeholder="Tu correo electrónico" 
            className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="text-white font-bold py-3 px-8 rounded-md uppercase transition-colors duration-300" style={{ backgroundColor: '#f6921d' }}>
            Suscribirme
          </button>
        </div>
      </div>
    )
  },
  {
    name: 'Header Navigation',
    category: 'Navigation',
    description: 'Navegación principal con logo y menú',
    code: `<header className="bg-white shadow-sm p-4">
  <div className="container mx-auto flex justify-between items-center">
    <div className="flex-shrink-0">
      <img src="/images/logos/logo-prilabsa-azul.png" alt="Logo" className="h-16" />
    </div>
    <nav className="hidden md:flex items-center space-x-6 font-bold text-[#3759C1]">
      <a href="#" className="hover:text-orange-500">{t('header.navigation.home')}</a>
      <a href="#" className="hover:text-orange-500">{t('header.navigation.about')}</a>
      <a href="#" className="hover:text-orange-500">{t('header.navigation.products')}</a>
      <a href="#" className="hover:text-orange-500">{t('header.navigation.contact')}</a>
    </nav>
  </div>
</header>`,
    preview: (
      <header className="bg-white shadow-sm p-4 w-full">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <div className="w-16 h-12 bg-[#3759C1] rounded-lg flex items-center justify-center text-white font-bold text-xs">
              LOGO
            </div>
          </div>
          <nav className="flex items-center space-x-4 font-bold text-[#3759C1] text-sm">
            <a href="#" className="hover:text-orange-500">Inicio</a>
            <a href="#" className="hover:text-orange-500">Productos</a>
            <a href="#" className="hover:text-orange-500">Contacto</a>
          </nav>
        </div>
      </header>
    )
  },
  {
    name: 'Shopping Cart Button',
    category: 'Buttons',
    description: 'Botón de carrito con contador',
    code: `<button className="relative p-2 rounded-full hover:bg-gray-100 text-[#3759C1]">
  <ShoppingCart size={24} />
  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
    3
  </span>
</button>`,
    preview: (
      <button className="relative p-2 rounded-full hover:bg-gray-100 text-[#3759C1]">
        <ShoppingCart size={24} />
        <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          3
        </span>
      </button>
    )
  },
  {
    name: 'Breadcrumbs',
    category: 'Navigation',
    description: 'Navegación de migas de pan',
    code: `<nav className="flex items-center space-x-2 text-sm text-gray-600">
  <a href="#" className="hover:text-blue-600">Inicio</a>
  <span>/</span>
  <a href="#" className="hover:text-blue-600">{t('header.navigation.products')}</a>
  <span>/</span>
  <span className="text-gray-800 font-medium">Categoría</span>
</nav>`,
    preview: (
      <nav className="flex items-center space-x-2 text-sm text-gray-600">
        <a href="#" className="hover:text-blue-600">Inicio</a>
        <span>/</span>
        <a href="#" className="hover:text-blue-600">Productos</a>
        <span>/</span>
        <span className="text-gray-800 font-medium">Categoría</span>
      </nav>
    )
  },
  {
    name: 'Stats Card',
    category: 'Cards',
    description: 'Tarjeta para mostrar estadísticas',
    code: `<div className="bg-white p-6 rounded-lg shadow-md text-center">
  <div className="text-3xl font-bold text-orange-500 mb-2">150+</div>
  <div className="text-gray-600">{t('header.navigation.products')}</div>
</div>`,
    preview: (
      <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-xs">
        <div className="text-3xl font-bold text-orange-500 mb-2">150+</div>
        <div className="text-gray-600">Productos</div>
      </div>
    )
  },
  {
    name: 'Contact Info Card',
    category: 'Cards',
    description: 'Tarjeta de información de contacto',
    code: `<div className="bg-white p-6 rounded-lg shadow-md">
  <div className="flex items-center mb-4">
    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
      <span className="text-blue-600 text-xl">📧</span>
    </div>
    <div>
      <h3 className="font-bold text-gray-800">Email</h3>
      <p className="text-gray-600">info@prilabsa.com</p>
    </div>
  </div>
</div>`,
    preview: (
      <div className="bg-white p-6 rounded-lg shadow-md max-w-xs">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <span className="text-blue-600 text-xl">📧</span>
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Email</h3>
            <p className="text-gray-600">info@prilabsa.com</p>
          </div>
        </div>
      </div>
    )
  }
];

const DesignSystemPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeSection, setActiveSection] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTokenCategory, setActiveTokenCategory] = useState('color');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeComponentCategory, setActiveComponentCategory] = useState('');

  // Función para copiar al portapapeles
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Función para exportar tokens como CSS
  const exportTokensAsCSS = () => {
    const allTokens = [...colorTokens, ...typographyTokens, ...spacingTokens, ...shadowTokens];
    const cssContent = `:root {
${allTokens.map(token => `  ${token.cssVar}: ${token.value};`).join('\n')}
}`;
    
    const blob = new Blob([cssContent], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prilabsa-design-tokens.css';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Función para alternar sidebar en móviles
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Función para cambiar sección y cerrar sidebar en móviles
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setIsSidebarOpen(false);
  };

  // Componente de paleta de colores
  const TokenShowcase = ({ tokens, title }: { tokens: DesignToken[], title: string }) => (
    <div className="mb-12">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tokens.map((token, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            {token.category === 'color' && (
              <div 
                className="w-full h-24 rounded-lg mb-4 border-2 border-gray-200"
                style={{ backgroundColor: token.value }}
              ></div>
            )}
            {token.category === 'typography' && (
              <div 
                className="mb-4 p-4 border rounded-lg"
                style={{ 
                  fontFamily: token.value.includes('rem') ? 'inherit' : token.value,
                  fontSize: token.value.includes('rem') ? token.value : 'inherit'
                }}
              >
                {token.value.includes('rem') ? 'Texto de ejemplo' : 'El rápido zorro marrón'}
              </div>
            )}
            {token.category === 'spacing' && (
              <div className="mb-4 p-4 border rounded-lg">
                <div 
                  className="bg-blue-200 rounded"
                  style={{ width: token.value, height: token.value }}
                ></div>
              </div>
            )}
            {token.category === 'shadow' && (
              <div className="mb-4 p-4 border rounded-lg">
                <div 
                  className="bg-white w-full h-16 rounded-lg"
                  style={{ boxShadow: token.value }}
                ></div>
              </div>
            )}
            <h4 className="font-semibold text-gray-800 mb-2">{token.name}</h4>
            <p className="text-sm text-gray-600 mb-3">{token.description}</p>
            <div className="flex items-center justify-between">
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">{token.value}</code>
              <button 
                onClick={() => copyToClipboard(token.value)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
              >
                {copiedText === token.value ? <CheckCircle size={16} /> : <Copy size={16} />}
                {copiedText === token.value ? 'Copiado' : 'Copiar'}
              </button>
            </div>
            {token.cssVar && (
              <div className="mt-2">
                <code className="bg-gray-900 text-gray-100 px-2 py-1 rounded text-xs">{token.cssVar}</code>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // Componente de showcase de componentes - CORREGIDO
  const ComponentsShowcase = () => {
    // Filtrar componentes basado en búsqueda Y categoría
    const filteredComponents = componentShowcases.filter(component => {
      const matchesSearch = searchTerm === '' || 
        component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        component.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = activeComponentCategory === '' || 
        component.category === activeComponentCategory;
      
      return matchesSearch && matchesCategory;
    });

    const categories = [...new Set(componentShowcases.map(c => c.category))];

    return (
      <div className="space-y-8">
        {/* Filtros por categoría - CORREGIDO */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveComponentCategory('')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeComponentCategory === '' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Todos
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveComponentCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeComponentCategory === category 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Mostrar mensaje si no hay resultados */}
        {filteredComponents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No se encontraron componentes
            </h3>
            <p className="text-gray-500">
              Intenta con otros términos de búsqueda o selecciona una categoría diferente.
            </p>
          </div>
        )}

        {filteredComponents.map((component, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{component.name}</h3>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{component.category}</span>
              </div>
              <button 
                onClick={() => copyToClipboard(component.code)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-2"
              >
                {copiedText === component.code ? <CheckCircle size={16} /> : <Copy size={16} />}
                {copiedText === component.code ? 'Copiado' : 'Copiar Código'}
              </button>
            </div>
            <p className="text-gray-600 mb-6">{component.description}</p>
            
            {/* Preview */}
            <div className="bg-gray-50 p-8 rounded-lg mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-4">Vista Previa</h4>
              <div className="flex items-center justify-center">
                {component.preview}
              </div>
            </div>
            
            {/* Code */}
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Código</h4>
              <pre className="text-sm">
                <code>{component.code}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Componente de Overview optimizado y visual
  const OverviewSection = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">PRILABSA Design System</h1>
            <p className="text-xl opacity-90 mb-6">
              Hub de componentes y tokens de diseño para la web corporativa
            </p>
            <div className="flex items-center gap-4">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                ✅ Auditoria Completa
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                🎨 16 Componentes
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                🔧 32 Tokens
              </span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
              <Palette size={48} className="text-white/80" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Palette size={24} className="text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{colorTokens.length}</span>
          </div>
          <h3 className="font-semibold text-gray-800">Colores</h3>
          <p className="text-sm text-gray-600">Paleta de marca</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Type size={24} className="text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{typographyTokens.length}</span>
          </div>
          <h3 className="font-semibold text-gray-800">Tipografía</h3>
          <p className="text-sm text-gray-600">Escala de fuentes</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Grid size={24} className="text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{componentShowcases.length}</span>
          </div>
          <h3 className="font-semibold text-gray-800">Componentes</h3>
          <p className="text-sm text-gray-600">UI reutilizables</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Layers size={24} className="text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{allTokens.length}</span>
          </div>
          <h3 className="font-semibold text-gray-800">Total Tokens</h3>
          <p className="text-sm text-gray-600">Elementos de diseño</p>
        </div>
      </div>

      {/* Color Palette Preview */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Paleta de Colores Principal</h2>
          <button 
            onClick={() => setActiveSection('tokens')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            {translations.common.viewAll[language]} <ArrowRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {colorTokens.slice(0, 4).map((color, index) => (
            <div key={index} className="text-center">
              <div 
                className="w-full h-20 rounded-lg mb-3 border-2 border-gray-200 shadow-sm"
                style={{ backgroundColor: color.value }}
              ></div>
              <h4 className="font-medium text-gray-800 text-sm">{color.name}</h4>
              <p className="text-xs text-gray-500">{color.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Typography Preview */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{translations.common.typography[language]}</h2>
          <button 
            onClick={() => setActiveSection('tokens')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            {translations.common.viewFullScale[language]} <ArrowRight size={16} />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 w-16">H1</span>
            <h1 className="text-4xl font-bold text-gray-900">{translations.common.mainTitle[language]}</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 w-16">H2</span>
            <h2 className="text-3xl font-bold text-gray-800">{translations.common.secondaryTitle[language]}</h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 w-16">H3</span>
            <h3 className="text-2xl font-semibold text-gray-700">{translations.common.subtitle[language]}</h3>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 w-16">Body</span>
            <p className="text-base text-gray-600">{translations.common.bodyText[language]}</p>
          </div>
        </div>
      </div>

      {/* Component Preview Grid */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{translations.common.featuredComponents[language]}</h2>
          <button 
            onClick={() => setActiveSection('components')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            {translations.common.viewAll[language]} <ArrowRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {componentShowcases.slice(0, 6).map((component, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800">{component.name}</h3>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">{component.category}</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 mb-3 flex items-center justify-center min-h-[120px]">
                <div className="scale-75 origin-center">
                  {component.preview}
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">{component.description}</p>
              <div className="flex gap-2">
                <button className="flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors">
                  <Eye size={12} />
                  {translations.common.preview[language]}
                </button>
                <button 
                  onClick={() => copyToClipboard(component.code)}
                  className="flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                >
                  <Code size={12} />
                  {translations.common.code[language]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
            <Palette size={24} className="text-white" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">{translations.common.exploreTokens[language]}</h3>
          <p className="text-gray-600 text-sm mb-4">Descubre todos los tokens de diseño: colores, tipografía, espaciado y sombras.</p>
          <button 
            onClick={() => setActiveSection('tokens')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            {translations.common.viewTokens[language]} <ArrowRight size={16} />
          </button>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
            <Grid size={24} className="text-white" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">{translations.common.exploreComponents[language]}</h3>
          <p className="text-gray-600 text-sm mb-4">Navega por todos los componentes UI con ejemplos de código y previsualizaciones.</p>
          <button 
            onClick={() => setActiveSection('components')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            {translations.common.viewComponents[language]} <ArrowRight size={16} />
          </button>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
            <Download size={24} className="text-white" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">{translations.common.exportResources[language]}</h3>
          <p className="text-gray-600 text-sm mb-4">Descarga los tokens CSS y recursos del design system para tu proyecto.</p>
          <button 
            onClick={exportTokensAsCSS}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            {translations.common.downloadCSS[language]} <Download size={16} />
          </button>
        </div>
      </div>

      {/* Status & Roadmap */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{translations.common.projectStatus[language]}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">{translations.common.completed[language]}</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Auditoría completa de componentes existentes</li>
              <li>• Extracción de tokens de color y tipografía</li>
              <li>• Documentación de 16 componentes UI</li>
              <li>• Sistema de búsqueda y filtros</li>
              <li>• Exportación de tokens CSS</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">{translations.common.inProgress[language]}</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Documentación de patrones de diseño</li>
              <li>• Guías de uso y mejores prácticas</li>
              <li>• Tokens de espaciado y layout</li>
              <li>• Componentes base adicionales</li>
              <li>• Integración con herramientas de desarrollo</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  // Función para renderizar el contenido de la sección activa
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection />;
      case 'tokens':
        return (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Design Tokens</h2>
              <button 
                onClick={exportTokensAsCSS}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <Download size={16} />
                {translations.common.exportCSS[language]}
              </button>
            </div>
            
            {/* Token Categories */}
            <div className="flex flex-wrap gap-2 mb-8">
              {['color', 'typography', 'spacing', 'shadow'].map(category => (
                <button
                  key={category}
                  onClick={() => setActiveTokenCategory(category)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTokenCategory === category 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
            
            {activeTokenCategory === 'color' && <TokenShowcase tokens={colorTokens} title="Colores" />}
            {activeTokenCategory === 'typography' && <TokenShowcase tokens={typographyTokens} title="Tipografía" />}
            {activeTokenCategory === 'spacing' && <TokenShowcase tokens={spacingTokens} title="Espaciado" />}
            {activeTokenCategory === 'shadow' && <TokenShowcase tokens={shadowTokens} title="Sombras" />}
            
            <div className="prose max-w-none mt-12">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {_colorsContent}
              </ReactMarkdown>
            </div>
          </div>
        );
      case 'components':
        return (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">
                Componentes
              </h2>
              {/* Contador de componentes */}
              <div className="text-sm text-gray-500">
                {componentShowcases.filter(component => {
                  const matchesSearch = searchTerm === '' || 
                    component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    component.description.toLowerCase().includes(searchTerm.toLowerCase());
                  
                  const matchesCategory = activeComponentCategory === '' || 
                    component.category === activeComponentCategory;
                  
                  return matchesSearch && matchesCategory;
                }).length} componentes
              </div>
            </div>
            <ComponentsShowcase />
          </div>
        );
      default:
        return null;
    }
  };

  const allTokens = [...colorTokens, ...typographyTokens, ...spacingTokens, ...shadowTokens];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              {/* Botón de menú móvil */}
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu size={24} />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                PRILABSA Design System
              </h1>
            </div>
            
            {/* Barra de búsqueda - CORREGIDA */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder={activeSection === 'components' ? t('designSystem.search.components') : t('designSystem.search.general')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                {/* Botón para limpiar búsqueda */}
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              <button 
                onClick={exportTokensAsCSS}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <Download size={16} />
                Exportar
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8 relative">
          {/* Sidebar Navigation - CORREGIDO */}
          <aside className={`
            fixed lg:sticky lg:top-32 top-0 left-0 h-full lg:h-auto
            w-72 lg:w-60 bg-white lg:bg-transparent
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            z-40 lg:z-auto flex-shrink-0
            shadow-lg lg:shadow-none
          `}>
            <div className="lg:hidden flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-800">Navegación</h2>
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <nav className="p-4 lg:bg-white lg:rounded-lg lg:shadow-sm overflow-hidden">
              <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4 hidden lg:block">
                Navegación
              </h2>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => handleSectionChange('overview')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors break-words ${
                      activeSection === 'overview' 
                        ? 'bg-blue-100 text-blue-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Overview
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSectionChange('tokens')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors break-words ${
                      activeSection === 'tokens' 
                        ? 'bg-blue-100 text-blue-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Tokens
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSectionChange('components')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors break-words ${
                      activeSection === 'components' 
                        ? 'bg-blue-100 text-blue-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Componentes
                  </button>
                </li>
              </ul>
              
              {/* Stats */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">Estadísticas</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Tokens:</span>
                    <span className="font-medium">{allTokens.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Componentes:</span>
                    <span className="font-medium">{componentShowcases.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Colores:</span>
                    <span className="font-medium">{colorTokens.length}</span>
                  </div>
                </div>
              </div>
            </nav>
          </aside>

          {/* Overlay para móviles */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
              onClick={toggleSidebar}
            />
          )}

          {/* Main Content - CORREGIDO */}
          <main className="flex-1 min-w-0">
            {renderActiveSection()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DesignSystemPage;