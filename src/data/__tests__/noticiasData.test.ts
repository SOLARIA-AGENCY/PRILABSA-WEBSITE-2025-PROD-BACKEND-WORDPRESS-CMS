import { describe, it, expect } from 'vitest';
import { noticiasData } from '../noticiasData';
import { NewsArticle } from '../../types/noticias';

describe('noticiasData', () => {
  it('should export an array of news articles', () => {
    expect(Array.isArray(noticiasData)).toBe(true);
    expect(noticiasData.length).toBeGreaterThan(0);
  });

  it('should contain valid NewsArticle objects', () => {
    noticiasData.forEach((article: NewsArticle) => {
      expect(article).toHaveProperty('id');
      expect(article).toHaveProperty('title');
      expect(article).toHaveProperty('summary');
      expect(article).toHaveProperty('date');
      expect(article).toHaveProperty('author');
      expect(article).toHaveProperty('heroImage');
      expect(article).toHaveProperty('tags');
      expect(article).toHaveProperty('content');
    });
  });

  it('should have multilingual titles for all articles', () => {
    noticiasData.forEach((article: NewsArticle) => {
      expect(article.title).toHaveProperty('es');
      expect(article.title).toHaveProperty('en');
      expect(article.title).toHaveProperty('pt');
      
      expect(typeof article.title.es).toBe('string');
      expect(typeof article.title.en).toBe('string');
      expect(typeof article.title.pt).toBe('string');
      
      expect(article.title.es.length).toBeGreaterThan(0);
      expect(article.title.en.length).toBeGreaterThan(0);
      expect(article.title.pt.length).toBeGreaterThan(0);
    });
  });

  it('should have multilingual summaries for all articles', () => {
    noticiasData.forEach((article: NewsArticle) => {
      expect(article.summary).toHaveProperty('es');
      expect(article.summary).toHaveProperty('en');
      expect(article.summary).toHaveProperty('pt');
      
      expect(typeof article.summary.es).toBe('string');
      expect(typeof article.summary.en).toBe('string');
      expect(typeof article.summary.pt).toBe('string');
      
      expect(article.summary.es.length).toBeGreaterThan(0);
      expect(article.summary.en.length).toBeGreaterThan(0);
      expect(article.summary.pt.length).toBeGreaterThan(0);
    });
  });

  it('should have valid date format for all articles', () => {
    noticiasData.forEach((article: NewsArticle) => {
      expect(typeof article.date).toBe('string');
      // Check if date is in YYYY-MM-DD format
      expect(article.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      
      // Check if date is valid
      const date = new Date(article.date);
      expect(date instanceof Date && !isNaN(date.getTime())).toBe(true);
    });
  });

  it('should have multilingual authors for all articles', () => {
    noticiasData.forEach((article: NewsArticle) => {
      expect(article.author).toHaveProperty('es');
      expect(article.author).toHaveProperty('en');
      expect(article.author).toHaveProperty('pt');
      
      expect(typeof article.author.es).toBe('string');
      expect(typeof article.author.en).toBe('string');
      expect(typeof article.author.pt).toBe('string');
      
      expect(article.author.es.length).toBeGreaterThan(0);
      expect(article.author.en.length).toBeGreaterThan(0);
      expect(article.author.pt.length).toBeGreaterThan(0);
    });
  });

  it('should have valid hero images for all articles', () => {
    noticiasData.forEach((article: NewsArticle) => {
      expect(typeof article.heroImage).toBe('string');
      expect(article.heroImage.length).toBeGreaterThan(0);
      
      // Check if it's a valid URL or path
      expect(
        article.heroImage.startsWith('http') || 
        article.heroImage.startsWith('/') ||
        article.heroImage.startsWith('./') ||
        article.heroImage.startsWith('../')
      ).toBe(true);
    });
  });

  it('should have multilingual tags for all articles', () => {
    noticiasData.forEach((article: NewsArticle) => {
      expect(article.tags).toHaveProperty('es');
      expect(article.tags).toHaveProperty('en');
      expect(article.tags).toHaveProperty('pt');
      
      expect(Array.isArray(article.tags.es)).toBe(true);
      expect(Array.isArray(article.tags.en)).toBe(true);
      expect(Array.isArray(article.tags.pt)).toBe(true);
      
      expect(article.tags.es.length).toBeGreaterThan(0);
      expect(article.tags.en.length).toBeGreaterThan(0);
      expect(article.tags.pt.length).toBeGreaterThan(0);
      
      // Check that all tags are strings
      article.tags.es.forEach(tag => expect(typeof tag).toBe('string'));
      article.tags.en.forEach(tag => expect(typeof tag).toBe('string'));
      article.tags.pt.forEach(tag => expect(typeof tag).toBe('string'));
    });
  });

  it('should have multilingual content for all articles', () => {
    noticiasData.forEach((article: NewsArticle) => {
      expect(article.content).toHaveProperty('es');
      expect(article.content).toHaveProperty('en');
      expect(article.content).toHaveProperty('pt');
      
      expect(typeof article.content.es).toBe('string');
      expect(typeof article.content.en).toBe('string');
      expect(typeof article.content.pt).toBe('string');
      
      expect(article.content.es.length).toBeGreaterThan(0);
      expect(article.content.en.length).toBeGreaterThan(0);
      expect(article.content.pt.length).toBeGreaterThan(0);
    });
  });

  it('should have unique IDs for all articles', () => {
    const ids = noticiasData.map(article => article.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have consistent content structure with HTML tags', () => {
    noticiasData.forEach((article: NewsArticle) => {
      // Check that content contains HTML elements
      expect(article.content.es).toMatch(/<[^>]+>/);
      expect(article.content.en).toMatch(/<[^>]+>/);
      expect(article.content.pt).toMatch(/<[^>]+>/);
      
      // Check for common HTML elements in content
      ['es', 'en', 'pt'].forEach(lang => {
        const content = article.content[lang as keyof typeof article.content];
        expect(content).toMatch(/<p[^>]*>/); // Should contain paragraph tags
      });
    });
  });

  it('should have proper date ordering (newest first)', () => {
    const dates = noticiasData.map(article => new Date(article.date));
    
    for (let i = 0; i < dates.length - 1; i++) {
      expect(dates[i].getTime()).toBeGreaterThanOrEqual(dates[i + 1].getTime());
    }
  });

  it('should contain expected article about Venezuela visit', () => {
    const venezuelaArticle = noticiasData.find(article => 
      article.title.es.includes('Venezuela')
    );
    
    expect(venezuelaArticle).toBeDefined();
    expect(venezuelaArticle?.tags.es).toContain('Venezuela');
    expect(venezuelaArticle?.content.es).toContain('Prilabsa');
  });

  it('should contain expected article about Heinz Grunauer interview', () => {
    const grunaurerArticle = noticiasData.find(article => 
      article.title.es.includes('Heinz H. Grunauer')
    );
    
    expect(grunaurerArticle).toBeDefined();
    expect(grunaurerArticle?.content.es).toContain('Heinz H. Grunauer Farah');
    expect(grunaurerArticle?.content.es).toContain('1992');
  });

  it('should have consistent tag count across languages', () => {
    noticiasData.forEach((article: NewsArticle) => {
      const esTagCount = article.tags.es.length;
      const enTagCount = article.tags.en.length;
      const ptTagCount = article.tags.pt.length;
      
      expect(esTagCount).toBe(enTagCount);
      expect(enTagCount).toBe(ptTagCount);
    });
  });

  it('should have proper styling classes in content', () => {
    noticiasData.forEach((article: NewsArticle) => {
      ['es', 'en', 'pt'].forEach(lang => {
        const content = article.content[lang as keyof typeof article.content];
        
        // Check for Tailwind CSS classes
        expect(content).toMatch(/class="[^"]*mb-[0-9]+[^"]*"/);
        
        // Check for color styling
        if (content.includes('<h3')) {
          expect(content).toMatch(/style="color: #3759C1;"/); 
        }
      });
    });
  });

  it('should have proper article structure with headings', () => {
    noticiasData.forEach((article: NewsArticle) => {
      ['es', 'en', 'pt'].forEach(lang => {
        const content = article.content[lang as keyof typeof article.content];
        
        // Should contain paragraphs
        expect(content).toMatch(/<p[^>]*>/); 
        
        // Should contain strong tags for emphasis
        expect(content).toMatch(/<strong>/); 
      });
    });
  });
});