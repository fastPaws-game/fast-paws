import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

import { VitePWA } from 'vite-plugin-pwa'
import type { VitePWAOptions } from 'vite-plugin-pwa'

const pwaOptions: Partial<VitePWAOptions> = {
  srcDir: 'src',
  scope: './',
  filename: 'sw.ts',
  strategies: 'injectManifest',
  registerType: 'autoUpdate',
  outDir: 'dist-ssr',
  manifest: {
    name: 'FastPaws',
    short_name: 'FastPaws',
    theme_color: '#FFDD87',
    icons: [
      {
        src: '/assets/img/pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/assets/img/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/assets/img/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  },
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(pwaOptions)],
  define: {
    SERVER_PORT: JSON.stringify(5000),
    YANDEX_URL: JSON.stringify('https://ya-praktikum.tech'),
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'ssr.tsx'),
      name: 'Client',
      formats: ['cjs'],
    },

    rollupOptions: {
      output: {
        dir: 'dist-ssr',
      },
    },
  },
})
