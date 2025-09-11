export const isValidEmail = (email: string): boolean => {
  // Handle empty strings and non-string inputs
  if (!email || typeof email !== 'string' || email.trim() === '') return false;
  
  // Basic format check: must contain exactly one @
  const atCount = (email.match(/@/g) || []).length;
  if (atCount !== 1) return false;
  
  const [localPart, domainPart] = email.split('@');
  
  // Local part validation
  if (!localPart || localPart.length === 0 || localPart.length > 64) return false;
  if (localPart.startsWith('.') || localPart.endsWith('.')) return false;
  if (localPart.includes('..')) return false;
  if (!/^[a-zA-Z0-9._+%-]+$/.test(localPart)) return false;
  
  // Domain part validation
  if (!domainPart || domainPart.length === 0 || domainPart.length > 253) return false;
  if (domainPart.startsWith('.') || domainPart.endsWith('.')) return false;
  if (domainPart.includes('..')) return false;
  if (domainPart.includes(' ')) return false;
  
  // Check if it's an IP address
  const ipRegex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
  if (ipRegex.test(domainPart)) {
    const parts = domainPart.split('.');
    return parts.every(part => parseInt(part) >= 0 && parseInt(part) <= 255);
  }
  
  // Regular domain validation
  if (!/^[a-zA-Z0-9.-]+$/.test(domainPart)) return false;
  if (!domainPart.includes('.')) return false;
  
  const domainParts = domainPart.split('.');
  if (domainParts.some(part => part.length === 0)) return false;
  
  // Last part should be at least 2 characters and only letters
  const tld = domainParts[domainParts.length - 1];
  if (tld.length < 2 || !/^[a-zA-Z]+$/.test(tld)) return false;
  
  return email.length <= 254;
};

export const sanitizeInput = (input: any): string => {
  if (input === null || input === undefined) {
    return '';
  }
  const stringInput = String(input);
  return stringInput
    .trim()
    .replace(/<script\b[^<]*>(.*?)<\/script>/gi, '$1') // Remove script tags but keep content
    .replace(/<\/?[a-zA-Z][^>]*>/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .substring(0, 500);
};

export const validateRequired = (value: any): boolean => {
  if (value === null || value === undefined) {
    return false;
  }
  if (typeof value === 'string') {
    return Boolean(value && value.trim().length > 0);
  }
  // Handle arrays and objects
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  if (typeof value === 'object') {
    return Object.keys(value).length > 0;
  }
  // For other non-string values, check if they are truthy
  return Boolean(value);
};

export const validateName = (name: string): { isValid: boolean; error?: string } => {
  if (!validateRequired(name)) {
    return { isValid: false, error: 'Nombre es requerido' };
  }
  if (name.length < 2) {
    return { isValid: false, error: 'Nombre debe tener al menos 2 caracteres' };
  }
  if (name.length > 100) {
    return { isValid: false, error: 'Nombre no puede exceder 100 caracteres' };
  }
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛäëïöüÄËÏÖÜãõÃÕçÇñÑ\s'"()-]+$/.test(name)) {
    return { isValid: false, error: 'Nombre contiene caracteres inválidos' };
  }
  return { isValid: true };
};

export const validateMessage = (message: string): { isValid: boolean; error?: string } => {
  if (!validateRequired(message)) {
    return { isValid: false, error: 'Mensaje es requerido' };
  }
  if (message.length < 10) {
    return { isValid: false, error: 'Mensaje debe tener al menos 10 caracteres' };
  }
  if (message.length > 1000) {
    return { isValid: false, error: 'Mensaje no puede exceder 1000 caracteres' };
  }
  return { isValid: true };
};

export const validateFile = (file: File): { isValid: boolean; error?: string } => {
  // Handle null/undefined files
  if (!file) {
    return { isValid: false, error: 'No se ha seleccionado ningún archivo' };
  }
  
  // Handle empty files
  if (file.size === 0) {
    return { isValid: false, error: 'El archivo está vacío' };
  }
  
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'image/jpeg',
    'image/png'
  ];
  
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'Solo se permiten archivos PDF, DOC, DOCX, TXT, JPG y PNG' };
  }
  
  // Validate file extension matches type
  const fileName = file.name.toLowerCase();
  const allowedExtensions = {
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    'text/plain': ['.txt'],
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png']
  };
  
  const expectedExtensions = allowedExtensions[file.type as keyof typeof allowedExtensions];
  if (expectedExtensions && !expectedExtensions.some(ext => fileName.endsWith(ext))) {
    return { isValid: false, error: 'La extensión del archivo no coincide con su tipo' };
  }
  
  const maxSize = 50 * 1024 * 1024; // 50MB
  if (file.size > maxSize) {
    return { isValid: false, error: 'El archivo no puede exceder 50MB' };
  }
  
  return { isValid: true };
};

export const useFormThrottle = (delay = 5000) => {
  let lastSubmission = 0;
  
  const canSubmit = (): boolean => {
    const now = Date.now();
    return now - lastSubmission > delay;
  };
  
  const recordSubmission = (): void => {
    lastSubmission = Date.now();
  };
  
  return { canSubmit, recordSubmission };
};
