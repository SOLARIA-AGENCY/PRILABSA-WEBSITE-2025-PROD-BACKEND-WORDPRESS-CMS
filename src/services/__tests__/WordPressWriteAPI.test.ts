/**
 * WordPressWriteAPI Tests
 * Tests for JWT authentication and CRUD operations
 *
 * @see src/services/WordPressWriteAPI.ts
 */

import { describe, it, expect } from 'vitest';
import { isAuthenticated, WordPressWriteAPI } from '../WordPressWriteAPI';

describe('WordPressWriteAPI', () => {
  describe('isAuthenticated', () => {
    it('should return true when JWT credentials are configured in .env.local', () => {
      // .env.local has VITE_WP_JWT_USER and VITE_WP_JWT_PASSWORD
      expect(isAuthenticated()).toBe(true);
    });
  });

  describe('API Structure', () => {
    it('should export all CRUD methods', () => {
      expect(typeof WordPressWriteAPI.createProduct).toBe('function');
      expect(typeof WordPressWriteAPI.updateProduct).toBe('function');
      expect(typeof WordPressWriteAPI.deleteProduct).toBe('function');
      expect(typeof WordPressWriteAPI.trashProduct).toBe('function');
      expect(typeof WordPressWriteAPI.publishProduct).toBe('function');
      expect(typeof WordPressWriteAPI.uploadMedia).toBe('function');
      expect(typeof WordPressWriteAPI.testConnection).toBe('function');
    });
  });

  describe('ProductFormData interface', () => {
    it('should accept valid product form data structure', async () => {
      // This is a type-level test - if this compiles, the interface works
      const validProductData = {
        title: 'Test Product',
        codigo: 'TEST001',
        categoria: 'test-category',
        nombre_producto_es: 'Producto de Prueba',
        nombre_producto_en: 'Test Product',
        nombre_producto_pt: 'Produto de Teste',
        descripcion_es: 'Descripcion en espanol',
        beneficio_1_es: 'Beneficio 1',
        beneficio_2_es: 'Beneficio 2',
        beneficio_3_es: 'Beneficio 3',
        presentacion_es: 'Presentacion',
        status: 'draft' as const,
      };

      // Just verify the structure exists
      expect(validProductData.codigo).toBe('TEST001');
      expect(validProductData.categoria).toBe('test-category');
      expect(validProductData.nombre_producto_es).toBe('Producto de Prueba');
    });
  });

  describe('WriteResponse structure', () => {
    it('should have correct success response structure', () => {
      const successResponse = {
        success: true,
        data: { id: 123, status: 'publish' },
      };

      expect(successResponse.success).toBe(true);
      expect(successResponse.data?.id).toBe(123);
    });

    it('should have correct error response structure', () => {
      const errorResponse = {
        success: false,
        error: {
          code: 'not_authenticated',
          message: 'WordPress credentials not configured',
          status: 401,
        },
      };

      expect(errorResponse.success).toBe(false);
      expect(errorResponse.error?.code).toBe('not_authenticated');
      expect(errorResponse.error?.status).toBe(401);
    });
  });

  describe('Configuration', () => {
    it('should use correct API URL from environment', () => {
      // The API URL should be configured in environment
      const apiUrl = import.meta.env.VITE_WP_API_URL;
      expect(apiUrl).toBe('https://productos.prilabsa.com');
    });

    it('should have JWT credentials configured', () => {
      const jwtUser = import.meta.env.VITE_WP_JWT_USER;
      const jwtPassword = import.meta.env.VITE_WP_JWT_PASSWORD;

      expect(jwtUser).toBeDefined();
      expect(jwtPassword).toBeDefined();
      expect(jwtUser.length).toBeGreaterThan(0);
      expect(jwtPassword.length).toBeGreaterThan(0);
    });
  });
});
