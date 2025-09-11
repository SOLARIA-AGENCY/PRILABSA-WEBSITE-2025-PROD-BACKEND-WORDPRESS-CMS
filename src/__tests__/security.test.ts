import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { 
  isValidEmail, 
  sanitizeInput, 
  validateRequired, 
  validateName, 
  validateMessage, 
  validateFile,
  useFormThrottle 
} from '../utils/validation';

describe('Security Validation Tests', () => {
  describe('Email Validation', () => {
    it('should accept valid emails', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+tag@example.org',
        'user123@test-domain.com'
      ];
      
      validEmails.forEach(email => {
        expect(isValidEmail(email)).toBe(true);
      });
    });

    it('should reject invalid emails', () => {
      const invalidEmails = [
        'invalid-email',
        '@domain.com',
        'user@',
        'user@domain',
        '<script>alert("xss")</script>@domain.com',
        'a'.repeat(250) + '@domain.com', // Too long
        ''
      ];
      
      invalidEmails.forEach(email => {
        expect(isValidEmail(email)).toBe(false);
      });
    });
  });

  describe('Input Sanitization', () => {
    it('should remove script tags', () => {
      const maliciousInput = '<script>alert("xss")</script>Hello World';
      const sanitized = sanitizeInput(maliciousInput);
      expect(sanitized).toBe('alert("xss")Hello World');
    });

    it('should remove HTML tags', () => {
      const htmlInput = '<div>Hello</div><span>World</span>';
      const sanitized = sanitizeInput(htmlInput);
      expect(sanitized).toBe('HelloWorld');
    });

    it('should limit input length', () => {
      const longInput = 'a'.repeat(1000);
      const sanitized = sanitizeInput(longInput);
      expect(sanitized.length).toBe(500);
    });

    it('should trim whitespace', () => {
      const input = '   Hello World   ';
      const sanitized = sanitizeInput(input);
      expect(sanitized).toBe('Hello World');
    });

    it('should handle empty input', () => {
      expect(sanitizeInput('')).toBe('');
      expect(sanitizeInput('   ')).toBe('');
    });
  });

  describe('Name Validation', () => {
    it('should accept valid names', () => {
      const validNames = [
        'Juan Pérez',
        'María José',
        'José Luis',
        'Ana-María',
        "O'Connor",
        'Fernández'
      ];
      
      validNames.forEach(name => {
        const result = validateName(name);
        expect(result.isValid).toBe(true);
        expect(result.error).toBeUndefined();
      });
    });

    it('should reject invalid names', () => {
      const invalidNames = [
        '', // Empty
        'A', // Too short
        'a'.repeat(101), // Too long
        'Juan123', // Contains numbers
        'Juan@Domain', // Contains @
        '<script>alert("xss")</script>', // Script injection
        'Juan & María' // Contains &
      ];
      
      invalidNames.forEach(name => {
        const result = validateName(name);
        expect(result.isValid).toBe(false);
        expect(result.error).toBeDefined();
      });
    });
  });

  describe('Message Validation', () => {
    it('should accept valid messages', () => {
      const validMessage = 'Este es un mensaje válido para el formulario de contacto.';
      const result = validateMessage(validMessage);
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should reject invalid messages', () => {
      const invalidMessages = [
        '', // Empty
        '   ', // Only whitespace
        'Short', // Too short
        'a'.repeat(1001) // Too long
      ];
      
      invalidMessages.forEach(message => {
        const result = validateMessage(message);
        expect(result.isValid).toBe(false);
        expect(result.error).toBeDefined();
      });
    });
  });

  describe('File Validation', () => {
    it('should accept valid file types', () => {
      const validFiles = [
        new File(['content'], 'test.pdf', { type: 'application/pdf' }),
        new File(['content'], 'test.doc', { type: 'application/msword' }),
        new File(['content'], 'test.docx', { 
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
        }),
        new File(['content'], 'test.txt', { type: 'text/plain' })
      ];
      
      validFiles.forEach(file => {
        const result = validateFile(file);
        expect(result.isValid).toBe(true);
        expect(result.error).toBeUndefined();
      });
    });

    it('should reject invalid file types', () => {
      const invalidFiles = [
        new File(['content'], 'test.exe', { type: 'application/x-executable' }),
        new File(['content'], 'test.js', { type: 'application/javascript' }),
        new File(['content'], 'test.html', { type: 'text/html' })
      ];
      
      invalidFiles.forEach(file => {
        const result = validateFile(file);
        expect(result.isValid).toBe(false);
        expect(result.error).toContain('Solo se permiten archivos');
      });
    });

    it('should reject files that are too large', () => {
      // Create a mock file larger than 50MB using Object.defineProperty for size
      const largeFile = new File(['content'], 'large.pdf', { type: 'application/pdf' });
      Object.defineProperty(largeFile, 'size', {
        value: 60 * 1024 * 1024, // 60MB
        writable: false
      });
      
      const result = validateFile(largeFile);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('no puede exceder 50MB');
    }, 10000);
  });

  describe('Form Throttling', () => {
    beforeEach(() => {
      vi.clearAllTimers();
      vi.useRealTimers();
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.clearAllTimers();
      vi.useRealTimers();
    });

    it('should prevent rapid form submissions', () => {
      const { canSubmit, recordSubmission } = useFormThrottle(5000);
      
      // First submission should be allowed
      expect(canSubmit()).toBe(true);
      recordSubmission();
      
      // Immediate second submission should be blocked
      expect(canSubmit()).toBe(false);
      
      // After delay, submission should be allowed again
      vi.advanceTimersByTime(5001);
      expect(canSubmit()).toBe(true);
    });

    it('should respect custom delay times', () => {
      const { canSubmit, recordSubmission } = useFormThrottle(1000);
      
      expect(canSubmit()).toBe(true);
      recordSubmission();
      expect(canSubmit()).toBe(false);
      
      vi.advanceTimersByTime(1001);
      expect(canSubmit()).toBe(true);
    });
  });

  describe('Required Field Validation', () => {
    it('should accept non-empty strings', () => {
      expect(validateRequired('valid input')).toBe(true);
      expect(validateRequired('a')).toBe(true);
    });

    it('should reject empty or whitespace-only strings', () => {
      expect(validateRequired('')).toBe(false);
      expect(validateRequired('   ')).toBe(false);
      expect(validateRequired('\t\n')).toBe(false);
    });
  });
});

describe('XSS Prevention Tests', () => {
  it('should prevent script injection in names', () => {
    const maliciousName = '<script>alert("xss")</script>';
    const result = validateName(maliciousName);
    expect(result.isValid).toBe(false);
  });

  it('should sanitize input to prevent XSS', () => {
    const maliciousInputs = [
      '<script>alert("xss")</script>',
      '<img src="x" onerror="alert(1)">',
      'javascript:alert("xss")',
      '<iframe src="javascript:alert(1)"></iframe>'
    ];
    
    maliciousInputs.forEach(input => {
      const sanitized = sanitizeInput(input);
      expect(sanitized).not.toContain('<script');
      expect(sanitized).not.toContain('javascript:');
      expect(sanitized).not.toContain('<iframe');
      expect(sanitized).not.toContain('<img');
    });
  });
});

describe('Data Validation Boundary Tests', () => {
  it('should handle edge cases for name validation', () => {
    // Exactly at boundaries
    expect(validateName('ab').isValid).toBe(true); // Min length
    expect(validateName('a'.repeat(100)).isValid).toBe(true); // Max length
    expect(validateName('a').isValid).toBe(false); // Below min
    expect(validateName('a'.repeat(101)).isValid).toBe(false); // Above max
  });

  it('should handle edge cases for message validation', () => {
    expect(validateMessage('a'.repeat(10)).isValid).toBe(true); // Min length
    expect(validateMessage('a'.repeat(1000)).isValid).toBe(true); // Max length
    expect(validateMessage('a'.repeat(9)).isValid).toBe(false); // Below min
    expect(validateMessage('a'.repeat(1001)).isValid).toBe(false); // Above max
  });

  it('should handle edge cases for email validation', () => {
    expect(isValidEmail('a@b.co')).toBe(true); // Short valid email
    expect(isValidEmail('a'.repeat(250) + '@domain.com')).toBe(false); // Too long
  });
});