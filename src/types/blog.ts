// Tipo para contenido multiidioma
export interface MultiLanguageContent {
  es: string;
  en: string;
  pt: string;
}

interface MultiLanguageTags {
  es: string[];
  en: string[];
  pt: string[];
}

export interface BlogArticle {
  id: string;
  title: MultiLanguageContent;
  summary: MultiLanguageContent;
  date: string;
  author: MultiLanguageContent;
  heroImage: string;
  tags: MultiLanguageTags;
  content: MultiLanguageContent;
}

// Helper functions to get localized content
export const getLocalizedContent = (content: MultiLanguageContent, language: 'es' | 'en' | 'pt'): string => {
  return content[language] || content.es;
};

export const getLocalizedTags = (tags: MultiLanguageTags, language: 'es' | 'en' | 'pt'): string[] => {
  return tags[language] || tags.es;
};
