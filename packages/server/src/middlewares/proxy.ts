import { createProxyMiddleware } from 'http-proxy-middleware'

export const proxy = createProxyMiddleware({
  changeOrigin: true,
  cookieDomainRewrite: {
    '*': '',
  },
  target: 'https://ya-praktikum.tech',
})
