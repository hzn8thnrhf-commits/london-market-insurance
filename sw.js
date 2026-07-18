/* London Market Academy — service worker: offline-first cache */
var CACHE = 'lma-v16';
var ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/app.js',
  './js/game.js',
  './js/content/module-market.js',
  './js/content/module-premium.js',
  './js/content/module-pricing.js',
  './js/content/module-capital.js',
  './js/content/module-reinsurance.js',
  './js/content/module-exposure.js',
  './js/content/module-claims.js',
  './js/content/module-classes-shorttail.js',
  './js/content/module-classes-longtail.js',
  './js/content/module-regulation.js',
  './js/content/module-mga.js',
  './js/content/module-bespoke.js',
  './js/content/module-advanced.js',
  './js/content/module-advanced2.js',
  './js/content/classmaps.js',
  './js/content/glossary.js',
  './manifest.webmanifest',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) { return c.addAll(ASSETS); }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(function (hit) {
      if (hit) return hit;
      return fetch(e.request).then(function (res) {
        if (res && res.status === 200 && res.type === 'basic') {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
        }
        return res;
      });
    })
  );
});
