import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { useNoticias } from '../services/wordpressApi';
import ArticleCard from '../components/organisms/blog/ArticleCard';
import StaticHero from '../components/StaticHero';
import Breadcrumbs from '../components/Breadcrumbs';

import SearchBar from '../components/molecules/SearchBar';
import ArchiveMenu from '../components/organisms/blog/ArchiveMenu';
import { useLanguage } from '../contexts/LanguageContext';
import { getLocalizedContent, getLocalizedTags } from '../types/blog';

const Noticias = () => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams] = useSearchParams();
  const archive = searchParams.get('archive');

  // ⭐ Hook WordPress para obtener noticias dinámicamente
  const { articles: allArticles, isLoading, error } = useNoticias();

  const filteredArticles = useMemo(() => {
    let articles = allArticles;

    if (archive) {
      articles = articles.filter(article => article.date.startsWith(archive));
    }

    if (!searchQuery) {
      return articles;
    }
    
    return articles.filter(article => {
      const query = searchQuery.toLowerCase();
      const localizedTitle = getLocalizedContent(article.title, language);
      const localizedSummary = getLocalizedContent(article.summary, language);
      const localizedTags = getLocalizedTags(article.tags, language);
      
      return (
        localizedTitle.toLowerCase().includes(query) ||
        localizedSummary.toLowerCase().includes(query) ||
        localizedTags.some(tag => tag.toLowerCase().includes(query))
      );
    });
  }, [allArticles, searchQuery, archive, language]);

  // ⭐ Estados loading/error
  if (isLoading) {
    return (
      <Layout>
        <title>Noticias - Prilabsa</title>
        <StaticHero
          title={t('news.pageTitle')}
          subtitle={t('news.subtitle')}
          backgroundImage="/assets/images/news/1744147817945.jpg"
        />
        <Breadcrumbs
          paths={[
            { name: t('breadcrumbs.home'), path: '/' },
            { name: t('breadcrumbs.news'), path: '/noticias' },
          ]}
        />
        <div className="container mx-auto py-16 px-4 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Cargando noticias...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <title>Noticias - Prilabsa</title>
        <StaticHero
          title={t('news.pageTitle')}
          subtitle={t('news.subtitle')}
          backgroundImage="/assets/images/news/1744147817945.jpg"
        />
        <Breadcrumbs
          paths={[
            { name: t('breadcrumbs.home'), path: '/' },
            { name: t('breadcrumbs.news'), path: '/noticias' },
          ]}
        />
        <div className="container mx-auto py-16 px-4 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-red-600 mb-2">Error al cargar noticias</h2>
            <p className="text-red-700">{error.message}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <title>Noticias - Prilabsa</title>
      <meta name="description" content="Manténgase informado con las últimas noticias, comunicados y eventos de Prilabsa. Descubra nuestras innovaciones y participación en la industria acuícola." />
      <meta name="keywords" content="noticias, prilabsa, comunicados, eventos, acuicultura, industria acuícola" />
      <StaticHero
        title={t('news.pageTitle')}
        subtitle={t('news.subtitle')}
        backgroundImage="/assets/images/news/1744147817945.jpg"
      />
      <Breadcrumbs
        paths={[
          { name: t('breadcrumbs.home'), path: '/' },
          { name: t('breadcrumbs.news'), path: '/noticias' },
        ]}
      />
      <div className="bg-gray-50">
        <div className="container mx-auto py-16 px-4">
          <SearchBar onSearch={setSearchQuery} placeholder={t('news.search.placeholder')} />
          <div className="flex flex-col md:flex-row mt-8">
            <div className="w-full md:flex-grow">
              {filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                  {filteredArticles.map(article => (
                    <ArticleCard key={article.id} article={article} basePath="/noticias" />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-10">{t('news.noNews')}</p>
              )}
            </div>
            <ArchiveMenu articles={allArticles} basePath="/noticias" />
          </div>
        </div>
      </div>

    </Layout>
  );
};

export default Noticias;
