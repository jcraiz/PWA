const cacheName = 'ispring-presentation-cache-v2';
const filesToCache = [
  'index.html',
  'manifest.json',
  'data/apple-touch-icon.png',
  'data/browsersupport.js',
  'data/eraser.cur',
  'data/favicon.ico',
  'data/filelist.txt',
  'data/fnt0.woff',
  'data/fnt1.woff',
  'data/fnt2.woff',
  'data/fnt3.woff',
  'data/fnt4.woff',
  'data/fnt5.woff',
  'data/highlighter.cur',
  'data/html5-unsupported.html',
  'data/img0.png',
  'data/img1.png',
  'data/img2.png',
  'data/img3.png',
  'data/lock.cur',
  'data/marker.cur',
  'data/player.js',
  'data/slide1.css',
  'data/slide1.js',
  'data/slide2.css',
  'data/slide2.js',
  'data.local-only/slide1.js',
  'data.local-only/slide2.js'
  
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName)
      .then(function(cache) {
        console.log('Adding files to cache');
        return cache.addAll(filesToCache);
      })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(existingCacheName) {
          return existingCacheName !== cacheName;
        }).map(function(cacheToDelete) {
          return caches.delete(cacheToDelete);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

