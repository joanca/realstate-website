import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  root: 'src',
  plugins: [
    tailwindcss(),
    react()
  ],
  test: {
    environment: 'jsdom',
    setupFiles: './test/setup.js'
  },
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.extension === 'css') {
            return 'output.css'
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  }
})
