// Cache name, as well as version for a Service Worker:
const CACHE_NAME = 'nhcare-cache-v1';

// Lists the assets to be cached:
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/manifest.json',
    '/static/Neighbourhood_Care_Wiki_Logo.webp',
    '/static/vWorker_Logo.webp',
    '/static/vGo_Logo.webp',
    '/static/Xero_Logo.svg',
    '/static/Employment_Hero_Logo.webp'
];

// Caches the necessary initial assets (i.e. an install event).
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// Cleans relatively old cache (i.e. an activate event).
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Serves cached content to its users when they are offline (i.e. a fetch event).
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Returns a cached response if it is found.
                if (response) {
                    return response;
                }

                // Clones a request (that can only be used once).
                const fetchRequest = event.request.clone();

                // Makes a network request, and then caches the response.
                return fetch(fetchRequest).then(response => {
                    // Check if valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Clones its response (that can only be used once).
                    const responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                });
            })
    );
}); 
