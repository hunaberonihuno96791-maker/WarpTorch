import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(process.env.VITE_FRONTEND_PORT || '3001'),
    proxy: {
      '/api': {
        target: `http://localhost:${process.env.VITE_BACKEND_PORT || '8001'}`,
        changeOrigin: true
      }
    }
  }
})
