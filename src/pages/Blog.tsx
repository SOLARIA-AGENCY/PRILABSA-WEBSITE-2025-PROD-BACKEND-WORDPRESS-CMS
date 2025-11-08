import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import StaticHero from '../components/StaticHero';
import Breadcrumbs from '../components/Breadcrumbs';
import ArticleCard from '../components/organisms/blog/ArticleCard';

import { useBlog } from '../services/wordpressApi';
import SearchBar from '../components/molecules/SearchBar';
import ArchiveMenu from '../components/organisms/blog/ArchiveMenu';
import { useLanguage } from '../contexts/LanguageContext';
import { getLocalizedContent, getLocalizedTags } from '../types/blog';

const Blog = () => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams] = useSearchParams();
  const archive = searchParams.get('archive');

  // ⭐ Hook WordPress para obtener artículos dinámicamente
  const { articles: allArticles, isLoading, error } = useBlog();

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
        <title>Blog - Prilabsa</title>
        <StaticHero
          title={t('blog.pageTitle')}
          subtitle={t('blog.subtitle')}
          backgroundImage="/assets/iniciodev/blue-texture-background.jpg"
        />
        <Breadcrumbs
          paths={[
            { name: t('breadcrumbs.home'), path: '/' },
            { name: t('breadcrumbs.blog'), path: '/blog' },
          ]}
        />
        <div className="container mx-auto py-16 px-4 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Cargando artículos...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <title>Blog - Prilabsa</title>
        <StaticHero
          title={t('blog.pageTitle')}
          subtitle={t('blog.subtitle')}
          backgroundImage="/assets/iniciodev/blue-texture-background.jpg"
        />
        <Breadcrumbs
          paths={[
            { name: t('breadcrumbs.home'), path: '/' },
            { name: t('breadcrumbs.blog'), path: '/blog' },
          ]}
        />
        <div className="container mx-auto py-16 px-4 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-red-600 mb-2">Error al cargar artículos</h2>
            <p className="text-red-700">{error.message}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <title>Blog - Prilabsa</title>
      <meta name="description" content="Artículos, noticias y análisis sobre la industria acuícola. Mantente al día con las últimas tendencias y consejos de expertos en Prilabsa." />
      <meta name="keywords" content="blog, acuicultura, prilabsa, nutrición acuícola, sanidad acuícola, tecnología" />
      <StaticHero
        title={t('blog.pageTitle')}
        subtitle={t('blog.subtitle')}
        backgroundImage="https://images.pexels.com/photos/7562313/pexels-photo-7562313.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
      <Breadcrumbs
        paths={[
          { name: t('breadcrumbs.home'), path: '/' },
          { name: t('breadcrumbs.blog'), path: '/blog' },
        ]}
      />
      <div className="bg-gray-50">
        <div className="container mx-auto py-16 px-4">
          <SearchBar onSearch={setSearchQuery} placeholder={t('blog.search.placeholder')} />
          <div className="flex flex-col md:flex-row mt-8">
            <div className="w-full md:flex-grow">
              {filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                  {filteredArticles.map(article => (
                    <ArticleCard key={article.id} article={article} basePath="/blog" />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-10">{t('blog.noArticles')}</p>
              )}
            </div>
            <ArchiveMenu articles={allArticles} basePath="/blog" />
          </div>
        </div>
      </div>

    </Layout>
  );
};

export default Blog;
