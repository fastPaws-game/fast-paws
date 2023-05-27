import { fetchApiV1 } from '../utils/fetchApi'
import { TTheme } from '../models/ThemeModel'
import { ThemeVariants } from '../store/theme/ThemeSlice'

class ThemeApi {
  public getTheme() {
    return fetchApiV1.get<TTheme>('/theme')
  }

  public putTheme(theme: ThemeVariants) {
    return fetchApiV1.put<TTheme>(`/theme`, {
      body: {
        theme,
      },
    })
  }
}

export default new ThemeApi()
