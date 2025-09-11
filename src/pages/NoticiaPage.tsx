import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { noticiasData } from '../data/noticiasData';
import { getLocalizedContent, getLocalizedTags } from '../types/blog';
import { useLanguage } from '../contexts/LanguageContext';
import Breadcrumbs from '../components/Breadcrumbs';

import RelatedArticles from '../components/organisms/blog/RelatedArticles'; // We can reuse this for related news

const NoticiaPage = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const article = noticiasData.find(p => p.id === id);

  if (!article) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {t('news.newsNotFound')}
          </h1>
          <Link 
            to="/noticias" 
            className="text-prilabsa-blue-primary hover:text-prilabsa-blue-secondary transition-colors"
          >
            {t('news.backToNews')}
          </Link>
        </div>
      </Layout>
    );
  }

  const localizedContent = getLocalizedContent(article.title, language);
  const localizedTags = getLocalizedTags(article.tags, language);

  return (
    <Layout>
      <title>{localizedContent} | Prilabsa</title>
      <meta name="description" content={getLocalizedContent(article.summary, language)} />
      <meta name="keywords" content={localizedTags.join(', ')} />

      <div className="relative w-full h-64 md:h-96 overflow-hidden">
        <img src={article.heroImage} alt={`Imagen de ${localizedContent}`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-blue-900 opacity-50"></div>
      </div>

      <Breadcrumbs 
        paths={[
          { name: 'Noticias', path: '/noticias' },
          { name: localizedContent, path: `/noticias/${article.id}` } 
        ]}
      />

      <div className="container mx-auto py-12 px-4">
        <article className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <header className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wider mb-4" style={{ color: '#3759C1' }}>{localizedContent}</h1>
            <p className="text-gray-500 text-sm">
              Publicado el {article.date} por <span className="font-semibold">{getLocalizedContent(article.author, language)}</span>
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {localizedTags.map(tag => (
                <span key={tag} className="bg-white text-blue-800 border border-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div 
            className="prose lg:prose-xl max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: getLocalizedContent(article.content, language) }}
          />

        </article>
      </div>

      {/* We need to adapt RelatedArticles to show other news or disable it if not applicable */}
      {/* For now, let's assume it can work with a different data source or logic */}
      <RelatedArticles currentArticleId={article.id} articles={noticiasData} basePath="/noticias" />


    </Layout>
  );
};

export default NoticiaPage;
