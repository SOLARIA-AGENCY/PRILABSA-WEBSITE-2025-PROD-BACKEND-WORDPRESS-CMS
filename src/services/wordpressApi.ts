/**
 * WordPress REST API Client
 *
 * Maneja la comunicación con WordPress Headless CMS
 * Base URL: http://localhost:8000/index.php?rest_route=
 *
 * IMPORTANTE: Este archivo consume la API de WordPress local
 * Los productos fueron migrados en commit 014baa81
 */

import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { OptimizedProduct, ProductTranslations } from '../data/products/types'

// ============================================================================
// CONFIGURACIÓN
// ============================================================================

const WP_BASE_URL = import.meta.env.VITE_WP_API_BASE_URL || 'https://productos.prilabsa.com/wp-json'
const PRODUCTOS_ENDPOINT = '/wp/v2/productos'
const PRODUCTS_PER_PAGE = 500  // Límite aumentado para permitir expansión del catálogo (actual: 105, futuro: hasta 500)

// ============================================================================
// TIPOS TYPESCRIPT
// ============================================================================

/**
 * Estructura de respuesta de WordPress REST API
 * Incluye campos ACF expuestos por plugin "ACF to REST API"
 */
interface WordPressProduct {
  id: number
  title: {
    rendered: string
  }
  slug: string
  // Campos principales (nivel superior, registrados con register_rest_field)
  codigo?: string
  categoria?: 'aditivos' | 'alimentos' | 'equipos' | 'probioticos' | 'quimicos'
  // Imagen del producto
  imagen_producto?: {
    id: number
    url: string
    alt?: string
    width?: number
    height?: number
  }
  // PDF ficha técnica
  ficha_tecnica_pdf?: {
    id: number
    url: string
    title?: string
    filename?: string
    filesize?: number
  }
  // Campos multiidioma
  nombre_producto_es?: string
  nombre_producto_en?: string
  nombre_producto_pt?: string
  descripcion_es?: string
  descripcion_en?: string
  descripcion_pt?: string
  // Beneficios (3 campos separados por idioma) - Nueva estructura
  beneficio_1_es?: string
  beneficio_2_es?: string
  beneficio_3_es?: string
  beneficio_1_en?: string
  beneficio_2_en?: string
  beneficio_3_en?: string
  beneficio_1_pt?: string
  beneficio_2_pt?: string
  beneficio_3_pt?: string
  // Beneficios legacy (textarea, mantener para compatibilidad)
  beneficios_es?: string
  beneficios_en?: string
  beneficios_pt?: string
  presentacion_es?: string
  presentacion_en?: string
  presentacion_pt?: string
  acf: {
    codigo: string
    // Campos legacy (solo español - compatibilidad retroactiva)
    descripcion: string
    beneficios: string  // Separado por \n
    presentacion: string  // Separado por \n
    categoria: 'aditivos' | 'alimentos' | 'equipos' | 'probioticos' | 'quimicos'
    subcategoria: string
    especificaciones: Array<{
      clave: string
      valor: string
    }>
    pdf?: {
      id: number
      url: string
      title: string
      filename: string
      filesize: number
      mime_type: string
    } | number  // Puede ser objeto completo o ID
  }
  featured_media: number  // ID de la imagen destacada
  _links: {
    'wp:featuredmedia'?: Array<{
      href: string
    }>
    'wp:attachment'?: Array<{
      href: string
    }>
  }
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      id: number
      source_url: string
      media_details?: {
        width: number
        height: number
        sizes?: {
          thumbnail?: { source_url: string }
          medium?: { source_url: string }
          large?: { source_url: string }
        }
      }
    }>
  }
}

/**
 * Estructura de Media (imagen/PDF)
 */
interface WordPressMedia {
  id: number
  source_url: string
  media_details: {
    width: number
    height: number
    file: string
    sizes?: {
      thumbnail?: { source_url: string }
      medium?: { source_url: string }
      large?: { source_url: string }
    }
  }
  mime_type: string
}

// ============================================================================
// FUNCIONES AUXILIARES
// ============================================================================

/**
 * Caché en memoria de productos transformados
 * Key: código del producto (ej: "AL018")
 * Value: OptimizedProduct transformado
 */
const transformedProductsCache = new Map<string, OptimizedProduct>()

/**
 * Limpia texto de WordPress: reemplaza \n con espacios y decodifica HTML entities
 */
function cleanWordPressText(text: string): string {
  if (!text) return ''

  // Crear un elemento temporal para decodificar HTML entities
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = text
  let cleaned = tempDiv.textContent || tempDiv.innerText || ''

  // Reemplazar saltos de línea literales y escapados con espacios
  cleaned = cleaned.replace(/\\n/g, ' ').replace(/\n/g, ' ')

  // Limpiar espacios múltiples
  cleaned = cleaned.replace(/\s+/g, ' ').trim()

  return cleaned
}

/**
 * Fetcher para SWR - maneja llamadas HTTP con error handling
 */
const fetcher = async (url: string) => {
  console.log('🌐 Fetcher - Llamando API:', url)
  const response = await fetch(url)

  console.log('📡 Fetcher - Respuesta:', response.status, response.statusText)

  if (!response.ok) {
    console.error('❌ Fetcher - Error HTTP:', response.status)
    throw new Error(`API Error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  console.log('📦 Fetcher - Datos recibidos:', Array.isArray(data) ? `${data.length} items` : typeof data)
  return data
}

/**
 * Obtiene URL de imagen desde WordPress Media API
 */
async function getImageURL(mediaId: number): Promise<string> {
  if (!mediaId) return ''

  try {
    const response = await fetch(`${WP_BASE_URL}/wp/v2/media/${mediaId}`)
    if (!response.ok) return ''

    const media: WordPressMedia = await response.json()
    return media.source_url || ''
  } catch (error) {
    console.error(`Error fetching image ${mediaId}:`, error)
    return ''
  }
}

/**
 * Obtiene URL de PDF desde WordPress Media API
 */
async function getPDFURL(pdfId: number): Promise<string> {
  if (!pdfId) return ''

  try {
    const response = await fetch(`${WP_BASE_URL}/wp/v2/media/${pdfId}`)
    if (!response.ok) return ''

    const media: WordPressMedia = await response.json()
    return media.source_url || ''
  } catch (error) {
    console.error(`Error fetching PDF ${pdfId}:`, error)
    return ''
  }
}

/**
 * Transforma producto de WordPress a formato frontend
 *
 * CRÍTICO: Mantener compatibilidad 100% con estructura actual
 *
 * ⚡ OPTIMIZACIÓN: Usa URLs directas del ACF, evita fetch a Media API
 */
async function transformProduct(wpProduct: WordPressProduct): Promise<OptimizedProduct> {
  // ⚡ Verificar caché primero
  const productCodigo = wpProduct.codigo || wpProduct.acf?.codigo
  const cached = transformedProductsCache.get(productCodigo)
  if (cached) {
    return cached
  }

  // Determinar URL del PDF: Prioridad campo ficha_tecnica_pdf, sino acf.pdf legacy
  let pdfURL: string | undefined = undefined
  if (wpProduct.ficha_tecnica_pdf?.url) {
    // Prioridad 1: Campo ACF ficha_tecnica_pdf (nuevo)
    pdfURL = wpProduct.ficha_tecnica_pdf.url
  } else if (wpProduct.acf.pdf) {
    // Prioridad 2: Campo legacy acf.pdf
    if (typeof wpProduct.acf.pdf === 'object' && wpProduct.acf.pdf.url) {
      // PDF ya viene como objeto con URL
      pdfURL = wpProduct.acf.pdf.url
    } else if (typeof wpProduct.acf.pdf === 'number') {
      // PDF es ID, necesita fetch (legacy)
      pdfURL = await getPDFURL(wpProduct.acf.pdf)
    }
  }

  // ⚡ Obtener URL de imagen (prioridad: campo ACF imagen_producto → featured media)
  let imageURL = ''
  if (wpProduct.imagen_producto?.url) {
    // Prioridad 1: Campo ACF imagen_producto
    imageURL = wpProduct.imagen_producto.url
  } else if (wpProduct._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
    // Prioridad 2: Featured media desde _embedded
    imageURL = wpProduct._embedded['wp:featuredmedia'][0].source_url
  } else if (wpProduct.featured_media) {
    // Prioridad 3: Fetch featured media por ID (legacy)
    imageURL = await getImageURL(wpProduct.featured_media)
  }

  // Extraer filename de URL (para compatibilidad con código existente)
  const imageFilename = imageURL ? imageURL.split('/').pop() || '' : ''
  const pdfFilename = pdfURL ? pdfURL.split('/').pop() || '' : ''

  // 🌐 Construir traducciones multiidioma
  // Usar campos _es/_en/_pt (nivel superior) si existen, sino usar campos legacy (acf) como fallback

  // Nombres de producto multiidioma
  const nombreES = cleanWordPressText(wpProduct.nombre_producto_es || wpProduct.title.rendered)
  const nombreEN = cleanWordPressText(wpProduct.nombre_producto_en || wpProduct.title.rendered)
  const nombrePT = cleanWordPressText(wpProduct.nombre_producto_pt || wpProduct.title.rendered)

  const descripcionES = cleanWordPressText(wpProduct.descripcion_es || wpProduct.acf.descripcion || '')
  const descripcionEN = cleanWordPressText(wpProduct.descripcion_en || wpProduct.acf.descripcion || '')
  const descripcionPT = cleanWordPressText(wpProduct.descripcion_pt || wpProduct.acf.descripcion || '')

  // Beneficios: Preferir campos separados (beneficio_1/2/3), sino usar textarea legacy
  const beneficiosES = wpProduct.beneficio_1_es
    ? [wpProduct.beneficio_1_es, wpProduct.beneficio_2_es, wpProduct.beneficio_3_es]
        .filter((b): b is string => Boolean(b && b.trim()))
        .map(cleanWordPressText)
    : (wpProduct.beneficios_es || wpProduct.acf.beneficios || '')
        .split('\n').filter((b): b is string => Boolean(b && b.trim())).map(cleanWordPressText)

  const beneficiosEN = wpProduct.beneficio_1_en
    ? [wpProduct.beneficio_1_en, wpProduct.beneficio_2_en, wpProduct.beneficio_3_en]
        .filter((b): b is string => Boolean(b && b.trim()))
        .map(cleanWordPressText)
    : (wpProduct.beneficios_en || wpProduct.acf.beneficios || '')
        .split('\n').filter((b): b is string => Boolean(b && b.trim())).map(cleanWordPressText)

  const beneficiosPT = wpProduct.beneficio_1_pt
    ? [wpProduct.beneficio_1_pt, wpProduct.beneficio_2_pt, wpProduct.beneficio_3_pt]
        .filter((b): b is string => Boolean(b && b.trim()))
        .map(cleanWordPressText)
    : (wpProduct.beneficios_pt || wpProduct.acf.beneficios || '')
        .split('\n').filter((b): b is string => Boolean(b && b.trim())).map(cleanWordPressText)

  const presentacionES = (wpProduct.presentacion_es || wpProduct.acf.presentacion || '')
    .split('\n').filter(p => p.trim()).map(cleanWordPressText)
  const presentacionEN = (wpProduct.presentacion_en || wpProduct.acf.presentacion || '')
    .split('\n').filter(p => p.trim()).map(cleanWordPressText)
  const presentacionPT = (wpProduct.presentacion_pt || wpProduct.acf.presentacion || '')
    .split('\n').filter(p => p.trim()).map(cleanWordPressText)

  const translations: ProductTranslations = {
    es: {
      name: nombreES,
      description: descripcionES,
      benefits: beneficiosES,
      presentation: presentacionES,
      specifications: wpProduct.acf.especificaciones?.map(spec => ({
        key: cleanWordPressText(spec.clave),
        value: cleanWordPressText(spec.valor)
      })) || []
    },
    en: {
      name: nombreEN,
      description: descripcionEN,
      benefits: beneficiosEN,
      presentation: presentacionEN,
      specifications: wpProduct.acf.especificaciones?.map(spec => ({
        key: cleanWordPressText(spec.clave),
        value: cleanWordPressText(spec.valor)
      })) || []
    },
    pt: {
      name: nombrePT,
      description: descripcionPT,
      benefits: beneficiosPT,
      presentation: presentacionPT,
      specifications: wpProduct.acf.especificaciones?.map(spec => ({
        key: cleanWordPressText(spec.clave),
        value: cleanWordPressText(spec.valor)
      })) || []
    }
  }

  // Código y categoría: prioridad nivel superior, fallback a acf
  const productCategoria = wpProduct.categoria || wpProduct.acf.categoria

  const optimizedProduct: OptimizedProduct = {
    id: productCodigo,
    slug: wpProduct.slug || productCodigo.toLowerCase(),
    codigo: productCodigo,
    name: nombreES,  // Usar nombre multiidioma español
    description: descripcionES,  // Campo legacy usa español
    category: productCategoria,
    subcategory: wpProduct.acf.subcategoria || '',
    benefits: beneficiosES,  // Campo legacy usa español
    presentation: presentacionES,  // Campo legacy usa español
    specifications: wpProduct.acf.especificaciones?.map(spec => ({
      key: cleanWordPressText(spec.clave),
      value: cleanWordPressText(spec.valor)
    })) || [],
    translations,  // ⭐ Nuevo campo multiidioma
    assets: {
      image: {
        filename: imageFilename,
        path: imageURL || `/assets/images/productos/${imageFilename}`,  // URL real o legacy path
        extension: imageFilename.split('.').pop() || '',
        size: 0,
        exists: !!imageURL,
        // @ts-expect-error - URL dinámica de WordPress
        url: imageURL
      },
      pdf: pdfURL ? {
        filename: pdfFilename,
        path: `/assets/pdfs/productos/${pdfFilename}`,  // Legacy path
        size: '0 KB',
        downloadUrl: pdfURL,  // ⭐ URL real de WordPress
        exists: !!pdfURL,
        url: pdfURL  // ⭐ URL real de WordPress
      } : undefined
    },
    metadata: {
      autoGenerated: false,
      needsReview: false,
      completenessScore: 100,
      featured: false,
      priority: 0
    }
  }

  // ⚡ Guardar en caché
  transformedProductsCache.set(productCodigo, optimizedProduct)

  return optimizedProduct
}

// ============================================================================
// HOOKS PÚBLICOS (React Hooks para componentes)
// ============================================================================

/**
 * Hook principal: Obtiene todos los productos
 *
 * Uso:
 * ```tsx
 * function ProductList() {
 *   const { products, isLoading, error } = useProducts()
 *
 *   if (isLoading) return <div>Cargando...</div>
 *   if (error) return <div>Error: {error.message}</div>
 *
 *   return <ProductListComponent products={products} />
 * }
 * ```
 */
export function useProducts() {
  console.log('🎯 useProducts - Hook llamado')

  // SWR automáticamente cachea y revalida
  const { data, error, isLoading } = useSWR<WordPressProduct[]>(
    `${WP_BASE_URL}${PRODUCTOS_ENDPOINT}?per_page=${PRODUCTS_PER_PAGE}&_embed`,
    fetcher,
    {
      revalidateOnFocus: false,  // No revalidar al enfocar ventana
      revalidateOnReconnect: false,  // No revalidar al reconectar
      dedupingInterval: 60000,  // ⚡ 1 minuto - reducido de 5min para reflejar cambios más rápido
      // ⚠️ REMOVIDO revalidateIfStale y revalidateOnMount
      // Permitir fetch inicial, pero usar caché si existe
    }
  )

  console.log('📊 useProducts - Estado SWR:', {
    hasData: !!data,
    dataLength: data?.length || 0,
    isLoading,
    hasError: !!error
  })

  // Transformar productos cuando data cambie
  const [products, setProducts] = useState<OptimizedProduct[]>([])
  const [isTransforming, setIsTransforming] = useState(false)

  useEffect(() => {
    if (data) {
      console.log('🔄 useProducts - Recibidos de API:', data.length, 'productos')
      setIsTransforming(true)
      // Transformar todos los productos en paralelo
      Promise.all(data.map(transformProduct))
        .then(transformed => {
          console.log('✅ useProducts - Transformados:', transformed.length, 'productos')
          console.log('📦 Primeros 3:', transformed.slice(0, 3).map(p => `${p.codigo} (${p.category})`))
          setProducts(transformed)
          setIsTransforming(false)
        })
        .catch(err => {
          console.error('❌ Error transforming products:', err)
          setIsTransforming(false)
        })
    }
  }, [data])

  return {
    products,
    isLoading: isLoading || isTransforming,  // ⭐ Loading mientras transforma
    error
  }
}

/**
 * Hook: Obtiene un producto por código o slug
 *
 * Busca un producto por código (ej: "AL018") o slug (ej: "test")
 * La búsqueda es case-insensitive
 *
 * Uso:
 * ```tsx
 * function ProductDetail() {
 *   const { product, isLoading, error } = useProduct('AL018') // Por código
 *   // O también:
 *   const { product, isLoading, error } = useProduct('test')  // Por slug
 *   // ...
 * }
 * ```
 */
export function useProduct(codigo: string) {
  const { data, error, isLoading } = useSWR<WordPressProduct[]>(
    codigo ? `${WP_BASE_URL}${PRODUCTOS_ENDPOINT}?per_page=${PRODUCTS_PER_PAGE}&_embed` : null,
    fetcher,
    {
      revalidateOnFocus: false,  // No revalidar al enfocar ventana
      revalidateOnReconnect: false,  // No revalidar al reconectar
      dedupingInterval: 300000,  // ⚡ 5 minutos - evita fetches duplicados
      // ⚠️ REMOVIDO revalidateIfStale y revalidateOnMount
      // Permitir fetch inicial, pero usar caché si existe
    }
  )

  // Buscar producto por código y transformar
  const [product, setProduct] = useState<OptimizedProduct | null>(null)
  const [isTransforming, setIsTransforming] = useState(false)

  useEffect(() => {
    if (data && codigo) {
      const searchTerm = codigo.toLowerCase()

      // Buscar por código (case-insensitive) O por slug
      const wpProduct = data.find(p =>
        p.acf.codigo?.toLowerCase() === searchTerm ||
        p.slug?.toLowerCase() === searchTerm
      )

      if (wpProduct) {
        setIsTransforming(true)
        transformProduct(wpProduct)
          .then(transformed => {
            setProduct(transformed)
            setIsTransforming(false)
          })
          .catch(err => {
            console.error('Error transforming product:', err)
            setIsTransforming(false)
          })
      } else {
        setProduct(null)
        setIsTransforming(false)
      }
    }
  }, [data, codigo])

  return {
    product,
    isLoading: isLoading || isTransforming,  // ⭐ Loading mientras transforma
    error
  }
}

/**
 * Hook: Obtiene productos filtrados por categoría
 */
export function useProductsByCategory(category: string) {
  const { products, isLoading, error } = useProducts()

  const [filteredProducts, setFilteredProducts] = useState<OptimizedProduct[]>([])

  useEffect(() => {
    if (products) {
      setFilteredProducts(products.filter(p => p.category === category))
    }
  }, [products, category])

  return {
    products: filteredProducts,
    isLoading,
    error
  }
}

// ============================================================================
// CATEGORÍAS DINÁMICAS
// ============================================================================

/**
 * Estructura de categoría de WordPress
 */
interface WordPressCategory {
  id: number
  count: number
  name: string
  slug: string
  description: string
  link: string
}

/**
 * Categoría transformada para el frontend
 */
export interface ProductCategory {
  id: number
  name: string
  slug: string
  description: string
  productCount: number
}

/**
 * Hook: Obtiene categorías dinámicamente desde WordPress
 *
 * Las categorías se crean y administran en WordPress,
 * permitiendo agregar nuevas categorías sin modificar código frontend.
 *
 * Uso:
 * ```tsx
 * function CategoryNav() {
 *   const { categories, isLoading, error } = useCategories()
 *
 *   if (isLoading) return <div>Cargando categorías...</div>
 *   if (error) return <div>Error: {error.message}</div>
 *
 *   return (
 *     <nav>
 *       {categories.map(cat => (
 *         <Link key={cat.id} to={`/productos/${cat.slug}`}>
 *           {cat.name} ({cat.productCount})
 *         </Link>
 *       ))}
 *     </nav>
 *   )
 * }
 * ```
 */
export function useCategories() {
  const { data, error, isLoading} = useSWR<WordPressCategory[]>(
    `${WP_BASE_URL}/wp/v2/categorias-productos?per_page=100`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 300000, // Caché de 5 minutos (las categorías cambian raramente)
    }
  )

  // Transformar categorías de WordPress a formato del frontend
  const categories: ProductCategory[] = data
    ? data.map(cat => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        productCount: cat.count
      }))
    : []

  return {
    categories,
    isLoading,
    error
  }
}

// ============================================================================
// BLOG Y NOTICIAS
// ============================================================================

import { BlogArticle } from '../types/blog'

/**
 * Estructura de respuesta de WordPress REST API para Blog
 */
interface WordPressBlogPost {
  id: number
  title: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  content: {
    rendered: string
  }
  date: string
  acf: {
    titulo_es: string
    titulo_en: string
    titulo_pt: string
    resumen_es: string
    resumen_en: string
    resumen_pt: string
    contenido_es: string
    contenido_en: string
    contenido_pt: string
    autor_es: string
    autor_en: string
    autor_pt: string
    fecha_publicacion: string  // Ymd format (ej: 20231026)
    tags_es: string  // CSV: "Tag1,Tag2,Tag3"
    tags_en: string
    tags_pt: string
  }
  featured_media: number
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
    }>
  }
}

/**
 * Estructura de respuesta de WordPress REST API para Noticias
 * (Misma estructura que Blog)
 */
type WordPressNoticia = WordPressBlogPost

/**
 * Caché en memoria de posts de blog transformados
 */
const blogPostsCache = new Map<string, BlogArticle>()

/**
 * Caché en memoria de noticias transformadas
 */
const noticiasCache = new Map<string, BlogArticle>()

/**
 * Convierte formato ACF date (Ymd: 20231026) a YYYY-MM-DD
 */
function formatWordPressDate(acfDate: string): string {
  if (!acfDate || acfDate.length !== 8) return acfDate
  const year = acfDate.substring(0, 4)
  const month = acfDate.substring(4, 6)
  const day = acfDate.substring(6, 8)
  return `${year}-${month}-${day}`
}

/**
 * Transforma post de WordPress a BlogArticle
 */
async function transformBlogPost(wpPost: WordPressBlogPost): Promise<BlogArticle> {
  // ⚡ Verificar caché primero
  const cached = blogPostsCache.get(wpPost.id.toString())
  if (cached) return cached

  // ⚡ Obtener imagen desde _embedded (evita fetch adicional)
  const imageURL = wpPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || ''

  const article: BlogArticle = {
    id: wpPost.id.toString(),
    title: {
      es: cleanWordPressText(wpPost.acf.titulo_es || wpPost.title.rendered),
      en: cleanWordPressText(wpPost.acf.titulo_en || wpPost.title.rendered),
      pt: cleanWordPressText(wpPost.acf.titulo_pt || wpPost.title.rendered)
    },
    summary: {
      es: cleanWordPressText(wpPost.acf.resumen_es || wpPost.excerpt.rendered),
      en: cleanWordPressText(wpPost.acf.resumen_en || wpPost.excerpt.rendered),
      pt: cleanWordPressText(wpPost.acf.resumen_pt || wpPost.excerpt.rendered)
    },
    content: {
      // ⚠️ NO aplicar cleanWordPressText al contenido HTML completo
      es: wpPost.acf.contenido_es || wpPost.content.rendered,
      en: wpPost.acf.contenido_en || wpPost.content.rendered,
      pt: wpPost.acf.contenido_pt || wpPost.content.rendered
    },
    author: {
      es: cleanWordPressText(wpPost.acf.autor_es),
      en: cleanWordPressText(wpPost.acf.autor_en),
      pt: cleanWordPressText(wpPost.acf.autor_pt)
    },
    date: wpPost.acf.fecha_publicacion
      ? formatWordPressDate(wpPost.acf.fecha_publicacion) // Ymd → YYYY-MM-DD
      : wpPost.date.split('T')[0],
    heroImage: imageURL,
    tags: {
      es: wpPost.acf.tags_es
        ? wpPost.acf.tags_es.split(',').map(t => cleanWordPressText(t))
        : [],
      en: wpPost.acf.tags_en
        ? wpPost.acf.tags_en.split(',').map(t => cleanWordPressText(t))
        : [],
      pt: wpPost.acf.tags_pt
        ? wpPost.acf.tags_pt.split(',').map(t => cleanWordPressText(t))
        : []
    }
  }

  // ⚡ Guardar en caché
  blogPostsCache.set(wpPost.id.toString(), article)

  return article
}

/**
 * Transforma noticia de WordPress a BlogArticle
 * (Noticias usan la misma estructura que Blog)
 */
async function transformNoticia(wpNoticia: WordPressNoticia): Promise<BlogArticle> {
  // ⚡ Verificar caché primero
  const cached = noticiasCache.get(wpNoticia.id.toString())
  if (cached) return cached

  // ⚡ Obtener imagen desde _embedded (evita fetch adicional)
  const imageURL = wpNoticia._embedded?.['wp:featuredmedia']?.[0]?.source_url || ''

  const article: BlogArticle = {
    id: wpNoticia.id.toString(),
    title: {
      es: cleanWordPressText(wpNoticia.acf.titulo_es || wpNoticia.title.rendered),
      en: cleanWordPressText(wpNoticia.acf.titulo_en || wpNoticia.title.rendered),
      pt: cleanWordPressText(wpNoticia.acf.titulo_pt || wpNoticia.title.rendered)
    },
    summary: {
      es: cleanWordPressText(wpNoticia.acf.resumen_es || wpNoticia.excerpt.rendered),
      en: cleanWordPressText(wpNoticia.acf.resumen_en || wpNoticia.excerpt.rendered),
      pt: cleanWordPressText(wpNoticia.acf.resumen_pt || wpNoticia.excerpt.rendered)
    },
    content: {
      // ⚠️ NO aplicar cleanWordPressText al contenido HTML completo
      es: wpNoticia.acf.contenido_es || wpNoticia.content.rendered,
      en: wpNoticia.acf.contenido_en || wpNoticia.content.rendered,
      pt: wpNoticia.acf.contenido_pt || wpNoticia.content.rendered
    },
    author: {
      es: cleanWordPressText(wpNoticia.acf.autor_es),
      en: cleanWordPressText(wpNoticia.acf.autor_en),
      pt: cleanWordPressText(wpNoticia.acf.autor_pt)
    },
    date: wpNoticia.acf.fecha_publicacion
      ? formatWordPressDate(wpNoticia.acf.fecha_publicacion) // Ymd → YYYY-MM-DD
      : wpNoticia.date.split('T')[0],
    heroImage: imageURL,
    tags: {
      es: wpNoticia.acf.tags_es
        ? wpNoticia.acf.tags_es.split(',').map(t => cleanWordPressText(t))
        : [],
      en: wpNoticia.acf.tags_en
        ? wpNoticia.acf.tags_en.split(',').map(t => cleanWordPressText(t))
        : [],
      pt: wpNoticia.acf.tags_pt
        ? wpNoticia.acf.tags_pt.split(',').map(t => cleanWordPressText(t))
        : []
    }
  }

  // ⚡ Guardar en caché
  noticiasCache.set(wpNoticia.id.toString(), article)

  return article
}

/**
 * Hook: Obtiene todos los artículos de blog
 */
export function useBlog() {
  console.log('🎯 useBlog - Hook llamado')

  const { data, error, isLoading } = useSWR<WordPressBlogPost[]>(
    `${WP_BASE_URL}/wp/v2/blog?per_page=100&_embed`,
    fetcher,
    {
      revalidateOnFocus: false,  // No revalidar al enfocar ventana
      revalidateOnReconnect: false,  // No revalidar al reconectar
      dedupingInterval: 300000,  // ⚡ 5 minutos - evita fetches duplicados
    }
  )

  console.log('📊 useBlog - Estado SWR:', {
    hasData: !!data,
    dataLength: data?.length || 0,
    isLoading,
    hasError: !!error
  })

  const [articles, setArticles] = useState<BlogArticle[]>([])
  const [isTransforming, setIsTransforming] = useState(false)

  useEffect(() => {
    if (data) {
      console.log('🔄 useBlog - Recibidos de API:', data.length, 'artículos')
      setIsTransforming(true)
      Promise.all(data.map(transformBlogPost))
        .then(transformed => {
          console.log('✅ useBlog - Transformados:', transformed.length, 'artículos')
          setArticles(transformed)
          setIsTransforming(false)
        })
        .catch(err => {
          console.error('❌ useBlog - Error:', err)
          setIsTransforming(false)
        })
    }
  }, [data])

  return {
    articles,
    isLoading: isLoading || isTransforming,
    error
  }
}

/**
 * Hook: Obtiene un artículo de blog por ID
 */
export function useBlogPost(id: string) {
  const { data, error, isLoading } = useSWR<WordPressBlogPost[]>(
    id ? `${WP_BASE_URL}/wp/v2/blog?per_page=100&_embed` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 300000,
    }
  )

  const [article, setArticle] = useState<BlogArticle | null>(null)
  const [isTransforming, setIsTransforming] = useState(false)

  useEffect(() => {
    if (data && id) {
      const wpPost = data.find(p => p.id.toString() === id)
      if (wpPost) {
        setIsTransforming(true)
        transformBlogPost(wpPost)
          .then(transformed => {
            setArticle(transformed)
            setIsTransforming(false)
          })
          .catch(err => {
            console.error('Error transforming blog post:', err)
            setIsTransforming(false)
          })
      } else {
        setArticle(null)
        setIsTransforming(false)
      }
    }
  }, [data, id])

  return {
    article,
    isLoading: isLoading || isTransforming,
    error
  }
}

/**
 * Hook: Obtiene todas las noticias
 */
export function useNoticias() {
  console.log('🎯 useNoticias - Hook llamado')

  const { data, error, isLoading } = useSWR<WordPressNoticia[]>(
    `${WP_BASE_URL}/wp/v2/noticias?per_page=100&_embed`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 300000,
    }
  )

  console.log('📊 useNoticias - Estado SWR:', {
    hasData: !!data,
    dataLength: data?.length || 0,
    isLoading,
    hasError: !!error
  })

  const [articles, setArticles] = useState<BlogArticle[]>([])
  const [isTransforming, setIsTransforming] = useState(false)

  useEffect(() => {
    if (data) {
      console.log('🔄 useNoticias - Recibidos de API:', data.length, 'noticias')
      setIsTransforming(true)
      Promise.all(data.map(transformNoticia))
        .then(transformed => {
          console.log('✅ useNoticias - Transformados:', transformed.length, 'noticias')
          setArticles(transformed)
          setIsTransforming(false)
        })
        .catch(err => {
          console.error('❌ useNoticias - Error:', err)
          setIsTransforming(false)
        })
    }
  }, [data])

  return {
    articles,
    isLoading: isLoading || isTransforming,
    error
  }
}

/**
 * Hook: Obtiene una noticia por ID
 */
export function useNoticia(id: string) {
  const { data, error, isLoading } = useSWR<WordPressNoticia[]>(
    id ? `${WP_BASE_URL}/wp/v2/noticias?per_page=100&_embed` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 300000,
    }
  )

  const [article, setArticle] = useState<BlogArticle | null>(null)
  const [isTransforming, setIsTransforming] = useState(false)

  useEffect(() => {
    if (data && id) {
      const wpNoticia = data.find(p => p.id.toString() === id)
      if (wpNoticia) {
        setIsTransforming(true)
        transformNoticia(wpNoticia)
          .then(transformed => {
            setArticle(transformed)
            setIsTransforming(false)
          })
          .catch(err => {
            console.error('Error transforming noticia:', err)
            setIsTransforming(false)
          })
      } else {
        setArticle(null)
        setIsTransforming(false)
      }
    }
  }, [data, id])

  return {
    article,
    isLoading: isLoading || isTransforming,
    error
  }
}

// ============================================================================
// UTILIDADES PARA GESTIÓN DE CACHÉ
// ============================================================================

/**
 * Limpia todas las cachés (memoria + SWR)
 *
 * Útil cuando:
 * - Se eliminan productos en WordPress y no se reflejan en frontend
 * - Se actualizan datos y no se ven los cambios
 * - Debugging de problemas de caché
 *
 * Uso desde consola del navegador:
 * ```javascript
 * // Importar la función
 * import { clearAllCaches } from './services/wordpressApi'
 * clearAllCaches()
 * ```
 *
 * O simplemente recargar la página (Cmd+R / Ctrl+R)
 */
export function clearAllCaches() {
  console.log('🧹 Limpiando cachés...')

  // 1. Limpiar caché en memoria de productos transformados
  const productsCacheSize = transformedProductsCache.size
  transformedProductsCache.clear()
  console.log(`✅ Caché de productos limpiada (${productsCacheSize} items)`)

  // 2. Limpiar caché de SWR
  // SWR usa cache global, podemos forzar revalidación cambiando window
  if (typeof window !== 'undefined') {
    window.location.reload()
    console.log('🔄 Recargando página para limpiar caché SWR...')
  }
}

/**
 * Limpia solo la caché en memoria (no recarga página)
 *
 * Útil para debugging sin perder estado de la aplicación
 */
export function clearMemoryCache() {
  const size = transformedProductsCache.size
  transformedProductsCache.clear()
  console.log(`🧹 Caché en memoria limpiada (${size} items)`)
}
