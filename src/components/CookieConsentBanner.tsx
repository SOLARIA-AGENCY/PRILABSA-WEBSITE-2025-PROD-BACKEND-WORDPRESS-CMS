import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'prilabsa_cookie_consent';

const CookieConsentBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 bg-opacity-90 backdrop-blur-sm text-white p-5 z-50 shadow-lg animate-fade-in-up">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Cookie className="w-8 h-8 text-blue-400 flex-shrink-0" />
          <p className="text-sm">
            Utilizamos cookies propias y de terceros para mejorar su experiencia y nuestros servicios. Al hacer clic en "Aceptar", usted acepta nuestro uso de cookies.
            <Link to="/politica-de-cookies" className="font-semibold underline hover:text-blue-300 ml-1">
              Más información
            </Link>.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={handleAccept}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors text-sm"
          >
            Aceptar
          </button>
          <button
            onClick={handleDecline}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
          >
            Rechazar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;