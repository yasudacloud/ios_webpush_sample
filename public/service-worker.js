self.addEventListener('push', (event) => {
  const data = event.data.json();
  const options = {
    body: data.text,
  };
  event.waitUntil(self.registration.showNotification("ここにタイトル", options));
});

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('app-cache').then(cache => {
      return cache.addAll([
        '/',
        '/favicon.ico',
        '/icon-192x192.png',
        '/icon-512x512.png',
        '/manifest.json',
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }
      return fetch(event.request).then(fetchResponse => {
        if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
          return fetchResponse;
        }
        const responseToCache = fetchResponse.clone();
        caches.open('app-cache').then(cache => {
          cache.put(event.request, responseToCache);
        });
        return fetchResponse;
      });
    })
  );
});
