import React, { useState } from 'react';
import ConsentCheckbox from './molecules/ConsentCheckbox';
import { useLanguage } from '../contexts/LanguageContext';
import { sendCareerForm, type CareerFormData } from '../services/emailService';

const CareerSection = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    coverLetter: '',
  });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({
    general: '',
    consent: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de archivo
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, general: 'Por favor, suba un archivo PDF o Word (.doc, .docx)' }));
        return;
      }
      // Validar tamaño (5MB máximo)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, general: 'El archivo no debe superar los 5MB' }));
        return;
      }
      setResumeFile(file);
      setErrors(prev => ({ ...prev, general: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ general: '', consent: false });
    setIsSubmitted(false);
    setIsLoading(true);

    if (!formData.name || !formData.email || !formData.position || !formData.experience) {
      setErrors(prev => ({ ...prev, general: 'Por favor, complete los campos obligatorios: Nombre, Email, Posición y Experiencia.' }));
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
      formId: 'career-form',
      consentText: 'He leído y acepto la Política de Privacidad para el procesamiento de mis datos laborales.',
    };

    const payload: CareerFormData = { 
      ...formData, 
      consent,
      consentData,
      resume: resumeFile
    };

    try {
      // Envío automático con FormSubmit.co
      const success = await sendCareerForm(payload);
      
      if (success) {
        console.log('Formulario de carrera procesado exitosamente');
        setIsSubmitted(true);
        setFormData({ name: '', email: '', phone: '', position: '', experience: '', coverLetter: '' });
        setResumeFile(null);
        setConsent(false);
        
        // Reset file input
        const fileInput = document.getElementById('resume') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        setErrors(prev => ({ ...prev, general: 'Error al enviar la solicitud. Por favor, intente nuevamente.' }));
      }
      
    } catch (error) {
      console.error('Error en el envío de carrera:', error);
      setErrors(prev => ({ ...prev, general: 'Error al procesar la solicitud. Por favor, intente nuevamente.' }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#3759C1' }}>Trabaja con Nosotros</h2>
            <p className="text-xl text-gray-600 mb-2">Únete a nuestro equipo de profesionales</p>
            <p className="text-gray-600">Envía tu currículum y forma parte de PRILABSA</p>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg">
            <form noValidate onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col">
                  <label htmlFor="career-name" className="mb-2 font-semibold text-gray-700">
                    Nombre Completo <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="career-name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    required 
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="career-email" className="mb-2 font-semibold text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    id="career-email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col">
                  <label htmlFor="career-phone" className="mb-2 font-semibold text-gray-700">
                    Teléfono
                  </label>
                  <input 
                    type="tel" 
                    id="career-phone" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="career-position" className="mb-2 font-semibold text-gray-700">
                    Posición de Interés <span className="text-red-500">*</span>
                  </label>
                  <select 
                    id="career-position" 
                    name="position" 
                    value={formData.position} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    required
                  >
                    <option value="">Seleccione una posición</option>
                    <option value="Ventas">Ventas</option>
                    <option value="Importaciones">Importaciones</option>
                    <option value="Logística">Logística</option>
                    <option value="Administración">Administración</option>
                    <option value="Contabilidad">Contabilidad</option>
                    <option value="Recursos Humanos">Recursos Humanos</option>
                    <option value="Tecnología">Tecnología</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Otra">Otra</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col mb-6">
                <label htmlFor="career-experience" className="mb-2 font-semibold text-gray-700">
                  Experiencia Profesional <span className="text-red-500">*</span>
                </label>
                <textarea 
                  id="career-experience" 
                  name="experience" 
                  rows={4} 
                  value={formData.experience} 
                  onChange={handleInputChange} 
                  placeholder="Describa brevemente su experiencia profesional relevante..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  required
                ></textarea>
              </div>

              <div className="flex flex-col mb-6">
                <label htmlFor="resume" className="mb-2 font-semibold text-gray-700">
                  Currículum (PDF o Word - Máx. 5MB)
                </label>
                <input 
                  type="file" 
                  id="resume" 
                  name="resume" 
                  accept=".pdf,.doc,.docx" 
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
                />
                {resumeFile && (
                  <p className="text-sm text-green-600 mt-2">Archivo seleccionado: {resumeFile.name}</p>
                )}
              </div>

              <div className="flex flex-col mb-6">
                <label htmlFor="career-cover-letter" className="mb-2 font-semibold text-gray-700">
                  Carta de Presentación (Opcional)
                </label>
                <textarea 
                  id="career-cover-letter" 
                  name="coverLetter" 
                  rows={4} 
                  value={formData.coverLetter} 
                  onChange={handleInputChange} 
                  placeholder="Cuéntanos por qué te interesa trabajar con nosotros..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                ></textarea>
              </div>
              
              <ConsentCheckbox 
                isChecked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                hasError={errors.consent}
              />

              {errors.general && <p className="text-red-500 text-sm mt-4 text-center">{errors.general}</p>}
              {isSubmitted && (
                <div className="bg-green-50 border border-green-200 rounded-md p-4 mt-4">
                  <p className="text-green-800 text-center">
                    ¡Gracias por tu interés! Tu solicitud ha sido procesada. Se abrirá tu cliente de email para completar el envío con tu currículum adjunto.
                  </p>
                </div>
              )}

              <div className="text-center mt-6">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full md:w-auto text-white font-bold py-3 px-8 rounded-md uppercase transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed" 
                  style={{ backgroundColor: '#f6921d' }}
                >
                  {isLoading ? 'Procesando...' : 'Enviar Solicitud'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerSection;