import React from 'react';
import Layout from '../components/Layout';
import StaticHero from '../components/StaticHero';

const NuestrosSocios = () => {
  return (
    <Layout>
      <StaticHero 
        title="Nuestros Socios"
        backgroundImage="/assets/iniciodev/prilabsa-hero.png"
      />
      <div className="container mx-auto py-20 px-4">
        <div className="max-w-4xl mx-auto text-gray-700 text-lg">
          <p className="mb-6">Página en construcción. Conoce a los socios estratégicos que, junto a nosotros, impulsan la innovación en la industria acuícola.</p>
          <p>Nuestra red de colaboración es fundamental para ofrecerte productos y servicios de la más alta calidad.</p>
        </div>
      </div>
    </Layout>
  );
};

export default NuestrosSocios;
