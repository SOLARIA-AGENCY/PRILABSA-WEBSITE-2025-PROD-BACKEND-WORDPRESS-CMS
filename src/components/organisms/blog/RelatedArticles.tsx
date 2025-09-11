import React from 'react';
import { BlogArticle } from '../../../types/blog';
import ArticleCard from './ArticleCard';
import { useLanguage } from '../../../contexts/LanguageContext';

interface RelatedArticlesProps {
  currentArticleId: string;
  articles: BlogArticle[];
  basePath?: string;
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ currentArticleId, articles, basePath }) => {
  const { t } = useLanguage();
  const related = articles
    .filter(article => article.id !== currentArticleId)
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);

  if (related.length === 0) {
    return null;
  }

  const isNewsPath = basePath === '/noticias';
  const titleKey = isNewsPath ? 'news.relatedNews' : 'blog.relatedArticles';

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#3759C1' }}>
          {t(titleKey)}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {related.map(article => (
            <ArticleCard key={article.id} article={article} basePath={basePath} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedArticles;
