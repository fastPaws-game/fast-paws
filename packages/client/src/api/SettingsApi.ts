import { fetchApiV1 } from '../utils/fetchApi'
import { TTheme } from '../models/ThemeModel'
import { ThemeVariants } from '../store/settings/SettingsSlice'

class SettingsApi {
  public getTheme() {
    return fetchApiV1.get<TTheme>('/theme')
  }

  public updateTheme(theme: ThemeVariants) {
    return fetchApiV1.put<TTheme>('/theme', {
      body: {
        theme,
      },
    })
  }

  public getAudio = () => fetchApiV1.get<boolean>('/audio')

  public updateAudio(value: boolean) {
    return fetchApiV1.put<boolean>('/audio', {
      body: {
        value,
      },
    })
  }

  public getMusic = () => fetchApiV1.get<number>('/music')

  public updateMusic(value: number) {
    return fetchApiV1.put<number>('/music', {
      body: {
        value,
      },
    })
  }

  public getSoung = () => fetchApiV1.get<number>('/sound')

  public updateSoung(value: number) {
    return fetchApiV1.put<number>('/sound', {
      body: {
        value,
      },
    })
  }

  public getLanguage = () => fetchApiV1.get<string>('/language')

  public updateLanguage(value: string) {
    return fetchApiV1.put<string>('/language', {
      body: {
        value,
      },
    })
  }
}

export default new SettingsApi()
