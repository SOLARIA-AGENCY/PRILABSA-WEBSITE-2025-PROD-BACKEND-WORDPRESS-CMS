import React from 'react';
import Layout from '../components/Layout';
import StaticHero from '../components/StaticHero';

const Marcas = () => {
  return (
    <Layout>
      <StaticHero 
        title="Marcas"
        backgroundImage="/assets/iniciodev/prilabsa-hero.png"
      />
      <div className="container mx-auto py-20 px-4">
        <div className="max-w-4xl mx-auto text-gray-700 text-lg">
          <p className="mb-6">Página en construcción. Aquí encontrarás información sobre las marcas líderes que representamos y distribuimos.</p>
          <p>Descubre la calidad y la innovación detrás de cada uno de nuestros socios comerciales.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Marcas;
