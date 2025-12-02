# WordPress Blog/Noticias Integration Fix

**Date:** 2025-12-02
**Status:** ✅ Complete
**Routes:** `/blog`, `/noticias`

## Problem

The `/blog` and `/noticias` routes were showing errors because WordPress API returns posts in a different format than the React components expected.

### Root Cause
- **WordPress API returns:** `{ title: { rendered: string }, excerpt: { rendered: string } }`
- **Components expected:** `{ title: MultiLanguageContent, summary: MultiLanguageContent }`
- **MultiLanguageContent:** `{ es: string, en: string, pt: string }`

## Solution

Updated the hooks to transform WordPress posts to `BlogArticle` format:

### Files Modified

1. **`src/hooks/useBlog.ts`** (Complete Rewrite)
   - Added `WordPressPost` interface for API response typing
   - Added `stripHtml()` helper to clean WordPress HTML content
   - Added `createMultiLangContent()` to create `MultiLanguageContent` from string
   - Added `transformPost()` to convert WordPress post to `BlogArticle`

2. **`src/services/wordpressApi.ts`** (Updated)
   - Added `BlogArticle` and `MultiLanguageContent` imports from `types/blog`
   - Added `WordPressPost` interface
   - Added `stripHtmlTags()` helper function
   - Added `toMultiLang()` helper function
   - Added `transformWordPressPost()` function
   - Updated `useNoticias()` hook to use transformation

### Test Files Created

1. **`src/services/__tests__/useNoticias.test.ts`** (12 tests)
   - Tests for `stripHtmlTags()` HTML stripping
   - Tests for `toMultiLang()` content transformation
   - Tests for `transformWordPressPost()` full transformation
   - Integration tests for component compatibility

## Data Transformation

```typescript
// Input (WordPress API)
{
  id: 1,
  title: { rendered: "Hello world!" },
  excerpt: { rendered: "<p>Welcome to WordPress.</p>\n" },
  content: { rendered: "<p>Full post content...</p>" },
  date: "2025-11-14T11:42:45",
  _embedded: {
    author: [{ name: "admin" }],
    "wp:featuredmedia": [{ source_url: "https://..." }]
  }
}

// Output (BlogArticle)
{
  id: "1",
  title: { es: "Hello world!", en: "Hello world!", pt: "Hello world!" },
  summary: { es: "Welcome to WordPress.", en: "...", pt: "..." },
  content: { es: "Full post content...", en: "...", pt: "..." },
  date: "2025-11-14",
  author: { es: "admin", en: "admin", pt: "admin" },
  heroImage: "https://..." | "/assets/iniciodev/blue-texture-background.jpg",
  tags: { es: [], en: [], pt: [] }
}
```

## Verification

```bash
# Test routes
curl -I https://productos.prilabsa.com/blog      # HTTP 200
curl -I https://productos.prilabsa.com/noticias  # HTTP 200

# Verify WordPress API
curl https://productos.prilabsa.com/wp-json/wp/v2/posts?_embed

# Run tests
npx vitest run src/services/__tests__/useNoticias.test.ts
```

## Related Files

- `src/types/blog.ts` - `BlogArticle`, `MultiLanguageContent` interfaces
- `src/pages/Blog.tsx` - Uses `useBlog()` hook
- `src/pages/Noticias.tsx` - Uses `useNoticias()` hook
- `src/components/organisms/blog/ArticleCard.tsx` - Renders article cards
