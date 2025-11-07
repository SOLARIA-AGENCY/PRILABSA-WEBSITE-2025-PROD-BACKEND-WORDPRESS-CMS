# PRILABSA Headless WordPress - Frontend Integration

**Author:** SOLARIA AGENCY
**Project:** PRILABSA WordPress Headless Migration
**Version:** 1.0.0
**Date:** 2025-11-04

## Overview

This directory contains the complete frontend integration code for PRILABSA's headless WordPress product catalog. All code is production-ready, fully typed with TypeScript, and follows React 19 best practices.

## Technology Stack

- **React:** 19.1.0 (functional components + hooks)
- **TypeScript:** 5.3.3 (strict mode)
- **Vite:** 6.3.6 (build tool)
- **TailwindCSS:** 4.1.10 (utility-first styling)
- **Axios:** 1.7.9 (HTTP client)
- **SWR:** 2.3.0 (data fetching & caching)
- **i18next:** 25.3.2 (internationalization: es/en/pt)

## Architecture

### Directory Structure

```
frontend-code/
├── src/
│   ├── types/
│   │   └── wordpress.ts          # TypeScript interfaces for WP API
│   ├── services/
│   │   └── wordpressApi.ts       # Axios-based API client
│   ├── hooks/
│   │   ├── useProducts.ts        # SWR hook for products list
│   │   ├── useProduct.ts         # SWR hook for single product
│   │   ├── useCategories.ts      # SWR hook for categories
│   │   └── useTags.ts            # SWR hook for tags
│   ├── utils/
│   │   └── productAdapter.ts     # Transform WP data to app types
│   ├── components/
│   │   ├── ProductCard.tsx       # Product card component
│   │   ├── ProductCategories.tsx # Category filter component
│   │   ├── LoadingSkeleton.tsx   # Loading state component
│   │   └── ErrorBoundary.tsx     # Error boundary component
│   └── pages/
│       └── Productos.tsx         # Products page (modified)
├── .env.development              # Dev environment config
├── .env.production               # Prod environment config
├── .env.example                  # Example env config
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── vite.config.ts                # Vite config
└── README.md                     # This file
```

## Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env.development`:

```bash
cp .env.example .env.development
```

Edit `.env.development` and configure your local WordPress URL:

```env
VITE_API_BASE_URL=http://localhost/prilabsa-local/wp-json
```

### 3. Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:3000`.

## Environment Variables

### Development (`.env.development`)

```env
VITE_API_BASE_URL=http://localhost/prilabsa-local/wp-json
VITE_API_TIMEOUT=10000
VITE_ENABLE_CACHE=true
VITE_DEBUG=true
```

### Production (`.env.production`)

```env
VITE_API_BASE_URL=https://productos.prilabsa.com/wp-json
VITE_API_TIMEOUT=15000
VITE_ENABLE_CACHE=true
VITE_DEBUG=false
```

## WordPress REST API Endpoints

The integration uses the following WordPress endpoints:

### Products
- `GET /wp/v2/productos` - List all products
- `GET /wp/v2/productos/{id}` - Get single product
- `GET /wp/v2/productos?slug={slug}` - Get product by slug

### Taxonomies
- `GET /wp/v2/categorias-productos` - List all categories
- `GET /wp/v2/categorias-productos/{id}` - Get single category
- `GET /wp/v2/tags-productos` - List all tags
- `GET /wp/v2/tags-productos/{id}` - Get single tag

### Media
- `GET /wp/v2/media/{id}` - Get media file

### Custom Endpoints (Optional)
- `GET /prilabsa/v1/productos/search?s={query}` - Custom search

## Usage Examples

### 1. Fetch Products List

```tsx
import { useProducts } from '@/hooks/useProducts';

function ProductsList() {
  const { products, isLoading, isError } = useProducts({
    per_page: 20,
    orderby: 'title',
    order: 'asc'
  });

  if (isLoading) return <LoadingSkeleton />;
  if (isError) return <ErrorMessage />;

  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### 2. Fetch Single Product

```tsx
import { useProduct } from '@/hooks/useProduct';

function ProductDetail({ productId }) {
  const { product, isLoading, isError } = useProduct(productId);

  if (isLoading) return <LoadingSkeleton count={1} />;
  if (isError) return <ErrorMessage />;
  if (!product) return <NotFound />;

  return <div>{product.nombre}</div>;
}
```

### 3. Filter by Category

```tsx
import { useProductsByCategory } from '@/hooks/useProducts';

function CategoryProducts({ categoryId }) {
  const { products, isLoading } = useProductsByCategory(categoryId, {
    per_page: 20
  });

  return <ProductGrid products={products} />;
}
```

### 4. Search Products

```tsx
import { useSearchProducts } from '@/hooks/useProducts';

function SearchResults({ query }) {
  const { products, isLoading } = useSearchProducts(query, {
    per_page: 20
  });

  return <ProductGrid products={products} />;
}
```

## Data Transformation

WordPress API responses are automatically transformed to app-friendly types:

**WordPress API Response:**
```json
{
  "id": 123,
  "title": { "rendered": "Producto" },
  "acf": {
    "codigo": "PRI-001",
    "nombre_producto_es": "Microscopio",
    "descripcion_es": "<p>Descripción HTML</p>",
    "fotos": [456, 789],
    "pdf": 999
  }
}
```

**Transformed App Type:**
```typescript
{
  id: 123,
  codigo: "PRI-001",
  nombre: "Microscopio",
  descripcion: "<p>Descripción HTML</p>",
  imagenes: ["http://example.com/image1.jpg", "http://example.com/image2.jpg"],
  pdfUrl: "http://example.com/file.pdf",
  slug: "microscopio",
  marca: "PASCO",
  categorias: [{ id: 5, name: "Física", slug: "fisica" }],
  tags: [],
  fechaCreacion: "2025-01-15T10:00:00",
  fechaModificacion: "2025-01-20T15:30:00"
}
```

## Internationalization (i18n)

The adapter automatically selects localized fields based on current language:

```typescript
// Spanish (default)
nombre: product.acf.nombre_producto_es
descripcion: product.acf.descripcion_es

// English
nombre: product.acf.nombre_producto_en
descripcion: product.acf.descripcion_en

// Portuguese
nombre: product.acf.nombre_producto_pt
descripcion: product.acf.descripcion_pt
```

## Caching Strategy (SWR)

All hooks use SWR for intelligent caching:

- **Deduplication:** Multiple components requesting same data = 1 API call
- **Revalidation:** Automatic background updates
- **Error Retry:** Automatic retry with exponential backoff
- **Optimistic UI:** Keep previous data while fetching new data

### Cache Configuration

```typescript
// Products cache: 5 seconds deduplication
revalidateOnFocus: false
dedupingInterval: 5000

// Categories cache: 30 seconds deduplication (rarely changes)
revalidateOnFocus: false
dedupingInterval: 30000
```

## Error Handling

All API calls have comprehensive error handling:

1. **Network Errors:** Connection issues, timeouts
2. **HTTP Errors:** 404, 500, etc.
3. **WordPress API Errors:** Structured error responses
4. **Component Errors:** React Error Boundary

Example:
```typescript
const { products, isError, error } = useProducts();

if (isError) {
  console.log(error.message);  // User-friendly message
  console.log(error.code);      // Error code
  console.log(error.status);    // HTTP status code
}
```

## Performance Optimization

### Code Splitting
Vite automatically splits vendor chunks:
- `react-vendor.js` - React, React DOM, React Router
- `api-vendor.js` - Axios, SWR
- `i18n-vendor.js` - i18next, react-i18next

### Image Optimization
- Lazy loading with `loading="lazy"`
- Responsive images via WordPress media sizes
- Fallback placeholder images
- Error handling for missing images

### API Optimization
- Request deduplication (SWR)
- Cache-Control headers
- Pagination support
- Embedded resources (`_embed=true`)

## Build for Production

```bash
# Type check
npm run type-check

# Lint
npm run lint

# Build
npm run build

# Preview production build
npm run preview
```

The production build will be in `dist/` directory.

## Deployment

### Option 1: Static Hosting (Recommended)

Deploy `dist/` to:
- Vercel
- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront

### Option 2: Server (Apache/Nginx)

Copy `dist/` to server:

```bash
# Example: SOLARIA AGENCY Demo Server
scp -r dist/* root@46.62.222.138:/var/www/react-apps/prilabsa-productos/
```

Configure Apache/Nginx to serve SPA:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## WordPress Backend Requirements

Ensure your WordPress backend has:

1. **Custom Post Type:** `productos` registered
2. **Taxonomies:** `categorias-productos`, `tags-productos`
3. **ACF Fields:** All 9 fields configured (see types/wordpress.ts)
4. **REST API:** Enabled and accessible
5. **CORS:** Configured if frontend is on different domain

### CORS Configuration (if needed)

Add to WordPress `functions.php`:

```php
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        return $value;
    });
});
```

## Troubleshooting

### Issue: "Network Error" or "Connection Refused"

**Solution:** Check `VITE_API_BASE_URL` in `.env.development`:
```bash
# Verify WordPress is running
curl http://localhost/prilabsa-local/wp-json/wp/v2

# Update .env.development with correct URL
VITE_API_BASE_URL=http://localhost/prilabsa-local/wp-json
```

### Issue: Products not loading

**Solution:**
1. Check WordPress REST API is accessible
2. Verify custom post type has `show_in_rest: true`
3. Check browser console for errors
4. Verify ACF fields are registered in REST API

### Issue: Images not displaying

**Solution:**
1. Check media IDs exist in WordPress
2. Verify `_embed=true` parameter is working
3. Check media URLs are absolute (not relative)
4. Verify CORS if images on different domain

## Testing

### Manual Testing Checklist

- [ ] Products list loads correctly
- [ ] Categories filter works
- [ ] Search functionality works
- [ ] Single product detail loads
- [ ] Images display correctly
- [ ] PDF download links work
- [ ] Loading states show properly
- [ ] Error states show properly
- [ ] Language switching works (es/en/pt)
- [ ] Responsive design works (mobile/tablet/desktop)

### API Health Check

```bash
# Test WordPress API
curl http://localhost/prilabsa-local/wp-json/wp/v2/productos

# Test categories
curl http://localhost/prilabsa-local/wp-json/wp/v2/categorias-productos

# Test single product
curl http://localhost/prilabsa-local/wp-json/wp/v2/productos/123
```

## Migration from Static Data

To migrate existing `src/data/products/julio-2025.ts`:

1. Keep static data as fallback
2. Add feature flag in `.env`:
   ```env
   VITE_USE_STATIC_DATA=false
   ```
3. Update `Productos.tsx` to conditionally use API or static data
4. Test thoroughly before removing static data

## Support & Documentation

- **WordPress REST API Docs:** https://developer.wordpress.org/rest-api/
- **ACF REST API:** https://www.advancedcustomfields.com/resources/rest-api/
- **SWR Docs:** https://swr.vercel.app/
- **Axios Docs:** https://axios-http.com/

## License

Proprietary - PRILABSA / SOLARIA AGENCY

---

**Generated by:** AGENT THETA (Frontend Specialist)
**Project:** PRILABSA WordPress Headless Migration
**Methodology:** SOLARIA Agency Autonomous Development
