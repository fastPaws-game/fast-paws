import cors from 'cors'
import express from 'express'
import * as fs from 'fs'
import * as path from 'path'
import { UserAPIRepository, UserRepository } from './src/repository/UserAPI'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { proxy } from './src/middlewares/proxy'
import topicsRouter from './src/routes/topics'
import forumsRouter from './src/routes/forums'
import commentsRouter from './src/routes/comments'
import { dbConnect } from './db'
import { SERVER_API, PRAKTICUM_API } from './src/constants'
import themesRouter from './src/routes/themes'
import { getCurrentThemeMiddleware } from './src/middlewares/getCurrentThemeMiddleware'
import { authMiddleware } from './src/middlewares/authMiddleware'
import { registerSWMiddleware } from './src/middlewares/swMiddleware'

const isDev = process.env.NODE_ENV === 'development'
if (isDev) dotenv.config({ path: '../../.env' })
else dotenv.config()
const PORT = Number(process.env.SERVER_PORT)

async function startServer() {
  await dbConnect()
  const app = express()

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:', 'blob:', 'https://ya-praktikum.tech/'],
          connectSrc: ["'self'", 'ws://localhost:24678', 'http://localhost:24678', 'data:'],
          fontSrc: ["'self'", 'data:'],
        },
      },
    })
  )

  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  )

  const distPath = path.dirname(require.resolve('client/dist/index.html'))
  const ssrPath = isDev ? path.dirname(require.resolve('client/index.html')) : ''
  const ssrDistPath = require.resolve('client/dist-ssr/client.cjs')

  app.use(registerSWMiddleware)
  /* eslint-disable @typescript-eslint/no-var-requires */
  const vite = isDev
    ? await require('vite').createServer({
        server: { middlewareMode: true },
        root: ssrPath,
        appType: 'custom',
      })
    : undefined

  app.use(`${PRAKTICUM_API}/*`, proxy)
  app.use(express.json())
  app.use(cookieParser())

  app.use((req, res, next) => {
    res.locals.axiosClient = new UserAPIRepository(req.headers['cookie'])
    next()
  })

  app.use(`${SERVER_API}/topics`, authMiddleware, topicsRouter)
  app.use(`${SERVER_API}/forums`, authMiddleware, forumsRouter)
  app.use(`${SERVER_API}/comments`, authMiddleware, commentsRouter)
  app.use(`${SERVER_API}/theme`, themesRouter)

  if (isDev) {
    app.use(vite!.middlewares)
  } else {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')))
    app.use('/icons', express.static(path.resolve(distPath, 'icons')))
  }

  app.use('*', getCurrentThemeMiddleware, async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template: string
      if (isDev) {
        template = fs.readFileSync(path.resolve(ssrPath, 'index.html'), 'utf-8')
        template = await vite!.transformIndexHtml(url, template)
      } else {
        template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8')
      }

      let render: (url: string, userService: UserRepository, currentTheme: string) => Promise<string>
      if (isDev) {
        render = (await vite!.ssrLoadModule(path.resolve(ssrPath, 'ssr.tsx'))).render
      } else {
        render = (await import(ssrDistPath)).render
      }

      const currentTheme = res.locals ? res.locals.currentTheme : null
      const [initialState, appHtml, css] = await render(url, res.locals.axiosClient, currentTheme)

      const initStateSerialized = JSON.stringify(initialState).replace(/</g, '\\u003c')
      const stateMarkup = `<script>window.__INITIAL_STATE__=${initStateSerialized}; window.__REDIRECT_URL__='${process.env.REDIRECT_URL}'</script>`
      const swRegistration = ` <script id="vite-plugin-pwa:register-sw" src="/registerSW.js" type="module"></script>`
      const html = template
        .replace('<!--css-outlet-->', css)
        .replace('<!--ssr-outlet-->', appHtml)
        .replace('<!--store-data-->', stateMarkup)
        .replace('<!--sw-->', swRegistration)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (err) {
      if (isDev) vite!.ssrFixStacktrace(err as Error)
      next(err)
    }
  })

  app.listen(PORT, () => {
    console.log(`\x1b[33m  ➜ ✨ Server is listening on port: \x1b[96m${PORT}\x1b[0m`)
  })
}

startServer()
