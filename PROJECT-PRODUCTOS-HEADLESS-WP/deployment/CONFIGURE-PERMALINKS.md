# WordPress Permalinks Configuration Guide

**Status:** 🟡 PENDING USER ACTION
**Priority:** HIGH (Blocks REST API functionality)
**Time Required:** 2 minutes

---

## Problem

WordPress REST API returns HTTP 404 when accessed via `/wp-json/`.

**Root Cause:** WordPress installed with "Plain" permalinks (default), which disables pretty URLs.

---

## Evidence

```bash
# Works (plain permalinks)
curl https://productos.prilabsa.com/?rest_route=/
# HTTP 200 ✅

# Fails (pretty permalinks not enabled)
curl https://productos.prilabsa.com/wp-json/
# HTTP 404 ✗
```

---

## Solution: Enable Pretty Permalinks

### Steps to Configure

1. **Access WordPress Admin**
   ```
   URL: https://productos.prilabsa.com/wp-admin/
   ```

2. **Navigate to Permalinks Settings**
   - Login with admin credentials
   - Go to: **Settings → Permalinks** (Ajustes → Enlaces permanentes)

3. **Select "Post name" Structure**
   - Choose: ◉ **Post name** (Nombre de la entrada)
   - This will set permalink structure to: `/%postname%/`

4. **Save Changes**
   - Click "Save Changes" (Guardar cambios)
   - WordPress will automatically update `.htaccess` with rewrite rules

5. **Verify REST API**
   ```bash
   curl https://productos.prilabsa.com/wp-json/
   # Should return JSON (not HTML)
   ```

---

## Alternative: Manual .htaccess Update

If automatic permalink configuration fails, manually add to `.htaccess`:

```apache
# BEGIN WordPress
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
</IfModule>
# END WordPress
```

**Important:** This should be added BEFORE the React SPA routing rules.

---

## Expected Outcome

After configuration:

```
✅ https://productos.prilabsa.com/wp-json/
   → Returns WordPress REST API root (JSON)

✅ https://productos.prilabsa.com/wp-json/wp/v2/
   → Returns WordPress API endpoints (JSON)

✅ https://productos.prilabsa.com/productos
   → React frontend still works (preserved)
```

---

## Verification Commands

```bash
# Test REST API root
curl -sI https://productos.prilabsa.com/wp-json/ | grep "HTTP/2"
# Expected: HTTP/2 200

# Test WordPress endpoints
curl -s https://productos.prilabsa.com/wp-json/wp/v2/ | jq '.routes' | head
# Expected: JSON with WordPress routes

# Test React frontend (should still work)
curl -sI https://productos.prilabsa.com/productos | grep "HTTP/2"
# Expected: HTTP/2 200
```

---

## Troubleshooting

### Issue: "Save Changes" Does Nothing

**Cause:** GoDaddy may have restricted `.htaccess` writing

**Solution:** Manually create WordPress `.htaccess` section via FTP

### Issue: REST API Still Returns 404

**Cause:** Server mod_rewrite not enabled

**Solution:** Contact GoDaddy support to enable `mod_rewrite` module

### Issue: React Frontend Stops Working

**Cause:** WordPress rewrites conflicting with React routing

**Solution:** Ensure WordPress rules come BEFORE React SPA rules in `.htaccess`

---

## Next Steps After Configuration

1. ✅ Verify REST API at `/wp-json/`
2. ✅ Test WordPress endpoints (`/wp-json/wp/v2/`)
3. ✅ Confirm React frontend still works
4. ✅ Run Phase 6 validation tests
5. ✅ Generate final deployment report

---

**Created:** 2025-11-26
**Last Updated:** 2025-11-26
**Status:** Waiting for user action
