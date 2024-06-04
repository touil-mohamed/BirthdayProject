const assetVersion = 1;
const assetCacheKey = "assets-v" + assetVersion;

// Gestion de l'installation du service worker et mise en cache des ressources
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(assetCacheKey).then((cache) => {
      return cache
        .addAll(["/", "manifest.json", "http://localhost:3001/Gifts", "images/notif.png"])
        .catch((err) => {
          console.log("Failed to cache resources: ", err);
        });
    })
  );
});

// Activation du service worker et suppression des anciens caches
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== assetCacheKey) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Interception des requêtes réseau pour servir les ressources en cache
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(e.request);
    })
  );
});

// Gestion des notifications push
self.addEventListener('push', function(event) {
  let data = {};

  // Parse the incoming push message payload if it exists
  if (event.data) {
    data = event.data.json();
  }

  const options = {
    body: data.body,
    icon: 'http://localhost:5173/images/notifications.png', // URL de l'icône de notification
    //badge: 'images/notifications.png' // URL de la badge (optionnel)
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Gestion des clics sur les notifications
self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  event.waitUntil(
    // Open a specific URL when the notification is clicked
    self.clients.openWindow('http://localhost:5173') // Change to your URL
  );
});