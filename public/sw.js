// Service worker minimal agar memenuhi kriteria instalasi PWA pada browser (Lighthouse / Chrome PWA installability)
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  // Hanya tangani request http/https standar (lewati skema khusus seperti chrome-extension)
  if (!event.request.url.startsWith("http")) return;
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

