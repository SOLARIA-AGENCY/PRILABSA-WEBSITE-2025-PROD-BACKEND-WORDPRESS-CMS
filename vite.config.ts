import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    appType: 'spa',
    plugins: [
      react(),
    ],

    // Define constants to suppress runtime resolution warnings
    define: {
      __VITE_IS_MODERN__: true,
    },

    // The complex build configuration is removed.
    // The @cloudflare/vite-plugin handles the build process
    // to generate an output compatible with Cloudflare Pages.

  
    // Resolve optimizations
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@components': resolve(__dirname, 'src/components'),
        '@pages': resolve(__dirname, 'src/pages'),
        '@data': resolve(__dirname, 'src/data'),
        '@utils': resolve(__dirname, 'src/utils'),
        '@types': resolve(__dirname, 'src/types'),
      },
    },

    // Streamlined dependency optimization
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'leaflet',
        'react-leaflet',
      ],
      exclude: [
        'react-pageflip',
        '@testing-library/react',
        '@testing-library/jest-dom',
        'vitest',
        'pdfjs-dist',
      ],
    },

    // Asset handling configuration
    assetsInclude: ['**/*.woff', '**/*.woff2', '**/*.eot', '**/*.ttf', '**/*.svg', '**/*.gif', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.mp4', '**/*.webm', '**/*.ogg'],
    
    // Public directory configuration
    publicDir: 'public',
    
    // Build configuration for assets
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            // PDF worker chunk
            if (id.includes('pdf.worker.min.js')) {
              return 'pdf.worker';
            }
            
            // Node modules chunking
            if (id.includes('node_modules')) {
              // Large libraries get their own chunks
              if (id.includes('react') || id.includes('react-dom')) {
                return 'react';
              }
              if (id.includes('react-router')) {
                return 'react-router';
              }
              if (id.includes('leaflet')) {
                return 'leaflet';
              }
              if (id.includes('framer-motion')) {
                return 'framer-motion';
              }
              if (id.includes('react-i18next') || id.includes('i18next')) {
                return 'i18n';
              }
              if (id.includes('jspdf') || id.includes('html2canvas')) {
                return 'pdf-libs';
              }
              // Other vendor libraries
              return 'vendor';
            }
            
            // Product translations chunk (this is our largest data file)
            if (id.includes('product-translations')) {
              return 'product-translations';
            }
            
            // Split large components into separate chunks
            if (id.includes('src/pages/Cotizacion')) {
              return 'cotizacion';
            }
            if (id.includes('src/pages/ProductoDetalle')) {
              return 'producto-detalle';
            }
            if (id.includes('src/pages/DesignSystemPage')) {
              return 'design-system';
            }
            if (id.includes('src/pages/OficinasMap')) {
              return 'oficinas-map';
            }
          },
          assetFileNames: (assetInfo) => {
            // Exclude large PDF files from asset bundling
            if (assetInfo.name?.endsWith('.pdf')) {
              return 'excluded/[name][extname]';
            }
            if (assetInfo.name?.endsWith('.gif')) {
              return 'assets/slick/[name][extname]';
            }
            if (assetInfo.name?.match(/\.(woff|woff2|eot|ttf|svg)$/)) {
              return 'assets/slick/fonts/[name][extname]';
            }
            // Keep product images with original names (no hash)
            if (assetInfo.name?.includes('productos/') || assetInfo.name?.match(/^(AD|AL|EQ|PB|QU)\d+_/)) {
              return 'assets/images/productos/[name][extname]';
            }
            // Keep placeholder images with original names
            if (assetInfo.name?.includes('placeholder-')) {
              return 'assets/images/[name][extname]';
            }
            return 'assets/[name]-[hash][extname]';
          }
        }
      },
      target: 'esnext',
      sourcemap: false,
      // Increase chunk size warning limit for large but necessary chunks
      chunkSizeWarningLimit: 1000,
      // Enable compression
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      }
    },

    // Dev server optimization
    server: {
      port: 5174,
      hmr: {
        overlay: false,
      },
      host: true,
      headers: {
        'Cross-Origin-Embedder-Policy': 'unsafe-none',
        'Cross-Origin-Opener-Policy': 'unsafe-none',
      },
      fs: {
        strict: false,
      },
    },

    // Test configuration
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/test-setup.ts'],
      testTimeout: 30000,
      hookTimeout: 30000,
      teardownTimeout: 10000,
      silent: true
    },

  };
});