const scrollLock = {
  body: document.body,
  html: document.documentElement,

  enable(): void {
    if (this.body) {
      this.body.style.overflow = 'hidden'
      this.body.style.scrollbarGutter = 'stable'
    }
    if (this.html) {
      this.html.style.scrollbarGutter = 'stable'
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
  },
}

export default scrollLock
