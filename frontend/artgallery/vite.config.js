import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // 👇 important: set base path to match Tomcat context (SDP)
  base: command === 'build' ? '/SDP/' : '/',
  server: {
    proxy: {
      // 👇 during `npm run dev`, requests to /api/* will go to backend
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        secure: false,
      },
    },
  },
}))
