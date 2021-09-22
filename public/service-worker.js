var CACHE_NAME = 'my-site-cach-v1';

var urlsToCache = [
    '/',
    '/style.css',
    '/index.js',
    '/db.js'
];


self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            console.log('Open cache');
            return cache.addAll(urlsToCache);
        })
    );
});


self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request).then((res) => {
                if (res) {
                    return res;
                } else if (event.request.headers.get("accept").includes("text/html")) {
                    return caches.match("/index.html");
                }
            });
        })
    );
});