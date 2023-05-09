import isServer from './isServerChecker'

export class LocalStorage {
  public get = (key: string) => {
    if (!isServer) {
      try {
        return JSON.parse(localStorage.getItem(key) || 'false')
      } catch (e: unknown) {
        throw new Error('Incorrect JSON')
      }
    }
  }
  public set = (key: string, value: unknown) => {
    if (!isServer) {
      try {
        const storageItem = JSON.stringify(value)
        localStorage.setItem(key, storageItem)
      } catch (e: unknown) {
        throw new Error('Incorrect JSON')
      }
    }
  }
}

export default new LocalStorage()
