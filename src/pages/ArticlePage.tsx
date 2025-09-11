import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { blogData } from '../data/blogData';
import { getLocalizedContent, getLocalizedTags } from '../types/blog';
import { useLanguage } from '../contexts/LanguageContext';
import Breadcrumbs from '../components/Breadcrumbs';

import RelatedArticles from '../components/organisms/blog/RelatedArticles';

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const article = blogData.find(p => p.id === id);

  if (!article) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {t('blog.articleNotFound')}
          </h1>
          <Link 
            to="/blog" 
            className="text-prilabsa-blue-primary hover:text-prilabsa-blue-secondary transition-colors"
          >
            {t('blog.backToBlog')}
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
          { name: 'Blog', path: '/blog' },
          { name: localizedContent, path: `/blog/${article.id}` }
        ]}
      />

      <div className="container mx-auto py-12 px-4">
        <article className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <header className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wider mb-4" style={{ color: '#3759C1' }}>{localizedContent}</h1>
            <p className="text-gray-500 text-sm">
               Publicado el {article.date} por <span className="font-semibold">{getLocalizedContent(article.author, language)}</span>
             </p>
            <div className="mt-4 flex flex-wrap gap-2">
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

      <RelatedArticles currentArticleId={article.id} articles={blogData} basePath="/blog" />


    </Layout>
  );
};

export default ArticlePage;
