# JWT Authentication for WordPress REST API

## Overview

This document describes the JWT (JSON Web Token) authentication implementation for the WordPress REST API integration in the PRILABSA admin dashboard.

## Problem Statement

GoDaddy shared hosting blocks the standard HTTP `Authorization` header at the load balancer level, preventing WordPress Application Passwords from working. JWT authentication bypasses this limitation by using a plugin that explicitly handles authorization.

## Solution Architecture

### WordPress Configuration

**Plugin Required:** JWT Authentication for WP-API

**wp-config.php additions:**
```php
// Enable CORS for JWT
define('JWT_AUTH_CORS_ENABLE', true);

// Secret key for JWT signing (generate unique key for production)
define('JWT_AUTH_SECRET_KEY', 'your-unique-secret-key');
```

**.htaccess additions:**
```apache
# Pass Authorization header to PHP (required for JWT)
RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule .* - [E=HTTP_AUTHORIZATION:%1]
```

### Frontend Configuration

**Environment Variables (.env.local):**
```env
VITE_WP_API_URL=https://productos.prilabsa.com
VITE_WP_JWT_USER=<wordpress-username>
VITE_WP_JWT_PASSWORD=<wordpress-password>
```

## API Flow

### 1. Token Acquisition

```
POST /wp-json/jwt-auth/v1/token
Content-Type: application/x-www-form-urlencoded

username=<user>&password=<pass>

Response:
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "user_email": "user@example.com",
  "user_nicename": "admin",
  "user_display_name": "Admin"
}
```

### 2. Authenticated Requests

```
GET /wp-json/wp/v2/productos
Authorization: Bearer <jwt-token>
```

### 3. Token Caching

- Tokens are cached in memory with a 7-day expiry
- Token refresh occurs 5 minutes before expiry
- Token is automatically refreshed on authentication failure

## Implementation Details

### WordPressWriteAPI.ts

**Key Functions:**

| Function | Description |
|----------|-------------|
| `getJwtToken()` | Fetches and caches JWT token |
| `getAuthHeader()` | Returns Bearer token header |
| `isAuthenticated()` | Checks if credentials are configured |
| `authenticatedFetch()` | Makes authenticated API requests |

**CRUD Operations:**

| Method | HTTP Verb | Endpoint |
|--------|-----------|----------|
| `createProduct()` | POST | /wp-json/wp/v2/productos |
| `updateProduct()` | POST | /wp-json/wp/v2/productos/{id} |
| `trashProduct()` | DELETE | /wp-json/wp/v2/productos/{id} |
| `deleteProduct()` | DELETE | /wp-json/wp/v2/productos/{id}?force=true |
| `publishProduct()` | POST | /wp-json/wp/v2/productos/{id} |
| `uploadMedia()` | POST | /wp-json/wp/v2/media |

### Important Notes

1. **DELETE vs status:trash** - The WordPress custom post type (productos) does not allow `status: trash` as a valid value. Use DELETE method to move items to trash.

2. **POST vs PUT** - WordPress REST API prefers POST for updates over PUT.

3. **Token Expiry** - JWT tokens expire after 7 days. The implementation refreshes automatically.

## Error Handling

| Error Code | Description | HTTP Status |
|------------|-------------|-------------|
| `not_authenticated` | Credentials not configured | 401 |
| `jwt_failed` | Failed to obtain JWT token | 401 |
| `timeout` | Request timed out | 408 |
| `network_error` | Network/connection error | 0 |
| `rest_forbidden` | Permission denied | 403 |

## Testing

Tests are located at: `src/services/__tests__/WordPressWriteAPI.test.ts`

Run tests:
```bash
npm run test:run src/services/__tests__/WordPressWriteAPI.test.ts
```

## Security Considerations

1. **Never commit credentials** - Use .env.local (gitignored) for sensitive data
2. **Use strong JWT secret** - Generate a unique, random secret key
3. **HTTPS only** - All production requests must use HTTPS
4. **Token rotation** - Consider implementing token refresh endpoints for long sessions

## Troubleshooting

### "Authorization header not received"
- Check .htaccess has the HTTP_AUTHORIZATION rewrite rule
- Verify Apache mod_rewrite is enabled

### "Token expired"
- JWT tokens expire after 7 days
- Clear browser cache and localStorage
- Token will auto-refresh on next request

### "rest_forbidden"
- Verify WordPress user has correct capabilities
- Check user role has edit_productos permission

### "401 Unauthorized"
- Verify username/password in .env.local
- Check JWT plugin is activated in WordPress
- Verify JWT_AUTH_SECRET_KEY is set in wp-config.php

## References

- [JWT Authentication Plugin](https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/)
- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)
- [GoDaddy Authorization Header Issue](https://www.godaddy.com/help/authorization-header-not-received)
