import type { Request, Response, NextFunction } from 'express'
import axios from 'axios'

const cookieKeys = ['uuid', 'authCookie']

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const hasAuthCookies = cookieKeys.some(key => req.headers.cookie?.includes(key))

    if (hasAuthCookies) {
      await res.locals.axiosClient.getUser()
      next()
    } else {
      res.status(401).json({ message: 'Пользователь не авторизирован' })
    }
  } catch (e) {
    if (axios.isAxiosError(e)) {
      if (e.response?.status !== 200) {
        res.status(401).json({ message: 'Пользователь не авторизирован' })
      }
    }
    if (!res.headersSent) {
      res.status(500).json({ message: 'Ошибка сервера' })
    }
  }
}
