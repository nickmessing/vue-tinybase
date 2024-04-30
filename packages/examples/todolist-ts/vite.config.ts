import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
      'vue-tinybase/typed': 'vue-tinybase',
      'tinybase/with-schemas/persisters/persister-browser': 'tinybase/persisters/persister-browser',
    },
  },
})
