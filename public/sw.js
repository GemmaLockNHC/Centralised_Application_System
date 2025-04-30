const CACHE_NAME = 'cas-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/static/Neighbourhood_Care_Wiki_Logo.webp',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
}); 
