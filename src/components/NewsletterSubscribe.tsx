import React, { useState } from 'react';
import ConsentCheckbox from './molecules/ConsentCheckbox';
import { useLanguage } from '../contexts/LanguageContext';

const NewsletterSubscribe = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    consent: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ email: '', consent: false });
    setIsSubmitted(false);

    if (!email) {
      setErrors(prev => ({ ...prev, email: t('newsletter.errors.emailRequired') }));
      return;
    }
    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors(prev => ({ ...prev, email: t('newsletter.errors.emailInvalid') }));
      return;
    }

    if (!consent) {
      setErrors(prev => ({ ...prev, consent: true }));
      return;
    }

    const consentData = {
      timestamp: new Date().toISOString(),
      formId: 'newsletter-form',
      consentText: 'He leído y acepto la Política de Privacidad.',
    };

    const payload = { email, consentData };

    console.log('--- FORMULARIO DE NEWSLETTER PARA ENVIAR (SIMULACIÓN) ---');
    console.log(payload);

    setIsSubmitted(true);
    setEmail('');
    setConsent(false);
  };

  return (
    <div className="bg-blue-50 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-2" style={{ color: '#3759C1' }}>{t('newsletter.title')}</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">{t('newsletter.description')}</p>
        <form className="max-w-xl mx-auto" noValidate onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder={t('newsletter.placeholder')} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button 
              type="submit" 
              className="text-white font-bold py-3 px-8 rounded-md uppercase transition-colors duration-300 whitespace-nowrap"
              style={{ backgroundColor: '#f6921d' }}
            >
              {t('newsletter.button')}
            </button>
          </div>
          <div className="mt-4 flex justify-center">
            <ConsentCheckbox 
              isChecked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              hasError={errors.consent}
              text={t('newsletter.privacy')}
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email}</p>}
          {isSubmitted && <p className="text-green-600 text-sm mt-4">{t('newsletter.success')}</p>}
        </form>
      </div>
    </div>
  );
};

export default NewsletterSubscribe;
