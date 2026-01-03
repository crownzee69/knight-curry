// Service Worker for caching images and data
const CACHE_NAME = 'knight-curry-v2';
const IMAGE_CACHE = 'knight-curry-images-v2';
const DATA_CACHE = 'knight-curry-data-v2';

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
      return cache.addAll(STATIC_ASSETS);
    })
  );
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
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
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
  const isImageRequest = 
    request.destination === 'image' || 
    IMAGE_EXTENSIONS.test(url.pathname) ||
    url.pathname.startsWith('/assets/') ||
    (request.headers.get('accept') && request.headers.get('accept').includes('image/'));

  if (isImageRequest) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            // Return cached image immediately (fastest response)
            // Update cache in background (stale-while-revalidate pattern)
            // This ensures users see images instantly while cache stays fresh
            fetch(request)
              .then((networkResponse) => {
                if (networkResponse.ok && networkResponse.status === 200) {
                  // Only update if response is valid and different
                  const cacheControl = networkResponse.headers.get('cache-control');
                  // Respect immutable cache headers from server
                  if (!cacheControl || !cacheControl.includes('immutable')) {
                    cache.put(request, networkResponse.clone());
                  }
                }
              })
              .catch(() => {
                // Network failed, keep using cached version (offline support)
              });
            return cachedResponse;
          }
          // Not in cache, fetch from network and cache
          return fetch(request).then((networkResponse) => {
            if (networkResponse.ok && networkResponse.status === 200) {
              // Clone response before caching (response can only be consumed once)
              const responseToCache = networkResponse.clone();
              // Cache the response for future use
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

