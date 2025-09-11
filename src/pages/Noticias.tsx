import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { noticiasData } from '../data/noticiasData';
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

  const filteredArticles = useMemo(() => {
    let articles = noticiasData;

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
  }, [searchQuery, archive, language]);

  return (
    <Layout>
      <title>Noticias - Prilabsa</title>
      <meta name="description" content="Manténgase informado con las últimas noticias, comunicados y eventos de Prilabsa. Descubra nuestras innovaciones y participación en la industria acuícola." />
      <meta name="keywords" content="noticias, prilabsa, comunicados, eventos, acuicultura, industria acuícola" />
      <StaticHero
        title={t('news.pageTitle')}
        subtitle={t('news.subtitle')}
        backgroundImage="/assets/iniciodev/blue-texture-background.jpg"
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
            <ArchiveMenu articles={noticiasData} basePath="/noticias" />
          </div>
        </div>
      </div>

    </Layout>
  );
};

export default Noticias;
