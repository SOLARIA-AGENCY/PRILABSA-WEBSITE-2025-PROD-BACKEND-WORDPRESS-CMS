import React from 'react';

interface StaticHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
}

const StaticHero: React.FC<StaticHeroProps> = ({ title, subtitle, backgroundImage }) => {
  const heroStyle = {
    backgroundImage: `url(${backgroundImage})`,
  };

  return (
    <section 
      className="relative h-120 bg-cover bg-bottom flex items-center justify-center text-white"
      style={heroStyle}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-blue-900 opacity-60 z-10"></div>
      <div className="relative z-20 text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wider">{title}</h1>
        {subtitle && <p className="mt-4 text-lg md:text-xl">{subtitle}</p>}
      </div>
    </section>
  );
};

export default StaticHero;
