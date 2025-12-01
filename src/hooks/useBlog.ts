/**
 * useBlog Hook - Stub for WordPress Blog integration
 * TODO: Implement full WordPress posts fetching
 */

import { useState, useEffect } from 'react';

interface BlogPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  slug: string;
  featured_media: number;
  categories: number[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>;
  };
}

interface UseBlogReturn {
  posts: BlogPost[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useBlog(): UseBlogReturn {
  const [posts, setPosts] = useState<BlogPost[]>([]);
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

      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch posts'));
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    refetch: fetchPosts
  };
}

export default useBlog;
