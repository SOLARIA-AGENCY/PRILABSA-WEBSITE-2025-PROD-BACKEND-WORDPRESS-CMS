import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const { t } = useLanguage();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src="/images/logos/prilabsa-logo.png" 
              alt="PRILABSA" 
              className="h-10 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <a 
              href="#inicio" 
              className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              INICIO
            </a>
            <a 
              href="#quienes-somos" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              QUIENES SOMOS
            </a>
            <a 
              href="#oficinas" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              OFICINAS
            </a>
            <a 
              href="#productos" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              PRODUCTOS
            </a>
            <div className="relative group">
              <a 
                href="#contactanos" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {t('contact.hero.title').toUpperCase()}
              </a>
              {/* Dropdown */}
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <a 
                  href="#trabaja-con-nosotros" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {t('careers.hero.title').toUpperCase()}
                </a>
              </div>
            </div>
            
            {/* Logout Button - Solo visible cuando está autenticado */}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="ml-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Cerrar Sesión</span>
              </button>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <a href="#inicio" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600">
                INICIO
              </a>
              <a href="#quienes-somos" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">
                QUIENES SOMOS
              </a>
              <a href="#oficinas" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">
                OFICINAS
              </a>
              <a href="#productos" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">
                PRODUCTOS
              </a>
              <a href="#contactanos" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">
                {t('contact.hero.title').toUpperCase()}
              </a>
              <a href="#trabaja-con-nosotros" className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-blue-600 ml-4">
                {t('careers.hero.title').toUpperCase()}
              </a>
              
              {/* Mobile Logout Button */}
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 mt-2 border-t border-gray-200 pt-4"
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1" />
                    </svg>
                    <span>Cerrar Sesión</span>
                  </div>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};