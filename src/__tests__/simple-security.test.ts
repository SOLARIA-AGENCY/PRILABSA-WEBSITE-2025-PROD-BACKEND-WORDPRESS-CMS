import { describe, it, expect } from 'vitest';
import { 
  isValidEmail, 
  sanitizeInput, 
  validateRequired, 
  validateName, 
  validateMessage, 
  validateFile
} from '../utils/validation';

describe('Security Validation - Simplified Tests', () => {
  describe('Email Validation', () => {
    it('should validate emails correctly', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('Input Sanitization', () => {
    it('should sanitize malicious inputs', () => {
      const maliciousInput = '<script>alert("xss")</script>Hello';
      const sanitized = sanitizeInput(maliciousInput);
      expect(sanitized).toBe('alert("xss")Hello');
      expect(sanitized).not.toContain('<script>');
    });

    it('should remove javascript protocols', () => {
      const maliciousInput = 'javascript:alert("xss")';
      const sanitized = sanitizeInput(maliciousInput);
      expect(sanitized).not.toContain('javascript:');
    });
  });

  describe('Name Validation', () => {
    it('should validate names securely', () => {
      expect(validateName('Juan Pérez').isValid).toBe(true);
      expect(validateName('<script>alert("xss")</script>').isValid).toBe(false);
      expect(validateName('').isValid).toBe(false);
    });
  });

  describe('Message Validation', () => {
    it('should validate messages securely', () => {
      expect(validateMessage('Valid message content').isValid).toBe(true);
      expect(validateMessage('Short').isValid).toBe(false);
      expect(validateMessage('').isValid).toBe(false);
    });
  });

  describe('File Validation', () => {
    it('should validate file types', () => {
      const validFile = new File(['content'], 'test.pdf', { type: 'application/pdf' });
      const invalidFile = new File(['content'], 'test.exe', { type: 'application/x-executable' });
      
      expect(validateFile(validFile).isValid).toBe(true);
      expect(validateFile(invalidFile).isValid).toBe(false);
    });
  });

  describe('Required Field Validation', () => {
    it('should validate required fields', () => {
      expect(validateRequired('valid input')).toBe(true);
      expect(validateRequired('')).toBe(false);
      expect(validateRequired('   ')).toBe(false);
    });
  });
});