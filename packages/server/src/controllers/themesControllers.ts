import type { Request, Response } from 'express'
import { v4 as makeUUID } from 'uuid'
import { updateTheme, createNewTheme } from '../services/themeService'

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
      const newTheme = await createNewTheme(themeUID, theme)
      if (newTheme) {
        res.status(200).json({ theme: newTheme.theme })
      } else {
        res.status(400).json({ error: 'Failed to create new theme' })
      }
    } else {
      // Если нет UUID в куки и нет темы в теле запроса
      res.status(403).json({ error: 'Invalid request parameters' })
    }
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
}
