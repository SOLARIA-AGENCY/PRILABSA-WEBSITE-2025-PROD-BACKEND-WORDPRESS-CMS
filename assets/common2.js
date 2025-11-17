const buttons = { "loading": "Cargando...", "error": "Error", "success": "�xito", "cancel": "Cancelar", "confirm": "Confirmar", "save": "Guardar", "edit": "Editar", "delete": "Eliminar", "back": "Volver", "next": "Siguiente", "previous": "Anterior", "seeMore": "Ver m�s", "viewAll": "Ver todos", "download": "Descargar", "contact": "Contactar", "submit": "Enviar", "confirmSend": "Confirmar Env�o", "downloadPdf": "Descargar PDF", "downloadCSS": "Descargar CSS", "exportCSS": "Exportar CSS", "subscribe": "SUSCRIBIRSE" };
const forms = { "fields": { "fullName": "Nombre Completo", "name": "nombre completo *", "email": "Email *", "phone": "Tel�fono", "company": "Empresa *", "message": "Mensaje", "required": "* Campos obligatorios" }, "placeholders": { "email": "Tu correo electr�nico", "name": "Ingresa tu nombre completo", "message": "Escribe tu mensaje aqu�" }, "validation": { "required": "Por favor, complete los campos obligatorios: Nombre, Email y Mensaje.", "invalidEmail": "Por favor ingresa un email v�lido" }, "success": "�Gracias! Tu mensaje ha sido enviado. Nos pondremos en contacto contigo pronto.", "error": "Hubo un error al enviar el mensaje. Por favor intenta de nuevo." };
const meta = { "loading": "Cargando...", "error": "Error", "success": "�xito" };
const messages = { "simulationNote": "El env�o de email es solo una simulaci�n. Para recibir cotizaciones reales, debe integrarse un backend (SMTP, Brevo, SendGrid, etc).", "logoError": "No se pudo cargar el logo para el PDF. La descarga estar� deshabilitada.", "redirectMessage": "Ser� redirigido al inicio en breve." };
const contact = { "phone": "Tel�fono:", "email": "Para m�s informaci�n escr�benos a", "title": "CONT�CTANOS" };
const newsletter = { "description": "Recibe las �ltimas noticias, ofertas y tendencias de la industria directamente en tu correo.", "placeholder": "Tu correo electr�nico", "button": "SUSCRIBIRSE" };
const common = {
  buttons,
  forms,
  meta,
  messages,
  contact,
  newsletter
};
export {
  buttons,
  contact,
  common as default,
  forms,
  messages,
  meta,
  newsletter
};
