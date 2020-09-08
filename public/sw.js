const cacheName = 'app-v2';

const staticAssets = [
   './',
   './index.html',
   './css/main.css',
   './js/index.js',
   './js/main.js',
   './bg.jpg',

];


self.addEventListener('install', async e => {
   const cache = await caches.open(cacheName);
   await cache.addAll(staticAssets);
   return self.skipWaiting();
});

self.addEventListener('activate', e => {
   e.waitUntil(
      caches.keys().then(keys => {
         return Promise.all(keys.filter(key => key !== cacheName)
            .map(key => caches.delete(key)))
      })
   )
});

self.addEventListener('fetch', async e => {
   const req = e.request;

   e.respondWith(
      caches.match(e.req).then(cacheRes => {
         return cacheRes || fetch(req);
      })

   );
});