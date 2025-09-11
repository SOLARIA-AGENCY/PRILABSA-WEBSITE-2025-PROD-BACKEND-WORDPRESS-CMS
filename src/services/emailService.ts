// FormSubmit.co Configuration - No registration required!
// Simply use the email address as the endpoint

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  consent: boolean;
  consentData?: {
    timestamp: string;
    formId: string;
    consentText: string;
  };
}

export interface CareerFormData {
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  resume?: File | null;
  consent: boolean;
  consentData?: {
    timestamp: string;
    formId: string;
    consentText: string;
  };
}

// Send contact form via FormSubmit.co
export const sendContactForm = async (data: ContactFormData): Promise<boolean> => {
  try {
    const formData = new FormData();
    
    // Add form fields
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('company', data.company);
    formData.append('message', data.message);
    formData.append('consent', data.consent ? 'Sí, acepto el tratamiento de datos' : 'No acepto');
    
    // FormSubmit.co configuration
    formData.append('_subject', `Nuevo contacto desde PRILABSA - ${data.name}`);
    formData.append('_cc', 'webmaster@solaria.agency'); // Copy to webmaster for control
    formData.append('_captcha', 'false'); // Disable captcha
    formData.append('_template', 'table'); // Use table template for better formatting
    
    const response = await fetch('https://formsubmit.co/info@prilabsa.com.ec', {
      method: 'POST',
      body: formData
    });

    return response.ok;
  } catch (error) {
    console.error('Error sending contact form:', error);
    return false;
  }
};

// Send career form via FormSubmit.co
export const sendCareerForm = async (data: CareerFormData): Promise<boolean> => {
  try {
    const formData = new FormData();
    
    // Add form fields
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('position', data.position);
    formData.append('experience', data.experience);
    formData.append('consent', data.consent ? 'Sí, acepto el tratamiento de datos' : 'No acepto');
    
    // Add resume file if provided
    if (data.resume) {
      formData.append('resume', data.resume);
    }
    
    // FormSubmit.co configuration
    formData.append('_subject', `Solicitud de Empleo - ${data.position} - ${data.name}`);
    formData.append('_cc', 'webmaster@solaria.agency'); // Copy to webmaster for control
    formData.append('_captcha', 'false'); // Disable captcha
    formData.append('_template', 'table'); // Use table template for better formatting
    
    const response = await fetch('https://formsubmit.co/talentohumano@prilabsa.com.ec', {
      method: 'POST',
      body: formData
    });

    return response.ok;
  } catch (error) {
    console.error('Error sending career form:', error);
    return false;
  }
};

/**
 * Configuración alternativa usando mailto para compatibilidad
 */
export const sendViaMailto = (formData: ContactFormData, isCareer: boolean = false): void => {
  const recipient = isCareer ? 'talentohumano@prilabsa.com.ec' : 'info@prilabsa.com.ec';
  const subject = isCareer ? 'Solicitud de Empleo - ' + formData.name : 'Contacto desde Web - ' + formData.name;
  
  let body = `Nombre: ${formData.name}\n`;
  if (formData.company) body += `Empresa: ${formData.company}\n`;
  body += `Email: ${formData.email}\n`;
  if (formData.phone) body += `Teléfono: ${formData.phone}\n`;
  body += `\nMensaje:\n${formData.message}\n`;
  
  if (formData.consentData) {
    body += `\n--- Información de Consentimiento ---\n`;
    body += `Fecha: ${formData.consentData.timestamp}\n`;
    body += `Formulario: ${formData.consentData.formId}\n`;
    body += `Consentimiento: ${formData.consentData.consentText}\n`;
  }

  const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(mailtoUrl, '_blank');
};