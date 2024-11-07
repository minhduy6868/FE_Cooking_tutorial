import * as path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import svgLoader from 'vite-svg-loader'

export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  
  return defineConfig({
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        dirs: ['./src/api', './src/composables'],
      }),
      svgLoader(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          },
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/scss/main.scss";`,
        },
      },
    },
    server: {
      proxy: {
        // Cấu hình proxy cho backend
        '/api': {
          target: 'http://localhost:8080',  // Địa chỉ của backend
          changeOrigin: true,              // Thay đổi origin trong header để bỏ qua CORS
          rewrite: (path) => path.replace(/^/, ''),  // Xóa "/api" khỏi URL khi gửi đến backend
        },
      },
    },
  })
}
