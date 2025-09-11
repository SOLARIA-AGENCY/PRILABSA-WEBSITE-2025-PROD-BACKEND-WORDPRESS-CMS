import React, { useState } from 'react';
import Layout from '../components/Layout';
import StaticHero from '../components/StaticHero';
import Newsletter from '../components/organisms/blog/Newsletter';
import ConsentCheckbox from '../components/molecules/ConsentCheckbox';
import { useLanguage } from '../contexts/LanguageContext';

const TrabajaConNosotros = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    area: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({
    general: '',
    consent: false,
    file: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ general: '', consent: false, file: '' });
    setIsSubmitted(false);

    if (!formData.name || !formData.email || !file) {
      setErrors(prev => ({ ...prev, general: 'Por favor, complete los campos obligatorios: Nombre, Email y CV.' }));
      return;
    }

    if (!consent) {
      setErrors(prev => ({ ...prev, consent: true }));
      return;
    }

    const consentData = {
      timestamp: new Date().toISOString(),
      formId: 'recruitment-form',
      consentText: 'He leído y acepto la Política de Privacidad.',
    };
    
    // NOTA: En una app real, aquí se usaría FormData para enviar el archivo
    const payload = { ...formData, cv: file.name, consentData };

    console.log('--- FORMULARIO DE TRABAJA CON NOSOTROS PARA ENVIAR (SIMULACIÓN) ---');
    console.log(payload);

    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', country: '', area: '' });
    setFile(null);
    setConsent(false);
    // Reset file input
    const fileInput = document.getElementById('cv') as HTMLInputElement;
    if(fileInput) fileInput.value = '';
  };

  return (
    <Layout>
      <StaticHero 
        title={t('careers.hero.title')}
        backgroundImage="/assets/iniciodev/prilabsa-hero.png"
      />
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-2" style={{ color: '#3759C1' }}>{t('careers.form.title')}</h2>
          <p className="text-center text-gray-600 mb-8">{t('careers.form.description')}</p>
          <form noValidate onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col">
                <label htmlFor="name" className="mb-2 font-semibold text-gray-700">{t('careers.form.fields.fullName')} <span className="text-red-500">*</span></label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="mb-2 font-semibold text-gray-700">{t('careers.form.fields.email')} <span className="text-red-500">*</span></label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col">
                <label htmlFor="phone" className="mb-2 font-semibold text-gray-700">{t('careers.form.fields.phone')}</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="country" className="mb-2 font-semibold text-gray-700">{t('careers.form.fields.country')}</label>
                <input type="text" id="country" name="country" value={formData.country} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
               <div className="flex flex-col">
                <label htmlFor="area" className="mb-2 font-semibold text-gray-700">{t('careers.form.fields.area')}</label>
                <select id="area" name="area" value={formData.area} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  <option value="">{t('careers.form.areas.placeholder')}</option>
                  <option>{t('careers.form.areas.sales')}</option>
                  <option>{t('careers.form.areas.admin')}</option>
                  <option>{t('careers.form.areas.logistics')}</option>
                  <option>{t('careers.form.areas.rd')}</option>
                  <option>{t('careers.form.areas.marketing')}</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="cv" className="mb-2 font-semibold text-gray-700">{t('careers.form.fields.cv')} <span className="text-red-500">*</span></label>
                <input type="file" id="cv" name="cv" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" required/>
              </div>
            </div>

            <ConsentCheckbox
              isChecked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              hasError={errors.consent}
            />

            {errors.general && <p className="text-red-500 text-sm mt-4 text-center">{t('careers.form.errors.required')}</p>}
            {isSubmitted && <p className="text-green-600 text-sm mt-4 text-center">{t('careers.form.success')}</p>}

            <div className="text-center mt-8">
              <button type="submit" className="w-full md:w-auto text-white font-bold py-3 px-8 rounded-md uppercase transition-colors duration-300" style={{ backgroundColor: '#f6921d' }}>
                {t('careers.form.button')}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <Newsletter />

    </Layout>
  );
};

export default TrabajaConNosotros;
