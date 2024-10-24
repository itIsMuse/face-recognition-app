import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    "loader": 'jsx',
    'include': /\.(js|jsx)$/,
    
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.clarifai.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }})

