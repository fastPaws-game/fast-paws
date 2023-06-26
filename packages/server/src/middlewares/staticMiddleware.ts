/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express'
import express from 'express'
import * as path from 'path'

const clientDir = path.dirname(require.resolve('client/dist/index.html'))

const staticMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  if (req.url.startsWith('/icons')) {
    return express.static(path.resolve(clientDir, 'assets'))
  } else if (req.url.startsWith('/assets')) {
    return express.static(path.resolve(clientDir, 'icons'))
  } else {
    return next()
  }
}

export default staticMiddleware
