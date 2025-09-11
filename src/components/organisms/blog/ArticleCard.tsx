import React from 'react';
import { Link } from 'react-router-dom';
import { BlogArticle, getLocalizedContent } from '../../../types/blog';
import { useLanguage } from '../../../contexts/LanguageContext';

interface ArticleCardProps {
  article: BlogArticle;
  basePath?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, basePath = '/blog' }) => {
  const { language, t } = useLanguage();
  const localizedTitle = getLocalizedContent(article.title, language);
  const localizedSummary = getLocalizedContent(article.summary, language);
  const localizedAuthor = getLocalizedContent(article.author, language);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out hover:shadow-xl group flex flex-col">
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-sm text-gray-500 mb-2">
          {article.date || 'Fecha no disponible'} - {t('blog.by')} {localizedAuthor || 'Autor desconocido'}
        </p>
        <h3 className="text-lg font-bold uppercase mb-2 text-blue-900 group-hover:text-orange-500 transition-colors duration-300 line-clamp-2">
          <Link to={`${basePath}/${article.id}`}>
            {localizedTitle || 'Título no disponible'}
          </Link>
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {localizedSummary || 'Resumen no disponible'}
        </p>
        <div className="mt-auto">
          <Link 
            to={`${basePath}/${article.id}`}
            className="inline-block px-6 py-2 rounded font-semibold uppercase tracking-wider text-sm text-white transition-colors duration-300 hover:opacity-90"
            style={{ backgroundColor: '#f6921d' }}
          >
            {t('blog.readMore')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
