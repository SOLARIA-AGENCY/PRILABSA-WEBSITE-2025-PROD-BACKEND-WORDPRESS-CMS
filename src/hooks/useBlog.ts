/**
 * useBlog Hook - WordPress Blog CPT integration
 *
 * Fetches blog posts from WordPress Custom Post Type 'blog'
 * with ACF multiidioma fields (titulo_es/en/pt, etc.)
 *
 * @see src/types/blog.ts - BlogArticle interface
 */

import { useState, useEffect } from 'react';
import { BlogArticle, MultiLanguageContent } from '../types/blog';

// WordPress Blog CPT response structure (with ACF fields)
interface WordPressBlogPost {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  acf: {
    titulo_es?: string;
    titulo_en?: string;
    titulo_pt?: string;
    resumen_es?: string;
    resumen_en?: string;
    resumen_pt?: string;
    contenido_es?: string;
    contenido_en?: string;
    contenido_pt?: string;
    autor_es?: string;
    autor_en?: string;
    autor_pt?: string;
    fecha_publicacion?: string;
    tags_es?: string;
    tags_en?: string;
    tags_pt?: string;
    imagen_destacada?: string | { url: string } | number;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>;
  };
}

interface UseBlogReturn {
  posts: BlogArticle[];
  articles: BlogArticle[];
  loading: boolean;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * Strips HTML tags from WordPress content
 */
function stripHtml(html: string): string {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .trim();
}

/**
 * Extract image URL from ACF field (can be string, object with url, or media ID)
 */
function getImageUrl(imageField: string | { url: string } | number | undefined, embedded?: WordPressBlogPost['_embedded']): string {
  // Try ACF image field first
  if (typeof imageField === 'string' && imageField.startsWith('http')) {
    return imageField;
  }
  if (typeof imageField === 'object' && imageField && 'url' in imageField) {
    return imageField.url;
  }
  // Fallback to embedded featured media
  if (embedded?.['wp:featuredmedia']?.[0]?.source_url) {
    return embedded['wp:featuredmedia'][0].source_url;
  }
  return '/assets/iniciodev/blue-texture-background.jpg';
}

/**
 * Parse tags string (CSV format) to array
 */
function parseTags(tagsString: string | undefined): string[] {
  if (!tagsString) return [];
  return tagsString.split(',').map(tag => tag.trim()).filter(Boolean);
}

/**
 * Transforms WordPress Blog CPT post to BlogArticle format
 * Uses ACF multiidioma fields
 */
function transformBlogPost(post: WordPressBlogPost): BlogArticle {
  const acf = post.acf || {};

  // Build MultiLanguageContent from ACF fields
  const title: MultiLanguageContent = {
    es: stripHtml(acf.titulo_es || post.title?.rendered || ''),
    en: stripHtml(acf.titulo_en || acf.titulo_es || post.title?.rendered || ''),
    pt: stripHtml(acf.titulo_pt || acf.titulo_es || post.title?.rendered || '')
  };

  const summary: MultiLanguageContent = {
    es: stripHtml(acf.resumen_es || ''),
    en: stripHtml(acf.resumen_en || acf.resumen_es || ''),
    pt: stripHtml(acf.resumen_pt || acf.resumen_es || '')
  };

  // Keep HTML in content for rendering
  const content: MultiLanguageContent = {
    es: acf.contenido_es || '',
    en: acf.contenido_en || acf.contenido_es || '',
    pt: acf.contenido_pt || acf.contenido_es || ''
  };

  const author: MultiLanguageContent = {
    es: acf.autor_es || 'Prilabsa',
    en: acf.autor_en || acf.autor_es || 'Prilabsa',
    pt: acf.autor_pt || acf.autor_es || 'Prilabsa'
  };

  // Parse date - ACF fecha_publicacion is in Ymd format (20251203)
  let dateStr = post.date.split('T')[0]; // Default to WordPress date
  if (acf.fecha_publicacion) {
    const fp = acf.fecha_publicacion;
    if (fp.length === 8) {
      // Format: YYYYMMDD -> YYYY-MM-DD
      dateStr = `${fp.slice(0, 4)}-${fp.slice(4, 6)}-${fp.slice(6, 8)}`;
    } else {
      dateStr = fp;
    }
  }

  return {
    id: post.id.toString(),
    title,
    summary,
    content,
    date: dateStr,
    author,
    heroImage: getImageUrl(acf.imagen_destacada, post._embedded),
    tags: {
      es: parseTags(acf.tags_es),
      en: parseTags(acf.tags_en),
      pt: parseTags(acf.tags_pt)
    }
  };
}

export function useBlog(): UseBlogReturn {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);

    try {
      // Use CPT 'blog' endpoint instead of standard 'posts'
      const response = await fetch(
        'https://productos.prilabsa.com/wp-json/wp/v2/blog?_embed&per_page=10'
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data: WordPressBlogPost[] = await response.json();
      const transformed = data.map(transformBlogPost);
      setArticles(transformed);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch blog posts'));
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts: articles,
    articles,
    loading,
    isLoading: loading,
    error,
    refetch: fetchPosts
  };
}

export default useBlog;
