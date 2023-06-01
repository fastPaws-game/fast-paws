import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    SERVER_PORT: JSON.stringify(5000),
    YANDEX_URL: JSON.stringify('https://ya-praktikum.tech'),
  },
  plugins: [react()],
})
