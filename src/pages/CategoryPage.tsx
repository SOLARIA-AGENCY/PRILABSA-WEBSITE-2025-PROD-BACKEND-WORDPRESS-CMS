import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import StaticHero from '../components/StaticHero';
import { categoriasProductos } from '../data/categoriasProductos';
import ProductList from '../components/organisms/products/ProductList'; 
import Breadcrumbs from '../components/Breadcrumbs';
import SearchBar from '../components/molecules/SearchBar';
import { useLanguage } from '../contexts/LanguageContext';

const CategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const { t } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');

  const category = categoriasProductos.find(cat => cat.id === categorySlug);

  if (!category) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold text-red-600">{t('products.messages.categoryNotFound')}</h1>
          <p className="text-gray-600 mt-4">{t('products.messages.categoryNotFound')}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <StaticHero 
        title={t(`products.categories.${category.id}`)}
        backgroundImage="/assets/iniciodev/prilabsa-hero.png"
      />
      <main className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Breadcrumbs />
          <SearchBar onSearch={setSearchQuery} />
          <ProductList categorySlug={categorySlug || ''} searchQuery={searchQuery} />
        </div>
      </main>
    </Layout>
  );
};

export default CategoryPage;
