const cacheName = 'ssc-v1';
const staticAssets = ['./', './index.html']; // index.html ki jagah aapki file ka naam

self.addEventListener('install', async e => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
  return self.skipWaiting();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    (async () => {
      const res = await caches.match(e.request);
      return res || fetch(e.request);
    })()
  );
});
