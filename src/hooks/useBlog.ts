/**
 * useBlog Hook - WordPress Blog integration
 *
 * Fetches posts from WordPress REST API and transforms them
 * to BlogArticle format for multi-language support.
 *
 * @see src/types/blog.ts - BlogArticle interface
 */

import { useState, useEffect } from 'react';
import { BlogArticle, MultiLanguageContent } from '../types/blog';

// WordPress REST API response structure
interface WordPressPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  slug: string;
  featured_media: number;
  categories: number[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>;
    'author'?: Array<{ name: string }>;
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
 * Creates a MultiLanguageContent object from a single string
 * WordPress posts are in Spanish, so we use the same content for all languages
 */
function createMultiLangContent(content: string): MultiLanguageContent {
  const cleaned = stripHtml(content);
  return {
    es: cleaned,
    en: cleaned,
    pt: cleaned
  };
}

/**
 * Transforms WordPress post to BlogArticle format
 */
function transformPost(post: WordPressPost): BlogArticle {
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
    '/assets/iniciodev/blue-texture-background.jpg';

  const authorName = post._embedded?.author?.[0]?.name || 'Prilabsa';

  return {
    id: post.id.toString(),
    title: createMultiLangContent(post.title.rendered),
    summary: createMultiLangContent(post.excerpt.rendered),
    content: createMultiLangContent(post.content.rendered),
    date: post.date.split('T')[0], // Format: YYYY-MM-DD
    author: createMultiLangContent(authorName),
    heroImage: featuredImage,
    tags: {
      es: [],
      en: [],
      pt: []
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
      const response = await fetch(
        'https://productos.prilabsa.com/wp-json/wp/v2/posts?_embed&per_page=10'
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data: WordPressPost[] = await response.json();
      const transformed = data.map(transformPost);
      setArticles(transformed);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch posts'));
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
