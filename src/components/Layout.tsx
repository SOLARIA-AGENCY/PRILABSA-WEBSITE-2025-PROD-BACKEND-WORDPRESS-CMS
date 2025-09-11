import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header'; 
import Footer from './Footer'; 
import NuestrasMarcas from './NuestrasMarcas';
import WhatsAppButton from './WhatsAppButton';
import CookieConsentBanner from './CookieConsentBanner';
import SolariaBadge from './SolariaBadge';

interface LayoutProps {
  children: React.ReactNode;
  isHeroPage?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, isHeroPage = false }) => {
  const location = useLocation();
  const showMarcas = !location.pathname.startsWith('/productos');
  
  console.log('🏗️ Layout - Renderizando con SolariaBadge');

  if (isHeroPage) {
    return (
      <div className="font-montserrat">
        <Header />
        {children}
        {showMarcas && <NuestrasMarcas />}
        <Footer />
        <WhatsAppButton />
        <CookieConsentBanner />
        <SolariaBadge />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen font-montserrat">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      {showMarcas && <NuestrasMarcas />}
      <Footer />
      <WhatsAppButton />
      <CookieConsentBanner />
      <SolariaBadge />
    </div>
  );
}

export default Layout;
