# PRILABSA Headless WordPress - Integration Guide

**Author:** SOLARIA AGENCY - AGENT THETA
**Date:** 2025-11-04
**Project Phase:** Fase 3 - Frontend Integration

## Step-by-Step Integration

This guide walks you through integrating the WordPress REST API code into your existing React application.

---

## Step 1: Install Dependencies

Add the required npm packages:

```bash
npm install axios@^1.7.9 swr@^2.3.0
```

Verify existing dependencies (should already be installed):
- `react@^19.1.0`
- `react-dom@^19.1.0`
- `i18next@^25.3.2`
- `react-i18next@^15.2.3`

---

## Step 2: Copy Files to Your Project

Copy all files from `frontend-code/` to your project:

### A. Types

```bash
cp frontend-code/src/types/wordpress.ts YOUR_PROJECT/src/types/
```

### B. Services

```bash
cp frontend-code/src/services/wordpressApi.ts YOUR_PROJECT/src/services/
```

### C. Hooks

```bash
cp frontend-code/src/hooks/useProducts.ts YOUR_PROJECT/src/hooks/
cp frontend-code/src/hooks/useProduct.ts YOUR_PROJECT/src/hooks/
cp frontend-code/src/hooks/useCategories.ts YOUR_PROJECT/src/hooks/
cp frontend-code/src/hooks/useTags.ts YOUR_PROJECT/src/hooks/
```

### D. Utils

```bash
cp frontend-code/src/utils/productAdapter.ts YOUR_PROJECT/src/utils/
```

### E. Components

```bash
cp frontend-code/src/components/ProductCard.tsx YOUR_PROJECT/src/components/
cp frontend-code/src/components/ProductCategories.tsx YOUR_PROJECT/src/components/
cp frontend-code/src/components/LoadingSkeleton.tsx YOUR_PROJECT/src/components/
cp frontend-code/src/components/ErrorBoundary.tsx YOUR_PROJECT/src/components/
```

### F. Pages

```bash
cp frontend-code/src/pages/Productos.tsx YOUR_PROJECT/src/pages/
```

### G. Environment Files

```bash
cp frontend-code/.env.development YOUR_PROJECT/
cp frontend-code/.env.production YOUR_PROJECT/
```

---

## Step 3: Configure Environment

### Development

Edit `YOUR_PROJECT/.env.development`:

```env
# Local WordPress URL (adjust to your local setup)
VITE_API_BASE_URL=http://localhost/prilabsa-local/wp-json

# OR if using MAMP/XAMPP with custom port
# VITE_API_BASE_URL=http://localhost:8888/prilabsa-local/wp-json

# OR if using Local by Flywheel
# VITE_API_BASE_URL=http://prilabsa-local.local/wp-json
```

### Production

Edit `YOUR_PROJECT/.env.production`:

```env
# Production WordPress URL
VITE_API_BASE_URL=https://productos.prilabsa.com/wp-json
```

---

## Step 4: Update Import Paths (if needed)

If your project uses different import aliases, update them:

**Example:** If your project uses `@/` for `src/`:

Current imports:
```typescript
import { useProducts } from '../hooks/useProducts';
```

Update to:
```typescript
import { useProducts } from '@/hooks/useProducts';
```

Files to check:
- `src/pages/Productos.tsx`
- `src/components/ProductCard.tsx`
- `src/components/ProductCategories.tsx`

---

## Step 5: Verify TypeScript Configuration

Ensure `tsconfig.json` has strict mode enabled:

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "resolveJsonModule": true
  }
}
```

---

## Step 6: Update Router (if needed)

Add the new Productos page to your router:

```tsx
// src/App.tsx or src/router.tsx
import Productos from './pages/Productos';

// React Router v6+
<Routes>
  <Route path="/productos" element={<Productos />} />
  {/* ... other routes */}
</Routes>
```

---

## Step 7: Verify WordPress Backend

### A. Check REST API Access

```bash
# Test base endpoint
curl http://localhost/prilabsa-local/wp-json/

# Test products endpoint
curl http://localhost/prilabsa-local/wp-json/wp/v2/productos

# Test with embed (should return full data with images)
curl http://localhost/prilabsa-local/wp-json/wp/v2/productos?_embed=true&per_page=5
```

### B. Verify Custom Post Type

In WordPress admin, check:
1. Products exist: `wp-admin/edit.php?post_type=productos`
2. REST API enabled: Check post type registration has `'show_in_rest' => true`

### C. Verify ACF Fields

Required ACF fields (9 total):
- `codigo` (text)
- `nombre_producto_es` (text)
- `nombre_producto_en` (text)
- `nombre_producto_pt` (text)
- `descripcion_es` (wysiwyg)
- `descripcion_en` (wysiwyg)
- `descripcion_pt` (wysiwyg)
- `fotos` (gallery - returns array of media IDs)
- `pdf` (file - returns media ID)

**Important:** All ACF fields must have "Show in REST API" enabled.

### D. Verify Taxonomies

Required taxonomies:
- `categorias-productos` (category-like)
- `tags-productos` (tag-like)

Both must have `'show_in_rest' => true` in registration.

---

## Step 8: Test the Integration

### A. Start Development Server

```bash
npm run dev
```

### B. Navigate to Products Page

Open browser: `http://localhost:3000/productos`

### C. Check Browser Console

Should see:
```
[API Request] GET /wp/v2/productos?per_page=100&_embed=true&status=publish&orderby=title&order=asc
[API Response] /wp/v2/productos { status: 200, data: [...] }
```

### D. Verify Data Loading

You should see:
- ✅ Products grid displays
- ✅ Product images load
- ✅ Category filters appear
- ✅ Search bar works
- ✅ No console errors

---

## Step 9: Handle CORS (if needed)

If frontend and WordPress are on different domains, configure CORS:

### WordPress (functions.php)

```php
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        $allowed_origin = 'http://localhost:3000'; // Dev
        // $allowed_origin = 'https://www.prilabsa.com'; // Prod

        header("Access-Control-Allow-Origin: $allowed_origin");
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Authorization, Content-Type');

        return $value;
    });
}, 15);
```

### Apache (.htaccess)

If WordPress on Apache, add to `.htaccess`:

```apache
<IfModule mod_headers.c>
    SetEnvIf Origin "http(s)?://(localhost:3000|www\.prilabsa\.com)$" AccessControlAllowOrigin=$0
    Header always set Access-Control-Allow-Origin %{AccessControlAllowOrigin}e env=AccessControlAllowOrigin
    Header always set Access-Control-Allow-Methods "GET, POST, OPTIONS"
    Header always set Access-Control-Allow-Headers "Authorization, Content-Type"
</IfModule>
```

---

## Step 10: Migration Strategy (Gradual)

If you have existing static product data, migrate gradually:

### Phase 1: Parallel Mode (Recommended)

Keep both static and API data working:

```typescript
// src/pages/Productos.tsx
const USE_API = import.meta.env.VITE_USE_API === 'true';

function Productos() {
  // API data
  const { products: apiProducts, isLoading } = useProducts();

  // Static data (fallback)
  const staticProducts = julioProducts;

  // Use API if enabled and loaded, else use static
  const products = USE_API && !isLoading ? apiProducts : staticProducts;

  // ... rest of component
}
```

### Phase 2: API-First with Static Fallback

```typescript
const { products: apiProducts, isError } = useProducts();
const products = isError ? staticProducts : apiProducts;
```

### Phase 3: API Only

Remove all static data imports and use API exclusively.

---

## Step 11: Add to Navigation

Update your navigation component:

```tsx
// src/components/Header.tsx or Navigation.tsx
<nav>
  <Link to="/productos">
    {t('nav.products', 'Productos')}
  </Link>
</nav>
```

---

## Step 12: Optimize Images (Optional)

### A. Add Placeholder Image

Create `public/images/placeholder-product.jpg`

Or update `productAdapter.ts`:

```typescript
export function getPlaceholderImageUrl(): string {
  return '/path/to/your/placeholder.jpg';
}
```

### B. Configure WordPress Image Sizes

In WordPress, add custom image sizes for products:

```php
// functions.php
add_image_size('product-card', 400, 400, true);
add_image_size('product-detail', 800, 800, false);

// Make available in REST API
add_filter('rest_prepare_attachment', function($response, $post, $request) {
    $sizes = $response->data['media_details']['sizes'];
    if (isset($sizes['product-card'])) {
        $response->data['product_card_url'] = $sizes['product-card']['source_url'];
    }
    return $response;
}, 10, 3);
```

---

## Step 13: Production Deployment

### Build for Production

```bash
# Type check
npm run type-check

# Build
npm run build
```

### Deploy to Server

```bash
# Example: SOLARIA AGENCY Demo Server
scp -r dist/* root@46.62.222.138:/var/www/react-apps/prilabsa-productos/
```

### Update Environment

Ensure production server uses `.env.production`:

```env
VITE_API_BASE_URL=https://productos.prilabsa.com/wp-json
```

---

## Troubleshooting

### Issue 1: "Cannot find module 'axios'"

**Solution:**
```bash
npm install axios swr
```

### Issue 2: "Network Error" in console

**Solutions:**
1. Check WordPress is running: `curl http://localhost/wp-json/`
2. Verify `VITE_API_BASE_URL` in `.env.development`
3. Check CORS configuration if cross-domain

### Issue 3: Products array is empty

**Solutions:**
1. Verify products exist: `curl http://localhost/wp-json/wp/v2/productos`
2. Check products are published (not draft)
3. Verify custom post type has `show_in_rest: true`

### Issue 4: Images not showing

**Solutions:**
1. Check `_embed=true` parameter is being sent
2. Verify media IDs exist in WordPress
3. Check media URLs are absolute
4. Verify ACF gallery field returns array of IDs

### Issue 5: ACF fields are null/undefined

**Solutions:**
1. In ACF, enable "Show in REST API" for all field groups
2. Verify field names match exactly (case-sensitive)
3. Check REST API response: `curl http://localhost/wp-json/wp/v2/productos/123`
4. Field should appear in `acf` object in response

### Issue 6: TypeScript errors

**Solutions:**
1. Run `npm run type-check` to see specific errors
2. Ensure `tsconfig.json` has `strict: true`
3. Check all imports are correct
4. Verify `wordpress.ts` types file exists

---

## Performance Checklist

After integration, verify:

- [ ] SWR caching is working (check Network tab - no duplicate requests)
- [ ] Images lazy load (check as you scroll)
- [ ] Bundle size is reasonable (< 500KB gzipped)
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 2s
- [ ] Time to Interactive < 3s

---

## Next Steps

1. **Add Product Detail Page**
   - Create `src/pages/ProductDetail.tsx`
   - Use `useProduct(id)` hook
   - Display full product info, image gallery, PDF download

2. **Add Pagination**
   - Use `useProductsPaginated` hook
   - Add page navigation controls
   - Update URL with page number

3. **Add Advanced Filters**
   - Filter by multiple categories
   - Filter by tags
   - Filter by brand
   - Price range slider (if applicable)

4. **Add Product Comparison**
   - Allow selecting multiple products
   - Show side-by-side comparison
   - Export comparison as PDF

5. **Add Shopping Cart** (if e-commerce)
   - Add "Add to Cart" button
   - Integrate with e-commerce backend
   - Checkout flow

---

## Support

For issues or questions:

- **Technical:** SOLARIA AGENCY Development Team
- **WordPress:** Check backend configuration
- **Frontend:** Review browser console and Network tab

---

**Generated by:** AGENT THETA (Frontend Specialist)
**Methodology:** SOLARIA Agency Autonomous Development
**Date:** 2025-11-04
