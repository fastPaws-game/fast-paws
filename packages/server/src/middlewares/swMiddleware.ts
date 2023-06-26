import { Request, Response, NextFunction } from 'express'

export const registerSWMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.url === '/registerSW.js') {
    res.setHeader('Content-Type', 'text/javascript')
    res.sendFile(require.resolve('client/dist-ssr/registerSW.js'), err => {
      if (err) {
        console.error(err)
        res.status(500).send('Internal Server Error')
      }
    })
  } else if (req.url === '/manifest.webmanifest') {
    res.setHeader('Content-Type', 'application/manifest+json')

    res.sendFile(require.resolve('client/dist-ssr/manifest.webmanifest'), err => {
      if (err) {
        console.error(err)
        res.status(500).send('Internal Server Error')
      }
    })
  } else if (req.url === '/sw.js') {
    res.setHeader('Content-Type', 'text/javascript')
    res.sendFile(require.resolve('client/dist-ssr/sw.js'), err => {
      if (err) {
        console.error(err)
        res.status(500).send('Internal Server Error')
      }
    })
  } else {
    next()
  }
}
