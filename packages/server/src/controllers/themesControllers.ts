import type { Request, Response } from 'express'
import { v4 as makeUUID } from 'uuid'
import { getTheme, updateTheme, createNewTheme } from '../services/themeService'

export async function putTheme(req: Request, res: Response) {
  let themeUID = req.cookies?.themeUID // Получение значения themeUID из куки
  const { theme } = req.body // Получение значения theme из тела запроса

  try {
    if (themeUID && theme) {
      // Если есть UUID в куки и тема в теле запроса
      await updateTheme(themeUID, theme, res)
    } else if (themeUID && !theme) {
      // Если есть UUID в куки, но нет темы в теле запроса
      res.status(403).json({ error: 'Invalid request parameters' })
    } else if (!themeUID && theme) {
      // Если нет UUID в куки, но есть тема в теле запроса
      themeUID = makeUUID()
      res.cookie('themeUID', themeUID) // Установка куки с новым themeUID
      await createNewTheme(themeUID, theme, res)
    } else {
      // Если нет UUID в куки и нет темы в теле запроса
      res.status(403).json({ error: 'Invalid request parameters' })
    }
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
}

export async function getThemeController(req: Request, res: Response) {
  let themeUID = req.cookies?.themeUID // Получение значения themeUID из куки

  try {
    if (themeUID) {
      const theme = await getTheme(themeUID)
      if (theme) {
        res.cookie('themeUID', themeUID) // Установка куки с существующим themeUID
        res.status(200).json({ theme })
      } else {
        // Если запись не найдена, создаем новую тему с UUID и значением по умолчанию
        themeUID = makeUUID()
        res.cookie('themeUID', themeUID) // Установка куки с новым themeUID
        await createNewTheme(themeUID, 'default', res)
      }
    } else {
      // Если нет UUID в куки, создаем новую тему с новым UUID и значением по умолчанию
      themeUID = makeUUID()
      res.cookie('themeUID', themeUID) // Установка куки с новым themeUID
      await createNewTheme(themeUID, 'default', res)
    }
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
}
