# PRILABSA REST API Documentation

**Version:** 1.0.0
**Base URL:** `https://productos.prilabsa.com/wp-json`
**Last Updated:** 2025-11-04

---

## Table of Contents

1. [Authentication](#authentication)
2. [Standard WordPress Endpoints](#standard-wordpress-endpoints)
3. [Custom PRILABSA Endpoints](#custom-prilabsa-endpoints)
4. [Response Formats](#response-formats)
5. [Error Handling](#error-handling)
6. [Rate Limiting](#rate-limiting)
7. [CORS Policy](#cors-policy)
8. [Code Examples](#code-examples)

---

## Authentication

### Public Access (No Authentication Required)

All GET requests to product endpoints are publicly accessible. No authentication needed.

```bash
curl -X GET "https://productos.prilabsa.com/wp-json/prilabsa/v1/productos"
```

### JWT Authentication (Optional)

For protected endpoints or write operations, use JWT authentication.

**1. Obtain Token:**
```bash
curl -X POST "https://productos.prilabsa.com/wp-json/jwt-auth/v1/token" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "your_username",
    "password": "your_password"
  }'
```

**Response:**
```json
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user_email": "user@example.com",
  "user_nicename": "username",
  "user_display_name": "Display Name"
}
```

**2. Use Token in Requests:**
```bash
curl -X GET "https://productos.prilabsa.com/wp-json/wp/v2/productos" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc..."
```

---

## Standard WordPress Endpoints

### GET /wp/v2/productos

Get list of all productos using standard WordPress REST API.

**Endpoint:** `/wp/v2/productos`

**Method:** `GET`

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Current page number |
| `per_page` | integer | 10 | Items per page (max 100) |
| `search` | string | - | Search in title and content |
| `orderby` | string | date | Order by: date, title, modified |
| `order` | string | desc | Order: asc, desc |
| `categorias_productos` | integer | - | Filter by category taxonomy ID |
| `tags_productos` | integer | - | Filter by tag taxonomy ID |

**Example Request:**
```bash
curl -X GET "https://productos.prilabsa.com/wp-json/wp/v2/productos?per_page=5&orderby=title&order=asc"
```

**Example Response:**
```json
[
  {
    "id": 123,
    "date": "2025-11-04T10:30:00",
    "date_gmt": "2025-11-04T15:30:00",
    "modified": "2025-11-04T10:30:00",
    "modified_gmt": "2025-11-04T15:30:00",
    "slug": "combacid-xl",
    "status": "publish",
    "type": "productos",
    "link": "https://productos.prilabsa.com/productos/combacid-xl",
    "title": {
      "rendered": "Combacid XL"
    },
    "content": {
      "rendered": "<p>Es un producto en polvo usado como aditivo alimentario...</p>",
      "protected": false
    },
    "excerpt": {
      "rendered": "<p>Es un producto en polvo usado como aditivo...</p>",
      "protected": false
    },
    "featured_media": 456,
    "featured_image_url": "https://productos.prilabsa.com/wp-content/uploads/2025/11/AD001_COMBACID_XL.png",
    "featured_image_sizes": {
      "thumbnail": {
        "url": "https://productos.prilabsa.com/wp-content/uploads/2025/11/AD001_COMBACID_XL-150x150.png",
        "width": 150,
        "height": 150
      },
      "medium": {
        "url": "https://productos.prilabsa.com/wp-content/uploads/2025/11/AD001_COMBACID_XL-300x200.png",
        "width": 300,
        "height": 200
      },
      "large": {
        "url": "https://productos.prilabsa.com/wp-content/uploads/2025/11/AD001_COMBACID_XL-1024x683.png",
        "width": 1024,
        "height": 683
      },
      "full": {
        "url": "https://productos.prilabsa.com/wp-content/uploads/2025/11/AD001_COMBACID_XL.png",
        "width": 1920,
        "height": 1280
      }
    },
    "acf_fields": {
      "descripcion": "Es un producto en polvo usado como aditivo alimentario que inhibe agentes patógenos...",
      "especificaciones": [
        {
          "clave": "Ácido Fórmico Libre",
          "valor": "33% Mín."
        },
        {
          "clave": "Ácido Propiónico Libre",
          "valor": "10% Mín."
        }
      ],
      "beneficios": "Es un producto que al ser utilizado en el alimento actúa como un inhibidor...",
      "presentacion": "• 3kg en cubetas de plástico de 7L.\n• 4Kg en cubetas de plástico de 10L.",
      "categoria": "aditivos",
      "subcategoria": "Acidificantes",
      "codigo": "AD001",
      "fotos": [
        {
          "id": 457,
          "url": "https://productos.prilabsa.com/wp-content/uploads/2025/11/producto-1.png",
          "title": "Combacid XL - Vista 1",
          "alt": "Combacid XL producto",
          "width": 1200,
          "height": 800,
          "mime_type": "image/png"
        }
      ],
      "pdf": {
        "id": 458,
        "url": "https://productos.prilabsa.com/wp-content/uploads/2025/11/AD001_COMBACID_XL.PDF",
        "title": "Ficha Técnica Combacid XL",
        "filename": "AD001_COMBACID_XL.PDF",
        "filesize": 245678,
        "mime_type": "application/pdf"
      }
    },
    "_links": {
      "self": [
        {
          "href": "https://productos.prilabsa.com/wp-json/wp/v2/productos/123"
        }
      ]
    }
  }
]
```

**Response Headers:**
- `X-WP-Total: 105` - Total number of products
- `X-WP-TotalPages: 21` - Total number of pages
- `Link: <...>; rel="next"` - Pagination links

---

### GET /wp/v2/productos/{id}

Get single producto by ID.

**Endpoint:** `/wp/v2/productos/{id}`

**Method:** `GET`

**Parameters:**
- `id` (required): Product ID

**Example Request:**
```bash
curl -X GET "https://productos.prilabsa.com/wp-json/wp/v2/productos/123"
```

**Response:** Same structure as array item above.

---

### GET /wp/v2/categorias-productos

Get all product categories.

**Endpoint:** `/wp/v2/categorias-productos`

**Method:** `GET`

**Example Response:**
```json
[
  {
    "id": 5,
    "count": 12,
    "description": "",
    "link": "https://productos.prilabsa.com/categoria-producto/aditivos",
    "name": "Aditivos",
    "slug": "aditivos",
    "taxonomy": "categorias_productos",
    "parent": 0
  },
  {
    "id": 6,
    "count": 23,
    "name": "Alimentos",
    "slug": "alimentos"
  }
]
```

---

### GET /wp/v2/tags-productos

Get all product tags.

**Endpoint:** `/wp/v2/tags-productos`

**Method:** `GET`

**Example Response:**
```json
[
  {
    "id": 10,
    "count": 8,
    "name": "Acidificantes",
    "slug": "acidificantes",
    "taxonomy": "tags_productos"
  }
]
```

---

## Custom PRILABSA Endpoints

### GET /prilabsa/v1/productos

Enhanced product listing with optimized response format.

**Endpoint:** `/prilabsa/v1/productos`

**Method:** `GET`

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Current page |
| `per_page` | integer | 20 | Items per page (1-100) |
| `categoria` | string | - | Filter by category: aditivos, alimentos, equipos, probioticos, quimicos |
| `orderby` | string | date | Order by: date, title, modified, codigo |
| `order` | string | DESC | Order: ASC, DESC |
| `include_acf` | boolean | true | Include ACF fields in response |

**Example Request:**
```bash
curl -X GET "https://productos.prilabsa.com/wp-json/prilabsa/v1/productos?categoria=aditivos&per_page=10&orderby=codigo&order=ASC"
```

**Example Response:**
```json
[
  {
    "id": 123,
    "titulo": "Combacid XL",
    "slug": "combacid-xl",
    "contenido": "<p>Es un producto en polvo usado como aditivo alimentario...</p>",
    "excerpt": "Es un producto en polvo usado como aditivo...",
    "fecha": "2025-11-04 10:30:00",
    "modificado": "2025-11-04 10:30:00",
    "imagen_destacada": {
      "id": 456,
      "url": "https://productos.prilabsa.com/wp-content/uploads/2025/11/AD001_COMBACID_XL.png",
      "sizes": {
        "thumbnail": {
          "url": "https://...",
          "width": 150,
          "height": 150
        },
        "medium": {
          "url": "https://...",
          "width": 300,
          "height": 200
        },
        "large": {
          "url": "https://...",
          "width": 1024,
          "height": 683
        },
        "full": {
          "url": "https://...",
          "width": 1920,
          "height": 1280
        }
      }
    },
    "acf": {
      "descripcion": "Es un producto en polvo usado como aditivo alimentario...",
      "especificaciones": [
        {
          "clave": "Ácido Fórmico Libre",
          "valor": "33% Mín."
        }
      ],
      "beneficios": "Es un producto que al ser utilizado en el alimento...",
      "presentacion": "• 3kg en cubetas de plástico de 7L.",
      "categoria": "aditivos",
      "subcategoria": "Acidificantes",
      "codigo": "AD001",
      "fotos": [...],
      "pdf": {...}
    },
    "categorias_productos": ["Aditivos"],
    "tags_productos": ["Acidificantes", "Promotor de crecimiento"]
  }
]
```

**Response Headers:**
- `X-WP-Total: 12` - Filtered total
- `X-WP-TotalPages: 2` - Filtered pages
- `Cache-Control: public, max-age=300` - 5 minute cache

---

### GET /prilabsa/v1/productos/{identifier}

Get single product by ID or product code (codigo).

**Endpoint:** `/prilabsa/v1/productos/{identifier}`

**Method:** `GET`

**Parameters:**
- `identifier` (required): Product ID (numeric) or product code (alphanumeric)

**Example Request (by ID):**
```bash
curl -X GET "https://productos.prilabsa.com/wp-json/prilabsa/v1/productos/123"
```

**Example Request (by codigo):**
```bash
curl -X GET "https://productos.prilabsa.com/wp-json/prilabsa/v1/productos/AD001"
```

**Response:** Single product object (same structure as array item).

**Error Response (404):**
```json
{
  "code": "producto_not_found",
  "message": "Producto no encontrado",
  "data": {
    "status": 404
  }
}
```

---

### GET /prilabsa/v1/productos/search

Search products by query string.

**Endpoint:** `/prilabsa/v1/productos/search`

**Method:** `GET`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | Yes | Search term (min 2 characters) |
| `per_page` | integer | No | Results per page (default: 10, max: 100) |

**Example Request:**
```bash
curl -X GET "https://productos.prilabsa.com/wp-json/prilabsa/v1/productos/search?query=combacid&per_page=5"
```

**Example Response:**
```json
[
  {
    "id": 123,
    "titulo": "Combacid XL",
    "slug": "combacid-xl",
    "contenido": "...",
    "acf": {...},
    "imagen_destacada": {...}
  }
]
```

**Response Headers:**
- `X-WP-Total: 3` - Number of search results

**Validation Error (400):**
```json
{
  "code": "rest_invalid_param",
  "message": "Query must be at least 2 characters",
  "data": {
    "status": 400
  }
}
```

---

### GET /prilabsa/v1/productos/categoria/{categoria}

Get products filtered by main category.

**Endpoint:** `/prilabsa/v1/productos/categoria/{categoria}`

**Method:** `GET`

**Parameters:**
- `categoria` (required): One of: `aditivos`, `alimentos`, `equipos`, `probioticos`, `quimicos`
- `per_page` (optional): Results per page (default: 20)

**Example Request:**
```bash
curl -X GET "https://productos.prilabsa.com/wp-json/prilabsa/v1/productos/categoria/aditivos?per_page=15"
```

**Example Response:**
```json
[
  {
    "id": 123,
    "titulo": "Combacid XL",
    "acf": {
      "categoria": "aditivos",
      "codigo": "AD001"
    }
  },
  {
    "id": 124,
    "titulo": "Carophyll Pink",
    "acf": {
      "categoria": "aditivos",
      "codigo": "AD002"
    }
  }
]
```

**Error Response (Invalid category):**
```json
{
  "code": "rest_invalid_param",
  "message": "Invalid parameter(s): categoria",
  "data": {
    "status": 400,
    "params": {
      "categoria": "categoria is not one of aditivos, alimentos, equipos, probioticos, quimicos."
    }
  }
}
```

---

### GET /prilabsa/v1/productos/stats

Get catalog statistics and metadata.

**Endpoint:** `/prilabsa/v1/productos/stats`

**Method:** `GET`

**Parameters:** None

**Example Request:**
```bash
curl -X GET "https://productos.prilabsa.com/wp-json/prilabsa/v1/productos/stats"
```

**Example Response:**
```json
{
  "total_productos": 105,
  "por_categoria": {
    "aditivos": 12,
    "alimentos": 23,
    "equipos": 48,
    "probioticos": 4,
    "quimicos": 18
  },
  "ultima_actualizacion": "2025-11-04 10:30:00"
}
```

---

## Response Formats

### Product Object Structure

```typescript
interface Product {
  id: number;
  titulo: string;
  slug: string;
  contenido: string; // HTML
  excerpt: string;
  fecha: string; // ISO 8601
  modificado: string; // ISO 8601
  imagen_destacada: FeaturedImage | null;
  acf: ACFFields;
  categorias_productos: string[];
  tags_productos: string[];
}

interface FeaturedImage {
  id: number;
  url: string;
  sizes: {
    thumbnail: ImageSize;
    medium: ImageSize;
    medium_large: ImageSize;
    large: ImageSize;
    full: ImageSize;
  };
}

interface ImageSize {
  url: string;
  width: number;
  height: number;
}

interface ACFFields {
  descripcion: string;
  especificaciones: Specification[];
  beneficios: string;
  presentacion: string;
  categoria: 'aditivos' | 'alimentos' | 'equipos' | 'probioticos' | 'quimicos';
  subcategoria: string;
  codigo: string;
  fotos: GalleryImage[];
  pdf: PDFFile | null;
}

interface Specification {
  clave: string;
  valor: string;
}

interface GalleryImage {
  id: number;
  url: string;
  title: string;
  alt: string;
  width: number;
  height: number;
  mime_type: string;
}

interface PDFFile {
  id: number;
  url: string;
  title: string;
  filename: string;
  filesize: number;
  mime_type: string;
}
```

---

## Error Handling

### Standard Error Response

```json
{
  "code": "error_code",
  "message": "Human readable error message",
  "data": {
    "status": 400
  }
}
```

### Common Error Codes

| Status | Code | Message | Cause |
|--------|------|---------|-------|
| 400 | `rest_invalid_param` | Invalid parameter(s) | Invalid query parameters |
| 401 | `rest_forbidden` | Sorry, you are not allowed to do that | Missing/invalid authentication |
| 404 | `producto_not_found` | Producto no encontrado | Product doesn't exist |
| 404 | `rest_no_route` | No route was found matching the URL | Invalid endpoint |
| 500 | `internal_server_error` | Internal server error | Server-side error |

---

## Rate Limiting

### Limits

- **Anonymous requests:** 10 requests/second, burst: 20
- **Authenticated requests:** 50 requests/second, burst: 100

### Headers

When rate limited, you'll receive:

**Status:** `429 Too Many Requests`

**Headers:**
- `X-RateLimit-Limit: 10`
- `X-RateLimit-Remaining: 0`
- `X-RateLimit-Reset: 1699112400` (Unix timestamp)
- `Retry-After: 60` (seconds)

**Response:**
```json
{
  "code": "too_many_requests",
  "message": "Rate limit exceeded. Please try again later.",
  "data": {
    "status": 429
  }
}
```

---

## CORS Policy

### Allowed Origins (Production)

- `https://productos.prilabsa.com`
- `https://www.prilabsa.com`
- `https://app.prilabsa.com`

### CORS Headers

All API responses include:

```
Access-Control-Allow-Origin: https://www.prilabsa.com
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 86400
```

### Preflight Requests

OPTIONS requests are automatically handled:

```bash
curl -X OPTIONS "https://productos.prilabsa.com/wp-json/prilabsa/v1/productos" \
  -H "Access-Control-Request-Method: GET" \
  -H "Origin: https://app.prilabsa.com"
```

**Response:** `200 OK` with CORS headers

---

## Code Examples

### JavaScript / Fetch API

```javascript
// Get all productos
async function getProductos() {
  const response = await fetch('https://productos.prilabsa.com/wp-json/prilabsa/v1/productos?per_page=20');
  const data = await response.json();
  return data;
}

// Get single product by code
async function getProductByCode(codigo) {
  const response = await fetch(`https://productos.prilabsa.com/wp-json/prilabsa/v1/productos/${codigo}`);

  if (!response.ok) {
    throw new Error(`Product not found: ${codigo}`);
  }

  const data = await response.json();
  return data;
}

// Search products
async function searchProducts(query) {
  const url = new URL('https://productos.prilabsa.com/wp-json/prilabsa/v1/productos/search');
  url.searchParams.append('query', query);
  url.searchParams.append('per_page', 10);

  const response = await fetch(url);
  const data = await response.json();
  const total = response.headers.get('X-WP-Total');

  return { products: data, total: parseInt(total) };
}

// Get products by category
async function getProductsByCategory(categoria) {
  const response = await fetch(`https://productos.prilabsa.com/wp-json/prilabsa/v1/productos/categoria/${categoria}`);
  const data = await response.json();
  return data;
}

// Get stats
async function getStats() {
  const response = await fetch('https://productos.prilabsa.com/wp-json/prilabsa/v1/productos/stats');
  const data = await response.json();
  return data;
}
```

### React / Next.js

```jsx
import { useState, useEffect } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          'https://productos.prilabsa.com/wp-json/prilabsa/v1/productos?per_page=20&categoria=aditivos'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h2>{product.titulo}</h2>
          <p>Código: {product.acf.codigo}</p>
          {product.imagen_destacada && (
            <img src={product.imagen_destacada.sizes.medium.url} alt={product.titulo} />
          )}
        </div>
      ))}
    </div>
  );
}
```

### Python

```python
import requests

# Get all products
def get_products(page=1, per_page=20, categoria=None):
    url = "https://productos.prilabsa.com/wp-json/prilabsa/v1/productos"
    params = {
        'page': page,
        'per_page': per_page
    }

    if categoria:
        params['categoria'] = categoria

    response = requests.get(url, params=params)

    if response.status_code == 200:
        return {
            'products': response.json(),
            'total': int(response.headers.get('X-WP-Total', 0)),
            'total_pages': int(response.headers.get('X-WP-TotalPages', 0))
        }
    else:
        raise Exception(f"Error {response.status_code}: {response.text}")

# Get product by code
def get_product_by_code(codigo):
    url = f"https://productos.prilabsa.com/wp-json/prilabsa/v1/productos/{codigo}"
    response = requests.get(url)

    if response.status_code == 200:
        return response.json()
    elif response.status_code == 404:
        raise Exception(f"Product not found: {codigo}")
    else:
        raise Exception(f"Error {response.status_code}: {response.text}")

# Search products
def search_products(query, per_page=10):
    url = "https://productos.prilabsa.com/wp-json/prilabsa/v1/productos/search"
    params = {
        'query': query,
        'per_page': per_page
    }

    response = requests.get(url, params=params)

    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Error {response.status_code}: {response.text}")

# Example usage
if __name__ == "__main__":
    # Get aditivos products
    result = get_products(categoria='aditivos')
    print(f"Found {result['total']} aditivos")

    # Get specific product
    product = get_product_by_code('AD001')
    print(f"Product: {product['titulo']}")

    # Search
    search_result = search_products('combacid')
    print(f"Search found {len(search_result)} results")
```

### cURL Examples

```bash
# List all products
curl -X GET "https://productos.prilabsa.com/wp-json/prilabsa/v1/productos"

# Get products page 2, 10 per page
curl -X GET "https://productos.prilabsa.com/wp-json/prilabsa/v1/productos?page=2&per_page=10"

# Filter by category
curl -X GET "https://productos.prilabsa.com/wp-json/prilabsa/v1/productos?categoria=aditivos"

# Order by codigo ascending
curl -X GET "https://productos.prilabsa.com/wp-json/prilabsa/v1/productos?orderby=codigo&order=ASC"

# Get product by ID
curl -X GET "https://productos.prilabsa.com/wp-json/prilabsa/v1/productos/123"

# Get product by code
curl -X GET "https://productos.prilabsa.com/wp-json/prilabsa/v1/productos/AD001"

# Search
curl -X GET "https://productos.prilabsa.com/wp-json/prilabsa/v1/productos/search?query=combacid"

# Get category products
curl -X GET "https://productos.prilabsa.com/wp-json/prilabsa/v1/productos/categoria/aditivos"

# Get stats
curl -X GET "https://productos.prilabsa.com/wp-json/prilabsa/v1/productos/stats"

# With JWT authentication
TOKEN="your-jwt-token-here"
curl -X GET "https://productos.prilabsa.com/wp-json/prilabsa/v1/productos" \
  -H "Authorization: Bearer $TOKEN"

# Pretty print JSON response
curl -X GET "https://productos.prilabsa.com/wp-json/prilabsa/v1/productos/AD001" | jq '.'
```

---

## Versioning

Current API version: **v1**

All custom endpoints use the namespace `/prilabsa/v1/`.

Future versions will be released as `/prilabsa/v2/`, etc., maintaining backward compatibility with v1.

---

## Support

**Technical Support:** soporte@solaria.agency
**Documentation:** https://productos.prilabsa.com/api-docs
**Issue Tracker:** https://github.com/solaria-agency/prilabsa-api/issues

---

**Last Updated:** 2025-11-04
**Maintained by:** SOLARIA AGENCY
**License:** GPL v2 or later
