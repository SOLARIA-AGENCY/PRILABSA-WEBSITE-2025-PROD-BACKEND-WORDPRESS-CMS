import React from 'react';
import { Header } from '../components/organisms/Header';
import { HeroSection } from '../components/organisms/HeroSection';
import { AboutSection } from '../components/organisms/AboutSection';
import { ProductCategories } from '../components/organisms/ProductCategories';
import { AgenciesSection } from '../components/organisms/AgenciesSection';
import { BrandsSection } from '../components/organisms/BrandsSection';
import { Footer } from '../components/organisms/Footer';

export const PrilabsaWebsite: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header con navegación */}
      <Header />
      
      {/* Hero Section con video background */}
      <HeroSection />
      
      {/* Sección SOMOS */}
      <AboutSection />
      
      {/* Grid de categorías de productos */}
      <ProductCategories />
      
      {/* Sección NUESTRAS AGENCIAS */}
      <AgenciesSection />
      
      {/* Grid de marcas asociadas */}
      <BrandsSection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PrilabsaWebsite; 