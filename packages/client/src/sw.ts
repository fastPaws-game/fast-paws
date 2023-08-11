import { precacheAndRoute, PrecacheEntry } from 'workbox-precaching'
import { clientsClaim, skipWaiting } from 'workbox-core'
import { registerRoute } from 'workbox-routing'
import { NetworkFirst, StaleWhileRevalidate, CacheFirst } from 'workbox-strategies'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'

const offlinePage = '/404'

declare let self: ServiceWorkerGlobalScope

// self.__WB_MANIFEST - точка внедрения по умолчанию
precacheAndRoute(self.__WB_MANIFEST.filter((r: PrecacheEntry | string) => (r as PrecacheEntry)?.url !== 'index.html'))

// Кеширование файлов со шрифтами с помощью стратегии `cache-first` на 1 год
registerRoute(
  /.*\.(?:ttf|otf|woff|woff2)/,
  new CacheFirst({
    cacheName: 'fonts',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
)

// Кеширование картинок с помощью стратегии `stale-while-revalidate`
registerRoute(
  /.*\.(?:png|jpg|svg|gif|ogg|mp3)/,
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
)

// Предзагрузка и кэширование страницы заглушки для оффлайн-режима
precacheAndRoute([
  {
    url: offlinePage,
    revision: null,
  },
])

// Обработка страниц '/\/game|\/main|\/forum/'
registerRoute(
  /\/game|\/main|\/forum|\//,
  async ({ event }) => {
    try {
      // Попытка загрузки страницы из сети
      const response = await fetch(event.request)

      // Если успешно, кэшируем ответ и возвращаем его
      if (response && response.status === 200) {
        const cache = await caches.open('cache-pages')
        cache.put(event.request, response.clone())
        return response
      }
    } catch (error) {
      // Если загрузка из сети не удалась, пытаемся получить страницу из кэша
      const cache = await caches.open('cache-pages')
      const cachedResponse = await cache.match(event.request)
      if (cachedResponse) {
        return cachedResponse
      }
    }

    // Если загрузка из сети и из кэша не удалась, возвращаем страницу оффлайн-режима
    const cache = await caches.open('cache-pages')
    const cachedOfflineResponse = await cache.match(offlinePage)
    if (cachedOfflineResponse) {
      return cachedOfflineResponse
    }

    // Если страница оффлайн-режима не найдена в кэше, возвращаем ответ с кодом 404
    return new Response('Страница не найдена', { status: 404 })
  },
  'GET'
)
registerRoute(
  new RegExp('/*'),
  new NetworkFirst({
    networkTimeoutSeconds: 10,
    cacheName: 'api-response',
  }),
  'GET'
)

registerRoute(
  /.*\.(?:js|ts|tsx)/,
  new CacheFirst({
    cacheName: 'scripts',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
)
skipWaiting()
clientsClaim()
