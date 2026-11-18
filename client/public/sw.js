// Offline support for the installed app.
// Network-first: visitors always get the newest version when online; the cached
// copy is only used when the network fails. API calls are never cached.
const CACHE = 'irson-portfolio-v1';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      for (const key of await caches.keys()) if (key !== CACHE) await caches.delete(key);
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin || url.pathname.startsWith('/api/')) return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE);
      try {
        const res = await fetch(req);
        if (res.ok) cache.put(req, res.clone());
        return res;
      } catch {
        const hit = await cache.match(req);
        if (hit) return hit;
        if (req.mode === 'navigate') {
          const shell = await cache.match(new URL('./', self.location.href));
          if (shell) return shell;
        }
        return Response.error();
      }
    })()
  );
});
