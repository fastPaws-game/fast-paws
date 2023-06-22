import { StoreState } from '../../ssr/store'

export {}

declare const __SERVER_PORT__: number

declare module '*.svg' {
  const content: string
  export default content
}

declare module '*.png' {
  const content: string
  export default content
}

declare global {
  const YANDEX_URL: string
  const SERVER_PORT: string

  interface Window {
    __INITIAL_STATE__?: StoreState
    __REDIRECT_URL__?: string
  }

  interface Document {
    mozFullScreenElement: Document['fullscreenElement']
    webkitFullscreenElement: Document['fullscreenElement']
    msRequestFullscreen: Document['fullscreenElement']
    mozCancelFullScreen: Document['exitFullscreen']
    webkitExitFullscreen: Document['exitFullscreen']
    mozFullScreenEnable: Document['fullscreenEnabled']
    webkitFullscreenEnabled: Document['fullscreenEnabled']
    mozRequestFullScreen: Document['requestFullscreen']
  }

  interface HTMLElement {
    mozRequestFullScreen: HTMLElement['requestFullscreen']
    webkitRequestFullscreen: HTMLElement['requestFullscreen']
    msRequestFullscreen: HTMLElement['requestFullscreen']
  }
}
