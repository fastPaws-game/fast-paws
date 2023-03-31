const scrollLock = {
  body: document.body,
  enable(): void {
    if (this.body) this.body.style.overflow = 'hidden'
  },
  disable(): void {
    if (this.body) this.body.style.removeProperty('overflow')
  }
}

export default scrollLock
