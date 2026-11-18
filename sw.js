// Service worker : met tout le jeu en cache pour fonctionner sans réseau.
// ⚠️ Après chaque modification du jeu, change VERSION (ex. v2, v3…) puis recharge l'iPad
// une fois en ligne : la nouvelle version remplacera l'ancienne.
const VERSION = 'gdc-v1';
const FICHIERS = [
  './', 'index.html', 'styles.css', 'app.js', 'logic.js', 'contenu.js', 'manifest.webmanifest',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FICHIERS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((cles) => Promise.all(cles.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

// Images fournies par l'exposant : mises en cache une par une (les absentes sont ignorées)
self.addEventListener('message', (e) => {
  if (e.data?.type !== 'precache') return;
  e.waitUntil(caches.open(VERSION).then((c) =>
    Promise.all(e.data.urls.map((u) => fetch(u).then((r) => r.ok && c.put(u, r)).catch(() => {})))));
});

// Cache d'abord, réseau ensuite (et mise en cache de ce qui arrive du réseau)
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((enCache) => enCache || fetch(e.request).then((r) => {
      if (r.ok && new URL(e.request.url).origin === location.origin) {
        const copie = r.clone();
        caches.open(VERSION).then((c) => c.put(e.request, copie));
      }
      return r;
    }).catch(() => (e.request.mode === 'navigate' ? caches.match('index.html') : Response.error()))),
  );
});
