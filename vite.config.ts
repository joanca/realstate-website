import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

export default defineConfig({
  root: 'src',
  plugins: [
    tanstackRouter({
      target: 'react',
      routesDirectory: './routes',
      generatedRouteTree: './routeTree.gen.ts',
      autoCodeSplitting: true,
    }),
    tailwindcss(),
    react()
  ],
  test: {
    environment: 'jsdom',
    setupFiles: './test/setup.js'
  },
  server: {
    port: 3010,
    proxy: {
      '/services': {
        target: 'https://emilybrealty.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  build: {
    cssCodeSplit: false,
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.names.some((name) => name.endsWith('.css'))) {
            return 'output.css'
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  }
})
