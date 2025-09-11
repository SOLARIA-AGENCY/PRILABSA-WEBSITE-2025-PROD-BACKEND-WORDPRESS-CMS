import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart } from 'lucide-react';
import logoAzul from '/images/logos/logo-prilabsa-azul.png';
import logoBlanco from '/images/logos/logo-prilabsa-blanco.png';
import { getAllProducts } from '../data/products';
import { type OptimizedProduct } from '../data/products/types';
import { useLanguage } from '../contexts/LanguageContext';
import { FEATURES } from '../config/features';
import LanguageSelector from './LanguageSelector';

const Header = () => {
  const { t } = useLanguage();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [contactMenuOpen, setContactMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<OptimizedProduct[]>([]);
  const [itemCount] = useState(0); // Placeholder for cart functionality


  useEffect(() => {
    // Debounce search for better performance
    const timer = setTimeout(() => {
      if (searchQuery.trim().length > 1) {
        const productos = getAllProducts();
        const results = productos.filter((p: OptimizedProduct) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header 
      role="banner"
      className={`fixed top-0 left-0 right-0 z-30 p-2 transition-all duration-300 ${headerVisible ? 'translate-y-0' : '-translate-y-full'}`}
      style={{
        backgroundColor: lastScrollY > 50 ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
        backdropFilter: lastScrollY > 50 ? 'blur(10px)' : 'none',
      }}
    >
      <div className="container mx-auto flex justify-between items-center">
                <div className="flex-shrink-0 ml-6 md:ml-10 lg:ml-16">
          <Link to="/">
            <img src={lastScrollY > 50 ? logoAzul : logoBlanco} alt="Prilabsa Logo" style={{ height: '96px' }} />
          </Link>
        </div>

        {/* Desktop Menu */}
                <nav role="navigation" className={`hidden md:flex items-center space-x-4 font-bold ${lastScrollY > 50 ? 'text-[#3759C1]' : 'text-white'}`}>
          <Link to="/" className="hover:text-orange-500">{t('header.navigation.home')}</Link>
          <Link to="/quienes-somos" className="hover:text-orange-500">{t('header.navigation.about')}</Link>
          <Link to="/oficinas" className="hover:text-orange-500">{t('header.navigation.offices')}</Link>
          <Link to="/productos" className="hover:text-orange-500">{t('header.navigation.products')}</Link>
          <div 
            className="relative"
            onMouseEnter={() => setContactMenuOpen(true)}
            onMouseLeave={() => setContactMenuOpen(false)}
          >
            <Link to="/contactanos" className="cursor-pointer hover:text-orange-500 py-2">{t('header.navigation.contact')}</Link>
            {contactMenuOpen && (
              <div className="absolute left-0 top-full pt-2">
                <Link to="/trabaja-con-nosotros" className={`block whitespace-nowrap py-1 text-sm uppercase hover:text-orange-500 ${lastScrollY > 50 ? 'text-[#3759C1]' : 'text-white'}`}>{t('header.navigation.careers')}</Link>
              </div>
            )}
          </div>
          {/* Cotización - Condicionado por FEATURES.COTIZADOR */}
          {FEATURES.COTIZADOR && (
            <Link to="/cotizacion" className={`relative p-2 rounded-full hover:bg-gray-500/20 ${lastScrollY > 50 ? 'text-[#3759C1]' : 'text-white'}`} title="Cotización">
              <ShoppingCart size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          )}
          {/* Language Selector */}
          <LanguageSelector className="z-20" showText={false} />

          {/* Search Bar */}
          <div className="relative">
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className={`p-2 rounded-full hover:bg-gray-500/20 ${lastScrollY > 50 ? 'text-[#3759C1]' : 'text-white'}`}>
              <Search size={20} />
            </button>
            {isSearchOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl p-4">
                <input
                  type="text"
                  placeholder={t('header.navigation.search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                {searchResults.length > 0 && (
                  <ul className="mt-2 max-h-80 overflow-y-auto">
                    {searchResults.map(producto => (
                      <li key={producto.id}>
                        <Link 
                          to={`/productos/${producto.category}/${producto.slug}`} 
                          className="flex items-center p-2 hover:bg-gray-100 rounded-md"
                          onClick={closeSearch}
                        >
                          <img src={producto.assets.image?.path || '/assets/images/placeholder-product.jpg'} alt={producto.name} className="w-12 h-12 object-cover mr-3 rounded-md"/>
                          <div>
                            <p className="font-semibold text-sm text-gray-900">{producto.name}</p>
                            <p className="text-xs text-gray-500 capitalize">{producto.category}</p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                {searchQuery.length > 1 && searchResults.length === 0 && (
                  <p className="text-center text-sm text-gray-500 mt-4">{t('products.search.noResults')}</p>
                )}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`focus:outline-none ${lastScrollY > 50 ? 'text-gray-800' : 'text-white'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white text-gray-800 p-4">
                    <nav className="flex flex-col space-y-2 font-bold">
            <Link to="/" className="block py-2 px-4 text-sm hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>{t('header.navigation.home')}</Link>
            <Link to="/quienes-somos" className="block py-2 px-4 text-sm hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>{t('header.navigation.about')}</Link>
            <Link to="/oficinas" className="block py-2 px-4 text-sm hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>{t('header.navigation.offices')}</Link>
            <Link to="/productos" className="block py-2 px-4 text-sm hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>{t('header.navigation.products')}</Link>
            <Link to="/contactanos" className="block py-2 px-4 text-sm hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>{t('header.navigation.contact')}</Link>
            <Link to="/trabaja-con-nosotros" className="block py-2 px-4 text-sm hover:bg-gray-100 pl-4" onClick={() => setMobileMenuOpen(false)}>- {t('header.navigation.careers')}</Link>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <LanguageSelector showText={true} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
