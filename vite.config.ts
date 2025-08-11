import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import mkcert from 'vite-plugin-mkcert'
import basicSsl from '@vitejs/plugin-basic-ssl';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
import UnoCSS from 'unocss/vite'
import vuetify from 'vite-plugin-vuetify'

import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  base: '',
  // base: '/dzGame/',
  plugins: [
    vue(),
    UnoCSS(),
    vuetify({ autoImport: true }),
    AutoImport({
      resolvers: [VantResolver()],
    }),
    Components({
      resolvers: [VantResolver()],
    }),
    // vueDevTools(),
    // basicSsl(),
    // Creates a custom SSL certificate valid for the local machine.
    // Using this plugin requires admin rights on the first dev-mode launch.
    // https://www.npmjs.com/package/vite-plugin-mkcert
    // process.env.HTTPS ? mkcert() : undefined,
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  publicDir: './public',
  // server: {
  //   // Exposes your dev server and makes it accessible for the devices in the same network.
  //   host: true,
  //   https: {
  //     key: fs.readFileSync('key.pem'),
  //     cert: fs.readFileSync('cert.pem')
  //   }
  // },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 将大依赖库独立分块（如 element-plus）
            if (id.includes('vant')) return 'vant';
            if (id.includes('vuetify')) return 'vant';
            if (id.includes('vueuse')) return 'vueuse';
            if (id.includes('telegram')) return 'telegram';
            if (id.includes('tonconnect')) return 'tonconnect';
            if (id.includes('axios')) return 'axios';
            if (id.includes('animejs')) return 'animejs';
            if (id.includes('eruda')) return 'eruda';
            if (id.includes('i18next')) return 'i18next';
            // 其他依赖合并为 vendor
            return 'vendor';
          }
        }
      }
    }
  }
})
