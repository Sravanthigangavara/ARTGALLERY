import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/artgallery/' : '/',
  server: {
    proxy: {
      '/api': 'http://localhost:8081',  // Forward API calls in dev mode
    }
  }
}))
