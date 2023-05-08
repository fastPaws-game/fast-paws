import isServer from './isServerChecker'

const scrollLock = {
  body: !isServer ? document.body : null,
  html: !isServer ? document.documentElement : null,

  enable(): void {
    if (this.body) {
      this.body.style.overflow = 'hidden'
      this.body.style.scrollbarGutter = 'stable'
    }
    if (this.html) {
      this.html.style.scrollbarGutter = 'auto'
    }
  },
  disable(): void {
    if (this.body) {
      this.body.style.removeProperty('overflow')
      this.body.style.removeProperty('scrollbarGutter')
    }
    if (this.html) {
      this.html.style.removeProperty('scrollbarGutter')
    }
  }
}

export default scrollLock
