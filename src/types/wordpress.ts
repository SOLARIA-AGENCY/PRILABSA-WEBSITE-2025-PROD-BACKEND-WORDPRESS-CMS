/**
 * WordPress REST API Types for PRILABSA Products
 * Defines the structure of data returned from WordPress/ACF
 */

// ACF Image structure from WordPress
export interface WordPressACFImage {
  ID: number;
  id: number;
  title: string;
  filename: string;
  filesize: number;
  url: string;
  link: string;
  alt: string;
  author: string;
  description: string;
  caption: string;
  name: string;
  status: string;
  uploaded_to: number;
  date: string;
  modified: string;
  menu_order: number;
  mime_type: string;
  type: string;
  subtype: string;
  icon: string;
  width: number;
  height: number;
  sizes: {
    thumbnail: string;
    'thumbnail-width': number;
    'thumbnail-height': number;
    medium: string;
    'medium-width': number;
    'medium-height': number;
    medium_large: string;
    'medium_large-width': number;
    'medium_large-height': number;
    large: string;
    'large-width': number;
    'large-height': number;
    '1536x1536': string;
    '1536x1536-width': number;
    '1536x1536-height': number;
    '2048x2048': string;
    '2048x2048-width': number;
    '2048x2048-height': number;
  };
}

// ACF Fields for Productos CPT
export interface WordPressProductACF {
  codigo: string | null;
  categoria: string | null;
  nombre_producto_es: string | null;
  nombre_producto_en: string | null;
  nombre_producto_pt: string | null;
  imagen_producto: WordPressACFImage | null;
  ficha_tecnica_pdf: string | null;
  descripcion_es: string | null;
  descripcion_en: string | null;
  descripcion_pt: string | null;
  beneficio_1_es: string | null;
  beneficio_1_en: string | null;
  beneficio_1_pt: string | null;
  beneficio_2_es: string | null;
  beneficio_2_en: string | null;
  beneficio_2_pt: string | null;
  beneficio_3_es: string | null;
  beneficio_3_en: string | null;
  beneficio_3_pt: string | null;
  presentacion_es: string | null;
  presentacion_en: string | null;
  presentacion_pt: string | null;
  descripcion_corta_es: string | null;
  descripcion_corta_en: string | null;
  descripcion_corta_pt: string | null;
  especificaciones_es: string | null;
  especificaciones_en: string | null;
  especificaciones_pt: string | null;
}

// WordPress Product from REST API
export interface WordPressProduct {
  id: number;
  date: string;
  date_gmt: string;
  guid: { rendered: string };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: { rendered: string };
  content: { rendered: string; protected: boolean };
  excerpt: { rendered: string; protected: boolean };
  featured_media: number;
  template: string;
  meta: Record<string, unknown>;
  'categorias-productos': number[];
  'tags-productos': number[];
  class_list: string[];
  acf: WordPressProductACF;
  // Flattened ACF fields (also exposed at root level)
  codigo: string | null;
  categoria: string | null;
  imagen_producto: WordPressACFImage | null;
  ficha_tecnica_pdf: string | null;
  nombre_producto_es: string | null;
  nombre_producto_en: string | null;
  nombre_producto_pt: string | null;
  descripcion_es: string | null;
  descripcion_en: string | null;
  descripcion_pt: string | null;
  beneficio_1_es: string | null;
  beneficio_2_es: string | null;
  beneficio_3_es: string | null;
  beneficio_1_en: string | null;
  beneficio_2_en: string | null;
  beneficio_3_en: string | null;
  beneficio_1_pt: string | null;
  beneficio_2_pt: string | null;
  beneficio_3_pt: string | null;
  presentacion_es: string | null;
  presentacion_en: string | null;
  presentacion_pt: string | null;
  descripcion_corta_es: string | null;
  descripcion_corta_en: string | null;
  descripcion_corta_pt: string | null;
  especificaciones_es: string | null;
  especificaciones_en: string | null;
  especificaciones_pt: string | null;
  featured_image_url: string | null;
  featured_image_sizes: {
    thumbnail: { url: string; width: number; height: number };
    medium: { url: string; width: number; height: number };
    medium_large: { url: string; width: number; height: number };
    large: { url: string; width: number; height: number };
    full: { url: string; width: number; height: number };
  } | null;
  acf_fields: WordPressProductACF;
  _links: {
    self: Array<{ href: string }>;
    collection: Array<{ href: string }>;
    about: Array<{ href: string }>;
    'wp:attachment': Array<{ href: string }>;
    'wp:term': Array<{ taxonomy: string; embeddable: boolean; href: string }>;
  };
}

// WordPress Category from REST API
export interface WordPressCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
  meta: unknown[];
  acf: Record<string, unknown>;
  _links: {
    self: Array<{ href: string }>;
    collection: Array<{ href: string }>;
    about: Array<{ href: string }>;
    'wp:post_type': Array<{ href: string }>;
  };
}

// API Response types
export interface WordPressAPIResponse<T> {
  data: T;
  headers: {
    'x-wp-total'?: string;
    'x-wp-totalpages'?: string;
  };
}

// API Query parameters
export interface WordPressProductQuery {
  per_page?: number;
  page?: number;
  search?: string;
  'categorias-productos'?: number;
  orderby?: 'date' | 'title' | 'slug' | 'modified';
  order?: 'asc' | 'desc';
  _embed?: boolean;
}

// Supported languages
export type WordPressLanguage = 'es' | 'en' | 'pt';
