import { registerSW } from 'virtual:pwa-register'

registerSW({
  immediate: true,
  onNeedRefresh: () => {
    console.log('Необходимо обновить страницу')
  },
  onOfflineReady: () => {
    console.log('Страница доступна в автономном режиме')
  },
  onRegisteredSW: (swScriptUrl: any, registration: any) => {
    console.log('Service Worker зарегистрирован:', swScriptUrl)
    console.log('Registration:', registration)
  },
  onRegisterError: error => {
    console.error('Ошибка регистрации Service Worker:', error)
  },
})
