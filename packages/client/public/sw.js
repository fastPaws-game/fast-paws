const CACHE_NAME = 'cats-paws-game-v4'

const STATIC_ASSETS = ['/', '/index.html', '/FastPaws.svg', '/not-found']

const getCacheUrls = () => {
  try {
    return JSON.parse('%HASHURLS%')
  } catch (err) {
    return []
  }
}

const CACHE_ASSETS = STATIC_ASSETS.concat(getCacheUrls())

self.addEventListener('install', event => {
  console.log('INSTALL')
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      cache.addAll(CACHE_ASSETS)
    })
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            caches.delete(cache)
          }
        })
      )
    })
  )
})
self.addEventListener('fetch', event => {
  //отклоняем запросы, сделанные браузерными расширениями, т.к. они не кэшруются SW
  if (!event.request.url.startsWith('http')) return
  event.respondWith(
    caches
      .match(event.request)
      .then(resp => {
        return (
          resp ||
          fetch(event.request).then(response => {
            const responseClone = response.clone()
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseClone)
            })

            return response
          })
        )
      })
      .catch(() => {
        return caches.match('/not-found')
      })
  )
})
