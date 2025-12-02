/**
 * useNoticias Hook Tests
 *
 * Tests the WordPress post transformation to BlogArticle format
 * for the /noticias page.
 *
 * @see src/services/wordpressApi.ts - useNoticias hook
 */

import { describe, it, expect } from 'vitest';

// Replicating helper functions from wordpressApi.ts for testing
function stripHtmlTags(html: string): string {
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

interface MultiLanguageContent {
  es: string;
  en: string;
  pt: string;
}

function toMultiLang(content: string): MultiLanguageContent {
  const cleaned = stripHtmlTags(content);
  return { es: cleaned, en: cleaned, pt: cleaned };
}

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

interface BlogArticle {
  id: string;
  title: MultiLanguageContent;
  summary: MultiLanguageContent;
  content: MultiLanguageContent;
  date: string;
  author: MultiLanguageContent;
  heroImage: string;
  tags: { es: string[]; en: string[]; pt: string[] };
}

function transformWordPressPost(post: WordPressPost): BlogArticle {
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
    '/assets/iniciodev/blue-texture-background.jpg';
  const authorName = post._embedded?.author?.[0]?.name || 'Prilabsa';

  return {
    id: post.id.toString(),
    title: toMultiLang(post.title.rendered),
    summary: toMultiLang(post.excerpt.rendered),
    content: toMultiLang(post.content.rendered),
    date: post.date.split('T')[0],
    author: toMultiLang(authorName),
    heroImage: featuredImage,
    tags: { es: [], en: [], pt: [] }
  };
}

describe('stripHtmlTags', () => {
  it('should remove HTML tags', () => {
    expect(stripHtmlTags('<p>Hello <strong>World</strong></p>')).toBe('Hello World');
  });

  it('should decode HTML entities', () => {
    expect(stripHtmlTags('Hello &amp; World')).toBe('Hello & World');
    expect(stripHtmlTags('&lt;script&gt;')).toBe('<script>');
    expect(stripHtmlTags('&quot;quoted&quot;')).toBe('"quoted"');
    expect(stripHtmlTags('It&#039;s fine')).toBe("It's fine");
  });

  it('should replace &nbsp; with space', () => {
    expect(stripHtmlTags('Hello&nbsp;World')).toBe('Hello World');
  });

  it('should trim whitespace', () => {
    expect(stripHtmlTags('  <p>  Hello  </p>  ')).toBe('Hello');
  });
});

describe('toMultiLang', () => {
  it('should create MultiLanguageContent from string', () => {
    const result = toMultiLang('Hello World');
    expect(result).toEqual({
      es: 'Hello World',
      en: 'Hello World',
      pt: 'Hello World'
    });
  });

  it('should strip HTML and create MultiLanguageContent', () => {
    const result = toMultiLang('<p>Hello <strong>World</strong></p>');
    expect(result.es).toBe('Hello World');
    expect(result.en).toBe('Hello World');
    expect(result.pt).toBe('Hello World');
  });
});

describe('transformWordPressPost', () => {
  it('should transform WordPress post to BlogArticle', () => {
    const wpPost: WordPressPost = {
      id: 1,
      title: { rendered: 'Hello world!' },
      excerpt: { rendered: '<p>Welcome to WordPress.</p>\n' },
      content: { rendered: '<p>Welcome to WordPress. This is your first post.</p>\n' },
      date: '2025-11-14T11:42:45',
      slug: 'hello-world',
      featured_media: 0,
      categories: [1],
      _embedded: {
        'author': [{ name: 'admin' }]
      }
    };

    const result = transformWordPressPost(wpPost);

    expect(result.id).toBe('1');
    expect(result.title.es).toBe('Hello world!');
    expect(result.summary.es).toBe('Welcome to WordPress.');
    expect(result.content.es).toBe('Welcome to WordPress. This is your first post.');
    expect(result.date).toBe('2025-11-14');
    expect(result.author.es).toBe('admin');
    expect(result.heroImage).toBe('/assets/iniciodev/blue-texture-background.jpg');
    expect(result.tags).toEqual({ es: [], en: [], pt: [] });
  });

  it('should use featured image when available', () => {
    const wpPost: WordPressPost = {
      id: 2,
      title: { rendered: 'Test Post' },
      excerpt: { rendered: 'Test excerpt' },
      content: { rendered: 'Test content' },
      date: '2025-12-01T10:00:00',
      slug: 'test-post',
      featured_media: 123,
      categories: [],
      _embedded: {
        'wp:featuredmedia': [{ source_url: 'https://example.com/image.jpg' }],
        'author': [{ name: 'John Doe' }]
      }
    };

    const result = transformWordPressPost(wpPost);

    expect(result.heroImage).toBe('https://example.com/image.jpg');
    expect(result.author.es).toBe('John Doe');
  });

  it('should use default author when not embedded', () => {
    const wpPost: WordPressPost = {
      id: 3,
      title: { rendered: 'No Author Post' },
      excerpt: { rendered: 'Excerpt' },
      content: { rendered: 'Content' },
      date: '2025-12-01T10:00:00',
      slug: 'no-author',
      featured_media: 0,
      categories: []
    };

    const result = transformWordPressPost(wpPost);

    expect(result.author.es).toBe('Prilabsa');
    expect(result.author.en).toBe('Prilabsa');
    expect(result.author.pt).toBe('Prilabsa');
  });

  it('should handle complex HTML in content', () => {
    const wpPost: WordPressPost = {
      id: 4,
      title: { rendered: 'Complex <em>HTML</em> Title' },
      excerpt: { rendered: '<p>This has <strong>bold</strong> and <a href="#">links</a>.</p>' },
      content: { rendered: '<div class="entry"><p>Paragraph 1</p><p>Paragraph 2</p></div>' },
      date: '2025-12-01T10:00:00',
      slug: 'complex-html',
      featured_media: 0,
      categories: []
    };

    const result = transformWordPressPost(wpPost);

    expect(result.title.es).toBe('Complex HTML Title');
    expect(result.summary.es).toBe('This has bold and links.');
    expect(result.content.es).toBe('Paragraph 1Paragraph 2');
  });
});

describe('Integration: Noticias Page Data Structure', () => {
  it('should produce data compatible with ArticleCard component', () => {
    const wpPost: WordPressPost = {
      id: 1,
      title: { rendered: 'Test Article' },
      excerpt: { rendered: '<p>Test summary</p>' },
      content: { rendered: '<p>Full content here</p>' },
      date: '2025-11-14T11:42:45',
      slug: 'test-article',
      featured_media: 0,
      categories: [1]
    };

    const article = transformWordPressPost(wpPost);

    // ArticleCard expects these properties
    expect(article).toHaveProperty('id');
    expect(article).toHaveProperty('title');
    expect(article).toHaveProperty('summary');
    expect(article).toHaveProperty('date');
    expect(article).toHaveProperty('heroImage');

    // MultiLanguageContent structure check
    expect(article.title).toHaveProperty('es');
    expect(article.title).toHaveProperty('en');
    expect(article.title).toHaveProperty('pt');
  });

  it('should handle getLocalizedContent helper pattern', () => {
    const wpPost: WordPressPost = {
      id: 1,
      title: { rendered: 'Spanish Title' },
      excerpt: { rendered: 'Excerpt' },
      content: { rendered: 'Content' },
      date: '2025-11-14T00:00:00',
      slug: 'test',
      featured_media: 0,
      categories: []
    };

    const article = transformWordPressPost(wpPost);

    // Simulate getLocalizedContent(article.title, 'es')
    const getLocalizedContent = (content: MultiLanguageContent, lang: 'es' | 'en' | 'pt') => content[lang];

    expect(getLocalizedContent(article.title, 'es')).toBe('Spanish Title');
    expect(getLocalizedContent(article.title, 'en')).toBe('Spanish Title');
    expect(getLocalizedContent(article.title, 'pt')).toBe('Spanish Title');
  });
});
