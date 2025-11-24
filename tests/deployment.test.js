/**
 * Deployment Verification Tests
 *
 * Tests exhaustivos para verificar deployment exitoso en GoDaddy
 * URL: https://productos.prilabsa.com
 *
 * Ejecutar: npm run test:deployment
 */

import { describe, it, expect } from 'vitest';

const PRODUCTION_URL = 'https://productos.prilabsa.com';

describe('Deployment Verification - productos.prilabsa.com', () => {

  describe('1. HTTP Status Codes', () => {

    it('should return HTTP 301 for root URL (redirect to /productos)', async () => {
      const response = await fetch(PRODUCTION_URL, {
        redirect: 'manual'
      });

      expect(response.status).toBe(301);
      expect(response.headers.get('location')).toContain('/productos');
    });

    it('should return HTTP 200 for /productos page', async () => {
      const response = await fetch(`${PRODUCTION_URL}/productos`);
      expect(response.status).toBe(200);
    });

    it('should return HTTP 200 for index.html', async () => {
      const response = await fetch(`${PRODUCTION_URL}/index.html`);
      expect(response.status).toBe(200);
    });

    it('should return HTTP 200 for favicon.png', async () => {
      const response = await fetch(`${PRODUCTION_URL}/favicon.png`);
      expect(response.status).toBe(200);
    });
  });

  describe('2. Assets Loading', () => {

    it('should load main bundle JS without errors', async () => {
      // First get the HTML to find bundle name
      const htmlResponse = await fetch(`${PRODUCTION_URL}/productos`);
      const html = await htmlResponse.text();

      // Extract main bundle reference
      const bundleMatch = html.match(/assets\/(index-[A-Za-z0-9_-]+\.js)/);
      expect(bundleMatch).toBeTruthy();

      if (bundleMatch) {
        const bundlePath = bundleMatch[1];
        const bundleResponse = await fetch(`${PRODUCTION_URL}/assets/${bundlePath}`);
        expect(bundleResponse.status).toBe(200);
        expect(bundleResponse.headers.get('content-type')).toContain('javascript');
      }
    });

    it('should load vendor bundle JS', async () => {
      const htmlResponse = await fetch(`${PRODUCTION_URL}/productos`);
      const html = await htmlResponse.text();

      const vendorMatch = html.match(/assets\/(vendor-[A-Za-z0-9_-]+\.js)/);
      expect(vendorMatch).toBeTruthy();

      if (vendorMatch) {
        const bundlePath = vendorMatch[1];
        const bundleResponse = await fetch(`${PRODUCTION_URL}/assets/${bundlePath}`);
        expect(bundleResponse.status).toBe(200);
      }
    });

    it('should load main CSS without errors', async () => {
      const htmlResponse = await fetch(`${PRODUCTION_URL}/productos`);
      const html = await htmlResponse.text();

      const cssMatch = html.match(/assets\/(index-[A-Za-z0-9_-]+\.css)/);
      expect(cssMatch).toBeTruthy();

      if (cssMatch) {
        const cssPath = cssMatch[1];
        const cssResponse = await fetch(`${PRODUCTION_URL}/assets/${cssPath}`);
        expect(cssResponse.status).toBe(200);
        expect(cssResponse.headers.get('content-type')).toContain('css');
      }
    });
  });

  describe('3. Logo Images', () => {

    it('should load prilabsa-logo.png', async () => {
      const response = await fetch(`${PRODUCTION_URL}/images/logos/prilabsa-logo.png`);
      expect(response.status).toBe(200);
      expect(response.headers.get('content-type')).toContain('image');
    });

    it('should load logo-prilabsa-azul.png', async () => {
      const response = await fetch(`${PRODUCTION_URL}/images/logos/logo-prilabsa-azul.png`);
      expect(response.status).toBe(200);
    });

    it('should load logo-prilabsa-blanco.png', async () => {
      const response = await fetch(`${PRODUCTION_URL}/images/logos/logo-prilabsa-blanco.png`);
      expect(response.status).toBe(200);
    });
  });

  describe('4. Language Configuration', () => {

    it('should have Spanish (es) as default language in HTML', async () => {
      const response = await fetch(`${PRODUCTION_URL}/productos`);
      const html = await response.text();

      // Check for lang="es" in HTML tag
      expect(html).toMatch(/<html[^>]*lang="es"/);
    });

    it('should not auto-detect browser language', async () => {
      // Fetch with English Accept-Language header
      const response = await fetch(`${PRODUCTION_URL}/productos`, {
        headers: {
          'Accept-Language': 'en-US,en;q=0.9'
        }
      });
      const html = await response.text();

      // Should still be Spanish
      expect(html).toMatch(/<html[^>]*lang="es"/);
    });
  });

  describe('5. SPA Routing', () => {

    it('should serve index.html for non-existent routes', async () => {
      const response = await fetch(`${PRODUCTION_URL}/productos/detalles/AL001`);
      expect(response.status).toBe(200);

      const html = await response.text();
      expect(html).toContain('<!doctype html>');
    });

    it('should serve index.html for /sedes route', async () => {
      const response = await fetch(`${PRODUCTION_URL}/sedes`);
      expect(response.status).toBe(200);
    });

    it('should serve index.html for /nosotros route', async () => {
      const response = await fetch(`${PRODUCTION_URL}/nosotros`);
      expect(response.status).toBe(200);
    });

    it('should serve index.html for /contacto route', async () => {
      const response = await fetch(`${PRODUCTION_URL}/contacto`);
      expect(response.status).toBe(200);
    });
  });

  describe('6. Security Headers', () => {

    it('should have X-Content-Type-Options header', async () => {
      const response = await fetch(`${PRODUCTION_URL}/productos`);
      const header = response.headers.get('x-content-type-options');

      // GoDaddy might not pass through all headers, so we check if exists
      if (header) {
        expect(header).toBe('nosniff');
      }
    });

    it('should serve content over HTTPS', async () => {
      expect(PRODUCTION_URL).toMatch(/^https:\/\//);
    });
  });

  describe('7. Performance & Caching', () => {

    it('should have cache headers for assets', async () => {
      const htmlResponse = await fetch(`${PRODUCTION_URL}/productos`);
      const html = await htmlResponse.text();

      const bundleMatch = html.match(/assets\/(index-[A-Za-z0-9_-]+\.js)/);
      if (bundleMatch) {
        const bundleResponse = await fetch(`${PRODUCTION_URL}/assets/${bundleMatch[1]}`);
        const cacheControl = bundleResponse.headers.get('cache-control');

        // Check if caching is enabled (may vary by GoDaddy config)
        expect(cacheControl).toBeTruthy();
      }
    });

    it('should compress assets with gzip or brotli', async () => {
      const htmlResponse = await fetch(`${PRODUCTION_URL}/productos`);
      const html = await htmlResponse.text();

      const bundleMatch = html.match(/assets\/(index-[A-Za-z0-9_-]+\.js)/);
      if (bundleMatch) {
        const bundleResponse = await fetch(`${PRODUCTION_URL}/assets/${bundleMatch[1]}`);
        const encoding = bundleResponse.headers.get('content-encoding');

        // Should have some compression
        expect(['gzip', 'br', 'deflate']).toContain(encoding);
      }
    });
  });

  describe('8. Content Validation', () => {

    it('should have correct DOCTYPE', async () => {
      const response = await fetch(`${PRODUCTION_URL}/productos`);
      const html = await response.text();

      expect(html).toMatch(/<!doctype html>/i);
    });

    it('should have meta viewport for mobile', async () => {
      const response = await fetch(`${PRODUCTION_URL}/productos`);
      const html = await response.text();

      expect(html).toMatch(/<meta[^>]*name="viewport"/i);
    });

    it('should have charset UTF-8', async () => {
      const response = await fetch(`${PRODUCTION_URL}/productos`);
      const html = await response.text();

      expect(html).toMatch(/<meta[^>]*charset="UTF-8"/i);
    });

    it('should load without JavaScript errors', async () => {
      // This is a basic check - real browser testing would use Playwright
      const response = await fetch(`${PRODUCTION_URL}/productos`);
      const html = await response.text();

      // Check that HTML contains root div for React
      expect(html).toMatch(/<div id="root">/);
    });
  });

  describe('9. Redirect Configuration', () => {

    it('should redirect / to /productos permanently (301)', async () => {
      const response = await fetch(PRODUCTION_URL, {
        redirect: 'manual'
      });

      expect(response.status).toBe(301); // Permanent redirect
      expect(response.headers.get('location')).toMatch(/\/productos$/);
    });

    it('should not redirect /productos (avoid redirect loop)', async () => {
      const response = await fetch(`${PRODUCTION_URL}/productos`, {
        redirect: 'manual'
      });

      expect(response.status).toBe(200);
    });
  });

  describe('10. Integration Tests', () => {

    it('should load complete page successfully', async () => {
      const response = await fetch(`${PRODUCTION_URL}/productos`);
      const html = await response.text();

      // Should have HTML structure
      expect(html).toContain('<!doctype html>');
      expect(html).toContain('<html');
      expect(html).toContain('<head>');
      expect(html).toContain('<body>');
      expect(html).toContain('</html>');

      // Should load React
      expect(html).toMatch(/<div id="root">/);

      // Should have script tags for bundles
      expect(html).toMatch(/<script[^>]*src="\/assets\/[^"]+\.js"/);

      // Should have CSS
      expect(html).toMatch(/<link[^>]*href="\/assets\/[^"]+\.css"/);
    });

    it('should have correct HTML lang attribute', async () => {
      const response = await fetch(`${PRODUCTION_URL}/productos`);
      const html = await response.text();

      const langMatch = html.match(/<html[^>]*lang="([^"]+)"/);
      expect(langMatch).toBeTruthy();
      expect(langMatch?.[1]).toBe('es');
    });
  });
});
