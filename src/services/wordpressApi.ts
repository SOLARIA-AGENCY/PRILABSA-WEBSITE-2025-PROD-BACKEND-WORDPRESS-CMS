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
import { OptimizedProduct } from '../data/products/types'

// ============================================================================
// CONFIGURACIÓN
// ============================================================================

const WP_BASE_URL = 'http://localhost:8000/wp-json'
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
  acf: {
    codigo: string
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
  const cached = transformedProductsCache.get(wpProduct.acf.codigo)
  if (cached) {
    return cached
  }

  // Determinar URL del PDF: si es objeto usar directamente, si es ID hacer fetch
  let pdfURL: string | undefined = undefined
  if (wpProduct.acf.pdf) {
    if (typeof wpProduct.acf.pdf === 'object' && wpProduct.acf.pdf.url) {
      // PDF ya viene como objeto con URL
      pdfURL = wpProduct.acf.pdf.url
    } else if (typeof wpProduct.acf.pdf === 'number') {
      // PDF es ID, necesita fetch (legacy)
      pdfURL = await getPDFURL(wpProduct.acf.pdf)
    }
  }

  // ⚡ Usar URL de imagen desde _embedded (evita fetch a Media API)
  const imageURL = wpProduct._embedded?.['wp:featuredmedia']?.[0]?.source_url || await getImageURL(wpProduct.featured_media)

  // Extraer filename de URL (para compatibilidad con código existente)
  const imageFilename = imageURL ? imageURL.split('/').pop() || '' : ''
  const pdfFilename = pdfURL ? pdfURL.split('/').pop() || '' : ''

  const optimizedProduct: OptimizedProduct = {
    id: wpProduct.acf.codigo,
    slug: wpProduct.acf.codigo.toLowerCase(),
    codigo: wpProduct.acf.codigo,
    name: wpProduct.title.rendered,
    description: wpProduct.acf.descripcion || '',
    category: wpProduct.acf.categoria,
    subcategory: wpProduct.acf.subcategoria || '',
    benefits: wpProduct.acf.beneficios
      ? wpProduct.acf.beneficios.split('\n').filter(b => b.trim())
      : [],
    presentation: wpProduct.acf.presentacion
      ? wpProduct.acf.presentacion.split('\n').filter(p => p.trim())
      : [],
    specifications: wpProduct.acf.especificaciones?.map(spec => ({
      key: spec.clave,
      value: spec.valor
    })) || [],
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
  transformedProductsCache.set(wpProduct.acf.codigo, optimizedProduct)

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
      dedupingInterval: 300000,  // ⚡ 5 minutos - evita fetches duplicados
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
 * Hook: Obtiene un producto por código
 *
 * Uso:
 * ```tsx
 * function ProductDetail({ codigo }: { codigo: string }) {
 *   const { product, isLoading, error } = useProduct(codigo)
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
      const wpProduct = data.find(p => p.acf.codigo === codigo)
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
  const { data, error, isLoading } = useSWR<WordPressCategory[]>(
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
