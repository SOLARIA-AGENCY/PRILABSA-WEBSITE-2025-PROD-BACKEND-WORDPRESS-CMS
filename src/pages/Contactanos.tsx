import React, { useState } from 'react';
import Layout from '../components/Layout';
import StaticHero from '../components/StaticHero';
import NewsletterSubscribe from '../components/NewsletterSubscribe';
import ConsentCheckbox from '../components/molecules/ConsentCheckbox';

import { useLanguage } from '../contexts/LanguageContext';
import { sendContactForm, sendViaMailto, type ContactFormData } from '../services/emailService';

const Contactanos = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({
    general: '',
    consent: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ general: '', consent: false });
    setIsSubmitted(false);
    setIsLoading(true);

    if (!formData.name || !formData.email || !formData.message) {
      setErrors(prev => ({ ...prev, general: 'Por favor, complete los campos obligatorios: Nombre, Email y Mensaje.' }));
      setIsLoading(false);
      return;
    }

    if (!consent) {
      setErrors(prev => ({ ...prev, consent: true }));
      setIsLoading(false);
      return;
    }

    const consentData = {
      timestamp: new Date().toISOString(),
      formId: 'contact-form',
      consentText: 'He leído y acepto la Política de Privacidad.',
    };

    const payload: ContactFormData = { ...formData, consent, consentData };

    try {
      // Intentar envío con EmailJS primero
      const emailSent = await sendContactForm(payload);
      
      if (emailSent) {
        console.log('Email enviado exitosamente via EmailJS');
        setIsSubmitted(true);
        setFormData({ name: '', company: '', email: '', phone: '', message: '' });
        setConsent(false);
      } else {
        // Fallback a mailto si EmailJS falla
        console.log('EmailJS falló, usando mailto como respaldo');
        sendViaMailto(payload);
        setIsSubmitted(true);
        setFormData({ name: '', company: '', email: '', phone: '', message: '' });
        setConsent(false);
      }
    } catch (error) {
      console.error('Error en el envío:', error);
      // Usar mailto como último recurso
      sendViaMailto(payload);
      setIsSubmitted(true);
      setFormData({ name: '', company: '', email: '', phone: '', message: '' });
      setConsent(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <StaticHero 
        title={t('contact.hero.title')}
        backgroundImage="/assets/iniciodev/prilabsa-hero.png"
      />
      <div className="container mx-auto py-16 px-4">
        {/* Bloque de emails de áreas estratégicas */}
        <div className="mb-12 flex justify-center">
          <div className="w-full max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-2" style={{ color: '#3759C1' }}>{t('contact.emails.title')}</h2>
            <p className="text-center text-gray-600 mb-8">{t('contact.emails.description')}</p>
            <div className="grid grid-cols-1 gap-8">
              <div className="flex flex-col items-center text-center">
                <span className="font-bold text-blue-900">{t('contact.emails.departments.imports')}</span>
                <a href="mailto:importaciones@prilabsa.com.ec" className="text-blue-600 hover:underline">importaciones@prilabsa.com.ec</a>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="font-bold text-blue-900">{t('contact.emails.departments.sales')}</span>
                <a href="mailto:comercialventas@prilabsa.com.ec" className="text-blue-600 hover:underline">comercialventas@prilabsa.com.ec</a>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="font-bold text-blue-900">{t('contact.emails.departments.hr')}</span>
                <a href="mailto:talentohumano@prilabsa.com.ec" className="text-blue-600 hover:underline">talentohumano@prilabsa.com.ec</a>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-2" style={{ color: '#3759C1' }}>{t('contact.form.title')}</h2>
          <p className="text-center text-gray-600 mb-8">{t('contact.form.description')}</p>
          <form noValidate onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col">
                <label htmlFor="name" className="mb-2 font-semibold text-gray-700">{t('contact.form.fields.fullName')} <span className="text-red-500">*</span></label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="company" className="mb-2 font-semibold text-gray-700">{t('contact.form.fields.company')}</label>
                <input type="text" id="company" name="company" value={formData.company} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col">
                <label htmlFor="email" className="mb-2 font-semibold text-gray-700">{t('contact.form.fields.email')} <span className="text-red-500">*</span></label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="phone" className="mb-2 font-semibold text-gray-700">{t('contact.form.fields.phone')}</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <label htmlFor="message" className="mb-2 font-semibold text-gray-700">{t('contact.form.fields.message')} <span className="text-red-500">*</span></label>
              <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
            </div>
            
            <ConsentCheckbox 
              isChecked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              hasError={errors.consent}
            />

            {errors.general && <p className="text-red-500 text-sm mt-4 text-center">{t('contact.form.errors.required')}</p>}
            {isSubmitted && <p className="text-green-600 text-sm mt-4 text-center">{t('contact.form.success')}</p>}

            <div className="text-center mt-6">
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full md:w-auto text-white font-bold py-3 px-8 rounded-md uppercase transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed" 
                style={{ backgroundColor: '#f6921d' }}
              >
                {isLoading ? 'Enviando...' : t('contact.form.button')}
              </button>
            </div>
          </form>
        </div>
      </div>

      
      <NewsletterSubscribe />
    </Layout>
  );
};

export default Contactanos;
