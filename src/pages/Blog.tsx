import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import StaticHero from '../components/StaticHero';
import Breadcrumbs from '../components/Breadcrumbs';
import ArticleCard from '../components/organisms/blog/ArticleCard';

import { blogData } from '../data/blogData';
import SearchBar from '../components/molecules/SearchBar';
import ArchiveMenu from '../components/organisms/blog/ArchiveMenu';
import { useLanguage } from '../contexts/LanguageContext';
import { getLocalizedContent, getLocalizedTags } from '../types/blog';

const Blog = () => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams] = useSearchParams();
  const archive = searchParams.get('archive');

  const filteredArticles = useMemo(() => {
    let articles = blogData;

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
      <title>Blog - Prilabsa</title>
      <meta name="description" content="Artículos, noticias y análisis sobre la industria acuícola. Mantente al día con las últimas tendencias y consejos de expertos en Prilabsa." />
      <meta name="keywords" content="blog, acuicultura, prilabsa, nutrición acuícola, sanidad acuícola, tecnología" />
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
            <ArchiveMenu articles={blogData} basePath="/blog" />
          </div>
        </div>
      </div>

    </Layout>
  );
};

export default Blog;
