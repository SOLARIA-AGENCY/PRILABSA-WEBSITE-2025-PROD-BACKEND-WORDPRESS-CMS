/**
 * WordPress REST API Types
 * PRILABSA Headless WordPress Integration
 * @author SOLARIA AGENCY
 */

/**
 * WordPress REST API Response Wrapper
 */
export interface WordPressAPIResponse<T> {
  data: T;
  headers: {
    'x-wp-total': string;
    'x-wp-totalpages': string;
  };
}

/**
 * WordPress REST API Error
 */
export interface WordPressAPIError {
  code: string;
  message: string;
  data: {
    status: number;
  };
}

/**
 * WordPress Rendered Content
 */
export interface WordPressRendered {
  rendered: string;
  protected?: boolean;
}

/**
 * WordPress Media Object
 */
export interface WordPressMedia {
  id: number;
  date: string;
  slug: string;
  type: 'attachment';
  link: string;
  title: WordPressRendered;
  author: number;
  caption: WordPressRendered;
  alt_text: string;
  media_type: 'image' | 'file';
  mime_type: string;
  media_details: {
    width: number;
    height: number;
    file: string;
    filesize: number;
    sizes: {
      [key: string]: {
        file: string;
        width: number;
        height: number;
        mime_type: string;
        source_url: string;
      };
    };
  };
  source_url: string;
}

/**
 * WordPress Category (Categorias Productos)
 */
export interface WordPressCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: 'categorias-productos';
  parent: number;
  meta: any[];
  _links: {
    self: Array<{ href: string }>;
    collection: Array<{ href: string }>;
    about: Array<{ href: string }>;
    'wp:post_type': Array<{ href: string }>;
    curies: Array<{ name: string; href: string; templated: boolean }>;
  };
}

/**
 * WordPress Tag (Tags Productos)
 */
export interface WordPressTag {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: 'tags-productos';
  meta: any[];
  _links: {
    self: Array<{ href: string }>;
    collection: Array<{ href: string }>;
    about: Array<{ href: string }>;
    'wp:post_type': Array<{ href: string }>;
    curies: Array<{ name: string; href: string; templated: boolean }>;
  };
}

/**
 * ACF Fields for Productos
 * Based on ACF configuration in WordPress
 */
export interface WordPressACFFields {
  /**
   * Código del producto (ej: "PRI-001")
   */
  codigo: string;

  /**
   * Nombre completo del producto en español
   */
  nombre_producto_es: string;

  /**
   * Nombre completo del producto en inglés
   */
  nombre_producto_en: string;

  /**
   * Nombre completo del producto en portugués
   */
  nombre_producto_pt: string;

  /**
   * Descripción HTML del producto en español
   */
  descripcion_es: string;

  /**
   * Descripción HTML del producto en inglés
   */
  descripcion_en: string;

  /**
   * Descripción HTML del producto en portugués
   */
  descripcion_pt: string;

  /**
   * Array de IDs de imágenes (WordPress Media IDs)
   */
  fotos: number[];

  /**
   * ID del archivo PDF (WordPress Media ID)
   */
  pdf: number | null;

  /**
   * Marca del producto (ej: "PASCO", "3B Scientific")
   */
  marca?: string;

  /**
   * Stock disponible
   */
  stock?: number;

  /**
   * Precio (opcional, puede manejarse externamente)
   */
  precio?: number;

  /**
   * Especificaciones técnicas adicionales
   */
  especificaciones?: string;
}

/**
 * WordPress Product (Custom Post Type: productos)
 */
export interface WordPressProduct {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: 'publish' | 'draft' | 'pending' | 'private';
  type: 'productos';
  link: string;
  title: WordPressRendered;
  content: WordPressRendered;
  excerpt: WordPressRendered;
  author: number;
  featured_media: number;
  comment_status: 'open' | 'closed';
  ping_status: 'open' | 'closed';
  template: string;
  meta: any[];

  /**
   * Taxonomies
   */
  'categorias-productos': number[];
  'tags-productos': number[];

  /**
   * ACF Fields (custom fields)
   */
  acf: WordPressACFFields;

  /**
   * Embedded resources (when using _embed parameter)
   */
  _embedded?: {
    'wp:featuredmedia'?: WordPressMedia[];
    'wp:term'?: Array<Array<WordPressCategory | WordPressTag>>;
    author?: Array<{
      id: number;
      name: string;
      slug: string;
      avatar_urls: {
        [key: string]: string;
      };
    }>;
  };

  _links: {
    self: Array<{ href: string }>;
    collection: Array<{ href: string }>;
    about: Array<{ href: string }>;
    author: Array<{ embeddable: boolean; href: string }>;
    replies: Array<{ embeddable: boolean; href: string }>;
    'version-history': Array<{ count: number; href: string }>;
    'wp:featuredmedia': Array<{ embeddable: boolean; href: string }>;
    'wp:attachment': Array<{ href: string }>;
    'wp:term': Array<{ taxonomy: string; embeddable: boolean; href: string }>;
    curies: Array<{ name: string; href: string; templated: boolean }>;
  };
}

/**
 * API Request Parameters for Products List
 */
export interface ProductsQueryParams {
  page?: number;
  per_page?: number;
  search?: string;
  after?: string;
  before?: string;
  exclude?: number[];
  include?: number[];
  offset?: number;
  order?: 'asc' | 'desc';
  orderby?: 'date' | 'id' | 'include' | 'title' | 'slug' | 'modified';
  slug?: string;
  status?: 'publish' | 'draft' | 'pending' | 'private';
  'categorias-productos'?: number | number[];
  'tags-productos'?: number | number[];
  _embed?: boolean;
  _fields?: string;
}

/**
 * API Request Parameters for Categories
 */
export interface CategoriesQueryParams {
  page?: number;
  per_page?: number;
  search?: string;
  exclude?: number[];
  include?: number[];
  order?: 'asc' | 'desc';
  orderby?: 'id' | 'include' | 'name' | 'slug' | 'count';
  hide_empty?: boolean;
  parent?: number;
  post?: number;
  slug?: string;
}

/**
 * API Request Parameters for Tags
 */
export interface TagsQueryParams {
  page?: number;
  per_page?: number;
  search?: string;
  exclude?: number[];
  include?: number[];
  order?: 'asc' | 'desc';
  orderby?: 'id' | 'include' | 'name' | 'slug' | 'count';
  hide_empty?: boolean;
  post?: number;
  slug?: string;
}

/**
 * Custom Search Endpoint Response
 */
export interface SearchResponse {
  success: boolean;
  data: WordPressProduct[];
  total: number;
  pages: number;
}

/**
 * Pagination Metadata
 */
export interface PaginationMeta {
  total: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
}

/**
 * API Response with Pagination
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

/**
 * Generic API Error Response
 */
export interface APIError {
  message: string;
  code?: string;
  status?: number;
  originalError?: any;
}

/**
 * Type Guard: Check if error is WordPress API Error
 */
export function isWordPressAPIError(error: any): error is WordPressAPIError {
  return (
    error &&
    typeof error === 'object' &&
    'code' in error &&
    'message' in error &&
    'data' in error &&
    typeof error.data === 'object' &&
    'status' in error.data
  );
}

/**
 * Type Guard: Check if response is paginated
 */
export function isPaginatedResponse<T>(response: any): response is PaginatedResponse<T> {
  return (
    response &&
    typeof response === 'object' &&
    'data' in response &&
    'pagination' in response &&
    Array.isArray(response.data)
  );
}

/**
 * Utility type for SWR key
 */
export type SWRKey = string | [string, ...any[]] | null;

/**
 * Utility type for API method responses
 */
export type APIResponse<T> = Promise<T>;

/**
 * Utility type for transformed product (frontend app type)
 */
export interface TransformedProduct {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  imagenes: string[];
  pdfUrl: string | null;
  slug: string;
  marca?: string;
  categorias: Array<{ id: number; name: string; slug: string }>;
  tags: Array<{ id: number; name: string; slug: string }>;
  fechaCreacion: string;
  fechaModificacion: string;
}

/**
 * App Configuration
 */
export interface AppConfig {
  apiBaseUrl: string;
  apiTimeout: number;
  enableCache: boolean;
  swrRevalidateOnFocus: boolean;
  swrRevalidateOnReconnect: boolean;
  swrDedupingInterval: number;
}
