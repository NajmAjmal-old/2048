const GAME_CACHE = '2048.1.0.1'; // Change this to update the cache
const cacheUrls = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/pwa.png',
    '/css/keyframes.css',
    '/css/style.css',
    '/css/media.css',
    '/js/config.js',
    '/js/data.js',
    '/js/utils.js',
    '/js/event.js',
    '/js/view.js',
    '/js/game.js',
    '/js/main.js',
    '/font/clear-sans.css',
    '/font/ClearSans-Bold-webfont.woff',
    '/font/ClearSans-Regular-webfont.woff',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(GAME_CACHE).then((cache) => {
            return cache.addAll(cacheUrls);
        })
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
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== GAME_CACHE)
                    .map((name) => caches.delete(name))
            );
        })
    );
});
