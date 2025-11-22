const CACHE_NAME = 'life-tracker-v1.0.2';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './icons/icon-512.png'
];

// Installation
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installation de la version', CACHE_NAME);
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Mise en cache des fichiers');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Service Worker: Installation terminée');
        return self.skipWaiting(); // Force l'activation immédiate
      })
      .catch((error) => {
        console.error('Service Worker: Erreur installation', error);
      })
  );
});

// Activation
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activation de', CACHE_NAME);
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Suppression ancien cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Activation terminée');
      return self.clients.claim(); // Prend le contrôle immédiatement
    })
  );
});

// Fetch - Cache First avec mise à jour en arrière-plan
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Si trouvé en cache, le retourner
        if (response) {
          // Mais vérifier s'il y a une version plus récente en arrière-plan
          fetch(event.request).then((freshResponse) => {
            if (freshResponse && freshResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, freshResponse);
              });
            }
          }).catch(() => {
            // Pas de connexion, on garde le cache
          });
          
          return response;
        }

        // Sinon, récupérer depuis le réseau
        return fetch(event.request).then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        });
      })
      .catch((error) => {
        console.error('Service Worker: Erreur fetch', error);
      })
  );
});

// Message pour forcer la mise à jour
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('Service Worker:', CACHE_NAME, 'chargé');
