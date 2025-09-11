import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import {
  isValidEmail,
  sanitizeInput,
  validateRequired,
  validateName,
  validateMessage,
  validateFile,
  useFormThrottle
} from '../validation';

describe('validation utilities', () => {
  describe('isValidEmail', () => {
    it('should validate correct email addresses', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'firstname+lastname@company.org',
        'email@123.123.123.123', // IP address
        'user@domain-name.com',
        'user_name@domain.com',
        '1234567890@example.com',
        'email@domain.name'
      ];

      validEmails.forEach(email => {
        expect(isValidEmail(email)).toBe(true);
      });
    });

    it('should reject invalid email addresses', () => {
      const invalidEmails = [
        '',
        'plainaddress',
        '@missingdomain.com',
        'missing@.com',
        'missing@domain',
        'spaces @domain.com',
        'user@',
        'user@domain.',
        '.user@domain.com',
        'user.@domain.com',
        'user..name@domain.com',
        'user@domain..com',
        'user name@domain.com',
        'user@domain .com'
      ];

      invalidEmails.forEach(email => {
        expect(isValidEmail(email)).toBe(false);
      });
    });

    it('should handle edge cases', () => {
      expect(isValidEmail(null as any)).toBe(false);
      expect(isValidEmail(undefined as any)).toBe(false);
      expect(isValidEmail(123 as any)).toBe(false);
      expect(isValidEmail({})).toBe(false);
      expect(isValidEmail([])).toBe(false);
    });

    it('should be case insensitive', () => {
      expect(isValidEmail('TEST@EXAMPLE.COM')).toBe(true);
      expect(isValidEmail('Test@Example.Com')).toBe(true);
      expect(isValidEmail('test@EXAMPLE.com')).toBe(true);
    });

    it('should handle long email addresses', () => {
      const longEmail = 'a'.repeat(50) + '@' + 'b'.repeat(50) + '.com';
      expect(isValidEmail(longEmail)).toBe(true);
    });
  });

  describe('sanitizeInput', () => {
    it('should remove HTML tags', () => {
      expect(sanitizeInput('<script>alert("xss")</script>')).toBe('alert("xss")');
      expect(sanitizeInput('<div>Hello <b>World</b></div>')).toBe('Hello World');
      expect(sanitizeInput('<p>Paragraph</p>')).toBe('Paragraph');
      expect(sanitizeInput('<img src="x" onerror="alert(1)">')).toBe('');
    });

    it('should trim whitespace', () => {
      expect(sanitizeInput('  hello world  ')).toBe('hello world');
      expect(sanitizeInput('\n\t  text  \n\t')).toBe('text');
      expect(sanitizeInput('   ')).toBe('');
    });

    it('should handle empty and null inputs', () => {
      expect(sanitizeInput('')).toBe('');
      expect(sanitizeInput(null as any)).toBe('');
      expect(sanitizeInput(undefined as any)).toBe('');
    });

    it('should handle non-string inputs', () => {
      expect(sanitizeInput(123 as any)).toBe('123');
      expect(sanitizeInput(true as any)).toBe('true');
      expect(sanitizeInput({} as any)).toBe('[object Object]');
    });

    it('should preserve safe text content', () => {
      expect(sanitizeInput('Hello World')).toBe('Hello World');
      expect(sanitizeInput('Email: test@example.com')).toBe('Email: test@example.com');
      expect(sanitizeInput('Price: $19.99')).toBe('Price: $19.99');
    });

    it('should handle mixed content', () => {
      expect(sanitizeInput('  <p>Hello</p> <script>alert(1)</script> World  '))
        .toBe('Hello alert(1) World');
    });

    it('should handle malformed HTML', () => {
      expect(sanitizeInput('<div><p>Unclosed tags')).toBe('Unclosed tags');
      expect(sanitizeInput('Text with < and > symbols')).toBe('Text with < and > symbols');
    });

    it('should handle special characters', () => {
      expect(sanitizeInput('Café & Résumé')).toBe('Café & Résumé');
      expect(sanitizeInput('Price: €50 & $60')).toBe('Price: €50 & $60');
    });
  });

  describe('validateRequired', () => {
    it('should validate non-empty strings', () => {
      expect(validateRequired('hello')).toBe(true);
      expect(validateRequired('a')).toBe(true);
      expect(validateRequired('  text  ')).toBe(true);
    });

    it('should reject empty or whitespace-only strings', () => {
      expect(validateRequired('')).toBe(false);
      expect(validateRequired('   ')).toBe(false);
      expect(validateRequired('\n\t  \n')).toBe(false);
    });

    it('should handle null and undefined', () => {
      expect(validateRequired(null as any)).toBe(false);
      expect(validateRequired(undefined as any)).toBe(false);
    });

    it('should handle non-string inputs', () => {
      expect(validateRequired(0 as any)).toBe(false);
      expect(validateRequired(false as any)).toBe(false);
      expect(validateRequired([] as any)).toBe(false);
      expect(validateRequired({} as any)).toBe(false);
    });

    it('should handle truthy non-string values', () => {
      expect(validateRequired(123 as any)).toBe(true);
      expect(validateRequired(true as any)).toBe(true);
      expect(validateRequired([1, 2, 3] as any)).toBe(true);
      expect(validateRequired({ key: 'value' } as any)).toBe(true);
    });
  });

  describe('validateName', () => {
    it('should validate proper names', () => {
      expect(validateName('John').isValid).toBe(true);
      expect(validateName('María García').isValid).toBe(true);
      expect(validateName('Jean-Pierre').isValid).toBe(true);
      expect(validateName('O\'Connor').isValid).toBe(true);
      expect(validateName('José María de la Cruz').isValid).toBe(true);
    });

    it('should reject names with invalid characters', () => {
      expect(validateName('John123').isValid).toBe(false);
      expect(validateName('John@Doe').isValid).toBe(false);
      expect(validateName('John#Doe').isValid).toBe(false);
      expect(validateName('John$Doe').isValid).toBe(false);
      expect(validateName('John%Doe').isValid).toBe(false);
    });

    it('should reject empty or whitespace-only names', () => {
      expect(validateName('').isValid).toBe(false);
      expect(validateName('   ').isValid).toBe(false);
      expect(validateName('\n\t').isValid).toBe(false);
    });

    it('should handle null and undefined', () => {
      expect(validateName(null as any).isValid).toBe(false);
      expect(validateName(undefined as any).isValid).toBe(false);
    });

    it('should reject names that are too short', () => {
      expect(validateName('A').isValid).toBe(false);
      expect(validateName('Ab').isValid).toBe(true); // Assuming minimum 2 characters
    });

    it('should handle accented characters', () => {
      expect(validateName('José').isValid).toBe(true);
      expect(validateName('François').isValid).toBe(true);
      expect(validateName('Müller').isValid).toBe(true);
      expect(validateName('Ñoño').isValid).toBe(true);
    });

    it('should handle multiple spaces', () => {
      expect(validateName('John  Doe').isValid).toBe(true);
      expect(validateName('  John Doe  ').isValid).toBe(true);
    });

    it('should reject names with only special characters', () => {
      expect(validateName('---').isValid).toBe(true); // Hyphens are allowed
      expect(validateName("'''").isValid).toBe(true); // Apostrophes are allowed
      expect(validateName('123').isValid).toBe(false); // Numbers are not allowed
    });
  });

  describe('validateMessage', () => {
    it('should validate proper messages', () => {
      expect(validateMessage('Hello world').isValid).toBe(true);
      expect(validateMessage('This is a longer message with punctuation!').isValid).toBe(true);
      expect(validateMessage('Message with numbers 123 and symbols @#$').isValid).toBe(true);
    });

    it('should reject empty or whitespace-only messages', () => {
      expect(validateMessage('').isValid).toBe(false);
      expect(validateMessage('   ').isValid).toBe(false);
      expect(validateMessage('\n\t  \n').isValid).toBe(false);
    });

    it('should handle null and undefined', () => {
      expect(validateMessage(null as any).isValid).toBe(false);
      expect(validateMessage(undefined as any).isValid).toBe(false);
    });

    it('should reject messages that are too short', () => {
      expect(validateMessage('Hi').isValid).toBe(false); // Less than 10 characters
      expect(validateMessage('Hello world').isValid).toBe(true); // 11 characters
    });

    it('should reject messages that are too long', () => {
      const longMessage = 'a'.repeat(1001); // Assuming 1000 character limit
      expect(validateMessage(longMessage).isValid).toBe(false);
      
      const validMessage = 'a'.repeat(500);
      expect(validateMessage(validMessage).isValid).toBe(true);
    });

    it('should handle special characters and newlines', () => {
      expect(validateMessage('Hello\nWorld').isValid).toBe(true);
      expect(validateMessage('Message with émojis 😊').isValid).toBe(true);
      expect(validateMessage('Special chars: @#$%^&*()').isValid).toBe(true);
    });

    it('should handle multilingual content', () => {
      expect(validateMessage('Hola mundo amigo').isValid).toBe(true); // 16 characters
      expect(validateMessage('Hello world message').isValid).toBe(true); // 19 characters
      expect(validateMessage('This is a test message').isValid).toBe(true); // 23 characters
    });
  });

  describe('validateFile', () => {
    const createMockFile = (name: string, size: number, type: string): File => {
      const file = new File([''], name, { type });
      Object.defineProperty(file, 'size', { value: size });
      return file;
    };

    it('should validate allowed file types', () => {
      const pdfFile = createMockFile('document.pdf', 1000000, 'application/pdf');
      const jpgFile = createMockFile('image.jpg', 500000, 'image/jpeg');
      const pngFile = createMockFile('image.png', 500000, 'image/png');
      const docFile = createMockFile('document.doc', 1000000, 'application/msword');
      
      expect(validateFile(pdfFile).isValid).toBe(true);
      expect(validateFile(jpgFile).isValid).toBe(true);
      expect(validateFile(pngFile).isValid).toBe(true);
      expect(validateFile(docFile).isValid).toBe(true);
    });

    it('should reject disallowed file types', () => {
      const exeFile = createMockFile('virus.exe', 1000, 'application/x-executable');
      const jsFile = createMockFile('script.js', 1000, 'application/javascript');
      const unknownFile = createMockFile('file.unknown', 1000, 'application/octet-stream');
      
      expect(validateFile(exeFile).isValid).toBe(false);
      expect(validateFile(jsFile).isValid).toBe(false);
      expect(validateFile(unknownFile).isValid).toBe(false);
    });

    it('should validate file size limits', () => {
      const smallFile = createMockFile('small.pdf', 1000, 'application/pdf');
      const largeFile = createMockFile('large.pdf', 10000000, 'application/pdf'); // 10MB
      const hugeFile = createMockFile('huge.pdf', 100000000, 'application/pdf'); // 100MB
      
      expect(validateFile(smallFile).isValid).toBe(true);
      expect(validateFile(largeFile).isValid).toBe(true);
      expect(validateFile(hugeFile).isValid).toBe(false); // Assuming 50MB limit
    });

    it('should handle null and undefined files', () => {
      expect(validateFile(null as any).isValid).toBe(false);
      expect(validateFile(undefined as any).isValid).toBe(false);
    });

    it('should handle empty files', () => {
      const emptyFile = createMockFile('empty.pdf', 0, 'application/pdf');
      expect(validateFile(emptyFile).isValid).toBe(false);
    });

    it('should validate file name extensions', () => {
      const fileWithoutExtension = createMockFile('document', 1000, 'application/pdf');
      const fileWithWrongExtension = createMockFile('document.txt', 1000, 'application/pdf');
      const fileWithCorrectExtension = createMockFile('document.pdf', 1000, 'application/pdf');
      
      expect(validateFile(fileWithoutExtension).isValid).toBe(false);
      expect(validateFile(fileWithWrongExtension).isValid).toBe(false);
      expect(validateFile(fileWithCorrectExtension).isValid).toBe(true);
    });

    it('should handle case insensitive extensions', () => {
      const upperCaseFile = createMockFile('document.PDF', 1000, 'application/pdf');
      const mixedCaseFile = createMockFile('document.Pdf', 1000, 'application/pdf');
      
      expect(validateFile(upperCaseFile).isValid).toBe(true);
      expect(validateFile(mixedCaseFile).isValid).toBe(true);
    });
  });

  describe('useFormThrottle', () => {
    it('should allow submission initially', () => {
      const { result } = renderHook(() => useFormThrottle(1000));
      
      expect(result.current.canSubmit()).toBe(true);
    });

    it('should throttle after recording submission', () => {
      const { result } = renderHook(() => useFormThrottle(1000));
      
      expect(result.current.canSubmit()).toBe(true);
      
      act(() => {
        result.current.recordSubmission();
      });
      
      expect(result.current.canSubmit()).toBe(false);
    });

    it('should use default delay of 5000ms', () => {
      const { result } = renderHook(() => useFormThrottle());
      
      expect(result.current.canSubmit()).toBe(true);
      
      act(() => {
        result.current.recordSubmission();
      });
      
      expect(result.current.canSubmit()).toBe(false);
    });

    it('should allow submission after delay period', () => {
      const { result } = renderHook(() => useFormThrottle(100));
      
      const originalDateNow = Date.now;
      let mockTime = 1000;
      
      vi.spyOn(Date, 'now').mockImplementation(() => mockTime);
      
      expect(result.current.canSubmit()).toBe(true);
      
      act(() => {
        result.current.recordSubmission();
      });
      
      expect(result.current.canSubmit()).toBe(false);
      
      // Advance time beyond delay
      mockTime += 150;
      
      expect(result.current.canSubmit()).toBe(true);
      
      Date.now = originalDateNow;
    });

    it('should maintain state across multiple calls', () => {
      const { result } = renderHook(() => useFormThrottle(1000));
      
      // Multiple checks before submission
      expect(result.current.canSubmit()).toBe(true);
      expect(result.current.canSubmit()).toBe(true);
      
      act(() => {
        result.current.recordSubmission();
      });
      
      // Multiple checks after submission
      expect(result.current.canSubmit()).toBe(false);
      expect(result.current.canSubmit()).toBe(false);
    });
  });

  describe('Integration tests', () => {
    it('should work together for form validation', () => {
      const formData = {
        name: '  John Doe  ',
        email: 'john@example.com',
        message: 'This is a test message for validation.'
      };
      
      const sanitizedName = sanitizeInput(formData.name);
      const sanitizedMessage = sanitizeInput(formData.message);
      
      expect(validateName(sanitizedName).isValid).toBe(true);
      expect(isValidEmail(formData.email)).toBe(true);
      expect(validateMessage(sanitizedMessage).isValid).toBe(true);
      expect(validateRequired(sanitizedName)).toBe(true);
      expect(validateRequired(formData.email)).toBe(true);
      expect(validateRequired(sanitizedMessage)).toBe(true);
    });

    it('should handle malicious input', () => {
      const maliciousData = {
        name: '<script>alert("xss")</script>John',
        email: 'test@example.com',
        message: '<img src=x onerror=alert(1)>Hello world message'
      };
      
      const sanitizedName = sanitizeInput(maliciousData.name);
      const sanitizedMessage = sanitizeInput(maliciousData.message);
      
      expect(sanitizedName).toBe('alert("xss")John'); // HTML tags removed, script content preserved
      expect(sanitizedMessage).toBe('Hello world message'); // HTML tags removed
      expect(validateName(sanitizedName).isValid).toBe(true); // Now valid after sanitization
      expect(validateMessage(sanitizedMessage).isValid).toBe(true);
    });
  });
});