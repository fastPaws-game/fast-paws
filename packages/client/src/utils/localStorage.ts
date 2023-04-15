export class LocalStorage {
  public get = (key: string) => {
    try {
      return JSON.parse(localStorage.getItem(key) || 'false')
    } catch (e: unknown) {
      throw new Error('Incorrect JSON')
    }
  }
  public set = (key: string, value: unknown) => {
    try {
      const storageItem = JSON.stringify(value)
      localStorage.setItem(key, storageItem)
    } catch (e: unknown) {
      throw new Error('Incorrect JSON')
    }
  }
}

export default new LocalStorage()
