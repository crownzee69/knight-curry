// Service Worker for caching images and data
const CACHE_NAME = 'knight-curry-v3';
const IMAGE_CACHE = 'knight-curry-images-v3';
const DATA_CACHE = 'knight-curry-data-v3';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/menu',
  '/about',
  '/location-and-hours',
];

// Image extensions to cache
const IMAGE_EXTENSIONS = /\.(jpg|jpeg|png|webp|gif|svg|ico)$/i;

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.log('Failed to cache some static assets:', err);
        // Continue even if some assets fail to cache
      });
    })
  );
  // Force activation immediately
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (
            cacheName !== CACHE_NAME &&
            cacheName !== IMAGE_CACHE &&
            cacheName !== DATA_CACHE
          ) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Take control of all pages immediately
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle image requests - comprehensive image caching
  // Check multiple conditions to catch all image requests
  const acceptHeader = request.headers.get('accept') || '';
  const isImageRequest = 
    request.destination === 'image' || 
    IMAGE_EXTENSIONS.test(url.pathname) ||
    url.pathname.startsWith('/assets/') ||
    acceptHeader.includes('image/');

  if (isImageRequest) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            // Return cached image immediately (fastest response)
            // For immutable resources, browser cache is enough, but we still serve from SW cache
            // This provides offline support and faster loading
            return cachedResponse;
          }
          // Not in cache, fetch from network and cache
          return fetch(request).then((networkResponse) => {
            if (networkResponse.ok && networkResponse.status === 200) {
              // Clone response before caching (response can only be consumed once)
              const responseToCache = networkResponse.clone();
              // Always cache in service worker for offline support
              // Even if server says immutable, we cache it for offline access
              cache.put(request, responseToCache);
            }
            return networkResponse;
          }).catch(() => {
            // Network failed and no cache, return a placeholder or error
            return new Response('Image not available', { 
              status: 404,
              headers: { 'Content-Type': 'text/plain' }
            });
          });
        });
      })
    );
    return;
  }

  // Handle API/data requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      caches.open(DATA_CACHE).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          // Try network first, then fallback to cache
          return fetch(request)
            .then((networkResponse) => {
              if (networkResponse.ok) {
                // Cache API responses (stale-while-revalidate)
                cache.put(request, networkResponse.clone());
              }
              return networkResponse;
            })
            .catch(() => {
              // Network failed, try cache
              if (cachedResponse) {
                return cachedResponse;
              }
              return new Response(JSON.stringify({ error: 'Network unavailable' }), {
                status: 503,
                headers: { 'Content-Type': 'application/json' },
              });
            });
        });
      })
    );
    return;
  }

  // Handle other requests (HTML, CSS, JS)
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(request).then((networkResponse) => {
        if (networkResponse.ok) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return networkResponse;
      });
    })
  );
});

