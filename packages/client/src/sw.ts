import { cleanupOutdatedCaches, precacheAndRoute, PrecacheEntry } from 'workbox-precaching'
import { clientsClaim, skipWaiting } from 'workbox-core'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate, NetworkFirst, CacheFirst } from 'workbox-strategies'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { ExpirationPlugin } from 'workbox-expiration'
import { paths } from './constants/swConstants'

declare let self: ServiceWorkerGlobalScope

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST.filter((r: PrecacheEntry | string) => (r as PrecacheEntry)?.url !== 'index.html'))

// загрузка данных для игры
precacheAndRoute(paths.map(url => ({ url, revision: null })))

// clean old assets
cleanupOutdatedCaches()

// Кешируем файлы со шрифтами с помощью стратегии `cache-first` на 1 год
// Сохраняем шрифты
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

// Сохраняем картинки
registerRoute(
  /.*\.(?:png|jpg|svg)/,
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
)
/*registerRoute(
  ({ url }) => url.origin === self.location.origin && url.pathname.startsWith('/assets/'),
  new StaleWhileRevalidate(),
  'GET'
);*/

// Сохраняем api данные с яндекса
registerRoute(
  ({ url }) => url.origin === 'https://ya-praktikum.tech',
  new StaleWhileRevalidate({
    cacheName: 'yandex-api-response',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
)

// Установка таймера на выполнение сетевого запроса
registerRoute(
  new RegExp('/api/*'),
  new NetworkFirst({
    networkTimeoutSeconds: 3,
    cacheName: 'stories',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 5 * 60, // 5 минут
      }),
    ],
  }),
  'GET'
)

skipWaiting()
clientsClaim()
