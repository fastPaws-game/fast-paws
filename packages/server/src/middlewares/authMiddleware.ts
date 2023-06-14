import { Request, Response, NextFunction } from 'express'

const cookieKeys = ['uuid', 'authCookie']

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reqCookies = req.headers.cookie
    const hasAuthCookies = cookieKeys?.some(key => reqCookies?.includes(key))

    if (hasAuthCookies) {
      await res.locals.axiosClient.getUser()
      next()
    } else {
      res.status(401).json({ message: 'Пользователь не авторизирован' })
    }
  } catch (e) {
    //ручка стандартного API https://ya-praktikum.tech/api/v2/auth/user не возвращает AxiosError, кроме того объект ошибки не содержит code, statusCode и т.д. Поэтому приходится ориентироваться именно на строку ошибки
    if (e instanceof Error && e.message === 'Cookie is not valid') {
      res.status(401).json({ message: 'Пользователь не авторизирован' })
    } else {
      res.status(500).json({ message: 'Ошибка сервера' })
    }
  }
}
