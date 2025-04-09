const CACHE_NAME = 'gcm-visa-cache-v1';
const URLs_TO_CACHE = [
  '/gcm-visa-app-admin/',
  '/gcm-visa-app-admin/index.html',
  '/gcm-visa-app-admin/script.js',
  '/gcm-visa-app-admin/icon-192x192.png',
  '/gcm-visa-app-admin/icon-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLs_TO_CACHE))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
