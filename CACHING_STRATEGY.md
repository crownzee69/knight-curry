# Browser Caching Strategy

This document explains how images and data are cached in the browser to improve performance and reduce server load.

## 🎯 Caching Implementation

### 1. **Static Assets (Images)**
- **Location**: `/assets/:path*`
- **Cache Strategy**: `public, max-age=31536000, immutable`
- **Duration**: 1 year (31,536,000 seconds)
- **Behavior**: 
  - Images are cached for 1 year
  - When you update an image, change the filename or path to force browsers to fetch the new version
  - Example: `image-1.webp` → `image-1-v2.webp` or update the path in `menuDetails.ts`

### 2. **Next.js Static Files**
- **Location**: `/_next/static/:path*`
- **Cache Strategy**: `public, max-age=31536000, immutable`
- **Duration**: 1 year
- **Behavior**: Next.js automatically handles cache-busting with file hashes

### 3. **Fonts**
- **Location**: `/fonts/:path*`
- **Cache Strategy**: `public, max-age=31536000, immutable`
- **Duration**: 1 year

### 4. **API Responses**
- **Location**: `/api/wall-of-fame-images`
- **Cache Strategy**: `public, s-maxage=3600, stale-while-revalidate=86400`
- **Duration**: 
  - Served from cache for 1 hour
  - Stale content served while revalidating for up to 24 hours
- **ETag Support**: Uses folder modification time for cache validation

### 5. **Service Worker**
- **Location**: `/sw.js`
- **Functionality**:
  - Caches images in browser storage
  - Automatically updates cache when images change (checks network first)
  - Falls back to cached version if network fails
  - Separate caches for images, data, and static assets

## 📝 How It Works

### Image Caching Flow:
1. **First Visit**: Browser downloads images and stores them in cache
2. **Subsequent Visits**: Browser serves images from cache (instant load)
3. **Image Update**: 
   - If filename/path changes → Browser fetches new image
   - If filename stays same → Browser uses cached version
   - Service Worker checks network in background and updates cache if image changed

### Data Caching Flow:
1. **Menu Data**: Bundled into JavaScript at build time (cached by Next.js)
2. **API Data**: Cached for 1 hour, revalidated in background
3. **Service Worker**: Stores API responses for offline access

## 🔄 Updating Images

When you update an image:

### Option 1: Change Filename (Recommended)
```typescript
// In menuDetails.ts
image: '/assets/menu/curries-veg/5.webp'  // Old
image: '/assets/menu/curries-veg/5-v2.webp'  // New - forces browser to fetch
```

### Option 2: Use Version Query (Alternative)
```typescript
image: '/assets/menu/curries-veg/5.webp?v=2'  // Add version query
```

### Option 3: Service Worker Auto-Update
- Service Worker checks network in background
- If image changed (different ETag/Last-Modified), cache is updated
- Users see new image on next page load

## 🛠️ Configuration Files

- **`next.config.js`**: Cache headers for static assets
- **`public/sw.js`**: Service Worker for advanced caching
- **`app/layout.tsx`**: Service Worker registration
- **`app/api/wall-of-fame-images/route.ts`**: API cache headers

## ✅ Benefits

1. **Faster Load Times**: Cached images load instantly
2. **Reduced Server Load**: Fewer requests to server
3. **Better User Experience**: Images appear immediately
4. **Offline Support**: Service Worker enables offline access
5. **Automatic Updates**: Service Worker updates cache in background

## 🔍 Testing Cache

1. **Check Cache Headers**: Open DevTools → Network tab → Check `Cache-Control` header
2. **Verify Service Worker**: DevTools → Application → Service Workers
3. **Clear Cache**: DevTools → Application → Clear Storage (for testing)

## 📊 Cache Sizes

- **Image Cache**: Unlimited (browser manages)
- **Data Cache**: Unlimited (browser manages)
- **Static Cache**: Unlimited (browser manages)

Browser will automatically manage cache size and evict old entries if needed.

