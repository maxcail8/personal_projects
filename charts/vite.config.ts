import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    define: {
      'process.env': loadEnv(mode, process.cwd(), '')
    },
    build: {
      outDir: './dist',
      lib: {
        entry: path.resolve(__dirname, './src/main.ts'),
        name: 'ProductCharts',
        formats: ['umd'],
        fileName: (format) => `product_charts.${format}.js`
      },
      emptyOutDir: false,
      rollupOptions: {
        output: {
          globals: {
            vue: 'Vue'
          },
          assetFileNames: 'product_charts.css'
        }
      },
      sourcemap: true,
      minify: true,
      cssMinify: true
    },
    plugins: [vue(), tailwindcss()]
  }
})
