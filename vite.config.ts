import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/cultivation-universe-web/',
  plugins: [react()],
})
