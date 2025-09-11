import React from 'react';
import OptimizedImage from './OptimizedImage';

const WhatsAppButton = () => {
  const whatsappUrl = 'https://api.whatsapp.com/send/?phone=593990141853&text=Necesito%20m%C3%A1s%20informaci%C3%B3n.&type=phone_number&app_absent=0';

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 p-3 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300"
      aria-label="Contactar por WhatsApp"
    >
      <OptimizedImage
        src="/assets/iniciodev/whatsapp_icon.png" 
        alt="WhatsApp" 
        className="w-8 h-8" 
        priority={true}
        width={32}
        height={32}
      />
    </a>
  );
};

export default WhatsAppButton; 