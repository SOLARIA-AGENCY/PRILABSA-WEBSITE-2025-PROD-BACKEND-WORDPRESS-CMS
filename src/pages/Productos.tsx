import React, { useState, useMemo } from 'react';
import Layout from '../components/Layout';
import HeroVideo from '../components/HeroVideo';
import CategoryGrid from '../components/organisms/products/CategoryGrid';
import Breadcrumbs from '../components/Breadcrumbs';
import { categoriasProductos } from '../data/categoriasProductos';
import SearchBar from '../components/molecules/SearchBar';
import { useLanguage } from '../contexts/LanguageContext';
import productosHeroVideo from '/assets/videos/productos-hero.mp4';

const Productos = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = useMemo(() => {
    if (!searchQuery) {
      return categoriasProductos;
    }
    const query = searchQuery.toLowerCase();
    return categoriasProductos.filter(category => 
      category.titulo.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <Layout isHeroPage={true}>
      <HeroVideo videoSrc={productosHeroVideo}>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight text-center text-white">
          {t('products.title')}
        </h1>
      </HeroVideo>
      <main className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Breadcrumbs paths={[{ name: t('breadcrumbs.home'), path: '/' }, { name: t('products.title'), path: '/productos' }]} />
          <div className="my-8 max-w-2xl mx-auto">
            <SearchBar onSearch={setSearchQuery} placeholder={t('products.search.placeholder')} />
          </div>
          <CategoryGrid categories={filteredCategories} />
        </div>
      </main>
    </Layout>
  );
};

export default Productos;
