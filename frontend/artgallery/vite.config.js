import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/artgallery/' : '/',  // 👈 prod uses /artgallery/, dev uses /
}))
