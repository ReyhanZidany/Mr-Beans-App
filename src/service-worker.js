import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { NetworkFirst } from 'workbox-strategies';

// Precache your assets
precacheAndRoute(self.__WB_MANIFEST);

// Caching API data
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('coffee')) {
    event.respondWith(
      new NetworkFirst({
        cacheName: 'coffee-api-cache',
        plugins: [
          {
            cacheWillUpdate: async ({ response }) => {
              // Optionally filter or log the response before caching
              return response;
            },
          },
        ],
      }).handle({ event })
    );
  }
});
