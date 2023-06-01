import type { Request, Response, NextFunction } from 'express'
import { getTheme, createNewTheme } from '../services/themeService'
import { v4 as makeUUID } from 'uuid'

export async function getCurrentThemeMiddleware(req: Request, res: Response, next: NextFunction) {
  let themeUID = req.cookies?.themeUID // Получение значения themeUID из куки

  try {
    if (themeUID) {
      const theme = await getTheme(themeUID)
      if (theme) {
        res.cookie('themeUID', themeUID) // Установка куки с существующим themeUID
        res.locals.currentTheme = theme // Сохранение текущей темы в объекте res.locals
        next()
      } else {
        // Если запись не найдена, создаем новую тему с UUID и значением по умолчанию
        themeUID = makeUUID()
        res.cookie('themeUID', themeUID) // Установка куки с новым themeUID
        await createNewTheme(themeUID, null)
        next()
      }
    } else {
      // Если нет UUID в куки, создаем новую тему с новым UUID и значением по умолчанию
      themeUID = makeUUID()
      res.cookie('themeUID', themeUID) // Установка куки с новым themeUID
      await createNewTheme(themeUID, null)
      next()
    }
  } catch (error) {
    res.status(400).json({ error })
  }
}
