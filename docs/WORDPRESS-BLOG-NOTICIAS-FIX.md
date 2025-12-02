# WordPress Blog/Noticias Integration Fix

**Date:** 2025-12-02
**Last Updated:** 2025-12-02
**Status:** ✅ Complete
**Routes:** `/blog`, `/noticias`, `/blog/:id`, `/noticias/:id`

## Problem

The blog/noticias routes were showing errors because WordPress API returns posts in a different format than the React components expected.

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
   - Updated `useNoticias()` hook for list page transformation
   - Updated `useNoticia(id)` hook for detail page transformation
   - Updated `useBlogPost(id)` hook for detail page transformation

### Test Files Created

1. **`src/services/__tests__/useNoticias.test.ts`** (17 tests)
   - Tests for `stripHtmlTags()` HTML stripping
   - Tests for `toMultiLang()` content transformation
   - Tests for `transformWordPressPost()` full transformation
   - Integration tests for list page components
   - Integration tests for detail page components (NoticiaPage, ArticlePage)

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
# Test list pages
curl -I https://productos.prilabsa.com/blog      # HTTP 200
curl -I https://productos.prilabsa.com/noticias  # HTTP 200

# Test detail pages
curl -I https://productos.prilabsa.com/blog/1    # HTTP 200
curl -I https://productos.prilabsa.com/noticias/1 # HTTP 200

# Verify WordPress API
curl https://productos.prilabsa.com/wp-json/wp/v2/posts?_embed
curl https://productos.prilabsa.com/wp-json/wp/v2/posts/1?_embed

# Run tests
npx vitest run src/services/__tests__/useNoticias.test.ts
# Expected: 17 tests passed
```

## Related Files

### Pages
- `src/pages/Blog.tsx` - Uses `useBlog()` hook (list)
- `src/pages/Noticias.tsx` - Uses `useNoticias()` hook (list)
- `src/pages/ArticlePage.tsx` - Uses `useBlogPost(id)` hook (detail)
- `src/pages/NoticiaPage.tsx` - Uses `useNoticia(id)` hook (detail)

### Types & Components
- `src/types/blog.ts` - `BlogArticle`, `MultiLanguageContent` interfaces
- `src/components/organisms/blog/ArticleCard.tsx` - Renders article cards

### Hooks
- `src/hooks/useBlog.ts` - List hook for /blog
- `src/services/wordpressApi.ts` - All other WordPress hooks
