import React from 'react';
import { Link } from 'react-router-dom';
import logoBlanco from '/images/logos/logo-prilabsa-blanco.png';
import iconFacebook from '/assets/iniciodev/icon_facebook.svg';
import iconInstagram from '/assets/iniciodev/icon_instagram.svg';
import iconLinkedin from '/assets/iniciodev/icon_linkedin.svg';
import iconYoutube from '/assets/iniciodev/icon_youtube.svg';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  
  return (
        <footer className="text-white p-8" style={{ backgroundColor: '#3759C1' }}>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left items-start">
        <div className="flex justify-center md:justify-start">
          <img src={logoBlanco} alt="Prilabsa Footer Logo" style={{ height: '115px' }} />
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">{t('footer.contact.title')}</h3>
          <div className="text-gray-100">
            <p className="text-sm mb-2">{t('footer.contact.email')}:</p>
            <a href="mailto:info@prilabsa.com.ec" className="hover:text-yellow-400 text-sm">info@prilabsa.com.ec</a>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">{t('footer.location.title')}</h3>
          <p className="text-gray-100 text-sm">{t('footer.location.address')}: Av. Carlos Julio Arosemena, km 2 1/2, C.C. Albán Borja, local #55.<br/>Guayaquil – Ecuador</p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">{t('footer.social.title')}</h3>
          <div className="flex flex-col items-center md:items-start space-y-2 mb-4">
             {/* Blog y Noticias permanecen en productos.prilabsa.com (interno) */}
             <Link to="/blog" className="hover:text-yellow-400 transition-colors text-sm">{t('header.navigation.blog')}</Link>
             <Link to="/noticias" className="hover:text-yellow-400 transition-colors text-sm">{t('header.navigation.news')}</Link>
             {/* <a href="/inventario-productos" className="hover:text-yellow-400 transition-colors text-sm flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                INVENTARIO
              </a> */}
          </div>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#"><img src={iconFacebook} alt="Facebook" className="h-8"/></a>
            <a href="#"><img src={iconInstagram} alt="Instagram" className="h-8"/></a>
            <a href="#"><img src={iconLinkedin} alt="LinkedIn" className="h-8"/></a>
            <a href="#"><img src={iconYoutube} alt="YouTube" className="h-8"/></a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-4 border-t border-blue-300">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-200">
          <span>{t('footer.copyright.text')}</span>
          {/* Rutas legales permanecen en productos.prilabsa.com (interno) - GDPR requerido */}
          <Link to="/politica-de-privacidad" className="hover:text-yellow-400 transition-colors">{t('footer.legal.privacy')}</Link>
          <Link to="/terminos-y-condiciones" className="hover:text-yellow-400 transition-colors">{t('footer.legal.terms')}</Link>
          <Link to="/aviso-legal" className="hover:text-yellow-400 transition-colors">{t('footer.legal.legalNotice')}</Link>
          <Link to="/politica-de-cookies" className="hover:text-yellow-400 transition-colors">{t('footer.legal.cookiePolicy')}</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
